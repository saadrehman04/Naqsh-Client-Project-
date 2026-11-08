"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Wordmark } from "@/components/brand/Logo";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MobileMenu } from "./MobileMenu";
import { useMotion } from "@/components/motion/MotionProvider";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { lenis } = useMotion();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrolledState = lastScrollY > 80;
    let visibleState = true;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const nextScrolled = currentScrollY > 80;
      if (nextScrolled !== scrolledState) {
        scrolledState = nextScrolled;
        setIsScrolled(nextScrolled);
      }

      let nextVisible = visibleState;
      const lenisDir = lenis?.direction;
      if (currentScrollY <= 80) {
        nextVisible = true;
      } else if (typeof lenisDir === "number" && lenisDir !== 0) {
        if (lenisDir > 0 && currentScrollY > 140) {
          nextVisible = false;
        } else if (lenisDir < 0) {
          nextVisible = true;
        }
      } else {
        if (currentScrollY > 140 && currentScrollY > lastScrollY + 6) {
          nextVisible = false;
        } else if (currentScrollY < lastScrollY - 6) {
          nextVisible = true;
        }
      }

      if (nextVisible !== visibleState) {
        visibleState = nextVisible;
        setIsVisible(nextVisible);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lenis]);

  // Every page now opens on a dark hero, so the header stays transparent
  // (gold logo, ivory links) until the user scrolls past the hero.
  const isTransparent = !isScrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-400 ease-[var(--ease-out)]",
          !isVisible && "-translate-y-full pointer-events-none",
          isTransparent
            ? "bg-transparent text-[var(--ivory)] border-b border-white/[0.12]"
            : cn(
                "bg-[var(--ivory)]/95 text-[var(--text-strong)] border-b border-[var(--hairline)] shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]",
                isVisible && "backdrop-blur-md"
              )
        )}
      >
        <div className="container-x header-shell flex items-center justify-between">
          {/* Left: Brand Lockup with Subtitle */}
          <Link
            href="/"
            aria-label="Naqsh Homepage"
            className="header-brand-lockup flex flex-col items-start select-none group py-1"
          >
            <Wordmark
              variant={isTransparent ? "gold-gradient" : "black"}
              className="w-[115px] sm:w-[134px] transition-transform duration-300 group-hover:scale-[1.02]"
              priority
            />
            <span
              className={cn(
                "text-[7.5px] sm:text-[8px] font-sans tracking-[0.24em] uppercase font-semibold mt-0.5 transition-colors",
                isTransparent ? "text-[#E5A666]" : "text-[var(--text-muted)]"
              )}
            >
              Luxury Corporate Gifts
            </span>
          </Link>

          {/* Center: Desktop Navigation */}
          <nav className="header-nav select-none hidden lg:flex items-center justify-center gap-7 xl:gap-9">
            {siteConfig.nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "header-nav-link text-[13px] tracking-[0.04em] font-sans transition-colors relative py-1.5",
                    isActive
                      ? "is-active text-[#E5A666] font-medium"
                      : isTransparent
                      ? "text-[var(--ivory)]/90 hover:text-[var(--ivory)]"
                      : "text-[var(--text-strong)]/85 hover:text-black"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E5A666] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: WhatsApp Link & Request Consultation CTA */}
          <div className="header-actions flex items-center gap-3">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Chat on WhatsApp (${siteConfig.phone})`}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 hover:scale-105",
                isTransparent
                  ? "border-[#E5A666]/60 hover:border-[#E5A666] text-[#E5A666] bg-black/40 hover:bg-[#E5A666]/20 shadow-[0_2px_12px_rgba(229,166,102,0.18)]"
                  : "border-[var(--hairline)] text-[var(--pine)] hover:border-[var(--pine)] hover:bg-[var(--pine)]/5"
              )}
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12.04 2C6.52 2 2.03 6.48 2.02 12c0 1.76.46 3.47 1.34 4.98L2 22l5.16-1.35A10 10 0 1 0 12.04 2Zm0 18.18c-1.5 0-2.97-.4-4.25-1.17l-.3-.18-3.06.8.82-2.98-.2-.31A8.17 8.17 0 1 1 12.04 20.18Zm4.49-6.12c-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.56.13-.17.25-.65.81-.8.98-.15.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.66-1.25-1.48-1.4-1.73-.15-.25-.02-.39.11-.52.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09s.9 2.42 1.02 2.59c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.42 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.48-.61 1.69-1.2.21-.59.21-1.1.15-1.2-.06-.1-.23-.16-.48-.29Z" />
              </svg>
            </a>

            <Link
              href="/contact"
              className={cn(
                "hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-sans tracking-[0.14em] uppercase font-semibold transition-all duration-300 hover:scale-[1.02]",
                isTransparent
                  ? "border-[#E5A666]/70 hover:border-[#E5A666] text-[#F9EBD7] hover:text-white hover:bg-[#E5A666]/20 bg-black/40 shadow-[0_2px_12px_rgba(229,166,102,0.18)]"
                  : "border-[var(--charcoal)] text-[var(--charcoal)] hover:bg-[var(--chestnut)] hover:border-[var(--chestnut)] hover:text-white"
              )}
            >
              <span>Request Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E5A666]" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className={cn(
                "lg:hidden flex items-center justify-center gap-2 h-10 px-3.5 border rounded-full transition-colors text-xs font-semibold uppercase tracking-[0.12em]",
                isTransparent
                  ? "border-white/30 text-[var(--ivory)] hover:border-white bg-black/30"
                  : "border-[var(--charcoal)] text-[var(--charcoal)] hover:border-black hover:text-black"
              )}
            >
              <svg
                width="16"
                height="10"
                viewBox="0 0 16 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M0 1H16M0 9H16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation overlay dialog */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
