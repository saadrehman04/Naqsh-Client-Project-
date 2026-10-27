import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Confirm } from "@/components/ui/Confirm";
import { CTABand } from "@/components/sections/CTABand";
import { privacyPolicy } from "@/content/policies";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Data Privacy Policy",
  description:
    "How Naqsh collects, handles, and protects corporate inquiry details, contact records, and delivery information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="bg-[var(--ivory)] min-h-screen">
      {/* Editorial Page Hero */}
      <PageHero
        title={privacyPolicy.title}
        subtitle={privacyPolicy.intro}
        label="Legal & Transparency"
        breadcrumbs={[{ label: "Data Privacy" }]}
      />

      {/* Policy Content */}
      <article className="py-20 sm:py-28" aria-label="Privacy Policy Document">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.2em] font-sans font-medium text-[var(--sage)] mb-12 pb-4 border-b border-[var(--border-light)]">
            Last Updated: {privacyPolicy.lastUpdated}
          </div>

          <div className="space-y-12">
            {privacyPolicy.sections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl text-[var(--black)] font-normal tracking-tight">
                  {section.heading}
                </h2>
                <div className="space-y-3 font-sans text-base text-[var(--pine)] font-light leading-relaxed">
                  {section.body.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>
                {section.confirmTag && (
                  <div className="pt-2">
                    <Confirm label={section.confirmTag} />
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </article>

      {/* Call to action band */}
      <CTABand />
    </div>
  );
}
