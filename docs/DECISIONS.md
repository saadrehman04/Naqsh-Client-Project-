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
- **2026-11-14**: Replaced the footer with a plain full-width black footer on every page: copper-gradient emblem with Instagram/LinkedIn links, an "Our Policies" column (Data Privacy, Shipping & Delivery) and a "Get in Touch" column (call, WhatsApp, email). Removed the giant NAQSH wordmark and moved the copyright line inside the footer. Social URLs and email stay dev-only `[CONFIRM]` flags and are hidden in production until provided.
- **2026-11-14**: Removed the custom copper cursor (follower dot and "Explore" badge). The site now uses the normal browser cursor, with the pointer (finger) only on clickable links and controls.
- **2026-11-14**: Home About section now shows only the client About Us copy and slogan (photos kept). Added an ivory Vision & Mission section as the third home section, using the client statements verbatim: large uppercase display headings, chestnut hairline divider, mission row aligned to the end, small copper wordmark. Styles live as Tailwind classes in the component because the dev server was not picking up `globals.css` edits.
- **2026-11-14**: Rebuilt What Sets Us Apart on black with the client copy verbatim (heading, sage subheading, intro) and one photo. The four promises are numbered points: chestnut circles 1-4 joined by a stitched copper thread (horizontal on desktop, vertical on phones). Promise 1 wording flagged for client sign-off in open items.
- **2026-11-14**: Home trimmed to Hero, About, Vision & Mission, What Sets Us Apart, Core Values. Removed Our Services and Featured Collections from the homepage (the components stay in the codebase). Order still alternates dark / ivory.
- **2026-11-14**: Footer: the emblem is much larger (144 / 192 / 240px tall) and Instagram/LinkedIn now sit under Our Policies, which keeps the footer short. Phones use two columns (emblem beside policies, contact below).
- **2026-11-14**: One heading system for home sections, replacing the all-caps display headings: Title Case Cormorant at clamp(2.5rem, 5vw, 4.5rem) with -0.015em tracking, and a small terracotta diamond-and-rule `Ornament` (the emblem's diamond motif) above each heading. Indexes are small chestnut Manrope numerals (01, 02...). This matches the Title Case headings already used on Services, Portfolio and FAQs.
- **2026-11-14**: Core Values (ivory) rebuilt: terracotta icons inside a diamond frame, index, medium-weight display name, then the description. Terracotta rules separate the values (vertical between columns on desktop, short centred rule when stacked). Client copy verbatim.
- **2026-11-14**: Vision & Mission keeps the client's alternating layout, now with Title Case headings, statements set in the display serif, and a khaki hairline with a terracotta diamond between the rows. Removed the small copper wordmarks from Vision & Mission and What Sets Us Apart.
- **2026-11-14**: Inner pages moved onto the same ivory system as home (Title Case display headings, terracotta `Ornament`, khaki hairlines, design-system `Button`). Removed hard-coded off-palette hex colours (#101D19, #C99A53, #FAF6EF, #E5A666, reds) and the undefined `--ivory-warm` / `--border-light` variables (now `--ivory-deep` / `--hairline`).
  - Services: editorial rows on ivory (no nested cards), terracotta diamond bullets, quiet pillar index instead of the dark jump bar.
  - FAQs: questions stay in one hairline container; the project callout is a sticky side column. The separate CTA band below was dropped on this page to avoid two CTAs in a row.
  - Contact: ivory column with hairline-divided channel rows beside the form; form uses tokens and the standard button.
  - Privacy / Shipping: content sits on plain ivory so it contrasts with the ivory-deep CTA band.
  - CTABand (privacy, shipping, product detail): rebuilt as an ivory-deep band with heading, two buttons, phone link and the wax seal. Removed the console bar, status pill, tag chips and assurance strip.
- **2026-11-14**: Our Approach page is now a single animated hero (`ApproachHero`, black) based on the client slide: heading + client intro between terracotta quote rules; four steps as chestnut-to-black bars joined by a dotted serpentine; each step links by a horizontal rail to three icons (single words taken from the step descriptions). A highlight cycles every 3s; hover/focus pauses; reduced motion shows everything lit and static. Step descriptions are the [DRAFT] lines from docs/03-content.md. Note: the black hero sits directly above the black footer (dark-on-dark, flagged before).
- **2026-11-14**: Our Approach animation made livelier: the highlight now moves every 1.7s (was 3s), and hovering no longer pauses it (it read as frozen). Added a breathing terracotta glow behind the active bar, a light sheen across it, a glowing line that fills the rail ahead of a bright travelling dot, glowing dotted links, and icons that light up in quick sequence with a glow and a pulse ring. Keyframes live in the component; all looping/pulse animation is off under reduced motion.
- **2026-11-14**: Terracotta is the primary accent everywhere; all gold/copper accents removed (client: "use terracotta instead of golden, our primary colour is terracotta").
  - Hard-coded gold (`#C99A53` and its gradients) replaced in Header, Hero, floating WhatsApp button, portfolio detail, FAQ preview and Approach teaser. The dark-green `#101D19` grounds there became black.
  - New token `--terracotta-on-dark: #B24C3B` in `src/styles/tokens.css` (= design/tokens.css `--terracotta-deep`, so not a new colour). The live `--terracotta` is the softened `#823627`, which is only 2.5:1 on black; the on-dark value is 4:1 on black (icons, rules, large text) and ivory text on it passes AA (4.65:1).
  - `--copper` and `--copper-light` now resolve to `--terracotta-on-dark`, so every legacy copper rule in globals.css turns terracotta.
  - On dark grounds, small text that was gold/khaki is now ivory (terracotta at 12px would fail AA). Terracotta is used for rules, icons, borders, buttons and large type ("Impressions" in the hero).
  - `.btn-on-dark` hover fill is terracotta instead of khaki. `Ornament` switches to the on-dark terracotta inside `.on-dark` sections.
  - Logos: no terracotta logo file exists and logos can't be recoloured, so the gold/copper logo variants were swapped for approved files. The header uses the ivory wordmark; the old gold-gradient wordmark was not in `assets/logo/svg` anyway. The footer emblem is ivory. The mobile menu, 404 and placeholder emblems are black.
  - Not changed: 3D scene materials (copper product renders in WebGL scenes) and the copper emblem texture on the 3D wax seal.
- **2026-11-14**: Fonts are self-hosted (`src/fonts/*.woff2`, loaded with `next/font/local` in `layout.tsx`) instead of `next/font/google`. On a slow connection the dev server timed out fetching ~20 Google font files and every page returned a 500 ("Can't resolve '@vercel/turbopack-next/internal/font/google/font'"). Same fonts (Cormorant Garamond 400–500, Manrope 400–600, Latin, variable woff2, OFL), so no visual change; builds and dev no longer need network access for fonts.
- **2026-11-16**: Client revision round (WhatsApp messages + "Website Content.pdf"). Each reference image maps to one request, in order:
  - Fonts → **Marcellus + Mulish** (font sheet option D). Self-hosted from the Fontsource npm packages (OFL) in `src/fonts/`. Marcellus has one weight and no italic, so the mockup's italic "Lasting Impressions." is set upright, and `font-synthesis-weight: none` stops fake bold. `font-serif` now maps to the display font. Numerals stay in Mulish because Marcellus's zero reads as an "O".
  - Home hero → client box-and-bow photo (the corrected version; the first one was missing the left bow loop) and the mockup copy: "Crafting / Lasting Impressions." + "Premium gifting solutions for meaningful connections." The kicker, long sublines, trust badges and the green leaf shapes were removed to match the mockup. Both CTAs stay because the site exists for leads. Below 1024px the photo fills the lower 60% and the copy sits on black above it, so text never covers the box.
  - About → single wax-seal photo; the overlapping award photo was removed.
  - What Sets Us Apart → client layout: heading block on top, then four promises in terracotta "01–04" discs with ivory hairlines on the start side and the wooden-box photo in an arch frame on the end side.
  - Core Values → client layout: left-aligned columns with solid terracotta icon, uppercase Mulish name, khaki hairline, description. Diamond frames, numbers and vertical rules removed.
  - Services page rebuilt from the PDF: Premium Gifting Solutions (text only, no photo was supplied) → Gifting Consultation (ivory card on an ivory-deep band, photo + PDF copy + four outlined key-term boxes) → Project Workflow (7 cards, copy verbatim from the client visual). The two previous service blocks (developer draft lists) were removed. Backgrounds go ivory / ivory-deep / ivory, so no dark sections touch.
  - `PageHero` gained `imageTreatment` (`dim` default, `blur`, `fade`, `plain`) and `imagePosition`. Services: blurred photo with a black fade solid at the start, clear at the end. Contact: envelope photo at full strength with a start fade, cropped 220px from the top. Portfolio: the black/terracotta stripe backdrop stretched to the banner (`plain`), no dimming or glow.
  - Portfolio filter "All Editions (21)" → "All (21)" (Maria).
  - Our Approach → four icons per step with the client's 16 labels (lucide icons matching the reference). The serpentine diagram now starts at 1024px; below that the stacked layout shows four icons per step.
  - New photos: originals in `assets/images/site/`, optimised WebP in `public/images/site/` and `public/images/hero/hero-bow-*.webp` via `npm run images`. The hero files were renamed so the image optimiser cache can't serve the old hero.

- **2026-11-16**: What Sets Us Apart: on desktop the promise list is exactly as tall as the arch photo. Promise 01 starts at the photo's top edge, 04 ends at its bottom edge, and the hairlines sit centred in the gaps (`role="list"` wrapper so separators can be real elements). Text and circles step up one size from 1280px.
- **2026-11-16**: Services · Gifting Consultation is now black with terracotta accents (client request): black band and card with a terracotta outline and soft glow, ivory heading and body, terracotta-outlined key-term boxes with a faint terracotta wash and icons, terracotta CTA (`--terracotta-on-dark`). Small "02" label is ivory, since terracotta at 12px fails AA on black. Page order stays dark hero / ivory / black / ivory, so no two dark sections touch.
- **2026-11-16**: The floating WhatsApp pill (bottom right) is replaced by an **"Ask NAQSH" chatbot** (client request: built in, no API key).
  - `src/lib/chatbot/knowledge.ts` builds every answer from existing content files (About, What Sets Us Apart, Vision, Mission, Core Values, Services, Project Workflow, Approach, the 19 FAQs, 7 collections, 21 products, phone and location). It adds no new facts. The only new wording is the pricing reply, which rephrases the budget FAQ and points to WhatsApp for a quote.
  - `src/lib/chatbot/engine.ts` runs in the browser. It normalises synonyms (plus a few Roman Urdu words, e.g. "kitna", "kahan", "salam"), strips simple word endings, and ranks entries with BM25 (question ×3, search keywords ×2.2, answer ×0.4). General answers win near-ties over single-product entries. Below the confidence threshold, or for topics the site has no confirmed answer for (email, working hours, people, socials, jobs, discounts), it does not guess: it gives the WhatsApp number and a "Chat on WhatsApp" button with the visitor's question prefilled. Greetings, thanks and goodbyes get short replies.
  - UI: `src/components/chatbot/`. The launcher keeps the old pill's look. The panel (ivory, black header, terracotta chips and buttons) is lazy-loaded on first open, so it adds no initial page weight, and it stays mounted so the conversation survives page navigation. It is a bottom sheet on phones. Accessibility: `role="dialog"`, a `role="log"` live region, labelled input, Escape closes, focus moves to the input on open and back to the launcher on close, `data-lenis-prevent` so smooth scroll doesn't hijack the message list, reduced-motion safe. axe: 0 violations.
  - A 59-question routing test passes, including off-topic questions that must fall back. The header's small WhatsApp icon is unchanged.
- **2026-11-16**: What Sets Us Apart, revised again (client: "move the image higher"). On desktop the arch photo now sits beside the heading and runs the full height of the text column, from the heading's top edge to the last promise's bottom edge (measured equal at 1440 and 1024). The top uses a 999px radius so it is always a true semicircle at any height. Phones and tablets keep heading, promises, then photo.
- **2026-11-16**: Header wordmark and footer emblem are now **terracotta** (client request), and the "Luxury Corporate Gifts" line under the header wordmark is removed. `assets/logo/svg` has no terracotta file, so the new `TerracottaLogo` component (`src/components/brand/Logo.tsx`) uses the approved ivory SVG unchanged as a CSS mask, filled with `--terracotta-on-dark` (#B24C3B, 4:1 on black). This bends the "never recolour logos" rule at the client's explicit request. The SVG files themselves are untouched; ask the designer for an official terracotta export to swap in later. The mobile menu still uses the black wordmark on its ivory panel.
- **2026-11-16**: Contact page: the "Attentive Corporate Consultation" channel table (and its "What to expect" note) is replaced by the client's **Get in Touch** panel design (`ContactPanel`): label, "Let’s Create Meaningful Connections", terracotta rule, intro, then WhatsApp (terracotta disc), Call Us (pine disc) and Email Us (khaki disc) cards beside the client's terracotta gift-box photo, with a full-width Our Location card (sage disc) below. A container query puts the photo beside the cards only when the panel is at least 34rem wide; otherwise it sits below them. Panel and form now split 6/6. Small labels use chestnut, since terracotta at 11px fails AA on ivory. The phone shows as "+92 346 9171798" to match the design.
- **2026-11-16**: The favicon is now the **terracotta NAQSH emblem** (client request). `src/app/icon.svg` is the approved emblem path unchanged, filled `#B24C3B` (`--terracotta-on-dark`) on a transparent square canvas. Also added `src/app/apple-icon.png` (180px, emblem on ivory) and a new `public/favicon.ico` (16/32/48px) for browsers without SVG support. The old manual `<link rel="icon">` to the black emblem in `layout.tsx` was removed; Next.js now generates the icon tags.
- **2026-11-16**: Home hero buttons ("Request Consultation", "Explore Collections") removed at the client's request. The hero is now headline + supporting line + scroll cue. Leads still have a route: the header "Request Consultation" button (tablet and up), the menu, and the Ask NAQSH chat. On phones and small tablets the photo now starts at 33% of the hero height (was 40%) to close the gap the buttons left.
- **2026-11-16**: Client confirmed the email **contact@naqshonline.co**. It is set once in `siteConfig.email` and now appears in the footer, the Contact page Email card (shown in production now) and the Organization JSON-LD (`email` + `contactPoint.email`). It is also the default inbox for consultation-form emails (`INQUIRY_RECIPIENT_EMAIL` still overrides). The chatbot answers email questions with it instead of falling back. Removed the invented `@naqsh.pk` addresses from `.env.example`, the README and the inquiry route.
- **2026-11-16**: The browser tab title is now just **"NAQSH"** on every page (client request), set once in `constructMetadata` (`src/lib/seo.ts`) with `title: { absolute: "NAQSH" }`. The descriptive per-page titles stay in `og:title` / `twitter:title`, so shared links still preview with a meaningful title. Trade-off: Google usually shows the `<title>` in search results, so every page now lists as "NAQSH" and loses keyword weight. Easy to revert per page if search ranking matters.
- **2026-11-16**: Section numbering removed everywhere (client request): the "01 / 02 / 03" before the ornament on the Services sections, "01 / 02" above Our Vision / Our Mission, "06 ·" on the portfolio catalogue label, the "01–04" prefix on the Our Approach step caption, and the "0X ·" prefixes in unused home section labels. The diamond-and-line ornaments stay. Numbers that belong to the content itself remain: the 01–04 promise circles and the 01–07 Project Workflow step cards.
- **2026-11-16**: Inner-page hero photos were too dark ("hero gets invisible"). `PageHero` overlays lightened: the default "dim" photo is now at 80% opacity (was 45%) under a fade that runs 0.82 → 0.08 (was solid black → 0.35); the "blur" and "fade" treatments start at ~0.8 instead of solid black and clear sooner; the bottom fade is 0.55 instead of solid. Readability is kept with a soft top band behind the header links (outside the parallax layer) and a light text-shadow on the label and intro. Most visible on FAQs and collection pages; Services and Contact photos are dark by nature.
- **2026-11-16**: Footer bottom line rebuilt as four evenly spaced items (client request): copyright, "Crafting Lasting Impressions", "Handcrafted in Lahore, Pakistan", "Nationwide Corporate Gifting", all in the same small uppercase style. From 1280px they sit on one row with equal gaps (`justify-between`); 640–1279px a 2×2 grid; phones stack them. `siteConfig.footer.craftedLine` is now a two-item array instead of a "·"-joined string. Footer bottom padding is now 7rem at every size so the floating Ask NAQSH button never covers the line.
- **2026-11-16**: The browser's page scrollbar is hidden (client request: the white bar at the right edge broke the dark hero and header). `globals.css` sets `scrollbar-width: none` on `html` plus `html::-webkit-scrollbar { display: none }`, so every section runs to the true edge. Wheel, touchpad, touch, keyboard and Lenis smooth scrolling are unchanged; only the draggable bar is gone. Inner scroll areas (chat log, catalogue filters) keep their thin styled scrollbars.
- **2026-11-16**: Added a branded **scroll trace** in place of the hidden native scrollbar (client request: "a little beautiful highlighted trace… merged into the website"). `src/components/layout/ScrollTrace.tsx`, mounted in the root layout, styles in `globals.css` (`.scroll-trace`). A 1px khaki hairline down the inline-end edge with a 3px terracotta pill thumb (gradient `--terracotta-on-dark` → `--terracotta`, soft glow). The thumb is sized to the viewport-to-page ratio (min 56px) and moves with scroll. It rests at 55% opacity and brightens fully while scrolling, settling back after 1.2s. Mouse users can drag the thumb (it widens to 5px on hover) or click the line to jump. On touch it is display-only (`pointer-events: none`). It is `aria-hidden` (keyboard and wheel scrolling unchanged), hidden on pages too short to scroll and in print, and its transitions are off under reduced motion. Dragging uses Lenis `scrollTo` so it stays in sync with smooth scrolling.
- **2026-11-16**: Product catalogue revision (client request). **Annual Event Giveaways removed**, leaving six collections. Seminar & Conference Kit moved to Client Packages; Fruit Party Favors and Wellness Kit moved to Custom & Occasion Specific Gifts. The collection is gone from the form's occasion list, sitemap, home gallery and chatbot (all data-driven), and `/portfolio/annual-event-giveaways` permanently redirects to `/portfolio`. Portfolio copy now says "six collections". Catalogue (`ProductCatalog.tsx`) changes:
  - Intro paragraph under "Explore Our Gift Editions." removed.
  - Tabs: "All" (no count), then collections A→Z; the selected tab is terracotta (was pine), hover is a terracotta outline.
  - Products sorted A→Z.
  - Each card: photo, name, and a chestnut "Request Details ↗" link to `/contact?product=<slug>#request-form`, which prefills the form and scrolls to it.
  - Removed: the green collection name under each name, the hover "Request Details" chip on the photo, and the details dialog (description and customization list; the chatbot still answers from that data).
  - Clicking the photo opens a lightbox with only the enlarged image (close button, Esc or click outside; fade-in skipped under reduced motion).
  - `MotionProvider` now honours a URL hash after client-side navigation (it used to always jump to the top), and the contact form column has `id="request-form"`.
- **2026-11-16**: Breadcrumb trail ("HOME / FAQS") removed from every inner-page hero (client request): `PageHero` no longer takes `breadcrumbs`, the pages stopped passing it, and `ApproachHero` dropped its own. PageHero top padding rises 1rem (`pt-28 sm:pt-40`) so the label keeps the same breathing room below the fixed header. `Breadcrumb.tsx` stays in the codebase, unused, in case it is wanted again.
- **2026-11-16**: Contact form "Gifting Category" (client request). The six collection options lose their "Collection · " prefix and show just the name; the last option is now simply "Other" (was "Other / Multiple Corporate Occasions", which was cut off in the select). Choosing **Other** reveals a required "Please Specify" text field (max 120 chars, auto-focused, short slide-in that is skipped under reduced motion), validated by `inquirySchema` (`occasionOther`). The Gifting Consultation link (`?service=gifting-consultations`) prefills Other + "Gifting consultation". The email and dev log now show the readable category (e.g. "Other: Annual dinner") via `describeOccasion()` instead of the raw slug, HTML-escaped in the email.
- **2026-11-16**: Footer columns nudged left on wide screens (client request: Our Policies "a little left, not exactly at center", Get in Touch "left a bit"). From 1280px the grid is `0.8fr / 1fr / 1fr`: Our Policies starts its column (at 1440 it moved from x≈572 to 483) and Get in Touch is centred in its column (1100 → 1009). Below 1280px the layout is unchanged, because the columns are nearly full there.
- **2026-11-16**: Removed the blank band under the footer's bottom line (client request): footer bottom padding is back to 2rem (`pb-8`) at every size. That padding had been keeping the Ask NAQSH pill off the line, so instead the launcher now shrinks to its round icon (`.is-compact`, label width/opacity transition, none under reduced motion) while the bottom line is on screen. An IntersectionObserver on `[data-footer-bottom]` drives it. Measured at 1920/1440/1024/768/390: no overlap with the line's text, and the full pill returns as soon as the footer scrolls away.
- **2026-11-16**: Footer Instagram and LinkedIn now use **placeholder links** at the client's request: `https://www.instagram.com/` and `https://www.linkedin.com/`, the platforms' home pages. Invented handles like `instagram.com/naqsh` were avoided because they could belong to someone else's account. They render as normal links (new tab, `noopener`) in dev and production, so the dev-only [CONFIRM] flags no longer show. They are not used in structured data (`sameAs`). Replace them in `siteConfig.socials` once the real profiles exist (listed in `08-open-items.md`).
- **2026-11-17**: Client sent the final policy texts and a new number.
  - **Phone/WhatsApp is now +92-300-1462774** (`wa.me/923001462774`). It is set once in `src/lib/whatsapp.ts` and flows to the header, footer, Contact panel, CTA band, chatbot and form fallbacks. Current docs and `.env.example` are updated; older history entries are left as written.
  - **Shipping & Delivery Policy** and **Data Privacy Policy** pages now carry the client's PDF text verbatim (`src/content/policies.ts`). The pending/[CONFIRM] placeholders are removed.
  - Both pages share a new `PolicyContent` layout: numbered sections (chestnut 01–06 numbers; Mulish numerals), Marcellus headings, terracotta diamond bullets with the PDF's bold lead-ins, and `support@naqshonline.co` rendered as a mailto link. The hero shows the policy's own intro.
  - The policies use **support@naqshonline.co** (client's wording). It is kept only on these pages; contact@ stays the main address.
  - The chatbot now answers shipping-rate, tracking, damaged/missing-item, wrong-address, delivery-method and data-privacy questions from the policy sections, linking to the page (17/17 routing checks pass).
- **2026-11-17**: Removed the "Let's Create Something Meaningful" CTA band (with the NAQSH seal) from the Data Privacy and Shipping & Delivery pages (client request). Each policy now goes straight into the footer. The band still appears on the individual collection pages.
- **2026-11-19**: Saved the client's **final edited logos** (`Final_Logos.zip`) unchanged in `assets/logo/final/`. It has `PDF/` and `PNG/` subfolders, original file names, and is byte-identical to the archive (checked with sha256). There are 10 artwork files, each as PDF and PNG: `logo1` (emblem: black-on-white, ivory-on-black, copper-shiny 2D, copper-shiny 3D), `logo2-3d` (black-on-white, ivory-on-black) and `naqsh-wordmark` (black-on-white, ivory-on-black, copper-shiny 2D, copper-shiny 3D). PNGs are 6000px wide RGBA. **Not wired into the site yet**: the header, footer and favicon still use `assets/logo/svg` (terracotta via CSS mask). Swapping them in is a separate step if wanted.
- **2026-11-19**: Client revision round (24 points).
  - **Logos**
    - Header wordmark and footer emblem are the client's **copper metallic 2D** finals. Web copies are built by `scripts/build-copper-logos.mjs` (trimmed, black background turned to transparency, artwork untouched) into `public/brand/copper-*.webp` and rendered by `CopperLogo`.
    - The copper art is designed for dark grounds, so the header now stays solid black on pages with an ivory top (`LIGHT_TOP_PATHS`: FAQs).
    - Rule note: these are raster files from `assets/logo/final`, not `assets/logo/svg`, at the client's instruction.
  - **Footer**
    - Columns are emblem | Discover (Our Philosophy → /our-approach, Shipping & Delivery, Terms & Policies → /privacy) | Get in Touch | Follow Us (Instagram, LinkedIn). The lists sit closer to the emblem.
    - The emblem cell stretches to the row, so the emblem runs from the first heading line to the last list line.
    - Bottom line: © (start) · Lahore, Pakistan (end). "Nationwide Delivery" was removed from the footer on 2026-11-19 (client request; it stays on the Contact location card).
    - Follow-up 2026-11-19: on desktop the four columns size to their content and share the free space evenly (`grid-cols-[6.5rem_auto_auto_auto] justify-between`, emblem column = emblem width), so the gaps emblem → Discover → Get in Touch → Follow Us are equal (207 px at 1440, 122 px at 1024).
    - Get in Touch rows show only the icon and the number / address; the words Call, WhatsApp and Email are screen-reader only. Footer emblem switched to the client's **logo1 copper 3D** file (`public/brand/copper-emblem-3d.webp`, new name so caches refresh); the header wordmark stays copper 2D.
  - **Hero image**
    - The source is only 1600×1007 and was compressed three times (source, export q82, next/image q75).
    - Now it is exported once with a Lanczos3 2400w upscale, light sharpening and q90; the phone crop is 1209w q88. `<Image quality={90}>` with 90 added to `images.qualities`.
    - Renamed `hero-hq-*.webp` to bust image caches. A higher-resolution original is still the real fix (open items).
  - **Home**
    - About Us background is black (was a dark green gradient).
    - The slogan is bold **sage**: pine fails contrast on black.
    - Core Values hairlines are terracotta.
    - Rule note: the dark photo hero is still followed directly by the dark About section, at the client's request.
  - **Services**
    - "Premium Gifting Solutions" (heading + body) is now the cover/hero text, and its separate section is removed; "Gifting Solutions for Every Business Occasion" is gone.
    - Project Workflow's Request Consultation button is removed.
    - Book a Consultation is terracotta for fill, border and hover.
    - Rule note: the hero is now directly followed by the black Gifting Consultation band.
  - **Our Approach**
    - Added a "How We Work" label.
    - The hero is full viewport height, so the footer only appears after scrolling; the diagram is vertically centred with the left column.
    - Step one-liners removed.
    - Serpentine curves sit behind the step boxes (boxes `z-10` with a black base, curves `z-0`).
    - The loop is slower: 2.8s per step, was 1.7s.
  - **Portfolio**
    - "Curated Product Catalogue" label removed.
    - Intro is the company profile's PRODUCT PORTFOLIO paragraph, ending "…not limited to the following:" as the client wrote it (the PDF ends "…not limited to:").
    - Request Details opens the contact form in a new tab.
  - **FAQs**
    - No cover image: a plain ivory title "Everything You Need to Know" (one line from 1024px).
    - The side heading is smaller, so it fits on two lines.
    - The side text now ends "…tailored to your organizational requirements."
    - Removed four FAQs (bespoke concepts, payment process, seasonal campaigns, corporate events), leaving 15. Chatbot search hints for bespoke and seasonal questions moved to the nearest remaining answers.
  - **Contact**
    - Gifting Category lists the Portfolio collections A–Z plus Other, built from `collections`.
    - Please Specify spans the full row under Category + Quantity.
    - Channel cards: the name (Marcellus, ~1.19rem) is one step larger than the value (Mulish, ~0.94rem, no wrap), so the email fits on one line.
    - The panel stretches to the form and ends on the same line; its photo flexes on laptops.
    - Rushda's panel text is still to come; the current text stays.
  - **Type scale**
    - One set of tokens (`--fs-h1/h2/h3/h4/lead/body`, mirrored in `design/tokens.css`) applied to every section heading, sub-heading, card title and body paragraph across Home, Services, Approach, Portfolio, FAQs, Contact, policies and collection pages.
    - The home hero headline is intentionally larger.
- **2026-11-19**: **Next.js 16.4.3 → 16.4.6** (and `eslint-config-next` to match), a patch release.
  - **Why:** `next build` on 16.4.3 ended with a security-advisory notice and exit code 1. The advisories were GHSA-mfr8-8qww-v76h and GHSA-vc7v-qv4w-wrv8, both moderate, for 16.2.0–16.4.4: data leaks between root params in `use cache` functions. The site was not exposed (`cacheComponents: false`, no `use cache`, `unstable_cache` or root params), but the failing exit could block deploys.
  - **Result:** 16.4.6 has no advisories, and the build now exits 0 with all 22 pages prerendered. No code changes were needed. The type check is clean, and lint shows only the existing errors in the untouched 3D, ScrollEffects and CMS files. All 9 routes were smoke-tested at 1440 and 390.
  - **Audit note:** the remaining high-severity `npm audit` items are in `lighthouse` (a dev-only tool) and its dependencies. The site's own `zod` is 4.6.7, which is already patched; only lighthouse's nested zod 3.x is flagged.
- **2026-11-19**: Review pass of the 24-point revision (all points re-verified in the browser at 1440/1024/390). Gaps found and fixed:
  - The phone menu still showed the black wordmark. It now has a black top bar like the site header, with the copper wordmark and an ivory close button.
  - The phone menu's 01–06 item numbers used a monospace font outside the type system; they are now Mulish.
  - The unused old Services title ("Gifting Solutions for Every Business Occasion.") is removed from `services.ts`.
  - Still open: Rushda's contact-panel text, and a high-resolution hero original.

## 2026-11-19 · "Website Content 2.pdf"
- **FAQs**: the blue edits applied verbatim (questions 2, 3, 5, 6, 7, 8, 9, 10, 11, 13, 15, numbered as on the FAQ page). The client marked the dashes, so the em dashes in those answers are now spaced hyphens (" - "), as typed in the PDF.
- **Our Philosophy**: new page `/our-philosophy` (content in `src/content/philosophy.ts`, layout in `PhilosophyContent`). Text-only black hero like the policy pages, then the five principles as numbered rows on ivory, then the closing note in italics. The footer "Our Philosophy" link now goes here instead of Our Approach. Added to the sitemap and to the chatbot (interest-free, halal, sourcing, Amanah questions).
- **Contact panel**: label "Get in Touch" → "Contact Our Team"; new sub-heading "Prefer to talk right away?" above the channel cards; "Our Location" → "Location". Heading and intro unchanged, as the PDF says.
- **Footer**: Discover order is now Our Philosophy · Terms & Policies · Shipping & Delivery. Get in Touch was already icon-only.

## 2026-11-20 · Client review (screenshots)
- **About**: the slogan is the same size as the paragraph above (`--fs-lead`, 16px on phones like the paragraph), bold, sage, no diamond bullet.
- **What Sets Us Apart**: the four promises use the intro paragraph's size (`--fs-body`).
- **Services**: Book a Consultation is #7F3021 (the existing `--chestnut` token); hover fills with `--terracotta-on-dark`.
- **Portfolio**: hero heading "Product Portfolio" with the company-profile intro as its body (colon → period); the old hero title and subtitle are gone. "Explore Our Gift Editions" has no period and the tabs sit directly under it. Copy moved to `src/content/portfolio.ts`.
- **FAQs**: small "Frequently Asked Questions" label with a line above the title, like the other pages (pine text, terracotta line, as the page is ivory).
- **Contact**: hero title has no period. Panel heading is "Contact Our Team" with no label above it. The form card now stretches to the bottom of its column on desktop (`lg:[&>form]:flex-1`), so the panel and the form end on the same line at 1440 and 1024.
- **Form placeholders**: First Last · ABC Enterprises · name@company.com.

## 2026-11-20 · Footer redesign (client mock-up)
- Headings and contact icons in `--khaki` (#C0A48E, the client's beige; 8.9:1 on black). Contact icons are bare (no circles).
- Follow Us: two 44 px khaki-gradient discs (khaki mixed with black only, no new colour) with an ivory glyph, no text labels; accessible names stay on the links. The highlight sits in the corner so the glyph keeps 3:1+ against the disc.
- Columns: emblem | Discover | Get in Touch | Follow Us in four equal columns, so the headings start at equal intervals (308 px apart at 1440, 244 px at 1024). This replaces the earlier "equal gaps between content" layout.
- Discover and Get in Touch rows share one row height (40 px, 4 px gap), so their three lines sit on the same lines.

## 2026-11-20 · Phone menu fixes
- **Request Consultation did nothing**: `Button` dropped `onClick` when rendered as a link, so the menu never closed and stayed over the page it navigated to (on /contact nothing visible happened). `Button` now passes `onClick` to `Link` / `<a>`; the menu's Request Consultation and WhatsApp buttons close the menu.
- **Oversized emblem**: `cn()` is plain `clsx` (no Tailwind merging), so default size classes (`w-auto` in `Emblem`, `h-auto` in `CopperLogo`) could beat the caller's size and render the logo at full file size. Defaults are now dropped (`Emblem`) or applied only when no height is given (`CopperLogo`). This also fixes the 404 page and image-placeholder emblems.
- **Menu bottom row**: Lahore, Pakistan | copper 3D emblem (56 px) | phone (tap to call), on a black strip that mirrors the black top bar, because the copper art is made for dark grounds and looks washed out on ivory.

## 2026-11-20 · Services hero in HD, no blur
- The 6 px CSS blur and 110% zoom are gone: `PageHero`'s "blur" treatment is replaced by "clear" (full-sharpness photo, same start fade for the copy).
- The source is only 1500×1200 (1500×996 after the black band is cut), so it now gets the home hero's export: one Lanczos3 upscale to 2400w, light sharpening, q90 (`services-cover-hq.webp`, new name to bust caches), served with `imageQuality={90}`.
- `images.deviceSizes` gains 2400 so retina desktops get the full export instead of 1920; phones still get 1280 or less. A higher-resolution original from the client would still be the real fix.

## 2026-11-20 · Footer in the logo's copper
- Footer headings, contact icons and the social discs now use the copper of the client's logo instead of khaki (client request).
- **Rule conflict, flagged**: CLAUDE.md allows only existing tokens, and the palette's `--copper` is an alias for terracotta. The logo copper was therefore added as three tokens sampled from the client's final logo files (`assets/logo/final`): `--copper-logo` #C07752 (midtone, 4.7:1 on black, AA for the small headings), `--copper-logo-light` #EEAD83 and `--copper-logo-dark` #9A5836 (disc gradient). Added to both `src/styles/tokens.css` and `design/tokens.css`. Not for text on ivory (2.7:1).
- Link text stays ivory for readability. The disc highlight is kept small in the corner so the ivory glyph measures 3.4:1 or more against the disc.

## 2026-11-20 · Client's refined hero photos
- Home hero and Contact hero now use the client's refined photos (`assets/images/site/hero-gift-box-refined.png` 1581×995 and `contact-cover-refined.png` 1672×941; lossless PNGs from the client, older originals kept).
- Same HD pipeline as before (Lanczos3 to 2400w, q90) but with a lighter sharpen, since the sources are already sharpened. Home phone crop is now right-aligned on the box. Contact keeps a 230 px top crop and is served at quality 90.
- New file names (`hero-refined-*`, `contact-cover-refined`) so browsers and the image cache pick up the new photos. Old `hero-hq-*` and `contact-cover.webp` exports removed.

## 2026-11-20 · Final emblem (client's updated logo files)
- The project held the emblem files from `Final_Logos.zip`; the client's `~/Downloads/Final_Logos` folder has newer versions of all 12 emblem files (logo1 and logo2, PDF and PNG, saved 2026-11-19 15:50). The wordmark files were unchanged. The 12 files in `assets/logo/final` were replaced with the new versions (the old ones remain only in git history).
- The footer emblem (also used in the phone menu) is now built from the vector `logo1_copper-shiny-3d.pdf`: `scripts/build-copper-logos.mjs` renders it with pdftocairo, drops the 2 px half-pixel page edge, trims the black and turns it into transparency as before. Output `public/brand/copper-emblem-final.webp` (327×600); the previous `copper-emblem-3d.webp` was removed.

## 2026-11-20 · Client's 2K hero photos (home and contact)
- New originals from the client at 2752×1536 (`assets/images/site/hero-gift-box-2k.jpg`, `contact-cover-2k.jpg`), replacing the refined 1581/1672 px versions from earlier today (removed).
- They are larger than the 2400w export, so they are only scaled down (Lanczos3, q90) with no upscaling or sharpening. The home phone crop is 4:5 at native 1229w, centred on the wax seal. Contact keeps the same share of empty space cut from the top (360 px).
- New file names (`hero-2k-*`, `contact-cover-2k`) so browsers and the image cache pick up the new photos.

## 2026-11-20 · Services hero: stronger HD refinement
- No CSS blur remains; the remaining softness is the source itself (1500 px wide, shot with a shallow focus, so the middle of the frame is out of focus by design). No larger copy exists on this machine.
- `scripts/optimize-images.mjs` gains a `refine` step (`refineHd`, uses ImageMagick): light deblock, 16-bit linear-light EWA LanczosSharp upscale to 2400w, tuned unsharp mask, CLAHE local contrast blended at 30%. Output `site/services-cover-hd.webp` (q90); the previous `services-cover-hq.webp` was removed.
- The real fix is a larger original (like the 2752×1536 home and contact photos); listed in the open items.

## 2026-11-20 · Services hero: client's 2K photo
- New original `assets/images/site/services-cover-2k.jpg` (2400×1792, no black band), replacing the 1500 px photo and its ImageMagick refinement (the `refine` step was removed from `scripts/optimize-images.mjs`, no longer used).
- Exported as is at q90 (`site/services-cover-2k.webp`): no crop, upscaling or sharpening. Same "clear" treatment (no blur) and start fade.

## 2026-11-20 · Gifting Consultation photo
- New client photo (`assets/images/site/gifting-consultation-v2.webp`, 1024×1536; was 678×1080), kept at native size and served at quality 90. Same scene, so the alt text is unchanged.
- The wide 16:10 tablet crop now focuses lower (`sm:object-[50%_74%]`) so the consultant's hand and the brochure stay in frame; phone and desktop keep 40% centre.

