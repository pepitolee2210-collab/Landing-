/**
 * Orbs de luz difuminada flotando lentamente.
 * Pasa una mezcla de colores para tener los 4 de Utah ambient.
 * Decorativo puro — pointer-events-none, aria-hidden.
 */

interface OrbConfig {
  color: 'gold' | 'blue' | 'red' | 'white'
  size: number
  x: string
  y: string
  delay?: number
  duration?: number
  opacity?: number
}

const COLOR_MAP = {
  gold: 'rgba(255, 184, 0, 0.5)',
  blue: 'rgba(91, 138, 255, 0.45)',
  red: 'rgba(230, 57, 70, 0.5)',
  white: 'rgba(255, 255, 255, 0.3)',
}

export function AmbientOrbs({ orbs }: { orbs: OrbConfig[] }) {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="absolute orb-drift rounded-full"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${COLOR_MAP[orb.color]} 0%, transparent 70%)`,
            opacity: orb.opacity ?? 1,
            filter: 'blur(8px)',
            ['--orb-duration' as string]: `${orb.duration ?? 18}s`,
            animationDelay: `${orb.delay ?? 0}s`,
          }}
        />
      ))}
    </div>
  )
}
