import { homeContent } from "@/content/home";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Emblem } from "@/components/brand/Logo";

export function VisionMission() {
  const { visionMission } = homeContent;

  return (
    <section
      className="section-y bg-[var(--black)] text-[var(--ivory)] relative overflow-hidden lattice on-dark border-y border-[var(--hairline-dark)]"
      aria-labelledby="vision-mission-heading"
    >
      <div className="container-x relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-20" data-reveal="fade-up">
          <SectionLabel variant="khaki">{visionMission.label}</SectionLabel>
          <h2 id="vision-mission-heading" className="sr-only">
            Vision and Mission
          </h2>
          <div className="flex justify-center mb-6">
            <Emblem variant="copper" className="w-10 opacity-75" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-16 lg:space-y-20">
          {/* Vision Statement */}
          <div className="space-y-6 text-center" data-reveal="fade-up">
            <span className="t-label text-xs tracking-[0.22em] text-[var(--khaki)] block">
              {visionMission.vision.title}
            </span>
            <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--ivory)] font-light leading-relaxed text-balance">
              &ldquo;{visionMission.vision.statement}&rdquo;
            </p>
          </div>

          {/* Thin Copper Divider */}
          <div className="flex items-center justify-center gap-4" aria-hidden="true">
            <div className="w-16 sm:w-28 h-[1px] bg-gradient-to-r from-transparent to-[var(--copper)]" />
            <div className="w-2 h-2 rotate-45 border border-[var(--copper)]" />
            <div className="w-16 sm:w-28 h-[1px] bg-gradient-to-l from-transparent to-[var(--copper)]" />
          </div>

          {/* Mission Statement */}
          <div className="space-y-6 text-center" data-reveal="fade-up">
            <span className="t-label text-xs tracking-[0.22em] text-[var(--khaki)] block">
              {visionMission.mission.title}
            </span>
            <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--ivory)] font-light leading-relaxed text-balance">
              &ldquo;{visionMission.mission.statement}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
