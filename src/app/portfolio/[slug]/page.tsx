import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowRight, ArrowLeft, MessageCircle } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CTABand } from "@/components/sections/CTABand";
import { collections, getCollectionBySlug } from "@/content/collections";
import { products } from "@/content/products";
import { getCollectionWhatsAppUrl } from "@/lib/whatsapp";
import { buildMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return collections.map((col) => ({
    slug: col.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const col = getCollectionBySlug(slug);

  if (!col) return {};

  return buildMetadata({
    title: `${col.title} · Corporate Gifting Collection`,
    description: `${col.tagline} ${col.description}`,
    path: `/portfolio/${col.slug}`,
    image: col.image,
  });
}

export default async function CollectionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const col = getCollectionBySlug(slug);

  if (!col) {
    notFound();
  }

  const currentIndex = collections.findIndex((c) => c.slug === slug);
  const prevCollection =
    currentIndex > 0 ? collections[currentIndex - 1] : collections[collections.length - 1];
  const nextCollection =
    currentIndex < collections.length - 1 ? collections[currentIndex + 1] : collections[0];

  const collectionProducts = products.filter((p) => p.collection === slug);
  const whatsappUrl = getCollectionWhatsAppUrl(col.title);

  return (
    <div className="bg-[var(--ivory)] min-h-screen">
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-[var(--border-light)] bg-[var(--ivory-warm)]/70 pt-28 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Portfolio", href: "/portfolio" },
              { label: col.title },
            ]}
          />
        </div>
      </div>

      {/* Collection Hero */}
      <section className="py-12 sm:py-20 border-b border-[var(--border-light)]" aria-label="Collection Overview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 flex flex-col justify-center" data-reveal="fade-up">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-[var(--pine)] text-[var(--ivory)] text-[10px] tracking-[0.2em] uppercase font-sans font-semibold">
                  Occasion Collection {String(currentIndex + 1).padStart(2, "0")}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--black)] leading-[1.15] mb-5 tracking-tight">
                {col.title}
              </h1>
              <p className="font-serif text-xl sm:text-2xl text-[var(--terracotta-deep)] font-normal italic leading-relaxed mb-6">
                &ldquo;{col.tagline}&rdquo;
              </p>
              <p className="font-sans text-base sm:text-lg text-[var(--charcoal)] font-light leading-relaxed mb-8">
                {col.description}
              </p>

              {/* Rich Inclusions Box with Terracotta / Pine styling */}
              <div className="rounded-[var(--radius-card)] bg-[var(--ivory-warm)] border-l-4 border-[var(--terracotta-deep)] border-y border-r border-[var(--border-light)] p-6 sm:p-8 mb-8 shadow-sm">
                <h2 className="font-sans text-xs tracking-[0.18em] uppercase font-semibold text-[var(--chestnut)] mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--terracotta)]" />
                  <span>Typical Collection Inclusions</span>
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {col.typicalInclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 w-4 h-4 rounded-full bg-[var(--terracotta)]/15 text-[var(--terracotta-deep)] flex items-center justify-center mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span className="font-sans text-xs sm:text-sm text-[var(--black)]/85 font-light">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Consultation Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href={`/contact?collection=${col.slug}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[var(--terracotta-deep)] hover:bg-[var(--chestnut)] text-[var(--ivory)] font-sans text-xs tracking-[0.14em] uppercase font-semibold transition-all duration-300 shadow-md hover:scale-[1.02]"
                >
                  <span>Request Custom Proposal</span>
                  <ArrowRight className="w-4 h-4 text-[var(--khaki)]" />
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[var(--pine)] hover:bg-[#0E3D30] text-[var(--ivory)] font-sans text-xs tracking-[0.14em] uppercase font-semibold transition-all duration-300 shadow-md hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4 text-[var(--khaki)]" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-6" data-reveal="fade-up">
              <div className="relative aspect-[4/3] rounded-[var(--radius-card)] overflow-hidden bg-[var(--ivory-warm)] border-2 border-[var(--copper)]/40 shadow-2xl">
                <Image
                  src={col.image}
                  alt={col.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery of Products for this Collection */}
      {collectionProducts.length > 0 && (
        <section className="py-20 sm:py-28" aria-label="Curated Pieces in this Collection">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12 sm:mb-16" data-reveal="fade-up">
              <SectionLabel variant="pine" className="mb-3">
                Curated Gallery
              </SectionLabel>
              <h2 className="font-serif text-3xl sm:text-4xl text-[var(--black)] font-normal tracking-tight">
                Featured Pieces & Arrangements
              </h2>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              data-reveal="stagger"
            >
              {collectionProducts.map((prod) => (
                <div
                  key={prod.slug}
                  className="group bg-[var(--ivory)] border border-[var(--border-light)] rounded-[var(--radius-card)] overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[var(--copper)] flex flex-col justify-between"
                  style={{
                    borderTop: "3px solid var(--copper)",
                  }}
                >
                  <div className="relative aspect-[4/3] w-full bg-[var(--ivory-deep)] overflow-hidden">
                    <Image
                      src={prod.image}
                      alt={prod.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-105"
                    />
                    {prod.group && (
                      <span className="absolute top-4 left-4 inline-flex items-center text-[10px] uppercase tracking-[0.16em] font-semibold px-2.5 py-1 rounded-full bg-[var(--black)]/80 text-[var(--khaki)] backdrop-blur-sm shadow-sm">
                        {prod.group}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl text-[var(--black)] font-normal group-hover:text-[var(--terracotta)] transition-colors duration-300">
                      {prod.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pagination / Prev & Next Collection Navigation */}
      <section
        className="py-12 bg-[var(--ivory-warm)] border-t border-[var(--border-light)]"
        aria-label="Collection Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link
              href={`/portfolio/${prevCollection.slug}`}
              className="group inline-flex items-center gap-3 text-left w-full sm:w-auto"
            >
              <div className="w-10 h-10 rounded-full border border-[var(--border-light)] bg-[var(--ivory)] flex items-center justify-center text-[var(--black)] group-hover:bg-[var(--pine)] group-hover:text-[var(--ivory)] transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] tracking-[0.18em] uppercase text-[var(--pine)] font-sans font-semibold">
                  Previous Collection
                </span>
                <span className="font-serif text-base text-[var(--black)] group-hover:text-[var(--terracotta)] transition-colors">
                  {prevCollection.title}
                </span>
              </div>
            </Link>

            <Link
              href="/portfolio"
              className="text-xs uppercase tracking-[0.16em] font-sans font-semibold text-[var(--chestnut)] hover:text-[var(--black)] transition-colors"
            >
              All 7 Collections
            </Link>

            <Link
              href={`/portfolio/${nextCollection.slug}`}
              className="group inline-flex items-center gap-3 text-right w-full sm:w-auto justify-end"
            >
              <div>
                <span className="block text-[10px] tracking-[0.18em] uppercase text-[var(--pine)] font-sans font-semibold">
                  Next Collection
                </span>
                <span className="font-serif text-base text-[var(--black)] group-hover:text-[var(--terracotta)] transition-colors">
                  {nextCollection.title}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full border border-[var(--border-light)] bg-[var(--ivory)] flex items-center justify-center text-[var(--black)] group-hover:bg-[var(--pine)] group-hover:text-[var(--ivory)] transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to action band */}
      <CTABand
        title={`Ready to tailor ${col.title}?`}
        subline="Every kit can be adapted to your branding guidelines, recipient demographic, and budget parameters."
      />
    </div>
  );
}
