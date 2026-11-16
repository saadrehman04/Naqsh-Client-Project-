import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Confirm } from "@/components/ui/Confirm";
import { CTABand } from "@/components/sections/CTABand";
import { shippingPolicy } from "@/content/policies";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Shipping & Delivery",
  description:
    "Contact Naqsh to discuss delivery arrangements for a corporate gifting request.",
  path: "/shipping-delivery",
});

export default function ShippingDeliveryPage() {
  return (
    <div className="bg-[var(--ivory-deep)] min-h-screen">
      {/* Editorial Page Hero (fade only on policy pages) */}
      <PageHero
        title={shippingPolicy.title}
        subtitle={shippingPolicy.intro}
        label="Fulfillment & Care"
        fadeOnly
      />

      {/* Policy Content */}
      <article
        className="section-y bg-[var(--ivory)]"
        aria-label="Shipping & Delivery Policy"
        data-reveal="fade"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <div className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-[var(--pine)] mb-10 pb-5 border-b border-[var(--hairline)]">
              Delivery details pending confirmation
            </div>

            <div className="space-y-10">
              {shippingPolicy.sections.map((section, idx) => (
                <section key={idx} className="space-y-3" data-reveal="fade">
                  <h2 className="font-display font-normal text-[length:clamp(1.75rem,2.6vw,2.25rem)] leading-[1.1] tracking-[-0.01em] text-[var(--black)]">
                    {section.heading}
                  </h2>
                  <div className="space-y-3 font-sans text-[1.0625rem] leading-[1.75] text-[var(--charcoal)]">
                    {section.body.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>
                  {section.confirmTag && (
                    <div className="pt-2">
                      <Confirm label={section.confirmTag} />
                    </div>
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Call to action band */}
      <CTABand />
    </div>
  );
}
