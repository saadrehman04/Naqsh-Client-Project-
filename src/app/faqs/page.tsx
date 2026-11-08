import { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { AccordionItem } from "@/components/ui/Accordion";
import { CTABand } from "@/components/sections/CTABand";
import { faqGroups } from "@/content/faqs";
import { buildMetadata } from "@/lib/seo";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "FAQs · Frequently Asked Questions",
  description:
    "Contact Naqsh with questions about corporate gifting and your project requirements.",
  path: "/faqs",
});

export default function FAQsPage() {
  const whatsappUrl = getWhatsAppUrl(
    "Hello Naqsh, I have a specific question about your corporate gifting process that isn't answered in the FAQs."
  );

  const groupBadges: Record<string, { bg: string; text: string; border: string }> = {
    Process: { bg: "bg-[var(--pine)]", text: "text-[var(--ivory)]", border: "border-[var(--pine)]" },
    Orders: { bg: "bg-[var(--terracotta-deep)]", text: "text-[var(--ivory)]", border: "border-[var(--terracotta)]" },
    Customization: { bg: "bg-[var(--chestnut)]", text: "text-[var(--ivory)]", border: "border-[var(--chestnut)]" },
    Payments: { bg: "bg-[var(--chestnut)]", text: "text-[var(--ivory)]", border: "border-[var(--chestnut)]" },
    Delivery: { bg: "bg-[#145240]", text: "text-[var(--ivory)]", border: "border-[#145240]" },
  };

  return (
    <div className="bg-[var(--ivory)] min-h-screen">
      {/* Editorial Page Hero */}
      <PageHero
        title="Clear answers to how we collaborate."
        subtitle="Have a question about a gifting request? Contact Naqsh to discuss your project."
        label="Frequently Asked Questions"
        breadcrumbs={[{ label: "FAQs" }]}
        image="/images/products/ramadan-delights.webp"
      />

      {/* Grouped Accordions Section */}
      <section className="py-20 sm:py-28 bg-[var(--ivory-deep)]" aria-label="FAQ Categories">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
          {faqGroups.map((grp) => {
            const badge = groupBadges[grp.group] || {
              bg: "bg-[var(--pine)]",
              text: "text-[var(--ivory)]",
              border: "border-[var(--pine)]",
            };

            return (
              <div key={grp.group} className="space-y-6">
                <div
                  className="border-b-2 pb-3 flex items-center justify-between"
                  style={{ borderColor: badge.border }}
                  data-reveal="up"
                >
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs uppercase tracking-[0.18em] font-sans font-semibold ${badge.bg} ${badge.text} shadow-sm`}>
                      Category
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[var(--black)] font-normal">
                      {grp.group}
                    </h2>
                  </div>
                </div>

                <div
                  className="divide-y divide-[var(--border-light)]"
                  data-reveal="stagger"
                  data-stagger="0.08"
                >
                  {grp.items.map((item) => (
                    <AccordionItem
                      key={item.id}
                      id={item.id}
                      question={item.question}
                      answer={process.env.NODE_ENV === "development" ? item.answer : "Please contact Naqsh directly to discuss this for your request."}
                      confirmTag={item.confirmTag ?? "FAQ response and operational details need client confirmation"}
                    />
                  ))}
                </div>
              </div>
            );
          })}

          {/* Deep Obsidian Support Callout */}
          <div
            className="rounded-[var(--radius-card)] bg-[#12100E] text-[var(--ivory)] border border-[var(--copper)]/25 p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden"
            data-reveal="up"
          >
            <div
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[var(--copper)]/20 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <h3 className="font-serif text-2xl sm:text-3xl text-[var(--ivory)] font-normal mb-3 relative z-10">
              Have a question not addressed here?
            </h3>
            <p className="font-sans text-sm sm:text-base text-[var(--ivory)]/85 font-light leading-relaxed mb-8 max-w-xl mx-auto relative z-10">
              Contact Naqsh to discuss the details of your gifting request.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--terracotta-deep)] hover:bg-[var(--chestnut)] text-[var(--ivory)] font-sans text-xs tracking-[0.14em] uppercase font-semibold transition-all duration-300 shadow-md hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4 text-[var(--khaki)]" />
                <span>Message on WhatsApp</span>
              </a>
              <Link
                href="/contact"
                data-magnetic
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--ivory)] hover:bg-[var(--ivory-deep)] text-[var(--black)] font-sans text-xs tracking-[0.14em] uppercase font-semibold transition-all duration-300 shadow-md hover:scale-[1.02]"
              >
                <span>Submit Inquiry Form</span>
                <ArrowRight className="w-4 h-4 text-[var(--terracotta)]" />
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
