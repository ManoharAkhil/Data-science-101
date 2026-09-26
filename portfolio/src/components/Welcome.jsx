import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { site } from '../content'

// Weight as identity: the name steps Light, Regular, Medium, Bold,
// letter by letter, then the curtain lifts. Once per session.
const WEIGHTS = [300, 400, 500, 700]

export default function Welcome({ onDone }) {
  const root = useRef(null)
  const [show] = useState(() => {
    try {
      return !prefersReducedMotion() && !sessionStorage.getItem('welcomed')
    } catch {
      return !prefersReducedMotion()
    }
  })

  useEffect(() => {
    if (!show) { onDone(); return }
    try { sessionStorage.setItem('welcomed', '1') } catch { /* private mode */ }
    window.__lenis?.stop()
    const letters = root.current.querySelectorAll('[data-l]')
    const tl = gsap.timeline({
      onComplete: () => { window.__lenis?.start(); onDone() },
    })
    tl.from(letters, { yPercent: 110, duration: 0.8, ease: 'expo.out', stagger: 0.03 })
    WEIGHTS.slice(1).forEach((wt, i) => {
      tl.to(letters, { fontWeight: wt, duration: 0.01, stagger: 0.025 }, 0.55 + i * 0.28)
    })
    tl.to('[data-rule]', { scaleX: 1, duration: 0.9, ease: 'expo.inOut' }, 0.4)
      .to(root.current, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '+=0.25')
    return () => tl.kill()
  }, [show, onDone])

  if (!show) return null
  return (
    <div ref={root} className="fixed inset-0 z-50 flex items-center justify-center bg-ground" aria-hidden="true">
      <div>
        <p className="display flex overflow-hidden text-[clamp(2.4rem,8vw,7rem)]" style={{ fontWeight: 300 }}>
          {site.name.split('').map((ch, i) => (
            <span key={i} data-l className="inline-block" style={{ whiteSpace: 'pre' }}>{ch}</span>
          ))}
        </p>
        <div data-rule className="mt-4 h-[2px] origin-left scale-x-0 bg-amber" />
      </div>
    </div>
  )
}
