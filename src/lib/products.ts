/**
 * Catálogo REAL de servicios legales migratorios de UsaLatinoPrime.
 * 7 servicios core. Sin precios — cada producto termina en
 * "Cotización personalizada" + WhatsApp con mensaje contextual.
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
     01 · VISA JUVENIL SIJS — Producto estrella
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
    badge: { text: 'Más popular', variant: 'popular' },
    features: [
      { label: 'Fase 1 · Custodia en corte estatal', included: true },
      { label: 'Fase 2 · Petición I-360 ante USCIS', included: true },
      { label: 'Fase 3 · Ajuste I-485 · Green Card', included: true },
      { label: 'Hallazgos especiales SIJS', included: true },
      { label: 'Respuestas a RFE incluidas', included: true },
      { label: 'Acompañamiento en biométricos y entrevista', included: true },
      { label: 'Portal cliente 24/7', included: true },
    ],
    estimatedDelivery: '6–18 meses',
    stockSignal: 'Cupos limitados este mes',
    accentColor: 'blue',
  },

  /* ════════════════════════════════════════════════
     02 · ASILO POLÍTICO — Afirmativo + Defensivo
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
    badge: { text: 'Cobertura amplia', variant: 'new' },
    features: [
      { label: 'Solicitud I-589 (USCIS o corte)', included: true },
      { label: 'Construcción de narrativa legal', included: true },
      { label: 'Recopilación de evidencia de país', included: true },
      { label: 'Preparación intensiva de testimonio', included: true },
      { label: 'Representación en entrevista o audiencia', included: true },
      { label: 'Permiso de trabajo (I-765) paralelo', included: true },
      { label: 'Form EOIR-28 para casos en corte', included: true },
    ],
    estimatedDelivery: '1–3 años según USCIS / corte',
    accentColor: 'jade',
  },

  /* ════════════════════════════════════════════════
     03 · AJUSTE DE ESTATUS I-485 — Green Card
     ════════════════════════════════════════════════ */
  {
    id: 'ajuste-estatus',
    slug: 'ajuste-de-estatus',
    category: 'green-card',
    name: 'Ajuste de Estatus · I-485',
    pitch: 'Tu Green Card sin salir de EE.UU.',
    shortDescription:
      'Solicitud completa I-485 para residencia permanente. Cónyuges de ciudadanos, peticionados, derivados.',
    fullDescription:
      'Te llevamos el ajuste a residente permanente desde dentro de EE.UU. con los 6 formularios coordinados: petición familiar I-130, ajuste I-485, sponsor I-864, permiso de trabajo I-765, viaje Advance Parole I-131 y examen médico I-693.',
    rating: 4.9,
    reviewCount: 38,
    features: [
      { label: 'Petición familiar I-130', included: true },
      { label: 'Ajuste de estatus I-485', included: true },
      { label: 'Sponsor financiero I-864', included: true },
      { label: 'Permiso de trabajo I-765 paralelo', included: true },
      { label: 'Advance Parole I-131 incluido', included: true },
      { label: 'Examen médico I-693 coordinado', included: true },
      { label: 'Preparación intensiva para entrevista USCIS', included: true },
    ],
    estimatedDelivery: '8–36 meses',
    accentColor: 'blue',
  },

  /* ════════════════════════════════════════════════
     04 · APELACIÓN BIA · EOIR-26
     ════════════════════════════════════════════════ */
  {
    id: 'apelacion-bia',
    slug: 'apelacion-bia',
    category: 'litigio',
    name: 'Apelación · BIA (EOIR-26)',
    pitch: 'Segunda oportunidad ante corte superior',
    shortDescription:
      'Apela la decisión del juez de inmigración ante el Board of Immigration Appeals. Tienes solo 30 días.',
    fullDescription:
      'Si un juez de inmigración te negó asilo, cancelación o tu visa, tienes 30 días para apelar ante el BIA. Preparamos brief legal con argumentos, precedentes y nueva evidencia. Esto pausa la deportación mientras la BIA decide.',
    rating: 4.8,
    reviewCount: 11,
    badge: { text: 'Urgente · 30 días', variant: 'sale' },
    features: [
      { label: 'Notice of Appeal EOIR-26 ante BIA', included: true },
      { label: 'Brief legal con argumentos y precedentes', included: true },
      { label: 'Análisis de errores del juez', included: true },
      { label: 'Nueva evidencia si aplica', included: true },
      { label: 'Pausa la deportación mientras BIA decide', included: true },
      { label: 'Fee waiver si demuestras incapacidad de pago', included: true },
    ],
    estimatedDelivery: '6–18 meses ante BIA',
    accentColor: 'red',
  },

  /* ════════════════════════════════════════════════
     05 · CAMBIO DE CORTE — Motion to Change Venue
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
    features: [
      { label: 'Motion to Change Venue ante EOIR', included: true },
      { label: 'Documentación de nueva dirección', included: true },
      { label: 'Coordinación entre cortes de origen y destino', included: true },
      { label: 'Confirmación con EOIR de traslado', included: true },
    ],
    estimatedDelivery: '2–4 meses',
    accentColor: 'gold',
  },

  /* ════════════════════════════════════════════════
     06 · ITIN — IRS Form W-7
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
    features: [
      { label: 'Formulario W-7 ante IRS', included: true },
      { label: 'Certificación de documentos de identidad', included: true },
      { label: 'Acompañamiento con declaración 1040', included: true },
      { label: 'Seguimiento hasta recibir el ITIN', included: true },
      { label: 'Renovación si es necesario', included: true },
    ],
    estimatedDelivery: '7–11 semanas',
    accentColor: 'jade',
  },

  /* ════════════════════════════════════════════════
     07 · TAXES — Federal 1040 + Utah TC-40
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
    features: [
      { label: 'Form 1040 federal completo', included: true },
      { label: 'TC-40 estatal Utah si aplica', included: true },
      { label: 'Optimización de créditos fiscales', included: true },
      { label: 'Constancia para tu caso migratorio', included: true },
      { label: 'E-file electrónico con confirmación', included: true },
    ],
    estimatedDelivery: '2–4 semanas',
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
