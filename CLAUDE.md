# Naqsh website — project rules (read this first, every session)

## What this is
A premium, modern, clean-minimal website for **Naqsh**, a B2B corporate gifting brand
(tagline: "Crafting Lasting Impressions"). Client price point: $10,000. Quality bar: award-site polish, not template polish.
The site generates leads (Request Consultation). It is NOT a shop: no cart, no prices.

## Read order
1. `PROMPT.md` (the task)  2. `docs/01-client-brief.md`  3. `docs/02-sitemap.md`  4. `docs/03-content.md`
5. `docs/04-design-system.md` + `design/tokens.css`  6. `docs/06-motion.md`  7. `docs/07-technical-spec.md`
8. `docs/05-inspiration.md` + images in `reference/`  9. `docs/08-open-items.md`  10. `docs/PROGRESS.md`

## Stack (defaults, see docs/DECISIONS.md)
Next.js (App Router) + TypeScript + Tailwind, Lenis + GSAP ScrollTrigger, Sanity CMS (Phase 5),
Resend for the inquiry email, deployed on Vercel. English only, but RTL-ready (use logical CSS properties).

## Non-negotiable rules
- **Color:** ~75% ivory, ~10% black/charcoal, ~8% terracotta/chestnut, ~7% pine/sage/olive/khaki. Use only tokens from `design/tokens.css`. No new colors.
- **Backgrounds alternate:** never two dark or colored sections back to back. Hero is photo-led.
- **Sage and Dusty Olive are never text on ivory** (contrast too low). Small colored text = Pine Teal or Chestnut.
- **Copy:** use client text verbatim from `docs/03-content.md`. Never invent facts (prices, timelines, MOQs, addresses, emails, awards, clients, testimonials). Anything unknown stays as a visible dev-only `[CONFIRM]` flag and is listed in `docs/08-open-items.md`.
- **Logos:** only files in `assets/logo/svg`. Never redraw or recolor them by hand.
- **Images:** use real files from `assets/images`. If missing, use the `Placeholder` component (tinted block + label). No hotlinked stock photos.
- **Motion:** follow `docs/06-motion.md`. Slow, soft, one main effect per section. Always honor `prefers-reduced-motion`.
- **Accessibility and speed:** WCAG 2.2 AA, Lighthouse mobile performance 90+, other scores 95+.
- **Hidden until real:** Testimonials, Client Logos and Social links render nothing when the CMS has no items.

## Inspiration rule
Demo sites in `docs/05-inspiration.md` and `reference/inspiration/` are references, not templates. Never copy their layout, text, images or code.
Follow each entry's MATCH / IDEA / AVOID label. If an entry conflicts with the design system, the design system wins; tell me about the conflict.

## How to work
- Plan first, then wait for approval. Build in the phases listed in `docs/PROGRESS.md`. Stop after each phase.
- After each phase: run lint + build, screenshot at 1440 / 1024 / 768 / 390 px, fix what you see, then update `docs/PROGRESS.md` and `docs/DECISIONS.md`.
- Keep components small and typed. Content lives in data files / CMS, never hard-coded in JSX.
- If something in the docs conflicts or is missing, ask. Do not guess on brand or content.
