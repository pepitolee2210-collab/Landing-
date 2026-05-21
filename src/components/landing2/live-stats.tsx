'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * LiveStats v2 — Editorial polish
 * - Header editorial coherente (kicker hairline + headline italic accent + meta)
 * - Halftone bg (mismo lenguaje del resto)
 * - Live chip Liquid Glass (frosted pill con dot pulsante)
 * - 4 stats con counter animado + bump live ocasional en "Familias"
 * - Hairlines verticales entre stats (desktop)
 * - Stagger-fade entry al entrar viewport
 * - Tipografía Bricolage wdth 92 elevada
 */

interface Stat {
  value: number
  label: string
  suffix?: string
  prefix?: string
  decimals?: number
  /** Se incrementa solo si es +1 ocasional */
  live?: boolean
}

const STATS: Stat[] = [
  { value: 433, label: 'Familias con plan activo', suffix: '+', live: true },
  { value: 9, label: 'Tipos de trámite' },
  { value: 4.9, label: 'Estrellas en Google', decimals: 1, suffix: ' / 5' },
  { value: 24, label: 'Portal abierto', suffix: '/7' },
]

export function LiveStats() {
  return (
    <section className="ls-section relative py-14 md:py-16 overflow-hidden">
      {/* Halftone bg coherente */}
      <div aria-hidden className="ls-dotmatrix" />

      <div className="l2-container relative">
        {/* Live chip compacto centrado — único header */}
        <div className="text-center mb-10 md:mb-12">
          <span className="ls-live-chip">
            <span aria-hidden className="ls-live-dot" />
            UsaLatinoPrime · En vivo
          </span>
        </div>

        {/* Stats grid con hairline separators */}
        <div className="ls-grid">
          {STATS.map((s, i) => (
            <Counter key={s.label} stat={s} index={i} />
          ))}
        </div>
      </div>

      <Styles />
    </section>
  )
}

function Counter({ stat, index }: { stat: Stat; index: number }) {
  const [display, setDisplay] = useState(0)
  const [flash, setFlash] = useState(false)
  const [bumpValue, setBumpValue] = useState(stat.value)
  const ref = useRef<HTMLDivElement | null>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started.current) {
            started.current = true
            animateTo(bumpValue)
            break
          }
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!stat.live) return
    const id = setInterval(
      () => {
        setBumpValue((v) => v + 1)
      },
      28000 + Math.random() * 12000
    )
    return () => clearInterval(id)
  }, [stat.live])

  useEffect(() => {
    if (!started.current) return
    if (bumpValue === stat.value) return
    setFlash(true)
    const start = display
    const target = bumpValue
    const dur = 600
    const t0 = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / dur)
      const eased = 1 - Math.pow(1 - k, 3)
      setDisplay(start + (target - start) * eased)
      if (k < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => setFlash(false), 350)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bumpValue])

  function animateTo(target: number) {
    const dur = 1600
    const t0 = performance.now()
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / dur)
      const eased = 1 - Math.pow(1 - k, 3)
      setDisplay(target * eased)
      if (k < 1) requestAnimationFrame(tick)
      else setDisplay(target)
    }
    requestAnimationFrame(tick)
  }

  const formatted = stat.decimals
    ? display.toFixed(stat.decimals)
    : Math.round(display).toLocaleString('en-US')

  return (
    <div
      ref={ref}
      className="ls-stat"
      style={{ animationDelay: `${0.15 + index * 0.1}s` }}
      data-flash={flash || undefined}
    >
      <div className="ls-stat-num-row">
        {stat.prefix && <span className="ls-stat-prefix">{stat.prefix}</span>}
        <span className="ls-stat-num">{formatted}</span>
        {stat.suffix && <span className="ls-stat-suffix">{stat.suffix}</span>}
      </div>
      <span className="ls-stat-label">{stat.label}</span>
      <span aria-hidden className="ls-stat-underline" />
    </div>
  )
}

function Styles() {
  return (
    <style jsx global>{`
      .ls-section {
        position: relative;
      }

      /* ── Halftone bg sutil ── */
      .ls-dotmatrix {
        position: absolute;
        inset: 0;
        background-image: radial-gradient(circle, rgba(200, 220, 255, 0.09) 1px, transparent 1.5px);
        background-size: 28px 28px;
        -webkit-mask: radial-gradient(
          ellipse 75% 65% at center,
          transparent 20%,
          rgba(0, 0, 0, 0.50) 60%,
          black 90%
        );
        mask: radial-gradient(
          ellipse 75% 65% at center,
          transparent 20%,
          rgba(0, 0, 0, 0.50) 60%,
          black 90%
        );
        pointer-events: none;
        z-index: 0;
      }

      /* Live chip Liquid Glass — único header */
      .ls-live-chip {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 14px 6px 11px;
        border-radius: 999px;
        background: rgba(34, 255, 160, 0.06);
        border: 1px solid rgba(34, 255, 160, 0.24);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10px;
        letter-spacing: 0.20em;
        text-transform: uppercase;
        font-weight: 600;
        color: #6effc7;
      }
      .ls-live-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--c-green);
        box-shadow: 0 0 8px var(--c-green), 0 0 14px rgba(34, 255, 160, 0.45);
        animation: ls-live-pulse 1.6s ease-in-out infinite;
      }
      @keyframes ls-live-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%      { opacity: 0.4; transform: scale(0.82); }
      }

      /* ── STATS GRID ── */
      .ls-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        max-width: 1100px;
        margin: 0 auto;
        position: relative;
        z-index: 2;
      }
      @media (max-width: 760px) {
        .ls-grid { grid-template-columns: repeat(2, 1fr); gap: 24px 0; }
      }

      .ls-stat {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 8px 20px;
        opacity: 0;
        transform: translateY(10px);
        animation: ls-stat-in 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      @keyframes ls-stat-in {
        from { opacity: 0; transform: translateY(10px); filter: blur(4px); }
        to   { opacity: 1; transform: translateY(0); filter: blur(0); }
      }

      /* Hairline vertical separator entre stats (desktop) */
      .ls-stat + .ls-stat::before {
        content: '';
        position: absolute;
        left: 0;
        top: 18%;
        bottom: 18%;
        width: 1px;
        background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.10), transparent);
      }
      @media (max-width: 760px) {
        .ls-stat + .ls-stat::before { display: none; }
      }

      /* Numero */
      .ls-stat-num-row {
        display: inline-flex;
        align-items: baseline;
        gap: 2px;
        line-height: 1;
      }
      .ls-stat-prefix {
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-size: 1.4rem;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.50);
      }
      .ls-stat-num {
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-size: clamp(2.4rem, 5vw, 4.4rem);
        font-weight: 500;
        line-height: 1;
        letter-spacing: -0.04em;
        color: rgba(255, 255, 255, 0.96);
        font-variant-numeric: tabular-nums;
        font-variation-settings: 'wdth' 92;
        transition: text-shadow 0.4s ease, color 0.4s ease;
      }
      .ls-stat[data-flash] .ls-stat-num {
        color: var(--c-green);
        text-shadow: 0 0 18px rgba(34, 255, 160, 0.55);
      }
      .ls-stat-suffix {
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-size: clamp(1.1rem, 2.2vw, 1.8rem);
        font-weight: 500;
        color: var(--c-blue-2, #a8c4ff);
        margin-left: 2px;
        font-variation-settings: 'wdth' 90;
      }

      /* Label */
      .ls-stat-label {
        margin-top: 12px;
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10.5px;
        font-weight: 500;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.50);
        line-height: 1.4;
        max-width: 14ch;
      }

      /* Underline hairline animado en flash */
      .ls-stat-underline {
        display: block;
        margin-top: 14px;
        width: 36px;
        height: 1px;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.18),
          transparent
        );
        transition: background 0.4s ease;
      }
      .ls-stat[data-flash] .ls-stat-underline {
        background: linear-gradient(90deg, transparent, var(--c-green), transparent);
        box-shadow: 0 0 8px rgba(34, 255, 160, 0.4);
      }

      @media (prefers-reduced-motion: reduce) {
        .ls-stat,
        .ls-live-dot { animation: none !important; }
      }
    `}</style>
  )
}
