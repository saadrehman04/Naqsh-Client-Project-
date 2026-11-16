import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type LogoVariant = "black" | "ivory" | "copper" | "copper-gradient" | "gold-gradient";

interface WordmarkProps {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
}

export function Wordmark({
  variant = "black",
  className,
  priority = false,
}: WordmarkProps) {
  const src = `/brand/wordmark-${variant}.svg`;
  return (
    <Image
      src={src}
      alt="Naqsh"
      width={160}
      height={30}
      priority={priority}
      className={cn("h-auto w-auto object-contain", className)}
    />
  );
}

interface EmblemProps {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
}

export function Emblem({
  variant = "ivory",
  className,
  priority = false,
}: EmblemProps) {
  const src = `/brand/emblem-${variant}.svg`;
  return (
    <Image
      src={src}
      alt="Naqsh Brand Emblem"
      width={48}
      height={90}
      priority={priority}
      className={cn("h-auto w-auto object-contain", className)}
    />
  );
}

interface BrandLockupProps {
  variant?: LogoVariant;
  className?: string;
  href?: string;
}

export function BrandLockup({
  variant = "black",
  className,
  href = "/",
}: BrandLockupProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Wordmark variant={variant} className="w-28 sm:w-36" />
    </span>
  );

  if (href) {
    return (
      <Link href={href} aria-label="Naqsh Home" className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
}

interface TerracottaLogoProps {
  kind: "wordmark" | "emblem";
  className?: string;
  label?: string;
}

const LOGO_RATIO = { wordmark: "4123 / 761", emblem: "2120 / 3958" } as const;

/**
 * Terracotta logo (client request, Nov 2026). No terracotta file exists in assets/logo/svg, so the
 * approved ivory SVG is used unchanged as a CSS mask and filled with the --terracotta-on-dark token.
 * Shape and proportions come straight from the approved file; only the fill colour differs.
 */
export function TerracottaLogo({ kind, className, label = "NAQSH" }: TerracottaLogoProps) {
  const url = `url(/brand/${kind}-ivory.svg)`;
  return (
    <span
      role="img"
      aria-label={label}
      className={cn("bg-[var(--terracotta-on-dark)]", className)}
      style={{
        aspectRatio: LOGO_RATIO[kind],
        maskImage: url,
        WebkitMaskImage: url,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
