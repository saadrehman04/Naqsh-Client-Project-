import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { approachContent } from "@/content/approach";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our Approach · Four-Step Corporate Gifting Process",
  description:
    "Discover NAQSH's four-step corporate gifting process—Understand, Curate, Customize, and Deliver—designed to take your project from concept to doorstep.",
  path: "/our-approach",
});

export default function OurApproachPage() {
  const { header } = approachContent;

  return (
    <div className="bg-[var(--ivory-deep)]">
      <PageHero
        title={header.title}
        subtitle={header.intro}
        label={header.label}
        breadcrumbs={[{ label: "Our Approach" }]}
        image="/images/products/new-hire-welcome-kit.webp"
      />
    </div>
  );
}
