import { useRef } from 'react'
import { insights } from '../content'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'
import { RevealText, Reveal } from '../components/Reveal'
import useSpotlight from '../lib/useSpotlight'

const BARS = 56
// Bento spans: two wide, two narrow, alternating so the grid has rhythm.
const SPANS = ['md:col-span-4', 'md:col-span-2', 'md:col-span-2', 'md:col-span-4']
const TONES = ['surface', 'bg-accent text-accent-ink rounded-[20px]', 'surface', 'surface']

// Listening, made visible: the bars respond to the pointer like a level meter.
function Listening() {
  const root = useRef(null)
  useGSAP(
    () => {
      const bars = gsap.utils.toArray('.bar')
      if (prefersReducedMotion()) return
      const setters = bars.map((b) => gsap.quickTo(b, 'scaleY', { duration: 0.5, ease: 'power3' }))
      // idle breathing so the meter is never dead
      const idle = gsap.to(bars, {
        scaleY: () => 0.15 + Math.random() * 0.35,
        duration: 1.2,
        ease: 'sine.inOut',
        stagger: { each: 0.03, repeat: -1, yoyo: true },
      })
      const move = (e) => {
        idle.pause()
        const r = root.current.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width
        setters.forEach((set, i) => {
          const d = Math.abs(i / (BARS - 1) - x)
          set(Math.max(0.12, 1 - d * 4.5) + Math.random() * 0.08)
        })
      }
      const leave = () => idle.play()
      const el = root.current
      el.addEventListener('pointermove', move)
      el.addEventListener('pointerleave', leave)
      return () => {
        el.removeEventListener('pointermove', move)
        el.removeEventListener('pointerleave', leave)
      }
    },
    { scope: root }
  )
  return (
    <div ref={root} className="flex h-24 items-center gap-[3px] md:h-32" aria-hidden="true">
      {Array.from({ length: BARS }).map((_, i) => (
        <span key={i} className="bar h-full flex-1 origin-center scale-y-[0.2] rounded-full bg-accent/80" />
      ))}
    </div>
  )
}

export default function Insights() {
  const spot = useSpotlight()
  return (
    <section id="thinking" className="mx-auto max-w-[1400px] px-4 py-28 md:px-10 md:py-40">
      <RevealText className="display display-md">
        {insights.title} <em>{insights.titleEm}</em>
      </RevealText>
      <Reveal>
        <p className="mt-6 max-w-[48ch] text-lg text-muted">{insights.line}</p>
      </Reveal>

      <div className="mt-12">
        <Listening />
      </div>

      <Reveal className="mt-12 grid gap-4 md:grid-cols-6" stagger={0.1}>
        {insights.sources.map((s, i) => {
          const accent = i === 1
          return (
            <article
              key={s.k}
              data-reveal
              onPointerMove={spot}
              className={`${TONES[i]} ${SPANS[i]} spotlight flex min-h-[280px] flex-col justify-between gap-10 p-7 md:p-9`}
            >
              <p className={`text-sm font-medium ${accent ? '' : 'text-accent'}`}>{s.k}</p>
              <div>
                <h3 className="display text-2xl md:text-[2rem]">{s.q}</h3>
                <p className={`mt-4 max-w-[52ch] leading-relaxed ${accent ? 'text-accent-ink/80' : 'text-muted'}`}>{s.a}</p>
              </div>
            </article>
          )
        })}
      </Reveal>
    </section>
  )
}
