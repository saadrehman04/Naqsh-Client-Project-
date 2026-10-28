import Link from "next/link";
import { homeContent } from "@/content/home";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowRight } from "lucide-react";
import { GiftBoxScene } from "@/components/three/GiftBoxScene";

export function ApproachSection({ compact = false }: { compact?: boolean }) {
  const { approach } = homeContent;
  return (
    <section
      className="approach-scene section-y"
      aria-labelledby={compact ? undefined : "approach-heading"}
      aria-label={compact ? "Four step approach" : undefined}
      data-approach-sequence
    >
      <div
        className="approach-pin-stage"
        data-pin
        data-pin-end="+=300%"
        data-scrub="0.6"
      >
        <div className="container-x">
          {!compact && (
            <div className="approach-scene-head">
              <div data-reveal="up">
                <SectionLabel variant="pine">{approach.label}</SectionLabel>
              </div>
              <h2 id="approach-heading" className="t-h2" data-reveal="lines">
                {approach.heading}
              </h2>
              <p data-reveal="up" data-delay="0.08">
                {approach.intro}
              </p>
              <div data-reveal="up" data-delay="0.14">
                <Link href="/our-approach" className="link-arrow">
                  Learn about our process <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}
          <div className="approach-scene-body">
            <div className="approach-steps-wrap relative">
              <div className="approach-progress-rail" aria-hidden="true">
                <span
                  className="approach-progress-fill"
                  data-approach-progress
                />
              </div>
              <ol className="approach-steps">
                {approach.steps.map((step, index) => {
                  const StepHeading = compact ? "h2" : "h3";
                  return (
                    <li
                      key={step.number}
                      className={`approach-step ${index === 0 ? "is-active" : ""}`}
                      data-approach-step
                    >
                      <span className="approach-step-number">{step.number}</span>
                      <div>
                        <StepHeading>{step.name}</StepHeading>
                        <p>{step.desc}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
            <GiftBoxScene className="approach-box" />
          </div>
        </div>
      </div>
    </section>
  );
}
