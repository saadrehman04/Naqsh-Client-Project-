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
          "We start with a brief consultation on your occasion, audience, and budget—then handle curation, custom branding, packaging, and doorstep delivery.",
      },
      {
        id: "ready-made-vs-custom",
        question: "Do you only offer ready-made gift sets?",
        answer:
          "No. Every collection is customized around your occasion, brand identity, and budget rather than a fixed catalogue.",
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
          "Minimums depend on customization level—we support both executive batches and large corporate-wide rollouts.",
        confirmTag: "MOQ specifics and minimum order tiers",
      },
      {
        id: "lead-time",
        question: "How far in advance should we order?",
        answer:
          "We recommend 3–4 weeks before your event, and earlier for peak seasons like Ramadan, Eid, and New Year.",
        confirmTag: "Lead time rules and seasonal cutoffs",
      },
      {
        id: "sample-policy",
        question: "Can we see samples or a proposal before we commit?",
        answer:
          "Yes. We provide a tailored visual proposal with specifications, and physical pre-production samples can be arranged.",
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
          "Yes—via debossing, foil stamping, laser engraving, custom sleeves, greeting cards, and bespoke wax seals.",
        confirmTag: "Specific branding techniques and file format requirements",
      },
      {
        id: "ethical-sourcing",
        question: "Can you source gifts to match our values or budget?",
        answer:
          "Absolutely. We prioritize regional artisans and vetted ethical alternatives tailored to your principles and budget.",
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
          "Standard corporate invoicing with an advance deposit upon confirmation and balance settled on dispatch.",
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
          "Based in Lahore, we deliver nationwide across Pakistan—including Karachi, Islamabad, Rawalpindi, and Faisalabad.",
        confirmTag: "Full delivery coverage map and international shipping capabilities",
      },
      {
        id: "individual-drop-shipping",
        question: "Can you deliver directly to individual recipients?",
        answer:
          "Yes. We coordinate multi-address dispatch directly to distributed teams and individual client doorsteps.",
        confirmTag: "Recipient address file handling and multi-drop logistics fees",
      },
    ],
  },
];
