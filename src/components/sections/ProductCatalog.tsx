"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { collections } from "@/content/collections";
import { products, type Product } from "@/content/products";

// Company profile, "PRODUCT PORTFOLIO" (client copy, wording as sent 2026-11-19).
const PORTFOLIO_INTRO =
  "Our solutions are designed around corporate occasions rather than a fixed catalogue. We curate, source, customize, and deliver gifting experiences tailored to each client’s objectives, brand identity, audience, and budget. These include, but are not limited to the following:";

const byTitle = (a: { title: string }, b: { title: string }) => a.title.localeCompare(b.title);
const byName = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name);

// Client request: tabs and products listed alphabetically.
const sortedCollections = [...collections].sort(byTitle);
const sortedProducts = [...products].sort(byName);

/**
 * Product catalogue (Portfolio page). Filter tabs by collection; each card shows the photo,
 * the name and a "Request Details" link to the consultation form (prefilled with the product).
 * Clicking the photo opens it enlarged in a lightbox, with no text.
 */
export function ProductCatalog() {
  const [collection, setCollection] = useState("all");
  const [enlarged, setEnlarged] = useState<Product | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const visibleProducts = useMemo(
    () => sortedProducts.filter((item) => collection === "all" || item.collection === collection),
    [collection]
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (enlarged && !dialog.open) dialog.showModal();
    if (!enlarged && dialog.open) dialog.close();
  }, [enlarged]);

  return (
    <section
      id="all-products"
      className="product-catalog section-y bg-[var(--ivory)]"
      aria-labelledby="all-products-heading"
    >
      <div className="container-x">
        <div className="catalog-heading">
          <h2 id="all-products-heading" className="t-h2" data-reveal="lines">
            Explore Our Gift Editions.
          </h2>
          <p
            className="mt-5 max-w-[46rem] font-sans text-[length:var(--fs-body)] leading-[1.75] text-[var(--charcoal)] [text-wrap:pretty]"
            data-reveal="up"
            data-delay="0.06"
          >
            {PORTFOLIO_INTRO}
          </p>
        </div>

        <div
          className="catalog-filters"
          role="group"
          aria-label="Filter products by collection"
          data-reveal="up"
          data-delay="0.12"
        >
          <button
            type="button"
            className={collection === "all" ? "catalog-filter is-selected" : "catalog-filter"}
            aria-pressed={collection === "all"}
            onClick={() => setCollection("all")}
          >
            All
          </button>
          {sortedCollections.map((item) => (
            <button
              key={item.slug}
              type="button"
              className={collection === item.slug ? "catalog-filter is-selected" : "catalog-filter"}
              aria-pressed={collection === item.slug}
              onClick={() => setCollection(item.slug)}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="product-grid" data-reveal="stagger" data-stagger="0.08" aria-live="polite">
          {visibleProducts.map((item) => (
            <article key={item.slug} className="product-tile">
              <button
                type="button"
                className="product-tile-image"
                onClick={() => setEnlarged(item)}
                aria-label={`Enlarge photo: ${item.name}`}
                data-cursor-label="View"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                />
              </button>
              <div className="product-tile-meta">
                <h3 className="product-tile-title">{item.name}</h3>
                <Link
                  href={`/contact?product=${item.slug}#request-form`}
                  target="_blank"
                  rel="noopener"
                  className="product-tile-request"
                >
                  Request Details
                  <span className="sr-only"> (opens in a new tab)</span>
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox: the photo only. Click outside the photo, the close button or Escape to close. */}
      <dialog
        ref={dialogRef}
        className="product-lightbox"
        aria-label={enlarged ? `${enlarged.name} photo` : "Product photo"}
        onClose={() => setEnlarged(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
      >
        {enlarged && (
          <>
            <button
              type="button"
              className="product-lightbox-close"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close enlarged photo"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
            <Image
              src={enlarged.image}
              alt={enlarged.alt}
              width={1600}
              height={1200}
              sizes="92vw"
              quality={80}
              loading="eager"
              className="product-lightbox-image"
            />
          </>
        )}
      </dialog>
    </section>
  );
}
