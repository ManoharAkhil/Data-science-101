import { useRef } from 'react'
import { mockFloor } from '../content'
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../lib/motion'
import { RevealText, Reveal } from '../components/Reveal'

// The case reads left to right on a sticky rail: data, insight, move,
// result. The right column is the event itself, in the order a homebuyer
// walked it.
export default function MockFloor() {
  const root = useRef(null)

  useGSAP(
    () => {
      const steps = gsap.utils.toArray('[data-step]')
      const setActive = (i) => steps.forEach((s, k) => s.toggleAttribute('data-active', k === i))
      setActive(0)
      ScrollTrigger.create({
        trigger: '[data-walk]',
        start: 'top 60%',
        end: 'bottom 60%',
        onUpdate: (self) => setActive(Math.min(steps.length - 1, Math.floor(self.progress * steps.length))),
      })
      if (prefersReducedMotion()) return
      gsap.utils.toArray('[data-walk] figure').forEach((f) => {
        gsap.fromTo(f.querySelector('img'), { scale: 1.12 }, {
          scale: 1, ease: 'none',
          scrollTrigger: { trigger: f, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    },
    { scope: root }
  )

  return (
    <section ref={root} className="mx-auto max-w-[1400px] px-4 py-28 md:px-10 md:py-40">
      <p className="label">{mockFloor.kicker}. {mockFloor.date}</p>
      <RevealText className="display display-xl mt-4 max-w-[14ch]">
        {mockFloor.title} <em>{mockFloor.titleEm}</em>
      </RevealText>

      <div className="mt-16 grid gap-10 md:grid-cols-12">
        <ol className="md:sticky md:top-24 md:col-span-5 md:self-start">
          {mockFloor.steps.map((s, i) => (
            <li
              key={s.k}
              data-step
              className="group border-t border-line py-6 opacity-100 transition-opacity duration-500 md:opacity-40 md:data-[active]:opacity-100"
            >
              <p className="flex items-center gap-3 font-display text-sm font-medium text-amber">
                <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span>{s.k}
              </p>
              <p className="mt-3 text-lg leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>

        <div data-walk className="grid grid-cols-2 gap-3 md:col-span-7 md:col-start-6">
          {mockFloor.walk.map((w, i) => (
            <figure key={w.k} className={i % 2 ? 'md:mt-24' : ''}>
              <div className="media aspect-[9/14]"><img src={w.src} alt={`${w.k}. ${w.line}`} loading="lazy" /></div>
              <figcaption className="mt-3">
                <span className="block font-display font-medium">{w.k}</span>
                <span className="text-sm text-muted">{w.line}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-28">
        <RevealText as="h3" className="display display-md">In their words, on the day.</RevealText>
        <Reveal className="mt-8 grid gap-3 md:grid-cols-3" stagger={0.1}>
          {mockFloor.voices.map((v) => (
            <figure key={v.quote} data-reveal className="media relative aspect-[4/5]">
              <img src={v.src} alt="" loading="lazy" className="object-[50%_0%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-ground via-ground/40 to-transparent" />
              <blockquote className="absolute inset-x-0 bottom-0 p-6">
                <p className="display text-2xl leading-tight">&ldquo;{v.quote}&rdquo;</p>
                <p className="mt-2 text-sm text-muted">Homebuyer, mock floor launch</p>
              </blockquote>
            </figure>
          ))}
        </Reveal>
      </div>

      <Reveal className="mt-20">
        <figure>
          <div className="media media-zoom aspect-[16/9]"><img src={mockFloor.cta.src} alt="Experience the show floor, Egeira ad end card" loading="lazy" /></div>
          <figcaption className="label mt-3">{mockFloor.cta.label}</figcaption>
        </figure>
      </Reveal>
    </section>
  )
}
