import { useRef } from 'react'
import { capabilities } from '../content'
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from '../lib/motion'
import { RevealText, Reveal } from '../components/Reveal'

// The page's one marquee: breadth that does not need individual attention.
// Scroll direction steers it, so it feels attached to the reader's hand.
function Marquee({ words }) {
  const root = useRef(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const loop = gsap.to('.marquee-track', { xPercent: -50, duration: 40, ease: 'none', repeat: -1 })
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const v = self.getVelocity() / 300
          gsap.to(loop, { timeScale: self.direction * Math.max(1, Math.abs(v)), duration: 0.4, overwrite: true })
        },
      })
    },
    { scope: root }
  )
  const row = words.map((w) => (
    <span key={w} className="flex items-center gap-8 pr-8">
      <span className="display text-5xl md:text-7xl">{w}</span>
      <span className="h-3 w-3 rotate-45 bg-accent" aria-hidden="true" />
    </span>
  ))
  return (
    <div ref={root} className="overflow-hidden border-y border-line py-8" aria-hidden="true">
      <div className="marquee-track flex w-max">
        {row}
        {row}
      </div>
    </div>
  )
}

export default function Capabilities() {
  const all = capabilities.flatMap((c) => c.items)
  return (
    <section className="py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-4 md:px-10">
        <RevealText className="display display-md max-w-[14ch]">
          What I <em>take care of.</em>
        </RevealText>
      </div>
      <div className="mt-14">
        <Marquee words={all} />
      </div>
      <Reveal className="mx-auto mt-16 grid max-w-[1400px] gap-12 px-4 md:grid-cols-[1fr_1fr_1.3fr] md:px-10">
        {capabilities.map((c) => (
          <div key={c.group} data-reveal>
            <h3 className="text-lg font-medium text-accent">{c.group}</h3>
            <ul className="mt-4 space-y-2 text-muted">
              {c.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
