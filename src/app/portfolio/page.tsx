import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ProductCatalog } from "@/components/sections/ProductCatalog";
import { portfolioContent } from "@/content/portfolio";
import { JsonLd } from "@/components/seo/JsonLd";
import { collections } from "@/content/collections";
import { buildMetadata, generateBreadcrumbSchema, generateItemListSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio & Gift Collections · Luxury Corporate Gifting",
  description:
    "Explore NAQSH's six corporate gifting collections and 21 customizable gift editions.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={[
        generateBreadcrumbSchema([{ name: "Portfolio", path: "/portfolio" }]),
        generateItemListSchema({
          name: "NAQSH Corporate Gifting Collections",
          description: "Corporate gifting collections by NAQSH.",
          path: "/portfolio",
          items: collections.map((c) => ({ name: c.title, url: `/portfolio/${c.slug}`, image: c.image, description: c.tagline })),
        }),
      ]} />
    <div className="bg-[var(--ivory-deep)] min-h-screen">
      <PageHero
        title={portfolioContent.hero.title}
        subtitle={portfolioContent.hero.intro}
        label={portfolioContent.hero.label}
        image="/images/site/portfolio-cover.webp"
        imageTreatment="plain"
        imagePosition="center"
      />

      {/* Complete Product Catalogue */}
      <ProductCatalog />
    </div>
    </>
  );
}
