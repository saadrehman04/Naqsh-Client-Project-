import { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { AccordionItem } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Ornament } from "@/components/ui/Ornament";
import { faqGroups } from "@/content/faqs";
import { buildMetadata, generateFaqSchema } from "@/lib/seo";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "FAQs · Corporate Gifting Ordering, Customization & Delivery",
  description:
    "Clear answers to common questions about NAQSH corporate gifting: ordering, minimum quantities, custom logo branding, packaging, nationwide delivery and payment.",
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

      {/* Plain ivory title (client request 2026-11-19: no cover image). The header stays solid black
          on this page (see LIGHT_TOP_PATHS in Header.tsx). */}
      <header className="bg-[var(--ivory)] pt-[calc(var(--header-h)+3.5rem)] sm:pt-[calc(var(--header-h)+5rem)] pb-2">
        <div className="container-x">
          <h1
            className="font-display font-normal text-[length:var(--fs-h1)] leading-[1.05] tracking-[-0.02em] text-[var(--black)] lg:whitespace-nowrap"
            data-reveal="lines"
          >
            Everything You Need to Know
          </h1>
        </div>
      </header>

      {/* All questions in one container, with the project callout beside them */}
      <section className="section-y bg-[var(--ivory)]" aria-label="Frequently asked questions">
        <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <aside className="lg:col-span-4 lg:sticky lg:top-[calc(var(--header-h)+3rem)] order-2 lg:order-1" data-reveal="up">
            <Ornament align="start" />
            <h2 className="mt-6 font-display font-normal text-[length:var(--fs-h3)] leading-[1.12] tracking-[-0.01em] text-[var(--black)] [text-wrap:balance]">
              Have a Specific Project Requirement?
            </h2>
            <p className="mt-5 font-sans text-[length:var(--fs-body)] leading-[1.75] text-[var(--charcoal)] [text-wrap:pretty]">
              Share your occasion, estimated quantity, and timeline with our team, and we will prepare a custom corporate gifting proposal tailored to your organizational requirements.
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
