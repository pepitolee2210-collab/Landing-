/**
 * Cards SVG de documentos migratorios para la choreografía del hero.
 * Cada una es un documento estilizado distintivo, 220×280px aspect.
 */

export interface MigratoryCardData {
  id: string
  title: string
  code: string
  category: 'gold' | 'blue' | 'red' | 'jade' | 'white'
  variant: 'custodia' | 'i360' | 'i485' | 'asilo' | 'visa' | 'ajuste' | 'portal'
}

export const MIGRATORY_CARDS: MigratoryCardData[] = [
  { id: 'c1', title: 'Custodia',     code: 'STATE COURT',   category: 'gold',  variant: 'custodia' },
  { id: 'c2', title: 'I-360',        code: 'USCIS · SIJS',  category: 'blue',  variant: 'i360' },
  { id: 'c3', title: 'I-485',        code: 'AOS · USCIS',   category: 'jade',  variant: 'i485' },
  { id: 'c4', title: 'Asilo',        code: 'I-589 · USCIS', category: 'red',   variant: 'asilo' },
  { id: 'c5', title: 'Visa Juvenil', code: 'SIJS',          category: 'gold',  variant: 'visa' },
  { id: 'c6', title: 'Ajuste',       code: 'I-485 · STATUS',category: 'jade',  variant: 'ajuste' },
  { id: 'c7', title: 'Portal',       code: 'CLIENTE · 24/7',category: 'white', variant: 'portal' },
]

const COLOR_MAP = {
  gold: 'var(--color-gold)',
  blue: 'var(--color-blue)',
  red: 'var(--color-red)',
  jade: 'var(--color-jade)',
  white: '#ffffff',
}

export function MigratoryCard({ data }: { data: MigratoryCardData }) {
  const color = COLOR_MAP[data.category]
  const accentBg = {
    gold: 'rgba(242, 178, 52, 0.08)',
    blue: 'rgba(76, 127, 211, 0.10)',
    red: 'rgba(200, 51, 74, 0.10)',
    jade: 'rgba(52, 211, 153, 0.10)',
    white: 'rgba(255, 255, 255, 0.06)',
  }[data.category]

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-2xl"
      style={{
        background:
          'linear-gradient(140deg, var(--color-surface-2) 0%, var(--color-bg-2) 100%)',
        border: `1px solid ${color}40`,
        boxShadow: `0 24px 60px -20px rgba(0,0,0,0.7), 0 0 0 0 ${color}`,
      }}
    >
      {/* Grid blueprint sutil interno */}
      <div aria-hidden className="absolute inset-0 board-grid opacity-30 pointer-events-none" />

      {/* Glow color de la categoría top-right */}
      <div
        aria-hidden
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          opacity: 0.25,
          filter: 'blur(12px)',
        }}
      />

      <div className="relative h-full p-5 flex flex-col">
        {/* Top — code + dot */}
        <div className="flex items-center justify-between mb-4">
          <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[var(--color-text-3)]">
            {data.code}
          </p>
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: color, boxShadow: `0 0 6px ${color}` }}
          />
        </div>

        {/* SVG ilustración central — distinto por variant */}
        <div className="flex-1 flex items-center justify-center my-2">
          <CardIllustration variant={data.variant} color={color} />
        </div>

        {/* Title */}
        <div className="mt-auto">
          <h4
            className="font-display text-[var(--color-text)] leading-none"
            style={{
              fontSize: 'clamp(1rem, 1.3vw, 1.25rem)',
              fontWeight: 500,
              letterSpacing: '-0.025em',
            }}
          >
            {data.title}
          </h4>
          <p
            className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.18em]"
            style={{ color }}
          >
            Documento legal
          </p>
        </div>

        {/* Cinta inferior con accent color */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />
      </div>

      {/* Accent corner */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-12 h-12 pointer-events-none"
        style={{ background: accentBg }}
      />
    </div>
  )
}

function CardIllustration({ variant, color }: { variant: string; color: string }) {
  if (variant === 'custodia') {
    return (
      <svg width="100" height="80" viewBox="0 0 100 80" fill="none" aria-hidden>
        {/* Folio con marca */}
        <rect x="10" y="6" width="80" height="68" rx="3" stroke={color} strokeWidth="1.4" fill="none" />
        <line x1="20" y1="22" x2="60" y2="22" stroke={color} strokeWidth="1" opacity="0.7" />
        <line x1="20" y1="32" x2="80" y2="32" stroke={color} strokeWidth="1" opacity="0.5" />
        <line x1="20" y1="42" x2="70" y2="42" stroke={color} strokeWidth="1" opacity="0.5" />
        {/* Sello */}
        <circle cx="78" cy="58" r="10" stroke={color} strokeWidth="1.2" fill="none" />
        <circle cx="78" cy="58" r="6" stroke={color} strokeWidth="0.6" fill="none" />
        <text x="78" y="61" textAnchor="middle" fill={color} fontSize="5" fontFamily="var(--font-mono)" fontWeight="700">UT</text>
      </svg>
    )
  }
  if (variant === 'i360') {
    // Determinístico — sin Math.random, evita hydration mismatch
    const rows = [
      { y: 24, len: 68 },
      { y: 34, len: 54 },
      { y: 44, len: 60 },
      { y: 54, len: 72 },
      { y: 64, len: 50 },
    ]
    return (
      <svg width="100" height="80" viewBox="0 0 100 80" fill="none" aria-hidden>
        <rect x="14" y="4" width="72" height="72" rx="2" stroke={color} strokeWidth="1.4" fill="none" />
        <rect x="14" y="4" width="72" height="14" fill={color} fillOpacity="0.2" />
        <text x="50" y="14" textAnchor="middle" fill={color} fontSize="7" fontFamily="var(--font-mono)" fontWeight="700">I-360</text>
        {rows.map((r) => (
          <g key={r.y}>
            <rect x="20" y={r.y} width="6" height="6" stroke={color} strokeWidth="0.8" fill="none" />
            <line x1="30" y1={r.y + 3} x2={30 + r.len * 0.5} y2={r.y + 3} stroke={color} strokeWidth="0.8" opacity="0.5" />
          </g>
        ))}
      </svg>
    )
  }
  if (variant === 'i485' || variant === 'ajuste') {
    return (
      <svg width="100" height="80" viewBox="0 0 100 80" fill="none" aria-hidden>
        {/* Green Card ID */}
        <rect x="6" y="14" width="88" height="56" rx="6" stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.05" />
        <rect x="6" y="14" width="88" height="8" fill={color} fillOpacity="0.3" rx="6" />
        <text x="14" y="20" fill={color} fontSize="5" fontFamily="var(--font-mono)" fontWeight="700">PERMANENT RESIDENT</text>
        {/* Foto */}
        <rect x="14" y="32" width="22" height="28" rx="1" stroke={color} strokeWidth="0.8" fill="none" />
        <circle cx="25" cy="42" r="4" fill={color} opacity="0.4" />
        <path d="M 17 56 Q 25 50 33 56" stroke={color} strokeWidth="0.8" fill="none" opacity="0.4" />
        {/* Datos */}
        <line x1="42" y1="36" x2="82" y2="36" stroke={color} strokeWidth="0.8" opacity="0.5" />
        <line x1="42" y1="44" x2="76" y2="44" stroke={color} strokeWidth="0.8" opacity="0.5" />
        <line x1="42" y1="52" x2="84" y2="52" stroke={color} strokeWidth="0.8" opacity="0.5" />
      </svg>
    )
  }
  if (variant === 'asilo') {
    return (
      <svg width="100" height="80" viewBox="0 0 100 80" fill="none" aria-hidden>
        {/* Escudo de protección + I-589 */}
        <path d="M 50 6 L 80 18 V 42 Q 80 60 50 74 Q 20 60 20 42 V 18 Z" stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.06" />
        <text x="50" y="32" textAnchor="middle" fill={color} fontSize="6" fontFamily="var(--font-mono)" fontWeight="700">I-589</text>
        <line x1="36" y1="40" x2="64" y2="40" stroke={color} strokeWidth="0.8" opacity="0.6" />
        <line x1="36" y1="48" x2="60" y2="48" stroke={color} strokeWidth="0.8" opacity="0.5" />
        <line x1="36" y1="56" x2="58" y2="56" stroke={color} strokeWidth="0.8" opacity="0.5" />
      </svg>
    )
  }
  if (variant === 'visa') {
    return (
      <svg width="100" height="80" viewBox="0 0 100 80" fill="none" aria-hidden>
        {/* Pasaporte abierto */}
        <rect x="10" y="14" width="34" height="52" rx="2" stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.06" />
        <rect x="44" y="14" width="46" height="52" rx="2" stroke={color} strokeWidth="1.4" fill="none" />
        <line x1="44" y1="14" x2="44" y2="66" stroke={color} strokeWidth="0.6" opacity="0.5" />
        {/* Águila izq */}
        <circle cx="27" cy="35" r="6" stroke={color} strokeWidth="1" fill="none" />
        <path d="M 21 35 Q 27 30 33 35" stroke={color} strokeWidth="0.8" fill="none" />
        <text x="27" y="52" textAnchor="middle" fill={color} fontSize="5" fontFamily="var(--font-mono)" fontWeight="700">SIJS</text>
        {/* Datos derecha */}
        <line x1="50" y1="26" x2="84" y2="26" stroke={color} strokeWidth="0.8" opacity="0.6" />
        <line x1="50" y1="34" x2="80" y2="34" stroke={color} strokeWidth="0.8" opacity="0.5" />
        <line x1="50" y1="42" x2="82" y2="42" stroke={color} strokeWidth="0.8" opacity="0.5" />
        <line x1="50" y1="50" x2="76" y2="50" stroke={color} strokeWidth="0.8" opacity="0.4" />
      </svg>
    )
  }
  // portal (cliente — pantalla móvil)
  return (
    <svg width="60" height="80" viewBox="0 0 60 80" fill="none" aria-hidden>
      <rect x="6" y="4" width="48" height="72" rx="6" stroke={color} strokeWidth="1.4" fill="none" />
      <rect x="22" y="8" width="16" height="3" rx="1.5" fill={color} opacity="0.4" />
      {/* Pantalla mock */}
      <rect x="12" y="18" width="36" height="14" rx="2" fill={color} fillOpacity="0.1" />
      <text x="14" y="25" fill={color} fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.5">TU CASO</text>
      <rect x="14" y="27" width="22" height="2" rx="1" fill={color} />
      <line x1="12" y1="40" x2="48" y2="40" stroke={color} strokeWidth="0.6" opacity="0.5" strokeDasharray="2 2" />
      <rect x="12" y="44" width="36" height="6" rx="1" stroke={color} strokeWidth="0.6" fill="none" opacity="0.6" />
      <rect x="12" y="54" width="36" height="6" rx="1" stroke={color} strokeWidth="0.6" fill="none" opacity="0.6" />
      <rect x="12" y="64" width="36" height="6" rx="1" stroke={color} strokeWidth="0.6" fill="none" opacity="0.6" />
    </svg>
  )
}
