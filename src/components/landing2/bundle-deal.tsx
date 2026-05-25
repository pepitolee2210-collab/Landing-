'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { SITE } from '@/lib/site'
import { whatsappUrl } from '@/lib/utils'

/**
 * BundleDeal v3 — Cinematic Storyboard "Visa Juvenil SIJS · 3 fases"
 * - Fase 01: papel + firma judicial + sello cayendo
 * - Fase 02: papel morph → celular + sistema auto-fill I-360
 * - Fase 03: green card holográfica emergente del celular
 * - Desktop: 3 escenas lado a lado, la activa con glow + scale
 * - Mobile: 1 escena activa grande, stepper para navegación
 * - Auto-rotate 7s, click para saltar
 */

type Phase = 0 | 1 | 2

const PHASES = [
  {
    num: '01',
    phase: 'Custodia',
    title: 'Corte Estatal',
    weeks: 'Sem 1 — 12',
    color: 'green',
    deliverable: 'Special Findings Order',
    body: 'Audiencia con juez. Documentos traducidos. Orden firmada que abre la puerta.',
  },
  {
    num: '02',
    phase: 'I-360',
    title: 'USCIS · Petición Federal',
    weeks: 'Sem 13 — 28',
    color: 'blue',
    deliverable: 'Petición federal',
    body: 'Estatus SIJS. Respuestas a RFE. La plataforma autocompleta lo legal.',
  },
  {
    num: '03',
    phase: 'I-485',
    title: 'Green Card',
    weeks: 'Sem 29+',
    color: 'gold',
    deliverable: 'Ajuste de Estatus',
    body: 'I-485 + I-693 médico. Biométricos. Entrevista USCIS. Residencia permanente.',
  },
] as const

export function BundleDeal() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [active, setActive] = useState<Phase>(0)
  const [paused, setPaused] = useState(false)
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const current = PHASES[active]

  // Cleanup del setTimeout de pausa al desmontar — evita state update
  // sobre componente desmontado si user navega antes de que pasen los 10s.
  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current)
    }
  }, [])

  // Auto-rotate 7s (sin halftone-glow para evitar repaints constantes)
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setActive((i) => ((i + 1) % 3) as Phase)
    }, 7000)
    return () => clearInterval(id)
  }, [paused])

  function goTo(i: Phase) {
    setActive(i)
    setPaused(true)
    // Cancelar timer anterior si el user clickea rápido entre fases
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current)
    pauseTimerRef.current = setTimeout(() => setPaused(false), 10000)
  }

  return (
    <section
      ref={sectionRef}
      id="planes"
      className="bundle-section relative py-24 md:py-32 overflow-hidden"
    >
      {/* Halftone bg (static, sin glow cursor para evitar repaint constante) */}
      <div aria-hidden className="bundle-dotmatrix" />

      <div className="l2-container relative">
        {/* HEADER editorial */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="bundle-kicker">
            <span aria-hidden className="bundle-kicker-bar" />
            <span className="bundle-kicker-text">Producto Estrella</span>
            <span aria-hidden className="bundle-kicker-num">03</span>
          </div>

          <h2 className="bundle-headline">
            <span className="bundle-headline-line bundle-headline-1">Visa Juvenil <strong>SIJS</strong></span>
            <span className="bundle-headline-line bundle-headline-2">3 fases · <em>1 plataforma</em>.</span>
          </h2>

          <div aria-hidden className="bundle-divider" />

          <p className="bundle-meta">
            <span>De la corte estatal a la Green Card</span>
            <span className="bundle-meta-dot" />
            <span>desde tu celular</span>
          </p>

          {/* Elegibilidad pills */}
          <div className="bundle-elig">
            <span className="bundle-elig-label">¿Califica tu hijo?</span>
            <EligPill text="Menor de 21" />
            <EligPill text="Soltero/a" />
            <EligPill text="Abuso · Negligencia · Abandono" />
          </div>
        </div>

        {/* DESKTOP: 3 escenas */}
        <div
          className="bundle-stage-desktop"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {[0, 1, 2].map((i) => (
            <PhaseScreen
              key={i}
              phase={i as Phase}
              isActive={active === i}
              onClick={() => goTo(i as Phase)}
            />
          ))}
        </div>

        {/* MOBILE: 1 escena activa grande */}
        <div className="bundle-stage-mobile">
          <PhaseScreen
            key={`mobile-${active}`}
            phase={active}
            isActive={true}
            onClick={() => {}}
            mobile
          />
        </div>

        {/* Stepper compacto */}
        <div className="bundle-stepper" role="tablist">
          {PHASES.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i as Phase)}
              className={`bundle-step-bar bundle-step-${p.color} ${active === i ? 'is-active' : ''} ${i < active ? 'is-passed' : ''}`}
              aria-label={`Fase ${i + 1}: ${p.phase}`}
              aria-selected={active === i}
              role="tab"
            >
              <span className="bundle-step-num">{p.num}</span>
              {active === i && (
                <span
                  aria-hidden
                  className={`bundle-step-fill ${paused ? 'paused' : ''}`}
                  key={`fill-${active}`}
                />
              )}
              <span aria-hidden className="bundle-step-tooltip">{p.phase}</span>
            </button>
          ))}
        </div>

        <p className="bundle-stepper-label" key={`label-${active}`}>
          <span className="bundle-stepper-label-num">{current.num}</span>
          <span className="bundle-stepper-label-sep" />
          <span className={`bundle-stepper-label-text bundle-text-${current.color}`}>
            {current.phase}
          </span>
          <span className="bundle-stepper-label-meta">· {current.title}</span>
        </p>

        {/* Phase body (dynamic) */}
        <p className="bundle-phase-body" key={`body-${active}`}>
          {current.body}
        </p>

        {/* CTA Footer */}
        <CtaFooter />
      </div>

      <Styles />
    </section>
  )
}

/* ─────────── ELIGIBILITY PILL ─────────── */
function EligPill({ text }: { text: string }) {
  return (
    <span className="bundle-elig-pill">
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path d="M3 6l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {text}
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PHASE SCREEN — wrapper de la escena animada
   ═══════════════════════════════════════════════════════════════ */
function PhaseScreen({
  phase,
  isActive,
  onClick,
  mobile,
}: {
  phase: Phase
  isActive: boolean
  onClick: () => void
  mobile?: boolean
}) {
  const p = PHASES[phase]
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bundle-screen bundle-screen-${p.color} ${isActive ? 'is-active' : ''} ${mobile ? 'is-mobile' : ''}`}
      aria-label={`Fase ${p.num}: ${p.phase}`}
      tabIndex={mobile ? -1 : 0}
    >
      <span aria-hidden className="bundle-screen-hairline" />
      <span aria-hidden className="bundle-screen-glow" />

      <div className="bundle-screen-inner">
        <div className="bundle-screen-head">
          <span className="bundle-screen-num">{p.num}</span>
          <span className="bundle-screen-status">
            <span aria-hidden className="bundle-screen-status-dot" />
            {isActive ? 'En vivo' : 'Esperando'}
          </span>
        </div>

        <div className="bundle-anim-stage">
          {phase === 0 && <Phase1Custodia active={isActive} />}
          {phase === 1 && <Phase2I360 active={isActive} />}
          {phase === 2 && <Phase3GreenCard active={isActive} />}
        </div>

        <div className="bundle-screen-caption">
          <p className="bundle-screen-phase">{p.phase}</p>
          <p className="bundle-screen-weeks">{p.weeks} · {p.deliverable}</p>
        </div>
      </div>
    </button>
  )
}

/* ─── Hook compartido: reinicia animaciones via class toggle + reflow ─── */
function useAnimReplay(active: boolean) {
  const ref = useRef<SVGSVGElement | null>(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || !active) return
    el.classList.remove('is-animating')
    // Force reflow para que el browser re-aplique la animación
    void el.getBoundingClientRect()
    el.classList.add('is-animating')
  }, [active])
  return ref
}

/* ═══════════════════════════════════════════════════════════════
   PHASE 1 — CUSTODIA · papel + firma + sello cayendo
   ═══════════════════════════════════════════════════════════════ */
function Phase1Custodia({ active }: { active: boolean }) {
  const ref = useAnimReplay(active)
  return (
    <svg
      ref={ref}
      viewBox="0 0 280 320"
      className={`bundle-anim ${active ? 'is-animating' : ''}`}
      aria-hidden
    >
      <defs>
        <linearGradient id="paper-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(248,243,228,0.10)" />
          <stop offset="100%" stopColor="rgba(248,243,228,0.04)" />
        </linearGradient>
        <radialGradient id="stamp-glow" cx="0.5" cy="0.5">
          <stop offset="0%" stopColor="rgba(255,77,109,0.35)" />
          <stop offset="100%" stopColor="rgba(255,77,109,0)" />
        </radialGradient>
      </defs>

      {/* Paper (sin filter heavy — el box-shadow del container ya da profundidad) */}
      <g className="anim-paper" style={{ transformOrigin: '140px 160px' }}>
        <rect
          x="40" y="30" width="200" height="260" rx="3"
          fill="url(#paper-grad)"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
          transform="rotate(-1.5 140 160)"
        />
        <g transform="rotate(-1.5 140 160)">
          {/* Header */}
          <text x="55" y="55" fill="rgba(255,255,255,0.55)" fontSize="7.5" fontFamily="monospace" letterSpacing="1.5">
            UTAH JUVENILE COURT
          </text>
          <line x1="55" y1="62" x2="225" y2="62" stroke="rgba(255,255,255,0.20)" strokeWidth="0.5" />
          <text x="55" y="78" fill="rgba(255,255,255,0.85)" fontSize="11" fontFamily="serif" fontWeight="700">
            SPECIAL FINDINGS ORDER
          </text>

          {/* Text lines */}
          {[
            { y: 100, w: 170, delay: 0.5 },
            { y: 112, w: 155, delay: 0.7 },
            { y: 124, w: 178, delay: 0.9 },
            { y: 136, w: 142, delay: 1.1 },
            { y: 156, w: 165, delay: 1.3 },
            { y: 168, w: 130, delay: 1.5 },
            { y: 180, w: 170, delay: 1.7 },
          ].map((l, i) => (
            <rect
              key={i}
              className="anim-paper-line"
              x="55" y={l.y} height="3" rx="1.5"
              fill="rgba(255,255,255,0.20)"
              style={{
                width: `${l.w}px`,
                ['--delay' as never]: `${l.delay}s`,
                transformOrigin: '55px center',
              }}
            />
          ))}

          {/* Signature line label */}
          <text x="55" y="225" fill="rgba(255,255,255,0.40)" fontSize="7" fontFamily="monospace" letterSpacing="1">
            JUDGE&apos;S SIGNATURE
          </text>
          <line x1="55" y1="232" x2="200" y2="232" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" strokeDasharray="2 2" />

          {/* Signature stroke animated */}
          <path
            className="anim-signature"
            d="M 60 224 C 70 218, 80 230, 95 222 S 115 226, 130 220 S 155 228, 180 220"
            stroke="var(--c-blue-2)"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{}}
          />
        </g>
      </g>

      {/* Stamp */}
      <g className="anim-stamp" style={{ transformOrigin: '195px 252px' }}>
        <circle cx="195" cy="252" r="34" fill="url(#stamp-glow)" opacity="0.5" />
        <circle cx="195" cy="252" r="26" fill="rgba(255,77,109,0.06)" stroke="var(--c-red)" strokeWidth="2" />
        <circle cx="195" cy="252" r="22" stroke="var(--c-red)" strokeWidth="0.6" fill="none" opacity="0.55" />
        <text x="195" y="248" textAnchor="middle" fill="var(--c-red)" fontSize="7" fontFamily="serif" fontWeight="700" letterSpacing="0.6">
          APPROVED
        </text>
        <text x="195" y="258" textAnchor="middle" fill="var(--c-red)" fontSize="6" fontFamily="monospace" letterSpacing="1">
          STATE COURT
        </text>
        <text x="195" y="266" textAnchor="middle" fill="var(--c-red)" fontSize="5.5" fontFamily="monospace" opacity="0.7">
          2026
        </text>
      </g>
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PHASE 2 — I-360 · papel pliega → celular + form auto-fill
   ═══════════════════════════════════════════════════════════════ */
function Phase2I360({ active }: { active: boolean }) {
  const ref = useAnimReplay(active)
  return (
    <svg
      ref={ref}
      viewBox="0 0 280 320"
      className={`bundle-anim ${active ? 'is-animating' : ''}`}
      aria-hidden
    >
      <defs>
        <linearGradient id="phone-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(15,18,36,0.95)" />
          <stop offset="100%" stopColor="rgba(8,10,22,0.95)" />
        </linearGradient>
        <linearGradient id="phone-bezel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(48,52,68,1)" />
          <stop offset="100%" stopColor="rgba(28,30,42,1)" />
        </linearGradient>
      </defs>

      {/* Paper that folds out */}
      <g className="anim-paper-fold" style={{ transformOrigin: '140px 160px' }}>
        <rect
          x="60" y="40" width="160" height="220" rx="3"
          fill="rgba(248,243,228,0.08)"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
        />
        <line x1="75" y1="60" x2="205" y2="60" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
        <line x1="75" y1="75" x2="195" y2="75" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />
        <line x1="75" y1="90" x2="200" y2="90" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />
        <text x="140" y="155" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace" letterSpacing="2">
          MIGRANDO...
        </text>
      </g>

      {/* Phone */}
      <g className="anim-phone" style={{ transformOrigin: '140px 160px' }}>
        {/* Bezel */}
        <rect
          x="80" y="20" width="120" height="280" rx="22"
          fill="url(#phone-bezel)"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="0.8"
        />
        {/* Screen */}
        <rect x="86" y="30" width="108" height="260" rx="16" fill="url(#phone-screen)" />

        {/* Dynamic island */}
        <rect x="120" y="34" width="40" height="8" rx="4" fill="rgba(0,0,0,0.95)" stroke="rgba(255,255,255,0.10)" strokeWidth="0.4" />

        {/* App header */}
        <g className="anim-app-header">
          <rect x="92" y="50" width="96" height="24" rx="6" fill="rgba(91,155,255,0.10)" stroke="rgba(91,155,255,0.30)" strokeWidth="0.5" />
          <circle cx="100" cy="62" r="3" fill="var(--c-green)" className="anim-pulse-dot" />
          <text x="108" y="65" fill="rgba(255,255,255,0.85)" fontSize="6.5" fontFamily="monospace" letterSpacing="1" fontWeight="600">
            USCIS · I-360
          </text>
        </g>

        {/* Form rows — fill animated */}
        {[
          { y: 84, label: 'Nombre completo', delay: 1.4 },
          { y: 110, label: 'Fecha nacimiento', delay: 1.7 },
          { y: 136, label: 'Domicilio Utah', delay: 2.0 },
          { y: 162, label: 'Padre/Tutor', delay: 2.3 },
          { y: 188, label: 'Orden de custodia', delay: 2.6 },
          { y: 214, label: 'Declaración SIJS', delay: 2.9 },
        ].map((row, i) => (
          <g key={i}>
            <text
              x="92" y={row.y}
              fill="rgba(255,255,255,0.45)"
              fontSize="5.5"
              fontFamily="monospace"
              letterSpacing="0.5"
              className="anim-form-label"
              style={{ ['--delay' as never]: `${row.delay - 0.1}s` }}
            >
              {row.label.toUpperCase()}
            </text>
            <rect
              x="92" y={row.y + 3} width="96" height="10" rx="2"
              fill="rgba(255,255,255,0.04)"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.4"
            />
            <rect
              x="92" y={row.y + 3}
              height="10" rx="2"
              fill="rgba(91,155,255,0.18)"
              className="anim-form-fill"
              style={{
                width: '90px',
                ['--delay' as never]: `${row.delay}s`,
                transformOrigin: '92px center',
              }}
            />
            <g
              className="anim-form-check"
              style={{ ['--delay' as never]: `${row.delay + 0.55}s` }}
              transform={`translate(180 ${row.y + 8})`}
            >
              <circle r="3.5" fill="var(--c-green)" />
              <path d="M -1.5 0 L 0 1.5 L 2.5 -1.5" stroke="#0a0a0a" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
        ))}

        {/* Status badge bottom */}
        <g className="anim-status-badge" transform="translate(140 256)">
          <rect x="-30" y="-8" width="60" height="16" rx="8" fill="rgba(34,255,160,0.14)" stroke="rgba(34,255,160,0.40)" strokeWidth="0.5" />
          <circle cx="-22" cy="0" r="2" fill="var(--c-green)" />
          <text x="-17" y="2.5" fill="#6effc7" fontSize="6" fontFamily="monospace" letterSpacing="1" fontWeight="600">
            PETICIÓN ENVIADA
          </text>
        </g>

        {/* Bottom indicator (iOS home bar) */}
        <rect x="120" y="282" width="40" height="2" rx="1" fill="rgba(255,255,255,0.4)" />
      </g>
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PHASE 3 — GREEN CARD · holográfica emergente
   ═══════════════════════════════════════════════════════════════ */
function Phase3GreenCard({ active }: { active: boolean }) {
  const ref = useAnimReplay(active)
  return (
    <svg
      ref={ref}
      viewBox="0 0 280 320"
      className={`bundle-anim ${active ? 'is-animating' : ''}`}
      aria-hidden
    >
      <defs>
        <linearGradient id="gc-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1b5e3f" />
          <stop offset="50%" stopColor="#22a072" />
          <stop offset="100%" stopColor="#0d3a26" />
        </linearGradient>
        <linearGradient id="gc-holo" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="40%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="60%" stopColor="rgba(180,255,220,0.20)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="phone-bezel-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(48,52,68,1)" />
          <stop offset="100%" stopColor="rgba(28,30,42,1)" />
        </linearGradient>
        <linearGradient id="phone-screen-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(8,18,14,0.95)" />
          <stop offset="100%" stopColor="rgba(4,8,6,0.98)" />
        </linearGradient>
        <radialGradient id="success-glow" cx="0.5" cy="0.5">
          <stop offset="0%" stopColor="rgba(34,255,160,0.35)" />
          <stop offset="100%" stopColor="rgba(34,255,160,0)" />
        </radialGradient>
      </defs>

      {/* Background success glow */}
      <ellipse cx="140" cy="180" rx="120" ry="100" fill="url(#success-glow)" className="anim-success-glow" />

      {/* Phone */}
      <g style={{ transformOrigin: '140px 160px' }}>
        <rect
          x="80" y="20" width="120" height="280" rx="22"
          fill="url(#phone-bezel-2)"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="0.8"
        />
        <rect x="86" y="30" width="108" height="260" rx="16" fill="url(#phone-screen-2)" />
        <rect x="120" y="34" width="40" height="8" rx="4" fill="rgba(0,0,0,0.95)" stroke="rgba(255,255,255,0.10)" strokeWidth="0.4" />

        {/* Header APPROVED */}
        <g className="anim-approved-header">
          <rect x="92" y="50" width="96" height="22" rx="6" fill="rgba(34,255,160,0.14)" stroke="rgba(34,255,160,0.40)" strokeWidth="0.6" />
          <circle cx="100" cy="61" r="3" fill="var(--c-green)" className="anim-pulse-dot" />
          <text x="108" y="64" fill="#6effc7" fontSize="7" fontFamily="monospace" letterSpacing="1.2" fontWeight="700">
            I-485 · APPROVED
          </text>
        </g>

        {/* Confirmation message */}
        <text x="140" y="92" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="6.5" fontFamily="monospace" letterSpacing="1">
          RESIDENCIA APROBADA
        </text>

        {/* GREEN CARD emergent */}
        <g className="anim-greencard" style={{ transformOrigin: '140px 200px' }}>
          {/* Card body */}
          <rect
            x="96" y="120" width="88" height="120" rx="6"
            fill="url(#gc-grad)"
            stroke="rgba(180,255,210,0.4)"
            strokeWidth="0.6"
          />
          {/* Holographic shine sweeping */}
          <rect
            x="96" y="120" width="88" height="120" rx="6"
            fill="url(#gc-holo)"
            className="anim-card-shine"
          />
          {/* Top stripe */}
          <rect x="96" y="120" width="88" height="14" rx="6" fill="rgba(255,255,255,0.08)" />
          <text x="140" y="129" textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize="5" fontFamily="serif" fontWeight="700" letterSpacing="1.2">
            UNITED STATES OF AMERICA
          </text>
          {/* PERMANENT RESIDENT */}
          <text x="140" y="142" textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize="7" fontFamily="serif" fontWeight="700" letterSpacing="1.2">
            PERMANENT RESIDENT
          </text>
          {/* Photo area */}
          <rect x="104" y="148" width="34" height="44" rx="2" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.20)" strokeWidth="0.4" />
          <circle cx="121" cy="166" r="6" fill="rgba(255,255,255,0.18)" />
          <ellipse cx="121" cy="180" rx="8" ry="5" fill="rgba(255,255,255,0.18)" />
          {/* Card data */}
          <text x="144" y="156" fill="rgba(255,255,255,0.50)" fontSize="4" fontFamily="monospace" letterSpacing="0.8">
            SURNAME
          </text>
          <rect x="144" y="159" width="34" height="2.5" rx="1" fill="rgba(255,255,255,0.5)" />
          <text x="144" y="170" fill="rgba(255,255,255,0.50)" fontSize="4" fontFamily="monospace" letterSpacing="0.8">
            GIVEN NAME
          </text>
          <rect x="144" y="173" width="32" height="2.5" rx="1" fill="rgba(255,255,255,0.5)" />
          <text x="144" y="184" fill="rgba(255,255,255,0.50)" fontSize="4" fontFamily="monospace" letterSpacing="0.8">
            USCIS #
          </text>
          <rect x="144" y="187" width="28" height="2.5" rx="1" fill="rgba(255,255,255,0.5)" />

          {/* Holographic eagle ghost */}
          <text x="120" y="222" fill="rgba(255,255,255,0.30)" fontSize="14" textAnchor="middle">★</text>
          <text x="140" y="222" fill="rgba(255,255,255,0.40)" fontSize="14" textAnchor="middle">★</text>
          <text x="160" y="222" fill="rgba(255,255,255,0.30)" fontSize="14" textAnchor="middle">★</text>

          {/* MRZ stripe */}
          <rect x="96" y="228" width="88" height="12" rx="0" fill="rgba(0,0,0,0.3)" />
          <text x="100" y="236" fill="rgba(180,255,210,0.6)" fontSize="3.5" fontFamily="monospace" letterSpacing="0.4">
            P&lt;USAORELLANA&lt;&lt;HENRY&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
          </text>
        </g>

        {/* Confetti particles */}
        {[
          { x: 110, dx: -20, color: 'var(--c-green)', delay: 1.6 },
          { x: 140, dx: 0, color: 'var(--c-gold)', delay: 1.7 },
          { x: 170, dx: 22, color: 'var(--c-blue)', delay: 1.8 },
          { x: 100, dx: -30, color: 'var(--c-gold)', delay: 2.0 },
          { x: 180, dx: 30, color: 'var(--c-green)', delay: 2.1 },
          { x: 130, dx: -8, color: 'var(--c-blue-2)', delay: 2.3 },
          { x: 160, dx: 10, color: 'var(--c-green)', delay: 2.5 },
        ].map((c, i) => (
          <circle
            key={i}
            className="anim-confetti"
            cx={c.x} cy="270" r="2"
            fill={c.color}
            style={{
              ['--delay' as never]: `${c.delay}s`,
              ['--dx' as never]: `${c.dx}px`,
            }}
          />
        ))}

        {/* Bottom indicator */}
        <rect x="120" y="282" width="40" height="2" rx="1" fill="rgba(255,255,255,0.4)" />
      </g>
    </svg>
  )
}

/* ─────────── CTA FOOTER ─────────── */
function CtaFooter() {
  return (
    <div className="bundle-cta-footer">
      <div className="bundle-cta-text">
        <p className="bundle-cta-title">¿Tu hijo califica?</p>
        <p className="bundle-cta-sub">Vanessa te responde en menos de 4 horas · 100% confidencial</p>
      </div>
      <div className="bundle-cta-actions">
        <Link href="#productos" className="bundle-cta-primary">
          <span aria-hidden className="bundle-cta-shimmer" />
          <span>Empezar mi caso</span>
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
            <path d="M1 5h11M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <a
          href={whatsappUrl(SITE.contact.whatsapp, 'Hola, quiero saber si mi hijo califica para Visa Juvenil (SIJS).')}
          target="_blank"
          rel="noopener noreferrer"
          className="bundle-cta-wsp"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12.03 2C6.5 2 2.04 6.45 2.04 11.95c0 1.96.57 3.78 1.56 5.31L2 22l4.93-1.57c1.46.8 3.13 1.26 4.95 1.26h.01c5.53 0 10.02-4.46 10.02-9.95C21.91 6.45 17.45 2 12.03 2z" />
          </svg>
          Pregunta si calificas
        </a>
      </div>
    </div>
  )
}

function Styles() {
  return (
    <style jsx global>{`
      .bundle-section { position: relative; }

      /* ── HALFTONE BG (estático para perf) ── */
      .bundle-dotmatrix {
        position: absolute;
        inset: 0;
        background-image: radial-gradient(circle, rgba(200,220,255,0.10) 1px, transparent 1.5px);
        background-size: 26px 26px;
        -webkit-mask: radial-gradient(ellipse 80% 70% at center, transparent 18%, rgba(0,0,0,0.55) 55%, black 85%);
        mask: radial-gradient(ellipse 80% 70% at center, transparent 18%, rgba(0,0,0,0.55) 55%, black 85%);
        pointer-events: none;
        z-index: 0;
      }

      /* ── HEADER ── */
      .bundle-kicker {
        display: inline-flex; align-items: center; justify-content: center;
        gap: 14px; margin-bottom: 32px;
      }
      .bundle-kicker-bar {
        display: inline-block; width: 56px; height: 1px;
        background: linear-gradient(90deg, transparent, var(--c-gold));
        animation: bundle-bar-in 1s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      @keyframes bundle-bar-in { from { width: 0; opacity: 0; } to { opacity: 1; } }
      .bundle-kicker-text {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10.5px; font-weight: 600;
        letter-spacing: 0.35em; text-transform: uppercase;
        color: var(--c-gold);
      }
      .bundle-kicker-num {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10.5px; letter-spacing: 0.18em;
        color: rgba(255,255,255,0.28);
        font-variant-numeric: tabular-nums;
      }
      .bundle-headline {
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-size: clamp(2.2rem, 5.4vw, 4.2rem);
        line-height: 0.98; letter-spacing: -0.045em; font-weight: 500;
        color: rgba(255,255,255,0.96);
        display: flex; flex-direction: column;
        font-variation-settings: 'wdth' 95;
      }
      .bundle-headline strong { color: var(--c-blue); font-weight: 600; }
      .bundle-headline-line { display: block; animation: bundle-headline-in 0.95s cubic-bezier(0.16, 1, 0.3, 1) both; }
      .bundle-headline-1 { animation-delay: 0.05s; }
      .bundle-headline-2 { animation-delay: 0.18s; }
      .bundle-headline-2 em {
        font-style: italic; font-weight: 400;
        font-variation-settings: 'wdth' 90;
        color: var(--c-blue);
      }
      @keyframes bundle-headline-in {
        from { opacity: 0; transform: translateY(14px); filter: blur(6px); }
        to   { opacity: 1; transform: translateY(0); filter: blur(0); }
      }
      .bundle-divider {
        margin: 24px auto 16px;
        width: 32px; height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent);
      }
      .bundle-meta {
        display: inline-flex; align-items: center; justify-content: center;
        gap: 14px;
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
        color: rgba(255,255,255,0.42); flex-wrap: wrap;
      }
      .bundle-meta-dot { width: 2px; height: 2px; border-radius: 50%; background: rgba(255,255,255,0.30); }

      /* Eligibilidad */
      .bundle-elig {
        display: inline-flex; align-items: center; flex-wrap: wrap;
        gap: 8px; margin-top: 24px;
        max-width: 100%;
        justify-content: center;
      }
      .bundle-elig-label {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
        color: rgba(255,255,255,0.45);
        margin-right: 4px;
      }
      .bundle-elig-pill {
        display: inline-flex; align-items: center; gap: 6px;
        padding: 6px 12px;
        border-radius: 999px;
        background: rgba(91,155,255,0.07);
        border: 1px solid rgba(91,155,255,0.22);
        font-size: 11.5px;
        color: rgba(220, 230, 255, 0.85);
        backdrop-filter: blur(8px);
      }
      .bundle-elig-pill svg { color: var(--c-blue-2); }

      /* ═════════════ STAGE DESKTOP (3 escenas) ═════════════ */
      .bundle-stage-desktop {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        max-width: 1180px;
        margin: 0 auto;
        position: relative;
        z-index: 2;
      }
      @media (max-width: 900px) {
        .bundle-stage-desktop { display: none; }
      }

      .bundle-stage-mobile {
        display: none;
        max-width: 460px;
        margin: 0 auto;
        position: relative;
        z-index: 2;
      }
      @media (max-width: 900px) {
        .bundle-stage-mobile { display: block; }
      }

      /* ═════════════ PHASE SCREEN (card) ═════════════ */
      .bundle-screen {
        position: relative;
        background:
          linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%),
          rgba(14,14,18,0.6);
        backdrop-filter: blur(24px) saturate(150%);
        -webkit-backdrop-filter: blur(24px) saturate(150%);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 24px;
        overflow: hidden;
        padding: 0;
        cursor: pointer;
        text-align: left;
        font: inherit;
        color: inherit;
        transition:
          transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
          border-color 0.5s ease,
          box-shadow 0.5s ease,
          opacity 0.5s ease;
        opacity: 0.45;
      }
      .bundle-screen.is-mobile {
        cursor: default;
        opacity: 1;
        width: 100%;
        display: block;
      }
      .bundle-screen:hover { opacity: 0.78; }
      .bundle-screen.is-active {
        opacity: 1;
        transform: translateY(-4px);
      }
      .bundle-screen-green.is-active { border-color: rgba(34,255,160,0.30); box-shadow: 0 36px 70px -22px rgba(34,255,160,0.30), 0 1px 0 rgba(255,255,255,0.10) inset; }
      .bundle-screen-blue.is-active  { border-color: rgba(91,155,255,0.30); box-shadow: 0 36px 70px -22px rgba(91,155,255,0.35), 0 1px 0 rgba(255,255,255,0.10) inset; }
      .bundle-screen-gold.is-active  { border-color: rgba(242,178,52,0.30); box-shadow: 0 36px 70px -22px rgba(242,178,52,0.32), 0 1px 0 rgba(255,255,255,0.10) inset; }

      .bundle-screen-hairline {
        position: absolute;
        top: 0; left: 12%; right: 12%;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
        pointer-events: none;
        z-index: 5;
      }
      .bundle-screen-glow {
        position: absolute;
        inset: 0;
        opacity: 0;
        transition: opacity 0.5s ease;
        pointer-events: none;
        z-index: 0;
      }
      .bundle-screen-green.is-active .bundle-screen-glow { background: radial-gradient(circle at top, rgba(34,255,160,0.10), transparent 60%); opacity: 1; }
      .bundle-screen-blue.is-active .bundle-screen-glow { background: radial-gradient(circle at top, rgba(91,155,255,0.12), transparent 60%); opacity: 1; }
      .bundle-screen-gold.is-active .bundle-screen-glow { background: radial-gradient(circle at top, rgba(242,178,52,0.12), transparent 60%); opacity: 1; }

      .bundle-screen-inner {
        position: relative;
        z-index: 2;
        padding: 20px 22px 18px;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .bundle-screen.is-mobile .bundle-screen-inner {
        padding: 22px 24px 22px;
      }

      .bundle-screen-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      .bundle-screen-num {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.22em;
        color: rgba(255,255,255,0.42);
        font-variant-numeric: tabular-nums;
      }
      .bundle-screen.is-active .bundle-screen-num { color: rgba(255,255,255,0.85); }
      .bundle-screen-status {
        display: inline-flex; align-items: center; gap: 5px;
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 9px;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.35);
      }
      .bundle-screen-status-dot {
        width: 5px; height: 5px;
        border-radius: 50%;
        background: rgba(255,255,255,0.35);
      }
      .bundle-screen.is-active .bundle-screen-status-dot {
        background: var(--c-green);
        box-shadow: 0 0 6px var(--c-green);
        animation: bundle-status-pulse 1.4s ease-in-out infinite;
      }
      .bundle-screen.is-active .bundle-screen-status { color: #6effc7; }
      @keyframes bundle-status-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.45; } }

      .bundle-anim-stage {
        position: relative;
        flex: 1;
        width: 100%;
        aspect-ratio: 280 / 320;
        margin: 6px 0 8px;
      }
      .bundle-screen.is-mobile .bundle-anim-stage {
        max-width: 360px;
        margin: 12px auto;
      }
      .bundle-anim {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }

      .bundle-screen-caption {
        padding-top: 12px;
        border-top: 1px solid rgba(255,255,255,0.06);
      }
      .bundle-screen-phase {
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-size: 16px;
        font-weight: 600;
        letter-spacing: -0.01em;
        color: rgba(255,255,255,0.95);
      }
      .bundle-screen-weeks {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 9.5px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.45);
        margin-top: 4px;
      }

      /* ═════════════ PHASE 1 ANIMATIONS — Custodia ═════════════ */
      .anim-paper {
        opacity: 0;
        transform: scale(0.92) translateY(20px);
      }
      .is-animating .anim-paper {
        animation: anim-paper-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
      }
      @keyframes anim-paper-in {
        to { opacity: 1; transform: scale(1) translateY(0); }
      }
      .anim-paper-line {
        opacity: 0;
        transform: scaleX(0);
      }
      .is-animating .anim-paper-line {
        animation: anim-line-grow 0.45s cubic-bezier(0.16, 1, 0.3, 1) var(--delay) forwards;
      }
      @keyframes anim-line-grow {
        to { opacity: 1; transform: scaleX(1); }
      }
      .anim-signature {
        stroke-dasharray: 200;
        stroke-dashoffset: 200;
      }
      .is-animating .anim-signature {
        animation: anim-sig-draw 1.6s cubic-bezier(0.16, 1, 0.3, 1) 2.0s forwards;
      }
      @keyframes anim-sig-draw {
        to { stroke-dashoffset: 0; }
      }
      .anim-stamp {
        opacity: 0;
        transform: scale(0) rotate(-25deg);
      }
      .is-animating .anim-stamp {
        animation: anim-stamp-drop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 3.8s forwards;
      }
      @keyframes anim-stamp-drop {
        0%   { opacity: 0; transform: scale(0) rotate(-25deg); }
        70%  { opacity: 1; transform: scale(1.12) rotate(2deg); }
        100% { opacity: 1; transform: scale(1) rotate(0deg); }
      }

      /* Static final state when not animating */
      .bundle-anim:not(.is-animating) .anim-paper { opacity: 1; transform: none; }
      .bundle-anim:not(.is-animating) .anim-paper-line { opacity: 1; transform: scaleX(1); }
      .bundle-anim:not(.is-animating) .anim-signature { stroke-dashoffset: 0; }
      .bundle-anim:not(.is-animating) .anim-stamp { opacity: 0.85; transform: none; }

      /* ═════════════ PHASE 2 ANIMATIONS — I-360 ═════════════ */
      .anim-paper-fold {
        opacity: 1;
        transform: scale(1);
      }
      .is-animating .anim-paper-fold {
        animation: anim-paper-fold 1.0s cubic-bezier(0.7, 0, 0.3, 1) 0.2s forwards;
      }
      @keyframes anim-paper-fold {
        0%   { opacity: 1; transform: scale(1) rotateY(0); }
        100% { opacity: 0; transform: scale(0.6) rotateY(90deg); }
      }
      .anim-phone {
        opacity: 0;
        transform: scale(0.8) rotateY(-60deg);
      }
      .is-animating .anim-phone {
        animation: anim-phone-in 1s cubic-bezier(0.16, 1, 0.3, 1) 0.9s forwards;
      }
      @keyframes anim-phone-in {
        0%   { opacity: 0; transform: scale(0.8) rotateY(-60deg); }
        100% { opacity: 1; transform: scale(1) rotateY(0); }
      }
      .anim-form-label {
        opacity: 0;
      }
      .is-animating .anim-form-label {
        animation: anim-fade-in 0.3s ease var(--delay) forwards;
      }
      @keyframes anim-fade-in { to { opacity: 1; } }
      .anim-form-fill {
        opacity: 1;
        transform: scaleX(0);
      }
      .is-animating .anim-form-fill {
        animation: anim-fill-grow 0.5s cubic-bezier(0.16, 1, 0.3, 1) var(--delay) forwards;
      }
      @keyframes anim-fill-grow { to { transform: scaleX(1); } }
      .anim-form-check {
        opacity: 0;
        transform-box: fill-box;
        transform-origin: center;
        scale: 0;
      }
      .is-animating .anim-form-check {
        animation: anim-check-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) var(--delay) forwards;
      }
      @keyframes anim-check-pop {
        0%   { opacity: 0; scale: 0; }
        70%  { opacity: 1; scale: 1.3; }
        100% { opacity: 1; scale: 1; }
      }
      .anim-status-badge {
        opacity: 0;
      }
      .is-animating .anim-status-badge {
        animation: anim-fade-in 0.5s ease 4.0s forwards;
      }
      .anim-pulse-dot {
        animation: anim-pulse-dot 1.4s ease-in-out infinite;
      }
      @keyframes anim-pulse-dot { 0%,100% { opacity: 1; } 50% { opacity: 0.45; } }

      .bundle-anim:not(.is-animating) .anim-paper-fold { opacity: 0; }
      .bundle-anim:not(.is-animating) .anim-phone { opacity: 1; transform: none; }
      .bundle-anim:not(.is-animating) .anim-form-label { opacity: 1; }
      .bundle-anim:not(.is-animating) .anim-form-fill { transform: scaleX(1); }
      .bundle-anim:not(.is-animating) .anim-form-check { opacity: 1; scale: 1; }
      .bundle-anim:not(.is-animating) .anim-status-badge { opacity: 1; }

      /* ═════════════ PHASE 3 ANIMATIONS — Green Card ═════════════ */
      .anim-greencard {
        opacity: 0;
        transform: translateY(140px) scale(0.85);
      }
      .is-animating .anim-greencard {
        animation: anim-card-rise 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
      }
      @keyframes anim-card-rise {
        0%   { opacity: 0; transform: translateY(140px) scale(0.85); }
        70%  { opacity: 1; transform: translateY(-6px) scale(1.02); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }
      .anim-card-shine {
        opacity: 0;
        transform: translateX(-100%);
      }
      .is-animating .anim-card-shine {
        animation: anim-shine-sweep 2.5s cubic-bezier(0.4, 0, 0.6, 1) 1.8s infinite;
      }
      @keyframes anim-shine-sweep {
        0%   { opacity: 0; transform: translateX(-100%); }
        20%  { opacity: 1; }
        80%  { opacity: 1; }
        100% { opacity: 0; transform: translateX(100%); }
      }
      .anim-approved-header {
        opacity: 0;
      }
      .is-animating .anim-approved-header {
        animation: anim-fade-in 0.5s ease 0.2s forwards;
      }
      .anim-confetti {
        opacity: 0;
        transform-origin: center;
      }
      .is-animating .anim-confetti {
        animation: anim-confetti-fly 2.2s cubic-bezier(0.16, 1, 0.3, 1) var(--delay) forwards;
      }
      @keyframes anim-confetti-fly {
        0%   { opacity: 0; transform: translate(0, 0) scale(0); }
        20%  { opacity: 1; transform: translate(calc(var(--dx, 0px) * 0.3), -20px) scale(1); }
        100% { opacity: 0; transform: translate(var(--dx, 0px), -120px) scale(0.5); }
      }
      .anim-success-glow {
        opacity: 0;
      }
      .is-animating .anim-success-glow {
        animation: anim-glow-pulse 3s ease-in-out 0.5s infinite;
      }
      @keyframes anim-glow-pulse {
        0%, 100% { opacity: 0.4; }
        50%      { opacity: 0.8; }
      }

      .bundle-anim:not(.is-animating) .anim-greencard { opacity: 1; transform: none; }
      .bundle-anim:not(.is-animating) .anim-approved-header { opacity: 1; }
      .bundle-anim:not(.is-animating) .anim-success-glow { opacity: 0.3; }

      /* ═════════════ STEPPER COMPACTO ═════════════ */
      .bundle-stepper {
        display: flex;
        gap: 6px;
        max-width: 460px;
        margin: 36px auto 14px;
        position: relative;
        z-index: 2;
      }
      .bundle-step-bar {
        flex: 1;
        position: relative;
        height: 3px;
        padding: 0;
        background: rgba(255,255,255,0.08);
        border: none;
        border-radius: 999px;
        cursor: pointer;
        overflow: visible;
        transition: height 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s ease, transform 0.3s ease;
      }
      .bundle-step-bar::before {
        content: '';
        position: absolute;
        inset: -14px 0;
      }
      .bundle-step-bar:hover {
        background: rgba(255,255,255,0.18);
        transform: scaleY(1.5);
      }
      .bundle-step-bar.is-active { height: 5px; }
      .bundle-step-bar.is-active:hover { transform: none; }
      .bundle-step-green.is-passed { background: rgba(34,255,160,0.40); }
      .bundle-step-blue.is-passed  { background: rgba(91,155,255,0.40); }
      .bundle-step-gold.is-passed  { background: rgba(242,178,52,0.40); }
      .bundle-step-green.is-active { background: rgba(34,255,160,0.18); }
      .bundle-step-blue.is-active  { background: rgba(91,155,255,0.18); }
      .bundle-step-gold.is-active  { background: rgba(242,178,52,0.18); }

      .bundle-step-num {
        position: absolute;
        bottom: calc(100% + 10px);
        left: 50%;
        transform: translateX(-50%);
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 9.5px;
        letter-spacing: 0.2em;
        font-weight: 600;
        color: rgba(255,255,255,0.30);
        pointer-events: none;
        transition: color 0.3s ease;
      }
      .bundle-step-green.is-active .bundle-step-num { color: var(--c-green); }
      .bundle-step-blue.is-active .bundle-step-num  { color: var(--c-blue); }
      .bundle-step-gold.is-active .bundle-step-num  { color: var(--c-gold); }
      .bundle-step-green.is-passed .bundle-step-num { color: rgba(34,255,160,0.7); }
      .bundle-step-blue.is-passed .bundle-step-num  { color: rgba(91,155,255,0.7); }
      .bundle-step-gold.is-passed .bundle-step-num  { color: rgba(242,178,52,0.7); }

      .bundle-step-fill {
        position: absolute;
        inset: 0;
        border-radius: 999px;
        transform-origin: left;
        transform: scaleX(0);
        animation: bundle-step-fill 7s linear forwards;
      }
      .bundle-step-green .bundle-step-fill { background: linear-gradient(90deg, var(--c-green), #6effc7); box-shadow: 0 0 8px rgba(34,255,160,0.5); }
      .bundle-step-blue .bundle-step-fill  { background: linear-gradient(90deg, var(--c-blue), var(--c-blue-2, #8fb8ff)); box-shadow: 0 0 8px rgba(91,155,255,0.5); }
      .bundle-step-gold .bundle-step-fill  { background: linear-gradient(90deg, var(--c-gold), #ffd17a); box-shadow: 0 0 8px rgba(242,178,52,0.5); }
      .bundle-step-fill.paused { animation-play-state: paused; }
      @keyframes bundle-step-fill { to { transform: scaleX(1); } }

      .bundle-step-tooltip {
        position: absolute;
        top: calc(100% + 14px);
        left: 50%;
        transform: translateX(-50%) translateY(-4px);
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        font-weight: 600;
        color: rgba(255,255,255,0.85);
        background: rgba(8,8,10,0.78);
        backdrop-filter: blur(12px);
        padding: 5px 9px;
        border-radius: 6px;
        border: 1px solid rgba(255,255,255,0.10);
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 8;
      }
      .bundle-step-bar:hover .bundle-step-tooltip {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
      .bundle-step-bar.is-active .bundle-step-tooltip { opacity: 0 !important; }

      .bundle-stepper-label {
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
        color: rgba(255,255,255,0.85);
        animation: bundle-label-in 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        flex-wrap: wrap;
      }
      @keyframes bundle-label-in {
        from { opacity: 0; transform: translateY(4px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .bundle-stepper-label-num { font-variant-numeric: tabular-nums; }
      .bundle-stepper-label-sep { width: 16px; height: 1px; background: rgba(255,255,255,0.30); }
      .bundle-text-green { color: var(--c-green); }
      .bundle-text-blue { color: var(--c-blue); }
      .bundle-text-gold { color: var(--c-gold); }
      .bundle-stepper-label-meta {
        color: rgba(255,255,255,0.40);
        font-weight: 400;
        letter-spacing: 0.10em;
        text-transform: none;
      }

      .bundle-phase-body {
        max-width: 540px;
        margin: 18px auto 0;
        text-align: center;
        font-size: 14.5px;
        line-height: 1.55;
        color: rgba(255,255,255,0.62);
        animation: bundle-label-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
      }

      /* ═════════════ CTA FOOTER ═════════════ */
      .bundle-cta-footer {
        max-width: 920px;
        margin: 48px auto 0;
        padding: 22px 26px;
        border-radius: 18px;
        background:
          linear-gradient(135deg, rgba(91,155,255,0.06), rgba(34,255,160,0.04)),
          rgba(14, 14, 18, 0.6);
        backdrop-filter: blur(24px);
        border: 1px solid rgba(255,255,255,0.08);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        flex-wrap: wrap;
        position: relative;
        z-index: 2;
      }
      .bundle-cta-title {
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-size: 19px; font-weight: 600;
        color: rgba(255,255,255,0.96);
        letter-spacing: -0.015em;
      }
      .bundle-cta-sub {
        font-size: 13px;
        color: rgba(255,255,255,0.55);
        margin-top: 3px;
      }
      .bundle-cta-actions {
        display: inline-flex;
        gap: 10px;
        flex-wrap: wrap;
      }
      .bundle-cta-primary {
        position: relative;
        display: inline-flex; align-items: center; gap: 8px;
        padding: 11px 18px;
        border-radius: 999px;
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-size: 13.5px; font-weight: 600;
        color: #fff;
        background: linear-gradient(135deg, #5b9bff, #6f42c1);
        box-shadow: 0 10px 24px -6px rgba(91,155,255,0.5);
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .bundle-cta-primary:hover {
        transform: translateY(-1px);
        box-shadow: 0 14px 30px -6px rgba(91,155,255,0.6);
      }
      .bundle-cta-shimmer {
        position: absolute;
        top: 0; left: -100%;
        width: 50%; height: 100%;
        background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.30) 50%, transparent 70%);
        animation: bundle-cta-sweep 4s ease-in-out infinite;
        pointer-events: none;
      }
      @keyframes bundle-cta-sweep {
        0%, 100% { transform: translateX(0); opacity: 0; }
        25%      { opacity: 1; }
        50%      { transform: translateX(430%); opacity: 1; }
        75%      { opacity: 0; }
      }
      .bundle-cta-primary span { position: relative; z-index: 1; }
      .bundle-cta-primary svg { position: relative; z-index: 1; }
      .bundle-cta-wsp {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 11px 18px;
        border-radius: 999px;
        background: #25d366;
        color: #002b16;
        font-size: 13.5px; font-weight: 700;
        box-shadow: 0 10px 24px -6px rgba(37,211,102,0.5);
        transition: transform 0.3s ease;
      }
      .bundle-cta-wsp:hover { transform: translateY(-1px); }

      @media (prefers-reduced-motion: reduce) {
        .is-animating *,
        .bundle-anim *,
        .anim-pulse-dot,
        .anim-card-shine,
        .anim-success-glow,
        .anim-confetti,
        .bundle-kicker-bar,
        .bundle-headline-line,
        .bundle-step-fill,
        .bundle-cta-shimmer { animation: none !important; }
      }
    `}</style>
  )
}
