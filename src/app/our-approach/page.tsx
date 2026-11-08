import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { CTABand } from "@/components/sections/CTABand";
import { homeContent } from "@/content/home";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our Approach · Corporate Gifting",
  description: "Naqsh's four-step approach to corporate gifting: understand, curate, customize, and deliver.",
  path: "/our-approach",
});

export default function OurApproachPage() {
  return (
    <div className="min-h-screen bg-[var(--ivory-deep)]">
      <PageHero
        title="A considered journey from concept to doorstep."
        subtitle={homeContent.approach.intro}
        label="Our Approach"
        breadcrumbs={[{ label: "Our Approach" }]}
        image="/images/products/new-hire-welcome-kit.webp"
      />
      <ApproachSection compact />
      <CTABand />
    </div>
  );
}
