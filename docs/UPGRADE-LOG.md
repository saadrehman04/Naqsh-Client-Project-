# Upgrade log

## 2026-10-27 · Production reference-led refresh

- Preserved the existing Next.js app, client imagery, typography, routes, and brand tokens.
- Reworked home content into asymmetric image/copy rows, hairline promises, and open three-column values.
- Replaced Vision/Mission quote cards with a pinned dark scene and scrubbed word reveals.
- Reworked the approach section around a procedural gift-box scene and active process steps.
- Replaced the seven-card portfolio with a horizontal collection gallery, all 21 product photos, collection filters, product detail dialog, and quote-prefilled inquiry links.
- Rebuilt collection detail pages to show client-provided names and photos without unverified product contents.
- Added lazy, viewport-gated React Three Fiber scenes with static SVG/CSS fallbacks; scenes are disabled for reduced motion, mobile, save-data and low-memory devices. React Three Fiber disposes mounted scene objects when their components unmount.
- Added a first-session intro, scroll progress, limited magnetic movement, desktop image cursor, editorial marquee, and CTA wax seal.
- Kept the hero image files unchanged. Confirmed phone source is centralized in `src/lib/whatsapp.ts` and corrected README wording.
- Replaced Footer “Headquarters” with “Location”; corrected the CTA lattice asset path.

### Verification

- Final `npm run build`: passed; targeted ESLint reports zero errors (one existing unused `Link` warning in `src/app/not-found.tsx`).
- Production Playwright sweep: 36 route/viewport combinations across nine routes and 1440, 1024, 768, and 390px; zero document overflow or page errors. All eight requested hero widths (1920, 1600, 1440, 1280, 1180, 1024, 768, 390px) have saved screenshots in `docs/screenshots/` and were visually reviewed.
- Header measurements confirm 72px height, nav/menu/CTA breakpoints, no header collisions, and the primary hero CTA computes to `rgb(182, 79, 62)`.
- Axe: 16 route/viewport scans across the eight key pages plus two FAQ retests after the badge contrast fix; zero remaining violations.
- Lighthouse desktop: Performance 98, Accessibility 100, Best Practices 100, SEO 100. Mobile: 94, 100, 100, 100.
- The production scroll demo is saved as [`scroll-demo.webm`](scroll-demo.webm) (22 seconds). It was reviewed as a contact sheet through the page footer.
- Product prefill, mobile menu open/close, and all 21 named product entries were verified.

### Open client details

See [08-open-items.md](08-open-items.md). Product grouping is a proposed navigation aid; wellness and Independence Day filename mapping was corrected from visual inspection and should be confirmed. No email or commercial/legal fulfillment details were supplied.
