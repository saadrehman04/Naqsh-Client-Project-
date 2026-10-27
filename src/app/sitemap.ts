import type { MetadataRoute } from "next";
import { collections } from "@/content/collections";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://naqsh.pk";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/our-approach",
    "/portfolio",
    "/faqs",
    "/contact",
    "/privacy",
    "/shipping-delivery",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const collectionRoutes = collections.map((col) => ({
    url: `${siteUrl}/portfolio/${col.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...collectionRoutes];
}
