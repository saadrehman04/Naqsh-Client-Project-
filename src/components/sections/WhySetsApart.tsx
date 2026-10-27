import { homeContent } from "@/content/home";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ShieldCheck, Palette, Truck, Handshake } from "lucide-react";

export function WhySetsApart() {
  const { whyUs } = homeContent;

  const promiseThemes = [
    {
      borderColor: "var(--pine)",
      badgeBg: "bg-[var(--pine)]",
      icon: ShieldCheck,
      iconColor: "text-[var(--pine)]",
      iconBg: "bg-[var(--sage)]/20",
      accentTitle: "group-hover:text-[var(--pine)]",
    },
    {
      borderColor: "var(--terracotta)",
      badgeBg: "bg-[var(--terracotta-deep)]",
      icon: Palette,
      iconColor: "text-[var(--terracotta-deep)]",
      iconBg: "bg-[var(--terracotta)]/15",
      accentTitle: "group-hover:text-[var(--terracotta)]",
    },
    {
      borderColor: "var(--chestnut)",
      badgeBg: "bg-[var(--chestnut)]",
      icon: Truck,
      iconColor: "text-[var(--chestnut)]",
      iconBg: "bg-[var(--chestnut)]/15",
      accentTitle: "group-hover:text-[var(--chestnut)]",
    },
    {
      borderColor: "var(--olive)",
      badgeBg: "bg-[#4E6E4C]",
      icon: Handshake,
      iconColor: "text-[#4E6E4C]",
      iconBg: "bg-[var(--olive)]/20",
      accentTitle: "group-hover:text-[#4E6E4C]",
    },
  ];

  return (
    <section
      className="section-y bg-[var(--ivory)] border-t border-[var(--hairline)]"
      aria-labelledby="why-us-heading"
    >
      <div className="container-x">
        <div className="max-w-3xl mb-14 sm:mb-20" data-reveal="fade-up">
          <SectionLabel variant="pine">{whyUs.label}</SectionLabel>
          <h2 id="why-us-heading" className="t-h2 text-[var(--text-strong)] mb-6">
            {whyUs.heading}
          </h2>
          <p className="t-lead text-[var(--text)] font-light leading-relaxed">
            {whyUs.intro}
          </p>
        </div>

        {/* 4 Core Promises Grid with Distinct Color Personas */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          data-reveal="stagger"
        >
          {whyUs.promises.map((promise, index) => {
            const theme = promiseThemes[index];
            const Icon = theme.icon;

            return (
              <div
                key={promise.title}
                className="card bg-[var(--ivory-warm)] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1.5 transition-all duration-400 shadow-sm border border-[var(--hairline)]"
                style={{
                  borderTop: `4px solid ${theme.borderColor}`,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-10 h-10 rounded-full ${theme.iconBg} ${theme.iconColor} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold tracking-widest uppercase ${theme.badgeBg} text-[var(--ivory)]`}>
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className={`font-serif text-xl sm:text-2xl text-[var(--text-strong)] mb-4 leading-snug transition-colors ${theme.accentTitle}`}>
                    {promise.title}
                  </h3>

                  <p className="text-[var(--text)] text-sm sm:text-base font-light leading-relaxed">
                    {promise.body}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[var(--hairline)] flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-widest text-[var(--charcoal)] opacity-70">
                    Naqsh Standard
                  </span>
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: theme.borderColor }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
