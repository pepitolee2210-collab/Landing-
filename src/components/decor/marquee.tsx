/**
 * Marquee horizontal sutil. Una sola franja con texto pasando.
 * Awwwards-style: tipografía grande, lenta, repetida, color discreto.
 */
export function Marquee({
  items,
  duration = 60,
  className = '',
}: {
  items: string[]
  duration?: number
  className?: string
}) {
  // Duplicamos para loop continuo sin saltos
  const sequence = [...items, ...items]
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden>
      <div
        className="marquee items-center gap-12"
        style={{ ['--marquee-duration' as string]: `${duration}s` }}
      >
        {sequence.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-12 flex-shrink-0"
          >
            <span className="font-display text-[var(--color-text-3)] whitespace-nowrap" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', letterSpacing: '-0.025em', fontWeight: 300 }}>
              {item}
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-gold)] opacity-60 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}
