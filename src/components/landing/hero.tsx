'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { SITE } from '@/lib/site'
import { whatsappUrl } from '@/lib/utils'
import { CircuitPCB } from '@/components/decor/circuit-pcb'
import { CardChoreography } from './card-choreography'

/**
 * Hero choreography — 3 secciones full-height encapsuladas en un container ref.
 * Las 7 cards entran en abanico en sección 1, se recogen, descienden y se
 * despliegan en cascada en sección 2. La sección 3 sigue siendo el resto del sitio.
 *
 * Esta sección reemplaza solo el bloque inicial — el resto del page.tsx
 * sigue normal.
 */
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative">
      {/* Overlay global de cards — vive sobre las 3 secciones */}
      <CardChoreography pageContainerRef={containerRef} />

      {/* === SECCIÓN 1 — HERO TEXTO === */}
      <section className="relative overflow-hidden min-h-[100vh] flex flex-col">
        {/* PCB Circuit fondo */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            maskImage:
              'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 28%, black 60%)',
          }}
        >
          <CircuitPCB className="w-full h-full" />
        </div>

        {/* Glow central */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
        >
          <div
            className="w-[700px] h-[700px] glow-gold"
            style={{ opacity: 0.32, filter: 'blur(28px)' }}
          />
        </div>

        <div className="container-x relative flex-1 flex flex-col justify-start py-24 md:py-28">
          <div className="rise mb-10" style={{ animationDelay: '100ms' }}>
            <span className="inline-flex items-center gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[var(--color-text-3)]">
              <span className="h-px w-8 bg-[var(--color-gold)]" />
              Bufete migratorio · Utah · Est. {SITE.legal.foundedYear}
            </span>
          </div>

          <h1
            className="word-reveal font-display text-[var(--color-text)] max-w-[15ch]"
            style={{
              fontSize: 'clamp(3rem, 9vw, 7.5rem)',
              lineHeight: 0.94,
              letterSpacing: '-0.045em',
              fontWeight: 300,
            }}
          >
            <span style={{ animationDelay: '200ms' }}>Un</span>{' '}
            <span style={{ animationDelay: '280ms' }}>lugar</span>{' '}
            <span style={{ animationDelay: '360ms' }}>para</span>{' '}
            <span style={{ animationDelay: '440ms' }}>guardar</span>
            <br />
            <span
              style={{
                animationDelay: '560ms',
                fontStyle: 'italic',
                fontWeight: 200,
                color: 'var(--color-gold)',
              }}
            >
              cada documento
            </span>{' '}
            <span style={{ animationDelay: '720ms' }}>de tu caso.</span>
          </h1>

          {/* Espacio reservado para que las cards aterricen visualmente */}
          <div className="h-[280px] md:h-[340px]" aria-hidden />

          <p
            className="mt-2 max-w-xl text-base md:text-lg text-[var(--color-text-2)] leading-relaxed rise"
            style={{ animationDelay: '900ms' }}
          >
            Visa juvenil, asilo político, ajuste de estatus. Cada paso del
            proceso migratorio en un lugar — con un equipo bilingüe en Utah
            que entiende tu historia antes que tus papeles.
          </p>

          <div
            className="mt-8 flex flex-wrap gap-3 rise"
            style={{ animationDelay: '1050ms' }}
          >
            <a
              href={whatsappUrl(
                SITE.contact.whatsapp,
                'Hola, llegué desde su sitio y necesito orientación migratoria.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              Empieza tu caso
              <ArrowRight />
            </a>
            <Link href="#servicios" className="btn-ghost">
              Conocer servicios
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          aria-hidden
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 rise opacity-60"
          style={{ animationDelay: '1400ms' }}
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--color-text-3)]">
            Scroll
          </span>
          <span className="block w-px h-8 bg-gradient-to-b from-[var(--color-gold)] to-transparent" />
        </div>
      </section>

      {/* === SECCIÓN 2 — TEXT LADO IZQUIERDO + CARDS EN CASCADA DERECHA === */}
      <section
        data-section="two"
        className="relative overflow-hidden min-h-[100vh] flex items-start"
        style={{ paddingTop: '8vh', paddingBottom: '8vh' }}
      >
        <div className="container-x relative w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 relative z-10">
              {/* Eyebrow */}
              <span className="inline-flex items-center gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[var(--color-text-3)] mb-8">
                <span className="h-px w-8 bg-[var(--color-gold)]" />
                Tu caso, organizado
              </span>

              <h2
                className="font-display text-[var(--color-text)]"
                style={{
                  fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)',
                  lineHeight: 0.98,
                  letterSpacing: '-0.04em',
                  fontWeight: 300,
                }}
              >
                Cada{' '}
                <span style={{ fontStyle: 'italic', color: 'var(--color-gold)', fontWeight: 200 }}>
                  documento
                </span>{' '}
                en su sitio,{' '}
                <span style={{ fontStyle: 'italic', color: 'var(--color-blue)', fontWeight: 200 }}>
                  cada paso
                </span>{' '}
                claro.
              </h2>

              <p className="mt-8 text-base md:text-lg text-[var(--color-text-2)] leading-relaxed max-w-md">
                De la orden de custodia a la Green Card aprobada, todo tu
                expediente migratorio vive en un mismo lugar. Tú accedes
                cuando quieres. Nosotros movemos el caso adelante.
              </p>

              {/* Floating tags estilo Pallet Ross */}
              <div className="mt-12 space-y-3">
                <FloatingTag color="var(--color-gold)" label="@diana · revisó tu I-360" />
                <FloatingTag color="var(--color-blue)" label="@andrium · cuota inicial recibida" delay={0.15} />
                <FloatingTag color="var(--color-red)" label="@henry · firmó la petición USCIS" delay={0.3} />
              </div>
            </div>

            {/* Lado derecho — vacío para que las cards desciendan ahí */}
            <div className="lg:col-span-7 min-h-[600px]" aria-hidden />
          </div>
        </div>
      </section>
    </div>
  )
}

function FloatingTag({
  color,
  label,
  delay = 0,
}: {
  color: string
  label: string
  delay?: number
}) {
  return (
    <div
      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border"
      style={{
        background: 'var(--color-surface)',
        borderColor: `${color}40`,
        animation: `rise 0.9s ${0.4 + delay}s cubic-bezier(0.22, 1, 0.36, 1) both`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
      />
      <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--color-text-2)]">
        {label}
      </span>
    </div>
  )
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12H19M19 12L12 5M19 12L12 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
