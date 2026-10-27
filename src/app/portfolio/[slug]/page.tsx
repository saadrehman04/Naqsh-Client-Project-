import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { collections, getCollectionBySlug } from "@/content/collections";
import { products } from "@/content/products";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return collections.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; const collection = getCollectionBySlug(slug);
  return collection ? buildMetadata({ title: `${collection.title} · Corporate Gifting`, description: collection.tagline, path: `/portfolio/${slug}`, image: collection.image }) : {};
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params; const collection = getCollectionBySlug(slug); if (!collection) notFound();
  const items = products.filter((product) => product.collection === slug);
  return <div className="min-h-screen bg-[var(--ivory)]">
    <PageHero title={collection.title} subtitle={collection.tagline} label="Gifting Collection" breadcrumbs={[{ label: "Portfolio", href: "/portfolio" }, { label: collection.title }]} />
    <section className="section-y"><div className="container-x">
      <div className="collection-detail-lead"><div className="collection-detail-image"><Image src={collection.image} alt={collection.alt} fill priority sizes="(max-width: 800px) 100vw, 50vw" /></div><div><p className="t-label text-[var(--pine)]">{collection.title}</p><h2 className="t-h2">Selected products</h2><p className="text-[var(--charcoal)] leading-relaxed">Explore the client-provided products in this collection.</p></div></div>
      <div className="product-grid collection-detail-grid">{items.map((product) => <Link className="product-tile" key={product.slug} href={`/contact?product=${product.slug}`}><span className="product-tile-image"><Image src={product.image} alt={product.alt} fill sizes="(max-width: 640px) 100vw, 33vw" /></span><span className="product-tile-meta"><span className="product-tile-title">{product.name}</span><span className="product-tile-collection">Request a quote ↗</span></span></Link>)}</div>
    </div></section><CTABand title="Request a consultation" />
  </div>;
}
