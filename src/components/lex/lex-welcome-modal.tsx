'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * Modal de bienvenida que ofrece guía por voz con Lex.
 * Aparece a los 3s del primer mount (o al primer scroll significativo,
 * lo que ocurra primero). La elección se persiste en localStorage para
 * no molestar al usuario en cada visita.
 */

const STORAGE_KEY = 'ulp-lex-welcome-choice'
const STORAGE_KEY_TIMESTAMP = 'ulp-lex-welcome-choice-at'
const DELAY_MS = 3000
const SCROLL_THRESHOLD_PX = 280
// Re-engagement: si el user eligió 'explore' hace más de 30 días, volvemos
// a preguntar (su contexto migratorio puede haber cambiado).
const REENGAGE_AFTER_MS = 30 * 24 * 60 * 60 * 1000

type Choice = 'guided' | 'explore'

interface Props {
  onAcceptGuided: () => void
  onDeclineGuided?: () => void
  /** Si el agente ya está activo (por ejemplo, lanzado desde el FAB),
   *  el modal no debe aparecer/mostrarse — ya no tiene sentido preguntar. */
  hidden?: boolean
}

export function LexWelcomeModal({ onAcceptGuided, onDeclineGuided, hidden }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = localStorage.getItem(STORAGE_KEY) as Choice | null
    const storedAt = localStorage.getItem(STORAGE_KEY_TIMESTAMP)

    // Si el usuario eligió 'guided' antes → no preguntamos (FAB siempre disponible)
    if (stored === 'guided') return

    // Si eligió 'explore' hace menos de 30 días → respetamos
    if (stored === 'explore' && storedAt) {
      const choiceTimestamp = parseInt(storedAt, 10)
      if (!Number.isNaN(choiceTimestamp)) {
        const elapsed = Date.now() - choiceTimestamp
        if (elapsed < REENGAGE_AFTER_MS) return
      }
    }
    // Si pasaron 30+ días desde 'explore' → re-preguntar

    let triggered = false
    const trigger = () => {
      if (triggered) return
      triggered = true
      setOpen(true)
    }

    const timer = setTimeout(trigger, DELAY_MS)
    const onScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD_PX) trigger()
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, 'guided')
      localStorage.setItem(STORAGE_KEY_TIMESTAMP, String(Date.now()))
    } catch {}
    setOpen(false)
    onAcceptGuided()
  }

  function decline() {
    try {
      localStorage.setItem(STORAGE_KEY, 'explore')
      localStorage.setItem(STORAGE_KEY_TIMESTAMP, String(Date.now()))
    } catch {}
    setOpen(false)
    onDeclineGuided?.()
  }

  if (hidden) return null
  if (!open) return null
  if (typeof document === 'undefined') return null

  // Portal directo a document.body para escapar de los selectores que
  // afectan a hijos de .l2-root (`.l2-root > * { position: relative }`).
  return createPortal(
    <div
      className="flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Bienvenida — ofrece guía por voz"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(8px)',
        animation: 'lex-modal-bg 0.4s ease-out both',
      }}
    >
      <div
        className="relative max-w-[480px] w-full rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(20,20,20,0.98), rgba(8,8,8,0.98))',
          border: '0.5px solid rgba(255,255,255,0.14)',
          boxShadow: '0 32px 96px rgba(0,0,0,0.7)',
          animation: 'lex-modal-pop 0.55s cubic-bezier(0.16, 1, 0.3, 1) both',
        }}
      >
        {/* Inner glow top */}
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.18), transparent 50%)',
          }}
        />

        <div className="relative px-8 py-9 text-center space-y-6">
          {/* Orb decorativo */}
          <div className="flex justify-center">
            <div className="relative flex items-center justify-center" style={{ width: 64, height: 64 }}>
              <span
                aria-hidden
                className="absolute rounded-full"
                style={{
                  inset: 0,
                  background: 'radial-gradient(circle, #3B82F6, transparent 70%)',
                  opacity: 0.6,
                  animation: 'lex-orb-pulse-modal 2.4s ease-in-out infinite',
                }}
              />
              <span
                aria-hidden
                className="absolute rounded-full"
                style={{
                  width: 56,
                  height: 56,
                  border: '0.5px solid rgba(255,255,255,0.15)',
                  animation: 'lex-orb-ring 3s ease-out infinite',
                }}
              />
              <span
                className="relative rounded-full"
                style={{
                  width: 22,
                  height: 22,
                  background: '#FAFAFA',
                  boxShadow: '0 0 32px rgba(255,255,255,0.6), 0 0 64px rgba(59,130,246,0.5)',
                }}
              />
            </div>
          </div>

          {/* Eyebrow */}
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.22em',
              color: '#9CA3AF',
            }}
          >
            ASISTENTE DIGITAL · BETA
          </p>

          {/* Headline */}
          <h2
            style={{
              fontFamily: 'Fraunces, Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(28px, 4vw, 36px)',
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#FAFAFA',
            }}
          >
            ¿Quieres que <em style={{ fontStyle: 'italic', color: '#3B82F6' }}>Lex</em> te guíe?
          </h2>

          {/* Subhead */}
          <p
            style={{
              fontSize: 'clamp(14px, 1.1vw, 15px)',
              lineHeight: 1.55,
              color: '#9CA3AF',
              maxWidth: 380,
              margin: '0 auto',
            }}
          >
            Lex es nuestro asistente digital. Te explica los servicios por voz, te
            muestra cómo funcionan, y te conecta con el equipo cuando estés listo.
            Solo necesita acceso a tu micrófono.
          </p>

          {/* Divisor */}
          <span
            aria-hidden
            className="block mx-auto"
            style={{
              width: 32,
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            }}
          />

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch pt-1">
            <button
              type="button"
              onClick={accept}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background: '#FAFAFA',
                color: '#0A0A0A',
                fontFamily: 'system-ui, sans-serif',
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: '-0.005em',
                boxShadow: '0 12px 40px rgba(255,255,255,0.18), 0 0 0 0.5px rgba(255,255,255,0.6) inset',
              }}
            >
              <IconMicLarge />
              Sí, guíame con Lex
            </button>

            <button
              type="button"
              onClick={decline}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full transition-all duration-300 hover:bg-white/5 active:scale-95"
              style={{
                background: 'transparent',
                color: '#D1D5DB',
                border: '0.5px solid rgba(255,255,255,0.18)',
                fontFamily: 'system-ui, sans-serif',
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: '-0.005em',
              }}
            >
              No, prefiero explorar
            </button>
          </div>

          {/* Fine print */}
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              letterSpacing: '0.2em',
              color: '#4B5563',
              paddingTop: 8,
            }}
          >
            TRANSCRIPCIÓN ANÓNIMA PARA MEJORAR EL SERVICIO · ESPAÑOL
          </p>
        </div>
      </div>

      <style>{`
        @keyframes lex-modal-bg {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes lex-modal-pop {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes lex-orb-pulse-modal {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.2); }
        }
        @keyframes lex-orb-ring {
          0% { transform: scale(0.9); opacity: 0.6; }
          80% { opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </div>,
    document.body,
  )
}

function IconMicLarge() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
    </svg>
  )
}
