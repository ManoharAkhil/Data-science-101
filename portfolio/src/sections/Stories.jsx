import { useRef, useState } from 'react'
import { stories } from '../content'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion'
import { RevealText, Reveal } from '../components/Reveal'
import AssetSlot from '../components/AssetSlot'

// Each channel has its own frame shape; the floating preview takes that shape
// so the viewer feels the format change, not just reads about it.
const FRAMES = { Instagram: [9, 16], 'Meta and Google': [1, 1], 'Print and OOH': [3, 1.2] }

function ChannelRows() {
  const root = useRef(null)
  const preview = useRef(null)
  const [hovered, setHovered] = useState(null)

  useGSAP(
    () => {
      const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
      if (!fine || prefersReducedMotion()) return
      const x = gsap.quickTo(preview.current, 'x', { duration: 0.6, ease: 'power3' })
      const y = gsap.quickTo(preview.current, 'y', { duration: 0.6, ease: 'power3' })
      const move = (e) => {
        const r = root.current.getBoundingClientRect()
        x(e.clientX - r.left)
        y(e.clientY - r.top)
      }
      root.current.addEventListener('pointermove', move)
      return () => root.current?.removeEventListener('pointermove', move)
    },
    { scope: root }
  )

  const onEnter = (k) => {
    setHovered(k)
    if (prefersReducedMotion()) return
    const [w, h] = FRAMES[k]
    const base = 200
    gsap.to(preview.current.firstElementChild, {
      width: w >= h ? base * 1.6 : base * 0.8,
      height: w >= h ? (base * 1.6 * h) / w : (base * 0.8 * h) / w,
      duration: 0.6,
      ease: 'expo.out',
    })
    gsap.to(preview.current, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'expo.out' })
  }
  const onLeave = () => {
    setHovered(null)
    gsap.to(preview.current, { autoAlpha: 0, scale: 0.8, duration: 0.3 })
  }

  return (
    <div ref={root} className="relative mt-14" onPointerLeave={onLeave}>
      <div
        ref={preview}
        className="pointer-events-none invisible absolute left-0 top-0 z-10 hidden scale-75 md:block"
        aria-hidden="true"
      >
        <div className="-translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-accent p-4 text-accent-ink shadow-2xl">
          <p className="font-mono text-[10px] uppercase tracking-widest">{hovered}</p>
        </div>
      </div>
      {stories.channels.map((c) => (
        <div
          key={c.k}
          onPointerEnter={() => onEnter(c.k)}
          className="group grid gap-3 border-t border-line py-8 transition-colors duration-500 last:border-b md:grid-cols-12 md:items-baseline md:py-10"
        >
          <p className="font-mono text-sm text-dim md:col-span-3">{c.k}</p>
          <h3 className="display text-4xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-hover:text-accent md:col-span-5 md:text-6xl">
            {c.head}
          </h3>
          <p className="text-muted md:col-span-4">{c.body}</p>
        </div>
      ))}
    </div>
  )
}

// Scroll scrubs through three generations while the attention window shrinks.
function RenderRemoval() {
  const root = useRef(null)
  const r = stories.render
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const gens = gsap.utils.toArray('.gen')
      const clock = { s: 3 }
      root.current.querySelector('.clock').textContent = '3.0'
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'bottom 60%', scrub: 0.6 },
      })
      tl.fromTo(gens, { opacity: 0.25, y: 30 }, { opacity: 1, y: 0, stagger: 0.5, duration: 0.5 })
        .to(clock, {
          s: 1.5,
          duration: 1.5,
          ease: 'none',
          onUpdate: () => {
            const el = root.current?.querySelector('.clock')
            if (el) el.textContent = clock.s.toFixed(1)
          },
        }, 0)
        .to('.gen-strike', { scaleX: 1, stagger: 0.5, duration: 0.3 }, 0.3)
    },
    { scope: root }
  )
  return (
    <div ref={root} className="mt-32 md:mt-44">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <RevealText as="h3" className="display display-sm">{r.title}</RevealText>
          <p className="mt-5 text-lg text-ink">{r.insight}</p>
          <p className="mt-3 text-muted">{r.move}</p>
        </div>
        <div className="flex items-end gap-4 md:col-span-6 md:col-start-7 md:justify-end">
          <p className="display text-[clamp(4rem,10vw,9rem)] leading-none text-accent">
            <span className="clock tabular-nums">1.5</span>
            <span className="text-[0.4em]">s</span>
          </p>
          <p className="mb-4 max-w-[14ch] text-sm text-muted">the attention window each frame had to win</p>
        </div>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {r.gens.map((g, i) => (
          <figure key={g.k} className="gen">
            <div className="overflow-hidden rounded-[20px]">
              <AssetSlot asset={g} ratio="3 / 2" />
            </div>
            <figcaption className="mt-3 flex items-center gap-3 text-sm">
              <span className="font-medium">{g.k}</span>
              {i < 2 ? (
                <span className="relative text-dim">
                  photographic render
                  <span className="gen-strike absolute inset-x-0 top-1/2 h-px origin-left scale-x-0 bg-accent" />
                </span>
              ) : (
                <span className="text-accent">no render, one read</span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

// Tactile toggle: the same frame physically reshapes from portrait to landscape.
function FormatToggle() {
  const [mode, setMode] = useState(0)
  const frame = useRef(null)
  const f = stories.format
  const m = f.modes[mode]

  const pick = (i) => {
    if (i === mode) return
    setMode(i)
    if (prefersReducedMotion()) return
    gsap.fromTo(frame.current, { scale: 0.96 }, { scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' })
  }

  return (
    <div className="mt-32 grid gap-12 md:mt-44 md:grid-cols-12 md:items-center">
      <div className="md:col-span-5">
        <RevealText as="h3" className="display display-sm">
          {f.title} <em>{f.titleEm}</em>
        </RevealText>
        <div className="mt-8 flex gap-2" role="group" aria-label="Choose a format">
          {f.modes.map((x, i) => (
            <button key={x.k} className="chip" aria-pressed={mode === i} onClick={() => pick(i)}>
              {x.k}
            </button>
          ))}
        </div>
        <p className="mt-8 font-mono text-sm text-dim">{m.spec}</p>
        <p className="mt-3 text-2xl">{m.usp}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {m.tags.map((t) => (
            <li key={t} className="rounded-full bg-bg-3 px-4 py-2 text-sm">{t}</li>
          ))}
        </ul>
      </div>
      <div className="flex min-h-[420px] items-center justify-center md:col-span-7">
        <div
          ref={frame}
          className="overflow-hidden rounded-[20px] transition-[width,aspect-ratio] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ width: mode === 0 ? 'min(260px, 60vw)' : 'min(620px, 88vw)', aspectRatio: mode === 0 ? '2 / 3' : '3 / 1.3' }}
        >
          <AssetSlot asset={m} ratio="auto" className="h-full" />
        </div>
      </div>
    </div>
  )
}

export default function Stories() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-28 md:px-10 md:py-40">
      <RevealText className="display display-md">
        {stories.title} <em>{stories.titleEm}</em>
      </RevealText>
      <Reveal>
        <p className="mt-6 max-w-[48ch] text-lg text-muted">
          The message changes with the moment. The thought behind it stays connected.
        </p>
      </Reveal>
      <ChannelRows />
      <RenderRemoval />
      <FormatToggle />
    </section>
  )
}
