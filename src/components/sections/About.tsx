import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeContent } from "@/content/home";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ImageFrame } from "@/components/ui/ImageFrame";

export function About() {
  const { about } = homeContent;
  return (
    <section
      className="section-y bg-[var(--ivory-deep)]/35 border-b border-[var(--hairline)] overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="container-x about-layout">
        <div className="about-copy">
          <div data-reveal="up">
            <SectionLabel variant="pine">{about.label}</SectionLabel>
          </div>
          <h2 id="about-heading" className="t-h2" data-reveal="lines">
            Beyond the box, into an experience.
          </h2>
          <p className="t-lead text-[var(--charcoal)]" data-reveal="up" data-delay="0.08">
            {about.text}
          </p>
          <div className="about-slogan relative border-0" data-reveal="up" data-delay="0.12">
            <span
              className="about-slogan-hairline about-slogan-hairline--top"
              data-draw="center"
              aria-hidden="true"
            />
            <span>{about.slogan}</span>
            <span
              className="about-slogan-hairline about-slogan-hairline--bottom"
              data-draw="center"
              aria-hidden="true"
            />
          </div>
          <div data-reveal="up" data-delay="0.16">
            <Link href="/our-approach" className="link-arrow">
              <span>Discover our approach</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="about-images" data-cursor-label="Explore">
          <div className="about-main-image">
            <ImageFrame
              src={about.image}
              alt={about.imageAlt}
              aspectRatio="4/5"
              reveal="clip"
              parallax={0.08}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div
            className="about-overlap-image overflow-hidden"
            data-reveal="clip"
            data-parallax="-0.14"
          >
            <Image
              src="/images/products/excellence-award.webp"
              alt="Crystal employee appreciation award"
              fill
              sizes="(max-width: 768px) 42vw, 20vw"
              className="object-cover scale-[1.28]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
