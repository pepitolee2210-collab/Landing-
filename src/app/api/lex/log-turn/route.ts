import { NextRequest, NextResponse } from 'next/server'

/**
 * Endpoint para que el cliente loggee turns de conversación con Lex.
 *
 * Por ahora escribe solo en console (Vercel logs los captura). Cuando se
 * configure Supabase en env vars, escribe también a las tablas
 * lex_conversations + lex_conversation_turns + lex_quality_signals.
 *
 * Privacidad: SOLO texto, NO audio. Datos legales sensibles, retención
 * 90 días (Supabase RLS + cron). El usuario acepta vía banner sutil
 * en el welcome modal.
 */

interface LogTurnBody {
  sessionId: string
  surface: 'landing-public' | 'admin' | 'cita'
  role: 'user' | 'lex' | 'tool' | 'system'
  text?: string
  toolName?: string
  toolArgs?: Record<string, unknown>
  toolResult?: { ok: boolean; message: string }
  turnIndex: number
  timestamp: string // ISO string
  // Señales de calidad detectadas client-side
  whatsappOpened?: boolean
  // Si la sesión terminó
  isEnd?: boolean
  durationSec?: number
  rating?: number
}

const ALLOWED_ORIGINS = [
  'https://usalatinoprime.com',
  'https://www.usalatinoprime.com',
  'http://localhost:3001',
  'http://127.0.0.1:3001',
]

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false
  if (ALLOWED_ORIGINS.includes(origin)) return true
  if (
    origin.startsWith('https://landing-iwoh-') &&
    (origin.endsWith('.vercel.app') || origin.endsWith('-pepitolee2210-collab.vercel.app'))
  ) return true
  if (process.env.VERCEL_URL && origin === `https://${process.env.VERCEL_URL}`) return true
  return false
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin')
  if (!isAllowedOrigin(origin)) {
    return NextResponse.json({ error: 'Origen no autorizado' }, { status: 403 })
  }

  let body: LogTurnBody
  try {
    body = (await request.json()) as LogTurnBody
  } catch {
    return NextResponse.json({ error: 'Body inválido' }, { status: 400 })
  }

  // Validación mínima
  if (!body.sessionId || !body.role || typeof body.turnIndex !== 'number') {
    return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 })
  }

  // Truncar texto a 4000 caracteres por turn (suficiente para conversación normal)
  if (body.text && body.text.length > 4000) {
    body.text = body.text.slice(0, 4000) + '...[truncated]'
  }

  // Log estructurado — Vercel/Axiom puede agregar esto.
  // eslint-disable-next-line no-console
  console.log('[lex-turn]', JSON.stringify({
    sessionId: body.sessionId,
    surface: body.surface,
    role: body.role,
    text: body.text,
    toolName: body.toolName,
    toolArgs: body.toolArgs,
    turnIndex: body.turnIndex,
    timestamp: body.timestamp,
    isEnd: body.isEnd,
    whatsappOpened: body.whatsappOpened,
    durationSec: body.durationSec,
    rating: body.rating,
  }))

  // TODO Bloque futuro: si SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY existen,
  // insertar en tablas lex_conversations + lex_conversation_turns.

  return NextResponse.json({ ok: true })
}
