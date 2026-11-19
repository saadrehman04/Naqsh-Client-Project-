"use client";

import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  Users,
  Tag,
  Database,
  Gift,
  Lightbulb,
  Star,
  ListChecks,
  Pencil,
  SlidersHorizontal,
  Package,
  Mail,
  ShieldCheck,
  FileText,
  Truck,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { approachContent, type ApproachIcon } from "@/content/approach";
import { cn } from "@/lib/utils";

/**
 * Our Approach hero (black).
 * Start column: page heading and the client's approach statement between terracotta quote rules.
 * End column: the four steps as gradient bars joined by a dotted serpentine path. Each step runs a
 * horizontal rail to four icons. A highlight moves through the steps on a loop: the active bar
 * glows, a dot travels its rail and its four icons light up one after another.
 * Hover or focus pauses the loop; clicking a step selects it. Reduced motion: everything lit, no loop.
 */

const ICONS: Record<ApproachIcon, LucideIcon> = {
  occasion: Calendar,
  audience: Users,
  brand: Tag,
  budget: Database,
  products: Gift,
  ideas: Lightbulb,
  experience: Star,
  selection: ListChecks,
  branding: Pencil,
  personalization: SlidersHorizontal,
  packaging: Package,
  message: Mail,
  qualityCheck: ShieldCheck,
  orderCoordination: FileText,
  logistics: Truck,
  doorstepDelivery: MapPin,
};

// Time per step (client asked for a slower loop, 2026-11-19; was 1.7s).
const STEP_MS = 2800;
// Diagram geometry (rem). Rows are 4rem tall with a 2rem gap.
const ROW = 4;
const GAP = 2;
const PITCH = ROW + GAP;

const KEYFRAMES = `
@keyframes naqsh-sheen { from { transform: translateX(-120%); } to { transform: translateX(340%); } }
@keyframes naqsh-ping { 0% { transform: scale(1); opacity: .8; } 100% { transform: scale(1.8); opacity: 0; } }
@keyframes naqsh-breathe { 0%,100% { opacity: .5; } 50% { opacity: .9; } }
@media (prefers-reduced-motion: reduce) { .ah-anim { animation: none !important; } }
`;

const dotted = (lit: boolean) =>
  lit ? "border-[var(--terracotta-on-dark)]" : "border-[var(--hairline-dark)]";

export function ApproachHero() {
  const { label, heading, intro, steps } = approachContent.hero;
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(true);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.2,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !inView) return;
    const id = window.setTimeout(
      () => setActive((i) => (i + 1) % steps.length),
      STEP_MS
    );
    return () => window.clearTimeout(id);
  }, [reduced, inView, steps.length, active]);

  const isOn = (i: number) => reduced || i === active;
  const isPassed = (i: number) => reduced || i < active;

  return (
    <section
      ref={rootRef}
      className="on-dark relative overflow-hidden bg-[var(--black)] text-[var(--ivory)] min-h-[100svh] flex flex-col justify-center pt-[calc(var(--header-h)+3rem)] pb-20 sm:pt-[calc(var(--header-h)+4rem)] sm:pb-28"
      aria-labelledby="approach-heading"
    >
      <div className="container-x w-full grid grid-cols-1 xl:grid-cols-12 gap-14 xl:gap-12 items-center">
        {/* Heading + statement */}
        <div className="xl:col-span-4">
          <p className="mb-4 sm:mb-5 flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-[var(--ivory)]/80">
            <span className="h-px w-8 bg-[var(--terracotta-on-dark)]" aria-hidden="true" />
            {label}
          </p>
          <h1
            id="approach-heading"
            className="font-display font-normal text-[length:var(--fs-h1)] leading-[0.98] tracking-[-0.02em] text-[var(--ivory)]"
          >
            {heading}
          </h1>

          <figure className="mt-10 max-w-[34rem]">
            <QuoteRule glyph="“" />
            <blockquote className="py-5 font-sans text-[length:var(--fs-body)] leading-[1.75] text-[var(--ivory)]/85 [text-wrap:pretty]">
              {intro}
            </blockquote>
            <QuoteRule glyph="”" />
          </figure>
        </div>

        {/* Steps diagram */}
        <div className="xl:col-span-8 xl:ps-6">
          <style>{KEYFRAMES}</style>
          {/* Full list for assistive tech; the diagram below is a visual aid */}
          <ol className="sr-only">
            {steps.map((s) => (
              <li key={s.name}>
                {s.name}: {s.desc} ({s.points.map((p) => p.label).join(", ")})
              </li>
            ))}
          </ol>

          {/* Laptop and up: serpentine + horizontal rails */}
          <div className="hidden lg:flex items-start" aria-hidden="true">
            {/* Step column */}
            <div
              className="relative shrink-0 w-[21.5rem]"
              style={{ height: `${steps.length * PITCH - GAP}rem` }}
            >
              {steps.map((step, i) => {
                const top = i * PITCH;
                const centre = top + ROW / 2;
                const first = i === 0;
                const last = i === steps.length - 1;
                return (
                  <div key={step.name}>
                    {/* Start / end markers */}
                    {(first || last) && (
                      <>
                        <span
                          className={cn(
                            "absolute start-0 size-6 transition-[background-color,box-shadow] duration-300",
                            isOn(i) ? "bg-[var(--terracotta-on-dark)] shadow-[0_0_18px_4px_rgb(178_76_59/0.7)]" : isPassed(i) ? "bg-[var(--terracotta-on-dark)]" : "bg-[var(--chestnut)]"
                          )}
                          style={{ top: `${centre - 0.75}rem` }}
                        />
                        <span
                          className={cn(
                            "absolute start-6 w-[3rem] border-t-2 border-dotted transition-colors duration-300",
                            dotted(isOn(i) || isPassed(i))
                          )}
                          style={{ top: `${centre - 0.0625}rem` }}
                        />
                      </>
                    )}

                    {/* Glow behind the active bar */}
                    <span
                      className={cn(
                        "absolute start-[4.5rem] w-[11rem] h-16 bg-[var(--terracotta-on-dark)] blur-2xl transition-opacity duration-300",
                        isOn(i) ? "opacity-70 ah-anim" : "opacity-0"
                      )}
                      style={{
                        top: `${top}rem`,
                        animation: isOn(i) && !reduced ? "naqsh-breathe 2.8s ease-in-out infinite" : undefined,
                      }}
                    />

                    {/* Step bar */}
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setActive(i)}
                      className="absolute z-10 start-[4.5rem] w-[17rem] h-16 overflow-hidden text-start ps-5 cursor-pointer bg-[var(--black)]"
                      style={{ top: `${top}rem` }}
                    >
                      <span className="absolute inset-0 bg-[linear-gradient(90deg,var(--chestnut)_0%,rgb(127_48_33/0.55)_40%,transparent_100%)]" />
                      <span
                        className={cn(
                          "absolute inset-0 bg-[linear-gradient(90deg,var(--terracotta-on-dark)_0%,var(--chestnut)_45%,transparent_100%)] transition-opacity duration-300 ease-[var(--ease-out)]",
                          isOn(i) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {isOn(i) && !reduced && (
                        <span
                          key={`sheen-${active}`}
                          className="ah-anim absolute inset-y-0 start-0 w-1/3 bg-[linear-gradient(100deg,transparent,rgb(247_241_231/0.35),transparent)]"
                          style={{ animation: "naqsh-sheen 0.9s cubic-bezier(0.22,1,0.36,1) forwards" }}
                        />
                      )}
                      <span
                        className={cn(
                          "absolute inset-y-0 start-0 w-[3px] bg-[var(--ivory)] transition-transform duration-300 origin-top ease-[var(--ease-out)]",
                          isOn(i) ? "scale-y-100" : "scale-y-0"
                        )}
                      />
                      <span
                        className={cn(
                          "relative font-display text-[1.625rem] leading-[4rem] transition-colors duration-300",
                          isOn(i) ? "text-[var(--ivory)] [text-shadow:0_0_14px_rgb(247_241_231/0.45)]" : "text-[var(--ivory)]/70"
                        )}
                      >
                        {step.name}
                      </span>
                    </button>

                    {/* Serpentine link to the next step: right, left, right */}
                    {!last && (
                      <span
                        className={cn(
                          "absolute z-0 border-2 border-dotted transition-[border-color,filter] duration-300",
                          i % 2 === 0
                            ? "start-[14.5rem] w-12 border-s-0 rounded-e-full"
                            : "start-[2rem] w-10 border-e-0 rounded-s-full",
                          reduced || active > i
                            ? "border-[var(--terracotta-on-dark)] drop-shadow-[0_0_5px_rgb(178_76_59/0.9)]"
                            : "border-[var(--hairline-dark)]"
                        )}
                        style={{ top: `${centre}rem`, height: `${PITCH}rem` }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Rails + icons */}
            <div className="flex-1 min-w-0 flex flex-col" style={{ gap: `${GAP}rem` }}>
              {steps.map((step, i) => (
                <div key={step.name} className="h-16 flex items-center">
                  {/* Rail with travelling dot */}
                  <span className="relative flex-1 min-w-8 mx-3">
                    <span
                      className={cn(
                        "block border-t-2 border-dotted transition-colors duration-500",
                        dotted(isOn(i))
                      )}
                    />
                    <span
                      className={cn(
                        "absolute start-0 top-1/2 -translate-y-1/2 h-[2px] w-full origin-left rtl:origin-right bg-[var(--terracotta-on-dark)] shadow-[0_0_10px_2px_rgb(178_76_59/0.55)] transition-transform ease-[var(--ease-out)]",
                        isOn(i) ? "scale-x-100 duration-[450ms]" : "scale-x-0 duration-200"
                      )}
                    />
                    <span
                      className={cn(
                        "absolute top-1/2 -translate-y-1/2 size-3 rounded-full bg-[var(--ivory)] shadow-[0_0_16px_5px_rgb(178_76_59/0.85)] transition-[inset-inline-start,opacity] ease-[var(--ease-out)]",
                        isOn(i)
                          ? "start-[calc(100%-0.75rem)] opacity-100 duration-[450ms]"
                          : "start-0 opacity-0 duration-0"
                      )}
                    />
                  </span>

                  {/* Three icons joined by short dotted links */}
                  <div className="flex items-center">
                    {step.points.map((point, k) => {
                      const Icon = ICONS[point.icon];
                      const delay = reduced ? 0 : 380 + k * 140;
                      return (
                        <div key={point.label} className="flex items-center">
                          {k > 0 && (
                            <span
                              className={cn(
                                "w-10 border-t-2 border-dotted transition-[border-color,filter] duration-200",
                                isOn(i)
                                  ? "border-[var(--terracotta-on-dark)] drop-shadow-[0_0_4px_rgb(178_76_59/0.9)]"
                                  : "border-[var(--hairline-dark)]"
                              )}
                              style={{ transitionDelay: isOn(i) ? `${delay - 80}ms` : "0ms" }}
                            />
                          )}
                          <span className="relative flex flex-col items-center">
                            <span
                              className={cn(
                                "relative flex size-12 items-center justify-center rounded-full border transition-[background-color,border-color,color,transform,box-shadow] duration-300 ease-[var(--ease-out)]",
                                isOn(i)
                                  ? "border-[var(--terracotta-on-dark)] bg-[var(--terracotta-on-dark)]/35 text-[var(--ivory)] scale-105 shadow-[0_0_22px_5px_rgb(178_76_59/0.6)]"
                                  : "border-[var(--hairline-dark)] bg-transparent text-[var(--ivory)]/45 scale-90"
                              )}
                              style={{ transitionDelay: isOn(i) ? `${delay}ms` : "0ms" }}
                            >
                              <Icon size={20} strokeWidth={1.5} />
                              {isOn(i) && !reduced && (
                                <span
                                  key={`ping-${active}`}
                                  className="ah-anim absolute inset-0 rounded-full border-2 border-[var(--terracotta-on-dark)] opacity-0"
                                  style={{ animation: `naqsh-ping 0.8s ease-out ${delay}ms forwards` }}
                                />
                              )}
                            </span>
                            <span
                              className={cn(
                                "absolute top-full mt-1.5 w-[5.75rem] text-center font-sans text-[0.75rem] font-semibold leading-[1.2] transition-colors duration-300",
                                isOn(i) ? "text-[var(--ivory)]" : "text-[var(--ivory)]/60"
                              )}
                              style={{ transitionDelay: isOn(i) ? `${delay}ms` : "0ms" }}
                            >
                              {point.label}
                            </span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Phones and tablets: stacked steps, each with its four icons */}
          <ol className="lg:hidden flex flex-col gap-8" aria-hidden="true">
            {steps.map((step, i) => (
              <li key={step.name}>
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setActive(i)}
                  className={cn("relative w-full h-14 overflow-hidden text-start ps-5 transition-shadow duration-300", isOn(i) && "shadow-[0_0_26px_2px_rgb(178_76_59/0.55)]")}
                >
                  <span className="absolute inset-0 bg-[linear-gradient(90deg,var(--chestnut)_0%,rgb(127_48_33/0.5)_45%,transparent_100%)]" />
                  <span
                    className={cn(
                      "absolute inset-0 bg-[linear-gradient(90deg,var(--terracotta-on-dark)_0%,var(--chestnut)_50%,transparent_100%)] transition-opacity duration-300",
                      isOn(i) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {isOn(i) && !reduced && (
                    <span
                      key={`msheen-${active}`}
                      className="ah-anim absolute inset-y-0 start-0 w-1/3 bg-[linear-gradient(100deg,transparent,rgb(247_241_231/0.35),transparent)]"
                      style={{ animation: "naqsh-sheen 0.9s cubic-bezier(0.22,1,0.36,1) forwards" }}
                    />
                  )}
                  <span className="relative font-display text-[1.5rem] leading-[3.5rem] text-[var(--ivory)]">
                    {step.name}
                  </span>
                </button>
                <div className="mt-4 grid grid-cols-4 gap-x-1">
                  {step.points.map((point, k) => {
                    const Icon = ICONS[point.icon];
                    const delay = reduced ? 0 : 200 + k * 130;
                    return (
                      <span key={point.label} className="flex flex-col items-center gap-2 text-center">
                        <span
                          className={cn(
                            "relative flex size-11 items-center justify-center rounded-full border transition-[background-color,border-color,color,box-shadow,transform] duration-300",
                            isOn(i)
                              ? "border-[var(--terracotta-on-dark)] bg-[var(--terracotta-on-dark)]/35 text-[var(--ivory)] scale-105 shadow-[0_0_20px_4px_rgb(178_76_59/0.6)]"
                              : "border-[var(--hairline-dark)] text-[var(--ivory)]/45"
                          )}
                          style={{ transitionDelay: isOn(i) ? `${delay}ms` : "0ms" }}
                        >
                          <Icon size={18} strokeWidth={1.5} />
                          {isOn(i) && !reduced && (
                            <span
                              key={`mping-${active}`}
                              className="ah-anim absolute inset-0 rounded-full border-2 border-[var(--terracotta-on-dark)] opacity-0"
                              style={{ animation: `naqsh-ping 0.8s ease-out ${delay}ms forwards` }}
                            />
                          )}
                        </span>
                        <span className="font-sans text-[0.6875rem] sm:text-[0.75rem] font-semibold leading-[1.2] text-[var(--ivory)]/75">
                          {point.label}
                        </span>
                      </span>
                    );
                  })}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function QuoteRule({ glyph }: { glyph: string }) {
  return (
    <div className="flex items-center gap-4" aria-hidden="true">
      <span className="h-px flex-1 bg-[var(--terracotta-on-dark)]" />
      <span className="font-display text-[3rem] leading-[0.6] h-6 text-[var(--terracotta-on-dark)]">
        {glyph}
      </span>
      <span className="h-px flex-1 bg-[var(--terracotta-on-dark)]" />
    </div>
  );
}
