import type { Metadata } from 'next'
import { Space_Grotesk, Geist, JetBrains_Mono, Bricolage_Grotesque } from 'next/font/google'
import { MetaPixel } from '@/components/tracking/meta-pixel'
import { GoogleAnalytics } from '@/components/tracking/google-analytics'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

// Detecta automáticamente la URL del deploy (Vercel) o usa la prod
const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://usalatinoprime.com')

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'UsaLatinoPrime — Acompañamiento automatizado para tu caso migratorio',
    template: '%s · UsaLatinoPrime',
  },
  description:
    'Plataforma propia que arma tu caso paso a paso: visa juvenil, asilo, residencia. La tecnología te guía, un humano responde cuando lo necesitas. Empieza gratis y ve tu caso construirse en vivo.',
  keywords: [
    'acompañamiento automatizado inmigración',
    'plataforma migratoria',
    'visa juvenil',
    'SIJS',
    'asilo político',
    'ajuste de estatus',
    'I-485',
    'I-360',
    'caso migratorio en vivo',
    'WhatsApp inmigración Utah',
  ],
  authors: [{ name: 'UsaLatinoPrime' }],
  openGraph: {
    type: 'website',
    locale: 'es_US',
    siteName: 'UsaLatinoPrime',
    url: '/',
    title: 'Tu caso migratorio en piloto automático · UsaLatinoPrime',
    description:
      'Plataforma propia que arma tu caso paso a paso. Sube un documento desde el celular y ve qué falta en tiempo real. Cuando necesitas un humano, Vanessa responde en menos de 14 min. Empieza gratis →',
    // Imagen: Next.js auto-detecta src/app/opengraph-image.jpg
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tu caso migratorio en piloto automático · UsaLatinoPrime',
    description:
      'Plataforma + humanos cuando hacen falta. Visa, asilo, residencia paso a paso desde el celular. Empieza gratis →',
    // Imagen: Next.js auto-detecta src/app/twitter-image.jpg
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${bricolage.variable} ${geistSans.variable} ${jetBrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <MetaPixel />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
