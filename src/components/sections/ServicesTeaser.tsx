import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/home";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowCircle } from "@/components/ui/Button";

export function ServicesTeaser() {
  const { servicesTeaser } = homeContent;

  return (
    <section
      className="section-y bg-[var(--ivory)] border-t border-[var(--hairline)]"
      aria-labelledby="services-teaser-heading"
    >
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-xl" data-reveal="fade-up">
            <SectionLabel>{servicesTeaser.label}</SectionLabel>
            <h2
              id="services-teaser-heading"
              className="t-h2 text-[var(--text-strong)]"
            >
              {servicesTeaser.heading}
            </h2>
          </div>

          <Link
            href="/services"
            className="link-arrow group inline-flex items-center text-sm font-semibold tracking-wider uppercase text-[var(--link)] hover:text-[var(--text-strong)] transition-colors"
          >
            <span>View all services</span>
            <span className="btn-arrow w-8 h-8 rounded-full border border-current inline-flex items-center justify-center ml-2">
              <svg
                width="12"
                height="12"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M1 7H12.5M12.5 7L7 1.5M12.5 7L7 12.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </div>

        {/* Two Service Cards Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          data-reveal="stagger"
        >
          {servicesTeaser.services.map((service, index) => (
            <Link
              key={service.title}
              href={service.link}
              className="group card card-deep overflow-hidden flex flex-col justify-between p-6 sm:p-8 hover:-translate-y-1 transition-all duration-500"
            >
              <div>
                <div className="aspect-[16/10] sm:aspect-[16/9] rounded-[var(--radius-image)] overflow-hidden relative mb-6 border border-[var(--hairline)]">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[var(--ease-out)]"
                  />
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold text-[var(--pine)] tracking-widest uppercase">
                    Service 0{index + 1}
                  </span>
                </div>

                <h3 className="t-h3 text-[var(--text-strong)] group-hover:text-[var(--chestnut)] transition-colors duration-200 mb-3">
                  {service.title}
                </h3>

                <p className="text-[var(--text)] text-base font-light leading-relaxed mb-6">
                  {service.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--hairline)] flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--link)] group-hover:text-[var(--text-strong)] transition-colors">
                  {service.cta}
                </span>
                <ArrowCircle className="text-[var(--link)] group-hover:text-[var(--text-strong)] group-hover:border-[var(--text-strong)]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
