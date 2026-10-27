"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { Emblem, Wordmark } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/whatsapp";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      onClose();
    };

    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      aria-label="Mobile Navigation Menu"
      className="m-0 p-0 w-screen h-screen max-w-none max-h-none bg-[var(--ivory)] text-[var(--text-strong)] backdrop:bg-black/40"
    >
      <div className="flex flex-col min-h-screen p-6 sm:p-10 justify-between lattice">
        {/* Header bar */}
        <div className="flex items-center justify-between pb-6 border-b border-[var(--hairline)]">
          <Wordmark variant="black" className="w-28" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex items-center justify-center w-11 h-11 border border-[var(--charcoal)] text-[var(--charcoal)] hover:text-black hover:border-black transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M1 1L15 15M15 1L1 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Navigation links */}
        <nav className="my-auto py-8">
          <ul className="flex flex-col space-y-5">
            {siteConfig.nav.map((item, idx) => (
              <li key={item.href} className="border-b border-[var(--hairline)] pb-4">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="group flex items-center justify-between font-serif text-3xl sm:text-4xl text-[var(--text-strong)] hover:text-[var(--chestnut)] transition-colors duration-200"
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-mono font-normal text-[var(--pine)] tracking-widest">
                    0{idx + 1}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action and contact footer */}
        <div className="pt-6 border-t border-[var(--hairline)] space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              href="/contact"
              onClick={onClose}
              variant="primary"
              className="w-full justify-center"
            >
              Request Consultation
            </Button>
            <Button
              href={getWhatsAppUrl()}
              external
              variant="secondary"
              className="w-full justify-center"
              showArrow={false}
            >
              WhatsApp Us
            </Button>
          </div>

          <div className="flex items-center justify-between pt-4 text-xs text-[var(--charcoal)]">
            <span>{siteConfig.location}</span>
            <Emblem variant="copper" className="w-5" />
            <span>{siteConfig.phone}</span>
          </div>
        </div>
      </div>
    </dialog>
  );
}
