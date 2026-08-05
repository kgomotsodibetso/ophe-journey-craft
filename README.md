# OPHE Travel Builder

Lovable.dev Build Prompt — OPHE Shuttle & Tours

Copy everything below the line into a new Lovable project. It's written as one complete brief so Lovable can scaffold the whole site in its first pass — you can then iterate page by page in follow-up messages.

Build a modern, mobile-first marketing and booking website for OPHE Shuttle & Tours, a premium shuttle, airport transfer and private-tour operator based in Gauteng, South Africa.

1. Brand & positioning

Business name: OPHE Shuttle & Tours

Tagline: "Your Journey. Our Priority." (secondary lines to use in rotation: "Premium Travel. Personal Service." / "Safe, Reliable & Luxury Travel")

Positioning: don't design this as a generic airport-shuttle utility site. OPHE's own marketing leans into celebration and special-occasion travel — champagne toasts in the vehicle, clients dressed up for events, flowers, "welcome home" airport pickups — alongside standard airport transfers and corporate travel. The site should feel premium, warm, and a little celebratory, not clinical.

Target audiences: airport transfer travelers, corporate clients booking staff transport, tourists/day-trippers, and individuals booking for special occasions (matric dances, anniversaries, proposals, airport welcome-homes).

Fleet: one 7-seater Mercedes-Benz Vito, diesel, mint condition, roof box for luggage, PDP-licensed driver.

I (the client) am supplying the final logo file separately — for now, use a clean text-based wordmark "OPHE" in the header/footer as a placeholder, styled in the brand colors below, sized and positioned so it can be swapped for an image logo later without changing the layout.

2. Visual design system

Color palette: black/charcoal (#0D0D0D or #1A1A1A) as the primary dark background/text color, gold (#B8860B / #D4AF37) as the accent color for CTAs, headings, and dividers, and white/off-white for contrast and readability. This matches OPHE's existing Instagram branding.

Typography: a bold, modern sans-serif for headings (something like Poppins, Montserrat, or similar), a clean readable sans-serif for body text.

Tone of imagery: dark, moody, premium car-service photography style — I'll supply real fleet/lifestyle photos to swap into image placeholders; use elegant placeholder imagery in the same style until then.

Mobile-first: the large majority of bookings and browsing will happen on phones (WhatsApp-driven traffic is common in this market) — design and test mobile layouts first, desktop second.

Fast-loading, clean, uncluttered — avoid busy layouts. Generous white space, confident use of gold accents rather than gold everywhere.

3. Site structure (build all of these pages)

Homepage (/)
├── About (/about)
├── Services (/services)
│   ├── Airport Transfers (/services/airport-transfers)
│   ├── Private & Corporate Travel (/services/private-corporate-travel)
│   ├── Group & Event Transport (/services/group-event-transport)
│   └── Long-Distance Travel (/services/long-distance-travel)
├── Tours & Packages (/tours)
│   └── Sun City Day Trip (/tours/sun-city-valley-of-the-waves)
├── Book Now (/book)
├── Gallery (/gallery)
├── Reviews (/reviews)
├── Blog (/blog)
└── Contact (/contact)


Header nav: Home, Services, Tours & Packages, Gallery, Reviews, Contact, with a gold "Book Now" button on the far right. Footer: business name + tagline, quick links to all pages, phone number, WhatsApp click-to-chat link, Instagram link, and a copyright line.

4. Page-by-page content

Homepage

Hero section: full-width hero image/video area, headline built around the tagline, one-line description of the service, primary CTA button "Book Your Journey" linking to /book, secondary CTA "View Tours & Packages."

Trust bar directly under the hero: 4-5 short trust points as icon + text (Professional, PDP-Licensed Driver / Mint-Condition Fleet / Available 24/7 / Safe, Reliable & On Time).

Services overview: a grid of the 5 core services (Airport Transfers, Private & Corporate Travel, Tours & Day Packages, Group & Event Transport, Long-Distance Travel), each with an icon, one-line description, and a "Learn more" link to its service page.

Featured tour package: a highlighted card for the Sun City day trip (see content below) linking to its full page.

"The OPHE Experience" section: 2-3 sentences plus a small photo strip communicating the celebration/special-occasion angle (this is a key differentiator vs. competitors — most other Gauteng shuttle operators only market plain point-to-point transport).

Testimonials/reviews teaser section (use 2-3 placeholder testimonials clearly marked as placeholder copy, to be replaced once real reviews come in).

Final CTA band before the footer: "Ready to travel in comfort?" with a Book Now button and the WhatsApp number.

About

Story section: OPHE Shuttle & Tours is a Gauteng-based, personally run premium travel service focused on safe, reliable, comfortable transport — for airport transfers, private trips, corporate travel, and unforgettable day tours.

Fleet & safety section: describe the 7-seater Mercedes-Benz Vito (mint condition, roof box for luggage, professional PDP-licensed driver), and the safety/quality commitments (clean & well-maintained vehicle, experienced customer-focused driver, on-time service).

Leave a clearly marked placeholder for business registration/insurance/operator-license badges — client will confirm and supply these.

Services (overview page + 4 sub-pages) Build one overview page listing all 5 services as cards, then a dedicated page per service:

Airport Transfers: reliable pickups/drop-offs, flight tracking mention, meet-and-greet, luggage assistance, available 24/7.

Private & Corporate Travel: point-to-point private trips, staff transport, business travel, professional and discreet service.

Group & Event Transport: group bookings, functions and events, matric dances, celebrations — tie in the champagne/flowers positioning here explicitly.

Long-Distance Travel: local and long-distance trips outside Gauteng, comfort-focused for longer journeys. Each service page needs a short hero, 3-4 bullet benefits, and a "Book This Service" CTA linking to /book with the service pre-selected (see booking spec below).

Tours & Packages

Build this as a template/listing page so more tour packages can be added later without a redesign.

First and only package for now: Day Trip to Sun City — Valley of the Waves. Content: "Relax, splash and unwind at Sun City's famous Valley of the Waves. The perfect day getaway." Package includes: return transport Johannesburg ⇄ Sun City, entrance to Valley of the Waves, food & drinks at own cost, "great vibes, safe travel and unforgettable memories." Price: R1,350 per person, deposit R675 (non-refundable). Fixed available dates shown as selectable options (e.g. 19 September 2026, 3 October 2026) — build the date selector so the client can add/edit/remove available dates from an admin view rather than hard-coding them.

Book Now This is the most important page — build a real booking flow, not just a contact form:

Step 1 — choose service type (Airport Transfer / Private Trip / Tour Package / Group-Event / Long-Distance), or arrive here pre-filtered from a service page.

Step 2 — if a Tour Package was chosen, select from the available dates; otherwise pick a travel date and time via a calendar/date-picker.

Step 3 — trip details: pickup location, drop-off location, number of passengers, luggage notes, any special requests (e.g. "celebration/event — flowers or champagne on board").

Step 4 — contact details: name, phone (default to South African format), email.

Step 5 — booking summary + deposit payment. Structure this so a deposit (not full amount) is collected to confirm the booking, matching OPHE's existing R675-of-R1,350 pattern. Use Stripe as the default payment integration to get this working end-to-end quickly; leave a clearly commented integration point to swap in a South African gateway (PayFast, Yoco, or Ozow) later, since that will need a separate merchant account setup outside of Lovable.

On submission: show a confirmation screen, send a confirmation email, and include a "Confirm via WhatsApp" button that opens a pre-filled WhatsApp message to the business number with the booking details.

Build a simple admin view (behind a login, using Supabase auth) where the business owner can see all bookings in a list/calendar, mark them confirmed/cancelled, and add or edit tour package dates. Keep this simple — a table of bookings with status is enough for launch.

Store all bookings in a Supabase table (passenger personal details should only be used for booking purposes — don't expose them anywhere public-facing). Handle passenger personal information (names, contact details, and any ID/passport info collected for airport transfers) in line with South Africa's POPIA requirements: collect only what's needed, secure it in the database, and don't share it with third parties.

Gallery A photo/video grid for fleet and "OPHE experience" imagery (celebration moments, vehicle detail shots). Use elegant placeholder images until I supply real photos, organized in categories: Our Fleet / Experiences / Tours.

Reviews A reviews/testimonials page. Since OPHE has no reviews yet, launch with a friendly "Be one of our first reviews!" empty-state plus a way to submit a testimonial (simple form saved to Supabase, moderated before showing publicly). Include a note in the code that this should link out to Google reviews once the Google Business Profile exists.

Blog A simple blog/travel-guide section (listing page + individual post template) — this is for long-tail SEO and AI-search visibility (Google AI Overviews, ChatGPT/Perplexity-style answers), not just traditional ranking. Launch with 2-3 starter placeholder posts covering topics like "How Much Does an Airport Shuttle Cost in Gauteng?", "Best Day Trips from Johannesburg," and "Why Book a Private Shuttle for Your Next Event" — clearly marked as placeholder drafts I'll review and expand over time.

Contact Business phone number, a prominent WhatsApp click-to-chat button (wa.me link), a contact form (name, email, message), embedded map placeholder for the service area (exact base location to be confirmed and added later), and social links (Instagram, Facebook).

5. SEO requirements

Unique, keyword-relevant <title> and meta description on every page (e.g. homepage targets "Premium Shuttle & Airport Transfers in Gauteng," the Sun City page targets "Sun City Day Trip from Johannesburg").

Semantic HTML with a single H1 per page, proper heading hierarchy, descriptive alt text on every image.

Add LocalBusiness structured data (JSON-LD) sitewide (name, phone, service area, price range) and TouristTrip/Product structured data on the Sun City tour page.

Generate an XML sitemap and robots.txt automatically.

Fast page-load performance (optimize images, lazy-load below-the-fold content) — this matters for both Google ranking and mobile users on limited data.

Clean, human-readable URLs exactly as shown in the sitemap above (lowercase, hyphenated, no query strings for content pages).

Leave clearly commented placeholders in the code for: Google Business Profile link, Google Analytics/GA4 tracking snippet, and Meta Pixel — to be added once accounts are created.

6. Copy tone

Write all copy in a warm, confident, slightly upbeat tone — professional but not corporate or stiff. Short sentences, no travel-industry jargon. Reassure on safety and reliability without being overly formal.

7. Known gaps — use clearly marked placeholder content for these until I provide real details

Exact base location / service area (currently only known to be Gauteng)

Full price list for airport transfers and private trips (only the Sun City package has confirmed pricing)

Business registration, insurance, and operator-license details for trust badges

Final logo file and any additional fleet/lifestyle photography

Real customer testimonials

Build the site now with realistic, on-brand placeholder content everywhere one of the above is missing, clearly structured so I can swap it in without needing structural changes. I have attached two logos. One is the original one with the black background, and the other one is the one with no background.

## Development

You need Node.js 20+ and either `bun` or `npm`.

```sh
git clone <this-repository-url>
cd <repository-name>
cp .env.example .env   # fill in your Supabase project URL and publishable key
bun install             # or: npm install
bun run dev             # or: npm run dev
```

## Deploying to Railway

The build targets a standalone Node server (`nitro` preset `node-server`), so
Railway can run it directly:

1. Create a new Railway project from this GitHub repo/branch.
2. Set the environment variables from `.env.example` (Supabase URL + publishable
   key, both the plain and `VITE_`-prefixed versions) in the Railway service's
   Variables tab.
3. Railway picks up `railway.json`, which runs `bun install && bun run build`
   to build and `bun run start` (`node .output/server/index.mjs`) to serve —
   it listens on whatever `PORT` Railway assigns automatically.
