import { z } from "zod";

export const occasionOptions = [
  { value: "corporate-employee-gifting", label: "Corporate & Employee Gifting" },
  { value: "executive-client-gifting", label: "Executive & Client Gifting" },
  { value: "events-brand-merchandise", label: "Events & Brand Merchandise" },
  { value: "bespoke-seasonal-gifting", label: "Bespoke & Seasonal Gifting" },
  { value: "new-hire-welcome-kits", label: "Collection · New Hire Welcome Kits" },
  { value: "client-packages", label: "Collection · Client Packages" },
  { value: "ramadan-eid-baskets", label: "Collection · Ramadan & Eid Baskets" },
  { value: "annual-event-giveaways", label: "Collection · Annual Event Giveaways" },
  { value: "brand-souvenirs", label: "Collection · Brand Souvenirs" },
  { value: "appreciation-gifts", label: "Collection · Appreciation Gifts" },
  { value: "custom-occasion-gifts", label: "Collection · Custom & Occasion Specific Gifts" },
  { value: "other", label: "Other / Multiple Corporate Occasions" },
] as const;

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  company: z.string().trim().min(2, "Please enter your company name."),
  email: z
    .string()
    .trim()
    .email("Please provide a valid work email address."),
  phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || /^[\d\s+\-().]{7,20}$/.test(val),
      "Please enter a valid phone or WhatsApp number."
    ),
  occasion: z.string().min(1, "Please select a gifting category or occasion."),
  quantity: z.string().trim().optional(),
  budgetRange: z.string().trim().optional(),
  dateNeeded: z.string().trim().optional(),
  deliveryLocation: z.string().trim().optional(),
  message: z
    .string()
    .trim()
    .max(2000, "Message is too long (maximum 2000 characters).")
    .optional(),
  consent: z
    .boolean()
    .refine((val) => val === true, "You must agree to the Privacy Policy to proceed."),
  // Honeypot field: must remain empty to foil spam bots
  website: z.string().max(0, "Invalid submission.").optional(),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;
