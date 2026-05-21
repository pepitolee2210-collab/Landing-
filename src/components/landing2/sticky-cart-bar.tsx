'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export function StickyCartBar() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const showAfter = window.innerHeight * 1.4
      setVisible(window.scrollY > showAfter)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (dismissed) return null

  return (
    <div
      aria-hidden={!visible}
      className={`fixed bottom-3 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 w-[min(720px,calc(100vw-1.5rem))] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      <div
        className="flex items-center gap-3 py-2.5 px-3 rounded-2xl sticky-cart-bg"
        style={{
          background: 'rgba(20, 20, 20, 0.95)',
          border: '1px solid var(--c-line-3)',
          boxShadow: '0 24px 48px -16px rgba(0,0,0,0.6), 0 0 0 1px rgba(91,155,255,0.16) inset',
        }}
      >
        <div
          className="hidden sm:flex w-9 h-9 items-center justify-center rounded-lg flex-shrink-0"
          style={{
            background: 'rgba(91,155,255,0.12)',
            border: '1px solid rgba(91,155,255,0.30)',
          }}
        >
          <Sparkle />
        </div>

        <div className="flex-1 min-w-0">
          <p
            className="l2-display text-sm md:text-base text-[var(--c-fg)] truncate"
            style={{ fontWeight: 600 }}
          >
            Visa Juvenil · <span style={{ color: 'var(--c-blue)' }}>desde $2,500</span>
          </p>
          <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.1em] text-[var(--c-fg-3)] truncate">
            10 × $250/mes · 6 cupos esta semana
          </p>
        </div>

        <Link href="#planes" className="l2-btn l2-btn-blue !py-2 !px-4 text-xs">
          Comprar
        </Link>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="w-7 h-7 rounded-md flex items-center justify-center text-[var(--c-fg-3)] hover:text-[var(--c-fg)] hover:bg-white/5 transition-colors flex-shrink-0"
          aria-label="Cerrar"
        >
          <svg width="13" height="13" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function Sparkle() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 1l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z"
        fill="var(--c-blue)"
      />
    </svg>
  )
}
