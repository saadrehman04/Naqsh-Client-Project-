import { homeContent } from "@/content/home";
import { Ornament } from "@/components/ui/Ornament";

/**
 * Vision & Mission on ivory.
 * Keeps the client's alternating layout (Vision heading at the start, Mission heading at
 * the end) on the shared ivory type scale: Title Case display headings, a chestnut index,
 * statements set in the display serif, and a khaki hairline with a terracotta diamond
 * between the two rows. Logical alignment (text-start / text-end) keeps it RTL-ready.
 */
const headingClass =
  "font-display font-normal text-[length:clamp(2.75rem,6vw,5.5rem)] leading-[0.98] tracking-[-0.02em] text-[var(--black)]";
const statementClass =
  "font-display text-[length:clamp(1.375rem,1.9vw,1.875rem)] leading-[1.45] text-[var(--charcoal)] [text-wrap:pretty]";

export function VisionMission() {
  const { vision, mission } = homeContent.visionMission;

  return (
    <section className="section-y bg-[var(--ivory)]" aria-label="Vision and mission">
      <div className="container-x">
        {/* Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-5">
            <h2 className={headingClass} data-reveal="lines">
              {vision.title}
            </h2>
          </div>
          <p
            className={`${statementClass} lg:col-span-6 lg:col-start-7 max-w-[34rem] lg:pb-2`}
            data-reveal="up"
            data-delay="0.08"
          >
            {vision.statement}
          </p>
        </div>

        {/* Divider: khaki hairlines with a terracotta diamond */}
        <div className="flex items-center gap-4 my-14 sm:my-20" aria-hidden="true">
          <span className="h-px flex-1 bg-[var(--hairline)]" data-draw="left" />
          <Ornament className="[&>span:first-child]:w-6 [&>span:last-child]:w-6" />
          <span className="h-px flex-1 bg-[var(--hairline)]" data-draw="left" />
        </div>

        {/* Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-5 lg:col-start-8 lg:order-2 lg:text-end">
            <h2 className={headingClass} data-reveal="lines">
              {mission.title}
            </h2>
          </div>
          <p
            className={`${statementClass} lg:col-span-7 lg:order-1 max-w-[40rem] lg:pb-2`}
            data-reveal="up"
            data-delay="0.08"
          >
            {mission.statement}
          </p>
        </div>
      </div>
    </section>
  );
}
