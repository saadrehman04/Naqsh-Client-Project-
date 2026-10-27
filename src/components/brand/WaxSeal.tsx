import Image from "next/image";
import { cn } from "@/lib/utils";

interface WaxSealProps {
  size?: "sm" | "md" | "lg";
  variant?: "terracotta" | "chestnut" | "dark";
  className?: string;
  animate?: boolean;
}

export function WaxSeal({
  size = "md",
  variant = "terracotta",
  className,
  animate = false,
}: WaxSealProps) {
  const sizeClasses = {
    sm: "w-14 h-14",
    md: "w-20 h-20 sm:w-24 sm:h-24",
    lg: "w-28 h-28 sm:w-32 sm:h-32",
  };

  const emblemSizes = {
    sm: { w: 22, h: 42 },
    md: { w: 32, h: 60 },
    lg: { w: 44, h: 84 },
  };

  const variantStyles = {
    terracotta: {
      bg: "bg-[var(--terracotta)]",
      ring: "border-[var(--chestnut)]",
      shadow: "shadow-[0_8px_24px_-4px_rgba(127,48,33,0.45)]",
    },
    chestnut: {
      bg: "bg-[var(--chestnut)]",
      ring: "border-[var(--terracotta)]",
      shadow: "shadow-[0_12px_28px_-6px_rgba(0,0,0,0.5)]",
    },
    dark: {
      bg: "bg-[var(--black)]",
      ring: "border-[var(--khaki)]",
      shadow: "shadow-[0_8px_24px_-4px_rgba(0,0,0,0.6)]",
    },
  };

  const style = variantStyles[variant];

  return (
    <div
      className={cn(
        "relative rounded-full flex items-center justify-center p-2 border-2",
        "transition-transform duration-700 ease-[var(--ease-out)]",
        sizeClasses[size],
        style.bg,
        style.ring,
        style.shadow,
        animate && "animate-seal-stamp",
        className
      )}
      style={{
        boxShadow:
          "inset 0 2px 4px rgba(255,255,255,0.25), inset 0 -3px 6px rgba(0,0,0,0.4), 0 12px 24px -4px rgba(0,0,0,0.25)",
      }}
      aria-hidden="true"
    >
      {/* Decorative concentric wax ridge */}
      <div className="absolute inset-1.5 rounded-full border border-white/20 pointer-events-none" />
      <div className="relative z-10 flex items-center justify-center">
        <Image
          src="/brand/emblem-ivory.svg"
          alt=""
          width={emblemSizes[size].w}
          height={emblemSizes[size].h}
          className="h-auto w-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
        />
      </div>
    </div>
  );
}
