export const servicesContent = {
  header: {
    label: "Our Services",
    title: "Gifting solutions crafted for corporate relationships.",
    intro:
      "From bespoke welcome kits to executive appreciation, Naqsh guides you from concept to doorstep.",
  },
  services: [
    {
      id: "personalized-gifts",
      number: "01",
      title: "Personalized Gifts",
      summary:
        "Bespoke gifts designed around your brand, people, and occasion—crafted from product to packaging.",
      image: "/images/products/retirement-award.webp",
      imageAlt: "Personalized awards and commemorative sets in bespoke packaging",
      features: [
        "Tailored selection reflecting your brand and values",
        "Foil stamping, debossing, laser engraving, and wax seals",
        "Custom stationery and personal greeting cards",
        "Sustainable, tactile luxury packaging",
      ],
      ctaText: "Request Consultation",
      ctaHref: "/contact?service=personalized-gifts",
    },
    {
      id: "gifting-consultations",
      number: "02",
      title: "Gifting Consultations",
      summary:
        "Share your occasion, audience, and budget—we’ll recommend a tailored gifting plan that fits.",
      image: "/images/products/pakistan-heritage-gift-set.webp",
      imageAlt: "Corporate gifting consultation showcase with artisan heritage curation",
      features: [
        "Discovery session on recipient profile and milestones",
        "Conscious curation with vetted ethical alternatives",
        "Tiered proposals balanced for budget and impact",
        "Turnkey timeline and nationwide delivery planning",
      ],
      ctaText: "Book a Consultation",
      ctaHref: "/contact?service=gifting-consultations",
    },
  ],
  workflowStrip: {
    label: "Workflow",
    heading: "How we deliver every project",
    steps: [
      { step: "01", name: "Understand", desc: "Occasion, audience & budget" },
      { step: "02", name: "Curate", desc: "Purposeful ethical sourcing" },
      { step: "03", name: "Customize", desc: "Elevated branding & packaging" },
      { step: "04", name: "Deliver", desc: "Doorstep execution & care" },
    ],
  },
};
