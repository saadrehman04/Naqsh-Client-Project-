import React from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  variant?: "pine" | "khaki" | "ivory";
  className?: string;
  as?: "span" | "p" | "div";
}

export function SectionLabel({
  children,
  variant = "pine",
  className,
  as: Component = "span",
}: SectionLabelProps) {
  const variantStyles = {
    pine: "text-[var(--pine)]",
    khaki: "text-[var(--khaki)]",
    ivory: "text-[var(--ivory)]",
  };

  return (
    <Component
      className={cn(
        "t-label inline-block mb-3 sm:mb-4 select-none",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </Component>
  );
}
