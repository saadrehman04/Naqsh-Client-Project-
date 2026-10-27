import Link from "next/link";
import { homeContent } from "@/content/home";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowRight } from "lucide-react";
import { SceneLoader } from "@/components/three/SceneLoader";

export function ApproachSection({ compact = false }: { compact?: boolean }) {
  const { approach } = homeContent;
  return <section className="approach-scene section-y" aria-labelledby={compact ? undefined : "approach-heading"} aria-label={compact ? "Four step approach" : undefined} data-approach-sequence>
    <div className="container-x">
      {!compact && <div className="approach-scene-head">
        <SectionLabel variant="pine">{approach.label}</SectionLabel>
        <h2 id="approach-heading" className="t-h2">{approach.heading}</h2>
        <p>{approach.intro}</p>
        <Link href="/our-approach" className="link-arrow">Learn about our process <ArrowRight size={16} /></Link>
      </div>}
      <div className="approach-scene-body">
        <SceneLoader scene="box" className="approach-box" />
        <ol className="approach-steps">
          {approach.steps.map((step) => { const StepHeading = compact ? "h2" : "h3"; return <li key={step.number} data-approach-step>
            <span className="approach-step-number">{step.number}</span><div><StepHeading>{step.name}</StepHeading><p>{step.desc}</p></div>
          </li>; })}
        </ol>
      </div>
    </div>
  </section>;
}
