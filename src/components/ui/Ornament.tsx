import { cn } from "@/lib/utils";

interface OrnamentProps {
  /** center: line, diamond, line. start: diamond then line (for start-aligned headings). */
  align?: "center" | "start";
  className?: string;
}

/**
 * Small terracotta diamond-and-rule mark used above section headings.
 * Echoes the diamond motif in the NAQSH emblem. Purely decorative.
 */
export function Ornament({ align = "center", className }: OrnamentProps) {
  return (
    <span
      className={cn(
        "flex items-center gap-3",
        align === "center" ? "justify-center" : "justify-start",
        className
      )}
      aria-hidden="true"
    >
      {align === "center" && (
        <span className="h-px w-10 bg-[var(--terracotta)] [.on-dark_&]:bg-[var(--terracotta-on-dark)]" data-draw="center" />
      )}
      <span className="size-[7px] rotate-45 bg-[var(--terracotta)] [.on-dark_&]:bg-[var(--terracotta-on-dark)]" />
      <span className="h-px w-10 bg-[var(--terracotta)] [.on-dark_&]:bg-[var(--terracotta-on-dark)]" data-draw="center" />
    </span>
  );
}
