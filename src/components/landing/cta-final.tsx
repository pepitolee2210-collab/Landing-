import { SITE } from '@/lib/site'
import { whatsappUrl } from '@/lib/utils'

export function CTAFinal() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Glow ambient */}
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[600px] glow-cyan opacity-50 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-0 blueprint opacity-30 pointer-events-none"
        style={{
          maskImage:
            'radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      <div className="container-x relative">
        <div className="max-w-4xl mx-auto text-center">
          <span className="tag tag-cyan inline-flex">
            <span className="pulse-dot" style={{ background: 'var(--color-cyan)' }} />
            Disponible ahora · Sin compromiso
          </span>

          <h2
            className="mt-10 font-display text-[var(--color-text)]"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              lineHeight: 0.96,
              letterSpacing: '-0.04em',
              fontWeight: 500,
            }}
          >
            Tu próxima conversación{' '}
            <span style={{ color: 'var(--color-cyan)' }}>
              cambia todo el rumbo
            </span>{' '}
            de tu caso.
          </h2>

          <p className="mt-8 text-lg text-[var(--color-text-2)] max-w-xl mx-auto leading-relaxed">
            Una sola llamada por WhatsApp y sabes exactamente qué servicio
            aplica, cuánto cuesta y cuánto demora. Sin compromiso.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
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
              <PhoneIcon />
              O llama: {SITE.contact.phone}
            </a>
          </div>

          {/* Metrics inline */}
          <div className="mt-16 inline-flex items-center gap-6 px-6 py-3 border border-[var(--color-line-2)] rounded-full bg-[var(--color-surface)]/60 backdrop-blur-sm">
            <span className="font-mono text-xs text-[var(--color-text-3)] uppercase tracking-[0.15em] flex items-center gap-2">
              <span className="pulse-dot" style={{ background: 'var(--color-jade)' }} />
              Respuesta &lt; 4h
            </span>
            <span className="h-4 w-px bg-[var(--color-line-2)]" />
            <span className="font-mono text-xs text-[var(--color-text-3)] uppercase tracking-[0.15em]">
              100+ familias atendidas
            </span>
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

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4.5 3h2l1.5 4-2 1.5a8 8 0 0 0 5.5 5.5l1.5-2 4 1.5v2A2 2 0 0 1 15 17.5 13 13 0 0 1 2.5 5 2 2 0 0 1 4.5 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}
