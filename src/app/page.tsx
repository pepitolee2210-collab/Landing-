import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { Hero } from '@/components/landing/hero'
import { CountriesMarquee } from '@/components/landing/countries-marquee'
import { ServicesBoard } from '@/components/landing/services-board'
import { Process } from '@/components/landing/process'
import { Testimonials } from '@/components/landing/testimonials'
import { Upcoming } from '@/components/landing/upcoming'
import { TeamPreview } from '@/components/landing/team-preview'
import { CTAFinal } from '@/components/landing/cta-final'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CountriesMarquee />
        <ServicesBoard />
        <Process />
        <Testimonials />
        <Upcoming />
        <TeamPreview />
        <CTAFinal />
      </main>
      <Footer />
    </>
  )
}
