/**
 * Policy pages. Text is verbatim from the client's PDFs ("Shipping Policy.pdf" and
 * "Data Privacy Policy.pdf", received 2026-11-17). Do not reword.
 */

export interface PolicyItem {
  /** Bold lead-in, e.g. "Proposal-Based Schedule". Omitted for plain bullets. */
  term?: string;
  text: string;
}

export interface PolicySection {
  heading: string;
  /** Plain paragraphs (used when the PDF has running text instead of bullets). */
  body?: string[];
  items?: PolicyItem[];
  confirmTag?: string;
}

export interface PolicyDocument {
  title: string;
  slug: string;
  /** Shown as the hero label. */
  label: string;
  lastUpdated?: string;
  intro: string;
  sections: PolicySection[];
}

/** Address named in both policies for support, data and damage requests. */
export const SUPPORT_EMAIL = "support@naqshonline.co";

export const shippingPolicy: PolicyDocument = {
  title: "Shipping & Delivery Policy",
  slug: "shipping-delivery",
  label: "Fulfillment & Care",
  intro:
    "At Naqsh, we ensure your corporate gifts arrive safely and on schedule. Please review our shipping and delivery terms below.",
  sections: [
    {
      heading: "Delivery Timelines",
      items: [
        {
          term: "Proposal-Based Schedule",
          text: "All orders are processed, customized, and delivered strictly according to the timelines agreed upon in approved proposal and order confirmation.",
        },
        {
          term: "Timeline Dependencies",
          text: "Agreed delivery schedules take effect once final mockup is approved, complete recipient details are submitted, and advance payment (as and when applicable) is confirmed.",
        },
      ],
    },
    {
      heading: "Shipping Methods & Fulfillment",
      items: [
        {
          term: "Multi-Address Delivery",
          text: "We ship directly to individual employee or client addresses using your provided recipient list.",
        },
        {
          term: "Bulk Single-Location Delivery",
          text: "Delivered via freight or commercial courier or Naqsh’s official riders to your corporate office or event venue.",
        },
      ],
    },
    {
      heading: "Shipping Rates",
      items: [
        {
          text: "Shipping fees are calculated based on order weight, box dimensions, delivery locations, and shipping method, and are itemized in your proposal and final invoice.",
        },
      ],
    },
    {
      heading: "Tracking & Delivery Confirmation",
      items: [
        {
          text: "Once dispatched, you will receive tracking details for your shipment(s). For multi-recipient orders, a consolidated tracking report will be shared with your account coordinator.",
        },
      ],
    },
    {
      heading: "Address Accuracy & Failed Deliveries",
      items: [
        {
          term: "Client Responsibility",
          text: "Please verify all recipient names, street addresses, and phone numbers before submitting your recipient list.",
        },
        {
          term: "Re-Delivery Fees",
          text: "If a package is returned due to an incorrect/incomplete address or recipient unavailability after standard courier attempts, re-shipping fees will apply.",
        },
      ],
    },
    {
      heading: "Damaged or Missing Items",
      items: [
        {
          text: `Inspect shipments upon arrival. If an item arrives damaged or is missing, notify us at ${SUPPORT_EMAIL} within 24 hours of delivery with photos of the damaged packaging and items so we can take the necessary action promptly.`,
        },
      ],
    },
  ],
};

export const privacyPolicy: PolicyDocument = {
  title: "Data Privacy Policy",
  slug: "privacy",
  label: "Legal & Transparency",
  intro:
    "Naqsh (“we,” “our,” or “us”) is committed to protecting the privacy and confidentiality of our corporate clients and gift recipients. This policy outlines how we collect, use, and safeguard your information.",
  sections: [
    {
      heading: "Information We Collect",
      items: [
        {
          term: "Client Information",
          text: "Name, job title, company name, business email address, phone number, billing details, and tax/registration numbers.",
        },
        {
          term: "Recipient Information",
          text: "Names, shipping addresses, email addresses, and phone numbers provided by clients for bulk or individual gift fulfillment.",
        },
        {
          term: "Order & Branding Assets",
          text: "Purchase history, custom gift messages, and corporate logos or artwork provided for branding.",
        },
        {
          term: "Others",
          text: "Any other information shared by the client required for processing of their orders.",
        },
      ],
    },
    {
      heading: "How We Use Your Information",
      items: [
        {
          term: "Order Fulfillment",
          text: "Processing payments, customizing products, and coordinating courier deliveries to client’s company or recipients.",
        },
        {
          term: "Communication",
          text: "Sending order confirmations, tracking updates, invoices, and responding to customer support inquiries.",
        },
        {
          term: "Service Improvement",
          text: "Analyzing website usage and order trends to improve our product catalog and client experience.",
        },
      ],
    },
    {
      heading: "Confidentiality & Recipient Data Protection",
      items: [
        {
          term: "Strict Non-Disclosure",
          text: "All client lists, recipient addresses, and corporate branding files are treated as strictly confidential.",
        },
        {
          term: "No Third-Party Marketing",
          text: "We never sell, rent, or trade client or recipient data. Individual recipients will not be added to our promotional mailing lists or contacted for marketing purposes. Any company promotions, packages, offers, etc. are shared with client company’s registered POCs.",
        },
        {
          term: "Data Retention",
          text: "Recipient spreadsheets and custom logo files are securely stored to fulfill your order or deleted immediately upon your written request.",
        },
      ],
    },
    {
      heading: "Data Sharing",
      items: [
        {
          term: "Trusted Partners",
          text: "We share necessary data only with vetted third parties required to complete your order (e.g., payment processors, printing/branding vendors, and shipping carriers), all of whom are bound by confidentiality agreements.",
        },
      ],
    },
    {
      heading: "Your Rights & Contact",
      body: [
        `You may request access to, correction of, or deletion of your company’s and recipients' personal data at any time by contacting us at ${SUPPORT_EMAIL}.`,
      ],
    },
  ],
};
