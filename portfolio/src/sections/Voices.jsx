import { useRef } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
import { voices, atlas } from '../content'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'
import { RevealText, Reveal } from '../components/Reveal'

// The same L as the hero, built in the page itself: scattered faces scrub
// into the letterform as you scroll. One principle, two materials.
const cells = []
for (let r = 6; r >= 0; r--) for (let c = 0; c < 5; c++) if (c < 2 || r < 2) cells.push({ c, r })

export default function Voices() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const tiles = gsap.utils.toArray('[data-tile]')
      gsap.from(tiles, {
        x: () => gsap.utils.random(-260, 260),
        y: () => gsap.utils.random(-200, 200),
        rotate: () => gsap.utils.random(-35, 35),
        scale: 0.6,
        opacity: 0,
        ease: 'power2.out',
        stagger: { each: 0.02, from: 'random' },
        scrollTrigger: { trigger: '[data-l]', start: 'top 85%', end: 'center 55%', scrub: 1 },
      })
      gsap.from('[data-chamfer]', {
        scaleX: 0, ease: 'none',
        scrollTrigger: { trigger: '[data-l]', start: 'center 65%', end: 'center 50%', scrub: 1 },
      })
    },
    { scope: root }
  )

  return (
    <section ref={root} className="bg-ground-2 py-28 md:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-4 md:grid-cols-12 md:items-center md:px-10">
        <div className="md:col-span-6">
          <RevealText className="display display-lg">
            {voices.title} <em>{voices.titleEm}</em>
          </RevealText>
          <Reveal><p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted">{voices.line}</p></Reveal>
          <Reveal className="mt-10 flex flex-wrap items-center gap-2" stagger={0.06}>
            {voices.steps.map((s, i) => (
              <span key={s} data-reveal className="flex items-center gap-2">
                <span className="rounded-full bg-ground-3 px-4 py-2 font-display text-sm">{s}</span>
                {i < voices.steps.length - 1 && <ArrowRight size={14} className="text-amber" />}
              </span>
            ))}
          </Reveal>
          <p className="label mt-5">{voices.langs}</p>
          <p className="mt-6 max-w-[46ch] text-sm text-dim">{voices.consent}</p>
        </div>

        <div className="flex justify-center md:col-span-6">
          <div data-l className="relative grid w-[min(78vw,420px)] grid-cols-5 gap-[5px]" role="img" aria-label="The Levonor L built from homebuyer portraits">
            {cells.map(({ c, r }, i) => {
              const cell = (i * 7) % 16
              const chamfer = c === 0 && r === 0
              return (
                <div
                  key={`${c}-${r}`}
                  data-tile
                  className="relative aspect-square rounded-[3px] bg-ground-3"
                  style={{
                    gridColumn: c + 1,
                    gridRow: 7 - r,
                    backgroundImage: `url(${atlas})`,
                    backgroundSize: '400% 400%',
                    backgroundPosition: `${(cell % 4) * 33.333}% ${Math.floor(cell / 4) * 33.333}%`,
                    clipPath: chamfer ? 'polygon(0 0, 100% 0, 100% 100%)' : undefined,
                  }}
                >
                  {chamfer && (
                    <span data-chamfer className="absolute left-0 top-0 h-[2px] w-[141%] origin-top-left rotate-45 bg-amber" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
