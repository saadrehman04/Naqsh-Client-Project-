import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { homeContent } from "@/content/home";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ServicesTeaser() {
  const { servicesTeaser } = homeContent;
  return (
    <section
      className="section-y bg-[var(--ivory)]"
      aria-labelledby="services-teaser-heading"
    >
      <div className="container-x">
        <div className="services-intro">
          <div data-reveal="up">
            <SectionLabel variant="pine">{servicesTeaser.label}</SectionLabel>
            <h2 id="services-teaser-heading" className="t-h2" data-reveal="lines">
              {servicesTeaser.heading}
            </h2>
            <p className="mt-3 max-w-2xl text-base sm:text-lg text-[var(--charcoal)] font-light leading-relaxed">
              {servicesTeaser.intro}
            </p>
          </div>
          <Link href="/services" className="link-arrow" data-reveal="up" data-delay="0.1">
            <span>View All Services</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="service-rows">
          {servicesTeaser.services.map((service, index) => {
            const isReversed = index % 2 === 1;
            return (
              <article
                className={`service-row ${isReversed ? "service-row-reverse" : ""}`}
                key={service.id}
              >
                <Link
                  href={service.link}
                  className="service-row-image overflow-hidden rounded-[var(--radius-image)]"
                  data-reveal="clip"
                  data-clip-from={isReversed ? "right" : "left"}
                  data-parallax="0.10"
                  data-cursor-label="Explore"
                >
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 52vw"
                    className="object-cover scale-[1.18]"
                  />
                </Link>
                <div className="service-row-copy" data-reveal="stagger" data-stagger="0.08">
                  <span
                    className="service-row-number inline-block"
                    data-count-to={index + 1}
                    data-count-pad="2"
                  >
                    {service.number}
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5 py-2.5 mb-3 border-y border-[var(--hairline)]">
                    {service.benefits.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-xs sm:text-[13px] text-[var(--text-strong)] font-sans"
                      >
                        <Check className="w-3.5 h-3.5 text-[var(--pine)] shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={service.link} className="link-arrow">
                    <span>{service.cta}</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
