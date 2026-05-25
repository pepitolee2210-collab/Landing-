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
import {
  getServiceDetails,
  getServicePricing,
  listAllServices,
  checkServiceFit,
  getRelatedTestimonials,
  getTeamInfo,
  getFAQ,
  buildWhatsAppMessage,
} from './lex-knowledge'

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
      'Mueve la página web a una sección específica para que el usuario la vea. Úsala constantemente mientras hablas — cada vez que menciones un concepto relacionado a una sección, ya estás haciendo scroll ahí.',
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
    name: 'highlightSection',
    description:
      'Como scrollToSection pero ENFATIZA con un pulso visual de 2 segundos sobre la sección. Úsala cuando es algo crítico que el usuario debe ver (precios, garantía, prueba social, CTA principal).',
    parameters: {
      type: 'object',
      properties: {
        sectionId: {
          type: 'string',
          description: 'ID de la sección a destacar.',
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
  {
    name: 'playHeroVideo',
    description:
      'Muestra el video del equipo en el hero (scroll + destacar). Úsala cuando el usuario pregunta "¿quiénes son?" / "¿quién es el equipo?" / "muéstrame quienes están detrás".',
    parameters: { type: 'object', properties: {} },
  },
  {
    name: 'showServiceVideo',
    description:
      'Abre el video corto de 30 segundos del servicio en el service-modal. Es el video EXPLICATIVO (qué es el servicio). Distinto de openServiceDemo que muestra la PLATAFORMA en vivo. Úsala cuando el usuario pregunta "¿qué es X servicio?" / "explícame cómo es X" antes del demo.',
    parameters: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'Slug del servicio',
          enum: ['visa-juvenil', 'asilo-politico', 'ajuste-de-estatus', 'apelacion-bia', 'cambio-de-corte', 'itin-number', 'taxes'],
        },
      },
      required: ['slug'],
    },
  },
  {
    name: 'captureUserContext',
    description:
      'Guarda datos del usuario para personalizar el demo y el mensaje final de WhatsApp. INVÓCALA tan pronto como el usuario te diga su nombre, datos del hijo, estado donde vive o resuma su situación. NO inventes datos — solo guarda lo que él dijo explícitamente.',
    parameters: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Primer nombre del usuario' },
        minorName: { type: 'string', description: 'Nombre del hijo si aplica SIJS' },
        minorAge: { type: 'number', description: 'Edad del hijo si aplica' },
        state: { type: 'string', description: 'Estado donde vive (ej. Utah)' },
        situation: { type: 'string', description: 'Resumen 1 frase de su caso' },
      },
    },
  },

  // ════════════════════════════════════════════════════════════════
  // Knowledge base tools — consultan datos reales de la landing
  // ════════════════════════════════════════════════════════════════
  {
    name: 'getServiceDetails',
    description:
      'Obtiene info detallada del servicio: pitch, descripción larga, features incluidas, tiempo estimado, rating. ÚSALA cuando el usuario pregunte "qué incluye" / "qué hacen exactamente" / "cuánto tarda".',
    parameters: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'Slug del servicio',
          enum: ['visa-juvenil', 'asilo-politico', 'ajuste-de-estatus', 'apelacion-bia', 'cambio-de-corte', 'itin-number', 'taxes'],
        },
      },
      required: ['slug'],
    },
  },
  {
    name: 'getServicePricing',
    description:
      'Responde la pregunta de precio. SIEMPRE retorna "cotización personalizada" + redirige a WhatsApp. NUNCA inventes precios. ÚSALA en cuanto el usuario pregunte cuánto cuesta algo.',
    parameters: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'Slug del servicio',
          enum: ['visa-juvenil', 'asilo-politico', 'ajuste-de-estatus', 'apelacion-bia', 'cambio-de-corte', 'itin-number', 'taxes'],
        },
      },
      required: ['slug'],
    },
  },
  {
    name: 'listAllServices',
    description:
      'Lista los 7 servicios disponibles con su pitch corto. ÚSALA si el usuario pregunta "¿qué servicios tienen?" o no sabes qué necesita.',
    parameters: { type: 'object', properties: {} },
  },
  {
    name: 'checkServiceFit',
    description:
      'Analiza una situación descrita por el usuario y sugiere qué servicio le aplica. ÚSALA después de que el usuario describa su caso pero antes de mostrar un demo. La respuesta NO es asesoría legal — solo orientación.',
    parameters: {
      type: 'object',
      properties: {
        situation: {
          type: 'string',
          description:
            'La situación tal como el usuario la describió. Ejemplo: "mi hijo de 14 años vive en Utah sin su papá"',
        },
      },
      required: ['situation'],
    },
  },
  {
    name: 'getRelatedTestimonials',
    description:
      'Obtiene 1-2 testimonios reales de clientes. ÚSALA cuando el usuario pregunte "¿qué dicen otros clientes?" o necesite prueba social.',
    parameters: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'Slug del servicio para filtrar testimonios. Opcional.',
        },
      },
    },
  },
  {
    name: 'getTeamInfo',
    description:
      'Información general de UsaLatinoPrime: ubicación, fundación, contacto. ÚSALA si el usuario pregunta "¿quiénes son?" o "¿dónde están?".',
    parameters: { type: 'object', properties: {} },
  },
  {
    name: 'getFAQ',
    description:
      'Responde preguntas comunes sobre la operación del negocio. Topics: precios, ubicacion, idioma, tiempo, documentos, pago, cita, portal, garantia, whatsapp. ÚSALA antes de inventar respuestas.',
    parameters: {
      type: 'object',
      properties: {
        topic: {
          type: 'string',
          description:
            'Tema de la pregunta. Ej: "precios", "tiempo", "documentos", "garantia".',
        },
      },
      required: ['topic'],
    },
  },
  {
    name: 'buildWhatsAppMessage',
    description:
      'Arma el mensaje contextual perfecto para abrir WhatsApp con la situación específica del usuario. Devuelve un string que usarás en openWhatsApp(message). ÚSALA SIEMPRE antes de openWhatsApp para personalizar el mensaje.',
    parameters: {
      type: 'object',
      properties: {
        userName: { type: 'string', description: 'Nombre del usuario si lo dijo' },
        serviceSlug: { type: 'string', description: 'Slug del servicio identificado' },
        userSituation: { type: 'string', description: 'Resumen de su situación en 1 frase' },
        minorName: { type: 'string', description: 'Nombre del hijo si aplica' },
        minorAge: { type: 'number', description: 'Edad del hijo si aplica' },
        state: { type: 'string', description: 'Estado donde vive' },
        urgency: { type: 'string', description: 'high si dijo que es urgente, normal si no', enum: ['high', 'normal'] },
      },
    },
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

    case 'highlightSection': {
      const sectionId = String(args.sectionId ?? '')
      const el = document.getElementById(sectionId)
      if (!el) return { ok: false, message: `Sección ${sectionId} no encontrada` }
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // Aplicar clase de pulso visual durante 2.5s
      el.classList.add('lex-highlight-pulse')
      setTimeout(() => el.classList.remove('lex-highlight-pulse'), 2500)
      dispatchLexEvent('lex:scrollTo', { sectionId })
      return { ok: true, message: `Sección ${sectionId} destacada` }
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
      // Intento de apertura automática. Si el navegador bloquea (popup
      // blocker en Safari iOS sobre todo), el evento dispara un botón
      // fallback persistente en el widget para que el user haga click manual.
      let opened: Window | null = null
      if (typeof window !== 'undefined') {
        try {
          opened = window.open(url, '_blank', 'noopener,noreferrer')
        } catch {
          opened = null
        }
      }
      dispatchLexEvent('lex:openWhatsApp', { message })
      return {
        ok: true,
        message: opened
          ? 'WhatsApp abierto en pestaña nueva'
          : 'WhatsApp NO se abrió automáticamente (popup blocker). Aparecerá un botón en el widget para que el usuario lo abra manualmente.',
      }
    }

    case 'closeAgent': {
      dispatchLexEvent('lex:close')
      return { ok: true, message: 'Conversación cerrada' }
    }

    case 'playHeroVideo': {
      // Scroll al hero + dispatch evento (el componente Hero2 puede
      // escuchar para destacar el video si quiere).
      const hero = document.getElementById('hero')
      if (hero) {
        hero.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      dispatchLexEvent('lex:playHeroVideo')
      return { ok: true, message: 'Video del hero destacado' }
    }

    case 'showServiceVideo': {
      const slug = String(args.slug ?? '')
      // Scroll al ProductGrid donde están las cards de servicios y dispatch
      // evento. ProductGrid escucha y abre el ServiceModal del slug.
      const products = document.getElementById('productos')
      if (products) {
        products.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      dispatchLexEvent('lex:showServiceVideo', { slug })
      return { ok: true, message: `Video del servicio ${slug} solicitado` }
    }

    case 'captureUserContext': {
      const payload: Record<string, unknown> = {}
      if (args.name) payload.name = String(args.name)
      if (args.minorName) payload.minorName = String(args.minorName)
      if (args.minorAge !== undefined) payload.minorAge = Number(args.minorAge)
      if (args.state) payload.state = String(args.state)
      if (args.situation) payload.situation = String(args.situation)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatchLexEvent('lex:userContext', payload as any)
      return { ok: true, message: `Contexto guardado: ${JSON.stringify(payload)}` }
    }

    // ════════════════════════════════════════════════════════════════
    // Knowledge base handlers — devuelven datos como string JSON para
    // que el modelo pueda usarlos en su respuesta.
    // ════════════════════════════════════════════════════════════════
    case 'getServiceDetails': {
      const result = getServiceDetails(String(args.slug ?? ''))
      return { ok: result.ok, message: JSON.stringify(result) }
    }
    case 'getServicePricing': {
      const result = getServicePricing(String(args.slug ?? ''))
      return { ok: result.ok, message: JSON.stringify(result) }
    }
    case 'listAllServices': {
      const result = listAllServices()
      return { ok: result.ok, message: JSON.stringify(result) }
    }
    case 'checkServiceFit': {
      const result = checkServiceFit(String(args.situation ?? ''))
      return { ok: result.ok, message: JSON.stringify(result) }
    }
    case 'getRelatedTestimonials': {
      const slug = args.slug ? String(args.slug) : undefined
      const result = getRelatedTestimonials(slug)
      return { ok: result.ok, message: JSON.stringify(result) }
    }
    case 'getTeamInfo': {
      const result = getTeamInfo()
      return { ok: result.ok, message: JSON.stringify(result) }
    }
    case 'getFAQ': {
      const result = getFAQ(String(args.topic ?? ''))
      return { ok: result.ok, message: JSON.stringify(result) }
    }
    case 'buildWhatsAppMessage': {
      const result = buildWhatsAppMessage({
        userName: args.userName ? String(args.userName) : undefined,
        serviceSlug: args.serviceSlug ? String(args.serviceSlug) : undefined,
        userSituation: args.userSituation ? String(args.userSituation) : undefined,
        minorName: args.minorName ? String(args.minorName) : undefined,
        minorAge: args.minorAge ? Number(args.minorAge) : undefined,
        state: args.state ? String(args.state) : undefined,
        urgency: args.urgency === 'high' ? 'high' : 'normal',
      })
      return { ok: result.ok, message: JSON.stringify(result) }
    }

    default:
      return { ok: false, message: `Función desconocida: ${name}` }
  }
}
