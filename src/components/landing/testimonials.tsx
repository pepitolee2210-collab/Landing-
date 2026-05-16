import { TESTIMONIALS } from '@/lib/testimonials'
import { AmbientOrbs } from '@/components/decor/ambient-orbs'

export function Testimonials() {
  return (
    <section id="testimonios" className="relative py-24 md:py-32 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 blueprint-dots opacity-30 pointer-events-none"
      />
      <AmbientOrbs
        orbs={[
          { color: 'red', size: 520, x: '88%', y: '20%', opacity: 0.25, duration: 24 },
        ]}
      />

      <div className="container-x relative">
        <div className="mb-16 max-w-3xl">
          <span className="tag mb-6">
            <DotIcon />
            03 / Casos reales
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
            Lo que dicen{' '}
            <span style={{ color: 'var(--color-gold)' }}>
              quienes ya pasaron
            </span>{' '}
            por aquí.
          </h2>
        </div>

        {/* Grid editorial asimétrico */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {TESTIMONIALS.map((t, idx) => {
            const span =
              idx % 6 === 0 ? 'md:col-span-6' :
              idx % 6 === 1 ? 'md:col-span-6' :
              idx % 6 === 2 ? 'md:col-span-4' :
              idx % 6 === 3 ? 'md:col-span-4' :
              idx % 6 === 4 ? 'md:col-span-4' :
              'md:col-span-12'
            return (
              <article
                key={t.id}
                className={`${span} group relative p-7 md:p-9 border border-[var(--color-line-2)] hover:border-[var(--color-gold)]/40 transition-all duration-500 hover:-translate-y-1`}
                style={{
                  background: 'var(--color-surface)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                {/* Cinta de cita */}
                <div
                  className="absolute -top-2.5 left-7 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em]"
                  style={{
                    background: 'var(--color-bg)',
                    color: 'var(--color-gold)',
                    border: '1px solid var(--color-line-2)',
                    borderRadius: '4px',
                  }}
                >
                  CASO {String(idx + 1).padStart(3, '0')} · {t.year}
                </div>

                <svg width="28" height="20" viewBox="0 0 28 20" fill="none" className="mb-5" aria-hidden>
                  <path
                    d="M0 20V12C0 5.4 4.4 0.8 11 0L11.6 4.4C7.6 5.6 5.2 7.6 5.2 12H10.4V20H0ZM17.2 20V12C17.2 5.4 21.6 0.8 28 0L28 4.4C24.6 5.6 22.4 7.6 22.4 12H27.6V20H17.2Z"
                    fill="var(--color-gold)"
                    fillOpacity="0.4"
                  />
                </svg>

                <p
                  className="font-display text-[var(--color-text)] mb-7"
                  style={{
                    fontSize: idx % 6 < 2 ? '1.5rem' : '1.125rem',
                    lineHeight: 1.4,
                    letterSpacing: '-0.015em',
                    fontWeight: 400,
                  }}
                >
                  {t.quote}
                </p>

                <div className="flex items-center justify-between pt-5 border-t border-[var(--color-line)]">
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="inline-flex items-center justify-center w-10 h-10 font-mono text-xs font-medium flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, var(--color-elevated), var(--color-surface-2))',
                        color: 'var(--color-gold)',
                        borderRadius: '50%',
                        border: '1px solid var(--color-line-2)',
                      }}
                    >
                      {t.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="font-medium text-sm text-[var(--color-text)] truncate">
                        {t.name}
                      </p>
                      <p className="text-xs text-[var(--color-text-3)] font-mono truncate">
                        {t.origin}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:block text-right flex-shrink-0">
                    <p className="font-mono text-[9px] text-[var(--color-text-3)] uppercase tracking-[0.15em]">
                      Servicio
                    </p>
                    <p className="font-mono text-[10px] text-[var(--color-gold)] mt-0.5">
                      {t.service}
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

function DotIcon() {
  return <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
}
