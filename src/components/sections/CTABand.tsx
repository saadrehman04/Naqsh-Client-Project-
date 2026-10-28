import Link from "next/link";
import { MessageCircle, ArrowRight, Phone, Sparkles, CheckCircle2 } from "lucide-react";
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
      className={`cta-band relative z-10 py-16 sm:py-24 ${className}`}
      aria-label="Call to Action"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Outer framed container device inspired by the reference picture */}
        <div
          className="cta-band-container relative rounded-[28px] sm:rounded-[36px] border-[3.5px] border-[#26211D] bg-[#FAF6EF] shadow-[0_32px_80px_-16px_rgba(38,33,29,0.22),0_12px_28px_-6px_rgba(38,33,29,0.12)] overflow-hidden"
          data-reveal="up"
        >
          {/* Top Console Bar (header of the container) */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 sm:px-8 py-3.5 sm:py-4 border-b border-[#26211D]/10 bg-[#F4EFE6]/70">
            {/* Left: Brand icon and section label */}
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg bg-[var(--pine)] text-[var(--ivory)] flex items-center justify-center shadow-xs"
                aria-hidden="true"
              >
                <span className="font-serif text-sm font-semibold tracking-wider">ن</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-sans tracking-[0.14em] uppercase font-semibold text-[var(--charcoal)]">
                <span className="text-[var(--chestnut)]">{cta.label}</span>
                <span className="text-[#26211D]/30">/</span>
                <span className="text-[#26211D]/65 hidden sm:inline">Bespoke Curation Desk</span>
              </div>
            </div>

            {/* Right: Live availability status & Direct phone */}
            <div className="flex items-center gap-3 sm:gap-4 text-xs font-sans">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 min-h-[44px] rounded-full bg-[var(--pine)]/10 text-[var(--pine)] border border-[var(--pine)]/20 font-medium">
                <span className="w-2 h-2 rounded-full bg-[var(--pine)] animate-pulse" />
                <span className="hidden xs:inline">Consultations Open</span>
              </div>
              <a
                href={`tel:${DISPLAY_PHONE.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-full bg-white/70 hover:bg-white text-[var(--charcoal)] hover:text-[var(--black)] border border-[#26211D]/15 font-medium transition-colors"
              >
                <Phone className="w-3 h-3 text-[var(--chestnut)]" />
                <span className="hidden sm:inline">Direct:</span>
                <span>{DISPLAY_PHONE}</span>
              </a>
            </div>
          </div>

          {/* Main Container Content */}
          <div className="p-5 sm:p-7 lg:p-9">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
              {/* Left Column: Rich Subdued Terracotta/Chestnut Hero Card */}
              <div className="lg:col-span-8 relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#682418] via-[#752D1F] to-[#541B12] text-[var(--ivory)] p-7 sm:p-10 lg:p-12 overflow-hidden shadow-inner flex flex-col justify-between">
                {/* Subtle lattice watermark background */}
                <div
                  className="absolute inset-0 opacity-[0.07] bg-repeat pointer-events-none mix-blend-overlay"
                  style={{
                    backgroundImage: "url('/brand/diamond-lattice.svg')",
                    backgroundSize: "140px 140px",
                  }}
                  aria-hidden="true"
                />

                {/* Soft atmospheric radial glow */}
                <div
                  className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgb(192 164 142 / 0.18) 0%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  {/* Eyebrow badge */}
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/25 border border-white/15 backdrop-blur-sm mb-4"
                    data-reveal="up"
                  >
                    <Sparkles className="w-3 h-3 text-[var(--khaki)]" />
                    <span className="text-[11px] tracking-[0.16em] uppercase font-sans font-semibold text-[var(--khaki)]">
                      Corporate Gifting Brief
                    </span>
                  </div>

                  {/* Headline */}
                  <h2
                    className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--ivory)] leading-[1.02] mb-4"
                    data-reveal="lines"
                  >
                    {title || "LET’S WORK TOGETHER"}
                  </h2>

                  {/* Subline */}
                  <p
                    className="font-sans text-sm sm:text-base text-[var(--ivory)]/90 font-light leading-relaxed mb-6 max-w-xl"
                    data-reveal="up"
                    data-delay="0.08"
                  >
                    {subline || cta.subline}
                  </p>

                  {/* Occasion Tags (as in reference image) */}
                  <div
                    className="flex flex-wrap items-center gap-2 mb-8"
                    data-reveal="up"
                    data-delay="0.12"
                  >
                    {[
                      "Executive Gifting",
                      "New Hire Welcome Kits",
                      "Client Appreciation",
                      "Ramadan & Eid",
                      "Annual Milestones",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[11px] font-sans font-medium bg-black/20 text-[var(--khaki)] border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div
                  className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2"
                  data-reveal="up"
                  data-delay="0.16"
                >
                  <Link
                    href="/contact"
                    data-magnetic
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[var(--ivory)] text-[var(--black)] font-sans text-xs tracking-[0.14em] uppercase font-semibold shadow-md hover:bg-[var(--khaki)] hover:text-[var(--black)] transition-all duration-300 hover:scale-[1.02]"
                  >
                    <span>{cta.button}</span>
                    <ArrowRight className="w-4 h-4 text-[var(--chestnut)]" />
                  </Link>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-magnetic
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[var(--pine)] hover:bg-[#1b5e4a] text-[var(--ivory)] border border-[var(--pine)]/50 font-sans text-xs tracking-[0.14em] uppercase font-semibold shadow-md transition-all duration-300 hover:scale-[1.02]"
                  >
                    <MessageCircle className="w-4 h-4 text-[var(--khaki)]" />
                    <span>{cta.secondary}</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Dedicated Seal Showcase Card */}
              <div className="lg:col-span-4 relative rounded-2xl sm:rounded-3xl bg-[var(--ivory-deep)]/75 border border-[#26211D]/12 p-6 sm:p-8 flex flex-col items-center justify-between text-center overflow-hidden">
                {/* Header label inside card */}
                <div className="w-full flex items-center justify-between text-[11px] font-sans tracking-[0.16em] uppercase font-semibold text-[var(--charcoal)] border-b border-[#26211D]/10 pb-3">
                  <span>Authentic Seal</span>
                  <span className="text-[var(--chestnut)]">Bespoke</span>
                </div>

                {/* Center 3D Wax Seal */}
                <div className="py-4 flex flex-col items-center justify-center">
                  <div className="relative group cursor-pointer">
                    <WaxSeal3D size={190} className="cta-seal-scene" />
                  </div>
                  <strong className="block mt-3 text-xs tracking-[0.18em] uppercase font-sans text-[var(--chestnut)] font-semibold">
                    Naqsh Seal
                  </strong>
                  <small className="block mt-0.5 text-xs font-sans text-[var(--charcoal)]/80">
                    Handcrafted in Lahore, Pakistan
                  </small>
                </div>

                {/* Bottom trust detail */}
                <div className="w-full pt-3 border-t border-[#26211D]/10 text-[11px] font-sans text-[var(--charcoal)] flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--pine)]" />
                  <span>Interactive 3D stamp · Tap to inspect</span>
                </div>
              </div>
            </div>

            {/* Bottom Guarantee Strip (Like bottom row of the reference image) */}
            <div className="mt-5 sm:mt-6 pt-4 border-t border-[#26211D]/10 flex flex-wrap items-center justify-between gap-3 text-xs font-sans text-[var(--charcoal)]">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--pine)]" />
                  24-Hour Proposal Turnaround
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--chestnut)]" />
                  Custom Branding & Laser Engraving
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--copper)]" />
                  Nationwide & Global Doorstep Delivery
                </span>
              </div>
              <span className="text-[11px] tracking-wider uppercase text-[var(--charcoal)]/70">
                Crafted for Discerning Brands
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
