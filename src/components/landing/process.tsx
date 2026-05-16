const STEPS = [
  {
    n: '01',
    code: 'DIAGNÓSTICO',
    title: 'Diagnóstico inicial',
    body: 'Vanessa o Diana te escucha por WhatsApp. En menos de 20 minutos sabes qué servicio aplica, qué documentos necesitas y cuánto cuesta. Sin compromiso.',
    duration: '15-20 min',
    icon: 'phone',
  },
  {
    n: '02',
    code: 'PROPUESTA',
    title: 'Plan y contrato',
    body: 'Te enviamos un contrato firmable digital con alcance completo y plan de pagos. Andrium revisa contigo cada cláusula antes de firmar.',
    duration: 'Mismo día',
    icon: 'doc',
  },
  {
    n: '03',
    code: 'PROCESAMIENTO',
    title: 'Preparación del caso',
    body: 'Henry y Diana arman el expediente: declaraciones, evidencia, formularios oficiales. Recibes recordatorios automáticos de lo que falta.',
    duration: '2-6 semanas',
    icon: 'gear',
  },
  {
    n: '04',
    code: 'RADICACIÓN',
    title: 'Radicación y seguimiento',
    body: 'Presentamos ante USCIS o Corte. Accedes al portal del cliente y sigues tu caso en tiempo real. Te notificamos cada movimiento.',
    duration: 'Hasta resolución',
    icon: 'check',
  },
]

export function Process() {
  return (
    <section
      id="proceso"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'var(--color-bg-2)' }}
    >
      <div
        aria-hidden
        className="absolute inset-0 blueprint opacity-30 pointer-events-none"
      />

      <div className="container-x relative">
        <div className="max-w-3xl mb-16">
          <span className="tag mb-6">
            <DotIcon />
            02 / Cómo trabajamos
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
            Cuatro pasos.{' '}
            <span style={{ color: 'var(--color-gold)' }}>Cero incógnitas.</span>
          </h2>
          <p className="mt-6 text-lg text-[var(--color-text-2)] leading-relaxed max-w-2xl">
            Tu proceso migratorio puede tardar meses o años. Te explicamos en
            qué etapa estás y qué se viene en cada momento.
          </p>
        </div>

        {/* Grid con conectores SVG */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-line)]">
          {STEPS.map((step, idx) => (
            <StepCard key={step.n} step={step} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StepCard({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  return (
    <article
      className="relative p-7 md:p-8 group"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Número grande de fondo */}
      <span
        className="absolute top-4 right-5 font-display text-7xl font-bold opacity-[0.07] text-[var(--color-gold)] pointer-events-none select-none"
        style={{ letterSpacing: '-0.05em' }}
      >
        {step.n}
      </span>

      {/* Conector horizontal con próximo */}
      {index < 3 && (
        <svg
          className="hidden lg:block absolute top-1/2 -right-px h-px w-12 -translate-y-1/2 pointer-events-none"
          aria-hidden
        >
          <line
            x1="0"
            y1="0.5"
            x2="100%"
            y2="0.5"
            stroke="var(--color-gold)"
            strokeWidth="1"
            strokeDasharray="2 3"
            opacity="0.3"
          />
        </svg>
      )}

      <div className="relative">
        <div className="flex items-center gap-2 mb-5">
          <StepIcon icon={step.icon} />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-gold)]">
            {step.code}
          </span>
        </div>

        <h3 className="font-display text-2xl text-[var(--color-text)] mb-3 tracking-tight" style={{ fontWeight: 500 }}>
          {step.title}
        </h3>

        <p className="text-sm text-[var(--color-text-2)] leading-relaxed mb-6 min-h-[80px]">
          {step.body}
        </p>

        <div className="pt-4 border-t border-[var(--color-line)] flex items-center justify-between">
          <span className="font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-[0.15em]">
            Duración
          </span>
          <span className="font-mono text-xs text-[var(--color-text)]">
            {step.duration}
          </span>
        </div>
      </div>
    </article>
  )
}

function StepIcon({ icon }: { icon: string }) {
  const stroke = 'var(--color-gold)'
  if (icon === 'phone') {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path
          d="M4.5 3h2l1.5 4-2 1.5a8 8 0 0 0 5.5 5.5l1.5-2 4 1.5v2A2 2 0 0 1 15 17.5 13 13 0 0 1 2.5 5 2 2 0 0 1 4.5 3Z"
          stroke={stroke}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  if (icon === 'doc') {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path
          d="M5 2h7l3 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"
          stroke={stroke}
          strokeWidth="1.4"
        />
        <path d="M12 2v3h3M7 10h6M7 13h4" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    )
  }
  if (icon === 'gear') {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <circle cx="10" cy="10" r="3" stroke={stroke} strokeWidth="1.4" />
        <path
          d="M10 2v2M10 16v2M2 10h2M16 10h2M4.6 4.6l1.4 1.4M14 14l1.4 1.4M4.6 15.4 6 14M14 6l1.4-1.4"
          stroke={stroke}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  // check
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="8" stroke={stroke} strokeWidth="1.4" />
      <path d="m6 10 3 3 5-6" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DotIcon() {
  return (
    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
  )
}
