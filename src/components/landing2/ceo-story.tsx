'use client'

import { useEffect, useRef, useState } from 'react'
import { SITE } from '@/lib/site'
import { whatsappUrl } from '@/lib/utils'

/**
 * CEO Story — Henry Orellana
 * Narrativa de 4 fases con cross-fade entre fotos + frases rotativas.
 * - Fases 1-3: storytelling del por qué
 * - Fase 4: manifesto + CTA WhatsApp con CTA visible solo aquí
 * - Auto-rotate 6.5s · click dots para saltar (pausa 12s)
 * - Ken Burns en foto activa, halftone bg consistente
 */

interface CeoStep {
  id: number
  photo: string
  phase: string
  phrase: string
  finalCTA?: boolean
}

const STEPS: CeoStep[] = [
  {
    id: 1,
    photo: '/ceo/ceo-1-problema.webp',
    phase: 'El problema',
    phrase:
      'Vi cómo familias hispanas pagaban miles de dólares a bufetes que ni siquiera les contestaban el teléfono.',
  },
  {
    id: 2,
    photo: '/ceo/ceo-2-realizacion.webp',
    phase: 'La realización',
    phrase:
      'El sistema legal de inmigración no fue diseñado para nosotros. Era hora de cambiarlo.',
  },
  {
    id: 3,
    photo: '/ceo/ceo-3-vision.webp',
    phase: 'La visión',
    phrase:
      'Construí UsaLatinoPrime para que tu caso no dependa de cuánto puedas pagar, sino de qué tan fuerte sea tu historia.',
  },
  {
    id: 4,
    photo: '/ceo/ceo-4-hero.webp',
    phase: 'Tu momento',
    phrase:
      'Si llegaste hasta aquí, ya diste el primer paso. Yo me encargo del resto.',
    finalCTA: true,
  },
]

export function CeoStory() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [active, setActive] = useState(0)
  const [tick, setTick] = useState(0) // bump para resetear el timer del autoplay
  const step = STEPS[active]

  // Halftone cursor spotlight (pointer fine — solo desktop)
  useEffect(() => {
    const sec = sectionRef.current
    if (!sec) return
    // Skip en touch devices para evitar repaints innecesarios
    if (window.matchMedia('(pointer: coarse)').matches) return
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

  // Auto-rotate — siempre corriendo, click resetea el timer (sin paralizar)
  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % STEPS.length)
    }, 6500)
    return () => clearInterval(id)
  }, [tick])

  function goTo(i: number) {
    setActive(i)
    setTick((t) => t + 1) // reinicia el timer del intervalo desde ahora
  }

  // Tap en foto avanza a la siguiente fase (mobile + desktop)
  function nextPhase() {
    goTo((active + 1) % STEPS.length)
  }

  return (
    <section
      ref={sectionRef}
      id="ceo"
      className="ceo-section relative py-24 md:py-32 overflow-hidden"
    >
      {/* Halftone bg */}
      <div aria-hidden className="ceo-dotmatrix" />
      <div aria-hidden className="ceo-dotmatrix-glow" />

      <div className="l2-container relative">
        {/* Header editorial */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <div className="ceo-kicker">
            <span aria-hidden className="ceo-kicker-bar" />
            <span className="ceo-kicker-text">Fundador · CEO</span>
            <span aria-hidden className="ceo-kicker-num">07</span>
          </div>

          <h2 className="ceo-headline">
            <span className="ceo-headline-line ceo-headline-1">El por qué</span>
            <span className="ceo-headline-line ceo-headline-2">
              <em>existe</em>.
            </span>
          </h2>

          <div aria-hidden className="ceo-divider" />

          <p className="ceo-meta">
            <span>Utah-based</span>
            <span className="ceo-meta-dot" />
            <span>12 años en inmigración</span>
            <span className="ceo-meta-dot" />
            <span>+400 casos firmados</span>
          </p>
        </div>

        {/* Split layout (sin hover handlers para evitar bugs en touch) */}
        <div className="ceo-split">
          {/* LEFT: Photo stack — click avanza a siguiente fase */}
          <button
            type="button"
            className="ceo-photo-stack"
            onClick={nextPhase}
            aria-label={`Siguiente fase — actualmente ${step.phase}`}
          >
            {STEPS.map((s, i) => (
              <img
                key={s.id}
                src={s.photo}
                alt={`Henry Orellana — ${s.phase}`}
                className={`ceo-photo ${i === active ? 'is-active' : ''}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            ))}
            <span aria-hidden className="ceo-photo-vignette" />
            <span aria-hidden className="ceo-photo-hairline" />

            {/* Floating phase badge */}
            <span className="ceo-photo-badge" key={`badge-${active}`}>
              <span className="ceo-photo-badge-dot" />
              {step.phase}
            </span>
          </button>

          {/* RIGHT: Rotating text */}
          <div className="ceo-text">
            <blockquote className="ceo-phrase" key={`phrase-${active}`}>
              <span aria-hidden className="ceo-phrase-mark">&ldquo;</span>
              {step.phrase}
            </blockquote>

            <div className="ceo-signature-block">
              <p className="ceo-sig-name">Henry Orellana</p>
              <p className="ceo-sig-role">Fundador &amp; CEO · UsaLatinoPrime</p>
            </div>

            {/* CTA visible solo en fase final */}
            <div className={`ceo-final-cta ${step.finalCTA ? 'is-show' : ''}`}>
              <a
                href={whatsappUrl(
                  SITE.contact.whatsapp,
                  'Hola Henry, vi tu mensaje en la página. Quiero información sobre mi caso.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="ceo-cta-wsp"
              >
                <span aria-hidden className="ceo-cta-shimmer" />
                <WhatsappIcon />
                <span>Habla con mi equipo</span>
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
                  <path d="M1 5h11M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <p className="ceo-cta-sub">
                Respuesta promedio en <strong>14 minutos</strong> · Confidencial
              </p>
            </div>
          </div>
        </div>

        {/* Stepper compacto — 4 barras progresivas */}
        <div className="ceo-stepper" role="tablist" aria-label="Fases de la historia">
          {STEPS.map((s, i) => {
            const isActive = i === active
            const isPassed = i < active
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(i)}
                className={`ceo-step-bar ${isActive ? 'is-active' : ''} ${isPassed ? 'is-passed' : ''}`}
                aria-label={`Fase ${i + 1}: ${s.phase}`}
                aria-selected={isActive}
                role="tab"
              >
                <span className="ceo-step-bar-num">{String(i + 1).padStart(2, '0')}</span>
                {isActive && (
                  <span
                    aria-hidden
                    className="ceo-step-bar-fill"
                    key={`fill-${active}-${tick}`}
                  />
                )}
                <span aria-hidden className="ceo-step-bar-tooltip">{s.phase}</span>
              </button>
            )
          })}
        </div>
        <p className="ceo-stepper-label" key={`label-${active}`}>
          <span className="ceo-stepper-label-num">{String(active + 1).padStart(2, '0')}</span>
          <span className="ceo-stepper-label-sep" />
          <span>{STEPS[active].phase}</span>
        </p>
      </div>

      <Styles />
    </section>
  )
}

function WhatsappIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.1-.7.9-.9 1.1-.3.2-.6.1c-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.8-1.6-2.1-.2-.3 0-.4.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.5s-.6-1.4-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.8.4s-1 1-1 2.5 1 2.9 1.2 3.1.2 2.9 4.3 4.1 4.1 1 4.8.9 1.6-.7 1.9-1.3c.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5-1.4c1.4.8 3.1 1.3 5 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.7 0-3.3-.5-4.7-1.3l-.3-.2-3.4 1 1-3.3-.2-.3C3.5 14.4 3 13.2 3 12c0-5 4-9 9-9s9 4 9 9-4 9-9 9z" />
    </svg>
  )
}

function Styles() {
  return (
    <style jsx global>{`
      .ceo-section { position: relative; }

      /* ── HALFTONE BG ── */
      .ceo-dotmatrix {
        position: absolute;
        inset: 0;
        background-image: radial-gradient(circle, rgba(200,220,255,0.10) 1px, transparent 1.5px);
        background-size: 26px 26px;
        -webkit-mask: radial-gradient(ellipse 80% 70% at center, transparent 18%, rgba(0,0,0,0.55) 55%, black 85%);
        mask: radial-gradient(ellipse 80% 70% at center, transparent 18%, rgba(0,0,0,0.55) 55%, black 85%);
        pointer-events: none;
        z-index: 0;
      }
      .ceo-dotmatrix-glow {
        position: absolute;
        inset: 0;
        background-image: radial-gradient(circle, rgba(160,200,255,0.55) 1.3px, transparent 1.8px);
        background-size: 26px 26px;
        -webkit-mask: radial-gradient(circle 220px at var(--cx, -9999px) var(--cy, -9999px), black 0%, rgba(0,0,0,0.6) 40%, transparent 75%);
        mask: radial-gradient(circle 220px at var(--cx, -9999px) var(--cy, -9999px), black 0%, rgba(0,0,0,0.6) 40%, transparent 75%);
        pointer-events: none;
        z-index: 0;
        filter: drop-shadow(0 0 6px rgba(91,155,255,0.25));
      }

      /* ── HEADER ── */
      .ceo-kicker {
        display: inline-flex; align-items: center; justify-content: center;
        gap: 14px; margin-bottom: 38px;
      }
      .ceo-kicker-bar {
        display: inline-block;
        width: 56px; height: 1px;
        background: rgba(255,255,255,0.30);
        animation: ceo-kicker-bar-in 1s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      @keyframes ceo-kicker-bar-in { from { width: 0; opacity: 0; } to { opacity: 1; } }
      .ceo-kicker-text {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10.5px; font-weight: 500;
        letter-spacing: 0.35em; text-transform: uppercase;
        color: rgba(255,255,255,0.55);
      }
      .ceo-kicker-num {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10.5px; letter-spacing: 0.18em;
        color: rgba(255,255,255,0.28);
        font-variant-numeric: tabular-nums;
      }
      .ceo-headline {
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-size: clamp(2.4rem, 5.8vw, 4.6rem);
        line-height: 0.96; letter-spacing: -0.045em; font-weight: 500;
        color: rgba(255,255,255,0.96);
        display: flex; flex-direction: column;
        font-variation-settings: 'wdth' 95;
      }
      .ceo-headline-line { display: block; animation: ceo-headline-in 0.95s cubic-bezier(0.16, 1, 0.3, 1) both; }
      .ceo-headline-1 { animation-delay: 0.05s; }
      .ceo-headline-2 { animation-delay: 0.18s; color: var(--c-blue); }
      .ceo-headline-2 em {
        font-style: italic; font-weight: 400;
        font-variation-settings: 'wdth' 90;
        margin: 0 -0.02em;
      }
      @keyframes ceo-headline-in {
        from { opacity: 0; transform: translateY(14px); filter: blur(6px); }
        to   { opacity: 1; transform: translateY(0); filter: blur(0); }
      }
      .ceo-divider {
        margin: 28px auto 18px;
        width: 32px; height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent);
      }
      .ceo-meta {
        display: inline-flex; align-items: center; justify-content: center;
        gap: 14px;
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
        color: rgba(255,255,255,0.42); flex-wrap: wrap;
      }
      .ceo-meta-dot { width: 2px; height: 2px; border-radius: 50%; background: rgba(255,255,255,0.30); }

      /* ─────────── SPLIT LAYOUT ─────────── */
      .ceo-split {
        position: relative;
        display: grid;
        grid-template-columns: 1.05fr 1fr;
        gap: 48px;
        max-width: 1180px;
        margin: 0 auto;
        align-items: stretch;
        z-index: 2;
      }
      @media (max-width: 900px) {
        .ceo-split { grid-template-columns: 1fr; gap: 32px; }
      }

      /* ── PHOTO STACK (botón clickeable que avanza fase) ── */
      .ceo-photo-stack {
        position: relative;
        aspect-ratio: 4 / 5;
        border-radius: 24px;
        overflow: hidden;
        background: rgba(18, 18, 22, 0.6);
        border: 1px solid rgba(255, 255, 255, 0.10);
        box-shadow:
          0 50px 100px -28px rgba(0, 0, 0, 0.6),
          0 1px 0 rgba(255, 255, 255, 0.08) inset;
        padding: 0;
        width: 100%;
        cursor: pointer;
        font: inherit;
        color: inherit;
        text-align: left;
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        touch-action: manipulation;
      }
      .ceo-photo-stack:hover {
        transform: translateY(-2px);
      }
      .ceo-photo-stack:active {
        transform: scale(0.99);
      }
      .ceo-photo-stack:focus-visible {
        outline: 2px solid var(--c-blue);
        outline-offset: 4px;
      }
      @media (max-width: 900px) {
        .ceo-photo-stack { aspect-ratio: 3 / 4; }
      }
      .ceo-photo {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0;
        transform: scale(1.0);
        transition: opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .ceo-photo.is-active {
        opacity: 1;
        animation: ceo-ken-burns 8s ease-out forwards;
      }
      @keyframes ceo-ken-burns {
        from { transform: scale(1.0) translateY(0); }
        to   { transform: scale(1.06) translateY(-1.5%); }
      }
      .ceo-photo-vignette {
        position: absolute; inset: 0;
        background:
          linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.45) 100%),
          radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.35) 100%);
        pointer-events: none;
        z-index: 2;
      }
      .ceo-photo-hairline {
        position: absolute;
        top: 0; left: 14%; right: 14%;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.40), transparent);
        z-index: 3;
        pointer-events: none;
      }
      .ceo-photo-badge {
        position: absolute;
        bottom: 18px; left: 18px;
        display: inline-flex; align-items: center; gap: 8px;
        padding: 7px 14px;
        border-radius: 999px;
        background: rgba(8, 8, 10, 0.72);
        border: 1px solid rgba(255, 255, 255, 0.12);
        backdrop-filter: blur(20px) saturate(160%);
        -webkit-backdrop-filter: blur(20px) saturate(160%);
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10.5px;
        font-weight: 600;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.85);
        z-index: 4;
        animation: ceo-badge-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      @keyframes ceo-badge-in {
        from { opacity: 0; transform: translateY(8px); filter: blur(4px); }
        to   { opacity: 1; transform: translateY(0); filter: blur(0); }
      }
      .ceo-photo-badge-dot {
        width: 6px; height: 6px;
        background: var(--c-blue);
        border-radius: 50%;
        box-shadow: 0 0 8px var(--c-blue);
        animation: ceo-badge-pulse 1.8s ease-in-out infinite;
      }
      @keyframes ceo-badge-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%      { opacity: 0.45; transform: scale(0.8); }
      }

      /* ── TEXT (right) ── */
      .ceo-text {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 12px 0;
      }
      .ceo-step-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 22px;
      }
      .ceo-step-num {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 11.5px;
        letter-spacing: 0.15em;
        color: rgba(255, 255, 255, 0.45);
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
      }
      .ceo-step-current { color: var(--c-blue); font-weight: 600; }
      .ceo-step-sep { margin: 0 4px; opacity: 0.55; }
      .ceo-step-bar {
        width: 24px; height: 1px;
        background: rgba(255, 255, 255, 0.25);
      }
      .ceo-step-progress {
        flex: 1;
        height: 1px;
        background: rgba(255, 255, 255, 0.06);
        position: relative;
        overflow: hidden;
      }
      .ceo-step-progress-fill {
        display: block;
        height: 100%;
        background: linear-gradient(90deg, var(--c-blue), transparent);
        transform-origin: left;
        animation: ceo-progress-fill 6.5s linear forwards;
      }
      .ceo-step-progress-fill.paused {
        animation-play-state: paused;
      }
      @keyframes ceo-progress-fill {
        from { transform: scaleX(0); }
        to   { transform: scaleX(1); }
      }
      .ceo-phrase {
        position: relative;
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-size: clamp(1.4rem, 2.4vw, 2rem);
        line-height: 1.32;
        font-weight: 400;
        letter-spacing: -0.022em;
        color: rgba(255, 255, 255, 0.95);
        margin: 0 0 28px;
        min-height: 5em;
        animation: ceo-phrase-in 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        font-variation-settings: 'wdth' 95;
      }
      @keyframes ceo-phrase-in {
        from { opacity: 0; transform: translateY(10px); filter: blur(6px); }
        to   { opacity: 1; transform: translateY(0); filter: blur(0); }
      }
      .ceo-phrase-mark {
        position: absolute;
        top: -36px; left: -8px;
        font-family: var(--font-display, 'Bricolage Grotesque', serif);
        font-size: 80px;
        line-height: 1;
        color: var(--c-blue);
        opacity: 0.22;
        font-weight: 700;
      }
      .ceo-signature-block {
        padding-top: 18px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        margin-bottom: 20px;
      }
      .ceo-sig-name {
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-size: 17px;
        font-weight: 600;
        letter-spacing: -0.01em;
        color: rgba(255, 255, 255, 0.96);
        font-style: italic;
        font-variation-settings: 'wdth' 92;
      }
      .ceo-sig-role {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10.5px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.45);
        margin-top: 4px;
      }

      /* ── FINAL CTA — visible solo en fase 4 ── */
      .ceo-final-cta {
        opacity: 0;
        transform: translateY(8px);
        pointer-events: none;
        max-height: 0;
        overflow: hidden;
        transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s,
                    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s,
                    max-height 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .ceo-final-cta.is-show {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
        max-height: 200px;
      }
      .ceo-cta-wsp {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 14px 22px 14px 20px;
        border-radius: 999px;
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-size: 15px;
        font-weight: 600;
        letter-spacing: -0.01em;
        color: #fff;
        background: linear-gradient(135deg, #1faf52 0%, #25d366 50%, #1faf52 100%);
        box-shadow:
          0 14px 30px -8px rgba(37, 211, 102, 0.55),
          inset 0 1px 0 rgba(255, 255, 255, 0.22);
        overflow: hidden;
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
      }
      .ceo-cta-wsp:hover {
        transform: translateY(-2px) scale(1.02);
        box-shadow:
          0 18px 40px -8px rgba(37, 211, 102, 0.7),
          inset 0 1px 0 rgba(255, 255, 255, 0.28);
      }
      .ceo-cta-wsp:hover svg:last-child {
        transform: translateX(3px);
      }
      .ceo-cta-wsp svg { position: relative; z-index: 1; }
      .ceo-cta-wsp svg:last-child { transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1); }
      .ceo-cta-wsp span { position: relative; z-index: 1; }
      .ceo-cta-shimmer {
        position: absolute;
        top: 0; left: -100%;
        width: 60%; height: 100%;
        background: linear-gradient(110deg, transparent 30%, rgba(255, 255, 255, 0.35) 50%, transparent 70%);
        animation: ceo-cta-sweep 3.5s ease-in-out infinite;
        pointer-events: none;
      }
      @keyframes ceo-cta-sweep {
        0%, 100% { transform: translateX(0); opacity: 0; }
        25%      { opacity: 1; }
        50%      { transform: translateX(420%); opacity: 1; }
        75%      { opacity: 0; }
      }
      .ceo-cta-sub {
        margin-top: 12px;
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10.5px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.50);
      }
      .ceo-cta-sub strong {
        color: rgba(255, 255, 255, 0.85);
        font-weight: 600;
      }

      /* ─────────── STEPPER COMPACTO (4 barras) ─────────── */
      .ceo-stepper {
        display: flex;
        gap: 6px;
        max-width: 560px;
        margin: 48px auto 14px;
        position: relative;
        z-index: 2;
      }
      .ceo-step-bar {
        flex: 1;
        position: relative;
        height: 3px;
        padding: 0;
        background: rgba(255, 255, 255, 0.08);
        border: none;
        border-radius: 999px;
        cursor: pointer;
        overflow: visible;
        transition: height 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s ease, transform 0.3s ease;
      }
      .ceo-step-bar::before {
        /* área de click expandida para 44px+ touch target en mobile */
        content: '';
        position: absolute;
        inset: -22px 0;
      }
      .ceo-step-bar:hover {
        background: rgba(255, 255, 255, 0.18);
        transform: scaleY(1.5);
      }
      .ceo-step-bar.is-passed {
        background: rgba(91, 155, 255, 0.40);
      }
      .ceo-step-bar.is-active {
        height: 5px;
        background: rgba(91, 155, 255, 0.18);
      }
      .ceo-step-bar.is-active:hover {
        transform: none;
      }
      .ceo-step-bar-num {
        position: absolute;
        bottom: calc(100% + 10px);
        left: 50%;
        transform: translateX(-50%);
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 9.5px;
        letter-spacing: 0.2em;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.30);
        font-variant-numeric: tabular-nums;
        transition: color 0.3s ease;
        pointer-events: none;
      }
      .ceo-step-bar.is-active .ceo-step-bar-num { color: var(--c-blue); }
      .ceo-step-bar.is-passed .ceo-step-bar-num { color: rgba(91, 155, 255, 0.55); }
      .ceo-step-bar:hover .ceo-step-bar-num { color: rgba(255, 255, 255, 0.65); }

      .ceo-step-bar-fill {
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, var(--c-blue), var(--c-blue-2, #8fb8ff));
        border-radius: 999px;
        transform-origin: left;
        transform: scaleX(0);
        animation: ceo-bar-fill 6.5s linear forwards;
        box-shadow: 0 0 8px rgba(91, 155, 255, 0.5);
      }
      .ceo-step-bar-fill.paused { animation-play-state: paused; }
      @keyframes ceo-bar-fill { to { transform: scaleX(1); } }

      .ceo-step-bar-tooltip {
        position: absolute;
        top: calc(100% + 14px);
        left: 50%;
        transform: translateX(-50%) translateY(-4px);
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.85);
        background: rgba(8, 8, 10, 0.78);
        backdrop-filter: blur(12px);
        padding: 5px 9px;
        border-radius: 6px;
        border: 1px solid rgba(255, 255, 255, 0.10);
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 8;
      }
      .ceo-step-bar:hover .ceo-step-bar-tooltip {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
      .ceo-step-bar.is-active .ceo-step-bar-tooltip {
        /* hidden cuando está active (el label de abajo ya muestra la fase) */
        opacity: 0 !important;
      }

      /* Label de la fase activa (debajo del stepper) */
      .ceo-stepper-label {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        max-width: 560px;
        margin: 0 auto;
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 11px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.85);
        animation: ceo-stepper-label-in 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      }
      @keyframes ceo-stepper-label-in {
        from { opacity: 0; transform: translateY(4px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .ceo-stepper-label-num {
        color: var(--c-blue);
        font-variant-numeric: tabular-nums;
      }
      .ceo-stepper-label-sep {
        width: 16px; height: 1px;
        background: rgba(255, 255, 255, 0.30);
      }

      @media (prefers-reduced-motion: reduce) {
        .ceo-photo.is-active,
        .ceo-cta-shimmer,
        .ceo-photo-badge-dot,
        .ceo-step-progress-fill,
        .ceo-phrase,
        .ceo-headline-line,
        .ceo-kicker-bar { animation: none !important; }
      }
    `}</style>
  )
}
