import { useRef } from 'react'
import { journey } from '../content'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'

// Six eras, one pinned stage. Each anchor is set a little heavier than the
// last: Light for the first words, Bold for the whole system. The weight of
// the type is the weight of the work.
export default function Journey() {
  const root = useRef(null)
  const reduce = prefersReducedMotion()

  useGSAP(
    () => {
      if (reduce) return
      const chapters = gsap.utils.toArray('.chapter')
      const ticks = gsap.utils.toArray('.tick')
      const n = chapters.length
      gsap.set(chapters.slice(1), { autoAlpha: 0 })
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * (n - 0.3)}`,
          pin: true,
          scrub: 0.8,
          snap: { snapTo: 1 / (n - 1), duration: { min: 0.2, max: 0.6 }, ease: 'power2.inOut' },
          invalidateOnRefresh: true,
        },
      })
      for (let i = 1; i < n; i++) {
        const prev = chapters[i - 1]
        const next = chapters[i]
        const at = i - 1
        tl.to(prev.querySelectorAll('[data-part]'), { yPercent: -70, autoAlpha: 0, stagger: 0.04, duration: 0.45 }, at + 0.3)
          .set(prev, { autoAlpha: 0 }, at + 0.75)
          .set(next, { autoAlpha: 1 }, at + 0.75)
          .from(next.querySelectorAll('[data-part]'), { yPercent: 70, autoAlpha: 0, stagger: 0.05, duration: 0.5 }, at + 0.75)
          .to('.odometer', { yPercent: (-100 * i) / n, duration: 0.7, ease: 'expo.inOut' }, at + 0.5)
          .to(ticks[i], { scaleX: 1, duration: 0.35 }, at + 0.75)
      }
      tl.to('.finale-rule', { scaleX: 1, duration: 0.4 }, n - 1.1)
    },
    { scope: root }
  )

  if (reduce) {
    return (
      <section id="journey" className="mx-auto max-w-[1400px] px-4 py-32 md:px-10">
        <ol className="space-y-16">
          {journey.map((c) => (
            <li key={c.years}>
              <p className="label">{c.years}. {c.org}, {c.role}</p>
              <p className="display display-lg mt-3" style={{ fontWeight: c.weight }}>{c.anchor}</p>
              {c.thesis && <p className="mt-4 max-w-[60ch] text-muted">{c.thesis}</p>}
            </li>
          ))}
        </ol>
      </section>
    )
  }

  return (
    <section id="journey" ref={root} className="relative h-[100dvh] overflow-hidden">
      <div className="mx-auto grid h-full max-w-[1400px] grid-rows-[auto_1fr_auto] px-4 pb-10 pt-24 md:grid-cols-12 md:grid-rows-[1fr_auto] md:gap-10 md:px-10">
        <div className="md:col-span-4 md:self-center" aria-hidden="true">
          <div className="h-[0.86em] overflow-hidden font-display text-[clamp(4rem,9.6vw,10rem)] font-light leading-[0.86] tracking-[-0.05em]">
            <div className="odometer">
              {journey.map((c) => (
                <div key={c.years} className="h-[0.86em] bg-gradient-to-b from-amber/55 to-amber/0 bg-clip-text text-transparent">
                  {c.years.slice(0, 4)}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-4 md:col-span-8 md:mt-0 md:self-center">
          <div className="grid">
            {journey.map((c, i) => {
              const last = i === journey.length - 1
              return (
                <article key={c.years} className="chapter col-start-1 row-start-1" aria-label={`${c.years}, ${c.org}`}>
                  <div className="overflow-hidden">
                    <p data-part className="label">{c.years} <span className="mx-2 text-dim">/</span> {c.org}, {c.role}</p>
                  </div>
                  <div className="mt-4 overflow-hidden pb-3">
                    <p data-part className={`display ${last ? 'display-xl' : 'display-lg'}`} style={{ fontWeight: c.weight }}>
                      {last ? <>Started building the <em>whole system.</em></> : c.anchor}
                    </p>
                  </div>
                  {c.thesis && (
                    <div className="mt-5 overflow-hidden">
                      <p data-part className="max-w-[54ch] text-base leading-relaxed text-muted md:text-lg">{c.thesis}</p>
                    </div>
                  )}
                  {last && <div data-part className="finale-rule mt-8 h-[3px] w-40 origin-left scale-x-0 bg-amber" />}
                </article>
              )
            })}
          </div>
        </div>

        <div className="flex items-end gap-2 md:col-span-12" aria-hidden="true">
          {journey.map((c, i) => (
            <div key={c.years} className="flex-1">
              <div className="h-[3px] rounded-full bg-line">
                <div className={`tick h-full origin-left rounded-full bg-amber ${i === 0 ? '' : 'scale-x-0'}`} />
              </div>
              <p className="label mt-2 hidden md:block" style={{ fontWeight: c.weight }}>{c.org}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
