'use client'

import { useState } from 'react'
import { LexWelcomeModal } from './lex-welcome-modal'
import { LexAgent } from './lex-agent'
import { LexFloatingButton } from './lex-floating-button'

/**
 * Orquestador del flujo de Lex en la landing.
 *
 * Estados:
 * - Primera visita: modal aparece automáticamente. Si acepta → agente
 *   activo. Si declina → solo queda el botón flotante para reactivar.
 * - Visitas siguientes: localStorage recuerda la elección, no aparece
 *   modal, pero el botón flotante SIEMPRE está visible para que el
 *   usuario pueda invocar a Lex cuando quiera.
 *
 * - Click en botón flotante → activa el agente directamente (sin modal).
 * - Cerrar el agente → vuelve a aparecer el botón flotante.
 */
export function LexOrchestrator() {
  const [agentActive, setAgentActive] = useState(false)

  return (
    <>
      <LexWelcomeModal
        hidden={agentActive}
        onAcceptGuided={() => setAgentActive(true)}
      />
      <LexFloatingButton
        isAgentActive={agentActive}
        onActivate={() => setAgentActive(true)}
      />
      {agentActive && <LexAgent onClosed={() => setAgentActive(false)} />}
    </>
  )
}
