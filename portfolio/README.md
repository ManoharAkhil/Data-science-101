# Manohar Akhil: portfolio

The executions, insights and design thinking a resume cannot show.
Built from the verified record (`Manohar_Resume_Portfolio_Build_Record.md`), the Levonor creatives in Drive, and the mock-floor reel.

## Run it

```bash
cd portfolio
npm install
npm run dev      # local development
npm run build    # production build in dist/
npm run preview  # serve the production build
```

Stack: React 19, Vite, Tailwind CSS v4, Three.js via @react-three/fiber, GSAP (ScrollTrigger, SplitText), Lenis.

## Fonts (read this first)

The site uses **TWK Everett** (display, Light to Bold) and **Atyp Text** (body, Light to Medium). Both are commercial fonts:

- TWK Everett's embedded license forbids storing the files on publicly available servers, redistributing, or modifying them.
- Atyp Text is marked "All rights reserved".

This repository is public, so `public/fonts/` is **git-ignored** and the font files are never committed. To run locally, put these files in `portfolio/public/fonts/`:

```
TWKEverett-Light.otf  TWKEverett-Regular.otf  TWKEverett-Medium.otf  TWKEverett-Bold.otf
AtypText-Light.ttf    AtypText-Regular.ttf    AtypText-Medium.ttf
```

Without them the page falls back to Helvetica/Arial. **Before deploying publicly, get a web license from each foundry** (Weltkern for Everett, Suitcase Type for Atyp).

The three Atyp files all report weight 400 internally, so `index.html` assigns 300, 400 and 500 explicitly.

## Design system: Night Site

| Token | Value | Use |
|---|---|---|
| Ground | `#161513` | Page background |
| Ink | `#ECE8DF` | Primary text (14.9:1) |
| Muted | `#A39E92` | Body copy (6.8:1) |
| Dim | `#8A857A` | Captions (5.0:1) |
| Amber | `#F2A33A` | The one accent (8.8:1) |

Radius: images 14px, controls full pill. No em or en dashes anywhere.

## The unifying principle: the Levonor L, filled with people

- **Hero (WebGL):** a 10 x 6 montage wall of homebuyer tiles flips and flies into the Levonor L. The chamfered corner, the brand's signature cut, is edged in amber. It leans toward the pointer and comes apart as you scroll away.
- **200+ voices (DOM):** the same L, built from the same faces, scrubs together as you scroll.

The tiles come from `public/work/l-atlas.webp`: a 1024 px image holding a 4 x 4 grid of 256 px squares. It currently uses people from the mock-floor reel. **To use the testimonial montage stills**, make a new 4 x 4 atlas at the same size and replace that file. No code change is needed.

## Sections

1. **Welcome:** the name steps from Light to Bold (weight as identity). Plays once per session.
2. **Hero:** the identity line, the L, and four flip cards (151%, 72%, 200+, No. 1). The cards turn over on their own, then again on tap.
3. **Journey:** six eras, pinned. Each anchor is set heavier than the last, Light to Bold.
4. **Identity:** Egeira lockup, six swatches sampled from the creatives (tap to copy), and the surfaces.
5. **Mock floor case:** data, insight, move and result on a sticky rail beside the walk, then homebuyer quotes and the campaign end card.
6. **200+ voices:** the pipeline and the L.
7. **Formats:** five OOH boards drawn to true relative scale in feet (toggle to readable), plus three generations of the brief.
8. **Insights:** four listening sources; engineer fact to buyer sentence, with the ad frame that shipped.
9. **Three more decisions:** dual-agency segmentation, organic reach, client communication.
10. **Tour:** a horizontal walk through the touchpoints to the canopy walkway.
11. **Skills and contact.**

## Content rules

- Every figure comes from the build record's verified data bank. The 95.8% internal conversion rate is not published (the page says "best-converting channel").
- Instagram uses 6,718 (verified) so 151% holds. **The resume still says 6,702: update it to match.**
- The Aug 2025 OOH file needs Drive sign-in, so the render-removal story shows March 2025, February 2026 and May 2026 without claiming which stage dropped renders.

## Accessibility and performance

- `prefers-reduced-motion`: no welcome, no smooth scroll or pins. The L renders as a single finished frame and the journey becomes a list.
- The custom cursor appears only on devices with a fine pointer (mouse or trackpad).
- The WebGL scene is 60 instanced quads and loads lazily after first paint.
- Creatives are WebP, about 1.9 MB in total.
