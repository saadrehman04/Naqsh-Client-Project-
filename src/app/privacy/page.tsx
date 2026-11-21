import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PolicyContent } from "@/components/sections/PolicyContent";
import { privacyPolicy } from "@/content/policies";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: privacyPolicy.title,
  pageTitle: "Data Privacy Policy, NAQSH",
  description: "How NAQSH collects, uses and safeguards information from corporate clients and gift recipients.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema([{ name: privacyPolicy.title, path: "/privacy" }])} />
    <div className="bg-[var(--ivory-deep)] min-h-screen">
      {/* Editorial Page Hero (fade only on policy pages) */}
      <PageHero title={privacyPolicy.title} subtitle={privacyPolicy.intro} label={privacyPolicy.label} fadeOnly />

      <PolicyContent policy={privacyPolicy} />
    </div>
    </>
  );
}
