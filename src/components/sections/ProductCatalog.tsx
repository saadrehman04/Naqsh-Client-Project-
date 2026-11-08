"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { X, Check, ArrowUpRight } from "lucide-react";
import { collections } from "@/content/collections";
import { products, type Product } from "@/content/products";

export function ProductCatalog() {
  const [collection, setCollection] = useState("all");
  const [selected, setSelected] = useState<Product | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const visibleProducts = useMemo(
    () =>
      products.filter(
        (item) => collection === "all" || item.collection === collection
      ),
    [collection]
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected && !dialog.open) dialog.showModal();
    if (!selected && dialog.open) dialog.close();
  }, [selected]);

  return (
    <section
      id="all-products"
      className="product-catalog section-y bg-[var(--ivory)]"
      aria-labelledby="all-products-heading"
    >
      <div className="container-x">
        <div className="catalog-heading">
          <p className="t-label text-[var(--pine)]" data-reveal="up">
            Curated Product Catalogue
          </p>
          <h2 id="all-products-heading" className="t-h2" data-reveal="lines">
            Explore Our Gift Editions.
          </h2>
          <p
            className="max-w-2xl text-base leading-relaxed text-[var(--charcoal)] sm:text-lg"
            data-reveal="up"
            data-delay="0.08"
          >
            Browse 21 signature NAQSH gifting editions across our seven collections. Every gift can be tailored around your brand identity, occasion, and budget.
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
            className={
              collection === "all"
                ? "catalog-filter is-selected"
                : "catalog-filter"
            }
            aria-pressed={collection === "all"}
            onClick={() => setCollection("all")}
          >
            All Editions ({products.length})
          </button>
          {collections.map((item) => (
            <button
              key={item.slug}
              type="button"
              className={
                collection === item.slug
                  ? "catalog-filter is-selected"
                  : "catalog-filter"
              }
              aria-pressed={collection === item.slug}
              onClick={() => setCollection(item.slug)}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div
          className="product-grid"
          data-reveal="stagger"
          data-stagger="0.08"
          aria-live="polite"
        >
          {visibleProducts.map((item) => {
            const collectionName =
              collections.find((entry) => entry.slug === item.collection)
                ?.title ?? item.collection;
            return (
              <button
                key={item.slug}
                type="button"
                className="product-tile text-left"
                onClick={() => setSelected(item)}
                data-cursor-label="Inspect"
              >
                <span className="product-tile-image">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="product-tile-open" aria-hidden="true">
                    Request Details
                  </span>
                </span>
                <span className="product-tile-meta">
                  <span className="product-tile-title">{item.name}</span>
                  <span className="product-tile-collection">
                    {collectionName}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="product-dialog"
        aria-label={selected?.name ?? "Product details"}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <div className="product-dialog-content">
            <button
              type="button"
              className="product-dialog-close"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close product details"
            >
              <X size={20} />
            </button>
            <div className="product-dialog-image">
              <Image
                src={selected.image}
                alt={selected.alt}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>
            <div className="product-dialog-copy space-y-4">
              <p className="t-label text-[var(--pine)]">
                {
                  collections.find((item) => item.slug === selected.collection)
                    ?.title
                }
              </p>
              <h2 className="t-h2">{selected.name}</h2>
              <p className="text-sm sm:text-base leading-relaxed text-[var(--charcoal)]">
                {selected.description}
              </p>

              {selected.customization && selected.customization.length > 0 && (
                <div className="pt-3 border-t border-[var(--hairline)]">
                  <span className="text-xs font-sans uppercase tracking-[0.14em] font-semibold text-[var(--black)] block mb-2">
                    Available Customization
                  </span>
                  <ul className="space-y-1.5">
                    {selected.customization.map((customItem) => (
                      <li
                        key={customItem}
                        className="flex items-start gap-2 text-xs sm:text-sm text-[var(--charcoal)] font-sans"
                      >
                        <Check className="w-4 h-4 text-[var(--pine)] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{customItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <Link
                  className="btn"
                  href={`/contact?product=${selected.slug}`}
                  onClick={() => dialogRef.current?.close()}
                >
                  <span>Inquire About This Gift</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
