import Link from "next/link";
import { homeContent } from "@/content/home";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Sparkles, ArrowRight } from "lucide-react";

export function About() {
  const { about } = homeContent;

  return (
    <section
      className="section-y bg-[var(--ivory-deep)]/30 relative overflow-hidden border-b border-[var(--hairline)]"
      aria-labelledby="about-heading"
    >
      {/* Decorative lattice watermark accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-[0.04] bg-repeat pointer-events-none"
        style={{
          backgroundImage: "url('/brand/lattice-pattern.svg')",
          backgroundSize: "140px 140px",
        }}
        aria-hidden="true"
      />

      <div className="container-x relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Column (5 cols on lg) */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-6" data-reveal="fade-up">
            <SectionLabel variant="pine">{about.label}</SectionLabel>

            <h2
              id="about-heading"
              className="t-h2 text-[var(--text-strong)] leading-tight"
            >
              Beyond the box, into an experience.
            </h2>

            {/* Verbatim client copy */}
            <p className="t-lead text-[var(--charcoal)] font-light leading-relaxed">
              {about.text}
            </p>

            {/* Rich Pine Teal statement card */}
            <div className="rounded-[var(--radius-card)] bg-[var(--pine)] text-[var(--ivory)] p-6 sm:p-7 shadow-lg border border-[var(--sage)]/30 relative overflow-hidden">
              <div
                className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-[var(--sage)]/20 blur-xl pointer-events-none"
                aria-hidden="true"
              />
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-[var(--sage)]/25 text-[var(--khaki)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-[var(--khaki)] block mb-1">
                    Naqsh Philosophy
                  </span>
                  <p className="font-serif text-lg sm:text-xl text-[var(--ivory)] italic font-normal leading-snug">
                    &ldquo;{about.slogan}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/our-approach"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[var(--chestnut)] hover:bg-[#632418] text-[var(--ivory)] font-sans text-xs tracking-[0.14em] uppercase font-semibold transition-all duration-300 shadow-md hover:scale-[1.02]"
              >
                <span>Discover our approach</span>
                <ArrowRight className="w-4 h-4 text-[var(--khaki)]" />
              </Link>
            </div>
          </div>

          {/* Image Column (6 cols on lg, offset 1) */}
          <div className="lg:col-span-6 lg:col-start-7 xl:col-span-6 xl:col-start-7">
            <div className="relative p-3 rounded-[24px] bg-[var(--ivory)] border border-[var(--khaki)]/40 shadow-[var(--shadow-soft)]">
              <ImageFrame
                src={about.image}
                alt={about.imageAlt}
                aspectRatio="4/5"
                reveal="clip"
                parallax
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="rounded-[18px]"
              />
              <div className="absolute -bottom-4 -left-4 px-4 py-2 rounded-full bg-[var(--terracotta-deep)] text-[var(--ivory)] shadow-md text-xs font-sans font-semibold tracking-wider uppercase border border-white/20">
                Lahore Workshop
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
