import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CTABand } from "@/components/sections/CTABand";
import { approachContent } from "@/content/approach";
import { buildMetadata } from "@/lib/seo";
import { CheckCircle2, Calendar, Users, Target, Banknote } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Our Approach · Thoughtful Corporate Gifting Workflow",
  description:
    "Explore how Naqsh designs corporate gifts: Understand, Curate, Customize, and Deliver. From initial discovery to doorstep delivery across Pakistan.",
  path: "/our-approach",
});

export default function OurApproachPage() {
  const { header, steps, requirements } = approachContent;

  const stageThemes = [
    {
      color: "var(--pine)",
      badgeBg: "bg-[var(--pine)]",
      cardBorder: "border-[var(--pine)]/40",
      quoteText: "text-[var(--pine)]",
    },
    {
      color: "#4E6E4C",
      badgeBg: "bg-[#4E6E4C]",
      cardBorder: "border-[#4E6E4C]/40",
      quoteText: "text-[#4E6E4C]",
    },
    {
      color: "var(--terracotta)",
      badgeBg: "bg-[var(--terracotta-deep)]",
      cardBorder: "border-[var(--terracotta)]/40",
      quoteText: "text-[var(--terracotta-deep)]",
    },
    {
      color: "var(--chestnut)",
      badgeBg: "bg-[var(--chestnut)]",
      cardBorder: "border-[var(--chestnut)]/40",
      quoteText: "text-[var(--chestnut)]",
    },
  ];

  const reqIcons = [Target, Users, Calendar, Banknote];

  return (
    <div className="bg-[var(--ivory)] min-h-screen">
      {/* Editorial Page Hero */}
      <PageHero
        title={header.title}
        subtitle={header.intro}
        label={header.label}
        breadcrumbs={[{ label: "Our Approach" }]}
      />

      {/* 4-Step Considered Journey with Dedicated Color Pillars */}
      <section className="py-20 sm:py-28" aria-label="Our 4 Steps">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 sm:space-y-24">
            {steps.map((st, i) => {
              const theme = stageThemes[i];

              return (
                <div
                  key={st.number}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pb-16 sm:pb-24 border-b border-[var(--border-light)] last:border-b-0"
                  data-reveal="fade-up"
                >
                  {/* Step indicator */}
                  <div className="lg:col-span-3 flex lg:flex-col items-baseline justify-between lg:justify-start gap-4">
                    <span
                      className="font-serif text-5xl sm:text-6xl font-light"
                      style={{ color: theme.color }}
                    >
                      {st.number}
                    </span>
                    <div>
                      <span className={`inline-block text-[11px] font-sans tracking-[0.2em] uppercase font-semibold px-3 py-1 rounded-full ${theme.badgeBg} text-[var(--ivory)] shadow-sm`}>
                        Stage {st.number}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-[var(--black)] font-normal mt-3">
                        {st.name}
                      </h3>
                    </div>
                  </div>

                  {/* Narrative & Detail Card */}
                  <div className={`lg:col-span-9 bg-[var(--ivory-warm)] border-2 ${theme.cardBorder} rounded-[var(--radius-card)] p-8 sm:p-12 shadow-md relative overflow-hidden`}>
                    <div
                      className="absolute top-0 left-0 w-2 h-full"
                      style={{ backgroundColor: theme.color }}
                    />
                    <h4 className={`font-serif text-xl sm:text-2xl font-normal italic mb-4 ${theme.quoteText}`}>
                      &ldquo;{st.tagline}&rdquo;
                    </h4>
                    <p className="font-sans text-base sm:text-lg text-[var(--charcoal)] font-light leading-relaxed">
                      {st.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rich Chestnut Consultation Preparation Checklist Banner */}
      <section
        className="py-20 sm:py-28 bg-[var(--chestnut)] text-[var(--ivory)] border-y border-[var(--copper)]/30 relative overflow-hidden"
        aria-label="Client Consultation Checklist"
      >
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[var(--terracotta)]/30 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-16" data-reveal="fade-up">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] uppercase tracking-[0.2em] font-sans font-medium text-[var(--khaki)] mb-4">
              {requirements.label}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[var(--ivory)] font-normal tracking-tight mb-4">
              {requirements.heading}
            </h2>
            <p className="font-sans text-base sm:text-lg text-[var(--ivory)]/90 font-light leading-relaxed">
              {requirements.intro}
            </p>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            data-reveal="stagger"
          >
            {requirements.items.map((req, rIdx) => {
              const Icon = reqIcons[rIdx] || CheckCircle2;

              return (
                <div
                  key={rIdx}
                  className="bg-[var(--ivory)] text-[var(--black)] border border-[var(--border-light)] rounded-[var(--radius-card)] p-8 flex flex-col justify-between hover:border-[var(--copper)] hover:-translate-y-1.5 transition-all duration-300 shadow-xl"
                >
                  <div>
                    <div className="w-11 h-11 rounded-full bg-[var(--terracotta)]/15 text-[var(--terracotta-deep)] flex items-center justify-center mb-6">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-xl text-[var(--black)] font-normal mb-3">
                      {req.title}
                    </h3>
                    <p className="font-sans text-sm text-[var(--charcoal)] font-light leading-relaxed">
                      {req.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to action band */}
      <CTABand />
    </div>
  );
}
