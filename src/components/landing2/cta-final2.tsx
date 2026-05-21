'use client'

import { useEffect, useRef } from 'react'
import { SITE } from '@/lib/site'
import { whatsappUrl } from '@/lib/utils'

/**
 * CTA Final v2 — Brutal Marquee + Magnetic Button
 * Concepto único: tipografía gigante scrolling infinito + botón magnético
 * que atrae al cursor con shimmer multicolor (Apple Intelligence) + halo verde.
 *
 * - 2 marquees gigantes (top + bottom) direcciones opuestas, opacity baja
 * - Botón magnético: cursor near → translate hacia cursor
 * - Kicker con dot live verde pulsante
 * - Trust signals minimal mono
 */

export function CtaFinal2() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const btnRef = useRef<HTMLAnchorElement | null>(null)

  // Magnetic effect: cursor proximity → button translates toward cursor + halo intensifies
  useEffect(() => {
    const sec = sectionRef.current
    const btn = btnRef.current
    if (!sec || !btn) return
    // Skip magnetic en touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    let raf = 0
    function onMove(e: MouseEvent) {
      const r = btn!.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      const max = 320  // radio más amplio de detección
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (dist < max) {
          // strength más fuerte (0.55 vs 0.32) — movimiento notorio
          const strength = (1 - dist / max) * 0.55
          btn!.style.setProperty('--mx', `${dx * strength}px`)
          btn!.style.setProperty('--my', `${dy * strength}px`)
          btn!.style.setProperty('--prox', String(1 - dist / max))
        } else {
          btn!.style.setProperty('--mx', '0px')
          btn!.style.setProperty('--my', '0px')
          btn!.style.setProperty('--prox', '0')
        }
      })
    }
    function onLeave() {
      btn!.style.setProperty('--mx', '0px')
      btn!.style.setProperty('--my', '0px')
      btn!.style.setProperty('--prox', '0')
    }
    sec.addEventListener('mousemove', onMove)
    sec.addEventListener('mouseleave', onLeave)
    return () => {
      sec.removeEventListener('mousemove', onMove)
      sec.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  const marqueeText = 'EMPIEZA GRATIS · SIN COMPROMISO · 30 MIN · 400+ CASOS · UTAH ·'
  const marqueeTextBottom = '+400 CASOS · GRATIS · 30 MIN · SIN COMPROMISO · UTAH · EMPIEZA AHORA ·'

  return (
    <section ref={sectionRef} className="ctaf-section">
      {/* MARQUEE TOP */}
      <div aria-hidden className="ctaf-marquee ctaf-marquee-top">
        <div className="ctaf-marquee-track">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="ctaf-marquee-text">
              {marqueeText}&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* CENTER STAGE */}
      <div className="ctaf-stage">
        {/* Kicker live */}
        <p className="ctaf-kicker">
          <span aria-hidden className="ctaf-kicker-dot" />
          <span>Consulta gratuita</span>
          <span className="ctaf-kicker-sep">·</span>
          <span>Sin compromiso</span>
        </p>

        {/* Magnetic CTA */}
        <a
          ref={btnRef}
          href={whatsappUrl(
            SITE.contact.whatsapp,
            'Hola, quiero empezar mi consulta gratuita.'
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="ctaf-magnetic-btn"
          aria-label="Empezar consulta gratuita por WhatsApp"
        >
          <span aria-hidden className="ctaf-btn-halo" />
          <span aria-hidden className="ctaf-btn-shimmer" />

          <span className="ctaf-btn-inner">
            <WhatsappIcon />
            <span className="ctaf-btn-text">Empieza ahora</span>
            <span className="ctaf-btn-arrow">
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
                <path
                  d="M1 7h14M10 1l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>

          <span className="ctaf-btn-sub">
            Es gratis · 30 min · Sin compromiso
          </span>
        </a>

        {/* Trust signals */}
        <p className="ctaf-trust">
          <span className="ctaf-trust-item">
            <span aria-hidden className="ctaf-trust-dot ctaf-trust-dot-green" />
            247 hoy
          </span>
          <span className="ctaf-trust-sep" />
          <span>Respuesta &lt; 14 min</span>
          <span className="ctaf-trust-sep" />
          <span>100% confidencial</span>
        </p>
      </div>

      {/* MARQUEE BOTTOM (reverse) */}
      <div aria-hidden className="ctaf-marquee ctaf-marquee-bottom">
        <div className="ctaf-marquee-track ctaf-marquee-reverse">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="ctaf-marquee-text ctaf-marquee-text-blue">
              {marqueeTextBottom}&nbsp;
            </span>
          ))}
        </div>
      </div>

      <Styles />
    </section>
  )
}

function WhatsappIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="ctaf-btn-icon"
    >
      <path d="M12.03 2C6.5 2 2.04 6.45 2.04 11.95c0 1.96.57 3.78 1.56 5.31L2 22l4.93-1.57c1.46.8 3.13 1.26 4.95 1.26h.01c5.53 0 10.02-4.46 10.02-9.95C21.91 6.45 17.45 2 12.03 2zm5.83 13.95c-.25.7-1.45 1.34-2.02 1.42-.52.07-1.18.1-1.9-.12-.44-.14-1-.32-1.72-.63-3.02-1.3-4.99-4.34-5.14-4.55-.15-.21-1.24-1.65-1.24-3.14 0-1.5.78-2.23 1.06-2.54.28-.31.61-.39.81-.39.21 0 .41 0 .59.01.19.01.45-.07.7.54.26.62.89 2.13.97 2.28.08.16.13.34.03.55-.11.21-.16.34-.32.52-.16.18-.34.41-.48.55-.16.16-.33.34-.14.66.18.32.83 1.36 1.78 2.21 1.22 1.09 2.26 1.43 2.58 1.59.32.16.51.13.7-.08.18-.21.81-.95 1.02-1.27.21-.32.42-.27.71-.16.29.11 1.83.86 2.14 1.02.32.16.53.24.61.37.07.13.07.77-.18 1.46z" />
    </svg>
  )
}

function Styles() {
  return (
    <style jsx global>{`
      .ctaf-section {
        position: relative;
        padding: 64px 0 80px;
        background: #060608;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 720px;
      }

      /* ═══════════ MARQUEE GIGANTE ═══════════ */
      .ctaf-marquee {
        position: relative;
        width: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
      }
      .ctaf-marquee-track {
        display: inline-flex;
        white-space: nowrap;
        animation: ctaf-marquee-scroll 32s linear infinite;
        will-change: transform;
      }
      .ctaf-marquee-track.ctaf-marquee-reverse {
        animation: ctaf-marquee-scroll-rev 38s linear infinite;
      }
      @keyframes ctaf-marquee-scroll {
        from { transform: translateX(0); }
        to   { transform: translateX(-20%); }
      }
      @keyframes ctaf-marquee-scroll-rev {
        from { transform: translateX(-20%); }
        to   { transform: translateX(0); }
      }
      .ctaf-marquee-text {
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-size: clamp(4rem, 11vw, 11rem);
        font-weight: 700;
        line-height: 0.92;
        letter-spacing: -0.04em;
        font-variation-settings: 'wdth' 85;
        text-transform: uppercase;
        /* Outlined holographic — texto transparente con stroke cyan + glow tech */
        color: transparent;
        -webkit-text-stroke: 1.6px rgba(140, 200, 255, 0.28);
        text-shadow:
          0 0 24px rgba(91, 155, 255, 0.22),
          0 0 60px rgba(91, 155, 255, 0.10);
      }
      .ctaf-marquee-text-blue {
        /* Variante púrpura/violeta para la fila inferior */
        -webkit-text-stroke: 1.6px rgba(180, 140, 255, 0.28);
        text-shadow:
          0 0 24px rgba(168, 85, 247, 0.22),
          0 0 60px rgba(168, 85, 247, 0.10);
      }

      /* ═══════════ CENTER STAGE ═══════════ */
      .ctaf-stage {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        position: relative;
        z-index: 2;
        padding: 56px 24px;
        min-height: 380px;
      }

      /* Kicker — chip live */
      .ctaf-kicker {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 36px;
        padding: 9px 18px 9px 14px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.04);
        backdrop-filter: blur(16px) saturate(160%);
        -webkit-backdrop-filter: blur(16px) saturate(160%);
        border: 1px solid rgba(255, 255, 255, 0.08);
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.72);
      }
      .ctaf-kicker-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--c-green);
        box-shadow: 0 0 8px var(--c-green), 0 0 14px rgba(34, 255, 160, 0.45);
        animation: ctaf-pulse 1.6s ease-in-out infinite;
      }
      .ctaf-kicker-sep {
        color: rgba(255, 255, 255, 0.30);
      }
      @keyframes ctaf-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%      { opacity: 0.4; transform: scale(0.82); }
      }

      /* ═══════════ MAGNETIC BUTTON ═══════════ */
      .ctaf-magnetic-btn {
        position: relative;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 22px 44px 18px;
        border-radius: 999px;
        background: linear-gradient(135deg, #25d366 0%, #1faf52 60%, #25d366 100%);
        background-size: 200% 200%;
        color: #fff;
        text-decoration: none;
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        cursor: pointer;
        isolation: isolate;
        box-shadow:
          0 28px 70px -14px rgba(37, 211, 102, 0.55),
          0 0 0 1px rgba(255, 255, 255, 0.16) inset,
          0 -2px 0 rgba(0, 0, 0, 0.18) inset;
        transform: translate(var(--mx, 0px), var(--my, 0px)) scale(1);
        transition:
          transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
          box-shadow 0.4s ease,
          background-position 0.6s ease;
      }
      .ctaf-magnetic-btn:hover {
        background-position: 100% 50%;
        box-shadow:
          0 36px 90px -14px rgba(37, 211, 102, 0.80),
          0 0 0 1px rgba(255, 255, 255, 0.26) inset,
          0 -2px 0 rgba(0, 0, 0, 0.20) inset;
      }
      .ctaf-magnetic-btn:active {
        transform: translate(var(--mx, 0px), var(--my, 0px)) scale(0.97);
      }
      .ctaf-magnetic-btn:focus-visible {
        outline: 2px solid var(--c-blue);
        outline-offset: 6px;
      }

      /* HALO breathing detrás del botón — intensifica con --prox */
      .ctaf-btn-halo {
        position: absolute;
        inset: -22px;
        border-radius: 999px;
        background: radial-gradient(
          ellipse at center,
          rgba(37, 211, 102, 0.55) 0%,
          rgba(34, 255, 160, 0.18) 40%,
          transparent 72%
        );
        filter: blur(26px);
        opacity: calc(0.55 + var(--prox, 0) * 0.5);
        pointer-events: none;
        z-index: -1;
        animation: ctaf-halo-breath 2.6s ease-in-out infinite;
      }
      @keyframes ctaf-halo-breath {
        0%, 100% { transform: scale(0.94); }
        50%      { transform: scale(1.08); }
      }

      /* SHIMMER ring multicolor Apple Intelligence */
      .ctaf-btn-shimmer {
        position: absolute;
        inset: -2px;
        border-radius: 999px;
        padding: 2px;
        background: conic-gradient(
          from var(--ctaf-shimmer-angle, 0deg),
          rgba(91, 155, 255, 0.90),
          rgba(168, 85, 247, 0.90),
          rgba(34, 255, 160, 0.80),
          rgba(242, 178, 52, 0.85),
          rgba(255, 77, 109, 0.80),
          rgba(91, 155, 255, 0.90)
        );
        -webkit-mask:
          linear-gradient(#000 0 0) content-box,
          linear-gradient(#000 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        animation: ctaf-shimmer-rotate 3.2s linear infinite;
        pointer-events: none;
        z-index: 1;
        opacity: 0.85;
      }
      @property --ctaf-shimmer-angle {
        syntax: '<angle>';
        inherits: false;
        initial-value: 0deg;
      }
      @keyframes ctaf-shimmer-rotate {
        to { --ctaf-shimmer-angle: 360deg; }
      }

      .ctaf-btn-inner {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        position: relative;
        z-index: 2;
      }
      .ctaf-btn-text {
        font-size: clamp(1.6rem, 2.6vw, 2.2rem);
        font-weight: 600;
        letter-spacing: -0.02em;
        line-height: 1;
        font-variation-settings: 'wdth' 95;
      }
      .ctaf-btn-icon {
        position: relative;
        z-index: 2;
      }
      .ctaf-btn-arrow {
        display: inline-flex;
        align-items: center;
        transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .ctaf-magnetic-btn:hover .ctaf-btn-arrow {
        transform: translateX(5px);
      }
      .ctaf-btn-sub {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10.5px;
        font-weight: 500;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.78);
        position: relative;
        z-index: 2;
      }

      /* ═══════════ TRUST SIGNALS ═══════════ */
      .ctaf-trust {
        margin-top: 36px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 14px;
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10.5px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.45);
        flex-wrap: wrap;
      }
      .ctaf-trust-item {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .ctaf-trust-dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.40);
      }
      .ctaf-trust-dot-green {
        background: var(--c-green);
        box-shadow: 0 0 5px var(--c-green);
        animation: ctaf-pulse 1.6s ease-in-out infinite;
      }
      .ctaf-trust-sep {
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.25);
      }

      /* Reduced motion */
      @media (prefers-reduced-motion: reduce) {
        .ctaf-marquee-track,
        .ctaf-btn-halo,
        .ctaf-btn-shimmer,
        .ctaf-kicker-dot,
        .ctaf-trust-dot-green { animation: none !important; }
        .ctaf-magnetic-btn { transform: none !important; }
      }

      /* Mobile */
      @media (max-width: 768px) {
        .ctaf-section {
          padding: 48px 0 60px;
          min-height: 580px;
        }
        .ctaf-stage { padding: 40px 20px; min-height: 320px; }
        .ctaf-kicker {
          font-size: 9.5px;
          padding: 8px 14px 8px 12px;
          letter-spacing: 0.16em;
          margin-bottom: 28px;
        }
        .ctaf-magnetic-btn { padding: 18px 32px 14px; gap: 8px; }
        .ctaf-btn-text { font-size: 1.4rem; }
        .ctaf-btn-sub { font-size: 9.5px; letter-spacing: 0.16em; }
        .ctaf-trust {
          font-size: 9.5px;
          gap: 10px;
          margin-top: 28px;
          letter-spacing: 0.16em;
        }
        .ctaf-marquee-text { font-size: clamp(3rem, 16vw, 7rem); }
      }
    `}</style>
  )
}
