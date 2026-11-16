import { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { AccordionItem } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Ornament } from "@/components/ui/Ornament";
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
      id: item.id,
      question: item.question,
      answer: item.answer,
    }))
  );
  const faqSchema = generateFaqSchema(
    allFaqs.map(({ question, answer }) => ({ question, answer }))
  );

  return (
    <div className="bg-[var(--ivory)]">
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
        image="/images/products/ramadan-delights.webp"
      />

      {/* All questions in one container, with the project callout beside them */}
      <section className="section-y bg-[var(--ivory)]" aria-label="Frequently asked questions">
        <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <aside className="lg:col-span-4 lg:sticky lg:top-[calc(var(--header-h)+3rem)] order-2 lg:order-1" data-reveal="up">
            <Ornament align="start" />
            <h2 className="mt-6 font-display font-normal text-[length:clamp(2rem,3vw,2.75rem)] leading-[1.08] tracking-[-0.015em] text-[var(--black)] [text-wrap:balance]">
              Have a Specific Project Requirement?
            </h2>
            <p className="mt-5 font-sans text-[1rem] leading-[1.75] text-[var(--charcoal)] [text-wrap:pretty]">
              Share your occasion, estimated quantity, and timeline with our team, and we will prepare a custom corporate gifting proposal tailored to your organization.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3">
              <Button href="/contact">Request a Consultation</Button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Chat With Us on WhatsApp</span>
              </a>
            </div>
          </aside>

          <div
            className="lg:col-span-8 order-1 lg:order-2 rounded-[var(--radius-card)] border border-[var(--hairline)] bg-[var(--ivory)] px-5 sm:px-10 py-2 sm:py-4 [&>details:last-child]:border-b-0"
            data-reveal="stagger"
            data-stagger="0.05"
          >
            {allFaqs.map((item, idx) => (
              <AccordionItem
                key={item.id}
                id={item.id}
                question={item.question}
                answer={item.answer}
                defaultOpen={idx === 0}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
