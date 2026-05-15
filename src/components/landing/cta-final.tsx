import { SITE } from '@/lib/site'
import { whatsappUrl } from '@/lib/utils'

export function CTAFinal() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background editorial decoration */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center top, rgba(180, 132, 43, 0.06) 0%, transparent 60%)',
        }}
      />

      <div className="container-editorial relative">
        <div className="max-w-4xl mx-auto text-center">
          <span className="eyebrow inline-flex items-center gap-3 mb-8">
            <span className="h-px w-10 bg-[var(--color-ink)]" />
            Empieza hoy
            <span className="h-px w-10 bg-[var(--color-ink)]" />
          </span>

          <h2
            className="font-display font-light text-[var(--color-ink)]"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              lineHeight: 0.98,
              letterSpacing: '-0.035em',
            }}
          >
            Tu próxima conversación{' '}
            <span
              className="italic"
              style={{
                color: 'var(--color-gold-2)',
                fontVariationSettings: '"SOFT" 100',
              }}
            >
              puede cambiar
            </span>{' '}
            todo el rumbo de tu caso.
          </h2>

          <p className="mt-8 text-lg text-[var(--color-ink-3)] max-w-xl mx-auto leading-relaxed">
            Una sola llamada por WhatsApp y sabes exactamente qué servicio
            aplica, cuánto cuesta y cuánto demora. Sin compromiso.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href={whatsappUrl(
                SITE.contact.whatsapp,
                'Hola, llegué desde su sitio. Necesito orientación migratoria.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-base px-6 py-4"
            >
              <WhatsAppIcon />
              Hablar con un asesor ahora
            </a>
            <a
              href={`tel:${SITE.contact.phone.replace(/\s/g, '')}`}
              className="btn-ghost text-base px-6 py-4"
            >
              O llámanos: {SITE.contact.phone}
            </a>
          </div>

          {/* Confianza */}
          <p className="mt-12 text-xs text-[var(--color-ink-3)] font-mono uppercase tracking-[0.2em]">
            Respuesta promedio · menos de 4 horas en horario laboral
          </p>
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
