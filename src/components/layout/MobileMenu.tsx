"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { CopperLogo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl, WHATSAPP_NUMBER } from "@/lib/whatsapp";

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
        {/* Header bar: black like the site header, with the copper wordmark (client request 2026-11-19) */}
        <div className="-mx-6 -mt-6 sm:-mx-10 sm:-mt-10 px-6 sm:px-10 h-[72px] flex items-center justify-between bg-[var(--black)] border-b border-[var(--terracotta-on-dark)]/40">
          <CopperLogo kind="wordmark" label="NAQSH" priority className="block w-[115px]" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex items-center justify-center w-11 h-11 rounded-full border border-[var(--ivory)]/60 text-[var(--ivory)] hover:border-[var(--ivory)] transition-colors"
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
                  className="group flex items-center justify-between font-serif text-3xl sm:text-4xl text-[var(--text-strong)] hover:text-[var(--chestnut)] transition-colors duration-200 py-2 min-h-[48px]"
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-sans font-semibold tabular-nums text-[var(--pine)] tracking-[0.16em]">
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
              onClick={onClose}
              external
              variant="secondary"
              className="w-full justify-center"
              showArrow={false}
            >
              WhatsApp Us
            </Button>
          </div>

          {/* Location | copper 3D emblem | phone, on one line (client request 2026-11-20), on a black
              strip that mirrors the black top bar: the copper art is made for dark grounds. The
              emblem has a fixed height so it can never grow over the text beside it. */}
          <div className="-mx-6 -mb-6 sm:-mx-10 sm:-mb-10 !mt-8 px-6 sm:px-10 py-5 grid grid-cols-[1fr_auto_1fr] items-center gap-4 bg-[var(--black)] font-sans text-xs text-[var(--ivory)]/85">
            <span className="whitespace-nowrap">{siteConfig.location}</span>
            <CopperLogo kind="emblem" label="" className="block h-14 w-auto" />
            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              className="justify-self-end whitespace-nowrap underline-offset-4 hover:underline hover:text-[var(--ivory)]"
            >
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </div>
    </dialog>
  );
}
