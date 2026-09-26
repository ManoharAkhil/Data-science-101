import { useRef } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { nav, site } from '../content'
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../lib/motion'
import { scrollToId } from './SmoothScroll'
import Magnetic from './Magnetic'

export default function Nav() {
  const bar = useRef(null)
  const progress = useRef(null)

  useGSAP(() => {
    // reading progress along the top edge
    gsap.to(progress.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    })
    if (prefersReducedMotion()) return
    // hide on the way down, return on the way up
    ScrollTrigger.create({
      start: 120,
      end: 'max',
      onUpdate: (self) =>
        gsap.to(bar.current, { yPercent: self.direction === 1 ? -110 : 0, duration: 0.5, ease: 'expo.out' }),
    })
  })

  const go = (id) => (e) => {
    e.preventDefault()
    scrollToId(id)
  }

  return (
    <>
      <div
        ref={progress}
        className="fixed inset-x-0 top-0 z-40 h-[2px] origin-left scale-x-0 bg-accent"
        aria-hidden="true"
      />
      <header ref={bar} className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-4 md:px-10">
          <a href="#top" onClick={go('top')} className="text-xl font-semibold tracking-tight" aria-label={`${site.name}, back to top`}>
            ma<span className="text-accent">.</span>
          </a>
          <nav aria-label="Main" className="hidden items-center gap-1 rounded-full bg-bg/70 p-1 shadow-[inset_0_0_0_1px_var(--color-line)] backdrop-blur-md md:flex">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={go(n.id)}
                className="rounded-full px-4 py-2 text-sm text-muted transition-colors duration-300 hover:bg-bg-3 hover:text-ink"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <Magnetic strength={0.25}>
            <a href="#contact" onClick={go('contact')} className="pill pill-accent !h-11 !px-5 text-sm">
              Let&rsquo;s talk <ArrowUpRight size={16} weight="bold" />
            </a>
          </Magnetic>
        </div>
      </header>
    </>
  )
}
