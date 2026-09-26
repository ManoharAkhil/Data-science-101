import { lazy, Suspense, useEffect, useRef } from 'react'
import { ArrowDownRight } from '@phosphor-icons/react'
import { hero, proof, atlas } from '../content'
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../lib/motion'
import { RevealText } from '../components/Reveal'
import Magnetic from '../components/Magnetic'
import FlipCard from '../components/FlipCard'
import { scrollToId } from '../components/SmoothScroll'

const LMotif = lazy(() => import('../components/LMotif'))

export default function Hero({ started }) {
  const root = useRef(null)
  const cards = useRef(null)
  const progress = useRef(prefersReducedMotion() ? 1 : 0) // 0 wall of people, 1 the L
  const spread = useRef(0)

  // assemble the L once the welcome has lifted
  useEffect(() => {
    if (!started || prefersReducedMotion()) return
    const tw = gsap.to(progress, { current: 1, duration: 3.2, ease: 'power2.inOut', delay: 0.5 })
    return () => tw.kill()
  }, [started])

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (s) => { spread.current = s.progress },
      })
      if (prefersReducedMotion()) return
      gsap.from('[data-hero-fade]', { opacity: 0, y: 24, duration: 1.2, ease: 'expo.out', stagger: 0.1, delay: 0.4 })
      // proof cards: rise in, then turn over one by one
      const els = gsap.utils.toArray('[data-flip-card]', cards.current)
      gsap.from(els, {
        y: 60, opacity: 0, rotateX: -25, duration: 1.1, ease: 'expo.out', stagger: 0.09,
        scrollTrigger: {
          trigger: cards.current, start: 'top 80%', once: true,
          onEnter: () => els.forEach((el, i) => setTimeout(() => el.click(), 900 + i * 260)),
        },
      })
    },
    { scope: root }
  )

  return (
    <section id="top" ref={root} className="relative">
      <div className="relative mx-auto grid min-h-[100dvh] max-w-[1400px] grid-rows-[1fr_auto] px-4 pb-10 pt-24 md:grid-cols-12 md:grid-rows-1 md:items-center md:gap-8 md:px-10 md:pb-0">
        <div className="relative z-10 order-2 mt-10 md:order-1 md:col-span-7 md:mt-0">
          <p data-hero-fade className="label mb-6">{hero.eyebrow}</p>
          <RevealText as="h1" immediate delay={0.2} className="display display-xl max-w-[13ch]">
            {hero.line1} <em>{hero.line2}</em> {hero.line3}
          </RevealText>
          <p data-hero-fade className="mt-7 max-w-[46ch] text-lg leading-relaxed text-muted">{hero.sub}</p>
          <div data-hero-fade className="mt-9">
            <Magnetic>
              <a href="#journey" onClick={(e) => { e.preventDefault(); scrollToId('journey') }} className="pill">
                See the work <ArrowDownRight size={18} weight="bold" />
              </a>
            </Magnetic>
          </div>
        </div>

        <figure className="relative order-1 h-[46dvh] md:order-2 md:col-span-5 md:h-[82dvh]">
          <Suspense fallback={null}>
            <LMotif progress={progress} spread={spread} atlasUrl={atlas} still={prefersReducedMotion()} />
          </Suspense>
          <figcaption data-hero-fade className="absolute -bottom-6 right-0 md:bottom-0 max-w-[26ch] text-right text-sm text-dim">
            {hero.lCaption}
          </figcaption>
        </figure>
      </div>

      <div ref={cards} className="mx-auto grid max-w-[1400px] grid-cols-1 gap-3 px-4 pb-24 pt-10 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
        {proof.map((p, i) => <FlipCard key={p.label} item={p} index={i} />)}
      </div>
    </section>
  )
}
