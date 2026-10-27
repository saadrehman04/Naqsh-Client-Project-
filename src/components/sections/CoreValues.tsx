import { SectionLabel } from "@/components/ui/SectionLabel";
import { homeContent } from "@/content/home";
import { Gem, Leaf, Handshake } from "lucide-react";

const icons = [Gem, Leaf, Handshake];

export function CoreValues() {
  const { coreValues } = homeContent;
  return (
    <section className="section-y bg-[var(--ivory)] border-y border-[var(--hairline)]" aria-labelledby="core-values-heading">
      <div className="container-x">
        <header className="core-values-intro" data-reveal="fade-up">
          <SectionLabel variant="pine">{coreValues.label}</SectionLabel>
          <h2 id="core-values-heading" className="t-h2">{coreValues.heading}</h2>
        </header>
        <div className="core-values-grid" data-reveal="stagger">
          {coreValues.values.map((item, index) => {
            const Icon = icons[index];
            return (
              <article className="core-value" key={item.name}>
                <div className="core-value-icon"><Icon size={24} strokeWidth={1.4} aria-hidden="true" /></div>
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
