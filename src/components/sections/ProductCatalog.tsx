"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { collections } from "@/content/collections";
import { products, type Product } from "@/content/products";

export function ProductCatalog() {
  const [collection, setCollection] = useState("all");
  const [selected, setSelected] = useState<Product | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const visibleProducts = useMemo(
    () => products.filter((item) => collection === "all" || item.collection === collection),
    [collection],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected && !dialog.open) dialog.showModal();
    if (!selected && dialog.open) dialog.close();
  }, [selected]);

  return (
    <section id="all-products" className="product-catalog section-y bg-[var(--ivory)]" aria-labelledby="all-products-heading">
      <div className="container-x">
        <div className="catalog-heading" data-reveal="fade-up">
          <p className="t-label text-[var(--pine)]">Product catalogue</p>
          <h2 id="all-products-heading" className="t-h2">All products</h2>
          <p className="max-w-2xl text-base leading-relaxed text-[var(--charcoal)] sm:text-lg">Our solutions are designed around corporate occasions rather than a fixed catalogue.</p>
        </div>

        <div className="catalog-filters" role="group" aria-label="Filter products by collection">
          <button type="button" className={collection === "all" ? "catalog-filter is-selected" : "catalog-filter"} aria-pressed={collection === "all"} onClick={() => setCollection("all")}>All products</button>
          {collections.map((item) => (
            <button key={item.slug} type="button" className={collection === item.slug ? "catalog-filter is-selected" : "catalog-filter"} aria-pressed={collection === item.slug} onClick={() => setCollection(item.slug)}>{item.title}</button>
          ))}
        </div>

        <div className="product-grid" data-reveal="collage" aria-live="polite">
          {visibleProducts.map((item) => {
            const collectionName = collections.find((entry) => entry.slug === item.collection)?.title ?? item.collection;
            return (
              <button key={item.slug} type="button" className="product-tile" onClick={() => setSelected(item)} data-cursor-label="View">
                <span className="product-tile-image">
                  <Image src={item.image} alt={item.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <span className="product-tile-open" aria-hidden="true">View</span>
                </span>
                <span className="product-tile-meta">
                  <span className="product-tile-title">{item.name}</span>
                  <span className="product-tile-collection">{collectionName}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <dialog ref={dialogRef} className="product-dialog" aria-label={selected?.name ?? "Product details"} onClose={() => setSelected(null)}>
        {selected && (
          <div className="product-dialog-content">
            <button type="button" className="product-dialog-close" onClick={() => dialogRef.current?.close()} aria-label="Close product details"><X size={20} /></button>
            <div className="product-dialog-image"><Image src={selected.image} alt={selected.alt} fill sizes="(max-width: 768px) 100vw, 60vw" /></div>
            <div className="product-dialog-copy">
              <p className="t-label text-[var(--pine)]">{collections.find((item) => item.slug === selected.collection)?.title}</p>
              <h2 className="t-h2">{selected.name}</h2>
              <p className="text-base leading-relaxed text-[var(--charcoal)]">Request a quote for this product.</p>
              <Link className="btn" href={`/contact?product=${selected.slug}`} onClick={() => dialogRef.current?.close()}>
                <span>Request a quote</span><span className="btn-arrow" aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
