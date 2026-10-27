import { sanityClient, isSanityConfigured } from "./sanity";
import { collections, type Collection } from "@/content/collections";
import { products, type Product } from "@/content/products";
import { faqGroups, type FAQGroup } from "@/content/faqs";
import { siteConfig, type Testimonial, type ClientLogo, type SiteConfig } from "@/content/site";

export async function getCmsCollections(): Promise<Collection[]> {
  if (!isSanityConfigured || !sanityClient) {
    return collections;
  }
  try {
    const query = `*[_type == "collection"] | order(order asc) {
      "slug": slug.current,
      title,
      tagline,
      "image": heroImage.asset->url,
      alt,
      description,
      typicalInclusions
    }`;
    const result = await sanityClient.fetch<Collection[]>(query);
    return result && result.length > 0 ? result : collections;
  } catch (error) {
    console.warn("Sanity fetch failed for collections, falling back to local content:", error);
    return collections;
  }
}

export async function getCmsProducts(): Promise<Product[]> {
  if (!isSanityConfigured || !sanityClient) {
    return products;
  }
  try {
    const query = `*[_type == "product"] {
      name,
      "slug": slug.current,
      "image": image.asset->url,
      "collection": collection->slug.current,
      group,
      featured,
      alt
    }`;
    const result = await sanityClient.fetch<Product[]>(query);
    return result && result.length > 0 ? result : products;
  } catch (error) {
    console.warn("Sanity fetch failed for products, falling back to local content:", error);
    return products;
  }
}

export async function getCmsFaqs(): Promise<FAQGroup[]> {
  if (!isSanityConfigured || !sanityClient) {
    return faqGroups;
  }
  try {
    const query = `*[_type == "faq"] | order(order asc) {
      "id": _id,
      question,
      answer,
      group
    }`;
    const result = await sanityClient.fetch<{ id: string; question: string; answer: string; group: string }[]>(query);
    if (!result || result.length === 0) return faqGroups;

    // Group items by group name
    const groupedMap = new Map<string, any[]>();
    for (const item of result) {
      const g = item.group || "General";
      if (!groupedMap.has(g)) groupedMap.set(g, []);
      groupedMap.get(g)!.push(item);
    }
    return Array.from(groupedMap.entries()).map(([group, items]) => ({
      group,
      items,
    }));
  } catch (error) {
    console.warn("Sanity fetch failed for FAQs, falling back to local content:", error);
    return faqGroups;
  }
}

export async function getCmsTestimonials(): Promise<Testimonial[]> {
  if (!isSanityConfigured || !sanityClient) {
    return siteConfig.testimonials;
  }
  try {
    const query = `*[_type == "testimonial" && visible == true] {
      quote,
      name,
      role,
      company,
      "image": image.asset->url
    }`;
    const result = await sanityClient.fetch<Testimonial[]>(query);
    return result || [];
  } catch (error) {
    return siteConfig.testimonials;
  }
}

export async function getCmsClientLogos(): Promise<ClientLogo[]> {
  if (!isSanityConfigured || !sanityClient) {
    return siteConfig.clientLogos;
  }
  try {
    const query = `*[_type == "clientLogo" && visible == true] {
      name,
      "logo": logo.asset->url
    }`;
    const result = await sanityClient.fetch<ClientLogo[]>(query);
    return result || [];
  } catch (error) {
    return siteConfig.clientLogos;
  }
}
