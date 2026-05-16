'use client'

import { useMemo } from 'react'

/**
 * Partículas minúsculas que suben lentamente.
 * Componente cliente para usar Math.random determinístico al primer mount.
 * Mezcla los 4 colores Utah para tener un campo de "estrellas" patriótico.
 */
export function Particles({ count = 40 }: { count?: number }) {
  const particles = useMemo(() => {
    // Seed pseudo-determinístico vía índice (no random real para evitar hydration mismatch)
    const colors = ['var(--color-gold)', 'var(--color-blue-bright)', 'var(--color-red)', '#fff']
    return Array.from({ length: count }, (_, i) => {
      const seed = (i * 9301 + 49297) % 233280
      const left = (seed / 233280) * 100
      const size = 1.5 + ((seed * 7) % 100) / 50
      const duration = 12 + ((seed * 13) % 100) / 10
      const delay = ((seed * 17) % 200) / 10
      const opacity = 0.4 + ((seed * 19) % 60) / 100
      const drift = -30 + ((seed * 23) % 60)
      const color = colors[i % 4]
      return { left, size, duration, delay, opacity, drift, color, i }
    })
  }, [count])

  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.i}
          className="particle-rise absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: '-2vh',
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            ['--particle-duration' as string]: `${p.duration}s`,
            ['--particle-delay' as string]: `${p.delay}s`,
            ['--particle-drift' as string]: `${p.drift}px`,
            ['--particle-opacity' as string]: p.opacity,
          }}
        />
      ))}
    </div>
  )
}
