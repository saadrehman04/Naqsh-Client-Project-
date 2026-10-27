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
| Contrast Fix | `--terracotta-deep: #B24C3B` for buttons and CTA text | CONFIRMED | Ensures strict 4.65:1 WCAG AA compliance with ivory text |
| Hero Crop | Trimmed top 33% of New Hire Welcome Kit | CONFIRMED | Eliminates printed box lid copy behind the h1 headline |
| Hero | Photo-led desk tray with dark overlay & ivory headline | CONFIRMED by Saad | Matches quiet luxury bar (Oryzo/Fitosauna references) |
| Fonts | Cormorant Garamond (headlines) + Manrope (sans body) | ASSUMED | Matches wordmark serif, crystal clarity for UI text |
| Section labels | Pine Teal (`var(--pine)`), not Dusty Olive | Decided | Olive on ivory is about 3:1; Pine Teal passes WCAG AA |
| Logos | Vector traces (wordmark + emblem) in black, ivory, copper, copper-gradient | Decided | Clean SVG rendering at all scales |
| Motion | Lenis + GSAP ScrollTrigger gated by `prefers-reduced-motion` | CONFIRMED by Saad | Smooth, premium scroll without nausea; safety timeout prevents stuck states |
| Accordion | Native HTML `<details>` and `<summary>` with CSS grid transition | Decided | Lightweight, zero layout shift, fully accessible |
| Mobile Menu | Native `<dialog>` modal with CSS `overscroll-behavior: contain` | Decided | Clean trap, no body-scroll locking JS hacks required |
| Product Swap | Independence Day vs Wellness Kit filename correction | Decided | Fixed client image naming swap based on visual contact sheet inspection |

## Agent decisions log
- **2026-10-27**: Added `--terracotta-deep: #B24C3B` to `design/tokens.css` and `src/styles/tokens.css` to guarantee 4.65:1 contrast against white/ivory text for all primary action buttons.
- **2026-10-27**: Replaced deprecated Next.js 16 `<Image priority>` with `priority` / `preload` attributes to eliminate Turbopack compiler warnings.
- **2026-10-27**: Created `src/components/ui/Confirm.tsx` to clearly mark missing client facts in development (`[CONFIRM]`) while cleanly hiding badges in production builds.
- **2026-10-27**: Formulated `src/lib/cms.ts` fallback pattern: if Sanity is not configured or queries fail, all collections, products, FAQs, and site settings seamlessly fall back to local typed data in `src/content/`.
- **2026-10-27**: Kept testimonials, client logos, and social icons hidden via `src/components/sections/SocialProof.tsx` until verified assets exist, per client rule against dummy testimonials.
- **2026-10-27**: Implemented automated honeypot spam protection (`website` hidden input) on the inquiry form route `/api/inquiry`.
