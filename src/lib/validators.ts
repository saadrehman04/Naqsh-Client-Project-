import { z } from "zod";

export const occasionOptions = [
  { value: "corporate-employee-gifting", label: "Corporate & Employee Gifting" },
  { value: "executive-client-gifting", label: "Executive & Client Gifting" },
  { value: "events-brand-merchandise", label: "Events & Brand Merchandise" },
  { value: "bespoke-seasonal-gifting", label: "Bespoke & Seasonal Gifting" },
  { value: "new-hire-welcome-kits", label: "New Hire Welcome Kits" },
  { value: "client-packages", label: "Client Packages" },
  { value: "ramadan-eid-baskets", label: "Ramadan & Eid Baskets" },
  { value: "brand-souvenirs", label: "Brand Souvenirs" },
  { value: "appreciation-gifts", label: "Appreciation Gifts" },
  { value: "custom-occasion-gifts", label: "Custom & Occasion Specific Gifts" },
  { value: "other", label: "Other" },
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
  /** Free text, shown and required only when the category is "other". */
  occasionOther: z.string().trim().max(120, "Please keep this under 120 characters.").optional(),
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
}).superRefine((data, ctx) => {
  if (data.occasion === "other" && (data.occasionOther ?? "").length < 2) {
    ctx.addIssue({
      code: "custom",
      path: ["occasionOther"],
      message: "Please tell us the category or occasion.",
    });
  }
});

/** Readable category for emails/logs, including the visitor's own words for "Other". */
export function describeOccasion(occasion: string, other?: string): string {
  const label = occasionOptions.find((o) => o.value === occasion)?.label ?? occasion;
  return occasion === "other" && other ? `${label}: ${other}` : label;
}

export type InquiryFormData = z.infer<typeof inquirySchema>;
