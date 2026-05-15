import Link from 'next/link'
import { TEAM } from '@/lib/team'
import { SectionLabel } from '@/components/site/section-label'

export function TeamPreview() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-editorial">
        <SectionLabel number="05" title="El equipo" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <h2
            className="lg:col-span-8 font-display font-light text-[var(--color-ink)]"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
            }}
          >
            Detrás de cada caso, un equipo{' '}
            <span className="italic" style={{ color: 'var(--color-gold-2)' }}>
              que también es latino.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {TEAM.map((member) => (
            <article key={member.slug} className="group">
              {/* Avatar editorial — gradient warm tones */}
              <div
                className="aspect-[4/5] mb-4 overflow-hidden relative"
                style={{
                  background: `linear-gradient(135deg, var(--color-canvas-2) 0%, var(--color-line-soft) 100%)`,
                  borderRadius: 'var(--radius-md)',
                }}
              >
                {/* Iniciales como placeholder elegante */}
                <span
                  className="absolute inset-0 flex items-center justify-center font-display font-light"
                  style={{
                    fontSize: '4rem',
                    color: 'var(--color-ink)',
                    opacity: 0.18,
                    letterSpacing: '-0.04em',
                  }}
                >
                  {member.name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </span>

                {/* Banderita esquina */}
                {member.origin && (
                  <span className="absolute top-3 right-3 text-base">
                    {member.origin.split(' ')[0]}
                  </span>
                )}
              </div>

              <p className="font-display text-base font-medium text-[var(--color-ink)] tracking-tight leading-tight">
                {member.name}
              </p>
              <p className="mt-1 text-xs text-[var(--color-ink-3)] font-mono">
                {member.shortRole}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 flex">
          <Link
            href="/sobre-nosotros"
            className="inline-flex items-center gap-3 text-[var(--color-ink)] link-underline font-medium"
          >
            Conoce al equipo completo
            <span className="inline-block w-12 h-px bg-[var(--color-ink)] relative">
              <span
                className="absolute right-0 top-0 -translate-y-1/2 w-2 h-2 border-t border-r border-[var(--color-ink)] rotate-45"
                style={{ marginTop: '-1px' }}
              />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
