import { useState } from 'react'
import { Check } from '@phosphor-icons/react'
import { identity } from '../content'
import { RevealText, Reveal } from '../components/Reveal'

// Every swatch was sampled from a real creative, and says which one.
function Swatch({ s, open, onOpen }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    onOpen()
    try {
      await navigator.clipboard.writeText(s.hex)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch { /* clipboard blocked: the hex is still visible */ }
  }
  return (
    <button
      type="button"
      onMouseEnter={onOpen}
      onFocus={onOpen}
      onClick={copy}
      data-cursor="Copy"
      aria-label={`${s.name}, ${s.hex}, from ${s.from}. Copy hex`}
      className="relative flex min-h-[88px] flex-col justify-end overflow-hidden rounded-[14px] p-4 text-left transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:min-h-[260px]"
      style={{ background: s.hex, flexGrow: open ? 4 : 1, flexBasis: 0 }}
    >
      <span className={`transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0 md:opacity-0'}`}>
        <span className="block font-display text-lg font-medium text-white [text-shadow:0_1px_8px_rgb(0_0_0/0.35)]">{s.name}</span>
        <span className="block text-sm text-white/85">{s.from}</span>
      </span>
      <span className="mt-2 inline-flex items-center gap-1 font-display text-sm text-white/90 tabular-nums">
        {copied ? <><Check size={14} weight="bold" /> Copied</> : s.hex}
      </span>
    </button>
  )
}

export default function Identity() {
  const [open, setOpen] = useState(0)
  return (
    <section id="work" className="mx-auto max-w-[1400px] px-4 py-28 md:px-10 md:py-40">
      <div className="grid gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <RevealText className="display display-lg">
            {identity.title} <em>{identity.titleEm}</em>
          </RevealText>
          <Reveal><p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">{identity.line}</p></Reveal>
        </div>
        <Reveal className="md:col-span-5">
          <div className="flex aspect-[16/9] items-center justify-center rounded-[14px] bg-ground-2 p-10 shadow-[inset_0_0_0_1px_var(--color-line)]">
            <img src={identity.logo.dark} alt="Levonor Egeira logo" className="w-[72%]" />
          </div>
        </Reveal>
      </div>

      <div className="mt-12 flex flex-col gap-2 md:flex-row">
        {identity.swatches.map((s, i) => (
          <Swatch key={s.hex} s={s} open={open === i} onOpen={() => setOpen(i)} />
        ))}
      </div>
      <p className="mt-3 text-sm text-dim">Sampled from the creatives themselves. Tap a colour to copy it.</p>

      <Reveal className="mt-16 grid gap-3 md:grid-cols-12 md:items-start" stagger={0.08}>
        <figure data-reveal className="md:col-span-5">
          <div className="media media-zoom aspect-square"><img src={identity.surfaces[0].src} alt={identity.surfaces[0].label} loading="lazy" /></div>
          <figcaption className="label mt-2">{identity.surfaces[0].label}</figcaption>
        </figure>
        <div className="grid gap-3 md:col-span-7">
          <figure data-reveal>
            <div className="media media-zoom aspect-[16/9]"><img src={identity.surfaces[1].src} alt={identity.surfaces[1].label} loading="lazy" /></div>
            <figcaption className="label mt-2">{identity.surfaces[1].label}</figcaption>
          </figure>
          <div className="grid grid-cols-2 gap-3">
            {identity.surfaces.slice(2).map((f) => (
              <figure key={f.src} data-reveal>
                <div className="media media-zoom aspect-[16/10]"><img src={f.src} alt={f.label} loading="lazy" className="object-left" /></div>
                <figcaption className="label mt-2">{f.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Reveal>
      <Reveal><p className="mt-10 max-w-[60ch] text-muted">{identity.others}</p></Reveal>
    </section>
  )
}
