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
    <div className="bg-[var(--ivory)] min-h-screen">
      {/* Editorial Page Hero */}
      <PageHero
        title="Let's craft your next gifting experience."
        subtitle="Share your occasion, timeline, and audience requirements. Our team will prepare a bespoke curation proposal tailored to your brand."
        label="Get In Touch"
        breadcrumbs={[{ label: "Contact" }]}
      />

      {/* Main Contact Section */}
      <section className="py-20 sm:py-28" aria-label="Contact Channels & Consultation Form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Direct Channels & Studio Information */}
            <div className="lg:col-span-5 space-y-10" data-reveal="fade-up">
              <div>
                <span className="text-xs uppercase tracking-[0.18em] font-sans font-semibold text-[var(--terracotta-deep)] mb-2 block">
                  Direct Channels
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[var(--black)] font-normal tracking-tight mb-4">
                  Attentive Consultation
                </h2>
                <p className="font-sans text-base text-[var(--charcoal)] font-light leading-relaxed">
                  We invite corporate leaders, HR teams, and marketing directors to speak directly with our curation team.
                </p>
              </div>

              {/* Channels List with Distinct Palette Accents */}
              <div className="space-y-6">
                {/* Phone - Terracotta accent */}
                <div className="flex items-start gap-4 p-6 rounded-[var(--radius-card)] bg-[var(--ivory-warm)] border-l-4 border-[var(--terracotta-deep)] border-y border-r border-[var(--border-light)] shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 rounded-full bg-[var(--terracotta)]/15 text-[var(--terracotta-deep)] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-[0.16em] font-sans font-semibold text-[var(--terracotta-deep)]">
                      Direct Phone
                    </span>
                    <a
                      href={`tel:${DISPLAY_PHONE.replace(/[^0-9+]/g, "")}`}
                      className="font-serif text-2xl text-[var(--black)] hover:text-[var(--terracotta-deep)] transition-colors mt-0.5 block"
                    >
                      {DISPLAY_PHONE}
                    </a>
                  </div>
                </div>

                {/* WhatsApp - Pine Teal accent */}
                <div className="flex items-start gap-4 p-6 rounded-[var(--radius-card)] bg-[var(--ivory-warm)] border-l-4 border-[var(--pine)] border-y border-r border-[var(--border-light)] shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 rounded-full bg-[var(--pine)]/15 text-[var(--pine)] flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-[0.16em] font-sans font-semibold text-[var(--pine)]">
                      WhatsApp Quick Chat
                    </span>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif text-2xl text-[var(--black)] hover:text-[var(--pine)] transition-colors mt-0.5 block"
                    >
                      +{WHATSAPP_NUMBER}
                    </a>
                    <span className="text-xs text-[var(--charcoal)] font-light block mt-1">
                      Send a WhatsApp message to start a conversation.
                    </span>
                  </div>
                </div>

                {/* Location - Khaki / Sand accent */}
                <div className="flex items-start gap-4 p-6 rounded-[var(--radius-card)] bg-[var(--ivory-warm)] border-l-4 border-[var(--khaki)] border-y border-r border-[var(--border-light)] shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 rounded-full bg-[var(--khaki)]/25 text-[var(--chestnut)] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-[0.16em] font-sans font-semibold text-[var(--chestnut)]">
                      Location
                    </span>
                    <span className="font-serif text-2xl text-[var(--black)] mt-0.5 block">
                      {siteConfig.location}
                    </span>
                  </div>
                </div>

                {/* Unconfirmed details in dev */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-xs text-[var(--charcoal)]">
                    <Mail className="w-4 h-4 text-[var(--sage)]" />
                    <span>Official Email:</span>
                    <Confirm label="Email address not yet confirmed by client" />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[var(--charcoal)]">
                    <Clock className="w-4 h-4 text-[var(--sage)]" />
                    <span>Studio Hours:</span>
                    <Confirm label="Working hours not yet confirmed by client" />
                  </div>
                </div>
              </div>

              <p className="border-y border-[var(--hairline)] py-5 font-serif text-2xl text-[var(--chestnut)]">Beyond the box, into an experience.</p>
            </div>

            {/* Right Column: Interactive Consultation Portal */}
            <div className="lg:col-span-7" data-reveal="fade-up">
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
