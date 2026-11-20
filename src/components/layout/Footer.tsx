import Link from "next/link";
import { CopperLogo } from "@/components/brand/Logo";
import { Mail, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { siteConfig, type SocialLink } from "@/content/site";
import { getWhatsAppUrl, DISPLAY_PHONE, WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { Confirm } from "@/components/ui/Confirm";

const isDev = process.env.NODE_ENV === "development";

function WhatsAppGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-[18px]"
      fill="currentColor"
    >
      <path d="M12.04 2C6.52 2 2.03 6.48 2.02 12c0 1.76.46 3.47 1.34 4.98L2 22l5.16-1.35A10 10 0 1 0 12.04 2Zm0 18.18c-1.5 0-2.97-.4-4.25-1.17l-.3-.18-3.06.8.82-2.98-.2-.31A8.17 8.17 0 1 1 12.04 20.18Zm4.49-6.12c-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.56.13-.17.25-.65.81-.8.98-.15.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.66-1.25-1.48-1.4-1.73-.15-.25-.02-.39.11-.52.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09s.9 2.42 1.02 2.59c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.42 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.48-.61 1.69-1.2.21-.59.21-1.1.15-1.2-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

function InstagramGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="w-[18px] h-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="w-[17px] h-[17px]"
      fill="currentColor"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

const socialGlyph: Record<SocialLink["platform"], () => ReactNode> = {
  Instagram: InstagramGlyph,
  LinkedIn: LinkedInGlyph,
};

/* Client footer design (2026-11-20): headings and icons in the logo's copper (--copper-logo,
   4.7:1 on black), bare icons without circles, social links as copper-gradient discs without labels. */
const headingClass =
  "text-xs font-sans font-semibold tracking-[0.18em] uppercase text-[var(--copper-logo)] mb-4";

/** One row height for the Discover and Get in Touch lists, so their lines sit side by side. */
const rowClass = "flex items-center min-h-[40px]";
const listClass = "flex flex-col gap-1 font-sans text-sm";
const linkText = "text-[var(--ivory)]/90 group-hover:text-[var(--ivory)] transition-colors";

interface ContactRowProps {
  href: string | null;
  icon: ReactNode;
  label: string;
  value: ReactNode;
  external?: boolean;
}

function ContactRow({ href, icon, label, value, external }: ContactRowProps) {
  const inner = (
    <>
      <span className="flex w-5 shrink-0 justify-center text-[var(--copper-logo)]">{icon}</span>
      {/* Icon + value only. The channel name stays for screen readers. */}
      <span className={`min-w-0 whitespace-nowrap ${linkText}`}>
        <span className="sr-only">{label}: </span>
        {value}
      </span>
    </>
  );

  return (
    <li>
      {href ? (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={`group gap-3.5 ${rowClass}`}
        >
          {inner}
        </a>
      ) : (
        <div className={`gap-3.5 ${rowClass}`}>{inner}</div>
      )}
    </li>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { footer, discover, socials, email } = siteConfig;
  const visibleSocials = socials.filter((s) => s.url || isDev);
  const whatsappUrl = getWhatsAppUrl(
    "Hello NAQSH, I would like to consult on a corporate gifting requirement.",
  );

  return (
    <footer className="site-footer bg-[var(--black)] text-[var(--ivory)]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 pt-12 sm:pt-16 pb-8">
        {/* Emblem | Discover | Get in Touch | Follow Us in four equal columns, so the headings
            start at equal intervals (client request 2026-11-20). The emblem cell stretches to the
            row, so the copper emblem runs from the first heading line to the last list line. */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-10 lg:gap-x-12 gap-y-10">
          {/* Brand */}
          <Link href="/" aria-label="NAQSH home" className="relative block min-h-[9rem]">
            <CopperLogo
              kind="emblem"
              label=""
              className="absolute inset-y-0 start-0 h-full w-auto max-w-full object-contain object-left"
            />
          </Link>

          {/* Discover */}
          <nav aria-labelledby="footer-discover-heading">
            <h2 id="footer-discover-heading" className={headingClass}>
              {footer.discoverHeading}
            </h2>
            <ul className={listClass}>
              {discover.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`group underline-offset-4 hover:underline ${rowClass} ${linkText}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Get in Touch (full width on phones so the number and email stay on one line) */}
          <div className="col-span-2 sm:col-span-1">
            <h2 id="footer-contact-heading" className={headingClass}>
              {footer.contactHeading}
            </h2>
            <ul className={listClass} aria-labelledby="footer-contact-heading">
              <ContactRow
                href={`tel:+${WHATSAPP_NUMBER}`}
                icon={<Phone className="size-[18px]" strokeWidth={1.6} aria-hidden="true" />}
                label="Call"
                value={DISPLAY_PHONE}
              />
              <ContactRow
                href={whatsappUrl}
                external
                icon={<WhatsAppGlyph />}
                label="WhatsApp"
                value={DISPLAY_PHONE}
              />
              {(email || isDev) && (
                <ContactRow
                  href={email ? `mailto:${email}` : null}
                  icon={<Mail className="size-[18px]" strokeWidth={1.6} aria-hidden="true" />}
                  label="Email"
                  value={email ?? <Confirm label="email address" />}
                />
              )}
            </ul>
          </div>

          {/* Follow Us (hidden until a profile URL exists, except as dev flags): icon discs only */}
          {visibleSocials.length > 0 && (
            <div>
              <h2 id="footer-follow-heading" className={headingClass}>
                {footer.followHeading}
              </h2>
              <ul className="flex flex-wrap items-center gap-3" aria-labelledby="footer-follow-heading">
                {visibleSocials.map((social) => {
                  const Glyph = socialGlyph[social.platform];
                  return (
                    <li key={social.platform} className="flex items-center gap-2">
                      {social.url ? (
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${social.platform} (opens in a new tab)`}
                          className="social-disc"
                        >
                          <Glyph />
                        </a>
                      ) : (
                        <>
                          <span className="social-disc" aria-label={social.platform} role="img">
                            <Glyph />
                          </span>
                          <Confirm label={`${social.platform} URL`} />
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom line: copyright (start), Lahore, Pakistan (end) */}
        <ul
          data-footer-bottom
          className="mt-10 sm:mt-12 pt-6 border-t border-[var(--hairline-dark)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-3 gap-x-6 font-sans text-[11px] uppercase tracking-[0.12em] text-[var(--ivory)]/65"
        >
          <li>© {currentYear} {footer.copyright}</li>
          <li>{footer.locationLine}</li>
        </ul>
      </div>
    </footer>
  );
}
