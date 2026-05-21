'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Guarantee v3 — Minimalist Editorial
 * Stripped al esencial: header + sello giratorio elegante + 3 stats animados + firma.
 * Sin watermarks, sin flow, sin QR, sin badges. Coherente con el resto del landing.
 */

export function Guarantee() {
  return (
    <section id="garantia" className="gtee-section relative py-24 md:py-32 overflow-hidden">
      {/* Halftone bg coherente */}
      <div aria-hidden className="gtee-dotmatrix" />

      <div className="l2-container relative">
        {/* Header editorial */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="gtee-kicker">
            <span aria-hidden className="gtee-kicker-bar" />
            <span className="gtee-kicker-text">Compromiso · Garantía</span>
            <span aria-hidden className="gtee-kicker-num">08</span>
          </div>

          <h2 className="gtee-headline">
            <span className="gtee-headline-line gtee-headline-1">Si USCIS niega tu caso,</span>
            <span className="gtee-headline-line gtee-headline-2">
              seguimos <em>contigo</em>.
            </span>
          </h2>

          <div aria-hidden className="gtee-divider" />

          <p className="gtee-meta">
            <span>Política transparente</span>
            <span className="gtee-meta-dot" />
            <span>Sin letra chica</span>
          </p>
        </div>

        {/* Sello + Stats */}
        <div className="gtee-stage">
          <div className="gtee-seal-wrap">
            <Seal />
          </div>

          <div className="gtee-stats">
            <Counter target={0} suffix="" label="Costo extra si niegan" />
            <span aria-hidden className="gtee-stats-sep" />
            <Counter target={100} suffix="%" label="Confidencial" />
            <span aria-hidden className="gtee-stats-sep" />
            <Counter target={24} suffix="h" label="Respuesta máxima" />
          </div>
        </div>

        {/* Copy + firma */}
        <div className="gtee-bottom">
          <p className="gtee-body">
            Si después de evaluar tu caso lo aceptamos y USCIS lo niega, presentamos moción
            para reabrir o apelación <em>sin costo adicional</em>.
          </p>

          <div className="gtee-sig">
            <p className="gtee-sig-name">Henry Orellana</p>
            <p className="gtee-sig-role">Fundador &amp; CEO · UsaLatinoPrime</p>
          </div>
        </div>
      </div>

      <Styles />
    </section>
  )
}

/* ─────────── COUNTER animated via IntersectionObserver ─────────── */
function Counter({
  target,
  suffix,
  label,
}: {
  target: number
  suffix: string
  label: string
}) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let started = false
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true
          const duration = 1500
          const start = performance.now()
          function tick(now: number) {
            const t = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - t, 3)
            setVal(Math.round(target * eased))
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return (
    <div ref={ref} className="gtee-stat">
      <span className="gtee-stat-num">
        {val}
        <span className="gtee-stat-suffix">{suffix}</span>
      </span>
      <span className="gtee-stat-label">{label}</span>
    </div>
  )
}

/* ─────────── SEAL elegante minimal ─────────── */
function Seal() {
  return (
    <svg width="170" height="170" viewBox="0 0 170 170" fill="none" aria-hidden className="gtee-seal">
      <defs>
        <path
          id="gteeSealPath"
          d="M 85 85 m -65 0 a 65 65 0 1 1 130 0 a 65 65 0 1 1 -130 0"
        />
      </defs>

      {/* Outer rotating text ring */}
      <g className="gtee-seal-outer">
        <circle cx="85" cy="85" r="72" stroke="rgba(91, 155, 255, 0.16)" strokeWidth="0.5" fill="none" />
        <text
          fill="rgba(91, 155, 255, 0.65)"
          fontSize="7"
          fontFamily="var(--font-mono, monospace)"
          letterSpacing="2.6"
          fontWeight="500"
        >
          <textPath xlinkHref="#gteeSealPath" startOffset="0">
            · USALATINOPRIME · CASO PROTEGIDO · COMPROMISO REAL ·
          </textPath>
        </text>
      </g>

      {/* Inner rings */}
      <circle cx="85" cy="85" r="55" stroke="rgba(91, 155, 255, 0.30)" strokeWidth="0.8" fill="none" />
      <circle cx="85" cy="85" r="50" stroke="rgba(91, 155, 255, 0.10)" strokeWidth="0.4" strokeDasharray="2 3" fill="none" />

      {/* Center check + label */}
      <g transform="translate(85 85)">
        <circle r="32" fill="rgba(91, 155, 255, 0.06)" stroke="rgba(91, 155, 255, 0.40)" strokeWidth="0.8" />
        <path
          d="M -12 -2 L -4 6 L 14 -12"
          stroke="var(--c-blue-2, #a8c4ff)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <text
          y="20"
          textAnchor="middle"
          fill="rgba(168, 196, 255, 0.85)"
          fontSize="7"
          fontFamily="var(--font-mono, monospace)"
          fontWeight="600"
          letterSpacing="2"
        >
          PROTEGIDO
        </text>
      </g>
    </svg>
  )
}

/* ─────────── STYLES ─────────── */
function Styles() {
  return (
    <style jsx global>{`
      .gtee-section { position: relative; }

      /* Halftone — más sutil que en otras secciones */
      .gtee-dotmatrix {
        position: absolute;
        inset: 0;
        background-image: radial-gradient(circle, rgba(200, 220, 255, 0.08) 1px, transparent 1.5px);
        background-size: 28px 28px;
        -webkit-mask: radial-gradient(ellipse 70% 60% at center, transparent 25%, rgba(0,0,0,0.50) 60%, black 90%);
        mask: radial-gradient(ellipse 70% 60% at center, transparent 25%, rgba(0,0,0,0.50) 60%, black 90%);
        pointer-events: none;
        z-index: 0;
      }

      /* ── HEADER ── */
      .gtee-kicker {
        display: inline-flex; align-items: center; justify-content: center;
        gap: 14px; margin-bottom: 36px;
      }
      .gtee-kicker-bar {
        display: inline-block;
        width: 56px; height: 1px;
        background: rgba(255, 255, 255, 0.30);
      }
      .gtee-kicker-text {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10.5px; font-weight: 500;
        letter-spacing: 0.35em; text-transform: uppercase;
        color: rgba(255, 255, 255, 0.55);
      }
      .gtee-kicker-num {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10.5px; letter-spacing: 0.18em;
        color: rgba(255, 255, 255, 0.28);
      }
      .gtee-headline {
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-size: clamp(2.2rem, 5.4vw, 4.2rem);
        line-height: 0.96; letter-spacing: -0.045em; font-weight: 500;
        color: rgba(255, 255, 255, 0.96);
        display: flex; flex-direction: column;
        font-variation-settings: 'wdth' 95;
      }
      .gtee-headline-line {
        display: block;
        animation: gtee-headline-in 0.95s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      .gtee-headline-1 { animation-delay: 0.05s; }
      .gtee-headline-2 {
        animation-delay: 0.18s;
        color: var(--c-blue);
      }
      .gtee-headline-2 em {
        font-style: italic; font-weight: 400;
        font-variation-settings: 'wdth' 90;
        margin: 0 -0.02em;
      }
      @keyframes gtee-headline-in {
        from { opacity: 0; transform: translateY(14px); filter: blur(6px); }
        to   { opacity: 1; transform: translateY(0); filter: blur(0); }
      }
      .gtee-divider {
        margin: 26px auto 16px;
        width: 32px; height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent);
      }
      .gtee-meta {
        display: inline-flex; align-items: center; justify-content: center;
        gap: 14px;
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
        color: rgba(255, 255, 255, 0.42); flex-wrap: wrap;
      }
      .gtee-meta-dot { width: 2px; height: 2px; border-radius: 50%; background: rgba(255,255,255,0.30); }

      /* ── STAGE: seal + stats ── */
      .gtee-stage {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 56px;
        max-width: 880px;
        margin: 0 auto;
        position: relative;
        z-index: 2;
      }
      @media (max-width: 760px) {
        .gtee-stage {
          flex-direction: column;
          gap: 32px;
        }
      }
      .gtee-seal-wrap {
        flex-shrink: 0;
        position: relative;
      }
      .gtee-seal-wrap::before {
        /* Sutil glow detrás del sello */
        content: '';
        position: absolute;
        inset: -20px;
        background: radial-gradient(circle, rgba(91, 155, 255, 0.14) 0%, transparent 65%);
        filter: blur(20px);
        z-index: -1;
        animation: gtee-glow-breath 4s ease-in-out infinite;
      }
      @keyframes gtee-glow-breath {
        0%, 100% { transform: scale(0.95); opacity: 0.6; }
        50%      { transform: scale(1.05); opacity: 1; }
      }
      .gtee-seal {
        animation: gtee-seal-float 8s ease-in-out infinite;
      }
      @keyframes gtee-seal-float {
        0%, 100% { transform: translateY(0); }
        50%      { transform: translateY(-3px); }
      }
      .gtee-seal-outer {
        transform-origin: 85px 85px;
        animation: gtee-seal-rotate 32s linear infinite;
      }
      @keyframes gtee-seal-rotate {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }

      /* ── STATS ── */
      .gtee-stats {
        display: grid;
        grid-template-columns: 1fr auto 1fr auto 1fr;
        align-items: center;
        gap: 8px 28px;
        flex: 1;
      }
      @media (max-width: 760px) {
        .gtee-stats {
          grid-template-columns: 1fr 1fr 1fr;
          gap: 16px;
        }
        .gtee-stats-sep { display: none; }
      }
      .gtee-stats-sep {
        width: 1px;
        height: 48px;
        background: rgba(255, 255, 255, 0.08);
      }
      .gtee-stat {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      @media (max-width: 760px) {
        .gtee-stat { align-items: center; text-align: center; }
      }
      .gtee-stat-num {
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-size: clamp(2.4rem, 4.5vw, 3.4rem);
        font-weight: 500;
        line-height: 1;
        letter-spacing: -0.04em;
        color: rgba(255, 255, 255, 0.96);
        font-variant-numeric: tabular-nums;
        font-variation-settings: 'wdth' 92;
        display: inline-flex;
        align-items: baseline;
      }
      .gtee-stat-suffix {
        font-size: 0.50em;
        font-weight: 400;
        letter-spacing: 0.02em;
        color: var(--c-blue-2, #a8c4ff);
        margin-left: 3px;
      }
      .gtee-stat-label {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10px;
        letter-spacing: 0.20em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.48);
      }

      /* ── BOTTOM: body + firma ── */
      .gtee-bottom {
        max-width: 640px;
        margin: 56px auto 0;
        text-align: center;
        position: relative;
        z-index: 2;
      }
      .gtee-body {
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-size: clamp(1rem, 1.6vw, 1.2rem);
        line-height: 1.5;
        font-weight: 400;
        letter-spacing: -0.012em;
        color: rgba(255, 255, 255, 0.72);
      }
      .gtee-body em {
        font-style: italic;
        font-variation-settings: 'wdth' 90;
        color: rgba(255, 255, 255, 0.96);
        font-weight: 500;
      }
      .gtee-sig {
        margin-top: 28px;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
      }
      .gtee-sig::before {
        content: '';
        display: block;
        width: 32px;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(91, 155, 255, 0.55), transparent);
        margin-bottom: 14px;
      }
      .gtee-sig-name {
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-size: 16px;
        font-style: italic;
        font-weight: 500;
        letter-spacing: -0.012em;
        color: rgba(255, 255, 255, 0.92);
        font-variation-settings: 'wdth' 92;
      }
      .gtee-sig-role {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 9.5px;
        letter-spacing: 0.20em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.42);
        margin-top: 3px;
      }

      @media (prefers-reduced-motion: reduce) {
        .gtee-seal,
        .gtee-seal-outer,
        .gtee-headline-line,
        .gtee-seal-wrap::before { animation: none !important; }
      }
    `}</style>
  )
}
