import { homeContent } from "@/content/home";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function WhySetsApart() {
  const { whyUs } = homeContent;

  return (
    <section
      className="section-y bg-[var(--ivory)] border-t border-[var(--hairline)]"
      aria-labelledby="why-us-heading"
    >
      <div className="container-x">
        <div className="max-w-3xl mb-14 sm:mb-20" data-reveal="fade-up">
          <SectionLabel>{whyUs.label}</SectionLabel>
          <h2 id="why-us-heading" className="t-h2 text-[var(--text-strong)] mb-6">
            {whyUs.heading}
          </h2>
          <p className="t-lead text-[var(--text)] font-light leading-relaxed">
            {whyUs.intro}
          </p>
        </div>

        {/* 4 Core Promises Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          data-reveal="stagger"
        >
          {whyUs.promises.map((promise, index) => (
            <div
              key={promise.title}
              className="card card-deep p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-all duration-400"
              style={{
                borderTop: `3px solid ${promise.borderColor}`,
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-semibold text-[var(--charcoal)] tracking-widest uppercase">
                    Promise 0{index + 1}
                  </span>
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: promise.borderColor }}
                    aria-hidden="true"
                  />
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-[var(--text-strong)] mb-4 leading-snug">
                  {promise.title}
                </h3>

                <p className="text-[var(--text)] text-sm sm:text-base font-light leading-relaxed">
                  {promise.body}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[var(--hairline)] text-right">
                <span className="text-[11px] uppercase tracking-widest text-[var(--charcoal)] opacity-60">
                  Naqsh Standard
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
