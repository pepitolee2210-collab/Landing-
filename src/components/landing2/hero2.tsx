'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { SITE } from '@/lib/site'
import { whatsappUrl } from '@/lib/utils'

export function Hero2() {
  return (
    <section className="l2-aurora l2-aurora-hero relative pt-8 md:pt-16 pb-14 md:pb-24">
      {/* Capa atmosférica vidrio */}
      <div className="l2-aurora-layer">
        <span className="l2-orb l2-orb-1" />
        <span className="l2-orb l2-orb-2" />
        <span className="l2-orb l2-orb-3" />
        <div className="l2-glass-refract" />
        <div className="l2-noise" />
      </div>
      <div aria-hidden className="absolute inset-0 l2-grid-bg opacity-50 pointer-events-none" />

      <div className="l2-container relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* ── Izquierda: copy compacto ── */}
          <div className="lg:col-span-6 order-1">
            <span
              className="l2-chip l2-chip-green mb-5 md:mb-6 l2-rise"
              style={{ animationDelay: '0s' }}
            >
              <span className="l2-pulse" />
              Pioneros en tecnología migratoria · USA
            </span>

            <h1
              className="l2-display l2-rise text-[var(--c-fg)]"
              style={{
                fontSize: 'clamp(1.85rem, 4.8vw, 3.75rem)',
                lineHeight: 1.05,
                animationDelay: '0.1s',
              }}
            >
              Deja de pagar miles
              <br />
              a un <TypewriterRotating />.
              <br />
              Hazlo tú desde{' '}
              <span style={{ color: 'var(--c-blue)' }}>tu celular</span>.
            </h1>

            <p
              className="l2-rise mt-5 md:mt-6 text-base md:text-lg max-w-lg leading-relaxed"
              style={{ animationDelay: '0.22s' }}
            >
              <ShimmerSubtitle />
            </p>

            <div
              className="l2-rise mt-6 md:mt-7 flex flex-col sm:flex-row gap-2.5 sm:gap-3"
              style={{ animationDelay: '0.34s' }}
            >
              <span
                className="cta-wave-wrapper w-full sm:w-auto inline-block"
                style={{ ['--cta-wave-delay' as never]: '3.85s' }}
              >
                <Link
                  href="#productos"
                  className="l2-btn l2-btn-blue cta-wave-target text-sm md:text-base px-6 py-3.5 w-full sm:w-auto"
                >
                  Empezar mi caso
                  <ArrowRight />
                </Link>
              </span>
              <span
                className="cta-wave-wrapper w-full sm:w-auto inline-block"
                style={{ ['--cta-wave-delay' as never]: '4.05s' }}
              >
                <a
                  href={whatsappUrl(SITE.contact.whatsapp, 'Hola, vi su web. Quiero saber si califico para una visa.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="l2-btn l2-btn-ghost cta-wave-target text-sm md:text-base px-6 py-3.5 w-full sm:w-auto"
                >
                  <WhatsappIcon />
                  Pregunta si calificas
                </a>
              </span>
            </div>

            <div
              className="l2-rise mt-7 md:mt-8 flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-2 text-xs md:text-sm"
              style={{ animationDelay: '0.46s' }}
            >
              <span className="inline-flex items-center gap-1.5">
                <Stars />
                <strong className="text-[var(--c-fg)]">4.9</strong>
                <span className="text-[var(--c-fg-3)]">en 400+</span>
              </span>
              <span className="h-3 w-px bg-[var(--c-line-3)] hidden sm:block" />
              <span className="text-[var(--c-fg-2)]">
                <strong className="text-[var(--c-fg)]">9 países</strong>
              </span>
              <span className="h-3 w-px bg-[var(--c-line-3)] hidden sm:block" />
              <span className="text-[var(--c-fg-2)]">
                <strong className="text-[var(--c-fg)]">24/7</strong> portal
              </span>
            </div>
          </div>

          {/* ── Derecha: VIDEO/IMAGEN SLOT + mini cards ── */}
          <div className="lg:col-span-6 order-2 relative">
            <VideoHeroStack />
          </div>
        </div>
      </div>
    </section>
  )
}

function VideoHeroStack() {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Pause cuando offscreen para liberar CPU/GPU del decoder
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {})
        } else {
          v.pause()
        }
      },
      { threshold: 0.15 }
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <div className="relative">
      <div
        className="l2-rise relative aspect-[5/4] sm:aspect-video w-full rounded-2xl overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, rgba(91,155,255,0.18) 0%, rgba(255,77,109,0.06) 60%, var(--c-carbon-2) 100%)',
          border: '1px solid var(--c-line-3)',
          animationDelay: '0.5s',
          boxShadow: '0 36px 80px -24px rgba(0,0,0,0.6), 0 0 0 1px rgba(91,155,255,0.16)',
        }}
      >
        {/* Video hero — autoplay solo cuando visible (IntersectionObserver) */}
        <video
          ref={videoRef}
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          aria-label="UsaLatinoPrime · video del equipo"
        />

        {/* Vignette + leve oscurecimiento para legibilidad de los badges */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,10,10,0.35) 0%, transparent 25%, transparent 70%, rgba(10,10,10,0.45) 100%)',
          }}
        />

      </div>

      <SuccessLiveCard />
      <StatsLiveCard />
    </div>
  )
}

/* ════════════════════════════════════════════════
   LIVE ACTIVITY CARDS — rotativas con datos reales
   iOS-style notification cards con micro-animations
   ════════════════════════════════════════════════ */

function SuccessLiveCard() {
  return (
    <div
      className="absolute -bottom-4 -left-2 sm:-bottom-6 sm:-left-12 md:-left-16 lg:-left-20 w-[120px] sm:w-[170px] l2-float l2-rise z-20"
      style={{ animationDelay: '0.8s' }}
    >
      {/* Card estática con borde sutil + glow respirando elegante */}
      <div
        className="relative rounded-lg sm:rounded-xl p-2 sm:p-2.5 card-breath-green"
        style={{
          background: 'rgba(15,15,18,0.92)',
          backdropFilter: 'blur(16px) saturate(140%)',
          border: '1px solid rgba(34,255,160,0.25)',
          boxShadow:
            '0 24px 48px -12px rgba(0,0,0,0.65), 0 0 0 1px rgba(34,255,160,0.08) inset, 0 1px 0 rgba(255,255,255,0.05) inset',
        }}
      >
          <div className="flex items-center gap-1 sm:gap-1.5 mb-1 sm:mb-1.5">
            <span
              className="w-4 h-4 sm:w-5 sm:h-5 rounded-md flex items-center justify-center flex-shrink-0 success-icon-pulse"
              style={{
                background: 'rgba(34,255,160,0.16)',
                border: '1px solid rgba(34,255,160,0.45)',
                boxShadow: '0 0 10px rgba(34,255,160,0.45)',
              }}
            >
              <svg width="9" height="9" className="sm:w-[11px] sm:h-[11px]" viewBox="0 0 16 16" fill="none" aria-hidden>
                <rect x="2" y="4" width="12" height="8" rx="1.5" stroke="var(--c-green)" strokeWidth="1.3" />
                <circle cx="5" cy="7.5" r="1" fill="var(--c-green)" />
                <path d="M8 7h4M8 9.5h3" stroke="var(--c-green)" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </span>
            <p
              className="font-mono text-[6.5px] sm:text-[8px] uppercase tracking-[0.13em] font-bold leading-tight"
              style={{ color: 'var(--c-green)' }}
            >
              GREEN CARD APROBADA
            </p>
          </div>
          <p
            className="l2-display text-[10px] sm:text-[12px] text-[var(--c-fg)]"
            style={{ fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.015em' }}
          >
            Sin pagar miles a un bufete.
          </p>
          <div className="mt-1 sm:mt-1.5 pt-1 sm:pt-1.5 border-t border-[var(--c-line-2)] flex items-center justify-between gap-1">
            <p className="font-mono text-[6.5px] sm:text-[7.5px] uppercase tracking-[0.08em]" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Sofía · Phoenix
            </p>
            <p
              className="font-mono text-[7px] sm:text-[8px] font-bold tabular-nums"
              style={{ color: 'var(--c-green)' }}
            >
              −$7.4k
            </p>
          </div>
      </div>
      <style jsx>{`
        .card-breath-green {
          animation: card-breath-green 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes card-breath-green {
          0%, 100% {
            box-shadow:
              0 24px 48px -12px rgba(0,0,0,0.65),
              0 0 0 1px rgba(34,255,160,0.08) inset,
              0 0 16px rgba(34,255,160,0.10);
          }
          50% {
            box-shadow:
              0 24px 48px -12px rgba(0,0,0,0.65),
              0 0 0 1px rgba(34,255,160,0.15) inset,
              0 0 28px rgba(34,255,160,0.25);
          }
        }
        .success-icon-pulse {
          animation: success-icon-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes success-icon-pulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.06); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.45; }
          50%      { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

function StatsLiveCard() {
  return (
    <div
      className="absolute -top-3 -right-2 sm:-top-5 sm:-right-10 md:-right-14 lg:-right-18 w-[100px] sm:w-[145px] l2-float l2-rise z-20"
      style={{ animationDelay: '1s', animationDuration: '5.4s' }}
    >
      <div
        className="relative rounded-lg sm:rounded-xl p-2 sm:p-2.5 card-breath-blue"
        style={{
          background: 'rgba(15,15,18,0.92)',
          backdropFilter: 'blur(16px) saturate(140%)',
          border: '1px solid rgba(91,155,255,0.28)',
          boxShadow:
            '0 24px 48px -12px rgba(0,0,0,0.65), 0 0 0 1px rgba(91,155,255,0.08) inset, 0 1px 0 rgba(255,255,255,0.05) inset',
        }}
      >
          <div className="flex items-center gap-1 mb-0.5 sm:mb-1">
            <span
              className="w-1 h-1 rounded-full"
              style={{
                background: 'var(--c-blue)',
                boxShadow: '0 0 5px var(--c-blue)',
                animation: 'pulse-dot 1.4s ease-in-out infinite',
              }}
            />
            <span
              className="font-mono text-[6.5px] sm:text-[7.5px] uppercase tracking-[0.14em] font-bold"
              style={{ color: 'var(--c-blue-2)' }}
            >
              DATOS · 2026
            </span>
          </div>

          <div className="flex items-baseline gap-0.5">
            <span
              className="l2-display tabular-nums stat-shine"
              style={{
                fontSize: 'clamp(1.1rem, 4vw, 1.4rem)',
                fontWeight: 700,
                color: '#fff',
                lineHeight: 1,
                letterSpacing: '-0.04em',
              }}
            >
              98
            </span>
            <span
              className="l2-display"
              style={{
                fontSize: 'clamp(0.7rem, 2.5vw, 0.85rem)',
                fontWeight: 700,
                color: 'var(--c-blue-2)',
                letterSpacing: '-0.03em',
              }}
            >
              %
            </span>
          </div>
          <p className="font-mono text-[6.5px] sm:text-[7.5px] uppercase tracking-[0.1em] mt-0.5" style={{ color: 'rgba(255,255,255,0.65)' }}>
            casos firmados
          </p>
          <div className="mt-1 sm:mt-1.5 pt-1 sm:pt-1.5 border-t border-[var(--c-line-2)] flex items-center justify-between gap-1">
            <p className="font-mono text-[6.5px] sm:text-[7.5px] uppercase tracking-[0.08em]" style={{ color: 'rgba(255,255,255,0.45)' }}>
              ★ 4.9 / 5
            </p>
            <p className="font-mono text-[6px] sm:text-[7px] uppercase tracking-[0.08em]" style={{ color: 'var(--c-green)' }}>
              GOOGLE
            </p>
          </div>
      </div>
      <style jsx>{`
        .card-breath-blue {
          animation: card-breath-blue 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-delay: 1s;
        }
        @keyframes card-breath-blue {
          0%, 100% {
            box-shadow:
              0 24px 48px -12px rgba(0,0,0,0.65),
              0 0 0 1px rgba(91,155,255,0.08) inset,
              0 0 16px rgba(91,155,255,0.10);
          }
          50% {
            box-shadow:
              0 24px 48px -12px rgba(0,0,0,0.65),
              0 0 0 1px rgba(91,155,255,0.16) inset,
              0 0 28px rgba(91,155,255,0.28);
          }
        }
        .stat-shine {
          text-shadow: 0 0 18px rgba(91,155,255,0.55);
          animation: stat-shine 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes stat-shine {
          0%, 100% { text-shadow: 0 0 14px rgba(91,155,255,0.45); }
          50%      { text-shadow: 0 0 26px rgba(91,155,255,0.75), 0 0 6px rgba(255,255,255,0.3); }
        }
      `}</style>
    </div>
  )
}

function StoryIcon({ name, color }: { name: 'check' | 'card' | 'shield'; color: string }) {
  if (name === 'card') {
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
        <rect x="2" y="4" width="12" height="8" rx="1.5" stroke={color} strokeWidth="1.3" />
        <circle cx="5" cy="7.5" r="1" fill={color} />
        <path d="M8 7h4M8 9.5h3" stroke={color} strokeWidth="1" strokeLinecap="round" />
      </svg>
    )
  }
  if (name === 'shield') {
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M8 1.5l5.5 2.5v4c0 3.5-2.5 5.5-5.5 6.5-3-1-5.5-3-5.5-6.5v-4L8 1.5z" stroke={color} strokeWidth="1.3" />
        <path d="M5.5 8l2 2 3.5-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="6" stroke={color} strokeWidth="1.3" />
      <path d="M4 7l2 2 4-4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ════════════════════════════════════════════════
   SHIMMER SUBTITLE — letra por letra con onda de luz
   Render letter-by-letter con stagger delay; el wave
   recorre todo el texto en ~3.6s y repite en loop.
   ════════════════════════════════════════════════ */
const SUBTITLE_PARTS = [
  { text: 'Somos la ', strong: false },
  { text: 'primera plataforma de tecnología migratoria', strong: true },
  { text: ' para hispanohablantes en EE. UU. Visa Juvenil, Asilo, Green Card y más — tú llevas tu caso paso a paso al costo de una fracción de un bufete.', strong: false },
]

function ShimmerSubtitle() {
  const totalChars = SUBTITLE_PARTS.reduce((sum, p) => sum + p.text.length, 0)
  const delayRange = 3.6
  const perChar = delayRange / totalChars

  let charIdx = 0
  const fragments: React.ReactNode[] = []

  SUBTITLE_PARTS.forEach((part, partIdx) => {
    const tokens = part.text.split(/(\s+)/)
    tokens.forEach((token, tokenIdx) => {
      if (token.length === 0) return
      if (/^\s+$/.test(token)) {
        charIdx += token.length
        fragments.push(token)
        return
      }
      const wordChars = token.split('').map((ch) => {
        const delay = (charIdx++ * perChar).toFixed(3)
        return (
          <span
            key={charIdx}
            aria-hidden
            className={`shimmer-char ${part.strong ? 'shimmer-char-strong' : ''}`}
            style={{ animationDelay: `${delay}s` }}
          >
            {ch}
          </span>
        )
      })
      fragments.push(
        <span
          key={`w-${partIdx}-${tokenIdx}`}
          aria-hidden
          style={{ whiteSpace: 'nowrap' }}
        >
          {wordChars}
        </span>
      )
    })
  })

  return (
    <span aria-label={SUBTITLE_PARTS.map((p) => p.text).join('')}>
      {fragments}
    </span>
  )
}

/* ════════════════════════════════════════════════
   TYPEWRITER ROTATING — palabra cambiante cinematic
   ════════════════════════════════════════════════ */
const ROTATING_WORDS = [
  { text: 'bufete', gradient: 'linear-gradient(120deg, #ff4d6d 0%, #ff7a91 100%)' },
  { text: 'abogado', gradient: 'linear-gradient(120deg, #f2b234 0%, #ffd97f 100%)' },
  { text: 'notario', gradient: 'linear-gradient(120deg, #5b9bff 0%, #80b4ff 100%)' },
  { text: 'tramitador', gradient: 'linear-gradient(120deg, #ff4d6d 0%, #f2b234 100%)' },
  { text: 'intermediario', gradient: 'linear-gradient(120deg, #80b4ff 0%, #22ffa0 100%)' },
]

function TypewriterRotating() {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState(ROTATING_WORDS[0].text)
  const [phase, setPhase] = useState<'hold' | 'deleting' | 'pause' | 'typing'>('hold')
  const [showRipple, setShowRipple] = useState(false)
  const rippleKey = useRef(0)

  useEffect(() => {
    const word = ROTATING_WORDS[idx].text
    let timer: ReturnType<typeof setTimeout>

    if (phase === 'hold') {
      timer = setTimeout(() => setPhase('deleting'), 2800)
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), 55)
      } else {
        // Ripple al terminar de borrar
        rippleKey.current += 1
        setShowRipple(true)
        setTimeout(() => setShowRipple(false), 800)
        timer = setTimeout(() => setPhase('pause'), 380)
      }
    } else if (phase === 'pause') {
      timer = setTimeout(() => {
        setIdx((i) => (i + 1) % ROTATING_WORDS.length)
        setPhase('typing')
      }, 200)
    } else if (phase === 'typing') {
      const nextWord = ROTATING_WORDS[idx].text
      if (text.length < nextWord.length) {
        timer = setTimeout(() => setText(nextWord.slice(0, text.length + 1)), 78)
      } else {
        timer = setTimeout(() => setPhase('hold'), 200)
      }
    }
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, text, idx])

  const current = ROTATING_WORDS[idx]

  return (
    <span className="relative" style={{ display: 'inline', whiteSpace: 'normal' }}>
      {text.length > 0 && (
        <span
          className="hero-shimmer"
          style={{
            backgroundImage: current.gradient,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            whiteSpace: 'pre',
          }}
        >
          {text}
        </span>
      )}
      <span className="hero-cursor" aria-hidden />
      {showRipple && (
        <span
          key={rippleKey.current}
          aria-hidden
          className="hero-ripple absolute pointer-events-none rounded-full"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120px',
            height: '120px',
            background: 'radial-gradient(circle, rgba(91,155,255,0.45) 0%, transparent 70%)',
            filter: 'blur(6px)',
          }}
        />
      )}
      <span className="sr-only">{ROTATING_WORDS.map((w) => w.text).join(', ')}.</span>
    </span>
  )
}

function Stars() {
  return (
    <div className="flex items-center gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 12 12" fill="var(--c-green)" aria-hidden>
          <path d="M6 1l1.5 3.4 3.5.3-2.6 2.4.8 3.4L6 8.7 2.8 10.5l.8-3.4-2.6-2.4 3.5-.3L6 1z" />
        </svg>
      ))}
    </div>
  )
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M4 10h12m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

function PlayCircle() {
  return (
    <svg width="56" height="56" viewBox="0 0 64 64" fill="none" aria-hidden>
      <circle cx="32" cy="32" r="28" stroke="rgba(91,155,255,0.55)" strokeWidth="1.4" fill="rgba(91,155,255,0.10)" />
      <path d="M26 22l16 10-16 10V22z" fill="var(--c-blue)" />
    </svg>
  )
}

function CheckMini() {
  return (
    <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M3 7l3 3 5-6" stroke="var(--c-green)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
