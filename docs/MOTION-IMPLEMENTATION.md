# Naqsh Website — Motion & Scroll Architecture (`MOTION-IMPLEMENTATION.md`)

This document details the motion architecture, reusable data-attribute API, section-by-section choreography, and shared `--scene-progress` 3D hooks implemented across the Naqsh website. Every speed, stagger, reveal mode, and scrub parameter can be tuned declaratively via HTML data attributes or the centralized controller in `src/components/motion/ScrollEffects.tsx`.

---

## 1. Foundation & Global Motion Architecture

### 1.1 Smooth Scroll & GSAP Synchronization (`src/components/motion/MotionProvider.tsx`)
- **Lenis Configuration**:
  - `duration`: `1.2`
  - `easing`: `(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`
  - `smoothWheel`: `true`
  - `syncTouch`: `false`
- **GSAP Ticker Integration**:
  - `lenis.on("scroll", ScrollTrigger.update)`
  - `gsap.ticker.add((time) => lenis.raf(time * 1000))`
  - `gsap.ticker.lagSmoothing(0)`
- **Lifecycle & Route Handling**:
  - On route changes (`usePathname()`): resets scroll via `lenis.scrollTo(0, { immediate: true })` and runs `ScrollTrigger.refresh()`.
  - Refreshes `ScrollTrigger` after web fonts finish loading (`document.fonts.ready`) and as lazy-loaded `<img>` assets complete (`load` event listener).
  - Intercepts hash/anchor clicks (`a[href^="#"]`) and scrolls smoothly via `lenis.scrollTo(target, { offset: -88 })`.

### 1.2 Progressive Enhancement & Zero-FOUC (`src/app/layout.tsx` & `src/app/globals.css`)
- An inline `<script>` in `<head>` synchronously adds `.js` to `<html>` (and `.reduced-motion` if `prefers-reduced-motion: reduce` matches) before first paint.
- Initial hidden states (`opacity: 0`, `transform`, `clip-path`) are scoped strictly under `html.js:not(.reduced-motion) [data-reveal]:not(.is-revealed)`.
- With JavaScript disabled or `prefers-reduced-motion: reduce` active, all content renders at `opacity: 1` immediately with zero layout shift.
- All images reserve space via explicit `aspect-ratio` containers (`.image-frame`).

### 1.3 Responsive `gsap.matchMedia()` Rules (`src/components/motion/ScrollEffects.tsx`)
| Media Condition | Behavior |
| :--- | :--- |
| `(min-width: 1024px) and (prefers-reduced-motion: no-preference)` | Full choreography: desktop pinning (`Vision & Mission`, `Our Approach`, `Portfolio`), horizontal scroll gallery, full-amplitude parallax (`100%`), sticky visual crossfades, and scrubbed scenes. |
| `(max-width: 1023px) and (prefers-reduced-motion: no-preference)` | Mobile/Tablet mode: parallax runs at **50% amplitude** (`amplitudeScale = 0.5`), **no pinning**, **no horizontal scroll**, vertical stacking with entrance reveals only. |
| `(prefers-reduced-motion: reduce)` | Accessibility mode: Lenis disabled (native browser scroll), no parallax, no pinning, no scrubbing, and all `[data-reveal]` elements immediately marked `.is-revealed` at `opacity: 1`. |

---

## 2. Reusable Data-Attribute API

Any element on the site can opt into motion or be re-tuned without modifying JavaScript by setting these attributes:

| Data Attribute | Accepted Values | Default / Notes |
| :--- | :--- | :--- |
| `data-parallax="<number>"` | Float speed factor (e.g. `"0.15"`, `"-0.14"`, `"0.08"`) | Moves element against scroll (`yPercent: -speed * 100 -> +speed * 100`, `scrub: 0.6`). Negative reverses direction. Adds `will-change: transform` only to parallax elements. |
| `data-parallax-axis` | `"y"` \| `"x"` | Defaults to `"y"`. Set `"x"` for horizontal counter-parallax. |
| `data-reveal` | `"up"` \| `"fade-up"` \| `"lines"` \| `"words"` \| `"clip"` \| `"fade"` \| `"scale"` | Triggers at `"top 85%"`, plays once (`power3.out`, duration `0.9s–1.15s`, distance `36px`). |
| `data-delay` | Seconds (e.g. `"0.15"`) | Optional reveal delay in seconds. |
| `data-stagger` | Seconds (e.g. `"0.1"`, `"0.12"`) | Optional stagger between lines, words, or child items. |
| `data-clip-from` | `"bottom"` \| `"left"` \| `"right"` \| `"top"` | Controls direction for `data-reveal="clip"` (`inset(100% 0 0 0)`, `inset(0 100% 0 0)`, etc. to `inset(0% 0% 0% 0%)`). |
| `data-draw` | `"left"` \| `"center"` \| `"top"` | Draws hairline borders (`scaleX(0 -> 1)` or `scaleY(0 -> 1)`) at `"top 85%"`. |
| `data-count-to` | Integer (e.g. `"1"`, `"2"`) | Animates zero-padded index numbers (`00 -> 01`, `00 -> 02`) with a subtle `y: 18 -> 0` lift. |
| `data-pin` | `"true"` or scene name | Marks a section for desktop pinning via `ScrollTrigger`. |
| `data-pin-end` | Scroll distance (e.g. `"+=200%"`, `"+=300%"`) | Controls pin duration on desktop (`>=1024px`). |
| `data-scrub` | `"true"` or number (e.g. `"0.6"`) | Enables smoothed scrub (`0.6s`) on custom scenes. |
| `data-magnetic` | `"true"` or max pull in px (e.g. `"8"`) | Desktop-only subtle magnetic cursor pull (capped at `8px`). |

---

## 3. Home Page — Section-by-Section Reference

### 3.1 Hero Load (`src/components/sections/Hero.tsx`)
- **Effect**:
  - Background photo scales `1.15 -> 1` over `1.8s` (`power3.out`).
  - Site header fades in (`opacity: 0 -> 1`, `0.9s`).
  - Headline reveals line by line (`overflow: hidden` line masks sliding `yPercent: 110 -> 0`, `stagger: 0.12s`, `duration: 1.05s`).
  - Subline, CTA buttons, and bottom strip fade up (`y: 32 -> 0`, `stagger: 0.1s`).
- **Selectors & Attributes**:
  - `[data-hero]` (root section)
  - `[data-hero-photo]` on `.hero-photo`
  - `[data-hero-headline]` (`data-reveal="lines" data-stagger="0.12"`)
  - `[data-hero-sub]`, `[data-hero-actions]`, `[data-hero-bottom]`

### 3.2 Hero Scroll (`src/components/sections/Hero.tsx`)
- **Effect**: Scrubbed (`scrub: 0.6`, `start: "top top"`, `end: "bottom top"`):
  - Background wrapper `[data-hero-parallax]` moves `yPercent: 0 -> 18`.
  - Headline block moves `y: 0 -> -90`, `opacity: 1 -> 0.15`.
  - Subline and buttons move `y: 0 -> -50`, `opacity: 1 -> 0`.
  - Bottom strip fades out (`opacity: 1 -> 0`).
  - Bottom copper line `[data-hero-copper-line]` draws left-to-right (`scaleX: 0 -> 1`).
  - `"Scroll to explore"` cue `[data-hero-scroll-cue]` fades out over the first `80px` of scroll (`end: "top+=80 top"`).

### 3.3 About (`src/components/sections/About.tsx`)
- **Effect**:
  - Heading uses line-by-line mask reveal; body copy fades up.
  - Primary photo clip-reveals (`inset(100% 0 0 0) -> inset(0)`) with inner image parallax `yPercent: -8 -> +8`.
  - Secondary overlapping photo clip-reveals and counter-parallaxes `yPercent: +14 -> -14` so the two photos separate on scroll.
  - Slogan hairlines draw outward from the center (`transform-origin: center`, `scaleX: 0 -> 1`).
- **Attributes Used**:
  - Heading: `data-reveal="lines"`
  - Primary `ImageFrame`: `data-reveal="clip" data-clip-from="bottom" data-parallax="0.08"`
  - Secondary `ImageFrame` (`.about-visual-secondary`): `data-reveal="clip" data-clip-from="bottom" data-parallax="-0.14"`
  - Slogan rules: `data-draw="center"`

### 3.4 Services (`src/components/sections/ServicesTeaser.tsx`)
- **Effect**:
  - Two alternating rows. Row 01 image clip-reveals from the left (`inset(0 100% 0 0)`); Row 02 image clip-reveals from the right (`inset(0 0 0 100%)`).
  - Inner images parallax `yPercent: -10 -> +10`.
  - Row numbers `01` and `02` count in with a small `y` lift (`18px -> 0`).
  - Text blocks (tag, title, summary, deliverables, CTA) stagger fade-up (`0.1s`).
- **Attributes Used**:
  - `ImageFrame`: `data-reveal="clip" data-clip-from="left|right" data-parallax="0.10"`
  - Row index: `data-count-to="1"` and `data-count-to="2"`
  - Copy wrapper: `data-service-copy` with child `data-reveal="up"` and `data-stagger="0.08"`

### 3.5 What Sets Us Apart (`src/components/sections/WhySetsApart.tsx`)
- **Effect**:
  - Each numbered row draws its top hairline left-to-right (`scaleX: 0 -> 1`), followed by the big numeral and statement fading up.
  - On desktop (`>=1024px`), `.why-visual` is sticky (`top: 18vh`) and crossfades (`0.6s`, `power2.out`) between the 4 matching editorial photos as each `[data-why-item]` crosses the viewport center (`start: "top 58%"`, `end: "bottom 42%"`).
  - Inactive rows dim to `opacity: 0.4`; active row highlights at `opacity: 1`.
- **Attributes Used**:
  - `[data-why-section]`, `[data-why-item="<index>"]`, `[data-why-slide="<index>"]`
  - Hairlines: `data-draw="left"`
  - Row copy: `data-reveal="up"`

### 3.6 Vision & Mission (`src/components/sections/VisionMission.tsx`)
- **Effect**:
  - `.vision-black-overlay` fades `opacity: 0 -> 1` scrubbed over the first `25%` of the viewport entry (`start: "top bottom"`, `end: "top 75%"`), transitioning smoothly from warm ivory to deep charcoal-black without animating CSS `background-color`.
  - On desktop (`>=1024px`), `[data-vision-pin]` pins for `200vh` (`end: "+=200%"`, `scrub: 0.6`):
    1. **Vision** words (`[data-vision-word]`) scrub from `opacity: 0.15 -> 1`.
    2. Holds briefly while the copper diamond divider (`[data-vision-divider]`) scales in (`scale: 0 -> 1`).
    3. Crossfades to **Mission** (`[data-vision-panel="mission"]`) and scrubs Mission words (`[data-mission-word]`) from `opacity: 0.15 -> 1`.
  - Exposes normalized progress (`0..1`) to `--scene-progress` and the shared scene store (`vision`).
- **Attributes Used**:
  - `[data-vision-scene]`, `[data-vision-overlay]`, `[data-vision-pin]` (`data-pin="vision" data-pin-end="+=200%" data-scrub="0.6"`), `[data-vision-word]`, `[data-mission-word]`, `[data-vision-divider]`

### 3.7 Core Values (`src/components/sections/CoreValues.tsx`)
- **Effect**:
  - Three columns fade up with a `0.12s` stagger (`ScrollTrigger` at `"top 85%"`).
  - Vertical column hairlines draw from top to bottom (`scaleY: 0 -> 1`, `transform-origin: top`).
  - Icon circles scale `0.9 -> 1` (`opacity: 0 -> 1`).
- **Attributes Used**:
  - `[data-core-values]`, `[data-core-card]`
  - Vertical hairlines: `data-draw="top"`
  - Icon badges: `data-reveal="scale"`

### 3.8 Our Approach (`src/components/sections/ApproachSection.tsx`)
- **Effect**:
  - **Desktop (`>=1024px`)**: Pins `[data-approach-sequence]` for `300vh` (`end: "+=300%"`, `scrub: 0.6`). Steps `01` through `04` activate sequentially (`opacity: 1`, dark charcoal card with warm ivory text `.is-active`), while inactive steps drop to `opacity: 0.35`. The vertical copper progress line `[data-approach-progress]` draws from `scaleY: 0 -> 1`. Exposes `--scene-progress` (`approach`).
  - **Mobile (`<=1023px`)**: No pin; each `[data-approach-step]` fades up individually (`data-reveal="up"`).
- **Attributes Used**:
  - `[data-approach-sequence]` (`data-pin="approach" data-pin-end="+=300%" data-scrub="0.6"`)
  - `[data-approach-progress]`, `[data-approach-step]`

### 3.9 Portfolio (`src/components/sections/CollectionGallery.tsx` & `src/components/sections/ProductCatalog.tsx`)
- **Effect**:
  - **Pinned Horizontal Gallery (Desktop `>=1024px`)**: `[data-horizontal-gallery]` pins for `+=${scrollWidth - innerWidth}` and translates `[data-horizontal-track]` by `-(scrollWidth - innerWidth)`.
    - Each card image (`[data-gallery-img]`) counter-parallaxes horizontally (`xPercent: -8 -> +8`).
    - Collection index numbers (`[data-gallery-num]`) shift horizontally at a distinct speed (`xPercent: 18 -> -18`).
    - Bottom progress bar (`[data-gallery-progress]`) fills (`scaleX: 0 -> 1`).
    - Exposes `--scene-progress` (`portfolio`).
  - **All Products Grid**: Uses `ScrollTrigger.batch("[data-product-card]")` with a `0.08s` staggered fade-up (`y: 32 -> 0`).
  - **Category Filter Transition**: Switching filter pills triggers a clean fade + `12px` vertical lift (`0.45s`, `power3.out`) on updated cards.
- **Attributes Used**:
  - `[data-horizontal-gallery]`, `[data-horizontal-track]`, `[data-gallery-card]`, `[data-gallery-img]`, `[data-gallery-num]`, `[data-gallery-progress]`
  - `[data-product-grid]`, `[data-product-card]`

### 3.10 Marquee Strip (`src/components/sections/BrandTicker.tsx`)
- **Effect**:
  - Infinite horizontal GSAP loop (`xPercent: -50 -> 0`).
  - Reads `lenis.velocity` each animation frame to boost loop speed (`1 + |v| * 0.18`) and apply a velocity-proportional `skewX` (clamped to `±6deg`), easing smoothly back to `0deg` and base speed when scrolling stops.
  - Reverses horizontal travel direction when scroll direction flips.
- **Attributes Used**:
  - `[data-marquee]`, `[data-marquee-track]`

### 3.11 CTA Band (`src/components/sections/CTABand.tsx`)
- **Effect**:
  - Slides upward (`y: 44 -> 0`, `scrub: 0.6`) with `margin-top: -2.5rem` and elevated `z-index` so it overlaps the bottom edge of the preceding section.
  - Heading reveals line-by-line (`data-reveal="lines"`).
  - Wax seal (`[data-wax-seal]`) animates once on enter (`scale: 1.25 -> 1`, `rotation: -6 -> 0`, `duration: 1.05s`, `power3.out`) and toggles `.is-stamped` so its drop shadow tightens.
- **Attributes Used**:
  - `[data-cta-band]`, `[data-wax-seal]`, `data-reveal="lines"`

### 3.12 Footer (`src/components/layout/Footer.tsx`)
- **Effect**:
  - Uncover parallax: `.site-footer` uses `position: sticky; bottom: 0; z-index: -1` on desktop while `#main-content` sits above (`z-index: 2`, `background: var(--color-bg-primary)`).
  - As `#main-content` scrolls away (`trigger: "#main-content"`, `start: "bottom bottom"`, `end: "+=520"`), `[data-footer-inner]` moves `yPercent: -25 -> 0`.
  - Giant copper wordmark (`[data-footer-wordmark]`) fades up while its 5 SVG letter slices (`N-A-Q-S-H`, `[data-footer-letter]`) stagger in (`yPercent: 45 -> 0`, `stagger: 0.08s`).
- **Attributes Used**:
  - `[data-footer-reveal]`, `[data-footer-inner]`, `[data-footer-wordmark]`, `[data-footer-letter]`

### 3.13 Global Chrome (`src/components/motion/MotionChrome.tsx` & `src/components/layout/Header.tsx`)
- **Top Copper Progress Bar**: `2px` fixed bar at top of viewport (`#scroll-progress`, `scaleX: 0 -> 1`, `transform-origin: left`).
- **Direction-Aware Header**: Hides on scroll down (`header-hidden`, `translateY(-100%)`) after `120px` and returns immediately on scroll up, applying a soft glass blur (`header-scrolled`) after `80px`.
- **Link Underlines**: Draw left-to-right on hover and collapse to the right on mouse-leave.
- **Magnetic Buttons**: Desktop buttons with `[data-magnetic]` respond to cursor proximity with up to `8px` of damped pull.
- **Route Transition**: `.page-canvas` performs a soft `0.3s` opacity fade on pathname changes.

---

## 4. Inner Pages (`STEP 3`)

- **`PageHero` (`src/components/ui/PageHero.tsx`)**:
  - Heading: `data-reveal="lines" data-stagger="0.1"`
  - Breadcrumb & Lead intro: `data-reveal="up"` with `0.06s` / `0.14s` delays.
- **Editorial Images (`Services`, `Portfolio`, `Portfolio/[slug]`)**:
  - Wrapped in `ImageFrame` with `data-reveal="clip"` and inner parallax `data-parallax="0.08"`.
- **FAQ Accordion (`src/components/ui/Accordion.tsx`)**:
  - Uses CSS Grid row transition (`grid-template-rows: 0fr -> 1fr`) over `0.5s cubic-bezier(0.22, 1, 0.36, 1)` with inner overflow wrapper so height animates without layout thrashing.
- **Contact & Inquiry Form (`src/components/form/InquiryForm.tsx`)**:
  - `[data-form-stagger]` staggers `.field` blocks on enter (`stagger: 0.07s`, `y: 24 -> 0`).
- **Policy Pages (`src/app/privacy/page.tsx`, `src/app/shipping-delivery/page.tsx`)**:
  - Wrapped in `[data-policy-page]` with gentle fade-only reveal (`data-reveal="fade"`).

---

## 5. Shared `--scene-progress` Hooks for 3D (`src/lib/scene-progress.ts`)

All pinned scenes publish normalized progress (`0` to `1`) both to CSS custom properties and to a lightweight reactive store (`src/lib/scene-progress.ts`) ready for Three.js / React Three Fiber consumption:

1. **CSS Custom Properties**:
   - `--scene-progress` on `[data-vision-scene]`, `[data-approach-sequence]`, and `[data-horizontal-gallery]`
   - Global `--scene-progress-vision`, `--scene-progress-approach`, `--scene-progress-portfolio`, and `--scene-progress` on `document.documentElement` (`:root`)
2. **JavaScript / Three.js API (`src/lib/scene-progress.ts`)**:
   - `getSceneProgress("vision" | "approach" | "portfolio" | "active")` — zero-allocation synchronous getter for `useFrame()` loops (already wired in `src/components/three/SceneCanvas.tsx`).
   - `useSceneProgress(scene)` — `useSyncExternalStore` hook for React components.
   - `setSceneProgress(scene, value, element)` — updates both the store and CSS custom properties.

---

## 6. Verification & Performance Metrics (`STEP 4`)

Verified against the production build (`npm run build && npm start`) using Playwright and Lighthouse:

- **Smoothness (Desktop `1440×900` Auto-Scroll)**:
  - **Average FPS**: `58.66 fps` (`59.0 fps` peak run; target `>= 55 fps`)
  - **Average Frame Delta**: `17.05 ms` (`16.95 ms` peak run)
  - **Max Frame Delta**: `33.4 ms – 50.0 ms`
- **Lighthouse Scores (Home `/`)**:
  - **Mobile (`390×844`, 4× CPU / Slow 4G)**: Performance **`86`**, Accessibility **`100`**, Best Practices **`100`**, SEO **`100`**, CLS **`0`** (`FCP: 1,098 ms`, `LCP: 2,848 ms`, `TBT: 397 ms`, `SI: 2,323 ms`)
  - **Desktop (`1440×900`)**: Performance **`100`**, Accessibility **`96`**, Best Practices **`100`**, SEO **`100`**, CLS **`0`** (`FCP: 286 ms`, `LCP: 731 ms`, `TBT: 50 ms`, `SI: 699 ms`)
- **Layout & Reveal Integrity**:
  - `1440px` & `390px`: `scrollWidth === clientWidth` (`hasHorizontalOverflow: false`), `56 / 56` `[data-reveal]` elements visible after full scroll (`stuckCount: 0`), `CLS: 0`.
  - `prefers-reduced-motion: reduce`: Lenis disabled (`hasLenis: false`), `pinSpacers: 0`, `hiddenCount: 0`.
  - Resize (`390px -> 1440px`), route changes (`/ -> /services -> /portfolio`), and browser Back button: triggers cleanly torn down and re-registered (`pinsAt390: 0`, `pinsAt1440: 3`, `pinsAfterBack: 3`, `consoleErrors: []`).
- **Performance Optimizations Applied**:
  - Pre-rendered `.motion-line-mask > .motion-line-inner` spans in `Hero.tsx` so SSR text nodes are never detached on hydration.
  - Separated all DOM/style writes (`prepareTextBatch` and `gsap.set`) from `ScrollTrigger.create` layout reads and scheduled below-the-fold trigger registration across short macrotask slices to eliminate layout thrashing.
  - Used `gsap.quickSetter` for 50%-amplitude mobile parallax to avoid redundant scrub-tween allocations on mobile devices.
  - Paused marquee loops when off-screen via `ScrollTrigger` `onToggle`.
- **Recorded Artifacts**:
  - Desktop scroll-through video: `docs/scroll-demo.webm`
  - Step-by-step `1440px` and `390px` screenshots: `docs/screenshots/`

