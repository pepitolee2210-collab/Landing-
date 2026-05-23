'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * FAB (Floating Action Button) que SIEMPRE está visible en la esquina
 * inferior derecha. Permite re-activar a Lex después de declinarlo o
 * cerrarlo. Se oculta automáticamente cuando el agente está activo
 * (porque el widget de Lex ocupa el mismo lugar).
 */

interface Props {
  isAgentActive: boolean
  onActivate: () => void
}

export function LexFloatingButton({ isAgentActive, onActivate }: Props) {
  // Patrón mount-gate: previene hydration mismatch del portal.
  // El SSR renderiza null, el cliente monta el botón después del primer
  // commit. Esto es exactamente el caso para el cual el patrón existe.
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return null
  if (isAgentActive) return null // el widget del agente ya ocupa este espacio

  return createPortal(
    <button
      type="button"
      onClick={onActivate}
      aria-label="Hablar con Lex, el asistente digital"
      className="group"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 45,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 18px 12px 14px',
        borderRadius: 999,
        background: 'linear-gradient(135deg, #3B82F6, #1E40AF)',
        color: '#FFFFFF',
        border: '0.5px solid rgba(255,255,255,0.18)',
        boxShadow: '0 10px 32px rgba(59,130,246,0.35), 0 0 0 0.5px rgba(255,255,255,0.1) inset',
        cursor: 'pointer',
        fontFamily: 'system-ui, sans-serif',
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: '-0.005em',
        transition: 'all 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
        animation: 'lex-fab-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.06)'
        e.currentTarget.style.boxShadow = '0 14px 48px rgba(59,130,246,0.55), 0 0 0 0.5px rgba(255,255,255,0.2) inset'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = '0 10px 32px rgba(59,130,246,0.35), 0 0 0 0.5px rgba(255,255,255,0.1) inset'
      }}
    >
      {/* Orb con pulse */}
      <span className="relative flex items-center justify-center" style={{ width: 24, height: 24 }}>
        <span
          aria-hidden
          className="absolute rounded-full"
          style={{
            inset: 0,
            background: 'rgba(255,255,255,0.7)',
            animation: 'lex-fab-pulse 2s ease-in-out infinite',
          }}
        />
        <span
          className="relative rounded-full"
          style={{
            width: 14,
            height: 14,
            background: '#FFFFFF',
            boxShadow: '0 0 12px rgba(255,255,255,0.8)',
          }}
        />
      </span>

      <span style={{ position: 'relative' }}>Hablar con Lex</span>

      <style>{`
        @keyframes lex-fab-in {
          from { opacity: 0; transform: translateY(20px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes lex-fab-pulse {
          0%, 100% { opacity: 0; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.6); }
        }
      `}</style>
    </button>,
    document.body,
  )
}
