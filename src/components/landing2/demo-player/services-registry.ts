/**
 * Mini-registry de servicios para el DemoPlayer de la landing pública.
 *
 * Es una copia minimalista del registry de henryflow (`src/lib/services/
 * registry.ts`) con SOLO los 5 servicios que el showcase reproduce y sus
 * fases visuales. La landing no necesita el SERVICE_REGISTRY completo ni
 * el enum `case_phase` de la BD — el DemoPlayer solo consulta:
 *   - `code` (para comparar contra `step.phase`)
 *   - `shortCode`, `label`, `number`, `description`, `icon`
 *   - `isCompletion` (para filtrar la última fase del progress bar)
 *
 * Si en henryflow se cambia el orden/icono/descripción de las fases,
 * sincronizar acá manualmente. Es deuda intencional — preferimos cero
 * coupling entre repos a tener un paquete compartido para tan poca data.
 */

export type CasePhase =
  | 'custodia'
  | 'i360'
  | 'i485'
  | 'completado'
  | 'asilo_sustentos'
  | 'asilo_reforzar'
  | 'asilo_completado'
  | 'apelacion'
  | 'cambio_de_corte'

export interface ServicePhaseDef {
  code: CasePhase
  shortCode: string
  label: string
  number: string
  description: string
  icon: string
  bgClass: string
  textClass: string
  sortOrder: number
  isCompletion?: boolean
}

const VISA_JUVENIL_PHASES: ServicePhaseDef[] = [
  {
    code: 'custodia',
    shortCode: 'custodia',
    label: 'Fase 1 — Custodia',
    number: 'Fase 1',
    description: 'Obtener orden de custodia con hallazgos SIJS de la corte estatal',
    icon: 'child_care',
    bgClass: 'bg-purple-100',
    textClass: 'text-purple-800',
    sortOrder: 0,
  },
  {
    code: 'i360',
    shortCode: 'i360',
    label: 'Fase 2 — I-360',
    number: 'Fase 2',
    description: 'Petición SIJS ante USCIS',
    icon: 'description',
    bgClass: 'bg-blue-100',
    textClass: 'text-blue-800',
    sortOrder: 1,
  },
  {
    code: 'i485',
    shortCode: 'i485',
    label: 'Fase 3 — I-485',
    number: 'Fase 3',
    description: 'Ajuste de estatus / Green Card',
    icon: 'card_membership',
    bgClass: 'bg-emerald-100',
    textClass: 'text-emerald-800',
    sortOrder: 2,
  },
  {
    code: 'completado',
    shortCode: 'completado',
    label: 'Completado',
    number: 'Final',
    description: 'Proceso SIJS completado',
    icon: 'check_circle',
    bgClass: 'bg-amber-100',
    textClass: 'text-amber-800',
    sortOrder: 3,
    isCompletion: true,
  },
]

const ASILO_POLITICO_PHASES: ServicePhaseDef[] = [
  {
    code: 'asilo_sustentos',
    shortCode: 'sustentos',
    label: 'Fase 1 — Sustentos',
    number: 'Fase 1',
    description: 'Identidad, estatus de ingreso y formulario I-589 (partes 1-5)',
    icon: 'folder_managed',
    bgClass: 'bg-purple-100',
    textClass: 'text-purple-800',
    sortOrder: 0,
  },
  {
    code: 'asilo_reforzar',
    shortCode: 'reforzar',
    label: 'Fase 2 — Reforzar Asilo',
    number: 'Fase 2',
    description: 'Declaración jurada, evidencias y generación del Miedo Creíble',
    icon: 'shield_person',
    bgClass: 'bg-blue-100',
    textClass: 'text-blue-800',
    sortOrder: 1,
  },
  {
    code: 'asilo_completado',
    shortCode: 'completado',
    label: 'Completado',
    number: 'Final',
    description: 'Expediente presentado ante USCIS',
    icon: 'check_circle',
    bgClass: 'bg-amber-100',
    textClass: 'text-amber-800',
    sortOrder: 2,
    isCompletion: true,
  },
]

const REFORZAR_ASILO_PHASES: ServicePhaseDef[] = [
  {
    code: 'asilo_reforzar',
    shortCode: 'reforzar',
    label: 'Reforzar Asilo',
    number: 'Fase única',
    description: 'Declaración jurada, evidencias y generación del Miedo Creíble',
    icon: 'shield_person',
    bgClass: 'bg-blue-100',
    textClass: 'text-blue-800',
    sortOrder: 0,
  },
  {
    code: 'asilo_completado',
    shortCode: 'completado',
    label: 'Completado',
    number: 'Final',
    description: 'Expediente reforzado presentado ante USCIS',
    icon: 'check_circle',
    bgClass: 'bg-amber-100',
    textClass: 'text-amber-800',
    sortOrder: 1,
    isCompletion: true,
  },
]

const APELACION_PHASES: ServicePhaseDef[] = [
  {
    code: 'apelacion',
    shortCode: 'apelacion',
    label: 'Apelación',
    number: 'Fase única',
    description: 'Apelación ante la BIA — Notice of Appeal vía Formulario EOIR-26',
    icon: 'gavel',
    bgClass: 'bg-rose-100',
    textClass: 'text-rose-800',
    sortOrder: 0,
    isCompletion: true,
  },
]

const CAMBIO_DE_CORTE_PHASES: ServicePhaseDef[] = [
  {
    code: 'cambio_de_corte',
    shortCode: 'cambio_de_corte',
    label: 'Cambio de Corte',
    number: 'Fase única',
    description: 'Moción de Cambio de Venue (EOIR-33) ante la Corte de Inmigración',
    icon: 'location_on',
    bgClass: 'bg-blue-100',
    textClass: 'text-blue-800',
    sortOrder: 0,
    isCompletion: true,
  },
]

const PHASES_BY_SLUG: Record<string, ServicePhaseDef[]> = {
  'visa-juvenil': VISA_JUVENIL_PHASES,
  'asilo-politico': ASILO_POLITICO_PHASES,
  'reforzar-asilo': REFORZAR_ASILO_PHASES,
  'apelacion': APELACION_PHASES,
  'cambio-de-corte': CAMBIO_DE_CORTE_PHASES,
}

export function getServicePhases(slug: string | null | undefined): ServicePhaseDef[] {
  if (!slug) return []
  return PHASES_BY_SLUG[slug] ?? []
}
