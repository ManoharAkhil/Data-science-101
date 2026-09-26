import { useState } from 'react'
import { formats } from '../content'
import { RevealText, Reveal } from '../components/Reveal'

// The boards drawn to true relative scale (feet). Toggle to "readable" to
// see each creative large. At true scale the point makes itself: the median
// is tiny, so it is read up close, so it can carry more.
const FT_TO_PX = 6.2 // true-scale factor at desktop width

export default function Formats() {
  const [trueScale, setTrueScale] = useState(true)
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-28 md:px-10 md:py-40">
      <RevealText className="display display-lg max-w-[18ch]">
        {formats.title} <em>{formats.titleEm}</em>
      </RevealText>
      <Reveal><p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-muted">{formats.line}</p></Reveal>

      <div className="mt-10 flex items-center gap-2" role="group" aria-label="Board scale">
        <button type="button" className="chip" aria-pressed={trueScale} onClick={() => setTrueScale(true)}>True scale</button>
        <button type="button" className="chip" aria-pressed={!trueScale} onClick={() => setTrueScale(false)}>Readable</button>
        <span className="label ml-3 hidden md:inline">Drawn in feet, side by side</span>
        <span className="label ml-3 md:hidden">Swipe to see all five</span>
      </div>

      <div className="edge-fade -mx-4 mt-8 overflow-x-auto px-4 pb-4 md:mx-0 md:px-0">
        <div className="flex min-w-max items-end gap-5">
          {formats.boards.map((b) => {
            const [wFt, hFt] = b.ft
            const scale = trueScale ? FT_TO_PX : 260 / Math.max(wFt, hFt) * (wFt > hFt ? 1.5 : 1)
            return (
              <figure key={b.src} className="shrink-0">
                <div
                  className="media transition-[width,height] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ width: wFt * scale, height: hFt * scale, borderRadius: trueScale && wFt < 6 ? 3 : 14 }}
                >
                  <img src={b.src} alt={`${b.name}, ${wFt} by ${hFt} ft`} loading="lazy" />
                </div>
                <figcaption className="mt-3 w-[170px]">
                  <span className="block font-display font-medium">{b.name}</span>
                  <span className="block text-sm tabular-nums text-muted">{wFt} x {hFt} ft</span>
                  <span className="block text-sm text-dim">{b.read}</span>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </div>

      <div className="mt-24">
        <RevealText as="h3" className="display display-md">Three generations of the same brief.</RevealText>
        <Reveal className="mt-8 grid gap-6 md:grid-cols-[1.6fr_1fr_1fr]" stagger={0.1}>
          {formats.evolution.map((g) => (
            <figure key={g.when} data-reveal>
              <div className="media media-zoom flex h-[320px] items-center justify-center bg-ground-2 md:h-[380px]">
                <img src={g.src} alt={`Egeira OOH, ${g.when}`} loading="lazy" className="!h-auto !max-h-full !w-auto !max-w-full !object-contain" />
              </div>
              <figcaption className="mt-3">
                <span className="block font-display font-medium">{g.when}</span>
                <span className="text-sm text-muted">{g.what}</span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
