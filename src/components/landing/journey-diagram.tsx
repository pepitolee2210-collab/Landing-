'use client'

/**
 * Diagrama SVG animado del recorrido migratorio.
 * Tres "documentos" estilizados (Custodia → I-360 → Green Card)
 * conectados con líneas que se trazan al cargar. Vivo, no decorativo.
 */
export function JourneyDiagram() {
  return (
    <div className="relative w-full aspect-square max-w-[640px] mx-auto">
      {/* Frame del workspace */}
      <div
        className="absolute inset-0 rounded-2xl board-grid border border-[var(--color-line-2)]"
        style={{ background: 'var(--color-bg-2)' }}
      />

      {/* Header del workspace — fake terminal bar */}
      <div className="absolute top-0 left-0 right-0 px-4 h-9 flex items-center gap-2 border-b border-[var(--color-line)]">
        <span className="w-2 h-2 rounded-full bg-[var(--color-ember)]/60" />
        <span className="w-2 h-2 rounded-full bg-[var(--color-amber)]/60" />
        <span className="w-2 h-2 rounded-full bg-[var(--color-jade)]/60" />
        <span className="ml-3 font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-[0.15em]">
          tu_caso · visa_juvenil.sijs
        </span>
        <span className="ml-auto font-mono text-[10px] text-[var(--color-jade)] flex items-center gap-1.5">
          <span className="pulse-dot" />
          activo
        </span>
      </div>

      {/* Glow detrás */}
      <div
        aria-hidden
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] glow-gold opacity-50 pointer-events-none"
      />

      <svg
        viewBox="0 0 600 600"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {/* Definiciones */}
        <defs>
          <linearGradient id="docGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-elevated)" />
            <stop offset="100%" stopColor="var(--color-surface-2)" />
          </linearGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.2" />
            <stop offset="50%" stopColor="var(--color-gold)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0.2" />
          </linearGradient>
          <filter id="cyanGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* === Línea conectora principal: serpenteante === */}
        <path
          d="M 110 180 Q 220 130, 300 240 T 490 410"
          stroke="url(#lineGrad)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="4 4"
          className="path-draw"
          style={{ ['--path-length' as string]: '700', animationDelay: '300ms' }}
        />

        {/* === DOC 1 — Custodia === */}
        <g transform="translate(60, 130)">
          <rect
            width="110"
            height="140"
            rx="6"
            fill="url(#docGrad)"
            stroke="var(--color-line-strong)"
            strokeWidth="1"
          />
          {/* Borde de papel arriba */}
          <rect width="110" height="6" fill="var(--color-gold)" opacity="0.4" rx="6" />
          {/* Texto encabezado */}
          <text x="12" y="28" fill="var(--color-gold)" fontSize="7" fontFamily="var(--font-mono)" letterSpacing="2">
            01 · CUSTODIA
          </text>
          {/* Líneas de "texto" */}
          <rect x="12" y="44" width="86" height="3" fill="var(--color-text-3)" opacity="0.4" rx="1" />
          <rect x="12" y="54" width="70" height="3" fill="var(--color-text-3)" opacity="0.3" rx="1" />
          <rect x="12" y="64" width="78" height="3" fill="var(--color-text-3)" opacity="0.3" rx="1" />
          {/* Sello */}
          <circle cx="78" cy="106" r="14" stroke="var(--color-amber)" strokeWidth="1.2" fill="none" />
          <circle cx="78" cy="106" r="10" stroke="var(--color-amber)" strokeWidth="0.6" fill="none" />
          <text x="78" y="110" textAnchor="middle" fill="var(--color-amber)" fontSize="6" fontFamily="var(--font-mono)" fontWeight="700">
            UT
          </text>
        </g>

        {/* Check verde sobre doc 1 */}
        <g transform="translate(150, 110)">
          <circle r="14" fill="var(--color-jade)" />
          <path
            d="M -6 0 L -2 4 L 6 -4"
            stroke="var(--color-bg)"
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* === DOC 2 — I-360 (activo, navy eléctrico para variedad) === */}
        <g transform="translate(245, 200)">
          <rect
            width="110"
            height="140"
            rx="6"
            fill="url(#docGrad)"
            stroke="var(--color-navy)"
            strokeWidth="1.5"
            filter="url(#cyanGlow)"
          />
          <rect width="110" height="6" fill="var(--color-navy)" opacity="0.8" rx="6" />
          <text x="12" y="28" fill="var(--color-navy)" fontSize="7" fontFamily="var(--font-mono)" letterSpacing="2">
            02 · I-360
          </text>
          <text x="12" y="42" fill="var(--color-text-2)" fontSize="6" fontFamily="var(--font-mono)" opacity="0.7">
            USCIS
          </text>
          <rect x="12" y="54" width="86" height="3" fill="var(--color-text-3)" opacity="0.4" rx="1" />
          <rect x="12" y="64" width="60" height="3" fill="var(--color-text-3)" opacity="0.3" rx="1" />
          <rect x="12" y="74" width="78" height="3" fill="var(--color-text-3)" opacity="0.3" rx="1" />
          {/* Barra de progreso */}
          <rect x="12" y="92" width="86" height="4" rx="2" fill="var(--color-line)" />
          <rect x="12" y="92" width="55" height="4" rx="2" fill="var(--color-navy)" />
          <text x="12" y="108" fill="var(--color-navy)" fontSize="6" fontFamily="var(--font-mono)" opacity="0.9">
            EN PROCESO · 64%
          </text>
        </g>

        {/* === DOC 3 — Green Card === */}
        <g transform="translate(430, 340)" opacity="0.7">
          <rect
            width="120"
            height="76"
            rx="8"
            fill="var(--color-elevated)"
            stroke="var(--color-jade)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <text x="12" y="22" fill="var(--color-jade)" fontSize="7" fontFamily="var(--font-mono)" letterSpacing="2">
            03 · RESIDENCIA
          </text>
          <text x="12" y="36" fill="var(--color-text-2)" fontSize="5" fontFamily="var(--font-mono)" opacity="0.6">
            PERMANENT RESIDENT
          </text>
          <text x="12" y="58" fill="var(--color-text)" fontSize="14" fontFamily="var(--font-display)" fontWeight="600" letterSpacing="-0.5">
            ULP-2026
          </text>
          {/* "Foto" placeholder */}
          <rect x="86" y="46" width="22" height="22" rx="2" fill="var(--color-surface-2)" stroke="var(--color-line-2)" />
          <circle cx="97" cy="54" r="4" fill="var(--color-line-2)" />
          <path d="M 90 66 Q 97 60, 104 66 Z" fill="var(--color-line-2)" />
        </g>

        {/* === Floating tags === */}
        {/* Tag tiempo */}
        <g transform="translate(345, 110)" className="float-slow" style={{ ['--rot' as string]: '-2deg' }}>
          <rect width="100" height="32" rx="4" fill="#ffd556" />
          <text x="10" y="13" fill="#3a2a00" fontSize="7" fontFamily="var(--font-mono)" fontWeight="600">
            POST-IT
          </text>
          <text x="10" y="25" fill="#3a2a00" fontSize="9" fontFamily="var(--font-display)" fontWeight="600">
            18-36 meses
          </text>
        </g>

        {/* Tag costo */}
        <g transform="translate(60, 360)" className="float-slow" style={{ animationDelay: '1.5s', ['--rot' as string]: '3deg' }}>
          <rect width="120" height="36" rx="4" fill="var(--color-surface-2)" stroke="var(--color-gold)" strokeWidth="1" />
          <text x="10" y="13" fill="var(--color-gold)" fontSize="6" fontFamily="var(--font-mono)" letterSpacing="1.5">
            INVERSIÓN TOTAL
          </text>
          <text x="10" y="28" fill="var(--color-text)" fontSize="11" fontFamily="var(--font-display)" fontWeight="600">
            desde $2,500 USD
          </text>
        </g>

        {/* Punto pulsante en doc 2 (activo) - navy eléctrico */}
        <g transform="translate(300, 200)">
          <circle r="4" fill="var(--color-navy)">
            <animate
              attributeName="opacity"
              values="1;0.3;1"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="8" fill="none" stroke="var(--color-navy)" strokeWidth="1">
            <animate attributeName="r" values="4;14;4" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Marcadores decorativos de coordenadas */}
        <g opacity="0.5">
          <text x="20" y="60" fill="var(--color-text-4)" fontSize="6" fontFamily="var(--font-mono)" letterSpacing="1">
            X.001
          </text>
          <text x="540" y="60" fill="var(--color-text-4)" fontSize="6" fontFamily="var(--font-mono)" letterSpacing="1">
            X.999
          </text>
          <text x="20" y="555" fill="var(--color-text-4)" fontSize="6" fontFamily="var(--font-mono)" letterSpacing="1">
            Y.001
          </text>
        </g>
      </svg>

      {/* Status pills flotantes — HTML para mejor interactividad */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end gap-3 text-[10px] font-mono">
        <span className="tag tag-amber">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
            <circle cx="5" cy="5" r="2" />
          </svg>
          12 docs cargados
        </span>
        <span className="tag tag-navy">
          <span className="pulse-dot" style={{ background: 'var(--color-navy)' }} />
          USCIS sincronizado
        </span>
      </div>
    </div>
  )
}
