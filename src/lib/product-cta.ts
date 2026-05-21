/**
 * CTAs psicológicos por servicio — punto crítico de conversión.
 * Cada servicio activa una emoción distinta y requiere un cierre distinto.
 *
 * Aplicamos neuromarketing por servicio:
 *  - Visa Juvenil → protección parental (loss aversion)
 *  - Asilo → seguridad + confidencialidad (safe space)
 *  - Ajuste I-485 → cercanía + hogar (anchor proximity)
 *  - Apelación BIA → urgencia extrema (scarcity + countdown)
 *  - Cambio de Corte → transición fluida (frictionless progress)
 *  - ITIN → pertenencia legal (identity belonging)
 *  - Taxes → loss aversion fiscal (FOMO money)
 *
 * Este texto APARECE después de que el cliente vio el video — es el
 * momento más caliente del funnel. Cada palabra debe presionar hacia
 * el click de WhatsApp.
 */

export interface ProductCTA {
  /** Iniciales del asesor que aparece (avatar) */
  advisorInitials: string
  /** Nombre del asesor para la línea "X · rol" */
  advisorName: string
  /** Rol específico para reforzar autoridad */
  advisorRole: string
  /** Color principal del CTA (puede usarse para badges) */
  accentColor: 'blue' | 'green' | 'red' | 'gold'

  /** Footer permanente (siempre visible mientras el video corre) */
  footerTitle: string
  footerSubtitle: string
  footerButton: string

  /** Ended overlay (cuando el video termina) */
  endedChip: string
  /** Headline antes del highlight */
  endedHeadlineStart: string
  /** Palabra/frase a destacar en azul */
  endedHeadlineHighlight: string
  /** Continuación opcional después del highlight (con punto final) */
  endedHeadlineEnd?: string
  endedDescription: string
  endedButton: string
  /** Mini stack de trust pills bajo el CTA (opcional, 3 items max) */
  endedTrustPills?: string[]
  /** Tono especial para urgencias (BIA) */
  isUrgent?: boolean
}

export const PRODUCT_CTAS: Record<string, ProductCTA> = {
  /* ════════════════════════════════════════════════
     01 · VISA JUVENIL — Protección parental
     ════════════════════════════════════════════════ */
  'visa-juvenil': {
    advisorInitials: 'VC',
    advisorName: 'Vanessa Cruz',
    advisorRole: 'Asesora SIJS · Especialista en menores',
    accentColor: 'blue',

    footerTitle: '¿Listo para proteger a tu hijo?',
    footerSubtitle: 'Vanessa revisa casos SIJS hoy mismo · Respuesta en menos de 4h',
    footerButton: 'Empezar el caso de mi hijo',

    endedChip: 'Cada día sin actuar es un día de miedo más',
    endedHeadlineStart: 'Que tu hijo crezca',
    endedHeadlineHighlight: 'sin miedo',
    endedHeadlineEnd: '.',
    endedDescription:
      'Vanessa revisa casos SIJS todos los días. En 30 minutos te dice si tu hijo califica, qué documentos faltan y cuál es su camino a la Green Card. Sin compromiso. Sin costo.',
    endedButton: 'Sí — proteger a mi hijo ahora',
    endedTrustPills: ['100% confidencial', 'Diagnóstico en 24h', 'Sin compromiso'],
  },

  /* ════════════════════════════════════════════════
     02 · ASILO POLÍTICO — Seguridad + confidencialidad
     ════════════════════════════════════════════════ */
  'asilo-politico': {
    advisorInitials: 'VC',
    advisorName: 'Vanessa Cruz',
    advisorRole: 'Abogado de Asilo · Licenciado en Utah',
    accentColor: 'blue',

    footerTitle: 'Tu historia merece ser escuchada',
    footerSubtitle: '100% confidencial · No reportamos a ICE · Privilegio cliente-abogado',
    footerButton: 'Contar mi historia (privado)',

    endedChip: 'Aquí estás más seguro de lo que crees',
    endedHeadlineStart: 'Tu historia importa.',
    endedHeadlineHighlight: 'Tu vida importa',
    endedHeadlineEnd: '.',
    endedDescription:
      'Vanessa te escucha en 30 minutos. Confidencial total · Sin reporte a ICE · Sin costo. Te decimos si tu caso es viable hoy mismo y cuál vía (afirmativo o defensivo) aplica.',
    endedButton: 'Sí — hablar con Vanessa en privado',
    endedTrustPills: ['100% confidencial', 'Sin reporte a ICE', 'Privilegio legal'],
  },

  /* ════════════════════════════════════════════════
     03 · AJUSTE DE ESTATUS I-485 — Cercanía + hogar
     ════════════════════════════════════════════════ */
  'ajuste-estatus': {
    advisorInitials: 'VC',
    advisorName: 'Vanessa Cruz',
    advisorRole: 'Paralegal de Green Card · I-485 Expert',
    accentColor: 'blue',

    footerTitle: 'Tu Green Card está más cerca de lo que crees',
    footerSubtitle: 'Vanessa coordina los 6 formularios contigo · Respuesta en 4h',
    footerButton: 'Empezar mi Green Card',

    endedChip: 'Estás más cerca de la Green Card de lo que crees',
    endedHeadlineStart: 'Hoy es el día.',
    endedHeadlineHighlight: 'Tu vida nueva',
    endedHeadlineEnd: ' empieza ahora.',
    endedDescription:
      'Vanessa revisa tu caso en menos de 24 horas. Te decimos en qué fase estás, qué formularios faltan y cuánto ahorras vs un bufete. Sin compromiso, sin costo de consulta.',
    endedButton: 'Sí — empezar mi Green Card',
    endedTrustPills: ['Ahorras miles vs bufete', 'Plan a tu medida', '6 formularios incluidos'],
  },

  /* ════════════════════════════════════════════════
     04 · APELACIÓN BIA — URGENCIA EXTREMA
     ════════════════════════════════════════════════ */
  'apelacion-bia': {
    advisorInitials: 'VC',
    advisorName: 'Vanessa Cruz',
    advisorRole: 'Abogado · Experto BIA · Plazos estrictos',
    accentColor: 'red',
    isUrgent: true,

    footerTitle: '⏰ Cada hora cuenta. No esperes.',
    footerSubtitle: 'Vanessa disponible AHORA · 30 días = 720 horas y bajando',
    footerButton: 'Hablar con Vanessa YA',

    endedChip: '⏰ Solo 30 días. Cada hora cuenta.',
    endedHeadlineStart: '30 días no es mucho.',
    endedHeadlineHighlight: 'Pero es suficiente',
    endedHeadlineEnd: '.',
    endedDescription:
      'Vanessa está disponible HOY mismo. La apelación PAUSA tu deportación mientras la BIA decide. No esperes a buscar bufete contra reloj — la plataforma genera tu EOIR-26 y Vanessa lo radica antes del día 30.',
    endedButton: 'Sí — presentar apelación AHORA',
    endedTrustPills: ['Pausa tu deportación', 'Vanessa disponible hoy', 'Radicado antes del día 30'],
  },

  /* ════════════════════════════════════════════════
     05 · CAMBIO DE CORTE — Transición fluida
     ════════════════════════════════════════════════ */
  'cambio-corte': {
    advisorInitials: 'VC',
    advisorName: 'Vanessa Cruz',
    advisorRole: 'Paralegal de Litigio · Mociones EOIR',
    accentColor: 'blue',

    footerTitle: 'Tu nueva vida no debe esperar',
    footerSubtitle: 'Vanessa mueve tu caso esta semana · Sin viajes',
    footerButton: 'Mover mi caso ya',

    endedChip: 'Tu nueva vida ya empezó. Tu caso debe seguirla',
    endedHeadlineStart: 'Tu caso viaja contigo.',
    endedHeadlineHighlight: 'Sin viajar tú',
    endedHeadlineEnd: '.',
    endedDescription:
      'Vanessa presenta tu Motion to Change Venue esta misma semana. Sin viajes innecesarios a la corte vieja. Sin pagar otro abogado en tu nuevo estado. Coordinamos ambas cortes por ti.',
    endedButton: 'Sí — mover mi caso esta semana',
    endedTrustPills: ['Sin viajes', 'Una sola moción', 'Tu nuevo estado'],
  },

  /* ════════════════════════════════════════════════
     06 · ITIN — Pertenencia legal
     ════════════════════════════════════════════════ */
  itin: {
    advisorInitials: 'VC',
    advisorName: 'Vanessa Cruz',
    advisorRole: 'Paralegal Fiscal · IRS Certified',
    accentColor: 'blue',

    footerTitle: 'Sé visible legalmente en EE.UU.',
    footerSubtitle: 'Vanessa tramita tu W-7 con el IRS · Sin ir al IRS',
    footerButton: 'Tramitar mi ITIN hoy',

    endedChip: 'Tu ITIN es la puerta a muchas cosas',
    endedHeadlineStart: 'Existe legalmente.',
    endedHeadlineHighlight: 'Declara. Construye',
    endedHeadlineEnd: '.',
    endedDescription:
      'Vanessa tramita tu ITIN ante el IRS en 15 minutos desde tu celular. Sin pagar $300 a un Acceptance Agent. Sin ir al IRS. Tu número queda tuyo para siempre.',
    endedButton: 'Sí — tramitar mi ITIN ahora',
    endedTrustPills: ['15 minutos', 'Sin ir al IRS', 'Tuyo para siempre'],
  },

  /* ════════════════════════════════════════════════
     07 · TAXES — Loss aversion fiscal (FOMO money)
     ════════════════════════════════════════════════ */
  taxes: {
    advisorInitials: 'VC',
    advisorName: 'Vanessa Cruz',
    advisorRole: 'Paralegal Fiscal · Optimización de créditos',
    accentColor: 'blue',

    footerTitle: 'Cada crédito perdido es dinero perdido',
    footerSubtitle: 'Vanessa optimiza EITC, CTC y cada crédito que te corresponde',
    footerButton: 'Declarar mis taxes ya',

    endedChip: 'Más rápido. Más exacto. Más barato.',
    endedHeadlineStart: 'Tus taxes hechos bien.',
    endedHeadlineHighlight: 'Tu refund maximizado',
    endedHeadlineEnd: '.',
    endedDescription:
      'Vanessa prepara tu federal 1040 + Utah TC-40 si aplica. Detecta EITC, CTC y cada crédito que te toca. E-file directo al IRS. Constancia para tu caso de inmigración incluida.',
    endedButton: 'Sí — declarar con Vanessa',
    endedTrustPills: ['Cada crédito aplicado', 'E-file oficial IRS', 'Constancia incluida'],
  },
}

/**
 * Devuelve el CTA específico de un producto, con fallback genérico
 * si por alguna razón no existe (no debería pasar en producción).
 */
export function getProductCTA(id: string): ProductCTA {
  return (
    PRODUCT_CTAS[id] || {
      advisorInitials: 'VC',
      advisorName: 'Vanessa Cruz',
      advisorRole: 'Asesora · Bilingüe ES/EN',
      accentColor: 'blue',
      footerTitle: '¿Te interesa este servicio?',
      footerSubtitle: 'Vanessa responde en menos de 4 horas',
      footerButton: 'Hablar con un asesor',
      endedChip: 'Ya viste cómo trabajamos',
      endedHeadlineStart: 'Empieza tu caso',
      endedHeadlineHighlight: 'hoy',
      endedHeadlineEnd: '.',
      endedDescription:
        'Vanessa te responde por WhatsApp en menos de 4 horas. Consulta gratuita, sin compromiso.',
      endedButton: 'Sí — hablar con Vanessa ahora',
    }
  )
}
