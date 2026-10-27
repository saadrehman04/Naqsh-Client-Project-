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
      className={`relative bg-[var(--ivory)] py-20 sm:py-28 ${className}`}
      aria-label="Call to Action"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Inset Terracotta Deep Card (Ivory container maintains 75% ivory rule & avoids adjacent dark footer) */}
        <div
          className="relative rounded-[var(--radius-card)] bg-[var(--terracotta-deep)] text-[var(--ivory)] p-8 sm:p-14 lg:p-20 overflow-hidden shadow-[0_24px_48px_-12px_rgba(127,48,33,0.35)]"
          data-reveal="fade-up"
        >
          {/* Subtle lattice watermark background */}
          <div
            className="absolute inset-0 opacity-[0.06] bg-repeat pointer-events-none"
            style={{
              backgroundImage: "url('/brand/lattice-pattern.svg')",
              backgroundSize: "180px 180px",
            }}
            aria-hidden="true"
          />

          {/* Radial soft glow */}
          <div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[var(--terracotta)]/40 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-16">
            {/* Left Content */}
            <div className="max-w-2xl">
              <span className="inline-flex items-center text-xs tracking-[0.2em] uppercase font-sans font-medium text-[var(--ivory)]/80 mb-4">
                {cta.label}
              </span>
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
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[var(--ivory)] text-[var(--black)] font-sans text-xs tracking-[0.14em] uppercase font-medium shadow-md hover:bg-[var(--ivory-warm)] transition-all duration-300 hover:scale-[1.02]"
                >
                  <span>{cta.button}</span>
                  <ArrowRight className="w-4 h-4 text-[var(--terracotta)]" />
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 text-[var(--ivory)] border border-white/25 font-sans text-xs tracking-[0.14em] uppercase font-medium backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4 text-[var(--ivory)]" />
                  <span>{cta.secondary}</span>
                </a>
              </div>

              {/* Direct phone line */}
              <p className="mt-8 text-xs font-sans tracking-wide text-[var(--ivory)]/75">
                Direct Line:{" "}
                <a
                  href={`tel:${DISPLAY_PHONE.replace(/[^0-9+]/g, "")}`}
                  className="font-medium text-[var(--ivory)] underline hover:text-white transition-colors"
                >
                  {DISPLAY_PHONE}
                </a>
              </p>
            </div>

            {/* Right Wax Seal stamp visual */}
            <div className="hidden sm:flex lg:flex-col items-center justify-center flex-shrink-0">
              <div className="relative group">
                <WaxSeal
                  size="lg"
                  variant="chestnut"
                  className="shadow-2xl transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-105 group-hover:rotate-6"
                />
                <span className="block text-center mt-3 text-[10px] tracking-[0.2em] uppercase font-sans text-[var(--ivory)]/60">
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
