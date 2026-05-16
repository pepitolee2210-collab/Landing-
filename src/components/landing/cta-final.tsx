import { SITE } from '@/lib/site'
import { whatsappUrl } from '@/lib/utils'
import { AmbientOrbs } from '@/components/decor/ambient-orbs'
import { ScanLines } from '@/components/decor/scan-lines'

export function CTAFinal() {
  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, var(--color-bg) 0%, rgba(40, 8, 14, 0.4) 50%, var(--color-bg) 100%)',
      }}
    >
      {/* Red dominante en este CTA — la urgencia */}
      <AmbientOrbs
        orbs={[
          { color: 'red', size: 700, x: '50%', y: '50%', opacity: 0.7, duration: 14 },
          { color: 'gold', size: 400, x: '15%', y: '20%', opacity: 0.45, duration: 20 },
          { color: 'gold', size: 350, x: '80%', y: '70%', opacity: 0.4, duration: 18, delay: 4 },
        ]}
      />

      <ScanLines />

      <div
        aria-hidden
        className="absolute inset-0 blueprint opacity-30 pointer-events-none"
        style={{
          maskImage:
            'radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* Marco rojo decorativo en las esquinas */}
      <CornerMarks />

      <div className="container-x relative">
        <div className="max-w-4xl mx-auto text-center">
          <span className="tag tag-red inline-flex">
            <span className="pulse-dot" style={{ background: 'var(--color-red)' }} />
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
            <span
              className="neon-red"
              style={{ fontWeight: 600 }}
            >
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
              className="btn-whatsapp text-base px-6 py-4 heartbeat"
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

          {/* Beam decorativo bajo CTAs */}
          <div className="relative mt-8 h-px max-w-md mx-auto">
            <div
              className="absolute inset-0 beam"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, var(--color-red) 50%, transparent 100%)',
                boxShadow: '0 0 12px var(--color-red)',
              }}
            />
          </div>

          {/* Metrics inline */}
          <div className="mt-12 inline-flex items-center gap-6 px-6 py-3 border border-[var(--color-red)]/30 rounded-full bg-[var(--color-surface)]/60 backdrop-blur-sm">
            <span className="font-mono text-xs text-[var(--color-text-2)] uppercase tracking-[0.15em] flex items-center gap-2">
              <span className="pulse-dot" style={{ background: 'var(--color-jade)' }} />
              Respuesta &lt; 4h
            </span>
            <span className="h-4 w-px bg-[var(--color-line-2)]" />
            <span className="font-mono text-xs text-[var(--color-text-2)] uppercase tracking-[0.15em]">
              100+ familias atendidas
            </span>
            <span className="h-4 w-px bg-[var(--color-line-2)]" />
            <span className="font-mono text-xs text-[var(--color-red)] uppercase tracking-[0.15em] neon-red">
              Bilingüe
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function CornerMarks() {
  const cornerSvg = (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M 0 32 L 0 0 L 32 0"
        stroke="var(--color-red)"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  )
  return (
    <div aria-hidden className="absolute inset-6 md:inset-10 pointer-events-none" style={{ opacity: 0.45 }}>
      <div className="absolute top-0 left-0">{cornerSvg}</div>
      <div className="absolute top-0 right-0 scale-x-[-1]">{cornerSvg}</div>
      <div className="absolute bottom-0 left-0 scale-y-[-1]">{cornerSvg}</div>
      <div className="absolute bottom-0 right-0 scale-[-1]">{cornerSvg}</div>
    </div>
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
