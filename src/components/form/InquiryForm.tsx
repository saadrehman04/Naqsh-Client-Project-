"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { occasionOptions, inquirySchema } from "@/lib/validators";
import { FormSuccess } from "./FormSuccess";
import { products } from "@/content/products";

interface PrefillPayload {
  occasion?: string;
  occasionOther?: string;
  message?: string;
}

function SearchParamsSync({
  onPrefill,
}: {
  onPrefill: (payload: PrefillPayload) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const prefillCollection = searchParams.get("collection") || "";
    const prefillService = searchParams.get("service") || "";
    const productSlug = searchParams.get("product") || "";
    const prefillProduct = products.find((p) => p.slug === productSlug);

    let occasion = "";
    let occasionOther = "";
    if (prefillCollection) {
      const match = occasionOptions.find((o) => o.value === prefillCollection);
      if (match) occasion = match.value;
    } else if (prefillService) {
      const match = occasionOptions.find((o) => o.value === prefillService);
      if (match) {
        occasion = match.value;
      } else if (prefillService === "personalized-gifts") {
        occasion = "custom-occasion-gifts";
      } else if (prefillService === "gifting-consultations") {
        occasion = "other";
        occasionOther = "Gifting consultation";
      }
    } else if (prefillProduct) {
      occasion = prefillProduct.collection;
    }

    const message = prefillProduct
      ? `I would like to request details and customization options for "${prefillProduct.name}".`
      : "";

    if (occasion || message) {
      onPrefill({ occasion, occasionOther, message });
    }
  }, [searchParams, onPrefill]);

  return null;
}

export function InquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    occasion: "",
    occasionOther: "",
    quantity: "",
    budgetRange: "",
    dateNeeded: "",
    deliveryLocation: "",
    message: "",
    consent: false,
    website: "", // honeypot
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  const [serverError, setServerError] = useState<string | null>(null);

  const handlePrefill = React.useCallback((payload: PrefillPayload) => {
    setFormData((prev) => ({
      ...prev,
      occasion: prev.occasion || payload.occasion || "",
      occasionOther: prev.occasionOther || payload.occasionOther || "",
      message: prev.message || payload.message || "",
    }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const result = inquirySchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0]?.toString();
        if (path) fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Unable to submit your request.");
      }

      setSubmitCount((c) => c + 1);
      setSubmitSuccess(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again or reach out on WhatsApp.";
      setServerError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <FormSuccess
        clientName={formData.name}
        trigger={submitCount}
        onReset={() => {
          setSubmitSuccess(false);
          setFormData({
            name: "",
            company: "",
            email: "",
            phone: "",
            occasion: "",
            occasionOther: "",
            quantity: "",
            budgetRange: "",
            dateNeeded: "",
            deliveryLocation: "",
            message: "",
            consent: false,
            website: "",
          });
        }}
      />
    );
  }

  return (
    <>
      <Suspense fallback={null}>
        <SearchParamsSync onPrefill={handlePrefill} />
      </Suspense>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-[var(--ivory-deep)] border border-[var(--hairline)] rounded-[var(--radius-card)] p-5 sm:p-10 space-y-4 sm:space-y-5"
        aria-label="Corporate Gifting Consultation Form"
      >
        {serverError && (
          <div
            role="alert"
            className="flex items-start gap-3 p-4 rounded-lg bg-[var(--ivory)] border border-[var(--chestnut)] text-[var(--chestnut)] text-sm"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--chestnut)]" />
            <div>
              <p className="font-medium">Submission Notice</p>
              <p className="font-light mt-0.5">{serverError}</p>
            </div>
          </div>
        )}

        {/* Honeypot field */}
        <div
          className="opacity-0 absolute -z-50 h-0 w-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            value={formData.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="space-y-4 sm:space-y-5" data-reveal="stagger" data-stagger="0.06">
          {/* Row 1: Full Name & Company Name */}
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            <div>
              <label
                htmlFor="name"
                className="block text-[11px] sm:text-xs uppercase tracking-[0.12em] font-sans font-medium text-[var(--black)] mb-1.5"
              >
                Full Name <span className="text-[var(--terracotta)]">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Tariq Ahmed"
                className={`w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-lg bg-[var(--ivory)] border text-[var(--black)] placeholder:text-[var(--charcoal)]/45 font-sans text-sm transition-colors focus:outline-none focus:ring-1 ${
                  errors.name
                    ? "border-[var(--chestnut)] focus:border-[var(--chestnut)] focus:ring-[var(--chestnut)]"
                    : "border-[var(--hairline)] focus:border-[var(--terracotta)] focus:ring-[var(--terracotta)]"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-[var(--chestnut)] font-sans">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="company"
                className="block text-[11px] sm:text-xs uppercase tracking-[0.12em] font-sans font-medium text-[var(--black)] mb-1.5"
              >
                Company <span className="text-[var(--terracotta)]">*</span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                required
                value={formData.company}
                onChange={handleChange}
                placeholder="Apex Enterprises"
                className={`w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-lg bg-[var(--ivory)] border text-[var(--black)] placeholder:text-[var(--charcoal)]/45 font-sans text-sm transition-colors focus:outline-none focus:ring-1 ${
                  errors.company
                    ? "border-[var(--chestnut)] focus:border-[var(--chestnut)] focus:ring-[var(--chestnut)]"
                    : "border-[var(--hairline)] focus:border-[var(--terracotta)] focus:ring-[var(--terracotta)]"
                }`}
              />
              {errors.company && (
                <p className="mt-1 text-xs text-[var(--chestnut)] font-sans">
                  {errors.company}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Work Email & Phone / WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label
                htmlFor="email"
                className="block text-[11px] sm:text-xs uppercase tracking-[0.12em] font-sans font-medium text-[var(--black)] mb-1.5"
              >
                Work Email <span className="text-[var(--terracotta)]">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="tariq@company.com"
                className={`w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-lg bg-[var(--ivory)] border text-[var(--black)] placeholder:text-[var(--charcoal)]/45 font-sans text-sm transition-colors focus:outline-none focus:ring-1 ${
                  errors.email
                    ? "border-[var(--chestnut)] focus:border-[var(--chestnut)] focus:ring-[var(--chestnut)]"
                    : "border-[var(--hairline)] focus:border-[var(--terracotta)] focus:ring-[var(--terracotta)]"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-[var(--chestnut)] font-sans">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-[11px] sm:text-xs uppercase tracking-[0.12em] font-sans font-medium text-[var(--black)] mb-1.5"
              >
                Phone / WhatsApp
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+92 300 1234567"
                className={`w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-lg bg-[var(--ivory)] border text-[var(--black)] placeholder:text-[var(--charcoal)]/45 font-sans text-sm transition-colors focus:outline-none focus:ring-1 ${
                  errors.phone
                    ? "border-[var(--chestnut)] focus:border-[var(--chestnut)] focus:ring-[var(--chestnut)]"
                    : "border-[var(--hairline)] focus:border-[var(--terracotta)] focus:ring-[var(--terracotta)]"
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-[var(--chestnut)] font-sans">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Row 3: Gifting Category & Estimated Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label
                htmlFor="occasion"
                className="block text-[11px] sm:text-xs uppercase tracking-[0.12em] font-sans font-medium text-[var(--black)] mb-1.5"
              >
                Gifting Category <span className="text-[var(--terracotta)]">*</span>
              </label>
              <select
                id="occasion"
                name="occasion"
                required
                value={formData.occasion}
                onChange={handleChange}
                className={`w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-lg bg-[var(--ivory)] border text-[var(--black)] font-sans text-sm transition-colors focus:outline-none focus:ring-1 ${
                  errors.occasion
                    ? "border-[var(--chestnut)] focus:border-[var(--chestnut)] focus:ring-[var(--chestnut)]"
                    : "border-[var(--hairline)] focus:border-[var(--terracotta)] focus:ring-[var(--terracotta)]"
                }`}
              >
                <option value="" disabled>
                  Select gifting category...
                </option>
                {occasionOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.occasion && (
                <p className="mt-1 text-xs text-[var(--chestnut)] font-sans">
                  {errors.occasion}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="quantity"
                className="block text-[11px] sm:text-xs uppercase tracking-[0.12em] font-sans font-medium text-[var(--black)] mb-1.5"
              >
                Estimated Quantity
              </label>
              <select
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-lg bg-[var(--ivory)] border border-[var(--hairline)] text-[var(--black)] font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[var(--terracotta)] focus:border-[var(--terracotta)]"
              >
                <option value="">Select quantity...</option>
                <option value="10-25 kits">10 – 25 packages (Executive)</option>
                <option value="25-50 kits">25 – 50 packages</option>
                <option value="50-100 kits">50 – 100 packages</option>
                <option value="100-250 kits">100 – 250 packages</option>
                <option value="250+ kits">250+ packages (Organization-wide)</option>
              </select>
            </div>
          </div>

          {/* "Other" reveals a free-text field spanning the full row, under Category and Quantity */}
          {formData.occasion === "other" && (
            <div className="occasion-other-reveal">
              <label
                htmlFor="occasionOther"
                className="block text-[11px] sm:text-xs uppercase tracking-[0.12em] font-sans font-medium text-[var(--black)] mb-1.5"
              >
                Please Specify <span className="text-[var(--terracotta)]">*</span>
              </label>
              <input
                id="occasionOther"
                name="occasionOther"
                type="text"
                required
                autoFocus
                maxLength={120}
                value={formData.occasionOther}
                onChange={handleChange}
                placeholder="e.g. Annual dinner, product launch…"
                aria-invalid={errors.occasionOther ? true : undefined}
                aria-describedby={errors.occasionOther ? "occasionOther-error" : undefined}
                className={`w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-lg bg-[var(--ivory)] border text-[var(--black)] font-sans text-sm placeholder:text-[var(--charcoal)]/60 transition-colors focus:outline-none focus:ring-1 ${
                  errors.occasionOther
                    ? "border-[var(--chestnut)] focus:border-[var(--chestnut)] focus:ring-[var(--chestnut)]"
                    : "border-[var(--hairline)] focus:border-[var(--terracotta)] focus:ring-[var(--terracotta)]"
                }`}
              />
              {errors.occasionOther && (
                <p id="occasionOther-error" className="mt-1 text-xs text-[var(--chestnut)] font-sans">
                  {errors.occasionOther}
                </p>
              )}
            </div>
          )}

          {/* Row 4: Project Details */}
          <div>
            <label
              htmlFor="message"
              className="block text-[11px] sm:text-xs uppercase tracking-[0.12em] font-sans font-medium text-[var(--black)] mb-1.5"
            >
              Project Brief & Requirements
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Share your occasion, target delivery date, budget range, or customization preferences..."
              className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-lg bg-[var(--ivory)] border border-[var(--hairline)] text-[var(--black)] placeholder:text-[var(--charcoal)]/45 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[var(--terracotta)] focus:border-[var(--terracotta)] resize-y"
            />
          </div>

          {/* Row 7: Privacy Consent Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-3 cursor-pointer py-2 min-h-[44px]">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                required
                checked={formData.consent}
                onChange={handleChange}
                className="mt-1 h-4 w-4 rounded border-[var(--hairline)] text-[var(--terracotta)] focus:ring-[var(--terracotta)]"
              />
              <span className="font-sans text-xs text-[var(--charcoal)] font-light leading-relaxed">
                I agree that NAQSH may process my details to respond to this corporate gifting inquiry in accordance with the{" "}
                <Link
                  href="/privacy"
                  target="_blank"
                  className="text-[var(--black)] underline hover:text-[var(--terracotta)]"
                >
                  Data Privacy Policy
                </Link>
                .
              </span>
            </label>
            {errors.consent && (
              <p className="mt-1 text-xs text-[var(--chestnut)] font-sans">
                {errors.consent}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-plain w-full sm:w-auto justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Brief...</span>
                </>
              ) : (
                <>
                  <span>Request Consultation</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
