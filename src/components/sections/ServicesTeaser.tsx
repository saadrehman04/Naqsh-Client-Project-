import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
          </div>
          <Link href="/services" className="link-arrow" data-reveal="up" data-delay="0.1">
            <span>View all services</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="service-rows">
          {servicesTeaser.services.map((service, index) => {
            const isReversed = index % 2 === 1;
            return (
              <article
                className={`service-row ${isReversed ? "service-row-reverse" : ""}`}
                key={service.title}
              >
                <Link
                  href={service.link}
                  className="service-row-image overflow-hidden"
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
                    className="object-cover scale-[1.15]"
                  />
                </Link>
                <div className="service-row-copy" data-reveal="stagger" data-stagger="0.1">
                  <span
                    className="service-row-number inline-block"
                    data-count-to={index + 1}
                    data-count-pad="2"
                  >
                    0{index + 1}
                  </span>
                  <h3 className="t-h2">{service.title}</h3>
                  <p>{service.desc}</p>
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
