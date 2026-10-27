import { DISPLAY_PHONE, WHATSAPP_NUMBER } from "@/lib/whatsapp";

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
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
  policies: NavItem[];
  socials: SocialLink[];
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
  email: null, // [CONFIRM: email not yet provided by client]
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
  policies: [
    { label: "Data Privacy", href: "/privacy" },
    { label: "Shipping & Delivery", href: "/shipping-delivery" },
  ],
  // Rule: Hidden until real content exists. Never invent fake logos or testimonials.
  socials: [],
  testimonials: [],
  clientLogos: [],
};
