export interface PolicySection {
  heading: string;
  body: string[];
  confirmTag?: string;
}

export interface PolicyDocument {
  title: string;
  slug: string;
  lastUpdated?: string;
  intro: string;
  sections: PolicySection[];
}

export const privacyPolicy: PolicyDocument = {
  title: "Data Privacy",
  slug: "privacy",
  intro: "Privacy and data handling details are being confirmed. For a question about information you submit through this website, contact Naqsh through the contact page.",
  sections: [{
    heading: "Privacy details",
    body: ["Please contact Naqsh through the contact page to discuss a privacy question."],
    confirmTag: "Client-approved privacy policy, data use, storage, retention, and rights language",
  }],
};

export const shippingPolicy: PolicyDocument = {
  title: "Shipping & Delivery",
  slug: "shipping-delivery",
  intro: "Contact Naqsh to discuss delivery arrangements for a specific gifting request.",
  sections: [{
    heading: "Delivery details",
    body: ["Delivery coverage, methods, timing, and related terms have not yet been confirmed for publication. Please contact Naqsh to discuss your request."],
    confirmTag: "Client-approved delivery coverage, production timelines, fulfillment, claims, and replacement terms",
  }],
};
