import { useRef } from 'react'
import { journey } from '../content'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'

// Pinned chapter sequence. Early waypoints are deliberately spare: one anchor,
// one thesis, lots of air. The year rolls like an odometer; the last chapter
// changes register and hands off to the work.
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
          end: () => `+=${window.innerHeight * (n - 0.2)}`,
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
        tl.to(prev.querySelectorAll('[data-part]'), { yPercent: -60, autoAlpha: 0, stagger: 0.04, duration: 0.45 }, at + 0.3)
          .set(prev, { autoAlpha: 0 }, at + 0.75)
          .set(next, { autoAlpha: 1 }, at + 0.75)
          .from(next.querySelectorAll('[data-part]'), { yPercent: 60, autoAlpha: 0, stagger: 0.05, duration: 0.5 }, at + 0.75)
          .to('.odometer', { yPercent: (-100 * i) / n, duration: 0.7, ease: 'expo.inOut' }, at + 0.5)
          .to(ticks[i], { backgroundColor: '#d4ff3f', scaleY: 1, duration: 0.3 }, at + 0.8)
      }
      // finale: the last line grows into the next section
      tl.to('.finale-rule', { scaleX: 1, duration: 0.4 }, n - 1.1)
      tl.to('.chapter:last-child .anchor', { scale: 1.04, duration: 0.4 }, n - 1.1)
    },
    { scope: root }
  )

  if (reduce) {
    return (
      <section id="journey" className="mx-auto max-w-[1400px] px-4 py-32 md:px-10">
        <ol className="space-y-16">
          {journey.map((c) => (
            <li key={c.years}>
              <p className="font-mono text-sm text-muted">{c.years}. {c.role}</p>
              <p className="display display-md mt-3">{c.anchor}</p>
              {c.thesis && <p className="mt-4 max-w-[60ch] text-muted">{c.thesis}</p>}
            </li>
          ))}
        </ol>
      </section>
    )
  }

  return (
    <section id="journey" ref={root} className="relative h-[100dvh] overflow-hidden">
      <div className="mx-auto grid h-full max-w-[1400px] grid-rows-[auto_1fr_auto] px-4 pb-10 pt-28 md:grid-cols-12 md:grid-rows-[1fr_auto] md:gap-10 md:px-10 md:pt-24">
        {/* odometer year */}
        <div className="md:col-span-5 md:self-center" aria-hidden="true">
          <div className="h-[0.9em] overflow-hidden text-[clamp(4rem,16vw,15rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-bg-3 [font-variation-settings:'wdth'_75]">
            <div className="odometer">
              {journey.map((c) => (
                <div key={c.years} className="h-[0.9em] bg-gradient-to-b from-accent/45 to-accent/0 bg-clip-text text-transparent">
                  {c.start}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* chapters, stacked in one cell */}
        <div className="relative mt-6 md:col-span-7 md:mt-0 md:self-center">
          <div className="grid">
            {journey.map((c, i) => {
              const last = i === journey.length - 1
              return (
                <article key={c.years} className="chapter col-start-1 row-start-1" aria-label={`${c.years}, ${c.role}`}>
                  <div className="overflow-hidden">
                    <p data-part className="font-mono text-sm text-muted">
                      {c.years} <span className="mx-2 text-dim">/</span> {c.role}
                    </p>
                  </div>
                  <div className="mt-4 overflow-hidden pb-4 md:mt-5">
                    <p data-part className={`anchor display origin-left ${last ? 'display-lg' : 'display-md'}`}>
                      {last ? (
                        <>Started building the <em>whole system.</em></>
                      ) : (
                        c.anchor
                      )}
                    </p>
                  </div>
                  {c.thesis && (
                    <div className="mt-6 overflow-hidden">
                      <p data-part className="max-w-[52ch] text-base leading-relaxed text-muted md:text-lg">
                        {c.thesis}
                      </p>
                    </div>
                  )}
                  {last && (
                    <div data-part className="finale-rule mt-8 h-[3px] w-40 origin-left scale-x-0 bg-accent" />
                  )}
                </article>
              )
            })}
          </div>
        </div>

        {/* progress ticks */}
        <div className="flex items-end gap-2 md:col-span-12" aria-hidden="true">
          {journey.map((c, i) => (
            <div key={c.years} className="flex-1">
              <div className={`tick h-[3px] origin-bottom rounded-full ${i === 0 ? 'bg-accent' : 'bg-line'}`} />
              <p className="mt-2 hidden font-mono text-xs text-dim md:block">{c.years}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
