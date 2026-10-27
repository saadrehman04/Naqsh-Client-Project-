import { cn } from "@/lib/utils";
import { Emblem } from "@/components/brand/Logo";

interface PlaceholderProps {
  label: string;
  aspectRatio?: "4/5" | "16/9" | "21/9" | "1/1" | "auto";
  className?: string;
}

export function Placeholder({
  label,
  aspectRatio = "4/5",
  className,
}: PlaceholderProps) {
  const aspectClass = {
    "4/5": "aspect-[4/5]",
    "16/9": "aspect-[16/9]",
    "21/9": "aspect-[21/9]",
    "1/1": "aspect-square",
    auto: "",
  }[aspectRatio];

  return (
    <div
      className={cn(
        "relative rounded-[var(--radius-image)] border border-[var(--hairline)]",
        "bg-[var(--ivory-deep)] flex flex-col items-center justify-center p-6 text-center overflow-hidden",
        "lattice",
        aspectClass,
        className
      )}
      role="img"
      aria-label={`Placeholder: ${label}`}
    >
      <div className="relative z-10 flex flex-col items-center gap-3 opacity-60">
        <Emblem variant="copper" className="w-8 opacity-75" />
        <span className="t-label text-[var(--charcoal)] tracking-widest text-xs">
          {label}
        </span>
      </div>
    </div>
  );
}
