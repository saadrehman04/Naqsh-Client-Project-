import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Diamond, ShieldCheck, Leaf, Gift } from "lucide-react";
import { homeContent } from "@/content/home";

export function Hero() {
  const { hero } = homeContent;

  return (
    <section
      className="hero-section relative w-full min-h-[max(100svh,740px)] flex flex-col justify-between overflow-hidden bg-[#0A0807] text-[var(--ivory)]"
      aria-label="Hero Introduction"
    >
      {/* Background Image: Desktop & Mobile Responsive Crops with LCP fetchpriority */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="hero-photo-parallax absolute inset-[-8%_0]">
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="/images/hero/hero-mobile.webp"
            />
            <Image
              src="/images/hero/hero-desktop.webp"
              alt="Naqsh luxury corporate welcome kit presentation"
              fill
              priority
              sizes="100vw"
              className="hero-photo object-cover object-[78%_center] lg:object-[75%_center] xl:object-[72%_center]"
            />
          </picture>
        </div>

        {/* Cinematic Directional Vignettes matching the reference image */}
        {/* Left-to-right deep dark vignette so text has maximum clarity */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, #090706 0%, rgba(9,7,6,0.95) 28%, rgba(9,7,6,0.84) 44%, rgba(9,7,6,0.24) 66%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Top-down soft vignette for header legibility */}
        <div
          className="absolute inset-x-0 top-0 h-40 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(9,7,6,0.7) 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Bottom-up soft vignette for scroll cue */}
        <div
          className="absolute inset-x-0 bottom-0 h-44 pointer-events-none"
          style={{
            background:
              "linear-gradient(0deg, #090706 0%, rgba(9,7,6,0.65) 50%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Subtle decorative dark green foliage leaf accents in corners */}
        <div
          className="absolute -top-10 -left-10 w-72 h-72 opacity-25 pointer-events-none mix-blend-screen filter blur-[0.5px]"
          aria-hidden="true"
        >
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#145240]">
            <path
              d="M30 0 C60 40 100 60 140 50 C120 90 90 130 30 160 C10 120 0 70 30 0 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div
          className="absolute -bottom-10 -left-10 w-80 h-80 opacity-20 pointer-events-none mix-blend-screen filter blur-[1px]"
          aria-hidden="true"
        >
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#145240]">
            <path
              d="M0 180 C40 140 80 120 130 140 C100 80 60 40 0 10 C-10 60 -10 120 0 180 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      {/* Top Spacer for fixed header */}
      <div className="w-full h-[78px] sm:h-[86px]" aria-hidden="true" />

      {/* Main Content Area */}
      <div className="container-x relative z-10 my-auto py-8 sm:py-12">
        <div className="max-w-2xl">
          
          {/* Section Kicker with Gold Lines (matching reference) */}
          <div
            className="flex items-center gap-3 mb-4 sm:mb-5 text-xs font-sans tracking-[0.24em] uppercase text-[#E5A666] font-semibold"
            data-reveal="up"
          >
            <span className="w-6 sm:w-8 h-[1px] bg-[#E5A666]/60" />
            <span>Corporate Gifting Reimagined</span>
            <span className="w-6 sm:w-8 h-[1px] bg-[#E5A666]/60" />
          </div>

          {/* Main Headline */}
          <div className="hero-heading-wrap">
            <h1
              className="hero-heading font-serif text-4xl sm:text-5xl lg:text-[66px] xl:text-[72px] leading-[1.03] tracking-tight is-revealed select-none opacity-100"
              aria-label="Crafting Lasting Impressions"
            >
              <span className="motion-line-mask block" aria-hidden="true">
                <span className="motion-line-inner block text-[var(--ivory)] drop-shadow-[0_2px_18px_rgba(0,0,0,0.5)]">
                  Crafting Lasting
                </span>
              </span>
              <span className="motion-line-mask block" aria-hidden="true">
                <span className="motion-line-inner block text-transparent bg-clip-text bg-gradient-to-r from-[#FBE2AA] via-[#E5A666] to-[#B86C35] drop-shadow-[0_4px_24px_rgba(229,166,102,0.35)]">
                  Impressions
                </span>
              </span>
            </h1>
          </div>

          {/* Subline */}
          <div className="hero-sub-wrap mt-5 sm:mt-6">
            <div
              className="hero-subline text-sm sm:text-base text-[var(--ivory)]/85 font-sans leading-relaxed space-y-1"
              data-reveal="up"
              data-delay="0.1"
            >
              <p>Premium corporate gifting, from idea to doorstep.</p>
              <p className="text-[#FBE2AA]/90 font-medium">Thoughtful. Elegant. Unforgettable.</p>
            </div>

            {/* Action Buttons (Dual CTA from reference) */}
            <div
              className="hero-actions flex flex-wrap items-center gap-4 mt-7 sm:mt-8"
              data-reveal="up"
              data-delay="0.18"
            >
              {/* Primary Consultation Pill with Circular Arrow */}
              <Link
                href="/contact"
                data-magnetic
                className="group inline-flex items-center gap-3 pl-7 pr-3 py-3 rounded-full bg-gradient-to-r from-[#F0B87A] via-[#DF9B5D] to-[#BF7339] hover:from-[#FBE2AA] hover:to-[#DF9B5D] text-[#120B07] font-sans text-xs tracking-[0.14em] uppercase font-bold shadow-[0_8px_25px_rgba(223,155,93,0.32)] transition-all duration-300 hover:scale-[1.03]"
              >
                <span>Request Consultation</span>
                <span className="w-7 h-7 rounded-full bg-[#120B07]/20 flex items-center justify-center text-[#120B07] transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>

              {/* Secondary Translucent Dark Glass Pill */}
              <Link
                href="/portfolio"
                data-magnetic
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-[#E5A666]/60 hover:border-[#E5A666] text-[var(--ivory)] font-sans text-xs tracking-[0.14em] uppercase font-semibold shadow-md transition-all duration-300 hover:scale-[1.03]"
              >
                <span>Explore Collections</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E5A666] transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Trust Pillars (4 Micro-Badges from the reference image) */}
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-7 mt-7 border-t border-white/[0.14] max-w-xl"
              data-reveal="up"
              data-delay="0.24"
            >
              {/* Badge 1: Diamond */}
              <div className="flex flex-col items-start gap-1.5">
                <Diamond className="w-4 h-4 text-[#E5A666]" />
                <span className="text-[10px] font-sans tracking-[0.16em] uppercase text-[var(--ivory)] font-semibold leading-tight">
                  Premium<br />Quality
                </span>
              </div>

              {/* Badge 2: Shield */}
              <div className="flex flex-col items-start gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#E5A666]" />
                <span className="text-[10px] font-sans tracking-[0.16em] uppercase text-[var(--ivory)] font-semibold leading-tight">
                  Trusted By<br />Leading Brands
                </span>
              </div>

              {/* Badge 3: Leaf */}
              <div className="flex flex-col items-start gap-1.5">
                <Leaf className="w-4 h-4 text-[#E5A666]" />
                <span className="text-[10px] font-sans tracking-[0.16em] uppercase text-[var(--ivory)] font-semibold leading-tight">
                  Sustainable<br />Choices
                </span>
              </div>

              {/* Badge 4: Gift */}
              <div className="flex flex-col items-start gap-1.5">
                <Gift className="w-4 h-4 text-[#E5A666]" />
                <span className="text-[10px] font-sans tracking-[0.16em] uppercase text-[var(--ivory)] font-semibold leading-tight">
                  Bespoke<br />Solutions
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Center Scroll Indicator (matching reference) */}
      <div className="relative z-10 pb-5 sm:pb-7 flex flex-col items-center justify-center gap-1 text-center hero-scroll-cue">
        <div className="flex items-center gap-2.5 text-[11px] font-sans tracking-[0.2em] uppercase text-[#E5A666] font-semibold">
          <span className="w-6 h-[1px] bg-[#E5A666]/50" />
          <span>Scroll to explore</span>
          <span className="w-6 h-[1px] bg-[#E5A666]/50" />
        </div>
        <ChevronDown className="w-4 h-4 text-[#E5A666] animate-bounce" />
      </div>
    </section>
  );
}
