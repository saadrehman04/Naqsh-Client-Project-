# 06 — Motion and scroll animation

Feel: slow, soft, expensive. One main effect per section. If a visitor notices the animation more than the content, it is too much.

## Tools
- **Lenis** for smooth scrolling. **GSAP + ScrollTrigger** for scroll-linked effects.
- Wire them together once in a client-side `MotionProvider`:
```ts
const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, syncTouch: false });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```
- On route change: `ScrollTrigger.refresh()`, scroll to top with `lenis.scrollTo(0, { immediate: true })`. Kill triggers on unmount (use `gsap.context`).
- Anchor links use `lenis.scrollTo(target, { offset: -80 })`.

## Global values
Easing `power3.out` or `--ease-out`. Durations 0.8 to 1.2s. Stagger 0.08 to 0.12s. Reveal distance 24 to 40px. Trigger at `top 85%`, play once (`once: true`) unless scrubbed.
Animate only `transform`, `opacity`, `clip-path`. Never width, height, top or left. `will-change` only during the animation.

## Reusable reveals (build as components or data attributes)
| Name | Effect |
|---|---|
| `fade-up` | opacity 0 to 1, y 30 to 0, 0.9s |
| `lines` | Split text into lines, each line in an overflow-hidden mask, slides up from 110% to 0, stagger 0.1s |
| `words` | Words go from 0.15 to 1 opacity as you scroll (scrubbed) |
| `clip` | Image reveals with clip-path inset(100% 0 0 0) to inset(0), 1.2s, with the image scaling 1.15 to 1 |
| `draw` | SVG stroke-dashoffset animates to 0 (lines, emblem outline) |
| `stagger` | Children fade-up one after another |
| `parallax` | Element moves y -8% to +8% over the section (scrubbed, subtle) |

## Section by section
| Section | Motion |
|---|---|
| Page load | Preloader: none. Hero image scales 1.08 to 1 over 1.8s; header fades in; headline `lines` reveal 0.15s after; subline, button, corner card fade-up with 0.1s stagger. |
| Hero scroll | Photo parallax (moves slower), content fades up and out slightly as you leave the hero, overlay darkens a little. |
| Header | Hides on scroll down (y -100%), returns on scroll up. After the hero it gets ivory 85% + blur + hairline (0.4s). |
| About | Heading `lines`; paragraph `fade-up`; image `clip` with inner parallax. |
| Services teaser | Cards `stagger`; hover: image scales 1.04 over 0.8s, arrow nudges. |
| What Sets Us Apart | Four cards `stagger`; the colored top border draws left to right (0.8s). |
| Vision & Mission | Background fades ivory to black as the section enters (scrubbed color transition, about 20% of the viewport). Text uses `words` reveal. Thin copper line draws between Vision and Mission. |
| Core Values | Cards `stagger`; icon circles scale 0.9 to 1. |
| Our Approach | Desktop: section pins. Steps highlight one by one (active step ivory-to-black text, others at 35% opacity) while a thin line draws down/along. Mobile: no pinning, each step `fade-up`. |
| Portfolio preview | Cards `stagger`; hover image zoom 1.04, label slides up. Optional: pinned horizontal scroll on desktop only, after the rest is polished. |
| Testimonials / logos | Only if present. Slow fade between quotes (0.8s), logos fade-up stagger. |
| CTA (terracotta) | Section slides up over the previous one (sticky stacking). Emblem seal stamps in once: scale 1.25 to 1, rotate -6 to 0 deg, shadow tightens (0.9s, ease-out), then a soft settle. Heading `lines`. |
| Footer | Revealed from beneath the CTA (parallax reveal), links `fade-up`. |
| Inner page heads | Big serif heading `lines`, breadcrumb and intro `fade-up`. |
| FAQ | Accordion height animates with grid-template-rows 0fr to 1fr (0.5s). |
| Contact form | Fields `stagger`. Success: the wax seal stamps onto the confirmation (same stamp animation) then text fades in. |
| Page transitions | Soft fade out/in (0.3s), no slides. |

## Accessibility and fallbacks
- `prefers-reduced-motion: reduce`: no Lenis smoothing (native scroll), no parallax, no pinning, no word scrub. Show all content immediately with a simple 0.2s opacity fade at most.
- Content must be visible without JavaScript. Set hidden starting states from JS only, so there is no flash of invisible content and no layout shift. Reserve space for images (aspect-ratio).
- No scroll-jacking: never override scroll direction or speed in a way that traps the user. Keyboard, Page Up/Down and anchor links must work.
- Touch devices: native touch scroll (`syncTouch: false`), no pinning or horizontal scroll, lighter reveals (fade-up only).
- Cap effects per screen. Test on a mid-range phone. If it drops below 60fps, simplify.

## Performance guard
Target Lighthouse mobile performance 90+. Lazy-load everything below the hero. Do not animate large blurred or filtered elements.
Load GSAP plugins only where used. Dynamic-import heavy effects (pinning, horizontal scroll).

## Acceptance checklist
- [ ] Every section matches the table above
- [ ] 60fps scroll on desktop and a mid-range phone
- [ ] Reduced-motion mode works, content visible with JS disabled
- [ ] No layout shift (CLS under 0.1), no horizontal scrollbar
- [ ] Route changes refresh triggers, no leaked listeners
