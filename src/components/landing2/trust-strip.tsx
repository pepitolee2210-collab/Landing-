/**
 * Franja de trust justo después del hero.
 * Métricas comerciales fuertes sobre fondo distinto del bg para crear separación.
 */
export function TrustStrip() {
  return (
    <section
      className="relative py-12 md:py-16 border-y border-[var(--color-line-2)]"
      style={{ background: 'var(--color-bg-2)' }}
    >
      <div className="container-x">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
          <Metric n="400+" label="Familias atendidas" sub="desde 2024" />
          <Metric n="98%" label="Casos firmados" sub="aprobación inicial" />
          <Metric n="< 4h" label="Respuesta promedio" sub="bilingüe ES & EN" />
          <Metric n="9" label="Países servidos" sub="latinoamérica + USA" />
        </div>
      </div>
    </section>
  )
}

function Metric({
  n,
  label,
  sub,
}: {
  n: string
  label: string
  sub: string
}) {
  return (
    <div className="flex flex-col items-start">
      <p
        className="font-display text-[var(--color-text)]"
        style={{
          fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)',
          lineHeight: 0.95,
          letterSpacing: '-0.04em',
          fontWeight: 300,
        }}
      >
        {n}
      </p>
      <p className="mt-2 text-sm text-[var(--color-text)] font-medium">{label}</p>
      <p className="text-[10px] text-[var(--color-text-3)] font-mono uppercase tracking-[0.18em] mt-1">
        {sub}
      </p>
    </div>
  )
}
