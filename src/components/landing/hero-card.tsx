'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Card protagonista del hero — se transforma entre 3 estados
 * cada 5s mostrando un estado distinto del caso migratorio.
 *
 * Estados:
 *   01 · CUSTODIA (corte estatal)
 *   02 · I-360 (USCIS petition)
 *   03 · RESIDENCIA (Green Card aprobada)
 *
 * Awwwards-style: transición suave, datos cambian con stagger,
 * borde dorado que se redibuja, status del caso evoluciona.
 */

type StageKey = 'custodia' | 'i360' | 'residencia'

const STAGES: Record<
  StageKey,
  {
    n: string
    code: string
    title: string
    subtitle: string
    holderName: string
    holderId: string
    progress: number
    color: string
    statusLabel: string
    accentBg: string
    docNumber: string
  }
> = {
  custodia: {
    n: '01',
    code: 'STATE COURT · UTAH',
    title: 'CUSTODY ORDER',
    subtitle: 'Special Findings · SIJS',
    holderName: 'LATINO PRIME',
    holderId: 'ULP·CUST·2026·001',
    progress: 33,
    color: 'var(--color-gold)',
    statusLabel: 'FIRMADO',
    accentBg: 'rgba(242, 178, 52, 0.06)',
    docNumber: 'CASE 25-0042-UT',
  },
  i360: {
    n: '02',
    code: 'USCIS · I-360',
    title: 'PETITION FILED',
    subtitle: 'Special Immigrant Juvenile',
    holderName: 'LATINO PRIME',
    holderId: 'ULP·I360·2026·001',
    progress: 66,
    color: 'var(--color-blue)',
    statusLabel: 'EN PROCESO',
    accentBg: 'rgba(76, 127, 211, 0.08)',
    docNumber: 'MSC2604120042',
  },
  residencia: {
    n: '03',
    code: 'USCIS · LPR',
    title: 'PERMANENT RESIDENT',
    subtitle: 'Green Card · Adjusted Status',
    holderName: 'LATINO PRIME',
    holderId: 'ULP·LPR·2026·001',
    progress: 100,
    color: 'var(--color-jade)',
    statusLabel: 'APROBADO',
    accentBg: 'rgba(52, 211, 153, 0.07)',
    docNumber: 'A·123-456-789',
  },
}

const ORDER: StageKey[] = ['custodia', 'i360', 'residencia']
const ROTATION_MS = 5500

export function HeroCard() {
  const [idx, setIdx] = useState(0)
  const [tilt, setTilt] = useState({ rx: -8, ry: 12 })
  const ref = useRef<HTMLDivElement>(null)

  // Auto rotación
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % ORDER.length), ROTATION_MS)
    return () => clearInterval(id)
  }, [])

  // Tilt al cursor
  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setTilt({ rx: 14 - y * 28, ry: -14 + x * 28 })
  }
  function handleMouseLeave() {
    setTilt({ rx: -8, ry: 12 })
  }

  const stage = STAGES[ORDER[idx]]

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[560px] mx-auto aspect-[5/6.2]"
      style={{ perspective: '1800px' }}
    >
      {/* Glow ambient detrás de la card */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none transition-colors duration-1000"
        style={{
          background: `radial-gradient(ellipse at center, ${stage.color} 0%, transparent 65%)`,
          opacity: 0.18,
          filter: 'blur(40px)',
        }}
      />

      {/* Stage label flotante arriba a la izquierda */}
      <div className="absolute -top-12 left-0 z-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-text-3)] mb-1">
          Fase activa
        </p>
        <p
          className="font-display transition-colors duration-700"
          style={{
            fontSize: '2rem',
            color: stage.color,
            fontWeight: 300,
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          {stage.n}<span className="text-[var(--color-text-3)]"> / 03</span>
        </p>
      </div>

      {/* Stage indicator vertical a la derecha */}
      <div className="absolute -top-8 right-0 z-10 flex flex-col gap-2.5">
        {ORDER.map((key, i) => (
          <button
            key={key}
            type="button"
            onClick={() => setIdx(i)}
            className="flex items-center gap-2 group"
            aria-label={`Ir a fase ${i + 1}`}
          >
            <span
              className="font-mono text-[9px] uppercase tracking-[0.18em] transition-colors duration-300"
              style={{
                color: i === idx ? STAGES[key].color : 'var(--color-text-4)',
              }}
            >
              {STAGES[key].n}
            </span>
            <span
              className="block transition-all duration-500"
              style={{
                width: i === idx ? 40 : 16,
                height: 1,
                background: i === idx ? STAGES[key].color : 'var(--color-line-2)',
              }}
            />
          </button>
        ))}
      </div>

      {/* La card 3D */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          willChange: 'transform',
        }}
      >
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden transition-colors duration-700"
          style={{
            background:
              'linear-gradient(140deg, var(--color-surface-2) 0%, var(--color-bg-2) 100%)',
            border: '1px solid var(--color-line-2)',
            boxShadow: `
              0 60px 100px -40px rgba(0, 0, 0, 0.7),
              0 30px 60px -20px ${stage.color},
              inset 0 1px 0 rgba(255, 255, 255, 0.05)
            `,
            transform: 'translateZ(30px)',
          }}
        >
          {/* Grid sutil dentro */}
          <div aria-hidden className="absolute inset-0 board-grid opacity-30" />

          {/* Borde luminoso del color del estado */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-2xl pointer-events-none transition-colors duration-700"
            style={{
              border: `1px solid ${stage.color}`,
              opacity: 0.4,
            }}
          />

          {/* === CONTENIDO === */}
          <div className="relative h-full p-7 md:p-9 flex flex-col">
            {/* HEADER */}
            <div className="flex items-start justify-between mb-7">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--color-text-3)] mb-1.5">
                  {stage.code}
                </p>
                <h3
                  key={`title-${idx}`}
                  className="font-display text-[var(--color-text)] transition-all duration-700"
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    animation: 'rise 0.7s var(--ease-out-expo) both',
                  }}
                >
                  {stage.title}
                </h3>
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.16em] mt-1 transition-colors duration-700"
                  style={{ color: stage.color }}
                >
                  {stage.subtitle}
                </p>
              </div>

              {/* Sello dinámico — círculo con el número de la etapa */}
              <div className="relative">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden>
                  <circle
                    cx="28"
                    cy="28"
                    r="26"
                    stroke={stage.color}
                    strokeWidth="1"
                    fill="none"
                    opacity="0.7"
                  />
                  <circle
                    cx="28"
                    cy="28"
                    r="20"
                    stroke={stage.color}
                    strokeWidth="0.6"
                    strokeDasharray="2 3"
                    fill="none"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 28 28"
                      to="360 28 28"
                      dur="24s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <text
                    x="28"
                    y="33"
                    textAnchor="middle"
                    fill={stage.color}
                    fontSize="14"
                    fontFamily="var(--font-display)"
                    fontWeight="500"
                  >
                    {stage.n}
                  </text>
                </svg>
              </div>
            </div>

            {/* DOC NUMBER (mono, grande) */}
            <div
              key={`doc-${idx}`}
              className="mb-7"
              style={{ animation: 'rise 0.8s 0.1s var(--ease-out-expo) both' }}
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--color-text-3)] mb-2">
                Document ID
              </p>
              <p
                className="font-mono text-[var(--color-text)]"
                style={{
                  fontSize: '1.5rem',
                  letterSpacing: '0.05em',
                  fontWeight: 600,
                }}
              >
                {stage.docNumber}
              </p>
            </div>

            {/* PROGRESS BAR */}
            <div className="mb-7">
              <div className="flex items-baseline justify-between mb-2">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--color-text-3)]">
                  Avance del caso
                </p>
                <p
                  key={`pct-${idx}`}
                  className="font-mono text-xs transition-colors duration-700"
                  style={{ color: stage.color }}
                >
                  {stage.progress}%
                </p>
              </div>
              <div
                className="relative h-1 rounded-full overflow-hidden"
                style={{ background: 'var(--color-line)' }}
              >
                <div
                  className="absolute inset-y-0 left-0 transition-all duration-1000 ease-out"
                  style={{
                    width: `${stage.progress}%`,
                    background: stage.color,
                    boxShadow: `0 0 8px ${stage.color}`,
                  }}
                />
              </div>
              <div className="grid grid-cols-3 mt-2 text-center">
                {ORDER.map((k, i) => (
                  <span
                    key={k}
                    className="font-mono text-[9px] uppercase tracking-[0.18em] transition-colors duration-500"
                    style={{
                      color: i <= idx ? STAGES[k].color : 'var(--color-text-4)',
                    }}
                  >
                    {STAGES[k].title.split(' ')[0]}
                  </span>
                ))}
              </div>
            </div>

            {/* SPACER */}
            <div className="flex-1" />

            {/* HOLDER + STATUS */}
            <div
              key={`footer-${idx}`}
              className="pt-6 border-t border-[var(--color-line-2)] flex items-end justify-between"
              style={{ animation: 'rise 0.8s 0.2s var(--ease-out-expo) both' }}
            >
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--color-text-3)] mb-1">
                  Holder
                </p>
                <p
                  className="font-display text-[var(--color-text)]"
                  style={{ fontSize: '1.125rem', letterSpacing: '0.04em', fontWeight: 600 }}
                >
                  {stage.holderName}
                </p>
                <p
                  className="font-mono text-[10px] text-[var(--color-text-2)] mt-0.5"
                  style={{ letterSpacing: '0.05em' }}
                >
                  {stage.holderId}
                </p>
              </div>

              <div className="text-right">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--color-text-3)] mb-1">
                  Status
                </p>
                <span
                  className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-700"
                  style={{ color: stage.color }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: stage.color,
                      boxShadow: `0 0 8px ${stage.color}`,
                    }}
                  />
                  {stage.statusLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Líneas verticales que se "conectan" al PCB de fondo (decorativas) */}
          <div
            aria-hidden
            className="absolute -left-px top-1/4 w-px h-12 transition-colors duration-700"
            style={{ background: stage.color, opacity: 0.6 }}
          />
          <div
            aria-hidden
            className="absolute -right-px top-2/3 w-px h-16 transition-colors duration-700"
            style={{ background: stage.color, opacity: 0.6 }}
          />
        </div>

        {/* Card secundaria atrás (depth) */}
        <div
          className="absolute inset-0 rounded-2xl transition-colors duration-700"
          style={{
            background: stage.accentBg,
            border: '1px solid var(--color-line)',
            transform: 'translateZ(-30px) translateX(20px) translateY(24px)',
            opacity: 0.6,
          }}
        />
        {/* Tercer plano */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'rgba(0,0,0,0.2)',
            border: '1px solid var(--color-line)',
            transform: 'translateZ(-60px) translateX(40px) translateY(48px)',
            opacity: 0.3,
          }}
        />
      </div>
    </div>
  )
}
