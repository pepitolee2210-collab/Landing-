/**
 * Formas geométricas SVG flotando y rotando — hexágonos, triángulos.
 * Combina los 4 colores de Utah con rotación y blur.
 */
export function FloatingShapes() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Hexágono dorado giratorio */}
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        className="absolute spin-slow"
        style={{
          top: '12%',
          right: '8%',
          opacity: 0.18,
          filter: 'drop-shadow(0 0 20px var(--color-gold))',
        }}
      >
        <polygon
          points="60,8 108,32 108,88 60,112 12,88 12,32"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="1"
        />
        <polygon
          points="60,28 90,44 90,76 60,92 30,76 30,44"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="0.6"
          strokeOpacity="0.6"
        />
      </svg>

      {/* Triángulo rojo */}
      <svg
        width="90"
        height="80"
        viewBox="0 0 90 80"
        className="absolute spin-slow-reverse"
        style={{
          bottom: '18%',
          left: '6%',
          opacity: 0.22,
          filter: 'drop-shadow(0 0 16px var(--color-red))',
        }}
      >
        <polygon
          points="45,6 84,72 6,72"
          fill="none"
          stroke="var(--color-red)"
          strokeWidth="1.2"
        />
        <circle cx="45" cy="46" r="3" fill="var(--color-red)" />
      </svg>

      {/* Círculo azul punteado */}
      <svg
        width="160"
        height="160"
        viewBox="0 0 160 160"
        className="absolute spin-slow"
        style={{
          top: '55%',
          right: '14%',
          opacity: 0.15,
          filter: 'drop-shadow(0 0 18px var(--color-blue-bright))',
          animationDuration: '40s',
        }}
      >
        <circle
          cx="80"
          cy="80"
          r="72"
          fill="none"
          stroke="var(--color-blue-bright)"
          strokeWidth="1"
          strokeDasharray="3 8"
        />
        <circle
          cx="80"
          cy="80"
          r="52"
          fill="none"
          stroke="var(--color-blue-bright)"
          strokeWidth="0.8"
          strokeDasharray="2 5"
        />
        <circle cx="80" cy="8" r="3" fill="var(--color-blue-bright)" />
      </svg>

      {/* Punto blanco pequeño que pulsa */}
      <div
        className="absolute rounded-full"
        style={{
          top: '30%',
          left: '70%',
          width: 4,
          height: 4,
          background: '#fff',
          boxShadow: '0 0 12px #fff, 0 0 24px rgba(255,255,255,0.4)',
          animation: 'neon-pulse 4s infinite',
        }}
      />
    </div>
  )
}
