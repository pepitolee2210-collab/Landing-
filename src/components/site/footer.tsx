import Link from 'next/link'
import { SITE } from '@/lib/site'
import { Logo } from './logo'

export function Footer() {
  return (
    <footer className="mt-32 border-t border-[var(--color-line-soft)] bg-[var(--color-canvas-2)]/40">
      <div className="container-editorial py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Marca + tagline */}
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-[var(--color-ink-3)]">
            Bufete de inmigración latino con sede en Utah. Acompañamos a familias
            hispanohablantes en cada paso de su proceso migratorio en EE.UU.
          </p>
          <p className="mt-6 eyebrow">Países que servimos</p>
          <p className="mt-2 text-base">
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
          <p className="eyebrow mb-4">Servicios</p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                href="/servicios/visa-juvenil-completa"
                className="text-[var(--color-ink-2)] hover:text-[var(--color-ink)] link-underline"
              >
                Visa Juvenil completa
              </Link>
            </li>
            <li>
              <Link
                href="/servicios/visa-juvenil-i360-i485"
                className="text-[var(--color-ink-2)] hover:text-[var(--color-ink)] link-underline"
              >
                Visa Juvenil — I-360 + I-485
              </Link>
            </li>
            <li>
              <Link
                href="/servicios/visa-juvenil-i485"
                className="text-[var(--color-ink-2)] hover:text-[var(--color-ink)] link-underline"
              >
                Visa Juvenil — Solo I-485
              </Link>
            </li>
            <li>
              <Link
                href="/servicios/asilo-completo"
                className="text-[var(--color-ink-2)] hover:text-[var(--color-ink)] link-underline"
              >
                Asilo Político
              </Link>
            </li>
            <li>
              <Link
                href="/servicios/asilo-reforzamiento"
                className="text-[var(--color-ink-2)] hover:text-[var(--color-ink)] link-underline"
              >
                Asilo — Reforzamiento
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div className="md:col-span-4">
          <p className="eyebrow mb-4">Contacto</p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a
                href={`https://wa.me/${SITE.contact.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-ink-2)] hover:text-[var(--color-jade)] link-underline font-mono"
              >
                WhatsApp · {SITE.contact.whatsapp}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.contact.email}`}
                className="text-[var(--color-ink-2)] hover:text-[var(--color-ink)] link-underline"
              >
                {SITE.contact.email}
              </a>
            </li>
            <li className="text-[var(--color-ink-3)]">{SITE.legal.address}</li>
            <li>
              <a
                href={SITE.appUrl}
                className="text-[var(--color-ink-3)] hover:text-[var(--color-ink)] link-underline text-xs"
              >
                Portal del cliente →
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="border-t border-[var(--color-line-soft)]">
        <div className="container-editorial py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-[var(--color-ink-3)] font-mono">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
          </p>
          <p className="tracking-wider">
            Hecho con cuidado para latinos en EE.UU.
          </p>
        </div>
      </div>
    </footer>
  )
}
