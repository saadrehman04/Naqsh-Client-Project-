import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/home";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const { hero } = homeContent;

  return (
    <section
      className="hero-section relative w-full min-h-[max(100svh,720px)] flex flex-col justify-between overflow-hidden bg-black text-[var(--ivory)]"
      aria-label="Hero Introduction"
    >
      {/* Background Image: Desktop & Mobile Responsive Crops with LCP fetchpriority */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="hero-photo-parallax absolute inset-[-10%_0]">
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
              className="hero-photo object-cover object-[70%_center]"
            />
          </picture>
        </div>

        {/* Directional shade keeps text clear while preserving the product photo on the right. */}
        <div
          className="hero-overlay absolute inset-0"
          aria-hidden="true"
        />
      </div>

      {/* Top Spacer for fixed header */}
      <div className="w-full h-[72px]" aria-hidden="true" />

      {/* Main Content Area */}
      <div className="container-x relative z-10 my-auto py-8">
        <div className="max-w-none">
          <div className="hero-heading-wrap">
            <h1
              className="hero-heading text-[var(--ivory)] is-revealed"
              data-reveal="lines"
              data-stagger="0.12"
              aria-label={hero.headline}
            >
              <span className="motion-line-mask" aria-hidden="true">
                <span className="motion-line-inner">Crafting Lasting</span>
              </span>
              <span className="motion-line-mask" aria-hidden="true">
                <span className="motion-line-inner">Impressions</span>
              </span>
            </h1>
          </div>

          <div className="hero-sub-wrap">
            <p
              className="hero-subline text-white/90"
              data-reveal="up"
              data-delay="0.1"
            >
              {hero.subline}
            </p>

            <div className="hero-actions" data-reveal="up" data-delay="0.2">
              <Button href="/contact" variant="primary" size="md" className="hero-primary">
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
      </div>

      {/* Bottom Status & Navigation Strip */}
      <div className="relative z-10 border-t border-white/15 bg-black/30 backdrop-blur-sm">
        <span
          className="hero-copper-line absolute top-0 inset-x-0 h-[1px] bg-[var(--copper)] origin-left scale-x-0 pointer-events-none"
          aria-hidden="true"
        />
        <div className="container-x hero-bottom-strip flex items-center justify-between text-xs text-[var(--khaki)]">
          {/* Bottom Left: Slogan */}
          <div className="hero-slogan hidden sm:block">
            <span className="t-label tracking-[0.18em] text-[var(--ivory)] opacity-85">
              {hero.slogan}
            </span>
          </div>

          {/* Bottom Center: Scroll Indicator */}
          <div className="hero-scroll-cue flex items-center gap-3 mx-auto sm:mx-0">
            <span className="tracking-[0.14em] uppercase text-xs text-[var(--ivory)]">
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
              className="hero-seasonal-card group flex items-center gap-3 p-1.5 pr-3.5 rounded border border-white/20 bg-black/40 hover:bg-black/60 hover:border-white/40 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded overflow-hidden relative flex-none">
                <Image
                  src={hero.card.thumb}
                  alt=""
                  fill
                  sizes="36px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs uppercase tracking-[0.12em] text-[var(--khaki)]">
                  Seasonal
                </span>
                <span className="font-sans text-sm text-[var(--ivory)] group-hover:text-white transition-colors">
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
