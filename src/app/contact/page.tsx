import { Metadata } from "next";
import { Phone, MessageCircle, MapPin, Mail, Clock } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { InquiryForm } from "@/components/form/InquiryForm";
import { Confirm } from "@/components/ui/Confirm";
import { DISPLAY_PHONE, WHATSAPP_NUMBER, getWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact · Request a Corporate Gifting Consultation",
  description:
    "Consult with Naqsh regarding bespoke corporate gifting in Pakistan. Direct phone, WhatsApp inquiry, and customized consultation brief portal.",
  path: "/contact",
});

export default function ContactPage() {
  const whatsappUrl = getWhatsAppUrl(
    "Hello Naqsh, I would like to schedule a corporate gifting consultation with your team."
  );

  return (
    <div className="bg-[var(--ivory-deep)] min-h-screen">
      {/* Editorial Page Hero */}
      <PageHero
        title="Let's craft your next gifting experience."
        subtitle="Share your occasion, timeline, and audience—we’ll prepare a tailored curation proposal."
        label="Get In Touch"
        breadcrumbs={[{ label: "Contact" }]}
        image="/images/products/excellence-award.webp"
      />

      {/* Main Contact Section */}
      <section className="py-12 sm:py-24" aria-label="Contact Channels & Consultation Form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Dark Luxury Direct Channels Panel */}
            <div className="lg:col-span-5 rounded-2xl sm:rounded-3xl bg-[#12100E] text-[var(--ivory)] p-6 sm:p-9 border border-white/10 shadow-xl space-y-8 relative overflow-hidden">
              <div
                className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(171, 108, 73, 0.2) 0%, transparent 70%)",
                }}
                aria-hidden="true"
              />

              <div className="relative z-10" data-reveal="up">
                <span className="text-xs uppercase tracking-[0.18em] font-sans font-semibold text-[#E5B869] mb-2 block">
                  Direct Channels
                </span>
                <h2
                  className="font-serif text-3xl sm:text-4xl text-[var(--ivory)] font-normal tracking-tight mb-3"
                  data-reveal="lines"
                >
                  Attentive Consultation
                </h2>
                <p className="font-sans text-sm sm:text-base text-[var(--ivory)]/75 font-light leading-relaxed">
                  Speak directly with our curation specialists for executive, onboarding, or milestone gifting.
                </p>
              </div>

              {/* Channels List */}
              <div className="relative z-10 space-y-4" data-reveal="stagger" data-stagger="0.1">
                {/* Phone */}
                <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#E5B869]/40 transition-colors">
                  <div className="w-11 h-11 rounded-full bg-[var(--terracotta)]/25 text-[#E5B869] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-[0.16em] font-sans font-semibold text-[#E5B869]">
                      Direct Phone
                    </span>
                    <a
                      href={`tel:${DISPLAY_PHONE.replace(/[^0-9+]/g, "")}`}
                      className="font-serif text-xl sm:text-2xl text-[var(--ivory)] hover:text-[#E5B869] transition-colors mt-0.5 inline-flex items-center min-h-[44px] py-1"
                    >
                      {DISPLAY_PHONE}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#789675]/50 transition-colors">
                  <div className="w-11 h-11 rounded-full bg-[var(--pine)]/40 text-[#9CC498] flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-[0.16em] font-sans font-semibold text-[#9CC498]">
                      WhatsApp Quick Chat
                    </span>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif text-xl sm:text-2xl text-[var(--ivory)] hover:text-[#9CC498] transition-colors mt-0.5 inline-flex items-center min-h-[44px] py-1"
                    >
                      +{WHATSAPP_NUMBER}
                    </a>
                    <span className="text-xs text-[var(--ivory)]/65 font-light block">
                      Instant response for project inquiries.
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="w-11 h-11 rounded-full bg-white/10 text-[var(--khaki)] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-[0.16em] font-sans font-semibold text-[var(--khaki)]">
                      Studio Location
                    </span>
                    <span className="font-serif text-xl sm:text-2xl text-[var(--ivory)] mt-0.5 block">
                      {siteConfig.location}
                    </span>
                  </div>
                </div>

                {/* Unconfirmed details in dev */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-3 text-xs text-[var(--ivory)]/70">
                    <Mail className="w-4 h-4 text-[#E5B869]" />
                    <span>Official Email:</span>
                    <Confirm label="Email address not yet confirmed by client" />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[var(--ivory)]/70">
                    <Clock className="w-4 h-4 text-[#E5B869]" />
                    <span>Studio Hours:</span>
                    <Confirm label="Working hours not yet confirmed by client" />
                  </div>
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
                  Project Brief
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[var(--black)] font-normal tracking-tight">
                  Request a Custom Proposal
                </h2>
              </div>
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
