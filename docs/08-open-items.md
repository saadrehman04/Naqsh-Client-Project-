# Open items for client confirmation

The site must not imply unconfirmed operational, commercial, or legal details. `[CONFIRM]` markers are shown only in development. In production, sections depending on those details should remain hidden or use neutral wording until approved.

## Client details

- Studio / business hours and response-time promise.
- Public business address beyond the confirmed location “Lahore, Pakistan.”
- Instagram and LinkedIn profile URLs. **Placeholders are live now** (client request 2026-11-16): both footer links point to the platforms' home pages (`siteConfig.socials` in `src/content/site.ts`). Swap in the real profile URLs before launch.
- Approved client logos or testimonials.
- Sign-off on the exact wording of promise 1 in What Sets Us Apart: "Purpose-driven sourcing with thoughtfully curated alternatives to boycotted products." (sensitive wording, used verbatim on the home page).
- Final copper specification, if the current brand token needs adjustment.

## Commercial and delivery details

- Minimum order quantities, production lead times, seasonal cutoffs, rush availability, and sample or prototype fees.
- Branding methods and supported artwork formats.
- Payment and invoicing terms.
- Delivery coverage (cities) and replacement terms. The Shipping & Delivery Policy (client PDF, 2026-11-17) now covers methods, multi-address delivery, rates, tracking, failed deliveries and the 24-hour damage-claim window.

## Legal and data handling

- Analytics/cookie use (not covered by the client's Data Privacy Policy, published 2026-11-17).
- Legal review of both policy pages (text is now the client's own, verbatim).
- Confirm **support@naqshonline.co** (named in both policies) is a live inbox. The site's main email remains contact@naqshonline.co.

## Catalogue

- The 21 product names and photo mappings are implemented. Collection grouping is an editorial proposal and should be confirmed. See `docs/IMAGE-MAP.md`.
- Wellness Kit and Independence Day Gift source filenames are swapped; the rendered mapping follows image content. Confirm the corrected mapping with the client.

## Implementation / launch

- Production domain and DNS.
- Resend account and sender-domain verification (recipient is contact@naqshonline.co).
- Sanity project and dataset, if CMS editing is enabled.

## Client revision round (Nov 2026)

- Maria is sending design guidance for the Gifting Consultation section; the current build follows the client's reference image.
- Premium Gifting Solutions has no photo; it is text only until one is supplied.
- The four Gifting Consultation key terms have no descriptions; boxes show the titles only.
- Button labels "Book a Consultation" (Gifting Consultation) and "Request Consultation" (under Project Workflow) are developer drafts; confirm.
- Project Workflow body is used verbatim: "A simple and seamless process for meaningful gifting experience". Suggest "for a meaningful gifting experience"; awaiting client OK.
- The hero mockup shows "Lasting Impressions." in italic; Marcellus has no italic, so it is upright. Confirm this is acceptable.

- Chatbot: it answers only from site content, so its FAQ answers inherit the FAQ page's unconfirmed details (e.g. "3 to 4 weeks" lead time, advance deposit, delivery cities). Confirm the FAQs and the bot updates automatically. The pricing reply wording is a developer draft.
- Chatbot: working hours are unknown, so those questions go to WhatsApp. Once confirmed, add them to `siteConfig` and the contact entry in `src/lib/chatbot/knowledge.ts`.
- Logos: the header and footer show the approved logo shapes tinted terracotta by CSS. Ask the designer for official terracotta SVG exports so `assets/logo/svg` holds the real files.
- Resend: inquiries are sent to contact@naqshonline.co, but the sender is still `onboarding@resend.dev`. To send from an @naqshonline.co address, verify the domain in Resend and set the `from` address in `src/app/api/inquiry/route.ts`.
- ~~Hero photo original~~: resolved 2026-11-20. The client supplied 2752×1536 home and contact hero photos; no upscaling is needed any more. The Services banner was later set back to its original blurred photo at the client's request; a 2K alternative is kept in assets.
- ~~Rushda's text for the Contact panel~~: resolved 2026-11-19. "Website Content 2.pdf" keeps the same heading and intro, adds the "Contact Our Team" label and "Prefer to talk right away?".
- **FAQ 9 "Can I request product samples?"**: the content PDF changed only the question (we → I) and gave no answer, so the existing answer is kept. Confirm it.
- **FAQ 13**: the new last sentence ("We can also cater to urgent requests depending upon the project requirements") had no full stop in the PDF; one was added.
- **Two dark sections back to back** (client requests): Home hero → black About Us, and Services hero → black Gifting Consultation. Confirm the client is happy with this.
- **Search Console (2026-11-20)**: set up on contact@naqshonline.co. Still to do: add the developer's own Gmail as a user (Settings → Users and permissions), request indexing for Portfolio, Contact and FAQs in a day or two, then Bing Webmaster Tools (import from Search Console) and Google Business Profile.

