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
  reveal?: "clip" | "fade-up" | "none";
  parallax?: boolean;
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
}: ImageFrameProps) {
  const aspectClass = {
    "4/5": "aspect-[4/5]",
    "16/9": "aspect-[16/9]",
    "21/9": "aspect-[21/9]",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    auto: "",
  }[aspectRatio];

  return (
    <div
      className={cn(
        "frame relative w-full border border-[var(--hairline)]",
        aspectClass,
        className
      )}
      data-reveal={reveal !== "none" ? reveal : undefined}
      data-parallax={parallax ? "true" : undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn(
          "object-cover transition-transform duration-700 ease-[var(--ease-out)]",
          imageClassName
        )}
      />
    </div>
  );
}
