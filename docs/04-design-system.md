# 04 — Design system: "Warm Quiet Luxury"

Source of truth for values: `design/tokens.css`. Look at `reference/moodboard.png` and `reference/palette.png`.

## Feel
Tactile and calm, like touching linen, clay, leather and a wax seal. Ivory-led. Dark and terracotta used sparingly
for contrast. Generous whitespace, hairline borders, soft shadows, slightly embossed cards.

## Color balance
| Share | Colors | Where |
|---|---|---|
| ~75% | Floral White `--ivory`, `--ivory-deep` (khaki tint) | Page and card backgrounds |
| ~10% | Black, Charcoal | Dark sections, footer, body text |
| ~8% | Terracotta, Chestnut | Buttons, the one CTA band, links, hovers |
| ~7% | Pine Teal, Sage, Dusty Olive, Khaki | Small touches only |

Rules
- Never two dark or colored sections back to back. Alternate with ivory.
- Hero is photo-led. After it, the page is ivory with: Vision & Mission (black), CTA band (terracotta), footer (black). Inner pages get at most one dark or terracotta band.
- Body text: Charcoal on ivory. Headings: Black. Small colored text: Pine Teal (labels) or Chestnut (links).
- On dark: Ivory text, Khaki secondary text, Khaki outline buttons.
- **Sage and Dusty Olive never as text on ivory** (about 3:1). Use for icons, borders, small shapes.
- Khaki as text only on black. Terracotta text only large (24px+) or as button fill.
- Terracotta button with ivory text is about 4.4:1. Use 17px+, weight 600, uppercase, tracking 0.06em. If an audit demands strict AA, darken the fill slightly and tell me.

Small touches of the other colors
- Section labels (e.g. "01 · Services"): Pine Teal.
- Core Values and Why Us icons: Sage on ivory circles (as in the client's PDF).
- Top border on the 4 promise cards: Terracotta, Pine Teal, Sage, Khaki (2px).
- Form focus ring and success tick: Pine Teal. Tags (e.g. "Ramadan & Eid"): Pine Teal fill, ivory text.
- Footer links: Khaki on black. Selection highlight: Khaki at 40%.

## Typography
- Display and headings: **Cormorant Garamond** 400/500 (matches the roman serif of the NAQSH wordmark). Big, light, tight.
- Body and UI: **Manrope** 400/500/600.
- Labels: Manrope 600, uppercase, 0.75rem, tracking 0.16em.
- Scale (fluid): display `--fs-display`, h1, h2, h3, body `--fs-body`, small, label. Line heights in tokens.
- Load with `next/font`, `display: swap`, only the weights above. Headings use `text-wrap: balance`, body `text-wrap: pretty`.
- Urdu later: plan for Noto Nastaliq Urdu; use logical CSS properties (margin-inline, padding-inline, inset-inline) now so RTL is easy.

## Layout
- 12-column grid, container `--container` (1280px), side padding `--gutter`. Section vertical padding `--section-y`.
- Asymmetry is welcome: text in 5 columns, image in 6, with an offset. Avoid the "three equal cards in a row" look everywhere.
- Mobile first. Breakpoints 390 / 768 / 1024 / 1440. No horizontal scroll at any width.

## Shape and depth
- Cards: radius 16px, fill `--ivory-deep` or white-ish ivory, 1px hairline, `--shadow-soft` on hover only.
- Images: radius 20px (full-bleed hero and bands have none).
- Buttons: rectangular (2px radius), 1px border. **Primary:** terracotta fill + ivory text + round arrow icon in a 1px circle at the right. **Secondary:** outline (charcoal on ivory, khaki on dark). Hover: fill slides to chestnut, arrow nudges 4px.
- Hairlines 1px (`--hairline`). Use them to divide sections, headers and footers, like the Fitosauna reference.
- Subtle emboss on key cards: `--shadow-emboss`.

## Signature motifs
- **Emblem** as a wax seal: terracotta circle with the ivory emblem inside, soft drop shadow. Used in the CTA band and as the form success stamp.
- **Diamond lattice** (`assets/pattern/diamond-lattice.svg`): from the emblem's diamonds. 4-6% opacity, on ivory-deep bands and the dark footer. Never behind body text.
- **Numbered section labels** ("01 · About") in small caps, Pine Teal.
- Thin copper line accents (`--copper`) sparingly: a divider under the hero tagline, line draws.

## Hero (see `reference/hero-inspiration-oryzo.png` and `hero-inspiration-fitosauna.png`)
- Full-screen photo, 100svh. Overlay: linear-gradient chestnut-to-black at about 35%, so ivory text stays readable.
- Header over the hero: boxed "Menu" (mobile) / small-caps nav (desktop) at left, centered **wordmark-ivory**, right: WhatsApp icon + Request Consultation (outline).
- Headline "Crafting Lasting Impressions": `--fs-display`, Cormorant light, ivory, left, max 3 lines.
- Subline: 1 short line. One terracotta button with round arrow.
- Bottom-left: small-caps slogan. Bottom-right: small outlined card (thumbnail + "Ramadan & Eid baskets" + arrow). Bottom-center: "Scroll to explore" with a thin line.
- Hairlines under the header and above the bottom strip.
- Image: right-of-center subject. Mobile uses the portrait crop.

## Header and footer
- Header: transparent over the hero. After the hero: ivory at 85% with backdrop blur, black wordmark, hairline. Hides on scroll down, returns on scroll up.
- Mobile menu: full-screen ivory overlay, large serif links, hairlines, the emblem at the bottom.
- Footer: black, diamond lattice at 5%, emblem-ivory + wordmark-copper-gradient, tagline, quick links, policies, phone / WhatsApp, email and social (only when they exist), © line.

## Logo usage
Files in `assets/logo/svg`: `wordmark-{black,ivory,copper,copper-gradient}.svg`, `emblem-{...}.svg`.
| Place | File |
|---|---|
| Header over hero | wordmark-ivory |
| Header after hero, on ivory | wordmark-black |
| Footer and dark sections | wordmark-copper-gradient or wordmark-ivory |
| Wax seal / CTA | emblem-ivory on a terracotta circle |
| Favicon | emblem SVG with `prefers-color-scheme` (black on light, ivory on dark) |
| Apple touch icon | emblem-ivory on black, 180px |
| Open Graph image | ivory card, wordmark-black, emblem, tagline |
Minimum sizes: wordmark 120px wide, emblem 40px tall. Clear space around a logo at least the height of the letter N.
Do not stretch, recolor by hand, add shadows, or place on busy photos without the overlay.

## Imagery
Warm daylight, soft shadows, natural materials, palette-matched colors. Products on ivory, linen, paper or concrete.
Crops: hero 16:9 + 4:5 mobile, cards 4:5, bands 21:9. Rounded 20px except full-bleed.
No images yet: use `Placeholder` (ivory-deep block with lattice and a small label like "Image: Welcome Kit"), never hotlinked stock.

## Components to build
Button (primary / secondary / on-dark), ArrowCircle, SectionLabel, Heading (with line-mask reveal), Header, MobileMenu, Footer,
LogoWordmark, LogoEmblem, WaxSeal, Placeholder, ImageFrame (reveal + parallax), PromiseCard, ValueCard, ServiceCard,
CollectionCard, StepList (pinned), Accordion (FAQ), TestimonialSlider (hidden if empty), LogoRow (hidden if empty),
InquiryForm, FormSuccess (seal stamp), CTABand, PageHero (inner pages), Prose (policies), Breadcrumb (collections).

## Accessibility
WCAG 2.2 AA. Skip link, landmarks, one h1 per page, visible focus (2px Pine Teal ring, 2px offset), 44px targets,
labels on every field, errors announced, alt text, reduced-motion support, `lang="en"`, no information by color alone.
