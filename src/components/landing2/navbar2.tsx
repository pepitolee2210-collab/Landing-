'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { SITE } from '@/lib/site'
import { whatsappUrl } from '@/lib/utils'

const NAV_LINKS = [
  { href: '#productos', label: 'Catálogo' },
  { href: '#planes', label: 'Planes' },
  { href: '#que-es', label: 'Por qué' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#opiniones', label: 'Opiniones' },
  { href: '#faq', label: 'FAQ' },
]

export function Navbar2() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let raf = 0
    let idleTimer: number | undefined
    const html = document.documentElement
    const onScroll = () => {
      // Toggle .is-scrolling — CSS pausa animaciones mobile para que scroll fluya
      html.classList.add('is-scrolling')
      if (idleTimer !== undefined) window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => html.classList.remove('is-scrolling'), 140)

      // rAF-throttled state update (1 update por frame max)
      if (raf) return
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 16)
        raf = 0
      })
    }
    setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
      if (idleTimer !== undefined) window.clearTimeout(idleTimer)
      html.classList.remove('is-scrolling')
    }
  }, [])

  // Block scroll cuando mobile menu abierto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [open])

  return (
    <>
      <header className={`nav2-header ${scrolled ? 'nav2-scrolled' : ''}`}>
        <div className="l2-container nav2-row">
          {/* BRAND */}
          <Link href="/" className="nav2-brand" aria-label="UsaLatinoPrime — inicio">
            <BrandMark />
            <span className="nav2-brand-text">
              <span className="nav2-brand-name">UsaLatino</span>
              <span className="nav2-brand-accent">·Prime</span>
            </span>
          </Link>

          {/* PILL NAV (desktop) */}
          <nav className="nav2-pill" aria-label="Navegación principal">
            <span aria-hidden className="nav2-pill-hairline" />
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="nav2-link">
                <span className="nav2-link-text">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="nav2-actions">
            {/* Live trust chip */}
            <span className="nav2-live" aria-label="Personas activas hoy">
              <span aria-hidden className="nav2-live-dot" />
              <span className="nav2-live-num">247</span>
              <span className="nav2-live-label">hoy</span>
            </span>

            {/* WhatsApp icon button */}
            <a
              href={whatsappUrl(SITE.contact.whatsapp, 'Hola, quiero información sobre los servicios.')}
              target="_blank"
              rel="noopener noreferrer"
              className="nav2-wa-btn"
              aria-label="Contactar por WhatsApp"
              title="WhatsApp con Vanessa"
            >
              <WhatsappIcon />
            </a>

            {/* Comprar CTA con shimmer borde */}
            <Link href="#productos" className="nav2-cta">
              <span aria-hidden className="nav2-cta-shimmer" />
              <span className="nav2-cta-text">Ver catálogo</span>
              <svg className="nav2-cta-arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
                <path d="M1 5h11M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {/* Burger mobile */}
            <button
              type="button"
              className="nav2-burger"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
            >
              <span className={`nav2-burger-line ${open ? 'is-open' : ''}`} />
              <span className={`nav2-burger-line ${open ? 'is-open' : ''}`} />
              <span className={`nav2-burger-line ${open ? 'is-open' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU FULLSCREEN */}
      <div className={`nav2-mobile ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="nav2-mobile-inner">
          <nav className="nav2-mobile-nav" aria-label="Navegación mobile">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="nav2-mobile-link"
                style={{ animationDelay: `${0.08 + i * 0.05}s` } as React.CSSProperties}
              >
                <span className="nav2-mobile-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="nav2-mobile-label">{link.label}</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M5 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </Link>
            ))}
          </nav>

          <div className="nav2-mobile-footer">
            <a
              href={whatsappUrl(SITE.contact.whatsapp, 'Hola, quiero información sobre los servicios.')}
              target="_blank"
              rel="noopener noreferrer"
              className="nav2-mobile-wa"
              onClick={() => setOpen(false)}
            >
              <WhatsappIcon />
              <span>WhatsApp con Vanessa</span>
            </a>
            <Link href="#productos" onClick={() => setOpen(false)} className="nav2-mobile-cta">
              Ver catálogo
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
                <path d="M1 5h11M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <Styles />
    </>
  )
}

function BrandMark() {
  return (
    <span className="nav2-mark">
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden>
        <defs>
          <linearGradient id="ulp-mark-grad" x1="0" y1="0" x2="32" y2="32">
            <stop offset="0%" stopColor="#5b9bff" />
            <stop offset="50%" stopColor="#22ffa0" />
            <stop offset="100%" stopColor="#f2b234" />
          </linearGradient>
        </defs>
        <rect
          x="2.5" y="2.5" width="27" height="27" rx="8"
          stroke="url(#ulp-mark-grad)"
          strokeWidth="1.6"
          fill="rgba(91,155,255,0.06)"
        />
        {/* arrow upward = "Prime" / ascenso */}
        <path
          d="M11 18l5-5 5 5"
          stroke="url(#ulp-mark-grad)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="22" r="1.5" fill="#5b9bff" />
      </svg>
    </span>
  )
}

function WhatsappIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.1-.7.9-.9 1.1-.3.2-.6.1c-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.8-1.6-2.1-.2-.3 0-.4.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.5s-.6-1.4-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.8.4s-1 1-1 2.5 1 2.9 1.2 3.1.2 2.9 4.3 4.1 4.1 1 4.8.9 1.6-.7 1.9-1.3c.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5-1.4c1.4.8 3.1 1.3 5 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.7 0-3.3-.5-4.7-1.3l-.3-.2-3.4 1 1-3.3-.2-.3C3.5 14.4 3 13.2 3 12c0-5 4-9 9-9s9 4 9 9-4 9-9 9z" />
    </svg>
  )
}

function Styles() {
  return (
    <style jsx global>{`
      /* ── HEADER container ── */
      .nav2-header {
        position: sticky;
        top: 0;
        z-index: 50;
        transition: background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease;
        background: transparent;
        border-bottom: 1px solid transparent;
      }
      .nav2-scrolled {
        background: rgba(8, 8, 10, 0.72);
        backdrop-filter: blur(20px) saturate(150%);
        -webkit-backdrop-filter: blur(20px) saturate(150%);
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      }
      .nav2-row {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 12px 0;
      }

      /* ── BRAND ── */
      .nav2-brand {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        flex-shrink: 0;
      }
      .nav2-mark {
        display: inline-block;
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease;
      }
      .nav2-brand:hover .nav2-mark {
        transform: scale(1.08) rotate(-3deg);
        filter: drop-shadow(0 0 12px rgba(91, 155, 255, 0.4));
      }
      .nav2-brand-text {
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-size: 17px;
        font-weight: 700;
        letter-spacing: -0.025em;
        color: var(--c-fg, #fafafa);
        font-variation-settings: 'wdth' 95;
      }
      .nav2-brand-accent {
        color: var(--c-blue);
        font-weight: 600;
      }

      /* ── PILL NAV (desktop) ── */
      .nav2-pill {
        display: none;
        margin: 0 auto;
        padding: 4px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(18px) saturate(160%);
        -webkit-backdrop-filter: blur(18px) saturate(160%);
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow:
          0 12px 30px -12px rgba(0, 0, 0, 0.4),
          inset 0 1px 0 rgba(255, 255, 255, 0.06);
        position: relative;
        overflow: hidden;
      }
      @media (min-width: 1024px) {
        .nav2-pill { display: inline-flex; align-items: center; gap: 2px; }
      }
      .nav2-pill-hairline {
        position: absolute;
        top: 0; left: 14%; right: 14%;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.30), transparent);
        pointer-events: none;
      }
      .nav2-link {
        position: relative;
        padding: 8px 14px;
        font-size: 13px;
        font-weight: 500;
        letter-spacing: -0.005em;
        color: rgba(255, 255, 255, 0.62);
        border-radius: 999px;
        transition: color 0.25s ease;
      }
      .nav2-link::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.07);
        opacity: 0;
        transform: scale(0.85);
        transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 0;
      }
      .nav2-link:hover {
        color: rgba(255, 255, 255, 0.96);
      }
      .nav2-link:hover::before {
        opacity: 1;
        transform: scale(1);
      }
      .nav2-link-text { position: relative; z-index: 1; }

      /* ── ACTIONS ── */
      .nav2-actions {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-left: auto;
        flex-shrink: 0;
      }

      /* Live chip */
      .nav2-live {
        display: none;
        align-items: center;
        gap: 6px;
        padding: 5px 10px 5px 8px;
        border-radius: 999px;
        background: rgba(34, 255, 160, 0.06);
        border: 1px solid rgba(34, 255, 160, 0.22);
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 11px;
        letter-spacing: 0.06em;
        color: #6effc7;
      }
      @media (min-width: 768px) {
        .nav2-live { display: inline-flex; }
      }
      .nav2-live-dot {
        width: 6px;
        height: 6px;
        background: var(--c-green);
        border-radius: 50%;
        box-shadow: 0 0 6px var(--c-green), 0 0 12px rgba(34, 255, 160, 0.4);
        animation: nav2-live-pulse 1.6s ease-in-out infinite;
      }
      @keyframes nav2-live-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%      { opacity: 0.45; transform: scale(0.85); }
      }
      .nav2-live-num {
        font-weight: 600;
        font-variant-numeric: tabular-nums;
      }
      .nav2-live-label {
        opacity: 0.65;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 9.5px;
      }

      /* WhatsApp icon button */
      .nav2-wa-btn {
        display: none;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(37, 211, 102, 0.10);
        border: 1px solid rgba(37, 211, 102, 0.25);
        color: #25d366;
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      }
      @media (min-width: 640px) {
        .nav2-wa-btn { display: inline-flex; }
      }
      .nav2-wa-btn:hover {
        background: rgba(37, 211, 102, 0.18);
        border-color: rgba(37, 211, 102, 0.45);
        transform: translateY(-1px) scale(1.05);
        box-shadow: 0 6px 16px -6px rgba(37, 211, 102, 0.5);
      }

      /* CTA Comprar — pill con shimmer borde */
      .nav2-cta {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 9px 16px 9px 18px;
        border-radius: 999px;
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-size: 13px;
        font-weight: 600;
        letter-spacing: -0.008em;
        color: #fff;
        background: linear-gradient(135deg, #5b9bff 0%, #6f42c1 100%);
        box-shadow:
          0 8px 22px -6px rgba(91, 155, 255, 0.55),
          inset 0 1px 0 rgba(255, 255, 255, 0.18);
        overflow: hidden;
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
      }
      .nav2-cta:hover {
        transform: translateY(-1px);
        box-shadow:
          0 12px 28px -6px rgba(91, 155, 255, 0.65),
          inset 0 1px 0 rgba(255, 255, 255, 0.22);
      }
      .nav2-cta:hover .nav2-cta-arrow {
        transform: translateX(3px);
      }
      .nav2-cta-text {
        position: relative;
        z-index: 1;
      }
      .nav2-cta-arrow {
        position: relative;
        z-index: 1;
        transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
      }
      /* Shimmer sweep arriba (light beam Apple-style) */
      .nav2-cta-shimmer {
        position: absolute;
        top: 0; left: -100%;
        width: 60%;
        height: 100%;
        background: linear-gradient(110deg, transparent 30%, rgba(255, 255, 255, 0.28) 50%, transparent 70%);
        animation: nav2-cta-sweep 4.5s ease-in-out infinite;
        pointer-events: none;
      }
      @keyframes nav2-cta-sweep {
        0%, 100% { transform: translateX(0); opacity: 0; }
        25%      { opacity: 1; }
        50%      { transform: translateX(380%); opacity: 1; }
        75%      { opacity: 0; }
      }

      /* ── BURGER MOBILE ── */
      .nav2-burger {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
        width: 36px;
        height: 36px;
        border-radius: 10px;
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.10);
        cursor: pointer;
        transition: background 0.25s, border-color 0.25s;
      }
      .nav2-burger:hover {
        background: rgba(255, 255, 255, 0.04);
        border-color: rgba(255, 255, 255, 0.18);
      }
      @media (min-width: 1024px) {
        .nav2-burger { display: none; }
      }
      .nav2-burger-line {
        width: 16px;
        height: 1.5px;
        background: rgba(255, 255, 255, 0.85);
        border-radius: 999px;
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s;
        transform-origin: center;
      }
      .nav2-burger-line:nth-child(1).is-open { transform: translateY(5.5px) rotate(45deg); }
      .nav2-burger-line:nth-child(2).is-open { opacity: 0; }
      .nav2-burger-line:nth-child(3).is-open { transform: translateY(-5.5px) rotate(-45deg); }

      /* ── MOBILE MENU FULLSCREEN ── */
      .nav2-mobile {
        position: fixed;
        inset: 0;
        z-index: 49;
        background: rgba(6, 6, 8, 0.88);
        backdrop-filter: blur(24px) saturate(180%);
        -webkit-backdrop-filter: blur(24px) saturate(180%);
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.4s ease, visibility 0.4s ease;
      }
      .nav2-mobile.is-open {
        opacity: 1;
        visibility: visible;
      }
      .nav2-mobile-inner {
        position: absolute;
        inset: 70px 24px 24px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .nav2-mobile-nav {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .nav2-mobile-link {
        display: flex;
        align-items: center;
        gap: 18px;
        padding: 18px 8px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        color: rgba(255, 255, 255, 0.92);
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-size: 22px;
        font-weight: 500;
        letter-spacing: -0.025em;
        opacity: 0;
        transform: translateY(12px);
      }
      .nav2-mobile.is-open .nav2-mobile-link {
        animation: nav2-mobile-link-in 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      @keyframes nav2-mobile-link-in {
        from { opacity: 0; transform: translateY(14px); filter: blur(4px); }
        to   { opacity: 1; transform: translateY(0); filter: blur(0); }
      }
      .nav2-mobile-num {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 11px;
        letter-spacing: 0.18em;
        color: var(--c-blue);
        font-weight: 600;
      }
      .nav2-mobile-label {
        flex: 1;
      }
      .nav2-mobile-link:active {
        background: rgba(255, 255, 255, 0.04);
      }
      .nav2-mobile-footer {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .nav2-mobile-wa {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 14px;
        border-radius: 14px;
        background: rgba(37, 211, 102, 0.12);
        border: 1px solid rgba(37, 211, 102, 0.30);
        color: #25d366;
        font-size: 14px;
        font-weight: 600;
      }
      .nav2-mobile-cta {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 16px;
        border-radius: 14px;
        background: linear-gradient(135deg, #5b9bff 0%, #6f42c1 100%);
        color: #fff;
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-size: 15px;
        font-weight: 700;
        letter-spacing: -0.01em;
        box-shadow: 0 12px 24px -6px rgba(91, 155, 255, 0.55);
      }

      @media (prefers-reduced-motion: reduce) {
        .nav2-cta-shimmer,
        .nav2-live-dot,
        .nav2-mobile-link { animation: none !important; }
      }
    `}</style>
  )
}
