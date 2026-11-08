import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeContent } from "@/content/home";
import { homepageFaqs } from "@/content/faqs";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AccordionItem } from "@/components/ui/Accordion";

export function HomeFaqPreview() {
  const { faqPreview } = homeContent;

  return (
    <section
      className="section-y bg-[var(--ivory-deep)] border-t border-[var(--hairline)]"
      aria-labelledby="home-faq-heading"
    >
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Heading & Link to Full FAQs */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-5" data-reveal="up">
            <SectionLabel variant="pine">{faqPreview.label}</SectionLabel>
            <h2 id="home-faq-heading" className="t-h2" data-reveal="lines">
              {faqPreview.heading}
            </h2>
            <p className="text-base sm:text-lg text-[var(--charcoal)] font-light leading-relaxed">
              {faqPreview.intro}
            </p>
            <div className="pt-2">
              <Link
                href={faqPreview.ctaHref}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#101D19] hover:bg-[var(--chestnut)] text-[var(--ivory)] font-sans text-xs tracking-[0.14em] uppercase font-semibold transition-all duration-300 shadow-sm"
              >
                <span>{faqPreview.ctaText}</span>
                <ArrowRight className="w-4 h-4 text-[#C99A53]" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right Column: 6 Key Questions Accordion */}
          <div
            className="lg:col-span-7 bg-[var(--ivory)] rounded-[var(--radius-image)] border border-[var(--hairline)] p-6 sm:p-10 shadow-sm divide-y divide-[var(--hairline)]"
            data-reveal="stagger"
            data-stagger="0.08"
          >
            {homepageFaqs.slice(0, 4).map((item, idx) => (
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
      </div>
    </section>
  );
}
