import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

/**
 * Endpoint que crea un token efímero (ephemeral auth token) para que el
 * browser conecte al WebSocket de Gemini Live API sin exponer la
 * GEMINI_API_KEY directamente.
 *
 * Cliente: POST /api/voice-token → recibe { token, model }, usa ese token
 * con @google/genai en el browser para abrir la sesión Live.
 *
 * Seguridad:
 * - GEMINI_API_KEY vive solo server-side (.env.local + Vercel env vars).
 * - Rate limit por IP (in-memory — migrar a Upstash Redis o Vercel KV
 *   cuando haya tráfico real).
 * - Token efímero válido ~30 min, suficiente para una conversación de
 *   guía promedio.
 *
 * Spec: https://ai.google.dev/api/live#auth_tokens
 */

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): { allowed: boolean; resetAt: number } {
  const now = Date.now()
  const entry = rateLimitStore.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return { allowed: true, resetAt: now + RATE_LIMIT_WINDOW_MS }
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, resetAt: entry.resetAt }
  }

  entry.count++
  return { allowed: true, resetAt: entry.resetAt }
}

// Modelo Live de Gemini. Verificados disponibles para nuestra API key
// (Feb 2026, vía GET /v1beta/models):
//   - gemini-3.1-flash-live-preview  (Gen 3.1, RECOMENDADO — razonamiento
//     superior; requiere mediaResolution y contextWindowCompression según
//     el get-code oficial de AI Studio)
//   - gemini-2.5-flash-native-audio-latest  (alternativa con voz más natural)
//   - gemini-2.0-flash-live-001  (GA estable, fallback)
const MODEL = 'gemini-3.1-flash-live-preview'

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  const rl = checkRateLimit(ip)
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Demasiadas conexiones. Intenta en un momento.', retryAt: new Date(rl.resetAt).toISOString() },
      { status: 429 },
    )
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'GEMINI_API_KEY no configurada en el servidor.' },
      { status: 500 },
    )
  }

  // DEBUG: temporalmente devolvemos la API key directa al cliente para
  // diagnosticar si los ephemeral tokens son incompatibles con
  // gemini-3.1-flash-live-preview (es preview + tokens experimental).
  //
  // ⚠️ SEGURIDAD: esto expone la API key al browser. SOLO para POC.
  // Antes de deploy a producción: migrar a proxy WebSocket server-side
  // o re-habilitar ephemeral tokens cuando el modelo lo soporte.
  return NextResponse.json({
    token: apiKey,
    model: MODEL,
    expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    _warning: 'API key directa — POC inseguro. Migrar antes de prod.',
  })
}
