import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { servicesContent } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Corporate Gifting Services · Employee, Executive, Events & Seasonal",
  description:
    "Explore NAQSH's four corporate gifting service pillars: Corporate & Employee Gifting, Executive & Client Gifting, Events & Brand Merchandise, and Bespoke & Seasonal Gifting.",
  path: "/services",
});

export default function ServicesPage() {
  const { header, services, endToEndService } = servicesContent;

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

      {/* Quick Category Jump Bar */}
      <div className="bg-[#101D19] border-b border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#C99A53] font-semibold">
            Four Service Pillars
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-[#C99A53] text-[var(--ivory)] hover:text-[#101010] border border-white/10 text-xs font-sans transition-colors"
              >
                {s.number} · {s.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Primary Service Categories Deep Dive */}
      <section
        className="py-20 sm:py-28 bg-[var(--ivory-deep)]"
        aria-label="Corporate Gifting Service Categories"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
          {services.map((service, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <article
                key={service.id}
                id={service.id}
                className={`scroll-mt-28 flex flex-col ${
                  isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-start gap-10 lg:gap-16 rounded-3xl bg-[var(--ivory)] border border-[var(--hairline)] p-6 sm:p-10 lg:p-12 shadow-sm`}
              >
                {/* Visual & Occasions Card */}
                <div className="w-full lg:w-5/12 space-y-6">
                  <div
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#12100E] border border-[var(--hairline)] shadow-lg group"
                    data-reveal="clip"
                    data-clip-from={isReversed ? "right" : "left"}
                    data-parallax="0.08"
                  >
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover scale-[1.15] transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-105"
                    />
                  </div>

                  {/* Relevant Occasions Box */}
                  <div className="rounded-2xl bg-[var(--ivory-deep)] border border-[var(--hairline)] p-5">
                    <span className="text-[11px] font-sans uppercase tracking-[0.16em] font-semibold text-[var(--pine)] block mb-3">
                      Key Business Occasions
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {service.occasions.map((occ) => (
                        <span
                          key={occ}
                          className="px-3 py-1 rounded-full bg-[var(--ivory)] border border-[var(--hairline)] text-xs font-sans text-[var(--text-strong)]"
                        >
                          {occ}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Detailed Narrative, Solutions & Customization */}
                <div
                  className="w-full lg:w-7/12 flex flex-col justify-center space-y-6"
                  data-reveal="stagger"
                  data-stagger="0.08"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="font-serif text-4xl sm:text-5xl text-[var(--chestnut)] font-light select-none"
                      data-count-to={idx + 1}
                      data-count-pad="2"
                    >
                      {service.number}
                    </span>
                    <span className="h-px w-10 bg-[var(--hairline)]" aria-hidden="true" />
                    <span className="text-xs font-sans uppercase tracking-[0.16em] text-[var(--pine)] font-semibold">
                      Service Pillar
                    </span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl text-[var(--black)] font-normal tracking-tight">
                    {service.title}
                  </h2>

                  <p className="font-sans text-base sm:text-lg text-[var(--text-strong)] font-normal leading-relaxed">
                    {service.summary}
                  </p>

                  <p className="font-sans text-sm sm:text-base text-[var(--charcoal)] font-light leading-relaxed">
                    {service.description}
                  </p>

                  {/* Types of Gifting Solutions & Customization Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[var(--hairline)]">
                    <div>
                      <h3 className="text-xs font-sans uppercase tracking-[0.16em] font-semibold text-[var(--black)] mb-3">
                        Gifting Solutions Included
                      </h3>
                      <ul className="space-y-2">
                        {service.solutions.map((sol) => (
                          <li
                            key={sol}
                            className="flex items-start gap-2 text-sm text-[var(--charcoal)] font-sans"
                          >
                            <Check className="w-4 h-4 text-[var(--pine)] shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{sol}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xs font-sans uppercase tracking-[0.16em] font-semibold text-[var(--black)] mb-3">
                        Available Customization
                      </h3>
                      <ul className="space-y-2">
                        {service.customizationOptions.map((opt) => (
                          <li
                            key={opt}
                            className="flex items-start gap-2 text-sm text-[var(--charcoal)] font-sans"
                          >
                            <Sparkles className="w-4 h-4 text-[var(--chestnut)] shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{opt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Call to action */}
                  <div className="pt-3 flex flex-wrap items-center gap-4">
                    <Link
                      href={service.ctaHref}
                      data-magnetic
                      className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#101D19] hover:bg-[var(--chestnut)] text-[var(--ivory)] font-sans text-xs tracking-[0.14em] uppercase font-semibold transition-all duration-300 shadow-md hover:scale-[1.02]"
                    >
                      <span>{service.ctaText}</span>
                      <ArrowRight className="w-4 h-4 text-[#C99A53]" aria-hidden="true" />
                    </Link>
                    <Link
                      href="/portfolio"
                      className="link-arrow text-xs"
                    >
                      <span>Browse Related Editions</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* End-to-End Gifting Service Section */}
      <section
        className="workflow-editorial on-dark section-y relative overflow-hidden bg-[#101D19] text-[var(--ivory)]"
        aria-labelledby="end-to-end-heading"
      >
        <div
          className="absolute -bottom-40 -left-32 w-[560px] h-[560px] max-w-[120vw] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(201,154,83,0.16) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="t-label text-[#C99A53] mb-3 block" data-reveal="up">
              {endToEndService.label}
            </span>
            <h2
              id="end-to-end-heading"
              className="font-serif text-3xl sm:text-5xl text-[var(--ivory)] font-normal tracking-tight mb-4"
              data-reveal="lines"
            >
              {endToEndService.heading}
            </h2>
            <p
              className="font-sans text-base sm:text-lg text-[var(--ivory)]/80 font-light leading-relaxed"
              data-reveal="up"
              data-delay="0.08"
            >
              {endToEndService.intro}
            </p>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            data-reveal="stagger"
            data-stagger="0.1"
          >
            {endToEndService.pillars.map((pillar) => (
              <div
                key={pillar.step}
                className="workflow-step rounded-2xl bg-white/[0.04] border border-white/[0.1] hover:border-[#C99A53]/50 hover:bg-white/[0.06] transition-colors duration-300 p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-serif text-3xl font-semibold text-[#C99A53]">
                      {pillar.step}
                    </span>
                    <span className="w-8 h-px bg-[#C99A53]/60" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[var(--ivory)] font-normal mb-2.5">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-sm text-[var(--ivory)]/75 font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center" data-reveal="up">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#F0B87A] via-[#C99A53] to-[#B86C35] text-[#101010] font-sans text-xs tracking-[0.16em] uppercase font-bold shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              <span>Discuss Your Corporate Gifting Brief</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to action band */}
      <CTABand />
    </div>
  );
}
