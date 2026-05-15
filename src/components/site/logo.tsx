/**
 * Logotipo editorial — wordmark serif + marca dorada al lado.
 * Sin pictograma genérico de IA. Pura tipografía con un acento mínimo.
 */
export function Logo({ small = false }: { small?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      {/* Marca dorada cuadrada — gold leaf */}
      <span
        className="inline-block"
        style={{
          width: small ? 10 : 12,
          height: small ? 10 : 12,
          background: 'var(--color-gold)',
          transform: 'rotate(45deg)',
        }}
        aria-hidden
      />
      <span
        className="font-display font-medium tracking-tight text-[var(--color-ink)]"
        style={{ fontSize: small ? 16 : 18, lineHeight: 1 }}
      >
        UsaLatino<span className="text-[var(--color-gold-2)]">Prime</span>
      </span>
    </span>
  )
}
