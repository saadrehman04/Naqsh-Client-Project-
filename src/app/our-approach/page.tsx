import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { CTABand } from "@/components/sections/CTABand";
import { approachContent } from "@/content/approach";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our Approach · Four-Step Corporate Gifting Process",
  description:
    "Discover NAQSH's four-step corporate gifting process—Understand, Curate, Customize, and Deliver—designed to take your project from concept to doorstep.",
  path: "/our-approach",
});

export default function OurApproachPage() {
  const { header, steps, valueComparison, illustrativeJourney, requirements } =
    approachContent;

  return (
    <div className="min-h-screen bg-[var(--ivory-deep)]">
      <PageHero
        title={header.title}
        subtitle={header.intro}
        label={header.label}
        breadcrumbs={[{ label: "Our Approach" }]}
        image="/images/products/new-hire-welcome-kit.webp"
      />

      {/* Interactive 3D GiftBox & 4-Step Overview */}
      <ApproachSection compact />

      {/* Detailed Stage-by-Stage Breakdown with Visual Examples */}
      <section
        className="py-20 sm:py-28 bg-[var(--ivory)] border-t border-[var(--hairline)]"
        aria-labelledby="detailed-stages-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16" data-reveal="up">
            <span className="t-label text-[var(--pine)] block mb-2">
              Stage-by-Stage Execution
            </span>
            <h2 id="detailed-stages-heading" className="t-h2" data-reveal="lines">
              Every Stage Handled With Care.
            </h2>
          </div>

          <div className="space-y-16 sm:space-y-24">
            {steps.map((step, idx) => {
              const isReversed = idx % 2 === 1;
              return (
                <article
                  key={step.number}
                  className={`flex flex-col ${
                    isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                  } items-center gap-10 lg:gap-16 rounded-3xl bg-[var(--ivory-deep)] border border-[var(--hairline)] p-6 sm:p-10`}
                >
                  <div className="w-full lg:w-5/12">
                    <div
                      className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#12100E] shadow-md"
                      data-reveal="clip"
                      data-clip-from={isReversed ? "right" : "left"}
                    >
                      <Image
                        src={step.image}
                        alt={step.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div
                    className="w-full lg:w-7/12 space-y-5"
                    data-reveal="stagger"
                    data-stagger="0.08"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-4xl sm:text-5xl text-[var(--chestnut)] font-light">
                        {step.number}
                      </span>
                      <span className="h-px w-8 bg-[var(--hairline)]" aria-hidden="true" />
                      <span className="text-xs font-sans uppercase tracking-[0.16em] text-[var(--pine)] font-semibold">
                        {step.tagline}
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl sm:text-4xl text-[var(--black)] font-normal">
                      {step.name}
                    </h3>

                    <p className="font-sans text-base text-[var(--charcoal)] font-light leading-relaxed">
                      {step.detail}
                    </p>

                    <div className="pt-3 border-t border-[var(--hairline)]">
                      <span className="text-xs font-sans uppercase tracking-[0.14em] font-semibold text-[var(--black)] block mb-2.5">
                        Key Stage Deliverables
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {step.deliverables.map((del) => (
                          <li
                            key={del}
                            className="flex items-start gap-2 text-xs sm:text-sm text-[var(--charcoal)] font-sans bg-[var(--ivory)] p-3 rounded-xl border border-[var(--hairline)]"
                          >
                            <Check className="w-4 h-4 text-[var(--pine)] shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Working With NAQSH Beats Managing Gifting Independently */}
      <section
        className="on-dark py-20 sm:py-28 bg-[#101D19] text-[var(--ivory)] relative overflow-hidden"
        aria-labelledby="naqsh-advantage-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-14" data-reveal="up">
            <span className="t-label text-[#C99A53] block mb-2">
              {valueComparison.label}
            </span>
            <h2
              id="naqsh-advantage-heading"
              className="font-serif text-3xl sm:text-5xl text-[var(--ivory)] font-normal tracking-tight mb-4"
              data-reveal="lines"
            >
              {valueComparison.heading}
            </h2>
            <p className="text-base sm:text-lg text-[var(--ivory)]/80 font-light leading-relaxed">
              {valueComparison.intro}
            </p>
          </div>

          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8"
            data-reveal="stagger"
            data-stagger="0.1"
          >
            {valueComparison.points.map((pt, idx) => (
              <div
                key={pt.title}
                className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 sm:p-8 flex flex-col justify-between space-y-6"
              >
                <div>
                  <span className="font-serif text-2xl text-[#C99A53] block mb-2">
                    0{idx + 1}
                  </span>
                  <h3 className="font-serif text-2xl text-[var(--ivory)] font-normal mb-4">
                    {pt.title}
                  </h3>
                  <div className="space-y-4 text-sm font-sans">
                    <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                      <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--khaki)] font-semibold block mb-1">
                        Managing Independently
                      </span>
                      <p className="text-[var(--ivory)]/70 font-light">
                        {pt.inHouse}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#C99A53]/15 border border-[#C99A53]/40">
                      <span className="text-[10px] uppercase tracking-[0.14em] text-[#FBE2AA] font-semibold block mb-1">
                        Partnering With NAQSH
                      </span>
                      <p className="text-[var(--ivory)] font-normal">
                        {pt.withNaqsh}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Illustrative Project Journey & Preparation Checklist */}
      <section
        className="py-20 sm:py-28 bg-[var(--ivory-deep)]"
        aria-labelledby="illustrative-journey-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          <div className="rounded-3xl bg-[var(--ivory)] border border-[var(--hairline)] p-6 sm:p-10 lg:p-12 shadow-sm">
            <div className="max-w-3xl mb-10" data-reveal="up">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--pine)]/10 text-[var(--pine)] border border-[var(--pine)]/20 text-xs font-sans uppercase tracking-[0.14em] font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{illustrativeJourney.badge}</span>
              </span>
              <h2
                id="illustrative-journey-heading"
                className="font-serif text-3xl sm:text-4xl text-[var(--black)] font-normal"
              >
                {illustrativeJourney.heading}
              </h2>
              <p className="mt-2 text-xs sm:text-sm font-sans text-[var(--charcoal)]/75 italic">
                {illustrativeJourney.note}
              </p>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              data-reveal="stagger"
              data-stagger="0.08"
            >
              {illustrativeJourney.phases.map((phase) => (
                <div
                  key={phase.stage}
                  className="p-6 rounded-2xl bg-[var(--ivory-deep)] border border-[var(--hairline)] flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-sans uppercase tracking-[0.14em] text-[var(--chestnut)] font-semibold block mb-2">
                      {phase.stage}
                    </span>
                    <h3 className="font-serif text-xl text-[var(--black)] font-normal mb-2.5">
                      {phase.title}
                    </h3>
                    <p className="text-sm font-sans text-[var(--charcoal)] font-light leading-relaxed">
                      {phase.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="max-w-2xl mb-10" data-reveal="up">
              <span className="t-label text-[var(--pine)] block mb-2">
                {requirements.label}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[var(--black)] font-normal mb-3">
                {requirements.heading}
              </h2>
              <p className="text-base text-[var(--charcoal)] font-light leading-relaxed">
                {requirements.intro}
              </p>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              data-reveal="stagger"
              data-stagger="0.08"
            >
              {requirements.items.map((item, idx) => (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl bg-[var(--ivory)] border border-[var(--hairline)]"
                >
                  <span className="font-serif text-2xl text-[var(--chestnut)] block mb-2">
                    0{idx + 1}
                  </span>
                  <h3 className="font-serif text-xl text-[var(--black)] font-normal mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm font-sans text-[var(--charcoal)] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10" data-reveal="up">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#101D19] hover:bg-[var(--chestnut)] text-[var(--ivory)] font-sans text-xs tracking-[0.16em] uppercase font-semibold transition-all duration-300 shadow-md"
              >
                <span>Let&apos;s Plan Your Next Gifting Experience</span>
                <ArrowRight className="w-4 h-4 text-[#C99A53]" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
