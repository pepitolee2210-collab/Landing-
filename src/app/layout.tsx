import type { Metadata } from 'next'
import { Fraunces, Geist, Geist_Mono } from 'next/font/google'
import { MetaPixel } from '@/components/tracking/meta-pixel'
import { GoogleAnalytics } from '@/components/tracking/google-analytics'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
})

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://usalatinoprime.com'),
  title: {
    default: 'UsaLatinoPrime — Bufete de inmigración para latinos en EE.UU.',
    template: '%s · UsaLatinoPrime',
  },
  description:
    'Visa juvenil SIJS, asilo político, ajuste de estatus y más. Un equipo bilingüe en Utah que ya ayudó a más de 100 familias latinas a estabilizar su estatus migratorio en EE.UU.',
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
    title: 'UsaLatinoPrime — Bufete de inmigración para latinos en EE.UU.',
    description:
      'Más de 100 casos firmados en 2026. Visa juvenil, asilo y ajuste de estatus con un equipo bilingüe en Utah.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="grain min-h-full flex flex-col">
        {children}
        <MetaPixel />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
