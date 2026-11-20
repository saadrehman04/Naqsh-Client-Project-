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
    // Google Search Console ownership check (invisible meta tag). Set GOOGLE_SITE_VERIFICATION in
    // Vercel to the code Search Console gives, or paste it here.
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
      : {}),
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

const ORG_ID = `${siteUrl}/#organization`;
const WEBSITE_ID = `${siteUrl}/#website`;
const abs = (path: string) => (path.startsWith("http") ? path : `${siteUrl}${path}`);

/**
 * Site-wide structured data (invisible; read by Google): the business, as both an Organization
 * and a LocalBusiness based in Lahore serving all of Pakistan, plus the WebSite it owns.
 * Only facts already published on the site. No street address, opening hours or social profiles
 * are given (unknown, or still placeholders).
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": ORG_ID,
        name: "NAQSH",
        legalName: "NAQSH Corporate Gifting",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/brand/naqsh-logo-search.png`,
          width: 1200,
          height: 600,
        },
        image: `${siteUrl}/og/naqsh-share.png`,
        slogan: siteConfig.tagline,
        description: SITE_DESCRIPTION,
        telephone: siteConfig.phone,
        ...(siteConfig.email ? { email: siteConfig.email } : {}),
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lahore",
          addressRegion: "Punjab",
          addressCountry: "PK",
        },
        areaServed: { "@type": "Country", name: "Pakistan" },
        knowsAbout: [
          "Corporate gifting",
          "Employee welcome kits",
          "Client gift packages",
          "Ramadan and Eid corporate gifts",
          "Branded corporate merchandise",
          "Gifting consultation",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: siteConfig.phone,
          ...(siteConfig.email ? { email: siteConfig.email } : {}),
          contactType: "customer service",
          areaServed: "PK",
          availableLanguage: ["English", "Urdu"],
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: siteUrl,
        name: "NAQSH",
        alternateName: "NAQSH Corporate Gifting",
        description: SITE_DESCRIPTION,
        publisher: { "@id": ORG_ID },
        inLanguage: "en-PK",
      },
    ],
  };
}

/** Breadcrumb trail for an inner page: Home > ... > page. */
export function generateBreadcrumbSchema(trail: { name: string; path: string }[]) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path === "/" ? "" : item.path) || siteUrl,
    })),
  };
}

/** The services NAQSH offers (Services page), provided by the business above. */
export function generateServicesSchema(services: { name: string; description: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@graph": services.map((svc) => ({
      "@type": "Service",
      name: svc.name,
      description: svc.description,
      serviceType: "Corporate gifting",
      url: abs(svc.path),
      provider: { "@id": ORG_ID },
      areaServed: { "@type": "Country", name: "Pakistan" },
    })),
  };
}

/** A list of linked items with images (collections on Portfolio, products on a collection page). */
export function generateItemListSchema(opts: {
  name: string;
  description: string;
  path: string;
  /** url only when the item has its own page (collections); products live on their collection page. */
  items: { name: string; url?: string; image: string; description?: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: opts.name,
    description: opts.description,
    url: abs(opts.path),
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: opts.items.length,
      itemListElement: opts.items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        ...(item.url ? { url: abs(item.url) } : {}),
        image: abs(item.image),
        ...(item.description ? { description: item.description } : {}),
      })),
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
