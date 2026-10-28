import { SectionLabel } from "@/components/ui/SectionLabel";
import { homeContent } from "@/content/home";
import { Gem, Leaf, Handshake } from "lucide-react";

const icons = [Gem, Leaf, Handshake];

export function CoreValues() {
  const { coreValues } = homeContent;
  return (
    <section
      className="core-values-section section-y bg-[var(--ivory)] border-y border-[var(--hairline)]"
      aria-labelledby="core-values-heading"
    >
      <div className="container-x">
        <header className="core-values-intro">
          <div data-reveal="up">
            <SectionLabel variant="pine">{coreValues.label}</SectionLabel>
          </div>
          <h2 id="core-values-heading" className="t-h2" data-reveal="lines">
            {coreValues.heading}
          </h2>
        </header>
        <div
          className="core-values-grid"
          data-reveal="stagger"
          data-stagger="0.1"
        >
          {coreValues.values.map((item, index) => {
            const Icon = icons[index];
            return (
              <article className="core-value relative" key={item.name}>
                <span
                  className="core-value-hairline core-value-hairline--left"
                  data-draw="top"
                  aria-hidden="true"
                />
                {index === coreValues.values.length - 1 && (
                  <span
                    className="core-value-hairline core-value-hairline--right"
                    data-draw="top"
                    aria-hidden="true"
                  />
                )}
                <div className="core-value-icon" data-reveal="scale">
                  <Icon size={24} strokeWidth={1.4} aria-hidden="true" />
                </div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
