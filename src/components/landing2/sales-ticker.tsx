const TICKER_ITEMS = [
  { name: 'Carlos H.', city: 'Phoenix · AZ', action: 'compró Visa Juvenil', time: 'hace 3 min' },
  { name: 'María R.', city: 'Salt Lake City · UT', action: 'reservó Consulta Express', time: 'hace 7 min' },
  { name: 'Ana G.', city: 'Newark · NJ', action: 'compró Asilo Reforzamiento', time: 'hace 12 min' },
  { name: 'Rosa H.', city: 'Charlotte · NC', action: 'descargó Curso DigiLegal', time: 'hace 18 min' },
  { name: 'José L.', city: 'Yonkers · NY', action: 'firmó contrato I-485', time: 'hace 24 min' },
  { name: 'Ester M.', city: 'Hartford · CT', action: 'compró Visa Juvenil I-360', time: 'hace 31 min' },
  { name: 'Diego V.', city: 'Houston · TX', action: 'reservó Consulta', time: 'hace 38 min' },
]

export function SalesTicker() {
  const sequence = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <section
      className="relative py-3 border-y overflow-hidden"
      style={{
        borderColor: 'var(--c-line-2)',
        background: 'var(--c-carbon-1)',
      }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 z-10 flex items-center pl-4 pr-5 border-r"
        style={{
          background: 'var(--c-carbon)',
          borderColor: 'var(--c-line-2)',
          boxShadow: '8px 0 16px -8px rgba(0,0,0,0.6)',
        }}
      >
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em]">
          <span className="l2-pulse" />
          <span style={{ color: 'var(--c-green)' }}>En vivo</span>
        </span>
      </div>

      <div
        className="l2-marquee items-center"
        style={{ ['--m-duration' as never]: '60s', paddingLeft: 130 }}
      >
        {sequence.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 flex-shrink-0 mr-10"
          >
            <span
              className="inline-flex items-center justify-center w-6 h-6 rounded-full font-mono text-[10px] font-bold flex-shrink-0"
              style={{
                background: 'var(--c-carbon-3)',
                color: 'var(--c-green)',
                border: '1px solid var(--c-line-2)',
              }}
            >
              {item.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </span>
            <span className="font-mono text-[11px] whitespace-nowrap">
              <span style={{ color: 'var(--c-fg)' }} className="font-medium">
                {item.name}
              </span>
              <span style={{ color: 'var(--c-fg-3)' }} className="mx-2">·</span>
              <span style={{ color: 'var(--c-fg-2)' }}>{item.action}</span>
              <span style={{ color: 'var(--c-fg-3)' }} className="mx-2">·</span>
              <span
                style={{ color: 'var(--c-fg-3)', fontSize: '10px' }}
                className="uppercase tracking-[0.12em]"
              >
                {item.city}
              </span>
              <span style={{ color: 'var(--c-fg-4)' }} className="mx-2">·</span>
              <span
                style={{ color: 'var(--c-green)', fontSize: '10px' }}
                className="uppercase tracking-[0.12em]"
              >
                {item.time}
              </span>
            </span>
          </span>
        ))}
      </div>
    </section>
  )
}
