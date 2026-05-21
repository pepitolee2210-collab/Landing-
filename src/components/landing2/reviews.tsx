'use client'

import { useEffect, useRef, useState } from 'react'
import { TESTIMONIALS, type Testimonial } from '@/lib/testimonials'

/**
 * Reviews v4 — Bento Hero Swap (Apple-style morph)
 *
 * DESKTOP:
 * - Bento 4×3 asimétrico: 1 hero (2×2) + 7 secundarias (1×1 y 1 wide 2×1)
 * - Cada 9s un secundario aleatorio es PROMOVIDO a hero y el hero anterior
 *   baja a su slot. Las cards físicamente cambian de tamaño via View Transitions API.
 * - Cada tile renderiza el mismo contenido completo; el "size class"
 *   (hero/small/wide) decide qué se muestra y cómo se layoutea.
 * - Ambient float + 3D tilt + cursor spotlight per tile
 * - Click cualquier secondary → promoción inmediata
 *
 * MOBILE:
 * - Carrusel horizontal snap-scroll, una card por viewport (~88vw)
 * - Auto-advance cada 5.5s, swipe libre, paginación dots
 */

// Slot definitions. Each slot has a CSS area class + size category.
type SlotKey = 'hero' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g'
type TileSize = 'hero' | 'small' | 'wide'

const SLOTS: Record<SlotKey, { size: TileSize; area: string }> = {
  hero: { size: 'hero', area: 'bento-slot-hero' },
  a:    { size: 'small', area: 'bento-slot-a' },
  b:    { size: 'small', area: 'bento-slot-b' },
  c:    { size: 'small', area: 'bento-slot-c' },
  d:    { size: 'small', area: 'bento-slot-d' },
  e:    { size: 'small', area: 'bento-slot-e' },
  f:    { size: 'small', area: 'bento-slot-f' },
  g:    { size: 'wide',  area: 'bento-slot-g' },
}
const SLOT_KEYS: SlotKey[] = ['hero', 'a', 'b', 'c', 'd', 'e', 'f', 'g']

// Initial assignment: which testimonial idx is in which slot (8 testimonios, índices 0-7)
const INITIAL_ASSIGNMENT: Record<SlotKey, number> = {
  hero: 0,  // María R. (Hoy)
  a: 1,     // Carlos H. (Hace 2h)
  b: 2,     // Ana G.
  c: 3,     // Rosa H.
  d: 4,     // Ester M. (Ayer)
  e: 5,     // José L.
  f: 6,     // Diego A.
  g: 7,     // Rafael S. — wide
}

export function Reviews() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [assignment, setAssignment] = useState(INITIAL_ASSIGNMENT)
  const [paused, setPaused] = useState(false)

  // Halftone cursor spotlight (section level)
  useEffect(() => {
    const sec = sectionRef.current
    if (!sec) return
    let raf = 0
    function onMove(e: MouseEvent) {
      const r = sec!.getBoundingClientRect()
      const cx = e.clientX - r.left
      const cy = e.clientY - r.top
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        sec!.style.setProperty('--cx', `${cx}px`)
        sec!.style.setProperty('--cy', `${cy}px`)
      })
    }
    function onLeave() {
      sec!.style.setProperty('--cx', `-9999px`)
      sec!.style.setProperty('--cy', `-9999px`)
    }
    sec.addEventListener('mousemove', onMove)
    sec.addEventListener('mouseleave', onLeave)
    return () => {
      sec.removeEventListener('mousemove', onMove)
      sec.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  // 3D tilt per tile
  useEffect(() => {
    const sec = sectionRef.current
    if (!sec) return
    const tiles = sec.querySelectorAll<HTMLElement>('.bento-tile')
    const cleanups: Array<() => void> = []
    tiles.forEach((tile) => {
      let raf = 0
      function onMove(e: MouseEvent) {
        const r = tile.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width
        const py = (e.clientY - r.top) / r.height
        const ry = (px - 0.5) * 8
        const rx = (0.5 - py) * 6
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(() => {
          tile.style.setProperty('--tilt-x', `${rx}deg`)
          tile.style.setProperty('--tilt-y', `${ry}deg`)
          tile.style.setProperty('--mx', `${px * 100}%`)
          tile.style.setProperty('--my', `${py * 100}%`)
        })
      }
      function onLeave() {
        tile.style.setProperty('--tilt-x', `0deg`)
        tile.style.setProperty('--tilt-y', `0deg`)
      }
      tile.addEventListener('mousemove', onMove)
      tile.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        tile.removeEventListener('mousemove', onMove)
        tile.removeEventListener('mouseleave', onLeave)
        cancelAnimationFrame(raf)
      })
    })
    return () => cleanups.forEach((c) => c())
  }, [assignment])

  // Auto-promote: every 9s, swap hero with random secondary
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      const secondaryKeys: SlotKey[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
      const pick = secondaryKeys[Math.floor(Math.random() * secondaryKeys.length)]
      promoteToHero(pick)
    }, 9000)
    return () => clearInterval(id)
  }, [paused, assignment])

  function promoteToHero(slot: SlotKey) {
    const apply = () => {
      setAssignment((prev) => {
        const next = { ...prev }
        const old = prev.hero
        next.hero = prev[slot]
        next[slot] = old
        return next
      })
    }
    type DocWithVT = Document & { startViewTransition?: (cb: () => void) => unknown }
    const d = document as DocWithVT
    if (typeof d.startViewTransition === 'function') {
      d.startViewTransition(apply)
    } else {
      apply()
    }
  }

  function onTileClick(slot: SlotKey) {
    if (slot === 'hero') return
    promoteToHero(slot)
    setPaused(true)
    setTimeout(() => setPaused(false), 9000)
  }

  return (
    <section
      ref={sectionRef}
      id="opiniones"
      className="reviews-section relative py-24 md:py-32 overflow-hidden"
    >
      {/* Halftone dot matrix */}
      <div aria-hidden className="reviews-dotmatrix" />
      <div aria-hidden className="reviews-dotmatrix-glow" />

      <div className="l2-container relative">
        {/* Header editorial */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <div className="reviews-kicker">
            <span aria-hidden className="reviews-kicker-bar" />
            <span className="reviews-kicker-text">Opiniones</span>
            <span aria-hidden className="reviews-kicker-num">06</span>
          </div>

          <h2 className="reviews-headline">
            <span className="reviews-headline-line reviews-headline-1">
              <span className="reviews-rating-accent">4.9</span> / 5
            </span>
            <span className="reviews-headline-line reviews-headline-2">
              en +400 <em>casos</em>.
            </span>
          </h2>

          <div aria-hidden className="reviews-divider" />

          <p className="reviews-meta">
            <span className="reviews-meta-stars">
              {[0, 1, 2, 3, 4].map((i) => (<Star key={i} size={11} />))}
            </span>
            <span>Verificado · Google</span>
            <span className="reviews-meta-dot" />
            <span>12 estados</span>
            <span className="reviews-meta-dot" />
            <span>2025–2026</span>
          </p>
        </div>

        {/* DESKTOP BENTO */}
        <div
          className="bento-desktop"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {SLOT_KEYS.map((slot) => {
            const tIdx = assignment[slot]
            const t = TESTIMONIALS[tIdx]
            const { size, area } = SLOTS[slot]
            return (
              <TestimonialTile
                key={`t-${tIdx}`}
                testimonial={t}
                size={size}
                slotArea={area}
                onClick={() => onTileClick(slot)}
                isClickable={slot !== 'hero'}
                showProgressBar={slot === 'hero' && !paused}
              />
            )
          })}
        </div>

        {/* MOBILE CAROUSEL */}
        <MobileCarousel paused={paused} onUserInteract={() => {
          setPaused(true)
          setTimeout(() => setPaused(false), 9000)
        }} />

        {/* Counter / status */}
        <p className="reviews-counter">
          <span className="reviews-counter-current">{TESTIMONIALS.length}</span>
          <span className="reviews-counter-label">— testimonios rotando · {paused ? 'pausa' : 'autoplay'}</span>
        </p>
      </div>

      <Styles />
    </section>
  )
}

/* ─────────── TESTIMONIAL TILE (unificado) ─────────── */

function TestimonialTile({
  testimonial: t,
  size,
  slotArea,
  onClick,
  isClickable,
  showProgressBar,
}: {
  testimonial: Testimonial
  size: TileSize
  slotArea: string
  onClick?: () => void
  isClickable: boolean
  showProgressBar?: boolean
}) {
  const Wrap = isClickable ? 'button' : 'div'
  return (
    <Wrap
      className={`bento-tile bento-tile-${size} ${slotArea} bento-color-${t.color}`}
      onClick={onClick}
      aria-label={isClickable ? `Ver testimonio de ${t.name}` : undefined}
      type={isClickable ? 'button' : undefined}
    >
      <span aria-hidden className="bento-hairline" />
      <span aria-hidden className="bento-tile-spotlight" />

      <div className="bento-inner">
        {/* PHOTO — view-transition-name aquí para morphar entre full-bleed y circular */}
        <div
          className="bento-photo"
          style={{ viewTransitionName: `photo-${t.id}` } as React.CSSProperties}
        >
          <Avatar t={t} />
        </div>

        {t.recency && (
          <span className="bento-recency">
            <span className="bento-recency-dot" /> {t.recency}
          </span>
        )}

        {/* SMALL ONLY: overlay con name + service abajo (visible solo en tile-small) */}
        <div className="bento-small-overlay">
          <p className="bento-small-name">{t.name}</p>
          <p className="bento-small-service">{t.service}</p>
        </div>

        {/* META (visible en hero + wide) */}
        <div className="bento-meta">
          <div className="bento-stars">
            {[0, 1, 2, 3, 4].map((i) => (<Star key={i} size={12} />))}
          </div>
          <p className="bento-service">{t.service}</p>
          <p className="bento-origin">{t.origin}</p>
        </div>

        {/* QUOTE (visible en hero + wide) */}
        <blockquote className="bento-quote">
          <span aria-hidden className="bento-quote-mark">&ldquo;</span>
          {t.quote}
        </blockquote>

        {/* FOOTER (visible en hero + wide) */}
        <footer className="bento-footer">
          <p className="bento-name">{t.name}</p>
          <span className="bento-year">CASO {t.year}</span>
        </footer>
      </div>

      {/* Progress bar solo en hero */}
      {showProgressBar && (
        <div aria-hidden className="bento-progress">
          <span className="bento-progress-fill" key={`pb-${t.id}`} />
        </div>
      )}
    </Wrap>
  )
}

/* ─────────── MOBILE CAROUSEL ─────────── */

function MobileCarousel({
  paused,
  onUserInteract,
}: {
  paused: boolean
  onUserInteract: () => void
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  // Auto-advance
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % TESTIMONIALS.length)
    }, 5500)
    return () => clearInterval(id)
  }, [paused])

  // Scroll to active
  useEffect(() => {
    const s = scrollerRef.current
    if (!s) return
    const target = s.children[activeIdx] as HTMLElement | undefined
    if (!target) return
    s.scrollTo({ left: target.offsetLeft - 16, behavior: 'smooth' })
  }, [activeIdx])

  // Sync activeIdx con scroll del usuario (snap-detect)
  useEffect(() => {
    const s = scrollerRef.current
    if (!s) return
    let tm = 0
    function onScroll() {
      clearTimeout(tm)
      tm = window.setTimeout(() => {
        const center = s!.scrollLeft + s!.clientWidth / 2
        const children = Array.from(s!.children) as HTMLElement[]
        let nearest = 0
        let minDist = Infinity
        children.forEach((c, i) => {
          const d = Math.abs((c.offsetLeft + c.offsetWidth / 2) - center)
          if (d < minDist) { minDist = d; nearest = i }
        })
        setActiveIdx(nearest)
      }, 120)
    }
    s.addEventListener('scroll', onScroll, { passive: true })
    return () => { s.removeEventListener('scroll', onScroll); clearTimeout(tm) }
  }, [])

  return (
    <div className="bento-mobile" onPointerDown={onUserInteract}>
      <div ref={scrollerRef} className="bento-mobile-scroller">
        {TESTIMONIALS.map((t) => (
          <article key={t.id} className={`bento-tile bento-tile-hero bento-color-${t.color} bento-mobile-card`}>
            <span aria-hidden className="bento-hairline" />
            <div className="bento-inner">
              <div className="bento-photo">
                <Avatar t={t} />
              </div>
              {t.recency && (
                <span className="bento-recency">
                  <span className="bento-recency-dot" /> {t.recency}
                </span>
              )}
              <div className="bento-small-overlay">
                <p className="bento-small-name">{t.name}</p>
                <p className="bento-small-service">{t.service}</p>
              </div>
              <div className="bento-meta">
                <div className="bento-stars">
                  {[0, 1, 2, 3, 4].map((i) => (<Star key={i} size={12} />))}
                </div>
                <p className="bento-service">{t.service}</p>
                <p className="bento-origin">{t.origin}</p>
              </div>
              <blockquote className="bento-quote">
                <span aria-hidden className="bento-quote-mark">&ldquo;</span>
                {t.quote}
              </blockquote>
              <footer className="bento-footer">
                <p className="bento-name">{t.name}</p>
                <span className="bento-year">CASO {t.year}</span>
              </footer>
            </div>
          </article>
        ))}
      </div>

      {/* Dots */}
      <div className="bento-mobile-dots" role="tablist">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            className={`bento-mobile-dot ${i === activeIdx ? 'is-active' : ''}`}
            onClick={() => setActiveIdx(i)}
            aria-label={`Testimonio ${i + 1}`}
            aria-selected={i === activeIdx}
            role="tab"
          />
        ))}
      </div>
    </div>
  )
}

/* ─────────── PRIMITIVES ─────────── */

function Avatar({ t }: { t: Testimonial }) {
  if (t.photo) {
    return (
      <img
        src={t.photo}
        alt={t.name}
        className="bento-avatar-img"
        loading="lazy"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none'
        }}
      />
    )
  }
  return <span className="bento-avatar-fallback">{t.initials}</span>
}

function Star({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="var(--c-gold)" aria-hidden>
      <path d="M6 1l1.5 3.4 3.5.3-2.6 2.4.8 3.4L6 8.7 2.8 10.5l.8-3.4-2.6-2.4 3.5-.3L6 1z" />
    </svg>
  )
}

/* ─────────── STYLES ─────────── */
function Styles() {
  return (
    <style jsx global>{`
      .reviews-section { position: relative; }

      /* ── HALFTONE BG ── */
      .reviews-dotmatrix {
        position: absolute;
        inset: 0;
        background-image: radial-gradient(circle, rgba(200,220,255,0.10) 1px, transparent 1.5px);
        background-size: 26px 26px;
        -webkit-mask: radial-gradient(ellipse 80% 70% at center, transparent 18%, rgba(0,0,0,0.55) 55%, black 85%);
        mask: radial-gradient(ellipse 80% 70% at center, transparent 18%, rgba(0,0,0,0.55) 55%, black 85%);
        pointer-events: none;
        z-index: 0;
      }
      .reviews-dotmatrix-glow {
        position: absolute;
        inset: 0;
        background-image: radial-gradient(circle, rgba(160,200,255,0.55) 1.3px, transparent 1.8px);
        background-size: 26px 26px;
        -webkit-mask: radial-gradient(circle 220px at var(--cx, -9999px) var(--cy, -9999px), black 0%, rgba(0,0,0,0.6) 40%, transparent 75%);
        mask: radial-gradient(circle 220px at var(--cx, -9999px) var(--cy, -9999px), black 0%, rgba(0,0,0,0.6) 40%, transparent 75%);
        pointer-events: none;
        z-index: 0;
        filter: drop-shadow(0 0 6px rgba(91,155,255,0.25));
      }

      /* ── HEADER editorial ── */
      .reviews-kicker { display: inline-flex; align-items: center; justify-content: center; gap: 14px; margin-bottom: 38px; }
      .reviews-kicker-bar {
        display: inline-block;
        width: 56px; height: 1px;
        background: rgba(255,255,255,0.30);
        animation: reviews-kicker-bar-in 1s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      @keyframes reviews-kicker-bar-in { from { width: 0; opacity: 0; } to { opacity: 1; } }
      .reviews-kicker-text {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10.5px; font-weight: 500;
        letter-spacing: 0.35em; text-transform: uppercase;
        color: rgba(255,255,255,0.55);
      }
      .reviews-kicker-num {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10.5px; letter-spacing: 0.18em;
        color: rgba(255,255,255,0.28); font-variant-numeric: tabular-nums;
      }
      .reviews-headline {
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-size: clamp(2.4rem, 5.8vw, 4.6rem);
        line-height: 0.96; letter-spacing: -0.045em; font-weight: 500;
        color: rgba(255,255,255,0.96);
        display: flex; flex-direction: column;
        font-variation-settings: 'wdth' 95;
      }
      .reviews-headline-line { display: block; animation: reviews-headline-in 0.95s cubic-bezier(0.16, 1, 0.3, 1) both; }
      .reviews-headline-1 { animation-delay: 0.05s; }
      .reviews-rating-accent { color: var(--c-gold); font-variation-settings: 'wdth' 90; }
      .reviews-headline-2 { animation-delay: 0.18s; color: var(--c-blue); }
      .reviews-headline-2 em {
        font-style: italic; font-weight: 400;
        font-variation-settings: 'wdth' 90; margin: 0 -0.02em;
      }
      @keyframes reviews-headline-in {
        from { opacity: 0; transform: translateY(14px); filter: blur(6px); }
        to   { opacity: 1; transform: translateY(0); filter: blur(0); }
      }
      .reviews-divider {
        margin: 28px auto 18px;
        width: 32px; height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent);
      }
      .reviews-meta {
        display: inline-flex; align-items: center; justify-content: center;
        gap: 14px;
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
        color: rgba(255,255,255,0.42); flex-wrap: wrap;
      }
      .reviews-meta-stars { display: inline-flex; gap: 1px; margin-right: 4px; }
      .reviews-meta-dot { width: 2px; height: 2px; border-radius: 50%; background: rgba(255,255,255,0.30); }

      /* ═════════════ DESKTOP BENTO ═════════════ */
      .bento-desktop {
        position: relative;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(3, minmax(190px, 220px));
        grid-auto-rows: 220px;
        gap: 14px;
        max-width: 1180px;
        margin: 0 auto;
        z-index: 2;
        perspective: 1400px;
      }
      @media (max-width: 900px) {
        .bento-desktop { display: none; }
      }

      .bento-slot-hero { grid-column: 1 / span 2; grid-row: 1 / span 2; }
      .bento-slot-a    { grid-column: 3; grid-row: 1; }
      .bento-slot-b    { grid-column: 4; grid-row: 1; }
      .bento-slot-c    { grid-column: 3; grid-row: 2; }
      .bento-slot-d    { grid-column: 4; grid-row: 2; }
      .bento-slot-e    { grid-column: 1; grid-row: 3; }
      .bento-slot-f    { grid-column: 2; grid-row: 3; }
      .bento-slot-g    { grid-column: 3 / span 2; grid-row: 3; }

      /* ── TILE BASE (Liquid Glass + tilt + float) ── */
      .bento-tile {
        position: relative;
        border-radius: 22px;
        background:
          linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%),
          rgba(18,18,22,0.55);
        backdrop-filter: blur(28px) saturate(150%);
        -webkit-backdrop-filter: blur(28px) saturate(150%);
        border: 1px solid rgba(255,255,255,0.10);
        box-shadow:
          0 30px 60px -22px rgba(0,0,0,0.5),
          0 1px 0 rgba(255,255,255,0.07) inset;
        overflow: hidden;
        padding: 0;
        text-align: left;
        color: rgba(255,255,255,0.96);
        font: inherit;
        transform-style: preserve-3d;
        transform: rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
        translate: 0 0;
        transition:
          transform 0.55s cubic-bezier(0.16, 1, 0.3, 1),
          border-color 0.4s ease,
          box-shadow 0.4s ease;
        animation: bento-float 10s ease-in-out infinite;
        will-change: transform, translate;
      }
      button.bento-tile { cursor: pointer; }
      div.bento-tile { cursor: default; }
      @keyframes bento-float {
        0%, 100% { translate: 0 0; }
        50%      { translate: 0 -5px; }
      }
      .bento-slot-hero { animation-delay: -2.5s; animation-duration: 11s; }
      .bento-slot-a    { animation-delay: -1.2s; animation-duration: 8.5s; }
      .bento-slot-b    { animation-delay: -4.8s; animation-duration: 9.7s; }
      .bento-slot-c    { animation-delay: -0.4s; animation-duration: 10.3s; }
      .bento-slot-d    { animation-delay: -6.1s; animation-duration: 8.9s; }
      .bento-slot-e    { animation-delay: -3.6s; animation-duration: 9.2s; }
      .bento-slot-f    { animation-delay: -5.4s; animation-duration: 10.8s; }
      .bento-slot-g    { animation-delay: -7.3s; animation-duration: 11.5s; }

      button.bento-tile:hover {
        border-color: rgba(255,255,255,0.20);
        transform: perspective(1200px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) translateZ(20px);
        z-index: 6;
      }
      .bento-color-blue:hover   { box-shadow: 0 36px 70px -22px rgba(91,155,255,0.35),  0 1px 0 rgba(255,255,255,0.10) inset; }
      .bento-color-green:hover  { box-shadow: 0 36px 70px -22px rgba(34,255,160,0.30),  0 1px 0 rgba(255,255,255,0.10) inset; }
      .bento-color-red:hover    { box-shadow: 0 36px 70px -22px rgba(255,77,109,0.30),  0 1px 0 rgba(255,255,255,0.10) inset; }
      .bento-color-gold:hover   { box-shadow: 0 36px 70px -22px rgba(242,178,52,0.32),  0 1px 0 rgba(255,255,255,0.10) inset; }
      .bento-color-purple:hover { box-shadow: 0 36px 70px -22px rgba(168,85,247,0.30),  0 1px 0 rgba(255,255,255,0.10) inset; }

      /* Hairline & spotlight */
      .bento-hairline {
        position: absolute;
        top: 0; left: 12%; right: 12%;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
        pointer-events: none;
        z-index: 5;
      }
      .bento-tile-spotlight {
        position: absolute;
        inset: 0;
        border-radius: 22px;
        pointer-events: none;
        opacity: 0;
        background: radial-gradient(
          circle 240px at var(--mx, 50%) var(--my, 50%),
          rgba(255,255,255,0.08) 0%,
          transparent 60%
        );
        transition: opacity 0.4s ease;
        z-index: 3;
      }
      button.bento-tile:hover .bento-tile-spotlight { opacity: 1; }
      .bento-color-blue:hover .bento-tile-spotlight   { background: radial-gradient(circle 260px at var(--mx, 50%) var(--my, 50%), rgba(91,155,255,0.16), transparent 60%); }
      .bento-color-green:hover .bento-tile-spotlight  { background: radial-gradient(circle 260px at var(--mx, 50%) var(--my, 50%), rgba(34,255,160,0.14), transparent 60%); }
      .bento-color-red:hover .bento-tile-spotlight    { background: radial-gradient(circle 260px at var(--mx, 50%) var(--my, 50%), rgba(255,77,109,0.14), transparent 60%); }
      .bento-color-gold:hover .bento-tile-spotlight   { background: radial-gradient(circle 260px at var(--mx, 50%) var(--my, 50%), rgba(242,178,52,0.15), transparent 60%); }
      .bento-color-purple:hover .bento-tile-spotlight { background: radial-gradient(circle 260px at var(--mx, 50%) var(--my, 50%), rgba(168,85,247,0.15), transparent 60%); }

      /* ─── INNER LAYOUT — adapta según size class ─── */
      .bento-inner {
        position: relative;
        height: 100%;
        z-index: 2;
      }

      /* HERO mode: grid con foto circular + meta + quote + footer */
      .bento-tile-hero .bento-inner {
        display: grid;
        grid-template-areas:
          "photo meta"
          "quote quote"
          "footer footer";
        grid-template-columns: auto 1fr;
        grid-template-rows: auto 1fr auto;
        gap: 14px;
        padding: 24px 26px 22px;
      }

      /* WIDE mode: grid horizontal con foto izquierda + texto derecha */
      .bento-tile-wide .bento-inner {
        display: grid;
        grid-template-areas:
          "photo meta"
          "photo quote"
          "photo footer";
        grid-template-columns: auto 1fr;
        grid-template-rows: auto 1fr auto;
        gap: 8px 16px;
        padding: 16px 20px;
        align-items: start;
      }

      /* SMALL mode: foto full-bleed + overlay nombre/service abajo */
      .bento-tile-small .bento-inner {
        padding: 0;
        display: block;
      }

      .bento-meta   { grid-area: meta; min-width: 0; align-self: center; }
      .bento-quote  { grid-area: quote; }
      .bento-footer { grid-area: footer; }

      /* En small mode, todo lo que no sea foto+overlay se oculta */
      .bento-tile-small .bento-meta,
      .bento-tile-small .bento-quote,
      .bento-tile-small .bento-footer { display: none; }

      /* Small overlay solo visible en small */
      .bento-small-overlay { display: none; }
      .bento-tile-small .bento-small-overlay {
        display: block;
        position: absolute;
        left: 0; right: 0; bottom: 0;
        padding: 14px 16px 14px;
        background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.78) 100%);
        z-index: 4;
      }
      .bento-small-name {
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-size: 15px;
        font-weight: 600;
        letter-spacing: -0.01em;
        color: #fff;
        line-height: 1.15;
      }
      .bento-small-service {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 9.5px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.72);
        margin-top: 4px;
      }

      /* ─── PHOTO ─── */
      .bento-photo {
        position: relative;
        overflow: hidden;
      }
      .bento-tile-small .bento-photo {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        border-radius: 0;
      }
      .bento-tile-wide .bento-photo {
        grid-area: photo;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        align-self: center;
      }
      .bento-tile-hero .bento-photo {
        grid-area: photo;
        width: 84px;
        height: 84px;
        border-radius: 50%;
      }

      .bento-avatar-img,
      .bento-avatar-fallback {
        width: 100%; height: 100%;
        display: flex; align-items: center; justify-content: center;
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-weight: 700; color: #fafafa;
        object-fit: cover;
      }
      .bento-tile-hero .bento-avatar-img,
      .bento-tile-hero .bento-avatar-fallback,
      .bento-tile-wide .bento-avatar-img,
      .bento-tile-wide .bento-avatar-fallback {
        border-radius: 50%;
        border: 1.5px solid rgba(255,255,255,0.18);
      }
      .bento-tile-hero .bento-avatar-img,
      .bento-tile-hero .bento-avatar-fallback {
        border-width: 2px;
      }
      .bento-tile-small .bento-avatar-fallback { font-size: clamp(2.5rem, 5vw, 4rem); letter-spacing: -0.04em; }
      .bento-tile-wide  .bento-avatar-fallback { font-size: 20px; }
      .bento-tile-hero  .bento-avatar-fallback { font-size: 28px; }
      .bento-color-blue   .bento-avatar-fallback { background: linear-gradient(135deg, #5b9bff, #2a5fb8); }
      .bento-color-green  .bento-avatar-fallback { background: linear-gradient(135deg, #22ffa0, #0a7548); }
      .bento-color-red    .bento-avatar-fallback { background: linear-gradient(135deg, #ff4d6d, #a31a39); }
      .bento-color-gold   .bento-avatar-fallback { background: linear-gradient(135deg, #f2b234, #b07a10); }
      .bento-color-purple .bento-avatar-fallback { background: linear-gradient(135deg, #c084fc, #6f42c1); }

      .bento-recency {
        position: absolute;
        display: inline-flex; align-items: center; gap: 4px;
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase;
        font-weight: 600;
        padding: 3px 7px;
        border-radius: 999px;
        background: rgba(34, 255, 160, 0.14);
        border: 1px solid rgba(34, 255, 160, 0.36);
        color: #6effc7;
        white-space: nowrap;
        backdrop-filter: blur(8px);
        z-index: 5;
      }
      .bento-tile-hero .bento-recency,
      .bento-tile-wide .bento-recency {
        bottom: auto; top: auto;
      }
      .bento-tile-hero .bento-recency { top: 22px; right: 22px; }
      .bento-tile-wide .bento-recency { top: 14px; right: 14px; }
      .bento-tile-small .bento-recency {
        top: 10px;
        right: 10px;
        font-size: 8.5px;
        padding: 3px 6px;
      }
      .bento-recency-dot {
        width: 5px; height: 5px;
        background: var(--c-green);
        border-radius: 50%;
        box-shadow: 0 0 4px var(--c-green);
        animation: bento-recency-pulse 1.4s ease-in-out infinite;
      }
      @keyframes bento-recency-pulse { 0%,100% { opacity:1 } 50% { opacity:0.45 } }

      /* ─── META (stars/service/origin) ─── */
      .bento-stars { display: inline-flex; gap: 2px; margin-bottom: 4px; }
      .bento-tile-small .bento-stars { display: none; }
      .bento-tile-wide  .bento-stars { margin-bottom: 3px; }
      .bento-service {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10.5px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.62);
        line-height: 1.3;
      }
      .bento-tile-small .bento-service { font-size: 9.5px; letter-spacing: 0.14em; color: rgba(255,255,255,0.55); }
      .bento-origin {
        font-size: 12px;
        color: rgba(255,255,255,0.45);
        margin-top: 4px;
      }
      .bento-tile-small .bento-origin { display: none; }
      .bento-tile-wide  .bento-origin { font-size: 11px; }

      /* ─── QUOTE ─── */
      .bento-quote {
        position: relative;
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        line-height: 1.45;
        font-weight: 400;
        letter-spacing: -0.014em;
        color: rgba(255,255,255,0.92);
        margin: 0;
        animation: bento-quote-in 0.45s cubic-bezier(0.16, 1, 0.3, 1);
      }
      @keyframes bento-quote-in {
        from { opacity: 0; transform: translateY(6px); filter: blur(4px); }
        to   { opacity: 1; transform: translateY(0); filter: blur(0); }
      }
      .bento-tile-small .bento-quote { display: none; }
      .bento-tile-wide .bento-quote {
        font-size: 13.5px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .bento-tile-hero .bento-quote {
        font-size: clamp(15px, 1.6vw, 18px);
      }
      .bento-quote-mark {
        position: absolute;
        top: -28px; left: -6px;
        font-family: var(--font-display, 'Bricolage Grotesque', serif);
        font-size: 64px;
        line-height: 1;
        color: currentColor;
        opacity: 0.18;
        font-weight: 700;
      }
      .bento-color-blue   .bento-quote-mark { color: var(--c-blue); }
      .bento-color-green  .bento-quote-mark { color: var(--c-green); }
      .bento-color-red    .bento-quote-mark { color: var(--c-red); }
      .bento-color-gold   .bento-quote-mark { color: var(--c-gold); }
      .bento-color-purple .bento-quote-mark { color: #a855f7; }
      .bento-tile-wide .bento-quote-mark,
      .bento-tile-small .bento-quote-mark { display: none; }

      /* ─── FOOTER ─── */
      .bento-footer {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 12px;
        padding-top: 10px;
        border-top: 1px solid rgba(255,255,255,0.08);
        align-self: end;
      }
      .bento-tile-hero .bento-footer { padding-top: 14px; }
      .bento-name {
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-weight: 600;
        letter-spacing: -0.01em;
      }
      .bento-tile-small .bento-name { font-size: 13px; }
      .bento-tile-wide  .bento-name { font-size: 14px; }
      .bento-tile-hero  .bento-name { font-size: 16px; }
      .bento-year {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10px;
        letter-spacing: 0.2em;
        color: rgba(255,255,255,0.4);
      }
      .bento-tile-small .bento-year { display: none; }

      /* ─── PROGRESS BAR (hero only) ─── */
      .bento-progress {
        position: absolute;
        bottom: 0; left: 0; right: 0;
        height: 2px;
        background: rgba(255,255,255,0.04);
        z-index: 4;
      }
      .bento-progress-fill {
        display: block;
        height: 100%;
        background: linear-gradient(90deg, currentColor, transparent);
        transform-origin: left;
        animation: bento-progress-grow 9s linear forwards;
      }
      @keyframes bento-progress-grow {
        from { transform: scaleX(0); }
        to   { transform: scaleX(1); }
      }
      .bento-color-blue   .bento-progress-fill { color: var(--c-blue); }
      .bento-color-green  .bento-progress-fill { color: var(--c-green); }
      .bento-color-red    .bento-progress-fill { color: var(--c-red); }
      .bento-color-gold   .bento-progress-fill { color: var(--c-gold); }
      .bento-color-purple .bento-progress-fill { color: #a855f7; }

      /* ═════════════ VIEW TRANSITIONS (hero swap morph) ═════════════ */
      ::view-transition-group(*) {
        animation-duration: 0.65s;
        animation-timing-function: cubic-bezier(0.32, 0.72, 0, 1);
      }
      ::view-transition-old(*),
      ::view-transition-new(*) {
        animation-duration: 0.5s;
        animation-timing-function: cubic-bezier(0.32, 0.72, 0, 1);
      }

      /* ═════════════ MOBILE CAROUSEL ═════════════ */
      .bento-mobile {
        display: none;
        position: relative;
        margin: 0 -16px;
      }
      @media (max-width: 900px) {
        .bento-mobile { display: block; }
      }
      .bento-mobile-scroller {
        display: flex;
        gap: 12px;
        padding: 8px 16px 24px;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        -webkit-overflow-scrolling: touch;
      }
      .bento-mobile-scroller::-webkit-scrollbar { display: none; }
      .bento-mobile-card {
        flex: 0 0 88vw;
        max-width: 480px;
        scroll-snap-align: center;
        scroll-snap-stop: always;
        min-height: 360px;
        animation: none !important; /* desactivar float en mobile (no se aprecia) */
        translate: 0 0 !important;
      }
      .bento-mobile-dots {
        display: flex;
        justify-content: center;
        gap: 6px;
        padding: 4px 16px 0;
      }
      .bento-mobile-dot {
        width: 6px;
        height: 6px;
        border-radius: 999px;
        background: rgba(255,255,255,0.20);
        border: none;
        padding: 0;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      .bento-mobile-dot.is-active {
        background: var(--c-blue);
        width: 22px;
        box-shadow: 0 0 8px rgba(91,155,255,0.5);
      }

      /* ── COUNTER ── */
      .reviews-counter {
        margin-top: 28px;
        text-align: center;
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10.5px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.4);
      }
      .reviews-counter-current {
        color: var(--c-blue);
        font-weight: 600;
        font-variant-numeric: tabular-nums;
        margin-right: 6px;
      }
      .reviews-counter-label {
        opacity: 0.55;
        font-style: italic;
        text-transform: lowercase;
        letter-spacing: 0.05em;
      }

      @media (prefers-reduced-motion: reduce) {
        .bento-tile,
        .bento-recency-dot,
        .bento-progress-fill,
        .reviews-kicker-bar,
        .reviews-headline-line { animation: none !important; }
        .bento-tile:hover { transform: none !important; }
        ::view-transition-group(*),
        ::view-transition-old(*),
        ::view-transition-new(*) { animation-duration: 0.01s !important; }
      }
    `}</style>
  )
}
