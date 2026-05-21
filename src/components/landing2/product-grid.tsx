'use client'

import { useState } from 'react'
import { PRODUCTS, PRODUCT_CATEGORIES, type Product } from '@/lib/products'
import { ServiceModal } from './service-modal'
import { getProductMedia } from '@/lib/product-media'

const FILTERS = [...PRODUCT_CATEGORIES]

export function ProductGrid() {
  const [active, setActive] = useState<string>('all')
  const [openProduct, setOpenProduct] = useState<Product | null>(null)
  const visible =
    active === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === active)

  return (
    <section id="productos" className="l2-aurora l2-aurora-catalog relative py-20 md:py-28">
      <div className="l2-aurora-layer">
        <span className="l2-orb l2-orb-1" />
        <span className="l2-orb l2-orb-2" />
        <div className="l2-glass-refract" />
      </div>
      <div className="l2-container">
        {/* Header compacto */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <span className="l2-chip mb-4">
              <span style={{ color: 'var(--c-blue)' }}>02</span>
              <span className="opacity-60">·</span>
              <span>Catálogo</span>
            </span>
            <h2
              className="l2-display text-[var(--c-fg)]"
              style={{ fontSize: 'clamp(1.85rem, 4vw, 3rem)' }}
            >
              Todos los servicios.
              <br />
              <span style={{ color: 'var(--c-blue)' }}>Una sola mirada.</span>
            </h2>
          </div>

          {/* Filtros pill */}
          <div className="flex flex-wrap gap-1.5">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                className="px-3.5 py-2 text-xs font-mono uppercase tracking-[0.06em] rounded-full transition-all"
                style={{
                  background: active === f.value ? 'var(--c-blue)' : 'transparent',
                  color: active === f.value ? '#fff' : 'var(--c-fg-2)',
                  border: '1px solid',
                  borderColor: active === f.value ? 'var(--c-blue)' : 'var(--c-line-2)',
                  fontWeight: active === f.value ? 700 : 500,
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid denso 4 cols desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {visible.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              onOpen={() => setOpenProduct(p)}
            />
          ))}
        </div>

        {/* Modal de video — un solo modal compartido */}
        {openProduct && (
          <ServiceModal
            product={openProduct}
            open={!!openProduct}
            onClose={() => setOpenProduct(null)}
          />
        )}

        {visible.length === 0 && (
          <p className="text-center text-[var(--c-fg-3)] py-20">
            No hay productos en esta categoría.
          </p>
        )}
      </div>
    </section>
  )
}

function ProductCard({
  product,
  index,
  onOpen,
}: {
  product: Product
  index: number
  onOpen: () => void
}) {
  const isHighlight = index === 0 && product.badge?.variant === 'popular'
  const media = getProductMedia(product.id)
  const [imgError, setImgError] = useState(false)
  const hasImage = !!media.image && !imgError

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block rounded-2xl overflow-hidden transition-all duration-500 text-left card-pop"
      style={{
        background: 'var(--c-carbon-2)',
        border: `1px solid ${isHighlight ? 'rgba(91,155,255,0.40)' : 'var(--c-line-2)'}`,
      }}
      aria-label={`Abrir video de ${product.name}`}
    >
      {/* Hover glow */}
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at top, rgba(91,155,255,0.18), transparent 60%)',
        }}
      />

      {/* Visual area — IMAGEN IA o fallback SVG */}
      <div
        className="relative aspect-[3/4] sm:aspect-[4/3] overflow-hidden"
        style={{
          background:
            isHighlight
              ? 'linear-gradient(135deg, rgba(91,155,255,0.20) 0%, rgba(255,77,109,0.08) 100%)'
              : 'linear-gradient(135deg, var(--c-carbon-3) 0%, var(--c-carbon-1) 100%)',
        }}
      >
        {hasImage ? (
          <>
            <picture>
              {media.imageMobile && (
                <source media="(max-width: 767px)" srcSet={media.imageMobile} />
              )}
              <img
                src={media.image}
                alt={product.name}
                onError={() => setImgError(true)}
                className="absolute inset-0 w-full h-full object-cover card-image"
                loading="lazy"
                decoding="async"
              />
            </picture>
            {/* Vignette para legibilidad de badges */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(10,10,10,0.45) 0%, transparent 30%, transparent 60%, rgba(10,10,10,0.55) 100%)',
              }}
            />
          </>
        ) : (
          <>
            {/* Grid pattern */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <CategoryIcon category={product.category} large />
            </div>
          </>
        )}

        {/* Play overlay — aparece al hover */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none play-overlay"
        >
          <div
            className="play-circle relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(10,10,10,0.55)',
              backdropFilter: 'blur(12px)',
              border: '1.5px solid var(--c-blue)',
              boxShadow: '0 12px 32px -8px rgba(91,155,255,0.55), 0 0 0 6px rgba(91,155,255,0.08)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" aria-hidden>
              <path d="M7 4l13 8-13 8V4z" />
            </svg>
            <span aria-hidden className="absolute inset-0 rounded-full play-ring-card" style={{ border: '1.5px solid var(--c-blue)' }} />
          </div>
        </div>

        {/* Badge esquina */}
        {product.badge ? (
          <div className="absolute top-2.5 left-2.5">
            <span
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md font-mono text-[9px] uppercase tracking-[0.1em] font-bold backdrop-blur"
              style={{
                background: badgeBg(product.badge.variant),
                color: badgeFg(product.badge.variant),
                border: `1px solid ${badgeBorder(product.badge.variant)}`,
              }}
            >
              {badgeIcon(product.badge.variant)}
              {product.badge.text}
            </span>
          </div>
        ) : null}

        {/* Rating esquina */}
        <div
          className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md font-mono text-[10px] font-bold backdrop-blur"
          style={{ background: 'rgba(10, 10, 10, 0.7)', color: 'var(--c-fg)' }}
        >
          <Star />
          {product.rating}
        </div>

        {/* Estimated delivery esquina bottom */}
        <div className="absolute bottom-2.5 right-2.5">
          <span
            className="px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-[0.08em] font-bold"
            style={{
              background: 'rgba(10,10,10,0.78)',
              color: 'var(--c-fg-2)',
              backdropFilter: 'blur(6px)',
              border: '1px solid var(--c-line-2)',
            }}
          >
            ⏱ {product.estimatedDelivery.split('·')[0].trim()}
          </span>
        </div>
      </div>

      {/* Contenido — compacto */}
      <div className="relative z-10 p-3.5 md:p-4">
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--c-fg-3)] mb-1.5 truncate">
          {categoryLabel(product.category)}
        </p>
        <h3
          className="l2-display text-[15px] md:text-[15px] text-[var(--c-fg)] leading-tight mb-3 line-clamp-2"
          style={{ fontWeight: 600, minHeight: '2.4em' }}
        >
          {shortTitle(product.name)}
        </h3>

        {/* Pitch comercial */}
        <p
          className="text-[11px] mb-2 leading-snug line-clamp-2"
          style={{ color: 'var(--c-fg-2)' }}
        >
          {product.pitch}
        </p>

        <div
          className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.08em]"
          style={{ color: 'var(--c-blue-2)' }}
        >
          <span className="l2-pulse" style={{ background: 'var(--c-blue)' }} />
          Cotización personalizada
        </div>

        {/* MOBILE: hint minimal "pulsa para verlo" — Bricolage italic, sin caja */}
        <div className="tap-hint md:hidden">
          <span aria-hidden className="tap-hint-icon">
            <PlayIcon />
          </span>
          <span className="tap-hint-text">
            pulsa para <em>verlo</em>
          </span>
        </div>
      </div>

      {/* CTA hover slide-in — neuromarketing visual effects */}
      <div
        className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-400 z-20 hidden md:block"
        style={{
          background: 'linear-gradient(to top, var(--c-carbon-2) 80%, transparent)',
        }}
      >
        <div className="pcta-wrap relative">
          <span aria-hidden className="pcta-halo" />
          <span
            className="pcta l2-btn l2-btn-blue w-full !py-2.5 text-xs inline-flex items-center justify-center gap-2 relative overflow-hidden"
            style={{ pointerEvents: 'none' }}
          >
            <span aria-hidden className="pcta-shimmer" />
            <PlayIcon />
            <span className="pcta-text relative z-10">Mira el caso real · 30 seg</span>
            <span className="pcta-arrow relative z-10">
              <ArrowRight />
            </span>
          </span>
        </div>
      </div>

      <style jsx>{`
        .card-pop {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease, border-color 0.4s ease;
        }
        .card-pop:hover {
          transform: translateY(-6px);
          border-color: rgba(91, 155, 255, 0.55);
          box-shadow: 0 32px 64px -24px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(91, 155, 255, 0.20);
        }
        .card-image {
          transition: transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.55s ease;
          filter: saturate(0.9);
        }
        .card-pop:hover .card-image {
          transform: scale(1.08);
          filter: saturate(1.05);
        }
        .play-overlay {
          opacity: 0;
          transform: scale(0.85);
          transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .card-pop:hover .play-overlay,
        .card-pop:focus-visible .play-overlay {
          opacity: 1;
          transform: scale(1);
        }
        .play-circle {
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.4s ease;
        }
        .card-pop:hover .play-circle {
          transform: scale(1.1);
          background: rgba(91, 155, 255, 0.32);
        }
        .play-ring-card {
          opacity: 0.6;
          animation: card-ring-pulse 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* ─── CTA NEUROMARKETING EFFECTS ─── */
        /* Halo respirando detrás del botón — heartbeat metaphor (2.4s) */
        .pcta-halo {
          position: absolute;
          inset: -6px;
          border-radius: 999px;
          background: radial-gradient(ellipse at center, rgba(91, 155, 255, 0.55) 0%, rgba(91, 155, 255, 0.15) 50%, transparent 75%);
          filter: blur(10px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.35s ease;
          z-index: 0;
        }
        .card-pop:hover .pcta-halo {
          opacity: 1;
          animation: pcta-halo-breath 2.4s ease-in-out 0.4s infinite;
        }
        @keyframes pcta-halo-breath {
          0%, 100% { transform: scale(0.95); opacity: 0.85; }
          50%      { transform: scale(1.06); opacity: 1; }
        }

        /* Shimmer light sweep — un solo barrido al aparecer el CTA */
        .pcta-shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            110deg,
            transparent 30%,
            rgba(255, 255, 255, 0.40) 50%,
            transparent 70%
          );
          opacity: 0;
          pointer-events: none;
          z-index: 1;
        }
        .card-pop:hover .pcta-shimmer {
          animation: pcta-sweep 1.4s cubic-bezier(0.4, 0, 0.6, 1) 0.5s;
        }
        @keyframes pcta-sweep {
          0%   { transform: translateX(0); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateX(320%); opacity: 0; }
        }

        /* Arrow slide derecho — direccionalidad implícita */
        .pcta-arrow {
          display: inline-flex;
          transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-pop:hover .pcta-arrow {
          transform: translateX(4px);
        }

        /* Asegurar que el contenido del botón quede sobre los shimmers */
        .pcta > svg { position: relative; z-index: 2; }

        @media (prefers-reduced-motion: reduce) {
          .pcta-halo,
          .pcta-shimmer,
          .pcta-arrow { animation: none !important; transition: none !important; }
          .card-pop:hover .pcta-arrow { transform: none; }
        }

        /* ─── MOBILE TAP HINT (solo mobile, sin caja, italic elegante) ─── */
        .tap-hint {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-top: 10px;
          font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
          font-size: 12px;
          font-weight: 400;
          letter-spacing: -0.005em;
          color: rgba(255, 255, 255, 0.55);
        }
        @media (min-width: 768px) {
          .tap-hint { display: none !important; }
        }
        .tap-hint-text em {
          font-style: italic;
          font-variation-settings: 'wdth' 90;
          color: var(--c-blue-2);
          font-weight: 500;
        }
        .tap-hint-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgba(91, 155, 255, 0.16);
          border: 1px solid rgba(91, 155, 255, 0.40);
          color: var(--c-blue-2);
          animation: tap-hint-breathe 2.2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes tap-hint-breathe {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(91, 155, 255, 0.40);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(91, 155, 255, 0);
            transform: scale(1.08);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tap-hint-icon { animation: none !important; }
        }
        @keyframes card-ring-pulse {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.7); opacity: 0; }
        }
      `}</style>
    </button>
  )
}

/** Trunca nombres muy largos */
function shortTitle(name: string) {
  // Remueve " — " suffix descriptivo
  const split = name.split('—')
  if (split.length > 1) {
    return split[0].trim() + (split[1] ? ` · ${split[1].trim()}` : '')
  }
  return name
}

function categoryLabel(cat: Product['category']) {
  switch (cat) {
    case 'visa-juvenil':
      return 'VISA JUVENIL · SIJS'
    case 'asilo':
      return 'ASILO POLÍTICO'
    case 'green-card':
      return 'GREEN CARD · I-485'
    case 'litigio':
      return 'LITIGIO'
    case 'fiscal':
      return 'IRS · IMPUESTOS'
  }
}

function badgeBg(v: NonNullable<Product['badge']>['variant']) {
  if (v === 'popular') return 'rgba(91, 155, 255, 0.95)'
  if (v === 'sale') return 'rgba(255, 77, 109, 0.95)'
  if (v === 'limited') return 'rgba(242, 178, 52, 0.92)'
  if (v === 'new') return 'rgba(34, 255, 160, 0.92)'
  return 'rgba(91, 155, 255, 0.95)'
}
function badgeFg(v: NonNullable<Product['badge']>['variant']) {
  if (v === 'popular' || v === 'sale') return '#fff'
  return 'var(--c-carbon)'
}
function badgeBorder(v: NonNullable<Product['badge']>['variant']) {
  if (v === 'popular') return 'rgba(91, 155, 255, 1)'
  if (v === 'sale') return 'rgba(255, 77, 109, 1)'
  if (v === 'limited') return 'rgba(242, 178, 52, 1)'
  if (v === 'new') return 'rgba(34, 255, 160, 1)'
  return 'rgba(91, 155, 255, 1)'
}
function badgeIcon(v: NonNullable<Product['badge']>['variant']) {
  if (v === 'popular') return '★'
  if (v === 'sale') return '%'
  if (v === 'limited') return '⏱'
  return '◆'
}

function CategoryIcon({
  category,
  large,
}: {
  category: Product['category']
  large?: boolean
}) {
  const stroke = 'rgba(255,255,255,0.55)'
  const fill = 'rgba(91,155,255,0.18)'
  const size = large ? 64 : 36
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    'aria-hidden': true,
  } as const

  if (category === 'visa-juvenil') {
    return (
      <svg {...common}>
        <rect x="4" y="3" width="16" height="18" rx="2" stroke={stroke} strokeWidth="1.3" fill={fill} />
        <path d="M8 8h8M8 12h8M8 16h5" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    )
  }
  if (category === 'asilo') {
    return (
      <svg {...common}>
        <path d="M12 2l8 5v6c0 5-4 8-8 9-4-1-8-4-8-9V7l8-5z" stroke={stroke} strokeWidth="1.3" fill={fill} />
        <path d="M9 12l2 2 4-4" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (category === 'green-card') {
    return (
      <svg {...common}>
        <rect x="3" y="6" width="18" height="12" rx="2" stroke={stroke} strokeWidth="1.3" fill={fill} />
        <circle cx="8" cy="11" r="1.5" stroke={stroke} strokeWidth="1.2" />
        <path d="M13 10h6M13 13h4" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    )
  }
  if (category === 'litigio') {
    return (
      <svg {...common}>
        <path d="M14 4l6 6M16 2l6 6M11 7l6 6M3 21l8-8M6 18l3 3" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill={fill} />
      </svg>
    )
  }
  if (category === 'fiscal') {
    return (
      <svg {...common}>
        <rect x="5" y="3" width="14" height="18" rx="2" stroke={stroke} strokeWidth="1.3" fill={fill} />
        <rect x="8" y="6" width="8" height="3" stroke={stroke} strokeWidth="1.2" />
        <circle cx="9" cy="13" r="0.6" fill={stroke} />
        <circle cx="12" cy="13" r="0.6" fill={stroke} />
        <circle cx="15" cy="13" r="0.6" fill={stroke} />
        <circle cx="9" cy="16" r="0.6" fill={stroke} />
        <circle cx="12" cy="16" r="0.6" fill={stroke} />
        <circle cx="15" cy="16" r="0.6" fill={stroke} />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.3" fill={fill} />
    </svg>
  )
}

function Star() {
  return (
    <svg width="9" height="9" viewBox="0 0 12 12" fill="var(--c-gold)" aria-hidden>
      <path d="M6 1l1.5 3.4 3.5.3-2.6 2.4.8 3.4L6 8.7 2.8 10.5l.8-3.4-2.6-2.4 3.5-.3L6 1z" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4 10h12m0 0l-5-5m5 5l-5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
      <path d="M3 1.5v9l8-4.5z" />
    </svg>
  )
}
