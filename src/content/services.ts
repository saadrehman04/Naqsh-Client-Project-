export interface ServiceCategory {
  id: string;
  number: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  imageAlt: string;
  solutions: string[];
  occasions: string[];
  customizationOptions: string[];
  ctaText: string;
  ctaHref: string;
}

export const servicesContent = {
  header: {
    label: "Our Services",
    title: "Gifting Solutions for Every Business Occasion.",
    intro:
      "Tailored employee, executive, event, and seasonal gifting—managed from concept to delivery.",
  },
  services: [
    {
      id: "corporate-employee-gifting",
      number: "01",
      title: "Corporate & Employee Gifting",
      summary:
        "Thoughtfully curated gifting programs that welcome new talent, celebrate career milestones, and strengthen internal culture.",
      description:
        "Your team is the foundation of your organization. We partner with HR, People & Culture, and leadership teams to design cohesive gifting experiences that make employees feel genuinely recognized—from their first morning on the job to annual celebrations.",
      image: "/images/products/new-hire-welcome-kit.webp",
      imageAlt:
        "NAQSH Corporate & Employee Gifting welcome kit with notebook, tumbler, pen, power bank and key ring",
      solutions: [
        "Employee welcome kits & onboarding boxes",
        "Employee appreciation & recognition gifts",
        "Work anniversary & tenure awards",
        "Team milestone & project completion boxes",
        "Festive employee hampers & wellness kits",
      ],
      occasions: [
        "First-Day Onboarding",
        "Annual Performance Recognition",
        "Work Anniversaries & Retirements",
        "Family Moments (Newborn Welcome, Birthdays)",
        "Employee Wellbeing Initiatives",
      ],
      customizationOptions: [
        "Brand-aligned rigid boxes and custom internal inserts",
        "Logo debossing and engraving on notebooks, drinkware, and tech",
        "Personalized welcome or appreciation cards from leadership",
      ],
      ctaText: "Plan Employee Gifting",
      ctaHref: "/contact?service=corporate-employee-gifting",
    },
    {
      id: "executive-client-gifting",
      number: "02",
      title: "Executive & Client Gifting",
      summary:
        "Distinguished gifting suites crafted to honor key clients, board members, visiting dignitaries, and strategic partners.",
      description:
        "When representing your organization at the highest level, every material choice matters. We curate refined executive packages combining fine leather goods, regional heritage craftsmanship, crystal awards, and artisanal delicacies presented with quiet authority.",
      image: "/images/products/client-onboarding-kit.webp",
      imageAlt:
        "NAQSH Executive & Client Gifting suite with leather-handled laptop bag, chestnut folio and executive accessories",
      solutions: [
        "Executive gift suites & board packages",
        "VIP client appreciation collections",
        "Client onboarding & partnership signing gifts",
        "Heritage & diplomatic keepsake sets",
      ],
      occasions: [
        "New Client Onboarding",
        "Deal Closings & Partnership Milestones",
        "Board Meetings & VIP Visits",
        "Year-End Executive Appreciation",
      ],
      customizationOptions: [
        "Restrained blind debossing or metallic foil stamping",
        "Hand-stamped NAQSH or custom brass wax seals",
        "Bespoke leather, marble, crystal, and archival packaging finishes",
      ],
      ctaText: "Inquire About Executive Gifting",
      ctaHref: "/contact?service=executive-client-gifting",
    },
    {
      id: "events-brand-merchandise",
      number: "03",
      title: "Events & Brand Merchandise",
      summary:
        "Refined conference kits, corporate giveaways, and elevated branded merchandise designed to be kept and used.",
      description:
        "Move beyond disposable promotional giveaways. We help organizations design event kits, summit folios, and branded souvenirs with the quality and restraint of retail lifestyle goods—ensuring your brand remains part of your audience's daily routine.",
      image: "/images/products/seminar-conference-kit.webp",
      imageAlt:
        "NAQSH Seminar & Conference Kit with charcoal leather bag, pouch, card holder and embossed green notebook",
      solutions: [
        "Conference & leadership summit delegate kits",
        "Corporate event giveaways & hospitality favors",
        "Cohesive branded merchandise collections",
        "Business souvenirs & commemorative awards",
        "Sports medals, trophies & recognition plaques",
      ],
      occasions: [
        "Conferences, Seminars & Summits",
        "Product Launches & Brand Activations",
        "Corporate Retreats & Annual Galas",
        "Sports Tournaments & Company Olympiads",
      ],
      customizationOptions: [
        "Coordinated color-matched apparel, totes, drinkware, and stationery",
        "Custom event agendas, lanyards, and badge credentials",
        "Bulk venue delivery timed to your event schedule",
      ],
      ctaText: "Plan Event Gifting",
      ctaHref: "/contact?service=events-brand-merchandise",
    },
    {
      id: "bespoke-seasonal-gifting",
      number: "04",
      title: "Bespoke & Seasonal Gifting",
      summary:
        "Artisanal Ramadan, Eid, New Year, and occasion-specific hampers tailored around cultural moments and custom briefs.",
      description:
        "Seasonal and cultural occasions call for warmth, generosity, and authenticity. Whether you are sending Ramadan & Eid baskets to hundreds of partners or commissioning a one-of-a-kind box for Women's Day or Independence Day, we design every package from the ground up.",
      image: "/images/products/ramadan-delights.webp",
      imageAlt:
        "NAQSH Bespoke & Seasonal Ramadan Delights presentation box with embossed emblem and gourmet dates",
      solutions: [
        "Ramadan & Eid luxury baskets and date boxes",
        "New Year & festive celebration hampers",
        "National & cultural day boxes (Independence Day, Women's Day)",
        "Family & life-moment gifts (Mother's Day, Father's Day, Newborn)",
        "100% custom-engineered gift concepts",
      ],
      occasions: [
        "Ramadan & Eid-ul-Fitr / Eid-ul-Adha",
        "New Year & Annual Celebrations",
        "Pakistan Independence Day (14th August)",
        "International Women's Day, Mother's Day & Father's Day",
      ],
      customizationOptions: [
        "Custom rigid boxes, woven rope baskets, and heritage sleeves",
        "Curated gourmet dates, honey, artisanal teas, florals, and fragrances",
        "Multi-city and individual doorstep dispatch across Pakistan",
      ],
      ctaText: "Request Seasonal Proposal",
      ctaHref: "/contact?service=bespoke-seasonal-gifting",
    },
  ] satisfies ServiceCategory[],
  endToEndService: {
    label: "Turnkey Execution",
    heading: "A Complete End-to-End Corporate Gifting Partner.",
    intro:
      "Working with NAQSH means your team never has to coordinate multiple vendors, packaging printers, or courier schedules. We manage the entire lifecycle under one roof.",
    pillars: [
      {
        step: "01",
        title: "Concept & Budget Alignment",
        desc: "We translate your brief, recipient count, and budget into clear, visual gifting proposals with transparent specifications.",
      },
      {
        step: "02",
        title: "Ethical & Quality Sourcing",
        desc: "We source dependable products and conscious regional alternatives, vetting every item for material quality and longevity.",
      },
      {
        step: "03",
        title: "Bespoke Branding & Assembly",
        desc: "From debossing and laser engraving to hand-tied ribbons and personalized notes, every box is assembled and inspected in Lahore.",
      },
      {
        step: "04",
        title: "Single or Multi-Address Delivery",
        desc: "We coordinate secure bulk delivery to your headquarters or individual doorstep dispatch to recipients across Pakistan.",
      },
    ],
  },
  workflowStrip: {
    label: "Our Process",
    heading: "From First Thought to Final Delivery",
    steps: [
      { step: "01", name: "Understand", desc: "Brand, occasion, audience & budget" },
      { step: "02", name: "Curate", desc: "Concepts & purposeful product selection" },
      { step: "03", name: "Customize", desc: "Branding, packaging & finishing touches" },
      { step: "04", name: "Deliver", desc: "Quality assurance & doorstep fulfillment" },
    ],
  },
};
