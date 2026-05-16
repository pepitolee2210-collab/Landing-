'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FEATURED_SLUGS, SERVICES_BY_SLUG, type Service } from '@/lib/services'

/**
 * Pizarra digital interactiva de servicios.
 * Inspirado en workspaces tipo Miro/Figma — las 5 cards aparecen
 * como carpetas pinneadas con cinta amarilla, rotación orgánica
 * y conectores SVG que aparecen al hover.
 */
export function ServicesBoard() {
  const [active, setActive] = useState<string | null>(null)
  const services = FEATURED_SLUGS.map((slug) => SERVICES_BY_SLUG.get(slug)!).filter(
    Boolean
  )

  // Posiciones y rotaciones orgánicas predefinidas
  const layout: Array<{ x: string; y: string; rot: number; tag?: string }> = [
    { x: '4%', y: '0%', rot: -2.5, tag: 'Más solicitado' },
    { x: '38%', y: '6%', rot: 1.8 },
    { x: '68%', y: '2%', rot: -1.2, tag: 'Recomendado' },
    { x: '18%', y: '52%', rot: 2.4 },
    { x: '55%', y: '54%', rot: -1.8 },
  ]

  return (
    <section
      id="servicios"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="container-x">
        {/* Header de sección */}
        <div className="mb-16 max-w-3xl">
          <span className="tag mb-6">
            <Tag1Icon />
            01 / Pizarra de servicios
          </span>
          <h2
            className="mt-6 font-display text-[var(--color-text)]"
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 4rem)',
              lineHeight: 1,
              letterSpacing: '-0.035em',
              fontWeight: 500,
            }}
          >
            Elige tu carpeta.{' '}
            <span style={{ color: 'var(--color-gold)' }}>
              Cada caso, un plan distinto.
            </span>
          </h2>
          <p className="mt-6 text-lg text-[var(--color-text-2)] leading-relaxed max-w-2xl">
            Cinco servicios, cinco rutas. Pasa el cursor sobre una carpeta
            para ver su contenido. Selecciona la que coincida con dónde
            estás hoy.
          </p>
        </div>

        {/* La pizarra */}
        <div
          className="board relative"
          style={{
            minHeight: 760,
            background:
              'radial-gradient(ellipse at top, var(--color-surface-2) 0%, var(--color-surface) 100%)',
          }}
        >
          {/* Grid blueprint */}
          <div className="absolute inset-0 board-grid opacity-60 pointer-events-none" />

          {/* Glow ambient */}
          <div
            aria-hidden
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] glow-gold opacity-30 pointer-events-none"
          />

          {/* Workspace bar superior */}
          <div className="absolute top-0 left-0 right-0 px-5 h-11 flex items-center gap-3 border-b border-[var(--color-line)] bg-[var(--color-surface)]/50 backdrop-blur-sm z-10">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-ember)]/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-amber)]/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-jade)]/50" />
            <span className="ml-3 font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-[0.2em]">
              workspace · servicios.ulp
            </span>
            <span className="ml-auto font-mono text-[10px] text-[var(--color-gold)] flex items-center gap-1.5">
              <span className="pulse-dot" style={{ background: 'var(--color-gold)' }} />
              5 carpetas activas
            </span>
          </div>

          {/* Cards posicionadas absolutas */}
          <div
            className="relative px-6 md:px-12 pt-20 pb-32 lg:min-h-[700px]"
            onMouseLeave={() => setActive(null)}
          >
            {/* Layout mobile (grid normal) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
              {services.map((s, idx) => (
                <ServiceFolderCard
                  key={s.slug}
                  service={s}
                  active={active === s.slug}
                  onHover={() => setActive(s.slug)}
                  rotation={layout[idx]?.rot ?? 0}
                  tag={layout[idx]?.tag}
                />
              ))}
            </div>

            {/* Layout desktop (posiciones absolutas + scattered) */}
            <div className="hidden lg:block relative h-[680px]">
              {services.map((s, idx) => (
                <div
                  key={s.slug}
                  className="absolute w-[300px]"
                  style={{
                    left: layout[idx].x,
                    top: layout[idx].y,
                    transition: 'opacity 0.3s',
                    opacity: active && active !== s.slug ? 0.35 : 1,
                  }}
                >
                  <ServiceFolderCard
                    service={s}
                    active={active === s.slug}
                    onHover={() => setActive(s.slug)}
                    rotation={layout[idx]?.rot ?? 0}
                    tag={layout[idx]?.tag}
                  />
                </div>
              ))}

              {/* Líneas SVG conectoras decorativas entre algunas cards */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                aria-hidden
                style={{ opacity: 0.4 }}
              >
                <line
                  x1="180"
                  y1="180"
                  x2="430"
                  y2="200"
                  stroke="var(--color-gold)"
                  strokeWidth="0.8"
                  strokeDasharray="2 4"
                  opacity="0.5"
                />
                <line
                  x1="430"
                  y1="200"
                  x2="720"
                  y2="180"
                  stroke="var(--color-gold)"
                  strokeWidth="0.8"
                  strokeDasharray="2 4"
                  opacity="0.5"
                />
                <line
                  x1="280"
                  y1="500"
                  x2="600"
                  y2="500"
                  stroke="var(--color-gold)"
                  strokeWidth="0.8"
                  strokeDasharray="2 4"
                  opacity="0.5"
                />
              </svg>
            </div>

            {/* Sticky note decorativa flotante */}
            <div
              className="hidden lg:block absolute float-slow"
              style={{
                top: '38%',
                right: '4%',
                ['--rot' as string]: '5deg',
                animationDelay: '2s',
              }}
            >
              <div className="sticky-note max-w-[160px]">
                <p className="text-[10px] uppercase tracking-wider opacity-70 mb-1">
                  Nota de Andrium
                </p>
                <p>¿No sabes cuál te toca? Te lo digo por WhatsApp en 5 minutos.</p>
              </div>
            </div>
          </div>

          {/* Instrucciones inferiores */}
          <div className="absolute bottom-0 left-0 right-0 px-6 py-4 border-t border-[var(--color-line)] bg-[var(--color-bg-2)]/60 backdrop-blur-sm flex items-center justify-between text-[10px] font-mono text-[var(--color-text-3)] uppercase tracking-[0.15em]">
            <span className="flex items-center gap-2">
              <CursorIcon />
              Hover una carpeta · Click para abrir
            </span>
            <span className="hidden sm:flex items-center gap-3">
              <span>Tip ↗</span>
              <span className="text-[var(--color-gold)]">Si dudas, pregúntanos por WhatsApp</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Card individual de servicio
// ─────────────────────────────────────────────────────────────

function ServiceFolderCard({
  service,
  active,
  onHover,
  rotation,
  tag,
}: {
  service: Service
  active: boolean
  onHover: () => void
  rotation: number
  tag?: string
}) {
  const categoryStyle = {
    'visa-juvenil': { color: 'var(--color-gold)', label: 'VJ · SIJS' },
    asilo: { color: 'var(--color-navy)', label: 'ASILO' },
    ajuste: { color: 'var(--color-jade)', label: 'I-485' },
    otros: { color: 'var(--color-text-2)', label: 'OTROS' },
  }[service.category]

  return (
    <Link
      href={`/servicios/${service.slug}`}
      onMouseEnter={onHover}
      className="service-card group block p-5 hover:p-5"
      style={{ ['--rot' as string]: `${rotation}deg` }}
    >
      {/* Tag de etiqueta superior (popular, recomendado) */}
      {tag && (
        <div className="absolute -top-3 left-4 z-10">
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-[var(--color-amber)] text-[#3a2a00] font-mono text-[9px] uppercase tracking-[0.1em] font-bold rounded">
            <StarIcon />
            {tag}
          </span>
        </div>
      )}

      {/* Header: categoría + folder icon */}
      <div className="flex items-start justify-between mb-4">
        <span
          className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] font-medium"
          style={{ color: categoryStyle.color }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: categoryStyle.color }}
          />
          {categoryStyle.label}
        </span>
        <FolderIcon color={categoryStyle.color} active={active} />
      </div>

      {/* Título */}
      <h3
        className="font-display text-[var(--color-text)] tracking-tight mb-2"
        style={{ fontSize: '20px', lineHeight: 1.1, fontWeight: 500 }}
      >
        {service.shortName}
      </h3>

      <p className="text-xs text-[var(--color-text-3)] leading-relaxed line-clamp-3 mb-5">
        {service.audience}
      </p>

      {/* Fases preview — pequeños dots numerados */}
      <div className="flex items-center gap-1.5 mb-4">
        {service.phases.map((phase, idx) => (
          <div key={phase.number} className="flex items-center gap-1.5">
            <span
              className="w-6 h-6 inline-flex items-center justify-center rounded-md font-mono text-[10px] font-bold border transition-all"
              style={{
                color: active ? 'var(--color-bg)' : categoryStyle.color,
                background: active ? categoryStyle.color : 'transparent',
                borderColor: categoryStyle.color,
              }}
            >
              {phase.number}
            </span>
            {idx < service.phases.length - 1 && (
              <span
                className="w-3 h-px"
                style={{ background: 'var(--color-line-2)' }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Footer: precio + arrow */}
      <div className="flex items-baseline justify-between pt-3 border-t border-[var(--color-line)]">
        <div>
          <p className="font-mono text-[9px] text-[var(--color-text-3)] uppercase tracking-[0.15em]">
            Inversión
          </p>
          <p
            className="font-display text-[var(--color-text)] mt-0.5"
            style={{ fontSize: '17px', fontWeight: 600 }}
          >
            {service.priceLabel}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-2)] group-hover:text-[var(--color-gold)] transition-colors">
          <span>Abrir</span>
          <ArrowRightSmall />
        </div>
      </div>
    </Link>
  )
}

// ─────────────────────────────────────────────────────────────
// Iconos SVG custom
// ─────────────────────────────────────────────────────────────

function FolderIcon({ color, active }: { color: string; active: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M3 7C3 5.89543 3.89543 5 5 5H10.382C10.7607 5 11.107 5.214 11.276 5.553L12.224 7.447C12.393 7.786 12.7393 8 13.118 8H23C24.1046 8 25 8.89543 25 10V21C25 22.1046 24.1046 23 23 23H5C3.89543 23 3 22.1046 3 21V7Z"
        stroke={color}
        strokeWidth="1.3"
        fill={active ? color : 'transparent'}
        fillOpacity={active ? '0.12' : '0'}
        style={{ transition: 'fill 0.3s, fill-opacity 0.3s' }}
      />
      {/* Sello de "papeles dentro" — visible al hover */}
      <line
        x1="8"
        y1="14"
        x2="20"
        y2="14"
        stroke={color}
        strokeWidth="0.8"
        opacity={active ? 0.6 : 0}
        style={{ transition: 'opacity 0.3s' }}
      />
      <line
        x1="8"
        y1="17"
        x2="16"
        y2="17"
        stroke={color}
        strokeWidth="0.8"
        opacity={active ? 0.5 : 0}
        style={{ transition: 'opacity 0.3s' }}
      />
    </svg>
  )
}

function ArrowRightSmall() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M3 7H11M11 7L7 3M11 7L7 11"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CursorIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
      <path d="M2 1L10 5.5L6 6.5L5 10.5L2 1Z" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="currentColor" aria-hidden>
      <path d="M4.5 0L5.6 3.4H9L6.2 5.5L7.3 8.9L4.5 6.8L1.7 8.9L2.8 5.5L0 3.4H3.4L4.5 0Z" />
    </svg>
  )
}

function Tag1Icon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <rect
        x="0.5"
        y="0.5"
        width="9"
        height="9"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="5" cy="5" r="1.5" fill="currentColor" />
    </svg>
  )
}
