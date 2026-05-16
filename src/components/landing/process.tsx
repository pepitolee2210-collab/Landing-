const STEPS = [
  {
    n: '01',
    title: 'Diagnóstico inicial',
    body: 'Vanessa o Diana te escucha por WhatsApp. En menos de 20 minutos sabes qué servicio aplica y qué documentos necesitas.',
    duration: '15–20 min',
  },
  {
    n: '02',
    title: 'Plan y contrato',
    body: 'Contrato firmable digital con alcance completo y plan de pagos. Andrium revisa cada cláusula contigo antes de firmar.',
    duration: 'Mismo día',
  },
  {
    n: '03',
    title: 'Preparación del caso',
    body: 'Henry y Diana arman tu expediente: declaraciones, evidencia, formularios oficiales. Te avisamos qué falta sin perseguirte.',
    duration: '2–6 semanas',
  },
  {
    n: '04',
    title: 'Radicación y seguimiento',
    body: 'Presentamos ante USCIS o Corte. Accedes al portal del cliente y sigues tu caso en tiempo real.',
    duration: 'Hasta resolución',
  },
]

export function Process() {
  return (
    <section id="proceso" className="relative py-24 md:py-40 overflow-hidden">
      <div className="container-x">
        <div className="max-w-3xl mb-20">
          <span className="inline-flex items-center gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[var(--color-text-3)] mb-8">
            <span className="h-px w-8 bg-[var(--color-gold)]" />
            02 — Cómo trabajamos
          </span>
          <h2
            className="font-display text-[var(--color-text)]"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              lineHeight: 0.96,
              letterSpacing: '-0.045em',
              fontWeight: 300,
            }}
          >
            Cuatro pasos.{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--color-gold)', fontWeight: 200 }}>
              Cero incógnitas.
            </span>
          </h2>
          <p className="mt-8 text-lg text-[var(--color-text-2)] leading-relaxed max-w-2xl">
            Tu proceso migratorio puede tardar meses o años. Te explicamos en
            qué etapa estás y qué se viene en cada momento.
          </p>
        </div>

        {/* Timeline editorial con rama trazándose */}
        <div className="relative max-w-5xl">
          {/* Rama SVG que conecta los pasos */}
          <svg
            aria-hidden
            className="absolute left-0 top-0 h-full pointer-events-none hidden md:block"
            width="120"
            viewBox="0 0 120 1200"
            preserveAspectRatio="none"
            style={{ height: '100%' }}
          >
            <path
              d="M 60 40 Q 30 200 60 360 T 60 680 T 60 1000 L 60 1160"
              stroke="var(--color-gold)"
              strokeWidth="1.5"
              fill="none"
              className="branch-grow"
              style={{ ['--branch-length' as string]: '1300' }}
            />
            {/* Nodos en cada paso */}
            {[0, 0.3, 0.6, 0.9].map((y, i) => (
              <g key={i} transform={`translate(60, ${80 + y * 1100})`}>
                <circle r="4" fill="var(--color-gold)" />
                <circle r="10" stroke="var(--color-gold)" strokeWidth="1" fill="none" opacity="0.4" />
              </g>
            ))}
          </svg>

          {/* Pasos */}
          <ol className="space-y-10 md:space-y-16 md:pl-32">
            {STEPS.map((step, idx) => (
              <li
                key={step.n}
                className="group relative"
                style={{ animation: `rise 1s ${idx * 100}ms cubic-bezier(0.16, 1, 0.3, 1) both` }}
              >
                {/* Móvil: dot a la izquierda */}
                <div className="flex items-baseline gap-4 mb-3 md:hidden">
                  <span
                    className="font-display text-[var(--color-gold)]"
                    style={{ fontSize: '3rem', fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 0.9 }}
                  >
                    {step.n}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-3)]">
                    {step.duration}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 items-baseline">
                  {/* Número en desktop */}
                  <div className="hidden md:block md:col-span-2">
                    <p
                      className="font-display text-[var(--color-gold)]"
                      style={{
                        fontSize: 'clamp(3rem, 6vw, 5rem)',
                        fontWeight: 200,
                        letterSpacing: '-0.05em',
                        lineHeight: 0.85,
                      }}
                    >
                      {step.n}
                    </p>
                  </div>

                  <div className="md:col-span-7">
                    <h3
                      className="font-display text-[var(--color-text)] tracking-tight mb-3"
                      style={{
                        fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                        lineHeight: 1.05,
                        fontWeight: 400,
                        letterSpacing: '-0.025em',
                      }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-base md:text-lg text-[var(--color-text-2)] leading-relaxed max-w-xl">
                      {step.body}
                    </p>
                  </div>

                  <div className="hidden md:block md:col-span-3 md:text-right">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-3)] mb-1">
                      Duración
                    </p>
                    <p className="font-mono text-sm text-[var(--color-text)]">
                      {step.duration}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
