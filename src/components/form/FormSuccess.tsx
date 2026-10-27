"use client";

import { WaxSeal } from "@/components/brand/WaxSeal";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

interface FormSuccessProps {
  onReset?: () => void;
  clientName?: string;
}

export function FormSuccess({ onReset, clientName }: FormSuccessProps) {
  const whatsappUrl = getWhatsAppUrl(
    "Hello Naqsh, I just submitted an inquiry on your website and would also like to connect directly on WhatsApp."
  );

  return (
    <div
      className="bg-[var(--ivory-warm)] border border-[var(--border-light)] rounded-[var(--radius-card)] p-8 sm:p-12 text-center shadow-lg"
      data-reveal="fade-up"
    >
      {/* Animated tactile wax seal stamp */}
      <div className="flex justify-center mb-6">
        <WaxSeal size="lg" variant="terracotta" animate={true} />
      </div>

      <span className="inline-block text-xs font-sans tracking-[0.18em] uppercase font-semibold text-[var(--terracotta)] mb-2">
        Inquiry Received
      </span>

      <h3 className="font-serif text-3xl sm:text-4xl text-[var(--black)] font-normal tracking-tight mb-4">
        Thank You{clientName ? `, ${clientName}` : ""}
      </h3>

      <p className="font-sans text-base sm:text-lg text-[var(--pine)] font-light leading-relaxed max-w-lg mx-auto mb-8">
        Your inquiry has been received. If you prefer, you can also contact Naqsh on WhatsApp.
      </p>

      {/* Secondary quick action */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-[var(--border-light)]">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--pine)] hover:bg-[var(--black)] text-[var(--ivory)] font-sans text-xs tracking-[0.14em] uppercase font-medium transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-[var(--copper)]" />
          <span>Connect via WhatsApp Now</span>
        </a>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--ivory)] hover:bg-[var(--ivory-deep)] text-[var(--black)] border border-[var(--border-light)] font-sans text-xs tracking-[0.14em] uppercase font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Submit Another Brief</span>
          </button>
        )}
      </div>
    </div>
  );
}
