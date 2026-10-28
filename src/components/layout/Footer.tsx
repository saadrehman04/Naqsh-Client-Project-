import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Wordmark } from "@/components/brand/Logo";
import { getWhatsAppUrl } from "@/lib/whatsapp";

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
      <path d="M12.04 2C6.52 2 2.03 6.48 2.02 12c0 1.76.46 3.47 1.34 4.98L2 22l5.16-1.35A10 10 0 1 0 12.04 2Zm0 18.18c-1.5 0-2.97-.4-4.25-1.17l-.3-.18-3.06.8.82-2.98-.2-.31A8.17 8.17 0 1 1 12.04 20.18Zm4.49-6.12c-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.56.13-.17.25-.65.81-.8.98-.15.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.66-1.25-1.48-1.4-1.73-.15-.25-.02-.39.11-.52.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09s.9 2.42 1.02 2.59c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.42 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.48-.61 1.69-1.2.21-.59.21-1.1.15-1.2-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

const wordmarkSlices = [
  "inset(0 83% 0 0%)",
  "inset(0 60% 0 17%)",
  "inset(0 33% 0 40%)",
  "inset(0 19% 0 67%)",
  "inset(0 0% 0 81%)",
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer on-dark" role="contentinfo">
      <div className="footer-parallax-inner">
        <div
          className="footer-giant-wordmark"
          aria-hidden="true"
        >
          <div className="footer-wordmark-stage">
            {wordmarkSlices.map((clip, idx) => (
              <span
                key={idx}
                className="footer-wordmark-letter"
                style={{ clipPath: clip }}
                data-footer-letter
              >
                <Wordmark variant="copper-gradient" className="w-full" />
              </span>
            ))}
          </div>
        </div>

        <div className="container-x relative z-10">
          <div className="footer-invitation">
            <div className="footer-invitation-copy">
              <span className="footer-kicker">
                <span className="footer-kicker-gem">◆</span> A thoughtful place to start
              </span>
              <h2>
                What moment are you making <em>meaningful?</em>
              </h2>
            </div>
            <Link
              href="/contact"
              data-magnetic
              className="footer-invitation-link"
            >
              <span>Plan a gift</span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <div className="footer-grid">
            <div className="footer-brand">
              <Link href="/" aria-label="Naqsh home" className="footer-logo-link">
                <Wordmark variant="copper-gradient" className="w-44" />
              </Link>
              <p className="footer-brand-desc">
                Corporate gifting, considered from concept to doorstep. Curated for distinguished brands and memorable milestones.
              </p>
              <div className="footer-slogan-wrap">
                <span className="footer-slogan-badge">
                  <span className="footer-slogan-dot" aria-hidden="true" />
                  Beyond the box, into an experience
                </span>
              </div>
            </div>

            <nav className="footer-column" aria-label="Footer navigation">
              <h3 className="footer-col-title">
                <span>Explore</span>
                <span className="footer-col-line" aria-hidden="true" />
              </h3>
              <ul className="footer-nav-list">
                {siteConfig.nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="footer-nav-link">
                      <span className="footer-nav-marker" aria-hidden="true">―</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="footer-column footer-contact">
              <h3 className="footer-col-title">
                <span>Concierge</span>
                <span className="footer-col-line" aria-hidden="true" />
              </h3>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-whatsapp-card"
              >
                <span className="footer-whatsapp-icon">
                  <WhatsAppGlyph />
                </span>
                <div className="footer-whatsapp-details">
                  <small className="footer-whatsapp-meta">
                    <span className="footer-online-dot" aria-hidden="true" />
                    Direct Concierge · WhatsApp
                  </small>
                  <strong className="footer-whatsapp-number">{siteConfig.phone}</strong>
                </div>
                <span className="footer-whatsapp-arrow" aria-hidden="true">
                  <ArrowUpRight size={16} />
                </span>
              </a>
              <div className="footer-location-block">
                <div className="footer-location-icon" aria-hidden="true">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="footer-location-city">{siteConfig.location}</p>
                  <span className="footer-location-sub">Bespoke client consultations nationwide</span>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {currentYear} Naqsh. All rights reserved. Quiet luxury corporate gifting.</p>
            <div className="footer-policies">
              {siteConfig.policies.map((policy) => (
                <Link key={policy.href} href={policy.href} className="footer-policy-link">
                  {policy.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
