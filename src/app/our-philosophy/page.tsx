import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PhilosophyContent } from "@/components/sections/PhilosophyContent";
import { philosophyContent } from "@/content/philosophy";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: philosophyContent.label,
  description:
    "NAQSH operates on ethical and Shariah-compliant principles: interest-free, ethically sourced, Amanah, dignified storytelling and halal standards.",
  path: "/our-philosophy",
});

export default function OurPhilosophyPage() {
  return (
    <div className="bg-[var(--ivory)] min-h-screen">
      {/* Text-only hero, like the policy pages */}
      <PageHero
        title={philosophyContent.title}
        subtitle={philosophyContent.intro}
        label={philosophyContent.label}
        fadeOnly
      />

      <PhilosophyContent />
    </div>
  );
}
