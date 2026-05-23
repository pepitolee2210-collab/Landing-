'use client'

/**
 * Event bus minimalista para comunicar Lex con el resto de la landing
 * sin acoplar componentes. Lex despacha eventos, los componentes
 * interesados se suscriben.
 *
 * Por ejemplo: cuando Lex invoca la tool `openServiceDemo('asilo-politico')`,
 * dispatcha el evento 'lex:openServiceDemo'. El ServicesShowcase escucha y
 * cambia su tab activo.
 */

export type LexEvent =
  | { type: 'lex:openServiceDemo'; payload: { slug: string } }
  | { type: 'lex:playDemo' }
  | { type: 'lex:pauseDemo' }
  | { type: 'lex:scrollTo'; payload: { sectionId: string } }
  | { type: 'lex:openWhatsApp'; payload: { message: string } }
  | { type: 'lex:close' }

type LexEventType = LexEvent['type']

type Handler<T extends LexEventType> = (
  detail: Extract<LexEvent, { type: T }> extends { payload: infer P } ? P : undefined,
) => void

export function dispatchLexEvent<T extends LexEventType>(
  type: T,
  detail?: Extract<LexEvent, { type: T }> extends { payload: infer P } ? P : undefined,
): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(type, { detail }))
}

export function onLexEvent<T extends LexEventType>(type: T, handler: Handler<T>): () => void {
  if (typeof window === 'undefined') return () => {}
  const wrapped = (e: Event) => handler((e as CustomEvent).detail)
  window.addEventListener(type, wrapped)
  return () => window.removeEventListener(type, wrapped)
}
