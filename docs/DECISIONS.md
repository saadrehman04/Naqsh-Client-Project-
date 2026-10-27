# Decisions and assumptions

Status: **ASSUMED** = default I (Saad) have not confirmed with the client. Change freely, then tell the agent.

| Decision | Choice | Status | Why |
|---|---|---|---|
| Site type | Lead-generation, not e-commerce | ASSUMED | Profile says not a fixed catalogue; consultation flow |
| Structure | Multi-page (see sitemap) | ASSUMED | Excel is multi-page |
| Language | English only, RTL-ready | ASSUMED | Urdu possible later |
| Stack | Next.js 16 (Turbopack, App Router, React 19) + TypeScript + Tailwind v4 | ASSUMED | Speed, SEO, modern web standards |
| CMS | Sanity CMS with automatic local fallback | ASSUMED | Seamless local dev without API credentials; ready for client Studio |
| Form delivery | Next.js Route Handler + Resend + Console log dev fallback | ASSUMED | Zero-loss inquiries with fallback in dev; WhatsApp quick consultation |
| Hosting | Vercel | ASSUMED | Edge caching, instant preview deployments |
| Theme | Ivory-led (~75%), Terracotta (~8%), Black (~10%), Pine/Sage (~7%) | CONFIRMED by client | Client feedback & tokens.css |
| Contrast Fix | `--chestnut: #7F3021` for ivory text on dark small-action surfaces; hero primary uses `--terracotta: #B64F3E` exactly | Decided | Keeps the requested hero color exact and uses chestnut where ivory text needs stronger contrast |
| Hero Crop | Trimmed top 33% of New Hire Welcome Kit | CONFIRMED | Eliminates printed box lid copy behind the h1 headline |
| Hero | Photo-led desk tray with dark overlay & ivory headline | CONFIRMED by Saad | Matches quiet luxury bar (Oryzo/Fitosauna references) |
| Fonts | Cormorant Garamond (headlines) + Manrope (sans body) | ASSUMED | Matches wordmark serif, crystal clarity for UI text |
| Section labels | Pine Teal (`var(--pine)`), not Dusty Olive | Decided | Olive on ivory is about 3:1; Pine Teal passes WCAG AA |
| Logos | Vector traces (wordmark + emblem) in black, ivory, copper, copper-gradient | Decided | Clean SVG rendering at all scales |
| Motion | Lenis + GSAP ScrollTrigger gated by `prefers-reduced-motion` | CONFIRMED by Saad | Smooth, premium scroll without nausea; safety timeout prevents stuck states |
| Accordion | Native HTML `<details>` and `<summary>` with CSS grid transition | Decided | Lightweight, zero layout shift, fully accessible |
| Mobile Menu | Native `<dialog>` modal with CSS `overscroll-behavior: contain` | Decided | Clean trap, no body-scroll locking JS hacks required |
| Product Swap | Independence Day vs Wellness Kit filename correction | Decided | Fixed client image naming swap based on visual contact sheet inspection |
| Home Header Layout | 72px header; desktop nav left, centered SVG wordmark, actions right; menu overlay below 1180px | Decided | Matches the latest reference-led brief and gives each region a clear position |
| Home Hero Readability | Directional dark gradient, 70% image position, and animated Cormorant headline | Decided | Preserves the original hero image while separating its printed product copy from the message |

## Agent decisions log
- **2026-10-27**: Added `--terracotta-deep: #B24C3B` to `design/tokens.css` and `src/styles/tokens.css` to guarantee 4.65:1 contrast against white/ivory text for all primary action buttons.
- **2026-10-27**: Replaced deprecated Next.js 16 `<Image priority>` with `priority` / `preload` attributes to eliminate Turbopack compiler warnings.
- **2026-10-27**: Created `src/components/ui/Confirm.tsx` to clearly mark missing client facts in development (`[CONFIRM]`) while cleanly hiding badges in production builds.
- **2026-10-27**: Formulated `src/lib/cms.ts` fallback pattern: if Sanity is not configured or queries fail, all collections, products, FAQs, and site settings seamlessly fall back to local typed data in `src/content/`.
- **2026-10-27**: Kept testimonials, client logos, and social icons hidden via `src/components/sections/SocialProof.tsx` until verified assets exist, per client rule against dummy testimonials.
- **2026-10-27**: Reworked the Home header into a left wordmark / centered navigation / right actions layout and refined hero type, overlay, spacing and image parallax without changing the hero image assets.
- **2026-10-27**: Updated the header to the latest 72px/nav-left/centered-wordmark layout and hid the header CTA below 640px; confirmed phone contact now comes from `src/lib/whatsapp.ts`.
- **2026-10-27**: Implemented automated honeypot spam protection (`website` hidden input) on the inquiry form route `/api/inquiry`.
- **2026-10-27**: Set the header to an exact 72px outer height and refined the tablet hero strip to keep its scroll cue and seasonal card clear.
- **2026-10-27**: Replaced low-contrast opacity fades in the pinned Vision/Mission reveal with contrast-safe word reveals and corrected the Customization FAQ badge to chestnut.
