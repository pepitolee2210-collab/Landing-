import Link from 'next/link'
import { SITE } from '@/lib/site'
import { whatsappUrl } from '@/lib/utils'
import { GrowingLines } from '@/components/decor/growing-lines'
import { USAMap } from '@/components/decor/usa-map'

/**
 * Hero conceptual: "Tu caso crece"
 * - GrowingLines de fondo (hierba digital, cases creciendo)
 * - Mapa USA muy sutil con las conexiones
 * - Tipografía MASIVA como protagonista absoluto
 * - Composición editorial asimétrica
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[100vh] flex flex-col">
      {/* Growing lines — el corazón visual */}
      <GrowingLines count={64} />

      {/* Mapa USA sutil sobreimpuesto */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        style={{
          opacity: 0.16,
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 60%, black 30%, transparent 90%)',
        }}
      >
        <USAMap className="w-full max-w-[1400px] h-auto" />
      </div>

      {/* Gradiente sutil para dar profundidad arriba */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, var(--color-bg) 0%, transparent 100%)',
        }}
      />

      <div className="container-x relative flex-1 flex flex-col justify-center py-24 md:py-32">
        {/* Eyebrow */}
        <div className="rise mb-12 md:mb-16" style={{ animationDelay: '120ms' }}>
          <span className="inline-flex items-center gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[var(--color-text-3)]">
            <span className="h-px w-8 bg-[var(--color-gold)]" />
            Bufete migratorio · Utah · Est. {SITE.legal.foundedYear}
          </span>
        </div>

        {/* Tipografía masiva — composición asimétrica */}
        <h1
          className="word-reveal font-display text-[var(--color-text)] max-w-[18ch]"
          style={{
            fontSize: 'clamp(3rem, 11vw, 9rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.045em',
            fontWeight: 300,
          }}
        >
          <span style={{ animationDelay: '200ms' }}>Tu</span>{' '}
          <span
            style={{
              animationDelay: '280ms',
              fontStyle: 'italic',
              fontWeight: 200,
              color: 'var(--color-gold)',
            }}
          >
            caso
          </span>
          <br />
          <span style={{ animationDelay: '360ms' }}>migratorio,</span>
          <br />
          <span
            style={{
              animationDelay: '500ms',
              fontWeight: 400,
            }}
          >
            no es un{' '}
          </span>
          <span
            style={{
              animationDelay: '620ms',
              fontStyle: 'italic',
              fontWeight: 200,
              color: 'var(--color-gold)',
              borderBottom: '4px solid var(--color-gold)',
              paddingBottom: '0.05em',
            }}
          >
            número.
          </span>
        </h1>

        {/* Grid de 2 columnas: descripción + CTAs+stats */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
          {/* Descripción */}
          <div className="md:col-span-6 lg:col-span-7">
            <p
              className="text-lg md:text-xl text-[var(--color-text-2)] leading-relaxed max-w-2xl rise"
              style={{ animationDelay: '900ms', fontWeight: 400 }}
            >
              Visa juvenil SIJS, asilo político y ajuste de estatus. Un equipo
              bilingüe en Utah que entiende tu historia antes que tus papeles.
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

          {/* Stats inline */}
          <div
            className="md:col-span-6 lg:col-span-5 rise"
            style={{ animationDelay: '1200ms' }}
          >
            <div className="grid grid-cols-3 gap-x-4 md:gap-x-6 pt-8 border-t border-[var(--color-line)]">
              <Stat n="100+" l="Casos firmados" sub="2026" />
              <Stat n="<4h" l="Respuesta" sub="WhatsApp" />
              <Stat n="9" l="Países" sub="atendidos" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator delicado */}
      <div
        aria-hidden
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 rise opacity-60"
        style={{ animationDelay: '1500ms' }}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--color-text-3)]">
          Scroll
        </span>
        <span className="block w-px h-8 bg-gradient-to-b from-[var(--color-gold)] to-transparent" />
      </div>
    </section>
  )
}

function Stat({ n, l, sub }: { n: string; l: string; sub: string }) {
  return (
    <div>
      <p
        className="font-display text-[var(--color-text)]"
        style={{
          fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
          lineHeight: 0.95,
          letterSpacing: '-0.04em',
          fontWeight: 300,
        }}
      >
        {n}
      </p>
      <p className="mt-2 text-[11px] text-[var(--color-text-2)] font-medium leading-tight">
        {l}
      </p>
      <p className="text-[9px] text-[var(--color-text-3)] font-mono uppercase tracking-[0.15em] mt-0.5">
        {sub}
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
