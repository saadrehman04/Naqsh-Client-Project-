import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Phone, Mail, MapPin, Sparkles, Clock, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/content/site";
import { getWhatsAppUrl, DISPLAY_PHONE } from "@/lib/whatsapp";

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5" fill="currentColor">
      <path d="M12.04 2C6.52 2 2.03 6.48 2.02 12c0 1.76.46 3.47 1.34 4.98L2 22l5.16-1.35A10 10 0 1 0 12.04 2Zm0 18.18c-1.5 0-2.97-.4-4.25-1.17l-.3-.18-3.06.8.82-2.98-.2-.31A8.17 8.17 0 1 1 12.04 20.18Zm4.49-6.12c-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.56.13-.17.25-.65.81-.8.98-.15.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.66-1.25-1.48-1.4-1.73-.15-.25-.02-.39.11-.52.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09s.9 2.42 1.02 2.59c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.42 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.48-.61 1.69-1.2.21-.59.21-1.1.15-1.2-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedInGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78Z" />
    </svg>
  );
}

const collectionsList = [
  { label: "New Hire Welcome Kits", href: "/portfolio/new-hire-welcome-kits" },
  { label: "Client Packages & VIP Suites", href: "/portfolio/client-packages" },
  { label: "Ramadan & Eid Baskets", href: "/portfolio/ramadan-eid-baskets" },
  { label: "Annual Event Giveaways", href: "/portfolio/annual-event-giveaways" },
  { label: "Brand Souvenirs & Merchandise", href: "/portfolio/brand-souvenirs" },
  { label: "Appreciation & Milestone Awards", href: "/portfolio/appreciation-gifts" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = getWhatsAppUrl(
    "Hello Naqsh Concierge, I would like to consult on a bespoke corporate gifting requirement."
  );

  return (
    <footer className="site-footer relative z-10 bg-[var(--ivory)] pt-4 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8" role="contentinfo">
      <div className="max-w-[1400px] mx-auto">
        {/* Floating Luxury Island Container (Schmidt & Arclyn Studio reference) */}
        <div className="footer-island relative rounded-[28px] sm:rounded-[38px] lg:rounded-[46px] bg-[#0E0C0A] border-[2px] border-[#2A231D] text-[var(--ivory)] overflow-hidden shadow-[0_36px_100px_-24px_rgba(14,12,10,0.65),0_16px_36px_-8px_rgba(14,12,10,0.35)]">

          {/* Layer 1: Radiant Bottom Sunrise Glow (Schmidt reference - luminous warm amber bloom) */}
          <div
            className="footer-sunrise-glow absolute inset-x-0 bottom-0 h-[500px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 95% 72% at 50% 100%, rgba(215, 120, 65, 0.46) 0%, rgba(140, 56, 38, 0.3) 38%, rgba(20, 82, 64, 0.12) 65%, transparent 85%)",
            }}
            aria-hidden="true"
          />

          {/* Layer 2: Top-left subtle warm ambient illumination (Redsun reference) */}
          <div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(171, 108, 73, 0.18) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          {/* Layer 3: Cultural diamond lattice watermark */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: "url('/brand/diamond-lattice.svg')",
              backgroundSize: "160px 160px",
            }}
            aria-hidden="true"
          />

          {/* MAIN EDITORIAL FOUR-COLUMN GRID (Upper invitation removed per request) */}
          <div className="footer-content-grid relative z-10 px-6 sm:px-10 lg:px-16 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
              
              {/* Column 1: Brand & Curation Statement (4 cols) */}
              <div className="lg:col-span-4 flex flex-col justify-between">
                <div>
                  <Link href="/" aria-label="Naqsh Home" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-xl bg-[var(--pine)] text-[var(--ivory)] flex items-center justify-center font-serif text-lg font-bold border border-[#2D7A62] shadow-sm group-hover:scale-105 transition-transform duration-200">
                      ن
                    </div>
                    <div className="relative w-36 h-7">
                      <Image
                        src="/brand/wordmark-gold-gradient.svg"
                        alt="Naqsh"
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                  </Link>

                  <p className="mt-4 text-sm font-sans text-[var(--ivory)]/75 leading-relaxed max-w-sm">
                    Corporate gifting, considered from concept to doorstep. Refined packages hand-finished in Lahore, delivered across Pakistan and worldwide.
                  </p>

                  <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-[var(--copper)]/30 text-xs font-sans text-[var(--khaki)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--copper)]" />
                    <span>Beyond the box, into an experience</span>
                  </div>
                </div>

                {/* Direct Concierge Badge */}
                <div className="mt-8 pt-6 border-t border-white/[0.08] space-y-2.5 text-xs font-sans text-[var(--ivory)]/70">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-3.5 h-3.5 text-[var(--copper-light)] shrink-0" />
                    <span>Lahore, Pakistan · Nationwide Delivery</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-3.5 h-3.5 text-[var(--copper-light)] shrink-0" />
                    <span>24-Hour Custom Proposal Turnaround</span>
                  </div>
                </div>
              </div>

              {/* Column 2: Curated Collections (3 cols) */}
              <div className="lg:col-span-3">
                <h3 className="flex items-center gap-2 text-xs font-sans font-semibold tracking-[0.16em] uppercase text-[var(--copper-light)] mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--copper)]" />
                  <span>Curated Collections</span>
                </h3>
                <ul className="space-y-1 font-sans text-sm text-[var(--ivory)]/80">
                  {collectionsList.map((col) => (
                    <li key={col.href}>
                      <Link
                        href={col.href}
                        className="group flex items-center justify-between hover:text-[var(--ivory)] transition-colors duration-200 min-h-[44px] py-2"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {col.label}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[var(--copper)] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Explore & Studio (2 cols) */}
              <div className="lg:col-span-2">
                <h3 className="flex items-center gap-2 text-xs font-sans font-semibold tracking-[0.16em] uppercase text-[var(--copper-light)] mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--copper)]" />
                  <span>Explore</span>
                </h3>
                <ul className="space-y-1 font-sans text-sm text-[var(--ivory)]/80">
                  {siteConfig.nav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group flex items-center justify-between hover:text-[var(--ivory)] transition-colors duration-200 min-h-[44px] py-2"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {item.label}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[var(--copper)] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 4: Direct Desk & Social Channels (3 cols) */}
              <div className="lg:col-span-3">
                <h3 className="flex items-center gap-2 text-xs font-sans font-semibold tracking-[0.16em] uppercase text-[var(--copper-light)] mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--copper)]" />
                  <span>Concierge Desk</span>
                </h3>

                {/* Consultation CTA Pill */}
                <Link
                  href="/contact"
                  data-magnetic
                  className="group flex items-center justify-between p-3.5 px-4 mb-3 rounded-2xl bg-[#FAF6EF] hover:bg-white text-[#120F0D] font-sans text-xs tracking-[0.14em] uppercase font-bold shadow-[0_4px_16px_rgba(247,241,231,0.12)] transition-all duration-300 hover:scale-[1.02]"
                >
                  <span>Request Consultation</span>
                  <ArrowUpRight className="w-4 h-4 text-[var(--chestnut)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                {/* Direct WhatsApp Interactive Card */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.09] hover:border-[var(--copper)]/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--pine)] flex items-center justify-center text-[var(--ivory)] shadow-md group-hover:scale-105 transition-transform duration-200 shrink-0">
                      <WhatsAppGlyph />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-sans text-[var(--khaki)] uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                        <span>Live WhatsApp</span>
                      </div>
                      <div className="text-sm font-semibold font-sans text-[var(--ivory)] tracking-wide mt-0.5">
                        {DISPLAY_PHONE}
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[var(--copper-light)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 shrink-0" />
                  </div>
                </a>

                {/* Direct Phone & Hotline */}
                <div className="mt-3.5 space-y-2 font-sans text-xs text-[var(--ivory)]/75">
                  <a
                    href={`tel:${DISPLAY_PHONE.replace(/[^0-9+]/g, "")}`}
                    className="flex items-center gap-2.5 px-3 py-2.5 min-h-[44px] rounded-lg hover:bg-white/[0.04] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[var(--copper-light)]" />
                    <span>Direct: {DISPLAY_PHONE}</span>
                  </a>
                </div>

                {/* Social Channels Strip */}
                <div className="mt-5 pt-4 border-t border-white/[0.08]">
                  <div className="text-[11px] font-sans tracking-[0.14em] uppercase text-[var(--khaki)]/80 mb-3">
                    Follow Our Lookbook
                  </div>
                  <div className="flex items-center gap-2.5">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-[44px] rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] hover:border-[var(--copper)]/40 text-xs font-sans text-[var(--ivory)]/85 transition-all duration-200"
                    >
                      <InstagramGlyph />
                      <span>Instagram</span>
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-[44px] rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] hover:border-[var(--copper)]/40 text-xs font-sans text-[var(--ivory)]/85 transition-all duration-200"
                    >
                      <LinkedInGlyph />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* GIANT HORIZON TYPOGRAPHY (Schmidt + Arclyn Studio reference) */}
          <div
            className="footer-giant-wordmark-wrap relative z-10 pt-4 sm:pt-6 pb-2 sm:pb-4 overflow-hidden flex flex-col items-center justify-center select-none pointer-events-none"
            aria-hidden="true"
          >
            <div className="footer-giant-wordmark w-full text-center tracking-[0.16em] font-serif font-black uppercase text-[15vw] sm:text-[16vw] lg:text-[17vw] leading-[0.8] select-none">
              <span
                className="inline-block bg-gradient-to-b from-[#F7F1E7]/25 via-[#DF8E57]/80 to-[#F0A06E] bg-clip-text text-transparent drop-shadow-[0_8px_40px_rgba(205,115,62,0.45)]"
                style={{
                  WebkitTextStroke: "1px rgba(247,241,231,0.12)",
                }}
              >
                NAQSH
              </span>
            </div>
          </div>

        </div>

        {/* SUB-FOOTER OUTSIDE THE CARD (Clean Arclyn Studio & Schmidt style) */}
        <div className="mt-5 px-3 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[var(--charcoal)]/80">
          <div className="flex items-center gap-2">
            <span>© {currentYear} Naqsh. All rights reserved.</span>
            <span className="text-[var(--charcoal)]/30 hidden sm:inline">|</span>
            <span className="hidden sm:inline">Quiet Luxury Corporate Gifting</span>
          </div>

          <div className="text-center text-[11px] text-[var(--chestnut)]/90 tracking-wider uppercase font-medium">
            Handcrafted in Lahore, Pakistan · Global Delivery
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
