export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  confirmTag?: string;
}

export interface FAQGroup {
  group: string;
  items: FAQItem[];
}

export const faqGroups: FAQGroup[] = [
  {
    group: "Process",
    items: [
      {
        id: "how-naqsh-works",
        question: "How does Naqsh work?",
        answer:
          "We start with a consultation about your occasion, audience, brand identity, and budget. Our team then prepares a tailored curation proposal, manages sample approvals, handles custom finishing and packaging, and coordinates delivery straight to your specified destination.",
      },
      {
        id: "ready-made-vs-custom",
        question: "Do you only offer ready-made gift sets?",
        answer:
          "No. Our solutions are designed around your corporate occasions rather than a rigid catalogue. Every collection is customized to your requirements, sourcing unique items and tailored packaging to fit your specific brief.",
      },
    ],
  },
  {
    group: "Orders",
    items: [
      {
        id: "moq",
        question: "What is the minimum order quantity?",
        answer:
          "Order minimums depend on the level of customization and sourcing involved. We accommodate small executive batches as well as large corporate-wide rollouts.",
        confirmTag: "MOQ specifics and minimum order tiers",
      },
      {
        id: "lead-time",
        question: "How far in advance should we order?",
        answer:
          "We recommend reaching out 3 to 4 weeks before your event to allow ample time for curation, prototyping, and packaging assembly. For peak seasons such as Ramadan, Eid, and year-end celebrations, earlier booking is strongly advised.",
        confirmTag: "Lead time rules and seasonal cutoffs",
      },
      {
        id: "sample-policy",
        question: "Can we see samples or a proposal before we commit?",
        answer:
          "Yes. Following our initial consultation, we provide a detailed proposal with visual mockups and material specifications. Physical pre-production samples can also be arranged prior to full batch production.",
        confirmTag: "Sample fee and prototype policy",
      },
    ],
  },
  {
    group: "Customization",
    items: [
      {
        id: "branding-options",
        question: "Can you add our logo and brand colors?",
        answer:
          "Yes. We offer refined corporate branding across both gifts and packaging, including blind debossing, metallic foil stamping, laser engraving, custom-printed sleeves, personalized greeting cards, and bespoke wax seals bearing your brand emblem.",
        confirmTag: "Specific branding techniques and file format requirements",
      },
      {
        id: "ethical-sourcing",
        question: "Can you source gifts to match our values or budget?",
        answer:
          "Absolutely. Conscious curation is central to our philosophy. We actively identify high-quality regional artisans and ethical alternatives to ensure every item reflects your company's principles and budget parameters.",
      },
    ],
  },
  {
    group: "Payments",
    items: [
      {
        id: "payment-terms",
        question: "How do payments work?",
        answer:
          "We work with standard corporate invoicing. An advance deposit is typically required upon proposal confirmation to commence sourcing and production, with the balance settled upon dispatch or delivery.",
        confirmTag: "Corporate payment terms, milestones, and accepted banking methods",
      },
    ],
  },
  {
    group: "Delivery",
    items: [
      {
        id: "delivery-coverage",
        question: "Which cities do you deliver to?",
        answer:
          "Naqsh is based in Lahore and arranges tracked doorstep delivery to major corporate hubs across Pakistan, including Karachi, Islamabad, Rawalpindi, and Faisalabad.",
        confirmTag: "Full delivery coverage map and international shipping capabilities",
      },
      {
        id: "individual-drop-shipping",
        question: "Can you deliver directly to individual recipients?",
        answer:
          "Yes. We support multi-destination dispatch for distributed teams and remote employees, coordinating individual deliveries with discreet, secure packaging.",
        confirmTag: "Recipient address file handling and multi-drop logistics fees",
      },
    ],
  },
];
