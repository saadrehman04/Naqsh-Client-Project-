import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ProductCatalog } from "@/components/sections/ProductCatalog";
import { portfolioContent } from "@/content/portfolio";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio & Gift Collections · Luxury Corporate Gifting",
  description:
    "Explore NAQSH's six corporate gifting collections and 21 customizable gift editions.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <div className="bg-[var(--ivory-deep)] min-h-screen">
      <PageHero
        title={portfolioContent.hero.title}
        subtitle={portfolioContent.hero.intro}
        image="/images/site/portfolio-cover.webp"
        imageTreatment="plain"
        imagePosition="center"
      />

      {/* Complete Product Catalogue */}
      <ProductCatalog />
    </div>
  );
}
