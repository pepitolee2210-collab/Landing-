import Link from 'next/link'
import { TEAM } from '@/lib/team'
import { TeamAvatar } from './team-avatar'

export function TeamPreview() {
  return (
    <section className="py-24 md:py-32 relative" style={{ background: 'var(--color-bg-2)' }}>
      <div className="container-x">
        <div className="mb-16 max-w-3xl">
          <span className="tag mb-6">
            <DotIcon />
            05 / El equipo
          </span>
          <h2
            className="mt-6 font-display text-[var(--color-text)]"
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 4rem)',
              lineHeight: 1,
              letterSpacing: '-0.035em',
              fontWeight: 500,
            }}
          >
            Detrás de cada caso,{' '}
            <span style={{ color: 'var(--color-gold)' }}>
              un equipo que también es latino.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {TEAM.map((member) => (
            <article key={member.slug} className="group">
              <TeamAvatar member={member} size="sm" />
              <div className="pt-3.5 pb-1">
                <p
                  className="font-display text-sm text-[var(--color-text)] tracking-tight leading-tight truncate"
                  style={{ fontWeight: 500 }}
                  title={member.name}
                >
                  {member.name}
                </p>
                <p className="mt-1 text-[10px] text-[var(--color-text-3)] font-mono uppercase tracking-[0.1em] truncate">
                  {member.shortRole}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 flex">
          <Link
            href="/sobre-nosotros"
            className="group inline-flex items-center gap-3 text-[var(--color-text)] font-medium link-tech"
          >
            Conoce al equipo completo
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" className="transition-transform group-hover:translate-x-1" aria-hidden>
              <path d="M1 7H19M19 7L13 1M19 7L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

function DotIcon() {
  return <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
}
