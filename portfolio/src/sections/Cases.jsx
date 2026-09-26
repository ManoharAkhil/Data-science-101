import { useRef } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
import { cases, site } from '../content'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'
import { RevealText } from '../components/Reveal'
import CountUp from '../components/CountUp'
import AssetSlot from '../components/AssetSlot'
import useSpotlight from '../lib/useSpotlight'

const FLOW = [
  ['data', 'The data'],
  ['insight', 'The insight'],
  ['move', 'The move'],
]

function Extra({ c }) {
  if (c.sequence)
    return (
      <ol className="grid gap-2 sm:grid-cols-3">
        {c.sequence.map((s, i) => (
          <li key={s} className="rounded-2xl bg-bg-3 p-4 text-sm leading-snug text-muted">
            <span className="mb-2 block font-mono text-xs text-accent">{`0${i + 1}`}</span>
            {s}
          </li>
        ))}
      </ol>
    )
  if (c.axes)
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {c.assets.map((a) => (
          <div key={a.label} className="overflow-hidden rounded-2xl">
            <AssetSlot asset={a} ratio="16 / 7" />
          </div>
        ))}
        <ul className="flex flex-wrap gap-2 sm:col-span-2">
          {c.axes.map((a) => (
            <li key={a} className="rounded-full px-3 py-1.5 text-xs text-muted shadow-[inset_0_0_0_1px_var(--color-line)]">
              {a}
            </li>
          ))}
          <li className="px-1 py-1.5 text-xs text-dim">and three more</li>
        </ul>
      </div>
    )
  if (c.steps)
    return (
      <ol className="flex flex-wrap items-center gap-2">
        {c.steps.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span className="rounded-full bg-bg-3 px-4 py-2 text-sm">{s}</span>
            {i < c.steps.length - 1 && <ArrowRight size={14} className="text-accent" />}
          </li>
        ))}
        <li className="ml-2 font-mono text-xs text-dim">EN / HI / TE</li>
      </ol>
    )
  return null
}

function CaseCard({ c, index, total }) {
  const spot = useSpotlight()
  const result = c.resultInternal && site.showInternalMetrics ? c.resultInternal : c.resultPublic
  return (
    <article
      onPointerMove={spot}
      className="case-card surface spotlight mx-auto flex w-full max-w-[1400px] flex-col gap-8 p-6 md:min-h-[82dvh] md:p-12"
      aria-label={c.title}
    >
      <header className="flex flex-wrap items-baseline justify-between gap-4">
        <h3 className="display display-sm max-w-[18ch]">{c.title}</h3>
        <p className="font-mono text-xs text-dim">
          {c.kicker} <span className="mx-1">/</span> {index + 1} of {total}
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3 md:gap-8">
        {FLOW.map(([key, label], i) => (
          <div key={key} className="relative border-t border-line pt-4">
            <p className="mb-3 text-sm font-medium text-accent">{label}</p>
            <p className={`leading-relaxed ${i === 2 ? 'text-ink' : 'text-muted'}`}>{c[key]}</p>
          </div>
        ))}
      </div>

      <Extra c={c} />

      <footer className="mt-auto grid items-end gap-8 border-t border-line pt-6 md:grid-cols-[auto_1fr]">
        <div className="flex flex-wrap gap-10">
          {c.stats.map((s, i) => (
            <div key={s.label} className="flex items-end gap-10">
              {c.id === 'recall' && i === 1 && <ArrowRight size={28} className="mb-4 text-accent" aria-label="grew to" />}
              <div>
                <CountUp value={s.value} suffix={s.suffix} className="display block text-5xl md:text-7xl" />
                <p className="mt-1 text-sm text-muted">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="max-w-[46ch] text-ink md:justify-self-end md:text-right">
          <span className="mb-1 block text-sm font-medium text-accent">The result</span>
          {result}
        </p>
      </footer>
    </article>
  )
}

export default function Cases() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        const cards = gsap.utils.toArray('.case-wrap')
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return
          gsap.to(card.firstElementChild, {
            scale: 0.9,
            opacity: 0.35,
            ease: 'none',
            scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top top', scrub: true },
          })
        })
      })
      return () => mm.revert()
    },
    { scope: root }
  )

  return (
    <section ref={root} className="px-4 py-28 md:px-10 md:py-40">
      <div className="mx-auto mb-16 max-w-[1400px]">
        <RevealText className="display display-md">
          The choices. <em>The consequences.</em>
        </RevealText>
      </div>
      <div>
        {cases.map((c, i) => (
          <div key={c.id} className="case-wrap mb-6 md:sticky md:top-[9dvh] md:mb-[10dvh]">
            <CaseCard c={c} index={i} total={cases.length} />
          </div>
        ))}
      </div>
    </section>
  )
}
