import { useRef } from 'react'
import { tour } from '../content'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'
import { RevealText } from '../components/Reveal'

// Vertical scroll becomes a walk: the touchpoints in the order a buyer
// meets them. On phones it is a swipe row with a visible cue.
export default function Tour() {
  const wrap = useRef(null)
  const track = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        const distance = () => track.current.scrollWidth - window.innerWidth
        gsap.to(track.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: wrap.current, start: 'top top', end: () => `+=${distance()}`,
            pin: true, scrub: 1, invalidateOnRefresh: true,
          },
        })
      })
      return () => mm.revert()
    },
    { scope: wrap }
  )

  return (
    <section ref={wrap} className="relative overflow-hidden bg-ground-2 md:h-[100dvh]">
      <div ref={track} className="edge-fade flex h-full snap-x snap-mandatory scroll-pl-4 items-center gap-5 overflow-x-auto px-4 py-24 md:snap-none md:overflow-visible md:px-10 md:py-0">
        <div className="w-[82vw] shrink-0 snap-start md:w-[34vw]">
          <RevealText className="display display-lg">
            {tour.title} <em>{tour.titleEm}</em>
          </RevealText>
          <p className="label mt-6 md:hidden">Swipe to walk through</p>
        </div>
        {tour.stops.map((s, i) => (
          <figure key={s.k} className="w-[74vw] shrink-0 snap-start md:w-[27vw]">
            <div className="media aspect-[4/5]"><img src={s.src} alt={s.k} loading="lazy" className={s.src.includes('reel') ? 'object-[50%_30%]' : s.src.includes('canopy') ? 'object-[28%_50%]' : ''} /></div>
            <figcaption className="mt-4">
              <span className="flex items-baseline gap-3">
                <span className="font-display text-sm tabular-nums text-amber">{String(i + 1).padStart(2, '0')}</span>
                <span className="display text-2xl">{s.k}</span>
              </span>
              <span className="mt-1 block text-muted">{s.line}</span>
            </figcaption>
          </figure>
        ))}
        <figure className="w-[88vw] shrink-0 snap-start md:w-[52vw] md:pr-10">
          <div className="media aspect-[16/9]"><img src={tour.walkway.src} alt="Canopy walkway, full run" loading="lazy" /></div>
          <figcaption className="label mt-4">{tour.walkway.label}</figcaption>
        </figure>
      </div>
    </section>
  )
}
