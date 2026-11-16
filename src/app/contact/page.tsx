import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { InquiryForm } from "@/components/form/InquiryForm";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact · Request a Corporate Gifting Consultation",
  description:
    "Share your corporate gifting requirements with NAQSH. Request a tailored proposal for employee welcome kits, executive gifts, seasonal hampers, and bespoke corporate packages in Lahore and across Pakistan.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="bg-[var(--ivory)]">
      {/* Editorial Page Hero */}
      <PageHero
        title="Let's Craft Your Next Gifting Experience."
        subtitle="Share your requirements with us, and let's explore how NAQSH can bring your corporate gifting vision to life."
        label="Corporate Consultation"
        breadcrumbs={[{ label: "Contact" }]}
        image="/images/site/contact-cover.webp"
        imageTreatment="fade"
        imagePosition="85% 60%"
      />

      {/* Contact channels + consultation form */}
      <section className="section-y bg-[var(--ivory)]" aria-label="Contact channels and consultation form">
        <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 xl:gap-14 items-start">
          {/* Get in touch panel (client design) */}
          <div className="lg:col-span-6" data-reveal="up">
            <ContactPanel />
          </div>

          {/* Form */}
          <div id="request-form" className="lg:col-span-6 scroll-mt-[calc(var(--header-h)+1.5rem)]" data-reveal="up" data-delay="0.08">
            <div className="mb-6">
              <span className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-[var(--pine)]">
                Corporate Gifting Brief
              </span>
              <h2 className="mt-2 font-display font-normal text-[length:clamp(1.75rem,2.4vw,2.25rem)] leading-[1.1] text-[var(--black)]">
                Request a Custom Proposal
              </h2>
              <p className="mt-2 font-sans text-[0.9375rem] text-[var(--charcoal)]">
                Share your requirements below and our curation desk will respond promptly.
              </p>
            </div>
            <InquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
}
