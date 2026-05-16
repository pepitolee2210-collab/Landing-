import Image from 'next/image'
import type { TeamMember } from '@/lib/team'

/**
 * Avatar de miembro del equipo.
 * - Si tiene `photo`: muestra la imagen real con next/image, escala de grises
 *   sutil con tinte azul y vuelve a color en hover.
 * - Si no: placeholder elegante con iniciales sobre grid blueprint.
 */
export function TeamAvatar({
  member,
  size = 'md',
}: {
  member: TeamMember
  size?: 'sm' | 'md' | 'lg'
}) {
  const dim = size === 'sm' ? 240 : size === 'lg' ? 540 : 360
  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')

  return (
    <div
      className="group relative aspect-[4/5] overflow-hidden rounded-md"
      style={{
        background: 'linear-gradient(135deg, var(--color-elevated) 0%, var(--color-bg-2) 100%)',
      }}
    >
      {member.photo ? (
        <Image
          src={member.photo}
          alt={member.name}
          width={dim}
          height={Math.round(dim * 1.25)}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
          style={{
            filter: 'grayscale(0.6) brightness(0.85) contrast(1.05)',
          }}
        />
      ) : (
        // Placeholder editorial — iniciales sobre grid
        <>
          <div className="absolute inset-0 board-grid opacity-50" />
          <span
            className="absolute inset-0 flex items-center justify-center font-display transition-transform duration-700 group-hover:scale-110"
            style={{
              fontSize: size === 'lg' ? '6rem' : size === 'sm' ? '2.5rem' : '4rem',
              color: 'var(--color-gold)',
              opacity: 0.7,
              fontWeight: 400,
              letterSpacing: '-0.04em',
            }}
          >
            {initials}
          </span>
        </>
      )}

      {/* Overlay tinte azul que se va al hover (cuando hay foto) */}
      {member.photo && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            background:
              'linear-gradient(180deg, rgba(76,127,211,0.18) 0%, rgba(0,40,85,0.4) 100%)',
            mixBlendMode: 'multiply',
          }}
        />
      )}

      {/* Bandera origen sutil */}
      {member.origin && (
        <span className="absolute top-3 right-3 text-sm">
          {member.origin.split(' ')[0]}
        </span>
      )}

      {/* Dot indicator activo */}
      <span
        className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full"
        style={{
          background: 'var(--color-jade)',
          boxShadow: '0 0 6px var(--color-jade)',
        }}
      />
    </div>
  )
}
