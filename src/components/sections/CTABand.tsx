import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { WaxSeal } from "@/components/brand/WaxSeal";
import { homeContent } from "@/content/home";
import { getWhatsAppUrl, DISPLAY_PHONE } from "@/lib/whatsapp";

interface CTABandProps {
  title?: string;
  subline?: string;
  className?: string;
}

export function CTABand({ title, subline, className = "" }: CTABandProps) {
  const { cta } = homeContent;
  const whatsappUrl = getWhatsAppUrl(
    "Hello Naqsh, I would like to consult with your team on a bespoke corporate gifting requirement."
  );

  return (
    <section
      className={`relative py-20 sm:py-28 bg-[var(--ivory-deep)]/40 border-t border-[var(--hairline)] ${className}`}
      aria-label="Call to Action"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Rich Dual-Tone Chestnut to Terracotta Luxury Inset Card */}
        <div
          className="relative rounded-[var(--radius-card)] bg-gradient-to-br from-[var(--chestnut)] via-[var(--terracotta-deep)] to-[#5C2317] text-[var(--ivory)] p-8 sm:p-14 lg:p-20 overflow-hidden shadow-[0_24px_54px_-12px_rgba(127,48,33,0.42)] border border-[var(--copper)]/30"
          data-reveal="fade-up"
        >
          {/* Subtle lattice watermark background */}
          <div
            className="absolute inset-0 opacity-[0.08] bg-repeat pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: "url('/brand/lattice-pattern.svg')",
              backgroundSize: "160px 160px",
            }}
            aria-hidden="true"
          />

          {/* Radial atmospheric glows in Copper and Pine */}
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[var(--copper)]/30 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[var(--pine)]/25 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-16">
            {/* Left Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--black)]/25 border border-[var(--copper)]/40 backdrop-blur-sm mb-5">
                <span className="w-2 h-2 rounded-full bg-[var(--copper)]" />
                <span className="text-[11px] tracking-[0.2em] uppercase font-sans font-semibold text-[var(--khaki)]">
                  {cta.label}
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[var(--ivory)] leading-[1.1] mb-5">
                {title || cta.heading}
              </h2>
              <p className="font-sans text-base sm:text-lg text-[var(--ivory)]/90 font-light leading-relaxed mb-8 max-w-xl">
                {subline || cta.subline}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[var(--ivory)] text-[var(--black)] font-sans text-xs tracking-[0.14em] uppercase font-semibold shadow-lg hover:bg-[var(--khaki)] hover:text-[var(--black)] transition-all duration-300 hover:scale-[1.02]"
                >
                  <span>{cta.button}</span>
                  <ArrowRight className="w-4 h-4 text-[var(--chestnut)]" />
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[var(--pine)] hover:bg-[#0E3D30] text-[var(--ivory)] border border-[var(--pine)]/50 font-sans text-xs tracking-[0.14em] uppercase font-semibold shadow-md transition-all duration-300 hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4 text-[var(--khaki)]" />
                  <span>{cta.secondary}</span>
                </a>
              </div>

              {/* Direct phone line */}
              <div className="mt-8 flex items-center gap-3 text-xs font-sans tracking-wide text-[var(--ivory)]/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--khaki)]" />
                <span>
                  Direct Line:{" "}
                  <a
                    href={`tel:${DISPLAY_PHONE.replace(/[^0-9+]/g, "")}`}
                    className="font-medium text-[var(--ivory)] underline hover:text-[var(--khaki)] transition-colors"
                  >
                    {DISPLAY_PHONE}
                  </a>
                </span>
              </div>
            </div>

            {/* Right Wax Seal stamp visual with copper trim */}
            <div className="hidden sm:flex lg:flex-col items-center justify-center flex-shrink-0">
              <div className="relative group p-4 rounded-full bg-black/15 border border-[var(--copper)]/30 backdrop-blur-sm">
                <WaxSeal
                  size="lg"
                  variant="chestnut"
                  className="shadow-2xl transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-105 group-hover:rotate-6"
                />
                <span className="block text-center mt-3 text-[10px] tracking-[0.2em] uppercase font-sans text-[var(--khaki)] font-medium">
                  Naqsh Seal
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
