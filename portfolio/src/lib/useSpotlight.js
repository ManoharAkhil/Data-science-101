import { useCallback } from 'react'

// Writes pointer position into CSS vars for the .spotlight glow. No React
// state, so hovering never re-renders.
export default function useSpotlight() {
  return useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }, [])
}
