import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Diamond, ShieldCheck, Leaf, Gift } from "lucide-react";
import { homeContent } from "@/content/home";

export function Hero() {
  const { hero } = homeContent;

  return (
    <section
      className="hero-section relative w-full min-h-[max(100svh,760px)] flex flex-col justify-between overflow-hidden bg-[#0A0807] text-[var(--ivory)]"
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
              alt="NAQSH luxury corporate welcome kit presentation featuring embossed box, notebook, tumbler, pen, power bank and leather keyring"
              fill
              priority
              sizes="100vw"
              className="hero-photo object-cover object-[78%_center] lg:object-[74%_center] xl:object-[70%_center]"
            />
          </picture>
        </div>

        {/* Left-to-right balanced vignette so text has crisp contrast while product photography shines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, #090807 0%, rgba(9,8,7,0.93) 26%, rgba(9,8,7,0.78) 44%, rgba(9,8,7,0.22) 66%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Top-down soft vignette for header legibility */}
        <div
          className="absolute inset-x-0 top-0 h-36 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(9,8,7,0.68) 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Bottom-up soft vignette for scroll cue */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{
            background:
              "linear-gradient(0deg, #090807 0%, rgba(9,8,7,0.6) 50%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Subtle decorative deep emerald foliage accents in corners */}
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
          {/* Section Kicker with Champagne Gold Lines */}
          <div
            className="flex items-center gap-3 mb-4 sm:mb-5 text-xs font-sans tracking-[0.24em] uppercase text-[#C99A53] font-semibold"
            data-reveal="up"
          >
            <span className="w-6 sm:w-8 h-[1px] bg-[#C99A53]/60" />
            <span>{hero.kicker}</span>
            <span className="w-6 sm:w-8 h-[1px] bg-[#C99A53]/60" />
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
                <span className="motion-line-inner block text-transparent bg-clip-text bg-gradient-to-r from-[#FBE2AA] via-[#C99A53] to-[#B86C35] drop-shadow-[0_4px_24px_rgba(201,154,83,0.35)]">
                  Impressions
                </span>
              </span>
            </h1>
          </div>

          {/* Supporting Headline & Description */}
          <div className="hero-sub-wrap mt-5 sm:mt-6">
            <div
              className="hero-subline space-y-2.5 max-w-xl"
              data-reveal="up"
              data-delay="0.1"
            >
              <p className="font-serif text-lg sm:text-xl text-[#FBE2AA] font-normal tracking-wide leading-snug">
                {hero.supportingHeadline}
              </p>
              <p className="text-sm sm:text-base text-[var(--ivory)]/85 font-sans font-light leading-relaxed">
                {hero.subline}
              </p>
            </div>

            {/* Action Buttons */}
            <div
              className="hero-actions flex flex-wrap items-center gap-4 mt-7 sm:mt-8"
              data-reveal="up"
              data-delay="0.18"
            >
              {/* Primary CTA: REQUEST CONSULTATION */}
              <Link
                href="/contact"
                data-magnetic
                className="group inline-flex items-center gap-3 pl-7 pr-3 py-3 rounded-full bg-gradient-to-r from-[#F0B87A] via-[#C99A53] to-[#B86C35] hover:from-[#FBE2AA] hover:to-[#C99A53] text-[#101010] font-sans text-xs tracking-[0.14em] uppercase font-bold shadow-[0_8px_25px_rgba(201,154,83,0.32)] transition-all duration-300 hover:scale-[1.02]"
              >
                <span>Request Consultation</span>
                <span className="w-7 h-7 rounded-full bg-[#101010]/20 flex items-center justify-center text-[#101010] transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>

              {/* Secondary CTA: EXPLORE COLLECTIONS */}
              <Link
                href="/portfolio"
                data-magnetic
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-black/45 hover:bg-black/65 backdrop-blur-md border border-[#C99A53]/60 hover:border-[#C99A53] text-[var(--ivory)] font-sans text-xs tracking-[0.14em] uppercase font-semibold shadow-md transition-all duration-300 hover:scale-[1.02]"
              >
                <span>Explore Collections</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C99A53] transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Trust Indicators */}
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-7 mt-7 border-t border-white/[0.14] max-w-xl"
              data-reveal="up"
              data-delay="0.24"
            >
              <div className="flex flex-col items-start gap-1.5">
                <Diamond className="w-4 h-4 text-[#C99A53]" aria-hidden="true" />
                <span className="text-[10px] font-sans tracking-[0.16em] uppercase text-[var(--ivory)] font-semibold leading-tight">
                  Premium<br />Quality
                </span>
              </div>

              <div className="flex flex-col items-start gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C99A53]" aria-hidden="true" />
                <span className="text-[10px] font-sans tracking-[0.16em] uppercase text-[var(--ivory)] font-semibold leading-tight">
                  Trusted<br />Service
                </span>
              </div>

              <div className="flex flex-col items-start gap-1.5">
                <Leaf className="w-4 h-4 text-[#C99A53]" aria-hidden="true" />
                <span className="text-[10px] font-sans tracking-[0.16em] uppercase text-[var(--ivory)] font-semibold leading-tight">
                  Sustainable<br />Choices
                </span>
              </div>

              <div className="flex flex-col items-start gap-1.5">
                <Gift className="w-4 h-4 text-[#C99A53]" aria-hidden="true" />
                <span className="text-[10px] font-sans tracking-[0.16em] uppercase text-[var(--ivory)] font-semibold leading-tight">
                  Bespoke<br />Solutions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Center Scroll Indicator */}
      <div className="relative z-10 pb-5 sm:pb-7 flex flex-col items-center justify-center gap-1 text-center hero-scroll-cue">
        <div className="flex items-center gap-2.5 text-[11px] font-sans tracking-[0.2em] uppercase text-[#C99A53] font-semibold">
          <span className="w-6 h-[1px] bg-[#C99A53]/50" />
          <span>{hero.scrollCue}</span>
          <span className="w-6 h-[1px] bg-[#C99A53]/50" />
        </div>
        <ChevronDown className="w-4 h-4 text-[#C99A53] animate-bounce" aria-hidden="true" />
      </div>
    </section>
  );
}
