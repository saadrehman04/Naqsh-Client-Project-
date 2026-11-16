import { Phone } from "lucide-react";
import { WaxSeal3D } from "@/components/three/WaxSeal3D";
import { Button } from "@/components/ui/Button";
import { Ornament } from "@/components/ui/Ornament";
import { homeContent } from "@/content/home";
import { getWhatsAppUrl, DISPLAY_PHONE, WHATSAPP_NUMBER } from "@/lib/whatsapp";

interface CTABandProps {
  title?: string;
  subline?: string;
  className?: string;
}

/**
 * Closing call to action, shared by inner pages.
 * Ivory-deep band (so it never sits dark-on-dark against the black footer):
 * heading, subline and two actions on the start side, the NAQSH wax seal on the end side.
 */
export function CTABand({ title, subline, className = "" }: CTABandProps) {
  const { cta } = homeContent;
  const whatsappUrl = getWhatsAppUrl(
    "Hello NAQSH, I would like to consult with your team on a bespoke corporate gifting requirement."
  );

  return (
    <section
      className={`section-y bg-[var(--ivory-deep)] ${className}`}
      aria-labelledby="cta-band-heading"
    >
      <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7" data-reveal="up">
          <Ornament align="start" />
          <h2
            id="cta-band-heading"
            className="mt-6 font-display font-normal text-[length:clamp(2.5rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.015em] text-[var(--black)] [text-wrap:balance]"
            data-reveal="lines"
          >
            {title || cta.heading}
          </h2>
          <p className="mt-6 max-w-[34rem] font-sans text-[length:clamp(1.0625rem,0.35vw+0.98rem,1.1875rem)] leading-[1.7] text-[var(--charcoal)] [text-wrap:pretty]">
            {subline || cta.subline}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4">
            <Button href="/contact">{cta.button}</Button>
            <Button href={whatsappUrl} variant="secondary" external>
              {cta.secondary}
            </Button>
          </div>

          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="mt-8 inline-flex items-center gap-2.5 min-h-[44px] font-sans text-[0.9375rem] text-[var(--charcoal)] hover:text-[var(--chestnut)] transition-colors"
          >
            <Phone className="w-4 h-4 text-[var(--chestnut)]" aria-hidden="true" />
            <span>{DISPLAY_PHONE}</span>
          </a>
        </div>

        <div className="lg:col-span-5 flex flex-col items-center text-center" data-reveal="scale">
          <WaxSeal3D size={240} className="cta-seal-scene" />
          <p className="mt-6 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[var(--chestnut)]">
            NAQSH Seal
          </p>
          <p className="mt-1 font-sans text-[0.875rem] text-[var(--charcoal)]">
            Handcrafted in Lahore, Pakistan
          </p>
        </div>
      </div>
    </section>
  );
}
