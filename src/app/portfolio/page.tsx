import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CollectionGallery } from "@/components/sections/CollectionGallery";
import { SignatureProjects } from "@/components/sections/SignatureProjects";
import { ProductCatalog } from "@/components/sections/ProductCatalog";
import { CTABand } from "@/components/sections/CTABand";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio & Gift Collections · Luxury Corporate Gifting",
  description:
    "Explore NAQSH's seven corporate gifting collections, signature curation concepts, and 21 customizable gift editions.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <div className="bg-[var(--ivory-deep)] min-h-screen">
      <PageHero
        title="Explore Our Gift Collections & Portfolio."
        subtitle="Discover our seven signature corporate gifting collections, concept presentations, and customizable product catalogue."
        label="Portfolio & Catalogue"
        breadcrumbs={[{ label: "Portfolio" }]}
        image="/images/products/pakistan-heritage-gift-set.webp"
      />

      {/* Section Navigation Bar */}
      <div className="bg-[#101D19] border-b border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#C99A53] font-semibold">
            Portfolio Directory
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <a
              href="#collections-showcase"
              className="px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-[#C99A53] text-[var(--ivory)] hover:text-[#101010] border border-white/10 text-xs font-sans transition-colors"
            >
              A · Seven Collections
            </a>
            <a
              href="#signature-concepts"
              className="px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-[#C99A53] text-[var(--ivory)] hover:text-[#101010] border border-white/10 text-xs font-sans transition-colors"
            >
              B · Signature Concepts
            </a>
            <a
              href="#all-products"
              className="px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-[#C99A53] text-[var(--ivory)] hover:text-[#101010] border border-white/10 text-xs font-sans transition-colors"
            >
              C · Product Catalogue (21)
            </a>
          </div>
        </div>
      </div>

      {/* A. Seven Signature Collections */}
      <div id="collections-showcase">
        <CollectionGallery />
      </div>

      {/* B. Signature Gifting Concepts */}
      <div id="signature-concepts">
        <SignatureProjects />
      </div>

      {/* C. Complete Product Catalogue */}
      <ProductCatalog />

      <div
        className="portfolio-marquee"
        aria-label="Welcome Kits · Client Gifts · Ramadan and Eid · Event Giveaways · Souvenirs · Awards"
      >
        <div className="portfolio-marquee-track" data-marquee-track>
          <span>
            Welcome Kits · Client Gifts · Ramadan &amp; Eid · Event Giveaways · Souvenirs · Awards ·{" "}
          </span>
          <span aria-hidden="true">
            Welcome Kits · Client Gifts · Ramadan &amp; Eid · Event Giveaways · Souvenirs · Awards ·{" "}
          </span>
        </div>
      </div>

      <CTABand />
    </div>
  );
}
