export interface Collection {
  slug: string;
  title: string;
  tagline: string;
  image: string;
  alt: string;
  description: string;
  typicalInclusions: string[];
}

export const collections: Collection[] = [
  {
    slug: "new-hire-welcome-kits",
    title: "New Hire Welcome Kits",
    tagline: "A first-day welcome that makes new team members feel chosen.",
    image: "/images/products/new-hire-welcome-kit.webp",
    alt: "Dark green welcome box with a notebook, tumbler, pen, power bank and key ring, beside a Welcome card.",
    description:
      "Set the tone from day one. Thoughtfully assembled kits that express genuine belonging, elevate your employer brand, and give new hires practical, premium tools they will proudly carry.",
    typicalInclusions: [
      "Custom branded notebook & executive pen",
      "Insulated stainless steel tumbler",
      "High-capacity power bank & key lanyard",
      "Personalized welcome note on embossed cardstock",
    ],
  },
  {
    slug: "client-packages",
    title: "Client Packages",
    tagline: "Considered gifts that thank, impress and strengthen the relationship.",
    image: "/images/products/pakistan-heritage-gift-set.webp",
    alt: "Heritage set with a printed shawl, hand-painted mug, Minar-e-Pakistan notebook, truck-art model and sweets.",
    description:
      "Deepen executive relationships with meaningful brand moments. Curated for client anniversaries, onboarding milestones, deal closures, and holiday gratitude.",
    typicalInclusions: [
      "Handcrafted artisanal keepsakes",
      "Premium leather folios & desk accessories",
      "Gourmet selections & regional heritage items",
      "Bespoke presentation packaging with custom wax seal",
    ],
  },
  {
    slug: "ramadan-eid-baskets",
    title: "Ramadan & Eid Baskets",
    tagline: "Seasonal baskets presented with care for teams, clients and partners.",
    image: "/images/products/ramadan-delights.webp",
    alt: "Ivory Ramadan Mubarak box with an embossed Naqsh emblem and a tray of filled, decorated dates.",
    description:
      "Celebrate festive traditions with reverence and elevated craft. Filled with handpicked dates, celebratory sweets, and festive tokens packaged in luxury keepsake boxes.",
    typicalInclusions: [
      "Stuffed Medjool dates & roasted nuts",
      "Artisanal honey or herbal infusions",
      "Festive greeting cards & seasonal tokens",
      "Woven or embossed presentation baskets",
    ],
  },
  {
    slug: "annual-event-giveaways",
    title: "Annual Event Giveaways",
    tagline: "Memorable takeaways that carry your brand beyond the event.",
    image: "/images/products/seminar-conference-kit.webp",
    alt: "Charcoal leather bag, black croc-embossed pouch and card holder, key ring and a green notebook embossed with the Naqsh emblem.",
    description:
      "Move past disposable event swag. We design event souvenirs that attendees genuinely keep, use, and associate with a world-class conference or annual gala.",
    typicalInclusions: [
      "Architectural stationery & conference folios",
      "Sleek cardholders and executive bags",
      "Branded premium tech accessories",
      "Custom packaging tailored to event themes",
    ],
  },
  {
    slug: "brand-souvenirs",
    title: "Brand Souvenirs",
    tagline: "Quietly branded keepsakes your audience will actually keep.",
    image: "/images/products/branded-merchandise.webp",
    alt: "Naqsh-branded tote, cap, bottle, mug, T-shirt, polo, notebook, mouse pad, lanyard and desk accessories.",
    description:
      "Quiet branding with premium materials. Apparel, drinkware, and everyday companions crafted to uphold your company's visual standards without shouting.",
    typicalInclusions: [
      "Tailored organic cotton apparel",
      "Double-walled drinkware & matte ceramic mugs",
      "Minimalist desk mats & tech essentials",
      "Subtle debossed or tone-on-tone branding",
    ],
  },
  {
    slug: "appreciation-gifts",
    title: "Appreciation Gifts",
    tagline: "Recognition that feels personal, not procedural.",
    image: "/images/products/excellence-award.webp",
    alt: "Crystal employee appreciation award with a green marble base, copper accent and the Naqsh emblem.",
    description:
      "Recognize loyalty, milestones, and outstanding contribution with awards and tokens that communicate deep, authentic gratitude.",
    typicalInclusions: [
      "Custom etched crystal or stone awards",
      "Commemorative medals & plaques",
      "Curated wellness & restorative rituals",
      "Hand-signed congratulatory parchment",
    ],
  },
  {
    slug: "custom-occasion-gifts",
    title: "Custom & Occasion Specific Gifts",
    tagline: "Something entirely your own, designed around your moment.",
    image: "/images/products/new-year-celebration-box.webp",
    alt: "Terracotta box with dried flowers, a bottle, notebook and keepsakes beside a Happy New Year card.",
    description:
      "Life moments deserve bespoke attention. From welcoming a newborn to retirement tributes, women's day baskets, and family celebrations.",
    typicalInclusions: [
      "Newborn welcome sets for team families",
      "Retirement celebration plaques & tributes",
      "Father's Day, Mother's Day & Women's Day baskets",
      "Custom curated gift boxes built from scratch",
    ],
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
