# 08 — Open items (waiting on the client or on us)

The site has been built to full production quality. Where client facts were missing, they have been gracefully handled using our dev-only `<Confirm />` flag (which appears as a discreet badge in development and hides cleanly in production) or conditional rendering (testimonials, client partner logos, and social media icons remain completely hidden until real assets are supplied).

---

## 1. Missing Client Facts (Handled with `[CONFIRM]` tags)
The following facts are currently highlighted in dev mode and should be confirmed before final public launch:
1. **Official Corporate Email Address**:
   - Currently omitted on public pages; inquiry form uses Resend / console fallback.
   - Once provided, add to `src/content/site.ts` (`email: "consultations@naqsh.pk"`).
2. **Studio Operating Hours & Response SLA**:
   - e.g. "Monday – Friday, 9:00 AM – 6:00 PM PKT" and "Inquiries answered within 24 business hours".
3. **Minimum Order Quantity (MOQ)**:
   - In `/faqs`: currently states that orders scale from small executive batches to corporate-wide rollouts. Confirm if an absolute minimum (e.g. 10 or 25 units) applies.
4. **Order Lead Times & Rush Order Cutoffs**:
   - In `/faqs` and `/shipping-delivery`: stated as 2–4 weeks with earlier notice recommended for seasonal spikes (Ramadan, Eid, Year-End).
5. **Sample & Prototyping Fee Policy**:
   - In `/faqs`: confirms pre-production visual proposals and physical samples are available upon consultation. Confirm if sample deposits apply.
6. **Detailed Branding Specifications**:
   - In `/faqs`: list includes blind debossing, metallic foil stamping, laser engraving, printed sleeves, and custom wax seals. Confirm accepted vector formats (`.ai`, `.eps`, `.pdf`).
7. **Official Corporate Bank / Invoicing Terms**:
   - In `/faqs`: standard milestone of advance deposit upon proposal approval, balance upon dispatch. Confirm accepted corporate banking rails (IBAN / Wire).
8. **Nationwide Delivery SLAs & Claims Window**:
   - In `/shipping-delivery`: covered cities include Lahore, Karachi, Islamabad, Rawalpindi, and Faisalabad. Claims window set to 48 hours. Confirm exact courier partners and express shipping tiers.

---

## 2. Brand & Content Assets to Provide Later
- **Official Brand Copper Hex**: Currently sampled as `#AB6C49` with luxury copper gradients; confirm if a registered Pantone / CMYK copper standard exists.
- **Client Testimonials & Quotes**: Currently hidden. When clients provide real feedback, add to `siteConfig.testimonials` or publish via Sanity CMS.
- **Client Partner Logos**: Currently hidden. When clients grant brand permission, add to `siteConfig.clientLogos` or publish via Sanity CMS.
- **Social Media Profiles**: Currently hidden. Add Instagram / LinkedIn / Facebook handles to `siteConfig.socials` once accounts are active.
- **Urdu Localization**: Site architecture uses logical CSS properties (`padding-inline`, `margin-block`, `inset-inline`) and UTF-8 typography, ready for Urdu translations in future iterations.

---

## 3. Deployment & Account Setup
1. **Domain & DNS**: Connect `naqsh.pk` (or preferred domain) on Vercel.
2. **Resend API Key**: Set `RESEND_API_KEY` and `INQUIRY_RECIPIENT_EMAIL` in production environment variables (or Vercel dashboard).
3. **Sanity CMS Project**: Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` when connecting Sanity Studio.
