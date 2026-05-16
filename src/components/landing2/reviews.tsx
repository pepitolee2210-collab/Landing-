import { TESTIMONIALS } from '@/lib/testimonials'

export function Reviews() {
  return (
    <section
      id="opiniones"
      className="py-24 md:py-32 relative"
      style={{ background: 'var(--color-bg-2)' }}
    >
      <div className="container-x">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-7">
            <span className="inline-flex items-center gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[var(--color-text-3)] mb-6">
              <span className="h-px w-8 bg-[var(--color-gold)]" />
              Opiniones reales
            </span>
            <h2
              className="font-display text-[var(--color-text)]"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                fontWeight: 300,
              }}
            >
              4.9 / 5{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--color-gold)', fontWeight: 200 }}>
                en 400+
              </span>{' '}
              casos atendidos.
            </h2>
          </div>
          <div className="md:col-span-5 md:text-right flex md:items-end md:justify-end">
            <div className="md:text-right">
              <div className="flex md:justify-end items-center gap-2 mb-2">
                <BigStars />
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-3)]">
                Verificado por Google · 2024–2026
              </p>
            </div>
          </div>
        </div>

        {/* Grid 3 cols con testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.slice(0, 6).map((t, idx) => (
            <article
              key={t.id}
              className="p-7 rounded-2xl border border-[var(--color-line-2)] hover:border-[var(--color-gold)]/40 transition-colors flex flex-col"
              style={{ background: 'var(--color-surface)' }}
            >
              <Stars />
              <p
                className="mt-4 mb-5 font-display text-[var(--color-text)] flex-1"
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.5,
                  fontWeight: 400,
                  letterSpacing: '-0.005em',
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-line)]">
                <span
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full font-mono text-[11px] font-bold"
                  style={{
                    background: 'var(--color-elevated)',
                    color: 'var(--color-gold)',
                    border: '1px solid var(--color-line-2)',
                  }}
                >
                  {t.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-[var(--color-text)] truncate">{t.name}</p>
                  <p className="text-[10px] font-mono text-[var(--color-text-3)] uppercase tracking-[0.15em] truncate">
                    {t.origin}
                  </p>
                </div>
                {/* Verified pill */}
                <span
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-mono text-[9px] uppercase tracking-[0.12em] flex-shrink-0"
                  style={{
                    background: 'rgba(52, 211, 153, 0.1)',
                    color: 'var(--color-jade)',
                    border: '1px solid rgba(52, 211, 153, 0.25)',
                  }}
                >
                  <CheckSmall />
                  Verificado
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stars() {
  return (
    <span className="inline-flex items-center gap-px">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 12 12" fill="var(--color-gold)" aria-hidden>
          <path d="M6 1l1.5 3.4 3.5.3-2.6 2.4.8 3.4L6 8.7 2.8 10.5l.8-3.4-2.6-2.4 3.5-.3L6 1z" />
        </svg>
      ))}
    </span>
  )
}

function BigStars() {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="22" height="22" viewBox="0 0 12 12" fill="var(--color-gold)" aria-hidden>
          <path d="M6 1l1.5 3.4 3.5.3-2.6 2.4.8 3.4L6 8.7 2.8 10.5l.8-3.4-2.6-2.4 3.5-.3L6 1z" />
        </svg>
      ))}
    </span>
  )
}

function CheckSmall() {
  return (
    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path
        d="M2 5l2 2 4-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
