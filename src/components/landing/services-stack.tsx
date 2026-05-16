'use client'

import Link from 'next/link'
import { FEATURED_SLUGS, SERVICES_BY_SLUG, type Service } from '@/lib/services'

/**
 * Services como deck stacked (sticky scroll).
 * Cada card se pega arriba mientras scrolleas y la siguiente la
 * va cubriendo. Inspirado en Apple, Stripe Sessions, Linear releases.
 *
 * Awwwards "Website cards animation" core technique.
 */
export function ServicesStack() {
  const services = FEATURED_SLUGS.map((slug) => SERVICES_BY_SLUG.get(slug)!).filter(Boolean)

  return (
    <section id="servicios" className="relative py-24 md:py-32">
      <div className="container-x">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="inline-flex items-center gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[var(--color-text-3)] mb-8">
            <span className="h-px w-8 bg-[var(--color-gold)]" />
            01 — Cinco rutas migratorias
          </span>

          <h2
            className="font-display text-[var(--color-text)]"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              lineHeight: 0.96,
              letterSpacing: '-0.045em',
              fontWeight: 300,
            }}
          >
            Cada caso{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--color-gold)', fontWeight: 200 }}>
              germina
            </span>
            {' '}distinto.
          </h2>
          <p className="mt-8 text-lg text-[var(--color-text-2)] leading-relaxed max-w-2xl">
            Algunos arrancan desde cero, otros vienen con etapas avanzadas. Elige
            dónde te encuentras hoy.
          </p>
        </div>
      </div>

      {/* DECK — cada card position:sticky se va apilando */}
      <div className="deck-container">
        {services.map((service, idx) => (
          <ServiceDeckCard
            key={service.slug}
            service={service}
            index={idx}
            total={services.length}
          />
        ))}
      </div>

      {/* Cierre del deck — espaciado tras la última card */}
      <div className="h-20" />
    </section>
  )
}

function ServiceDeckCard({
  service,
  index,
  total,
}: {
  service: Service
  index: number
  total: number
}) {
  const categoryStyle = {
    'visa-juvenil': { color: 'var(--color-gold)', label: 'VJ · SIJS' },
    asilo: { color: 'var(--color-blue)', label: 'ASILO POLÍTICO' },
    ajuste: { color: 'var(--color-jade)', label: 'I-485' },
    otros: { color: 'var(--color-text-2)', label: 'OTROS' },
  }[service.category]

  // Cada card se desplaza un poco para crear sensación de "deck"
  const topOffset = 6 + index * 1.2 // 6vh, 7.2vh, 8.4vh...

  return (
    <div
      className="deck-card mb-6"
      style={{ top: `${topOffset}vh`, zIndex: index + 1 }}
    >
      <div className="container-x">
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            background:
              'linear-gradient(135deg, var(--color-surface) 0%, var(--color-bg-2) 100%)',
            border: '1px solid var(--color-line-2)',
            boxShadow: '0 32px 80px -32px rgba(0, 0, 0, 0.7)',
            minHeight: 'min(72vh, 620px)',
          }}
        >
          {/* Grid blueprint sutil */}
          <div aria-hidden className="absolute inset-0 board-grid opacity-40 pointer-events-none" />

          {/* Glow del color de la categoría — top-right */}
          <div
            aria-hidden
            className="absolute -top-32 -right-32 w-[500px] h-[500px] pointer-events-none rounded-full"
            style={{
              background: `radial-gradient(circle, ${categoryStyle.color} 0%, transparent 65%)`,
              opacity: 0.14,
              filter: 'blur(20px)',
            }}
          />

          <div className="relative p-8 md:p-14 lg:p-20 h-full flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-12">
            {/* Lado izquierdo — número + título */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                {/* Eyebrow + counter */}
                <div className="flex items-center justify-between gap-4 mb-8">
                  <span
                    className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em]"
                    style={{ color: categoryStyle.color }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: categoryStyle.color, boxShadow: `0 0 8px ${categoryStyle.color}` }}
                    />
                    {categoryStyle.label}
                  </span>
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-3)]">
                    {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                </div>

                {/* Título gigante */}
                <h3
                  className="font-display text-[var(--color-text)]"
                  style={{
                    fontSize: 'clamp(2.25rem, 6vw, 4.5rem)',
                    lineHeight: 0.96,
                    letterSpacing: '-0.04em',
                    fontWeight: 400,
                  }}
                >
                  {service.shortName}
                </h3>

                <p className="mt-6 text-base md:text-lg text-[var(--color-text-2)] leading-relaxed max-w-xl">
                  {service.audience}
                </p>
              </div>

              {/* Fases — dots conectados */}
              <div className="mt-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-3)] mb-5">
                  {service.phases.length} {service.phases.length === 1 ? 'fase' : 'fases'}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {service.phases.map((phase, i) => (
                    <div key={phase.number} className="flex items-center gap-2">
                      <div
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md border"
                        style={{
                          borderColor: categoryStyle.color,
                          background: 'rgba(255, 255, 255, 0.02)',
                        }}
                      >
                        <span
                          className="font-mono text-[10px] font-bold"
                          style={{ color: categoryStyle.color }}
                        >
                          {phase.number}
                        </span>
                        <span className="text-xs text-[var(--color-text)]">
                          {phase.title}
                        </span>
                      </div>
                      {i < service.phases.length - 1 && (
                        <span
                          className="w-4 h-px"
                          style={{ background: categoryStyle.color, opacity: 0.4 }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Lado derecho — precio + CTA */}
            <div className="md:col-span-5 md:border-l md:border-[var(--color-line-2)] md:pl-12 flex flex-col justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-3)] mb-3">
                  Inversión total
                </p>
                <p
                  className="font-display"
                  style={{
                    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                    lineHeight: 0.95,
                    letterSpacing: '-0.045em',
                    fontWeight: 300,
                    color: categoryStyle.color,
                  }}
                >
                  {service.priceLabel}
                </p>
                <p className="mt-3 text-sm text-[var(--color-text-2)]">
                  Plan a {service.installments} cuotas mensuales
                </p>
                {service.priceExtraChild && (
                  <p
                    className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 border rounded-full"
                    style={{ borderColor: 'var(--color-line-2)', color: 'var(--color-text-2)' }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: 'var(--color-text-3)' }}
                    />
                    +${service.priceExtraChild} por hijo adicional
                  </p>
                )}
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-col gap-3">
                <Link
                  href={`/servicios/${service.slug}`}
                  className="btn-gold w-full justify-center"
                >
                  Ver detalle del servicio
                  <ArrowDownRight />
                </Link>
                <p className="text-[11px] text-[var(--color-text-3)] font-mono uppercase tracking-[0.15em] text-center">
                  o pregunta por WhatsApp
                </p>
              </div>
            </div>
          </div>

          {/* Marca de tipo SVG en la esquina inferior derecha — sólo decorativa */}
          <CategoryGlyph category={service.category} color={categoryStyle.color} />
        </div>
      </div>
    </div>
  )
}

function CategoryGlyph({ category, color }: { category: string; color: string }) {
  // Glifos SVG distintivos por categoría — abstractos, no iconos genéricos
  return (
    <div
      aria-hidden
      className="absolute bottom-6 right-6 md:bottom-10 md:right-10 opacity-[0.07] pointer-events-none"
    >
      {category === 'visa-juvenil' && (
        // Trío de hojas creciendo (3 fases)
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
          <path d="M 80 140 Q 30 100 30 50 Q 30 25 80 25" stroke={color} strokeWidth="3" fill="none" />
          <path d="M 80 140 Q 80 80 80 30" stroke={color} strokeWidth="3" fill="none" />
          <path d="M 80 140 Q 130 100 130 50 Q 130 25 80 25" stroke={color} strokeWidth="3" fill="none" />
          <circle cx="80" cy="140" r="4" fill={color} />
        </svg>
      )}
      {category === 'asilo' && (
        // Triángulo abierto, signo de protección
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
          <path d="M 80 20 L 140 140 L 20 140 Z" stroke={color} strokeWidth="3" fill="none" />
          <path d="M 50 110 L 80 60 L 110 110" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      )}
      {category === 'ajuste' && (
        // Círculo con flecha hacia arriba
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
          <circle cx="80" cy="80" r="55" stroke={color} strokeWidth="3" fill="none" />
          <path d="M 80 110 L 80 50 M 60 70 L 80 50 L 100 70" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      )}
      {category === 'otros' && (
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
          <rect x="35" y="35" width="90" height="90" stroke={color} strokeWidth="3" fill="none" />
        </svg>
      )}
    </div>
  )
}

function ArrowDownRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 7L17 17M17 17H8M17 17V8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
