export interface Testimonial {
  id: string
  name: string
  origin: string
  service: string
  quote: string
  /** Año del caso para dar contexto temporal */
  year: number
  /** Iniciales generadas */
  initials: string
  /** Color de acento del avatar/badge */
  color: 'blue' | 'green' | 'red' | 'gold' | 'purple'
  /** Indicador temporal: "Hoy", "Hace 2h", "Ayer", etc. */
  recency?: string
  /** URL de foto real opcional — fallback a gradient + iniciales si no existe */
  photo?: string
}

/**
 * PLACEHOLDERS editoriales — reemplazar con testimonios reales verificados antes
 * de producción. Los textos están escritos de forma realista y sobria, sin
 * exageración tipo "cambió mi vida", para reforzar credibilidad.
 *
 * Para agregar foto real: subir a /public/testimonials/{id}.webp
 * y poner `photo: '/testimonials/{id}.webp'` en el objeto.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'María R.',
    origin: 'Salt Lake City · Utah',
    service: 'Visa Juvenil',
    year: 2026,
    initials: 'MR',
    color: 'blue',
    recency: 'Hoy',
    photo: '/testimonials/t1.webp',
    quote:
      'Llevaba dos años con miedo cada vez que escuchaba sirenas. La plataforma me guió paso a paso en español y Vanessa me explicó lo que no entendía. Hoy mi hijo tiene su orden de custodia firmada y vamos por el I-360.',
  },
  {
    id: 't2',
    name: 'Carlos H.',
    origin: 'Phoenix · Arizona',
    service: 'Visa Juvenil — Proceso completo',
    year: 2026,
    initials: 'CH',
    color: 'green',
    recency: 'Hace 2h',
    photo: '/testimonials/t2.webp',
    quote:
      'Lo que más valoré fue que Vanessa me contestó un sábado a las nueve de la noche cuando llegó la notificación de USCIS. No es solo un bufete, es gente que está pendiente.',
  },
  {
    id: 't3',
    name: 'Ana G.',
    origin: 'Newark · New Jersey',
    service: 'Asilo Político',
    year: 2025,
    initials: 'AG',
    color: 'gold',
    photo: '/testimonials/t3.webp',
    quote:
      'Tenía la solicitud radicada con otro abogado pero no me preparaban para nada. Reforzaron mi caso en seis semanas y la audiencia salió favorable. La preparación marcó la diferencia.',
  },
  {
    id: 't4',
    name: 'Rosa H.',
    origin: 'Charlotte · North Carolina',
    service: 'Visa Juvenil — I-485',
    year: 2025,
    initials: 'RH',
    color: 'red',
    photo: '/testimonials/t4.webp',
    quote:
      'La plataforma me guió en cada documento del paquete I-485. Vanessa me ayudó cuando llegó el RFE. Lo que parecía imposible terminó siendo una entrevista de quince minutos. Hoy tengo mi residencia.',
  },
  {
    id: 't5',
    name: 'Ester M.',
    origin: 'Hartford · Connecticut',
    service: 'Visa Juvenil',
    year: 2026,
    initials: 'EM',
    color: 'purple',
    recency: 'Ayer',
    photo: '/testimonials/t5.webp',
    quote:
      'Lo que me dio confianza es que UsaLatinoPrime no me prometió nada que no se pudiera cumplir. Me dijeron los tiempos reales, los riesgos reales y el costo total desde el primer día. Sin sorpresas.',
  },
  {
    id: 't6',
    name: 'José L.',
    origin: 'Yonkers · New York',
    service: 'Ajuste de Estatus',
    year: 2026,
    initials: 'JL',
    color: 'blue',
    photo: '/testimonials/t6.webp',
    quote:
      'Comparé tres bufetes antes de elegir. UsaLatinoPrime fue el único que me preguntó por la historia detrás del caso, no solo por mis papeles. Esa diferencia se nota en USCIS.',
  },
  {
    id: 't8',
    name: 'Diego A.',
    origin: 'Miami · Florida',
    service: 'Apelación BIA',
    year: 2025,
    initials: 'DA',
    color: 'red',
    photo: '/testimonials/t8.webp',
    quote:
      'Me habían negado el asilo en corte. Quedaban 22 días para apelar. La plataforma armó el brief y ganamos la moción. Sigo en Estados Unidos.',
  },
  {
    id: 't10',
    name: 'Rafael S.',
    origin: 'San Diego · California',
    service: 'Declaración de Impuestos',
    year: 2026,
    initials: 'RS',
    color: 'purple',
    photo: '/testimonials/t10.webp',
    quote:
      'Tres años sin declarar por miedo. La plataforma me ayudó a ponerme al día sin problemas con IRS. Hoy tengo records limpios para mi caso migratorio.',
  },
]
