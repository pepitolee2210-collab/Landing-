import Link from 'next/link'
import { SITE } from '@/lib/site'
import { whatsappUrl } from '@/lib/utils'
import { JourneyDiagram } from './journey-diagram'
import { AmbientOrbs } from '@/components/decor/ambient-orbs'

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 md:pt-28 pb-24 md:pb-32">
      {/* Grid blueprint apenas visible */}
      <div
        aria-hidden
        className="absolute inset-0 blueprint-fine opacity-50 pointer-events-none"
        style={{
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 90%)',
        }}
      />

      {/* Un solo orb sutil — atmósfera, no escaparate */}
      <AmbientOrbs
        orbs={[
          { color: 'gold', size: 720, x: '50%', y: '-25%', opacity: 0.35, duration: 28 },
        ]}
      />

      <div className="container-x relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Lado izquierdo */}
          <div className="lg:col-span-7">
            {/* Eyebrow minimal */}
            <div className="rise" style={{ animationDelay: '0ms' }}>
              <span className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-3)]">
                <span className="h-px w-8 bg-[var(--color-gold)]" />
                Bufete migratorio · Utah · Est. {SITE.legal.foundedYear}
              </span>
            </div>

            {/* Headline gigante con word-reveal */}
            <h1
              className="mt-10 word-reveal font-display text-[var(--color-text)]"
              style={{
                fontSize: 'clamp(3rem, 8vw, 6.5rem)',
                lineHeight: 0.96,
                letterSpacing: '-0.04em',
                fontWeight: 400,
              }}
            >
              <span style={{ animationDelay: '120ms' }}>Tu</span>{' '}
              <span style={{ animationDelay: '200ms' }}>caso</span>{' '}
              <span style={{ animationDelay: '280ms' }}>migratorio,</span>{' '}
              <br />
              <span style={{ animationDelay: '360ms', fontStyle: 'italic', color: 'var(--color-gold)', fontWeight: 300 }}>en</span>{' '}
              <span style={{ animationDelay: '440ms', fontStyle: 'italic', color: 'var(--color-gold)', fontWeight: 300 }}>tiempo</span>{' '}
              <span style={{ animationDelay: '520ms', fontStyle: 'italic', color: 'var(--color-gold)', fontWeight: 300 }}>real.</span>
            </h1>

            <p
              className="mt-10 text-lg md:text-xl text-[var(--color-text-2)] leading-relaxed max-w-xl rise"
              style={{ animationDelay: '800ms', fontWeight: 400 }}
            >
              Visa juvenil SIJS, asilo político y ajuste de estatus. Equipo
              bilingüe en Utah con tecnología propia: ves tu caso, documentos
              y próximos pasos desde cualquier dispositivo.
            </p>

            <div
              className="mt-12 flex flex-wrap gap-3 rise"
              style={{ animationDelay: '1000ms' }}
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

            {/* Stats — minimalista, sin cajas, solo tipografía */}
            <div
              className="mt-20 grid grid-cols-3 gap-x-8 rise pt-10 border-t border-[var(--color-line)]"
              style={{ animationDelay: '1200ms' }}
            >
              <Stat n="100+" l="Casos firmados · 2026" />
              <Stat n="< 4h" l="Respuesta promedio" />
              <Stat n="9" l="Países atendidos" />
            </div>
          </div>

          {/* Lado derecho — diagrama */}
          <div className="lg:col-span-5 relative rise" style={{ animationDelay: '600ms' }}>
            <JourneyDiagram />
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <p
        className="font-display text-[var(--color-text)]"
        style={{
          fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
          lineHeight: 0.95,
          letterSpacing: '-0.035em',
          fontWeight: 300,
        }}
      >
        {n}
      </p>
      <p className="mt-2 text-[11px] text-[var(--color-text-3)] font-mono uppercase tracking-[0.15em]">
        {l}
      </p>
    </div>
  )
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
