import type { Metadata } from 'next'
import { TEAM } from '@/lib/team'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { CTAFinal } from '@/components/landing/cta-final'

export const metadata: Metadata = {
  title: 'Equipo',
  description:
    'El equipo detrás de UsaLatinoPrime: Henry, Vanessa, Diana, Andrium, Giuseppe y Mauricio. Latinos trabajando para latinos en EE.UU.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-16 md:pt-24 pb-16">
          <div
            aria-hidden
            className="absolute inset-0 blueprint opacity-30 pointer-events-none"
            style={{ maskImage: 'radial-gradient(ellipse 80% 60% at 50% 20%, black 30%, transparent 90%)' }}
          />

          <div className="container-x relative">
            <div className="rise">
              <span className="tag mb-8">
                <DotIcon />
                Equipo · 2026
              </span>
            </div>

            <h1
              className="font-display text-[var(--color-text)] rise"
              style={{
                fontSize: 'clamp(2.75rem, 7vw, 6rem)',
                lineHeight: 0.96,
                letterSpacing: '-0.04em',
                fontWeight: 500,
                maxWidth: '15ch',
                animationDelay: '100ms',
              }}
            >
              Latinos{' '}
              <span style={{ color: 'var(--color-gold)' }}>trabajando para latinos</span>{' '}
              en EE.UU.
            </h1>

            <p
              className="mt-10 text-lg text-[var(--color-text-2)] leading-relaxed max-w-2xl rise"
              style={{ animationDelay: '220ms' }}
            >
              Cada uno del equipo migró, atravesó procesos legales o creció
              entre familias que lo hicieron. No es una historia de marketing.
              Es por qué entendemos tu caso antes de que termines de contarlo.
            </p>
          </div>
        </section>

        {/* Team grid */}
        <section className="py-16 md:py-24">
          <div className="container-x">
            <ul className="space-y-4">
              {TEAM.map((member, idx) => (
                <li
                  key={member.slug}
                  className="grid grid-cols-12 gap-4 md:gap-8 items-start p-6 md:p-10 border border-[var(--color-line-2)] rounded-lg transition-colors hover:border-[var(--color-gold)]/40"
                  style={{ background: 'var(--color-surface)' }}
                >
                  {/* Avatar geometric */}
                  <div className="col-span-3 md:col-span-2">
                    <div
                      className="aspect-square overflow-hidden relative rounded-md board-grid"
                      style={{
                        background: 'linear-gradient(135deg, var(--color-elevated), var(--color-bg-2))',
                      }}
                    >
                      <span
                        className="absolute inset-0 flex items-center justify-center font-display"
                        style={{
                          fontSize: '3rem',
                          color: 'var(--color-gold)',
                          fontWeight: 500,
                          letterSpacing: '-0.04em',
                          opacity: 0.7,
                        }}
                      >
                        {member.name
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')}
                      </span>
                      <span
                        className="absolute bottom-2 left-2 w-2 h-2 rounded-full"
                        style={{ background: 'var(--color-jade)' }}
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="col-span-9 md:col-span-7">
                    <p className="font-mono text-[10px] text-[var(--color-gold)] uppercase tracking-[0.18em] mb-2">
                      {member.shortRole}
                    </p>
                    <h2
                      className="font-display text-[var(--color-text)] tracking-tight mb-3"
                      style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: 1.05, fontWeight: 500 }}
                    >
                      {member.name}
                    </h2>
                    <p className="text-base text-[var(--color-text-2)] leading-relaxed max-w-xl">
                      {member.bio}
                    </p>
                  </div>

                  {/* Bandera/rol */}
                  <div className="col-span-12 md:col-span-3 md:text-right md:pt-2 mt-4 md:mt-0">
                    {member.origin && (
                      <p className="text-base font-mono mb-2">{member.origin}</p>
                    )}
                    <p className="text-[10px] font-mono text-[var(--color-text-3)] uppercase tracking-[0.15em]">
                      {member.role}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Principios */}
        <section className="py-24 md:py-32 relative" style={{ background: 'var(--color-bg-2)' }}>
          <div
            aria-hidden
            className="absolute inset-0 blueprint opacity-30 pointer-events-none"
          />
          <div className="container-x relative grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <span className="tag mb-6">
                <DotIcon />
                Principios
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
                Cómo trabajamos.
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-10">
              {[
                {
                  n: '01',
                  t: 'Sin promesas vacías',
                  d: 'Si un caso tiene baja probabilidad, lo decimos. Si los tiempos son largos, los explicamos. Nadie firma un contrato con nosotros sin saber el escenario realista.',
                },
                {
                  n: '02',
                  t: 'Español de verdad',
                  d: 'No traductores, no chatbots. Todo el equipo habla español nativo y entiende la realidad de quien migra. Lees nuestros contratos en tu idioma.',
                },
                {
                  n: '03',
                  t: 'Tecnología al servicio del caso',
                  d: 'Construimos nuestra propia plataforma para que veas tu caso en vivo: documentos, fechas, pagos, notificaciones. Pronto en una app móvil — DigiLegal.',
                },
              ].map((item) => (
                <div key={item.n}>
                  <p className="font-mono text-xs text-[var(--color-gold)] tracking-[0.25em] mb-3">
                    {item.n}
                  </p>
                  <h3
                    className="font-display text-[var(--color-text)] mb-3 tracking-tight"
                    style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', lineHeight: 1.1, fontWeight: 500 }}
                  >
                    {item.t}
                  </h3>
                  <p className="text-base text-[var(--color-text-2)] leading-relaxed max-w-2xl">
                    {item.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTAFinal />
      </main>
      <Footer />
    </>
  )
}

function DotIcon() {
  return <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
}
