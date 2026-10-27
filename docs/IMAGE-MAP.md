# Image map

Originals stay untouched in `assets/images/products/` (21 PNGs, 1800 × 1350, 4:3, ~1.2–3 MB each).
`npm run images` (`scripts/optimize-images.mjs`) writes optimized WebP masters to `public/images/`; `next/image`
then serves AVIF/WebP at the exact rendered size (`sizes` set per slot). Budgets: hero under ~300 KB, cards under ~150 KB.

> [!IMPORTANT]
> There is no dedicated hero photo and no collection photography yet. Every slot below uses the client's product
> photos. Ask the client for a real hero shot (16:9 with room on the left, plus a 4:5 crop) and one photo per collection.

## Filename swap found
Viewing every photo showed two files whose content does not match their name:
- `wellness-kit.png` actually shows the **Independence Day** set (Minar-e-Pakistan box, "Happy Independence Day",
  "Pakistan Zindabad" flag pin, plant tagged "A Greener Brighter Pakistan").
- `independence-day-gift.png` actually shows the **Wellness** set (Natural Honey, Herbal Tea, Scented Candle, mixed
  nuts, "Wellness Looks Good On You" card).

The site maps them by content (optimized output names are corrected). Originals are not renamed. Listed in `08-open-items.md`.

## Role assignments
| Slot | Source file | Crop / focus | Optimized output |
|---|---|---|---|
| **Hero, desktop** | `new-hire-welcome-kit.png` | Top 22% trimmed (removes printed lid copy behind the headline) → 1800 × 1050, cover, focus 50% 60% | `hero/hero-desktop.webp` |
| **Hero, mobile (4:5)** | `new-hire-welcome-kit.png` | 840 × 1050 crop from the trimmed master, centered on the tray (tumbler, pen, power bank) | `hero/hero-mobile.webp` |
| Hero corner card "Ramadan & Eid baskets" | `eid-celebration-basket.png` | square thumb, focus 50% 45% | via products |
| Home · About (clip reveal) | `client-onboarding-kit.png` | 4:5, focus 45% 50% | via products |
| Home · Services teaser, Personalized Gifts | `retirement-award.png` (engraved, personalized message) | 4:5, focus 62% 50% | via products |
| Services page · Personalized Gifts | `retirement-award.png` | 4:3 | via products |
| Services page · Gifting Consultations | `pakistan-heritage-gift-set.png` (curation story) | 4:3 | via products |
| Collection · New Hire Welcome Kits | `new-hire-welcome-kit.png` | 4:5, focus 35% 60% | via products |
| Collection · Client Packages | `pakistan-heritage-gift-set.png` | 4:5, focus 45% 55% | via products |
| Collection · Ramadan & Eid Baskets | `ramadan-delights.png` | 4:5, focus 62% 60% | via products |
| Collection · Annual Event Giveaways | `seminar-conference-kit.png` | 4:5, focus 55% 50% | via products |
| Collection · Brand Souvenirs | `branded-merchandise.png` | 4:5, focus 55% 50% | via products |
| Collection · Appreciation Gifts | `excellence-award.png` | 4:5, focus 50% 50% | via products |
| Collection · Custom & Occasion Specific | `new-year-celebration-box.png` | 4:5, focus 45% 55% | via products |
| Open Graph image | none (generated: ivory card + wordmark + emblem + tagline) | — | `src/app/opengraph-image.tsx` |

"via products" = `public/images/products/<product-slug>.webp` (max 1600 px wide, WebP q78), also used in each
collection's product gallery.

## Spare (not in a hero/cover role; shown only in their collection gallery)
`fruit-party-favors`, `sports-medals-trophies`, `wellness-kit` (file `independence-day-gift.png`),
`independence-day-gift` (file `wellness-kit.png`), `newborn-welcome-baby-boy`, `newborn-welcome-baby-girl`,
`birthday-celebration-box`, `kids-gift-box`, `fathers-day-gift`, `mothers-day-gift`, `womens-day-gift-basket`,
`eid-celebration-basket` (also the hero card thumb), `client-onboarding-kit` (also About).

## Alt text (also stored in `src/content/products.ts`)
| Product | Alt text |
|---|---|
| Excellence Award | Crystal employee appreciation award with a green marble base, copper accent and the Naqsh emblem. |
| Client Onboarding Kit | Ivory laptop bag with leather handles, chestnut notebook, tumbler, power bank and card holder, all branded Naqsh. |
| Eid Celebration Basket | Woven basket with an Eid Mubarak card, glass bangles, jhumka earrings, sweets and a dusty-pink ribbon. |
| Newborn Welcome - Baby Boy | Wicker basket with a teddy bear, blue baby clothes, care products, booties and "Welcome Baby Boy" balloons. |
| Newborn Welcome - Baby Girl | Basket with a plush bunny, pink baby clothes, care products, booties and "Welcome Baby Girl" balloons. |
| Father's Day Gift | Black Naqsh box with honey, premium dry fruits, a leather wallet and a paisley pocket square beside a Father's Day card. |
| Mother's Day Gift | Woven basket with herbal tea, dates, nuts, seed crackers, a potted flowering plant and a Mother's Day card. |
| Women's Day Gift Basket | Rope basket with a lilac bouquet, eau de parfum, scented candle, chocolates and a Women's Day card. |
| Fruit Party Favors | Two cellophane-wrapped baskets of mangoes and oranges tied with gold ribbon and black Naqsh tags. |
| Independence Day Gift | Ivory and sage box with a Minar-e-Pakistan illustration, a Pakistan flag pin and a potted plant in a Naqsh pot. |
| Sports Medals & Trophies | Gold, silver and bronze medals on green ribbons in a black presentation box with the Naqsh emblem. |
| New Hire Welcome Kit | Dark green welcome box with a notebook, tumbler, pen, power bank and key ring, beside a Welcome card. |
| Seminar & Conference Kit | Charcoal leather bag, black croc-embossed pouch and card holder, key ring and a green notebook embossed with the Naqsh emblem. |
| Birthday Celebration Box | Ivory Naqsh box with a floral cake, cupcakes, a Happy Birthday card and a confetti balloon tied with blue ribbon. |
| Kids' Gift Box | Sage Naqsh box with a children's book, puzzle, paint set, colour pencils, water bottle and pencil case. |
| Wellness Kit | Ivory box with natural honey, herbal tea, mixed nuts, a scented candle and a "Wellness Looks Good On You" card. |
| New Year Celebration Box | Terracotta box with dried flowers, a bottle, notebook and keepsakes beside a Happy New Year card. |
| Branded Merchandise | Naqsh-branded tote, cap, bottle, mug, T-shirt, polo, notebook, mouse pad, lanyard and desk accessories. |
| Pakistan Heritage Gift Set | Heritage set with a printed shawl, hand-painted mug, Minar-e-Pakistan notebook, truck-art model and sweets. |
| Ramadan Delights | Ivory Ramadan Mubarak box with an embossed Naqsh emblem and a tray of filled, decorated dates. |
| Retirement Award | Gold oval plaque engraved "With Deep Appreciation" in a dark green presentation box beside a Naqsh sleeve. |

Hero alt: "A dark green Naqsh welcome box, open to show a notebook, tumbler, pen, power bank and leather key ring."
