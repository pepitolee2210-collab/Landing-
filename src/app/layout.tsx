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
    default: 'UsaLatinoPrime — Bufete migratorio digital para latinos en EE.UU.',
    template: '%s · UsaLatinoPrime',
  },
  description:
    'Visa juvenil SIJS, asilo político, ajuste de estatus. Un equipo bilingüe en Utah con tecnología propia para que veas tu caso en tiempo real. Más de 100 familias atendidas.',
  keywords: [
    'visa juvenil',
    'SIJS',
    'asilo político',
    'ajuste de estatus',
    'I-485',
    'I-360',
    'abogado de inmigración latino',
    'bufete migratorio Utah',
  ],
  authors: [{ name: 'UsaLatinoPrime' }],
  openGraph: {
    type: 'website',
    locale: 'es_US',
    siteName: 'UsaLatinoPrime',
    url: '/',
    title: 'UsaLatinoPrime — Bufete migratorio digital para latinos en EE.UU.',
    description:
      'Más de 400 familias atendidas. Visa juvenil, asilo y ajuste de estatus con un equipo bilingüe en Utah. Portal 24/7, plataforma propia.',
    // Imagen: Next.js auto-detecta src/app/opengraph-image.jpg
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UsaLatinoPrime — Bufete migratorio digital para latinos en EE.UU.',
    description:
      'Más de 400 familias atendidas. Visa juvenil, asilo y ajuste de estatus con un equipo bilingüe en Utah.',
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
