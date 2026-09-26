import { forwardRef, useState } from 'react'
import { ArrowsClockwise } from '@phosphor-icons/react'

// A physical card: the claim on the front, the proof on the back.
// Flips on its own when first seen, and again on every tap.
const FlipCard = forwardRef(function FlipCard({ item, index }, ref) {
  const [flipped, setFlipped] = useState(false)
  return (
    <button
      ref={ref}
      type="button"
      data-flip-card
      data-cursor="Flip"
      className="flip block h-[220px] w-full text-left md:h-[260px]"
      data-flipped={flipped}
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={`${item.label}: ${item.value}. ${item.detail}`}
    >
      <span className="flip-inner block">
        <span className="flip-face flex flex-col justify-between bg-ground-2 p-6 shadow-[inset_0_0_0_1px_var(--color-line)]">
          <span className="label">{String(index + 1).padStart(2, '0')}</span>
          <span>
            <span className="display block text-2xl md:text-3xl">{item.label}</span>
            <span className="mt-3 inline-flex items-center gap-2 text-sm text-muted">
              <ArrowsClockwise size={14} /> Tap to reveal
            </span>
          </span>
        </span>
        <span className="flip-face flip-back flex flex-col justify-between bg-amber p-6 text-amber-ink">
          <span className="display block text-6xl font-bold tabular-nums md:text-7xl">{item.value}</span>
          <span className="text-[0.95rem] leading-snug">{item.detail}</span>
        </span>
      </span>
    </button>
  )
})

export default FlipCard
