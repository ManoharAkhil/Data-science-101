import { useState } from 'react'
import { identity } from '../content'
import { RevealText, Reveal } from '../components/Reveal'
import AssetSlot from '../components/AssetSlot'

// Show, don't tell: four identities side by side. The active one opens to its
// mood, type and palette, and extensions; the others compress but stay
// visible, so the contrast between them is always on screen.
export default function Identity() {
  const [active, setActive] = useState(0)

  return (
    <section id="work" className="mx-auto max-w-[1400px] px-4 py-28 md:px-10 md:py-40">
      <RevealText className="display display-md max-w-[16ch]">
        {identity.title} <em>{identity.titleEm}</em>
      </RevealText>
      <Reveal>
        <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-muted">{identity.thesis}</p>
      </Reveal>

      {/* project switcher for small screens */}
      <div className="mt-12 flex gap-2 overflow-x-auto pb-2 md:hidden" role="tablist" aria-label="Projects">
        {identity.projects.map((p, i) => (
          <button
            key={p.name}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className="chip shrink-0"
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="mt-6 flex h-auto flex-col gap-3 md:mt-16 md:h-[560px] md:flex-row">
        {identity.projects.map((p, i) => {
          const open = active === i
          return (
            <div
              key={p.name}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              data-cursor={open ? undefined : 'Open'}
              className={`surface relative overflow-hidden transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:min-w-[88px] ${
                open ? 'block md:flex-[6]' : 'hidden md:block md:flex-[1]'
              }`}
            >
              {/* collapsed label */}
              <button
                onClick={() => setActive(i)}
                aria-expanded={open}
                className={`absolute inset-0 hidden flex-col items-center justify-end pb-8 transition-opacity duration-500 md:flex ${
                  open ? 'pointer-events-none opacity-0' : 'opacity-100'
                }`}
              >
                <span className="display text-3xl [writing-mode:vertical-rl] rotate-180">{p.name}</span>
              </button>

              {/* open content */}
              <div
                className={`grid h-full gap-3 p-3 transition-opacity duration-500 md:grid-cols-5 md:grid-rows-2 ${
                  open ? 'opacity-100 delay-200' : 'pointer-events-none opacity-0'
                }`}
              >
                <div className="relative overflow-hidden rounded-2xl md:col-span-3 md:row-span-2">
                  <AssetSlot asset={p.assets[0]} ratio="auto" className="h-full min-h-[260px]" />
                  <p className="display absolute bottom-5 left-6 text-4xl md:text-6xl">{p.name}</p>
                </div>
                <div className="overflow-hidden rounded-2xl md:col-span-2">
                  <AssetSlot asset={p.assets[1]} ratio="auto" className="h-full min-h-[160px]" />
                </div>
                <div className="overflow-hidden rounded-2xl md:col-span-2">
                  <AssetSlot asset={p.assets[2]} ratio="auto" className="h-full min-h-[160px]" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <Reveal className="mt-14 grid gap-10 md:grid-cols-3">
        {identity.decisions.map((d) => (
          <div key={d.k} data-reveal>
            <p className="text-lg font-medium">{d.k}</p>
            <p className="mt-2 text-muted">{d.q}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
