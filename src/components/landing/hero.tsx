'use client'

import Link from 'next/link'
import { SITE } from '@/lib/site'
import { whatsappUrl } from '@/lib/utils'

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 md:pt-20 pb-20 md:pb-28">
      {/* Decoración editorial — número grande de fondo */}
      <div
        aria-hidden
        className="absolute right-[-6%] top-[6%] hidden lg:block select-none pointer-events-none font-display"
        style={{
          fontSize: 'clamp(280px, 38vw, 520px)',
          lineHeight: 0.85,
          color: 'var(--color-canvas-2)',
          fontWeight: 200,
          fontVariationSettings: '"SOFT" 100, "WONK" 1',
        }}
      >
        100<span style={{ color: 'var(--color-gold)' }}>+</span>
      </div>

      <div className="container-editorial relative">
        {/* Eyebrow editorial */}
        <div className="flex items-center gap-3 mb-12 rise" style={{ animationDelay: '0ms' }}>
          <span className="h-px w-10 bg-[var(--color-ink)]" />
          <span className="eyebrow">
            Bufete migratorio · Utah · Establecido {SITE.legal.foundedYear}
          </span>
        </div>

        {/* Headline editorial enorme */}
        <h1
          className="font-display font-light text-[var(--color-ink)] rise"
          style={{
            fontSize: 'clamp(3rem, 9vw, 7.5rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.035em',
            animationDelay: '100ms',
            maxWidth: '18ch',
          }}
        >
          Tu estatus legal en EE.UU.,{' '}
          <span
            className="font-display italic"
            style={{
              color: 'var(--color-gold-2)',
              fontVariationSettings: '"SOFT" 80, "WONK" 1',
            }}
          >
            por escrito.
          </span>
        </h1>

        {/* Subhead */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <p
            className="lg:col-span-7 text-lg md:text-xl text-[var(--color-ink-2)] leading-relaxed rise max-w-2xl"
            style={{ animationDelay: '220ms' }}
          >
            Acompañamos a familias latinas en visa juvenil, asilo político y
            ajuste de estatus en EE.UU. Cero promesas vacías: te decimos los
            tiempos reales, el costo total y el riesgo desde el primer día.
          </p>

          {/* Stats al lado */}
          <div
            className="lg:col-span-5 grid grid-cols-3 gap-6 pt-4 border-t border-[var(--color-line-soft)] rise"
            style={{ animationDelay: '340ms' }}
          >
            <Stat number={`${SITE.stats.contractsSigned}+`} label="Casos firmados en 2026" />
            <Stat number="2" label="Idiomas · ES & EN" />
            <Stat number="9" label="Países atendidos" />
          </div>
        </div>

        {/* CTAs */}
        <div
          className="mt-12 flex flex-wrap items-center gap-4 rise"
          style={{ animationDelay: '460ms' }}
        >
          <a
            href={whatsappUrl(
              SITE.contact.whatsapp,
              'Hola, llegué desde su sitio y necesito una consulta de inmigración.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <WhatsAppIcon />
            Empieza tu caso por WhatsApp
            <span className="text-[var(--color-canvas)]/60 ml-1">→</span>
          </a>
          <Link href="#servicios" className="btn-ghost">
            Conocer servicios
          </Link>
        </div>

        {/* Bloque de confianza inferior */}
        <div
          className="mt-20 md:mt-28 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 pt-8 border-t border-[var(--color-line-soft)] rise"
          style={{ animationDelay: '600ms' }}
        >
          <div className="flex items-center gap-3">
            <SealIcon />
            <div className="text-sm">
              <p className="font-medium text-[var(--color-ink)]">
                Equipo bilingüe completo
              </p>
              <p className="text-[var(--color-ink-3)] text-xs">
                Diana, Vanessa, Andrium, Henry y más
              </p>
            </div>
          </div>
          <div className="hidden md:block h-10 w-px bg-[var(--color-line-soft)]" />
          <div className="flex items-center gap-3">
            <ShieldIcon />
            <div className="text-sm">
              <p className="font-medium text-[var(--color-ink)]">
                Sin letras pequeñas
              </p>
              <p className="text-[var(--color-ink-3)] text-xs">
                Precio total y plan firmado antes de pagar
              </p>
            </div>
          </div>
          <div className="hidden md:block h-10 w-px bg-[var(--color-line-soft)]" />
          <div className="flex items-center gap-3">
            <ClockIcon />
            <div className="text-sm">
              <p className="font-medium text-[var(--color-ink)]">
                Respondemos en horas
              </p>
              <p className="text-[var(--color-ink-3)] text-xs">
                WhatsApp atendido por humanos
              </p>
            </div>
          </div>
        </div>

        {/* Línea decorativa creciente */}
        <div
          className="mt-16 h-px bg-[var(--color-ink)] line-grow"
          style={{ animationDelay: '800ms' }}
        />
      </div>
    </section>
  )
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p className="font-display font-light text-4xl md:text-5xl text-[var(--color-ink)] tracking-tight">
        {number}
      </p>
      <p className="mt-1 text-xs text-[var(--color-ink-3)] leading-tight">{label}</p>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
    </svg>
  )
}

function SealIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="14" stroke="var(--color-gold-2)" strokeWidth="1" />
      <circle cx="16" cy="16" r="9" stroke="var(--color-gold-2)" strokeWidth="0.5" />
      <path
        d="M11 16l3.5 3.5L21 13"
        stroke="var(--color-gold-2)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="28" height="32" viewBox="0 0 28 32" fill="none" aria-hidden>
      <path
        d="M14 1L2 5v10c0 9.5 5 14 12 16 7-2 12-6.5 12-16V5L14 1z"
        stroke="var(--color-ink)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M9 16l4 4 7-8"
        stroke="var(--color-ember)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden>
      <circle cx="15" cy="15" r="13" stroke="var(--color-ink)" strokeWidth="1" />
      <path
        d="M15 8v7l5 3"
        stroke="var(--color-ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="15" cy="15" r="1.5" fill="var(--color-gold)" />
    </svg>
  )
}
