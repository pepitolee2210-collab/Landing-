/**
 * Etiqueta de sección editorial — "01 / SERVICIOS"
 * Aparece en columna vertical en desktop, horizontal en mobile.
 */
export function SectionLabel({
  number,
  title,
}: {
  number: string
  title: string
}) {
  return (
    <div className="flex items-baseline gap-3 mb-6">
      <span className="font-mono text-xs text-[var(--color-gold-2)] font-medium tracking-[0.2em]">
        {number}
      </span>
      <span className="h-px w-12 bg-[var(--color-line-soft)]" />
      <span className="font-mono text-[10px] text-[var(--color-ink-3)] uppercase tracking-[0.3em]">
        {title}
      </span>
    </div>
  )
}
