import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageFrameProps {
  src: string;
  alt: string;
  aspectRatio?: "4/5" | "16/9" | "21/9" | "4/3" | "1/1" | "auto";
  priority?: boolean;
  sizes?: string;
  className?: string;
  imageClassName?: string;
  reveal?: "clip" | "fade-up" | "up" | "none";
  parallax?: boolean | number;
  clipFrom?: "bottom" | "left" | "right" | "top";
}

export function ImageFrame({
  src,
  alt,
  aspectRatio = "4/5",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  className,
  imageClassName,
  reveal = "none",
  parallax = false,
  clipFrom,
}: ImageFrameProps) {
  const aspectClass = {
    "4/5": "aspect-[4/5]",
    "16/9": "aspect-[16/9]",
    "21/9": "aspect-[21/9]",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    auto: "",
  }[aspectRatio];

  const parallaxAttr =
    typeof parallax === "number"
      ? String(parallax)
      : parallax
      ? "0.08"
      : undefined;

  return (
    <div
      className={cn(
        "frame relative w-full overflow-hidden border border-[var(--hairline)]",
        aspectClass,
        className
      )}
      data-reveal={reveal !== "none" ? reveal : undefined}
      data-clip-from={clipFrom}
      data-parallax={parallaxAttr}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn(
          "object-cover scale-[1.15] transition-transform duration-700 ease-[var(--ease-out)]",
          imageClassName
        )}
      />
    </div>
  );
}
