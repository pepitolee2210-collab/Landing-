const FAQ = [
  {
    q: '¿Cómo funciona el pago a cuotas?',
    a: 'Eliges el plan y pagas la cuota inicial al momento de comprar. Las cuotas mensuales restantes se cobran automáticamente por el método de pago elegido. Sin intereses, sin recargos.',
  },
  {
    q: '¿Puedo cancelar mi servicio si cambio de opinión?',
    a: 'Sí. Tienes 7 días desde la compra para solicitar reembolso del 100% del monto inicial. Después de iniciar el caso, los términos de cancelación dependen del avance — siempre transparentes y por escrito.',
  },
  {
    q: '¿En cuánto tiempo empiezan mi caso?',
    a: 'Hoy o mañana. Tras recibir tu pago inicial, Diana o Henry te asignan equipo en menos de 24 horas hábiles y agendan tu primera reunión esa misma semana.',
  },
  {
    q: '¿Qué incluye el portal del cliente?',
    a: 'Acceso 24/7 al estado de tu caso, descarga de documentos, chat con tu paralegal asignado, notificaciones automáticas de USCIS o Corte, calendario de pagos y fechas clave.',
  },
  {
    q: '¿Y si mi situación es compleja y no encaja en un servicio del catálogo?',
    a: 'Reserva una Consulta Express ($79, 30 min por video). En esa llamada armamos un plan a medida y te enviamos cotización oficial por correo sin compromiso.',
  },
  {
    q: '¿Atienden en otros estados de EE.UU.?',
    a: 'Sí. Tenemos sede en Utah pero atendemos casos en los 50 estados. Para custodias estatales, coordinamos con abogados locales en tu estado de residencia.',
  },
] as const

export function Faq2() {
  return (
    <section id="faq" className="py-24 md:py-32 relative">
      <div className="container-x">
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[var(--color-text-3)] mb-6">
            <span className="h-px w-8 bg-[var(--color-gold)]" />
            Preguntas frecuentes
          </span>
          <h2
            className="font-display text-[var(--color-text)]"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              fontWeight: 300,
            }}
          >
            Lo que más nos{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--color-gold)', fontWeight: 200 }}>
              preguntan
            </span>{' '}
            antes de comprar.
          </h2>
        </div>

        <div className="max-w-3xl space-y-3">
          {FAQ.map((item, idx) => (
            <details
              key={idx}
              className="group rounded-xl border border-[var(--color-line-2)] hover:border-[var(--color-gold)]/40 transition-colors overflow-hidden"
              style={{ background: 'var(--color-surface)' }}
            >
              <summary className="cursor-pointer flex items-start justify-between gap-6 p-6 list-none">
                <h3
                  className="font-display text-[var(--color-text)] tracking-tight"
                  style={{ fontSize: '1.125rem', lineHeight: 1.3, fontWeight: 500 }}
                >
                  {item.q}
                </h3>
                <span
                  aria-hidden
                  className="font-display text-3xl font-light text-[var(--color-gold)] transition-transform duration-300 group-open:rotate-45 leading-none flex-shrink-0 mt-0.5"
                >
                  +
                </span>
              </summary>
              <p className="px-6 pb-6 text-[var(--color-text-2)] leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-12 max-w-3xl flex items-center gap-3 p-5 rounded-xl border border-[var(--color-line-2)]" style={{ background: 'var(--color-bg-2)' }}>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full" style={{ background: 'rgba(242, 178, 52, 0.1)' }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
              <circle cx="10" cy="10" r="8" stroke="var(--color-gold)" strokeWidth="1.5" />
              <path d="M10 6v5M10 14v.5" stroke="var(--color-gold)" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
          <div className="flex-1">
            <p className="font-display text-[var(--color-text)]" style={{ fontSize: '1rem', fontWeight: 500 }}>
              ¿Tu pregunta no está aquí?
            </p>
            <p className="text-sm text-[var(--color-text-2)]">
              Escríbenos por WhatsApp. Respondemos en menos de 4 horas.
            </p>
          </div>
          <a
            href="https://wa.me/12677874365"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-sm"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
