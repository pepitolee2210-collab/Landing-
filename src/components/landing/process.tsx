import { SectionLabel } from '@/components/site/section-label'

const STEPS = [
  {
    n: '01',
    title: 'Llamada de diagnóstico',
    body: 'Vanessa o Diana te escucha por WhatsApp o teléfono. Te decimos en minutos qué servicio aplica y qué documentos vas a necesitar. Sin compromiso.',
    time: '15 a 20 min',
  },
  {
    n: '02',
    title: 'Plan y contrato',
    body: 'Te enviamos un contrato con el alcance completo, precios desglosados y plan de pagos. Lo firmas digitalmente cuando estás listo. Andrium responde toda duda contractual.',
    time: 'Mismo día',
  },
  {
    n: '03',
    title: 'Preparación del caso',
    body: 'Henry y Diana arman el expediente: declaraciones, evidencia, formularios oficiales. Te avisamos cada documento que falta, sin perseguirte.',
    time: '2 a 6 semanas',
  },
  {
    n: '04',
    title: 'Radicación y seguimiento',
    body: 'Presentamos ante USCIS o Corte. Vas a tener acceso al portal del cliente para ver estado, fechas y documentos. Te notificamos cada movimiento.',
    time: 'Vigente hasta resolución',
  },
]

export function Process() {
  return (
    <section id="proceso" className="py-24 md:py-32 bg-[var(--color-canvas-2)]/40">
      <div className="container-editorial">
        <SectionLabel number="02" title="Cómo trabajamos" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <h2
            className="lg:col-span-7 font-display font-light text-[var(--color-ink)]"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
            }}
          >
            Cuatro pasos.{' '}
            <span className="italic" style={{ color: 'var(--color-gold-2)' }}>
              Sin sorpresas.
            </span>
          </h2>
          <p className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-[var(--color-line-soft)] text-base text-[var(--color-ink-3)] leading-relaxed lg:pt-2">
            Tu proceso migratorio puede tardar meses o años. Nuestro trabajo
            es que entiendas en qué etapa estás, qué se viene y cómo te
            preparamos para cada momento.
          </p>
        </div>

        <ol className="space-y-px">
          {STEPS.map((step, idx) => (
            <li
              key={step.n}
              className="grid grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 border-t border-[var(--color-line-soft)]"
              style={
                idx === STEPS.length - 1
                  ? { borderBottom: '1px solid var(--color-line-soft)' }
                  : undefined
              }
            >
              <div className="col-span-2 md:col-span-1">
                <span
                  className="font-display text-3xl md:text-5xl font-light"
                  style={{ color: 'var(--color-gold-2)', letterSpacing: '-0.04em' }}
                >
                  {step.n}
                </span>
              </div>
              <div className="col-span-10 md:col-span-7">
                <h3 className="font-display text-2xl md:text-3xl font-medium text-[var(--color-ink)] tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-base text-[var(--color-ink-3)] max-w-xl leading-relaxed">
                  {step.body}
                </p>
              </div>
              <div className="col-span-12 md:col-span-4 md:text-right md:pt-2">
                <p className="font-mono text-[10px] text-[var(--color-ink-3)] uppercase tracking-[0.2em]">
                  Tiempo estimado
                </p>
                <p className="mt-2 font-mono text-sm text-[var(--color-ink-2)]">
                  {step.time}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
