'use client'

import Link from 'next/link'
import { SITE } from '@/lib/site'
import { whatsappUrl } from '@/lib/utils'
import { JourneyDiagram } from './journey-diagram'

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 md:pt-24 pb-20 md:pb-28">
      {/* Grid blueprint de fondo */}
      <div
        aria-hidden
        className="absolute inset-0 blueprint opacity-50 pointer-events-none"
        style={{
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 90%)',
        }}
      />
      {/* Glow cian sutil arriba */}
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[600px] glow-cyan opacity-50 pointer-events-none"
      />

      <div className="container-x relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Lado izquierdo — texto */}
          <div className="lg:col-span-6">
            <div className="rise" style={{ animationDelay: '0ms' }}>
              <span className="tag tag-cyan">
                <span className="pulse-dot" style={{ background: 'var(--color-cyan)' }} />
                Bufete digital · Establecido {SITE.legal.foundedYear}
              </span>
            </div>

            <h1
              className="mt-8 font-display text-[var(--color-text)] rise"
              style={{
                fontSize: 'clamp(2.75rem, 7vw, 5.5rem)',
                lineHeight: 0.98,
                letterSpacing: '-0.04em',
                fontWeight: 500,
                animationDelay: '120ms',
              }}
            >
              Tu caso{' '}
              <span className="relative inline-block">
                migratorio
                <svg
                  aria-hidden
                  className="absolute -bottom-2 left-0 w-full"
                  height="14"
                  viewBox="0 0 200 14"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 Q 50 2, 100 8 T 198 8"
                    stroke="var(--color-cyan)"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    className="path-draw"
                    style={{ ['--path-length' as string]: '400' }}
                  />
                </svg>
              </span>
              <br />
              en{' '}
              <span style={{ color: 'var(--color-cyan)' }}>tiempo real.</span>
            </h1>

            <p
              className="mt-8 text-lg text-[var(--color-text-2)] leading-relaxed max-w-xl rise"
              style={{ animationDelay: '260ms' }}
            >
              Visa juvenil SIJS, asilo político y ajuste de estatus. Un equipo
              bilingüe en Utah con tecnología propia: ves tu caso, documentos y
              próximos pasos desde cualquier dispositivo.
            </p>

            {/* CTAs */}
            <div
              className="mt-10 flex flex-wrap gap-3 rise"
              style={{ animationDelay: '380ms' }}
            >
              <a
                href={whatsappUrl(
                  SITE.contact.whatsapp,
                  'Hola, llegué desde su sitio y necesito orientación migratoria.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyan"
              >
                <WhatsAppIcon />
                Empieza tu caso ahora
                <ArrowRight />
              </a>
              <Link href="#servicios" className="btn-ghost">
                Explorar servicios
              </Link>
            </div>

            {/* Stats inline tech */}
            <div
              className="mt-14 grid grid-cols-3 gap-px bg-[var(--color-line)] rise"
              style={{ animationDelay: '500ms' }}
            >
              <Stat n={`${SITE.stats.contractsSigned}+`} l="Casos firmados" sub="en 2026" />
              <Stat n="< 4h" l="Respuesta" sub="WhatsApp" />
              <Stat n="9" l="Países" sub="atendidos" />
            </div>
          </div>

          {/* Lado derecho — SVG diagrama */}
          <div className="lg:col-span-6 relative">
            <JourneyDiagram />
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ n, l, sub }: { n: string; l: string; sub: string }) {
  return (
    <div className="bg-[var(--color-bg)] px-5 py-5">
      <p className="font-display font-medium text-3xl md:text-4xl text-[var(--color-text)] tracking-tight">
        {n}
      </p>
      <p className="mt-1 text-xs text-[var(--color-text-2)] font-medium">{l}</p>
      <p className="text-[10px] text-[var(--color-text-3)] font-mono uppercase tracking-wider mt-0.5">
        {sub}
      </p>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
