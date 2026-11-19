import { DISPLAY_PHONE, WHATSAPP_NUMBER } from "@/lib/whatsapp";

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: "Instagram" | "LinkedIn";
  /** null until the client confirms the profile URL (shown as a dev-only [CONFIRM] flag). */
  url: string | null;
}

export interface FooterContent {
  discoverHeading: string;
  contactHeading: string;
  followHeading: string;
  copyright: string;
  /** Bottom line, end (client request 2026-11-19; "Nationwide Delivery" removed 2026-11-19). */
  locationLine: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  image?: string;
}

export interface ClientLogo {
  name: string;
  logo: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  slogan: string;
  phone: string;
  whatsappNumber: string;
  location: string;
  email: string | null;
  workingHours: string | null;
  responseTime: string | null;
  nav: NavItem[];
  /** Footer "Discover" list. */
  discover: NavItem[];
  socials: SocialLink[];
  footer: FooterContent;
  testimonials: Testimonial[];
  clientLogos: ClientLogo[];
}

export const siteConfig: SiteConfig = {
  name: "Naqsh",
  tagline: "Crafting Lasting Impressions",
  slogan: "Beyond the box, into an experience!",
  phone: DISPLAY_PHONE,
  whatsappNumber: WHATSAPP_NUMBER,
  location: "Lahore, Pakistan",
  email: "contact@naqshonline.co", // client-confirmed, Nov 2026
  workingHours: null, // [CONFIRM: working hours]
  responseTime: null, // [CONFIRM: response time promise]
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Our Approach", href: "/our-approach" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact", href: "/contact" },
  ],
  // Footer "Discover" list (client request 2026-11-19; order from "Website Content 2.pdf"). Our Philosophy → its own page,
  // Terms & Policies → the Data Privacy Policy page.
  discover: [
    { label: "Our Philosophy", href: "/our-philosophy" },
    { label: "Terms & Policies", href: "/privacy" },
    { label: "Shipping & Delivery", href: "/shipping-delivery" },
  ],
  // PLACEHOLDER links (client request 2026-11-16): the platforms' home pages, not real profiles.
  // [CONFIRM: replace with NAQSH's actual Instagram and LinkedIn profile URLs]
  socials: [
    { platform: "Instagram", url: "https://www.instagram.com/" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/" },
  ],
  footer: {
    discoverHeading: "Discover",
    contactHeading: "Get in Touch",
    followHeading: "Follow Us",
    copyright: "NAQSH. All rights reserved.",
    locationLine: "Lahore, Pakistan",
  },
  // Rule: Hidden until real content exists. Never invent fake logos or testimonials.
  testimonials: [],
  clientLogos: [],
};
