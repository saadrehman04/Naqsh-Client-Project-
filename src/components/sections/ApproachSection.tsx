import Link from "next/link";
import { homeContent } from "@/content/home";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowRight } from "lucide-react";

export function ApproachSection() {
  const { approach } = homeContent;

  const stepThemes = [
    {
      color: "var(--pine)",
      badgeBg: "bg-[var(--pine)]",
      borderColor: "border-[var(--pine)]/30",
      numText: "text-[var(--pine)]",
      lineColor: "bg-[var(--pine)]",
    },
    {
      color: "var(--olive)",
      badgeBg: "bg-[#4E6E4C]",
      borderColor: "border-[#4E6E4C]/30",
      numText: "text-[#4E6E4C]",
      lineColor: "bg-[#4E6E4C]",
    },
    {
      color: "var(--terracotta)",
      badgeBg: "bg-[var(--terracotta-deep)]",
      borderColor: "border-[var(--terracotta)]/30",
      numText: "text-[var(--terracotta-deep)]",
      lineColor: "bg-[var(--terracotta-deep)]",
    },
    {
      color: "var(--chestnut)",
      badgeBg: "bg-[var(--chestnut)]",
      borderColor: "border-[var(--chestnut)]/30",
      numText: "text-[var(--chestnut)]",
      lineColor: "bg-[var(--chestnut)]",
    },
  ];

  return (
    <section
      className="section-y bg-[var(--ivory)] border-t border-[var(--hairline)]"
      aria-labelledby="approach-heading"
    >
      <div className="container-x">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-20">
          <div className="max-w-2xl" data-reveal="fade-up">
            <SectionLabel variant="pine">{approach.label}</SectionLabel>
            <h2 id="approach-heading" className="t-h2 text-[var(--text-strong)] mb-4">
              {approach.heading}
            </h2>
            <p className="t-lead text-[var(--text)] font-light leading-relaxed">
              {approach.intro}
            </p>
          </div>

          <Link
            href="/our-approach"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--black)] hover:bg-[var(--chestnut)] text-[var(--ivory)] text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm"
          >
            <span>Learn about our process</span>
            <ArrowRight className="w-4 h-4 text-[var(--khaki)]" />
          </Link>
        </div>

        {/* 4 Steps Grid with Step Palette Sequences */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative"
          data-reveal="stagger"
        >
          {approach.steps.map((step, idx) => {
            const theme = stepThemes[idx];

            return (
              <div
                key={step.name}
                className={`relative p-6 sm:p-8 rounded-[var(--radius-card)] border ${theme.borderColor} bg-[var(--ivory-warm)] flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300 shadow-sm`}
                style={{
                  borderTop: `4px solid ${theme.color}`,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--hairline)]">
                    <span className={`text-3xl font-serif font-semibold ${theme.numText}`}>
                      {step.number}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold tracking-widest uppercase ${theme.badgeBg} text-[var(--ivory)]`}>
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
                  <span className={`text-xs uppercase tracking-wider font-semibold flex items-center gap-2 ${theme.numText}`}>
                    <span>Phase {step.number}</span>
                    <span className={`w-6 h-[2px] ${theme.lineColor}`} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
