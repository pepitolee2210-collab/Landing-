import { Marquee } from '@/components/decor/marquee'

/**
 * Franja sutil entre secciones con los países que servimos.
 * Único elemento horizontal en movimiento de la página.
 */
export function CountriesMarquee() {
  return (
    <section className="relative py-10 md:py-12 border-y border-[var(--color-line)]">
      <Marquee
        items={[
          'Estados Unidos · 🇺🇸',
          'México · 🇲🇽',
          'Colombia · 🇨🇴',
          'Perú · 🇵🇪',
          'Ecuador · 🇪🇨',
          'Honduras · 🇭🇳',
          'El Salvador · 🇸🇻',
          'Guatemala · 🇬🇹',
          'Venezuela · 🇻🇪',
        ]}
        duration={80}
      />
    </section>
  )
}
