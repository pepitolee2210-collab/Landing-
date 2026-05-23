'use client'

import { useState } from 'react'
import { Inter_Tight, JetBrains_Mono } from 'next/font/google'
import 'material-symbols/outlined.css'
import { DemoPlayer } from './demo-player/demo-player'
import { getDemoScript } from './demo-player/scripts'

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-tight-showcase',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono-showcase',
  display: 'swap',
})

interface ServiceTab {
  slug: string
  shortName: string
  codename: string
  icon: string
}

const SERVICE_TABS: ServiceTab[] = [
  { slug: 'visa-juvenil',    shortName: 'Visa Juvenil',    codename: 'SIJS-001',     icon: 'family_restroom' },
  { slug: 'asilo-politico',  shortName: 'Asilo Político',  codename: 'I-589 · 02',   icon: 'shield' },
  { slug: 'reforzar-asilo',  shortName: 'Reforzar Asilo',  codename: 'I-589 R · 03', icon: 'task_alt' },
  { slug: 'apelacion',       shortName: 'Apelación BIA',   codename: 'EOIR-26 · 04', icon: 'gavel' },
  { slug: 'cambio-de-corte', shortName: 'Cambio de Corte', codename: 'EOIR-33 · 05', icon: 'location_on' },
]

export function ServicesShowcase() {
  const [activeSlug, setActiveSlug] = useState<string>('visa-juvenil')
  const script = getDemoScript(activeSlug)

  return (
    <section
      id="servicios-showcase"
      className={`${interTight.variable} ${mono.variable} relative overflow-hidden`}
      style={{
        background: '#000000',
        color: '#FAFAFA',
        fontFamily: 'var(--font-tight-showcase), -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
        paddingTop: 96,
        paddingBottom: 96,
      }}
    >
      {/* Aurora suave de fondo */}
      <div
        aria-hidden
        data-showcase-aurora
        className="absolute pointer-events-none"
        style={{
          top: '-15%',
          left: '-10%',
          width: '55%',
          height: '60%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%)',
          filter: 'blur(80px)',
          animation: 'showcase-aurora-a 28s ease-in-out infinite',
        }}
      />
      <div
        aria-hidden
        data-showcase-aurora
        className="absolute pointer-events-none"
        style={{
          top: '20%',
          right: '-15%',
          width: '50%',
          height: '55%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%)',
          filter: 'blur(80px)',
          animation: 'showcase-aurora-b 32s ease-in-out infinite',
        }}
      />
      {/* Dot grid */}
      <div
        aria-hidden
        data-showcase-dotgrid
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />

      <div className="relative px-6 lg:px-8 max-w-[1200px] mx-auto">
        {/* Eyebrow + Heading */}
        <header className="text-center mb-12 space-y-5">
          <div
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '0.5px solid rgba(255,255,255,0.15)',
            }}
          >
            <span className="relative flex items-center justify-center" style={{ width: 8, height: 8 }}>
              <span
                className="absolute inset-0 rounded-full"
                style={{ background: '#FFFFFF', animation: 'showcase-ping 2s ease-in-out infinite' }}
              />
              <span
                className="relative rounded-full"
                style={{ width: 8, height: 8, background: '#FFFFFF', boxShadow: '0 0 12px rgba(255,255,255,0.7)' }}
              />
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono-showcase)',
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.15em',
                color: '#FAFAFA',
              }}
            >
              DEMOSTRACIÓN · EN VIVO
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 500,
              letterSpacing: '-0.04em',
              lineHeight: 0.98,
            }}
          >
            <span
              style={{
                background: 'linear-gradient(180deg, #FFFFFF 30%, #6B7280 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Mira el sistema funcionando
            </span>
          </h2>

          <p
            className="max-w-xl mx-auto"
            style={{
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              fontWeight: 400,
              lineHeight: 1.55,
              color: '#9CA3AF',
              letterSpacing: '-0.01em',
            }}
          >
            Cada servicio reproducido paso a paso — desde que el cliente firma hasta
            que el expediente está listo para USCIS.
          </p>
        </header>

        {/* Tabs de servicios */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-10"
          role="tablist"
          aria-label="Servicios disponibles"
        >
          {SERVICE_TABS.map((tab) => {
            const isActive = tab.slug === activeSlug
            return (
              <button
                key={tab.slug}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveSlug(tab.slug)}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-all duration-300"
                style={{
                  background: isActive
                    ? 'rgba(255,255,255,0.1)'
                    : 'rgba(255,255,255,0.025)',
                  border: isActive
                    ? '0.5px solid rgba(255,255,255,0.3)'
                    : '0.5px solid rgba(255,255,255,0.08)',
                  color: isActive ? '#FFFFFF' : '#9CA3AF',
                  fontFamily: 'var(--font-mono-showcase)',
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 16, fontVariationSettings: "'FILL' 0" }}
                >
                  {tab.icon}
                </span>
                <span>{tab.shortName}</span>
                <span
                  style={{
                    fontSize: 10,
                    color: isActive ? '#6B7280' : '#4B5563',
                    letterSpacing: '0.1em',
                  }}
                >
                  · {tab.codename}
                </span>
              </button>
            )
          })}
        </div>

        {/* DemoPlayer del servicio activo */}
        <div
          key={activeSlug}
          style={{ animation: 'showcase-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both' }}
        >
          {script && <DemoPlayer script={script} />}
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes showcase-aurora-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 50px) scale(1.1); }
        }
        @keyframes showcase-aurora-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, 40px) scale(1.05); }
        }
        @keyframes showcase-ping {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes showcase-fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Mobile: desactivar efectos GPU caros */
        @media (max-width: 768px) {
          [data-showcase-aurora] { display: none; }
          [data-showcase-dotgrid] { opacity: 0.4; }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-showcase-aurora] { animation: none !important; }
        }
      `}</style>
    </section>
  )
}
