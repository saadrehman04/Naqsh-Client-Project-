import { homeContent } from "@/content/home";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function CoreValues() {
  const { coreValues } = homeContent;

  const valueThemes = [
    {
      borderColor: "var(--pine)",
      badgeBg: "bg-[var(--pine)]",
      iconBg: "bg-[var(--pine)]/15 text-[var(--pine)] group-hover:bg-[var(--pine)] group-hover:text-white",
      hoverText: "group-hover:text-[var(--pine)]",
      tagText: "text-[var(--pine)]",
      borderRing: "border-[var(--pine)]/30",
    },
    {
      borderColor: "var(--olive)",
      badgeBg: "bg-[#4E6E4C]",
      iconBg: "bg-[var(--olive)]/20 text-[#3F5A3D] group-hover:bg-[#4E6E4C] group-hover:text-white",
      hoverText: "group-hover:text-[#4E6E4C]",
      tagText: "text-[#4E6E4C]",
      borderRing: "border-[var(--olive)]/40",
    },
    {
      borderColor: "var(--chestnut)",
      badgeBg: "bg-[var(--chestnut)]",
      iconBg: "bg-[var(--chestnut)]/15 text-[var(--chestnut)] group-hover:bg-[var(--chestnut)] group-hover:text-white",
      hoverText: "group-hover:text-[var(--chestnut)]",
      tagText: "text-[var(--chestnut)]",
      borderRing: "border-[var(--chestnut)]/30",
    },
  ];

  const valueIcons = [
    // Principled Excellence (Diamond / seal motif)
    <svg
      key="icon-1"
      width="22"
      height="22"
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
      width="22"
      height="22"
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
      width="22"
      height="22"
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
      className="section-y bg-[var(--ivory-warm)] border-t border-[var(--hairline)]"
      aria-labelledby="core-values-heading"
    >
      <div className="container-x">
        <div className="max-w-2xl mx-auto text-center mb-14 sm:mb-20" data-reveal="fade-up">
          <SectionLabel variant="pine">{coreValues.label}</SectionLabel>
          <h2 id="core-values-heading" className="t-h2 text-[var(--text-strong)]">
            {coreValues.heading}
          </h2>
        </div>

        {/* 3 Values Cards Grid with Dedicated Color Identities */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
          data-reveal="stagger"
        >
          {coreValues.values.map((val, idx) => {
            const theme = valueThemes[idx];

            return (
              <div
                key={val.name}
                className="card bg-[var(--ivory)] p-8 sm:p-10 flex flex-col items-center text-center group hover:-translate-y-1.5 transition-all duration-400 shadow-md relative overflow-hidden"
                style={{
                  borderTop: `4px solid ${theme.borderColor}`,
                }}
              >
                {/* Dedicated themed icon badge */}
                <div
                  className={`w-16 h-16 rounded-full ${theme.iconBg} flex items-center justify-center mb-6 border ${theme.borderRing} transition-all duration-300 shadow-sm`}
                >
                  {valueIcons[idx]}
                </div>

                <span className={`text-[11px] font-sans font-semibold tracking-widest uppercase mb-2 ${theme.tagText}`}>
                  Principle 0{idx + 1}
                </span>

                <h3 className={`font-serif text-2xl text-[var(--text-strong)] mb-4 transition-colors ${theme.hoverText}`}>
                  {val.name}
                </h3>

                <p className="text-[var(--text)] text-base font-light leading-relaxed">
                  {val.desc}
                </p>

                <div className="w-12 h-[2px] mt-8 opacity-40 transition-all duration-300 group-hover:w-20" style={{ backgroundColor: theme.borderColor }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
