import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { servicesContent } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Corporate Gifting Services · Employee, Executive, Events & Seasonal",
  description:
    "Explore NAQSH's four corporate gifting service pillars: Corporate & Employee Gifting, Executive & Client Gifting, Events & Brand Merchandise, and Bespoke & Seasonal Gifting.",
  path: "/services",
});

export default function ServicesPage() {
  const { header } = servicesContent;
  // Only the first two service pillars are shown on this page.
  const services = servicesContent.services.slice(0, 2);

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
      <div className="bg-[#101D19] border-b border-white/10 py-3.5 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
          <span className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#C99A53] font-semibold">
            Service Pillars
          </span>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-[#C99A53] text-[var(--ivory)] hover:text-[#101010] border border-white/10 text-[11px] sm:text-xs font-sans transition-colors truncate"
              >
                {s.number} · {s.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Service Categories Deep Dive */}
      <section
        className="py-10 sm:py-20 bg-[var(--ivory-deep)]"
        aria-label="Corporate Gifting Service Categories"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-16">
          {services.map((service, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <article
                key={service.id}
                id={service.id}
                className={`scroll-mt-28 flex flex-col ${
                  isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-start gap-6 lg:gap-12 rounded-3xl bg-[var(--ivory)] border border-[var(--hairline)] p-5 sm:p-8 lg:p-10 shadow-sm`}
              >
                {/* Visual & Occasions Card */}
                <div className="w-full lg:w-5/12 space-y-4">
                  <div
                    className="relative aspect-[16/10] max-h-[260px] sm:max-h-[300px] rounded-2xl overflow-hidden bg-[#12100E] border border-[var(--hairline)] shadow-md group"
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

                  {/* Relevant Occasions Box (Desktop / Tablet) */}
                  <div className="hidden sm:block rounded-2xl bg-[var(--ivory-deep)] border border-[var(--hairline)] p-4">
                    <span className="text-[11px] font-sans uppercase tracking-[0.16em] font-semibold text-[var(--pine)] block mb-2.5">
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
                  className="w-full lg:w-7/12 flex flex-col justify-center space-y-4 sm:space-y-5"
                  data-reveal="stagger"
                  data-stagger="0.08"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="font-serif text-3xl sm:text-4xl text-[var(--chestnut)] font-light select-none"
                      data-count-to={idx + 1}
                      data-count-pad="2"
                    >
                      {service.number}
                    </span>
                    <span className="h-px w-8 bg-[var(--hairline)]" aria-hidden="true" />
                    <span className="text-xs font-sans uppercase tracking-[0.16em] text-[var(--pine)] font-semibold">
                      Service Pillar
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-4xl text-[var(--black)] font-normal tracking-tight">
                    {service.title}
                  </h2>

                  <p className="font-sans text-sm sm:text-base text-[var(--text-strong)] font-normal leading-relaxed">
                    {service.summary}
                  </p>

                  {/* Types of Gifting Solutions & Customization Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-3 border-t border-[var(--hairline)]">
                    <div>
                      <h3 className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.16em] font-semibold text-[var(--black)] mb-2.5">
                        Solutions Included
                      </h3>
                      <ul className="space-y-1.5">
                        {service.solutions.slice(0, 4).map((sol) => (
                          <li
                            key={sol}
                            className="flex items-start gap-2 text-xs sm:text-sm text-[var(--charcoal)] font-sans"
                          >
                            <Check className="w-3.5 h-3.5 text-[var(--pine)] shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{sol}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.16em] font-semibold text-[var(--black)] mb-2.5">
                        Customization
                      </h3>
                      <ul className="space-y-1.5">
                        {service.customizationOptions.map((opt) => (
                          <li
                            key={opt}
                            className="flex items-start gap-2 text-xs sm:text-sm text-[var(--charcoal)] font-sans"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-[var(--chestnut)] shrink-0 mt-0.5" aria-hidden="true" />
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
    </div>
  );
}
