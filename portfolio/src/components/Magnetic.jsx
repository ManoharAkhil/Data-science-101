import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'

// Pulls its child toward the pointer and springs back on leave. Also feeds
// --fx/--fy so .pill fills flood in from the side the cursor entered.
export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!el || !fine || prefersReducedMotion()) return
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - (r.left + r.width / 2)
      const y = e.clientY - (r.top + r.height / 2)
      xTo(x * strength); yTo(y * strength)
      const inner = el.firstElementChild
      inner?.style.setProperty('--fx', `${e.clientX - r.left}px`)
      inner?.style.setProperty('--fy', `${e.clientY - r.top}px`)
    }
    const leave = () => { xTo(0); yTo(0) }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [strength])
  return (
    <span ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </span>
  )
}
