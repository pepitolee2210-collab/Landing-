/**
 * Catálogo de servicios legales presentados como PRODUCTOS para el
 * e-commerce de /landing2. Cada servicio tiene precio, rating, badge,
 * stock signal y datos comerciales típicos.
 */

export interface ProductFeature {
  label: string
  included: boolean
}

export interface ProductBadge {
  text: string
  variant: 'popular' | 'new' | 'sale' | 'limited'
}

export interface ProductReview {
  by: string
  text: string
  rating: number
}

export interface Product {
  id: string
  slug: string
  category: 'visa-juvenil' | 'asilo' | 'ajuste' | 'consultoria' | 'curso'
  name: string
  shortDescription: string
  fullDescription: string
  price: number
  originalPrice?: number
  installments?: {
    count: number
    monthlyAmount: number
  }
  rating: number
  reviewCount: number
  badge?: ProductBadge
  features: ProductFeature[]
  estimatedDelivery: string
  /** Stock signal — para crear urgencia, "Solo 3 cupos esta semana" */
  stockSignal?: string
  /** Color de la categoría */
  accentColor: 'gold' | 'blue' | 'red' | 'jade'
}

export const PRODUCTS: Product[] = [
  {
    id: 'vj-completa',
    slug: 'visa-juvenil-completa',
    category: 'visa-juvenil',
    name: 'Visa Juvenil — Proceso Completo',
    shortDescription:
      'Las 3 fases del SIJS de principio a fin. Custodia, I-360 y I-485 con un solo equipo.',
    fullDescription:
      'Te llevamos desde la primera reunión hasta tu Green Card. Incluye custodia en corte estatal de Utah, petición I-360 ante USCIS y ajuste de estatus I-485.',
    price: 2500,
    originalPrice: 3200,
    installments: { count: 10, monthlyAmount: 250 },
    rating: 4.9,
    reviewCount: 73,
    badge: { text: 'Más popular', variant: 'popular' },
    features: [
      { label: 'Custodia legal en corte estatal', included: true },
      { label: 'Petición I-360 ante USCIS', included: true },
      { label: 'Ajuste de estatus I-485', included: true },
      { label: 'Respuestas a RFE incluidas', included: true },
      { label: 'Portal cliente 24/7', included: true },
      { label: 'Soporte WhatsApp bilingüe', included: true },
    ],
    estimatedDelivery: '18–36 meses · plan estimado',
    stockSignal: '6 cupos esta semana',
    accentColor: 'gold',
  },
  {
    id: 'vj-i360',
    slug: 'visa-juvenil-i360',
    category: 'visa-juvenil',
    name: 'Visa Juvenil — Solo I-360 + I-485',
    shortDescription:
      'Para quienes ya tienen la custodia. Llevamos las dos fases federales.',
    fullDescription:
      'Si ya tienes la orden de custodia, tomamos desde ahí: armamos la petición I-360 ante USCIS y luego el ajuste I-485 cuando esté disponible.',
    price: 2000,
    installments: { count: 10, monthlyAmount: 200 },
    rating: 4.8,
    reviewCount: 41,
    features: [
      { label: 'Petición I-360 ante USCIS', included: true },
      { label: 'Ajuste de estatus I-485', included: true },
      { label: 'Respuestas a RFE incluidas', included: true },
      { label: 'Portal cliente 24/7', included: true },
      { label: 'Custodia estatal', included: false },
    ],
    estimatedDelivery: '12–28 meses',
    accentColor: 'gold',
  },
  {
    id: 'vj-i485',
    slug: 'visa-juvenil-i485',
    category: 'visa-juvenil',
    name: 'Visa Juvenil — Solo I-485',
    shortDescription:
      'Tu I-360 ya está aprobado. Te llevamos al paso final hacia la Green Card.',
    fullDescription:
      'Preparamos el paquete I-485 completo: declaraciones, examen médico, antecedentes, y te acompañamos en biométricos y entrevista.',
    price: 1500,
    installments: { count: 8, monthlyAmount: 188 },
    rating: 4.9,
    reviewCount: 28,
    features: [
      { label: 'Paquete I-485 completo', included: true },
      { label: 'Preparación para biométricos', included: true },
      { label: 'Práctica de entrevista', included: true },
      { label: 'Portal cliente 24/7', included: true },
    ],
    estimatedDelivery: '12–18 meses',
    accentColor: 'gold',
  },
  {
    id: 'asilo-completo',
    slug: 'asilo-completo',
    category: 'asilo',
    name: 'Asilo Político — Solicitud + Audiencia',
    shortDescription:
      'Caso de asilo desde cero: construcción de narrativa, evidencia y audiencia.',
    fullDescription:
      'Te ayudamos a presentar I-589 con narrativa coherente y evidencia documental sólida. Incluye preparación intensiva para la entrevista o audiencia individual.',
    price: 3500,
    installments: { count: 10, monthlyAmount: 350 },
    rating: 4.7,
    reviewCount: 16,
    badge: { text: 'Recomendado', variant: 'new' },
    features: [
      { label: 'Solicitud I-589 ante USCIS o Corte', included: true },
      { label: 'Construcción de narrativa legal', included: true },
      { label: 'Recopilación de evidencia de país', included: true },
      { label: 'Preparación intensiva de testimonio', included: true },
      { label: 'Representación en audiencia', included: true },
    ],
    estimatedDelivery: 'Variable según corte',
    accentColor: 'blue',
  },
  {
    id: 'asilo-reforzamiento',
    slug: 'asilo-reforzamiento',
    category: 'asilo',
    name: 'Asilo — Reforzamiento de Caso',
    shortDescription:
      'Tu I-589 ya fue radicado. Te preparamos para la entrevista o audiencia final.',
    fullDescription:
      'Auditamos lo que ya se radicó, identificamos vacíos de evidencia y te preparamos exhaustivamente para la cita decisiva con USCIS o corte.',
    price: 2000,
    installments: { count: 8, monthlyAmount: 250 },
    rating: 4.8,
    reviewCount: 19,
    features: [
      { label: 'Auditoría del caso radicado', included: true },
      { label: 'Evidencia adicional', included: true },
      { label: 'Práctica intensiva de testimonio', included: true },
      { label: 'Representación en audiencia', included: true },
    ],
    estimatedDelivery: 'Variable según corte',
    accentColor: 'blue',
  },
  {
    id: 'consulta-30',
    slug: 'consulta-express',
    category: 'consultoria',
    name: 'Consulta Express · 30 min',
    shortDescription:
      'Diagnóstico migratorio en 30 minutos por videollamada con un especialista.',
    fullDescription:
      'Llamada Zoom de 30 minutos. Revisamos tu caso, te decimos qué servicio aplica, qué documentos necesitas y cuáles son tus riesgos. Sin compromiso.',
    price: 79,
    rating: 5.0,
    reviewCount: 142,
    badge: { text: 'Resultado en 24h', variant: 'limited' },
    features: [
      { label: 'Videollamada 30 minutos', included: true },
      { label: 'Diagnóstico escrito por email', included: true },
      { label: 'Lista de documentos necesarios', included: true },
      { label: 'Cotización oficial sin compromiso', included: true },
    ],
    estimatedDelivery: 'Hoy o mañana',
    stockSignal: '12 slots disponibles esta semana',
    accentColor: 'jade',
  },
  {
    id: 'curso-digilegal',
    slug: 'curso-digilegal',
    category: 'curso',
    name: 'Curso DigiLegal · Tu caso paso a paso',
    shortDescription:
      'Aprende a navegar tu proceso migratorio con guías en video y material descargable.',
    fullDescription:
      'Curso autoguiado: 18 videos, 6 horas de contenido, plantillas oficiales descargables y comunidad privada. Acceso de por vida.',
    price: 149,
    originalPrice: 249,
    rating: 4.9,
    reviewCount: 87,
    badge: { text: '40% OFF', variant: 'sale' },
    features: [
      { label: '18 videos · 6 horas de contenido', included: true },
      { label: 'Plantillas oficiales descargables', included: true },
      { label: 'Comunidad privada de alumnos', included: true },
      { label: 'Acceso de por vida', included: true },
      { label: 'Certificado de finalización', included: true },
    ],
    estimatedDelivery: 'Acceso inmediato',
    accentColor: 'red',
  },
]

export const PRODUCTS_BY_SLUG = new Map(PRODUCTS.map((p) => [p.slug, p]))

/** Featured selection — qué se muestra arriba */
export const FEATURED_PRODUCT_IDS = ['vj-completa', 'asilo-completo', 'consulta-30']

export const PRODUCT_CATEGORIES = [
  { value: 'all', label: 'Todos' },
  { value: 'visa-juvenil', label: 'Visa Juvenil' },
  { value: 'asilo', label: 'Asilo' },
  { value: 'consultoria', label: 'Consultoría' },
  { value: 'curso', label: 'Cursos' },
] as const
