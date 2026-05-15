import { TESTIMONIALS } from '@/lib/testimonials'
import { SectionLabel } from '@/components/site/section-label'

export function Testimonials() {
  return (
    <section id="testimonios" className="py-24 md:py-32">
      <div className="container-editorial">
        <SectionLabel number="03" title="Casos reales" />

        <div className="mb-16 max-w-3xl">
          <h2
            className="font-display font-light text-[var(--color-ink)]"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
            }}
          >
            Lo que dicen{' '}
            <span className="italic" style={{ color: 'var(--color-gold-2)' }}>
              quienes ya pasaron
            </span>{' '}
            por aquí.
          </h2>
        </div>

        {/* Grid editorial — masonry-style */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-8">
          {TESTIMONIALS.map((t, idx) => {
            // Layout asimétrico: alterna spans para sensación editorial
            const span =
              idx % 5 === 0
                ? 'md:col-span-4'
                : idx % 5 === 1
                  ? 'md:col-span-2'
                  : idx % 5 === 2
                    ? 'md:col-span-3'
                    : idx % 5 === 3
                      ? 'md:col-span-3'
                      : 'md:col-span-6'
            return (
              <article
                key={t.id}
                className={`${span} group p-8 md:p-10 bg-[var(--color-canvas-2)]/40 border border-[var(--color-line-soft)] hover:border-[var(--color-ink)] transition-all duration-500 hover:-translate-y-1`}
                style={{ borderRadius: 'var(--radius-md)' }}
              >
                {/* Quote mark editorial */}
                <span
                  className="font-display block leading-none text-5xl mb-4"
                  style={{ color: 'var(--color-gold)' }}
                >
                  ‟
                </span>

                <p
                  className="font-display text-[var(--color-ink)] mb-6 italic"
                  style={{
                    fontSize: idx % 5 === 0 || idx % 5 === 4 ? '1.5rem' : '1.125rem',
                    lineHeight: 1.4,
                    letterSpacing: '-0.01em',
                    fontVariationSettings: '"SOFT" 50',
                  }}
                >
                  {t.quote}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-line-soft)]">
                  {/* Avatar — iniciales editoriales */}
                  <span
                    className="inline-flex items-center justify-center w-10 h-10 font-mono text-sm font-medium"
                    style={{
                      background: 'var(--color-ink)',
                      color: 'var(--color-canvas)',
                      borderRadius: '50%',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {t.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm text-[var(--color-ink)]">
                      {t.name}
                    </p>
                    <p className="text-xs text-[var(--color-ink-3)] font-mono">
                      {t.origin}
                    </p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="font-mono text-[10px] text-[var(--color-ink-3)] uppercase tracking-wider">
                      {t.service}
                    </p>
                    <p className="font-mono text-xs text-[var(--color-gold-2)] mt-0.5">
                      {t.year}
                    </p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
