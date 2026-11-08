export interface Product {
  name: string;
  slug: string;
  image: string;
  collection: string;
  group?: string;
  featured?: boolean;
  alt: string;
  description: string;
  customization: string[];
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
    description:
      "Architectural crystal recognition trophy mounted on a deep green marble base with warm copper detailing—designed to honor leadership, top performers, and milestone achievements.",
    customization: [
      "Precision laser-engraved recipient name & citation",
      "Company emblem etching on crystal face",
      "Custom velvet-lined presentation box",
    ],
  },
  {
    name: "Client Onboarding Kit",
    slug: "client-onboarding-kit",
    image: "/images/products/client-onboarding-kit.webp",
    collection: "client-packages",
    featured: true,
    alt: "Ivory laptop bag with leather handles, chestnut notebook, tumbler, power bank and card holder, all branded Naqsh.",
    description:
      "A distinguished executive suite pairing an ivory laptop brief with leather handles, chestnut hardcover journal, insulated tumbler, power bank, and leather cardholder.",
    customization: [
      "Blind-debossed or foil-stamped company logo",
      "Laser-engraved drinkware & power bank",
      "Personalized executive welcome card",
    ],
  },
  {
    name: "Eid Celebration Basket",
    slug: "eid-celebration-basket",
    image: "/images/products/eid-celebration-basket.webp",
    collection: "ramadan-eid-baskets",
    featured: true,
    alt: "Woven basket with an Eid Mubarak card, glass bangles, jhumka earrings, sweets and a dusty-pink ribbon.",
    description:
      "A festive woven hamper celebrating Eid traditions with artisanal sweets, cultural keepsakes, glass bangles, and a bespoke Eid Mubarak greeting card finished with satin ribbon.",
    customization: [
      "Custom-printed Eid Mubarak greeting card",
      "Brand-coordinated ribbon & hang tags",
      "Tailored assortment for recipients & families",
    ],
  },
  {
    name: "Newborn Welcome - Baby Boy",
    slug: "newborn-welcome-baby-boy",
    image: "/images/products/newborn-welcome-baby-boy.webp",
    collection: "custom-occasion-gifts",
    group: "Family & life moments",
    alt: "Wicker basket with a teddy bear, blue baby clothes, care products, booties and Welcome Baby Boy balloons.",
    description:
      "A warm family milestone hamper designed to congratulate team members or clients on a newborn son—featuring a wicker basket, plush teddy, soft infant apparel, booties, and baby care essentials.",
    customization: [
      "Handwritten or printed congratulatory note from leadership",
      "Custom ribbon & company presentation tag",
      "Curated infant-safe product selection",
    ],
  },
  {
    name: "Newborn Welcome - Baby Girl",
    slug: "newborn-welcome-baby-girl",
    image: "/images/products/newborn-welcome-baby-girl.webp",
    collection: "custom-occasion-gifts",
    group: "Family & life moments",
    alt: "Basket with a plush bunny, pink baby clothes, care products, booties and Welcome Baby Girl balloons.",
    description:
      "A thoughtful celebratory basket welcoming a newborn daughter—complete with a plush bunny, pastel infant clothing, booties, gentle baby care items, and celebratory accents.",
    customization: [
      "Personalized congratulatory card from your team",
      "Custom satin ribbon & gift tag",
      "Tailored family-friendly curation",
    ],
  },
  {
    name: "Father's Day Gift",
    slug: "fathers-day-gift",
    image: "/images/products/fathers-day-gift.webp",
    collection: "custom-occasion-gifts",
    group: "Seasonal & national days",
    alt: "Black Naqsh box with honey, premium dry fruits, a leather wallet and a paisley pocket square beside a Father's Day card.",
    description:
      "Presented in a signature black rigid box, this curated gentleman's set pairs pure artisanal honey, premium dry fruits, a fine leather wallet, and a classic paisley pocket square.",
    customization: [
      "Monogram or logo debossing on leather wallet",
      "Foil-stamped rigid keepsake box",
      "Custom Father's Day greeting card",
    ],
  },
  {
    name: "Mother's Day Gift",
    slug: "mothers-day-gift",
    image: "/images/products/mothers-day-gift.webp",
    collection: "custom-occasion-gifts",
    group: "Seasonal & national days",
    alt: "Woven basket with herbal tea, dates, nuts, seed crackers, a potted flowering plant and a Mother's Day card.",
    description:
      "An organic woven hamper featuring herbal infusions, premium dates, roasted nuts, artisanal seed crackers, a living flowering plant, and a dedicated Mother's Day note.",
    customization: [
      "Custom-branded ceramic planter or tag",
      "Bespoke Mother's Day stationery card",
      "Customizable gourmet & botanical pairing",
    ],
  },
  {
    name: "Women's Day Gift Basket",
    slug: "womens-day-gift-basket",
    image: "/images/products/womens-day-gift-basket.webp",
    collection: "custom-occasion-gifts",
    group: "Seasonal & national days",
    alt: "Rope basket with a lilac bouquet, eau de parfum, scented candle, chocolates and a Women's Day card.",
    description:
      "Crafted for International Women's Day corporate celebrations, combining a woven rope basket, lilac floral arrangement, eau de parfum, scented candle, and fine chocolates.",
    customization: [
      "Custom Women's Day message card from leadership",
      "Branded candle label or presentation sleeve",
      "Scalable tiers for organization-wide gifting",
    ],
  },
  {
    name: "Fruit Party Favors",
    slug: "fruit-party-favors",
    image: "/images/products/fruit-party-favors.webp",
    collection: "annual-event-giveaways",
    alt: "Two cellophane-wrapped baskets of mangoes and oranges tied with gold ribbon and black Naqsh tags.",
    description:
      "Seasonal orchard hampers featuring hand-selected premium mangoes and citrus arranged in woven baskets, wrapped with gold satin ribbon and black embossed gift tags.",
    customization: [
      "Foil-stamped black & gold crest tags",
      "Custom seasonal greeting cards",
      "Coordinated fresh dispatch to client addresses",
    ],
  },
  {
    name: "Independence Day Gift",
    slug: "independence-day-gift",
    image: "/images/products/independence-day-gift.webp",
    collection: "custom-occasion-gifts",
    group: "Seasonal & national days",
    alt: "Ivory and sage box with a Minar-e-Pakistan illustration, a Pakistan flag pin and a potted plant in a Naqsh pot.",
    description:
      "An ivory and sage presentation box honoring 14th August with an architectural Minar-e-Pakistan illustration, enamel flag lapel pin, and a living desk plant in a custom pot.",
    customization: [
      "Custom company branding on planter & box sleeve",
      "Co-branded lapel pin & commemorative card",
      "Ideal for large corporate teams & branch rollouts",
    ],
  },
  {
    name: "Sports Medals & Trophies",
    slug: "sports-medals-trophies",
    image: "/images/products/sports-medals-trophies.webp",
    collection: "appreciation-gifts",
    group: "Awards & recognition",
    alt: "Gold, silver and bronze medals on green ribbons in a black presentation box with the Naqsh emblem.",
    description:
      "Custom-cast gold, silver, and bronze medallions paired with deep emerald woven neck ribbons and housed in a velvet-lined black presentation case.",
    customization: [
      "Custom die-cast tournament or company emblem",
      "Engraved event title, category & date",
      "Bespoke presentation case with foil branding",
    ],
  },
  {
    name: "New Hire Welcome Kit",
    slug: "new-hire-welcome-kit",
    image: "/images/products/new-hire-welcome-kit.webp",
    collection: "new-hire-welcome-kits",
    featured: true,
    alt: "Dark green welcome box with a notebook, tumbler, pen, power bank and key ring, beside a Welcome card.",
    description:
      "Our signature first-day onboarding experience: a deep emerald rigid box with precision-cut foam housing a hardcover notebook, matte insulated tumbler, metal pen, power bank, and leather key ring.",
    customization: [
      "Full brand color & logo integration across all 5 items",
      "Custom-molded rigid box with welcome message card",
      "Office bulk delivery or remote-hire doorstep dispatch",
    ],
  },
  {
    name: "Seminar & Conference Kit",
    slug: "seminar-conference-kit",
    image: "/images/products/seminar-conference-kit.webp",
    collection: "annual-event-giveaways",
    featured: true,
    alt: "Charcoal leather bag, black croc-embossed pouch and card holder, key ring and a green notebook embossed with the Naqsh emblem.",
    description:
      "An executive delegate suite featuring a structured charcoal carry bag, croc-embossed accessory pouch and cardholder, metal key ring, and an embossed hardcover journal.",
    customization: [
      "Subtle blind debossing on leather & stationery",
      "Custom conference agenda or welcome insert",
      "Tailored item combinations to match summit tiers",
    ],
  },
  {
    name: "Birthday Celebration Box",
    slug: "birthday-celebration-box",
    image: "/images/products/birthday-celebration-box.webp",
    collection: "custom-occasion-gifts",
    group: "Family & life moments",
    alt: "Ivory Naqsh box with a floral cake, cupcakes, a Happy Birthday card and a confetti balloon tied with blue ribbon.",
    description:
      "Designed for recurring employee and VIP client birthday programs—featuring an ivory keepsake box with artisanal floral cake, cupcakes, celebratory balloon, and personalized birthday card.",
    customization: [
      "Personalized recipient name & leadership message",
      "Scheduled year-round birthday dispatch program",
      "Custom ribbon & branded rigid box",
    ],
  },
  {
    name: "Kids' Gift Box",
    slug: "kids-gift-box",
    image: "/images/products/kids-gift-box.webp",
    collection: "custom-occasion-gifts",
    group: "Family & life moments",
    alt: "Sage Naqsh box with a children's book, puzzle, paint set, colour pencils, water bottle and pencil case.",
    description:
      "A creative family-day or employee-family gift box in soft sage green, filled with a storybook, puzzle, watercolor paint set, colored pencils, insulated bottle, and pencil case.",
    customization: [
      "Age-appropriate activity & book selection",
      "Custom company family-day greeting card",
      "Branded water bottle & keepsake box",
    ],
  },
  {
    name: "Wellness Kit",
    slug: "wellness-kit",
    image: "/images/products/wellness-kit.webp",
    collection: "appreciation-gifts",
    group: "Wellbeing",
    featured: true,
    alt: "Ivory box with natural honey, herbal tea, mixed nuts, a scented candle and a Wellness Looks Good On You card.",
    description:
      "A restorative self-care and appreciation package containing pure honey, loose-leaf herbal tea, roasted mixed nuts, a hand-poured scented candle, and a mindfulness card.",
    customization: [
      "Custom-labeled candle jar & honey packaging",
      "Personalized wellbeing note from HR or leadership",
      "Ivory rigid box with embossed emblem",
    ],
  },
  {
    name: "New Year Celebration Box",
    slug: "new-year-celebration-box",
    image: "/images/products/new-year-celebration-box.webp",
    collection: "custom-occasion-gifts",
    group: "Seasonal & national days",
    alt: "Terracotta box with dried flowers, a bottle, notebook and keepsakes beside a Happy New Year card.",
    description:
      "Ring in the new fiscal or calendar year with a warm terracotta presentation box pairing an executive planner notebook, insulated bottle, dried botanicals, and a Happy New Year card.",
    customization: [
      "Dated or undated custom-debossed corporate diary",
      "Laser-engraved bottle & custom box sleeve",
      "Year-end executive message card",
    ],
  },
  {
    name: "Branded Merchandise",
    slug: "branded-merchandise",
    image: "/images/products/branded-merchandise.webp",
    collection: "brand-souvenirs",
    alt: "Naqsh-branded tote, cap, bottle, mug, T-shirt, polo, notebook, mouse pad, lanyard and desk accessories.",
    description:
      "A cohesive collection of everyday corporate essentials—including heavyweight cotton totes, polo shirts, caps, ceramic mugs, insulated bottles, notebooks, lanyards, and desk accessories.",
    customization: [
      "Exact Pantone/brand color matching across items",
      "Embroidery, screen printing, engraving & debossing",
      "Available as individual souvenirs or bundled kits",
    ],
  },
  {
    name: "Pakistan Heritage Gift Set",
    slug: "pakistan-heritage-gift-set",
    image: "/images/products/pakistan-heritage-gift-set.webp",
    collection: "client-packages",
    featured: true,
    alt: "Heritage set with a printed shawl, hand-painted mug, Minar-e-Pakistan notebook, truck-art model and sweets.",
    description:
      "An unforgettable cultural gift for international guests, delegations, and senior partners—featuring an artisanal printed shawl, hand-painted ceramic mug, heritage notebook, truck-art keepsake, and traditional sweets.",
    customization: [
      "Bespoke story card highlighting regional craftsmanship",
      "Custom-embossed presentation box & wax seal",
      "Tailored cultural keepsake selection",
    ],
  },
  {
    name: "Ramadan Delights",
    slug: "ramadan-delights",
    image: "/images/products/ramadan-delights.webp",
    collection: "ramadan-eid-baskets",
    featured: true,
    alt: "Ivory Ramadan Mubarak box with an embossed Naqsh emblem and a tray of filled, decorated dates.",
    description:
      "Presented in a textured ivory and gold-embossed Ramadan Mubarak keepsake box, featuring a compartmentalized tray of gourmet stuffed and hand-decorated dates.",
    customization: [
      "Gold-foiled company crest on outer lid or sleeve",
      "Custom Ramadan Kareem message card inside lid",
      "Nationwide corporate & client doorstep delivery",
    ],
  },
  {
    name: "Retirement Award",
    slug: "retirement-award",
    image: "/images/products/retirement-award.webp",
    collection: "appreciation-gifts",
    group: "Awards & recognition",
    alt: "Gold oval plaque engraved With Deep Appreciation in a dark green presentation box beside a Naqsh sleeve.",
    description:
      "A dignified commemorative plaque finished in brushed gold and housed inside a deep emerald velvet-lined presentation box with a matching outer sleeve—crafted to honor years of service.",
    customization: [
      "Bespoke engraved tribute, tenure dates & company crest",
      "Foil-stamped emerald presentation case",
      "Accompanying leadership letter in wax-sealed envelope",
    ],
  },
];

export function getProductsByCollection(collectionSlug: string): Product[] {
  return products.filter((p) => p.collection === collectionSlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
