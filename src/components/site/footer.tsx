import Link from 'next/link'
import { SITE } from '@/lib/site'
import { Logo } from './logo'

export function Footer() {
  return (
    <footer
      className="mt-32 border-t border-[var(--color-line)]"
      style={{ background: 'var(--color-bg-2)' }}
    >
      <div className="container-x py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Marca + tagline */}
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-[var(--color-text-2)]">
            Bufete migratorio digital con sede en Utah. Acompañamos a familias
            hispanohablantes en cada paso de su proceso migratorio.
          </p>
          <p className="mt-8 font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-[0.18em] mb-3">
            Países que servimos
          </p>
          <p className="text-lg leading-relaxed">
            <span aria-label="Estados Unidos">🇺🇸</span>{' '}
            <span aria-label="México">🇲🇽</span>{' '}
            <span aria-label="Guatemala">🇬🇹</span>{' '}
            <span aria-label="Honduras">🇭🇳</span>{' '}
            <span aria-label="El Salvador">🇸🇻</span>{' '}
            <span aria-label="Colombia">🇨🇴</span>{' '}
            <span aria-label="Ecuador">🇪🇨</span>{' '}
            <span aria-label="Perú">🇵🇪</span>{' '}
            <span aria-label="Venezuela">🇻🇪</span>
          </p>
        </div>

        {/* Servicios */}
        <div className="md:col-span-3">
          <p className="font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-[0.18em] mb-5">
            Servicios
          </p>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="#productos" className="link-tech">
                Visa Juvenil SIJS
              </Link>
            </li>
            <li>
              <Link href="#productos" className="link-tech">
                Asilo Político
              </Link>
            </li>
            <li>
              <Link href="#productos" className="link-tech">
                Ajuste de Estatus
              </Link>
            </li>
            <li>
              <Link href="#productos" className="link-tech">
                Apelación BIA
              </Link>
            </li>
            <li>
              <Link href="#productos" className="link-tech">
                Ver catálogo completo
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div className="md:col-span-4">
          <p className="font-mono text-[10px] text-[var(--color-text-3)] uppercase tracking-[0.18em] mb-5">
            Contacto
          </p>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href={`https://wa.me/${SITE.contact.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-tech font-mono"
              >
                WhatsApp · {SITE.contact.whatsapp}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.contact.email}`} className="link-tech">
                {SITE.contact.email}
              </a>
            </li>
            <li className="text-[var(--color-text-3)]">{SITE.legal.address}</li>
            <li>
              <a href={SITE.appUrl} className="link-tech text-xs">
                Portal del cliente →
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--color-line)]">
        <div className="container-x py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-[var(--color-text-3)] font-mono">
          <p>© {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.</p>
          <p className="tracking-wider flex items-center gap-2">
            <span className="pulse-dot" />
            Atendiendo en tiempo real
          </p>
        </div>
      </div>
    </footer>
  )
}
