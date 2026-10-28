import React from "react";
import { cn } from "@/lib/utils";
import { SectionLabel } from "./SectionLabel";
import { Breadcrumb, type BreadcrumbItem } from "./Breadcrumb";

interface PageHeroProps {
  label: string;
  title: string;
  intro?: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
  fadeOnly?: boolean;
}

export function PageHero({
  label,
  title,
  intro,
  subtitle,
  breadcrumbs,
  className,
  fadeOnly = false,
}: PageHeroProps) {
  const displayIntro = intro || subtitle;
  return (
    <section
      className={cn(
        "pt-28 pb-12 sm:pt-36 sm:pb-16 border-b border-[var(--hairline)] bg-[var(--ivory)]",
        className
      )}
    >
      <div className="container-x" data-reveal={fadeOnly ? "fade" : undefined}>
        {breadcrumbs && (
          <div data-reveal={fadeOnly ? undefined : "up"}>
            <Breadcrumb items={breadcrumbs} />
          </div>
        )}
        <div className="max-w-4xl">
          <div data-reveal={fadeOnly ? undefined : "up"}>
            <SectionLabel>{label}</SectionLabel>
          </div>
          <h1
            className="t-h1 mb-6 text-[var(--text-strong)]"
            data-reveal={fadeOnly ? undefined : "lines"}
          >
            {title}
          </h1>
          {displayIntro && (
            <p
              className="t-lead text-[var(--text)] max-w-2xl font-light"
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
