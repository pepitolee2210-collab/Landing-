const FEATURES = [
  {
    icon: 'lock',
    title: 'Pagos 100% seguros',
    body: 'Procesamos con Stripe y Zelle, encriptación SSL en cada transacción. Tu información financiera está protegida.',
  },
  {
    icon: 'calendar',
    title: 'Cuotas sin interés',
    body: 'Divide el costo en hasta 13 cuotas mensuales sin recargo. Empezamos tu caso desde la primera cuota.',
  },
  {
    icon: 'chat',
    title: 'Soporte humano 24/7',
    body: 'WhatsApp directo con Vanessa, Diana o Andrium. Respondemos en menos de 4 horas, todos los días.',
  },
  {
    icon: 'check',
    title: 'Garantía 7 días',
    body: 'Si en los primeros 7 días no estás conforme, te devolvemos el 100% del monto inicial. Sin preguntas.',
  },
] as const

export function Features() {
  return (
    <section className="py-24 md:py-32 relative" style={{ background: 'var(--color-bg-2)' }}>
      <div className="container-x">
        <div className="max-w-3xl mb-16">
          <span className="inline-flex items-center gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[var(--color-text-3)] mb-6">
            <span className="h-px w-8 bg-[var(--color-gold)]" />
            Por qué UsaLatinoPrime
          </span>
          <h2
            className="font-display text-[var(--color-text)]"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              fontWeight: 300,
            }}
          >
            La tecnología, la transparencia
            <br />
            <span style={{ fontStyle: 'italic', color: 'var(--color-gold)', fontWeight: 200 }}>
              y el equipo
            </span>{' '}
            que tu caso necesita.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f) => (
            <article
              key={f.title}
              className="p-7 rounded-2xl border border-[var(--color-line-2)] hover:border-[var(--color-gold)]/40 transition-colors"
              style={{ background: 'var(--color-surface)' }}
            >
              <span
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5"
                style={{
                  background: 'rgba(242, 178, 52, 0.08)',
                  border: '1px solid rgba(242, 178, 52, 0.25)',
                }}
              >
                <FeatureIcon name={f.icon} />
              </span>
              <h3
                className="font-display text-[var(--color-text)] mb-2"
                style={{ fontSize: '1.125rem', fontWeight: 500, letterSpacing: '-0.015em' }}
              >
                {f.title}
              </h3>
              <p className="text-sm text-[var(--color-text-2)] leading-relaxed">{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureIcon({ name }: { name: string }) {
  const stroke = 'var(--color-gold)'
  if (name === 'lock') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="4" y="10" width="16" height="12" rx="2" stroke={stroke} strokeWidth="1.6" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke={stroke} strokeWidth="1.6" />
        <circle cx="12" cy="16" r="1.5" fill={stroke} />
      </svg>
    )
  }
  if (name === 'calendar') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="4" y="5" width="16" height="16" rx="2" stroke={stroke} strokeWidth="1.6" />
        <path d="M4 10h16M9 3v4M15 3v4" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="9" cy="15" r="1.2" fill={stroke} />
        <circle cx="15" cy="15" r="1.2" fill={stroke} />
      </svg>
    )
  }
  if (name === 'chat') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M3 7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H9l-5 4v-4a3 3 0 0 1-1-2V7z" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="9" cy="11" r="1" fill={stroke} />
        <circle cx="12" cy="11" r="1" fill={stroke} />
        <circle cx="15" cy="11" r="1" fill={stroke} />
      </svg>
    )
  }
  // check
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.6" />
      <path d="m8 12 3 3 5-6" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
