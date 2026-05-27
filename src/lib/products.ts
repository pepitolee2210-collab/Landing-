/**
 * Catálogo REAL de servicios legales migratorios de UsaLatinoPrime.
 * 8 servicios core en el orden que pidió Henry para la landing.
 * `estimatedDelivery` = tiempo del proceso CON LA PLATAFORMA (no plazos
 * USCIS/corte) — es lo que tarda nuestro equipo en preparar y entregar.
 * `badge.text` = nombre del servicio (chip identificador en cada card).
 * Sin precios — cada producto termina en cotización + WhatsApp.
 */

export interface ProductFeature {
  label: string
  included: boolean
}

export interface ProductBadge {
  text: string
  variant: 'popular' | 'new' | 'sale' | 'limited'
}

export interface Product {
  id: string
  slug: string
  category: 'visa-juvenil' | 'asilo' | 'green-card' | 'litigio' | 'fiscal'
  name: string
  pitch: string
  shortDescription: string
  fullDescription: string
  rating: number
  reviewCount: number
  badge?: ProductBadge
  features: ProductFeature[]
  estimatedDelivery: string
  stockSignal?: string
  accentColor: 'gold' | 'blue' | 'red' | 'jade'
}

export const PRODUCTS: Product[] = [
  /* ════════════════════════════════════════════════
     01 · VISA JUVENIL SIJS
     ════════════════════════════════════════════════ */
  {
    id: 'visa-juvenil',
    slug: 'visa-juvenil',
    category: 'visa-juvenil',
    name: 'Visa Juvenil · SIJS',
    pitch: 'Producto estrella · 3 fases con un solo equipo',
    shortDescription:
      'Para menores de 21 víctimas de abuso, negligencia o abandono. De la custodia estatal a la Green Card.',
    fullDescription:
      'El proceso SIJS (Special Immigrant Juvenile Status) en sus 3 fases: Custodia en corte estatal con hallazgos especiales, petición I-360 ante USCIS, y ajuste de estatus I-485 para obtener la residencia permanente.',
    rating: 4.9,
    reviewCount: 73,
    badge: { text: 'Visa Juvenil · SIJS', variant: 'popular' },
    features: [
      { label: 'Fase 1 · Custodia en corte estatal', included: true },
      { label: 'Fase 2 · Petición I-360 ante USCIS', included: true },
      { label: 'Fase 3 · Ajuste I-485 · Green Card', included: true },
      { label: 'Hallazgos especiales SIJS', included: true },
      { label: 'Respuestas a RFE incluidas', included: true },
      { label: 'Acompañamiento en biométricos y entrevista', included: true },
      { label: 'Portal cliente 24/7', included: true },
    ],
    estimatedDelivery: '3–4 semanas',
    stockSignal: 'Cupos limitados este mes',
    accentColor: 'blue',
  },

  /* ════════════════════════════════════════════════
     02 · I-360 — Petición ante USCIS (fase 2 SIJS)
     ════════════════════════════════════════════════ */
  {
    id: 'i360',
    slug: 'i360',
    category: 'visa-juvenil',
    name: 'I-360',
    pitch: '',
    shortDescription:
      'Petición I-360 ante USCIS para reconocimiento como Inmigrante Juvenil Especial tras la custodia estatal.',
    fullDescription:
      'Una vez obtenida la orden de custodia con los hallazgos especiales, presentamos la petición I-360 ante USCIS. Preparamos toda la evidencia, respondemos RFEs y damos seguimiento hasta la aprobación.',
    rating: 4.9,
    reviewCount: 0,
    badge: { text: 'I-360', variant: 'new' },
    features: [
      { label: 'Formulario I-360 ante USCIS', included: true },
      { label: 'Compilación de evidencia de custodia', included: true },
      { label: 'Respuestas a RFE incluidas', included: true },
      { label: 'Seguimiento hasta aprobación', included: true },
    ],
    estimatedDelivery: '2–3 semanas',
    accentColor: 'gold',
  },

  /* ════════════════════════════════════════════════
     03 · I-485 — Ajuste de Estatus (Green Card)
     ════════════════════════════════════════════════ */
  {
    id: 'ajuste-estatus',
    slug: 'ajuste-de-estatus',
    category: 'green-card',
    name: 'I-485 · Ajuste de Estatus',
    pitch: 'Tu Green Card sin salir de EE.UU.',
    shortDescription:
      'Solicitud completa I-485 para residencia permanente. Cónyuges de ciudadanos, peticionados, derivados.',
    fullDescription:
      'Te llevamos el ajuste a residente permanente desde dentro de EE.UU. con los 6 formularios coordinados: petición familiar I-130, ajuste I-485, sponsor I-864, permiso de trabajo I-765, viaje Advance Parole I-131 y examen médico I-693.',
    rating: 4.9,
    reviewCount: 51,
    badge: { text: 'I-485', variant: 'popular' },
    features: [
      { label: 'I-485 ajuste de estatus', included: true },
      { label: 'I-130 petición familiar', included: true },
      { label: 'I-864 sponsor financiero', included: true },
      { label: 'I-765 permiso de trabajo', included: true },
      { label: 'I-131 Advance Parole', included: true },
      { label: 'I-693 coordinación examen médico', included: true },
      { label: 'Acompañamiento en entrevista', included: true },
    ],
    estimatedDelivery: '3–4 semanas',
    accentColor: 'jade',
  },

  /* ════════════════════════════════════════════════
     04 · ASILO POLÍTICO — Afirmativo + Defensivo
     ════════════════════════════════════════════════ */
  {
    id: 'asilo-politico',
    slug: 'asilo-politico',
    category: 'asilo',
    name: 'Asilo Político',
    pitch: 'Protección para quien huye de persecución',
    shortDescription:
      'Asilo Afirmativo (ante USCIS) o Defensivo (en corte). Construcción de narrativa, evidencia y representación.',
    fullDescription:
      'Si huiste de tu país por persecución de raza, religión, nacionalidad, opinión política o grupo social, calificas. Llevamos tu caso ante USCIS si no estás en deportación (afirmativo) o ante el juez de inmigración si ya estás en proceso (defensivo).',
    rating: 4.7,
    reviewCount: 28,
    badge: { text: 'Asilo Político', variant: 'new' },
    features: [
      { label: 'Solicitud I-589 (USCIS o corte)', included: true },
      { label: 'Construcción de narrativa legal', included: true },
      { label: 'Recopilación de evidencia de país', included: true },
      { label: 'Preparación intensiva de testimonio', included: true },
      { label: 'Representación en entrevista o audiencia', included: true },
      { label: 'Permiso de trabajo (I-765) paralelo', included: true },
      { label: 'Form EOIR-28 para casos en corte', included: true },
    ],
    estimatedDelivery: '4–6 semanas',
    accentColor: 'red',
  },

  /* ════════════════════════════════════════════════
     05 · REFORZAR ASILO — Casos ya iniciados
     ════════════════════════════════════════════════ */
  {
    id: 'reforzar-asilo',
    slug: 'reforzar-asilo',
    category: 'asilo',
    name: 'Reforzar Asilo',
    pitch: '',
    shortDescription:
      'Para clientes con asilo ya iniciado: refuerzo de narrativa, evidencia nueva y preparación de audiencia.',
    fullDescription:
      'Si ya tienes un caso de asilo iniciado y necesitas reforzarlo de cara a la entrevista o audiencia, recopilamos nueva evidencia, ajustamos la narrativa, preparamos testimonio y aseguramos representación.',
    rating: 4.8,
    reviewCount: 0,
    badge: { text: 'Reforzar Asilo', variant: 'new' },
    features: [
      { label: 'Refuerzo de narrativa legal existente', included: true },
      { label: 'Recopilación de evidencia adicional', included: true },
      { label: 'Preparación intensiva de testimonio', included: true },
      { label: 'Representación en audiencia', included: true },
    ],
    estimatedDelivery: '2–3 semanas',
    accentColor: 'gold',
  },

  /* ════════════════════════════════════════════════
     06 · CAMBIO DE CORTE — Motion to Change Venue
     ════════════════════════════════════════════════ */
  {
    id: 'cambio-corte',
    slug: 'cambio-de-corte',
    category: 'litigio',
    name: 'Cambio de Corte',
    pitch: 'Mueve tu caso a tu ciudad actual',
    shortDescription:
      'Motion to Change Venue. Si te mudaste, trasladamos tu caso de inmigración a la corte cercana.',
    fullDescription:
      'Te mudaste de estado y tu caso quedó en otra corte. Presentamos Motion to Change Venue, documentamos tu nueva residencia y coordinamos el traslado para que no tengas que viajar a cada audiencia.',
    rating: 4.8,
    reviewCount: 7,
    badge: { text: 'Cambio de Corte', variant: 'new' },
    features: [
      { label: 'Motion to Change Venue ante EOIR', included: true },
      { label: 'Documentación de nueva dirección', included: true },
      { label: 'Coordinación entre cortes de origen y destino', included: true },
      { label: 'Confirmación con EOIR de traslado', included: true },
    ],
    estimatedDelivery: '5–7 días',
    accentColor: 'blue',
  },

  /* ════════════════════════════════════════════════
     07 · ITIN — IRS Form W-7
     ════════════════════════════════════════════════ */
  {
    id: 'itin',
    slug: 'itin-number',
    category: 'fiscal',
    name: 'ITIN Number',
    pitch: 'Identificación fiscal para indocumentados',
    shortDescription:
      'Solicitud W-7 ante IRS. Tu Individual Taxpayer Identification Number para declarar impuestos.',
    fullDescription:
      'Tramitamos tu ITIN ante el IRS con la W-7, certificamos documentos y presentamos paralelamente la declaración 1040. Indispensable para declarar impuestos sin Social Security y para varios procesos migratorios.',
    rating: 4.9,
    reviewCount: 42,
    badge: { text: 'ITIN Number', variant: 'new' },
    features: [
      { label: 'Formulario W-7 ante IRS', included: true },
      { label: 'Certificación de documentos de identidad', included: true },
      { label: 'Acompañamiento con declaración 1040', included: true },
      { label: 'Seguimiento hasta recibir el ITIN', included: true },
      { label: 'Renovación si es necesario', included: true },
    ],
    estimatedDelivery: '1–2 semanas',
    accentColor: 'jade',
  },

  /* ════════════════════════════════════════════════
     08 · TAXES — Federal 1040 + Utah TC-40
     ════════════════════════════════════════════════ */
  {
    id: 'taxes',
    slug: 'taxes',
    category: 'fiscal',
    name: 'Declaración de Impuestos',
    pitch: 'Federal 1040 + estatal Utah TC-40',
    shortDescription:
      'Declaración federal y estatal de impuestos. Crítico para tu caso migratorio y para acceder a beneficios.',
    fullDescription:
      'Preparamos tu declaración federal 1040 y la estatal TC-40 si vives en Utah. Optimizamos cada crédito fiscal y te entregamos la constancia que muchos procesos migratorios requieren.',
    rating: 4.9,
    reviewCount: 67,
    badge: { text: 'Declaración de Impuestos', variant: 'new' },
    features: [
      { label: 'Form 1040 federal completo', included: true },
      { label: 'TC-40 estatal Utah si aplica', included: true },
      { label: 'Optimización de créditos fiscales', included: true },
      { label: 'Constancia para tu caso migratorio', included: true },
      { label: 'E-file electrónico con confirmación', included: true },
    ],
    estimatedDelivery: '3–5 días',
    accentColor: 'gold',
  },
]

export const PRODUCTS_BY_SLUG = new Map(PRODUCTS.map((p) => [p.slug, p]))

/** Featured selection — Visa Juvenil siempre arriba como estrella */
export const FEATURED_PRODUCT_IDS = ['visa-juvenil', 'asilo-politico', 'ajuste-estatus']

export const PRODUCT_CATEGORIES = [
  { value: 'all', label: 'Todos' },
  { value: 'visa-juvenil', label: 'Visa Juvenil' },
  { value: 'asilo', label: 'Asilo' },
  { value: 'green-card', label: 'Green Card' },
  { value: 'litigio', label: 'Litigio' },
  { value: 'fiscal', label: 'IRS · Taxes' },
] as const
