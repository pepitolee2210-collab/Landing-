/**
 * Configuración de marca y contactos.
 * Cambia aquí los datos finales (teléfono, redes, etc.) cuando Henry los confirme.
 */
export const SITE = {
  name: 'UsaLatinoPrime',
  shortName: 'ULP',
  tagline: 'Bufete de inmigración para latinos en EE.UU.',
  url: 'https://usalatinoprime.com',
  appUrl: 'https://app.usalatinoprime.com',

  /** Estos placeholders — confirmar con Henry */
  contact: {
    /** Pasar por whatsappUrl() — solo dígitos cuentan */
    whatsapp: '+1 (267) 787-4365',
    email: 'henry@usalatino.com',
    phone: '+1 (267) 787-4365',
  },

  social: {
    instagram: 'https://instagram.com/usalatinoprime',
    facebook: 'https://facebook.com/usalatinoprime',
    tiktok: 'https://tiktok.com/@usalatinoprime',
  },

  /** Footer & legal */
  legal: {
    address: 'Utah, EE.UU.',
    foundedYear: 2024,
  },

  /** Stats que aparecen en la landing (counter al scroll) */
  stats: {
    contractsSigned: 100, // "Más de 100 casos firmados"
    yearsExperience: 5,
    countries: 6,
  },
} as const

/** IDs de tracking — se llenan vía env vars en producción */
export const TRACKING = {
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '',
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
} as const
