/**
 * Marquee de "respaldos" — instituciones reconocidas con las que
 * tratamos. Logos SVG estilizados para mantener look tech-clean.
 */
const ITEMS = [
  { name: 'USCIS' },
  { name: 'Utah Juvenile Court' },
  { name: 'EOIR · DOJ' },
  { name: 'IRS · W-7 / 1040' },
  { name: 'NVC' },
  { name: 'Departamento de Estado' },
  { name: 'Salt Lake County' },
  { name: 'Utah DMV' },
  { name: 'Stripe · Pagos seguros' },
  { name: 'Google Reviews' },
]

export function TrustLogos() {
  return (
    <section className="relative py-10 md:py-14 overflow-hidden">
      <div className="l2-container">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--c-fg-3)] mb-7">
          Tramitamos ante · Verificados en
        </p>
      </div>

      {/* Marquee infinito */}
      <div
        className="relative overflow-hidden"
        style={
          {
            maskImage:
              'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
            WebkitMaskImage:
              'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
          } as React.CSSProperties
        }
      >
        <div className="l2-marquee gap-16" style={{ ['--m-duration' as never]: '34s' }}>
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <LogoChip key={`${item.name}-${i}`} name={item.name} />
          ))}
        </div>
      </div>
    </section>
  )
}

function LogoChip({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity">
      <Hex />
      <span
        className="l2-display text-lg md:text-xl text-[var(--c-fg-2)] whitespace-nowrap"
        style={{ fontWeight: 600, letterSpacing: '-0.02em' }}
      >
        {name}
      </span>
    </div>
  )
}

function Hex() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z"
        stroke="var(--c-blue)"
        strokeWidth="1.2"
        fill="rgba(91,155,255,0.06)"
      />
      <circle cx="12" cy="12" r="2" fill="var(--c-blue)" />
    </svg>
  )
}
