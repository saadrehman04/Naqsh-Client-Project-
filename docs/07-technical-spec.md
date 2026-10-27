# 07 — Technical spec

## Stack (defaults, change in DECISIONS.md if I say so)
Next.js (App Router, latest stable) · TypeScript strict · Tailwind CSS (map theme to `design/tokens.css`) · Lenis + GSAP ScrollTrigger ·
`next/font` (Cormorant Garamond, Manrope) · `next/image` · zod + react-hook-form · Resend (email) · Sanity v3 (CMS) · Vercel · Playwright (screenshots/tests) · ESLint + Prettier.

## Suggested structure
```
src/app/            routes (see 02-sitemap.md), layout.tsx, not-found.tsx, sitemap.ts, robots.ts, api/inquiry/route.ts
src/components/     ui/ (Button, Accordion...), layout/ (Header, Footer, MobileMenu), sections/ (Hero, About...), motion/ (MotionProvider, Reveal, Lines, Words, Parallax), brand/ (Logo, WaxSeal)
src/content/        typed fallback data (copy from docs/03-content.md) used until CMS is connected
src/lib/            seo.ts, sanity client, utils, validators
src/styles/         tokens.css (copy of design/tokens.css), globals.css
public/             logos (svg), pattern, favicons, og image
sanity/             schemas
```

## Inquiry form
- Fields in `02-sitemap.md`. Validate on client and server (zod). Honeypot field + server-side rate limit. Optional Cloudflare Turnstile.
- `POST /api/inquiry`: validate, send email via Resend to `CONTACT_TO_EMAIL` (reply-to = visitor email), optional auto-reply. Do not store personal data beyond the email unless I ask.
- States: idle, sending, success (seal stamp), error (message + WhatsApp fallback). Accessible errors (`aria-live`).
- Collection pages link to `/contact?occasion=<slug>` to prefill the Occasion field.
- WhatsApp: `https://wa.me/923469171798?text=` + URL-encoded message ("Hello Naqsh, I would like to discuss corporate gifting for ...").

## CMS (Sanity), Phase 5
Document types:
- `siteSettings`: phone, whatsapp number, email, address, hours, social handles (each optional; empty = hidden), default SEO.
- `collection`: title, slug, shortLine, heroImage, description (portable text), typicalInclusions (optional), gallery, order, seo.
- `product` (for the future "detailed catalogue"): name, images, description, collections[], customizable, notes. Render product lists on a collection page only when products exist.
- `faq`: question, answer, group, order.
- `testimonial`: quote, name, role, company, logo, visible. `clientLogo`: name, logo, visible. Sections render nothing if empty.
- `policyPage`: title, slug (privacy / shipping-delivery), body, lastUpdated.
Fall back to `src/content` data when a CMS value is empty. Give the client a simple Studio with clear field help text. Draft/preview mode on.

## SEO
Metadata API per page, canonical, Open Graph + Twitter cards (generated OG image), `sitemap.xml`, `robots.txt`, JSON-LD Organization (+ FAQPage on /faqs), semantic headings, descriptive alt text, clean URLs, 301 redirects ready.
No `noindex` in production. Staging gets `noindex` and password protection.

## Performance
Targets: Lighthouse mobile performance 90+, accessibility 95+, best practices 95+, SEO 95+. LCP under 2.5s, CLS under 0.1, INP under 200ms.
Hero image `priority`, AVIF/WebP, sized via `sizes`. Fonts self-hosted via `next/font`, limited weights. No autoplay video on mobile. Lazy-load below the fold. Keep client JS small; server components by default; dynamic-import motion heavy parts.

## Security and privacy
Env vars only for secrets. Security headers (CSP where practical, X-Content-Type-Options, Referrer-Policy). Validate and sanitize all inputs. No third-party trackers by default; analytics (Plausible or GA4) behind an env flag, with a cookie notice only if cookies are used.

## Environment variables
`CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `RESEND_API_KEY`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER=923469171798`,
`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`, `NEXT_PUBLIC_ANALYTICS_ID` (optional), `TURNSTILE_SECRET_KEY` (optional). Provide `.env.example`.

## Testing and QA
- Playwright screenshots at 1440 / 1024 / 768 / 390 for every page; check no horizontal overflow.
- Test: form validation + success + error, all nav and footer links, 404, keyboard navigation, reduced-motion.
- Run Lighthouse (mobile) and axe. Fix issues, do not just report them.
- Browsers: latest Chrome, Safari (iOS too), Firefox, Edge.

## Handover (Phase 7)
README (run, build, deploy), env guide, CMS guide for the client (how to add a collection, FAQ, testimonial, logo), list of pending client items, and a short Loom-style walkthrough script.
