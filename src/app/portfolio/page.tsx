import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { collections } from "@/content/collections";
import { getCollectionWhatsAppUrl } from "@/lib/whatsapp";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio · Bespoke Occasion Gifting Collections",
  description:
    "Explore Naqsh's 7 curated corporate gifting collections: New Hire Welcome Kits, Client Packages, Ramadan & Eid Baskets, Milestones, Culture & Heritage, and more.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <div className="bg-[var(--ivory)] min-h-screen">
      {/* Editorial Page Hero */}
      <PageHero
        title="Occasion-driven curation for corporate moments."
        subtitle="Our solutions are designed around corporate occasions rather than a fixed catalogue. We curate, source, customize, and deliver gifting experiences tailored to each client's objectives, brand identity, audience, and budget."
        label="Product Portfolio"
        breadcrumbs={[{ label: "Portfolio" }]}
      />

      {/* Collections Grid */}
      <section className="py-20 sm:py-28" aria-label="Gifting Collections">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
            data-reveal="stagger"
          >
            {collections.map((col, idx) => {
              const whatsappUrl = getCollectionWhatsAppUrl(col.title);

              return (
                <div
                  key={col.slug}
                  id={col.slug}
                  className="group flex flex-col justify-between bg-[var(--ivory-warm)] border border-[var(--border-light)] rounded-[var(--radius-card)] overflow-hidden transition-all duration-500 hover:border-[var(--copper)] hover:shadow-xl"
                >
                  <div>
                    {/* Visual aspect frame */}
                    <div className="relative aspect-[4/3] w-full bg-[var(--ivory-deep)] overflow-hidden">
                      <Image
                        src={col.image}
                        alt={col.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-105"
                      />
                      <span className="absolute top-4 left-4 z-10 inline-flex items-center text-[10px] uppercase tracking-[0.2em] font-medium px-2.5 py-1 rounded-full bg-[var(--ivory)]/90 backdrop-blur-sm border border-black/5 text-[var(--pine)]">
                        Occasion {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 sm:p-8">
                      <h2 className="font-serif text-2xl text-[var(--black)] font-normal mb-2 group-hover:text-[var(--terracotta)] transition-colors duration-300">
                        <Link href={`/portfolio/${col.slug}`}>{col.title}</Link>
                      </h2>
                      <p className="font-sans text-sm text-[var(--pine)] font-light leading-relaxed mb-6">
                        {col.tagline}
                      </p>

                      {/* Inclusions summary */}
                      <div className="border-t border-[var(--border-light)]/70 pt-4">
                        <p className="text-[11px] font-sans uppercase tracking-[0.15em] text-[var(--sage)] mb-2.5 font-medium">
                          Typical Inclusions
                        </p>
                        <ul className="space-y-1.5">
                          {col.typicalInclusions.map((item) => (
                            <li
                              key={item}
                              className="text-xs text-[var(--chestnut)]/85 flex items-start gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--copper)] mt-1 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-2 flex items-center justify-between border-t border-[var(--border-light)]/50 mt-4">
                    <Link
                      href={`/portfolio/${col.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-sans tracking-[0.14em] uppercase font-medium text-[var(--black)] group-hover:text-[var(--terracotta)] transition-colors"
                    >
                      <span>Explore Details</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-sans text-[var(--pine)] hover:text-[var(--terracotta)] transition-colors"
                      title="Quick Quote on WhatsApp"
                      aria-label={`Ask about ${col.title} on WhatsApp`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="hidden sm:inline">Ask</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Occasion custom advisory callout */}
          <div
            className="mt-20 rounded-[var(--radius-card)] bg-[var(--ivory-warm)] border border-[var(--border-light)] p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-sm"
            data-reveal="fade-up"
          >
            <h3 className="font-serif text-2xl sm:text-3xl text-[var(--black)] font-normal mb-3">
              Have a unique occasion in mind?
            </h3>
            <p className="font-sans text-base text-[var(--pine)] font-light leading-relaxed mb-6">
              Our catalogue is limitless because every package is assembled for your corporate context. Tell us about your audience, quantity, and budget, and we will formulate a personalized proposal.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--black)] hover:bg-[var(--chestnut)] text-[var(--ivory)] font-sans text-xs tracking-[0.14em] uppercase font-medium transition-colors duration-300"
            >
              <span>Consult With Our Curators</span>
              <ArrowUpRight className="w-4 h-4 text-[var(--copper)]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to action band */}
      <CTABand />
    </div>
  );
}
