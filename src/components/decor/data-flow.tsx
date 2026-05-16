/**
 * Patrón SVG decorativo de líneas con dots que viajan por ellas.
 * Estilo "circuit board" o "data stream" tech.
 * Diseñado para vivir en backgrounds, opacity baja.
 */
export function DataFlow() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 800"
    >
      <defs>
        {/* Gradiente para los path stroke */}
        <linearGradient id="flowGold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--color-gold)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="flowRed" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-red)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--color-red)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--color-red)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="flowBlue" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-blue-bright)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--color-blue-bright)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--color-blue-bright)" stopOpacity="0" />
        </linearGradient>

        {/* Definimos los paths para offset-path animation */}
        <path id="flowPath1" d="M 0 200 L 400 200 L 500 100 L 800 100 L 1200 100" fill="none" />
        <path id="flowPath2" d="M 0 600 L 300 600 L 400 700 L 700 700 L 900 600 L 1200 600" fill="none" />
        <path id="flowPath3" d="M 1200 400 L 800 400 L 700 300 L 400 300 L 0 400" fill="none" />
      </defs>

      {/* Paths visibles */}
      <use href="#flowPath1" stroke="url(#flowGold)" strokeWidth="1.5" strokeDasharray="4 8" />
      <use href="#flowPath2" stroke="url(#flowRed)" strokeWidth="1.5" strokeDasharray="4 8" />
      <use href="#flowPath3" stroke="url(#flowBlue)" strokeWidth="1.5" strokeDasharray="4 8" />

      {/* Dots conectores en las uniones */}
      <circle cx="400" cy="200" r="3" fill="var(--color-gold)">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="500" cy="100" r="3" fill="var(--color-gold)">
        <animate attributeName="opacity" values="1;0.4;1" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="800" cy="100" r="3" fill="var(--color-gold)">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" />
      </circle>

      <circle cx="400" cy="700" r="3" fill="var(--color-red)">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="3.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="700" cy="700" r="3" fill="var(--color-red)">
        <animate attributeName="opacity" values="1;0.4;1" dur="2.8s" repeatCount="indefinite" />
      </circle>

      <circle cx="700" cy="300" r="3" fill="var(--color-blue-bright)">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="400" cy="300" r="3" fill="var(--color-blue-bright)">
        <animate attributeName="opacity" values="1;0.4;1" dur="3.2s" repeatCount="indefinite" />
      </circle>

      {/* Dots viajando — usamos animateMotion */}
      <circle r="4" fill="var(--color-gold)">
        <animateMotion dur="8s" repeatCount="indefinite">
          <mpath href="#flowPath1" />
        </animateMotion>
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="8s" repeatCount="indefinite" />
      </circle>
      <circle r="3.5" fill="var(--color-red)">
        <animateMotion dur="10s" repeatCount="indefinite">
          <mpath href="#flowPath2" />
        </animateMotion>
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="10s" repeatCount="indefinite" />
      </circle>
      <circle r="3.5" fill="var(--color-blue-bright)">
        <animateMotion dur="9s" repeatCount="indefinite">
          <mpath href="#flowPath3" />
        </animateMotion>
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="9s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}
