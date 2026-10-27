import Link from "next/link";
import { siteConfig } from "@/content/site";
import { Wordmark, Emblem } from "@/components/brand/Logo";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[var(--black)] text-[var(--ivory)] relative overflow-hidden pt-20 pb-12 border-t border-[var(--hairline-dark)] lattice on-dark"
      role="contentinfo"
    >
      <div className="footer-giant-wordmark" aria-hidden="true"><Wordmark variant="copper-gradient" className="w-full" /></div>
      <div className="container-x relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[var(--hairline-dark)]">
          {/* Brand Column */}
          <div className="md:col-span-5 lg:col-span-6 space-y-6">
            <div className="flex items-center gap-4">
              <Emblem variant="ivory" className="w-8 sm:w-10 opacity-90" />
              <Wordmark variant="copper-gradient" className="w-36 sm:w-44" />
            </div>
            <p className="text-[var(--khaki)] text-base sm:text-lg max-w-md font-light leading-relaxed">
              {siteConfig.tagline}. Curating and customizing bespoke corporate gifting
              experiences for businesses, from idea to doorstep.
            </p>
            <p className="t-label text-xs text-[var(--khaki)] tracking-widest opacity-80">
              {siteConfig.slogan}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 lg:col-span-3 space-y-4">
            <span className="t-label text-xs text-[var(--khaki)] block mb-2">
              Navigation
            </span>
            <ul className="space-y-2.5">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--ivory)] hover:text-[var(--khaki)] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 lg:col-span-3 space-y-4">
            <span className="t-label text-xs text-[var(--khaki)] block mb-2">
              Direct Channels
            </span>
            <div className="space-y-3 text-sm text-[var(--ivory)]">
              <p className="flex flex-col">
                <span className="text-xs text-[var(--khaki)]">Phone / WhatsApp</span>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--khaki)] transition-colors mt-0.5 inline-block"
                >
                  {siteConfig.phone}
                </a>
              </p>
              <p className="flex flex-col">
                <span className="text-xs text-[var(--khaki)]">Location</span>
                <span className="text-[var(--ivory)] mt-0.5">{siteConfig.location}</span>
              </p>
              {siteConfig.email && (
                <p className="flex flex-col">
                  <span className="text-xs text-[var(--khaki)]">Email</span>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="hover:text-[var(--khaki)] transition-colors mt-0.5"
                  >
                    {siteConfig.email}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Policies and Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--khaki)]">
          <p>© {currentYear} Naqsh. All rights reserved.</p>

          <div className="flex items-center gap-6">
            {siteConfig.policies.map((policy) => (
              <Link
                key={policy.href}
                href={policy.href}
                className="hover:text-[var(--ivory)] transition-colors duration-200"
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
