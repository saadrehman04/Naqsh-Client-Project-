import Image from "next/image";
import Link from "next/link";
import { collections } from "@/content/collections";

export function CollectionGallery() {
  return (
    <section className="collection-gallery" data-horizontal-gallery aria-label="Gifting collections">
      <div className="collection-gallery-intro container-x">
        <p className="t-label text-[var(--pine)]">Seven collections</p>
        <h2 className="t-h2">Gifts shaped around the occasion.</h2>
        <p>Explore our collections, then browse all 21 products below.</p>
      </div>
      <div className="collection-gallery-viewport">
        <div className="collection-gallery-track" data-horizontal-track>
          {collections.map((item, index) => (
            <Link href={`/portfolio/${item.slug}`} className="collection-gallery-item" key={item.slug} data-cursor-label="View">
              <span className="collection-gallery-image"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 1024px) 80vw, 32vw" /></span>
              <span className="collection-gallery-meta"><span className="collection-gallery-number">{String(index + 1).padStart(2, "0")}</span><span><strong>{item.title}</strong><small>{item.tagline}</small></span></span>
            </Link>
          ))}
        </div>
      </div>
      <div className="collection-gallery-bottom container-x"><span>Scroll to explore collections</span><span className="collection-gallery-rule" /></div>
    </section>
  );
}
