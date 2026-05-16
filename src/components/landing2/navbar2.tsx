'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/site/logo'

const NAV_LINKS = [
  { href: '/landing2#productos', label: 'Productos' },
  { href: '/landing2#como-funciona', label: 'Cómo funciona' },
  { href: '/landing2#opiniones', label: 'Opiniones' },
  { href: '/landing2#faq', label: 'Preguntas' },
]

export function Navbar2() {
  const [scrolled, setScrolled] = useState(false)
  const [cartCount] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-[var(--color-line)] backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
      style={{
        background: scrolled
          ? 'color-mix(in oklab, var(--color-bg) 82%, transparent)'
          : 'transparent',
      }}
    >
      <div className="container-x flex items-center justify-between py-3.5">
        <Link href="/" className="inline-block">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="link-tech text-sm font-medium">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Search */}
          <button
            type="button"
            className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/5 transition-colors"
            aria-label="Buscar"
          >
            <SearchIcon />
          </button>

          {/* Account */}
          <a
            href="https://app.usalatinoprime.com"
            className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/5 transition-colors"
            aria-label="Mi cuenta"
          >
            <UserIcon />
          </a>

          {/* Cart */}
          <button
            type="button"
            className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--color-line-2)] hover:border-[var(--color-gold)] transition-colors group"
            aria-label="Carrito"
          >
            <CartIcon />
            <span className="text-xs font-mono uppercase tracking-[0.15em] text-[var(--color-text-2)] group-hover:text-[var(--color-text)]">
              Carrito
            </span>
            {cartCount > 0 ? (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-mono font-bold flex items-center justify-center"
                style={{ background: 'var(--color-red)', color: '#fff' }}
              >
                {cartCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </header>
  )
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 14l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3.5 17c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M2 3h2.5l1.5 11h10l1.5-7h-12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="17" r="1" fill="currentColor" />
      <circle cx="15" cy="17" r="1" fill="currentColor" />
    </svg>
  )
}
