'use client'

import { useEffect, useRef, useState } from 'react'
import { GoogleGenAI, Modality, type Session, type LiveServerMessage } from '@google/genai'
import { LEX_SYSTEM_PROMPT } from './lex-prompt'
import { LEX_TOOL_DECLARATIONS, executeLexTool } from './lex-tools'
import { AUDIO_WORKLET_SRC } from './audio-worklet-source'

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
  onClose?: () => void
}

const INPUT_SAMPLE_RATE = 16_000
const OUTPUT_SAMPLE_RATE = 24_000

export function useLexAgent({ onTranscript, onClose }: UseLexAgentOptions = {}) {
  const [state, setState] = useState<LexState>('idle')
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

      // 3) Transcripciones (input + output)
      if (content?.inputTranscription?.text) {
        onTranscript?.('user', content.inputTranscription.text)
      }
      if (content?.outputTranscription?.text) {
        onTranscript?.('lex', content.outputTranscription.text)
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
    }

  // ──────────────────────────────────────────────────────────────────
  // Inicio / cierre
  // ──────────────────────────────────────────────────────────────────

  const start = async () => {
    if (state !== 'idle' && state !== 'closed' && state !== 'error') return
    setState('connecting')
    setErrorMessage(null)

    try {
      // 1) Pedir token efímero al backend
      const tokenRes = await fetch('/api/voice-token', { method: 'POST' })
      if (!tokenRes.ok) {
        const body = await tokenRes.json().catch(() => ({}))
        throw new Error(body.error || `Token request failed (${tokenRes.status})`)
      }
      const { token, model } = (await tokenRes.json()) as { token: string; model: string }

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

      // 4) Conectar a Gemini Live API con el token efímero
      const ai = new GoogleGenAI({ apiKey: token, apiVersion: 'v1alpha' })
      const session = await ai.live.connect({
        model,
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: LEX_SYSTEM_PROMPT,
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Aoede' },
            },
            languageCode: 'es-US',
          },
          tools: [
            {
              functionDeclarations: LEX_TOOL_DECLARATIONS.map((d) => ({
                name: d.name,
                description: d.description,
                parametersJsonSchema: d.parameters
                  ? {
                      type: 'object',
                      properties: d.parameters.properties,
                      required: d.parameters.required,
                    }
                  : undefined,
              })),
            },
          ],
        },
        callbacks: {
          onopen: () => {
            setState('listening')
          },
          onmessage: (msg) => handleServerMessage(msg),
          onerror: (e) => {
            console.error('[lex] WebSocket error:', e)
            setErrorMessage('Error en la conexión con Lex')
            setState('error')
          },
          onclose: () => {
            setState('closed')
            onClose?.()
          },
        },
      })
      sessionRef.current = session

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
