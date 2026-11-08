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
        breadcrumbs={[{ label: "Shipping & Delivery" }]}
        fadeOnly
      />

      {/* Policy Content */}
      <article
        className="py-12 sm:py-24"
        aria-label="Shipping & Delivery Policy"
        data-reveal="fade"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl sm:rounded-3xl bg-[#FAF6EF] p-6 sm:p-12 border border-[#26211D]/12 shadow-sm">
            <div className="text-xs uppercase tracking-[0.18em] font-sans font-medium text-[var(--pine)] mb-10 pb-4 border-b border-[var(--border-light)]">
              Delivery details pending confirmation
            </div>

            <div className="space-y-10">
              {shippingPolicy.sections.map((section, idx) => (
                <section key={idx} className="space-y-3" data-reveal="fade">
                  <h2 className="font-serif text-2xl sm:text-3xl text-[var(--black)] font-normal tracking-tight">
                    {section.heading}
                  </h2>
                  <div className="space-y-3 font-sans text-base text-[var(--charcoal)] font-light leading-relaxed">
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
