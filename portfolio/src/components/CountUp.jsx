import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'

// Counts from zero when scrolled into view. The final value is in the markup,
// so screen readers and no-JS readers always get the real number.
export default function CountUp({ value, suffix = '', className = '' }) {
  const ref = useRef(null)
  const fmt = (n) => Math.round(n).toLocaleString('en-IN')
  useGSAP(() => {
    if (prefersReducedMotion()) return
    const obj = { n: 0 }
    gsap.to(obj, {
      n: value,
      duration: 2,
      ease: 'expo.out',
      scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      onUpdate: () => {
        if (ref.current) ref.current.firstChild.textContent = fmt(obj.n)
      },
    })
  })
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      <span>{fmt(value)}</span>
      {suffix && <span className="text-accent">{suffix}</span>}
    </span>
  )
}
