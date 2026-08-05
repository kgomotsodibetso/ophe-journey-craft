import { createFileRoute, Link } from "@tanstack/react-router";

import sunCityImg from "@/assets/tour-sun-city.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CTABand, PageHero, Section } from "@/components/site/Bits";
import { listTours } from "@/lib/public-content.functions";
import { rands } from "@/lib/site";

export const Route = createFileRoute("/tours/")({
  loader: () => listTours(),
  head: () => ({
    meta: [
      { title: "Tours & Day Packages from Johannesburg | OPHE Shuttle & Tours" },
      {
        name: "description",
        content:
          "Day trips and travel packages from Johannesburg with transport included. Book the Sun City Valley of the Waves day trip with OPHE Shuttle & Tours.",
      },
      { property: "og:title", content: "Tours & Day Packages | OPHE Shuttle & Tours" },
      {
        property: "og:description",
        content: "Day trips from Johannesburg with return transport included.",
      },
      { property: "og:url", content: "/tours" },
    ],
    links: [{ rel: "canonical", href: "/tours" }],
  }),
  component: ToursIndex,
  errorComponent: () => (
    <Section>
      <p className="text-muted-foreground">Our packages couldn't load. Please refresh.</p>
    </Section>
  ),
});

function ToursIndex() {
  const tours = Route.useLoaderData();

  return (
    <>
      <PageHero
        eyebrow="Tours & packages"
        title="Day trips, with the driving handled"
        intro="Fixed dates, fixed prices, and a seat that's yours the moment your deposit lands."
      />
      <Section>
        {tours.length === 0 ? (
          <p className="text-muted-foreground">
            New packages are on the way — check back soon or send us a WhatsApp to plan a custom
            trip.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {tours.map((t) => (
              <Card key={t.id} className="overflow-hidden border-border/60 bg-card">
                <img
                  src={sunCityImg}
                  alt={t.title}
                  width={1200}
                  height={900}
                  loading="lazy"
                  className="h-52 w-full object-cover"
                />
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-semibold">{t.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{t.summary}</p>
                  <p className="mt-4 font-semibold text-gold">
                    {rands(t.price_cents)} per person
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      · {rands(t.deposit_cents)} deposit
                    </span>
                  </p>
                  <Button asChild className="mt-5 font-display font-semibold">
                    <Link to="/tours/$slug" params={{ slug: t.slug }}>
                      View package
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Section>
      <CTABand />
    </>
  );
}
