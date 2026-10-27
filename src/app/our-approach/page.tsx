import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CTABand } from "@/components/sections/CTABand";
import { approachContent } from "@/content/approach";
import { buildMetadata } from "@/lib/seo";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Our Approach · Thoughtful Corporate Gifting Workflow",
  description:
    "Explore how Naqsh designs corporate gifts: Understand, Curate, Customize, and Deliver. From initial discovery to doorstep delivery across Pakistan.",
  path: "/our-approach",
});

export default function OurApproachPage() {
  const { header, steps, requirements } = approachContent;

  return (
    <div className="bg-[var(--ivory)] min-h-screen">
      {/* Editorial Page Hero */}
      <PageHero
        title={header.title}
        subtitle={header.intro}
        label={header.label}
        breadcrumbs={[{ label: "Our Approach" }]}
      />

      {/* 4-Step Considered Journey */}
      <section className="py-20 sm:py-28" aria-label="Our 4 Steps">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 sm:space-y-24">
            {steps.map((st) => (
              <div
                key={st.number}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pb-16 sm:pb-24 border-b border-[var(--border-light)] last:border-b-0"
                data-reveal="fade-up"
              >
                {/* Step indicator */}
                <div className="lg:col-span-3 flex lg:flex-col items-baseline justify-between lg:justify-start gap-4">
                  <span className="font-serif text-5xl sm:text-6xl text-[var(--terracotta)] font-light">
                    {st.number}
                  </span>
                  <div>
                    <span className="inline-block text-[11px] font-sans tracking-[0.2em] uppercase font-semibold text-[var(--pine)]">
                      Stage {st.number}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[var(--black)] font-normal mt-1">
                      {st.name}
                    </h3>
                  </div>
                </div>

                {/* Narrative & Detail */}
                <div className="lg:col-span-9 bg-[var(--ivory-warm)] border border-[var(--border-light)] rounded-[var(--radius-card)] p-8 sm:p-12 shadow-sm">
                  <h4 className="font-serif text-xl sm:text-2xl text-[var(--chestnut)] font-normal italic mb-4">
                    &ldquo;{st.tagline}&rdquo;
                  </h4>
                  <p className="font-sans text-base sm:text-lg text-[var(--pine)] font-light leading-relaxed">
                    {st.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Need From You (Consultation Preparation) */}
      <section
        className="py-20 sm:py-28 bg-[var(--ivory-warm)] border-y border-[var(--border-light)]"
        aria-label="Client Consultation Checklist"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16" data-reveal="fade-up">
            <SectionLabel variant="pine" className="mb-4">
              {requirements.label}
            </SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl text-[var(--black)] font-normal tracking-tight mb-4">
              {requirements.heading}
            </h2>
            <p className="font-sans text-base sm:text-lg text-[var(--pine)] font-light leading-relaxed">
              {requirements.intro}
            </p>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            data-reveal="stagger"
          >
            {requirements.items.map((req, rIdx) => (
              <div
                key={rIdx}
                className="bg-[var(--ivory)] border border-[var(--border-light)] rounded-[var(--radius-card)] p-8 flex flex-col justify-between hover:border-[var(--copper)] transition-colors duration-300"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-[var(--sage)]/15 text-[var(--pine)] flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl text-[var(--black)] font-normal mb-3">
                    {req.title}
                  </h3>
                  <p className="font-sans text-sm text-[var(--pine)] font-light leading-relaxed">
                    {req.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action band */}
      <CTABand />
    </div>
  );
}
