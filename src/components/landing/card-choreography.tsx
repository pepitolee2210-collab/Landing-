'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react'
import { MIGRATORY_CARDS, MigratoryCard } from './migratory-card'

/**
 * Choreografía de 7 cards scroll-driven, adaptación al contexto
 * migratorio del concepto "Pallet Ross / Awwwards":
 *
 *   Sección 1 (Hero): la card #1 entra desde abajo → vuela a la derecha
 *   → barre de derecha a izquierda dejando las otras 6 reveladas en abanico.
 *
 *   Sección 2 (Servicios cascada): al scrollear las 7 cards se recogen
 *   en una pila central, descienden, se despliegan en cascada diagonal
 *   y se "anclan" (lock) al posicionarse en su lugar final.
 *
 *   Mismo componente para ambos modos: las cards nunca se remontan.
 */

const CARD_SIZE = 220
const HERO_ROW_Y_RATIO = 0.62 // 62% del viewport height, donde se acomoda el fan

// Slots del abanico — coordenadas relativas al centro del viewport
const FAN_SLOTS = [
  { x: -380, y: 14, rotate: -16, scale: 0.86, z: 1 },
  { x: -240, y: 4,  rotate: -10, scale: 0.92, z: 2 },
  { x: -110, y: -2, rotate: -4,  scale: 0.96, z: 3 },
  { x: 0,    y: -8, rotate: 0,   scale: 1.0,  z: 4 },
  { x: 110,  y: -2, rotate: 5,   scale: 0.96, z: 3 },
  { x: 240,  y: 4,  rotate: 12,  scale: 0.92, z: 2 },
  { x: 380,  y: 14, rotate: 18,  scale: 0.86, z: 1 },
]

// Cascada diagonal de la sección 2
const CASCADE_SLOTS = Array.from({ length: 7 }, (_, i) => ({
  top: 60 + i * 64,
  left: 0 + i * 130,
  rotate: -4 + i * 2.2,
  z: 7 - i,
}))

const smoothEase = [0.22, 1, 0.36, 1] as const

export function CardChoreography({
  pageContainerRef,
}: {
  pageContainerRef: React.RefObject<HTMLDivElement | null>
}) {
  const [introDone, setIntroDone] = useState(false)
  const [vp, setVp] = useState({ w: 1280, h: 800 })
  const [lockProgress, setLockProgress] = useState(0.4)
  const [scrollableHeight, setScrollableHeight] = useState(0)

  // Tamaño del viewport
  useEffect(() => {
    const measure = () => setVp({ w: window.innerWidth, h: window.innerHeight })
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Mide dónde empieza la section "two" para calcular lockProgress
  useEffect(() => {
    if (!pageContainerRef.current) return
    const compute = () => {
      const container = pageContainerRef.current
      if (!container) return
      const containerRect = container.getBoundingClientRect()
      const containerTop = containerRect.top + window.scrollY
      const sh = container.scrollHeight - window.innerHeight
      setScrollableHeight(sh)
      const sectionTwo = container.querySelector('[data-section="two"]') as HTMLElement | null
      if (sectionTwo && sh > 0) {
        const sectionTwoTop = sectionTwo.getBoundingClientRect().top + window.scrollY
        const lp = Math.min(0.99, Math.max(0.05, (sectionTwoTop - containerTop) / sh))
        setLockProgress(lp)
      }
    }
    compute()
    const t = setTimeout(compute, 300)
    window.addEventListener('resize', compute)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', compute)
    }
  }, [pageContainerRef])

  const { scrollYProgress } = useScroll({
    target: pageContainerRef,
    offset: ['start start', 'end end'],
  })

  const [progress, setProgress] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setProgress(v))

  const isLocked = progress >= lockProgress
  const heroRowY = vp.h * HERO_ROW_Y_RATIO

  const wrapperStyle: React.CSSProperties = isLocked
    ? {
        position: 'absolute',
        top: lockProgress * scrollableHeight,
        left: 0,
        width: '100%',
        height: vp.h,
        zIndex: 5,
        pointerEvents: 'none',
      }
    : {
        position: 'fixed',
        inset: 0,
        zIndex: 5,
        pointerEvents: 'none',
      }

  // Lead card (idx 0) coreografía de entrada
  const leadIntro = {
    delay: 0.6,
    riseDuration: 0.72,
    rightDuration: 0.6,
    sweepDuration: 1.6,
  }
  const total = leadIntro.riseDuration + leadIntro.rightDuration + leadIntro.sweepDuration

  return (
    <div style={wrapperStyle}>
      {/* === INTRO mode === */}
      {!introDone && (
        <>
          {/* Cards 1..6 (idx 1..6) — fijos en sus slots, fade-in cuando la card 1 los pasa */}
          {MIGRATORY_CARDS.slice(1).map((card, i) => {
            const slot = FAN_SLOTS[i + 1]
            // Calcula delay del reveal por slot
            const sweepProgress =
              (FAN_SLOTS[i + 1].x - FAN_SLOTS[6].x) / (FAN_SLOTS[0].x - FAN_SLOTS[6].x)
            const revealDelay =
              leadIntro.delay +
              leadIntro.riseDuration +
              leadIntro.rightDuration +
              sweepProgress * leadIntro.sweepDuration
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: i < 3 ? 0.18 : 0.06,
                  delay: revealDelay,
                  ease: 'easeOut',
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: CARD_SIZE,
                  height: CARD_SIZE + 60,
                  x: vp.w / 2 + slot.x - CARD_SIZE / 2,
                  y: heroRowY + slot.y - (CARD_SIZE + 60) / 2,
                  rotate: slot.rotate,
                  scale: slot.scale,
                  zIndex: slot.z,
                }}
              >
                <MigratoryCard data={card} />
              </motion.div>
            )
          })}

          {/* Lead card — la #1 con choreografía completa */}
          <motion.div
            initial={{
              x: vp.w / 2 - CARD_SIZE / 2,
              y: vp.h / 2 + 180,
              rotate: 0,
              scale: 0.3,
              opacity: 0,
            }}
            animate={{
              x: [
                vp.w / 2 - CARD_SIZE / 2,
                vp.w / 2 - CARD_SIZE / 2,
                vp.w / 2 + FAN_SLOTS[6].x - CARD_SIZE / 2,
                vp.w / 2 + FAN_SLOTS[0].x - CARD_SIZE / 2,
              ],
              y: [
                vp.h / 2 + 180,
                heroRowY - (CARD_SIZE + 60) / 2,
                heroRowY + FAN_SLOTS[6].y - (CARD_SIZE + 60) / 2,
                heroRowY + FAN_SLOTS[0].y - (CARD_SIZE + 60) / 2,
              ],
              rotate: [0, 0, FAN_SLOTS[6].rotate, FAN_SLOTS[0].rotate],
              scale: [0.3, 1, FAN_SLOTS[6].scale, FAN_SLOTS[0].scale],
              opacity: [0, 1, 1, 1],
            }}
            transition={{
              duration: total,
              delay: leadIntro.delay,
              times: [
                0,
                leadIntro.riseDuration / total,
                (leadIntro.riseDuration + leadIntro.rightDuration) / total,
                1,
              ],
              ease: smoothEase,
            }}
            onAnimationComplete={() => setIntroDone(true)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: CARD_SIZE,
              height: CARD_SIZE + 60,
              zIndex: 10,
            }}
          >
            <MigratoryCard data={MIGRATORY_CARDS[0]} />
          </motion.div>
        </>
      )}

      {/* === SCROLL-LINKED mode === */}
      {introDone && (
        <ScrollLinkedDeck
          scrollYProgress={scrollYProgress}
          lockProgress={lockProgress}
          vp={vp}
          heroRowY={heroRowY}
        />
      )}
    </div>
  )
}

/**
 * Una vez intro completa, las cards transitan por scroll:
 * fan → stack centrado → descenso → cascada diagonal lockeada.
 */
function ScrollLinkedDeck({
  scrollYProgress,
  lockProgress,
  vp,
  heroRowY,
}: {
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
  lockProgress: number
  vp: { w: number; h: number }
  heroRowY: number
}) {
  const lp = Math.max(lockProgress, 0.05)
  const p1 = lp * 0.33
  const p2 = lp * 0.66

  return (
    <>
      {MIGRATORY_CARDS.map((card, i) => (
        <ScrollLinkedCard
          key={card.id}
          index={i}
          card={card}
          scrollYProgress={scrollYProgress}
          lp={lp}
          p1={p1}
          p2={p2}
          vp={vp}
          heroRowY={heroRowY}
        />
      ))}
    </>
  )
}

function ScrollLinkedCard({
  index,
  card,
  scrollYProgress,
  lp,
  p1,
  p2,
  vp,
  heroRowY,
}: {
  index: number
  card: (typeof MIGRATORY_CARDS)[number]
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
  lp: number
  p1: number
  p2: number
  vp: { w: number; h: number }
  heroRowY: number
}) {
  // Clamp para que se "congele" al llegar a lockProgress
  const clamped = useTransform(scrollYProgress, (v) => Math.min(v, lp))

  const slot = FAN_SLOTS[index]
  const cascade = CASCADE_SLOTS[index]

  const s1Cx = vp.w / 2 + slot.x
  const s1Cy = heroRowY + slot.y
  const stackCx = vp.w / 2
  const stackCy = vp.h / 2
  const cascadeOriginLeft = vp.w * 0.42
  const s2Cx = cascadeOriginLeft + cascade.left + CARD_SIZE / 2
  const s2Cy = cascade.top + CARD_SIZE / 2 + 120

  const x = useTransform(clamped, [0, p1, p2, lp], [s1Cx, stackCx, stackCx, s2Cx])
  const y = useTransform(clamped, [0, p1, p2, lp], [s1Cy, stackCy, s2Cy, s2Cy])
  const rotate = useTransform(clamped, [0, p1, lp], [slot.rotate, 0, cascade.rotate])
  const scale = useTransform(clamped, [0, p1, lp], [slot.scale, 1, 1])

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: CARD_SIZE,
        height: CARD_SIZE + 60,
        x,
        y,
        rotate,
        scale,
        translateX: '-50%',
        translateY: '-50%',
        zIndex: cascade.z,
      }}
    >
      <MigratoryCard data={card} />
    </motion.div>
  )
}
