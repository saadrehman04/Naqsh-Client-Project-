import { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { AccordionItem } from "@/components/ui/Accordion";
import { CTABand } from "@/components/sections/CTABand";
import { faqGroups } from "@/content/faqs";
import { buildMetadata, generateFaqSchema } from "@/lib/seo";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "FAQs · Corporate Gifting Ordering, Customization & Delivery",
  description:
    "Find clear answers to 19 common questions about NAQSH corporate gifting: ordering, minimum quantities, custom logo branding, bespoke packaging, nationwide delivery, and corporate invoicing.",
  path: "/faqs",
});

export default function FAQsPage() {
  const whatsappUrl = getWhatsAppUrl(
    "Hello NAQSH, I have a question regarding a corporate gifting requirement."
  );

  const allFaqs = faqGroups.flatMap((group) =>
    group.items.map((item) => ({
      question: item.question,
      answer: item.answer,
    }))
  );
  const faqSchema = generateFaqSchema(allFaqs);

  return (
    <div className="bg-[var(--ivory)] min-h-screen">
      {/* FAQPage JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Editorial Page Hero */}
      <PageHero
        title="Everything You Need to Know."
        subtitle="Clear, practical answers covering ordering, custom branding, product curation, nationwide delivery, corporate invoicing, and recurring gifting programs."
        label="Frequently Asked Questions"
        breadcrumbs={[{ label: "FAQs" }]}
        image="/images/products/ramadan-delights.webp"
      />

      {/* Category Quick-Jump Bar */}
      <div className="bg-[#101D19] border-b border-white/10 py-4 sticky top-[70px] z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#C99A53] font-semibold">
            6 Topic Categories · 19 Questions
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {faqGroups.map((grp) => (
              <a
                key={grp.group}
                href={`#faq-cat-${grp.group.toLowerCase().replace(/\s+/g, "-")}`}
                className="px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-[#C99A53] text-[var(--ivory)] hover:text-[#101010] border border-white/10 text-xs font-sans transition-colors"
              >
                {grp.group} ({grp.items.length})
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Grouped Accordions Section */}
      <section className="py-20 sm:py-28 bg-[var(--ivory-deep)]" aria-label="FAQ Categories">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-16">
          {faqGroups.map((grp, groupIdx) => {
            const catId = `faq-cat-${grp.group.toLowerCase().replace(/\s+/g, "-")}`;
            return (
              <div
                key={grp.group}
                id={catId}
                className="scroll-mt-32 rounded-3xl bg-[var(--ivory)] border border-[var(--hairline)] p-6 sm:p-10 shadow-sm space-y-6"
              >
                <div
                  className="border-b border-[var(--hairline)] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  data-reveal="up"
                >
                  <div>
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-[0.18em] font-sans font-semibold bg-[#101D19] text-[#C99A53]">
                        0{groupIdx + 1}
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl text-[var(--black)] font-normal">
                        {grp.group}
                      </h2>
                    </div>
                    {grp.description && (
                      <p className="text-xs sm:text-sm font-sans text-[var(--charcoal)] font-light">
                        {grp.description}
                      </p>
                    )}
                  </div>
                </div>

                <div
                  className="divide-y divide-[var(--hairline)]"
                  data-reveal="stagger"
                  data-stagger="0.06"
                >
                  {grp.items.map((item, itemIdx) => (
                    <AccordionItem
                      key={item.id}
                      id={item.id}
                      question={item.question}
                      answer={item.answer}
                      defaultOpen={groupIdx === 0 && itemIdx === 0}
                    />
                  ))}
                </div>
              </div>
            );
          })}

          {/* Deep Emerald Consultation Callout */}
          <div
            className="rounded-3xl bg-[#101D19] text-[var(--ivory)] border border-[#C99A53]/30 p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden"
            data-reveal="up"
          >
            <div
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#C99A53]/15 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <h3 className="font-serif text-2xl sm:text-4xl text-[var(--ivory)] font-normal mb-3 relative z-10">
              Have a Specific Project Requirement?
            </h3>
            <p className="font-sans text-sm sm:text-base text-[var(--ivory)]/80 font-light leading-relaxed mb-8 max-w-xl mx-auto relative z-10">
              Share your occasion, estimated quantity, and timeline with our team, and we will prepare a custom corporate gifting proposal tailored to your organization.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link
                href="/contact"
                data-magnetic
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#F0B87A] via-[#C99A53] to-[#B86C35] text-[#101010] font-sans text-xs tracking-[0.14em] uppercase font-bold transition-all duration-300 shadow-md hover:scale-[1.02]"
              >
                <span>Request a Consultation</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-[#C99A53]/45 text-[var(--ivory)] font-sans text-xs tracking-[0.14em] uppercase font-semibold transition-all duration-300 shadow-md hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4 text-[#C99A53]" aria-hidden="true" />
                <span>Chat With Us on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action band */}
      <CTABand />
    </div>
  );
}
