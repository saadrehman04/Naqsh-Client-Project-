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
                  <div className="relative aspect-[4/3] rounded-[var(--radius-card)] overflow-hidden bg-[var(--ivory-warm)] border border-[var(--border-light)] shadow-lg group">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[var(--ivory)]/90 backdrop-blur-sm border border-black/5 text-[11px] font-sans tracking-[0.2em] uppercase font-medium text-[var(--pine)]">
                      Service {service.number}
                    </div>
                  </div>
                </div>

                {/* Narrative & Checklist */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <span className="font-serif text-5xl sm:text-6xl text-[var(--copper)]/30 font-light select-none mb-2">
                    {service.number}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[var(--black)] font-normal mb-4 tracking-tight">
                    {service.title}
                  </h2>
                  <p className="font-sans text-base sm:text-lg text-[var(--pine)] font-light leading-relaxed mb-8">
                    {service.summary}
                  </p>

                  {/* Feature Checklist */}
                  <ul className="space-y-4 mb-10">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--terracotta)]/10 text-[var(--terracotta)] flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </span>
                        <span className="font-sans text-sm sm:text-base text-[var(--black)]/80 font-light leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Call to action */}
                  <div>
                    <Link
                      href={service.ctaHref}
                      className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[var(--black)] hover:bg-[var(--chestnut)] text-[var(--ivory)] font-sans text-xs tracking-[0.14em] uppercase font-medium transition-colors duration-300 shadow-sm"
                    >
                      <span>{service.ctaText}</span>
                      <ArrowRight className="w-4 h-4 text-[var(--copper)]" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Workflow Strip */}
      <section
        className="py-20 sm:py-28 bg-[var(--ivory-warm)] border-y border-[var(--border-light)]"
        aria-label="Workflow Process"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16" data-reveal="fade-up">
            <SectionLabel variant="pine" className="mb-4 justify-center">
              {workflowStrip.label}
            </SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl text-[var(--black)] font-normal tracking-tight">
              {workflowStrip.heading}
            </h2>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            data-reveal="stagger"
          >
            {workflowStrip.steps.map((st) => (
              <div
                key={st.step}
                className="relative bg-[var(--ivory)] border border-[var(--border-light)] rounded-[var(--radius-card)] p-8 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="font-serif text-3xl text-[var(--terracotta)] font-light block mb-3">
                  {st.step}
                </span>
                <h3 className="font-serif text-xl text-[var(--black)] font-normal mb-2">
                  {st.name}
                </h3>
                <p className="font-sans text-sm text-[var(--pine)] font-light leading-relaxed">
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
