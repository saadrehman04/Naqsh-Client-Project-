import Link from "next/link";
import { homeContent } from "@/content/home";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ImageFrame } from "@/components/ui/ImageFrame";

export function About() {
  const { about } = homeContent;

  return (
    <section
      className="section-y bg-[var(--ivory)] relative overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Column (5 cols on lg) */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-6" data-reveal="fade-up">
            <SectionLabel>{about.label}</SectionLabel>

            <h2
              id="about-heading"
              className="t-h2 text-[var(--text-strong)] leading-tight"
            >
              Beyond the box, into an experience.
            </h2>

            {/* Verbatim client copy */}
            <p className="t-lead text-[var(--text)] font-light leading-relaxed">
              {about.text}
            </p>

            <div className="pt-2">
              <span className="t-label text-xs text-[var(--pine)] block mb-6">
                {about.slogan}
              </span>

              <Link
                href="/our-approach"
                className="link-arrow group inline-flex items-center text-sm font-semibold tracking-wider uppercase text-[var(--link)] hover:text-[var(--text-strong)] transition-colors"
              >
                <span>Discover our approach</span>
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
          </div>

          {/* Image Column (6 cols on lg, offset 1) */}
          <div className="lg:col-span-6 lg:col-start-7 xl:col-span-6 xl:col-start-7">
            <ImageFrame
              src={about.image}
              alt={about.imageAlt}
              aspectRatio="4/5"
              reveal="clip"
              parallax
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="shadow-[var(--shadow-soft)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
