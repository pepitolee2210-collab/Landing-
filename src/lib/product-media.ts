/**
 * Mapping de imagen + video por servicio (7 servicios core).
 * - image: desktop (4:3 landscape) → /public/services/[id].webp
 * - imageMobile: mobile (vertical) → /public/services/[id]-mobile.webp
 * - video: /public/services/[id].mp4 (16:9, 28-32s)
 *
 * El componente usa <picture> con source media para servir la versión
 * correcta según el breakpoint.
 */

export interface ProductMedia {
  image?: string
  imageMobile?: string
  video?: string
  whatsappMessage: string
}

const MEDIA: Record<string, ProductMedia> = {
  'visa-juvenil': {
    image: '/services/visa-juvenil.webp',
    imageMobile: '/services/visa-juvenil-mobile.webp',
    video: '/services/visa-juvenil.mp4',
    whatsappMessage:
      'Hola, vi el video de Visa Juvenil (SIJS). Quiero saber si mi hijo califica.',
  },
  'asilo-politico': {
    image: '/services/asilo-politico.webp',
    imageMobile: '/services/asilo-politico-mobile.webp',
    video: '/services/asilo-politico.mp4',
    whatsappMessage:
      'Hola, vi el video de Asilo Político. Quiero saber si aplico para mi caso.',
  },
  'ajuste-estatus': {
    image: '/services/ajuste-estatus.webp',
    imageMobile: '/services/ajuste-estatus-mobile.webp',
    video: '/services/ajuste-estatus.mp4',
    whatsappMessage:
      'Hola, vi el video de Ajuste de Estatus (I-485). Quiero empezar mi Green Card.',
  },
  'apelacion-bia': {
    image: '/services/apelacion-bia.webp',
    imageMobile: '/services/apelacion-bia-mobile.webp',
    video: '/services/apelacion-bia.mp4',
    whatsappMessage:
      'Hola, vi el video de Apelación BIA. El juez me negó el caso, quiero apelar.',
  },
  'cambio-corte': {
    image: '/services/cambio-corte.webp',
    imageMobile: '/services/cambio-corte-mobile.webp',
    video: '/services/cambio-corte.mp4',
    whatsappMessage:
      'Hola, vi el video de Cambio de Corte. Me mudé y necesito mover mi caso.',
  },
  itin: {
    image: '/services/itin.webp',
    imageMobile: '/services/itin-mobile.webp',
    video: '/services/itin.mp4',
    whatsappMessage:
      'Hola, vi el video del ITIN. Quiero tramitar mi número fiscal.',
  },
  taxes: {
    image: '/services/taxes.webp',
    imageMobile: '/services/taxes-mobile.webp',
    video: '/services/taxes.mp4',
    whatsappMessage:
      'Hola, vi el video de Declaración de Impuestos. Quiero declarar mis taxes.',
  },
}

export function getProductMedia(id: string): ProductMedia {
  return (
    MEDIA[id] || {
      whatsappMessage: 'Hola, vi su web. Quiero información sobre los servicios.',
    }
  )
}
