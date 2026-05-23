/**
 * Function declarations + handlers que Lex puede invocar.
 *
 * Las declarations se le pasan al modelo en la config inicial. Los handlers
 * se ejecutan cuando el modelo invoca la función — manipulan el DOM o
 * dispatchan eventos al resto de la app via `dispatchLexEvent`.
 */

import { dispatchLexEvent } from './lex-events'
import { SITE } from '@/lib/site'
import { whatsappUrl } from '@/lib/utils'

// Type compatible con FunctionDeclaration de @google/genai sin importar el SDK
// (lo usamos en cliente; el endpoint server-side hace cast cuando configura
// la sesión).
export interface LexFunctionDeclaration {
  name: string
  description: string
  parameters?: {
    type: 'object'
    properties: Record<string, { type: string; description: string; enum?: string[] }>
    required?: string[]
  }
}

export const LEX_TOOL_DECLARATIONS: LexFunctionDeclaration[] = [
  {
    name: 'scrollToSection',
    description:
      'Mueve la página web a una sección específica para que el usuario la vea. Úsala cuando quieras mostrarle al usuario una parte concreta de la landing.',
    parameters: {
      type: 'object',
      properties: {
        sectionId: {
          type: 'string',
          description: 'ID de la sección a la que hacer scroll.',
          enum: [
            'hero',
            'productos',
            'servicios-showcase',
            'planes',
            'que-es',
            'como-funciona',
            'opiniones',
            'ceo',
            'garantia',
            'faq',
          ],
        },
      },
      required: ['sectionId'],
    },
  },
  {
    name: 'openServiceDemo',
    description:
      'Cambia el demo activo en el showcase de servicios a un servicio específico. NO arranca la reproducción — para eso llama también a playDemo después. Úsala cuando hayas identificado qué servicio necesita el usuario.',
    parameters: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'Slug del servicio.',
          enum: ['visa-juvenil', 'asilo-politico', 'reforzar-asilo', 'apelacion', 'cambio-de-corte'],
        },
      },
      required: ['slug'],
    },
  },
  {
    name: 'playDemo',
    description:
      'Arranca la reproducción del demo activo en el showcase. Llámala después de openServiceDemo para que el usuario vea el flujo del servicio en vivo.',
    parameters: { type: 'object', properties: {} },
  },
  {
    name: 'pauseDemo',
    description:
      'Pausa el demo en reproducción. Úsala si el usuario te interrumpe con una pregunta y quieres detener el video mientras le respondes.',
    parameters: { type: 'object', properties: {} },
  },
  {
    name: 'openWhatsApp',
    description:
      'Abre WhatsApp en una pestaña nueva con un mensaje pre-llenado al equipo de UsaLatinoPrime. Úsala como cierre de conversación cuando el usuario muestre interés claro, pregunte precios, o cuando necesite respuesta humana. El mensaje debe resumir SU situación específica en primera persona, NO un mensaje genérico.',
    parameters: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description:
            'Mensaje en primera persona del usuario que resume su situación. Ejemplo: "Hola, hablé con Lex en su web. Mi hijo tiene 16 años, vive en Utah sin su papá. Quiero información sobre Visa Juvenil SIJS."',
        },
      },
      required: ['message'],
    },
  },
  {
    name: 'closeAgent',
    description:
      'Cierra la conversación con el usuario. Úsala SOLO si el usuario pide explícitamente terminar la conversación o cerrar el asistente.',
    parameters: { type: 'object', properties: {} },
  },
]

// ─────────────────────────────────────────────────────────────────────
// Handlers — se ejecutan cuando el modelo invoca cada función
// ─────────────────────────────────────────────────────────────────────

export interface LexToolResult {
  ok: boolean
  message: string
}

export function executeLexTool(name: string, args: Record<string, unknown>): LexToolResult {
  switch (name) {
    case 'scrollToSection': {
      const sectionId = String(args.sectionId ?? '')
      const el = document.getElementById(sectionId)
      if (!el) return { ok: false, message: `Sección ${sectionId} no encontrada` }
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      dispatchLexEvent('lex:scrollTo', { sectionId })
      return { ok: true, message: `Scroll a ${sectionId} completado` }
    }

    case 'openServiceDemo': {
      const slug = String(args.slug ?? '')
      // Antes de cambiar de servicio, hacer scroll al showcase
      const showcase = document.getElementById('servicios-showcase')
      if (showcase) showcase.scrollIntoView({ behavior: 'smooth', block: 'start' })
      dispatchLexEvent('lex:openServiceDemo', { slug })
      return { ok: true, message: `Demo del servicio ${slug} abierto` }
    }

    case 'playDemo': {
      dispatchLexEvent('lex:playDemo')
      return { ok: true, message: 'Demo reproduciéndose' }
    }

    case 'pauseDemo': {
      dispatchLexEvent('lex:pauseDemo')
      return { ok: true, message: 'Demo pausado' }
    }

    case 'openWhatsApp': {
      const message = String(args.message ?? 'Hola, hablé con Lex en su web. Quiero información.')
      const url = whatsappUrl(SITE.contact.whatsapp, message)
      // Abrir en pestaña nueva
      if (typeof window !== 'undefined') {
        window.open(url, '_blank', 'noopener,noreferrer')
      }
      dispatchLexEvent('lex:openWhatsApp', { message })
      return { ok: true, message: 'WhatsApp abierto en pestaña nueva' }
    }

    case 'closeAgent': {
      dispatchLexEvent('lex:close')
      return { ok: true, message: 'Conversación cerrada' }
    }

    default:
      return { ok: false, message: `Función desconocida: ${name}` }
  }
}
