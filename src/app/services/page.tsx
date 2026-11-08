import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { servicesContent } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services · Personalized Corporate Gifting & Consultations",
  description:
    "Personalized corporate gifts and gifting consultations from Naqsh.",
  path: "/services",
});

export default function ServicesPage() {
  const { header, services, workflowStrip } = servicesContent;

  const serviceBadges = [
    { bg: "bg-[var(--terracotta-deep)]", text: "text-[var(--ivory)]", border: "border-[var(--terracotta)]" },
    { bg: "bg-[var(--pine)]", text: "text-[var(--ivory)]", border: "border-[var(--pine)]" },
  ];

  return (
    <div className="bg-[var(--ivory)] min-h-screen">
      {/* Editorial Page Hero */}
      <PageHero
        title={header.title}
        subtitle={header.intro}
        label={header.label}
        breadcrumbs={[{ label: "Services" }]}
        image="/images/products/client-onboarding-kit.webp"
      />

      {/* Services Deep Dive */}
      <section className="py-20 sm:py-28 bg-[var(--ivory-deep)]" aria-label="Detailed Services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
          {services.map((service, idx) => {
            const isReversed = idx % 2 === 1;
            const badge = serviceBadges[idx];

            return (
              <div
                key={service.id}
                id={service.id}
                className={`flex flex-col ${
                  isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-12 lg:gap-20`}
              >
                {/* Visual */}
                <div className="w-full lg:w-1/2">
                  <div
                    className={`relative aspect-[4/3] rounded-[var(--radius-card)] overflow-hidden bg-[var(--ivory-warm)] border-2 ${badge.border} shadow-xl group`}
                    data-reveal="clip"
                    data-clip-from={isReversed ? "right" : "left"}
                    data-parallax="0.08"
                  >
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover scale-[1.15] transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Narrative & Checklist */}
                <div
                  className="w-full lg:w-1/2 flex flex-col justify-center"
                  data-reveal="stagger"
                  data-stagger="0.1"
                >
                  <span
                    className="font-serif text-5xl sm:text-6xl text-[var(--chestnut)] font-light select-none mb-2"
                    data-count-to={idx + 1}
                    data-count-pad="2"
                  >
                    {service.number}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[var(--black)] font-normal mb-4 tracking-tight">
                    {service.title}
                  </h2>
                  <p className="font-sans text-base sm:text-lg text-[var(--charcoal)] font-light leading-relaxed mb-8">
                    {service.summary}
                  </p>

                  {/* Call to action */}
                  <div>
                    <Link
                      href={service.ctaHref}
                      data-magnetic
                      className={`inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full ${idx === 0 ? "bg-[var(--terracotta-deep)] hover:bg-[var(--chestnut)]" : "bg-[var(--pine)] hover:bg-[#7F3021]"} text-[var(--ivory)] font-sans text-xs tracking-[0.14em] uppercase font-semibold transition-all duration-300 shadow-md hover:scale-[1.02]`}
                    >
                      <span>{service.ctaText}</span>
                      <ArrowRight className="w-4 h-4 text-[var(--khaki)]" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Dark Obsidian Workflow Strip */}
      <section
        className="workflow-editorial on-dark section-y relative overflow-hidden"
        aria-label="Workflow Process"
      >
        <div
          className="absolute -bottom-40 -left-32 w-[560px] h-[560px] max-w-[120vw] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(171,108,73,0.16) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="t-label text-[#E5A666] mb-4 block" data-reveal="up">
              {workflowStrip.label}
            </span>
            <h2
              className="font-serif text-3xl sm:text-4xl text-[var(--ivory)] font-normal tracking-tight"
              data-reveal="lines"
            >
              {workflowStrip.heading}
            </h2>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            data-reveal="stagger"
            data-stagger="0.1"
          >
            {workflowStrip.steps.map((st) => (
              <div
                key={st.step}
                className="workflow-step rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[var(--copper)]/45 hover:bg-white/[0.05] transition-colors duration-300 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-3xl font-semibold text-[var(--copper-light)]">
                    {st.step}
                  </span>
                  <span className="w-8 h-px bg-[var(--copper)]/60" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-xl text-[var(--ivory)] font-normal mb-2">
                  {st.name}
                </h3>
                <p className="font-sans text-sm text-[var(--ivory)]/70 font-light leading-relaxed">
                  {st.desc}
                </p>
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
