# Manohar Akhil: portfolio

A scroll-driven portfolio showing what a resume can't: the executions, the insights behind them, and how the thinking works.

## Run it

```bash
cd portfolio
npm install
npm run dev      # local development
npm run build    # production build in dist/
npm run preview  # serve the production build
```

Stack: React 19, Vite, Tailwind CSS v4, Three.js via @react-three/fiber (the hero), GSAP with ScrollTrigger and SplitText (pinning, scrubbing, text reveals), and Lenis (smooth scroll).

## Page structure

| # | Section | What it does | Interaction |
|---|---|---|---|
| 1 | Hero | "Thinking made tangible." | A WebGL form that morphs, leans toward the pointer and agitates as you scroll away |
| 2 | Journey | Six waypoints, 2017 to now | Pinned. The year rolls like an odometer and each anchor phrase replaces the last. The final chapter changes register and hands off to the work |
| 3 | Brand elements | One brand, four visual languages | Four panels. The active one opens to mood, type and palette, and extensions while the others stay visible for contrast |
| 4 | Case studies | Data, insight, move, result | Sticky stack: each card pins while the next slides over it. Numbers count up |
| 5 | Brand universe | Discover, explore, arrive, experience, stay connected | Vertical scroll becomes a sideways walk that ends at the canopy walkway, with a before/after drag slider |
| 6 | Gathering insights | ICP, response data and A/B tests, testimonials, product teams | A listening meter that reacts to the pointer, plus a bento grid of the four sources |
| 7 | Stories | Instagram, Meta and Google, print and OOH | Hovering a channel morphs a preview to that format's shape. The render-removal decision scrubs Gen 1 to Gen 3. The median/cantilever toggle physically reshapes the frame |
| 8 | What I take care of | Capabilities | The page's one marquee, steered by scroll direction |
| 9 | Contact | "Let's make something mean something." | Magnetic button and copy-to-clipboard with a confirmation burst |

Throughout: a two-part cursor with contextual labels (Open, Drag, Copy, Write), magnetic buttons whose fill floods in from the side you entered, and tactile press states.

## Editing content

Every word lives in `src/content.js`. Components only render what that file provides.

- **Email:** `site.email`. It was copied from the previous site (`ch.akhilmanohar1@gmail.com`), so confirm it's the right inbox.
- **Internal metrics:** the 95.8% referral conversion rate is hidden by default. The public line reads "the highest-converting channel in the funnel". Set `site.showInternalMetrics = true` to publish the exact figure.

## Adding your original work

Each visual slot shows a labelled placeholder until you give it an image. No stock imagery stands in for real work. To fill one:

1. Put the file in `portfolio/public/work/` (for example `public/work/egeira-mood.jpg`).
2. In `src/content.js`, set that asset's `src` to `'./work/egeira-mood.jpg'`.

Slots waiting for artwork:

- **Brand elements:** mood board, type and palette, and an extension (brochure or site) for Egeira, NorthEast, Sumangal and Payanam (12 images)
- **Case studies:** mock floor walkthrough photo; Register 01 (offer-led) and Register 02 (lifestyle) creatives
- **Brand universe:** one image each for campaign/website, brochure spread, signage or office space, experience centre, emailer or update; canopy walkway in progress and finished
- **Stories:** Gen 1, Gen 2 and Gen 3 OOH creatives; one median creative and one cantilever creative

## Accessibility and performance

- `prefers-reduced-motion` turns off smooth scroll, pinning, scrubbing, the cursor and magnetic effects. The hero renders a single still frame and the journey becomes a plain list.
- The custom cursor appears only on devices with a fine pointer (mouse or trackpad). Touch devices keep native behaviour.
- The two lightest text colours measure 7.9:1 and 5.4:1 against the background (WCAG AA is 4.5:1).
- Three.js loads as a separate chunk after the page renders. The hero mesh uses about 20k vertices on phones and about 60k on desktops.
