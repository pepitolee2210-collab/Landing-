import { SITE } from '@/lib/site'
import { whatsappUrl } from '@/lib/utils'
import { AmbientOrbs } from '@/components/decor/ambient-orbs'

export function CTAFinal() {
  return (
    <section className="py-28 md:py-40 relative overflow-hidden">
      {/* Un único orb rojo muy sutil, atmosférico */}
      <AmbientOrbs
        orbs={[
          { color: 'red', size: 800, x: '50%', y: '50%', opacity: 0.32, duration: 24 },
        ]}
      />

      <div
        aria-hidden
        className="absolute inset-0 blueprint-fine opacity-40 pointer-events-none"
        style={{
          maskImage:
            'radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      <div className="container-x relative">
        <div className="max-w-5xl mx-auto">
          {/* Eyebrow minimal */}
          <div className="flex justify-center mb-12">
            <span className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-3)]">
              <span className="h-px w-8 bg-[var(--color-red)]" />
              <span className="pulse-dot" style={{ background: 'var(--color-red)' }} />
              Disponible ahora · Sin compromiso
              <span className="h-px w-8 bg-[var(--color-red)]" />
            </span>
          </div>

          {/* Headline central, tipografía como protagonista absoluto */}
          <h2
            className="text-center font-display text-[var(--color-text)]"
            style={{
              fontSize: 'clamp(2.75rem, 8vw, 6.5rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.045em',
              fontWeight: 400,
            }}
          >
            Tu próxima conversación{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--color-gold)' }}>
              cambia el rumbo
            </span>{' '}
            de tu caso.
          </h2>

          <p
            className="mt-12 text-center text-lg text-[var(--color-text-2)] max-w-xl mx-auto leading-relaxed"
          >
            Una llamada por WhatsApp y sabes exactamente qué servicio aplica,
            cuánto cuesta y cuánto demora. Sin compromiso.
          </p>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            <a
              href={whatsappUrl(
                SITE.contact.whatsapp,
                'Hola, llegué desde su sitio. Necesito orientación migratoria.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-base px-7 py-4"
            >
              <WhatsAppIcon />
              Hablar con un asesor
            </a>
            <a
              href={`tel:${SITE.contact.phone.replace(/\s/g, '')}`}
              className="btn-ghost text-base px-7 py-4"
            >
              {SITE.contact.phone}
            </a>
          </div>

          {/* Línea inferior — solo texto, sin pill ni decoraciones */}
          <div className="mt-20 flex items-center justify-center gap-6 text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--color-text-3)]">
            <span className="inline-flex items-center gap-2">
              <span className="pulse-dot" style={{ background: 'var(--color-jade)' }} />
              Respuesta &lt; 4h
            </span>
            <span className="h-3 w-px bg-[var(--color-line-2)]" />
            <span>100+ familias atendidas</span>
            <span className="hidden sm:inline h-3 w-px bg-[var(--color-line-2)]" />
            <span className="hidden sm:inline">Bilingüe · ES & EN</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
    </svg>
  )
}
