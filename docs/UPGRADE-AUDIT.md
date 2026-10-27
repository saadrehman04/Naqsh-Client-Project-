# Site Upgrade Audit

Audit date: 2026-10-27. Production build served locally with `npm run build` and `npm start -- --hostname 127.0.0.1 --port 3002`; screenshots captured with Next.js development chrome disabled.

## Initial audit

The initial pass covered Home, Services, Our Approach, Portfolio, collection details, FAQs, Contact, Privacy, Shipping & Delivery, and not-found. Final production screenshots are stored in `docs/screenshots/`.

## Issues found

- About contained the unverified “Naqsh Philosophy” and “Lahore Workshop” labels. Footer/contact copy called Lahore the “Headquarters” or a “Workshop” although only the city was supplied.
- Portfolio and collection details showed invented “Typical inclusions” and “Bespoke Occasion Gifting” copy, and the home page had “Tailored Around Your Milestones.”
- The home page leaned on rounded, bordered cards across Services, Why Us, Vision & Mission, Approach, Portfolio, and CTA. Vision/Mission were framed quotes; Core Values were cards; CTA was an inset card rather than a full band.
- Several labels were 9–11 px; several tracking values exceeded 0.18em. The collection grid had seven tiles and left the complete 21-product catalogue unavailable in one place.
- FAQ, shipping, and privacy copy included draft operational and legal claims. Those claims need confirmation and must not be presented as established facts.
- The customer supplied 21 matched product images. The image-map records the filename correction for Wellness Kit and Independence Day Gift.

## Confirmed facts retained

Naqsh is a B2B corporate gifting lead-generation site. Location: Lahore, Pakistan. This request updates the phone to +92-346-9171798 and WhatsApp to `https://wa.me/923469171798`. No email, testimonials, client logos, social profiles, lead-time, MOQ, delivery SLA, sample fee, payment terms, or privacy retention period are confirmed.

## Final production checks

- Final optimized build succeeded and was served with `npm start` on port 3002.
- Nine routes at four viewport widths completed 36 checks with zero document overflow and zero page errors. Hero/header measurements were also checked at 1920, 1600, 1440, 1280, 1180, 1024, 768, and 390px.
- The hero primary button computes to `rgb(182, 79, 62)`; the header measures 72px tall at each target width.
- Accessibility scans cover eight primary routes on desktop and mobile; the initial FAQ badge finding was fixed and retested with no remaining violations.
- Lighthouse scores: desktop Performance 98, Accessibility 100, Best Practices 100, SEO 100; mobile 94, 100, 100, 100.
- [`scroll-demo.webm`](scroll-demo.webm) contains a 22-second production scroll recording reviewed through the footer.
