import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { homeContent } from "@/content/home";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WaxSeal3D } from "@/components/three/WaxSeal3D";

export function NaqshSignature() {
  const { signatureDetails } = homeContent;

  return (
    <section
      className="on-dark section-y relative overflow-hidden bg-[#101D19] text-[var(--ivory)]"
      aria-labelledby="naqsh-signature-heading"
    >
      {/* Subtle diamond lattice texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: "url('/brand/diamond-lattice.svg')",
          backgroundSize: "160px 160px",
        }}
        aria-hidden="true"
      />

      {/* Ambient champagne gold glow */}
      <div
        className="absolute -bottom-32 -right-32 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201, 154, 83, 0.16) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container-x relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Interactive 3D Wax Seal Showcase */}
          <div
            className="lg:col-span-5 rounded-3xl bg-[#0B1411] border border-[#C99A53]/25 p-8 sm:p-10 flex flex-col items-center text-center shadow-2xl"
            data-reveal="up"
          >
            <div className="w-full flex items-center justify-between text-[11px] font-sans tracking-[0.16em] uppercase font-semibold text-[#C99A53] border-b border-white/10 pb-3 mb-6">
              <span>Authentic Mark</span>
              <span>Lahore Studio</span>
            </div>

            <div className="py-2 flex flex-col items-center justify-center">
              <WaxSeal3D size={220} className="cta-seal-scene" />
              <span className="mt-4 font-serif text-2xl text-[var(--ivory)] tracking-wide">
                The NAQSH Wax Seal
              </span>
              <p className="mt-2 text-xs sm:text-sm font-sans text-[var(--ivory)]/75 font-light max-w-xs leading-relaxed">
                Stamped on our bespoke presentation boxes and greeting envelopes as a mark of authenticity and craftsmanship.
              </p>
            </div>

            <div className="w-full mt-6 pt-4 border-t border-white/10 text-[11px] font-sans text-[#C99A53] flex items-center justify-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C99A53]" aria-hidden="true" />
              <span>Interactive 3D Seal · Move cursor or tap to inspect</span>
            </div>
          </div>

          {/* Right Column: Storytelling & 6 Signature Finishing Details */}
          <div className="lg:col-span-7 space-y-8">
            <div data-reveal="up">
              <SectionLabel variant="khaki">{signatureDetails.label}</SectionLabel>
              <h2
                id="naqsh-signature-heading"
                className="t-h2 text-[var(--ivory)] mt-2"
                data-reveal="lines"
              >
                {signatureDetails.heading}
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[var(--ivory)]/80 font-light leading-relaxed max-w-2xl">
                {signatureDetails.intro}
              </p>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
              data-reveal="stagger"
              data-stagger="0.08"
            >
              {signatureDetails.details.map((item, idx) => (
                <div
                  key={item.title}
                  className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#C99A53]/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-xl text-[var(--ivory)] font-normal">
                      {item.title}
                    </h3>
                    <span className="font-serif text-xs text-[#C99A53]/80">
                      0{idx + 1}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-[var(--ivory)]/70 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2" data-reveal="up" data-delay="0.14">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#F0B87A] via-[#C99A53] to-[#B86C35] text-[#101010] font-sans text-xs tracking-[0.14em] uppercase font-bold shadow-md hover:scale-[1.02] transition-all duration-300"
              >
                <span>Commission Your Custom Packaging</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
