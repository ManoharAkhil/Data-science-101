import { insights } from '../content'
import { RevealText, Reveal } from '../components/Reveal'

// The insight engine: what the engineer built, and the sentence a buyer
// actually hears. Every pair shipped.
export default function Insights() {
  return (
    <section id="thinking" className="mx-auto max-w-[1400px] px-4 py-28 md:px-10 md:py-40">
      <RevealText className="display display-lg">
        {insights.title} <em>{insights.titleEm}</em>
      </RevealText>
      <Reveal><p className="mt-6 max-w-[46ch] text-lg text-muted">{insights.line}</p></Reveal>

      <Reveal className="mt-12 grid gap-px overflow-hidden rounded-[14px] bg-line sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
        {insights.sources.map((s) => (
          <div key={s.k} data-reveal className="bg-ground p-6">
            <p className="font-display text-sm font-medium text-amber">{s.k}</p>
            <p className="mt-3 leading-relaxed">{s.q}</p>
          </div>
        ))}
      </Reveal>

      <div className="mt-24 space-y-5">
        <p className="label">From the site office to the ad</p>
        {insights.pairs.map((p, i) => (
          <Reveal key={p.fact} className="grid items-center gap-5 border-t border-line pt-5 md:grid-cols-12">
            <p className="text-muted md:col-span-3">
              <span className="block font-display text-sm font-medium text-dim">What was built</span>
              <span className="mt-1 block text-lg text-ink">{p.fact}</span>
            </p>
            <div className="hidden justify-center md:col-span-1 md:flex" aria-hidden="true">
              <span className="h-px w-full bg-amber" />
            </div>
            <p className="md:col-span-4">
              <span className="block font-display text-sm font-medium text-amber">What the buyer hears</span>
              <span className="display mt-1 block text-2xl leading-snug md:text-3xl">{p.story}</span>
            </p>
            <div className={`media media-zoom md:col-span-4 ${i === 2 ? 'aspect-[4/3]' : 'aspect-[16/9]'}`}>
              <img src={p.src} alt="" loading="lazy" className={i === 2 ? 'object-[50%_30%]' : ''} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
