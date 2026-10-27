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
  title: "FAQs · Frequently Asked Questions",
  description:
    "Find clear answers about how Naqsh curates corporate gifting, lead times, minimum orders, branding options, payment milestones, and doorstep delivery across Pakistan.",
  path: "/faqs",
});

export default function FAQsPage() {
  // Flatten all FAQs for Google FAQPage JSON-LD schema
  const allFaqs = faqGroups.flatMap((group) => group.items);
  const faqSchema = generateFaqSchema(allFaqs);
  const whatsappUrl = getWhatsAppUrl(
    "Hello Naqsh, I have a specific question about your corporate gifting process that isn't answered in the FAQs."
  );

  return (
    <div className="bg-[var(--ivory)] min-h-screen">
      {/* Google FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Editorial Page Hero */}
      <PageHero
        title="Clear answers to how we collaborate."
        subtitle="Find answers regarding our bespoke curation workflow, order lead times, customization techniques, and corporate doorstep delivery."
        label="Frequently Asked Questions"
        breadcrumbs={[{ label: "FAQs" }]}
      />

      {/* Grouped Accordions Section */}
      <section className="py-20 sm:py-28" aria-label="FAQ Categories">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
          {faqGroups.map((grp) => (
            <div key={grp.group} className="space-y-6" data-reveal="fade-up">
              <div className="border-b border-[var(--black)]/15 pb-3">
                <span className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-[var(--terracotta)]">
                  Category
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[var(--black)] font-normal mt-1">
                  {grp.group}
                </h2>
              </div>

              <div className="divide-y divide-[var(--border-light)]">
                {grp.items.map((item) => (
                  <AccordionItem
                    key={item.id}
                    id={item.id}
                    question={item.question}
                    answer={item.answer}
                    confirmTag={item.confirmTag}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Unanswered Questions Support Callout */}
          <div
            className="rounded-[var(--radius-card)] bg-[var(--ivory-warm)] border border-[var(--border-light)] p-8 sm:p-10 text-center shadow-sm"
            data-reveal="fade-up"
          >
            <h3 className="font-serif text-2xl text-[var(--black)] font-normal mb-2">
              Have a question not addressed here?
            </h3>
            <p className="font-sans text-sm sm:text-base text-[var(--pine)] font-light leading-relaxed mb-6 max-w-xl mx-auto">
              Our curators are happy to discuss custom packaging specifications, regional sourcing, or multi-destination corporate logistics directly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--black)] hover:bg-[var(--chestnut)] text-[var(--ivory)] font-sans text-xs tracking-[0.14em] uppercase font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[var(--copper)]" />
                <span>Message on WhatsApp</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--ivory)] hover:bg-[var(--ivory-deep)] text-[var(--black)] border border-[var(--border-light)] font-sans text-xs tracking-[0.14em] uppercase font-medium transition-colors"
              >
                <span>Submit Inquiry Form</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action band */}
      <CTABand />
    </div>
  );
}
