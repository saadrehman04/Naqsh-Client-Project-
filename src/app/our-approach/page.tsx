import type { Metadata } from "next";
import { ApproachHero } from "@/components/sections/ApproachHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our Approach · Four-Step Corporate Gifting Process",
  pageTitle: "Our Corporate Gifting Process, NAQSH",
  description:
    "Discover NAQSH's four-step corporate gifting process—Understand, Curate, Customize, and Deliver—designed to take your project from concept to doorstep.",
  path: "/our-approach",
});

export default function OurApproachPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema([{ name: "Our Approach", path: "/our-approach" }])} />
      <ApproachHero />
    </>
  );
}
