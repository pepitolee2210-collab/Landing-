import { SectionLabel } from '@/components/site/section-label'

export function Upcoming() {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-ink)] text-[var(--color-canvas)] relative overflow-hidden">
      {/* Detalle dorado decorativo */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, var(--color-gold) 0%, transparent 70%)',
          opacity: 0.08,
        }}
      />

      <div className="container-editorial relative">
        <div className="flex items-baseline gap-3 mb-6">
          <span className="font-mono text-xs text-[var(--color-gold)] font-medium tracking-[0.2em]">
            04
          </span>
          <span className="h-px w-12 bg-[var(--color-canvas)]/20" />
          <span className="font-mono text-[10px] text-[var(--color-canvas)]/60 uppercase tracking-[0.3em]">
            Lo que viene
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <h2
            className="lg:col-span-8 font-display font-light"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
            }}
          >
            No solo migración.{' '}
            <span className="italic" style={{ color: 'var(--color-gold)' }}>
              Construimos infraestructura
            </span>{' '}
            para la comunidad latina.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-canvas)]/10">
          {/* Sandbox de Utah */}
          <article className="bg-[var(--color-ink)] p-10 md:p-14 group">
            <div className="flex items-baseline justify-between mb-8">
              <span className="font-mono text-[10px] text-[var(--color-gold)] uppercase tracking-[0.2em]">
                Próximo lanzamiento · Q3 2026
              </span>
              <SandboxIcon />
            </div>

            <h3
              className="font-display font-light mb-4"
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
                lineHeight: 1,
                letterSpacing: '-0.025em',
              }}
            >
              Sandbox de Utah
            </h3>

            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: 'rgba(251,249,244,0.75)' }}
            >
              Un espacio físico de coworking, asesoría y formación legal en Salt
              Lake City pensado para emprendedores latinos. Allí concentramos
              consultas, talleres y comunidad.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-canvas)]/60 uppercase tracking-wider">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
              En construcción
            </div>
          </article>

          {/* DigiLegal */}
          <article className="bg-[var(--color-ink)] p-10 md:p-14 group">
            <div className="flex items-baseline justify-between mb-8">
              <span className="font-mono text-[10px] text-[var(--color-gold)] uppercase tracking-[0.2em]">
                App móvil · Próximamente
              </span>
              <PhoneIcon />
            </div>

            <h3
              className="font-display font-light mb-4"
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
                lineHeight: 1,
                letterSpacing: '-0.025em',
              }}
            >
              DigiLegal
            </h3>

            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: 'rgba(251,249,244,0.75)' }}
            >
              Tu caso migratorio en el bolsillo: ver estado, subir documentos,
              hablar con tu paralegal y recibir notificaciones de USCIS. Pensada
              para latinos, en español de verdad.
            </p>

            <div className="flex items-center gap-3 text-xs font-mono text-[var(--color-canvas)]/60 uppercase tracking-wider">
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                App Store
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                Google Play
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function SandboxIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect
        x="2"
        y="6"
        width="24"
        height="18"
        stroke="var(--color-gold)"
        strokeWidth="1.2"
      />
      <path
        d="M2 6L14 2L26 6"
        stroke="var(--color-gold)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M10 14h8M10 18h8"
        stroke="var(--color-gold)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="22" height="32" viewBox="0 0 22 32" fill="none" aria-hidden>
      <rect
        x="1"
        y="1"
        width="20"
        height="30"
        rx="3"
        stroke="var(--color-gold)"
        strokeWidth="1.2"
      />
      <path
        d="M9 5h4"
        stroke="var(--color-gold)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="11" cy="27" r="1" fill="var(--color-gold)" />
    </svg>
  )
}
