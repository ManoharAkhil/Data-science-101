import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'

// Two-part cursor: a precise dot plus a lagging ring. Elements opt in to a
// contextual label with data-cursor="View" (or Drag, Copy, Open...).
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const label = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine || prefersReducedMotion()) return
    document.documentElement.classList.add('has-cursor')

    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.08, ease: 'power3' })
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.08, ease: 'power3' })
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' })
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' })

    let state = ''
    let onLime = false
    const setState = (next, text = '', lime = false) => {
      if (next === state && lime === onLime) return
      state = next
      onLime = lime
      const fill = lime ? '#0e100c' : '#d4ff3f'
      label.current.style.color = lime ? '#d4ff3f' : '#0e100c'
      dot.current.style.backgroundColor = lime ? '#0e100c' : '#d4ff3f'
      label.current.textContent = text
      gsap.to(ring.current, {
        scale: next === 'label' ? 2.6 : next === 'link' ? 1.6 : 1,
        backgroundColor: next === 'label' ? fill : 'rgba(0,0,0,0)',
        borderColor: next ? fill : lime ? 'rgba(14,16,12,0.45)' : 'rgba(236,239,227,0.45)',
        duration: 0.45,
        ease: 'expo.out',
      })
      gsap.to(label.current, { opacity: next === 'label' ? 1 : 0, duration: 0.2 })
      gsap.to(dot.current, { scale: next ? 0 : 1, duration: 0.3 })
    }

    const root = dot.current.parentElement
    const move = (e) => {
      root.style.opacity = 1
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY)
      const lime = !!e.target.closest?.('#contact')
      const t = e.target.closest?.('[data-cursor], a, button, [role="tab"]')
      if (!t) return setState('', '', lime)
      const text = t.getAttribute('data-cursor')
      setState(text ? 'label' : 'link', text || '', lime)
    }
    const down = () => gsap.to(ring.current, { scale: '-=0.25', duration: 0.15 })
    const up = () => { const s = state; state = '__'; setState(s, label.current.textContent, onLime) }
    const leave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.2 })
    const enter = () => gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.2 })

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    document.addEventListener('pointerleave', leave)
    document.addEventListener('pointerenter', enter)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      document.removeEventListener('pointerleave', leave)
      document.removeEventListener('pointerenter', enter)
    }
  }, [])

  return (
    <div className="cursor pointer-events-none fixed inset-0 z-[60] opacity-0" aria-hidden="true">
      <div ref={dot} className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-accent" />
      <div
        ref={ring}
        className="absolute -left-5 -top-5 flex h-10 w-10 items-center justify-center rounded-full border border-ink/45"
      >
        <span
          ref={label}
          className="font-mono text-[5px] font-bold uppercase tracking-wider text-accent-ink opacity-0"
        />
      </div>
    </div>
  )
}
