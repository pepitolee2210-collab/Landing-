import type { Metadata } from 'next'
import { TEAM } from '@/lib/team'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { CTAFinal } from '@/components/landing/cta-final'

export const metadata: Metadata = {
  title: 'Sobre Nosotros',
  description:
    'El equipo detrás de UsaLatinoPrime: Henry, Vanessa, Diana, Andrium, Giuseppe y Mauricio. Latinos trabajando para latinos en EE.UU.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="pt-12 md:pt-20 pb-16">
          <div className="container-editorial">
            {/* Eyebrow */}
            <div className="flex items-baseline gap-3 mb-10">
              <span className="font-mono text-xs text-[var(--color-gold-2)] font-medium tracking-[0.2em]">
                EQUIPO · 2026
              </span>
              <span className="h-px w-12 bg-[var(--color-line-soft)]" />
            </div>

            <h1
              className="font-display font-light text-[var(--color-ink)] rise"
              style={{
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.035em',
                maxWidth: '14ch',
              }}
            >
              Latinos{' '}
              <span
                className="italic"
                style={{ color: 'var(--color-gold-2)' }}
              >
                trabajando para latinos
              </span>{' '}
              en EE.UU.
            </h1>

            <p
              className="mt-10 text-lg md:text-xl text-[var(--color-ink-2)] leading-relaxed max-w-2xl rise"
              style={{ animationDelay: '160ms' }}
            >
              Cada uno del equipo migró, atravesó procesos legales o creció
              entre familias que lo hicieron. No es una historia de marketing.
              Es por qué entendemos tu caso antes de que termines de contarlo.
            </p>
          </div>
        </section>

        {/* Team grid editorial */}
        <section className="py-16 md:py-24">
          <div className="container-editorial">
            <ul className="space-y-px">
              {TEAM.map((member, idx) => (
                <li
                  key={member.slug}
                  className="grid grid-cols-12 gap-4 md:gap-8 items-start py-10 md:py-14 border-t border-[var(--color-line-soft)]"
                  style={
                    idx === TEAM.length - 1
                      ? { borderBottom: '1px solid var(--color-line-soft)' }
                      : undefined
                  }
                >
                  {/* Foto/Iniciales */}
                  <div className="col-span-3 md:col-span-2">
                    <div
                      className="aspect-square overflow-hidden relative"
                      style={{
                        background: `linear-gradient(135deg, var(--color-canvas-2) 0%, var(--color-line-soft) 100%)`,
                        borderRadius: 'var(--radius-md)',
                      }}
                    >
                      <span
                        className="absolute inset-0 flex items-center justify-center font-display font-light"
                        style={{
                          fontSize: '3rem',
                          color: 'var(--color-ink)',
                          opacity: 0.22,
                          letterSpacing: '-0.04em',
                        }}
                      >
                        {member.name
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')}
                      </span>
                    </div>
                  </div>

                  {/* Nombre + bio */}
                  <div className="col-span-9 md:col-span-7">
                    <p className="font-mono text-[10px] text-[var(--color-gold-2)] uppercase tracking-[0.2em] mb-2">
                      {member.shortRole}
                    </p>
                    <h2
                      className="font-display text-[var(--color-ink)] font-medium tracking-tight mb-3"
                      style={{
                        fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                        lineHeight: 1.05,
                      }}
                    >
                      {member.name}
                    </h2>
                    <p className="text-base text-[var(--color-ink-3)] leading-relaxed max-w-xl">
                      {member.bio}
                    </p>
                  </div>

                  {/* Bandera/origen */}
                  <div className="col-span-12 md:col-span-3 md:text-right md:pt-2">
                    {member.origin && (
                      <p className="text-base font-mono">
                        {member.origin}
                      </p>
                    )}
                    <p className="mt-2 text-xs font-mono text-[var(--color-ink-3)] uppercase tracking-[0.15em]">
                      {member.role}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Misión editorial */}
        <section className="py-24 md:py-32 bg-[var(--color-canvas-2)]/40">
          <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-mono text-xs text-[var(--color-gold-2)] font-medium tracking-[0.2em]">
                  PRINCIPIOS
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
                Cómo trabajamos.
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-12">
              <div>
                <p className="font-display text-xs text-[var(--color-gold-2)] tracking-[0.3em] uppercase mb-3">
                  01
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-medium text-[var(--color-ink)] mb-3 tracking-tight">
                  Sin promesas vacías
                </h3>
                <p className="text-base text-[var(--color-ink-3)] leading-relaxed max-w-2xl">
                  Si un caso tiene baja probabilidad, lo decimos. Si los tiempos
                  son largos, los explicamos. Nadie firma un contrato con
                  nosotros sin saber el escenario realista.
                </p>
              </div>

              <div>
                <p className="font-display text-xs text-[var(--color-gold-2)] tracking-[0.3em] uppercase mb-3">
                  02
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-medium text-[var(--color-ink)] mb-3 tracking-tight">
                  Atendemos en español de verdad
                </h3>
                <p className="text-base text-[var(--color-ink-3)] leading-relaxed max-w-2xl">
                  No traductores, no chatbots. Todo el equipo habla español
                  nativo y entiende la realidad de quien migra. Lees nuestros
                  contratos en tu idioma.
                </p>
              </div>

              <div>
                <p className="font-display text-xs text-[var(--color-gold-2)] tracking-[0.3em] uppercase mb-3">
                  03
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-medium text-[var(--color-ink)] mb-3 tracking-tight">
                  Tecnología al servicio de tu caso
                </h3>
                <p className="text-base text-[var(--color-ink-3)] leading-relaxed max-w-2xl">
                  Construimos nuestra propia plataforma para que veas tu caso en
                  vivo: documentos, fechas, pagos, notificaciones. Pronto en una
                  app móvil — DigiLegal.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CTAFinal />
      </main>
      <Footer />
    </>
  )
}
