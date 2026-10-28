"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { occasionOptions, inquirySchema } from "@/lib/validators";
import { FormSuccess } from "./FormSuccess";
import { products } from "@/content/products";

function FormFields() {
  const searchParams = useSearchParams();
  const prefillCollection = searchParams.get("collection") || "";
  const prefillService = searchParams.get("service") || "";
  const prefillProduct = products.find((product) => product.slug === searchParams.get("product"));

  // Determine initial occasion from query param
  const getInitialOccasion = () => {
    if (prefillCollection) {
      const match = occasionOptions.find((o) => o.value === prefillCollection);
      if (match) return match.value;
    }
    if (prefillProduct) return prefillProduct.collection;
    if (prefillService === "personalized-gifts") return "custom-occasion-gifts";
    if (prefillService === "gifting-consultations") return "other";
    return "";
  };

  const [formData, setFormData] = useState(() => ({
    name: "",
    company: "",
    email: "",
    phone: "",
    occasion: getInitialOccasion(),
    quantity: "",
    budgetRange: "",
    dateNeeded: "",
    message: prefillProduct ? `I’m interested in ${prefillProduct.name}.` : "",
    consent: false,
    website: "", // honeypot
  }));

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  const [serverError, setServerError] = useState<string | null>(null);

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

    // Clear error for field upon edit
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

    // Client-side Zod validation
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
            quantity: "",
            budgetRange: "",
            dateNeeded: "",
            message: "",
            consent: false,
            website: "",
          });
        }}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-[var(--ivory-warm)] border border-[var(--border-light)] rounded-[var(--radius-card)] p-8 sm:p-12 shadow-sm space-y-6"
      aria-label="Corporate Gifting Consultation Form"
    >
      {/* Server error alert banner */}
      {serverError && (
        <div
          role="alert"
          className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
          <div>
            <p className="font-medium">Submission Notice</p>
            <p className="font-light mt-0.5">{serverError}</p>
          </div>
        </div>
      )}

      {/* Honeypot field (hidden from visual users and screen readers, trips bot scrapers) */}
      <div className="opacity-0 absolute -z-50 h-0 w-0 overflow-hidden pointer-events-none" aria-hidden="true">
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

      <div className="space-y-6" data-reveal="stagger" data-stagger="0.08">

      {/* Row 1: Name & Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-xs uppercase tracking-[0.14em] font-sans font-medium text-[var(--black)] mb-2"
          >
            Your Name <span className="text-[var(--terracotta)]">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Tariq Vance"
            className={`w-full px-4 py-3 rounded-lg bg-[var(--ivory)] border text-[var(--black)] placeholder:text-[var(--pine)]/40 font-sans text-sm transition-colors focus:outline-none focus:ring-1 ${
              errors.name
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-[var(--border-light)] focus:border-[var(--terracotta)] focus:ring-[var(--terracotta)]"
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600 font-sans">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-xs uppercase tracking-[0.14em] font-sans font-medium text-[var(--black)] mb-2"
          >
            Company Name <span className="text-[var(--terracotta)]">*</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Apex Technologies"
            className={`w-full px-4 py-3 rounded-lg bg-[var(--ivory)] border text-[var(--black)] placeholder:text-[var(--pine)]/40 font-sans text-sm transition-colors focus:outline-none focus:ring-1 ${
              errors.company
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-[var(--border-light)] focus:border-[var(--terracotta)] focus:ring-[var(--terracotta)]"
            }`}
          />
          {errors.company && (
            <p className="mt-1 text-xs text-red-600 font-sans">{errors.company}</p>
          )}
        </div>
      </div>

      {/* Row 2: Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="email"
            className="block text-xs uppercase tracking-[0.14em] font-sans font-medium text-[var(--black)] mb-2"
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
            placeholder="e.g. tariq@apex.com"
            className={`w-full px-4 py-3 rounded-lg bg-[var(--ivory)] border text-[var(--black)] placeholder:text-[var(--pine)]/40 font-sans text-sm transition-colors focus:outline-none focus:ring-1 ${
              errors.email
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-[var(--border-light)] focus:border-[var(--terracotta)] focus:ring-[var(--terracotta)]"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600 font-sans">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-xs uppercase tracking-[0.14em] font-sans font-medium text-[var(--black)] mb-2"
          >
            Phone / WhatsApp
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. +92 300 1234567"
            className={`w-full px-4 py-3 rounded-lg bg-[var(--ivory)] border text-[var(--black)] placeholder:text-[var(--pine)]/40 font-sans text-sm transition-colors focus:outline-none focus:ring-1 ${
              errors.phone
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-[var(--border-light)] focus:border-[var(--terracotta)] focus:ring-[var(--terracotta)]"
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-600 font-sans">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Row 3: Occasion Selection */}
      <div>
        <label
          htmlFor="occasion"
          className="block text-xs uppercase tracking-[0.14em] font-sans font-medium text-[var(--black)] mb-2"
        >
          Gifting Occasion <span className="text-[var(--terracotta)]">*</span>
        </label>
        <select
          id="occasion"
          name="occasion"
          required
          value={formData.occasion}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg bg-[var(--ivory)] border text-[var(--black)] font-sans text-sm transition-colors focus:outline-none focus:ring-1 ${
            errors.occasion
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-[var(--border-light)] focus:border-[var(--terracotta)] focus:ring-[var(--terracotta)]"
          }`}
        >
          <option value="" disabled>
            Select the primary occasion...
          </option>
          {occasionOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.occasion && (
          <p className="mt-1 text-xs text-red-600 font-sans">{errors.occasion}</p>
        )}
      </div>

      {/* Row 4: Quantity & Target Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="quantity"
            className="block text-xs uppercase tracking-[0.14em] font-sans font-medium text-[var(--black)] mb-2"
          >
            Estimated Recipient Count
          </label>
          <select
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-[var(--ivory)] border border-[var(--border-light)] text-[var(--black)] font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[var(--terracotta)] focus:border-[var(--terracotta)]"
          >
            <option value="">Select approximate quantity...</option>
            <option value="10-25 kits">10 - 25 packages (Executive)</option>
            <option value="25-50 kits">25 - 50 packages</option>
            <option value="50-100 kits">50 - 100 packages</option>
            <option value="100-250 kits">100 - 250 packages</option>
            <option value="250+ kits">250+ packages (Company-wide)</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="dateNeeded"
            className="block text-xs uppercase tracking-[0.14em] font-sans font-medium text-[var(--black)] mb-2"
          >
            Target Delivery Date
          </label>
          <input
            id="dateNeeded"
            name="dateNeeded"
            type="text"
            value={formData.dateNeeded}
            onChange={handleChange}
            placeholder="e.g. End of November 2026"
            className="w-full px-4 py-3 rounded-lg bg-[var(--ivory)] border border-[var(--border-light)] text-[var(--black)] placeholder:text-[var(--pine)]/40 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[var(--terracotta)] focus:border-[var(--terracotta)]"
          >
          </input>
        </div>
      </div>

      {/* Row 5: Budget Scope (Optional) */}
      <div>
        <label
          htmlFor="budgetRange"
          className="block text-xs uppercase tracking-[0.14em] font-sans font-medium text-[var(--black)] mb-2"
        >
          Budget Scope (Per Kit or Total Project)
        </label>
        <input
          id="budgetRange"
          name="budgetRange"
          type="text"
          value={formData.budgetRange}
          onChange={handleChange}
          placeholder="e.g. PKR 5,000 - 10,000 per kit (optional)"
          className="w-full px-4 py-3 rounded-lg bg-[var(--ivory)] border border-[var(--border-light)] text-[var(--black)] placeholder:text-[var(--pine)]/40 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[var(--terracotta)] focus:border-[var(--terracotta)]"
        />
      </div>

      {/* Row 6: Project Notes */}
      <div>
        <label
          htmlFor="message"
          className="block text-xs uppercase tracking-[0.14em] font-sans font-medium text-[var(--black)] mb-2"
        >
          Project Brief & Notes
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your brand aesthetic, recipient profile, preferred items, or delivery cities..."
          className="w-full px-4 py-3 rounded-lg bg-[var(--ivory)] border border-[var(--border-light)] text-[var(--black)] placeholder:text-[var(--pine)]/40 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[var(--terracotta)] focus:border-[var(--terracotta)] resize-y"
        />
      </div>

      {/* Row 7: Privacy Consent Checkbox */}
      <div className="pt-2">
        <label className="flex items-start gap-3 cursor-pointer py-2 min-h-[44px]">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            checked={formData.consent}
            onChange={handleChange}
            className="mt-1 h-4 w-4 rounded border-[var(--border-light)] text-[var(--terracotta)] focus:ring-[var(--terracotta)]"
          />
          <span className="font-sans text-xs text-[var(--pine)] font-light leading-relaxed">
            I agree that Naqsh may process my details to respond to this gifting inquiry according to the{" "}
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
          <p className="mt-1 text-xs text-red-600 font-sans">{errors.consent}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[var(--black)] hover:bg-[var(--chestnut)] text-[var(--ivory)] font-sans text-xs tracking-[0.16em] uppercase font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[var(--copper)]" />
              <span>Transmitting Brief...</span>
            </>
          ) : (
            <>
              <span>Submit Consultation Brief</span>
              <ArrowRight className="w-4 h-4 text-[var(--copper)]" />
            </>
          )}
        </button>
      </div>
      </div>
    </form>
  );
}

export function InquiryForm() {
  return (
    <Suspense
      fallback={
        <div className="bg-[var(--ivory-warm)] border border-[var(--border-light)] rounded-[var(--radius-card)] p-12 text-center text-sm font-sans text-[var(--pine)]">
          Loading consultation portal...
        </div>
      }
    >
      <FormFields />
    </Suspense>
  );
}
