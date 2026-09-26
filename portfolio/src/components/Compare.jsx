import { useRef, useState } from 'react'
import { ArrowsLeftRight } from '@phosphor-icons/react'
import AssetSlot from './AssetSlot'

// Before/after reveal. Drag, click or use arrow keys; the handle is a real
// slider for keyboard and screen-reader users.
export default function Compare({ before, after }) {
  const box = useRef(null)
  const [pos, setPos] = useState(50)

  const fromEvent = (e) => {
    const r = box.current.getBoundingClientRect()
    setPos(Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)))
  }

  return (
    <div
      ref={box}
      data-cursor="Drag"
      className="relative aspect-[16/10] w-full touch-pan-y select-none overflow-hidden rounded-2xl"
      onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); fromEvent(e) }}
      onPointerMove={(e) => e.buttons === 1 && fromEvent(e)}
    >
      <div className="absolute inset-0">
        <AssetSlot asset={after} ratio="auto" className="h-full" />
      </div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <AssetSlot asset={before} ratio="auto" className="h-full !bg-bg-2" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 w-px bg-accent" style={{ left: `${pos}%` }} />
      <div
        role="slider"
        tabIndex={0}
        aria-label="Compare in progress and finished"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 5))
          if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 5))
        }}
        className="absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-accent-ink shadow-lg transition-transform active:scale-90"
        style={{ left: `${pos}%` }}
      >
        <ArrowsLeftRight size={20} weight="bold" />
      </div>
      <span className="absolute left-4 top-4 rounded-full bg-bg/80 px-3 py-1 text-xs backdrop-blur">In progress</span>
      <span className="absolute right-4 top-4 rounded-full bg-bg/80 px-3 py-1 text-xs backdrop-blur">Finished</span>
    </div>
  )
}
