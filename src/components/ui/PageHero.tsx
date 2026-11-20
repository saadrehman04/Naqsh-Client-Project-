import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  label: string;
  title: string;
  intro?: string;
  subtitle?: string;
  className?: string;
  fadeOnly?: boolean;
  /** Optional background photograph, behind a soft dark layer on the copy side. */
  image?: string;
  imageAlt?: string;
  /**
   * How the background image is treated:
   * - "dim" (default): lightly dimmed photo behind a start-to-end fade.
   * - "clear": the photo at full sharpness (no blur, no zoom), black fade at the start for the copy.
   * - "fade": full-strength photo (already dark), black fade at the start for the copy.
   * - "plain": an abstract backdrop stretched to the banner, no dimming or extra glow.
   */
  imageTreatment?: "dim" | "clear" | "fade" | "plain";
  /** next/image quality for the background (must be listed in next.config images.qualities). */
  imageQuality?: number;
  /** object-position for the background image. */
  imagePosition?: string;
}

const TREATMENT = {
  dim: {
    img: "opacity-80 scale-110",
    fade: "linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.66) 32%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.08) 100%)",
  },
  clear: {
    img: "",
    fade: "linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.62) 30%, rgba(0,0,0,0.26) 55%, transparent 80%)",
  },
  fade: {
    img: "scale-105",
    fade: "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.58) 30%, rgba(0,0,0,0.2) 58%, transparent 85%)",
  },
  plain: { img: "!object-fill", fade: "" },
} as const;

/**
 * Dark, cinematic inner-page hero that matches the homepage hero:
 * deep obsidian ground, warm terracotta glow, faint lattice, ivory serif headline
 * and an optional dimmed product photograph on the right.
 */
export function PageHero({
  label,
  title,
  intro,
  subtitle,
  className,
  fadeOnly = false,
  image,
  imageAlt = "",
  imageTreatment = "dim",
  imagePosition = "75% center",
  imageQuality,
}: PageHeroProps) {
  const displayIntro = intro || subtitle;
  const treatment = TREATMENT[imageTreatment];
  const plain = imageTreatment === "plain";
  return (
    <section
      className={cn(
        "page-hero on-dark relative overflow-hidden bg-[var(--black)] text-[var(--ivory)] pt-28 pb-10 sm:pt-40 sm:pb-20",
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
            quality={imageQuality}
            className={cn("object-cover", treatment.img)}
            style={{ objectPosition: imagePosition }}
          />
          {treatment.fade && (
            <div className="absolute inset-0" style={{ background: treatment.fade }} />
          )}
        </div>
      )}
      {/* Soft top band (outside the parallax layer) so the header links stay legible over light photos */}
      {image && !plain && (
        <div
          className="absolute inset-x-0 top-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)" }}
          aria-hidden="true"
        />
      )}

      {/* Warm terracotta ambient glow (skipped over a plain backdrop) */}
      {!plain && (
      <div
        className="absolute -top-40 -right-32 w-[620px] h-[620px] max-w-[120vw] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(178,76,59,0.26) 0%, transparent 68%)",
        }}
        aria-hidden="true"
      />
      )}
      {/* Faint cultural lattice */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: "url('/brand/diamond-lattice.svg')",
          backgroundSize: "160px 160px",
        }}
        aria-hidden="true"
      />
      {/* Bottom fade + terracotta hairline */}
      <div
        className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.55) 0%, transparent 100%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--terracotta-on-dark)]/60 to-transparent"
        aria-hidden="true"
      />

      <div className="container-x relative z-10" data-reveal={fadeOnly ? "fade" : undefined}>
        <div className="max-w-4xl">
          <div
            className="flex items-center gap-3 mb-3 sm:mb-4 text-xs font-sans tracking-[0.24em] uppercase text-[var(--ivory)]/90 font-semibold select-none [text-shadow:0_1px_10px_rgba(0,0,0,0.55)]"
            data-reveal={fadeOnly ? undefined : "up"}
          >
            <span className="w-8 h-px bg-[var(--terracotta-on-dark)]" aria-hidden="true" />
            <span>{label}</span>
          </div>
          <h1
            className="t-h1 mb-3.5 sm:mb-5 text-[var(--ivory)] drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]"
            data-reveal={fadeOnly ? undefined : "lines"}
          >
            {title}
          </h1>
          {displayIntro && (
            <p
              className="text-[length:var(--fs-body)] leading-relaxed text-[var(--ivory)]/90 max-w-xl font-light [text-shadow:0_1px_12px_rgba(0,0,0,0.55)]"
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
