/**
 * Logo geométrico tech — un emblema "ULP" hexagonal + wordmark.
 * Pensado para sentirse como un seal digital, no como un logo SaaS.
 */
export function Logo({ small = false }: { small?: boolean }) {
  const size = small ? 22 : 28
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden
      >
        {/* Hexágono base */}
        <path
          d="M16 2L28 9V23L16 30L4 23V9L16 2Z"
          stroke="var(--color-gold)"
          strokeWidth="1.2"
        />
        {/* Hexágono interior, rotado */}
        <path
          d="M16 7L23 11V21L16 25L9 21V11L16 7Z"
          stroke="var(--color-gold)"
          strokeWidth="0.8"
          strokeOpacity="0.5"
        />
        {/* ULP en el centro como dots/marcador */}
        <circle cx="16" cy="16" r="2" fill="var(--color-navy)" />
        {/* Líneas decorativas */}
        <path d="M16 9V14" stroke="var(--color-gold)" strokeWidth="0.8" strokeOpacity="0.7" />
        <path d="M16 18V23" stroke="var(--color-gold)" strokeWidth="0.8" strokeOpacity="0.7" />
      </svg>
      <span
        className="font-display font-medium tracking-tight text-[var(--color-text)]"
        style={{ fontSize: small ? 15 : 17, lineHeight: 1 }}
      >
        UsaLatino<span className="text-[var(--color-navy)]">·</span>Prime
      </span>
    </span>
  )
}
