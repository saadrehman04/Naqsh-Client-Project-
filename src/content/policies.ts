export interface PolicySection {
  heading: string;
  body: string[];
  confirmTag?: string;
}

export interface PolicyDocument {
  title: string;
  slug: string;
  lastUpdated: string;
  intro: string;
  sections: PolicySection[];
}

export const privacyPolicy: PolicyDocument = {
  title: "Data Privacy Policy",
  slug: "privacy",
  lastUpdated: "October 2026",
  intro:
    "At Naqsh, we honor the trust you place in us when sharing your corporate and personal information. This Privacy Policy outlines how we collect, handle, and protect your information when you interact with our website and consultation services.",
  sections: [
    {
      heading: "1. Who We Are",
      body: [
        "Naqsh ('we', 'us', or 'our') is a B2B corporate gifting consultancy registered in Lahore, Pakistan, dedicated to curating and delivering bespoke gifting experiences.",
        "If you have any questions regarding this policy or your data rights, you may contact our privacy coordinator through the channels listed at the end of this document.",
      ],
    },
    {
      heading: "2. Information We Collect",
      body: [
        "We only collect information necessary to respond to your corporate inquiries and deliver bespoke gifting proposals. This includes:",
        "• Your full name and corporate role or job title",
        "• Company name and corporate email address",
        "• Business phone or WhatsApp contact number",
        "• Project specifics: occasion, estimated recipient counts, target budget range, and required delivery dates",
        "• Any additional notes or brand guidance provided through our inquiry form",
      ],
    },
    {
      heading: "3. How We Use Your Information",
      body: [
        "We process your data strictly for legitimate business purposes, including:",
        "• Reviewing your gifting brief and drafting customized proposals",
        "• Communicating project milestones, order confirmations, and sample approvals",
        "• Coordinating packaging logistics and doorstep delivery",
        "We do not sell, rent, or trade your contact information to third-party advertisers or data brokers under any circumstances.",
      ],
    },
    {
      heading: "4. Third-Party Service Providers",
      body: [
        "To deliver a seamless digital service, we collaborate with reputable infrastructure providers who process data strictly under our instruction:",
        "• Email transmission services (such as Resend) to deliver consultation submissions securely to our team",
        "• Web hosting and content delivery networks (such as Vercel) providing secure HTTPS infrastructure",
        "All service providers adhere to rigorous international data security standards.",
      ],
    },
    {
      heading: "5. Data Retention & Security",
      body: [
        "We retain inquiry records only as long as necessary to fulfill project requirements, maintain ongoing corporate partnerships, or satisfy statutory accounting obligations.",
        "We enforce industry-standard technical and organizational security measures to protect your data against unauthorized access, alteration, or disclosure.",
      ],
      confirmTag: "Data retention schedule and statutory record limits",
    },
    {
      heading: "6. Your Rights",
      body: [
        "You have the right to request a copy of the personal information we hold about you, request corrections to inaccurate records, or request deletion of your contact details once project obligations have concluded.",
        "To exercise these rights, please reach out to us via WhatsApp (+92 340 6119004) or by contacting our team.",
      ],
    },
  ],
};

export const shippingPolicy: PolicyDocument = {
  title: "Shipping & Delivery Policy",
  slug: "shipping-delivery",
  lastUpdated: "October 2026",
  intro:
    "Every Naqsh delivery represents an extension of your company's brand and hospitality. We manage the fulfillment process with meticulous care to ensure each package arrives in pristine presentation condition.",
  sections: [
    {
      heading: "1. Delivery Coverage",
      body: [
        "We operate fulfillment from our central workshop in Lahore, Pakistan, coordinating tracked courier and specialized cargo services to corporate destinations nationwide, including Lahore, Karachi, Islamabad, Rawalpindi, and Faisalabad.",
      ],
      confirmTag: "Complete list of covered regional hubs and international dispatch capability",
    },
    {
      heading: "2. Production & Delivery Timelines",
      body: [
        "Because our solutions are tailored to each occasion, overall lead times encompass both production preparation and transit.",
        "Standard custom orders generally require 2 to 4 weeks from proposal confirmation and sample sign-off to final dispatch. Express arrangements may be accommodated depending on inventory availability and current workshop capacity.",
      ],
      confirmTag: "Standard transit SLAs per city and rush order fee tiers",
    },
    {
      heading: "3. Bulk & Multi-Destination Dispatches",
      body: [
        "• Bulk Single-Drop Deliveries: Direct palletized or courier delivery to your corporate office or event venue with pre-scheduled arrival windows.",
        "• Individual Multi-Drop Fulfillment: We can dispatch individual kits directly to recipient residential or business addresses across multiple cities. Address files are handled with strict privacy protocols.",
      ],
    },
    {
      heading: "4. Packaging & Handling Standards",
      body: [
        "All gift boxes, wax-sealed containers, and fragile ceramics are individually cushioned and encased within protective outer transit cartons. Fragile stickers and temperature-conscious handling are enforced for perishable and sweet treats.",
      ],
    },
    {
      heading: "5. Damaged or Discrepant Shipments",
      body: [
        "We inspect every item before sealing. In the rare event that an item incurs transit damage or a discrepancy arises, please notify our client care team within 48 hours of receipt with photographic documentation, and we will promptly dispatch replacements or adjust invoicing accordingly.",
      ],
      confirmTag: "Official claims window and replacement lead times",
    },
  ],
};
