const STEPS = [
  {
    n: '01',
    title: 'Elige tu servicio',
    body: 'Navega el catálogo, compara precios y selecciona el plan que se ajusta a tu situación.',
  },
  {
    n: '02',
    title: 'Paga seguro',
    body: 'Pago inicial con Stripe o Zelle. Cuotas mensuales sin interés. Recibo y contrato firmable al instante.',
  },
  {
    n: '03',
    title: 'Empezamos hoy',
    body: 'Diana o Henry te asignan equipo y agendan tu primera reunión. Acceso al portal cliente desde el día 1.',
  },
] as const

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 md:py-32 relative">
      <div className="container-x">
        <div className="max-w-3xl mb-16">
          <span className="inline-flex items-center gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[var(--color-text-3)] mb-6">
            <span className="h-px w-8 bg-[var(--color-gold)]" />
            Cómo funciona
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
            De click a caso activo{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--color-gold)', fontWeight: 200 }}>
              el mismo día.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-line-2)] rounded-2xl overflow-hidden">
          {STEPS.map((step, idx) => (
            <div
              key={step.n}
              className="relative p-8 md:p-10"
              style={{ background: 'var(--color-surface)' }}
            >
              <div className="flex items-baseline gap-4 mb-6">
                <span
                  className="font-display"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    color: 'var(--color-gold)',
                    fontWeight: 200,
                    letterSpacing: '-0.05em',
                    lineHeight: 0.9,
                  }}
                >
                  {step.n}
                </span>
                {idx < STEPS.length - 1 && (
                  <span className="hidden md:block flex-1 h-px bg-gradient-to-r from-[var(--color-gold)] to-transparent" />
                )}
              </div>
              <h3
                className="font-display text-[var(--color-text)] mb-3"
                style={{ fontSize: '1.5rem', fontWeight: 500, letterSpacing: '-0.02em' }}
              >
                {step.title}
              </h3>
              <p className="text-sm text-[var(--color-text-2)] leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
