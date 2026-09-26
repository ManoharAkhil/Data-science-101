import { useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy } from '@phosphor-icons/react'
import { site } from '../content'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { RevealText } from '../components/Reveal'
import Magnetic from '../components/Magnetic'
import { scrollToId } from '../components/SmoothScroll'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const burst = useRef(null)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
      if (!prefersReducedMotion()) {
        // small confirmation burst: feedback you can feel
        const dots = burst.current.children
        gsap.fromTo(
          dots,
          { x: 0, y: 0, scale: 1, opacity: 1 },
          {
            x: (i) => Math.cos((i / dots.length) * Math.PI * 2) * 46,
            y: (i) => Math.sin((i / dots.length) * Math.PI * 2) * 46,
            scale: 0,
            opacity: 0,
            duration: 0.7,
            ease: 'expo.out',
          }
        )
      }
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-accent text-accent-ink">
      <div className="mx-auto max-w-[1400px] px-4 pb-10 pt-28 md:px-10 md:pt-40">
        <RevealText className="display display-lg max-w-[12ch] [&_em]:!text-accent-ink">
          Let&rsquo;s make something <em>mean something.</em>
        </RevealText>

        <div className="mt-14 flex flex-wrap items-center gap-4">
          <Magnetic strength={0.4}>
            <a href={`mailto:${site.email}`} className="pill pill-dark !h-16 !px-8 text-lg" data-cursor="Write">
              Let&rsquo;s talk <ArrowUpRight size={20} weight="bold" />
            </a>
          </Magnetic>
          <div className="relative">
            <button
              onClick={copy}
              data-cursor="Copy"
              className="flex h-16 items-center gap-3 rounded-full px-6 text-lg shadow-[inset_0_0_0_1.5px_rgb(14_16_12/0.35)] transition-transform active:scale-95"
            >
              {copied ? <Check size={20} weight="bold" /> : <Copy size={20} />}
              <span>{copied ? 'Copied to clipboard' : site.email}</span>
            </button>
            <span ref={burst} className="pointer-events-none absolute left-8 top-1/2" aria-hidden="true">
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className="absolute h-2 w-2 rounded-full bg-accent-ink opacity-0" />
              ))}
            </span>
          </div>
          <span className="sr-only" aria-live="polite">{copied ? 'Email copied' : ''}</span>
        </div>

        <footer className="mt-28 flex flex-wrap items-end justify-between gap-6 border-t border-accent-ink/20 pt-6 text-sm">
          <p>
            {site.fullName}
            <br />
            Brand strategy and creative direction
          </p>
          <a
            href="#top"
            onClick={(e) => { e.preventDefault(); scrollToId('top') }}
            className="underline-offset-4 hover:underline"
          >
            Back to top
          </a>
        </footer>
      </div>
    </section>
  )
}
