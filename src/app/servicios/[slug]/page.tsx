import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { SERVICES, SERVICES_BY_SLUG } from '@/lib/services'
import { SITE } from '@/lib/site'
import { whatsappUrl } from '@/lib/utils'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { CTAFinal } from '@/components/landing/cta-final'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICES_BY_SLUG.get(slug)
  if (!service) return {}
  return {
    title: service.shortName,
    description: service.description,
  }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const service = SERVICES_BY_SLUG.get(slug)
  if (!service) notFound()

  const whatsappMessage = `Hola, vi en su web el servicio "${service.shortName}" y quisiera más información.`

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero del servicio */}
        <section className="pt-12 md:pt-20 pb-20 md:pb-24">
          <div className="container-editorial">
            {/* Breadcrumb editorial */}
            <nav className="flex items-center gap-3 mb-10 text-xs font-mono text-[var(--color-ink-3)] uppercase tracking-[0.15em]">
              <Link href="/" className="hover:text-[var(--color-ink)]">
                Inicio
              </Link>
              <span>/</span>
              <Link href="/#servicios" className="hover:text-[var(--color-ink)]">
                Servicios
              </Link>
              <span>/</span>
              <span className="text-[var(--color-ink)]">{service.shortName}</span>
            </nav>

            {/* Eyebrow */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-mono text-xs text-[var(--color-gold-2)] font-medium tracking-[0.2em]">
                {service.category === 'visa-juvenil'
                  ? 'VJ · SIJS'
                  : service.category === 'asilo'
                    ? 'ASILO'
                    : service.category.toUpperCase()}
              </span>
              <span className="h-px w-12 bg-[var(--color-line-soft)]" />
              <span className="font-mono text-[10px] text-[var(--color-ink-3)] uppercase tracking-[0.3em]">
                Servicio migratorio
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <h1
                className="lg:col-span-8 font-display font-light text-[var(--color-ink)] rise"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                  lineHeight: 0.98,
                  letterSpacing: '-0.03em',
                }}
              >
                {service.fullName}
              </h1>

              <div
                className="lg:col-span-4 lg:border-l lg:border-[var(--color-line-soft)] lg:pl-8 rise"
                style={{ animationDelay: '120ms' }}
              >
                <p className="font-mono text-[10px] text-[var(--color-ink-3)] uppercase tracking-[0.2em] mb-3">
                  Inversión total
                </p>
                <p
                  className="font-display font-light text-[var(--color-ink)]"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    lineHeight: 1,
                    letterSpacing: '-0.025em',
                  }}
                >
                  {service.priceLabel}
                </p>
                <p className="mt-3 text-xs font-mono text-[var(--color-ink-3)]">
                  Plan a {service.installments} cuotas
                </p>
                {service.priceExtraChild && (
                  <p className="mt-2 text-xs text-[var(--color-gold-2)]">
                    + ${service.priceExtraChild} por cada hijo adicional
                  </p>
                )}
              </div>
            </div>

            <p
              className="mt-12 text-lg md:text-xl text-[var(--color-ink-2)] leading-relaxed max-w-3xl rise"
              style={{ animationDelay: '240ms' }}
            >
              {service.audience}
            </p>

            <div
              className="mt-10 flex flex-wrap gap-4 rise"
              style={{ animationDelay: '360ms' }}
            >
              <a
                href={whatsappUrl(SITE.contact.whatsapp, whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                Empezar este caso por WhatsApp
              </a>
              <a href="#fases" className="btn-ghost">
                Ver las fases ↓
              </a>
            </div>
          </div>
        </section>

        {/* Descripción */}
        <section className="py-20 bg-[var(--color-canvas-2)]/40">
          <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <p className="font-mono text-[10px] text-[var(--color-ink-3)] uppercase tracking-[0.2em] mb-3">
                ¿En qué consiste?
              </p>
            </div>
            <div className="lg:col-span-8">
              <p
                className="font-display font-light text-[var(--color-ink)] leading-relaxed"
                style={{
                  fontSize: 'clamp(1.25rem, 2.2vw, 1.875rem)',
                  letterSpacing: '-0.015em',
                  fontVariationSettings: '"SOFT" 40',
                }}
              >
                {service.description}
              </p>
            </div>
          </div>
        </section>

        {/* Fases — timeline editorial */}
        <section id="fases" className="py-24 md:py-32">
          <div className="container-editorial">
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-mono text-xs text-[var(--color-gold-2)] font-medium tracking-[0.2em]">
                FASES
              </span>
              <span className="h-px w-12 bg-[var(--color-line-soft)]" />
              <span className="font-mono text-[10px] text-[var(--color-ink-3)] uppercase tracking-[0.3em]">
                {service.phases.length} etapa{service.phases.length !== 1 ? 's' : ''} del proceso
              </span>
            </div>

            <h2
              className="font-display font-light text-[var(--color-ink)] mb-16 max-w-3xl"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.02,
                letterSpacing: '-0.025em',
              }}
            >
              Así avanzamos tu caso, paso a paso.
            </h2>

            <ol className="space-y-px">
              {service.phases.map((phase, idx) => (
                <li
                  key={phase.number}
                  className="grid grid-cols-12 gap-4 md:gap-8 py-10 border-t border-[var(--color-line-soft)]"
                  style={
                    idx === service.phases.length - 1
                      ? { borderBottom: '1px solid var(--color-line-soft)' }
                      : undefined
                  }
                >
                  <div className="col-span-12 md:col-span-2">
                    <span
                      className="font-display font-light"
                      style={{
                        fontSize: 'clamp(3rem, 6vw, 5rem)',
                        color: 'var(--color-gold-2)',
                        letterSpacing: '-0.05em',
                        lineHeight: 0.9,
                      }}
                    >
                      {phase.number}
                    </span>
                  </div>
                  <div className="col-span-12 md:col-span-7">
                    <h3
                      className="font-display font-medium text-[var(--color-ink)] tracking-tight mb-3"
                      style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', lineHeight: 1.1 }}
                    >
                      {phase.title}
                    </h3>
                    <p className="text-base text-[var(--color-ink-3)] leading-relaxed max-w-xl">
                      {phase.body}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-3 md:text-right md:pt-2 space-y-3">
                    <div>
                      <p className="font-mono text-[10px] text-[var(--color-ink-3)] uppercase tracking-[0.18em] mb-1">
                        Entregable
                      </p>
                      <p className="text-sm text-[var(--color-ink-2)]">{phase.deliverable}</p>
                    </div>
                    {phase.timeframe && (
                      <div>
                        <p className="font-mono text-[10px] text-[var(--color-ink-3)] uppercase tracking-[0.18em] mb-1">
                          Tiempo
                        </p>
                        <p className="font-mono text-sm text-[var(--color-ink-2)]">
                          {phase.timeframe}
                        </p>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Documentos */}
        <section className="py-24 bg-[var(--color-canvas-2)]/40">
          <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-mono text-xs text-[var(--color-gold-2)] font-medium tracking-[0.2em]">
                  DOCUMENTOS
                </span>
                <span className="h-px w-12 bg-[var(--color-line-soft)]" />
              </div>
              <h2
                className="font-display font-light text-[var(--color-ink)]"
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.025em',
                }}
              >
                Lo que vas a necesitar tener listo.
              </h2>
              <p className="mt-4 text-sm text-[var(--color-ink-3)] max-w-sm">
                Si te falta alguno, no te preocupes — te ayudamos a conseguirlo
                durante el proceso.
              </p>
            </div>

            <ul className="lg:col-span-7 space-y-px">
              {service.documents.map((doc, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-4 py-4 border-t border-[var(--color-line-soft)]"
                  style={
                    idx === service.documents.length - 1
                      ? { borderBottom: '1px solid var(--color-line-soft)' }
                      : undefined
                  }
                >
                  <span className="font-mono text-xs text-[var(--color-ink-3)] pt-1">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-base text-[var(--color-ink-2)]">{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 md:py-32">
          <div className="container-editorial">
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-mono text-xs text-[var(--color-gold-2)] font-medium tracking-[0.2em]">
                FAQ
              </span>
              <span className="h-px w-12 bg-[var(--color-line-soft)]" />
            </div>

            <h2
              className="font-display font-light text-[var(--color-ink)] mb-12 max-w-2xl"
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
              }}
            >
              Preguntas que nos hacen seguido.
            </h2>

            <dl className="space-y-px max-w-4xl">
              {service.faq.map((item, idx) => (
                <details
                  key={idx}
                  className="group border-t border-[var(--color-line-soft)] py-6"
                  style={
                    idx === service.faq.length - 1
                      ? { borderBottom: '1px solid var(--color-line-soft)' }
                      : undefined
                  }
                >
                  <summary className="cursor-pointer flex items-start justify-between gap-6 list-none">
                    <dt
                      className="font-display text-xl md:text-2xl font-medium text-[var(--color-ink)] tracking-tight"
                      style={{ lineHeight: 1.2 }}
                    >
                      {item.q}
                    </dt>
                    <span
                      className="font-display text-3xl font-light text-[var(--color-gold-2)] transition-transform duration-300 group-open:rotate-45 leading-none mt-1"
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <dd className="mt-4 text-base text-[var(--color-ink-3)] leading-relaxed max-w-2xl">
                    {item.a}
                  </dd>
                </details>
              ))}
            </dl>
          </div>
        </section>

        <CTAFinal />
      </main>
      <Footer />
    </>
  )
}
