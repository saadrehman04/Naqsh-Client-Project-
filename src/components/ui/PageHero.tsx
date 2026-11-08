import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Breadcrumb, type BreadcrumbItem } from "./Breadcrumb";

interface PageHeroProps {
  label: string;
  title: string;
  intro?: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
  fadeOnly?: boolean;
  /** Optional background photograph, rendered dimmed behind a dark vignette. */
  image?: string;
  imageAlt?: string;
}

/**
 * Dark, cinematic inner-page hero that matches the homepage hero:
 * deep obsidian ground, warm copper glow, faint lattice, ivory serif headline
 * and an optional dimmed product photograph on the right.
 */
export function PageHero({
  label,
  title,
  intro,
  subtitle,
  breadcrumbs,
  className,
  fadeOnly = false,
  image,
  imageAlt = "",
}: PageHeroProps) {
  const displayIntro = intro || subtitle;
  return (
    <section
      className={cn(
        "page-hero on-dark relative overflow-hidden bg-[#0E0C0A] text-[var(--ivory)] pt-32 pb-16 sm:pt-40 sm:pb-24",
        className
      )}
    >
      {/* Background photograph (dimmed, right-weighted, with scroll parallax) */}
      {image && (
        <div
          className="page-hero-bg absolute -inset-y-12 inset-x-0 pointer-events-none"
          aria-hidden="true"
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[75%_center] opacity-45 scale-110"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, #0E0C0A 0%, rgba(14,12,10,0.94) 38%, rgba(14,12,10,0.7) 62%, rgba(14,12,10,0.35) 100%)",
            }}
          />
        </div>
      )}

      {/* Warm copper ambient glow */}
      <div
        className="absolute -top-40 -right-32 w-[620px] h-[620px] max-w-[120vw] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(171,108,73,0.22) 0%, transparent 68%)",
        }}
        aria-hidden="true"
      />
      {/* Faint cultural lattice */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: "url('/brand/diamond-lattice.svg')",
          backgroundSize: "160px 160px",
        }}
        aria-hidden="true"
      />
      {/* Bottom fade + copper hairline */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(0deg, #0E0C0A 0%, transparent 100%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--copper)]/50 to-transparent"
        aria-hidden="true"
      />

      <div className="container-x relative z-10" data-reveal={fadeOnly ? "fade" : undefined}>
        {breadcrumbs && (
          <div data-reveal={fadeOnly ? undefined : "up"}>
            <Breadcrumb items={breadcrumbs} tone="dark" />
          </div>
        )}
        <div className="max-w-4xl">
          <div
            className="flex items-center gap-3 mb-5 text-xs font-sans tracking-[0.24em] uppercase text-[#E5A666] font-semibold select-none"
            data-reveal={fadeOnly ? undefined : "up"}
          >
            <span className="w-8 h-px bg-[#E5A666]/60" aria-hidden="true" />
            <span>{label}</span>
          </div>
          <h1
            className="t-h1 mb-6 text-[var(--ivory)] drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]"
            data-reveal={fadeOnly ? undefined : "lines"}
          >
            {title}
          </h1>
          {displayIntro && (
            <p
              className="t-lead text-[var(--ivory)]/80 max-w-2xl font-light"
              data-reveal={fadeOnly ? undefined : "up"}
              data-delay={fadeOnly ? undefined : "0.1"}
            >
              {displayIntro}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
