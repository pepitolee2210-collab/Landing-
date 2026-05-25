import type { DemoScript, DemoStep, DemoScene } from './types'

/**
 * Personaliza un DemoScript con los datos del usuario capturados por Lex.
 * NO muta el script original — devuelve un clon con los valores
 * reemplazados.
 *
 * Lo que se personaliza:
 * - clientName en scenes que lo tienen (client-register, client-portal)
 * - Nombre y edad del menor en form-fill fields (cuando aplica SIJS)
 * - Estado en form-fill si el field es de ubicación
 *
 * Lo que NO se personaliza (privacidad):
 * - Teléfono — se mantiene el ficticio del demo
 * - Datos no proporcionados por el usuario explícitamente
 */

export interface PersonalizeContext {
  name?: string
  minorName?: string
  minorAge?: number
  state?: string
}

export function personalizeScript(
  script: DemoScript,
  ctx: PersonalizeContext,
): DemoScript {
  // Si no hay nada que personalizar, devolver el script original
  if (!ctx.name && !ctx.minorName && !ctx.state) return script

  return {
    ...script,
    steps: script.steps.map((step) => personalizeStep(step, ctx)),
  }
}

function personalizeStep(step: DemoStep, ctx: PersonalizeContext): DemoStep {
  return {
    ...step,
    scene: personalizeScene(step.scene, ctx),
  }
}

function personalizeScene(scene: DemoScene, ctx: PersonalizeContext): DemoScene {
  switch (scene.kind) {
    case 'client-register':
      return {
        ...scene,
        clientName: ctx.name || scene.clientName,
      }

    case 'client-portal':
      return {
        ...scene,
        clientName: ctx.name || scene.clientName,
      }

    case 'form-fill': {
      // Personalizar fields que coincidan con datos del usuario
      const newFields = scene.fields.map((field) => {
        const labelLower = field.label.toLowerCase()

        // Nombre del menor
        if (ctx.minorName && /(nombre|menor|niñ|hij)/i.test(labelLower)) {
          return { ...field, value: ctx.minorName }
        }

        // Edad del menor
        if (
          ctx.minorAge !== undefined &&
          /(edad|años)/i.test(labelLower)
        ) {
          return { ...field, value: String(ctx.minorAge) }
        }

        // Estado donde vive
        if (ctx.state && /(estado|state|donde vive|residencia)/i.test(labelLower)) {
          return { ...field, value: ctx.state }
        }

        return field
      })

      return {
        ...scene,
        fields: newFields,
      }
    }

    // Otras scenes no se personalizan (intro, ai-generate, admin-review,
    // phase-advance, success, document-upload) — son institucionales o
    // genéricas, no exponen datos del cliente.
    default:
      return scene
  }
}
