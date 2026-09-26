import { useRef } from 'react'
import { universe } from '../content'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'
import { RevealText } from '../components/Reveal'
import AssetSlot from '../components/AssetSlot'
import Compare from '../components/Compare'

// Vertical scroll becomes a walk: the viewer moves sideways through the
// touchpoints in the order a buyer meets them, and arrives at a built space.
export default function Universe() {
  const wrap = useRef(null)
  const track = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        const distance = () => track.current.scrollWidth - window.innerWidth
        const pan = gsap.to(track.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: wrap.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
        // each stop lifts slightly as it passes the centre of the viewport
        gsap.utils.toArray('.stop').forEach((el) => {
          gsap.fromTo(
            el.querySelector('.stop-art'),
            { y: 16, rotate: -1.5 },
            {
              y: -16,
              rotate: 1,
              ease: 'none',
              scrollTrigger: { trigger: el, containerAnimation: pan, start: 'left right', end: 'right left', scrub: true },
            }
          )
        })
      })
      return () => mm.revert()
    },
    { scope: wrap }
  )

  return (
    <section ref={wrap} className="relative overflow-hidden bg-bg-2 md:h-[100dvh]">
      <div
        ref={track}
        className="flex h-full snap-x snap-mandatory items-center gap-6 overflow-x-auto px-4 py-24 md:snap-none md:overflow-visible md:px-10 md:py-0"
      >
        <div className="w-[85vw] shrink-0 snap-start md:w-[36vw]">
          <RevealText className="display display-md">
            {universe.title} <em>{universe.titleEm}</em>
          </RevealText>
          <p className="mt-6 max-w-[36ch] text-muted">
            Each encounter carries the idea forward, from the first impression to the visit and the conversations that follow.
          </p>
        </div>

        {universe.stops.map((s, i) => (
          <article key={s.k} className="stop w-[80vw] shrink-0 snap-start md:w-[26vw]">
            <div className="stop-art overflow-hidden rounded-[20px]">
              <AssetSlot asset={{ label: s.asset, src: s.src }} ratio="1 / 1" />
            </div>
            <div className="mt-5 flex items-baseline gap-4">
              <span className="font-mono text-sm text-accent">{`0${i + 1}`}</span>
              <h3 className="display text-3xl">{s.k}</h3>
            </div>
            <p className="mt-2 text-muted">{s.items}</p>
            <p className="mt-1 text-ink">{s.line}</p>
          </article>
        ))}

        <article className="w-[90vw] shrink-0 snap-start md:w-[58vw] md:pr-10">
          <Compare before={universe.walkway.before} after={universe.walkway.after} />
          <h3 className="display display-sm mt-6">{universe.walkway.title}</h3>
          <p className="mt-2 max-w-[48ch] text-muted">{universe.walkway.line}</p>
        </article>
      </div>
    </section>
  )
}
