import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";

import sunCityImg from "@/assets/tour-sun-city.jpg";
import { Button } from "@/components/ui/button";
import { CTABand, PageHero, Section } from "@/components/site/Bits";
import { getTour, type TourDetail } from "@/lib/public-content.functions";
import { rands, site } from "@/lib/site";

export const Route = createFileRoute("/tours/$slug")({
  loader: async ({ params }) => {
    const tour = await getTour({ data: { slug: params.slug } });
    if (!tour) throw notFound();
    return tour;
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Tour unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.title} | ${site.name}`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.summary },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/tours/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/tours/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            name: loaderData.title,
            description: loaderData.summary,
            touristType: "Day trippers",
            provider: { "@type": "LocalBusiness", name: site.name, telephone: site.phoneTel },
            itinerary: {
              "@type": "ItemList",
              itemListElement: ["Johannesburg", "Sun City — Valley of the Waves"].map((n, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: n,
              })),
            },
            offers: {
              "@type": "Offer",
              price: (loaderData.price_cents / 100).toFixed(2),
              priceCurrency: "ZAR",
              availability: "https://schema.org/InStock",
            },
          }),
        },
      ],
    };
  },
  component: TourDetail,
  notFoundComponent: TourNotFound,
  errorComponent: () => (
    <Section>
      <p className="text-muted-foreground">This package couldn't load. Please refresh.</p>
    </Section>
  ),
});

function TourNotFound() {
  return (
    <Section>
      <h1 className="text-2xl font-bold">Package not found</h1>
      <p className="mt-2 text-muted-foreground">
        That package isn't available. See what else we're running.
      </p>
      <Button asChild className="mt-6">
        <Link to="/tours">All packages</Link>
      </Button>
    </Section>
  );
}

function TourDetail() {
  const tour = Route.useLoaderData() as TourDetail;

  return (
    <>
      <PageHero
        eyebrow="Tour package"
        title={tour.title}
        intro={tour.summary}
        image={sunCityImg}
        imageAlt={tour.title}
      />
      <Section>
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">
            <p className="text-lg text-muted-foreground">{tour.description}</p>

            <h2 className="mt-10 font-display text-xl font-semibold">What's included</h2>
            <ul className="mt-4 space-y-3">
              {tour.inclusions.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  <span className="text-sm text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-display text-xl font-semibold">Available dates</h2>
            {tour.dates.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">
                No dates open right now — WhatsApp us to be first to know when the next one opens.
              </p>
            ) : (
              <ul className="mt-4 flex flex-wrap gap-3">
                {tour.dates.map((d) => (
                  <li
                    key={d.id}
                    className="rounded-md border border-gold/40 px-4 py-2 text-sm font-medium"
                  >
                    {new Date(d.departure_date).toLocaleDateString("en-ZA", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <aside className="h-fit rounded-lg border border-gold/30 bg-card p-6">
            <p className="text-3xl font-bold text-gold">{rands(tour.price_cents)}</p>
            <p className="text-sm text-muted-foreground">per person</p>
            <p className="mt-4 text-sm">
              Secure your seat with a{" "}
              <span className="font-semibold text-foreground">{rands(tour.deposit_cents)}</span>{" "}
              deposit (non-refundable). Balance due before departure.
            </p>
            <Button asChild size="lg" className="mt-6 w-full font-display font-semibold">
              <Link to="/book" search={{ service: "tour-package", tour: tour.slug }}>
                Book this trip
              </Link>
            </Button>
          </aside>
        </div>
      </Section>
      <CTABand title="Bringing friends?" subtitle="We seat seven — book the whole vehicle." />
    </>
  );
}
