import { homeContent } from "@/content/home";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function CoreValues() {
  const { coreValues } = homeContent;

  const valueIcons = [
    // Principled Excellence (Diamond / seal motif)
    <svg
      key="icon-1"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2L2 9.5L12 22L22 9.5L12 2Z" />
      <path d="M2 9.5H22" />
      <path d="M12 2L7 9.5L12 22L17 9.5L12 2Z" />
    </svg>,
    // Conscious Curation (Leaf / botanical motif)
    <svg
      key="icon-2"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 20A7 7 0 0 1 4 13C4 7 11 3 11 3S18 7 18 13A7 7 0 0 1 11 20Z" />
      <path d="M11 20V10" />
    </svg>,
    // Purposeful Partnership (Handshake / connection motif)
    <svg
      key="icon-3"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12L11 15L16 9" />
    </svg>,
  ];

  return (
    <section
      className="section-y bg-[var(--ivory)]"
      aria-labelledby="core-values-heading"
    >
      <div className="container-x">
        <div className="max-w-2xl mx-auto text-center mb-14 sm:mb-20" data-reveal="fade-up">
          <SectionLabel>{coreValues.label}</SectionLabel>
          <h2 id="core-values-heading" className="t-h2 text-[var(--text-strong)]">
            {coreValues.heading}
          </h2>
        </div>

        {/* 3 Values Cards Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
          data-reveal="stagger"
        >
          {coreValues.values.map((val, idx) => (
            <div
              key={val.name}
              className="card p-8 sm:p-10 flex flex-col items-center text-center group hover:-translate-y-1 transition-all duration-400"
            >
              {/* Sage icon circle on ivory background */}
              <div
                className="w-16 h-16 rounded-full bg-[var(--sage)]/15 text-[var(--pine)] flex items-center justify-center mb-6 border border-[var(--sage)]/30 group-hover:bg-[var(--sage)] group-hover:text-white transition-colors duration-300"
              >
                {valueIcons[idx]}
              </div>

              <span className="text-xs font-mono font-semibold text-[var(--pine)] tracking-widest uppercase mb-2">
                Principle 0{idx + 1}
              </span>

              <h3 className="font-serif text-2xl text-[var(--text-strong)] mb-4">
                {val.name}
              </h3>

              <p className="text-[var(--text)] text-base font-light leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
