'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'

/**
 * PortalPreview — animación cinematográfica del flujo completo /cita/[token]
 * desde la perspectiva del cliente. 8 pasos en loop de 4-4.5s cada uno.
 * Datos vivos: nombres, emails, ciudades y casos se randomizan en cada ciclo.
 *
 * Motion craft: easing Apple `cubic-bezier(0.16, 1, 0.3, 1)`, crossfade con
 * blur+scale, spring overshoot en botones, stagger por elemento.
 */

interface Persona {
  firstName: string
  fullName: string
  email: string
  city: string
  caseNumber: string
  age: string
}

const PERSONAS: Persona[] = [
  { firstName: 'María', fullName: 'María González Pérez', email: 'maria.gonzalez', city: 'Phoenix · AZ', caseNumber: 'ULP-433', age: '17' },
  { firstName: 'Carlos', fullName: 'Carlos Hernández Soto', email: 'carlos.h.soto', city: 'Salt Lake City · UT', caseNumber: 'ULP-512', age: '19' },
  { firstName: 'Ana', fullName: 'Ana Martínez Cruz', email: 'ana.martinez', city: 'Newark · NJ', caseNumber: 'ULP-598', age: '16' },
  { firstName: 'José', fullName: 'José Luis Fernández', email: 'jose.luis.f', city: 'Houston · TX', caseNumber: 'ULP-621', age: '18' },
  { firstName: 'Sofía', fullName: 'Sofía Ramírez Vega', email: 'sofia.ramirez', city: 'Charlotte · NC', caseNumber: 'ULP-689', age: '15' },
  { firstName: 'Diego', fullName: 'Diego Vargas Mendoza', email: 'diego.vargas', city: 'Yonkers · NY', caseNumber: 'ULP-714', age: '20' },
]

const STEP_DURATIONS = [4000, 4000, 4500, 4000, 4500, 4500, 4000, 4500]
const TOTAL = STEP_DURATIONS.reduce((a, b) => a + b, 0)

const STEP_LABELS = [
  '01 · El cliente abre el link',
  '02 · Bienvenida personalizada',
  '03 · Datos del cliente',
  '04 · Elegibilidad SIJS',
  '05 · Información familiar',
  '06 · Subiendo documentos',
  '07 · Enviando el caso',
  '08 · ¡Listo! Portal activo',
]

export function PortalPreview() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(false)
  const [step, setStep] = useState(0)
  const [personaIdx, setPersonaIdx] = useState(0)

  const persona = useMemo(() => PERSONAS[personaIdx % PERSONAS.length], [personaIdx])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(true)
            break
          }
        }
      },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!active) return
    const timers: ReturnType<typeof setTimeout>[] = []
    function runCycle() {
      let t = 0
      STEP_DURATIONS.forEach((d, i) => {
        timers.push(setTimeout(() => setStep(i), t))
        t += d
      })
    }
    runCycle()
    const loop = setInterval(() => {
      setPersonaIdx((p) => p + 1)
      setStep(0)
      runCycle()
    }, TOTAL)
    return () => {
      timers.forEach(clearTimeout)
      clearInterval(loop)
    }
  }, [active])

  return (
    <section
      id="portal"
      ref={ref}
      className="l2-aurora l2-aurora-portal relative py-20 md:py-28"
      style={{ background: 'var(--c-carbon-1)' }}
    >
      <div className="l2-aurora-layer">
        <span className="l2-orb l2-orb-1" />
        <span className="l2-orb l2-orb-2" />
        <div className="l2-glass-refract" />
        <div className="l2-noise" />
      </div>
      <div aria-hidden className="absolute inset-0 l2-grid-bg opacity-40 pointer-events-none" />

      <div className="l2-container relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Copy izquierda */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <span className="l2-chip l2-chip-blue mb-5">
              <ChipIcon />
              Demo en tiempo real
            </span>
            <h2
              className="l2-display text-[var(--c-fg)] mb-5"
              style={{ fontSize: 'clamp(1.85rem, 4.2vw, 3.25rem)' }}
            >
              Mira cómo lo hacen
              <br />
              <span style={{ color: 'var(--c-blue)' }}>otros clientes</span>.
            </h2>
            <p className="text-base md:text-lg text-[var(--c-fg-2)] leading-relaxed mb-7 max-w-lg">
              Cada caso empieza con un link único. Tu cliente llena el formulario desde el celular, sube documentos, y todo llega a tu paralegal en tiempo real. Sin papeleo, sin oficina.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                { c: 'var(--c-blue)', t: 'Link único · sin contraseña' },
                { c: 'var(--c-green)', t: 'Autoguardado cada tecla' },
                { c: 'var(--c-blue)', t: 'Validación legal antes de enviar' },
                { c: 'var(--c-red)', t: 'Tu paralegal recibe todo al instante' },
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${f.c}1a`, border: `1px solid ${f.c}55` }}
                  >
                    <CheckIcon color={f.c} />
                  </span>
                  <span className="text-[15px] text-[var(--c-fg)]">{f.t}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="#productos" className="l2-btn l2-btn-blue text-sm px-6 py-3.5">
                Empezar mi caso
                <ArrowRight />
              </Link>
              <a
                href="https://app.usalatinoprime.com"
                target="_blank"
                rel="noopener noreferrer"
                className="l2-btn l2-btn-ghost text-sm px-6 py-3.5"
              >
                Ver demo en vivo
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="lg:col-span-6 order-1 lg:order-2 relative">
            <PhoneFrame step={step}>
              <ScreenSwitcher step={step} persona={persona} />
            </PhoneFrame>

            <SpecLabel text="Link único · Sin contraseña" position="top-6 -left-2 lg:-left-10" color="var(--c-blue)" active={active} delay={1.5} />
            <SpecLabel text="USCIS · Validado" position="top-1/3 -right-2 lg:-right-10" color="var(--c-green)" active={active} delay={2} />
            <SpecLabel text="Llega a paralegal · al instante" position="bottom-6 -left-2 lg:-left-10" color="var(--c-red)" active={active} delay={2.5} />
          </div>
        </div>

        {/* Step indicator + label debajo */}
        <div className="flex flex-col items-center gap-3 mt-12">
          <div className="flex items-center justify-center gap-2">
            {STEP_LABELS.map((_, i) => (
              <span
                key={i}
                className="h-1 rounded-full transition-all duration-700"
                style={{
                  width: step === i ? 32 : 8,
                  background: step >= i ? 'var(--c-blue)' : 'var(--c-line-2)',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            ))}
          </div>
          <p
            key={step}
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--c-fg-3)] label-fade"
          >
            {STEP_LABELS[step]}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes breathe {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(1.06); }
        }
        :global(.breathe-glow) {
          animation: breathe 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes label-fade {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        :global(.label-fade) {
          animation: label-fade 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>
    </section>
  )
}

/* ════════════════ SCREEN SWITCHER (crossfade-blur) ════════════════ */
function ScreenSwitcher({ step, persona }: { step: number; persona: Persona }) {
  return (
    <div className="absolute inset-0 overflow-hidden" key={`${step}-${persona.caseNumber}`}>
      <ProgressBar step={step} />
      <div className="screen-wrap absolute inset-0 pt-12 pb-3 px-4 flex flex-col text-[#fafafa]">
        {step === 0 && <Step0Open persona={persona} />}
        {step === 1 && <Step1Welcome persona={persona} />}
        {step === 2 && <Step2Personal persona={persona} />}
        {step === 3 && <Step3SIJS persona={persona} />}
        {step === 4 && <Step4Family persona={persona} />}
        {step === 5 && <Step5Docs persona={persona} />}
        {step === 6 && <Step6Submit />}
        {step === 7 && <Step7Portal persona={persona} />}
      </div>
      <style jsx>{`
        .screen-wrap {
          animation: screen-in 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes screen-in {
          0% { opacity: 0; transform: scale(0.97); filter: blur(8px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }
      `}</style>
    </div>
  )
}

/* ════════════════ PHONE FRAME ════════════════ */
function PhoneFrame({ step, children }: { step: number; children: React.ReactNode }) {
  return (
    <div className="relative mx-auto" style={{ width: 'min(320px, 100%)' }}>
      <div
        className="relative rounded-[44px] p-3 phone-tilt"
        style={{
          background: 'linear-gradient(140deg, #1d1d1f 0%, #0a0a0a 100%)',
          border: '1px solid #2a2a2c',
          boxShadow: '0 60px 120px -40px rgba(0,0,0,0.75), 0 0 0 1px rgba(91,155,255,0.10), inset 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        <span aria-hidden className="absolute -left-[3px] top-24 w-[3px] h-12 rounded-l-sm" style={{ background: '#2a2a2c' }} />
        <span aria-hidden className="absolute -right-[3px] top-32 w-[3px] h-16 rounded-r-sm" style={{ background: '#2a2a2c' }} />

        <div
          className="relative rounded-[34px] overflow-hidden"
          style={{ background: '#0e0e10', aspectRatio: '9 / 19.5' }}
        >
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[88px] h-[26px] rounded-full z-30" style={{ background: '#000' }} />
          <div className="absolute top-0 left-0 right-0 h-9 flex items-center justify-between px-6 z-20">
            <span className="text-[10px] font-semibold text-white">9:41</span>
            <div className="flex items-center gap-1">
              <StatusSignal />
              <StatusWifi />
              <StatusBattery />
            </div>
          </div>
          {children}
        </div>
      </div>

      <div
        aria-hidden
        className="absolute -inset-8 -z-10 rounded-[60px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(91,155,255,0.20) 0%, transparent 60%)',
          filter: 'blur(34px)',
        }}
      />

      <style jsx>{`
        .phone-tilt {
          animation: phone-breathe 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes phone-breathe {
          0%, 100% { transform: rotateY(0deg) rotateX(0deg); }
          50% { transform: rotateY(-1.2deg) rotateX(0.6deg); }
        }
      `}</style>
    </div>
  )
}

/* ════════════════ PROGRESS BAR ════════════════ */
function ProgressBar({ step }: { step: number }) {
  const pct = ((step + 1) / 8) * 100
  return (
    <div className="absolute top-9 left-4 right-4 h-1 rounded-full z-20" style={{ background: 'rgba(255,255,255,0.08)' }}>
      <div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{
          width: `${pct}%`,
          background: step >= 7 ? 'linear-gradient(90deg, var(--c-blue), var(--c-green))' : 'var(--c-blue)',
          boxShadow: '0 0 14px rgba(91,155,255,0.45)',
          transition: 'width 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </div>
  )
}

/* ══════════════════════════════════════════════
   STEP 0 — Cliente abre el link único
   ══════════════════════════════════════════════ */
function Step0Open({ persona }: { persona: Persona }) {
  const token = persona.caseNumber.toLowerCase().replace('-', '')
  return (
    <div className="flex flex-col h-full">
      {/* Browser bar */}
      <div
        className="rounded-lg px-2.5 py-2 flex items-center gap-2 stagger-item"
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.08)',
          ['--d' as never]: '0.2s',
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--c-green)' }} />
        <span className="text-[9px] font-mono truncate" style={{ color: 'rgba(255,255,255,0.6)' }}>
          usalatinoprime.com/cita/<span style={{ color: 'var(--c-blue)' }}>{token}xy7</span>
        </span>
      </div>

      {/* Loading bar Apple-style */}
      <div className="mt-2 h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div className="loading-stripe h-full" style={{ background: 'var(--c-blue)' }} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 stagger-item"
          style={{
            background: 'linear-gradient(135deg, var(--c-blue) 0%, rgba(91,155,255,0.55) 100%)',
            boxShadow: '0 12px 24px -8px rgba(91,155,255,0.5)',
            ['--d' as never]: '0.5s',
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M11 4l8 8M19 4l-8 8M11 12l8 8M19 12l-8 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <p className="text-[9px] font-mono uppercase tracking-[0.22em] stagger-item" style={{ color: 'rgba(255,255,255,0.4)', ['--d' as never]: '0.7s' }}>
          UsaLatinoPrime
        </p>
        <h4
          className="mt-1.5 text-[15px] leading-tight stagger-item"
          style={{
            fontFamily: 'var(--font-bricolage), serif',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            ['--d' as never]: '0.9s',
          }}
        >
          Bienvenido a tu portal
        </h4>
        <p className="mt-2 text-[10px] leading-relaxed stagger-item" style={{ color: 'rgba(255,255,255,0.55)', ['--d' as never]: '1.1s' }}>
          Tu link único · Sin contraseña
        </p>

        <div
          className="mt-5 px-4 py-2 rounded-lg flex items-center gap-2 stagger-item"
          style={{
            background: 'rgba(91,155,255,0.10)',
            border: '1px solid rgba(91,155,255,0.30)',
            ['--d' as never]: '1.3s',
          }}
        >
          <span className="l2-pulse" />
          <span className="text-[9.5px] font-mono uppercase tracking-[0.15em]" style={{ color: 'var(--c-blue-2)' }}>
            Caso #{persona.caseNumber}
          </span>
        </div>
      </div>

      <CommonStyles />
      <style jsx>{`
        .loading-stripe {
          width: 0%;
          animation: load 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
        }
        @keyframes load {
          0% { width: 0%; }
          70% { width: 88%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}

/* ══════════════════════════════════════════════
   STEP 1 — Bienvenida personal con timeline
   ══════════════════════════════════════════════ */
function Step1Welcome({ persona }: { persona: Persona }) {
  return (
    <div className="flex flex-col h-full">
      <p className="text-[9px] font-mono uppercase tracking-[0.2em] stagger-item" style={{ color: 'rgba(255,255,255,0.4)', ['--d' as never]: '0.2s' }}>
        TU CASO · VISA JUVENIL
      </p>
      <h3
        className="mt-1.5 text-[20px] leading-tight stagger-item"
        style={{
          fontFamily: 'var(--font-bricolage), serif',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          fontStyle: 'italic',
          ['--d' as never]: '0.4s',
        }}
      >
        Hola, {persona.firstName} <span className="wave-hand">👋</span>
      </h3>
      <p
        className="mt-1.5 text-[11px] leading-relaxed stagger-item"
        style={{ color: 'rgba(255,255,255,0.55)', ['--d' as never]: '0.65s' }}
      >
        Tu proceso migratorio está en marcha.
      </p>

      {/* Mini timeline */}
      <div
        className="mt-5 rounded-xl p-3.5 stagger-item"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          ['--d' as never]: '0.9s',
        }}
      >
        <p className="text-[9px] font-mono uppercase tracking-[0.12em] mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Tu progreso
        </p>
        <div className="relative">
          <div className="absolute top-3 left-3 right-3 h-px" style={{ background: 'rgba(255,255,255,0.10)' }} />
          <div
            className="absolute top-3 left-3 h-px"
            style={{
              width: '46%',
              background: 'linear-gradient(90deg, var(--c-green), var(--c-blue))',
              animation: 'line-draw 1.4s cubic-bezier(0.16, 1, 0.3, 1) 1.2s both',
            }}
          />
          <div className="flex justify-between">
            <TimelineNode label="Custodia" state="done" delay={1.1} />
            <TimelineNode label="I-360" state="active" delay={1.4} pulse />
            <TimelineNode label="I-485" state="pending" delay={1.7} />
          </div>
        </div>
      </div>

      <div
        className="mt-4 rounded-xl p-3 flex items-center gap-3 stagger-item"
        style={{
          background: 'rgba(91,155,255,0.08)',
          border: '1px solid rgba(91,155,255,0.20)',
          ['--d' as never]: '1.5s',
        }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(91,155,255,0.20)', border: '1px solid rgba(91,155,255,0.40)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M3 7l9-4 9 4-9 4-9-4z" stroke="var(--c-blue-2)" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M21 12l-9 4-9-4M21 16l-9 4-9-4" stroke="var(--c-blue-2)" strokeWidth="1.6" strokeLinejoin="round" opacity="0.6" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10.5px] font-semibold truncate" style={{ color: '#fafafa' }}>
            Llena tu formulario
          </p>
          <p className="text-[9px] truncate" style={{ color: 'rgba(255,255,255,0.55)' }}>
            6 minutos · 24 preguntas
          </p>
        </div>
        <span className="text-[9px] font-mono uppercase tracking-[0.1em] px-2 py-1 rounded-md" style={{ background: 'var(--c-blue)', color: '#fff' }}>
          Empezar
        </span>
      </div>

      <CommonStyles />
      <style jsx>{`
        @keyframes line-draw { from { width: 0%; } to { width: 46%; } }
        @keyframes wave {
          0%, 60%, 100% { transform: rotate(0); }
          15% { transform: rotate(14deg); }
          30% { transform: rotate(-8deg); }
          45% { transform: rotate(10deg); }
        }
        :global(.wave-hand) {
          display: inline-block;
          transform-origin: 70% 70%;
          animation: wave 1.8s ease-in-out infinite 1s;
        }
      `}</style>
    </div>
  )
}

/* ══════════════════════════════════════════════
   STEP 2 — Información personal (typing)
   ══════════════════════════════════════════════ */
function Step2Personal({ persona }: { persona: Persona }) {
  const phone = `+1 (${randomDigits(3, persona.caseNumber)}) ${randomDigits(3, persona.fullName)} ${randomDigits(4, persona.email)}`
  return (
    <div className="flex flex-col h-full">
      <p className="text-[9px] font-mono uppercase tracking-[0.2em] stagger-item" style={{ color: 'rgba(255,255,255,0.4)', ['--d' as never]: '0.15s' }}>
        Sección 1 / 4 · Datos personales
      </p>
      <h4
        className="mt-1 text-[14px] leading-snug stagger-item"
        style={{
          fontFamily: 'var(--font-bricolage), serif',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          ['--d' as never]: '0.35s',
        }}
      >
        Cuéntanos sobre ti
      </h4>

      <div className="mt-4 space-y-3">
        <TypeField label="Nombre completo" value={persona.fullName} delay={0.6} />
        <TypeField label="Correo electrónico" value={`${persona.email}@gmail.com`} delay={1.6} />
        <TypeField label="Teléfono" value={phone} delay={2.5} />
      </div>

      {/* Autosave badge */}
      <div
        className="mt-auto flex items-center gap-2 stagger-item"
        style={{ ['--d' as never]: '3.4s' }}
      >
        <span className="l2-pulse" style={{ background: 'var(--c-green)' }} />
        <span className="text-[9px] font-mono uppercase tracking-[0.12em]" style={{ color: 'var(--c-green)' }}>
          Guardado · hace 0 seg
        </span>
      </div>

      <CommonStyles />
    </div>
  )
}

function TypeField({ label, value, delay }: { label: string; value: string; delay: number }) {
  return (
    <div className="type-field stagger-item" style={{ ['--d' as never]: `${delay - 0.2}s` }}>
      <label className="block text-[9px] font-mono uppercase tracking-[0.12em] mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
        {label}
      </label>
      <div
        className="rounded-lg px-3 py-2 text-[12px] flex items-center"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(91,155,255,0.30)',
          minHeight: '34px',
          boxShadow: '0 0 0 3px rgba(91,155,255,0.06)',
        }}
      >
        <span
          className="typed"
          style={{
            ['--chars' as never]: value.length,
            ['--type-delay' as never]: `${delay}s`,
          }}
        >
          {value}
        </span>
        <span
          className="cursor"
          style={{
            ['--cursor-delay' as never]: `${delay}s`,
            ['--cursor-end' as never]: `${delay + value.length * 0.045 + 0.3}s`,
          }}
        />
      </div>
      <style jsx>{`
        .typed {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          max-width: 0;
          color: #fafafa;
          letter-spacing: -0.01em;
          animation: type calc(var(--chars) * 0.045s) cubic-bezier(0.4, 0, 0.2, 1) var(--type-delay) forwards;
        }
        @keyframes type { to { max-width: 100%; } }
        .cursor {
          display: inline-block;
          width: 1.5px;
          height: 13px;
          background: var(--c-blue);
          margin-left: 1.5px;
          opacity: 0;
          animation:
            cursor-show 0.1s ease-in var(--cursor-delay) forwards,
            cursor-blink 0.55s steps(1) var(--cursor-delay) infinite,
            cursor-hide 0.1s ease-out var(--cursor-end) forwards;
        }
        @keyframes cursor-show { to { opacity: 1; } }
        @keyframes cursor-hide { to { opacity: 0; } }
        @keyframes cursor-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.15; }
        }
      `}</style>
    </div>
  )
}

/* ══════════════════════════════════════════════
   STEP 3 — Elegibilidad SIJS (radio question)
   ══════════════════════════════════════════════ */
function Step3SIJS({ persona }: { persona: Persona }) {
  return (
    <div className="flex flex-col h-full">
      <p className="text-[9px] font-mono uppercase tracking-[0.2em] stagger-item" style={{ color: 'rgba(255,255,255,0.4)', ['--d' as never]: '0.15s' }}>
        Sección 2 / 4 · Elegibilidad
      </p>
      <h4
        className="mt-1 text-[14px] leading-snug stagger-item"
        style={{
          fontFamily: 'var(--font-bricolage), serif',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          ['--d' as never]: '0.35s',
        }}
      >
        ¿Cuál es tu edad?
      </h4>
      <p className="mt-1 text-[10px] stagger-item" style={{ color: 'rgba(255,255,255,0.55)', ['--d' as never]: '0.55s' }}>
        Requisito SIJS: ser menor de 21
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <AgePill text="Menor de 18" delay={0.85} />
        <AgePill text="18 - 20" delay={1.0} picked age={persona.age} />
        <AgePill text="21 o más" delay={1.15} />
        <AgePill text="Prefiero no decirlo" delay={1.3} />
      </div>

      {/* Eligibility banner */}
      <div
        className="mt-auto rounded-xl px-3 py-2.5 flex items-center gap-2.5 stagger-item"
        style={{
          background: 'linear-gradient(135deg, rgba(34,255,160,0.16), rgba(34,255,160,0.04))',
          border: '1px solid rgba(34,255,160,0.30)',
          ['--d' as never]: '2.4s',
        }}
      >
        <span
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'var(--c-green)' }}
        >
          <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M3 6l2 2 4-4" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold" style={{ color: '#fafafa' }}>
            Calificas para SIJS
          </p>
          <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Visa Juvenil Especial Inmigrante
          </p>
        </div>
      </div>

      <CommonStyles />
    </div>
  )
}

function AgePill({ text, picked, age, delay }: { text: string; picked?: boolean; age?: string; delay: number }) {
  return (
    <div
      className="rounded-lg px-2.5 py-2.5 text-[10px] flex items-center gap-2 age-pill"
      style={{
        background: picked ? 'rgba(91,155,255,0.16)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${picked ? 'var(--c-blue)' : 'rgba(255,255,255,0.08)'}`,
        color: picked ? '#fafafa' : 'rgba(255,255,255,0.7)',
        boxShadow: picked ? '0 0 0 3px rgba(91,155,255,0.10)' : 'none',
        ['--d' as never]: `${delay}s`,
      }}
    >
      <span
        className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          background: picked ? 'var(--c-blue)' : 'transparent',
          border: `1.5px solid ${picked ? 'var(--c-blue)' : 'rgba(255,255,255,0.25)'}`,
        }}
      >
        {picked && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
      </span>
      <span className="leading-tight">{picked && age ? `${age} años` : text}</span>
      <style jsx>{`
        .age-pill {
          opacity: 0;
          transform: translateY(6px) scale(0.95);
          animation: pill-spring 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) var(--d) forwards;
        }
        @keyframes pill-spring {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}

/* ══════════════════════════════════════════════
   STEP 4 — Información familiar
   ══════════════════════════════════════════════ */
function Step4Family({ persona }: { persona: Persona }) {
  const motherFirst = persona.firstName === 'María' ? 'Carmen' :
                      persona.firstName === 'Carlos' ? 'Rosa' :
                      persona.firstName === 'Ana' ? 'Beatriz' :
                      persona.firstName === 'José' ? 'Lucía' :
                      persona.firstName === 'Sofía' ? 'Patricia' : 'Elena'
  const motherFull = `${motherFirst} ${persona.fullName.split(' ').slice(1, 2).join(' ')}`
  return (
    <div className="flex flex-col h-full">
      <p className="text-[9px] font-mono uppercase tracking-[0.2em] stagger-item" style={{ color: 'rgba(255,255,255,0.4)', ['--d' as never]: '0.15s' }}>
        Sección 3 / 4 · Familia
      </p>
      <h4
        className="mt-1 text-[14px] leading-snug stagger-item"
        style={{
          fontFamily: 'var(--font-bricolage), serif',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          ['--d' as never]: '0.35s',
        }}
      >
        Sobre tus padres
      </h4>

      <div className="mt-4 space-y-3">
        <TypeField label="Nombre de tu mamá" value={motherFull} delay={0.7} />
        <TypeField label="Ciudad donde vives" value={persona.city} delay={1.9} />
      </div>

      {/* Yes/no question */}
      <div
        className="mt-4 rounded-xl p-3 stagger-item"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          ['--d' as never]: '2.8s',
        }}
      >
        <p className="text-[10px] mb-2.5" style={{ color: '#fafafa' }}>
          ¿Tu papá vive en EE.UU.?
        </p>
        <div className="flex gap-2">
          <YesNoChip text="Sí" delay={3.0} />
          <YesNoChip text="No, vive en mi país" delay={3.15} picked />
        </div>
      </div>

      <CommonStyles />
    </div>
  )
}

function YesNoChip({ text, picked, delay }: { text: string; picked?: boolean; delay: number }) {
  return (
    <div
      className="flex-1 rounded-md px-2.5 py-1.5 text-[10px] flex items-center gap-1.5 yn-chip"
      style={{
        background: picked ? 'rgba(91,155,255,0.18)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${picked ? 'var(--c-blue)' : 'rgba(255,255,255,0.08)'}`,
        color: picked ? '#fafafa' : 'rgba(255,255,255,0.7)',
        ['--d' as never]: `${delay}s`,
      }}
    >
      {picked && (
        <span className="w-3 h-3 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--c-blue)' }}>
          <svg width="6" height="6" viewBox="0 0 12 12" fill="none">
            <path d="M3 6l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
      {text}
      <style jsx>{`
        .yn-chip {
          opacity: 0;
          transform: scale(0.94);
          animation: yn-in 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) var(--d) forwards;
        }
        @keyframes yn-in {
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

/* ══════════════════════════════════════════════
   STEP 5 — Subiendo documentos
   ══════════════════════════════════════════════ */
function Step5Docs({ persona }: { persona: Persona }) {
  const docName = `pasaporte_${persona.firstName.toLowerCase()}.pdf`
  return (
    <div className="flex flex-col h-full">
      <p className="text-[9px] font-mono uppercase tracking-[0.2em] stagger-item" style={{ color: 'rgba(255,255,255,0.4)', ['--d' as never]: '0.15s' }}>
        Sección 4 / 4 · Documentos
      </p>
      <h4
        className="mt-1 text-[14px] leading-snug stagger-item"
        style={{
          fontFamily: 'var(--font-bricolage), serif',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          ['--d' as never]: '0.35s',
        }}
      >
        Sube tu pasaporte
      </h4>

      {/* Drop zone — sube */}
      <div
        className="mt-4 relative rounded-xl p-3 overflow-hidden stagger-item"
        style={{
          background: 'rgba(91,155,255,0.06)',
          border: '1.5px dashed rgba(91,155,255,0.4)',
          ['--d' as never]: '0.55s',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="file-icon relative w-10 h-12 rounded flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, rgba(91,155,255,0.45), rgba(91,155,255,0.15))',
              border: '1px solid rgba(91,155,255,0.5)',
            }}
          >
            <span aria-hidden className="absolute top-0 right-0 w-3 h-3" style={{
              background: 'rgba(91,155,255,0.65)',
              clipPath: 'polygon(0 0, 100% 100%, 0 100%)',
            }} />
            <div className="absolute inset-0 flex items-center justify-center text-[7px] font-mono font-bold" style={{ color: '#fff' }}>PDF</div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10.5px] font-semibold truncate" style={{ color: '#fafafa' }}>{docName}</p>
            <p className="text-[8.5px]" style={{ color: 'rgba(255,255,255,0.5)' }}>2.4 MB · Subiendo…</p>
            <div className="upload-bar mt-2 h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <div className="upload-fill h-full rounded-full" style={{ background: 'linear-gradient(90deg, var(--c-blue), var(--c-blue-2))' }} />
            </div>
          </div>
        </div>

        {/* Floating particles */}
        {[0, 1, 2, 3].map(i => (
          <span key={i} className={`up-particle p-${i}`} style={{ ['--pd' as never]: `${0.7 + i * 0.18}s` }} />
        ))}
      </div>

      {/* Done file — partida nacimiento */}
      <div
        className="mt-3 done-file rounded-lg px-3 py-2.5 flex items-center gap-2.5"
        style={{
          background: 'rgba(34,255,160,0.10)',
          border: '1px solid rgba(34,255,160,0.30)',
        }}
      >
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'var(--c-green)' }}
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M3 6l2 2 4-4" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-[10.5px] font-semibold truncate" style={{ color: '#fafafa' }}>partida_nacimiento.pdf</p>
          <p className="text-[8.5px]" style={{ color: 'var(--c-green)' }}>Cargado · Verificado</p>
        </div>
      </div>

      {/* AI validation badge */}
      <div
        className="mt-auto rounded-xl px-3 py-2 flex items-center gap-2 stagger-item"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          ['--d' as never]: '3s',
        }}
      >
        <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(91,155,255,0.15)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1l1.5 4 4 .5-3 2.8.7 4.2L7 10.5 3.8 12.5l.7-4.2-3-2.8 4-.5L7 1z" stroke="var(--c-blue-2)" strokeWidth="1.2" fill="rgba(91,155,255,0.25)" strokeLinejoin="round" />
          </svg>
        </span>
        <div className="flex-1">
          <p className="text-[10px] font-semibold" style={{ color: '#fafafa' }}>Validación automática</p>
          <p className="text-[8.5px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Datos coinciden con tu formulario</p>
        </div>
      </div>

      <CommonStyles />
      <style jsx>{`
        .file-icon {
          animation: file-drop 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both;
        }
        @keyframes file-drop {
          from { opacity: 0; transform: translateY(-14px) scale(0.85) rotate(-3deg); }
          to { opacity: 1; transform: translateY(0) scale(1) rotate(0); }
        }
        .upload-fill {
          width: 0%;
          animation: upload 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards;
          box-shadow: 0 0 8px rgba(91,155,255,0.45);
        }
        @keyframes upload { to { width: 100%; } }
        .done-file {
          opacity: 0;
          transform: translateY(8px);
          animation: done-in 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 2.4s forwards;
        }
        @keyframes done-in {
          to { opacity: 1; transform: translateY(0); }
        }
        .up-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--c-blue);
          left: 25%;
          bottom: 32%;
          opacity: 0;
          animation: fly-up 1.6s ease-out var(--pd) infinite;
        }
        .up-particle.p-1 { left: 32%; background: var(--c-blue-2); }
        .up-particle.p-2 { left: 40%; }
        .up-particle.p-3 { left: 48%; background: var(--c-blue-2); }
        @keyframes fly-up {
          0% { opacity: 0; transform: translateY(0); }
          20% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-55px); }
        }
      `}</style>
    </div>
  )
}

/* ══════════════════════════════════════════════
   STEP 6 — Enviando con spinner premium
   ══════════════════════════════════════════════ */
function Step6Submit() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="relative mb-5">
        <div
          className="w-20 h-20 rounded-full stagger-item"
          style={{
            background: 'rgba(91,155,255,0.10)',
            border: '1px solid rgba(91,155,255,0.30)',
            ['--d' as never]: '0.1s',
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: '2px solid transparent',
            borderTopColor: 'var(--c-blue)',
            borderRightColor: 'var(--c-blue-2)',
            animation: 'spin 1.1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M3 11l5-5 8 8 5-5" stroke="var(--c-blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="path-pulse" />
          </svg>
        </div>
      </div>

      <h4
        className="text-[14px] leading-tight mb-1.5 stagger-item"
        style={{
          fontFamily: 'var(--font-bricolage), serif',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          ['--d' as never]: '0.3s',
        }}
      >
        Enviando tu caso
      </h4>
      <p className="text-[10px] mb-5 flex items-center gap-1 stagger-item" style={{ color: 'rgba(255,255,255,0.55)', ['--d' as never]: '0.5s' }}>
        Encriptando datos<Dots />
      </p>

      <div className="space-y-1.5 w-full">
        <ProcStep text="Validando 24 respuestas" delay={0.7} done />
        <ProcStep text="Encriptando documentos" delay={1.4} done />
        <ProcStep text="Notificando a paralegal" delay={2.3} loading />
      </div>

      <CommonStyles />
      <style jsx>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .path-pulse {
          animation: path-pulse 1.8s ease-in-out infinite;
        }
        @keyframes path-pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

function ProcStep({ text, delay, done, loading }: { text: string; delay: number; done?: boolean; loading?: boolean }) {
  return (
    <div
      className="rounded-md px-2.5 py-1.5 text-[10px] flex items-center gap-2 proc-step"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.06)',
        ['--d' as never]: `${delay}s`,
      }}
    >
      {done && (
        <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{ background: 'var(--c-green)' }}>
          <svg width="7" height="7" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M3 6l2 2 4-4" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
      {loading && <span className="l2-pulse" style={{ background: 'var(--c-blue)' }} />}
      <span style={{ color: 'rgba(255,255,255,0.78)' }}>{text}</span>
      <style jsx>{`
        .proc-step {
          opacity: 0;
          transform: translateX(-6px);
          animation: proc-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) var(--d) forwards;
        }
        @keyframes proc-in {
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}

function Dots() {
  return (
    <span className="dots-anim">
      <span style={{ animationDelay: '0s' }}>.</span>
      <span style={{ animationDelay: '0.18s' }}>.</span>
      <span style={{ animationDelay: '0.36s' }}>.</span>
      <style jsx>{`
        .dots-anim span {
          display: inline-block;
          animation: bounce 1.1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes bounce {
          0%, 80%, 100% { opacity: 0.3; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-2px); }
        }
      `}</style>
    </span>
  )
}

/* ══════════════════════════════════════════════
   STEP 7 — Portal activo (post submit)
   Curtain reveal + dashboard real
   ══════════════════════════════════════════════ */
function Step7Portal({ persona }: { persona: Persona }) {
  return (
    <div className="flex flex-col h-full relative">
      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className="confetti"
            style={{
              left: `${(i * 9 + (i % 3) * 13) % 100}%`,
              background: i % 3 === 0 ? 'var(--c-blue)' : i % 3 === 1 ? 'var(--c-green)' : 'var(--c-red)',
              animationDelay: `${(i % 7) * 0.1}s`,
              width: i % 4 === 0 ? '6px' : '4px',
              height: i % 4 === 0 ? '8px' : '5px',
            }}
          />
        ))}
      </div>

      {/* Check + heading */}
      <div className="flex flex-col items-center text-center mb-4 stagger-item" style={{ ['--d' as never]: '0.3s' }}>
        <div className="relative mb-3">
          <span className="check-ring absolute inset-0 rounded-full" style={{ border: '2px solid var(--c-green)' }} />
          <div
            className="relative w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(34,255,160,0.18)',
              border: '2px solid var(--c-green)',
              boxShadow: '0 0 0 6px rgba(34,255,160,0.10), 0 12px 32px -8px rgba(34,255,160,0.45)',
            }}
          >
            <svg width="26" height="26" viewBox="0 0 36 36" fill="none" aria-hidden>
              <path
                d="M10 18l5 5 11-11"
                stroke="var(--c-green)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="check-path"
              />
            </svg>
          </div>
        </div>
        <h4
          className="text-[15px] leading-tight"
          style={{
            fontFamily: 'var(--font-bricolage), serif',
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          ¡Caso enviado!
        </h4>
        <p className="text-[10px] mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Vanessa te contactará en 24h
        </p>
      </div>

      {/* Case card — portal real activo */}
      <div
        className="rounded-xl p-3.5 portal-card stagger-item"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(91,155,255,0.20)',
          ['--d' as never]: '1.4s',
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-[9px] font-mono uppercase tracking-[0.15em] px-2 py-0.5 rounded" style={{ background: 'rgba(91,155,255,0.20)', color: 'var(--c-blue-2)' }}>
            CASO #{persona.caseNumber}
          </span>
          <span className="text-[8.5px] font-mono uppercase tracking-[0.1em] flex items-center gap-1.5" style={{ color: 'var(--c-green)' }}>
            <span className="l2-pulse" style={{ background: 'var(--c-green)' }} />
            ACTIVO
          </span>
        </div>

        <p className="text-[11px] font-semibold mb-0.5" style={{ color: '#fafafa' }}>
          {persona.firstName} · Visa Juvenil
        </p>
        <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
          {persona.city}
        </p>

        <div className="mt-3 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="relative">
            <div className="absolute top-2.5 left-2.5 right-2.5 h-px" style={{ background: 'rgba(255,255,255,0.10)' }} />
            <div
              className="absolute top-2.5 left-2.5 h-px portal-line"
              style={{
                background: 'linear-gradient(90deg, var(--c-green), var(--c-blue))',
              }}
            />
            <div className="flex justify-between">
              <TimelineNode label="Custodia" state="done" delay={1.7} small />
              <TimelineNode label="I-360" state="active" delay={1.95} pulse small />
              <TimelineNode label="I-485" state="pending" delay={2.2} small />
            </div>
          </div>
        </div>
      </div>

      {/* Assigned team */}
      <div
        className="mt-3 rounded-xl px-3 py-2 flex items-center gap-2.5 stagger-item"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          ['--d' as never]: '2.4s',
        }}
      >
        <div className="flex -space-x-1.5">
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold"
            style={{
              background: 'rgba(91,155,255,0.20)',
              border: '1.5px solid #0e0e10',
              color: 'var(--c-blue)',
              boxShadow: '0 0 0 1px rgba(91,155,255,0.35)',
            }}
          >
            VC
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[9.5px] font-semibold truncate" style={{ color: '#fafafa' }}>
            Vanessa Cruz · Paralegal
          </p>
          <p className="text-[8px] truncate" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Tu acompañamiento puntual
          </p>
        </div>
      </div>

      <CommonStyles />
      <style jsx>{`
        .check-path {
          stroke-dasharray: 30;
          stroke-dashoffset: 30;
          animation: draw 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
        }
        @keyframes draw { to { stroke-dashoffset: 0; } }
        .check-ring {
          opacity: 0.5;
          animation: ring 1.6s ease-out 0.8s infinite;
        }
        @keyframes ring {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        .confetti {
          position: absolute;
          top: 25%;
          border-radius: 1px;
          animation: fall 2.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fall {
          0% { opacity: 0; transform: translateY(0) rotate(0) scale(0); }
          15% { opacity: 1; transform: translateY(-25px) rotate(120deg) scale(1); }
          100% { opacity: 0; transform: translateY(240px) rotate(540deg) scale(1); }
        }
        .portal-card {
          opacity: 0;
          transform: translateY(10px);
          animation: card-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) var(--d) forwards;
        }
        @keyframes card-in {
          to { opacity: 1; transform: translateY(0); }
        }
        .portal-line {
          width: 0;
          animation: portal-line 1.2s cubic-bezier(0.16, 1, 0.3, 1) 2s forwards;
        }
        @keyframes portal-line {
          to { width: calc(50% - 10px); }
        }
      `}</style>
    </div>
  )
}

/* ══════════════════════════════════════════════
   SHARED PIECES
   ══════════════════════════════════════════════ */
function TimelineNode({
  label,
  state,
  delay,
  pulse,
  small,
}: {
  label: string
  state: 'done' | 'active' | 'pending'
  delay: number
  pulse?: boolean
  small?: boolean
}) {
  const color = state === 'done' ? 'var(--c-green)' : state === 'active' ? 'var(--c-blue)' : 'rgba(255,255,255,0.15)'
  const textColor = state === 'pending' ? 'rgba(255,255,255,0.4)' : '#fafafa'
  const size = small ? 'w-5 h-5' : 'w-6 h-6'
  return (
    <div className="flex flex-col items-center timeline-node" style={{ ['--d' as never]: `${delay}s` }}>
      <div className="relative">
        {pulse && (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{ background: color, animation: 'l2-pulse-ring 2.2s cubic-bezier(0.4,0,0.6,1) infinite' }}
          />
        )}
        <div
          className={`relative ${size} rounded-full flex items-center justify-center`}
          style={{
            background: state === 'pending' ? '#1d1d1f' : color,
            border: state === 'pending' ? '1.5px solid rgba(255,255,255,0.15)' : '1.5px solid transparent',
          }}
        >
          {state === 'done' && (
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M3 6l2 2 4-4" stroke="#0a0a0a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {state === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
        </div>
      </div>
      <span className={`mt-1.5 ${small ? 'text-[8px]' : 'text-[8.5px]'} font-mono uppercase tracking-[0.08em]`} style={{ color: textColor }}>
        {label}
      </span>
      <style jsx>{`
        .timeline-node {
          opacity: 0;
          transform: scale(0.85);
          animation: tnode 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) var(--d) forwards;
        }
        @keyframes tnode {
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

function CommonStyles() {
  return (
    <style jsx global>{`
      .stagger-item {
        opacity: 0;
        transform: translateY(10px);
        animation: stagger-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) var(--d) forwards;
      }
      @keyframes stagger-in {
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  )
}

function SpecLabel({
  text, position, color, active, delay,
}: { text: string; position: string; color: string; active: boolean; delay: number }) {
  return (
    <div
      className={`absolute ${position} z-10 hidden md:block`}
      style={{
        opacity: 0,
        animation: active ? `spec-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s forwards` : 'none',
      }}
    >
      <div
        className="px-2.5 py-1.5 rounded-lg flex items-center gap-2 backdrop-blur"
        style={{
          background: 'rgba(20,20,20,0.82)',
          border: `1px solid ${color}55`,
          boxShadow: `0 12px 24px -8px rgba(0,0,0,0.5)`,
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] font-semibold" style={{ color: '#fafafa' }}>
          {text}
        </span>
      </div>
      <style jsx>{`
        @keyframes spec-in {
          from { opacity: 0; transform: translateY(8px) scale(0.94); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}

/* ══════════════════════════════════════════════
   UTILS
   ══════════════════════════════════════════════ */
function randomDigits(n: number, seed: string): string {
  // Determinístico por persona: usa los códigos de chars del seed
  let s = ''
  for (let i = 0; i < n; i++) {
    const c = seed.charCodeAt((i * 7 + seed.length) % seed.length) || 7
    s += (c % 10).toString()
  }
  return s
}

function StatusSignal() {
  return (
    <svg width="12" height="9" viewBox="0 0 17 11" fill="none" aria-hidden>
      <rect x="0" y="7" width="3" height="3" rx="0.5" fill="#fff" />
      <rect x="5" y="5" width="3" height="5" rx="0.5" fill="#fff" />
      <rect x="10" y="3" width="3" height="7" rx="0.5" fill="#fff" />
      <rect x="15" y="0" width="2" height="11" rx="0.5" fill="#fff" opacity="0.5" />
    </svg>
  )
}
function StatusWifi() {
  return (
    <svg width="13" height="9" viewBox="0 0 14 10" fill="none" aria-hidden>
      <path d="M1 4a8 8 0 0112 0M3 6a5 5 0 018 0M5 8a2.5 2.5 0 014 0" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}
function StatusBattery() {
  return (
    <svg width="22" height="9" viewBox="0 0 24 11" fill="none" aria-hidden>
      <rect x="0.5" y="0.5" width="20" height="10" rx="2" stroke="#fff" strokeWidth="0.8" opacity="0.6" />
      <rect x="2" y="2" width="14" height="7" rx="1" fill="#fff" />
      <rect x="21" y="3" width="2" height="5" rx="0.5" fill="#fff" opacity="0.6" />
    </svg>
  )
}
function ChipIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="2.5" y="1.5" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 5h4M5 8h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="7" cy="11" r="0.5" fill="currentColor" />
    </svg>
  )
}
function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M3 7l3 3 5-6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M4 10h12m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
