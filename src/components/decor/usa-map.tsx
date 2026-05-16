/**
 * Mapa de Estados Unidos animado con dots de ciudades clave
 * y líneas que se conectan en loop.
 *
 * Awwwards-level: SVG limpio, paths data-viz, todo animado
 * con SMIL para que respire vivo sin JS.
 *
 * Ciudades elegidas: las de mayor concentración latina + Utah
 * (sede del bufete) marcada con énfasis dorado.
 */
export function USAMap({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1000 600"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="cityGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="connectionGold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--color-gold)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="connectionBlue" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-blue)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--color-blue)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--color-blue)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* === Outline simplificado USA (no es geográficamente perfecto,
             es una abstracción artística estilo data-viz) === */}
      <path
        d="M 145 295
           L 175 245
           L 210 220
           L 260 195
           L 320 170
           L 410 155
           L 510 145
           L 600 140
           L 695 145
           L 780 155
           L 850 175
           L 880 210
           L 895 250
           L 890 295
           L 875 335
           L 855 375
           L 820 405
           L 765 425
           L 705 445
           L 645 465
           L 575 470
           L 505 465
           L 445 460
           L 395 455
           L 350 445
           L 305 430
           L 270 415
           L 235 390
           L 200 360
           L 175 330
           L 155 310
           Z"
        fill="none"
        stroke="rgba(255, 255, 255, 0.18)"
        strokeWidth="1.2"
        strokeDasharray="3 4"
      />

      {/* === Líneas internas que sugieren divisiones de estados === */}
      <g stroke="rgba(255, 255, 255, 0.06)" strokeWidth="0.6" fill="none">
        <path d="M 300 180 L 320 440" />
        <path d="M 450 150 L 470 460" />
        <path d="M 600 145 L 620 465" />
        <path d="M 750 160 L 760 440" />
        <path d="M 180 280 L 880 280" />
        <path d="M 200 360 L 870 360" />
      </g>

      {/* === Líneas de conexión animadas (data flow) === */}
      <g fill="none" strokeWidth="1">
        {/* Salt Lake City → New York */}
        <line
          x1="320"
          y1="245"
          x2="820"
          y2="200"
          stroke="url(#connectionGold)"
          strokeDasharray="120 480"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="600"
            to="-600"
            dur="11s"
            repeatCount="indefinite"
          />
        </line>

        {/* Salt Lake City → Houston */}
        <line
          x1="320"
          y1="245"
          x2="580"
          y2="430"
          stroke="url(#connectionBlue)"
          strokeDasharray="100 400"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="500"
            to="-500"
            dur="9s"
            begin="2s"
            repeatCount="indefinite"
          />
        </line>

        {/* Salt Lake City → Los Angeles */}
        <line
          x1="320"
          y1="245"
          x2="220"
          y2="370"
          stroke="url(#connectionGold)"
          strokeDasharray="80 320"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="400"
            to="-400"
            dur="8s"
            begin="4s"
            repeatCount="indefinite"
          />
        </line>

        {/* Salt Lake City → Miami */}
        <line
          x1="320"
          y1="245"
          x2="800"
          y2="450"
          stroke="url(#connectionBlue)"
          strokeDasharray="140 560"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="700"
            to="-700"
            dur="13s"
            begin="1s"
            repeatCount="indefinite"
          />
        </line>

        {/* Salt Lake City → Chicago */}
        <line
          x1="320"
          y1="245"
          x2="620"
          y2="240"
          stroke="url(#connectionGold)"
          strokeDasharray="100 400"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="500"
            to="-500"
            dur="10s"
            begin="3s"
            repeatCount="indefinite"
          />
        </line>
      </g>

      {/* === Ciudades latinas clave === */}
      {[
        { name: 'LA', x: 220, y: 370, color: 'blue' },
        { name: 'Phoenix', x: 290, y: 380, color: 'blue' },
        { name: 'Houston', x: 580, y: 430, color: 'blue' },
        { name: 'Dallas', x: 555, y: 380, color: 'blue' },
        { name: 'Miami', x: 800, y: 450, color: 'blue' },
        { name: 'NYC', x: 820, y: 200, color: 'blue' },
        { name: 'Chicago', x: 620, y: 240, color: 'blue' },
        { name: 'Newark', x: 815, y: 215, color: 'blue' },
        { name: 'Charlotte', x: 745, y: 320, color: 'blue' },
        { name: 'Atlanta', x: 720, y: 360, color: 'blue' },
        { name: 'Denver', x: 410, y: 280, color: 'blue' },
      ].map((c, i) => (
        <g key={c.name}>
          <circle
            cx={c.x}
            cy={c.y}
            r="2.5"
            fill="var(--color-blue)"
            opacity="0.7"
          >
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur={`${3 + (i % 3)}s`}
              repeatCount="indefinite"
              begin={`${i * 0.3}s`}
            />
          </circle>
        </g>
      ))}

      {/* === Salt Lake City — sede del bufete, énfasis dorado === */}
      <g transform="translate(320, 245)">
        {/* Pulso exterior */}
        <circle r="6" fill="var(--color-gold)" opacity="0.3">
          <animate attributeName="r" values="6;20;6" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* Punto principal */}
        <circle r="4" fill="var(--color-gold)" filter="url(#cityGlow)" />
        {/* Label */}
        <g transform="translate(10, -8)">
          <line x1="0" y1="0" x2="10" y2="-10" stroke="var(--color-gold)" strokeWidth="0.6" />
          <text
            x="14"
            y="-12"
            fill="var(--color-gold)"
            fontSize="9"
            fontFamily="var(--font-mono)"
            letterSpacing="1.5"
          >
            UTAH · HQ
          </text>
        </g>
      </g>

      {/* === Marcador rojo discreto para "Casos activos" === */}
      <g transform="translate(820, 200)">
        <circle r="3" fill="var(--color-red)" opacity="0.8" />
        <text
          x="8"
          y="3"
          fill="var(--color-red)"
          fontSize="7"
          fontFamily="var(--font-mono)"
          letterSpacing="1"
          opacity="0.7"
        >
          NYC
        </text>
      </g>

      {/* === Coordenadas decorativas tipo data-viz === */}
      <g opacity="0.35" fill="var(--color-text-4)" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1.5">
        <text x="20" y="40">LAT 39°N</text>
        <text x="20" y="55">LON -105°W</text>
        <text x="900" y="580" textAnchor="end">9 COUNTRIES · 11 CITIES</text>
      </g>
    </svg>
  )
}
