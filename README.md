# Naqsh · Crafting Lasting Impressions

> **B2B Corporate Gifting & Experience Consultancy**  
> *Lahore, Pakistan · Nationwide Delivery*  
> *"Beyond the box, into an experience!"*

---

## 1. Overview & Quiet-Luxury Design Standard
This repository contains the bespoke corporate gifting website for **Naqsh**, crafted to an uncompromising quiet-luxury standard ($10,000 agency caliber). 

### Key Design Pillars
- **Strict Color Tokens**: ~75% Warm Ivory (`#F7F1E7`), ~10% Black, ~8% Deep Terracotta (`#B24C3B` with verified 4.65:1 WCAG AA contrast against ivory text), ~7% Pine Teal, Sage, and Khaki. Never two dark or saturated sections placed back-to-back.
- **Editorial Typography**: Cormorant Garamond for titles, headlines, and client quotes; Manrope for clean, crystal-clear corporate UI and body copy.
- **Micro-Animations & Smooth Scroll**: Lenis smooth scrolling paired with GSAP ScrollTrigger animations, strictly disabled when `prefers-reduced-motion` is detected.
- **Tactile Heritage Accents**: Concentric-ridge 3D Wax Seals (`WaxSeal.tsx`), embossed cards, subtle diamond-lattice watermark backgrounds, and refined copper gradients.
- **Zero Hallucination of Business Facts**: Missing client facts (MOQ numbers, precise lead times, corporate bank accounts) use discreet, dev-only `[CONFIRM]` tags that disappear cleanly in production builds.
- **Unverified Content Guard**: Client partner logos, testimonials, and social media handles are hidden from layout until real client assets are uploaded.

---

## 2. Technology Stack
- **Framework**: Next.js 16 (App Router, Turbopack, React 19, Strict TypeScript)
- **Styling**: Tailwind CSS v4 with `@theme inline` restricting all utilities strictly to official design tokens
- **Motion**: Lenis + GSAP ScrollTrigger (`MotionProvider.tsx` with fallback timeout)
- **Forms & Validation**: Zod schema validation, honeypot anti-spam protection, Resend email dispatch with local dev console logging
- **Direct Consultation**: WhatsApp instant consultation deep links (see `src/lib/whatsapp.ts`)
- **CMS**: Sanity CMS with seamless automatic fallback to local typed data in `src/content/`
- **Testing**: Playwright automated responsive screenshot suite (1440px, 1024px, 768px, 390px) + `@axe-core/playwright` accessibility audits

---

## 3. Quick Start

### Prerequisites
- Node.js 20+ (LTS recommended)
- npm or pnpm

### Installation & Development
```bash
# 1. Clone the repository
git clone https://github.com/your-org/naqsh-website.git
cd naqsh-website

# 2. Install dependencies
npm install

# 3. Start local development server (with Turbopack)
npm run dev

# 4. Open in browser
# http://localhost:3000
```

### Production Build
```bash
# Compile and statically generate all 21 routes
npm run build

# Start production server
npm run start
```

---

## 4. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

| Variable | Description | Default / Dev Fallback |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata & sitemaps | `https://naqsh.pk` |
| `RESEND_API_KEY` | Resend API key for inquiry email dispatch | If unset, inquiries are logged cleanly to the server terminal |
| `INQUIRY_RECIPIENT_EMAIL` | Target inbox for corporate inquiries | `consultations@naqsh.pk` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity Studio Project ID | If unset, loads from `src/content/` |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity Dataset | `production` |

---

## 5. Architecture & File Structure

```
├── docs/                           # Architectural plans, decisions, open items & image maps
│   ├── PLAN.md                     # Comprehensive architecture and conflict resolutions
│   ├── DECISIONS.md                # Engineering and design decisions log
│   ├── IMAGE-MAP.md                # Mapping and crops for all 21 product assets
│   └── 08-open-items.md            # Actionable client questions and sign-off checklist
├── sanity/                         # Sanity CMS schemas
│   └── schemaTypes/                # Collections, products, FAQs, testimonials, client logos
├── scripts/                        # Automation & optimization scripts
│   ├── optimize-images.mjs         # Sharp-based image optimization & hero cropping
│   └── test-qa.mjs                 # Playwright responsive verification & axe audit
├── public/                         # Public static assets
│   ├── brand/                      # Vector wordmarks, emblems, and lattice pattern
│   └── images/                     # Hero crops & optimized WebP product masters
└── src/
    ├── app/                        # Next.js App Router
    │   ├── api/inquiry/route.ts    # Inquiry form API with honeypot & Resend
    │   ├── contact/page.tsx        # Consultation inquiry portal & direct channels
    │   ├── faqs/page.tsx           # Categorized FAQs & Google FAQPage schema
    │   ├── our-approach/page.tsx   # 4-stage journey & client preparation checklist
    │   ├── portfolio/              # 7 Occasion collections grid & bespoke note
    │   │   └── [slug]/page.tsx     # Dynamic collection detail (SSG) with product pieces
    │   ├── privacy/page.tsx        # Data Privacy Policy with confirm tags
    │   ├── services/page.tsx       # Detailed service cards & workflow strip
    │   ├── shipping-delivery/page.tsx # Nationwide logistics & claims policy
    │   ├── globals.css             # Tailwind v4 theme, tokens & tactile button styles
    │   ├── layout.tsx              # Root layout with fonts, metadata & motion provider
    │   ├── opengraph-image.tsx     # Dynamic OpenGraph social card
    │   ├── robots.ts & sitemap.ts  # Search engine indexing configuration
    │   └── not-found.tsx           # Bespoke luxury 404 page
    ├── components/
    │   ├── brand/                  # Logo and WaxSeal components
    │   ├── form/                   # InquiryForm & FormSuccess with animated seal stamp
    │   ├── layout/                 # Header, Footer, MobileMenu dialog & SkipLink
    │   ├── motion/                 # MotionProvider & ScrollEffects
    │   ├── sections/               # All 10 modular home page sections
    │   └── ui/                     # Button, SectionLabel, Accordion, Confirm, PageHero
    ├── content/                    # Single source of truth for copy, products & collections
    └── lib/                        # CMS fallback, WhatsApp links, SEO, Zod validators
```

---

## 6. Testing & Quality Assurance
Run the automated responsive testing suite:
```bash
node scripts/test-qa.mjs
```
This script tests:
1. **Responsive Viewports**: 1440px (Desktop), 1024px (Laptop), 768px (Tablet), and 390px (Mobile).
2. **Zero Horizontal Overflow**: Ensures `scrollWidth <= innerWidth` across every page.
3. **Accessibility**: Runs `@axe-core/playwright` checks against WCAG 2.1 AA rules.
4. **Visual Snapshots**: Saves JPEG screenshots of each viewport to `docs/screenshots/`.

---

## 7. Open Items & Client Next Steps
See `docs/08-open-items.md` for full details on items pending client confirmation (official email address, studio operating hours, legal policy review, and official brand copper hex).
