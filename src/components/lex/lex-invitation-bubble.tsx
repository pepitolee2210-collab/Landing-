'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * Bubble de invitación estilo Intercom — aparece a los 8s sin
 * interacción con el FAB de Lex, encima del propio FAB. Llama la
 * atención del usuario que NO vio el welcome modal o lo cerró.
 *
 * Se cierra (sesión actual) si el user lo descarta. NO se vuelve a
 * abrir hasta que el user recargue.
 */

const STORAGE_KEY = 'ulp-lex-bubble-dismissed'
const DELAY_MS = 8000

interface Props {
  isAgentActive: boolean
  onActivate: () => void
}

export function LexInvitationBubble({ isAgentActive, onActivate }: Props) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)

    if (typeof window === 'undefined') return
    // Si el user ya descartó el bubble en esta sesión, no lo mostramos
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') return
    } catch {}

    const timer = setTimeout(() => {
      // Si el agente ya está activo cuando vencen los 8s, no aparece
      setOpen(true)
    }, DELAY_MS)

    return () => clearTimeout(timer)
  }, [])

  function dismiss() {
    setOpen(false)
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {}
  }

  function accept() {
    setOpen(false)
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {}
    onActivate()
  }

  if (!mounted) return null
  if (isAgentActive) return null
  if (!open) return null

  return createPortal(
    <div
      role="dialog"
      aria-label="Invitación a hablar con Lex"
      className="lex-bubble max-w-[300px]"
      style={{
        position: 'fixed',
        bottom: 88, // encima del FAB (que está en bottom: 24 + altura ~52 + gap)
        right: 24,
        zIndex: 46,
        padding: 16,
        borderRadius: 16,
        background: 'linear-gradient(180deg, rgba(20,20,20,0.98), rgba(10,10,10,0.98))',
        border: '0.5px solid rgba(255,255,255,0.15)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(59,130,246,0.18)',
        color: '#FAFAFA',
        animation: 'lex-bubble-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
      }}
    >
      {/* Header con orb + cerrar */}
      <div className="flex items-start gap-3 mb-3">
        <div className="relative flex items-center justify-center shrink-0" style={{ width: 28, height: 28 }}>
          <span
            aria-hidden
            className="absolute rounded-full"
            style={{
              inset: 0,
              background: 'radial-gradient(circle, #3B82F6, transparent 70%)',
              opacity: 0.6,
              animation: 'lex-bubble-orb 2s ease-in-out infinite',
            }}
          />
          <span
            className="relative rounded-full"
            style={{
              width: 12,
              height: 12,
              background: '#FFFFFF',
              boxShadow: '0 0 12px rgba(255,255,255,0.7)',
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              fontWeight: 500,
              letterSpacing: '0.2em',
              color: '#9CA3AF',
              marginBottom: 2,
            }}
          >
            LEX · ASISTENTE
          </p>
          <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em' }}>
            ¡Hola! 👋
          </p>
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Cerrar invitación"
          className="w-6 h-6 inline-flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          style={{ color: '#9CA3AF' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Mensaje */}
      <p
        style={{
          fontSize: 13,
          lineHeight: 1.5,
          color: '#D1D5DB',
          marginBottom: 12,
        }}
      >
        ¿Te muestro tu proceso migratorio en 2 minutos? Te explico por voz.
      </p>

      {/* Botón */}
      <button
        type="button"
        onClick={accept}
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]"
        style={{
          background: '#FAFAFA',
          color: '#0A0A0A',
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '-0.005em',
          boxShadow: '0 6px 20px rgba(255,255,255,0.18)',
        }}
      >
        Sí, guíame
      </button>

      <style>{`
        @keyframes lex-bubble-in {
          from { opacity: 0; transform: translateY(8px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes lex-bubble-orb {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.3); }
        }
        /* Mobile: subir el bubble por encima del FAB ajustado a 76px */
        @media (max-width: 640px) {
          .lex-bubble {
            bottom: 140px !important;
            right: 12px !important;
            max-width: calc(100vw - 24px) !important;
          }
        }
      `}</style>
    </div>,
    document.body,
  )
}
