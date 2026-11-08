import { Metadata } from "next";
import { Phone, MessageCircle, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { InquiryForm } from "@/components/form/InquiryForm";
import { DISPLAY_PHONE, WHATSAPP_NUMBER, getWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact · Request a Corporate Gifting Consultation",
  description:
    "Share your corporate gifting requirements with NAQSH. Request a tailored proposal for employee welcome kits, executive gifts, seasonal hampers, and bespoke corporate packages in Lahore and across Pakistan.",
  path: "/contact",
});

export default function ContactPage() {
  const whatsappUrl = getWhatsAppUrl(
    "Hello NAQSH, I would like to schedule a corporate gifting consultation with your team."
  );

  return (
    <div className="bg-[var(--ivory-deep)] min-h-screen">
      {/* Editorial Page Hero */}
      <PageHero
        title="Let's Craft Your Next Gifting Experience."
        subtitle="Share your requirements with us, and let's explore how NAQSH can bring your corporate gifting vision to life."
        label="Corporate Consultation"
        breadcrumbs={[{ label: "Contact" }]}
        image="/images/products/excellence-award.webp"
      />

      {/* Main Contact Section */}
      <section
        className="py-14 sm:py-24"
        aria-label="Contact Channels & Consultation Form"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Deep Emerald Direct Channels & Consultation Guide */}
            <div className="lg:col-span-5 rounded-2xl sm:rounded-3xl bg-[#101D19] text-[var(--ivory)] p-6 sm:p-9 border border-[#C99A53]/25 shadow-xl space-y-8 relative overflow-hidden">
              <div
                className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(201, 154, 83, 0.2) 0%, transparent 70%)",
                }}
                aria-hidden="true"
              />

              <div className="relative z-10" data-reveal="up">
                <span className="text-xs uppercase tracking-[0.18em] font-sans font-semibold text-[#C99A53] mb-2 block">
                  Direct Concierge
                </span>
                <h2
                  className="font-serif text-3xl sm:text-4xl text-[var(--ivory)] font-normal tracking-tight mb-3"
                  data-reveal="lines"
                >
                  Attentive Corporate Consultation
                </h2>
                <p className="font-sans text-sm sm:text-base text-[var(--ivory)]/80 font-light leading-relaxed">
                  Connect directly with our curation specialists to discuss employee welcome kits, executive packages, event giveaways, or seasonal hampers.
                </p>
              </div>

              {/* Direct Contact Channels */}
              <div
                className="relative z-10 space-y-4"
                data-reveal="stagger"
                data-stagger="0.08"
              >
                {/* WhatsApp */}
                <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#C99A53]/50 transition-colors">
                  <div className="w-11 h-11 rounded-full bg-[#C99A53]/20 text-[#C99A53] flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-[0.16em] font-sans font-semibold text-[#C99A53]">
                      WhatsApp Concierge
                    </span>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif text-xl sm:text-2xl text-[var(--ivory)] hover:text-[#FBE2AA] transition-colors mt-0.5 inline-flex items-center min-h-[44px] py-1"
                    >
                      +{WHATSAPP_NUMBER}
                    </a>
                    <span className="text-xs text-[var(--ivory)]/70 font-light block">
                      Direct chat for corporate inquiries & quick consultations.
                    </span>
                  </div>
                </div>

                {/* Direct Phone */}
                <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#C99A53]/50 transition-colors">
                  <div className="w-11 h-11 rounded-full bg-white/10 text-[#FBE2AA] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-[0.16em] font-sans font-semibold text-[#FBE2AA]">
                      Direct Phone
                    </span>
                    <a
                      href={`tel:${DISPLAY_PHONE.replace(/[^0-9+]/g, "")}`}
                      className="font-serif text-xl sm:text-2xl text-[var(--ivory)] hover:text-[#FBE2AA] transition-colors mt-0.5 inline-flex items-center min-h-[44px] py-1"
                    >
                      {DISPLAY_PHONE}
                    </a>
                    <span className="text-xs text-[var(--ivory)]/70 font-light block">
                      Speak directly with our corporate gifting desk.
                    </span>
                  </div>
                </div>

                {/* Studio Location */}
                <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="w-11 h-11 rounded-full bg-white/10 text-[#D6C8B3] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-[0.16em] font-sans font-semibold text-[#D6C8B3]">
                      Studio Location
                    </span>
                    <span className="font-serif text-xl sm:text-2xl text-[var(--ivory)] mt-0.5 block">
                      {siteConfig.location}
                    </span>
                    <span className="text-xs text-[var(--ivory)]/70 font-light block mt-1">
                      Handcrafted in Lahore · Nationwide delivery across Pakistan.
                    </span>
                  </div>
                </div>
              </div>

              {/* What Happens Next Assurance */}
              <div className="relative z-10 pt-6 border-t border-white/10 space-y-3 text-xs font-sans text-[var(--ivory)]/80">
                <div className="flex items-center gap-2 text-[#C99A53] font-semibold uppercase tracking-[0.14em]">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>What to Expect After Submitting</span>
                </div>
                <p className="font-light leading-relaxed text-[var(--ivory)]/75">
                  Our team reviews your occasion, quantity, and budget parameters and prepares a tailored visual proposal with product recommendations, customization options, and delivery timelines.
                </p>
                <div className="flex items-center gap-2 text-[#D6C8B3] pt-1">
                  <ShieldCheck className="w-4 h-4 text-[#C99A53] shrink-0" aria-hidden="true" />
                  <span>Confidential B2B consultation · Custom proposals</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Consultation Portal */}
            <div
              className="lg:col-span-7 rounded-2xl sm:rounded-3xl bg-[#FAF6EF] p-6 sm:p-9 border border-[#26211D]/12 shadow-lg"
              data-reveal="fade-up"
            >
              <div className="mb-6">
                <span className="text-xs uppercase tracking-[0.18em] font-sans font-semibold text-[var(--pine)] mb-1 block">
                  Corporate Gifting Brief
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[var(--black)] font-normal tracking-tight">
                  Request a Custom Proposal
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm font-sans text-[var(--charcoal)] font-light">
                  Complete the fields below and our curation desk will respond with tailored gifting concepts.
                </p>
              </div>
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
