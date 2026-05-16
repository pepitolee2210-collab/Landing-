export interface TeamMember {
  slug: string
  name: string
  role: string
  shortRole: string
  bio: string
  /** Path en /public/team/ (ej: '/team/henry.jpg') o URL externa.
   *  Si no hay foto, el componente renderiza iniciales con fondo blueprint. */
  photo?: string
  origin?: string
}

export const TEAM: TeamMember[] = [
  {
    slug: 'henry-orellana',
    name: 'Henry Orellana',
    role: 'Director General · CEO',
    shortRole: 'CEO & Director',
    bio: 'Director del bufete y arquitecto de cada estrategia migratoria que sale de nuestro equipo. Más de cinco años acompañando familias latinas a estabilizar su estatus en EE.UU.',
    origin: '🇺🇸 Utah',
  },
  {
    slug: 'vanessa-sierra',
    name: 'Vanessa Sierra',
    role: 'Consultora Senior — Primer contacto y diagnóstico',
    shortRole: 'Consultora Senior',
    bio: 'Es la primera voz que escuchas cuando llamas. Sabe leer un caso en cinco minutos y darte un plan claro. Su especialidad: visa juvenil y consultas de emergencia.',
    origin: '🇨🇴 Colombia',
  },
  {
    slug: 'diana-aguilar',
    name: 'Diana Aguilar',
    role: 'Paralegal Senior — Casos SIJS y formularios',
    shortRole: 'Paralegal Senior',
    bio: 'Domina los formularios I-360 e I-485 como pocas. Ha llevado más de cuarenta casos de visa juvenil de principio a fin con récord de aprobaciones limpias.',
    origin: '🇨🇴 Colombia',
  },
  {
    slug: 'andrium-zorro',
    name: 'Andrium Zorro',
    role: 'Contratos y Logística',
    shortRole: 'Contratos · Cobranza',
    bio: 'Se asegura de que cada cliente entienda perfectamente lo que firma y que el seguimiento de pagos sea ordenado. Cero sorpresas, cero letras pequeñas escondidas.',
    origin: '🇪🇨 Ecuador',
  },
  {
    slug: 'giuseppe-developer',
    name: 'Giuseppe',
    role: 'Tecnología y Desarrollo de Producto',
    shortRole: 'Producto & Tecnología',
    bio: 'Construye las herramientas digitales del bufete — portal del cliente, automatizaciones y la app móvil DigiLegal que estamos por lanzar.',
    origin: '🇵🇪 Perú',
  },
  {
    slug: 'mauricio',
    name: 'Mauricio',
    role: 'Operaciones y Coordinación',
    shortRole: 'Operaciones',
    bio: 'Coordina las agendas, los seguimientos con corte y el flujo entre todos los expertos del bufete. Si tu caso avanza puntual, es probablemente gracias a él.',
    origin: '🇵🇪 Perú',
  },
]
