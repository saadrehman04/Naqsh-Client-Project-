import { Fragment } from "react";
import Image from "next/image";
import { homeContent } from "@/content/home";
import { Ornament } from "@/components/ui/Ornament";

/**
 * What Sets Us Apart (black). Client visual reference: numbered terracotta circles (01–04)
 * divided by hairlines on the start side, arch-framed photo on the end side.
 * Desktop: the photo runs the full height of the text column, from the heading's top edge to
 * the last promise's bottom edge. Phones/tablets: heading, promises, then the photo.
 * Logical properties keep it RTL-ready.
 */
export function WhySetsApart() {
  const { whyUs } = homeContent;

  return (
    <section
      className="on-dark section-y relative overflow-hidden bg-[var(--black)] text-[var(--ivory)]"
      aria-labelledby="why-us-heading"
    >
      <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 lg:items-stretch">
        {/* Text column: heading block + promises */}
        <div className="lg:col-span-7 flex flex-col">
          <header className="max-w-[46rem]">
            <Ornament align="start" className="mb-6" />
            <h2
              id="why-us-heading"
              className="font-display font-normal text-[length:var(--fs-h2)] leading-[1.02] tracking-[-0.015em] text-[var(--ivory)] [text-wrap:balance]"
              data-reveal="lines"
            >
              {whyUs.heading}
            </h2>
            <p
              className="mt-6 font-display text-[length:var(--fs-h3)] leading-[1.2] text-[var(--sage)] [text-wrap:balance]"
              data-reveal="up"
              data-delay="0.06"
            >
              {whyUs.subheading}
            </p>
            <p
              className="mt-5 max-w-[40rem] font-sans text-[length:var(--fs-body)] leading-[1.7] text-[var(--ivory)]/80 [text-wrap:pretty]"
              data-reveal="up"
              data-delay="0.12"
            >
              {whyUs.intro}
            </p>
          </header>

          {/* Four promises; on desktop they share the height left under the heading, hairlines centred in the gaps */}
          <div
            role="list"
            aria-label="Our four core promises"
            className="mt-14 sm:mt-16 flex flex-1 flex-col lg:justify-between"
          >
            {whyUs.promises.map((promise, index) => (
              <Fragment key={promise}>
                {index > 0 && (
                  <span
                    className="block h-px my-6 sm:my-8 lg:my-6 bg-[var(--ivory)]/25"
                    aria-hidden="true"
                  />
                )}
                <div
                  role="listitem"
                  className="flex items-center gap-5 sm:gap-8"
                  data-reveal="up"
                  data-delay={String(0.08 * index)}
                >
                  <span
                    className="flex size-14 sm:size-[4.5rem] xl:size-20 shrink-0 items-center justify-center rounded-full bg-[var(--terracotta)] font-sans text-base sm:text-lg xl:text-xl font-medium tabular-nums text-[var(--ivory)]"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {/* Same size as the intro paragraph above (client request 2026-11-20) */}
                  <p className="font-sans text-[length:var(--fs-body)] leading-[1.7] text-[var(--ivory)]/90 [text-wrap:pretty]">
                    {promise}
                  </p>
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        {/* Arch-framed photo: full height of the text column on desktop. The large top radius
              always resolves to a true semicircle whatever the box height. */}
        <div className="lg:col-span-5 lg:col-start-8 w-full max-w-[26rem] mx-auto lg:max-w-none lg:h-full">
          <div
            className="relative aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[32rem] overflow-hidden bg-[var(--charcoal)] rounded-t-[999px]"
            data-reveal="clip"
            data-clip-from="bottom"
          >
            <Image
              src={whyUs.image}
              alt={whyUs.imageAlt}
              fill
              sizes="(max-width: 1024px) 26rem, 36vw"
              quality={90}
              className="object-cover object-[50%_55%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
