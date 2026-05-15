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
  const categoryColor = {
    'visa-juvenil': 'var(--color-cyan)',
    asilo: 'var(--color-ember)',
    ajuste: 'var(--color-jade)',
    otros: 'var(--color-text-2)',
  }[service.category]

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero servicio */}
        <section className="relative overflow-hidden pt-16 md:pt-20 pb-20">
          <div
            aria-hidden
            className="absolute inset-0 blueprint opacity-30 pointer-events-none"
            style={{
              maskImage: 'radial-gradient(ellipse 80% 60% at 50% 20%, black 30%, transparent 90%)',
            }}
          />

          <div className="container-x relative">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-10 text-xs font-mono text-[var(--color-text-3)] uppercase tracking-[0.15em]">
              <Link href="/" className="link-tech">Inicio</Link>
              <span>/</span>
              <Link href="/#servicios" className="link-tech">Servicios</Link>
              <span>/</span>
              <span className="text-[var(--color-text)]">{service.shortName}</span>
            </nav>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="tag" style={{ borderColor: categoryColor, color: categoryColor }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: categoryColor }} />
                {service.category === 'visa-juvenil' ? 'VJ · SIJS' : service.category === 'asilo' ? 'ASILO POLÍTICO' : service.category.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <h1
                className="lg:col-span-8 font-display text-[var(--color-text)] rise"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  lineHeight: 0.98,
                  letterSpacing: '-0.04em',
                  fontWeight: 500,
                }}
              >
                {service.fullName}
              </h1>

              <div
                className="lg:col-span-4 lg:border-l lg:border-[var(--color-line-2)] lg:pl-8 rise"
                style={{ animationDelay: '120ms' }}
              >
                <p className="font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-[0.18em] mb-3">
                  Inversión total
                </p>
                <p
                  className="font-display text-[var(--color-text)]"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    fontWeight: 500,
                  }}
                >
                  {service.priceLabel}
                </p>
                <p className="mt-3 text-xs font-mono text-[var(--color-text-3)]">
                  Plan a {service.installments} cuotas
                </p>
                {service.priceExtraChild && (
                  <p className="mt-2 text-xs" style={{ color: 'var(--color-cyan)' }}>
                    + ${service.priceExtraChild} por cada hijo adicional
                  </p>
                )}
              </div>
            </div>

            <p
              className="mt-12 text-lg text-[var(--color-text-2)] leading-relaxed max-w-3xl rise"
              style={{ animationDelay: '240ms' }}
            >
              {service.audience}
            </p>

            <div
              className="mt-10 flex flex-wrap gap-3 rise"
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
        <section className="py-20" style={{ background: 'var(--color-bg-2)' }}>
          <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <span className="tag">
                <DotIcon />
                ¿En qué consiste?
              </span>
            </div>
            <div className="lg:col-span-8">
              <p
                className="font-display text-[var(--color-text)] leading-relaxed"
                style={{
                  fontSize: 'clamp(1.25rem, 2vw, 1.625rem)',
                  letterSpacing: '-0.02em',
                  fontWeight: 400,
                }}
              >
                {service.description}
              </p>
            </div>
          </div>
        </section>

        {/* Fases — timeline tech */}
        <section id="fases" className="py-24 md:py-32 relative">
          <div className="container-x">
            <div className="flex items-baseline gap-3 mb-6">
              <span className="tag tag-cyan">
                <DotIcon />
                FASES · {service.phases.length} etapa{service.phases.length !== 1 ? 's' : ''}
              </span>
            </div>

            <h2
              className="font-display text-[var(--color-text)] mb-16 max-w-3xl"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1,
                letterSpacing: '-0.035em',
                fontWeight: 500,
              }}
            >
              Así avanzamos tu caso, paso a paso.
            </h2>

            <ol className="relative">
              {/* Línea vertical conectora */}
              <div
                className="absolute left-6 top-8 bottom-8 w-px hidden md:block"
                style={{
                  background:
                    'linear-gradient(180deg, var(--color-cyan) 0%, var(--color-cyan-dim) 50%, transparent 100%)',
                }}
              />

              {service.phases.map((phase, idx) => (
                <li
                  key={phase.number}
                  className="relative grid grid-cols-12 gap-4 md:gap-8 pb-12 md:pb-16"
                >
                  {/* Marker */}
                  <div className="col-span-12 md:col-span-2 relative">
                    <span
                      className="inline-flex items-center justify-center w-12 h-12 rounded-md font-mono font-bold border-2 relative z-10"
                      style={{
                        background: 'var(--color-bg)',
                        color: 'var(--color-cyan)',
                        borderColor: 'var(--color-cyan)',
                        fontSize: 14,
                      }}
                    >
                      {phase.number}
                    </span>
                  </div>

                  <div
                    className="col-span-12 md:col-span-7 p-6 border border-[var(--color-line-2)] rounded-md"
                    style={{ background: 'var(--color-surface)' }}
                  >
                    <h3
                      className="font-display text-[var(--color-text)] tracking-tight mb-3"
                      style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', lineHeight: 1.1, fontWeight: 500 }}
                    >
                      {phase.title}
                    </h3>
                    <p className="text-base text-[var(--color-text-2)] leading-relaxed">
                      {phase.body}
                    </p>
                  </div>

                  <div className="col-span-12 md:col-span-3 space-y-4 md:pt-2">
                    <div>
                      <p className="font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-[0.18em] mb-1.5">
                        Entregable
                      </p>
                      <p className="text-sm text-[var(--color-text)]">{phase.deliverable}</p>
                    </div>
                    {phase.timeframe && (
                      <div>
                        <p className="font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-[0.18em] mb-1.5">
                          Tiempo
                        </p>
                        <p className="font-mono text-sm text-[var(--color-cyan)]">
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
        <section className="py-24" style={{ background: 'var(--color-bg-2)' }}>
          <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <span className="tag tag-amber mb-6">
                <DotIcon amber />
                DOCUMENTOS
              </span>
              <h2
                className="mt-6 font-display text-[var(--color-text)]"
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.035em',
                  fontWeight: 500,
                }}
              >
                Lo que vas a necesitar tener listo.
              </h2>
              <p className="mt-4 text-sm text-[var(--color-text-2)] max-w-sm">
                Si te falta alguno, no te preocupes — te ayudamos a conseguirlo
                durante el proceso.
              </p>
            </div>

            <ul className="lg:col-span-7 space-y-3">
              {service.documents.map((doc, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-4 p-4 border border-[var(--color-line-2)] rounded-md hover:border-[var(--color-cyan)]/40 transition-colors"
                  style={{ background: 'var(--color-surface)' }}
                >
                  <span
                    className="font-mono text-xs text-[var(--color-cyan)] pt-0.5"
                    style={{ minWidth: '24px' }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-base text-[var(--color-text)]">{doc}</span>
                  <CheckIcon />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 md:py-32">
          <div className="container-x">
            <span className="tag mb-6 inline-flex">
              <DotIcon />
              FAQ
            </span>

            <h2
              className="mt-6 font-display text-[var(--color-text)] mb-12 max-w-2xl"
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.035em',
                fontWeight: 500,
              }}
            >
              Preguntas que nos hacen seguido.
            </h2>

            <dl className="max-w-4xl space-y-3">
              {service.faq.map((item, idx) => (
                <details
                  key={idx}
                  className="group border border-[var(--color-line-2)] rounded-md hover:border-[var(--color-cyan)]/40 transition-colors"
                  style={{ background: 'var(--color-surface)' }}
                >
                  <summary className="cursor-pointer flex items-start justify-between gap-6 list-none p-6">
                    <dt
                      className="font-display text-lg md:text-xl text-[var(--color-text)] tracking-tight"
                      style={{ lineHeight: 1.3, fontWeight: 500 }}
                    >
                      {item.q}
                    </dt>
                    <span
                      className="font-display text-3xl font-light text-[var(--color-cyan)] transition-transform duration-300 group-open:rotate-45 leading-none flex-shrink-0"
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <dd className="px-6 pb-6 text-base text-[var(--color-text-2)] leading-relaxed">
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

function DotIcon({ amber = false }: { amber?: boolean }) {
  return (
    <span
      className="w-1.5 h-1.5 rounded-full"
      style={{ background: amber ? 'var(--color-amber)' : 'var(--color-cyan)' }}
    />
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-auto flex-shrink-0 mt-0.5" aria-hidden>
      <circle cx="8" cy="8" r="7" stroke="var(--color-jade)" strokeWidth="1" />
      <path d="m5 8 2 2 4-4" stroke="var(--color-jade)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
