import { NextRequest, NextResponse } from 'next/server'

/**
 * Endpoint que provee la API key de Gemini al cliente, con protecciones
 * server-side: Origin/Referer allowlist + rate limit + audit log.
 *
 * Estrategia "Gated API key" (Opción B aprobada por el usuario):
 * - GEMINI_API_KEY vive solo en env vars de Vercel server-side
 * - El cliente la recibe solo si pasa validaciones de Origin/Referer
 * - Rate limit 5 sesiones/IP/hora
 * - Audit log (por ahora console; tabla Supabase en Bloque 7)
 *
 * Deuda técnica conocida (documentada en memory project_lex_voice_agent.md):
 * Esta solución NO es un proxy WebSocket completo. La API key viaja al
 * browser de los origins permitidos. La protección depende de:
 *   1. Allowlist de Origin/Referer (filtra abuso desde otros dominios)
 *   2. Rate limit por IP (filtra abuso masivo)
 *   3. Cap diario en Google AI Studio dashboard (límite máximo de daño)
 *
 * Si el negocio crece y este vector se vuelve crítico, migrar a:
 *   - Proxy server-side completo (Fly.io / Render con `ws`)
 *   - O ephemeral tokens cuando Google los habilite para
 *     gemini-3.1-flash-live-preview
 */

// ──────────────────────────────────────────────────────────────────
// Allowlist de orígenes — solo estos browsers pueden recibir la key
// ──────────────────────────────────────────────────────────────────

const PRODUCTION_ORIGINS = [
  'https://usalatinoprime.com',
  'https://www.usalatinoprime.com',
]

const DEV_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
]

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false

  // Production explícito
  if (PRODUCTION_ORIGINS.includes(origin)) return true

  // Dev local
  if (DEV_ORIGINS.includes(origin)) return true

  // Vercel preview deployment URL del propio proyecto (inyectada por Vercel)
  if (process.env.VERCEL_URL && origin === `https://${process.env.VERCEL_URL}`) {
    return true
  }

  // Preview URLs del project landing-iwoh — necesario para testear PRs
  // Patrón: https://landing-iwoh-{branch-hash}-pepitolee2210-collab.vercel.app
  if (
    origin.startsWith('https://landing-iwoh-') &&
    (origin.endsWith('.vercel.app') || origin.endsWith('-pepitolee2210-collab.vercel.app'))
  ) {
    return true
  }

  return false
}

// ──────────────────────────────────────────────────────────────────
// Rate limit por IP — 5 sesiones por hora
// ──────────────────────────────────────────────────────────────────

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hora
const RATE_LIMIT_MAX = 5
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

// Limpieza periódica del store para no acumular IPs viejas en memoria.
// In-memory está bien por ahora — si escala mucho, migrar a Vercel KV.
let lastCleanup = Date.now()
function cleanupStaleEntries() {
  const now = Date.now()
  if (now - lastCleanup < 5 * 60 * 1000) return
  lastCleanup = now
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < now) rateLimitStore.delete(key)
  }
}

function checkRateLimit(ip: string): { allowed: boolean; resetAt: number; remaining: number } {
  cleanupStaleEntries()
  const now = Date.now()
  const entry = rateLimitStore.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return { allowed: true, resetAt: now + RATE_LIMIT_WINDOW_MS, remaining: RATE_LIMIT_MAX - 1 }
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, resetAt: entry.resetAt, remaining: 0 }
  }

  entry.count++
  return { allowed: true, resetAt: entry.resetAt, remaining: RATE_LIMIT_MAX - entry.count }
}

// ──────────────────────────────────────────────────────────────────
// Audit log básico — console por ahora, tabla Supabase en Bloque 7
// ──────────────────────────────────────────────────────────────────

interface AuditEntry {
  timestamp: string
  ip: string
  origin: string | null
  referer: string | null
  userAgent: string | null
  outcome: 'allowed' | 'denied-origin' | 'denied-rate-limit' | 'denied-no-key'
  rateLimitRemaining?: number
}

function logAudit(entry: AuditEntry) {
  // En producción Vercel logs captura esto y puede mandarse a Axiom/Logflare.
  // eslint-disable-next-line no-console
  console.log('[lex-token]', JSON.stringify(entry))
}

// ──────────────────────────────────────────────────────────────────
// Modelo Live de Gemini
// ──────────────────────────────────────────────────────────────────

const MODEL = 'gemini-3.1-flash-live-preview'

// ──────────────────────────────────────────────────────────────────
// Handler
// ──────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  const origin = request.headers.get('origin')
  const referer = request.headers.get('referer')
  const userAgent = request.headers.get('user-agent')

  // 1) Validar Origin — primer filtro
  if (!isAllowedOrigin(origin)) {
    logAudit({
      timestamp: new Date().toISOString(),
      ip,
      origin,
      referer,
      userAgent,
      outcome: 'denied-origin',
    })
    return NextResponse.json(
      { error: 'Origen no autorizado.' },
      { status: 403 },
    )
  }

  // 2) Validar Referer si está presente — segundo filtro (defensa en profundidad)
  if (referer) {
    try {
      const refererUrl = new URL(referer)
      const refererOrigin = refererUrl.origin
      if (!isAllowedOrigin(refererOrigin)) {
        logAudit({
          timestamp: new Date().toISOString(),
          ip,
          origin,
          referer,
          userAgent,
          outcome: 'denied-origin',
        })
        return NextResponse.json(
          { error: 'Referer no autorizado.' },
          { status: 403 },
        )
      }
    } catch {
      // Referer mal formado — sospechoso, bloqueamos
      return NextResponse.json(
        { error: 'Referer inválido.' },
        { status: 403 },
      )
    }
  }

  // 3) Rate limit por IP
  const rl = checkRateLimit(ip)
  if (!rl.allowed) {
    logAudit({
      timestamp: new Date().toISOString(),
      ip,
      origin,
      referer,
      userAgent,
      outcome: 'denied-rate-limit',
    })
    return NextResponse.json(
      {
        error: 'Demasiadas conexiones desde tu red. Intenta en una hora.',
        retryAt: new Date(rl.resetAt).toISOString(),
      },
      { status: 429 },
    )
  }

  // 4) Validar que la key esté configurada
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    logAudit({
      timestamp: new Date().toISOString(),
      ip,
      origin,
      referer,
      userAgent,
      outcome: 'denied-no-key',
    })
    return NextResponse.json(
      { error: 'GEMINI_API_KEY no configurada en el servidor.' },
      { status: 500 },
    )
  }

  // 5) Todo OK — emitir la key con ventana de validez
  logAudit({
    timestamp: new Date().toISOString(),
    ip,
    origin,
    referer,
    userAgent,
    outcome: 'allowed',
    rateLimitRemaining: rl.remaining,
  })

  return NextResponse.json({
    token: apiKey,
    model: MODEL,
    expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    rateLimitRemaining: rl.remaining,
    rateLimitResetAt: new Date(rl.resetAt).toISOString(),
  })
}
