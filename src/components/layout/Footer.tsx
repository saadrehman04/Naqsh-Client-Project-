import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { siteConfig, type SocialLink } from "@/content/site";
import { getWhatsAppUrl, DISPLAY_PHONE, WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { Confirm } from "@/components/ui/Confirm";

const isDev = process.env.NODE_ENV === "development";

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4" fill="currentColor">
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
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[17px] h-[17px]" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

const socialGlyph: Record<SocialLink["platform"], () => ReactNode> = {
  Instagram: InstagramGlyph,
  LinkedIn: LinkedInGlyph,
};

const iconBox =
  "w-10 h-10 shrink-0 rounded-full border border-[var(--hairline-dark)] flex items-center justify-center text-[var(--khaki)] transition-colors duration-200";

const headingClass =
  "text-xs font-sans font-semibold tracking-[0.16em] uppercase text-[var(--khaki)] mb-5";

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
      <span className={`${iconBox} group-hover:border-[var(--khaki)] group-hover:text-[var(--ivory)]`}>
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] uppercase tracking-[0.14em] text-[var(--ivory)]/60">
          {label}
        </span>
        <span className="block text-sm text-[var(--ivory)] break-words">{value}</span>
      </span>
    </>
  );

  if (!href) {
    return <div className="flex items-center gap-3.5">{inner}</div>;
  }

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-center gap-3.5 min-h-[44px]"
    >
      {inner}
    </a>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { footer, policies, socials, email } = siteConfig;
  const visibleSocials = socials.filter((s) => s.url || isDev);
  const whatsappUrl = getWhatsAppUrl(
    "Hello NAQSH, I would like to consult on a corporate gifting requirement."
  );

  return (
    <footer className="site-footer bg-[var(--black)] text-[var(--ivory)]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 pt-14 sm:pt-20 pb-28 md:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
          {/* Brand + social */}
          <div>
            <Link href="/" aria-label="NAQSH home" className="inline-block">
              <Image
                src="/brand/emblem-copper-gradient.svg"
                alt="NAQSH"
                width={2120}
                height={3958}
                className="h-20 w-auto"
              />
            </Link>

            {visibleSocials.length > 0 && (
              <ul className="mt-8 flex flex-col gap-3 font-sans" aria-label="Social media">
                {visibleSocials.map((social) => {
                  const Glyph = socialGlyph[social.platform];
                  const content = (
                    <>
                      <span className={`${iconBox} group-hover:border-[var(--khaki)] group-hover:text-[var(--ivory)]`}>
                        <Glyph />
                      </span>
                      <span className="text-sm text-[var(--ivory)]/85 group-hover:text-[var(--ivory)] transition-colors">
                        {social.platform}
                      </span>
                    </>
                  );
                  return (
                    <li key={social.platform}>
                      {social.url ? (
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-3.5 min-h-[44px]"
                        >
                          {content}
                        </a>
                      ) : (
                        <span className="group inline-flex items-center gap-3.5 min-h-[44px]">
                          {content}
                          <Confirm label={`${social.platform} URL`} />
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Policies */}
          <nav aria-labelledby="footer-policies-heading" className="md:justify-self-center">
            <h2 id="footer-policies-heading" className={headingClass}>
              {footer.policiesHeading}
            </h2>
            <ul className="flex flex-col gap-1 font-sans text-sm">
              {policies.map((policy) => (
                <li key={policy.href}>
                  <Link
                    href={policy.href}
                    className="inline-flex items-center min-h-[40px] text-[var(--ivory)]/85 hover:text-[var(--ivory)] underline-offset-4 hover:underline transition-colors"
                  >
                    {policy.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:justify-self-end">
            <h2 className={headingClass}>{footer.contactHeading}</h2>
            <div className="flex flex-col gap-3 font-sans">
              <ContactRow
                href={`tel:+${WHATSAPP_NUMBER}`}
                icon={<Phone className="w-4 h-4" aria-hidden="true" />}
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
                  icon={<Mail className="w-4 h-4" aria-hidden="true" />}
                  label="Email"
                  value={email ?? <Confirm label="email address" />}
                />
              )}
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-14 sm:mt-16 pt-6 border-t border-[var(--hairline-dark)] flex flex-col md:flex-row md:items-center justify-between gap-3 font-sans text-xs text-[var(--ivory)]/65">
          <p>
            © {currentYear} {footer.copyright}
            <span className="hidden sm:inline">
              <span className="mx-2 text-[var(--ivory)]/30" aria-hidden="true">|</span>
              {footer.tagline}
            </span>
          </p>
          <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--khaki)]">
            {footer.craftedLine}
          </p>
        </div>
      </div>
    </footer>
  );
}
