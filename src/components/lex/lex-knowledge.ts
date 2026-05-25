/**
 * Knowledge base de Lex — tools que consultan el catálogo real del sitio
 * (products.ts, testimonials.ts, site.ts).
 *
 * Patrón: Lex NO memoriza datos en el system prompt. Cuando el usuario
 * pregunta algo específico (precio, features, testimonios), invoca la tool
 * correspondiente. Esto evita hallucinations sobre datos del negocio.
 */

import { PRODUCTS, type Product } from '@/lib/products'
import { TESTIMONIALS } from '@/lib/testimonials'
import { SITE } from '@/lib/site'

// ──────────────────────────────────────────────────────────────────
// 1) getServiceDetails — pitch, descripción, features, tiempo estimado
// ──────────────────────────────────────────────────────────────────

export interface ServiceDetailsResult {
  ok: boolean
  service?: {
    name: string
    pitch: string
    shortDescription: string
    fullDescription: string
    features: string[]
    estimatedDelivery: string
    rating: number
    reviewCount: number
    badge?: string
  }
  message?: string
}

export function getServiceDetails(slug: string): ServiceDetailsResult {
  const product = PRODUCTS.find((p) => p.slug === slug)
  if (!product) {
    return {
      ok: false,
      message: `Servicio "${slug}" no encontrado. Slugs válidos: ${PRODUCTS.map((p) => p.slug).join(', ')}`,
    }
  }
  return {
    ok: true,
    service: {
      name: product.name,
      pitch: product.pitch,
      shortDescription: product.shortDescription,
      fullDescription: product.fullDescription,
      features: product.features.filter((f) => f.included).map((f) => f.label),
      estimatedDelivery: product.estimatedDelivery,
      rating: product.rating,
      reviewCount: product.reviewCount,
      badge: product.badge?.text,
    },
  }
}

// ──────────────────────────────────────────────────────────────────
// 2) getServicePricing — explícitamente "cotización personalizada"
//    NUNCA inventar precios; redirigir a WhatsApp
// ──────────────────────────────────────────────────────────────────

export interface ServicePricingResult {
  ok: boolean
  message: string
  redirectToWhatsApp: boolean
}

export function getServicePricing(slug: string): ServicePricingResult {
  const product = PRODUCTS.find((p) => p.slug === slug)
  if (!product) {
    return {
      ok: false,
      message: `Servicio "${slug}" no encontrado`,
      redirectToWhatsApp: false,
    }
  }
  return {
    ok: true,
    message:
      'El precio de ' +
      product.name +
      ' depende de tu caso específico (cantidad de hijos, estado, complejidad). ' +
      'Cotización personalizada vía WhatsApp con el equipo. Acompañamiento incluido en todas las fases.',
    redirectToWhatsApp: true,
  }
}

// ──────────────────────────────────────────────────────────────────
// 3) listAllServices — los 7 servicios disponibles, info corta
// ──────────────────────────────────────────────────────────────────

export interface ServicesListResult {
  ok: boolean
  services: Array<{
    slug: string
    name: string
    pitch: string
    category: Product['category']
  }>
}

export function listAllServices(): ServicesListResult {
  return {
    ok: true,
    services: PRODUCTS.map((p) => ({
      slug: p.slug,
      name: p.name,
      pitch: p.pitch,
      category: p.category,
    })),
  }
}

// ──────────────────────────────────────────────────────────────────
// 4) checkServiceFit — keyword matching simple sobre la situación
//    del usuario. NO determina elegibilidad legal — solo orienta.
// ──────────────────────────────────────────────────────────────────

interface FitRule {
  slug: string
  keywords: RegExp
  reason: string
}

const FIT_RULES: FitRule[] = [
  {
    slug: 'visa-juvenil',
    keywords: /(menor|hijo|hija|niñ[oa]|abandon|padre|madre|sin (papá|mamá|padre|madre)|abuso|negligencia|sijs|custodia)/i,
    reason: 'Menciona menor, abandono, o custodia → posible SIJS',
  },
  {
    slug: 'asilo-politico',
    keywords: /(asilo|persecución|miedo|amenaza|huí|política|religioso|grupo social|i.?589)/i,
    reason: 'Menciona persecución o miedo de regresar → posible Asilo',
  },
  {
    slug: 'apelacion-bia',
    keywords: /(negaron|negó|apelar|denegado|denegada|juez negó|bia|eoir.?26|deportación)/i,
    reason: 'Menciona caso negado / apelación → posible Apelación BIA',
  },
  {
    slug: 'cambio-de-corte',
    keywords: /(mud(é|amos|aron)|cambi(é|amos|aron) de estado|otra ciudad|change of venue|eoir.?33)/i,
    reason: 'Menciona mudanza con caso de corte → posible Cambio de Venue',
  },
  {
    slug: 'ajuste-de-estatus',
    keywords: /(green card|residencia|cónyuge|esposa|esposo de ciudadano|i.?485|ajuste de estatus)/i,
    reason: 'Menciona Green Card / cónyuge ciudadano → posible Ajuste I-485',
  },
  {
    slug: 'itin-number',
    keywords: /(itin|número fiscal|tax id|w.?7)/i,
    reason: 'Menciona ITIN o número fiscal',
  },
  {
    slug: 'taxes',
    keywords: /(impuestos|taxes|declar(é|ar|ación)|irs|1040)/i,
    reason: 'Menciona impuestos',
  },
]

export interface FitResult {
  ok: boolean
  matches: Array<{ slug: string; serviceName: string; reason: string }>
  message: string
}

export function checkServiceFit(situation: string): FitResult {
  if (!situation || situation.trim().length < 4) {
    return {
      ok: false,
      matches: [],
      message: 'Situación demasiado corta para evaluar. Pide más detalles al usuario.',
    }
  }

  const matches: FitResult['matches'] = []
  for (const rule of FIT_RULES) {
    if (rule.keywords.test(situation)) {
      const product = PRODUCTS.find((p) => p.slug === rule.slug)
      if (product) {
        matches.push({
          slug: rule.slug,
          serviceName: product.name,
          reason: rule.reason,
        })
      }
    }
  }

  if (matches.length === 0) {
    return {
      ok: true,
      matches: [],
      message:
        'No identifico el servicio claramente. Haz UNA pregunta más al usuario antes de descartar, o ofrece la lista completa con listAllServices.',
    }
  }

  if (matches.length === 1) {
    return {
      ok: true,
      matches,
      message: `Match claro: ${matches[0].serviceName}. Procede a mostrarle.`,
    }
  }

  return {
    ok: true,
    matches,
    message: `Múltiples matches posibles (${matches.map((m) => m.serviceName).join(', ')}). Haz UNA pregunta de desambiguación.`,
  }
}

// ──────────────────────────────────────────────────────────────────
// 5) getRelatedTestimonials — 1-2 testimonios del servicio
// ──────────────────────────────────────────────────────────────────

export interface TestimonialsResult {
  ok: boolean
  testimonials: Array<{
    name: string
    origin: string
    service: string
    quote: string
    year: number
  }>
}

export function getRelatedTestimonials(slug?: string): TestimonialsResult {
  if (!slug) {
    // Devolver 2 testimonios variados
    return {
      ok: true,
      testimonials: TESTIMONIALS.slice(0, 2).map((t) => ({
        name: t.name,
        origin: t.origin,
        service: t.service,
        quote: t.quote,
        year: t.year,
      })),
    }
  }

  // Match aproximado por servicio (los testimonios tienen `service` como string libre)
  const product = PRODUCTS.find((p) => p.slug === slug)
  const serviceName = product?.name || ''
  const serviceKeyword = serviceName.split('·')[0].trim().toLowerCase()

  const related = TESTIMONIALS.filter((t) =>
    t.service.toLowerCase().includes(serviceKeyword),
  ).slice(0, 2)

  if (related.length === 0) {
    return {
      ok: true,
      testimonials: TESTIMONIALS.slice(0, 2).map((t) => ({
        name: t.name,
        origin: t.origin,
        service: t.service,
        quote: t.quote,
        year: t.year,
      })),
    }
  }

  return {
    ok: true,
    testimonials: related.map((t) => ({
      name: t.name,
      origin: t.origin,
      service: t.service,
      quote: t.quote,
      year: t.year,
    })),
  }
}

// ──────────────────────────────────────────────────────────────────
// 6) getTeamInfo — info general del equipo (site.ts)
// ──────────────────────────────────────────────────────────────────

export interface TeamInfoResult {
  ok: boolean
  brand: {
    name: string
    tagline: string
    location: string
    foundedYear: number
    contactWhatsapp: string
    email: string
  }
}

export function getTeamInfo(): TeamInfoResult {
  return {
    ok: true,
    brand: {
      name: SITE.name,
      tagline: SITE.tagline,
      location: SITE.legal.address,
      foundedYear: SITE.legal.foundedYear,
      contactWhatsapp: SITE.contact.whatsapp,
      email: SITE.contact.email,
    },
  }
}

// ──────────────────────────────────────────────────────────────────
// 7) getFAQ — respuestas a preguntas comunes (knowledge curado)
// ──────────────────────────────────────────────────────────────────

const FAQ_KB: Record<string, string> = {
  precios:
    'Los precios dependen del caso (cantidad de hijos, estado, complejidad). Cotización personalizada vía WhatsApp. Acompañamiento siempre incluido.',
  ubicacion:
    'UsaLatinoPrime opera desde Utah pero atiende clientes en todo USA. El proceso es 100% remoto vía portal y WhatsApp.',
  idioma:
    'Atención 100% en español. Equipo bilingüe ES/EN para los formularios oficiales en inglés.',
  tiempo:
    'Tiempos varían: SIJS 6-18 meses, Asilo 1-3 años, Ajuste 8-36 meses, Apelación 6-18 meses. El equipo confirma timeline exacto por WhatsApp.',
  documentos:
    'Documentos típicos: ID/pasaporte, acta de nacimiento, comprobante de residencia, historial migratorio. El portal del cliente te guía paso a paso qué subir en cada fase.',
  pago:
    'Aceptamos pago en cuotas sin interés (cada servicio tiene su plan). Detalles exactos por WhatsApp.',
  cita:
    'Las citas se agendan vía WhatsApp con el equipo. Vanessa o Andrium te confirman horario.',
  portal:
    'Recibes acceso a un portal privado en tu celular tras firmar contrato. Ahí subes documentos, ves tu fase actual, llenas formularios y consultas con el equipo 24/7.',
  garantia:
    'Garantía de 7 días tras firmar. Si después de la consulta inicial no te convencen los términos, devolución completa.',
  whatsapp:
    SITE.contact.whatsapp + ' es el número directo del equipo. Atención inmediata por ahí.',
}

export interface FAQResult {
  ok: boolean
  topic?: string
  answer: string
  redirectToWhatsApp: boolean
}

export function getFAQ(topic: string): FAQResult {
  const normalized = topic.toLowerCase().trim()

  // Buscar match exacto
  if (FAQ_KB[normalized]) {
    return { ok: true, topic: normalized, answer: FAQ_KB[normalized], redirectToWhatsApp: false }
  }

  // Buscar match parcial
  for (const key of Object.keys(FAQ_KB)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return { ok: true, topic: key, answer: FAQ_KB[key], redirectToWhatsApp: false }
    }
  }

  // No match → redirigir a WhatsApp
  return {
    ok: true,
    answer:
      'No tengo respuesta específica a eso. Mejor te conecto con el equipo directamente por WhatsApp.',
    redirectToWhatsApp: true,
  }
}

// ──────────────────────────────────────────────────────────────────
// 8) buildWhatsAppMessage — arma el mensaje contextual del cierre
// ──────────────────────────────────────────────────────────────────

export interface BuildWhatsAppContext {
  userName?: string
  serviceSlug?: string
  userSituation?: string
  minorName?: string
  minorAge?: number
  state?: string
  urgency?: 'high' | 'normal'
}

export interface BuildWhatsAppResult {
  ok: boolean
  message: string
}

export function buildWhatsAppMessage(ctx: BuildWhatsAppContext): BuildWhatsAppResult {
  const parts: string[] = []

  parts.push(ctx.userName ? `Hola, soy ${ctx.userName}.` : 'Hola.')
  parts.push('Hablé con Lex en su web.')

  if (ctx.userSituation) {
    parts.push(ctx.userSituation)
  } else if (ctx.minorName && ctx.minorAge) {
    parts.push(`Mi hijo/a ${ctx.minorName} tiene ${ctx.minorAge} años.`)
  }

  if (ctx.state) {
    parts.push(`Vivo en ${ctx.state}.`)
  }

  if (ctx.serviceSlug) {
    const product = PRODUCTS.find((p) => p.slug === ctx.serviceSlug)
    if (product) {
      parts.push(`Quiero información sobre ${product.name}.`)
    }
  } else {
    parts.push('Quiero información sobre los servicios.')
  }

  if (ctx.urgency === 'high') {
    parts.push('Es urgente.')
  }

  return {
    ok: true,
    message: parts.join(' '),
  }
}
