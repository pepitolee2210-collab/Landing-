'use client'

import { useEffect } from 'react'
import 'material-symbols/outlined.css'
import './tokens.css'
import { getServicePhases } from './services-registry'
import { useDemoPlayer } from './use-demo-player'
import { Scene, SceneKeyframes } from './scenes'
import type { DemoScript } from './types'
import { SITE } from '@/lib/site'
import { whatsappUrl } from '@/lib/utils'
import { onLexEvent, dispatchLexEvent } from '@/components/lex/lex-events'

interface Props {
  script: DemoScript
}

const SPEEDS = [0.5, 1, 1.5, 2] as const

interface ServiceCta {
  headline: string
  subhead: string
  whatsappMsg: string
}

// CTAs contextuales mostrados al terminar el demo de cada servicio.
// El mensaje de WhatsApp queda pre-llenado al hacer click.
const CTA_BY_SLUG: Record<string, ServiceCta> = {
  'visa-juvenil': {
    headline: '¿Tu hijo califica para SIJS?',
    subhead: 'Custodia estatal + I-360 + I-485. Te llevamos de la mano hasta la Green Card.',
    whatsappMsg: 'Hola, vi el demo de Visa Juvenil (SIJS) en su web. Quiero saber si mi hijo califica.',
  },
  'asilo-politico': {
    headline: '¿Necesitas presentar tu I-589?',
    subhead: 'Sustentos + reforzamiento con Miedo Creíble. Expediente listo para USCIS.',
    whatsappMsg: 'Hola, vi el demo de Asilo Político en su web. Necesito presentar mi I-589.',
  },
  'reforzar-asilo': {
    headline: '¿Tu caso de asilo necesita más fuerza?',
    subhead: 'Declaración jurada, evidencias y Miedo Creíble generado por IA.',
    whatsappMsg: 'Hola, vi el demo de Reforzar Asilo en su web. Mi caso ya está abierto y quiero reforzarlo.',
  },
  apelacion: {
    headline: '¿Te negaron tu caso?',
    subhead: 'Apelación ante la BIA con Notice of Appeal EOIR-26 + Carta de Exoneración por IA.',
    whatsappMsg: 'Hola, vi el demo de Apelación BIA en su web. Quiero apelar mi caso.',
  },
  'cambio-de-corte': {
    headline: '¿Te mudaste a otro estado?',
    subhead: 'Moción de Cambio de Venue EOIR-33 ante tu Corte de Inmigración actual.',
    whatsappMsg: 'Hola, vi el demo de Cambio de Corte en su web. Necesito cambiar mi caso a otro estado.',
  },
}

const FALLBACK_CTA: ServiceCta = {
  headline: '¿Listo para empezar tu caso?',
  subhead: 'Te acompañamos desde el primer paso hasta tener tu expediente listo.',
  whatsappMsg: 'Hola, vi el demo en su web. Quiero información sobre los servicios.',
}

export function DemoPlayer({ script }: Props) {
  const { state, currentStep, stepProgress, progress, play, pause, reset, setSpeed, skipToPhase } = useDemoPlayer(script)
  const phases = getServicePhases(script.serviceSlug).filter((p) => !p.isCompletion)
  const currentPhaseCode = currentStep?.phase

  // Lex puede controlar play/pause via custom events globales
  useEffect(() => {
    const offPlay = onLexEvent('lex:playDemo', () => play())
    const offPause = onLexEvent('lex:pauseDemo', () => pause())
    return () => {
      offPlay()
      offPause()
    }
  }, [play, pause])

  // Sincronización con Lex: dispatch eventos cuando el step cambia
  // y cuando el demo termina. Lex escucha y narra/cierra en consecuencia.
  useEffect(() => {
    if (!currentStep) return
    dispatchLexEvent('lex:demoStepEnter', {
      stepId: currentStep.id,
      phase: String(currentStep.phase),
      narration: currentStep.narration,
      sceneKind: currentStep.scene.kind,
    })
  }, [currentStep])

  useEffect(() => {
    if (state.isFinished) {
      dispatchLexEvent('lex:demoFinished', { serviceSlug: script.serviceSlug })
    }
  }, [state.isFinished, script.serviceSlug])

  return (
    <div
      className="space-y-5 relative"
      style={{
        fontFamily: 'var(--font-tight), -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
        color: '#FAFAFA',
      }}
    >
      <SceneKeyframes />

      {/* ─── Header strip ─── */}
      <div
        className="rounded-[20px] px-6 py-5 flex items-center justify-between gap-4 flex-wrap relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(20,20,20,0.95), rgba(8,8,8,0.95))',
          border: '0.5px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Accent glow strip top */}
        <span
          aria-hidden
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)' }}
        />

        <div className="flex items-center gap-4">
          <div
            className="relative w-11 h-11 rounded-xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02))',
              border: '0.5px solid rgba(255,255,255,0.18)',
            }}
          >
            <span
              className="material-symbols-outlined"
              data-fill="1"
              style={{ fontSize: 22, color: '#FFFFFF' }}
            >
              play_circle
            </span>
          </div>
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono-tech)',
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: '0.2em',
                color: '#525252',
              }}
            >
              DEMO · EN VIVO
            </p>
            <p className="mt-1" style={{ fontSize: 16, fontWeight: 500, letterSpacing: '-0.018em', lineHeight: 1.2 }}>
              {script.serviceName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-2">
            <span className="relative flex items-center justify-center" style={{ width: 8, height: 8 }}>
              {state.isPlaying && (
                <span
                  className="absolute inset-0 rounded-full"
                  style={{ background: '#FFFFFF', animation: 'tech-ping-dot 1.8s ease-in-out infinite' }}
                />
              )}
              <span
                className="relative rounded-full"
                style={{
                  width: 8,
                  height: 8,
                  background: state.isPlaying ? '#FFFFFF' : '#525252',
                  boxShadow: state.isPlaying ? '0 0 12px rgba(255,255,255,0.8)' : 'none',
                }}
              />
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono-tech)',
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: '0.2em',
                color: state.isPlaying ? '#FFFFFF' : '#525252',
              }}
            >
              {state.isPlaying ? 'RUNNING' : state.isFinished ? 'DONE' : 'IDLE'}
            </span>
          </span>

          <div
            style={{
              fontFamily: 'var(--font-mono-tech)',
              fontSize: 14,
              fontWeight: 500,
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '0.05em',
            }}
          >
            <span style={{ color: '#FFFFFF' }}>{formatTime(progress * script.totalDurationMs)}</span>
            <span style={{ color: '#262626', margin: '0 6px' }}>/</span>
            <span style={{ color: '#525252' }}>{formatTime(script.totalDurationMs)}</span>
          </div>
        </div>
      </div>

      {/* ─── Phase pills ─── */}
      {phases.length > 1 && (
        <div className="flex justify-center">
          <div
            className="inline-flex items-center gap-1 p-1 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '0.5px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {phases.map((phase, idx) => {
              const isActive = phase.code === currentPhaseCode
              const isPast = phases.findIndex((p) => p.code === currentPhaseCode) > idx
              return (
                <button
                  key={phase.code}
                  onClick={() => skipToPhase(phase.code)}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all duration-500"
                  style={{
                    background: isActive ? '#FFFFFF' : 'transparent',
                    border: isActive ? '0.5px solid #FFFFFF' : '0.5px solid transparent',
                    color: isActive ? '#000000' : isPast ? '#FFFFFF' : '#525252',
                    fontFamily: 'var(--font-mono-tech)',
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    boxShadow: isActive ? '0 0 24px rgba(255,255,255,0.3)' : 'none',
                  }}
                >
                  {isPast && (
                    <span
                      className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full"
                      style={{ background: '#FFFFFF', color: '#000000', fontSize: 9, fontWeight: 700 }}
                    >
                      ✓
                    </span>
                  )}
                  {phase.number.toUpperCase()}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* ─── Progress with shimmer ─── */}
      <div className="relative h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div
          className="absolute inset-y-0 left-0 transition-[width] duration-100 ease-linear rounded-full"
          style={{
            width: `${progress * 100}%`,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.5), #FFFFFF, rgba(255,255,255,0.5))',
            backgroundSize: '200% 100%',
            animation: state.isPlaying ? 'tech-progress-shimmer 3s linear infinite' : 'none',
            boxShadow: '0 0 12px rgba(255,255,255,0.5)',
          }}
        />
      </div>

      {/* ─── Scene stage ─── */}
      <div
        className="relative rounded-[24px] overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #0F0F0F, #050505)',
          border: '0.5px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          minHeight: 580,
        }}
      >
        {/* Corner marks */}
        <CornerMark pos="tl" />
        <CornerMark pos="tr" />
        <CornerMark pos="bl" />
        <CornerMark pos="br" />

        {/* Inner glow top */}
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.06), transparent 60%)',
          }}
        />

        {/* Dot grid */}
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          }}
        />

        <div className="relative flex items-center justify-center min-h-[580px] py-10 px-6" key={state.currentStepIdx}>
          <div className="ulp-scene-enter w-full">
            {currentStep ? (
              <Scene scene={currentStep.scene} stepProgress={stepProgress} />
            ) : (
              <div className="flex items-center justify-center min-h-[460px]" />
            )}
          </div>

          {/* ─── Finished CTA — al terminar el demo, llamada a la acción ─── */}
          {state.isFinished && (
            <FinishedCta
              cta={CTA_BY_SLUG[script.serviceSlug] ?? FALLBACK_CTA}
              onReplay={play}
            />
          )}

          {/* ─── Play overlay — cuando está idle o paused (no finished) ─── */}
          {!state.isPlaying && !state.isFinished && (
            <button
              type="button"
              onClick={play}
              aria-label={state.currentStepIdx > 0 ? 'Continuar reproducción' : 'Reproducir demo'}
              className="absolute inset-0 flex items-center justify-center group cursor-pointer"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.62) 60%, rgba(0,0,0,0.78) 100%)',
                backdropFilter: 'blur(2px)',
                WebkitBackdropFilter: 'blur(2px)',
                animation: 'demo-overlay-in 0.4s cubic-bezier(0.32, 0.72, 0, 1) both',
              }}
            >
              {/* Pulse rings concéntricos */}
              <span
                aria-hidden
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 88,
                  height: 88,
                  border: '1px solid rgba(255,255,255,0.3)',
                  animation: 'demo-play-ring 2.4s ease-out infinite',
                }}
              />
              <span
                aria-hidden
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 88,
                  height: 88,
                  border: '1px solid rgba(255,255,255,0.2)',
                  animation: 'demo-play-ring 2.4s ease-out 0.8s infinite',
                }}
              />

              {/* Botón circular central */}
              <span
                className="relative flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 group-active:scale-95"
                style={{
                  width: 88,
                  height: 88,
                  background: 'rgba(255,255,255,0.96)',
                  boxShadow:
                    '0 12px 48px rgba(255,255,255,0.35), 0 0 0 0.5px rgba(255,255,255,0.8) inset, 0 0 64px rgba(255,255,255,0.18)',
                }}
              >
                <span
                  className="material-symbols-outlined"
                  data-fill="1"
                  style={{
                    fontSize: 44,
                    color: '#000',
                    marginLeft: 4,
                    fontVariationSettings: "'FILL' 1, 'wght' 600",
                  }}
                >
                  play_arrow
                </span>
              </span>

              {/* Etiqueta abajo */}
              <span
                className="absolute"
                style={{
                  bottom: 'calc(50% - 96px)',
                  fontFamily: 'var(--font-mono-tech)',
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  color: 'rgba(255,255,255,0.8)',
                  textTransform: 'uppercase',
                }}
              >
                {state.currentStepIdx > 0 ? 'Continuar' : 'Ver demostración'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* ─── Narration + controls ─── */}
      <div
        className="rounded-[24px] p-6 space-y-5 relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(20,20,20,0.95), rgba(8,8,8,0.95))',
          border: '0.5px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {currentStep && (
          <div className="flex items-start gap-4" key={`narr-${state.currentStepIdx}`}>
            <span
              className="shrink-0 mt-0.5"
              style={{
                fontFamily: 'var(--font-mono-tech)',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: '#FFFFFF',
                paddingTop: 4,
              }}
            >
              ◆
            </span>
            <p
              className="flex-1"
              style={{
                fontSize: 17,
                fontWeight: 400,
                lineHeight: 1.55,
                color: '#FAFAFA',
                letterSpacing: '-0.012em',
                animation: 'tech-narration-in 0.5s cubic-bezier(0.32, 0.72, 0, 1) 0.15s both',
              }}
            >
              {currentStep.narration}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between gap-3 flex-wrap pt-5" style={{ borderTop: '0.5px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-2">
            {!state.isPlaying ? (
              <button
                onClick={play}
                className="inline-flex items-center gap-2 pl-4 pr-5 py-2.5 rounded-full transition-all duration-300 hover:opacity-90 active:scale-95"
                style={{
                  background: '#FFFFFF',
                  color: '#000000',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '-0.005em',
                  boxShadow: '0 4px 24px rgba(255,255,255,0.25), 0 0 0 0.5px rgba(255,255,255,0.5) inset',
                }}
              >
                <span className="material-symbols-outlined" data-fill="1" style={{ fontSize: 20 }}>
                  play_arrow
                </span>
                {state.isFinished ? 'Reproducir de nuevo' : state.currentStepIdx > 0 ? 'Continuar' : 'Reproducir'}
              </button>
            ) : (
              <button
                onClick={pause}
                className="inline-flex items-center gap-2 pl-4 pr-5 py-2.5 rounded-full transition-all duration-300 hover:opacity-90 active:scale-95"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  color: '#FFFFFF',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '-0.005em',
                  border: '0.5px solid rgba(255,255,255,0.15)',
                }}
              >
                <span className="material-symbols-outlined" data-fill="1" style={{ fontSize: 20 }}>
                  pause
                </span>
                Pausar
              </button>
            )}

            <button
              onClick={reset}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:bg-white/5 active:scale-95"
              style={{ color: '#A1A1A1', border: '0.5px solid rgba(255,255,255,0.1)' }}
              title="Reiniciar"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>restart_alt</span>
            </button>
          </div>

          <div
            className="inline-flex items-center gap-1 p-1 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '0.5px solid rgba(255,255,255,0.08)',
            }}
          >
            {SPEEDS.map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className="px-3 py-1 rounded-full transition-all duration-300"
                style={{
                  background: state.speed === s ? '#FFFFFF' : 'transparent',
                  color: state.speed === s ? '#000000' : '#525252',
                  fontFamily: 'var(--font-mono-tech)',
                  fontSize: 11,
                  fontWeight: state.speed === s ? 700 : 500,
                  letterSpacing: '0.05em',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {s}×
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tech-narration-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tech-progress-shimmer {
          from { background-position: 200% 0; }
          to { background-position: -200% 0; }
        }
        @keyframes tech-ping-dot {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        @keyframes demo-overlay-in {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(2px); }
        }
        @keyframes demo-play-ring {
          0% { transform: scale(1); opacity: 0.6; }
          80% { opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes demo-cta-content-in {
          0% { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes demo-cta-glow {
          0%, 100% { box-shadow: 0 12px 40px rgba(37, 211, 102, 0.35), 0 0 0 0.5px rgba(255,255,255,0.2) inset, 0 0 80px rgba(37, 211, 102, 0.2); }
          50% { box-shadow: 0 12px 56px rgba(37, 211, 102, 0.55), 0 0 0 0.5px rgba(255,255,255,0.3) inset, 0 0 120px rgba(37, 211, 102, 0.35); }
        }
      `}</style>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// FinishedCta — pantalla de cierre con WhatsApp brand verde + replay
// ─────────────────────────────────────────────────────────────────────

function FinishedCta({ cta, onReplay }: { cta: ServiceCta; onReplay: () => void }) {
  const waHref = whatsappUrl(SITE.contact.whatsapp, cta.whatsappMsg)
  return (
    <div
      className="absolute inset-0 flex items-center justify-center px-8 py-10"
      style={{
        background:
          'radial-gradient(ellipse at center, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.88) 60%, rgba(0,0,0,0.96) 100%)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        animation: 'demo-overlay-in 0.5s cubic-bezier(0.32, 0.72, 0, 1) both',
      }}
    >
      <div
        className="relative max-w-[520px] text-center space-y-6"
        style={{ animation: 'demo-cta-content-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both' }}
      >
        {/* Eyebrow tech */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '0.5px solid rgba(255,255,255,0.16)',
          }}
        >
          <span
            className="relative flex items-center justify-center"
            style={{ width: 6, height: 6 }}
          >
            <span
              className="absolute inset-0 rounded-full"
              style={{ background: '#25D366', animation: 'tech-ping-dot 1.8s ease-in-out infinite' }}
            />
            <span
              className="relative rounded-full"
              style={{
                width: 6,
                height: 6,
                background: '#25D366',
                boxShadow: '0 0 12px rgba(37,211,102,0.7)',
              }}
            />
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono-tech)',
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            DEMO COMPLETADO
          </span>
        </div>

        {/* Headline serif (Cormorant Garamond) */}
        <h3
          style={{
            fontFamily: 'var(--font-ulp-display), Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 500,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: '#FAFAFA',
          }}
        >
          {cta.headline}
        </h3>

        {/* Subhead body */}
        <p
          style={{
            fontFamily: 'var(--font-tight), system-ui, sans-serif',
            fontSize: 'clamp(15px, 1.2vw, 17px)',
            fontWeight: 400,
            lineHeight: 1.55,
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '-0.01em',
            maxWidth: 440,
            margin: '0 auto',
          }}
        >
          {cta.subhead}
        </p>

        {/* Divisor decorativo */}
        <span
          aria-hidden
          className="block mx-auto"
          style={{
            width: 32,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          }}
        />

        {/* Acciones — WhatsApp brand verde + replay secundario */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 pl-5 pr-6 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background: '#25D366',
              color: '#FFFFFF',
              fontFamily: 'var(--font-tight), system-ui, sans-serif',
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: '-0.005em',
              animation: 'demo-cta-glow 3s ease-in-out infinite',
            }}
          >
            <svg
              aria-hidden
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ flexShrink: 0 }}
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>Hablar por WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={onReplay}
            className="inline-flex items-center gap-2 pl-4 pr-5 py-3 rounded-full transition-all duration-300 hover:bg-white/10 active:scale-95"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '0.5px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.85)',
              fontFamily: 'var(--font-tight), system-ui, sans-serif',
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: '-0.005em',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 18, fontVariationSettings: "'FILL' 0, 'wght' 500" }}
            >
              restart_alt
            </span>
            <span>Ver demo de nuevo</span>
          </button>
        </div>

        {/* Reassurance fine print */}
        <p
          style={{
            fontFamily: 'var(--font-mono-tech)',
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: '0.18em',
            color: 'rgba(255,255,255,0.4)',
            paddingTop: 8,
          }}
        >
          RESPUESTA EN MINUTOS · CONSULTA SIN COMPROMISO
        </p>
      </div>
    </div>
  )
}

function CornerMark({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    width: 20,
    height: 20,
    border: '1px solid rgba(255,255,255,0.4)',
    pointerEvents: 'none',
  }
  const corners: Record<typeof pos, React.CSSProperties> = {
    tl: { top: 14, left: 14, borderRight: 'none', borderBottom: 'none' },
    tr: { top: 14, right: 14, borderLeft: 'none', borderBottom: 'none' },
    bl: { bottom: 14, left: 14, borderRight: 'none', borderTop: 'none' },
    br: { bottom: 14, right: 14, borderLeft: 'none', borderTop: 'none' },
  }
  return <span aria-hidden style={{ ...baseStyle, ...corners[pos] }} />
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}
