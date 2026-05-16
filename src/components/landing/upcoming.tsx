import { AmbientOrbs } from '@/components/decor/ambient-orbs'

export function Upcoming() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 blueprint opacity-30 pointer-events-none"
      />
      <AmbientOrbs
        orbs={[
          { color: 'blue', size: 580, x: '85%', y: '60%', opacity: 0.28, duration: 26 },
        ]}
      />

      <div className="container-x relative">
        <div className="mb-16 max-w-3xl">
          <span className="tag mb-6">
            <DotIcon />
            04 / Lo que viene
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
            No solo migración.{' '}
            <span style={{ color: 'var(--color-gold)' }}>
              Construimos infraestructura
            </span>{' '}
            para la comunidad latina.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-line)]">
          {/* Sandbox de Utah */}
          <article
            className="relative p-10 md:p-14 group overflow-hidden"
            style={{ background: 'var(--color-bg-2)' }}
          >
            {/* SVG decoración — building blueprint */}
            <div className="absolute -top-8 -right-8 opacity-20 pointer-events-none">
              <SandboxSVG />
            </div>

            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <span className="tag tag-amber">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                  Q3 2026 · Salt Lake City
                </span>
              </div>

              <h3
                className="font-display mb-4"
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  fontWeight: 500,
                }}
              >
                Sandbox de Utah
              </h3>

              <p className="text-base text-[var(--color-text-2)] leading-relaxed mb-6 max-w-md">
                Un espacio físico de coworking, asesoría y formación legal en
                Salt Lake City pensado para emprendedores latinos. Allí
                concentramos consultas, talleres y comunidad.
              </p>

              <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-text-3)] uppercase tracking-[0.15em]">
                <span className="pulse-dot" style={{ background: 'var(--color-gold)' }} />
                En construcción
              </div>
            </div>
          </article>

          {/* DigiLegal — navy electric (app digital) */}
          <article
            className="relative p-10 md:p-14 group overflow-hidden"
            style={{ background: 'var(--color-bg-2)' }}
          >
            <div className="absolute -bottom-8 -right-4 opacity-30 pointer-events-none">
              <PhoneMockupSVG />
            </div>

            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <span className="tag tag-navy">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-blue-bright)]" />
                  App móvil · 2026
                </span>
              </div>

              <h3
                className="font-display mb-4"
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  fontWeight: 500,
                }}
              >
                DigiLegal
              </h3>

              <p className="text-base text-[var(--color-text-2)] leading-relaxed mb-6 max-w-md">
                Tu caso migratorio en el bolsillo: estado en tiempo real, subir
                documentos, hablar con tu paralegal y recibir notificaciones de
                USCIS. En español de verdad.
              </p>

              <div className="flex items-center gap-3 text-xs font-mono text-[var(--color-text-3)] uppercase tracking-[0.15em]">
                <span className="flex items-center gap-1.5">
                  <AppStoreIcon />
                  App Store
                </span>
                <span className="flex items-center gap-1.5">
                  <PlayStoreIcon />
                  Google Play
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function SandboxSVG() {
  return (
    <svg width="240" height="240" viewBox="0 0 240 240" fill="none" aria-hidden>
      {/* Edificio blueprint */}
      <rect x="40" y="80" width="160" height="120" stroke="var(--color-gold)" strokeWidth="1" />
      <path d="M40 80 L120 30 L200 80" stroke="var(--color-gold)" strokeWidth="1" />
      {/* Ventanas */}
      <rect x="60" y="100" width="20" height="24" stroke="var(--color-gold)" strokeWidth="0.6" />
      <rect x="90" y="100" width="20" height="24" stroke="var(--color-gold)" strokeWidth="0.6" />
      <rect x="120" y="100" width="20" height="24" stroke="var(--color-gold)" strokeWidth="0.6" />
      <rect x="150" y="100" width="20" height="24" stroke="var(--color-gold)" strokeWidth="0.6" />
      <rect x="60" y="140" width="20" height="24" stroke="var(--color-gold)" strokeWidth="0.6" />
      <rect x="90" y="140" width="20" height="24" stroke="var(--color-gold)" strokeWidth="0.6" />
      <rect x="120" y="140" width="20" height="24" stroke="var(--color-gold)" strokeWidth="0.6" />
      <rect x="150" y="140" width="20" height="24" stroke="var(--color-gold)" strokeWidth="0.6" />
      {/* Puerta — rojo Utah */}
      <rect x="108" y="172" width="24" height="28" stroke="var(--color-red)" strokeWidth="1" fill="var(--color-red)" fillOpacity="0.18" />
      {/* Marcadores blueprint - blanco */}
      <circle cx="40" cy="80" r="3" fill="#fff" />
      <circle cx="200" cy="80" r="3" fill="#fff" />
      {/* Bandera Utah simplificada en el techo */}
      <line x1="120" y1="30" x2="120" y2="12" stroke="#fff" strokeWidth="1" />
      <rect x="120" y="12" width="14" height="9" fill="var(--color-red)" />
      <rect x="120" y="12" width="14" height="3" fill="var(--color-gold)" />
    </svg>
  )
}

function PhoneMockupSVG() {
  return (
    <svg width="200" height="280" viewBox="0 0 200 280" fill="none" aria-hidden>
      {/* Frame del teléfono */}
      <rect x="40" y="20" width="120" height="240" rx="14" stroke="var(--color-blue-bright)" strokeWidth="1.2" fill="var(--color-bg-2)" />
      {/* Notch */}
      <rect x="80" y="28" width="40" height="6" rx="3" fill="var(--color-gold)" opacity="0.4" />
      {/* App screen mock */}
      <rect x="48" y="44" width="104" height="40" rx="4" fill="var(--color-gold)" opacity="0.15" stroke="var(--color-gold)" strokeWidth="0.6" />
      <text x="56" y="58" fill="var(--color-gold)" fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.5">CASO ACTIVO</text>
      <text x="56" y="72" fill="var(--color-gold)" fontSize="9" fontFamily="var(--font-display)" fontWeight="600">Visa Juvenil</text>
      {/* Progress */}
      <rect x="48" y="100" width="104" height="3" rx="1.5" fill="var(--color-line-2)" />
      <rect x="48" y="100" width="65" height="3" rx="1.5" fill="var(--color-gold)" />
      {/* List items */}
      <rect x="48" y="118" width="104" height="20" rx="3" stroke="var(--color-line)" strokeWidth="0.6" />
      <rect x="48" y="144" width="104" height="20" rx="3" stroke="var(--color-line)" strokeWidth="0.6" />
      <rect x="48" y="170" width="104" height="20" rx="3" stroke="var(--color-line)" strokeWidth="0.6" />
      <rect x="48" y="196" width="104" height="20" rx="3" stroke="var(--color-line)" strokeWidth="0.6" />
      {/* Bottom nav */}
      <line x1="48" y1="234" x2="152" y2="234" stroke="var(--color-line)" strokeWidth="0.5" />
      <circle cx="64" cy="248" r="4" fill="var(--color-blue-bright)" />
      <circle cx="100" cy="248" r="4" stroke="var(--color-text-3)" strokeWidth="0.6" fill="none" />
      <circle cx="136" cy="248" r="4" stroke="var(--color-text-3)" strokeWidth="0.6" fill="none" />
    </svg>
  )
}

function AppStoreIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
      <path d="M9.5 6.4c0-1.6 1.3-2.4 1.4-2.5-.8-1.1-1.9-1.3-2.3-1.3-1-.1-2 .6-2.4.6-.5 0-1.3-.6-2.1-.6-1.1 0-2.1.6-2.7 1.7-1.2 2-.3 5 .8 6.6.6.8 1.2 1.7 2.1 1.7.8 0 1.2-.5 2.2-.5s1.3.5 2.2.5c.9 0 1.5-.8 2.1-1.7.6-1 .9-1.9.9-1.9-.1 0-1.7-.7-1.7-2.6h-.5z" />
    </svg>
  )
}

function PlayStoreIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
      <path d="M1.5 1L9 6L1.5 11V1Z" />
    </svg>
  )
}

function DotIcon() {
  return <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
}
