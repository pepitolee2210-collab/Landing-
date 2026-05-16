'use client'

/**
 * Documento 3D con CSS perspective + transform.
 * Da sensación de pasaporte/credencial flotando en 3D real.
 * Mientras llega Spline asset, esto cumple con elegancia.
 *
 * Hover sutil rota la card al mouse position.
 */
import { useRef, useState } from 'react'

export function HeroDoc() {
  const ref = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ rx: -10, ry: 18 })

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width // 0..1
    const y = (e.clientY - rect.top) / rect.height // 0..1
    const ry = -22 + x * 44 // -22 a 22
    const rx = 22 - y * 44 // 22 a -22
    setRotation({ rx, ry })
  }

  function handleMouseLeave() {
    setRotation({ rx: -10, ry: 18 })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[4/5] max-w-[520px] mx-auto"
      style={{ perspective: '1600px' }}
    >
      {/* Glow detrás del documento */}
      <div
        aria-hidden
        className="absolute inset-0 glow-gold pointer-events-none"
        style={{ filter: 'blur(40px)', opacity: 0.6 }}
      />

      {/* La credencial */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.rx}deg) rotateY(${rotation.ry}deg)`,
          willChange: 'transform',
        }}
      >
        {/* Cara principal — Green Card style */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, #f5e9c8 0%, #f0dfa9 35%, #e6c97a 70%, #d4b35a 100%)',
            boxShadow: `
              0 60px 100px -40px rgba(0, 0, 0, 0.6),
              0 30px 60px -20px rgba(242, 178, 52, 0.25),
              inset 0 1px 0 rgba(255, 255, 255, 0.5),
              inset 0 -1px 0 rgba(0, 0, 0, 0.1)
            `,
            transform: 'translateZ(20px)',
          }}
        >
          {/* Textura de papel */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.18'/></svg>\")",
              mixBlendMode: 'multiply',
              opacity: 0.6,
            }}
          />

          {/* Header */}
          <div className="relative p-6 md:p-7">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p
                  className="font-mono text-[8px] md:text-[9px] tracking-[0.2em] uppercase"
                  style={{ color: '#3d2c08' }}
                >
                  United States · USCIS
                </p>
                <p
                  className="font-display mt-1"
                  style={{
                    fontSize: 'clamp(14px, 1.6vw, 18px)',
                    color: '#1a1206',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                  }}
                >
                  PERMANENT RESIDENT CARD
                </p>
              </div>

              {/* Águila / sello */}
              <div className="relative">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden>
                  <circle cx="22" cy="22" r="20" stroke="#5a3f0a" strokeWidth="1" fill="none" />
                  <circle cx="22" cy="22" r="14" stroke="#5a3f0a" strokeWidth="0.6" fill="none" />
                  {/* Estrellas en círculo */}
                  {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i * Math.PI * 2) / 12
                    const cx = 22 + Math.cos(angle) * 17
                    const cy = 22 + Math.sin(angle) * 17
                    return <circle key={i} cx={cx} cy={cy} r="0.8" fill="#5a3f0a" />
                  })}
                  <text
                    x="22"
                    y="25"
                    textAnchor="middle"
                    fill="#5a3f0a"
                    fontSize="8"
                    fontFamily="var(--font-display)"
                    fontWeight="700"
                  >
                    USCIS
                  </text>
                </svg>
              </div>
            </div>

            {/* Foto placeholder */}
            <div className="flex gap-5">
              <div
                className="flex-shrink-0 rounded-md overflow-hidden"
                style={{
                  width: 90,
                  height: 110,
                  background:
                    'linear-gradient(135deg, #d4b67a, #9a7c3a)',
                  border: '2px solid #5a3f0a',
                }}
              >
                <svg viewBox="0 0 90 110" width="100%" height="100%" aria-hidden>
                  <circle cx="45" cy="42" r="16" fill="#7d5d22" />
                  <path d="M 25 110 Q 45 70 65 110 Z" fill="#7d5d22" />
                </svg>
              </div>

              <div className="flex-1 space-y-2 pt-1">
                <Field label="Surname" value="LATINO" color="#1a1206" />
                <Field label="Given Name" value="RESIDENT" color="#1a1206" />
                <Field label="USCIS#" value="ULP·SIJS·2026" color="#5a3f0a" mono />
                <Field label="Category" value="SIJS-3" color="#1a1206" />
              </div>
            </div>

            {/* MRZ tipo OCR-A */}
            <div className="mt-6 pt-4 border-t border-[#5a3f0a]/30">
              <p
                className="font-mono text-[10px] leading-tight"
                style={{ color: '#3d2c08', letterSpacing: '0.05em' }}
              >
                P&lt;USALATINO&lt;&lt;PRIME&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
                <br />
                ULP2026SIJSCASE001&lt;&lt;&lt;&lt;&lt;USA2026&lt;&lt;
              </p>
            </div>
          </div>

          {/* Banda inferior */}
          <div
            className="absolute bottom-0 left-0 right-0 h-7 flex items-center justify-between px-6"
            style={{ background: 'rgba(26, 18, 6, 0.92)' }}
          >
            <span
              className="font-mono text-[8px] tracking-[0.2em] uppercase"
              style={{ color: '#f0dfa9' }}
            >
              UsaLatino Prime · Confirmed
            </span>
            <span
              className="inline-flex items-center gap-1.5 font-mono text-[8px] tracking-[0.18em] uppercase"
              style={{ color: '#f2b234' }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: '#34d399',
                  boxShadow: '0 0 6px #34d399',
                }}
              />
              ACTIVE
            </span>
          </div>
        </div>

        {/* Tarjeta secundaria detrás (sensación de stack) */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #1a2c5a, #0e1a37)',
            transform: 'translateZ(-20px) translateX(24px) translateY(28px)',
            opacity: 0.5,
            boxShadow: '0 40px 80px -30px rgba(0, 0, 0, 0.6)',
          }}
        >
          <div className="p-7">
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--color-blue)]/60">
              CASE FILE · I-360
            </p>
          </div>
        </div>

        {/* Tercer documento más atrás */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #f0f0eb, #d8d4c8)',
            transform: 'translateZ(-40px) translateX(48px) translateY(56px)',
            opacity: 0.3,
            boxShadow: '0 40px 80px -30px rgba(0, 0, 0, 0.4)',
          }}
        />
      </div>

      {/* Indicador sutil de interactividad */}
      <p
        aria-hidden
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--color-text-4)] whitespace-nowrap"
      >
        Pasa el cursor
      </p>
    </div>
  )
}

function Field({
  label,
  value,
  color,
  mono = false,
}: {
  label: string
  value: string
  color: string
  mono?: boolean
}) {
  return (
    <div>
      <p
        className="font-mono text-[8px] tracking-[0.15em] uppercase"
        style={{ color: '#5a3f0a', opacity: 0.7 }}
      >
        {label}
      </p>
      <p
        className={mono ? 'font-mono' : 'font-display'}
        style={{
          color,
          fontSize: mono ? 11 : 13,
          fontWeight: mono ? 600 : 700,
          letterSpacing: mono ? '0.05em' : '-0.01em',
          lineHeight: 1.1,
        }}
      >
        {value}
      </p>
    </div>
  )
}
