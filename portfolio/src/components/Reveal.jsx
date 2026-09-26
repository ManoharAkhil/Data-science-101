import { useRef } from 'react'
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../lib/motion'

// Headline reveal: lines rise out of a mask, staggered, when scrolled into view.
export function RevealText({ as: Tag = 'h2', className = '', children, delay = 0, immediate = false }) {
  const ref = useRef(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      let split
      document.fonts.ready.then(() => {
        if (!ref.current) return
        split = SplitText.create(ref.current, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'line',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              rotate: 2,
              duration: 1.2,
              ease: 'expo.out',
              stagger: 0.09,
              delay,
              scrollTrigger: immediate ? undefined : { trigger: ref.current, start: 'top 85%', once: true },
            }),
        })
      })
      return () => split?.revert()
    },
    { scope: ref }
  )
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

// Generic fade-rise for blocks and staggered children ([data-reveal]).
export function Reveal({ as: Tag = 'div', className = '', children, stagger = 0.08, y = 28 }) {
  const ref = useRef(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const targets = ref.current.querySelectorAll('[data-reveal]')
      gsap.from(targets.length ? targets : ref.current, {
        y,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        stagger,
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      })
    },
    { scope: ref }
  )
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
