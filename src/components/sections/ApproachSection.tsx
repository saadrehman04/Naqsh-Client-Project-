import Link from "next/link";
import { homeContent } from "@/content/home";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ApproachSection() {
  const { approach } = homeContent;

  return (
    <section
      className="section-y bg-[var(--ivory)] border-t border-[var(--hairline)]"
      aria-labelledby="approach-heading"
    >
      <div className="container-x">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-20">
          <div className="max-w-2xl" data-reveal="fade-up">
            <SectionLabel>{approach.label}</SectionLabel>
            <h2 id="approach-heading" className="t-h2 text-[var(--text-strong)] mb-4">
              {approach.heading}
            </h2>
            <p className="t-lead text-[var(--text)] font-light leading-relaxed">
              {approach.intro}
            </p>
          </div>

          <Link
            href="/our-approach"
            className="link-arrow group inline-flex items-center text-sm font-semibold tracking-wider uppercase text-[var(--link)] hover:text-[var(--text-strong)] transition-colors"
          >
            <span>Learn about our process</span>
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

        {/* 4 Steps Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
          data-reveal="stagger"
        >
          {approach.steps.map((step, idx) => (
            <div
              key={step.name}
              className="relative p-6 sm:p-8 rounded-[var(--radius-card)] border border-[var(--hairline)] bg-[var(--ivory-deep)]/60 flex flex-col justify-between group hover:bg-[var(--ivory-deep)] transition-colors duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--hairline)]">
                  <span className="text-2xl font-serif text-[var(--pine)] font-semibold">
                    {step.number}
                  </span>
                  <span className="text-[11px] uppercase tracking-widest text-[var(--charcoal)] opacity-70">
                    Step 0{idx + 1}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-[var(--text-strong)] mb-3 group-hover:text-[var(--chestnut)] transition-colors">
                  {step.name}
                </h3>

                <p className="text-[var(--text)] text-sm sm:text-base font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[var(--hairline)]">
                <span className="text-xs uppercase tracking-wider text-[var(--pine)] font-semibold flex items-center gap-2">
                  <span>Phase {step.number}</span>
                  <span className="w-4 h-[1px] bg-[var(--pine)]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
