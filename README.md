# UsaLatinoPrime — Landing Pública

Landing **independiente** del proyecto principal `henryflow`. Pensada para correr
tráfico pagado (Meta Ads, Google Ads) y convertir visitantes en consultas por
WhatsApp.

## Stack

- **Next.js 16** (App Router) + React 19 + Turbopack
- **Tailwind CSS v4** con design tokens custom
- **TypeScript** estricto
- **next/font** para Fraunces + Geist Sans/Mono
- Tracking listo: Meta Pixel + Google Analytics 4 (controlado por env vars)

## Estructura

```
src/
├── app/
│   ├── page.tsx                 # Landing principal
│   ├── layout.tsx               # Root layout + fuentes + tracking
│   ├── globals.css              # Design tokens, animaciones
│   ├── robots.ts                # SEO
│   ├── sitemap.ts               # SEO
│   ├── servicios/
│   │   └── [slug]/page.tsx      # Detalle por servicio (dinámico)
│   └── sobre-nosotros/
│       └── page.tsx             # Equipo completo
├── components/
│   ├── site/                    # Navbar, Footer, Logo, etc.
│   ├── landing/                 # Hero, Servicios, Testimonios, etc.
│   └── tracking/                # MetaPixel, GA4
└── lib/
    ├── services.ts              # Catálogo de servicios (5 productos)
    ├── team.ts                  # Equipo
    ├── testimonials.ts          # Reseñas placeholder
    ├── site.ts                  # Configuración de marca
    └── utils.ts                 # cn(), whatsappUrl()
```

## Diseño

Estilo "Bufete Editorial Premium" — tipografía serif (Fraunces) + paleta cálida
(crema/tinta + dorado + rojo apagado). Inspirado en publicaciones serias y
firmas legales premium, NO en SaaS genéricos.

## Desarrollo

```bash
npm install
cp .env.example .env.local      # Llenar Pixel ID y GA ID cuando estén disponibles
npm run dev -- -p 3001           # Corre en puerto 3001
```

> El proyecto principal `henryflow` corre en el puerto 3000.
> Esta landing corre en el **3001** para no chocar.

## Producción

Deploy en Vercel apuntando al dominio `usalatinoprime.com`.
El proyecto `henryflow` sigue en `app.usalatinoprime.com` sin cambios.

## Placeholders pendientes

- [ ] Precios reales por servicio (ahora son `desde $X` aproximados)
- [ ] Video del hero
- [ ] Fotos profesionales del equipo
- [ ] Testimonios reales (los actuales son placeholders editoriales)
- [ ] Logos/screenshots de Sandbox Utah + DigiLegal
- [ ] Pixel ID de Meta + Measurement ID de GA4
- [ ] Headline final confirmado por Henry
