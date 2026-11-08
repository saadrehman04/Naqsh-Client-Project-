import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CollectionGallery } from "@/components/sections/CollectionGallery";
import { ProductCatalog } from "@/components/sections/ProductCatalog";
import { CTABand } from "@/components/sections/CTABand";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio & Gift Collections · Luxury Corporate Gifting",
  description:
    "Explore NAQSH's seven corporate gifting collections and 21 customizable gift editions.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <div className="bg-[var(--ivory-deep)] min-h-screen">
      <PageHero
        title="Explore Our Gift Collections & Portfolio."
        subtitle="Discover our seven corporate gifting collections and customizable product catalogue."
        label="Portfolio & Catalogue"
        breadcrumbs={[{ label: "Portfolio" }]}
        image="/images/products/pakistan-heritage-gift-set.webp"
      />

      {/* Seven Collections */}
      <div id="collections-showcase">
        <CollectionGallery />
      </div>

      {/* Complete Product Catalogue */}
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
