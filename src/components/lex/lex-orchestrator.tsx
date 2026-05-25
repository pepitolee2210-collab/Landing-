'use client'

import { useState } from 'react'
import { LexWelcomeModal } from './lex-welcome-modal'
import { LexAgent } from './lex-agent'
import { LexFloatingButton } from './lex-floating-button'

/**
 * Orquestador del flujo de Lex en la landing.
 *
 * El store del contexto del usuario es module-level (ver
 * lex-user-context.tsx), así que NO necesita Provider. El ServicesShowcase
 * y el LexAgent leen del mismo store global mediante useLexUserContext.
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
