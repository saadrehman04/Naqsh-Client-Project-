import type { MetadataRoute } from "next";
import { collections } from "@/content/collections";
import { products } from "@/content/products";
import { homeContent } from "@/content/home";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://naqshonline.co";
const abs = (p: string) => `${siteUrl}${p}`;

/** Main pages, with the photos each one shows (so Google Images can find them). */
const STATIC_ROUTES: { path: string; priority: number; images?: string[] }[] = [
  { path: "", priority: 1.0, images: [homeContent.hero.image, homeContent.about.image, "/og/naqsh-share.png"] },
  { path: "/services", priority: 0.9, images: ["/images/site/services-cover.webp", "/images/site/gifting-consultation-v2.webp"] },
  { path: "/portfolio", priority: 0.9, images: collections.map((c) => c.image) },
  { path: "/our-approach", priority: 0.7 },
  { path: "/our-philosophy", priority: 0.6 },
  { path: "/faqs", priority: 0.8 },
  { path: "/contact", priority: 0.8, images: ["/images/site/contact-cover-2k.webp", "/images/site/contact-gift-box.webp", "/images/site/contact-gift-box-notext.webp"] },
  { path: "/privacy", priority: 0.3 },
  { path: "/shipping-delivery", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = STATIC_ROUTES.map((route) => ({
    url: abs(route.path),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route.priority,
    ...(route.images ? { images: route.images.map(abs) } : {}),
  }));

  const collectionRoutes = collections.map((col) => ({
    url: abs(`/portfolio/${col.slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    images: [col.image, ...products.filter((p) => p.collection === col.slug).map((p) => p.image)].map(abs),
  }));

  return [...staticRoutes, ...collectionRoutes];
}
