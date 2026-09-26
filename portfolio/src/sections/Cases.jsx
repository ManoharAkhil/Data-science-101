import { cases } from '../content'
import { RevealText, Reveal } from '../components/Reveal'
import useSpotlight from '../lib/useSpotlight'

// Three more decisions, kept short. The detail is in the interview.
export default function Cases() {
  const spot = useSpotlight()
  return (
    <section className="mx-auto max-w-[1400px] px-4 pb-28 md:px-10 md:pb-40">
      <RevealText as="h2" className="display display-md">Three more decisions.</RevealText>
      <Reveal className="mt-10 grid gap-3 md:grid-cols-3" stagger={0.08}>
        {cases.map((c, i) => (
          <article
            key={c.k}
            data-reveal
            onPointerMove={spot}
            className={`relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[14px] p-7 ${i === 1 ? 'bg-amber text-amber-ink' : 'bg-ground-2 shadow-[inset_0_0_0_1px_var(--color-line)]'}`}
            style={{ backgroundImage: i === 1 ? undefined : 'radial-gradient(360px circle at var(--mx,-999px) var(--my,-999px), rgb(242 163 58 / 0.09), transparent 60%)' }}
          >
            <p className={`font-display text-sm font-medium ${i === 1 ? '' : 'text-amber'}`}>{c.k}</p>
            <div>
              <h3 className="display text-2xl leading-tight md:text-[1.7rem]">{c.title}</h3>
              <p className={`mt-4 leading-relaxed ${i === 1 ? 'text-amber-ink/80' : 'text-muted'}`}>{c.body}</p>
              <p className={`mt-6 text-sm ${i === 1 ? 'text-amber-ink/70' : 'text-dim'}`}>{c.tag}</p>
            </div>
          </article>
        ))}
      </Reveal>
    </section>
  )
}
