import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { WaxSeal3D } from "@/components/three/WaxSeal3D";
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
      className={`cta-band relative z-10 py-20 sm:py-28 ${className}`}
      aria-label="Call to Action"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* A contained terracotta invitation, framed by the ivory page. */}
        <div
          className="cta-band-inner relative rounded-sm sm:rounded-md bg-[var(--terracotta)] text-[var(--ivory)] p-8 sm:p-14 lg:p-20 overflow-hidden"
          data-reveal="up"
        >
          {/* Subtle lattice watermark background */}
          <div
            className="absolute inset-0 opacity-[0.08] bg-repeat pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: "url('/brand/diamond-lattice.svg')",
              backgroundSize: "160px 160px",
            }}
            aria-hidden="true"
          />

          {/* Radial atmospheric glows in Copper and Pine */}
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgb(171 108 73 / 0.32) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgb(36 75 57 / 0.28) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-16">
            {/* Left Content */}
            <div className="max-w-2xl">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--black)]/25 border border-[var(--copper)]/40 backdrop-blur-sm mb-5"
                data-reveal="up"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--copper)]" />
                <span className="text-xs tracking-[0.18em] uppercase font-sans font-semibold text-[var(--khaki)]">
                  {cta.label}
                </span>
              </div>

              <h2
                className="font-serif text-4xl sm:text-6xl lg:text-8xl font-normal tracking-tight text-[var(--ivory)] leading-[0.95] mb-5"
                data-reveal="lines"
              >
                {title || "LET’S WORK TOGETHER"}
              </h2>
              <p
                className="font-sans text-base sm:text-lg text-[var(--ivory)]/90 font-light leading-relaxed mb-8 max-w-xl"
                data-reveal="up"
                data-delay="0.1"
              >
                {subline || cta.subline}
              </p>

              {/* Action Buttons */}
              <div
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
                data-reveal="up"
                data-delay="0.16"
              >
                <Link
                  href="/contact"
                  data-magnetic
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[var(--ivory)] text-[var(--black)] font-sans text-xs tracking-[0.14em] uppercase font-semibold shadow-lg hover:bg-[var(--khaki)] hover:text-[var(--black)] transition-all duration-300 hover:scale-[1.02]"
                >
                  <span>{cta.button}</span>
                  <ArrowRight className="w-4 h-4 text-[var(--chestnut)]" />
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-magnetic
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[var(--pine)] hover:bg-[#7F3021] text-[var(--ivory)] border border-[var(--pine)]/50 font-sans text-xs tracking-[0.14em] uppercase font-semibold shadow-md transition-all duration-300 hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4 text-[var(--khaki)]" />
                  <span>{cta.secondary}</span>
                </a>
              </div>

              {/* Direct phone line */}
              <div
                className="mt-8 flex items-center gap-3 text-xs font-sans tracking-wide text-[var(--ivory)]/80"
                data-reveal="up"
                data-delay="0.22"
              >
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
            <div className="flex flex-col items-center justify-center flex-shrink-0">
              <div className="relative group">
                <WaxSeal3D size={210} className="cta-seal-scene" />
                <span className="block text-center mt-3 text-xs tracking-[0.18em] uppercase font-sans text-[var(--khaki)] font-medium">
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
