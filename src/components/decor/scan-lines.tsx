/**
 * Líneas horizontales que bajan recorriendo la sección, efecto scanner.
 * Una en gold y otra desfasada en red para tener mezcla de colores Utah.
 */
export function ScanLines() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="scan-line absolute left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--color-gold) 50%, transparent 100%)',
          boxShadow: '0 0 12px var(--color-gold)',
          animationDuration: '9s',
        }}
      />
      <div
        className="scan-line absolute left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--color-red) 50%, transparent 100%)',
          boxShadow: '0 0 12px var(--color-red)',
          animationDuration: '13s',
          animationDelay: '4s',
        }}
      />
      <div
        className="scan-line absolute left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--color-blue-bright) 50%, transparent 100%)',
          boxShadow: '0 0 12px var(--color-blue-bright)',
          animationDuration: '11s',
          animationDelay: '2s',
        }}
      />
    </div>
  )
}
