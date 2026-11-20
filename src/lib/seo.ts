import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

/** Client copy (2026-11-20), verbatim. Default page description and the organization description. */
export const SITE_DESCRIPTION =
  "Discover premium corporate gifting with Naqsh. Partner with us for custom-curated corporate gifts designed to reflect your brand and leave a lasting impression.";

const siteUrl =
  // Live domain (the client shares https://naqshonline.co). Production has no NEXT_PUBLIC_SITE_URL,
  // so previews and canonical URLs were pointing at the Vercel address before (fixed 2026-11-20).
  process.env.NEXT_PUBLIC_SITE_URL || "https://naqshonline.co";

export interface PageMetaOptions {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  image?: string;
}

export const buildMetadata = constructMetadata;

export function constructMetadata({
  title,
  // Client copy (2026-11-20), verbatim: shown under the title in link previews and search results.
  description = SITE_DESCRIPTION,
  path = "",
  noIndex = false,
  // Link-preview card: black, copper 3D wordmark, tagline (client request 2026-11-20).
  // Built by scripts/build-og-image.mjs.
  image = "/og/naqsh-share.png",
}: PageMetaOptions = {}): Metadata {
  const fullTitle = title
    ? `${title} | NAQSH`
    : "NAQSH | Premium Corporate Gifting";
  const url = `${siteUrl}${path}`;

  return {
    // Browser tab shows only the brand (client request, Nov 2026). The descriptive page title
    // is kept for link previews (Open Graph / Twitter) below.
    title: { absolute: "NAQSH" },
    description,
    keywords: [
      "corporate gifting",
      "luxury corporate gifts",
      "personalized corporate gifts",
      "employee welcome kits",
      "executive gifting",
      "client appreciation gifts",
      "corporate gift hampers",
      "bespoke corporate gifting",
      "corporate gifts Lahore",
      "corporate gifting Pakistan",
      "Ramadan corporate gifts",
      "Eid corporate hampers",
    ],
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "NAQSH Luxury Corporate Gifting",
      locale: "en_PK",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `NAQSH - ${siteConfig.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NAQSH",
    legalName: "NAQSH Corporate Gifting",
    url: siteUrl,
    logo: `${siteUrl}/brand/wordmark-black.svg`,
    slogan: siteConfig.tagline,
    description: SITE_DESCRIPTION,
    telephone: siteConfig.phone,
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressCountry: "PK",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      ...(siteConfig.email ? { email: siteConfig.email } : {}),
      contactType: "customer service",
      areaServed: "PK",
      availableLanguage: ["English", "Urdu"],
    },
  };
}

export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
