'use client'

import { useEffect, useRef } from 'react'

/**
 * Features v2 — 4 razones para hacerlo tú
 * - Header editorial (kicker hairline + italic accent + meta inline)
 * - Cards = mini Liquid Glass (frosted + hairline + cursor spotlight + light beam)
 * - Stat oversize por card
 * - Halftone dot matrix bg con glow reactivo al cursor
 */

interface Feature {
  num: string
  pain: string
  stat: string
  unit: string
  solution: string
  color: 'blue' | 'green' | 'red' | 'gold'
}

const FEATURES: Feature[] = [
  {
    num: '01',
    pain: 'Rápido',
    stat: '4',
    unit: 'hrs',
    solution: 'Llenas tu caso en una tarde, no en meses.',
    color: 'blue',
  },
  {
    num: '02',
    pain: 'Accesible',
    stat: '$0',
    unit: '/hora',
    solution: 'Sin honorarios de miles de dólares de bufete.',
    color: 'green',
  },
  {
    num: '03',
    pain: 'Seguro de ganar',
    stat: '100%',
    unit: 'auditada',
    solution: 'Diseñada por abogados que sí ganan casos.',
    color: 'red',
  },
  {
    num: '04',
    pain: 'Exacto',
    stat: '0',
    unit: 'errores',
    solution: 'Validación automática antes de enviar a USCIS.',
    color: 'gold',
  },
]

export function Features() {
  const sectionRef = useRef<HTMLElement | null>(null)

  // Halftone dot matrix cursor spotlight
  useEffect(() => {
    const sec = sectionRef.current
    if (!sec) return
    let raf = 0
    function onMove(e: MouseEvent) {
      const r = sec!.getBoundingClientRect()
      const cx = e.clientX - r.left
      const cy = e.clientY - r.top
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        sec!.style.setProperty('--cx', `${cx}px`)
        sec!.style.setProperty('--cy', `${cy}px`)
      })
    }
    function onLeave() {
      sec!.style.setProperty('--cx', `-9999px`)
      sec!.style.setProperty('--cy', `-9999px`)
    }
    sec.addEventListener('mousemove', onMove)
    sec.addEventListener('mouseleave', onLeave)
    return () => {
      sec.removeEventListener('mousemove', onMove)
      sec.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="que-es"
      className="features-section relative py-20 md:py-28 overflow-hidden"
    >
      {/* Halftone dot matrix */}
      <div aria-hidden className="features-dotmatrix" />
      <div aria-hidden className="features-dotmatrix-glow" />

      <div className="l2-container relative">
        {/* Header editorial */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <div className="features-kicker">
            <span aria-hidden className="features-kicker-bar" />
            <span className="features-kicker-text">Por qué la plataforma</span>
            <span aria-hidden className="features-kicker-num">04</span>
          </div>

          <h2 className="features-headline">
            <span className="features-headline-line features-headline-1">
              4 razones para
            </span>
            <span className="features-headline-line features-headline-2">
              hacerlo <em>tú</em>.
            </span>
          </h2>

          <div aria-hidden className="features-divider" />

          <p className="features-meta">
            <span>Diseñada por abogados</span>
            <span className="features-meta-dot" />
            <span>hecha para tu celular</span>
            <span className="features-meta-dot" />
            <span>en español</span>
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {FEATURES.map((item, i) => (
            <FeatureCard key={i} feature={item} delay={i * 0.09} />
          ))}
        </div>
      </div>

      <Styles />
    </section>
  )
}

function FeatureCard({ feature, delay }: { feature: Feature; delay: number }) {
  const cardRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    function onMove(e: MouseEvent) {
      const r = card!.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width) * 100
      const y = ((e.clientY - r.top) / r.height) * 100
      card!.style.setProperty('--mx', `${x}%`)
      card!.style.setProperty('--my', `${y}%`)
    }
    function onLeave() {
      card!.style.setProperty('--mx', `50%`)
      card!.style.setProperty('--my', `50%`)
    }
    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className={`feature-card feature-card-${feature.color}`}
      style={{ animationDelay: `${delay}s` } as React.CSSProperties}
    >
      <span aria-hidden className="feature-card-hairline" />
      <span aria-hidden className="feature-card-spotlight" />
      <span aria-hidden className="feature-card-beam" />

      <div className="feature-card-inner">
        <div className="feature-card-top">
          <span className="feature-card-num">{feature.num}</span>
          <span className="feature-card-pain">{feature.pain.toUpperCase()}</span>
        </div>

        <div className="feature-card-stat-row">
          <span className="feature-card-stat">{feature.stat}</span>
          <span className="feature-card-unit">{feature.unit}</span>
        </div>

        <p className="feature-card-solution">{feature.solution}</p>
      </div>
    </div>
  )
}

function Styles() {
  return (
    <style jsx global>{`
      /* ─── HALFTONE DOT MATRIX bg ─── */
      .features-dotmatrix {
        position: absolute;
        inset: 0;
        background-image: radial-gradient(
          circle,
          rgba(200, 220, 255, 0.10) 1px,
          transparent 1.5px
        );
        background-size: 26px 26px;
        background-position: 0 0;
        -webkit-mask: radial-gradient(
          ellipse 80% 70% at center,
          transparent 18%,
          rgba(0, 0, 0, 0.55) 55%,
          black 85%
        );
        mask: radial-gradient(
          ellipse 80% 70% at center,
          transparent 18%,
          rgba(0, 0, 0, 0.55) 55%,
          black 85%
        );
        pointer-events: none;
        z-index: 0;
        animation: features-dot-fade-in 1.2s ease-out 0.1s both;
      }
      @keyframes features-dot-fade-in {
        from { opacity: 0; transform: scale(1.06); }
        to   { opacity: 1; transform: scale(1); }
      }
      .features-dotmatrix-glow {
        position: absolute;
        inset: 0;
        background-image: radial-gradient(
          circle,
          rgba(160, 200, 255, 0.55) 1.3px,
          transparent 1.8px
        );
        background-size: 26px 26px;
        background-position: 0 0;
        -webkit-mask: radial-gradient(
          circle 220px at var(--cx, -9999px) var(--cy, -9999px),
          black 0%,
          rgba(0, 0, 0, 0.6) 40%,
          transparent 75%
        );
        mask: radial-gradient(
          circle 220px at var(--cx, -9999px) var(--cy, -9999px),
          black 0%,
          rgba(0, 0, 0, 0.6) 40%,
          transparent 75%
        );
        pointer-events: none;
        z-index: 0;
        filter: drop-shadow(0 0 6px rgba(91, 155, 255, 0.25));
      }

      /* ─── HEADER editorial ─── */
      .features-kicker {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 14px;
        margin-bottom: 38px;
      }
      .features-kicker-bar {
        display: inline-block;
        width: 56px;
        height: 1px;
        background: rgba(255, 255, 255, 0.30);
        animation: features-kicker-bar-in 1s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      @keyframes features-kicker-bar-in {
        from { width: 0; opacity: 0; }
        to   { opacity: 1; }
      }
      .features-kicker-text {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10.5px;
        font-weight: 500;
        letter-spacing: 0.35em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.55);
      }
      .features-kicker-num {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10.5px;
        font-weight: 500;
        letter-spacing: 0.18em;
        color: rgba(255, 255, 255, 0.28);
        font-variant-numeric: tabular-nums;
      }
      .features-headline {
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-size: clamp(2.4rem, 5.8vw, 4.6rem);
        line-height: 0.96;
        letter-spacing: -0.045em;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.96);
        display: flex;
        flex-direction: column;
        font-variation-settings: 'wdth' 95;
      }
      .features-headline-line {
        display: block;
        animation: features-headline-in 0.95s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      .features-headline-1 { animation-delay: 0.05s; }
      .features-headline-2 {
        animation-delay: 0.18s;
        color: var(--c-blue);
      }
      .features-headline-2 em {
        font-style: italic;
        font-weight: 400;
        font-variation-settings: 'wdth' 90;
        margin: 0 -0.02em;
      }
      @keyframes features-headline-in {
        from { opacity: 0; transform: translateY(14px); filter: blur(6px); }
        to   { opacity: 1; transform: translateY(0); filter: blur(0); }
      }
      .features-divider {
        margin: 28px auto 18px;
        width: 32px;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent);
      }
      .features-meta {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 14px;
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 11px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.42);
        flex-wrap: wrap;
      }
      .features-meta-dot {
        width: 2px;
        height: 2px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.30);
      }

      /* ─── CARD · mini Liquid Glass ─── */
      .feature-card {
        position: relative;
        border-radius: 20px;
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.015) 100%),
          rgba(18, 18, 22, 0.55);
        backdrop-filter: blur(24px) saturate(140%);
        -webkit-backdrop-filter: blur(24px) saturate(140%);
        border: 1px solid rgba(255, 255, 255, 0.10);
        box-shadow:
          0 24px 50px -20px rgba(0, 0, 0, 0.45),
          0 1px 0 rgba(255, 255, 255, 0.07) inset;
        overflow: hidden;
        transition:
          transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
          border-color 0.4s ease,
          box-shadow 0.4s ease;
        animation: feature-card-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      @keyframes feature-card-in {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .feature-card:hover {
        transform: translateY(-4px);
        border-color: rgba(255, 255, 255, 0.18);
      }
      .feature-card-blue:hover  { box-shadow: 0 30px 60px -22px rgba(91, 155, 255, 0.35),  0 1px 0 rgba(255,255,255,0.10) inset; }
      .feature-card-green:hover { box-shadow: 0 30px 60px -22px rgba(34, 255, 160, 0.30),  0 1px 0 rgba(255,255,255,0.10) inset; }
      .feature-card-red:hover   { box-shadow: 0 30px 60px -22px rgba(255, 77, 109, 0.30),  0 1px 0 rgba(255,255,255,0.10) inset; }
      .feature-card-gold:hover  { box-shadow: 0 30px 60px -22px rgba(242, 178, 52, 0.32),  0 1px 0 rgba(255,255,255,0.10) inset; }

      /* Hairline arriba — el detalle Apple */
      .feature-card-hairline {
        position: absolute;
        top: 0;
        left: 12%;
        right: 12%;
        height: 1px;
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(255, 255, 255, 0.28) 50%,
          transparent 100%
        );
        pointer-events: none;
        z-index: 4;
      }

      /* Cursor spotlight individual */
      .feature-card-spotlight {
        position: absolute;
        inset: 0;
        border-radius: 20px;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1;
      }
      .feature-card:hover .feature-card-spotlight { opacity: 1; }
      .feature-card-blue  .feature-card-spotlight { background: radial-gradient(circle 220px at var(--mx, 50%) var(--my, 50%), rgba(91, 155, 255, 0.14) 0%, transparent 60%); }
      .feature-card-green .feature-card-spotlight { background: radial-gradient(circle 220px at var(--mx, 50%) var(--my, 50%), rgba(34, 255, 160, 0.12) 0%, transparent 60%); }
      .feature-card-red   .feature-card-spotlight { background: radial-gradient(circle 220px at var(--mx, 50%) var(--my, 50%), rgba(255, 77, 109, 0.12) 0%, transparent 60%); }
      .feature-card-gold  .feature-card-spotlight { background: radial-gradient(circle 220px at var(--mx, 50%) var(--my, 50%), rgba(242, 178, 52, 0.13) 0%, transparent 60%); }

      /* Light beam sweep al hover */
      .feature-card-beam {
        position: absolute;
        inset: 0;
        border-radius: 20px;
        overflow: hidden;
        pointer-events: none;
        z-index: 2;
      }
      .feature-card-beam::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -100%;
        width: 60%;
        height: 200%;
        background: linear-gradient(
          115deg,
          transparent 35%,
          rgba(255, 255, 255, 0.08) 49%,
          rgba(255, 255, 255, 0.03) 51%,
          transparent 65%
        );
        transform: rotate(15deg);
        transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .feature-card:hover .feature-card-beam::before {
        transform: rotate(15deg) translateX(420%);
      }

      .feature-card-inner {
        position: relative;
        padding: 20px 20px 22px;
        z-index: 3;
        min-height: 180px;
        display: flex;
        flex-direction: column;
      }
      .feature-card-top {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        margin-bottom: 18px;
      }
      .feature-card-num {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10px;
        letter-spacing: 0.2em;
        color: rgba(255, 255, 255, 0.40);
        font-variant-numeric: tabular-nums;
      }
      .feature-card-pain {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 9.5px;
        letter-spacing: 0.22em;
        font-weight: 600;
      }
      .feature-card-blue  .feature-card-pain { color: #a8c4ff; }
      .feature-card-green .feature-card-pain { color: #6effc7; }
      .feature-card-red   .feature-card-pain { color: #ff8fa6; }
      .feature-card-gold  .feature-card-pain { color: #ffd17a; }

      .feature-card-stat-row {
        display: flex;
        align-items: baseline;
        gap: 7px;
        margin-bottom: 18px;
      }
      .feature-card-stat {
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-size: clamp(2.4rem, 4.5vw, 3.4rem);
        font-weight: 500;
        line-height: 1;
        letter-spacing: -0.04em;
        color: rgba(255, 255, 255, 0.96);
        font-variation-settings: 'wdth' 95;
      }
      .feature-card-unit {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 11px;
        letter-spacing: 0.10em;
        color: rgba(255, 255, 255, 0.45);
        margin-bottom: 4px;
      }
      .feature-card-solution {
        font-size: 13.5px;
        line-height: 1.45;
        color: rgba(255, 255, 255, 0.65);
        margin-top: auto;
      }

      @media (prefers-reduced-motion: reduce) {
        .features-dotmatrix,
        .features-kicker-bar,
        .features-headline-line,
        .feature-card { animation: none; }
        .feature-card:hover { transform: none; }
        .feature-card-beam::before { transition: none; }
      }
    `}</style>
  )
}
