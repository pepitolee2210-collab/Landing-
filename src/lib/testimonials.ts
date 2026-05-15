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
}

/**
 * PLACEHOLDERS editoriales — Henry confirmará con testimonios reales antes
 * de producción. Los textos están escritos de forma realista y sobria, sin
 * exageración tipo "cambió mi vida", para reforzar credibilidad.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'María R.',
    origin: 'Salt Lake City · Utah',
    service: 'Visa Juvenil',
    year: 2026,
    initials: 'MR',
    quote:
      'Llevaba dos años con miedo cada vez que escuchaba sirenas. El equipo de Henry me explicó cada paso con paciencia. Hoy mi hijo tiene su orden de custodia firmada y vamos por el I-360.',
  },
  {
    id: 't2',
    name: 'Carlos H.',
    origin: 'Phoenix · Arizona',
    service: 'Visa Juvenil — Proceso completo',
    year: 2026,
    initials: 'CH',
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
    quote:
      'Diana me guió en cada documento del paquete I-485. Lo que parecía un trámite imposible terminó siendo una entrevista de quince minutos. Hoy tengo mi residencia.',
  },
  {
    id: 't5',
    name: 'Ester M.',
    origin: 'Hartford · Connecticut',
    service: 'Visa Juvenil',
    year: 2026,
    initials: 'EM',
    quote:
      'Lo que me dio confianza es que Henry no prometió nada que no se pudiera cumplir. Me dijo los tiempos reales, los riesgos reales y el costo total desde el primer día.',
  },
  {
    id: 't6',
    name: 'Jose L.',
    origin: 'Yonkers · New York',
    service: 'Ajuste de Estatus',
    year: 2026,
    initials: 'JL',
    quote:
      'Comparé tres bufetes antes de elegir. UsaLatinoPrime fue el único que me preguntó por la historia detrás del caso, no solo por mis papeles. Esa diferencia se nota en USCIS.',
  },
]
