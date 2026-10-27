import React from "react";
import { cn } from "@/lib/utils";
import { SectionLabel } from "./SectionLabel";
import { Breadcrumb, type BreadcrumbItem } from "./Breadcrumb";

interface PageHeroProps {
  label: string;
  title: string;
  intro?: string;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
}

export function PageHero({
  label,
  title,
  intro,
  breadcrumbs,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "pt-28 pb-12 sm:pt-36 sm:pb-16 border-b border-[var(--hairline)] bg-[var(--ivory)]",
        className
      )}
    >
      <div className="container-x">
        {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
        <div className="max-w-4xl" data-reveal="fade-up">
          <SectionLabel>{label}</SectionLabel>
          <h1 className="t-h1 mb-6 text-[var(--text-strong)]">{title}</h1>
          {intro && (
            <p className="t-lead text-[var(--text)] max-w-2xl font-light">
              {intro}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
