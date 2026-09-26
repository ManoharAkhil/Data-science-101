import { lazy, Suspense, useRef } from 'react'
import { ArrowDownRight } from '@phosphor-icons/react'
import { hero } from '../content'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'
import { RevealText } from '../components/Reveal'
import Magnetic from '../components/Magnetic'
import { scrollToId } from '../components/SmoothScroll'

const HeroScene = lazy(() => import('../components/HeroScene'))

export default function Hero() {
  const root = useRef(null)
  const progress = useRef(0) // 0 at rest, 1 once the hero has scrolled away

  useGSAP(
    () => {
      gsap.to(progress, {
        current: 1,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      if (prefersReducedMotion()) return
      gsap.from('[data-hero-fade]', { opacity: 0, y: 20, duration: 1.2, ease: 'expo.out', stagger: 0.1, delay: 0.5 })
      gsap.from('.hero-canvas', { opacity: 0, scale: 0.85, duration: 2.2, ease: 'expo.out', delay: 0.2 })
      // copy drifts up slower than the page: a quiet parallax that gives depth
      gsap.to('.hero-copy', {
        yPercent: -18,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    },
    { scope: root }
  )

  return (
    <section id="top" ref={root} className="relative flex min-h-[100dvh] items-end overflow-hidden pb-16 md:items-center md:pb-0">
      <div
        className="hero-canvas absolute inset-x-0 top-0 h-[58%] md:inset-y-0 md:left-[40%] md:h-auto"
        style={{ background: 'radial-gradient(40% 45% at 60% 50%, rgb(212 255 63 / 0.08), transparent 70%)' }}
      >
        <Suspense fallback={null}>
          <HeroScene progress={progress} still={prefersReducedMotion()} />
        </Suspense>
      </div>

      <div className="hero-copy pointer-events-none relative mx-auto w-full max-w-[1400px] px-4 pt-24 md:px-10">
        <p data-hero-fade className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          {hero.eyebrow}
        </p>
        <RevealText as="h1" immediate delay={0.3} className="display display-lg max-w-[11ch]">
          {hero.line1} <em>{hero.line2}</em>
        </RevealText>
        <p data-hero-fade className="mt-8 max-w-[34ch] text-lg leading-relaxed text-muted md:text-xl">
          {hero.sub}
        </p>
        <div data-hero-fade className="pointer-events-auto mt-10 flex flex-wrap items-center gap-3">
          <Magnetic>
            <a
              href="#journey"
              onClick={(e) => { e.preventDefault(); scrollToId('journey') }}
              className="pill"
            >
              See how I think <ArrowDownRight size={18} weight="bold" />
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
