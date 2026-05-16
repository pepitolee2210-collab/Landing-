import Link from 'next/link'
import { PRODUCTS_BY_SLUG } from '@/lib/products'

/**
 * Hero comercial — split layout:
 * - Izquierda: copy de marketing fuerte, trust badges, dual CTA
 * - Derecha: producto destacado "mockup" tarjeta + sello de confianza
 */
export function Hero2() {
  const featured = PRODUCTS_BY_SLUG.get('visa-juvenil-completa')!

  return (
    <section className="relative overflow-hidden pt-16 md:pt-24 pb-20 md:pb-24">
      {/* Atmósfera sutil */}
      <div
        aria-hidden
        className="absolute inset-0 blueprint-fine opacity-40 pointer-events-none"
        style={{
          maskImage:
            'radial-gradient(ellipse 80% 60% at 30% 40%, black 20%, transparent 90%)',
        }}
      />

      <div className="container-x relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Lado izquierdo — copy */}
          <div className="lg:col-span-7">
            {/* Trust pill arriba */}
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-[var(--color-line-2)] bg-[var(--color-surface)]/40 backdrop-blur-sm mb-8 rise" style={{ animationDelay: '100ms' }}>
              <Stars rating={5} small />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-2)]">
                Calificación 4.9 · 400+ familias atendidas
              </span>
            </div>

            <h1
              className="word-reveal font-display text-[var(--color-text)] max-w-[16ch]"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                fontWeight: 300,
              }}
            >
              <span style={{ animationDelay: '200ms' }}>Servicios</span>{' '}
              <span style={{ animationDelay: '280ms' }}>legales</span>{' '}
              <span style={{ animationDelay: '360ms' }}>migratorios</span>{' '}
              <br />
              <span
                style={{
                  animationDelay: '500ms',
                  fontStyle: 'italic',
                  fontWeight: 200,
                  color: 'var(--color-gold)',
                }}
              >
                a un clic
              </span>{' '}
              <span style={{ animationDelay: '600ms' }}>de tu casa.</span>
            </h1>

            <p
              className="mt-8 text-lg text-[var(--color-text-2)] leading-relaxed max-w-xl rise"
              style={{ animationDelay: '800ms' }}
            >
              Elige tu servicio, compra seguro y empezamos tu caso el mismo día.
              Visa Juvenil, Asilo, Ajuste de Estatus y más — todo con un equipo
              bilingüe en Utah que entiende tu historia.
            </p>

            {/* Dual CTA */}
            <div className="mt-10 flex flex-wrap gap-3 rise" style={{ animationDelay: '950ms' }}>
              <Link href="#productos" className="btn-gold">
                Ver servicios
                <ArrowRight />
              </Link>
              <Link href="#productos" className="btn-ghost">
                Consulta gratis 30 min
              </Link>
            </div>

            {/* Trust badges row */}
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 rise" style={{ animationDelay: '1100ms' }}>
              <TrustBadge icon="shield" label="Pago seguro · SSL" />
              <TrustBadge icon="clock" label="Soporte 24/7" />
              <TrustBadge icon="undo" label="Garantía 7 días" />
            </div>
          </div>

          {/* Lado derecho — Mockup producto destacado */}
          <div className="lg:col-span-5 relative rise" style={{ animationDelay: '500ms' }}>
            <FeaturedCard product={featured} />
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturedCard({ product }: { product: typeof import('@/lib/products').PRODUCTS[number] }) {
  return (
    <div className="relative max-w-[460px] mx-auto">
      {/* Glow detrás */}
      <div
        aria-hidden
        className="absolute -inset-8 glow-gold pointer-events-none"
        style={{ opacity: 0.4, filter: 'blur(40px)' }}
      />

      {/* Tarjeta producto destacado */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background:
            'linear-gradient(140deg, var(--color-surface-2) 0%, var(--color-bg-2) 100%)',
          border: '1px solid var(--color-line-2)',
          boxShadow: '0 32px 64px -24px rgba(0,0,0,0.7)',
        }}
      >
        {/* Top: badge */}
        <div className="px-6 pt-6 pb-3 flex items-center justify-between">
          {product.badge && (
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.15em] font-bold"
              style={{
                background: 'var(--color-gold)',
                color: 'var(--color-blue-deep)',
              }}
            >
              <SparkIcon />
              {product.badge.text}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Stars rating={product.rating} />
            <span className="font-mono text-[10px] text-[var(--color-text-3)]">
              ({product.reviewCount})
            </span>
          </span>
        </div>

        {/* Visual del producto — SVG estilizado */}
        <div className="relative h-44 flex items-center justify-center overflow-hidden border-y border-[var(--color-line)]">
          <div className="absolute inset-0 board-grid opacity-30" />
          <svg width="180" height="120" viewBox="0 0 180 120" fill="none" className="relative">
            {/* Documento legal */}
            <rect x="20" y="10" width="120" height="100" rx="4" fill="var(--color-elevated)" stroke="var(--color-gold)" strokeWidth="1.4" />
            <rect x="20" y="10" width="120" height="14" fill="var(--color-gold)" opacity="0.3" rx="4" />
            <text x="80" y="20" textAnchor="middle" fill="var(--color-gold)" fontSize="8" fontFamily="var(--font-mono)" fontWeight="700">
              VISA JUVENIL · SIJS
            </text>
            <line x1="32" y1="40" x2="128" y2="40" stroke="var(--color-gold)" strokeWidth="0.8" opacity="0.5" />
            <line x1="32" y1="50" x2="100" y2="50" stroke="var(--color-gold)" strokeWidth="0.8" opacity="0.4" />
            <line x1="32" y1="60" x2="120" y2="60" stroke="var(--color-gold)" strokeWidth="0.8" opacity="0.5" />
            {/* Sello */}
            <circle cx="115" cy="85" r="14" stroke="var(--color-gold)" strokeWidth="1.2" fill="none" />
            <circle cx="115" cy="85" r="9" stroke="var(--color-gold)" strokeWidth="0.6" fill="none" />
            <text x="115" y="88" textAnchor="middle" fill="var(--color-gold)" fontSize="6" fontFamily="var(--font-mono)" fontWeight="700">USCIS</text>
            {/* Check verde overlay */}
            <g transform="translate(150, 30)">
              <circle r="14" fill="var(--color-jade)" />
              <path d="M -5 0 L -2 4 L 6 -4" stroke="var(--color-bg)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        </div>

        {/* Info */}
        <div className="px-6 py-5">
          <h3
            className="font-display text-[var(--color-text)] mb-2"
            style={{ fontSize: '1.375rem', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.15 }}
          >
            {product.name}
          </h3>
          <p className="text-sm text-[var(--color-text-2)] leading-relaxed mb-5">
            {product.shortDescription}
          </p>

          {/* Precio + descuento */}
          <div className="flex items-baseline gap-3 mb-5">
            {product.originalPrice && (
              <span className="font-mono text-sm text-[var(--color-text-3)] line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
            <span
              className="font-display"
              style={{
                fontSize: '2.25rem',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: 'var(--color-text)',
              }}
            >
              ${product.price.toLocaleString()}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-3)]">
              USD
            </span>
          </div>

          {/* Cuotas */}
          {product.installments && (
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-2)] mb-5">
              o {product.installments.count} cuotas de{' '}
              <span style={{ color: 'var(--color-gold)' }}>
                ${product.installments.monthlyAmount} USD
              </span>
            </p>
          )}

          {/* Stock signal */}
          {product.stockSignal && (
            <div className="flex items-center gap-2 mb-5 text-[11px] font-mono uppercase tracking-[0.15em] text-[var(--color-red)]">
              <span className="pulse-dot" style={{ background: 'var(--color-red)' }} />
              {product.stockSignal}
            </div>
          )}

          {/* CTA primario */}
          <Link
            href={`/servicios/${product.slug}`}
            className="btn-gold w-full justify-center"
          >
            <CartPlusIcon />
            Comprar ahora
          </Link>

          <p className="mt-3 text-center text-[10px] font-mono uppercase tracking-[0.15em] text-[var(--color-text-3)]">
            Pago seguro · Garantía 7 días
          </p>
        </div>
      </div>
    </div>
  )
}

function Stars({ rating, small }: { rating: number; small?: boolean }) {
  const full = Math.floor(rating)
  const size = small ? 11 : 12
  return (
    <span className="inline-flex items-center gap-px">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 12 12"
          fill={i < full ? 'var(--color-gold)' : 'transparent'}
          stroke="var(--color-gold)"
          strokeWidth="1"
          aria-hidden
        >
          <path d="M6 1l1.5 3.4 3.5.3-2.6 2.4.8 3.4L6 8.7 2.8 10.5l.8-3.4-2.6-2.4 3.5-.3L6 1z" />
        </svg>
      ))}
    </span>
  )
}

function TrustBadge({ icon, label }: { icon: 'shield' | 'clock' | 'undo'; label: string }) {
  return (
    <div className="inline-flex items-center gap-2">
      <span
        className="inline-flex items-center justify-center w-8 h-8 rounded-md"
        style={{
          background: 'rgba(242, 178, 52, 0.06)',
          border: '1px solid rgba(242, 178, 52, 0.2)',
        }}
      >
        {icon === 'shield' && (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M8 1L2 3v5c0 4 3 6.5 6 7 3-.5 6-3 6-7V3L8 1z" stroke="var(--color-gold)" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
            <path d="M5 8l2 2 4-4" stroke="var(--color-gold)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {icon === 'clock' && (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <circle cx="8" cy="8" r="6.5" stroke="var(--color-gold)" strokeWidth="1.2" />
            <path d="M8 4v4l3 2" stroke="var(--color-gold)" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        )}
        {icon === 'undo' && (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M3 8a5 5 0 109-3M3 8V4M3 8h4" stroke="var(--color-gold)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        )}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-text-2)]">
        {label}
      </span>
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

function SparkIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
      <path d="M5 0l1.3 3.2L10 4.5l-3.5 1L5 8.5 3.7 5.5 0 4.5l3.5-1L5 0z" />
    </svg>
  )
}

function CartPlusIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M2 3h2.5l1.5 11h10l1.5-7h-12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7" cy="17" r="1" fill="currentColor" />
      <circle cx="15" cy="17" r="1" fill="currentColor" />
      <path d="M13 6V2M11 4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
