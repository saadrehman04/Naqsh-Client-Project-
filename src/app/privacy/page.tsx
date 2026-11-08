import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Confirm } from "@/components/ui/Confirm";
import { CTABand } from "@/components/sections/CTABand";
import { privacyPolicy } from "@/content/policies";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Data Privacy Policy",
  description:
    "Privacy details and contact information for Naqsh corporate gifting inquiries.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="bg-[var(--ivory-deep)] min-h-screen">
      {/* Editorial Page Hero (fade only on policy pages) */}
      <PageHero
        title={privacyPolicy.title}
        subtitle={privacyPolicy.intro}
        label="Legal & Transparency"
        breadcrumbs={[{ label: "Data Privacy" }]}
        fadeOnly
      />

      {/* Policy Content */}
      <article
        className="py-12 sm:py-24"
        aria-label="Privacy Policy Document"
        data-reveal="fade"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl sm:rounded-3xl bg-[#FAF6EF] p-6 sm:p-12 border border-[#26211D]/12 shadow-sm">
            <div className="text-xs uppercase tracking-[0.18em] font-sans font-medium text-[var(--pine)] mb-10 pb-4 border-b border-[var(--border-light)]">
              Privacy details pending confirmation
            </div>

            <div className="space-y-10">
              {privacyPolicy.sections.map((section, idx) => (
                <section key={idx} className="space-y-3" data-reveal="fade">
                  <h2 className="font-serif text-2xl sm:text-3xl text-[var(--black)] font-normal tracking-tight">
                    {section.heading}
                  </h2>
                  <div className="space-y-3 font-sans text-base text-[var(--charcoal)] font-light leading-relaxed">
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
        </div>
      </article>

      {/* Call to action band */}
      <CTABand />
    </div>
  );
}
