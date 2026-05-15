import Link from 'next/link'
import { FEATURED_SLUGS, SERVICES_BY_SLUG, type Service } from '@/lib/services'
import { SectionLabel } from '@/components/site/section-label'

export function ServicesCatalog() {
  const services = FEATURED_SLUGS.map((slug) => SERVICES_BY_SLUG.get(slug)!).filter(
    Boolean
  )

  return (
    <section id="servicios" className="py-24 md:py-32">
      <div className="container-editorial">
        <SectionLabel number="01" title="Catálogo de servicios" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <h2
            className="lg:col-span-7 font-display font-light text-[var(--color-ink)]"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
            }}
          >
            Cada caso migratorio es{' '}
            <span
              className="italic font-display"
              style={{ color: 'var(--color-gold-2)' }}
            >
              distinto.
            </span>
            <br />
            Por eso ofrecemos planes a tu medida.
          </h2>
          <p className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-[var(--color-line-soft)] text-base text-[var(--color-ink-3)] leading-relaxed lg:pt-2">
            Elige el plan que coincide con dónde estás hoy. Si ya avanzaste
            etapas por tu cuenta, no pagas dos veces. Si arrancas desde cero,
            cubrimos todo el camino sin sorpresas.
          </p>
        </div>

        {/* Grid de servicios — layout editorial asimétrico */}
        <ul className="border-t border-[var(--color-line-soft)]">
          {services.map((service, idx) => (
            <ServiceRow
              key={service.slug}
              service={service}
              index={idx + 1}
              total={services.length}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

function ServiceRow({
  service,
  index,
  total,
}: {
  service: Service
  index: number
  total: number
}) {
  const categoryColor = {
    'visa-juvenil': 'var(--color-gold-2)',
    asilo: 'var(--color-ember)',
    ajuste: 'var(--color-jade)',
    otros: 'var(--color-ink-3)',
  }[service.category]

  return (
    <li className="group border-b border-[var(--color-line-soft)] transition-colors hover:bg-[var(--color-canvas-2)]/40">
      <Link
        href={`/servicios/${service.slug}`}
        className="grid grid-cols-12 gap-4 md:gap-6 items-start md:items-center py-7 md:py-10"
      >
        {/* Número editorial */}
        <div className="col-span-2 md:col-span-1">
          <span
            className="font-mono text-xs"
            style={{ color: categoryColor }}
          >
            {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>

        {/* Título + audience */}
        <div className="col-span-10 md:col-span-6">
          <h3
            className="font-display font-medium text-[var(--color-ink)] group-hover:translate-x-1 transition-transform duration-500"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            {service.shortName}
          </h3>
          <p className="mt-2 text-sm text-[var(--color-ink-3)] max-w-xl">
            {service.audience}
          </p>
        </div>

        {/* Precio */}
        <div className="col-span-7 md:col-span-3 md:text-right">
          <p className="font-mono text-xs text-[var(--color-ink-3)] uppercase tracking-wider mb-1">
            Inversión
          </p>
          <p
            className="font-display font-light text-[var(--color-ink)]"
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            {service.priceLabel}
          </p>
          <p className="mt-1 text-[10px] text-[var(--color-ink-3)] font-mono uppercase tracking-wider">
            {service.installments} cuotas mensuales
          </p>
        </div>

        {/* Flecha */}
        <div className="col-span-5 md:col-span-2 flex md:justify-end items-center">
          <span className="inline-flex items-center gap-2 text-sm text-[var(--color-ink)] group-hover:gap-3 transition-all duration-300">
            Ver detalle
            <span className="inline-block w-8 h-px bg-[var(--color-ink)] relative">
              <span
                className="absolute right-0 top-0 -translate-y-1/2 w-2 h-2 border-t border-r border-[var(--color-ink)] rotate-45"
                style={{ marginTop: '-1px' }}
              />
            </span>
          </span>
        </div>
      </Link>
    </li>
  )
}
