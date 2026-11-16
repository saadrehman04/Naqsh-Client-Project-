import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { homeContent } from "@/content/home";

/**
 * Home hero (black, photo-led). Client photo: NAQSH box with copper bow on the right,
 * dark empty space on the left for the copy. The photo is already dark on the left,
 * so the vignette only deepens it slightly for contrast.
 */
export function Hero() {
  const { hero } = homeContent;
  const [lineOne, lineTwo] = hero.headlineLines;

  return (
    <section
      className="hero-section relative w-full min-h-[100svh] lg:min-h-[max(100svh,740px)] flex flex-col justify-between overflow-hidden bg-[var(--black)] text-[var(--ivory)]"
      aria-label="Hero Introduction"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Phones and tablets: photo fills the lower part so the copy sits on clean black above the box */}
        <div className="absolute inset-x-0 bottom-0 top-[33%] sm:top-[40%] lg:top-0">
        <div className="hero-photo-parallax absolute inset-[-8%_0]">
          <picture>
            <source media="(max-width: 1023px)" srcSet={hero.imageMobile} />
            <Image
              src={hero.image}
              alt={hero.imageAlt}
              fill
              priority
              sizes="100vw"
              className="hero-photo object-cover object-[50%_35%] sm:object-[50%_80%] lg:object-[85%_center] xl:object-[70%_center]"
            />
          </picture>
        </div>
        </div>

        {/* Start-side vignette: keeps the copy crisp, leaves the box untouched */}
        <div
          className="absolute inset-0 pointer-events-none hidden lg:block"
          style={{
            background:
              "linear-gradient(90deg, rgb(0 0 0 / 0.72) 0%, rgb(0 0 0 / 0.5) 34%, rgb(0 0 0 / 0.12) 58%, transparent 72%)",
          }}
          aria-hidden="true"
        />
        {/* Phones and tablets: blend the photo's top edge into the black ground */}
        <div
          className="absolute inset-0 pointer-events-none lg:hidden"
          style={{
            background:
              "linear-gradient(180deg, #000 0%, #000 33%, rgb(0 0 0 / 0.55) 45%, rgb(0 0 0 / 0) 60%, rgb(0 0 0 / 0.55) 100%)",
          }}
          aria-hidden="true"
        />
        {/* Header legibility */}
        <div
          className="absolute inset-x-0 top-0 h-36 pointer-events-none"
          style={{ background: "linear-gradient(180deg, rgb(0 0 0 / 0.55) 0%, transparent 100%)" }}
          aria-hidden="true"
        />
      </div>

      {/* Spacer for the fixed header */}
      <div className="w-full h-[78px] sm:h-[86px]" aria-hidden="true" />

      <div className="container-x relative z-10 mb-auto pt-6 pb-8 sm:pt-12 lg:my-auto lg:py-12">
        <div className="max-w-[54rem]">
          <div className="hero-heading-wrap">
            <h1
              className="hero-heading text-[length:clamp(2.75rem,6.4vw,5.5rem)] leading-[1.02] select-none opacity-100"
              aria-label={hero.headline}
            >
              <span className="motion-line-mask block" aria-hidden="true">
                <span className="motion-line-inner block text-[var(--ivory)]">{lineOne}</span>
              </span>
              <span className="motion-line-mask block" aria-hidden="true">
                <span className="motion-line-inner block text-[var(--terracotta-on-dark)]">
                  {lineTwo}
                </span>
              </span>
            </h1>
          </div>

          <div className="hero-sub-wrap mt-6 sm:mt-8">
            <p
              className="hero-subline max-w-[30rem] font-sans text-[1.25rem] sm:text-[1.5rem] lg:text-[1.625rem] font-light leading-[1.5] tracking-[0.02em] text-[var(--ivory)]/90"
              data-reveal="up"
              data-delay="0.1"
            >
              {hero.supportingHeadline}
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 pb-5 sm:pb-7 flex flex-col items-center justify-center gap-1 text-center hero-scroll-cue">
        <div className="flex items-center gap-2.5 text-[11px] font-sans tracking-[0.2em] uppercase text-[var(--ivory)]/80 font-semibold">
          <span className="w-6 h-[1px] bg-[var(--terracotta-on-dark)]" />
          <span>{hero.scrollCue}</span>
          <span className="w-6 h-[1px] bg-[var(--terracotta-on-dark)]" />
        </div>
        <ChevronDown className="w-4 h-4 text-[var(--terracotta-on-dark)] animate-bounce" aria-hidden="true" />
      </div>
    </section>
  );
}
