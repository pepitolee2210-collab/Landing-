'use client'

import { useEffect, useRef, useState } from 'react'
import { SITE } from '@/lib/site'
import { whatsappUrl } from '@/lib/utils'

/**
 * FAQ v7 — Lex · Apple Intelligence
 * - Lex avatar con mesh gradient + halo sutil en thinking
 * - 2 orbs azules sutiles con parallax 3D inverso al cursor
 * - Shimmer ring multicolor (Apple Intelligence canónico) en thinking
 * - Halo externo hueco (no rellena interior)
 * - Cursor spotlight, light beam, hairline, specular crystal Apple
 */

interface QA {
  q: string
  qShort: string
  tag: string
  tagColor: string
  a: string
  related?: number[]
  tokens?: number
}

const FAQ_DATA: QA[] = [
  {
    qShort: 'Cómo funciona "hazlo tú mismo"',
    q: '¿Cómo funciona "hazlo tú mismo"?',
    tag: 'Plataforma',
    tagColor: 'blue',
    a: 'Recibes acceso a nuestra plataforma. Ella te guía con preguntas en español, valida cada respuesta y prepara los formularios oficiales. Tú firmas. La diferencia con un bufete: tú estás en control y ahorras miles en honorarios.',
    related: [1, 3],
    tokens: 48,
  },
  {
    qShort: 'Hay abogados reales detrás',
    q: '¿Es seguro? ¿Hay abogados reales?',
    tag: 'Confianza',
    tagColor: 'green',
    a: 'Sí. Detrás de la plataforma hay un equipo legal con licencia en Utah. Vanessa, paralegal certificada, interviene en los momentos clave: entrevista, RFE, biométricos, audiencias. El resto lo hace la plataforma por ti.',
    related: [0, 2],
    tokens: 44,
  },
  {
    qShort: 'Peligro de deportación',
    q: '¿Estoy en peligro si los contacto?',
    tag: 'Privacidad',
    tagColor: 'red',
    a: 'No. La consulta inicial es 100% confidencial y protegida por privilegio cliente-abogado. No reportamos nada a ICE ni a ninguna agencia de inmigración.',
    related: [1, 4],
    tokens: 28,
  },
  {
    qShort: 'Cuánto cuesta vs bufete',
    q: '¿Cuánto cuesta? Diferencia vs bufete',
    tag: 'Precio',
    tagColor: 'gold',
    a: 'Nuestro producto es una plataforma, no horas de abogado. Pagas el acceso al software más el acompañamiento puntual. Sin facturación por hora. Cuotas mensuales hasta 12 meses sin interés. Cotización personalizada al firmar.',
    related: [0, 7],
    tokens: 42,
  },
  {
    qShort: 'Si mi hijo califica para SIJS',
    q: '¿Mi hijo califica para Visa Juvenil?',
    tag: 'SIJS',
    tagColor: 'blue',
    a: 'Si tu hijo es menor de 21, no está casado y sufrió abuso, negligencia o abandono de uno o ambos padres, probablemente sí. Pregunta por WhatsApp y Vanessa te da diagnóstico en 24 horas.',
    related: [5, 7],
    tokens: 38,
  },
  {
    qShort: 'Tiempo del proceso',
    q: '¿Cuánto tiempo toma todo?',
    tag: 'Plazos',
    tagColor: 'gold',
    a: 'Depende del trámite. La plataforma reduce el tiempo de preparación de semanas a horas. Lo que tarda es la respuesta de USCIS o de la corte, que está fuera de nuestro control.',
    related: [0, 3],
    tokens: 36,
  },
  {
    qShort: 'Caso negado en corte',
    q: '¿Mi caso fue negado en corte, qué hago?',
    tag: 'Apelación',
    tagColor: 'red',
    a: 'Tienes 30 días para apelar al BIA. La plataforma prepara el brief y Vanessa coordina con el equipo legal. No te quedes sin apelar — perder el plazo cierra el caso definitivamente.',
    related: [2, 4],
    tokens: 40,
  },
  {
    qShort: 'Garantías si me niegan',
    q: '¿Qué pasa si USCIS niega mi caso?',
    tag: 'Garantía',
    tagColor: 'green',
    a: 'Antes de aceptarte como cliente, la plataforma y nuestro equipo evalúan viabilidad. Si tu caso es viable y aun así USCIS lo niega, presentamos motion to reopen o apelación sin costo adicional dentro del scope contratado.',
    related: [1, 3],
    tokens: 44,
  },
]

type State = 'idle' | 'thinking' | 'answer'

export function Faq2() {
  const [state, setState] = useState<State>('idle')
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [typed, setTyped] = useState('')
  const cardRef = useRef<HTMLDivElement | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)

  // Cursor spotlight tracking (card)
  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    function onMove(e: MouseEvent) {
      const r = card!.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width) * 100
      const y = ((e.clientY - r.top) / r.height) * 100
      card!.style.setProperty('--mx', `${x}%`)
      card!.style.setProperty('--my', `${y}%`)
    }
    function onLeave() {
      card!.style.setProperty('--mx', `50%`)
      card!.style.setProperty('--my', `50%`)
    }
    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  // Orb parallax 3D + dot matrix cursor spotlight
  useEffect(() => {
    const sec = sectionRef.current
    if (!sec) return
    let raf = 0
    function onMove(e: MouseEvent) {
      const r = sec!.getBoundingClientRect()
      // parallax offset (orbs)
      const x = ((e.clientX - r.left) / r.width - 0.5) * 60
      const y = ((e.clientY - r.top) / r.height - 0.5) * 60
      // cursor absolute position (dot matrix glow)
      const cx = e.clientX - r.left
      const cy = e.clientY - r.top
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        sec!.style.setProperty('--sx', `${x}px`)
        sec!.style.setProperty('--sy', `${y}px`)
        sec!.style.setProperty('--cx', `${cx}px`)
        sec!.style.setProperty('--cy', `${cy}px`)
      })
    }
    function onLeave() {
      sec!.style.setProperty('--sx', `0px`)
      sec!.style.setProperty('--sy', `0px`)
      sec!.style.setProperty('--cx', `-9999px`)
      sec!.style.setProperty('--cy', `-9999px`)
    }
    sec.addEventListener('mousemove', onMove)
    sec.addEventListener('mouseleave', onLeave)
    return () => {
      sec.removeEventListener('mousemove', onMove)
      sec.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Typewriter
  useEffect(() => {
    if (state !== 'answer' || activeIdx == null) return
    const full = FAQ_DATA[activeIdx].a
    let i = 0
    setTyped('')
    const id = setInterval(() => {
      if (i >= full.length) {
        clearInterval(id)
        return
      }
      i++
      setTyped(full.slice(0, i))
    }, 14 + Math.random() * 16)
    return () => clearInterval(id)
  }, [state, activeIdx])

  function ask(idx: number) {
    setActiveIdx(idx)
    setState('thinking')
    setTimeout(() => setState('answer'), 1400)
  }
  function reset() {
    setState('idle')
    setActiveIdx(null)
    setTyped('')
  }

  return (
    <section ref={sectionRef} id="faq" className="relative py-24 md:py-32 overflow-hidden">
      {/* Halftone dot matrix — base estática + glow reactivo al cursor */}
      <div aria-hidden className="lex-dotmatrix" />
      <div aria-hidden className="lex-dotmatrix-glow" />

      {/* Ambiente sutil — 2 orbs azules con parallax */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="orb-wrap absolute top-[20%] left-[18%]" style={{ '--depth': 1.0 } as React.CSSProperties}>
          <div
            className="w-[460px] h-[460px] rounded-full faq-orb-1"
            style={{
              background: 'radial-gradient(circle, rgba(91,155,255,0.14) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
        </div>
        <div className="orb-wrap absolute bottom-[15%] right-[20%]" style={{ '--depth': 1.4 } as React.CSSProperties}>
          <div
            className="w-[400px] h-[400px] rounded-full faq-orb-2"
            style={{
              background: 'radial-gradient(circle, rgba(140,170,255,0.10) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
        </div>
      </div>

      <div className="l2-container relative">
        {/* Header — editorial minimal · awwwards */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="lex-kicker">
            <span aria-hidden className="lex-kicker-bar" />
            <span className="lex-kicker-text">Asistente IA</span>
            <span aria-hidden className="lex-kicker-num">07</span>
          </div>

          <h2 className="lex-headline">
            <span className="lex-headline-line lex-headline-1">
              Pregunta lo que quieras.
            </span>
            <span className="lex-headline-line lex-headline-2">
              Lex <em>responde</em>.
            </span>
          </h2>

          <div aria-hidden className="lex-divider" />

          <p className="lex-meta">
            <span>400 casos</span>
            <span className="lex-meta-dot" />
            <span>español nativo</span>
            <span className="lex-meta-dot" />
            <span>confidencial</span>
          </p>
        </div>

        {/* The Card */}
        <div className="max-w-2xl mx-auto">
          <div
            ref={cardRef}
            className={`ai-card ${state === 'thinking' ? 'ai-card-thinking' : ''}`}
            style={
              {
                '--mx': '50%',
                '--my': '50%',
              } as React.CSSProperties
            }
          >
            {/* External shimmer glow halo — solo visible en thinking, anillo hueco */}
            <span aria-hidden className="ai-card-thinking-glow" />
            {/* Cursor spotlight (mouse follow) */}
            <span aria-hidden className="ai-card-spotlight" />
            {/* Light beam diagonal — crystal Apple sweep */}
            <span aria-hidden className="ai-card-light-beam" />
            {/* Hairline reflejo arriba — borde de cristal */}
            <span aria-hidden className="ai-card-hairline" />

            <div className="ai-card-inner">
              {/* Header */}
              <div
                className="flex items-center gap-3 px-5 md:px-7 py-4 border-b"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
              >
                <LexAvatar thinking={state === 'thinking'} />
                <div className="flex-1 min-w-0">
                  <p
                    className="l2-display text-[15px] md:text-base flex items-center gap-1.5"
                    style={{ fontWeight: 600, color: '#fafafa', letterSpacing: '-0.012em' }}
                  >
                    Lex
                    <span
                      aria-hidden
                      className="text-[9px] font-mono uppercase tracking-[0.15em] px-1.5 py-0.5 rounded"
                      style={{
                        background: 'rgba(91,155,255,0.10)',
                        color: 'var(--c-blue-2)',
                        border: '1px solid rgba(91,155,255,0.20)',
                      }}
                    >
                      ULP·AI
                    </span>
                  </p>
                  <p
                    className="text-[11px] flex items-center gap-1.5 mt-0.5"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: 'var(--c-green)',
                        boxShadow: '0 0 6px var(--c-green)',
                        animation: 'subtle-pulse 2s ease-in-out infinite',
                      }}
                    />
                    En línea · responde al instante
                  </p>
                </div>
                <kbd
                  className="hidden md:inline-flex items-center gap-1 px-2 py-1 rounded-md font-mono text-[10px] tracking-wide"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  esc para cerrar
                </kbd>
              </div>

              {/* Body */}
              <div className="px-5 md:px-7 py-6 md:py-8 min-h-[340px] flex flex-col">
                {state === 'idle' && <IdleView onAsk={ask} />}
                {state === 'thinking' && activeIdx != null && (
                  <ThinkingView question={FAQ_DATA[activeIdx].q} qa={FAQ_DATA[activeIdx]} />
                )}
                {state === 'answer' && activeIdx != null && (
                  <AnswerView qa={FAQ_DATA[activeIdx]} typed={typed} onReset={reset} onAsk={ask} />
                )}
              </div>

              {/* Footer */}
              <div
                className="px-5 md:px-7 py-3.5 border-t flex items-center justify-between gap-3"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
              >
                <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  ¿Necesitas un humano?
                </p>
                <a
                  href={whatsappUrl(SITE.contact.whatsapp, 'Hola, vi al asistente Lex. Tengo una pregunta para Vanessa.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium transition-opacity hover:opacity-100"
                  style={{ color: '#25d366', opacity: 0.9 }}
                >
                  <WhatsappIcon />
                  Hablar con Vanessa →
                </a>
              </div>

              <span aria-hidden className="ai-card-bottom-reflection" />
            </div>
          </div>

          <p
            className="mt-5 text-center text-[11px] tracking-wide flex items-center justify-center gap-1.5"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            <span className="inline-block w-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.3)' }} />
            Powered by UsaLatinoPrime · respuestas verificadas por equipo legal
            <span className="inline-block w-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.3)' }} />
          </p>
        </div>
      </div>

      <Styles />
    </section>
  )
}

/* ════════════════════════════════════════════════
   IDLE — suggestions numeradas con tags
   ════════════════════════════════════════════════ */
function IdleView({ onAsk }: { onAsk: (idx: number) => void }) {
  return (
    <div className="state-in flex-1 flex flex-col">
      <p
        className="text-[14.5px] md:text-[15.5px] mb-1.5"
        style={{ color: 'rgba(255,255,255,0.92)', fontWeight: 500, letterSpacing: '-0.005em' }}
      >
        Hola. Soy Lex.
      </p>
      <p
        className="text-[13px] md:text-[14px] mb-7 leading-relaxed"
        style={{ color: 'rgba(255,255,255,0.55)' }}
      >
        Pregúntame lo que necesites. Estas son las más comunes:
      </p>
      <div className="flex flex-col gap-1.5 flex-1">
        {FAQ_DATA.map((qa, i) => (
          <button
            key={i}
            onClick={() => onAsk(i)}
            className="suggestion-row group flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all"
          >
            <span className="suggestion-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="flex-1 text-[13.5px] md:text-[14px]" style={{ color: 'rgba(255,255,255,0.85)' }}>
              {qa.qShort}
            </span>
            <span
              className={`suggestion-tag tag-${qa.tagColor}`}
              style={{
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                padding: '3px 8px',
                borderRadius: '999px',
              }}
            >
              {qa.tag}
            </span>
            <span className="suggestion-arrow" style={{ color: 'rgba(255,255,255,0.3)' }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M5 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════
   THINKING — skeleton loader + dots
   ════════════════════════════════════════════════ */
function ThinkingView({ question, qa }: { question: string; qa: QA }) {
  return (
    <div className="state-in flex-1 flex flex-col">
      <div className="flex items-start gap-2 mb-5 pb-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <span
          className="text-[10px] font-mono uppercase tracking-[0.15em] mt-1 flex-shrink-0"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          Q ›
        </span>
        <p
          className="l2-display text-[14.5px] md:text-[15.5px]"
          style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.35 }}
        >
          {question}
        </p>
      </div>

      <div className="flex flex-col gap-2.5 mb-5">
        <span className="skeleton-line" style={{ width: '88%' }} />
        <span className="skeleton-line" style={{ width: '94%', animationDelay: '0.1s' }} />
        <span className="skeleton-line" style={{ width: '72%', animationDelay: '0.2s' }} />
        <span className="skeleton-line" style={{ width: '78%', animationDelay: '0.3s' }} />
      </div>

      <div className="flex items-center gap-2">
        <ThinkingDots />
        <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Lex está pensando
        </span>
      </div>
    </div>
  )
}

function ThinkingDots() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="thinking-dot" style={{ animationDelay: '0s' }} />
      <span className="thinking-dot" style={{ animationDelay: '0.16s' }} />
      <span className="thinking-dot" style={{ animationDelay: '0.32s' }} />
      <style jsx>{`
        .thinking-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--c-blue) 0%, var(--c-blue-2) 100%);
          animation: thinking-bounce 1.1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          box-shadow: 0 0 6px rgba(91,155,255,0.5);
        }
        @keyframes thinking-bounce {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0) scale(0.8); }
          30%           { opacity: 1; transform: translateY(-3px) scale(1); }
        }
      `}</style>
    </div>
  )
}

/* ════════════════════════════════════════════════
   ANSWER — typewriter + token counter + follow-ups
   ════════════════════════════════════════════════ */
function AnswerView({
  qa,
  typed,
  onReset,
  onAsk,
}: {
  qa: QA
  typed: string
  onReset: () => void
  onAsk: (idx: number) => void
}) {
  const isDone = typed.length >= qa.a.length
  const tokens = Math.round((typed.length / qa.a.length) * (qa.tokens || 40))

  return (
    <div className="state-in flex-1 flex flex-col">
      <div className="flex items-start gap-2 mb-5 pb-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <span
          className="text-[10px] font-mono uppercase tracking-[0.15em] mt-1 flex-shrink-0"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          Q ›
        </span>
        <p
          className="l2-display text-[14.5px] md:text-[15.5px]"
          style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.35 }}
        >
          {qa.q}
        </p>
      </div>

      <div className="flex items-start gap-2 mb-4">
        <span
          className="text-[10px] font-mono uppercase tracking-[0.15em] mt-1 flex-shrink-0"
          style={{ color: 'var(--c-green)' }}
        >
          A ›
        </span>
        <p
          className="text-[14px] md:text-[15px] leading-relaxed flex-1"
          style={{ color: '#e8eef9', fontWeight: 400 }}
        >
          {typed}
          {!isDone && <span className="answer-cursor" />}
        </p>
      </div>

      <div className="flex items-center gap-3 mt-1 mb-5">
        <div
          className="flex-1 h-px"
          style={{
            background: `linear-gradient(90deg, rgba(34,255,160,0.4) 0%, rgba(34,255,160,0.4) ${(typed.length / qa.a.length) * 100}%, rgba(255,255,255,0.06) ${(typed.length / qa.a.length) * 100}%, rgba(255,255,255,0.06) 100%)`,
            transition: 'background 0.3s',
          }}
        />
        <span className="font-mono text-[10px] tabular-nums" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {tokens} / {qa.tokens || 40} tokens
        </span>
      </div>

      {isDone && (
        <div className="follow-up-in">
          {qa.related && qa.related.length > 0 && (
            <div className="mb-5">
              <p
                className="text-[10.5px] uppercase tracking-[0.18em] mb-2.5"
                style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}
              >
                ↘ También te puede interesar
              </p>
              <div className="space-y-1.5">
                {qa.related.map((relIdx) => {
                  const rel = FAQ_DATA[relIdx]
                  if (!rel) return null
                  return (
                    <button
                      key={relIdx}
                      onClick={() => onAsk(relIdx)}
                      className="follow-up-btn group w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 transition-all"
                    >
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: 'rgba(91,155,255,0.7)' }}
                      />
                      <span
                        className="text-[13px] flex-1 min-w-0 truncate"
                        style={{ color: 'rgba(255,255,255,0.78)' }}
                      >
                        {rel.qShort}
                      </span>
                      <span style={{ color: 'rgba(255,255,255,0.3)' }} className="follow-up-arrow flex-shrink-0">
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                          <path d="M5 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <button
            onClick={onReset}
            className="reset-btn inline-flex items-center gap-1.5 text-[12.5px] transition-colors"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path
                d="M3 8a4 4 0 108-1M3 8V4M3 8h4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Volver a sugerencias
          </button>
        </div>
      )}
    </div>
  )
}

/* ════════════════════════════════════════════════
   AVATAR LEX — mesh gradient + halo sutil
   ════════════════════════════════════════════════ */
function LexAvatar({ thinking }: { thinking: boolean }) {
  return (
    <div className="relative flex-shrink-0" style={{ width: 36, height: 36 }}>
      {thinking && <span aria-hidden className="lex-halo" />}
      {thinking && (
        <span
          aria-hidden
          className="absolute inset-[-2px] rounded-full"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0deg, rgba(91,155,255,0.6) 100deg, rgba(140,170,255,0.35) 160deg, transparent 220deg, transparent 360deg)',
            animation: 'lex-ring 3s linear infinite',
            opacity: 0.7,
          }}
        />
      )}
      <div
        className="relative w-full h-full rounded-full overflow-hidden"
        style={{
          background: thinking
            ? 'radial-gradient(circle at 30% 20%, var(--c-blue-2) 0%, var(--c-blue) 30%, #6f42c1 60%, var(--c-red) 90%)'
            : 'radial-gradient(circle at 30% 20%, var(--c-blue-2) 0%, var(--c-blue) 50%, #2a5fb8 100%)',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: '0 0 0 3px rgba(20,20,22,1), 0 8px 16px -6px rgba(91,155,255,0.5)',
          transition: 'background 0.6s ease',
        }}
      >
        <span
          aria-hidden
          className="absolute inset-0 mesh-1"
          style={{ background: 'radial-gradient(circle at 70% 70%, rgba(34,255,160,0.45) 0%, transparent 50%)' }}
        />
        <span
          aria-hidden
          className="absolute inset-0 mesh-2"
          style={{ background: 'radial-gradient(circle at 20% 80%, rgba(242,178,52,0.30) 0%, transparent 50%)' }}
        />
        <span
          aria-hidden
          className="absolute top-0 left-0 right-1/2 bottom-1/2 rounded-tl-full"
          style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.42) 0%, transparent 60%)' }}
        />
      </div>
    </div>
  )
}

function WhatsappIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.1-.7.9-.9 1.1-.3.2-.6.1c-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.8-1.6-2.1-.2-.3 0-.4.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.5s-.6-1.4-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.8.4s-1 1-1 2.5 1 2.9 1.2 3.1.2 2.9 4.3 4.1 4.1 1 4.8.9 1.6-.7 1.9-1.3c.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5-1.4c1.4.8 3.1 1.3 5 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.7 0-3.3-.5-4.7-1.3l-.3-.2-3.4 1 1-3.3-.2-.3C3.5 14.4 3 13.2 3 12c0-5 4-9 9-9s9 4 9 9-4 9-9 9z" />
    </svg>
  )
}

/* ════════════════════════════════════════════════
   STYLES
   ════════════════════════════════════════════════ */
function Styles() {
  return (
    <style jsx global>{`
      /* Card principal — Crystal Apple, vidrio neutro con luz blanca */
      .ai-card {
        position: relative;
        border-radius: 28px;
        background:
          linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%),
          rgba(18,18,22,0.55);
        backdrop-filter: blur(36px) saturate(150%);
        -webkit-backdrop-filter: blur(36px) saturate(150%);
        border: 1px solid rgba(255,255,255,0.12);
        box-shadow:
          0 40px 100px -32px rgba(0,0,0,0.55),
          0 1px 0 rgba(255,255,255,0.08) inset,
          0 -1px 0 rgba(255,255,255,0.03) inset;
        transition: border-color 0.5s ease, box-shadow 0.5s ease;
      }

      /* Specular highlight superior */
      .ai-card::after {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 50%;
        background: linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 40%, transparent 100%);
        border-radius: 28px 28px 0 0;
        pointer-events: none;
        z-index: 1;
      }

      /* Hairline arriba */
      .ai-card-hairline {
        position: absolute;
        top: 0; left: 10%; right: 10%;
        height: 1px;
        background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.30) 50%, transparent 100%);
        pointer-events: none;
        z-index: 3;
      }

      /* Light beam diagonal */
      .ai-card-light-beam {
        position: absolute;
        inset: 0;
        border-radius: 28px;
        overflow: hidden;
        pointer-events: none;
        z-index: 1;
      }
      .ai-card-light-beam::before {
        content: '';
        position: absolute;
        top: -50%; left: -100%;
        width: 60%; height: 200%;
        background: linear-gradient(115deg,
          transparent 35%,
          rgba(255,255,255,0.06) 49%,
          rgba(255,255,255,0.03) 51%,
          transparent 65%);
        transform: rotate(15deg);
        animation: light-beam-sweep 11s ease-in-out infinite;
      }
      @keyframes light-beam-sweep {
        0%, 100% { transform: rotate(15deg) translateX(0); opacity: 0; }
        25%      { opacity: 1; }
        55%      { transform: rotate(15deg) translateX(320%); opacity: 1; }
        80%      { opacity: 0; }
      }
      @media (prefers-reduced-motion: reduce) {
        .ai-card-light-beam::before { animation: none; }
      }

      /* Border shimmer thinking — Apple Intelligence multicolor */
      .ai-card::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 28px;
        padding: 1.5px;
        background: conic-gradient(
          from var(--shimmer-angle, 0deg),
          rgba(91,155,255,0.85),
          rgba(168,85,247,0.85),
          rgba(34,255,160,0.75),
          rgba(242,178,52,0.80),
          rgba(255,77,109,0.75),
          rgba(91,155,255,0.85)
        );
        -webkit-mask:
          linear-gradient(#000 0 0) content-box,
          linear-gradient(#000 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        opacity: 0;
        transition: opacity 0.5s ease;
        pointer-events: none;
        z-index: 4;
      }
      /* Glow externo — anillo hueco, no rellena el centro */
      .ai-card-thinking-glow {
        position: absolute;
        inset: -10px;
        border-radius: 36px;
        padding: 10px;
        background: conic-gradient(
          from var(--shimmer-angle, 0deg),
          rgba(91,155,255,0.55),
          rgba(168,85,247,0.55),
          rgba(34,255,160,0.45),
          rgba(242,178,52,0.50),
          rgba(255,77,109,0.45),
          rgba(91,155,255,0.55)
        );
        -webkit-mask:
          linear-gradient(#000 0 0) content-box,
          linear-gradient(#000 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        filter: blur(12px);
        opacity: 0;
        transition: opacity 0.6s ease;
        pointer-events: none;
        z-index: 0;
      }
      .ai-card-thinking::before {
        opacity: 1;
        animation: shimmer-rotate 3s linear infinite;
      }
      .ai-card-thinking .ai-card-thinking-glow {
        opacity: 1;
        animation: shimmer-rotate 3s linear infinite;
      }
      @property --shimmer-angle {
        syntax: '<angle>';
        inherits: false;
        initial-value: 0deg;
      }
      @keyframes shimmer-rotate {
        to { --shimmer-angle: 360deg; }
      }
      @supports not (background: paint(worklet)) {
        .ai-card-thinking::before,
        .ai-card-thinking .ai-card-thinking-glow {
          animation: shimmer-rotate-fallback 3s linear infinite;
        }
      }
      @keyframes shimmer-rotate-fallback {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }

      /* Cursor spotlight */
      .ai-card-spotlight {
        position: absolute;
        inset: 0;
        border-radius: 24px;
        pointer-events: none;
        background: radial-gradient(
          circle 350px at var(--mx, 50%) var(--my, 50%),
          rgba(91,155,255,0.10) 0%,
          transparent 60%
        );
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1;
      }
      .ai-card:hover .ai-card-spotlight { opacity: 1; }

      /* Bottom reflection */
      .ai-card-bottom-reflection {
        position: absolute;
        bottom: 0; left: 0; right: 0;
        height: 24px;
        pointer-events: none;
        background: linear-gradient(180deg, transparent 0%, rgba(91,155,255,0.04) 100%);
        z-index: 0;
      }

      .ai-card-inner {
        position: relative;
        border-radius: 24px;
        overflow: hidden;
        z-index: 3;
      }

      /* Orb parallax wrap */
      .orb-wrap {
        will-change: transform;
        transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        transform: translate3d(
          calc(var(--sx, 0px) * var(--depth, 1) * -1),
          calc(var(--sy, 0px) * var(--depth, 1) * -1),
          0
        );
      }
      .faq-orb-1 { animation: orb-float-1 12s ease-in-out infinite alternate; will-change: transform; }
      .faq-orb-2 { animation: orb-float-2 14s ease-in-out infinite alternate; animation-delay: -3s; will-change: transform; }
      @keyframes orb-float-1 {
        0%   { transform: translate(0, 0) scale(1); }
        100% { transform: translate(-4%, 6%) scale(1.10); }
      }
      @keyframes orb-float-2 {
        0%   { transform: translate(0, 0) scale(1); }
        100% { transform: translate(5%, -4%) scale(1.12); }
      }
      @media (prefers-reduced-motion: reduce) {
        .orb-wrap { transition: none; transform: none !important; }
        .faq-orb-1, .faq-orb-2 { animation: none; }
      }

      /* State transitions */
      .state-in {
        animation: state-in 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      @keyframes state-in {
        from { opacity: 0; transform: translateY(6px); filter: blur(4px); }
        to   { opacity: 1; transform: translateY(0); filter: blur(0); }
      }
      .follow-up-in {
        animation: follow-up-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
      }
      @keyframes follow-up-in {
        from { opacity: 0; transform: translateY(8px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      /* Suggestion row */
      .suggestion-row {
        background: rgba(255,255,255,0.02);
        border: 1px solid rgba(255,255,255,0.04);
        transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        position: relative;
        overflow: hidden;
      }
      .suggestion-row:hover {
        background: rgba(91,155,255,0.06);
        border-color: rgba(91,155,255,0.18);
        transform: translateX(2px);
      }
      .suggestion-row:hover .suggestion-arrow {
        color: var(--c-blue-2) !important;
        transform: translateX(2px);
      }
      .suggestion-arrow {
        transition: all 0.22s ease;
      }
      .suggestion-num {
        font-family: var(--font-mono);
        font-size: 10px;
        color: rgba(255,255,255,0.35);
        width: 18px;
        flex-shrink: 0;
        letter-spacing: 0.05em;
      }
      .suggestion-tag.tag-blue   { background: rgba(91,155,255,0.10); color: #a8c4ff; border: 1px solid rgba(91,155,255,0.20); }
      .suggestion-tag.tag-green  { background: rgba(34,255,160,0.10); color: #6effc7; border: 1px solid rgba(34,255,160,0.20); }
      .suggestion-tag.tag-red    { background: rgba(255,77,109,0.10); color: #ff8fa6; border: 1px solid rgba(255,77,109,0.20); }
      .suggestion-tag.tag-gold   { background: rgba(242,178,52,0.10); color: #ffd17a; border: 1px solid rgba(242,178,52,0.20); }

      /* Skeleton lines */
      .skeleton-line {
        display: block;
        height: 12px;
        border-radius: 4px;
        background: linear-gradient(
          90deg,
          rgba(255,255,255,0.04) 0%,
          rgba(255,255,255,0.10) 50%,
          rgba(255,255,255,0.04) 100%
        );
        background-size: 200% 100%;
        animation: skeleton-shimmer 1.5s ease-in-out infinite;
      }
      @keyframes skeleton-shimmer {
        from { background-position: 0% 50%; }
        to   { background-position: -200% 50%; }
      }

      /* Avatar mesh layers */
      .mesh-1 { animation: mesh-rotate 8s linear infinite; }
      .mesh-2 { animation: mesh-rotate 6s linear infinite reverse; }
      @keyframes mesh-rotate {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }

      /* Lex ring animation */
      @keyframes lex-ring {
        to { transform: rotate(360deg); }
      }

      /* Lex halo sutil */
      .lex-halo {
        position: absolute;
        inset: -2px;
        border-radius: 50%;
        border: 1px solid rgba(91,155,255,0.28);
        pointer-events: none;
        animation: lex-halo-pulse 2.6s cubic-bezier(0.16, 1, 0.3, 1) infinite;
      }
      @keyframes lex-halo-pulse {
        0%   { transform: scale(0.96); opacity: 0.55; }
        80%  { transform: scale(1.55); opacity: 0; }
        100% { transform: scale(1.55); opacity: 0; }
      }

      /* Answer cursor */
      .answer-cursor {
        display: inline-block;
        width: 2px;
        height: 14px;
        background: var(--c-green);
        margin-left: 2px;
        vertical-align: middle;
        animation: answer-blink 0.9s steps(2) infinite;
      }
      @keyframes answer-blink { 50% { opacity: 0; } }

      /* Follow-up button */
      .follow-up-btn {
        background: rgba(255,255,255,0.02);
        border: 1px solid rgba(255,255,255,0.04);
        transition: all 0.22s;
      }
      .follow-up-btn:hover {
        background: rgba(91,155,255,0.06);
        border-color: rgba(91,155,255,0.18);
      }
      .follow-up-btn:hover .follow-up-arrow {
        color: var(--c-blue-2) !important;
        transform: translateX(2px);
      }
      .follow-up-arrow { transition: all 0.22s ease; }

      .reset-btn:hover { color: rgba(255,255,255,0.85) !important; }

      @keyframes subtle-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%      { opacity: 0.5; transform: scale(0.85); }
      }

      /* ─── HEADER · editorial minimal awwwards ─── */
      .lex-kicker {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 14px;
        margin-bottom: 38px;
      }
      .lex-kicker-bar {
        display: inline-block;
        width: 56px;
        height: 1px;
        background: rgba(255,255,255,0.30);
        animation: kicker-bar-in 1s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      @keyframes kicker-bar-in {
        from { width: 0; opacity: 0; }
        to   { opacity: 1; }
      }
      .lex-kicker-text {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10.5px;
        font-weight: 500;
        letter-spacing: 0.35em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.55);
      }
      .lex-kicker-num {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10.5px;
        font-weight: 500;
        letter-spacing: 0.18em;
        color: rgba(255,255,255,0.28);
        font-variant-numeric: tabular-nums;
      }

      /* Headline — display gigante, restraint absoluto, italic accent */
      .lex-headline {
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-size: clamp(2.6rem, 6.4vw, 5rem);
        line-height: 0.96;
        letter-spacing: -0.048em;
        font-weight: 500;
        color: rgba(255,255,255,0.96);
        display: flex;
        flex-direction: column;
        font-variation-settings: 'wdth' 95;
      }
      .lex-headline-line {
        display: block;
        animation: lex-headline-in 0.95s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      .lex-headline-1 { animation-delay: 0.05s; }
      .lex-headline-2 {
        animation-delay: 0.18s;
        color: var(--c-blue);
      }
      .lex-headline-2 em {
        font-style: italic;
        font-weight: 400;
        font-variation-settings: 'wdth' 90;
        margin: 0 -0.02em;
      }
      @keyframes lex-headline-in {
        from { opacity: 0; transform: translateY(14px); filter: blur(6px); }
        to   { opacity: 1; transform: translateY(0); filter: blur(0); }
      }

      /* Divider hairline editorial */
      .lex-divider {
        margin: 28px auto 18px;
        width: 32px;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent);
      }

      /* Meta inline editorial */
      .lex-meta {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 14px;
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 11px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.42);
        flex-wrap: wrap;
      }
      .lex-meta-dot {
        width: 2px; height: 2px;
        border-radius: 50%;
        background: rgba(255,255,255,0.30);
      }

      /* ─── HALFTONE DOT MATRIX · tech bg ─── */
      .lex-dotmatrix {
        position: absolute;
        inset: 0;
        background-image: radial-gradient(
          circle,
          rgba(200,220,255,0.11) 1px,
          transparent 1.5px
        );
        background-size: 24px 24px;
        background-position: 0 0;
        -webkit-mask: radial-gradient(
          ellipse 75% 65% at center,
          transparent 18%,
          rgba(0,0,0,0.55) 55%,
          black 85%
        );
        mask: radial-gradient(
          ellipse 75% 65% at center,
          transparent 18%,
          rgba(0,0,0,0.55) 55%,
          black 85%
        );
        pointer-events: none;
        z-index: 0;
        animation: lex-dot-fade-in 1.2s ease-out 0.2s both;
      }
      @keyframes lex-dot-fade-in {
        from { opacity: 0; transform: scale(1.06); }
        to   { opacity: 1; transform: scale(1); }
      }

      /* Glow layer — dots más brillantes solo cerca del cursor */
      .lex-dotmatrix-glow {
        position: absolute;
        inset: 0;
        background-image: radial-gradient(
          circle,
          rgba(160,200,255,0.65) 1.3px,
          transparent 1.8px
        );
        background-size: 24px 24px;
        background-position: 0 0;
        -webkit-mask: radial-gradient(
          circle 200px at var(--cx, -9999px) var(--cy, -9999px),
          black 0%,
          rgba(0,0,0,0.6) 40%,
          transparent 75%
        );
        mask: radial-gradient(
          circle 200px at var(--cx, -9999px) var(--cy, -9999px),
          black 0%,
          rgba(0,0,0,0.6) 40%,
          transparent 75%
        );
        pointer-events: none;
        z-index: 0;
        filter: drop-shadow(0 0 6px rgba(91,155,255,0.25));
      }
      @media (prefers-reduced-motion: reduce) {
        .lex-dotmatrix { animation: none; }
      }
    `}</style>
  )
}
