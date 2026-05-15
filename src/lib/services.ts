/**
 * Catálogo de los 5 servicios — cada uno tiene su página propia en /servicios/[slug].
 * PLACEHOLDERS: confirmar precios reales con Henry antes de producción.
 */

export interface ServicePhase {
  number: string
  title: string
  body: string
  deliverable: string
  timeframe?: string
}

export interface ServiceFAQ {
  q: string
  a: string
}

export interface Service {
  slug: string
  category: 'visa-juvenil' | 'asilo' | 'ajuste' | 'otros'
  /** Nombre corto para card del catálogo */
  shortName: string
  /** Título completo en la página detalle */
  fullName: string
  /** Una línea: a quién le aplica */
  audience: string
  /** Descripción 1-2 párrafos */
  description: string
  /** Precio base USD (number) — se muestra con formato luego */
  priceBase: number
  /** Costo por hijo adicional, si aplica */
  priceExtraChild?: number
  /** Texto "desde $X" */
  priceLabel: string
  /** Cuántas cuotas tiene por defecto */
  installments: number
  /** Fases del proceso (didáctico, mismo orden que ve el cliente) */
  phases: ServicePhase[]
  /** Documentos que debe traer el cliente */
  documents: string[]
  /** FAQ específicas */
  faq: ServiceFAQ[]
}

const PRICES_PLACEHOLDER_NOTE = '⚠ placeholder · pendiente confirmación de Henry'

export const SERVICES: Service[] = [
  // ────────────────── VISA JUVENIL (3 versiones) ──────────────────
  {
    slug: 'visa-juvenil-completa',
    category: 'visa-juvenil',
    shortName: 'Visa Juvenil — Proceso completo',
    fullName: 'Visa Juvenil SIJS — Proceso completo (3 fases)',
    audience:
      'Para menores de 21 años que califican para el estatus juvenil especial (SIJS) y necesitan acompañamiento desde la custodia hasta la residencia.',
    description:
      'La Visa Juvenil (Special Immigrant Juvenile Status) permite a menores que han sido abandonados, abusados o descuidados por uno o ambos padres acceder a la residencia legal en EE.UU. Nuestro proceso completo cubre las tres etapas legales necesarias.',
    priceBase: 2500,
    priceExtraChild: 500,
    priceLabel: 'desde $2,500',
    installments: 10,
    phases: [
      {
        number: '01',
        title: 'Custodia',
        body: 'Obtenemos la orden de custodia en la corte estatal de Utah u otro estado donde resida el menor. Es la base legal para el SIJS.',
        deliverable: 'Orden de custodia firmada por el juez',
        timeframe: '6–10 semanas',
      },
      {
        number: '02',
        title: 'I-360',
        body: 'Preparamos y radicamos la petición I-360 ante USCIS, demostrando que el menor califica como Inmigrante Juvenil Especial.',
        deliverable: 'Recibo USCIS + aprobación I-360',
        timeframe: '4–18 meses según oficina',
      },
      {
        number: '03',
        title: 'I-485',
        body: 'Una vez aprobado el I-360 y disponible la fecha de prioridad, radicamos el Ajuste de Estatus para obtener la Green Card.',
        deliverable: 'Tarjeta de Residencia permanente',
        timeframe: '12–24 meses',
      },
    ],
    documents: [
      'Acta de nacimiento del menor (apostillada y traducida)',
      'Pasaporte vigente del menor',
      'Documento de identidad del tutor en EE.UU.',
      'Comprobante de domicilio en EE.UU.',
      'Pruebas de abandono, abuso o negligencia (si aplica)',
    ],
    faq: [
      {
        q: '¿Mi hijo tiene que ser ciudadano para calificar?',
        a: 'No. El SIJS está pensado precisamente para menores que NO tienen estatus regular. Sí debe estar físicamente en EE.UU.',
      },
      {
        q: '¿Y si solo tiene un padre en EE.UU.?',
        a: 'No es problema. El SIJS aplica cuando uno o ambos padres lo han abandonado, abusado o descuidado.',
      },
      {
        q: '¿Cuánto tarda todo el proceso?',
        a: 'En promedio entre 18 y 36 meses, dependiendo de la oficina de USCIS asignada. Te informamos en cada etapa.',
      },
    ],
  },
  {
    slug: 'visa-juvenil-i360-i485',
    category: 'visa-juvenil',
    shortName: 'Visa Juvenil — I-360 + I-485',
    fullName: 'Visa Juvenil SIJS — Etapas 2 y 3 (I-360 + I-485)',
    audience:
      'Para familias que ya obtuvieron la orden de custodia por su cuenta y necesitan únicamente las etapas migratorias federales.',
    description:
      'Si ya tienes la orden de custodia firmada por un juez estatal, podemos encargarnos directamente de la petición I-360 y luego el Ajuste de Estatus (I-485). Es nuestro servicio más solicitado por familias que avanzaron la etapa local solas.',
    priceBase: 2000,
    priceExtraChild: 400,
    priceLabel: 'desde $2,000',
    installments: 10,
    phases: [
      {
        number: '01',
        title: 'I-360',
        body: 'Preparamos y radicamos la petición I-360 ante USCIS con todos los documentos requeridos y declaraciones juradas.',
        deliverable: 'Recibo USCIS + aprobación I-360',
        timeframe: '4–18 meses',
      },
      {
        number: '02',
        title: 'I-485',
        body: 'Radicamos el Ajuste de Estatus para obtener la Green Card.',
        deliverable: 'Tarjeta de Residencia permanente',
        timeframe: '12–24 meses',
      },
    ],
    documents: [
      'Orden de custodia ya firmada por el juez',
      'Acta de nacimiento del menor (apostillada y traducida)',
      'Pasaporte vigente del menor',
      'Comprobante de domicilio en EE.UU.',
    ],
    faq: [
      {
        q: '¿Cómo valido que mi orden de custodia sirve?',
        a: 'Te pedimos copia certificada de la orden. Henry la revisa y te confirma si cumple los requisitos del SIJS antes de firmar.',
      },
      {
        q: '¿El precio incluye respuestas a RFE?',
        a: 'Sí. Cualquier requerimiento de evidencia (RFE) de USCIS lo respondemos sin costo adicional.',
      },
    ],
  },
  {
    slug: 'visa-juvenil-i485',
    category: 'visa-juvenil',
    shortName: 'Visa Juvenil — Solo I-485',
    fullName: 'Visa Juvenil SIJS — Solo Ajuste de Estatus (I-485)',
    audience:
      'Para quienes ya tienen el I-360 aprobado y solo necesitan el paso final hacia la Green Card.',
    description:
      'Si ya tienes la aprobación del I-360 y la fecha de prioridad está vigente, te llevamos hasta la residencia permanente. Incluye preparación del paquete, biométricos y entrevista si aplica.',
    priceBase: 1500,
    priceExtraChild: 300,
    priceLabel: 'desde $1,500',
    installments: 8,
    phases: [
      {
        number: '01',
        title: 'I-485 Ajuste de Estatus',
        body: 'Preparamos todo el paquete I-485 con declaraciones, evidencia médica, antecedentes y formularios complementarios.',
        deliverable: 'Tarjeta de Residencia permanente',
        timeframe: '12–24 meses',
      },
    ],
    documents: [
      'Aprobación del I-360',
      'Acta de nacimiento (apostillada y traducida)',
      'Pasaporte vigente',
      'Examen médico I-693 (te indicamos médico autorizado)',
    ],
    faq: [
      {
        q: '¿Es obligatoria la entrevista USCIS?',
        a: 'No siempre. USCIS decide caso a caso. Si te citan, te preparamos para la entrevista con sesiones de práctica.',
      },
    ],
  },

  // ────────────────── ASILO POLÍTICO (2 versiones) ──────────────────
  {
    slug: 'asilo-completo',
    category: 'asilo',
    shortName: 'Asilo Político — Proceso completo',
    fullName: 'Asilo Político — Solicitud y reforzamiento (2 fases)',
    audience:
      'Para quienes huyeron de su país por persecución y necesitan presentar caso de asilo desde cero con evidencia sólida.',
    description:
      'El asilo afirmativo o defensivo requiere construir un caso con narrativa coherente, evidencia documental y testimonio preparado. Cubrimos desde la primera entrevista hasta la audiencia final.',
    priceBase: 3500,
    priceLabel: 'desde $3,500',
    installments: 10,
    phases: [
      {
        number: '01',
        title: 'Solicitud Inicial I-589',
        body: 'Construimos tu historia con todos los detalles legales, recopilamos evidencia de país y radicamos el I-589 ante USCIS o ante la Corte de Inmigración.',
        deliverable: 'Solicitud I-589 radicada',
        timeframe: '6–8 semanas de preparación',
      },
      {
        number: '02',
        title: 'Reforzamiento y Audiencia',
        body: 'Te preparamos para la entrevista de asilo o audiencia individual: práctica de testimonio, refuerzo de evidencia y representación legal el día de la cita.',
        deliverable: 'Decisión favorable de asilo',
        timeframe: 'Variable según corte',
      },
    ],
    documents: [
      'Pasaporte y documentos de identidad',
      'Cualquier evidencia del país de origen (amenazas, denuncias, fotos, medios)',
      'Testimonios de familiares o testigos',
      'Reportes de derechos humanos del país',
    ],
    faq: [
      {
        q: '¿Cuánto tiempo tengo para pedir asilo?',
        a: 'En general 1 año desde tu entrada a EE.UU. Hay excepciones — Henry evalúa tu caso primero.',
      },
      {
        q: '¿Puedo trabajar mientras se decide?',
        a: 'Sí. A los 150 días de radicar el I-589 puedes pedir permiso de trabajo (EAD) basado en asilo pendiente.',
      },
    ],
  },
  {
    slug: 'asilo-reforzamiento',
    category: 'asilo',
    shortName: 'Asilo Político — Reforzamiento',
    fullName: 'Asilo Político — Reforzamiento de caso pendiente',
    audience:
      'Para quienes ya tienen el I-589 radicado pero quieren un equipo experto para la entrevista o audiencia final.',
    description:
      'Tomamos tu caso a partir del I-589 ya radicado: revisamos lo entregado, identificamos vacíos de evidencia, te preparamos a fondo para la entrevista o audiencia y te representamos.',
    priceBase: 2000,
    priceLabel: 'desde $2,000',
    installments: 8,
    phases: [
      {
        number: '01',
        title: 'Auditoría del caso',
        body: 'Revisamos lo que radicaste, identificamos riesgos y diseñamos el plan de refuerzo.',
        deliverable: 'Informe de auditoría + plan',
      },
      {
        number: '02',
        title: 'Preparación y audiencia',
        body: 'Práctica de testimonio, evidencia adicional, presencia legal el día de la cita.',
        deliverable: 'Decisión favorable de asilo',
      },
    ],
    documents: [
      'Copia del I-589 radicado',
      'Recibo de USCIS o Corte',
      'Cualquier evidencia adicional que tengas',
    ],
    faq: [
      {
        q: '¿Y si mi caso fue radicado por otro abogado?',
        a: 'No hay problema. Te damos una opinión legal segunda y, si tomamos el caso, presentamos sustitución de representación ante la corte.',
      },
    ],
  },
]

export const SERVICES_BY_SLUG = new Map(SERVICES.map((s) => [s.slug, s]))

/** Para el catálogo en la home, ordenados por relevancia */
export const FEATURED_SLUGS = [
  'visa-juvenil-completa',
  'visa-juvenil-i360-i485',
  'asilo-completo',
  'visa-juvenil-i485',
  'asilo-reforzamiento',
] as const

export const PRICES_NOTE = PRICES_PLACEHOLDER_NOTE
