'use client'

import { useEffect, useRef, useState } from 'react'
import { SITE } from '@/lib/site'
import { whatsappUrl } from '@/lib/utils'
import { getProductMedia } from '@/lib/product-media'
import { getProductCTA, type ProductCTA } from '@/lib/product-cta'
import type { Product } from '@/lib/products'

/* Social proof — clientes ficticios rotativos para el toast */
const SOCIAL_PROOF_NAMES = [
  { name: 'Carlos H.', city: 'Phoenix · AZ', mins: 2 },
  { name: 'María R.', city: 'Salt Lake City · UT', mins: 5 },
  { name: 'Ana G.', city: 'Newark · NJ', mins: 8 },
  { name: 'José L.', city: 'Houston · TX', mins: 11 },
  { name: 'Sofía R.', city: 'Charlotte · NC', mins: 14 },
  { name: 'Diego V.', city: 'Yonkers · NY', mins: 17 },
]
const TODAY_COUNT_BASE = 127

/**
 * ServiceModal — modal reutilizable que muestra el video de un servicio
 * y al terminar invita a comprar por WhatsApp con mensaje prefilled.
 *
 * Animaciones awwwards:
 * - Backdrop blur progresivo (0 → 24px)
 * - Content scale+blur entry con cubic-bezier(0.16, 1, 0.3, 1)
 * - Progress bar gradient azul→verde
 * - Ended overlay con confetti + stagger CTA
 * - Close button rotate al hover
 * - Esc cierra
 * - Click backdrop cierra
 */
interface ServiceModalProps {
  product: Product
  open: boolean
  onClose: () => void
}

export function ServiceModal({ product, open, onClose }: ServiceModalProps) {
  const media = getProductMedia(product.id)
  const cta = getProductCTA(product.id)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [progress, setProgress] = useState(0)
  const [ended, setEnded] = useState(false)

  useEffect(() => {
    if (!open) return
    setEnded(false)
    setProgress(0)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  function handleTimeUpdate() {
    const v = videoRef.current
    if (!v || !v.duration) return
    setProgress((v.currentTime / v.duration) * 100)
  }

  // Fallback: si no hay video o falla, mostrar ended overlay tras 3s
  useEffect(() => {
    if (!open) return
    if (!media.video) {
      const id = setTimeout(() => setEnded(true), 3000)
      return () => clearTimeout(id)
    }
  }, [open, media.video])

  // Cleanup del timer de fallback de error: si user cierra el modal
  // mientras el video falla, evitamos state update sobre componente
  // que ya devolvió null.
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    return () => {
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current)
    }
  }, [])

  function handleVideoError() {
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current)
    errorTimerRef.current = setTimeout(() => setEnded(true), 1200)
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Video de ${product.name}`}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-8 modal-fade"
    >
      <button
        type="button"
        aria-label="Cerrar modal"
        onClick={onClose}
        className="absolute inset-0 modal-backdrop"
        style={{
          background: 'rgba(0, 0, 0, 0.86)',
          backdropFilter: 'blur(24px) saturate(140%)',
        }}
      />

      <div className="relative w-full max-w-4xl modal-content">
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute -top-2 -right-2 md:-top-4 md:-right-4 z-30 w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-90 hover:scale-110"
          style={{
            background: 'rgba(20, 20, 20, 0.92)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--c-line-3)',
            color: '#fff',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'var(--c-carbon)',
            border: '1px solid var(--c-line-3)',
            boxShadow:
              '0 60px 120px -30px rgba(0,0,0,0.85), 0 0 0 1px rgba(91,155,255,0.18)',
          }}
        >
          <div className="relative aspect-video">
            {media.video ? (
              <video
                ref={videoRef}
                src={media.video}
                autoPlay
                playsInline
                preload="auto"
                controls={false}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setEnded(true)}
                onError={handleVideoError}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <VideoFallback name={product.name} />
            )}

            {/* Progress bar — top */}
            <div
              className="absolute top-0 left-0 right-0 h-1 z-10"
              style={{ background: 'rgba(255,255,255,0.10)' }}
            >
              <div
                className="h-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, var(--c-blue) 0%, var(--c-green) 100%)',
                  boxShadow: '0 0 12px rgba(91,155,255,0.5)',
                  transition: 'width 0.25s linear',
                }}
              />
            </div>

            {/* Title overlay */}
            <div
              className="absolute top-3 left-4 right-4 flex items-start justify-between gap-3 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, rgba(10,10,10,0.55) 0%, transparent 100%)',
                padding: '8px 8px 24px',
                margin: '-8px',
              }}
            >
              <div>
                <p
                  className="font-mono text-[9px] uppercase tracking-[0.18em] mb-1"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  UsaLatinoPrime · {Math.round(progress)}%
                </p>
                <p className="text-sm font-semibold text-white">{product.name}</p>
              </div>
              <span
                className="inline-flex items-center gap-1.5 px-2 py-1 rounded font-mono text-[9px] uppercase tracking-[0.12em]"
                style={{
                  background: 'rgba(10,10,10,0.65)',
                  backdropFilter: 'blur(8px)',
                  color: 'var(--c-green)',
                }}
              >
                <span className="l2-pulse" />
                30 SEG
              </span>
            </div>

            {ended && (
              <EndedOverlay
                cta={cta}
                whatsappMessage={media.whatsappMessage}
                onClose={onClose}
              />
            )}
          </div>

          {/* Footer permanente — solo cuando NO está el ended overlay */}
          {!ended && (
            <FooterCTA cta={cta} whatsappMessage={media.whatsappMessage} />
          )}
        </div>
      </div>

      <style jsx>{`
        .modal-fade {
          animation: fade-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .modal-backdrop {
          animation: backdrop-in 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes backdrop-in {
          from { opacity: 0; backdrop-filter: blur(0); }
          to { opacity: 1; backdrop-filter: blur(24px) saturate(140%); }
        }
        .modal-content {
          animation: modal-in 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes modal-in {
          0% {
            opacity: 0;
            transform: scale(0.92) translateY(28px);
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
        }
      `}</style>
    </div>
  )
}

/* ════════════════════════════════════════════════
   FOOTER CTA — botón SIEMPRE visible con neuromarketing
   ════════════════════════════════════════════════ */
function FooterCTA({
  cta,
  whatsappMessage,
}: {
  cta: ProductCTA
  whatsappMessage: string
}) {
  const btnRef = useRef<HTMLAnchorElement | null>(null)
  const [magnet, setMagnet] = useState({ x: 0, y: 0 })

  function handleMove(e: React.MouseEvent) {
    const r = btnRef.current?.getBoundingClientRect()
    if (!r) return
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    setMagnet({
      x: ((e.clientX - cx) / r.width) * 10,
      y: ((e.clientY - cy) / r.height) * 6,
    })
  }

  return (
    <div
      className="relative px-4 md:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 footer-cta-bg"
      style={{
        background: cta.isUrgent
          ? 'linear-gradient(90deg, rgba(255,77,109,0.10), var(--c-carbon-2) 50%)'
          : 'linear-gradient(90deg, rgba(37,211,102,0.04), var(--c-carbon-2) 60%)',
        borderTop: `1px solid ${cta.isUrgent ? 'rgba(255,77,109,0.25)' : 'rgba(37,211,102,0.18)'}`,
      }}
    >
      {/* Texto */}
      <div className="text-center sm:text-left flex-1 min-w-0">
        <p
          className="l2-display text-sm md:text-base text-[var(--c-fg)] mb-1"
          style={{ fontWeight: 700 }}
        >
          {cta.footerTitle}
        </p>
        <p className="text-xs text-[var(--c-fg-3)] flex items-center justify-center sm:justify-start gap-1.5">
          <span className="footer-pulse-dot" />
          {cta.footerSubtitle}
        </p>
      </div>

      {/* Botón con TODOS los efectos */}
      <div className="relative w-full sm:w-auto">
        {/* Halo respirante detrás */}
        <span
          aria-hidden
          className="absolute -inset-3 pointer-events-none rounded-2xl footer-halo"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(37,211,102,0.45) 0%, transparent 70%)',
            filter: 'blur(14px)',
          }}
        />

        {/* Ring pulse expandiendo cada 2.4s */}
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none rounded-xl footer-ring"
          style={{ border: '2px solid rgba(37,211,102,0.65)' }}
        />
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none rounded-xl footer-ring footer-ring-2"
          style={{ border: '2px solid rgba(37,211,102,0.45)' }}
        />

        <a
          ref={btnRef}
          href={whatsappUrl(SITE.contact.whatsapp, whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          onMouseMove={handleMove}
          onMouseLeave={() => setMagnet({ x: 0, y: 0 })}
          className="relative text-sm md:text-[15px] font-bold w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 md:py-4 rounded-xl footer-cta-btn footer-shimmer"
          style={{
            background: 'linear-gradient(135deg, #25d366 0%, #1eb558 100%)',
            color: '#002b16',
            transform: `translate(${magnet.x}px, ${magnet.y}px)`,
            boxShadow: cta.isUrgent
              ? '0 16px 36px -10px rgba(255,77,109,0.55), 0 0 0 2px rgba(255,77,109,0.20), inset 0 1px 0 rgba(255,255,255,0.4), 0 0 32px rgba(37,211,102,0.45)'
              : '0 16px 36px -10px rgba(37,211,102,0.65), 0 0 0 2px rgba(37,211,102,0.20), inset 0 1px 0 rgba(255,255,255,0.4), 0 0 32px rgba(37,211,102,0.35)',
            transition:
              'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease, filter 0.3s ease',
          }}
        >
          <span className="relative z-10 flex items-center gap-2.5">
            <span className="relative">
              <WhatsappIconLarge />
              <span aria-hidden className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full footer-icon-dot" style={{ background: '#fff' }} />
            </span>
            {cta.footerButton}
            <span className="footer-arrow-tick">
              <ArrowRightStrong />
            </span>
          </span>
        </a>
      </div>

      <style jsx>{`
        /* Atmósfera del footer entera */
        .footer-cta-bg {
          position: relative;
        }
        .footer-cta-bg::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(37,211,102,0.55), transparent);
          animation: footer-line-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes footer-line-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }

        /* Texto: pulse-dot al lado del subtitle */
        .footer-pulse-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--c-green);
          box-shadow: 0 0 8px var(--c-green);
          animation: dot-pulse 1.6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes dot-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); box-shadow: 0 0 14px var(--c-green); }
        }

        /* Halo respirante 70 BPM */
        .footer-halo {
          animation: footer-halo-breathe 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes footer-halo-breathe {
          0%, 100% { opacity: 0.6; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.08); }
        }

        /* Ring pulse expandiendo */
        .footer-ring {
          opacity: 0;
          animation: footer-ring-expand 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .footer-ring-2 {
          animation-delay: 1.2s;
        }
        @keyframes footer-ring-expand {
          0% { opacity: 0.8; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.18); }
        }

        /* CTA button physics */
        .footer-cta-btn {
          will-change: transform, filter;
        }
        .footer-cta-btn:hover {
          filter: brightness(1.08) saturate(1.1);
        }
        .footer-cta-btn:active {
          transform: scale(0.95) !important;
          transition: transform 0.15s ease-out !important;
        }

        /* Shimmer cyclic — cada 3s */
        .footer-shimmer {
          position: relative;
          overflow: hidden;
        }
        .footer-shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%);
          transform: translateX(-130%);
          animation: footer-shimmer 3s cubic-bezier(0.16, 1, 0.3, 1) infinite;
          animation-delay: 0.8s;
          pointer-events: none;
        }
        @keyframes footer-shimmer {
          0% { transform: translateX(-130%); }
          55%, 100% { transform: translateX(130%); }
        }

        /* Dot blanco en el ícono WhatsApp — notification feel */
        .footer-icon-dot {
          animation: icon-dot-pulse 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes icon-dot-pulse {
          0%, 100% { opacity: 0; transform: scale(0.7); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        /* Arrow tick — invita al click */
        .footer-arrow-tick {
          display: inline-flex;
          animation: arrow-tick 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes arrow-tick {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
      `}</style>
    </div>
  )
}

/* ════════════════════════════════════════════════
   ENDED OVERLAY — CTA dramático con confetti
   ════════════════════════════════════════════════ */
function EndedOverlay({
  cta,
  whatsappMessage,
  onClose,
}: {
  cta: ProductCTA
  whatsappMessage: string
  onClose: () => void
}) {
  const accentVar =
    cta.accentColor === 'red'
      ? 'var(--c-red)'
      : cta.accentColor === 'green'
        ? 'var(--c-green)'
        : cta.accentColor === 'gold'
          ? 'var(--c-gold)'
          : 'var(--c-blue)'
  const accentRgb =
    cta.accentColor === 'red'
      ? '255,77,109'
      : cta.accentColor === 'green'
        ? '34,255,160'
        : cta.accentColor === 'gold'
          ? '242,178,52'
          : '91,155,255'

  // Social proof toast rotativo
  const [proofIdx, setProofIdx] = useState(0)
  const [todayCount, setTodayCount] = useState(TODAY_COUNT_BASE)
  useEffect(() => {
    const id = setInterval(() => {
      setProofIdx((i) => (i + 1) % SOCIAL_PROOF_NAMES.length)
    }, 4200)
    const id2 = setInterval(() => {
      setTodayCount((c) => c + 1)
    }, 9000)
    return () => {
      clearInterval(id)
      clearInterval(id2)
    }
  }, [])
  const proof = SOCIAL_PROOF_NAMES[proofIdx]

  // Cursor magnetic pull
  const btnRef = useRef<HTMLAnchorElement | null>(null)
  const [magnet, setMagnet] = useState({ x: 0, y: 0 })
  function handleBtnMove(e: React.MouseEvent) {
    const r = btnRef.current?.getBoundingClientRect()
    if (!r) return
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const dx = (e.clientX - cx) / r.width
    const dy = (e.clientY - cy) / r.height
    setMagnet({ x: dx * 8, y: dy * 6 })
  }

  return (
    <div
      className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-3 py-4 sm:p-5 md:p-6 ended-overlay overflow-y-auto"
      style={{
        background:
          'radial-gradient(ellipse at center, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.97) 75%)',
      }}
    >
      {/* Layered atmospheric glows behind everything */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none atmospheric-pulse"
        style={{
          background: `radial-gradient(circle at center 70%, rgba(37,211,102,0.18) 0%, transparent 55%)`,
        }}
      />

      {/* Confetti */}
      {Array.from({ length: 16 }).map((_, i) => (
        <span
          key={i}
          className="confetti-end"
          style={{
            left: `${(i * 9 + 7) % 100}%`,
            background:
              i % 3 === 0 ? 'var(--c-blue)' : i % 3 === 1 ? 'var(--c-green)' : 'var(--c-red)',
            animationDelay: `${i * 0.07}s`,
            width: i % 4 === 0 ? '6px' : '4px',
            height: i % 4 === 0 ? '8px' : '5px',
          }}
        />
      ))}

      {/* Social proof toast — desktop only (en mobile lo ocultamos para no colisionar) */}
      <div
        key={proofIdx}
        className="hidden md:flex absolute top-4 left-4 items-center gap-2 px-2.5 py-1.5 rounded-lg backdrop-blur z-30 toast-in"
        style={{
          background: 'rgba(20,20,20,0.85)',
          border: '1px solid rgba(34,255,160,0.30)',
          boxShadow: '0 12px 24px -8px rgba(0,0,0,0.6)',
          maxWidth: '240px',
        }}
      >
        <span className="l2-pulse flex-shrink-0" style={{ background: 'var(--c-green)' }} />
        <span
          className="font-mono text-[10px] truncate"
          style={{ color: 'rgba(255,255,255,0.85)' }}
        >
          <strong style={{ color: '#fff' }}>{proof.name}</strong> · {proof.city} ·
          <span style={{ color: 'var(--c-green)' }}> hace {proof.mins} min</span>
        </span>
      </div>

      {/* Live counter — desktop arriba derecha · mobile abajo de chip */}
      <div
        className="hidden md:flex absolute top-4 right-4 items-center gap-2 px-2.5 py-1.5 rounded-lg backdrop-blur z-30 stagger"
        style={{
          background: 'rgba(20,20,20,0.85)',
          border: '1px solid rgba(255,255,255,0.10)',
          ['--d' as never]: '0.1s',
        }}
      >
        <span
          className="font-mono text-[11px] font-bold tabular-nums counter-flash"
          style={{ color: 'var(--c-green)' }}
          key={todayCount}
        >
          {todayCount}
        </span>
        <span
          className="font-mono text-[9px] uppercase tracking-[0.1em]"
          style={{ color: 'rgba(255,255,255,0.55)' }}
        >
          consultas hoy
        </span>
      </div>

      {/* Chip emocional */}
      <div
        className="stagger inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full mb-2 sm:mb-3 max-w-full"
        style={{
          background: `rgba(${accentRgb}, 0.12)`,
          border: `1px solid rgba(${accentRgb}, 0.35)`,
          ['--d' as never]: '0.2s',
        }}
      >
        {cta.isUrgent ? (
          <span className="l2-pulse flex-shrink-0" style={{ background: 'var(--c-red)' }} />
        ) : (
          <span className="l2-pulse flex-shrink-0" />
        )}
        <span
          className="font-mono text-[8.5px] sm:text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.18em] font-bold truncate"
          style={{ color: accentVar }}
        >
          {cta.endedChip}
        </span>
      </div>

      {/* Avatar Vanessa */}
      <div className="stagger mb-2 sm:mb-3" style={{ ['--d' as never]: '0.35s' }}>
        <div
          className="w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center relative mx-auto avatar-pulse"
          style={{
            background: `linear-gradient(135deg, rgba(${accentRgb},0.30), rgba(${accentRgb},0.10))`,
            border: `2px solid ${accentVar}`,
            boxShadow: `0 0 0 5px rgba(${accentRgb},0.10), 0 18px 36px -8px rgba(${accentRgb},0.45)`,
          }}
        >
          <span
            className="l2-display text-[13px] sm:text-[16px]"
            style={{ fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}
          >
            {cta.advisorInitials}
          </span>
          <span
            aria-hidden
            className="absolute bottom-0 right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full online-glow"
            style={{
              background: 'var(--c-green)',
              border: '2px solid #0a0a0a',
            }}
          />
          <span
            aria-hidden
            className="absolute inset-0 rounded-full pointer-events-none avatar-ring"
            style={{ border: `2px solid ${accentVar}` }}
          />
          <span
            aria-hidden
            className="absolute inset-0 rounded-full pointer-events-none avatar-ring-2"
            style={{ border: `1.5px solid ${accentVar}` }}
          />
        </div>
        <p
          className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em]"
          style={{ color: 'rgba(255,255,255,0.65)' }}
        >
          {cta.advisorName} · <span style={{ color: 'var(--c-green)' }}>En línea ahora</span>
        </p>
        <p
          className="font-mono text-[9px] uppercase tracking-[0.1em]"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          {cta.advisorRole}
        </p>
      </div>

      {/* Headline psicológico */}
      <h3
        className="l2-display text-white mb-2 stagger px-2"
        style={{
          fontSize: 'clamp(1.05rem, 4.2vw, 2.4rem)',
          letterSpacing: '-0.025em',
          lineHeight: 1.08,
          ['--d' as never]: '0.5s',
        }}
      >
        {cta.endedHeadlineStart}{' '}
        <span style={{ color: accentVar, fontStyle: 'italic' }}>
          {cta.endedHeadlineHighlight}
        </span>
        {cta.endedHeadlineEnd}
      </h3>

      {/* Descripción específica */}
      <p
        className="text-[11px] sm:text-[13px] md:text-sm text-[var(--c-fg-2)] mb-3 sm:mb-4 max-w-md stagger leading-relaxed px-1 sm:px-0"
        style={{ ['--d' as never]: '0.65s' }}
      >
        {cta.endedDescription}
      </p>

      {/* Arrow apuntando al CTA */}
      <div
        className="stagger mb-2 arrow-bounce"
        style={{ ['--d' as never]: '0.8s' }}
        aria-hidden
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 3v14M5 12l5 5 5-5"
            stroke="rgba(37,211,102,0.55)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* CTA principal WhatsApp con efectos neuromarketing */}
      <div
        className="relative flex flex-col items-center justify-center gap-2 w-full max-w-md stagger"
        style={{ ['--d' as never]: '0.85s' }}
      >
        {/* Halo respirante detrás del botón */}
        <span
          aria-hidden
          className="absolute inset-x-0 -inset-y-3 pointer-events-none rounded-2xl breathing-halo"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(37,211,102,0.35) 0%, transparent 70%)',
            filter: 'blur(16px)',
          }}
        />

        {/* Ring expandiendo cada 2s */}
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none rounded-xl cta-ring"
          style={{ border: '2px solid rgba(37,211,102,0.55)' }}
        />
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none rounded-xl cta-ring cta-ring-2"
          style={{ border: '2px solid rgba(37,211,102,0.45)' }}
        />

        {/* Particles ascendiendo desde el botón */}
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            aria-hidden
            className={`absolute bottom-4 cta-particle particle-${i}`}
            style={{
              left: `${20 + i * 15}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}

        <a
          ref={btnRef}
          href={whatsappUrl(SITE.contact.whatsapp, whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          onMouseMove={handleBtnMove}
          onMouseLeave={() => setMagnet({ x: 0, y: 0 })}
          className="relative text-sm md:text-base font-bold w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl cta-button shimmer-cta"
          style={{
            background:
              'linear-gradient(135deg, #25d366 0%, #1eb558 100%)',
            color: '#002b16',
            transform: `translate(${magnet.x}px, ${magnet.y}px)`,
            boxShadow: cta.isUrgent
              ? '0 24px 48px -12px rgba(255,77,109,0.55), 0 0 0 3px rgba(255,77,109,0.20), inset 0 1px 0 rgba(255,255,255,0.4)'
              : '0 24px 48px -12px rgba(37,211,102,0.65), 0 0 0 3px rgba(37,211,102,0.15), inset 0 1px 0 rgba(255,255,255,0.4)',
            transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease',
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <WhatsappIconLarge />
            {cta.endedButton}
            <ArrowRightStrong />
          </span>
        </a>

        <p
          className="mt-1 font-mono text-[9px] uppercase tracking-[0.15em]"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          ⏱ Respuesta promedio: <strong style={{ color: 'var(--c-green)' }}>3 min 47 seg</strong>
        </p>
      </div>

      {/* Trust pills */}
      {cta.endedTrustPills && (
        <div
          className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 stagger"
          style={{ ['--d' as never]: '1s' }}
        >
          {cta.endedTrustPills.map((pill, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] trust-pill"
              style={{
                color: 'rgba(255,255,255,0.65)',
                animationDelay: `${1 + i * 0.15}s`,
              }}
            >
              <CheckMini />
              {pill}
            </span>
          ))}
        </div>
      )}

      <button
        onClick={onClose}
        className="mt-4 text-[10px] text-[var(--c-fg-3)] hover:text-[var(--c-fg)] transition-colors stagger uppercase tracking-[0.15em]"
        style={{ ['--d' as never]: '1s' }}
      >
        Volver al catálogo
      </button>

      <style jsx>{`
        .ended-overlay {
          animation: end-fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
          backdrop-filter: blur(0);
        }
        @keyframes end-fade-in {
          from { opacity: 0; backdrop-filter: blur(0); }
          to { opacity: 1; backdrop-filter: blur(8px); }
        }

        /* Atmospheric pulse — respiración 70 BPM ≈ ritmo cardíaco */
        .atmospheric-pulse {
          animation: atm-pulse 4.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes atm-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        .stagger {
          opacity: 0;
          transform: translateY(14px);
          animation: stagger-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) var(--d) forwards;
        }
        @keyframes stagger-up {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Toast social proof entry */
        .toast-in {
          opacity: 0;
          animation: toast-in 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s forwards;
        }
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(-10px) scale(0.94); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Counter flash — cada que sube +1 */
        .counter-flash {
          animation: counter-flash 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes counter-flash {
          0% { transform: scale(1); color: var(--c-green); }
          30% { transform: scale(1.3); color: #fff; text-shadow: 0 0 12px var(--c-green); }
          100% { transform: scale(1); color: var(--c-green); }
        }

        .confetti-end {
          position: absolute;
          top: 18%;
          border-radius: 1px;
          animation: end-fall 2.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes end-fall {
          0% { opacity: 0; transform: translateY(0) rotate(0) scale(0); }
          15% { opacity: 1; transform: translateY(-20px) rotate(120deg) scale(1); }
          100% { opacity: 0; transform: translateY(300px) rotate(540deg) scale(1); }
        }

        /* Avatar 2 anillos sincronizados */
        .avatar-pulse {
          animation: avatar-breathe 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes avatar-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        .avatar-ring {
          opacity: 0.5;
          animation: ring-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .avatar-ring-2 {
          animation: ring-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) 1s infinite;
        }
        @keyframes ring-pulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        .online-glow {
          animation: online-glow 1.4s ease-in-out infinite;
        }
        @keyframes online-glow {
          0%, 100% { box-shadow: 0 0 8px rgba(34,255,160,0.6); }
          50% { box-shadow: 0 0 16px rgba(34,255,160,1), 0 0 32px rgba(34,255,160,0.4); }
        }

        /* Arrow bounce — hacia el CTA */
        .arrow-bounce {
          animation: arrow-down 1.4s cubic-bezier(0.4, 0, 0.6, 1) 1.2s infinite;
        }
        @keyframes arrow-down {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(6px); opacity: 1; }
        }

        /* CTA — Breathing halo detrás */
        .breathing-halo {
          opacity: 0.7;
          animation: halo-breathe 2.6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes halo-breathe {
          0%, 100% { opacity: 0.5; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.08); }
        }

        /* CTA — Rings expandiendo cada 2s */
        .cta-ring {
          opacity: 0;
          animation: cta-ring-expand 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .cta-ring-2 {
          animation: cta-ring-expand 2.4s cubic-bezier(0.4, 0, 0.6, 1) 1.2s infinite;
        }
        @keyframes cta-ring-expand {
          0% { opacity: 0.8; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.15); }
        }

        /* Particles ascendiendo */
        .cta-particle {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--c-green);
          opacity: 0;
          animation: particle-rise 2.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          box-shadow: 0 0 8px rgba(37,211,102,0.8);
        }
        @keyframes particle-rise {
          0% { opacity: 0; transform: translateY(0) scale(0); }
          15% { opacity: 1; transform: translateY(-20px) scale(1); }
          100% { opacity: 0; transform: translateY(-120px) scale(0.4); }
        }

        /* CTA button — interactions */
        .cta-button {
          will-change: transform;
        }
        .cta-button:hover {
          filter: brightness(1.05);
        }
        .cta-button:active {
          transform: scale(0.97) !important;
          transition: transform 0.15s ease-out !important;
        }

        /* Shimmer cyclic en el CTA */
        .shimmer-cta {
          position: relative;
          overflow: hidden;
        }
        .shimmer-cta::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%);
          transform: translateX(-120%);
          animation: cta-shimmer 3.2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
          animation-delay: 1.4s;
          pointer-events: none;
        }
        @keyframes cta-shimmer {
          0% { transform: translateX(-120%); }
          50%, 100% { transform: translateX(120%); }
        }

        /* Trust pills entry escalonada */
        .trust-pill {
          opacity: 0;
          animation: trust-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes trust-in {
          to { opacity: 1; }
        }

        /* Shimmer-btn original (sigue funcionando para footer btn) */
        .shimmer-btn {
          position: relative;
          overflow: hidden;
        }
        .shimmer-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%);
          transform: translateX(-120%);
          animation: btn-shimmer 2.6s cubic-bezier(0.16, 1, 0.3, 1) infinite;
          animation-delay: 1s;
          pointer-events: none;
        }
        @keyframes btn-shimmer {
          0% { transform: translateX(-120%); }
          50%, 100% { transform: translateX(120%); }
        }
      `}</style>
    </div>
  )
}

function VideoFallback({ name }: { name: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6"
      style={{
        background:
          'linear-gradient(135deg, rgba(91,155,255,0.18) 0%, rgba(255,77,109,0.06) 60%, var(--c-carbon-2) 100%)',
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div
        className="relative w-16 h-16 rounded-full flex items-center justify-center"
        style={{
          background: 'rgba(91,155,255,0.12)',
          border: '1.5px solid rgba(91,155,255,0.4)',
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--c-blue)" aria-hidden>
          <path d="M7 4l13 8-13 8V4z" />
        </svg>
      </div>
      <p
        className="relative font-mono text-[10px] uppercase tracking-[0.22em]"
        style={{ color: 'rgba(255,255,255,0.55)' }}
      >
        Video próximamente
      </p>
      <p className="relative text-base text-white text-center max-w-md font-semibold">{name}</p>
    </div>
  )
}

function CheckMini() {
  return (
    <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M3 6l2 2 4-4" stroke="var(--c-green)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function WhatsappIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.03 2C6.5 2 2.04 6.45 2.04 11.95c0 1.96.57 3.78 1.56 5.31L2 22l4.93-1.57c1.46.8 3.13 1.26 4.95 1.26h.01c5.53 0 10.02-4.46 10.02-9.95C21.91 6.45 17.45 2 12.03 2z" />
    </svg>
  )
}

function WhatsappIconLarge() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.03 2C6.5 2 2.04 6.45 2.04 11.95c0 1.96.57 3.78 1.56 5.31L2 22l4.93-1.57c1.46.8 3.13 1.26 4.95 1.26h.01c5.53 0 10.02-4.46 10.02-9.95C21.91 6.45 17.45 2 12.03 2z" />
    </svg>
  )
}

function ArrowRightStrong() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4 10h12m0 0l-5-5m5 5l-5 5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4 10h12m0 0l-5-5m5 5l-5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
