import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/home";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const { hero } = homeContent;

  return (
    <section
      className="relative w-full h-[100svh] min-h-[640px] flex flex-col justify-between overflow-hidden bg-black text-[var(--ivory)]"
      aria-label="Hero Introduction"
    >
      {/* Background Image: Desktop & Mobile Responsive Crops with LCP fetchpriority */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="/images/hero/hero-mobile.webp"
          />
          <Image
            src="/images/hero/hero-desktop.webp"
            alt="Naqsh corporate welcome kit presentation"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[55%_65%] md:object-center transform scale-[1.02] transition-transform duration-1000 ease-out"
          />
        </picture>

        {/* Cinematic gradient overlay ensuring WCAG AAA text contrast on ivory typography */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35 md:bg-gradient-to-r md:from-black/85 md:via-black/55 md:to-black/30"
          aria-hidden="true"
        />
        {/* Subtle warm chestnut ambient wash */}
        <div
          className="absolute inset-0 bg-[var(--chestnut)]/15 mix-blend-color"
          aria-hidden="true"
        />
      </div>

      {/* Top Spacer for fixed header */}
      <div className="w-full h-24 sm:h-28" aria-hidden="true" />

      {/* Main Content Area */}
      <div className="container-x relative z-10 my-auto py-8">
        <div className="max-w-3xl">
          <p
            className="t-label text-[var(--khaki)] mb-4 tracking-[0.2em]"
            data-reveal="fade-up"
          >
            Corporate Gifting Partner
          </p>

          <h1
            className="t-display text-[var(--ivory)] mb-6 leading-[0.98] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
            data-reveal="lines"
          >
            {hero.headline}
          </h1>

          <p
            className="t-lead text-white/90 max-w-xl mb-8 font-light leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
            data-reveal="fade-up"
          >
            {hero.subline}
          </p>

          <div className="flex flex-wrap items-center gap-4" data-reveal="fade-up">
            <Button href="/contact" variant="primary" size="md">
              {hero.cta}
            </Button>
            <Button
              href="/portfolio"
              variant="on-dark"
              size="md"
              showArrow={false}
            >
              Explore Collections
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Status & Navigation Strip */}
      <div className="relative z-10 border-t border-white/15 bg-black/30 backdrop-blur-sm">
        <div className="container-x py-4 flex items-center justify-between text-xs text-[var(--khaki)]">
          {/* Bottom Left: Slogan */}
          <div className="hidden sm:block">
            <span className="t-label tracking-[0.18em] text-[var(--ivory)] opacity-85">
              {hero.slogan}
            </span>
          </div>

          {/* Bottom Center: Scroll Indicator */}
          <div className="flex items-center gap-3 mx-auto sm:mx-0">
            <span className="tracking-widest uppercase text-[11px] text-[var(--ivory)]">
              {hero.scrollCue}
            </span>
            <div className="w-[1px] h-6 bg-white/20 relative overflow-hidden">
              <div className="w-full h-full bg-[var(--khaki)] scroll-cue-line" />
            </div>
          </div>

          {/* Bottom Right: Corner Card to Ramadan & Eid */}
          <div className="hidden md:block">
            <Link
              href={hero.card.href}
              className="group flex items-center gap-3 p-1.5 pr-3.5 rounded border border-white/20 bg-black/40 hover:bg-black/60 hover:border-white/40 transition-all duration-200"
            >
              <div className="w-9 h-9 rounded overflow-hidden relative flex-none">
                <Image
                  src={hero.card.thumb}
                  alt=""
                  fill
                  sizes="36px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-wider text-[var(--khaki)]">
                  Seasonal
                </span>
                <span className="text-xs font-serif text-[var(--ivory)] group-hover:text-white transition-colors">
                  {hero.card.title} →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
