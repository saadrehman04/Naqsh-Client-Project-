export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  confirmTag?: string;
}

export interface FAQGroup {
  group: string;
  description?: string;
  items: FAQItem[];
}

export const faqGroups: FAQGroup[] = [
  {
    group: "Ordering",
    description:
      "How to initiate a corporate gifting brief, request proposals, and plan order quantities.",
    items: [
      {
        id: "how-to-place-order",
        question: "How can I place a corporate gifting order?",
        answer:
          "You can begin by submitting a consultation brief through our Contact page or reaching out directly via WhatsApp or phone. Share your occasion, approximate quantity, target delivery date, and budget range, and our curation team will prepare a tailored gifting proposal for your review.",
      },
      {
        id: "minimum-order-quantity",
        question: "What is the minimum order quantity?",
        answer:
          "Minimum order quantities depend on the level of bespoke packaging and product customization required. We support both focused executive batches and large organization-wide rollouts—exact minimums for your chosen concept are confirmed during your initial consultation.",
      },
      {
        id: "bulk-orders",
        question: "Can I order in bulk?",
        answer:
          "Yes. NAQSH specializes in structured bulk corporate orders for employee onboarding programs, annual conferences, seasonal Ramadan and Eid campaigns, and company-wide milestones, with rigorous quality control across every unit.",
      },
      {
        id: "custom-gifting-proposal",
        question: "Can I request a custom gifting proposal?",
        answer:
          "Absolutely. Every corporate engagement begins with a tailored curation proposal presenting recommended gift concepts, packaging finishes, branding options, and tiered selections aligned with your brief.",
      },
    ],
  },
  {
    group: "Customization",
    description:
      "Branding techniques, bespoke packaging, individual personalization, and custom concepts.",
    items: [
      {
        id: "add-company-logo",
        question: "Can you add our company logo?",
        answer:
          "Yes. We integrate your brand identity with refinement using blind debossing, gold or copper foil stamping, laser engraving, embroidery, custom sleeves, and bespoke wax seals—ensuring your logo feels elevated rather than overly promotional.",
      },
      {
        id: "custom-gift-packaging",
        question: "Can gift packaging be customized?",
        answer:
          "Yes. Our packaging options include custom-built rigid keepsake boxes, precision-cut internal inserts, woven hampers, printed outer sleeves, coordinated satin ribbons, and custom tissue layering tailored to your brand palette.",
      },
      {
        id: "personalize-individual-gifts",
        question: "Can we personalize individual gifts?",
        answer:
          "Yes. We can personalize individual items—such as engraving recipient names on awards, tumblers, or leather goods—and include individually addressed greeting cards for executive teams, VIP clients, or milestone awards.",
      },
      {
        id: "completely-bespoke-concepts",
        question: "Can you create completely bespoke gifting concepts?",
        answer:
          "Yes. Rather than limiting you to a fixed retail catalogue, we design bespoke gifting concepts around your specific occasion, cultural moment, brand narrative, and recipient profile.",
      },
    ],
  },
  {
    group: "Products",
    description:
      "Budget alignment, pre-production samples, and employee welcome kit curation.",
    items: [
      {
        id: "gifts-by-budget",
        question: "Can gifts be selected according to a specific budget?",
        answer:
          "Yes. Whether you are planning a practical conference giveaway or a distinguished executive suite, we curate product combinations and packaging tiers specifically engineered around your target budget per gift.",
      },
      {
        id: "request-product-samples",
        question: "Can we request product samples?",
        answer:
          "We provide detailed visual proposals and product specifications for every brief, and physical sample or prototype arrangements can be discussed during consultation depending on your order scope and production timeline.",
      },
      {
        id: "prepare-employee-welcome-kits",
        question: "Can you prepare employee welcome kits?",
        answer:
          "Yes—New Hire Welcome Kits are one of our signature specialties. We curate, brand, and assemble cohesive first-day boxes featuring items such as hardcover notebooks, insulated tumblers, pens, power banks, key rings, apparel, and welcome cards.",
      },
    ],
  },
  {
    group: "Delivery",
    description:
      "Nationwide coverage from Lahore, multi-address dispatch, and production lead times.",
    items: [
      {
        id: "delivery-cities",
        question: "Which cities do you deliver to?",
        answer:
          "From our studio in Lahore, we coordinate corporate gift deliveries across Lahore and nationwide throughout Pakistan—including Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, and Sialkot. International shipping requirements can also be discussed during consultation.",
      },
      {
        id: "multiple-addresses-delivery",
        question: "Can you deliver gifts to multiple addresses?",
        answer:
          "Yes. We can deliver your entire order in bulk to a single corporate office or event venue, or manage individual doorstep dispatch directly to distributed employees and client addresses.",
      },
      {
        id: "delivery-timeline",
        question: "How long does delivery take?",
        answer:
          "Production and delivery timelines depend on order quantity, customization complexity, and destination cities. We generally recommend initiating your inquiry 3 to 4 weeks prior to your event—and earlier for peak seasons such as Ramadan, Eid, and New Year—while exact schedules are confirmed in your proposal.",
      },
    ],
  },
  {
    group: "Payment",
    description:
      "Corporate invoicing, payment methods, and order confirmation structure.",
    items: [
      {
        id: "payment-methods",
        question: "What payment methods do you accept?",
        answer:
          "We support standard corporate banking channels, including official bank transfers against formal corporate invoices. Specific payment and tax documentation details are shared upon proposal approval.",
      },
      {
        id: "corporate-payment-process",
        question: "What is the payment process for corporate orders?",
        answer:
          "Once your gifting concept, quantities, and branding specifications are finalized, we issue a formal corporate invoice. Production begins upon order confirmation and agreed advance deposit, with final settlement completed according to the terms outlined in your agreement.",
      },
    ],
  },
  {
    group: "Corporate Gifting",
    description:
      "Recurring gifting programs, seasonal campaigns, and corporate event support.",
    items: [
      {
        id: "recurring-gifting-requirements",
        question: "Can NAQSH manage recurring gifting requirements?",
        answer:
          "Yes. We partner with HR and corporate teams on ongoing programs—including monthly new-hire onboarding kits, employee birthdays, work anniversaries, newborn celebrations, and client onboarding packages.",
      },
      {
        id: "seasonal-corporate-campaigns",
        question: "Can you manage seasonal corporate gifting campaigns?",
        answer:
          "Yes. We manage end-to-end seasonal campaigns for Ramadan, Eid, New Year, Pakistan Independence Day, International Women's Day, Mother's Day, and Father's Day—handling concept design, bespoke packaging, and timely dispatch.",
      },
      {
        id: "assist-corporate-events",
        question: "Can you assist with corporate events?",
        answer:
          "Yes. We curate and produce seminar and conference delegate kits, leadership summit folios, sports tournament medals and trophies, recognition plaques, and event hospitality giveaways timed to your event schedule.",
      },
    ],
  },
];

export const homepageFaqs: FAQItem[] = [
  {
    id: "home-faq-branding",
    question: "Can gifts be customized with our company branding?",
    answer:
      "Yes. We apply your logo and brand palette with quiet sophistication—using blind debossing, metallic foil stamping, laser engraving, custom rigid boxes, outer sleeves, personalized greeting cards, and bespoke wax seals.",
  },
  {
    id: "home-faq-budget",
    question: "Can you create gifts within a specific budget?",
    answer:
      "Absolutely. Share your target spend per gift or overall project budget during consultation, and our team will curate tiered product and packaging recommendations designed specifically around your parameters.",
  },
  {
    id: "home-faq-moq",
    question: "What is your minimum order quantity?",
    answer:
      "Minimum quantities vary depending on the level of bespoke packaging and product customization. We accommodate both executive batches and large company-wide rollouts, confirming exact minimums during your consultation.",
  },
  {
    id: "home-faq-timeline",
    question: "How long does an order take?",
    answer:
      "Lead times depend on order volume and customization details. While we recommend reaching out 3–4 weeks ahead of your target date (especially before Ramadan, Eid, or New Year), we always confirm a clear production and delivery schedule in your proposal.",
  },
  {
    id: "home-faq-delivery",
    question: "Where do you deliver?",
    answer:
      "Based in Lahore, we deliver nationwide across Pakistan—either in bulk to your corporate headquarters or directly to individual employee and client doorsteps.",
  },
  {
    id: "home-faq-bespoke",
    question: "Can we request a bespoke gifting concept?",
    answer:
      "Yes. Every NAQSH collection is adaptable, and we regularly develop completely bespoke gifting concepts tailored to your occasion, industry, and recipient profile.",
  },
];
