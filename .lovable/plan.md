# OPHE Shuttle & Tours — Full Site Build

A premium, mobile-first marketing and booking site: black/charcoal + gold, warm and celebratory tone, with a real booking flow, owner admin, and SEO groundwork.

## Brand and design system

- Colors: charcoal/black `#0D0D0D` / `#1A1A1A`, gold `#B8860B` / `#D4AF37`, off-white. All as semantic tokens in `src/styles.css` (dark-first).
- Type: Poppins for headings, Inter for body, loaded via a `<link>` in the root route.
- Logo: the uploaded transparent-background logo in header and footer, plus a square favicon copy.
- Contact wired everywhere: Jabulani Mabena, 083 946 9453 (WhatsApp `wa.me/27839469453`), Instagram `@ophe_shuttleandtours`.
- Mobile-first layouts, generous spacing, gold used sparingly on CTAs, dividers, key headings.
- Placeholder imagery in a dark, moody car-service style, all swappable later.

## Pages (all built in this pass)

- `/` Home — hero + "Your Journey. Our Priority.", trust bar, 5-service grid, featured Sun City card, "The OPHE Experience" section, placeholder testimonials, final CTA band.
- `/about` — story, fleet & safety (Mercedes-Benz Vito 7-seater, roof box, PDP driver), marked placeholder for registration/insurance badges.
- `/services` + `/services/airport-transfers`, `/private-corporate-travel`, `/group-event-transport`, `/long-distance-travel` — each with hero, 3–4 benefits, "Book This Service" CTA that pre-selects the service on `/book`.
- `/tours` listing (data-driven so packages can be added) + `/tours/sun-city-valley-of-the-waves` with inclusions, R1,350 pp / R675 deposit, and dates loaded from the database (editable in admin, seeded with 19 Sep 2026 and 3 Oct 2026).
- `/book` — 5-step flow (service → date → trip details → contact → summary & deposit).
- `/gallery` — categorized grid: Our Fleet / Experiences / Tours.
- `/reviews` — "Be one of our first reviews!" empty state + moderated submission form.
- `/blog` + `/blog/$slug` — 3 starter placeholder posts.
- `/contact` — phone, WhatsApp button, contact form, map placeholder, socials.
- `/admin` (login-gated) — bookings table with confirm/cancel, testimonial moderation, tour date management.

## Booking and payments

Bookings save to the database at the summary step, then the confirmation screen shows the deposit amount, a "Confirm via WhatsApp" button with a pre-filled message, and a confirmation email.

You chose PayFast/Yoco. Neither is a Lovable built-in, so the deposit step is built as a clean payment adapter:
- A single `payments` module with one interface and a `manual` provider active at launch (booking recorded as "awaiting deposit", confirmed via WhatsApp/EFT).
- A commented, ready-to-fill PayFast adapter (redirect form + ITN webhook route at `/api/public/payfast-itn`) that switches on once you supply your PayFast merchant ID, merchant key and passphrase — I'll request those securely when you have the account.

## Backend

Lovable Cloud (database + auth + email) enabled for: `bookings`, `tour_packages`, `tour_dates`, `testimonials`, `contact_messages`, `blog_posts`. Public pages read only public data; personal booking details are never exposed publicly (POPIA: minimal collection, RLS-locked, owner-only access via admin login).

## SEO

Per-page title/description/OG, single H1 and semantic headings, alt text everywhere, LocalBusiness JSON-LD sitewide, TouristTrip/Product JSON-LD on the Sun City page, `/sitemap.xml` route and `robots.txt`, lazy-loaded below-fold images, and commented placeholders for Google Business Profile, GA4 and Meta Pixel.

## Placeholders clearly marked

Base location/service area, airport & private-trip price list, trust badges, real photography, real testimonials.
