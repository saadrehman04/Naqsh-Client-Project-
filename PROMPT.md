# MASTER BUILD PROMPT — Naqsh website

You are the lead designer-developer building a **$10,000-quality website** for **Naqsh**, a B2B corporate
gifting brand ("Crafting Lasting Impressions"). The result must feel like a quiet-luxury brand site:
warm, tactile, minimal, confident. Think leather, linen, clay, wax seal, copper. Not a template, not a shop.

## Step 0 — Read, then plan (do not code yet)
Read `CLAUDE.md`, then every file in `docs/`, `design/tokens.css`, and look at every image in `reference/`
(moodboard, palette, hero inspirations, client structure, original logos).
Then reply with a short plan: stack confirmation, folder structure, component list, how you will handle
motion, and any questions or conflicts you found. **Wait for my approval before writing code.**

## The goal
A multi-page lead-generation website. Visitors (HR, admin, marketing, procurement, founders) should
understand Naqsh in 10 seconds, trust it, and press **Request Consultation**.

## Design direction: "Warm Quiet Luxury"
- Overall theme is **ivory / off-white** (Floral White #F7F1E7). Terracotta and dark (black/chestnut)
  sections appear only at a few key moments. Small touches of pine teal, sage, olive and khaki.
- Serif display type + clean sans body. Lots of whitespace. Hairline borders. Soft shadows. No gradients
  except the hero overlay and the copper logo.
- Hero follows the Oryzo / Fitosauna pattern: full-screen photo, big clear headline, one button,
  small supporting text, scroll cue. Details in `docs/04-design-system.md`.
- Signature details: the emblem as a wax seal (stamp animation), a faint diamond-lattice pattern taken from the
  emblem, embossed-paper feel on cards.
- Premium, smooth scroll animation (Lenis + GSAP). Details in `docs/06-motion.md`.

## Pages (see `docs/02-sitemap.md`)
Home, Services, Our Approach, Product Portfolio (+ one page per collection), FAQs, Contact,
Privacy Policy, Shipping & Delivery, 404. Persistent **Request Consultation** button and WhatsApp link.

## Build phases (stop and report after each)
1. Foundation: project setup, tokens, fonts, layout, header, footer, logo components, Placeholder, motion provider.
2. Home page: every section, with motion.
3. Inner pages: Services, Our Approach, Portfolio + collection pages, FAQs, Contact, policies, 404.
4. Inquiry form (validation, email via Resend, WhatsApp, seal-stamp success state).
5. CMS (Sanity): collections, products, FAQs, testimonials, client logos, site settings; hide-until-content logic.
6. SEO, performance, accessibility, cross-device QA, polish.
7. Handover: README, env variables, CMS guide, deploy steps.

## Inspiration
Check `docs/05-inspiration.md` and `reference/inspiration/` for demo sites. Treat each as a reference: follow its MATCH / IDEA / AVOID label,
and never copy layouts, text, images or code. Naqsh must feel like its own brand.

## Hard rules
- Use the client's copy verbatim from `docs/03-content.md`. Drafted copy is marked `[DRAFT]` and unknown facts
  are marked `[CONFIRM: ...]`. Render drafts, but show confirm-flags only in development, and list every one in
  `docs/08-open-items.md`. Never invent prices, timelines, minimums, addresses, emails, awards, clients or testimonials.
- Only use colors from `design/tokens.css`. Respect the 75/10/8/7 balance and the no-adjacent-dark-sections rule.
- Logos only from `assets/logo/svg`. Images only from `assets/images` or the `Placeholder` component.
- Testimonials, Client Logos and social links must render nothing until the CMS has real entries.
- No scroll-jacking. Keyboard and screen-reader friendly. Honor `prefers-reduced-motion`.
- Mobile first. No horizontal scroll at any width. Touch targets at least 44px.
- Performance targets: Lighthouse mobile performance 90+, accessibility/SEO/best-practices 95+, LCP under 2.5s, CLS under 0.1.

## Quality check before you say a phase is done
- Screenshots at 1440, 1024, 768 and 390 px. Fix spacing, overflow, contrast and alignment problems yourself.
- Does it feel premium? If any section looks like a generic template, redesign it.
- Update `docs/PROGRESS.md` (what is done, what is next, what is blocked) and `docs/DECISIONS.md` (choices and why).

## Output
Working code in this repository, a clean commit history (one commit per meaningful step), and a short
report after each phase listing what you built, what you checked, and what you need from me.
