'use client'

import { useEffect, useState } from 'react'

/**
 * Store global del contexto del usuario para personalizar el demo.
 *
 * Usa un module-level subject pattern en vez de React Context para que
 * el ServicesShowcase y el LexAgent puedan leer/escribir el mismo state
 * sin necesidad de ser hijos de un Provider común.
 *
 * Lex invoca el tool `captureUserContext` que dispatcha `lex:userContext`
 * y este store escucha automáticamente vía addEventListener global.
 *
 * NO se persiste cross-sesión (privacidad — datos legales sensibles).
 */

export interface UserDemoContext {
  name?: string
  minorName?: string
  minorAge?: number
  state?: string
  situation?: string
  serviceSlug?: string
}

// Module-level singleton state
let currentContext: UserDemoContext = {}
const subscribers = new Set<() => void>()

function notifyAll() {
  for (const cb of subscribers) cb()
}

function subscribe(cb: () => void) {
  subscribers.add(cb)
  return () => {
    subscribers.delete(cb)
  }
}

function getSnapshot(): UserDemoContext {
  return currentContext
}

export function updateLexUserContext(updates: Partial<UserDemoContext>) {
  currentContext = { ...currentContext, ...updates }
  notifyAll()
}

export function clearLexUserContext() {
  currentContext = {}
  notifyAll()
}

/**
 * Hook que devuelve el contexto actual del usuario. Se re-renderiza
 * cuando Lex actualiza datos del usuario.
 */
export function useLexUserContext() {
  // useSyncExternalStore no funciona bien con SSR + objetos cambiantes.
  // Patrón manual con useState + subscribe.
  const [ctx, setCtx] = useState<UserDemoContext>(getSnapshot)

  useEffect(() => {
    const update = () => setCtx(getSnapshot())
    const unsubscribe = subscribe(update)
    // Sincronizar por si hubo cambios entre render inicial y mount
    update()
    return unsubscribe
  }, [])

  return { ctx, setCtx: updateLexUserContext, clear: clearLexUserContext }
}

/**
 * Listener global que escucha el evento `lex:userContext` y actualiza
 * el store automáticamente. Se monta UNA VEZ al cargar el módulo.
 */
if (typeof window !== 'undefined') {
  window.addEventListener('lex:userContext', (e: Event) => {
    const detail = (e as CustomEvent).detail
    if (detail && typeof detail === 'object') {
      updateLexUserContext(detail as Partial<UserDemoContext>)
    }
  })
}
