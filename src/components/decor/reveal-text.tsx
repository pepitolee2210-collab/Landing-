/**
 * Texto que se revela palabra por palabra con stagger.
 * Cinematográfico, refinado — Awwwards staple.
 */
export function RevealText({
  text,
  delay = 0,
  className = '',
  style,
  as: As = 'span',
}: {
  text: string
  delay?: number
  className?: string
  style?: React.CSSProperties
  as?: 'span' | 'h1' | 'h2' | 'p'
}) {
  const words = text.split(' ')
  return (
    <As className={`word-reveal ${className}`} style={style}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ animationDelay: `${delay + i * 80}ms`, marginRight: '0.25em' }}
        >
          {word}
        </span>
      ))}
    </As>
  )
}
