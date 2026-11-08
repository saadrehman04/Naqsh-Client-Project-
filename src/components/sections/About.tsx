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
            "radial-gradient(circle, rgba(201, 154, 83, 0.14) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container-x about-layout relative z-10">
        <div className="about-copy">
          <div data-reveal="up">
            <SectionLabel variant="khaki">{about.label}</SectionLabel>
          </div>
          <h2 id="about-heading" className="t-h2" data-reveal="lines">
            {about.heading}
          </h2>
          <div className="space-y-4" data-reveal="up" data-delay="0.08">
            {about.paragraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className={
                  idx === 0
                    ? "t-lead"
                    : "text-base text-[var(--ivory)]/80 leading-relaxed font-light"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div
            className="grid grid-cols-3 gap-3 sm:gap-5 py-3.5 sm:py-5 my-1 sm:my-2 border-y border-white/12"
            data-reveal="up"
            data-delay="0.12"
          >
            {about.highlights.map((item) => (
              <div key={item.label} className="flex flex-col">
                <span className="font-serif text-lg sm:text-2xl text-[#C99A53] leading-tight">
                  {item.value}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.12em] text-[var(--ivory)]/75 mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <div data-reveal="up" data-delay="0.16">
            <Link href={about.ctaHref} className="link-arrow">
              <span>{about.ctaText}</span>
              <ArrowRight
                className="w-4 h-4 text-[#C99A53]"
                aria-hidden="true"
              />
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
              alt="NAQSH crystal employee appreciation award with marble base and copper accent"
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
