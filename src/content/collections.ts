export interface Collection {
  slug: string;
  title: string;
  tagline: string;
  image: string;
  alt: string;
}

export const collections: Collection[] = [
  {
    slug: "new-hire-welcome-kits",
    title: "New Hire Welcome Kits",
    tagline: "A first-day welcome that makes new team members feel chosen.",
    image: "/images/products/new-hire-welcome-kit.webp",
    alt: "Dark green welcome box with a notebook, tumbler, pen, power bank and key ring, beside a Welcome card.",
  },
  {
    slug: "client-packages",
    title: "Client Packages",
    tagline: "Considered gifts that thank, impress and strengthen the relationship.",
    image: "/images/products/pakistan-heritage-gift-set.webp",
    alt: "Heritage set with a printed shawl, hand-painted mug, Minar-e-Pakistan notebook, truck-art model and sweets.",
  },
  {
    slug: "ramadan-eid-baskets",
    title: "Ramadan & Eid Baskets",
    tagline: "Seasonal baskets presented with care for teams, clients and partners.",
    image: "/images/products/ramadan-delights.webp",
    alt: "Ivory Ramadan Mubarak box with an embossed Naqsh emblem and a tray of filled, decorated dates.",
  },
  {
    slug: "annual-event-giveaways",
    title: "Annual Event Giveaways",
    tagline: "Memorable takeaways that carry your brand beyond the event.",
    image: "/images/products/seminar-conference-kit.webp",
    alt: "Charcoal leather bag, black croc-embossed pouch and card holder, key ring and a green notebook embossed with the Naqsh emblem.",
  },
  {
    slug: "brand-souvenirs",
    title: "Brand Souvenirs",
    tagline: "Quietly branded keepsakes your audience will actually keep.",
    image: "/images/products/branded-merchandise.webp",
    alt: "Naqsh-branded tote, cap, bottle, mug, T-shirt, polo, notebook, mouse pad, lanyard and desk accessories.",
  },
  {
    slug: "appreciation-gifts",
    title: "Appreciation Gifts",
    tagline: "Recognition that feels personal, not procedural.",
    image: "/images/products/excellence-award.webp",
    alt: "Crystal employee appreciation award with a green marble base, copper accent and the Naqsh emblem.",
  },
  {
    slug: "custom-occasion-gifts",
    title: "Custom & Occasion Specific Gifts",
    tagline: "Something entirely your own, designed around your moment.",
    image: "/images/products/new-year-celebration-box.webp",
    alt: "Terracotta box with dried flowers, a bottle, notebook and keepsakes beside a Happy New Year card.",
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
