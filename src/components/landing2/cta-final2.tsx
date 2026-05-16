import Link from 'next/link'
import { SITE } from '@/lib/site'
import { whatsappUrl } from '@/lib/utils'

export function CtaFinal2() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Glow ambient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <div
          className="w-[900px] h-[600px] glow-gold"
          style={{ opacity: 0.35, filter: 'blur(40px)' }}
        />
      </div>

      <div className="container-x relative">
        <div
          className="relative rounded-3xl overflow-hidden p-10 md:p-20 text-center"
          style={{
            background:
              'linear-gradient(135deg, var(--color-surface-2) 0%, var(--color-bg-2) 100%)',
            border: '1px solid var(--color-line-2)',
          }}
        >
          {/* Grid pattern */}
          <div aria-hidden className="absolute inset-0 board-grid opacity-30 pointer-events-none" />

          <div className="relative">
            <span className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full mb-8 border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/5">
              <span className="pulse-dot" style={{ background: 'var(--color-gold)' }} />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-gold)]">
                Atendiendo en vivo
              </span>
            </span>

            <h2
              className="font-display text-[var(--color-text)] max-w-3xl mx-auto"
              style={{
                fontSize: 'clamp(2.5rem, 6.5vw, 5rem)',
                lineHeight: 0.96,
                letterSpacing: '-0.045em',
                fontWeight: 300,
              }}
            >
              Compra hoy.{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--color-gold)', fontWeight: 200 }}>
                Empezamos hoy.
              </span>
            </h2>

            <p className="mt-8 text-lg text-[var(--color-text-2)] leading-relaxed max-w-xl mx-auto">
              Asegura tu cupo esta semana. Pago seguro, soporte humano y un
              equipo bilingüe que entiende tu historia.
            </p>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <Link href="#productos" className="btn-gold text-base px-7 py-4">
                Ver catálogo de servicios
                <ArrowRight />
              </Link>
              <a
                href={whatsappUrl(SITE.contact.whatsapp, 'Hola, vi su web. Necesito ayuda eligiendo un servicio.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-base px-7 py-4"
              >
                Hablar con un asesor
              </a>
            </div>

            {/* Trust line */}
            <div className="mt-14 inline-flex items-center gap-4 sm:gap-6 px-5 sm:px-7 py-3 rounded-full border border-[var(--color-line-2)] bg-[var(--color-bg)]/50 backdrop-blur-sm flex-wrap justify-center">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-text-2)]">
                <LockIcon /> Pago seguro
              </span>
              <span className="h-3 w-px bg-[var(--color-line-2)]" />
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-text-2)]">
                <ReturnIcon /> Garantía 7 días
              </span>
              <span className="hidden sm:block h-3 w-px bg-[var(--color-line-2)]" />
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-text-2)]">
                <span className="pulse-dot" style={{ background: 'var(--color-jade)' }} />
                Respuesta &lt; 4h
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

function ReturnIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8a5 5 0 109-3M3 8V4M3 8h4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
