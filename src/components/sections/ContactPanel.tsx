import type { ReactNode } from "react";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { contactContent } from "@/content/contact";
import { siteConfig } from "@/content/site";
import { Confirm } from "@/components/ui/Confirm";
import { WHATSAPP_NUMBER, getWhatsAppUrl } from "@/lib/whatsapp";
import { formatPhone } from "@/lib/utils";

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" aria-hidden="true">
      <path d="M12.04 2C6.52 2 2.03 6.48 2.02 12c0 1.76.46 3.47 1.34 4.98L2 22l5.16-1.35A10 10 0 1 0 12.04 2Zm0 18.18c-1.5 0-2.97-.4-4.25-1.17l-.3-.18-3.06.8.82-2.98-.2-.31A8.17 8.17 0 1 1 12.04 20.18Zm4.49-6.12c-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.56.13-.17.25-.65.81-.8.98-.15.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.66-1.25-1.48-1.4-1.73-.15-.25-.02-.39.11-.52.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09s.9 2.42 1.02 2.59c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.42 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.48-.61 1.69-1.2.21-.59.21-1.1.15-1.2-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

interface ChannelCardProps {
  icon: ReactNode;
  /** Token background for the icon disc. */
  disc: string;
  label: string;
  children: ReactNode;
  href?: string;
  external?: boolean;
}

const labelClass =
  "block font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--chestnut)]";

function ChannelCard({ icon, disc, label, children, href, external }: ChannelCardProps) {
  const inner = (
    <>
      <span
        className={`flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-full text-[var(--ivory)] ${disc}`}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className={labelClass}>{label}</span>
        <span className="mt-1 block font-display text-[1.25rem] sm:text-[1.375rem] leading-tight text-[var(--black)] [overflow-wrap:anywhere]">
          {children}
        </span>
      </span>
    </>
  );
  const cls =
    "flex items-center gap-4 rounded-[var(--radius-card)] border border-[var(--hairline)] bg-[var(--ivory)] p-4 sm:p-5";
  return href ? (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${cls} transition-colors hover:border-[var(--terracotta)]`}
    >
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

/**
 * Contact page "Get in touch" panel (client design reference, Nov 2026): heading, intro and
 * channel cards beside a tall photo, then a full-width location card. Uses a container query
 * so the photo sits beside the cards only when the panel itself is wide enough.
 */
export function ContactPanel() {
  const c = contactContent.getInTouch;
  const phone = formatPhone(`+${WHATSAPP_NUMBER}`);

  return (
    <div className="@container rounded-[24px] border border-[var(--hairline)] bg-[color-mix(in_srgb,var(--ivory-deep)_55%,var(--ivory))] p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-6 @[34rem]:grid-cols-[1.05fr_1fr] @[34rem]:gap-5">
        <div className="flex flex-col">
          <div className="px-2 pt-3 sm:px-3">
            <span className={labelClass}>{c.label}</span>
            <h2 className="mt-4 font-display font-normal text-[length:clamp(2.25rem,3.4vw,3rem)] leading-[1.05] tracking-[-0.01em] text-[var(--black)] [text-wrap:balance]">
              {c.heading}
            </h2>
            <span className="mt-6 block h-0.5 w-12 bg-[var(--terracotta)]" aria-hidden="true" />
            <p className="mt-6 max-w-[26rem] font-sans text-[1.0625rem] leading-[1.65] text-[var(--charcoal)] [text-wrap:pretty]">
              {c.intro}
            </p>
          </div>

          <ul className="mt-8 flex flex-col gap-3">
            <li>
              <ChannelCard
                icon={<WhatsAppGlyph />}
                disc="bg-[var(--terracotta)]"
                label={c.whatsappLabel}
                href={getWhatsAppUrl(
                  "Hello NAQSH, I would like to schedule a corporate gifting consultation with your team."
                )}
                external
              >
                <span className="tabular-nums">{phone}</span>
              </ChannelCard>
            </li>
            <li>
              <ChannelCard
                icon={<Phone className="size-[1.375rem]" strokeWidth={1.6} />}
                disc="bg-[var(--pine)]"
                label={c.callLabel}
                href={`tel:+${WHATSAPP_NUMBER}`}
              >
                <span className="tabular-nums">{phone}</span>
              </ChannelCard>
            </li>
            {(siteConfig.email || process.env.NODE_ENV === "development") && (
              <li>
                <ChannelCard
                  icon={<Mail className="size-[1.375rem]" strokeWidth={1.6} />}
                  disc="bg-[var(--khaki)]"
                  label={c.emailLabel}
                  href={siteConfig.email ? `mailto:${siteConfig.email}` : undefined}
                >
                  {siteConfig.email ?? <Confirm label="email address" />}
                </ChannelCard>
              </li>
            )}
          </ul>
        </div>

        {/* Photo: beside the cards when the panel is wide, below them when narrow */}
        <div className="relative min-h-[24rem] @[34rem]:min-h-0 overflow-hidden rounded-[20px] bg-[var(--ivory-deep)]">
          <Image
            src={c.image}
            alt={c.imageAlt}
            fill
            sizes="(max-width: 1024px) 90vw, 22vw"
            className="object-cover object-[22%_60%] @[34rem]:object-[18%_60%]"
          />
        </div>
      </div>

      <div className="mt-6 border-t border-[var(--hairline)] pt-6">
        <div className="flex items-center gap-5 rounded-[var(--radius-card)] border border-[var(--hairline)] bg-[var(--ivory)] p-5 sm:p-6">
          <span
            className="flex size-14 sm:size-16 shrink-0 items-center justify-center rounded-full bg-[var(--sage)] text-[var(--ivory)]"
            aria-hidden="true"
          >
            <MapPin className="size-6" strokeWidth={1.6} />
          </span>
          <span>
            <span className={labelClass}>{c.locationLabel}</span>
            <span className="mt-1 block font-display text-[1.5rem] leading-tight text-[var(--black)]">
              {siteConfig.location}
            </span>
            <span className="mt-1 block font-sans text-[0.9375rem] text-[var(--charcoal)]">
              {c.locationNote}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
