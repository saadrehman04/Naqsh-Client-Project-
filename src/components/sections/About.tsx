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
      className="about-section on-dark section-y relative overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Subtle diamond lattice texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: "url('/brand/diamond-lattice.svg')",
          backgroundSize: "160px 160px",
        }}
        aria-hidden="true"
      />

      {/* Subtle ambient warm glow */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(171, 108, 73, 0.15) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container-x about-layout relative z-10">
        <div className="about-copy">
          <div data-reveal="up">
            <SectionLabel variant="khaki">{about.label}</SectionLabel>
          </div>
          <h2 id="about-heading" className="t-h2" data-reveal="lines">
            Beyond the box, into an experience.
          </h2>
          <p className="t-lead" data-reveal="up" data-delay="0.08">
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
              <ArrowRight className="w-4 h-4 text-[var(--copper-light)]" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="about-images" data-cursor-label="Explore">
          <div className="about-main-image rounded-xl overflow-hidden shadow-2xl">
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
            className="about-overlap-image overflow-hidden rounded-xl"
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
