import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://naqsh-client-project.vercel.app";

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
  description = "Discover premium corporate gifting with NAQSH. Explore personalized gifts, employee welcome kits, executive hampers, festive collections, and bespoke corporate gifting solutions.",
  path = "",
  noIndex = false,
  image = "/opengraph-image",
}: PageMetaOptions = {}): Metadata {
  const fullTitle = title
    ? `${title} | NAQSH`
    : "NAQSH | Premium Corporate Gifting & Bespoke Gift Solutions";
  const url = `${siteUrl}${path}`;

  return {
    title: fullTitle,
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
    description:
      "Discover premium corporate gifting with NAQSH. Personalized gifts, employee welcome kits, executive hampers, festive collections, and bespoke corporate gifting solutions in Lahore, Pakistan.",
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressCountry: "PK",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
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
