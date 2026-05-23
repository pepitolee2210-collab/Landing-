'use client'

import { useState } from 'react'
import { LexWelcomeModal } from './lex-welcome-modal'
import { LexAgent } from './lex-agent'

/**
 * Orquestador del flujo de Lex en la landing.
 *
 * - Muestra LexWelcomeModal al cargar (con delay).
 * - Si el usuario acepta, monta LexAgent (que arranca la sesión Live).
 * - Si el usuario declina, no monta nada — solo persiste la elección
 *   en localStorage para no volver a preguntar en futuras visitas.
 *
 * Vive separado de page.tsx (que es Server Component) porque tanto el
 * modal como el agente son client components con estado.
 */
export function LexOrchestrator() {
  const [agentActive, setAgentActive] = useState(false)

  return (
    <>
      <LexWelcomeModal onAcceptGuided={() => setAgentActive(true)} />
      {agentActive && <LexAgent onClosed={() => setAgentActive(false)} />}
    </>
  )
}
