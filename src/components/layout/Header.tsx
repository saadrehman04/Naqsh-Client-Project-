"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";
import { Wordmark } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Threshold to trigger scrolled style
      if (currentScrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, show on scroll up (with a minimum delta to avoid jitter)
      if (currentScrollY > 200 && currentScrollY > lastScrollY + 8) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 8 || currentScrollY <= 80) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // If on inner pages, header should always show dark logo and ivory background
  const isTransparent = isHomePage && !isScrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-400 ease-[var(--ease-out)]",
          !isVisible && "-translate-y-full",
          isTransparent
            ? "bg-transparent text-[var(--ivory)] border-b border-white/10"
            : "bg-[var(--ivory)]/90 backdrop-blur-md text-[var(--text-strong)] border-b border-[var(--hairline)] shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]"
        )}
      >
        <div className="container-x flex items-center justify-between h-18 sm:h-22">
          {/* Left: Mobile boxed menu button & Desktop nav */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className={cn(
                "lg:hidden flex items-center justify-center gap-2 h-11 px-3.5 border rounded-[2px] transition-colors text-xs font-semibold uppercase tracking-widest",
                isTransparent
                  ? "border-white/30 text-[var(--ivory)] hover:border-white"
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
              <span>Menu</span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7 select-none">
              {siteConfig.nav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "t-label tracking-[0.18em] transition-colors duration-200 py-1 border-b",
                      isActive
                        ? isTransparent
                          ? "border-[var(--ivory)] text-[var(--ivory)]"
                          : "border-[var(--pine)] text-[var(--text-strong)]"
                        : isTransparent
                        ? "border-transparent text-white/80 hover:text-white"
                        : "border-transparent text-[var(--charcoal)] hover:text-black"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Center: Brand Wordmark */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/" aria-label="Naqsh Homepage" className="block py-2">
              <Wordmark
                variant={isTransparent ? "ivory" : "black"}
                className="w-28 sm:w-36 transition-opacity duration-300"
                priority
              />
            </Link>
          </div>

          {/* Right: WhatsApp link & Request Consultation CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp (+92 340 6119004)"
              className={cn(
                "flex items-center justify-center w-11 h-11 rounded-full border transition-all duration-200",
                isTransparent
                  ? "border-white/20 text-[var(--ivory)] hover:border-white hover:bg-white/10"
                  : "border-[var(--hairline)] text-[var(--pine)] hover:border-[var(--pine)] hover:bg-[var(--pine)]/5"
              )}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </a>

            <Button
              href="/contact"
              variant={isTransparent ? "on-dark" : "primary"}
              size="sm"
              className="hidden sm:inline-flex"
            >
              Request Consultation
            </Button>
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
