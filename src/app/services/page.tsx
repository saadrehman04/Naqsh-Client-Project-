import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CTABand } from "@/components/sections/CTABand";
import { servicesContent } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services · Personalized Corporate Gifting & Consultations",
  description:
    "End-to-end bespoke corporate gifting in Pakistan. Personalized executive gifts, tailored curation, custom packaging, and doorstep delivery for organizations.",
  path: "/services",
});

export default function ServicesPage() {
  const { header, services, workflowStrip } = servicesContent;

  const serviceBadges = [
    { bg: "bg-[var(--terracotta-deep)]", text: "text-[var(--ivory)]", border: "border-[var(--terracotta)]" },
    { bg: "bg-[var(--pine)]", text: "text-[var(--ivory)]", border: "border-[var(--pine)]" },
  ];

  const workflowColors = [
    { num: "text-[var(--pine)]", border: "border-t-4 border-[var(--pine)]", badge: "bg-[var(--pine)]" },
    { num: "text-[#4E6E4C]", border: "border-t-4 border-[#4E6E4C]", badge: "bg-[#4E6E4C]" },
    { num: "text-[var(--terracotta-deep)]", border: "border-t-4 border-[var(--terracotta-deep)]", badge: "bg-[var(--terracotta-deep)]" },
    { num: "text-[var(--chestnut)]", border: "border-t-4 border-[var(--chestnut)]", badge: "bg-[var(--chestnut)]" },
  ];

  return (
    <div className="bg-[var(--ivory)] min-h-screen">
      {/* Editorial Page Hero */}
      <PageHero
        title={header.title}
        subtitle={header.intro}
        label={header.label}
        breadcrumbs={[{ label: "Services" }]}
      />

      {/* Services Deep Dive */}
      <section className="py-20 sm:py-28" aria-label="Detailed Services">
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
                data-reveal="fade-up"
              >
                {/* Visual */}
                <div className="w-full lg:w-1/2">
                  <div className={`relative aspect-[4/3] rounded-[var(--radius-card)] overflow-hidden bg-[var(--ivory-warm)] border-2 ${badge.border} shadow-xl group`}>
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`px-3 py-1 rounded-full ${badge.bg} ${badge.text} text-[11px] font-sans tracking-[0.16em] uppercase font-semibold shadow-md`}>
                        Service {service.number}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Narrative & Checklist */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <span className="font-serif text-5xl sm:text-6xl text-[var(--copper)]/35 font-light select-none mb-2">
                    {service.number}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[var(--black)] font-normal mb-4 tracking-tight">
                    {service.title}
                  </h2>
                  <p className="font-sans text-base sm:text-lg text-[var(--charcoal)] font-light leading-relaxed mb-8">
                    {service.summary}
                  </p>

                  {/* Feature Checklist with themed checkmarks */}
                  <ul className="space-y-4 mb-10">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <span className={`flex-shrink-0 w-5 h-5 rounded-full ${idx === 0 ? "bg-[var(--terracotta)]/15 text-[var(--terracotta-deep)]" : "bg-[var(--pine)]/15 text-[var(--pine)]"} flex items-center justify-center mt-0.5`}>
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </span>
                        <span className="font-sans text-sm sm:text-base text-[var(--black)]/85 font-light leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Call to action */}
                  <div>
                    <Link
                      href={service.ctaHref}
                      className={`inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full ${idx === 0 ? "bg-[var(--terracotta-deep)] hover:bg-[var(--chestnut)]" : "bg-[var(--pine)] hover:bg-[#0E3D30]"} text-[var(--ivory)] font-sans text-xs tracking-[0.14em] uppercase font-semibold transition-all duration-300 shadow-md hover:scale-[1.02]`}
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

      {/* Rich Pine Teal Workflow Strip */}
      <section
        className="py-20 sm:py-28 bg-[var(--pine)] text-[var(--ivory)] border-y border-[var(--sage)]/30 relative overflow-hidden"
        aria-label="Workflow Process"
      >
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[var(--copper)]/20 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16" data-reveal="fade-up">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] uppercase tracking-[0.2em] font-sans font-medium text-[var(--khaki)] mb-4">
              {workflowStrip.label}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[var(--ivory)] font-normal tracking-tight">
              {workflowStrip.heading}
            </h2>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            data-reveal="stagger"
          >
            {workflowStrip.steps.map((st, i) => (
              <div
                key={st.step}
                className="relative bg-[var(--ivory)] text-[var(--black)] rounded-[var(--radius-card)] p-8 transition-transform duration-300 hover:-translate-y-1.5 shadow-xl"
                style={{
                  borderTop: `4px solid ${
                    i === 0 ? "var(--pine)" : i === 1 ? "#4E6E4C" : i === 2 ? "var(--terracotta)" : "var(--chestnut)"
                  }`,
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`font-serif text-3xl font-semibold ${workflowColors[i].num}`}>
                    {st.step}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-semibold uppercase tracking-wider ${workflowColors[i].badge} text-[var(--ivory)]`}>
                    Stage
                  </span>
                </div>
                <h3 className="font-serif text-xl text-[var(--black)] font-normal mb-2">
                  {st.name}
                </h3>
                <p className="font-sans text-sm text-[var(--charcoal)] font-light leading-relaxed">
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
