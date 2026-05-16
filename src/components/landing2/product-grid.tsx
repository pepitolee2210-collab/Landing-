'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PRODUCTS, PRODUCT_CATEGORIES, type Product } from '@/lib/products'

const ACCENT_MAP = {
  gold: 'var(--color-gold)',
  blue: 'var(--color-blue)',
  red: 'var(--color-red)',
  jade: 'var(--color-jade)',
}

export function ProductGrid() {
  const [filter, setFilter] = useState<string>('all')
  const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter)

  return (
    <section id="productos" className="py-24 md:py-32 relative">
      <div className="container-x">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12 mb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[var(--color-text-3)] mb-6">
              <span className="h-px w-8 bg-[var(--color-gold)]" />
              Catálogo · {PRODUCTS.length} servicios disponibles
            </span>
            <h2
              className="font-display text-[var(--color-text)]"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                lineHeight: 0.98,
                letterSpacing: '-0.04em',
                fontWeight: 300,
              }}
            >
              Elige tu servicio,{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--color-gold)', fontWeight: 200 }}>
                paga seguro
              </span>{' '}
              y empezamos hoy.
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 md:flex-shrink-0">
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setFilter(cat.value)}
                className="px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-[0.18em] transition-colors border"
                style={{
                  background:
                    filter === cat.value
                      ? 'var(--color-text)'
                      : 'transparent',
                  color:
                    filter === cat.value
                      ? 'var(--color-bg)'
                      : 'var(--color-text-2)',
                  borderColor:
                    filter === cat.value
                      ? 'var(--color-text)'
                      : 'var(--color-line-2)',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Footer del grid */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-sm text-[var(--color-text-3)]">
          <ShieldIcon />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
            Todos los pagos protegidos con encriptación SSL · Stripe · Zelle
          </span>
        </div>
      </div>
    </section>
  )
}

function ProductCard({ product }: { product: Product }) {
  const accent = ACCENT_MAP[product.accentColor]
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <article
      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-line-2)',
      }}
    >
      {/* Badge top-left */}
      {product.badge && (
        <div className="absolute top-4 left-4 z-10">
          <BadgePill badge={product.badge} />
        </div>
      )}

      {/* Discount badge top-right */}
      {discount > 0 && (
        <div
          className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded font-mono text-[10px] uppercase tracking-[0.12em] font-bold"
          style={{ background: 'var(--color-red)', color: '#fff' }}
        >
          -{discount}%
        </div>
      )}

      {/* Visual */}
      <div
        className="relative h-44 flex items-center justify-center overflow-hidden border-b border-[var(--color-line)]"
        style={{
          background: `linear-gradient(135deg, ${accent}0d 0%, var(--color-bg-2) 100%)`,
        }}
      >
        <div className="absolute inset-0 board-grid opacity-30" />
        <ProductIcon category={product.category} accent={accent} />
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col p-5">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <Stars rating={product.rating} />
          <span className="font-mono text-[10px] text-[var(--color-text-3)]">
            {product.rating} · ({product.reviewCount})
          </span>
        </div>

        {/* Nombre */}
        <h3
          className="font-display text-[var(--color-text)] mb-2"
          style={{ fontSize: '1.125rem', lineHeight: 1.15, letterSpacing: '-0.015em', fontWeight: 500 }}
        >
          {product.name}
        </h3>

        {/* Descripción */}
        <p className="text-sm text-[var(--color-text-2)] leading-relaxed mb-4 line-clamp-3">
          {product.shortDescription}
        </p>

        {/* Estimated delivery */}
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-text-3)] mb-5">
          <ClockIconSmall /> {product.estimatedDelivery}
        </p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Precio */}
        <div className="pt-4 border-t border-[var(--color-line)]">
          <div className="flex items-baseline gap-2 mb-1">
            {product.originalPrice && (
              <span className="font-mono text-xs text-[var(--color-text-3)] line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
            <span
              className="font-display"
              style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                letterSpacing: '-0.025em',
                color: 'var(--color-text)',
              }}
            >
              ${product.price.toLocaleString()}
            </span>
            <span className="font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-[0.12em]">
              USD
            </span>
          </div>

          {product.installments && (
            <p className="font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-[0.12em]">
              o {product.installments.count} × ${product.installments.monthlyAmount}/mes
            </p>
          )}

          {/* Stock signal */}
          {product.stockSignal && (
            <div className="flex items-center gap-1.5 mt-2 text-[10px] font-mono uppercase tracking-[0.12em] text-[var(--color-red)]">
              <span className="pulse-dot" style={{ background: 'var(--color-red)' }} />
              {product.stockSignal}
            </div>
          )}

          {/* CTAs */}
          <div className="mt-5 grid grid-cols-2 gap-2">
            <Link
              href={`/servicios/${product.slug}`}
              className="inline-flex items-center justify-center gap-1.5 h-10 rounded-md border border-[var(--color-line-2)] hover:border-[var(--color-text)] transition-colors text-xs font-medium text-[var(--color-text)]"
            >
              Detalles
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-1.5 h-10 rounded-md text-xs font-bold transition-transform hover:-translate-y-0.5"
              style={{
                background: 'var(--color-gold)',
                color: 'var(--color-blue-deep)',
                boxShadow: '0 8px 20px -8px var(--color-gold-glow)',
              }}
            >
              <CartPlusIcon />
              Agregar
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

// ─────────────────────────────────────────────────────────────
// Iconos y helpers
// ─────────────────────────────────────────────────────────────

function ProductIcon({ category, accent }: { category: string; accent: string }) {
  // SVG ilustración diferenciada por categoría
  if (category === 'visa-juvenil') {
    return (
      <svg width="120" height="100" viewBox="0 0 120 100" fill="none" aria-hidden>
        <rect x="15" y="10" width="90" height="80" rx="3" stroke={accent} strokeWidth="1.4" fill="none" />
        <rect x="15" y="10" width="90" height="14" fill={accent} fillOpacity="0.2" rx="3" />
        <line x1="25" y1="38" x2="95" y2="38" stroke={accent} strokeWidth="0.8" opacity="0.6" />
        <line x1="25" y1="48" x2="80" y2="48" stroke={accent} strokeWidth="0.8" opacity="0.5" />
        <line x1="25" y1="58" x2="88" y2="58" stroke={accent} strokeWidth="0.8" opacity="0.5" />
        <circle cx="88" cy="78" r="9" stroke={accent} strokeWidth="1.2" fill="none" />
        <text x="88" y="81" textAnchor="middle" fill={accent} fontSize="5" fontFamily="var(--font-mono)" fontWeight="700">SIJS</text>
      </svg>
    )
  }
  if (category === 'asilo') {
    return (
      <svg width="120" height="100" viewBox="0 0 120 100" fill="none" aria-hidden>
        <path d="M 60 8 L 105 22 V 60 Q 105 82 60 92 Q 15 82 15 60 V 22 Z" stroke={accent} strokeWidth="1.4" fill={accent} fillOpacity="0.08" />
        <text x="60" y="48" textAnchor="middle" fill={accent} fontSize="7" fontFamily="var(--font-mono)" fontWeight="700">I-589</text>
        <line x1="40" y1="60" x2="80" y2="60" stroke={accent} strokeWidth="0.8" opacity="0.5" />
        <line x1="40" y1="68" x2="74" y2="68" stroke={accent} strokeWidth="0.8" opacity="0.5" />
        <path d="M 50 76 L 58 84 L 72 70" stroke={accent} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (category === 'consultoria') {
    return (
      <svg width="120" height="100" viewBox="0 0 120 100" fill="none" aria-hidden>
        <rect x="12" y="14" width="62" height="44" rx="4" stroke={accent} strokeWidth="1.4" fill={accent} fillOpacity="0.05" />
        <rect x="32" y="64" width="22" height="14" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1" />
        <rect x="20" y="78" width="46" height="2" rx="1" fill={accent} />
        {/* Persona en pantalla */}
        <circle cx="43" cy="30" r="6" fill={accent} fillOpacity="0.5" />
        <path d="M 30 50 Q 43 38 56 50 Z" fill={accent} fillOpacity="0.5" />
        {/* Indicador en vivo */}
        <circle cx="68" cy="20" r="3" fill={accent}>
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <text x="85" y="42" fill={accent} fontSize="8" fontFamily="var(--font-mono)" fontWeight="700" letterSpacing="1">30 min</text>
        <text x="85" y="55" fill={accent} fontSize="6" fontFamily="var(--font-mono)" opacity="0.6" letterSpacing="0.5">EN VIVO</text>
      </svg>
    )
  }
  // curso
  return (
    <svg width="120" height="100" viewBox="0 0 120 100" fill="none" aria-hidden>
      <rect x="20" y="14" width="80" height="56" rx="3" stroke={accent} strokeWidth="1.4" fill={accent} fillOpacity="0.06" />
      <rect x="20" y="14" width="80" height="56" rx="3" fill="none" stroke={accent} strokeWidth="1.4" />
      {/* Botón play */}
      <circle cx="60" cy="42" r="12" stroke={accent} strokeWidth="1.4" fill="none" />
      <path d="M 56 36 L 68 42 L 56 48 Z" fill={accent} />
      {/* Línea base */}
      <rect x="32" y="78" width="56" height="2" rx="1" fill={accent} fillOpacity="0.3" />
      <rect x="32" y="78" width="32" height="2" rx="1" fill={accent} />
    </svg>
  )
}

function BadgePill({ badge }: { badge: Product['badge'] }) {
  if (!badge) return null
  const styles = {
    popular: { bg: 'var(--color-gold)', fg: 'var(--color-blue-deep)' },
    new: { bg: 'var(--color-blue)', fg: '#fff' },
    sale: { bg: 'var(--color-red)', fg: '#fff' },
    limited: { bg: 'var(--color-jade)', fg: 'var(--color-blue-deep)' },
  }[badge.variant]
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-1 rounded font-mono text-[10px] uppercase tracking-[0.1em] font-bold"
      style={{ background: styles.bg, color: styles.fg }}
    >
      {badge.variant === 'popular' && <SparkIcon />}
      {badge.variant === 'new' && <SparkIcon />}
      {badge.text}
    </span>
  )
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  return (
    <span className="inline-flex items-center gap-px">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill={i < full ? 'var(--color-gold)' : 'transparent'} stroke="var(--color-gold)" strokeWidth="1" aria-hidden>
          <path d="M6 1l1.5 3.4 3.5.3-2.6 2.4.8 3.4L6 8.7 2.8 10.5l.8-3.4-2.6-2.4 3.5-.3L6 1z" />
        </svg>
      ))}
    </span>
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
    <svg width="13" height="13" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M2 3h2.5l1.5 11h10l1.5-7h-12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7" cy="17" r="1" fill="currentColor" />
      <circle cx="15" cy="17" r="1" fill="currentColor" />
      <path d="M13 6V2M11 4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function ClockIconSmall() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="inline-block mr-1 mb-px" aria-hidden>
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1" />
      <path d="M6 3v3l2 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 1L2 3v5c0 4 3 6.5 6 7 3-.5 6-3 6-7V3L8 1z" stroke="var(--color-gold)" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
      <path d="M5 8l2 2 4-4" stroke="var(--color-gold)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
