/**
 * Chatbot knowledge base. Every answer is assembled from content the site already publishes
 * (src/content/*). Nothing here adds new facts: if the site does not say it, the bot hands the
 * visitor to WhatsApp instead (see engine.ts).
 */
import { faqGroups } from "@/content/faqs";
import { homeContent } from "@/content/home";
import { servicesContent } from "@/content/services";
import { approachContent } from "@/content/approach";
import { collections } from "@/content/collections";
import { products } from "@/content/products";
import { siteConfig } from "@/content/site";
import { privacyPolicy, shippingPolicy, type PolicyDocument } from "@/content/policies";
import { philosophyContent } from "@/content/philosophy";

export interface KnowledgeLink {
  label: string;
  href: string;
}

export interface KnowledgeEntry {
  id: string;
  /** Short title, used for suggestion chips and "related" questions. */
  question: string;
  answer: string;
  /** Extra search words (synonyms, common phrasings, Roman Urdu). Not shown to visitors. */
  keywords?: string;
  link?: KnowledgeLink;
  /** Hidden from "related questions" chips (e.g. per-product entries). */
  hideFromSuggestions?: boolean;
}

const CONTACT_LINK: KnowledgeLink = { label: "Request a consultation", href: "/contact" };

/** Search hints per FAQ id: how visitors tend to phrase the same question. */
const FAQ_KEYWORDS: Record<string, string> = {
  "how-to-place-order": "order place book start begin process how to buy purchase get started",
  "minimum-order-quantity": "minimum order quantity moq min units pieces small order few least",
  "bulk-orders": "bulk large volume hundreds many wholesale big order company wide",
  "custom-gifting-proposal": "proposal quote quotation custom plan recommendation bespoke unique one of a kind concept special idea",
  "add-company-logo": "logo branding brand print engrave emboss deboss foil company name",
  "custom-gift-packaging": "packaging box boxes wrapping wrap custom packing presentation",
  "personalize-individual-gifts": "personalise personalize name individual each recipient engrave names card",
  "completely-bespoke-concepts": "bespoke unique one of a kind custom concept special idea",
  "gifts-by-budget": "budget price cost range affordable cheap expensive spend per gift",
  "request-product-samples": "sample samples prototype try see before order trial",
  "prepare-employee-welcome-kits": "welcome kit onboarding new hire joiner employee kit first day",
  "delivery-cities": "deliver delivery cities city karachi islamabad rawalpindi lahore pakistan international abroad ship shipping where",
  "multiple-addresses-delivery": "multiple addresses doorstep individual homes remote employees separate locations dispatch",
  "delivery-timeline": "how long time timeline lead time days weeks urgent rush when deadline advance",
  "payment-methods": "payment pay methods bank transfer invoice card cash",
  "corporate-payment-process": "payment process advance deposit invoice terms settlement",
  "recurring-gifting-requirements": "recurring ongoing monthly regular birthdays anniversaries program subscription seasonal season campaign festive",
  "seasonal-corporate-campaigns": "seasonal season ramadan ramzan eid new year independence day womens day mothers day fathers day festive",
  "assist-corporate-events": "events event conference seminar summit trophies medals giveaways",
};

function faqEntries(): KnowledgeEntry[] {
  return faqGroups.flatMap((group) =>
    group.items.map((item) => ({
      id: `faq:${item.id}`,
      question: item.question,
      answer: item.answer,
      keywords: `${group.group} ${FAQ_KEYWORDS[item.id] ?? ""}`,
      link: { label: "See all FAQs", href: "/faqs" },
    }))
  );
}

function companyEntries(): KnowledgeEntry[] {
  const { about, whyUs, visionMission, coreValues } = homeContent;
  const { premiumGifting, giftingConsultation, projectWorkflow } = servicesContent;
  const approach = approachContent.hero;

  return [
    {
      id: "about",
      question: "What is NAQSH?",
      answer: `${about.paragraph} ${siteConfig.slogan}`,
      keywords:
        "about who are you naqsh company business what do you do introduce yourself brand story kya hai",
      link: { label: "Read about us", href: "/" },
    },
    {
      id: "why-us",
      question: "Why choose NAQSH?",
      answer: `${whyUs.subheading} ${whyUs.intro}\n\n${whyUs.promises
        .map((p, i) => `${i + 1}. ${p}`)
        .join("\n")}`,
      keywords:
        "why choose naqsh different difference better unique apart promises special boycott alternatives ethical",
    },
    {
      id: "vision",
      question: "What is your vision?",
      answer: visionMission.vision.statement,
      keywords: "vision goal future aim",
    },
    {
      id: "mission",
      question: "What is your mission?",
      answer: visionMission.mission.statement,
      keywords: "mission purpose",
    },
    {
      id: "core-values",
      question: "What are your core values?",
      answer: coreValues.values.map((v) => `${v.name}: ${v.desc}`).join("\n\n"),
      keywords: "values core principles beliefs integrity ethics ethical conscious partnership",
    },
    {
      id: "services",
      question: "What services do you offer?",
      answer: `We offer two services.\n\n${premiumGifting.heading}: ${premiumGifting.body}\n\n${giftingConsultation.heading}: ${giftingConsultation.body}`,
      keywords: "services offer provide do you what kind help solutions corporate gifting",
      link: { label: "View services", href: "/services" },
    },
    {
      id: "premium-gifting",
      question: "What are Premium Gifting Solutions?",
      answer: premiumGifting.body,
      keywords: "premium gifting solutions luxury high end end to end",
      link: { label: "View services", href: "/services" },
    },
    {
      id: "consultation",
      question: "What is a gifting consultation?",
      answer: `${giftingConsultation.body}\n\nIt covers ${giftingConsultation.keyTerms
        .map((t) => t.label.toLowerCase())
        .join(", ")}.`,
      keywords:
        "consultation consult advice not sure what to gift help me choose suggest ideas recommend one on one meeting",
      link: { label: giftingConsultation.ctaText, href: giftingConsultation.ctaHref },
    },
    {
      id: "workflow",
      question: "What is your gifting process?",
      answer: `${projectWorkflow.intro}:\n\n${projectWorkflow.steps
        .map((s, i) => `${i + 1}. ${s.name}: ${s.desc}`)
        .join("\n")}`,
      keywords: "process gifting process your process steps workflow how does it work procedure stages what happens after",
      link: { label: "See the workflow", href: `/services#${projectWorkflow.id}` },
    },
    {
      id: "approach",
      question: "What is your approach?",
      answer: `${approach.intro}\n\n${approach.steps
        .map((s) => `${s.name}: ${s.points.map((p) => p.label).join(", ")}`)
        .join("\n")}`,
      keywords: "approach method understand curate customize deliver methodology",
      link: { label: "Our approach", href: "/our-approach" },
    },
    {
      id: "collections",
      question: "What gift collections do you have?",
      answer: `We have ${collections.length} collections:\n\n${collections
        .map((c) => `${c.title}: ${c.tagline}`)
        .join("\n")}\n\nEvery collection can be customized for your brand and audience.`,
      keywords:
        "collections products catalogue catalog portfolio range options items what gifts do you have show gift ideas types",
      link: { label: "Explore the portfolio", href: "/portfolio" },
    },
    {
      id: "contact",
      question: "How can I contact you?",
      answer: `You can reach us on WhatsApp or phone at ${siteConfig.phone}${
        siteConfig.email ? `, email us at ${siteConfig.email}` : ""
      }, or send your requirements through the contact form. We are based in ${siteConfig.location}.`,
      keywords:
        "contact reach call phone number whatsapp talk speak person human team email mail rabta",
      link: CONTACT_LINK,
    },
    ...(siteConfig.email
      ? [
          {
            id: "email",
            question: "What is your email address?",
            answer: `You can email us at ${siteConfig.email}. You can also reach us on WhatsApp at ${siteConfig.phone}.`,
            keywords: "email mail address inbox write send message contact email id",
            link: { label: "Email us", href: `mailto:${siteConfig.email}` },
          } satisfies KnowledgeEntry,
        ]
      : []),
    {
      id: "location",
      question: "Where are you located?",
      answer: `We are based in ${siteConfig.location} and deliver nationwide across Pakistan.`,
      keywords: "location located address office studio where based city lahore kahan",
      link: CONTACT_LINK,
    },
    {
      id: "pricing",
      question: "How much do your gifts cost?",
      answer:
        "Every gift is curated around your brief, so pricing depends on the products, quantity and customization you choose. Share your target spend per gift or overall budget and we will recommend options that fit. For a quote, message us on WhatsApp or request a consultation.",
      keywords: "price prices pricing cost costs rate rates charges how much quote kitna kitne qeemat paise",
      link: CONTACT_LINK,
    },
  ];
}

function collectionEntries(): KnowledgeEntry[] {
  return collections.map((c) => {
    const items = products.filter((p) => p.collection === c.slug).map((p) => p.name);
    return {
      id: `collection:${c.slug}`,
      question: `What is in the ${c.title} collection?`,
      answer: `${c.title}: ${c.tagline}${items.length ? `\n\nIt includes: ${items.join(", ")}.` : ""}`,
      keywords: `${c.title} ${c.slug.replace(/-/g, " ")} collection`,
      link: { label: `View ${c.title}`, href: `/portfolio/${c.slug}` },
      hideFromSuggestions: true,
    };
  });
}

function productEntries(): KnowledgeEntry[] {
  return products.map((p) => {
    const collection = collections.find((c) => c.slug === p.collection);
    return {
      id: `product:${p.slug}`,
      question: `Tell me about the ${p.name}`,
      answer: `${p.name}${collection ? ` (${collection.title})` : ""}: ${p.description}\n\nCustomization options: ${p.customization.join("; ")}.`,
      keywords: `${p.name} ${p.group ?? ""}`,
      link: collection
        ? { label: `View ${collection.title}`, href: `/portfolio/${collection.slug}` }
        : { label: "Explore the portfolio", href: "/portfolio" },
      hideFromSuggestions: true,
    };
  });
}

/** Search hints per policy section heading. */
const POLICY_KEYWORDS: Record<string, string> = {
  "Delivery Timelines": "delivery timeline schedule when arrive how long dispatch proposal mockup approved advance payment",
  "Shipping Methods & Fulfillment": "shipping method deliver multiple addresses individual employees bulk single location office venue courier freight riders",
  "Shipping Rates": "shipping rates fees charges delivery cost price weight dimensions invoice",
  "Tracking & Delivery Confirmation": "tracking track order shipment status dispatched tracking number report",
  "Address Accuracy & Failed Deliveries": "wrong address incorrect address failed delivery returned re delivery reshipping fee recipient unavailable",
  "Damaged or Missing Items": "damaged broken missing item defective complaint refund replacement photos 24 hours",
  "Information We Collect": "privacy data collect information personal details what data",
  "How We Use Your Information": "privacy data use information purpose",
  "Confidentiality & Recipient Data Protection": "privacy confidential confidentiality recipient data protection sell data marketing retention delete spreadsheet",
  "Data Sharing": "privacy data sharing share third party partners vendors",
  "Your Rights & Contact": "privacy rights access correct delete data request personal data",
};

function policyEntries(policy: PolicyDocument): KnowledgeEntry[] {
  return policy.sections.map((section) => ({
    id: `policy:${policy.slug}:${section.heading}`,
    question: `${section.heading} (${policy.title})`,
    answer: [
      ...(section.body ?? []),
      ...(section.items ?? []).map((item) => (item.term ? `${item.term}: ${item.text}` : item.text)),
    ].join("\n\n"),
    keywords: `${policy.title} policy ${POLICY_KEYWORDS[section.heading] ?? ""}`,
    link: { label: policy.title, href: `/${policy.slug}` },
    hideFromSuggestions: true,
  }));
}

/** Our Philosophy page: one entry for the whole page, one per principle. */
function philosophyEntries(): KnowledgeEntry[] {
  const p = philosophyContent;
  const link: KnowledgeLink = { label: p.label, href: "/our-philosophy" };
  return [
    {
      id: "philosophy",
      question: "What is NAQSH's philosophy?",
      answer: [p.intro, ...p.principles.map((x) => `${x.term}: ${x.text}`)].join("\n\n"),
      keywords: "philosophy values ethics ethical principles shariah sharia compliant islamic integrity",
      link,
    },
    ...p.principles.map((x) => ({
      id: `philosophy:${x.term}`,
      question: x.term,
      answer: x.text,
      keywords: `philosophy ${x.term} ${
        {
          "100% Interest-Free": "interest riba loan bank borrowing credit sood",
          "Conscious & Ethical Sourcing": "sourcing supply chain suppliers genocide boycott labor environment",
          "Promise Kept (Amanah)": "amanah promise honest fair pricing quality on time",
          "Dignified Storytelling": "modest modesty branding content islamic guidelines",
          "Halal Standards": "halal haram permissible prohibited",
        }[x.term] ?? ""
      }`,
      link,
      hideFromSuggestions: true,
    })),
  ];
}

export const knowledgeBase: KnowledgeEntry[] = [
  ...companyEntries(),
  ...faqEntries(),
  ...collectionEntries(),
  ...productEntries(),
  ...policyEntries(shippingPolicy),
  ...policyEntries(privacyPolicy),
  ...philosophyEntries(),
];

/** Starter chips shown when the chat opens. */
export const starterQuestions = [
  "What services do you offer?",
  "Can you add our company logo?",
  "What gift collections do you have?",
  "How long does delivery take?",
  "What is the minimum order quantity?",
];
