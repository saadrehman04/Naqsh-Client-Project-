import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, Sparkles } from "lucide-react";
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
  const collectionBadges = [
    { bg: "bg-[var(--pine)]", text: "text-[var(--ivory)]", border: "border-[var(--pine)]" },
    { bg: "bg-[var(--chestnut)]", text: "text-[var(--ivory)]", border: "border-[var(--chestnut)]" },
    { bg: "bg-[var(--terracotta-deep)]", text: "text-[var(--ivory)]", border: "border-[var(--terracotta)]" },
    { bg: "bg-[var(--copper)]", text: "text-[var(--ivory)]", border: "border-[var(--copper)]" },
    { bg: "bg-[var(--charcoal)]", text: "text-[var(--ivory)]", border: "border-[var(--charcoal)]" },
    { bg: "bg-[var(--pine)]", text: "text-[var(--ivory)]", border: "border-[var(--pine)]" },
    { bg: "bg-[#4E6E4C]", text: "text-[var(--ivory)]", border: "border-[#4E6E4C]" },
  ];

  return (
    <div className="bg-[var(--ivory)] min-h-screen">
      {/* Editorial Page Hero */}
      <PageHero
        title="Occasion-driven curation for corporate moments."
        subtitle="Our solutions are designed around corporate occasions rather than a fixed catalogue. We curate, source, customize, and deliver gifting experiences tailored to each client's objectives, brand identity, audience, and budget."
        label="Product Portfolio"
        breadcrumbs={[{ label: "Portfolio" }]}
      />

      {/* Collections Grid with Colored Occasion Badges */}
      <section className="py-20 sm:py-28" aria-label="Gifting Collections">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
            data-reveal="stagger"
          >
            {collections.map((col, idx) => {
              const whatsappUrl = getCollectionWhatsAppUrl(col.title);
              const badge = collectionBadges[idx % collectionBadges.length];

              return (
                <div
                  key={col.slug}
                  id={col.slug}
                  className="group flex flex-col justify-between bg-[var(--ivory)] border border-[var(--border-light)] rounded-[var(--radius-card)] overflow-hidden transition-all duration-500 hover:border-[var(--copper)] hover:shadow-2xl shadow-sm"
                  style={{
                    borderTop: `4px solid ${
                      idx === 0 ? "var(--pine)" : idx === 1 ? "var(--chestnut)" : idx === 2 ? "var(--terracotta)" : idx === 3 ? "var(--copper)" : idx === 4 ? "var(--charcoal)" : idx === 5 ? "var(--pine)" : "#4E6E4C"
                    }`,
                  }}
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
                      <span className={`absolute top-4 left-4 z-10 inline-flex items-center text-[10px] uppercase tracking-[0.2em] font-semibold px-3 py-1 rounded-full shadow-md ${badge.bg} ${badge.text}`}>
                        Occasion {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 sm:p-8">
                      <h2 className="font-serif text-2xl text-[var(--black)] font-normal mb-2 group-hover:text-[var(--terracotta)] transition-colors duration-300">
                        <Link href={`/portfolio/${col.slug}`}>{col.title}</Link>
                      </h2>
                      <p className="font-sans text-sm text-[var(--charcoal)] font-light leading-relaxed mb-6">
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
                              className="text-xs text-[var(--chestnut)]/90 flex items-start gap-2"
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
                      className="inline-flex items-center gap-1.5 text-xs font-sans tracking-[0.14em] uppercase font-semibold text-[var(--black)] group-hover:text-[var(--terracotta)] transition-colors"
                    >
                      <span>Explore Details</span>
                      <ArrowUpRight className="w-4 h-4 text-[var(--copper)]" />
                    </Link>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-sans text-[var(--pine)] hover:text-[var(--terracotta)] transition-colors font-medium"
                      title="Quick Quote on WhatsApp"
                      aria-label={`Ask about ${col.title} on WhatsApp`}
                    >
                      <MessageCircle className="w-4 h-4 text-[var(--pine)]" />
                      <span className="hidden sm:inline">Ask</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rich Pine Teal Occasion Custom Advisory Banner */}
          <div
            className="mt-20 rounded-[var(--radius-card)] bg-[var(--pine)] text-[var(--ivory)] border border-[var(--sage)]/40 p-8 sm:p-14 text-center max-w-3xl mx-auto shadow-2xl relative overflow-hidden"
            data-reveal="fade-up"
          >
            <div
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[var(--copper)]/20 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] uppercase tracking-[0.2em] font-sans font-medium text-[var(--khaki)] mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[var(--khaki)]" />
                <span>Bespoke Occasion Gifting</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-[var(--ivory)] font-normal mb-3">
                Have a unique occasion in mind?
              </h3>
              <p className="font-sans text-base text-[var(--ivory)]/85 font-light leading-relaxed mb-8 max-w-xl mx-auto">
                Our catalogue is limitless because every package is assembled for your corporate context. Tell us about your audience, quantity, and budget, and we will formulate a personalized proposal.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--terracotta-deep)] hover:bg-[var(--chestnut)] text-[var(--ivory)] font-sans text-xs tracking-[0.16em] uppercase font-semibold transition-all duration-300 shadow-lg hover:scale-[1.02]"
              >
                <span>Consult With Our Curators</span>
                <ArrowUpRight className="w-4 h-4 text-[var(--khaki)]" />
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
