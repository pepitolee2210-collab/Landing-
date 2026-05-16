/**
 * Circuit Board / PCB — trazos rectos de placa electrónica con
 * vias, chips, pads y pulsos de luz viajando por las líneas.
 *
 * Inspirado en el ADN de un chip: geometría 90°, profesional, tech.
 * Animación de stroke-draw al cargar + pulsos infinitos (animateMotion).
 *
 * Centro reservado para el contenido principal del hero (mask radial).
 */
export function CircuitPCB({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1600 900"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Gradiente para los stroke principales */}
        <linearGradient id="traceGold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--color-gold)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="traceBlue" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-blue)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--color-blue)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--color-blue)" stopOpacity="0.15" />
        </linearGradient>

        {/* Paths nombrados para reutilizar con animateMotion */}
        <path id="pcbT1" d="M 50 200 L 280 200 L 280 130 L 460 130 L 460 240 L 620 240" fill="none" />
        <path id="pcbT2" d="M 80 380 L 220 380 L 220 460 L 380 460 L 380 540 L 540 540" fill="none" />
        <path id="pcbT3" d="M 60 680 L 240 680 L 240 760 L 420 760 L 420 700 L 600 700" fill="none" />

        <path id="pcbT4" d="M 1550 220 L 1300 220 L 1300 320 L 1100 320 L 1100 180 L 980 180" fill="none" />
        <path id="pcbT5" d="M 1560 480 L 1380 480 L 1380 580 L 1180 580 L 1180 660 L 1020 660" fill="none" />
        <path id="pcbT6" d="M 1540 730 L 1380 730 L 1380 820 L 1180 820" fill="none" />

        {/* Bottom-top vertical */}
        <path id="pcbV1" d="M 800 880 L 800 720 L 760 720 L 760 580" fill="none" />
        <path id="pcbV2" d="M 880 880 L 880 760 L 920 760 L 920 600" fill="none" />

        {/* Glow filter para nodes */}
        <filter id="pcbGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feComposite in="SourceGraphic" in2="b" operator="over" />
        </filter>
      </defs>

      {/* === LADO IZQUIERDO === */}
      <g strokeWidth="1.2" fill="none">
        <use href="#pcbT1" stroke="url(#traceGold)" strokeDasharray="800" strokeDashoffset="800">
          <animate attributeName="stroke-dashoffset" from="800" to="0" dur="2.4s" begin="0.2s" fill="freeze" />
        </use>
        <use href="#pcbT2" stroke="url(#traceBlue)" strokeDasharray="800" strokeDashoffset="800">
          <animate attributeName="stroke-dashoffset" from="800" to="0" dur="2.4s" begin="0.5s" fill="freeze" />
        </use>
        <use href="#pcbT3" stroke="url(#traceGold)" strokeDasharray="800" strokeDashoffset="800">
          <animate attributeName="stroke-dashoffset" from="800" to="0" dur="2.4s" begin="0.8s" fill="freeze" />
        </use>
      </g>

      {/* === LADO DERECHO === */}
      <g strokeWidth="1.2" fill="none">
        <use href="#pcbT4" stroke="url(#traceBlue)" strokeDasharray="700" strokeDashoffset="700">
          <animate attributeName="stroke-dashoffset" from="700" to="0" dur="2.2s" begin="0.3s" fill="freeze" />
        </use>
        <use href="#pcbT5" stroke="url(#traceGold)" strokeDasharray="700" strokeDashoffset="700">
          <animate attributeName="stroke-dashoffset" from="700" to="0" dur="2.2s" begin="0.6s" fill="freeze" />
        </use>
        <use href="#pcbT6" stroke="url(#traceBlue)" strokeDasharray="700" strokeDashoffset="700">
          <animate attributeName="stroke-dashoffset" from="700" to="0" dur="2.2s" begin="0.9s" fill="freeze" />
        </use>
      </g>

      {/* === VERTICALES (bottom) === */}
      <g strokeWidth="1.2" fill="none">
        <use href="#pcbV1" stroke="url(#traceGold)" strokeDasharray="500" strokeDashoffset="500">
          <animate attributeName="stroke-dashoffset" from="500" to="0" dur="2s" begin="1.1s" fill="freeze" />
        </use>
        <use href="#pcbV2" stroke="url(#traceBlue)" strokeDasharray="500" strokeDashoffset="500">
          <animate attributeName="stroke-dashoffset" from="500" to="0" dur="2s" begin="1.3s" fill="freeze" />
        </use>
      </g>

      {/* === VIAS (junction circles) === */}
      <g fill="var(--color-gold)" opacity="0.7">
        {/* Izquierda */}
        <circle cx="280" cy="200" r="2.5" />
        <circle cx="280" cy="130" r="2.5" />
        <circle cx="460" cy="130" r="2.5" />
        <circle cx="460" cy="240" r="2.5" />
        <circle cx="220" cy="380" r="2.5" />
        <circle cx="220" cy="460" r="2.5" />
        <circle cx="380" cy="460" r="2.5" />
        <circle cx="380" cy="540" r="2.5" />
        <circle cx="240" cy="680" r="2.5" />
        <circle cx="240" cy="760" r="2.5" />
        <circle cx="420" cy="760" r="2.5" />
        <circle cx="420" cy="700" r="2.5" />
        {/* Derecha */}
        <circle cx="1300" cy="220" r="2.5" />
        <circle cx="1300" cy="320" r="2.5" />
        <circle cx="1100" cy="320" r="2.5" />
        <circle cx="1100" cy="180" r="2.5" />
        <circle cx="1380" cy="480" r="2.5" />
        <circle cx="1380" cy="580" r="2.5" />
        <circle cx="1180" cy="580" r="2.5" />
        <circle cx="1180" cy="660" r="2.5" />
        <circle cx="1380" cy="730" r="2.5" />
        <circle cx="1380" cy="820" r="2.5" />
      </g>

      {/* === PADS rectangulares — endpoints "conectores" === */}
      <g fill="none" stroke="var(--color-gold)" strokeWidth="1" opacity="0.6">
        <rect x="46" y="196" width="8" height="8" />
        <rect x="76" y="376" width="8" height="8" />
        <rect x="56" y="676" width="8" height="8" />
        <rect x="1546" y="216" width="8" height="8" />
        <rect x="1556" y="476" width="8" height="8" />
        <rect x="1536" y="726" width="8" height="8" />
      </g>

      {/* === CHIPS (rectángulos con pines) — los "componentes" de la PCB === */}
      <g>
        {/* Chip izquierda */}
        <g transform="translate(615, 225)">
          <rect width="40" height="30" fill="var(--color-bg-2)" stroke="var(--color-gold)" strokeWidth="1" opacity="0.8" />
          <line x1="0" y1="8" x2="-4" y2="8" stroke="var(--color-gold)" strokeWidth="1" />
          <line x1="0" y1="16" x2="-4" y2="16" stroke="var(--color-gold)" strokeWidth="1" />
          <line x1="0" y1="24" x2="-4" y2="24" stroke="var(--color-gold)" strokeWidth="1" />
          <line x1="40" y1="8" x2="44" y2="8" stroke="var(--color-gold)" strokeWidth="1" />
          <line x1="40" y1="16" x2="44" y2="16" stroke="var(--color-gold)" strokeWidth="1" />
          <line x1="40" y1="24" x2="44" y2="24" stroke="var(--color-gold)" strokeWidth="1" />
          <circle cx="6" cy="6" r="1.2" fill="var(--color-gold)" />
        </g>

        {/* Chip derecha */}
        <g transform="translate(940, 165)">
          <rect width="40" height="30" fill="var(--color-bg-2)" stroke="var(--color-blue)" strokeWidth="1" opacity="0.8" />
          <line x1="0" y1="8" x2="-4" y2="8" stroke="var(--color-blue)" strokeWidth="1" />
          <line x1="0" y1="16" x2="-4" y2="16" stroke="var(--color-blue)" strokeWidth="1" />
          <line x1="0" y1="24" x2="-4" y2="24" stroke="var(--color-blue)" strokeWidth="1" />
          <line x1="40" y1="8" x2="44" y2="8" stroke="var(--color-blue)" strokeWidth="1" />
          <line x1="40" y1="16" x2="44" y2="16" stroke="var(--color-blue)" strokeWidth="1" />
          <line x1="40" y1="24" x2="44" y2="24" stroke="var(--color-blue)" strokeWidth="1" />
          <circle cx="6" cy="6" r="1.2" fill="var(--color-blue)" />
        </g>

        {/* Chip bottom-left */}
        <g transform="translate(535, 525)">
          <rect width="46" height="28" fill="var(--color-bg-2)" stroke="var(--color-blue)" strokeWidth="1" opacity="0.8" />
          <circle cx="6" cy="6" r="1.2" fill="var(--color-blue)" />
        </g>

        {/* Chip bottom-right */}
        <g transform="translate(980, 640)">
          <rect width="44" height="32" fill="var(--color-bg-2)" stroke="var(--color-gold)" strokeWidth="1" opacity="0.8" />
          <circle cx="6" cy="6" r="1.2" fill="var(--color-gold)" />
        </g>
      </g>

      {/* === PULSOS DE LUZ viajando por los traces === */}
      <circle r="3" fill="var(--color-gold)" filter="url(#pcbGlow)">
        <animateMotion dur="5s" repeatCount="indefinite" begin="2.5s">
          <mpath href="#pcbT1" />
        </animateMotion>
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="5s" repeatCount="indefinite" begin="2.5s" />
      </circle>

      <circle r="3" fill="var(--color-blue)" filter="url(#pcbGlow)">
        <animateMotion dur="6s" repeatCount="indefinite" begin="3s">
          <mpath href="#pcbT2" />
        </animateMotion>
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="6s" repeatCount="indefinite" begin="3s" />
      </circle>

      <circle r="3" fill="var(--color-gold)" filter="url(#pcbGlow)">
        <animateMotion dur="5.5s" repeatCount="indefinite" begin="3.5s">
          <mpath href="#pcbT3" />
        </animateMotion>
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="5.5s" repeatCount="indefinite" begin="3.5s" />
      </circle>

      <circle r="3" fill="var(--color-blue)" filter="url(#pcbGlow)">
        <animateMotion dur="5s" repeatCount="indefinite" begin="2.8s">
          <mpath href="#pcbT4" />
        </animateMotion>
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="5s" repeatCount="indefinite" begin="2.8s" />
      </circle>

      <circle r="3" fill="var(--color-gold)" filter="url(#pcbGlow)">
        <animateMotion dur="6s" repeatCount="indefinite" begin="3.2s">
          <mpath href="#pcbT5" />
        </animateMotion>
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="6s" repeatCount="indefinite" begin="3.2s" />
      </circle>

      <circle r="2.5" fill="var(--color-gold)" filter="url(#pcbGlow)">
        <animateMotion dur="4s" repeatCount="indefinite" begin="4s">
          <mpath href="#pcbV1" />
        </animateMotion>
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="4s" repeatCount="indefinite" begin="4s" />
      </circle>
    </svg>
  )
}
