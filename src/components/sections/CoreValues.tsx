import { Star, Handshake, MousePointerClick, CircleCheck, type LucideIcon } from "lucide-react";
import { homeContent } from "@/content/home";
import { Ornament } from "@/components/ui/Ornament";

/**
 * Core Values (ivory). Client visual reference: left-aligned columns, each with a solid
 * terracotta icon, an uppercase value name, a khaki hairline and the description.
 */

/** "Conscious choice" mark: a check in a circle with a pointer, as in the client reference. */
function ChoiceIcon({ className }: { className?: string }) {
  return (
    <span className={`relative inline-block size-[4.5rem] ${className ?? ""}`} aria-hidden="true">
      <CircleCheck className="absolute start-0 top-0 size-12" strokeWidth={1.75} />
      <MousePointerClick className="absolute end-0 bottom-0 size-10" strokeWidth={1.75} />
    </span>
  );
}

type ValueIcon = LucideIcon | typeof ChoiceIcon;
const icons: { Icon: ValueIcon; filled: boolean }[] = [
  { Icon: Star, filled: true },
  { Icon: ChoiceIcon, filled: false },
  { Icon: Handshake, filled: false },
];

export function CoreValues() {
  const { coreValues } = homeContent;

  return (
    <section className="section-y bg-[var(--ivory)]" aria-labelledby="core-values-heading">
      <div className="container-x">
        <header>
          <Ornament align="start" />
          <h2
            id="core-values-heading"
            className="mt-6 font-display font-normal text-[length:clamp(2.5rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.015em] text-[var(--black)]"
            data-reveal="lines"
          >
            {coreValues.heading}
          </h2>
        </header>

        <ul className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-10 lg:gap-16">
          {coreValues.values.map((value, index) => {
            const { Icon, filled } = icons[index];
            return (
              <li
                key={value.name}
                className="flex flex-col items-start"
                data-reveal="up"
                data-delay={String(0.1 * index)}
              >
                <span className="flex h-[4.5rem] items-end text-[var(--terracotta)]" aria-hidden="true">
                  {Icon === ChoiceIcon ? (
                    <ChoiceIcon />
                  ) : (
                    <Icon
                      className="size-[4.25rem]"
                      strokeWidth={filled ? 1 : 1.5}
                      fill={filled ? "currentColor" : "none"}
                    />
                  )}
                </span>

                <h3 className="mt-8 max-w-[14ch] font-sans text-[length:clamp(1.375rem,1.8vw,1.625rem)] font-normal uppercase leading-[1.25] tracking-[0.01em] text-[var(--black)]">
                  {value.name}
                </h3>

                <span className="mt-6 block h-px w-full bg-[var(--khaki)]" aria-hidden="true" />

                <p className="mt-6 max-w-[22rem] font-sans text-[1rem] leading-[1.8] text-[var(--charcoal)] [text-wrap:pretty]">
                  {value.desc}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
