import Link from "next/link";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  /** "light" for ivory backgrounds, "dark" for dark heroes. */
  tone?: "light" | "dark";
}

export function Breadcrumb({ items, className, tone = "light" }: BreadcrumbProps) {
  const isDark = tone === "dark";
  return (
    <nav aria-label="Breadcrumb" className={cn("mb-6 select-none", className)}>
      <ol
        className={cn(
          "flex items-center flex-wrap gap-2 text-xs uppercase tracking-widest",
          isDark ? "text-[var(--ivory)]/55" : "text-[var(--charcoal)]"
        )}
      >
        <li className="inline-flex items-center gap-2">
          <Link
            href="/"
            className={cn(
              "transition-colors duration-200",
              isDark ? "hover:text-[#E5A666]" : "hover:text-[var(--link)]"
            )}
          >
            Home
          </Link>
          <span
            className={isDark ? "text-[var(--ivory)]/25" : "text-[var(--hairline)]"}
            aria-hidden="true"
          >
            /
          </span>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="inline-flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors duration-200",
                    isDark ? "hover:text-[#E5A666]" : "hover:text-[var(--link)]"
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    isLast &&
                      (isDark
                        ? "text-[var(--ivory)] font-semibold"
                        : "text-[var(--text-strong)] font-semibold")
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span
                  className={isDark ? "text-[var(--ivory)]/25" : "text-[var(--hairline)]"}
                  aria-hidden="true"
                >
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
