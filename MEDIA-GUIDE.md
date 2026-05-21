# 🎬 Guía de Media — UsaLatinoPrime Landing

Documento maestro para crear las **7 imágenes** + **7 videos** del catálogo de servicios.

> **Identidad de UsaLatinoPrime — léelo antes de escribir cualquier copy:**
>
> Somos una **plataforma digital SaaS** (no un bufete tradicional). El cliente **hace su caso desde su celular** usando software desarrollado por un equipo de profesionales con miles de dólares de inversión. Solo damos **acompañamiento humano puntual** en los momentos exactos donde necesita orientación. Nuestra promesa:
>
> - 🏃 **Rápido** — Sin esperas eternas de bufete
> - 💵 **Accesible** — Sin honorarios de miles de dólares
> - 🛡️ **Seguro de ganar** — Plataforma diseñada para no fallar
> - 🎯 **Exacto** — Validación automática antes de enviar
>
> **Lema:** *"Hazlo tú mismo. Pero con la tecnología y el respaldo correcto detrás."*

> **Dónde van los archivos:**
> ```
> public/services/[id].jpg   ← 1600 × 1200 px (aspect 4:3)
> public/services/[id].mp4   ← 1920 × 1080 px (16:9, 28–32 seg)
> ```

---

## 📋 Los 7 servicios (orden del catálogo)

| # | Nombre | id | Categoría |
|---|---|---|---|
| 01 | Visa Juvenil · SIJS | `visa-juvenil` | Producto estrella |
| 02 | Asilo Político | `asilo-politico` | Asilo |
| 03 | Ajuste de Estatus · I-485 | `ajuste-estatus` | Green Card |
| 04 | Apelación · BIA (EOIR-26) | `apelacion-bia` | Litigio |
| 05 | Cambio de Corte | `cambio-corte` | Litigio |
| 06 | ITIN Number | `itin` | IRS · Taxes |
| 07 | Declaración de Impuestos | `taxes` | IRS · Taxes |

---

## 🎨 Estilo visual unificado — TODAS las imágenes

Bloque base para cada prompt:

```
Cinematic photography, editorial luxury aesthetic, dramatic soft lighting,
shallow depth of field, subtle film grain, dark moody background with deep
shadows. Color palette: Utah blue #5B9BFF, carbon black #0a0a0a, off-white
highlights, occasional warm gold #f2b234 accents. Composition: rule of
thirds, negative space, human-centric storytelling. No text, no logos, no
watermarks. 4:3 aspect ratio. Ultra-high detail, 8K, professional camera.
```

**Modelo IA recomendado:** Midjourney v6 / DALL·E 3 / Flux Pro. `--ar 4:3 --style raw --v 6 --s 200`.

---

## 🎬 ESTRUCTURA UNIFICADA DE GUIONES (30s)

**TODOS los videos siguen esta estructura comparativa ANTES vs AHORA:**

```
[0–4s · GANCHO]
    Plano del DOLOR tradicional (oficina con papeles, fila en bufete,
    abogado cobrando miles).
    VOZ: Frase que duele.

[4–10s · ANTES — sin tecnología]
    SPLIT-SCREEN o secuencia: cliente caotizado con bufete tradicional.
    Costo alto. Esperas. Idioma. Confusión.
    VOZ: "Antes: ir a un bufete, pagar [miles], esperar meses, sin
    saber qué pasa con tu caso."

[10–22s · AHORA — con la plataforma]
    Misma persona en su sofá con el celular. Interfaz de UsaLatinoPrime
    en pantalla. Llenando el formulario solo. Subiendo documentos.
    Validación automática.
    VOZ: "Con UsaLatinoPrime: lo haces tú mismo desde tu celular.
    Nuestra plataforma — desarrollada por abogados de inmigración —
    te guía paso a paso. Y cuando necesitas un humano, Vanessa, tu paralegal,
    están ahí en el momento exacto."

[22–27s · PROOF — los 4 pilares]
    Texto + iconos animados:
    🏃 RÁPIDO  ·  💵 ACCESIBLE  ·  🛡️ SEGURO  ·  🎯 EXACTO
    VOZ: "Más rápido. Más accesible. Más seguro. Más exacto."

[27–30s · CTA]
    Texto bold + logo + WhatsApp.
    VOZ: "Hazlo tú mismo. Pero hazlo con quien sabe."
```

---

## 📸 7 Prompts de imagen + 🎬 7 Guiones de video

### 1️⃣ Visa Juvenil · SIJS (`visa-juvenil.jpg` / `.mp4`)
> **PRODUCTO ESTRELLA**

**Prompt imagen:**
```
[base] + Latino teenager (around 16, gender neutral) sitting on a comfortable
couch in a warm modern home, holding a smartphone with both hands. The phone
screen shows a clean dashboard interface with blue accents. Mother visible
in soft background bokeh, supportive. American flag detail subtle on a shelf.
Late afternoon sunlight through window, golden warmth on the phone screen.
Hope, autonomy, technology empowering young immigrant. No bureaucratic
office. Editorial portrait, cinematic.
```

**Guion video (30s):**
```
[0–4s · GANCHO]
    PLANO: Oficina de abogado tradicional. Madre y adolescente sentados
    frente a abogado serio. Sobre con dinero en la mesa. Fila de espera.
    VOZ: "Antes, sacar la Visa Juvenil de tu hijo era una pesadilla."

[4–10s · ANTES]
    SPLIT con fechas: "Mes 3 · esperando" / "Mes 8 · seguís sin saber" /
    "Pagaste miles de dólares." Calculadora mostrando $8,000+.
    VOZ: "Bufetes cobrando ocho, diez mil dólares. Meses sin respuestas.
    Llenando formularios en inglés que nadie te explica."

[10–22s · AHORA]
    Adolescente latino en su cama con el celular. Interfaz UsaLatinoPrime:
    'Fase 1 · Custodia ✓', 'Fase 2 · I-360 en progreso', 'Fase 3 · I-485'.
    Llenando preguntas guiadas. Subiendo foto del pasaporte. Vanessa
    apareciendo en chat: "Vi tu pregunta. Te llamo en 5 min."
    VOZ: "Hoy, con UsaLatinoPrime, tu hijo llena su caso desde el celular.
    Nuestra plataforma — desarrollada por abogados de inmigración —
    automatiza las 3 fases SIJS: custodia, I-360 y I-485. Vanessa solo
    interviene en los momentos clave."

[22–27s · PROOF]
    🏃 6 a 18 MESES · 💵 SIN HONORARIOS DE BUFETE · 🛡️ +400 CASOS ·
    🎯 VALIDACIÓN AUTOMÁTICA
    VOZ: "Más rápido. Más accesible. Más seguro. Más exacto."

[27–30s · CTA]
    "Hazlo tú mismo. Hazlo con UsaLatinoPrime."
    Logo + WhatsApp.
```

---

### 2️⃣ Asilo Político (`asilo-politico.jpg` / `.mp4`)

**Prompt imagen:**
```
[base] + Latina woman sitting at a kitchen table at home, late evening,
warm lamp light. She's typing on a tablet showing a digital form interface
with subtle blue UI elements. Coffee cup beside her. Hopeful, calm expression
— in control of her own case. Window showing peaceful night outside, no
bars or jail imagery. Symbol of safe haven achieved through technology.
Editorial photography.
```

**Guion video (30s):**
```
[0–4s · GANCHO]
    Mujer con maleta en aeropuerto, mirando el cielo. Pasaporte en la mano.
    VOZ: "Saliste de tu país por miedo. Aquí, todavía vives en las sombras."

[4–10s · ANTES]
    Bufete: abogado escribiendo el I-589 a mano para el cliente. Cliente
    sin entender nada en inglés. Honorarios $5,000+ visible. Espera 2 años
    para entrevista.
    VOZ: "Antes: pagar a un abogado cinco mil dólares para que te llene
    el I-589. Sin saber qué pone. Sin entender el proceso."

[10–22s · AHORA]
    Mujer en su mesa con el tablet. UsaLatinoPrime app: 'Mi Historia'
    wizard con preguntas guiadas en español. Subiendo evidencia de país.
    Plataforma generando narrativa legal automática. Vanessa en video-llamada
    revisando: "Tu testimonio está sólido. Lo firmamos."
    VOZ: "Hoy, tú cuentas tu historia. Nuestra plataforma la convierte
    en una declaración jurada con estructura legal. Subes evidencia de
    tu país, tramitas tu permiso de trabajo en paralelo. Y Vanessa solo
    revisa antes de enviar."

[22–27s · PROOF]
    🏃 PERMISO DE TRABAJO EN 5 MESES · 💵 SIN HONORARIOS DE BUFETE ·
    🛡️ CASOS REALES GANADOS · 🎯 NARRATIVA ESTRUCTURADA
    VOZ: "Más rápido. Más accesible. Más seguro. Más exacto."

[27–30s · CTA]
    "Tu historia merece ser contada bien. Hazlo tú mismo."
    Logo + WhatsApp.
```

---

### 3️⃣ Ajuste de Estatus · I-485 (`ajuste-estatus.jpg` / `.mp4`)

**Prompt imagen:**
```
[base] + Latino couple in their kitchen at sunset, both holding the same
smartphone showing a digital case dashboard. One of them is pointing at a
progress timeline on the screen. The other smiling. Marriage certificate
slightly visible on the counter. Green card concept symbolized by a soft
green glow from the phone. Warm domestic light. Empowerment through
technology. Editorial home portrait.
```

**Guion video (30s):**
```
[0–4s · GANCHO]
    Pareja viendo abogado: el abogado les pide $6,000 + 6 formularios
    confusos.
    VOZ: "Te casaste con un ciudadano. La Green Card debería ser fácil.
    Pero te cobran seis mil dólares."

[4–10s · ANTES]
    Mesa llena de papeles: I-130, I-485, I-864, I-765, I-131, I-693.
    Pareja perdida. Llamadas al bufete sin respuesta. Mes 10 esperando.
    VOZ: "Antes: papelero, esperas, bufete que no contesta. Y tú sin
    saber dónde está tu caso."

[10–22s · AHORA]
    Pareja en su cocina con el celular. UsaLatinoPrime dashboard:
    'Petición I-130 ✓ enviada / I-485 en progreso 78% / Examen médico
    agendado'. Suben fotos del acta de matrimonio. Plataforma generando
    el I-864 con datos del sponsor. Vanessa en chat: "Tu cita biométrica
    es el 15. Te mandé los detalles."
    VOZ: "Hoy, los 6 formularios I-130, I-485, I-864, I-765, I-131 y
    I-693 los llenas tú desde tu cocina. Nuestra plataforma los
    coordina, valida y te avisa cuando USCIS responde. Vanessa solo
    aparece en los momentos críticos: biométricos, entrevista, RFE."

[22–27s · PROOF]
    🏃 8 A 36 MESES · 💵 AHORRAS MILES VS BUFETE ·
    🛡️ +200 GREEN CARDS APROBADAS · 🎯 6 FORMULARIOS AUTOMATIZADOS
    VOZ: "Más rápido. Más accesible. Más seguro. Más exacto."

[27–30s · CTA]
    "Tu Green Card no necesita un bufete. Necesita la plataforma correcta."
    Logo + WhatsApp.
```

---

### 4️⃣ Apelación · BIA / EOIR-26 (`apelacion-bia.jpg` / `.mp4`)
> ⚠️ Urgente — 30 días desde la decisión

**Prompt imagen:**
```
[base] + Close-up of a person's hands holding a smartphone displaying an
urgent countdown timer "27 days left" with subtle Notice of Appeal interface
behind. Wooden table with a single legal document slightly visible. Red
accent light from the phone notification. Cinematic urgency. The technology
solves what feels impossible. Editorial dramatic photography.
```

**Guion video (30s):**
```
[0–4s · GANCHO]
    Carta con "ORDER OF REMOVAL" en pantalla. Reloj corriendo. Persona
    desesperada.
    VOZ: "El juez te negó el caso. Tienes 30 días para apelar. Solo 30."

[4–10s · ANTES]
    Persona corriendo por bufetes: "Cobran $4,000 solo por la apelación."
    Pasan 10 días buscando abogado. Reloj corriendo. 20 días. Pánico.
    VOZ: "Antes: buscar bufete contra reloj. Cuatro mil dólares solo
    por el Notice of Appeal. Y rezar para que llegue a tiempo."

[10–22s · AHORA]
    Persona en su sala con el celular. UsaLatinoPrime: 'Apelación BIA
    iniciada · 23 días restantes'. Plataforma generando el EOIR-26 con
    datos del caso. Analizando la decisión del juez. Sugerencia automática
    de argumentos legales. Vanessa en video: "Tu caso es viable. Lo presento
    hoy mismo."
    VOZ: "Hoy, en menos de una hora, abres tu cuenta UsaLatinoPrime.
    La plataforma analiza la decisión del juez, identifica los errores
    legales y genera tu Notice of Appeal EOIR-26. Vanessa revisa los
    argumentos y lo radica antes del día 30. Tu deportación queda
    pausada."

[22–27s · PROOF]
    🏃 RADICADO EN DÍAS · 💵 SIN COBRAR MILES POR URGENCIA ·
    🛡️ DEPORTACIÓN PAUSADA · 🎯 ANÁLISIS DE ERRORES AUTOMÁTICO
    VOZ: "Más rápido. Más accesible. Más seguro. Más exacto."

[27–30s · CTA]
    "Tienes 30 días. No los pierdas buscando bufete. Hazlo ya."
    Logo + WhatsApp · RED URGENCY.
```

---

### 5️⃣ Cambio de Corte (`cambio-corte.jpg` / `.mp4`)

**Prompt imagen:**
```
[base] + Top-down view of a smartphone on a moving box. The phone screen
shows a digital map of USA with a glowing blue line connecting two states
(origin → destination). Car keys and a takeout coffee beside it. Light
indicating "new home" energy. Color: deep blue accents from the screen,
warm gold from the morning sun. Mood: smooth transition, technology
solves geography. Editorial flat lay.
```

**Guion video (30s):**
```
[0–4s · GANCHO]
    Persona con cajas de mudanza. Mira la carta de su corte original
    (otro estado). Cara de "ahora qué".
    VOZ: "Te mudaste. Tu caso quedó en el otro estado."

[4–10s · ANTES]
    Plano: viaje en avión a la corte vieja. Hotel pagado. Día de trabajo
    perdido. O peor: contratar abogado en el estado nuevo por $1,500+.
    VOZ: "Antes: viajar a cada audiencia. O pagar otro bufete en tu
    nuevo estado. Mil quinientos dólares por una moción simple."

[10–22s · AHORA]
    Persona en su nueva sala con el celular. UsaLatinoPrime: 'Motion to
    Change Venue · Generando' → 'Coordinando con corte de Phoenix y
    Houston' → 'Enviado'. Tarda 5 minutos.
    VOZ: "Hoy, abres la app, confirmas tu nueva dirección con un
    comprobante de luz, y la plataforma genera la Motion to Change
    Venue. La radicamos por ti. Ambas cortes confirman el traslado."

[22–27s · PROOF]
    🏃 5 MINUTOS DESDE TU CELULAR · 💵 SIN ABOGADO EN OTRO ESTADO ·
    🛡️ EOIR CONFIRMA · 🎯 SIN VIAJES
    VOZ: "Más rápido. Más accesible. Más seguro. Más exacto."

[27–30s · CTA]
    "Tu caso se mueve contigo. Desde tu celular."
    Logo + WhatsApp.
```

---

### 6️⃣ ITIN Number (`itin.jpg` / `.mp4`)

**Prompt imagen:**
```
[base] + Hands holding a smartphone displaying the W-7 form digitally
filled, with the IRS interface in subtle background. Passport open on a
wooden table beside the phone. A small succulent plant for warmth. Morning
coffee. Soft natural light from the side window. Empowerment through
self-service. No IRS office, no waiting room — done from home.
```

**Guion video (30s):**
```
[0–4s · GANCHO]
    Cliente en oficina del IRS, fila larga, papeles en mano. Voz autoritaria
    diciendo "Next!"
    VOZ: "Ir al IRS por tu ITIN. Fila. Inglés. Papeles devueltos."

[4–10s · ANTES]
    "Acceptance Agent" cobrando $300. Esperando 3 meses la respuesta.
    Sin saber si fue aprobado.
    VOZ: "Antes: pagar trescientos dólares a un Acceptance Agent. Esperar
    sin saber. Si rechazan, empezar de cero."

[10–22s · AHORA]
    Persona en su cocina con el celular. UsaLatinoPrime: 'ITIN W-7' wizard
    con preguntas guiadas. Subiendo foto del pasaporte. Plataforma
    certificando la copia digitalmente. Vanessa en chat: "Tu W-7 está
    listo. Lo radico hoy con el IRS."
    VOZ: "Hoy, llenas tu W-7 desde el celular en 15 minutos. Subes
    foto de tu pasaporte. Nuestra plataforma certifica el documento,
    coordina con la declaración 1040 si la necesitas, y radica todo
    al IRS. Tú solo esperas el sobre con tu número."

[22–27s · PROOF]
    🏃 15 MINUTOS · 💵 SIN AGENTE QUE COBRA $300 ·
    🛡️ DOCUMENTOS VALIDADOS · 🎯 SIN ERRORES DE FORMULARIO
    VOZ: "Más rápido. Más accesible. Más seguro. Más exacto."

[27–30s · CTA]
    "Tu ITIN, desde tu cocina. En 15 minutos."
    Logo + WhatsApp.
```

---

### 7️⃣ Declaración de Impuestos (`taxes.jpg` / `.mp4`)

**Prompt imagen:**
```
[base] + Latino person at kitchen table with smartphone showing a clean
tax dashboard with green checkmarks indicating completion. W-2 forms
neatly stacked beside. Coffee, glasses, calm morning vibe. Sunlight
illuminating the screen. Forms 1040 and TC-40 partially visible. Color:
warm morning gold + cool blue from phone screen. Confidence, control,
done in minutes.
```

**Guion video (30s):**
```
[0–4s · GANCHO]
    Persona con W-2s en mano, viendo lista de "tax preparers" cobrando
    $250–$500. Estrés.
    VOZ: "Taxes. La temporada del miedo."

[4–10s · ANTES]
    Acudiendo a un "preparador" no certificado. Pagando $400. Errores que
    afectan tu caso migratorio. Refund perdido en créditos no aplicados.
    VOZ: "Antes: pagar un preparador cualquiera. Cuatrocientos dólares.
    Errores. Créditos que dejaste pasar. Constancia que no te sirve para
    inmigración."

[10–22s · AHORA]
    Persona en su mesa con el celular. UsaLatinoPrime: 'Declaración 1040
    Federal + TC-40 Utah · 87% completado'. Subiendo fotos de W-2s.
    Plataforma calculando créditos automáticos: 'EITC, CTC detectados.
    +$2,400 de refund'. E-file directo al IRS.
    VOZ: "Hoy, subes fotos de tus W-2s. La plataforma calcula tu
    federal 1040 y tu estatal TC-40 si estás en Utah. Detecta cada
    crédito fiscal que te corresponde. E-file al IRS desde tu celular.
    Y la constancia queda lista para tu caso de inmigración."

[22–27s · PROOF]
    🏃 EN UNA TARDE · 💵 MÁS BARATO QUE UN PREPARADOR ·
    🛡️ E-FILE OFICIAL IRS · 🎯 CADA CRÉDITO APLICADO
    VOZ: "Más rápido. Más accesible. Más seguro. Más exacto."

[27–30s · CTA]
    "Tus taxes con quien también lleva tu caso migratorio."
    Logo + WhatsApp.
```

---

## 🎙️ Guía de producción de videos

### Voz / locutor
- **Tono:** cálido, cercano, español neutro latinoamericano
- **Ritmo:** pausado en el ANTES, energético en el AHORA
- **Sugerencia IA:** ElevenLabs voces `Mateo`, `Diego` o `Bella` en español

### Música / Sound design
- **ANTES (0-10s):** ambient lento, tonos graves, sensación de peso
- **AHORA (10-22s):** transición a energético, sintético moderno tipo Apple
- **PROOF (22-27s):** punchy, beat suave
- **CTA (27-30s):** solo voz limpia, sin música
- **Referencias:** Apple commercials, Stripe explainers, Notion ads

### Sentido del SPLIT-SCREEN
- **Izquierda (ANTES):** colores apagados, oficina gris, papeles físicos
- **Derecha (AHORA):** colores vibrantes, casa cálida, celular en mano
- **Transición:** swipe horizontal con sonido "whoosh" tech

### Texto en pantalla
- **Fuente:** Bricolage Grotesque
- **Color base:** off-white `#fafafa`
- **Highlight:** Utah blue `#5B9BFF`
- **Iconos PROOF (4 pilares):** 🏃 💵 🛡️ 🎯
- **CTA final:** WhatsApp green `#25d366`
- **Urgencia (BIA):** rojo `#FF4D6D`

### Export specs
- **Resolución:** 1920 × 1080 (16:9)
- **Frame rate:** 30 fps
- **Codec:** H.264 baseline
- **Bitrate:** 4–6 Mbps
- **Audio:** AAC 128kbps
- **Tamaño objetivo:** < 5 MB por video

---

## 🤖 Workflow recomendado

### Para imágenes (Midjourney v6)
1. Copia bloque base + prompt específico
2. Añade: `--ar 4:3 --style raw --v 6 --s 200`
3. Genera 4 variaciones, escoge la mejor
4. Upscale a 1600×1200 mínimo
5. Guarda como `services/[id].jpg` calidad 85–90%
6. Sube a `public/services/`

### Para videos
1. **Storyboard:** dibuja los 5 planos con SPLIT-SCREEN antes/ahora
2. **Stock para ANTES:** Pexels — bufetes, oficinas IRS, filas, papeles
3. **Stock para AHORA:** Pexels — personas con celular en casa, interfaces
4. **Mockups del app:** Figma o After Effects (interfaces UsaLatinoPrime)
5. **Voz:** ElevenLabs ES + master en Audacity
6. **Edit:** DaVinci Resolve (gratis) o Premiere
7. **Color grade:** ANTES gris/azul frío, AHORA cálido + Utah blue
8. **Export:** 1080p H.264 ~5MB

### Workflow ultra-rápido con IA
- **Imágenes:** Midjourney → ajuste en Photoshop
- **Videos:** Sora / Runway Gen-3 / Pika con prompts de 5s + concat
- **Voz:** ElevenLabs Mateo en español
- **Edit:** CapCut PC (gratis)

---

## ✅ Checklist antes de subir cada archivo

**Imágenes:**
- [ ] 1600×1200 px (4:3)
- [ ] JPG calidad 85–90%
- [ ] < 200 KB cada una (TinyPNG)
- [ ] Sin texto, sin logos
- [ ] **Persona usando celular o tecnología visible** (NO oficina de abogado)
- [ ] Color tone matching Utah blue + carbon
- [ ] Cliente potencial se identifica

**Videos:**
- [ ] 1920×1080 H.264
- [ ] 28–32 segundos
- [ ] < 5 MB
- [ ] **Estructura ANTES vs AHORA visible**
- [ ] **4 pilares mostrados al final (rápido · accesible · seguro · exacto)**
- [ ] Voz clara en español latino
- [ ] CTA final visible 3+ segundos
- [ ] Logo UsaLatinoPrime al cierre

---

## 🚀 Una vez subidos los archivos

No hay que tocar código. El sistema detecta automáticamente:
1. Si existe `public/services/visa-juvenil.jpg` → se muestra en el card
2. Si no existe → SVG fallback
3. Click en card → abre modal con `public/services/visa-juvenil.mp4`
4. Si no existe el video → modal muestra "Video próximamente"
5. Al terminar el video → CTA WhatsApp con mensaje contextual

**Mensajes WhatsApp** editables en `src/lib/product-media.ts`.

---

## 📞 Mensajes WhatsApp pre-cargados por servicio

| Servicio | Mensaje al click WhatsApp |
|---|---|
| Visa Juvenil | "Hola, vi el video de Visa Juvenil (SIJS). Quiero saber si mi hijo califica." |
| Asilo Político | "Hola, vi el video de Asilo Político. Quiero saber si aplico para mi caso." |
| Ajuste de Estatus | "Hola, vi el video de Ajuste de Estatus (I-485). Quiero empezar mi Green Card." |
| Apelación BIA | "Hola, vi el video de Apelación BIA. El juez me negó el caso, quiero apelar." |
| Cambio de Corte | "Hola, vi el video de Cambio de Corte. Me mudé y necesito mover mi caso." |
| ITIN | "Hola, vi el video del ITIN. Quiero tramitar mi número fiscal." |
| Taxes | "Hola, vi el video de Declaración de Impuestos. Quiero declarar mis taxes." |

---

## 🎯 Prioridad de creación

1. **Visa Juvenil** — producto estrella
2. **Ajuste de Estatus I-485** — segundo en demanda
3. **Asilo Político** — emocionalmente potente
4. **Apelación BIA** — alta urgencia (30 días)
5. **Taxes** — pico temporada de impuestos
6. **ITIN** — funnel hacia Taxes
7. **Cambio de Corte** — el más nicho

---

## 💡 Mensajes clave que TODOS los videos deben transmitir

| Mensaje | Cómo se muestra |
|---|---|
| **"Hazlo tú mismo"** | Persona en su casa con celular (no oficina) |
| **"Plataforma profesional"** | Interface limpia, validaciones en tiempo real |
| **"Acompañamiento puntual"** | Vanessa/Vanessa aparecen solo en momentos críticos |
| **"Ahorras miles"** | Comparativa con honorarios de bufete tradicional |
| **"Sin esperas"** | Tareas que toman minutos, no meses |
| **"Sin idioma como barrera"** | Interfaz en español, IA traduce |
| **"Seguro de ganar"** | Validación automática antes de enviar |

---

*Última actualización: 2026-05-20*
*Para preguntas técnicas: `src/lib/product-media.ts` y `src/components/landing2/service-modal.tsx`.*
