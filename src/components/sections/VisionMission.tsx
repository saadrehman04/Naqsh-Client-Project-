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
      {/* Deep atmospheric color glows: Pine Teal and Chestnut */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[var(--pine)]/30 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[var(--chestnut)]/35 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-x relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-20" data-reveal="fade-up">
          <SectionLabel variant="khaki">{visionMission.label}</SectionLabel>
          <h2 id="vision-mission-heading" className="sr-only">
            Vision and Mission
          </h2>
          <div className="flex justify-center mb-6">
            <Emblem variant="copper" className="w-12 opacity-85 drop-shadow-[0_4px_12px_rgba(171,108,73,0.3)]" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-12 lg:space-y-16">
          {/* Vision Statement Framed Card */}
          <div
            className="rounded-[var(--radius-card)] bg-gradient-to-br from-white/[0.04] to-transparent border border-[var(--copper)]/30 p-8 sm:p-12 text-center relative overflow-hidden backdrop-blur-sm shadow-xl"
            data-reveal="fade-up"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--copper)] to-transparent" />
            <span className="inline-block px-3 py-1 rounded-full bg-[var(--copper)]/20 border border-[var(--copper)]/40 text-[11px] tracking-[0.22em] text-[var(--khaki)] uppercase font-sans font-semibold mb-6">
              {visionMission.vision.title}
            </span>
            <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--ivory)] font-light leading-relaxed text-balance">
              &ldquo;{visionMission.vision.statement}&rdquo;
            </p>
          </div>

          {/* Thin Copper & Khaki Divider */}
          <div className="flex items-center justify-center gap-4" aria-hidden="true">
            <div className="w-16 sm:w-28 h-[1px] bg-gradient-to-r from-transparent to-[var(--copper)]" />
            <div className="w-2.5 h-2.5 rotate-45 border border-[var(--copper)] bg-[var(--chestnut)]" />
            <div className="w-16 sm:w-28 h-[1px] bg-gradient-to-l from-transparent to-[var(--copper)]" />
          </div>

          {/* Mission Statement Framed Card */}
          <div
            className="rounded-[var(--radius-card)] bg-gradient-to-br from-white/[0.04] to-transparent border border-[var(--sage)]/30 p-8 sm:p-12 text-center relative overflow-hidden backdrop-blur-sm shadow-xl"
            data-reveal="fade-up"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--pine)] to-transparent" />
            <span className="inline-block px-3 py-1 rounded-full bg-[var(--pine)]/40 border border-[var(--sage)]/40 text-[11px] tracking-[0.22em] text-[var(--khaki)] uppercase font-sans font-semibold mb-6">
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
