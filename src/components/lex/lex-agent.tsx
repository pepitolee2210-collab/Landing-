'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLexAgent } from './use-lex-agent'
import { onLexEvent } from './lex-events'
import { SITE } from '@/lib/site'
import { whatsappUrl } from '@/lib/utils'

/**
 * Widget flotante que aparece cuando el usuario aceptó ser guiado por Lex.
 * Muestra estado visual del agente (orb animado) + controles de mute / cerrar.
 */
export function LexAgent({ onClosed }: { onClosed?: () => void }) {
  const [transcript, setTranscript] = useState<
    { role: 'user' | 'lex'; text: string; id: number }[]
  >([])
  const [whatsappCta, setWhatsappCta] = useState<{ message: string } | null>(null)
  const idRef = { current: 0 }

  const { state, errorMessage, isMuted, start, stop, toggleMute } = useLexAgent({
    onTranscript: (role, text) => {
      setTranscript((prev) => {
        // Si el último mensaje del mismo rol existe, lo concatenamos.
        const last = prev[prev.length - 1]
        if (last && last.role === role) {
          return [...prev.slice(0, -1), { ...last, text: last.text + text }]
        }
        idRef.current += 1
        return [...prev, { role, text, id: idRef.current }]
      })
    },
    // onClose: NO desmontar el widget — el usuario debe ver el estado final
    // (sea closed normal o error). Solo desmonta cuando hace click en X
    // o cuando la tool closeAgent lo pide explícitamente.
  })

  // Auto-start al montar
  useEffect(() => {
    void start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Escuchar evento lex:close de las tools
  useEffect(() => {
    return onLexEvent('lex:close', () => {
      void stop()
      onClosed?.()
    })
  }, [stop, onClosed])

  // Escuchar evento lex:openWhatsApp para mostrar botón persistente.
  // Aunque window.open ya se ejecutó, mostramos botón como fallback
  // (popup blocker) y para que el user pueda re-abrir si cerró tab.
  useEffect(() => {
    return onLexEvent('lex:openWhatsApp', (payload) => {
      if (payload?.message) {
        setWhatsappCta({ message: payload.message })
      }
    })
  }, [])

  function handleClose() {
    void stop()
    onClosed?.()
  }

  // Mapeo estado → color del orb
  const orbColor = state === 'speaking'
    ? '#3B82F6'
    : state === 'listening'
    ? '#FAFAFA'
    : state === 'thinking' || state === 'connecting'
    ? '#FACC15'
    : state === 'error'
    ? '#EF4444'
    : '#525252'

  const statusLabel = state === 'connecting'
    ? 'Conectando…'
    : state === 'listening'
    ? isMuted ? 'Silenciado' : 'Escuchando'
    : state === 'thinking'
    ? 'Pensando…'
    : state === 'speaking'
    ? 'Hablando'
    : state === 'error'
    ? 'Error'
    : 'Inactivo'

  if (typeof document === 'undefined') return null

  // Portal a body para escapar de `.l2-root > * { position: relative }`
  return createPortal(
    <div
      className="lex-widget max-w-[360px] w-[min(360px,calc(100vw-16px))]"
      style={{
        position: 'fixed',
        zIndex: 50,
        bottom: 24,
        right: 24,
        animation: 'lex-fade-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
      }}
    >
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(20,20,20,0.96), rgba(8,8,8,0.96))',
          border: '0.5px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(255,255,255,0.04)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}
        >
          {/* Orb animado */}
          <div className="relative flex items-center justify-center" style={{ width: 36, height: 36 }}>
            <span
              aria-hidden
              className="absolute rounded-full"
              style={{
                inset: 0,
                background: `radial-gradient(circle, ${orbColor}, transparent 70%)`,
                opacity: 0.4,
                animation: state === 'listening' || state === 'speaking'
                  ? 'lex-orb-pulse 2s ease-in-out infinite'
                  : 'none',
              }}
            />
            <span
              className="relative rounded-full"
              style={{
                width: 14,
                height: 14,
                background: orbColor,
                boxShadow: `0 0 16px ${orbColor}`,
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <p
              className="leading-none"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: '0.15em',
                color: '#9CA3AF',
              }}
            >
              ASISTENTE DIGITAL
            </p>
            <p
              className="mt-1 leading-none"
              style={{
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: '-0.01em',
                color: '#FAFAFA',
              }}
            >
              Lex · {statusLabel}
            </p>
          </div>

          {/* Botón mute */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Activar micrófono' : 'Silenciar micrófono'}
            className="w-9 h-9 inline-flex items-center justify-center rounded-full transition-all hover:bg-white/8 active:scale-95"
            style={{ border: '0.5px solid rgba(255,255,255,0.1)', color: '#D1D5DB' }}
            disabled={state !== 'listening' && state !== 'speaking' && state !== 'thinking'}
          >
            {isMuted ? <IconMicOff /> : <IconMic />}
          </button>

          {/* Botón cerrar */}
          <button
            type="button"
            onClick={handleClose}
            aria-label="Cerrar Lex"
            className="w-9 h-9 inline-flex items-center justify-center rounded-full transition-all hover:bg-white/8 active:scale-95"
            style={{ border: '0.5px solid rgba(255,255,255,0.1)', color: '#D1D5DB' }}
          >
            <IconClose />
          </button>
        </div>

        {/* Transcripción */}
        <div
          className="px-4 py-3 max-h-[260px] overflow-y-auto space-y-3"
          style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.15) transparent' }}
          ref={(el) => {
            if (el) el.scrollTop = el.scrollHeight
          }}
        >
          {transcript.length === 0 && state !== 'error' && (
            <p
              className="text-center py-6"
              style={{
                fontSize: 13,
                color: '#6B7280',
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '0.05em',
              }}
            >
              {state === 'connecting' ? 'Conectando con Lex…' : 'Habla con Lex cuando quieras.'}
            </p>
          )}

          {transcript.map((entry) => (
            <div
              key={entry.id}
              className="flex gap-2.5"
              style={{ animation: 'lex-line-in 0.3s ease-out both' }}
            >
              <span
                className="shrink-0 mt-0.5"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  color: entry.role === 'lex' ? '#3B82F6' : '#9CA3AF',
                  width: 32,
                }}
              >
                {entry.role === 'lex' ? 'LEX' : 'TÚ'}
              </span>
              <p
                className="flex-1"
                style={{
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: entry.role === 'lex' ? '#FAFAFA' : '#D1D5DB',
                }}
              >
                {entry.text}
              </p>
            </div>
          ))}

          {state === 'error' && errorMessage && (
            <p
              className="rounded-md p-3 text-xs"
              style={{
                background: 'rgba(239,68,68,0.1)',
                border: '0.5px solid rgba(239,68,68,0.3)',
                color: '#FCA5A5',
              }}
            >
              {errorMessage}
            </p>
          )}
        </div>

        {/* CTA WhatsApp persistente — aparece cuando Lex invocó openWhatsApp.
            Fallback robusto: si window.open fue bloqueado, el user puede
            tocar este botón para abrir manualmente. También sirve para
            re-abrir si cerró la pestaña por accidente. */}
        {whatsappCta && (
          <a
            href={whatsappUrl(SITE.contact.whatsapp, whatsappCta.message)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3 transition-all hover:brightness-110 active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #25D366, #128C7E)',
              color: '#FFFFFF',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '-0.005em',
              borderTop: '0.5px solid rgba(255,255,255,0.15)',
              animation: 'lex-wa-pulse 2.4s ease-in-out infinite',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Continuar por WhatsApp
          </a>
        )}

        {/* Footer hint */}
        <div
          className="px-4 py-2.5"
          style={{
            borderTop: '0.5px solid rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.015)',
          }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              letterSpacing: '0.18em',
              color: '#6B7280',
              textAlign: 'center',
            }}
          >
            POWERED BY GEMINI · ESPAÑOL · BETA
          </p>
        </div>
      </div>

      <style>{`
        @keyframes lex-fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes lex-orb-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.18); }
        }
        @keyframes lex-line-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes lex-wa-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
          50% { box-shadow: 0 0 0 6px rgba(37, 211, 102, 0); }
        }
        /* Mobile: subir el widget para no chocar con StickyCartBar */
        @media (max-width: 640px) {
          .lex-widget {
            bottom: 80px !important;
            right: 8px !important;
            left: 8px !important;
            max-width: none !important;
            width: auto !important;
          }
        }
      `}</style>
    </div>,
    document.body,
  )
}

function IconMic() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
    </svg>
  )
}

function IconMicOff() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
      <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
      <line x1="12" y1="19" x2="12" y2="23" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}
