'use client'

import { useEffect, useRef, useState } from 'react'
import { GoogleGenAI, MediaResolution, Modality, type Session, type LiveServerMessage } from '@google/genai'
import { LEX_SYSTEM_PROMPT } from './lex-prompt'
import { LEX_TOOL_DECLARATIONS, executeLexTool } from './lex-tools'
import { AUDIO_WORKLET_SRC } from './audio-worklet-source'
import { onLexEvent } from './lex-events'

export type LexState =
  | 'idle' // no iniciado
  | 'connecting' // pidiendo token y permisos
  | 'listening' // escuchando al usuario
  | 'thinking' // procesando, modelo todavía no respondió
  | 'speaking' // modelo está hablando
  | 'error' // algo falló
  | 'closed' // sesión cerrada normalmente

interface UseLexAgentOptions {
  onTranscript?: (role: 'user' | 'lex', text: string) => void
}

const INPUT_SAMPLE_RATE = 16_000
const OUTPUT_SAMPLE_RATE = 24_000

// Helpers impuros encapsulados fuera del hook para evitar warnings
// de react-hooks/purity en el componente.
function generateSessionId(): string {
  return `lex-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}
function nowMs(): number {
  return Date.now()
}
function nowIso(): string {
  return new Date().toISOString()
}
function elapsedSecSince(startMs: number): number {
  return Math.round((Date.now() - startMs) / 1000)
}

export function useLexAgent({ onTranscript }: UseLexAgentOptions = {}) {
  const [state, setStateRaw] = useState<LexState>('idle')
  // Wrapper que mantiene sincronizado el ref para callbacks externos
  // (onLexEvent en setupDemoSyncListeners) sin closures stale.
  const setState = (next: LexState | ((prev: LexState) => LexState)) => {
    setStateRaw((prev) => {
      const value = typeof next === 'function' ? next(prev) : next
      stateRef.current = value
      // Si terminamos un turno (listening) y hay un SCENE_UPDATE pendiente,
      // enviarlo ahora — evita solape de voz si llegaron steps durante la
      // narración anterior.
      if (value === 'listening' && pendingSceneUpdateRef.current) {
        const hint = pendingSceneUpdateRef.current
        pendingSceneUpdateRef.current = null
        // Defer al próximo tick para que el state ya esté propagado
        Promise.resolve().then(() => {
          sessionRef.current?.sendClientContent({
            turns: [{ role: 'user', parts: [{ text: hint }] }],
          })
        })
      }
      return value
    })
  }
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState(false)

  // Refs persistentes que no triggean re-renders
  const sessionRef = useRef<Session | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null) // playback
  const captureCtxRef = useRef<AudioContext | null>(null) // captura
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const workletNodeRef = useRef<AudioWorkletNode | null>(null)
  const playbackQueueRef = useRef<Float32Array[]>([])
  const playbackBusyRef = useRef(false)
  const nextStartTimeRef = useRef(0)
  const mutedRef = useRef(false)
  const speakingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Session resumption: guardamos el handle que el server nos manda en
  // sessionResumptionUpdate. Si la sesión cierra por expiración natural
  // (~15min con audio), reconectamos con este handle de manera transparente
  // — el usuario no nota el corte.
  const sessionHandleRef = useRef<string | null>(null)
  const intentionalCloseRef = useRef(false)
  const reconnectingRef = useRef(false)
  const aiRef = useRef<GoogleGenAI | null>(null)
  const modelRef = useRef<string | null>(null)
  const tokenRef = useRef<string | null>(null)
  // State actual del agente (ref) — se mantiene sincronizado con setState
  // para que callbacks como onLexEvent puedan consultarlo sin closures viejas.
  const stateRef = useRef<LexState>('idle')
  // SCENE_UPDATE pendiente: si Lex está hablando cuando llega un step nuevo,
  // guardamos solo el último (descartamos intermedios) y lo enviamos al
  // terminar el turno. Evita que Lex narre 3 steps en cascada sin pausa,
  // causando solape de voz.
  const pendingSceneUpdateRef = useRef<string | null>(null)

  // Timing escalonado: 5min target, 7min cap duro
  const timingTimersRef = useRef<{
    hint4min?: ReturnType<typeof setTimeout>
    hint55min?: ReturnType<typeof setTimeout>
    hint65min?: ReturnType<typeof setTimeout>
    forceClose7min?: ReturnType<typeof setTimeout>
  }>({})
  // Cleanup function devuelta por setupDemoSyncListeners
  const demoSyncCleanupRef = useRef<(() => void) | null>(null)
  // Session ID + turn counter para logging (B7 — solo texto)
  const sessionIdRef = useRef<string>('')
  const turnCounterRef = useRef(0)
  const sessionStartTsRef = useRef(0)

  // ──────────────────────────────────────────────────────────────────
  // Helpers de audio
  // ──────────────────────────────────────────────────────────────────

  const base64ToInt16PCM = (b64: string): Float32Array => {
    const bin = atob(b64)
    const bytes = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
    const samples = bytes.length / 2
    const float32 = new Float32Array(samples)
    for (let i = 0; i < samples; i++) {
      let s = bytes[i * 2] | (bytes[i * 2 + 1] << 8)
      if (s >= 0x8000) s -= 0x10000
      float32[i] = s / 0x8000
    }
    return float32
  }

  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer)
    let binary = ''
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
    return btoa(binary)
  }

  const playAudioChunk = (float32: Float32Array) => {
    playbackQueueRef.current.push(float32)
    if (playbackBusyRef.current) return

    playbackBusyRef.current = true
    const drain = async () => {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        playbackBusyRef.current = false
        return
      }
      while (playbackQueueRef.current.length > 0) {
        const ctx = audioCtxRef.current
        const chunk = playbackQueueRef.current.shift()!
        const audioBuffer = ctx.createBuffer(1, chunk.length, OUTPUT_SAMPLE_RATE)
        audioBuffer.copyToChannel(chunk as Float32Array<ArrayBuffer>, 0)
        const src = ctx.createBufferSource()
        src.buffer = audioBuffer
        src.connect(ctx.destination)
        if (nextStartTimeRef.current < ctx.currentTime) {
          nextStartTimeRef.current = ctx.currentTime
        }
        src.start(nextStartTimeRef.current)
        nextStartTimeRef.current += audioBuffer.duration
      }
      playbackBusyRef.current = false
    }
    void drain()
  }

  // ──────────────────────────────────────────────────────────────────
  // Manejo de mensajes del modelo
  // ──────────────────────────────────────────────────────────────────

  const handleServerMessage = (msg: LiveServerMessage) => {
      // 1) Tool calls
      if (msg.toolCall?.functionCalls && msg.toolCall.functionCalls.length > 0) {
        msg.toolCall.functionCalls.forEach((call) => {
          // Logueamos cada tool call (B7)
          logTurn({
            role: 'tool',
            toolName: call.name,
            toolArgs: call.args,
            whatsappOpened: call.name === 'openWhatsApp',
          })
        })
        const responses = msg.toolCall.functionCalls.map((call) => {
          const result = executeLexTool(call.name || '', call.args || {})
          return {
            id: call.id,
            name: call.name,
            response: { result },
          }
        })
        sessionRef.current?.sendToolResponse({ functionResponses: responses })
      }

      // 2) Audio output
      const content = msg.serverContent
      if (content?.modelTurn?.parts) {
        for (const part of content.modelTurn.parts) {
          const inlineData = part.inlineData
          if (inlineData?.data && inlineData.mimeType?.startsWith('audio/')) {
            const float32 = base64ToInt16PCM(inlineData.data)
            playAudioChunk(float32)
            setState('speaking')
            // Si pasa 600ms sin nuevo audio, asumimos que terminó de hablar
            if (speakingTimeoutRef.current) clearTimeout(speakingTimeoutRef.current)
            speakingTimeoutRef.current = setTimeout(() => {
              setState((s) => (s === 'speaking' ? 'listening' : s))
            }, 600)
          }
          if (part.text) {
            onTranscript?.('lex', part.text)
          }
        }
      }

      // 3) Transcripciones (input + output) — también loggeamos a backend
      if (content?.inputTranscription?.text) {
        onTranscript?.('user', content.inputTranscription.text)
        logTurn({ role: 'user', text: content.inputTranscription.text })
      }
      if (content?.outputTranscription?.text) {
        onTranscript?.('lex', content.outputTranscription.text)
        logTurn({ role: 'lex', text: content.outputTranscription.text })
      }

      // 4) Turn complete → listening
      if (content?.turnComplete) {
        setState((s) => (s === 'speaking' ? 'listening' : s))
      }

      // 5) Interrupted → drenar playback queue
      if (content?.interrupted) {
        playbackQueueRef.current = []
        nextStartTimeRef.current = audioCtxRef.current?.currentTime ?? 0
      }

      // 5b) Si el modelo cierra el turno, resetear el reloj del scheduler
      //     al currentTime — evita que un próximo turno arranque tarde
      //     (acumulación de nextStartTimeRef cuando hay reconnects o
      //     gaps largos entre turnos).
      if (content?.turnComplete && audioCtxRef.current) {
        nextStartTimeRef.current = Math.max(
          nextStartTimeRef.current,
          audioCtxRef.current.currentTime,
        )
      }

      // 6) Session resumption update — guardar el handle para reconectar
      //    si la sesión expira naturalmente.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const resumeUpdate = (msg as any).sessionResumptionUpdate
      if (resumeUpdate?.newHandle && resumeUpdate?.resumable) {
        sessionHandleRef.current = resumeUpdate.newHandle
        console.log('[lex] Session handle updated for resumption')
      }

      // 7) GoAway message — el server avisa que va a cerrar pronto.
      //    No hacemos nada activo aquí — onclose se va a disparar y
      //    reconectaremos transparentemente con el handle guardado.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const goAway = (msg as any).goAway
      if (goAway?.timeLeft) {
        console.log('[lex] GoAway received, time left:', goAway.timeLeft)
      }
    }

  // ──────────────────────────────────────────────────────────────────
  // Inicio / cierre
  // ──────────────────────────────────────────────────────────────────

  // Logging de turns a /api/lex/log-turn — solo texto, sin audio.
  // Fire-and-forget para no bloquear la conversación.
  const logTurn = (payload: {
    role: 'user' | 'lex' | 'tool' | 'system'
    text?: string
    toolName?: string
    toolArgs?: Record<string, unknown>
    toolResult?: { ok: boolean; message: string }
    isEnd?: boolean
    whatsappOpened?: boolean
  }) => {
    turnCounterRef.current += 1
    const body = {
      sessionId: sessionIdRef.current,
      surface: 'landing-public' as const,
      ...payload,
      turnIndex: turnCounterRef.current,
      timestamp: nowIso(),
      durationSec: payload.isEnd
        ? elapsedSecSince(sessionStartTsRef.current)
        : undefined,
    }
    // Fire-and-forget: no esperamos la respuesta
    fetch('/api/lex/log-turn', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      keepalive: true, // si la pestaña se cierra, la request se completa
    }).catch(() => {
      // Silencioso — logging no debe romper la experiencia
    })
  }

  // Envía un mensaje del sistema al modelo via sendClientContent.
  // Se usa para hints de timing escalonado, scene updates del demo, etc.
  const sendSystemHint = (text: string) => {
    const session = sessionRef.current
    if (!session) return
    try {
      session.sendClientContent({
        turns: [{ role: 'user', parts: [{ text }] }],
      })
    } catch (err) {
      console.warn('[lex] sendSystemHint failed:', err)
    }
  }

  // Configura los 4 timers del funnel 5/7min. Cada uno envía un context
  // hint al modelo para que vaya cerrando progresivamente.
  const setupFunnelTimers = () => {
    timingTimersRef.current.hint4min = setTimeout(() => {
      sendSystemHint(
        '[SISTEMA: Llevas 4 minutos. Quedan ~60 segundos para el cierre ideal. Prepara el cierre ahora — invoca buildWhatsAppMessage + openWhatsApp en los próximos 1-2 turnos.]',
      )
    }, 4 * 60 * 1000)

    timingTimersRef.current.hint55min = setTimeout(() => {
      sendSystemHint(
        '[SISTEMA: 5:30 minutos transcurridos. CIERRA YA. Si hubo interrupciones está OK, pero empuja el cierre AHORA. NO agregues info nueva. INVOCA openWhatsApp en este turno.]',
      )
    }, 5 * 60 * 1000 + 30 * 1000)

    timingTimersRef.current.hint65min = setTimeout(() => {
      sendSystemHint(
        '[SISTEMA: ÚLTIMO AVISO. 6:30 min. En 30 segundos forzaré el cierre. Cierra ya con openWhatsApp.]',
      )
    }, 6 * 60 * 1000 + 30 * 1000)

    timingTimersRef.current.forceClose7min = setTimeout(() => {
      console.log('[lex] Force closing session at 7 minutes')
      const genericMessage = 'Hola, hablé con Lex en su web. Quiero información sobre los servicios.'
      try {
        window.open(
          `https://wa.me/14028248171?text=${encodeURIComponent(genericMessage)}`,
          '_blank',
          'noopener,noreferrer',
        )
      } catch {}
      sendSystemHint(
        '[SISTEMA: Tiempo agotado (7min). Di "Continuemos por WhatsApp, ahí te atiende el equipo directamente" y nada más.]',
      )
    }, 7 * 60 * 1000)
  }

  // Setup listeners de eventos del DemoPlayer para sincronizar narración.
  // Cuando el demo cambia de step, mandamos un context hint al modelo
  // para que narre. Cuando termina, mandamos hint de cierre.
  const setupDemoSyncListeners = (): (() => void) => {
    const offStepEnter = onLexEvent('lex:demoStepEnter', (payload) => {
      if (!payload) return
      const hint = `[SCENE_UPDATE: ahora se muestra "${payload.narration}". Comenta brevemente con tu propio tono — máximo 1 frase. NO repitas literal. NO interrumpas si el usuario está hablando.]`
      // Si Lex está hablando, guardar SOLO el último step (descartar
      // intermedios) y enviarlo cuando vuelva a 'listening'. Evita que
      // Lex narre 2-3 steps en cascada con voces solapadas.
      if (stateRef.current === 'speaking') {
        pendingSceneUpdateRef.current = hint
        return
      }
      sendSystemHint(hint)
    })
    const offFinished = onLexEvent('lex:demoFinished', (payload) => {
      sendSystemHint(
        `[DEMO_FINISHED: el usuario acaba de ver el demo completo de ${payload?.serviceSlug || 'el servicio'}. Es el momento ideal para cerrar a WhatsApp. INVOCA buildWhatsAppMessage con todo el contexto capturado + openWhatsApp en este turno.]`,
      )
    })
    return () => {
      offStepEnter()
      offFinished()
    }
  }

  // Función interna que solo conecta la sesión Live. Se usa tanto para
  // arranque inicial (con token nuevo + micrófono) como para reconexión
  // tras GoAway (reusa los recursos ya montados, pasa resumeHandle).
  const connectSession = async (resumeHandle?: string | null) => {
    const ai = aiRef.current
    const model = modelRef.current
    if (!ai || !model) throw new Error('AI client not initialized')

    const fullModel = model.startsWith('models/') ? model : `models/${model}`

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const toolDecls = LEX_TOOL_DECLARATIONS.map((d): any => ({
      name: d.name,
      description: d.description,
      parametersJsonSchema: d.parameters,
    }))

    const session = await ai.live.connect({
      model: fullModel,
      config: {
        responseModalities: [Modality.AUDIO],
        mediaResolution: MediaResolution.MEDIA_RESOLUTION_MEDIUM,
        systemInstruction: LEX_SYSTEM_PROMPT,
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Zephyr' },
          },
        },
        contextWindowCompression: {
          triggerTokens: '104857',
          slidingWindow: { targetTokens: '52428' },
        },
        // Habilita session resumption — server nos enviará handles que
        // guardamos en sessionHandleRef. Si se cierra por expiración,
        // reconectamos con el último handle de forma transparente.
        sessionResumption: resumeHandle
          ? { handle: resumeHandle }
          : { handle: '' },
        tools: [{ functionDeclarations: toolDecls }],
      },
      callbacks: {
        onopen: () => {
          console.log('[lex] WebSocket opened', resumeHandle ? '(resumed)' : '')
          reconnectingRef.current = false
          setState('listening')
        },
        onmessage: (msg) => handleServerMessage(msg),
        onerror: (e) => {
          console.error('[lex] WebSocket error:', e)
          const msg = (e as { message?: string })?.message || 'Error en la conexión con Lex'
          setErrorMessage(msg)
          setState('error')
        },
        onclose: (e) => {
          const closeCode = (e as { code?: number })?.code
          const closeReason = (e as { reason?: string })?.reason
          console.log('[lex] WebSocket closed:', { code: closeCode, reason: closeReason })

          if (intentionalCloseRef.current) {
            setState('closed')
            return
          }

          // Reconexión transparente si tenemos un handle válido y la
          // sesión cerró por expiración natural (1008 = GoAway).
          if (sessionHandleRef.current && closeCode === 1008 && !reconnectingRef.current) {
            reconnectingRef.current = true
            console.log('[lex] Reconnecting transparently with session handle')
            // Drenar chunks pendientes de la sesión anterior antes de
            // empezar la nueva — si no, el nuevo turno se solaparía con
            // residuos del anterior.
            playbackQueueRef.current = []
            nextStartTimeRef.current = audioCtxRef.current?.currentTime ?? 0
            pendingSceneUpdateRef.current = null
            // No cambiamos a 'error' — mantenemos UI en 'speaking'/'listening'
            connectSession(sessionHandleRef.current).catch((err) => {
              console.error('[lex] Resume reconnection failed:', err)
              setErrorMessage('No se pudo reconectar la sesión')
              setState('error')
              reconnectingRef.current = false
            })
            return
          }

          setState((prev) => {
            if (prev === 'error') return prev
            if (closeCode && closeCode !== 1000 && closeCode !== 1005) {
              setErrorMessage(
                `Conexión cerrada (código ${closeCode}${closeReason ? `: ${closeReason}` : ''})`,
              )
              return 'error'
            }
            return 'closed'
          })
        },
      },
    })
    sessionRef.current = session
    return session
  }

  const start = async () => {
    if (state !== 'idle' && state !== 'closed' && state !== 'error') return
    setState('connecting')
    setErrorMessage(null)
    intentionalCloseRef.current = false
    sessionHandleRef.current = null

    // Setup logging session ID (B7)
    sessionIdRef.current = generateSessionId()
    turnCounterRef.current = 0
    sessionStartTsRef.current = nowMs()
    logTurn({ role: 'system', text: 'session_start' })

    try {
      // 1) Pedir token al backend con headers explícitos para que el server
      //    valide Origin/Referer correctamente.
      const tokenRes = await fetch('/api/voice-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
      })

      if (!tokenRes.ok) {
        const body = await tokenRes.json().catch(() => ({}))
        // Mensajes claros al usuario según tipo de error
        if (tokenRes.status === 403) {
          throw new Error('Lex no está disponible desde este sitio.')
        }
        if (tokenRes.status === 429) {
          const retry = body.retryAt
            ? ` Intenta de nuevo a las ${new Date(body.retryAt).toLocaleTimeString()}.`
            : ' Intenta en un momento.'
          throw new Error(`Has llegado al límite de sesiones por hora.${retry}`)
        }
        if (tokenRes.status === 500) {
          throw new Error('Lex no está configurado correctamente. Avisa al equipo.')
        }
        throw new Error(body.error || `Error al conectar con Lex (${tokenRes.status})`)
      }

      const { token, model } = (await tokenRes.json()) as { token: string; model: string }
      tokenRef.current = token
      modelRef.current = model

      // 2) Pedir permiso de micrófono
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      })
      mediaStreamRef.current = stream

      // 3) Preparar AudioContext de playback (24kHz salida del modelo)
      const playbackCtx = new AudioContext({ sampleRate: OUTPUT_SAMPLE_RATE })
      audioCtxRef.current = playbackCtx
      nextStartTimeRef.current = playbackCtx.currentTime

      // 4) Inicializar cliente y conectar la sesión Live
      console.log('[lex] Connecting to Gemini Live with model:', model)
      const ai = new GoogleGenAI({ apiKey: token })
      aiRef.current = ai
      await connectSession()

      // 4.5) Setup del timer escalonado de 5/7 minutos
      setupFunnelTimers()
      // 4.6) Setup listeners de sincronización con DemoPlayer
      demoSyncCleanupRef.current = setupDemoSyncListeners()

      // 5) Setup captura de micrófono → enviar PCM 16kHz al modelo
      const captureCtx = new AudioContext({ sampleRate: INPUT_SAMPLE_RATE })
      captureCtxRef.current = captureCtx
      const sourceNode = captureCtx.createMediaStreamSource(stream)
      sourceNodeRef.current = sourceNode

      const workletBlob = new Blob([AUDIO_WORKLET_SRC], { type: 'application/javascript' })
      const workletUrl = URL.createObjectURL(workletBlob)
      await captureCtx.audioWorklet.addModule(workletUrl)
      URL.revokeObjectURL(workletUrl)

      const worklet = new AudioWorkletNode(captureCtx, 'lex-audio-capture')
      workletNodeRef.current = worklet
      worklet.port.onmessage = (e) => {
        if (mutedRef.current) return
        if (e.data?.type !== 'chunk') return
        const buffer = e.data.buffer as ArrayBuffer
        const base64 = arrayBufferToBase64(buffer)
        sessionRef.current?.sendRealtimeInput({
          audio: { data: base64, mimeType: `audio/pcm;rate=${INPUT_SAMPLE_RATE}` },
        })
      }
      sourceNode.connect(worklet)
      // worklet NO se conecta a destination — no queremos que el mic se reproduzca en speakers
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido'
      console.error('[lex] start failed:', err)
      setErrorMessage(message)
      setState('error')
      await stop()
    }
  }

  const stop = async () => {
    // Log final de la sesión (B7)
    if (sessionIdRef.current) {
      logTurn({ role: 'system', text: 'session_end', isEnd: true })
    }

    // Marca cierre intencional para que onclose NO intente reconectar
    intentionalCloseRef.current = true
    sessionHandleRef.current = null

    // Cancelar todos los timers del funnel 5/7min
    const timers = timingTimersRef.current
    if (timers.hint4min) clearTimeout(timers.hint4min)
    if (timers.hint55min) clearTimeout(timers.hint55min)
    if (timers.hint65min) clearTimeout(timers.hint65min)
    if (timers.forceClose7min) clearTimeout(timers.forceClose7min)
    timingTimersRef.current = {}

    // Detener listeners de sincronización con DemoPlayer
    if (demoSyncCleanupRef.current) {
      demoSyncCleanupRef.current()
      demoSyncCleanupRef.current = null
    }

    try {
      sessionRef.current?.close()
    } catch {}
    sessionRef.current = null

    try {
      workletNodeRef.current?.disconnect()
    } catch {}
    workletNodeRef.current = null

    try {
      sourceNodeRef.current?.disconnect()
    } catch {}
    sourceNodeRef.current = null

    mediaStreamRef.current?.getTracks().forEach((t) => t.stop())
    mediaStreamRef.current = null

    try {
      await captureCtxRef.current?.close()
    } catch {}
    captureCtxRef.current = null

    try {
      await audioCtxRef.current?.close()
    } catch {}
    audioCtxRef.current = null

    playbackQueueRef.current = []
    playbackBusyRef.current = false
    nextStartTimeRef.current = 0
    if (speakingTimeoutRef.current) {
      clearTimeout(speakingTimeoutRef.current)
      speakingTimeoutRef.current = null
    }

    setState('closed')
  }

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev
      mutedRef.current = next
      return next
    })
  }

  // Cleanup al desmontar — accedemos a refs directamente para no causar
  // recreación del effect en cada render.
  useEffect(() => {
    return () => {
      try { sessionRef.current?.close() } catch {}
      sessionRef.current = null
      try { workletNodeRef.current?.disconnect() } catch {}
      try { sourceNodeRef.current?.disconnect() } catch {}
      mediaStreamRef.current?.getTracks().forEach((t) => t.stop())
      try { void captureCtxRef.current?.close() } catch {}
      try { void audioCtxRef.current?.close() } catch {}
      if (speakingTimeoutRef.current) clearTimeout(speakingTimeoutRef.current)
    }
  }, [])

  return {
    state,
    errorMessage,
    isMuted,
    start,
    stop,
    toggleMute,
  }
}
