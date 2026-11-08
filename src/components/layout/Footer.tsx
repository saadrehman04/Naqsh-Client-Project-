import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/content/site";
import { getWhatsAppUrl, DISPLAY_PHONE } from "@/lib/whatsapp";

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5" fill="currentColor">
      <path d="M12.04 2C6.52 2 2.03 6.48 2.02 12c0 1.76.46 3.47 1.34 4.98L2 22l5.16-1.35A10 10 0 1 0 12.04 2Zm0 18.18c-1.5 0-2.97-.4-4.25-1.17l-.3-.18-3.06.8.82-2.98-.2-.31A8.17 8.17 0 1 1 12.04 20.18Zm4.49-6.12c-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.56.13-.17.25-.65.81-.8.98-.15.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.66-1.25-1.48-1.4-1.73-.15-.25-.02-.39.11-.52.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09s.9 2.42 1.02 2.59c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.42 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.48-.61 1.69-1.2.21-.59.21-1.1.15-1.2-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

const collectionsList = [
  { label: "Employee Welcome Kits", href: "/portfolio/new-hire-welcome-kits" },
  { label: "Client Packages", href: "/portfolio/client-packages" },
  { label: "Ramadan & Eid Baskets", href: "/portfolio/ramadan-eid-baskets" },
  { label: "Appreciation Gifts", href: "/portfolio/appreciation-gifts" },
  { label: "Bespoke & Occasion Gifting", href: "/portfolio/custom-occasion-gifts" },
  { label: "Annual Event Giveaways", href: "/portfolio/annual-event-giveaways" },
  { label: "Brand Souvenirs", href: "/portfolio/brand-souvenirs" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = getWhatsAppUrl(
    "Hello NAQSH Concierge, I would like to consult on a bespoke corporate gifting requirement."
  );

  return (
    <footer
      className="site-footer relative z-10 bg-[var(--ivory)] pt-4 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8"
      role="contentinfo"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Floating Luxury Island Container */}
        <div className="footer-island relative rounded-[28px] sm:rounded-[38px] lg:rounded-[46px] bg-[#0E0C0A] border-[2px] border-[#2A231D] text-[var(--ivory)] overflow-hidden shadow-[0_36px_100px_-24px_rgba(14,12,10,0.65),0_16px_36px_-8px_rgba(14,12,10,0.35)]">
          {/* Layer 1: Radiant Bottom Sunrise Glow */}
          <div
            className="footer-sunrise-glow absolute inset-x-0 bottom-0 h-[500px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 95% 72% at 50% 100%, rgba(201, 154, 83, 0.42) 0%, rgba(140, 56, 38, 0.28) 38%, rgba(16, 29, 25, 0.16) 65%, transparent 85%)",
            }}
            aria-hidden="true"
          />

          {/* Layer 2: Top-left subtle warm ambient illumination */}
          <div
            className="footer-top-glow absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(201, 154, 83, 0.18) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          {/* Layer 3: Cultural diamond lattice watermark */}
          <div
            className="footer-lattice-layer absolute -inset-y-16 inset-x-0 opacity-[0.045] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: "url('/brand/diamond-lattice.svg')",
              backgroundSize: "160px 160px",
            }}
            aria-hidden="true"
          />

          {/* MAIN EDITORIAL FOUR-COLUMN GRID */}
          <div className="footer-content-grid relative z-10 px-5 sm:px-10 lg:px-16 pt-10 sm:pt-16 lg:pt-20 pb-10 sm:pb-16">
            <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-8 lg:gap-8 items-start">
              {/* Column 1: Brand (4 cols) */}
              <div
                className="col-span-2 lg:col-span-4 flex flex-col justify-between"
                data-footer-col="0"
              >
                <div>
                  <Link
                    href="/"
                    aria-label="NAQSH Home"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#101D19] text-[var(--ivory)] flex items-center justify-center font-serif text-lg font-bold border border-[#C99A53]/40 shadow-sm group-hover:scale-105 transition-transform duration-200">
                      ن
                    </div>
                    <div className="relative w-36 h-7">
                      <Image
                        src="/brand/wordmark-gold-gradient.svg"
                        alt="NAQSH"
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                  </Link>

                  <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-sans text-[var(--ivory)]/80 leading-relaxed max-w-sm">
                    Premium corporate gifting—curated, personalized, and delivered across Pakistan.
                  </p>

                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-[#C99A53]/30 text-xs font-sans text-[#D6C8B3]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C99A53]" />
                    <span>Crafting Lasting Impressions</span>
                  </div>
                </div>

                {/* Verified Social Links (only rendered if configured) */}
                {siteConfig.socials.length > 0 && (
                  <div className="mt-5 flex items-center gap-2.5">
                    {siteConfig.socials.map((soc) => (
                      <a
                        key={soc.platform}
                        href={soc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-sans text-[var(--ivory)]/85 transition-colors"
                      >
                        <span>{soc.platform}</span>
                      </a>
                    ))}
                  </div>
                )}

                <div className="hidden sm:block mt-6 pt-5 border-t border-white/[0.08] space-y-2 text-xs font-sans text-[var(--ivory)]/75">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C99A53] shrink-0" aria-hidden="true" />
                    <span>Lahore, Pakistan · Nationwide Corporate Delivery</span>
                  </div>
                </div>
              </div>

              {/* Column 2: Explore (1 col on mobile, 2 cols on desktop) */}
              <div className="col-span-1 lg:col-span-2" data-footer-col="1">
                <h3 className="flex items-center gap-2 text-[11px] sm:text-xs font-sans font-semibold tracking-[0.16em] uppercase text-[#C99A53] mb-3 sm:mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C99A53]" />
                  <span>Explore</span>
                </h3>
                <ul className="space-y-0.5 sm:space-y-1 font-sans text-xs sm:text-sm text-[var(--ivory)]/80">
                  {siteConfig.nav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group flex items-center justify-between hover:text-[var(--ivory)] transition-colors duration-200 min-h-[34px] sm:min-h-[40px] py-1 sm:py-1.5"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {item.label}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#C99A53] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Collections (1 col on mobile, 3 cols on desktop) */}
              <div className="col-span-1 lg:col-span-3" data-footer-col="2">
                <h3 className="flex items-center gap-2 text-[11px] sm:text-xs font-sans font-semibold tracking-[0.16em] uppercase text-[#C99A53] mb-3 sm:mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C99A53]" />
                  <span>Collections</span>
                </h3>
                <ul className="space-y-0.5 sm:space-y-1 font-sans text-xs sm:text-sm text-[var(--ivory)]/80">
                  {collectionsList.map((col) => (
                    <li key={col.href}>
                      <Link
                        href={col.href}
                        className="group flex items-center justify-between hover:text-[var(--ivory)] transition-colors duration-200 min-h-[34px] sm:min-h-[40px] py-1 sm:py-1.5"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {col.label}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#C99A53] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 4: Contact (2 cols on mobile, 3 cols on desktop) */}
              <div className="col-span-2 lg:col-span-3" data-footer-col="3">
                <h3 className="flex items-center gap-2 text-[11px] sm:text-xs font-sans font-semibold tracking-[0.16em] uppercase text-[#C99A53] mb-3 sm:mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C99A53]" />
                  <span>Contact</span>
                </h3>

                {/* Consultation CTA Pill */}
                <Link
                  href="/contact"
                  data-magnetic
                  className="group flex items-center justify-between p-3.5 px-4 mb-3 rounded-2xl bg-gradient-to-r from-[#F0B87A] via-[#C99A53] to-[#B86C35] text-[#101010] font-sans text-xs tracking-[0.14em] uppercase font-bold shadow-[0_4px_16px_rgba(201,154,83,0.2)] transition-all duration-300 hover:scale-[1.02]"
                >
                  <span>Request Consultation</span>
                  <ArrowUpRight className="w-4 h-4 text-[#101010] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                {/* Direct WhatsApp Card */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.09] hover:border-[#C99A53]/45 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#101D19] border border-[#C99A53]/40 flex items-center justify-center text-[#C99A53] shadow-md group-hover:scale-105 transition-transform duration-200 shrink-0">
                      <WhatsAppGlyph />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-sans text-[#D6C8B3] uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                        <span>WhatsApp Concierge</span>
                      </div>
                      <div className="text-sm font-semibold font-sans text-[var(--ivory)] tracking-wide mt-0.5">
                        {DISPLAY_PHONE}
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#C99A53] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 shrink-0" />
                  </div>
                </a>

                {/* Direct Phone & Location */}
                <div className="mt-3.5 space-y-1.5 font-sans text-xs text-[var(--ivory)]/80">
                  <a
                    href={`tel:${DISPLAY_PHONE.replace(/[^0-9+]/g, "")}`}
                    className="flex items-center gap-2.5 px-3 py-2.5 min-h-[44px] rounded-lg hover:bg-white/[0.04] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C99A53]" aria-hidden="true" />
                    <span>Phone: {DISPLAY_PHONE}</span>
                  </a>
                  <div className="flex items-center gap-2.5 px-3 py-2 text-[var(--ivory)]/70">
                    <MapPin className="w-3.5 h-3.5 text-[#C99A53] shrink-0" aria-hidden="true" />
                    <span>Location: {siteConfig.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* GIANT HORIZON TYPOGRAPHY */}
          <div
            className="footer-giant-wordmark-wrap relative z-10 pt-4 sm:pt-6 pb-2 sm:pb-4 overflow-hidden flex flex-col items-center justify-center select-none pointer-events-none"
            aria-hidden="true"
          >
            <div className="footer-giant-wordmark w-full text-center tracking-[0.16em] font-serif font-black uppercase text-[15vw] sm:text-[16vw] lg:text-[17vw] leading-[0.8] select-none flex items-center justify-center gap-[0.04em]">
              {["N", "A", "Q", "S", "H"].map((letter, idx) => (
                <span
                  key={idx}
                  data-footer-char={idx}
                  className="footer-wordmark-char inline-block bg-gradient-to-b from-[#F7F1E7]/30 via-[#C99A53]/85 to-[#DF8E57] bg-clip-text text-transparent drop-shadow-[0_8px_40px_rgba(201,154,83,0.45)]"
                  style={{
                    WebkitTextStroke: "1px rgba(247,241,231,0.14)",
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SUB-FOOTER OUTSIDE THE CARD */}
        <div className="footer-subbar mt-5 px-3 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[var(--charcoal)]/80">
          <div className="flex items-center gap-2">
            <span>© {currentYear} NAQSH. All rights reserved.</span>
            <span className="text-[var(--charcoal)]/30 hidden sm:inline">|</span>
            <span className="hidden sm:inline">Crafting Lasting Impressions</span>
          </div>

          <div className="text-center text-[11px] text-[var(--chestnut)]/90 tracking-wider uppercase font-medium">
            Handcrafted in Lahore, Pakistan · Nationwide Corporate Gifting
          </div>

          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            {siteConfig.policies.map((policy) => (
              <Link
                key={policy.href}
                href={policy.href}
                className="hover:text-[var(--black)] transition-colors duration-200"
              >
                {policy.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
