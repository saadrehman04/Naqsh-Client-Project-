import Image from "next/image";
import Link from "next/link";
import { collections } from "@/content/collections";

export function CollectionGallery() {
  return (
    <section className="collection-gallery" aria-label="Gifting collections">
      <div className="collection-gallery-pin" data-horizontal-gallery>
        <div className="collection-gallery-intro container-x">
          <p className="t-label text-[var(--pine)]" data-reveal="up">
            Seven collections
          </p>
          <h2 className="t-h2" data-reveal="lines">
            Gifts shaped around the occasion.
          </h2>
          <p data-reveal="up" data-delay="0.08">
            Explore our collections, then browse all 21 products below.
          </p>
        </div>
        <div className="collection-gallery-viewport container-x">
          <div
            className="collection-gallery-track"
            data-horizontal-track
            data-reveal="stagger"
            data-stagger="0.08"
          >
            {collections.map((item, index) => (
              <Link
                href={`/portfolio/${item.slug}`}
                className="collection-gallery-item"
                key={item.slug}
                data-cursor-label="View"
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
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.tagline}</small>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="collection-gallery-bottom container-x">
          <span>Thoughtful gifting, shaped around the occasion</span>
          <span className="collection-gallery-progress" aria-hidden="true">
            <span className="collection-gallery-progress-fill collection-gallery-rule" />
          </span>
        </div>
      </div>
    </section>
  );
}
