import type { Metadata } from 'next'
import { Navbar2 } from '@/components/landing2/navbar2'
import { Hero2 } from '@/components/landing2/hero2'
import { TrustLogos } from '@/components/landing2/trust-logos'
import { SalesTicker } from '@/components/landing2/sales-ticker'
import { LiveStats } from '@/components/landing2/live-stats'
import { ProductGrid } from '@/components/landing2/product-grid'
import { BundleDeal } from '@/components/landing2/bundle-deal'
import { Features } from '@/components/landing2/features'
import { ServicesShowcase } from '@/components/landing2/services-showcase'
import { HowItWorks } from '@/components/landing2/how-it-works'
import { Reviews } from '@/components/landing2/reviews'
import { CeoStory } from '@/components/landing2/ceo-story'
import { Guarantee } from '@/components/landing2/guarantee'
import { Faq2 } from '@/components/landing2/faq2'
import { CtaFinal2 } from '@/components/landing2/cta-final2'
import { StickyCartBar } from '@/components/landing2/sticky-cart-bar'
import { Footer } from '@/components/site/footer'

export const metadata: Metadata = {
  title: 'Servicios legales migratorios · UsaLatinoPrime',
  description:
    'Visa Juvenil, Asilo, Ajuste de Estatus y más. Equipo bilingüe en Utah, portal 24/7, cuotas sin interés y garantía 7 días.',
}

export default function HomePage() {
  return (
    <div className="l2-root min-h-screen flex flex-col">
      <Navbar2 />
      <main className="flex-1">
        <Hero2 />
        <TrustLogos />
        <ProductGrid />
        <LiveStats />
        <BundleDeal />
        <Features />
        <ServicesShowcase />
        <HowItWorks />
        <Reviews />
        <CeoStory />
        <Guarantee />
        <Faq2 />
        <CtaFinal2 />
        <SalesTicker />
      </main>
      <Footer />
      <StickyCartBar />
    </div>
  )
}
