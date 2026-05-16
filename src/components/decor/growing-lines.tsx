'use client'

import { useMemo } from 'react'

/**
 * "Hierba digital" — líneas verticales finas que crecen desde abajo
 * con stagger, cada una con un dot al final pulsando.
 *
 * Inspirado en "Growing Grass Effect" de Awwwards.
 * Cada línea es un "caso" creciendo desde su semilla.
 *
 * Mezcla los 4 colores Utah con prevalencia gold/white.
 */
export function GrowingLines({
  count = 56,
  className = '',
}: {
  count?: number
  className?: string
}) {
  const lines = useMemo(() => {
    // Seed determinístico para evitar hydration mismatch
    return Array.from({ length: count }, (_, i) => {
      const seed = (i * 9301 + 49297) % 233280
      const r = (n: number) => ((seed * n) % 1000) / 1000

      const xPercent = (i / count) * 100 + (r(3) - 0.5) * 1.5
      const heightVh = 12 + r(7) * 60  // 12–72vh
      const opacity = 0.12 + r(11) * 0.35
      const delay = r(13) * 1.5
      const swayDuration = 3.5 + r(17) * 4
      const swayAmount = 1 + r(19) * 3
      const tipDuration = 2.4 + r(23) * 2.5
      const tipDelay = r(29) * 3

      // Color mix: 60% gold, 25% white, 10% blue, 5% red
      const colorRoll = r(31)
      const color =
        colorRoll < 0.6 ? 'var(--color-gold)' :
        colorRoll < 0.85 ? '#ffffff' :
        colorRoll < 0.95 ? 'var(--color-blue)' :
        'var(--color-red)'

      return {
        i, xPercent, heightVh, opacity, delay,
        swayDuration, swayAmount, tipDuration, tipDelay, color,
      }
    })
  }, [count])

  return (
    <div aria-hidden className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {lines.map((l) => (
        <div
          key={l.i}
          className="absolute bottom-0 line-grow"
          style={{
            left: `${l.xPercent}%`,
            width: 1,
            height: `${l.heightVh}vh`,
            background: `linear-gradient(180deg, ${l.color} 0%, transparent 100%)`,
            ['--line-opacity' as string]: l.opacity,
            ['--line-delay' as string]: `${l.delay}s`,
            ['--sway-duration' as string]: `${l.swayDuration}s`,
            ['--sway-amount' as string]: `${l.swayAmount}px`,
            transformOrigin: 'bottom',
          }}
        >
          {/* Dot al tip de la línea */}
          <span
            className="line-tip absolute -top-1 -left-[2.5px] w-1.5 h-1.5 rounded-full"
            style={{
              background: l.color,
              boxShadow: `0 0 8px ${l.color}`,
              ['--tip-duration' as string]: `${l.tipDuration}s`,
              ['--tip-delay' as string]: `${l.tipDelay}s`,
            }}
          />
        </div>
      ))}
    </div>
  )
}
