import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ArrowCircle({ className }: { className?: string }) {
  return (
    <span className={cn("btn-arrow", className)} aria-hidden="true">
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-current"
      >
        <path
          d="M1 7H12.5M12.5 7L7 1.5M12.5 7L7 12.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export type ButtonVariant = "primary" | "secondary" | "on-dark" | "ivory";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "md" | "sm";
  showArrow?: boolean;
  href?: string;
  external?: boolean;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  showArrow = true,
  href,
  external,
  ...props
}: ButtonProps) {
  const variantClass = {
    primary: "btn",
    secondary: "btn btn-secondary",
    "on-dark": "btn btn-on-dark",
    ivory: "btn btn-ivory",
  }[variant];

  const sizeClass = size === "sm" ? "btn-sm" : "";
  const plainClass = !showArrow ? "btn-plain" : "";

  const combinedClass = cn(variantClass, sizeClass, plainClass, className);

  if (href) {
    if (external || href.startsWith("http") || href.startsWith("https://wa.me")) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClass}
        >
          <span>{children}</span>
          {showArrow && <ArrowCircle />}
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClass}>
        <span>{children}</span>
        {showArrow && <ArrowCircle />}
      </Link>
    );
  }

  return (
    <button className={combinedClass} {...props}>
      <span>{children}</span>
      {showArrow && <ArrowCircle />}
    </button>
  );
}
