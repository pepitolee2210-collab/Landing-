'use client'

import { useState } from 'react'
import { LexWelcomeModal } from './lex-welcome-modal'
import { LexAgent } from './lex-agent'
import { LexFloatingButton } from './lex-floating-button'
import { LexInvitationBubble } from './lex-invitation-bubble'

/**
 * Orquestador del flujo de Lex en la landing.
 *
 * Discoverability triple:
 * 1. Welcome modal — al primer scroll significativo o 3s.
 *    Si el user eligió 'explore' hace > 30 días, vuelve a aparecer.
 * 2. Chat bubble — a los 8s si NO ha activado el agente (estilo Intercom).
 *    Aparece encima del FAB con CTA "Sí, guíame".
 * 3. FAB persistente — siempre visible en bottom-right.
 *
 * El store del contexto del usuario es module-level (ver
 * lex-user-context.tsx).
 */
export function LexOrchestrator() {
  const [agentActive, setAgentActive] = useState(false)

  return (
    <>
      <LexWelcomeModal
        hidden={agentActive}
        onAcceptGuided={() => setAgentActive(true)}
      />
      <LexInvitationBubble
        isAgentActive={agentActive}
        onActivate={() => setAgentActive(true)}
      />
      <LexFloatingButton
        isAgentActive={agentActive}
        onActivate={() => setAgentActive(true)}
      />
      {agentActive && <LexAgent onClosed={() => setAgentActive(false)} />}
    </>
  )
}
