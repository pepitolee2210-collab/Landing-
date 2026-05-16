import type { Metadata } from 'next'
import { Navbar2 } from '@/components/landing2/navbar2'
import { Hero2 } from '@/components/landing2/hero2'
import { TrustStrip } from '@/components/landing2/trust-strip'
import { ProductGrid } from '@/components/landing2/product-grid'
import { Features } from '@/components/landing2/features'
import { HowItWorks } from '@/components/landing2/how-it-works'
import { Reviews } from '@/components/landing2/reviews'
import { Faq2 } from '@/components/landing2/faq2'
import { CtaFinal2 } from '@/components/landing2/cta-final2'
import { Footer } from '@/components/site/footer'

export const metadata: Metadata = {
  title: 'Tienda de servicios legales · UsaLatinoPrime',
  description:
    'E-commerce de servicios legales migratorios. Visa Juvenil, Asilo, Ajuste de Estatus y más — cuotas sin interés, pago seguro, soporte 24/7.',
}

export default function Landing2Page() {
  return (
    <>
      <Navbar2 />
      <main className="flex-1">
        <Hero2 />
        <TrustStrip />
        <ProductGrid />
        <Features />
        <HowItWorks />
        <Reviews />
        <Faq2 />
        <CtaFinal2 />
      </main>
      <Footer />
    </>
  )
}
