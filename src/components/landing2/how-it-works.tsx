'use client'

/**
 * HowItWorks v2 — Timeline horizontal de horas reales (9 AM → 5 PM)
 * Diseño único: cronología visible refuerza el "mismo día".
 * - Header editorial coherente con Lex/Features
 * - Stat hero "~8 horas" gigante
 * - Rail horizontal con tick marks por hora + 4 markers en horas reales
 * - Ripple wave secuencial recorriendo los markers
 * - Cards minimalistas alineadas debajo de cada hora
 * - Mobile: timeline vertical
 */

interface Step {
  n: string
  time: string
  duration: string
  title: string
  desc: string
  color: 'blue' | 'green' | 'gold' | 'red'
}

const STEPS: Step[] = [
  {
    n: '01',
    time: '9:00 AM',
    duration: '30 min',
    title: 'Pregunta si calificas',
    desc: 'Escribes por WhatsApp. En 30 min te decimos si tu caso es viable.',
    color: 'blue',
  },
  {
    n: '02',
    time: '10:00 AM',
    duration: '15 min',
    title: 'Activa tu plataforma',
    desc: 'Recibes acceso a la app. Plan de pago a tu medida.',
    color: 'green',
  },
  {
    n: '03',
    time: '10:30 AM',
    duration: '~4 hrs',
    title: 'Tú lo haces',
    desc: 'Llenas formularios desde tu celular. La plataforma valida y guarda.',
    color: 'gold',
  },
  {
    n: '04',
    time: '5:00 PM',
    duration: '30 min',
    title: 'Vanessa revisa',
    desc: 'En los momentos clave Vanessa interviene. Tú firmas. Caso enviado.',
    color: 'red',
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="hiw-section relative py-24 md:py-32 overflow-hidden">
      <div className="l2-container relative">
        {/* Header editorial */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <div className="hiw-kicker">
            <span aria-hidden className="hiw-kicker-bar" />
            <span className="hiw-kicker-text">Cómo funciona</span>
            <span aria-hidden className="hiw-kicker-num">05</span>
          </div>

          <h2 className="hiw-headline">
            <span className="hiw-headline-line hiw-headline-1">De click a caso activo</span>
            <span className="hiw-headline-line hiw-headline-2">
              el mismo <em>día</em>.
            </span>
          </h2>

          <div aria-hidden className="hiw-divider" />

          <p className="hiw-meta">
            <span>Empezar a 9:00 AM</span>
            <span className="hiw-meta-dot" />
            <span>Terminar a 5:30 PM</span>
            <span className="hiw-meta-dot" />
            <span>≈ 8 horas</span>
          </p>
        </div>

        {/* Timeline desktop */}
        <div className="hiw-timeline hiw-timeline-desktop">
          {/* Day endpoints — extremos del día + rail con gradient progress */}
          <div className="hiw-day-endpoints" aria-hidden>
            <span className="hiw-day-endpoint">9:00 AM</span>
            <div className="hiw-day-line-wrap">
              <span className="hiw-day-line" />
              <span className="hiw-progress-fill" />
            </div>
            <span className="hiw-day-endpoint hiw-day-endpoint-end">5:00 PM</span>
          </div>

          {/* Markers + cards */}
          <div className="hiw-grid">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className={`hiw-col hiw-col-${step.color}`}
                style={{ '--ripple-delay': `${i * 0.9}s` } as React.CSSProperties}
              >
                <div className="hiw-col-time-row">
                  <span className="hiw-col-time">{step.time}</span>
                  <span className="hiw-col-duration">· {step.duration}</span>
                </div>
                <div className="hiw-col-marker">
                  <span aria-hidden className="hiw-marker-dot" />
                  <span aria-hidden className="hiw-marker-ripple" />
                  <span aria-hidden className="hiw-marker-stem" />
                </div>
                <div className="hiw-card">
                  <span className="hiw-card-num">{step.n}</span>
                  <h3 className="hiw-card-title">{step.title}</h3>
                  <p className="hiw-card-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Timeline mobile — vertical */}
        <div className="hiw-timeline-mobile">
          <div aria-hidden className="hiw-mobile-rail" />
          {STEPS.map((step, i) => (
            <div
              key={i}
              className={`hiw-mobile-row hiw-col-${step.color}`}
              style={{ '--ripple-delay': `${i * 0.9}s` } as React.CSSProperties}
            >
              <div className="hiw-mobile-time">
                <span className="hiw-col-time">{step.time}</span>
                <span className="hiw-col-duration">{step.duration}</span>
              </div>
              <div className="hiw-mobile-marker">
                <span aria-hidden className="hiw-marker-dot" />
                <span aria-hidden className="hiw-marker-ripple" />
              </div>
              <div className="hiw-mobile-card">
                <span className="hiw-card-num">{step.n}</span>
                <h3 className="hiw-card-title">{step.title}</h3>
                <p className="hiw-card-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Styles />
    </section>
  )
}

function Styles() {
  return (
    <style jsx global>{`
      .hiw-section {
        position: relative;
      }
      .hiw-section::before {
        content: '';
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        height: 60%;
        background: radial-gradient(ellipse, rgba(91, 155, 255, 0.06) 0%, transparent 70%);
        pointer-events: none;
      }

      /* ─── HEADER ─── */
      .hiw-kicker {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 14px;
        margin-bottom: 38px;
      }
      .hiw-kicker-bar {
        display: inline-block;
        width: 56px;
        height: 1px;
        background: rgba(255, 255, 255, 0.30);
        animation: hiw-kicker-bar-in 1s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      @keyframes hiw-kicker-bar-in {
        from { width: 0; opacity: 0; }
        to   { opacity: 1; }
      }
      .hiw-kicker-text {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10.5px;
        font-weight: 500;
        letter-spacing: 0.35em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.55);
      }
      .hiw-kicker-num {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10.5px;
        font-weight: 500;
        letter-spacing: 0.18em;
        color: rgba(255, 255, 255, 0.28);
        font-variant-numeric: tabular-nums;
      }
      .hiw-headline {
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-size: clamp(2.4rem, 5.8vw, 4.6rem);
        line-height: 0.96;
        letter-spacing: -0.045em;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.96);
        display: flex;
        flex-direction: column;
        font-variation-settings: 'wdth' 95;
      }
      .hiw-headline-line {
        display: block;
        animation: hiw-headline-in 0.95s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      .hiw-headline-1 { animation-delay: 0.05s; }
      .hiw-headline-2 {
        animation-delay: 0.18s;
        color: var(--c-blue);
      }
      .hiw-headline-2 em {
        font-style: italic;
        font-weight: 400;
        font-variation-settings: 'wdth' 90;
        margin: 0 -0.02em;
      }
      @keyframes hiw-headline-in {
        from { opacity: 0; transform: translateY(14px); filter: blur(6px); }
        to   { opacity: 1; transform: translateY(0); filter: blur(0); }
      }
      .hiw-divider {
        margin: 28px auto 18px;
        width: 32px;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent);
      }
      .hiw-meta {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 14px;
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 11px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.42);
        flex-wrap: wrap;
      }
      .hiw-meta-dot {
        width: 2px;
        height: 2px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.30);
      }

      /* ─── TIMELINE DESKTOP ─── */
      .hiw-timeline-desktop {
        display: none;
        position: relative;
        padding: 40px 0 0;
      }
      @media (min-width: 768px) {
        .hiw-timeline-desktop { display: block; }
        .hiw-timeline-mobile { display: none; }
      }

      /* Day endpoints — extremos "9:00 AM" y "5:00 PM" + base line */
      .hiw-day-endpoints {
        position: relative;
        display: flex;
        align-items: center;
        gap: 14px;
        margin-bottom: 36px;
      }
      .hiw-day-endpoint {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 11px;
        letter-spacing: 0.18em;
        color: rgba(255, 255, 255, 0.48);
        font-variant-numeric: tabular-nums;
        font-weight: 600;
        flex-shrink: 0;
        width: 76px;
      }
      .hiw-day-endpoint-end { text-align: right; }
      .hiw-day-line-wrap {
        position: relative;
        flex: 1;
        height: 2px;
      }
      .hiw-day-line {
        position: absolute;
        inset: 0;
        height: 1px;
        top: 50%;
        margin-top: -0.5px;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.20) 0%,
          rgba(255, 255, 255, 0.20) 100%
        );
      }
      .hiw-progress-fill {
        position: absolute;
        inset: 0;
        height: 2px;
        top: 50%;
        margin-top: -1px;
        background: linear-gradient(
          90deg,
          rgba(91, 155, 255, 0.85) 0%,
          rgba(34, 255, 160, 0.85) 35%,
          rgba(242, 178, 52, 0.85) 65%,
          rgba(255, 77, 109, 0.85) 100%
        );
        transform-origin: left;
        animation: hiw-progress-grow 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
        box-shadow: 0 0 12px rgba(91, 155, 255, 0.3);
      }
      @keyframes hiw-progress-grow {
        from { transform: scaleX(0); }
        to   { transform: scaleX(1); }
      }

      /* Cards grid — alineado con la rail (mismo offset que endpoints + gap) */
      .hiw-grid {
        position: relative;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
        margin: 0 90px; /* 76px endpoint + 14px gap */
        z-index: 2;
      }
      .hiw-col {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        animation: hiw-col-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      .hiw-col:nth-child(1) { animation-delay: 0.4s; }
      .hiw-col:nth-child(2) { animation-delay: 0.55s; }
      .hiw-col:nth-child(3) { animation-delay: 0.7s; }
      .hiw-col:nth-child(4) { animation-delay: 0.85s; }
      @keyframes hiw-col-in {
        from { opacity: 0; transform: translateY(14px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      .hiw-col-time-row {
        display: flex;
        align-items: baseline;
        gap: 6px;
        margin-top: -28px;
        margin-bottom: 14px;
      }
      .hiw-col-time {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 12.5px;
        font-weight: 600;
        letter-spacing: 0.04em;
        font-variant-numeric: tabular-nums;
      }
      .hiw-col-blue  .hiw-col-time { color: #a8c4ff; }
      .hiw-col-green .hiw-col-time { color: #6effc7; }
      .hiw-col-gold  .hiw-col-time { color: #ffd17a; }
      .hiw-col-red   .hiw-col-time { color: #ff8fa6; }
      .hiw-col-duration {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10.5px;
        letter-spacing: 0.05em;
        color: rgba(255, 255, 255, 0.4);
      }

      /* Marker dot on timeline */
      .hiw-col-marker {
        position: relative;
        width: 16px;
        height: 16px;
        margin-bottom: 14px;
      }
      .hiw-marker-dot {
        position: absolute;
        inset: 2px;
        border-radius: 50%;
        box-shadow: 0 0 0 3px rgba(8, 8, 12, 1);
      }
      .hiw-col-blue  .hiw-marker-dot { background: var(--c-blue);  box-shadow: 0 0 0 3px rgba(8,8,12,1), 0 0 14px rgba(91,155,255,0.6); }
      .hiw-col-green .hiw-marker-dot { background: var(--c-green); box-shadow: 0 0 0 3px rgba(8,8,12,1), 0 0 14px rgba(34,255,160,0.6); }
      .hiw-col-gold  .hiw-marker-dot { background: var(--c-gold);  box-shadow: 0 0 0 3px rgba(8,8,12,1), 0 0 14px rgba(242,178,52,0.6); }
      .hiw-col-red   .hiw-marker-dot { background: var(--c-red);   box-shadow: 0 0 0 3px rgba(8,8,12,1), 0 0 14px rgba(255,77,109,0.6); }

      /* Ripple wave secuencial */
      .hiw-marker-ripple {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        border: 1.5px solid;
        opacity: 0;
        animation: hiw-ripple 3.6s ease-out infinite;
        animation-delay: var(--ripple-delay, 0s);
      }
      .hiw-col-blue  .hiw-marker-ripple { border-color: rgba(91, 155, 255, 0.7); }
      .hiw-col-green .hiw-marker-ripple { border-color: rgba(34, 255, 160, 0.7); }
      .hiw-col-gold  .hiw-marker-ripple { border-color: rgba(242, 178, 52, 0.7); }
      .hiw-col-red   .hiw-marker-ripple { border-color: rgba(255, 77, 109, 0.7); }
      @keyframes hiw-ripple {
        0%   { transform: scale(0.9); opacity: 0.85; }
        50%  { transform: scale(2.4); opacity: 0; }
        100% { transform: scale(2.4); opacity: 0; }
      }

      /* Stem (línea vertical desde el marker hacia la card) */
      .hiw-marker-stem {
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -0.5px;
        width: 1px;
        height: 12px;
        background: linear-gradient(180deg, currentColor, transparent);
        opacity: 0.4;
      }
      .hiw-col-blue  .hiw-marker-stem { color: var(--c-blue); }
      .hiw-col-green .hiw-marker-stem { color: var(--c-green); }
      .hiw-col-gold  .hiw-marker-stem { color: var(--c-gold); }
      .hiw-col-red   .hiw-marker-stem { color: var(--c-red); }

      /* Card minimal — sin glass, sin border (la jerarquía visual es la timeline) */
      .hiw-card {
        position: relative;
        max-width: 240px;
        padding: 6px 4px 0;
      }
      .hiw-card-num {
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10px;
        letter-spacing: 0.22em;
        color: rgba(255, 255, 255, 0.35);
        display: block;
        margin-bottom: 6px;
      }
      .hiw-card-title {
        font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
        font-size: 17.5px;
        font-weight: 600;
        letter-spacing: -0.02em;
        color: rgba(255, 255, 255, 0.96);
        margin-bottom: 6px;
        line-height: 1.15;
      }
      .hiw-card-desc {
        font-size: 12.5px;
        line-height: 1.45;
        color: rgba(255, 255, 255, 0.55);
      }

      /* Endpoints */
      .hiw-endpoints {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30px 8.5% 0;
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        font-size: 10px;
        letter-spacing: 0.2em;
      }
      .hiw-endpoint {
        color: var(--c-blue);
        opacity: 0.55;
      }
      .hiw-endpoint-done {
        color: var(--c-red);
      }

      /* ─── TIMELINE MOBILE ─── */
      .hiw-timeline-mobile {
        display: block;
        position: relative;
        padding-left: 56px;
      }
      @media (min-width: 768px) {
        .hiw-timeline-mobile { display: none; }
      }
      .hiw-mobile-rail {
        position: absolute;
        left: 22px;
        top: 12px;
        bottom: 12px;
        width: 1px;
        background: linear-gradient(
          180deg,
          rgba(91, 155, 255, 0.55),
          rgba(34, 255, 160, 0.55),
          rgba(242, 178, 52, 0.55),
          rgba(255, 77, 109, 0.55)
        );
      }
      .hiw-mobile-row {
        position: relative;
        display: grid;
        grid-template-columns: 1fr;
        margin-bottom: 28px;
        animation: hiw-col-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      .hiw-mobile-row:nth-child(2) { animation-delay: 0.1s; }
      .hiw-mobile-row:nth-child(3) { animation-delay: 0.2s; }
      .hiw-mobile-row:nth-child(4) { animation-delay: 0.3s; }
      .hiw-mobile-row:nth-child(5) { animation-delay: 0.4s; }
      .hiw-mobile-time {
        display: flex;
        align-items: baseline;
        gap: 8px;
        margin-bottom: 8px;
      }
      .hiw-mobile-marker {
        position: absolute;
        left: -46px;
        top: 0;
        width: 16px;
        height: 16px;
      }
      .hiw-mobile-card {
        padding: 0;
      }

      /* Reduced motion */
      @media (prefers-reduced-motion: reduce) {
        .hiw-kicker-bar,
        .hiw-headline-line,
        .hiw-progress-fill,
        .hiw-col,
        .hiw-mobile-row { animation: none; }
        .hiw-marker-ripple { animation: none; opacity: 0.3; }
      }
    `}</style>
  )
}
