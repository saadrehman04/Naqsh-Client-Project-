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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Threshold to trigger scrolled style
      setIsScrolled(currentScrollY > 80);

      // Hide on scroll down, show on scroll up (with a minimum delta to avoid jitter)
      if (currentScrollY > 200 && currentScrollY > lastScrollY + 8) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 8 || currentScrollY <= 80) {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // If on inner pages, header should always show dark logo and ivory background
  const isTransparent = isHomePage && !isScrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-400 ease-[var(--ease-out)]",
          !isVisible && "-translate-y-full",
          isTransparent
            ? "bg-transparent text-[var(--ivory)] border-b border-white/[0.18]"
            : "bg-[var(--ivory)]/90 backdrop-blur-md text-[var(--text-strong)] border-b border-[var(--hairline)] shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]"
        )}
      >
        <div className="container-x header-shell">
          {/* Left: Mobile boxed menu button and desktop navigation */}
          <div className="header-left">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className={cn(
                "header-menu-button min-[1180px]:hidden flex items-center justify-center gap-2 h-11 px-3.5 border rounded-[2px] transition-colors text-xs font-semibold uppercase tracking-[0.12em]",
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

          </div>

          <nav className="header-nav select-none">
              {siteConfig.nav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "header-nav-link",
                      isActive
                        ? "is-active"
                        : isTransparent
                        ? "is-over-hero"
                        : ""
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          <Link href="/" aria-label="Naqsh Homepage" className="header-wordmark header-logo-centered">
            <Wordmark variant={isTransparent ? "ivory" : "black"} className="w-[140px]" priority />
          </Link>
          {/* Right: WhatsApp link & Request Consultation CTA */}
          <div className="header-actions">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Chat on WhatsApp (${siteConfig.phone})`}
              className={cn(
                "header-whatsapp flex items-center justify-center w-11 h-11 rounded-full border transition-all duration-200",
                isTransparent
                  ? "border-white/20 text-[var(--ivory)] hover:border-white hover:bg-white/10"
                  : "border-[var(--hairline)] text-[var(--pine)] hover:border-[var(--pine)] hover:bg-[var(--pine)]/5"
              )}
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12.04 2C6.52 2 2.03 6.48 2.02 12c0 1.76.46 3.47 1.34 4.98L2 22l5.16-1.35A10 10 0 1 0 12.04 2Zm0 18.18c-1.5 0-2.97-.4-4.25-1.17l-.3-.18-3.06.8.82-2.98-.2-.31A8.17 8.17 0 1 1 12.04 20.18Zm4.49-6.12c-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.56.13-.17.25-.65.81-.8.98-.15.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.66-1.25-1.48-1.4-1.73-.15-.25-.02-.39.11-.52.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09s.9 2.42 1.02 2.59c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.42 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.48-.61 1.69-1.2.21-.59.21-1.1.15-1.2-.06-.1-.23-.16-.48-.29Z" />
              </svg>
            </a>

            <Button
              href="/contact"
              variant={isTransparent ? "on-dark" : "primary"}
              size="sm"
              className="header-cta"
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
