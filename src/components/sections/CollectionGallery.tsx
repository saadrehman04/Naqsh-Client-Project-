import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { collections } from "@/content/collections";
import { homeContent } from "@/content/home";

export function CollectionGallery() {
  const { collectionsSection } = homeContent;
  return (
    <section className="collection-gallery" aria-label="Gifting collections">
      <div className="collection-gallery-pin" data-horizontal-gallery>
        <div className="collection-gallery-intro container-x">
          <p className="t-label text-[var(--pine)]" data-reveal="up">
            {collectionsSection.label}
          </p>
          <h2 className="t-h2" data-reveal="lines">
            {collectionsSection.heading}
          </h2>
          <p data-reveal="up" data-delay="0.08">
            {collectionsSection.intro}
          </p>
        </div>
        <div className="collection-gallery-viewport container-x">
          <div
            className="collection-gallery-track"
            data-horizontal-track
          >
            {collections.map((item, index) => (
              <Link
                href={`/portfolio/${item.slug}`}
                className="collection-gallery-item group"
                key={item.slug}
                data-cursor-label="Explore"
              >
                <span className="collection-gallery-image overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) 80vw, 32vw"
                  />
                </span>
                <span className="collection-gallery-meta">
                  <span className="collection-gallery-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <strong>{item.title}</strong>
                    <small>{item.tagline}</small>
                    <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-sans uppercase tracking-[0.14em] font-semibold text-[var(--chestnut)] group-hover:translate-x-0.5 transition-transform">
                      <span>Explore Collection</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="collection-gallery-bottom container-x">
          <span>Seven curated corporate gifting collections · Tailored to your brand</span>
          <span className="collection-gallery-progress" aria-hidden="true">
            <span className="collection-gallery-progress-fill collection-gallery-rule" />
          </span>
        </div>
      </div>
    </section>
  );
}
