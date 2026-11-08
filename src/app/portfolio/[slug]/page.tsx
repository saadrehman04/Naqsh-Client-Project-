import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { collections, getCollectionBySlug } from "@/content/collections";
import { products } from "@/content/products";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return collections.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  return collection
    ? buildMetadata({
        title: `${collection.title} · Corporate Gifting Collection`,
        description: `${collection.tagline} Explore customizable ${collection.title.toLowerCase()} by NAQSH.`,
        path: `/portfolio/${slug}`,
        image: collection.image,
      })
    : {};
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();
  const items = products.filter((product) => product.collection === slug);

  return (
    <div className="min-h-screen bg-[var(--ivory-deep)]">
      <PageHero
        title={collection.title}
        subtitle={collection.tagline}
        label="Gifting Collection"
        breadcrumbs={[
          { label: "Portfolio", href: "/portfolio" },
          { label: collection.title },
        ]}
        image={collection.image}
        imageAlt={collection.alt}
      />

      <section className="section-y">
        <div className="container-x space-y-16">
          <div className="collection-detail-lead rounded-2xl sm:rounded-3xl bg-[#101D19] text-[var(--ivory)] p-6 sm:p-8 lg:p-10 border border-[#C99A53]/25 shadow-xl">
            <div
              className="collection-detail-image rounded-xl overflow-hidden"
              data-reveal="clip"
              data-parallax="0.08"
            >
              <Image
                src={collection.image}
                alt={collection.alt}
                fill
                priority
                sizes="(max-width: 800px) 100vw, 50vw"
                className="scale-[1.15] object-cover"
              />
            </div>
            <div data-reveal="stagger" data-stagger="0.1" className="space-y-4">
              <p className="t-label text-[#C99A53]">{collection.title}</p>
              <h2 className="t-h2 text-[var(--ivory)]">Curated Editions</h2>
              <p className="text-[var(--ivory)]/80 leading-relaxed">
                Every edition in this collection is tailored around your brand identity, occasion, and budget—with bespoke rigid packaging, logo debossing or engraving, and personalized greeting cards.
              </p>
              <div className="pt-2">
                <Link
                  href={`/contact?collection=${collection.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#F0B87A] via-[#C99A53] to-[#B86C35] text-[#101010] text-xs font-sans uppercase tracking-[0.14em] font-bold"
                >
                  <span>Request Collection Proposal</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            data-reveal="stagger"
            data-stagger="0.08"
          >
            {items.map((product) => (
              <article
                key={product.slug}
                className="rounded-2xl bg-[var(--ivory)] border border-[var(--hairline)] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] bg-[#12100E] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <span className="text-[11px] font-sans uppercase tracking-[0.14em] text-[var(--pine)] font-semibold block">
                      {collection.title}
                    </span>
                    <h3 className="font-serif text-2xl text-[var(--black)] font-normal">
                      {product.name}
                    </h3>
                    <p className="text-sm font-sans text-[var(--charcoal)] font-light leading-relaxed">
                      {product.description}
                    </p>
                    {product.customization && product.customization.length > 0 && (
                      <ul className="pt-3 border-t border-[var(--hairline)] space-y-1.5">
                        {product.customization.map((c) => (
                          <li
                            key={c}
                            className="flex items-start gap-2 text-xs text-[var(--charcoal)] font-sans"
                          >
                            <Check className="w-3.5 h-3.5 text-[var(--pine)] shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="px-6 pb-6 pt-3 border-t border-[var(--hairline)]">
                  <Link
                    href={`/contact?product=${product.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#101D19] hover:bg-[var(--chestnut)] text-[var(--ivory)] text-xs font-sans uppercase tracking-[0.14em] font-semibold transition-colors"
                  >
                    <span>Inquire About This Gift</span>
                    <ArrowUpRight className="w-4 h-4 text-[#C99A53]" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
