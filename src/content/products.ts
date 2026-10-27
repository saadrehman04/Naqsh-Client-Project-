export interface Product {
  name: string;
  slug: string;
  image: string;
  collection: string;
  group?: string;
  featured?: boolean;
  alt: string;
}

export const products: Product[] = [
  {
    name: "Excellence Award",
    slug: "excellence-award",
    image: "/images/products/excellence-award.webp",
    collection: "appreciation-gifts",
    group: "Awards & recognition",
    featured: true,
    alt: "Crystal employee appreciation award with a green marble base, copper accent and the Naqsh emblem.",
  },
  {
    name: "Client Onboarding Kit",
    slug: "client-onboarding-kit",
    image: "/images/products/client-onboarding-kit.webp",
    collection: "client-packages",
    featured: true,
    alt: "Ivory laptop bag with leather handles, chestnut notebook, tumbler, power bank and card holder, all branded Naqsh.",
  },
  {
    name: "Eid Celebration Basket",
    slug: "eid-celebration-basket",
    image: "/images/products/eid-celebration-basket.webp",
    collection: "ramadan-eid-baskets",
    featured: true,
    alt: "Woven basket with an Eid Mubarak card, glass bangles, jhumka earrings, sweets and a dusty-pink ribbon.",
  },
  {
    name: "Newborn Welcome - Baby Boy",
    slug: "newborn-welcome-baby-boy",
    image: "/images/products/newborn-welcome-baby-boy.webp",
    collection: "custom-occasion-gifts",
    group: "Family & life moments",
    alt: "Wicker basket with a teddy bear, blue baby clothes, care products, booties and Welcome Baby Boy balloons.",
  },
  {
    name: "Newborn Welcome - Baby Girl",
    slug: "newborn-welcome-baby-girl",
    image: "/images/products/newborn-welcome-baby-girl.webp",
    collection: "custom-occasion-gifts",
    group: "Family & life moments",
    alt: "Basket with a plush bunny, pink baby clothes, care products, booties and Welcome Baby Girl balloons.",
  },
  {
    name: "Father's Day Gift",
    slug: "fathers-day-gift",
    image: "/images/products/fathers-day-gift.webp",
    collection: "custom-occasion-gifts",
    group: "Seasonal & national days",
    alt: "Black Naqsh box with honey, premium dry fruits, a leather wallet and a paisley pocket square beside a Father's Day card.",
  },
  {
    name: "Mother's Day Gift",
    slug: "mothers-day-gift",
    image: "/images/products/mothers-day-gift.webp",
    collection: "custom-occasion-gifts",
    group: "Seasonal & national days",
    alt: "Woven basket with herbal tea, dates, nuts, seed crackers, a potted flowering plant and a Mother's Day card.",
  },
  {
    name: "Women's Day Gift Basket",
    slug: "womens-day-gift-basket",
    image: "/images/products/womens-day-gift-basket.webp",
    collection: "custom-occasion-gifts",
    group: "Seasonal & national days",
    alt: "Rope basket with a lilac bouquet, eau de parfum, scented candle, chocolates and a Women's Day card.",
  },
  {
    name: "Fruit Party Favors",
    slug: "fruit-party-favors",
    image: "/images/products/fruit-party-favors.webp",
    collection: "annual-event-giveaways",
    alt: "Two cellophane-wrapped baskets of mangoes and oranges tied with gold ribbon and black Naqsh tags.",
  },
  {
    name: "Independence Day Gift",
    slug: "independence-day-gift",
    image: "/images/products/independence-day-gift.webp",
    collection: "custom-occasion-gifts",
    group: "Seasonal & national days",
    alt: "Ivory and sage box with a Minar-e-Pakistan illustration, a Pakistan flag pin and a potted plant in a Naqsh pot.",
  },
  {
    name: "Sports Medals & Trophies",
    slug: "sports-medals-trophies",
    image: "/images/products/sports-medals-trophies.webp",
    collection: "appreciation-gifts",
    group: "Awards & recognition",
    alt: "Gold, silver and bronze medals on green ribbons in a black presentation box with the Naqsh emblem.",
  },
  {
    name: "New Hire Welcome Kit",
    slug: "new-hire-welcome-kit",
    image: "/images/products/new-hire-welcome-kit.webp",
    collection: "new-hire-welcome-kits",
    featured: true,
    alt: "Dark green welcome box with a notebook, tumbler, pen, power bank and key ring, beside a Welcome card.",
  },
  {
    name: "Seminar & Conference Kit",
    slug: "seminar-conference-kit",
    image: "/images/products/seminar-conference-kit.webp",
    collection: "annual-event-giveaways",
    featured: true,
    alt: "Charcoal leather bag, black croc-embossed pouch and card holder, key ring and a green notebook embossed with the Naqsh emblem.",
  },
  {
    name: "Birthday Celebration Box",
    slug: "birthday-celebration-box",
    image: "/images/products/birthday-celebration-box.webp",
    collection: "custom-occasion-gifts",
    group: "Family & life moments",
    alt: "Ivory Naqsh box with a floral cake, cupcakes, a Happy Birthday card and a confetti balloon tied with blue ribbon.",
  },
  {
    name: "Kids' Gift Box",
    slug: "kids-gift-box",
    image: "/images/products/kids-gift-box.webp",
    collection: "custom-occasion-gifts",
    group: "Family & life moments",
    alt: "Sage Naqsh box with a children's book, puzzle, paint set, colour pencils, water bottle and pencil case.",
  },
  {
    name: "Wellness Kit",
    slug: "wellness-kit",
    image: "/images/products/wellness-kit.webp",
    collection: "appreciation-gifts",
    group: "Wellbeing",
    featured: true,
    alt: "Ivory box with natural honey, herbal tea, mixed nuts, a scented candle and a Wellness Looks Good On You card.",
  },
  {
    name: "New Year Celebration Box",
    slug: "new-year-celebration-box",
    image: "/images/products/new-year-celebration-box.webp",
    collection: "custom-occasion-gifts",
    group: "Seasonal & national days",
    alt: "Terracotta box with dried flowers, a bottle, notebook and keepsakes beside a Happy New Year card.",
  },
  {
    name: "Branded Merchandise",
    slug: "branded-merchandise",
    image: "/images/products/branded-merchandise.webp",
    collection: "brand-souvenirs",
    alt: "Naqsh-branded tote, cap, bottle, mug, T-shirt, polo, notebook, mouse pad, lanyard and desk accessories.",
  },
  {
    name: "Pakistan Heritage Gift Set",
    slug: "pakistan-heritage-gift-set",
    image: "/images/products/pakistan-heritage-gift-set.webp",
    collection: "client-packages",
    featured: true,
    alt: "Heritage set with a printed shawl, hand-painted mug, Minar-e-Pakistan notebook, truck-art model and sweets.",
  },
  {
    name: "Ramadan Delights",
    slug: "ramadan-delights",
    image: "/images/products/ramadan-delights.webp",
    collection: "ramadan-eid-baskets",
    featured: true,
    alt: "Ivory Ramadan Mubarak box with an embossed Naqsh emblem and a tray of filled, decorated dates.",
  },
  {
    name: "Retirement Award",
    slug: "retirement-award",
    image: "/images/products/retirement-award.webp",
    collection: "appreciation-gifts",
    group: "Awards & recognition",
    alt: "Gold oval plaque engraved With Deep Appreciation in a dark green presentation box beside a Naqsh sleeve.",
  },
];

export function getProductsByCollection(collectionSlug: string): Product[] {
  return products.filter((p) => p.collection === collectionSlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
