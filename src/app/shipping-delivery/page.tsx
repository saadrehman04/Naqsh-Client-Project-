import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PolicyContent } from "@/components/sections/PolicyContent";
import { shippingPolicy } from "@/content/policies";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: shippingPolicy.title,
  pageTitle: "Shipping and Delivery Policy, NAQSH",
  description: "NAQSH shipping and delivery terms: timelines, delivery methods, rates, tracking, failed deliveries and damaged items.",
  path: "/shipping-delivery",
});

export default function ShippingDeliveryPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema([{ name: shippingPolicy.title, path: "/shipping-delivery" }])} />
    <div className="bg-[var(--ivory-deep)] min-h-screen">
      {/* Editorial Page Hero (fade only on policy pages) */}
      <PageHero title={shippingPolicy.title} subtitle={shippingPolicy.intro} label={shippingPolicy.label} fadeOnly />

      <PolicyContent policy={shippingPolicy} />
    </div>
    </>
  );
}
