import Link from 'next/link'
import { SITE } from '@/lib/site'
import { whatsappUrl } from '@/lib/utils'
import { CircuitPCB } from '@/components/decor/circuit-pcb'
import { HeroCard } from './hero-card'

/**
 * Hero — PCB tech de fondo + Card protagonista que se transforma
 * entre 3 estados (Custodia → I-360 → Residencia) cada 5.5s.
 *
 * El concepto: tu caso fluye por el sistema legal como un dato
 * fluye por una placa de circuitos. La card es el resultado del
 * proceso, las líneas alrededor son las conexiones.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[100vh] flex flex-col">
      {/* PCB Circuit board — fondo tech */}
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

      {/* Glow ambient central */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <div
          className="w-[700px] h-[700px] glow-gold"
          style={{ opacity: 0.4, filter: 'blur(20px)' }}
        />
      </div>

      {/* Gradiente sutil arriba */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, var(--color-bg) 0%, transparent 100%)',
        }}
      />

      <div className="container-x relative flex-1 flex flex-col justify-center py-24 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Izquierda — tipografía */}
          <div className="lg:col-span-6">
            {/* Eyebrow */}
            <div className="rise mb-10" style={{ animationDelay: '100ms' }}>
              <span className="inline-flex items-center gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[var(--color-text-3)]">
                <span className="h-px w-8 bg-[var(--color-gold)]" />
                Bufete migratorio · Utah · Est. {SITE.legal.foundedYear}
              </span>
            </div>

            <h1
              className="word-reveal font-display text-[var(--color-text)]"
              style={{
                fontSize: 'clamp(2.75rem, 8vw, 6rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                fontWeight: 300,
                maxWidth: '14ch',
              }}
            >
              <span style={{ animationDelay: '200ms' }}>Tu</span>{' '}
              <span style={{ animationDelay: '280ms' }}>caso</span>{' '}
              <span style={{ animationDelay: '360ms' }}>migratorio,</span>
              <br />
              <span
                style={{
                  animationDelay: '480ms',
                  fontStyle: 'italic',
                  fontWeight: 200,
                  color: 'var(--color-gold)',
                }}
              >
                conectado
              </span>{' '}
              <span style={{ animationDelay: '580ms' }}>de</span>{' '}
              <span style={{ animationDelay: '660ms' }}>punta a punta.</span>
            </h1>

            <p
              className="mt-10 text-lg md:text-xl text-[var(--color-text-2)] leading-relaxed max-w-xl rise"
              style={{ animationDelay: '900ms' }}
            >
              Visa juvenil SIJS, asilo político y ajuste de estatus. Un equipo
              bilingüe en Utah con tecnología propia que conecta cada etapa
              del proceso migratorio en tiempo real.
            </p>

            <div
              className="mt-10 flex flex-wrap gap-3 rise"
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

            {/* Stats minimalistas */}
            <div
              className="mt-16 grid grid-cols-3 gap-x-6 pt-8 border-t border-[var(--color-line)] rise max-w-md"
              style={{ animationDelay: '1200ms' }}
            >
              <Stat n="100+" l="Casos firmados" />
              <Stat n="< 4h" l="Respuesta WhatsApp" />
              <Stat n="9" l="Países atendidos" />
            </div>
          </div>

          {/* Derecha — Card protagonista 3D */}
          <div
            className="lg:col-span-6 relative rise"
            style={{ animationDelay: '500ms' }}
          >
            <HeroCard />
          </div>
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
  )
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <p
        className="font-display text-[var(--color-text)]"
        style={{
          fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
          lineHeight: 0.95,
          letterSpacing: '-0.03em',
          fontWeight: 300,
        }}
      >
        {n}
      </p>
      <p className="mt-1.5 text-[11px] text-[var(--color-text-3)] font-mono uppercase tracking-[0.15em] leading-tight">
        {l}
      </p>
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
