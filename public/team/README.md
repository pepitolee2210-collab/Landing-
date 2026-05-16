# Fotos del equipo

Coloca aquí las fotos profesionales de cada miembro con los siguientes nombres exactos:

- `henry.jpg` (o `.png`, `.webp`)
- `vanessa.jpg`
- `diana.jpg`
- `andrium.jpg`
- `giuseppe.jpg`
- `mauricio.jpg`

**Recomendaciones técnicas:**
- Mínimo 800 × 1000 px (formato vertical 4:5)
- Buena iluminación, fondo neutro
- Formato `.jpg` para fotos (menor peso), `.webp` ideal si se puede
- Hasta 500 KB por imagen

Una vez subidas, actualizar `src/lib/team.ts` poniendo en cada miembro:

```ts
photo: '/team/henry.jpg'
```

El componente `<TeamAvatar />` se encarga del resto:
- next/image optimiza tamaños automáticamente
- escala de grises sutil con tinte azul
- vuelve a color en hover

Mientras no haya foto, se muestra un placeholder elegante con las iniciales del miembro sobre un patrón blueprint.
