import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CollectionGallery } from "@/components/sections/CollectionGallery";
import { ProductCatalog } from "@/components/sections/ProductCatalog";
import { CTABand } from "@/components/sections/CTABand";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio · Corporate Gifting",
  description: "Explore Naqsh's corporate gifting collections and client product range.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <div className="bg-[var(--ivory)] min-h-screen">
      <PageHero
        title="Gifts shaped around the occasion."
        subtitle="Explore our collections and the products selected for corporate gifting."
        label="Product Portfolio"
        breadcrumbs={[{ label: "Portfolio" }]}
      />
      <CollectionGallery />
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
