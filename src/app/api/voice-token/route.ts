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

const MODEL = 'gemini-live-2.5-flash-preview'

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

  try {
    const ai = new GoogleGenAI({ apiKey, apiVersion: 'v1alpha' })
    const expireTime = new Date(Date.now() + 30 * 60 * 1000).toISOString()
    const newSessionExpireTime = new Date(Date.now() + 2 * 60 * 1000).toISOString()

    const authToken = await ai.authTokens.create({
      config: {
        uses: 1,
        expireTime,
        newSessionExpireTime,
        liveConnectConstraints: {
          model: MODEL,
        },
      },
    })

    if (!authToken.name) {
      console.error('[voice-token] No token name in response:', authToken)
      return NextResponse.json({ error: 'Respuesta inesperada del servicio de tokens.' }, { status: 502 })
    }

    return NextResponse.json({
      token: authToken.name,
      model: MODEL,
      expiresAt: expireTime,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido'
    console.error('[voice-token] Exception:', message)
    return NextResponse.json(
      { error: 'No se pudo crear el token efímero.', detail: message.slice(0, 200) },
      { status: 502 },
    )
  }
}
