import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Clock, Car, ShieldCheck, Sparkles, Star } from "lucide-react";

import heroImg from "@/assets/hero-vito.jpg";
import experienceImg from "@/assets/experience-champagne.jpg";
import sunCityImg from "@/assets/tour-sun-city.jpg";
import fleetImg from "@/assets/fleet-interior.jpg";
import airportImg from "@/assets/airport-welcome.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CTABand, Section, SectionHeading } from "@/components/site/Bits";
import { ServiceCard } from "@/components/site/ServiceCard";
import { rands, services, site } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Premium Shuttle & Airport Transfers in Gauteng | OPHE Shuttle & Tours" },
      {
        name: "description",
        content:
          "OPHE Shuttle & Tours offers premium airport transfers, private and corporate travel, group event transport and day tours across Gauteng. Book your journey today.",
      },
      {
        property: "og:title",
        content: "Premium Shuttle & Airport Transfers in Gauteng | OPHE Shuttle & Tours",
      },
      {
        property: "og:description",
        content:
          "Safe, reliable and luxury travel across Gauteng — airport transfers, private trips, group transport and day tours.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const trustPoints = [
  { icon: BadgeCheck, label: "Professional, PDP-licensed driver" },
  { icon: Car, label: "Mint-condition Mercedes-Benz fleet" },
  { icon: Clock, label: "Available 24/7" },
  { icon: ShieldCheck, label: "Safe, reliable and on time" },
];

const placeholderReviews = [
  {
    name: "Placeholder review",
    text: "[PLACEHOLDER COPY] Booked an early airport run and the driver was outside ten minutes early. Spotless vehicle, easy trip.",
  },
  {
    name: "Placeholder review",
    text: "[PLACEHOLDER COPY] They set the car up with flowers for our anniversary. Small touch, huge moment.",
  },
  {
    name: "Placeholder review",
    text: "[PLACEHOLDER COPY] Used OPHE for staff transport for a week. Punctual every single day.",
  },
];

function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Black Mercedes-Benz Vito waiting on a Johannesburg street at night"
          width={1600}
          height={1008}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/90 to-background/40" />
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-36">
          <p className="eyebrow">{site.taglines[1]}</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold text-balance md:text-6xl">
            Your Journey.{" "}
            <span className="text-gradient-gold">Our Priority.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Premium airport transfers, private and corporate travel, group transport and day tours
            across {site.serviceArea}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="font-display font-semibold">
              <Link to="/book">Book Your Journey</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/tours">View Tours & Packages</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="border-y border-border/60 bg-surface px-4 py-6 sm:px-6">
        <ul className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3">
              <Icon className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
              <span className="min-w-0 text-sm text-foreground/90">{label}</span>
            </li>
          ))}
        </ul>
      </div>

      <Section>
        <SectionHeading
          eyebrow="What we do"
          title="Travel sorted, whatever the occasion"
          intro="One vehicle, one driver you get to know, and a service built around getting you there comfortably."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.key} serviceKey={s.key} />
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeading eyebrow="Featured package" title="Day Trip to Sun City" />
        <Card className="mt-8 overflow-hidden border-gold/30 bg-card">
          <div className="grid md:grid-cols-2">
            <img
              src={sunCityImg}
              alt="Valley of the Waves resort pool at Sun City"
              width={1200}
              height={900}
              loading="lazy"
              className="h-56 w-full object-cover md:h-full"
            />
            <CardContent className="p-6 md:p-8">
              <h3 className="font-display text-2xl font-bold">Valley of the Waves</h3>
              <p className="mt-3 text-muted-foreground">
                Relax, splash and unwind at Sun City's famous Valley of the Waves. The perfect day
                getaway — return transport and entrance included.
              </p>
              <p className="mt-5 text-lg font-semibold text-gold">
                {rands(135000)} per person{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  · {rands(67500)} deposit secures your seat
                </span>
              </p>
              <Button asChild className="mt-6 font-display font-semibold">
                <Link to="/tours/$slug" params={{ slug: "sun-city-valley-of-the-waves" }}>
                  See the package
                </Link>
              </Button>
            </CardContent>
          </div>
        </Card>
      </Section>

      <Section>
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow">The OPHE experience</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              <Sparkles className="mb-1 mr-2 inline h-6 w-6 text-gold" aria-hidden="true" />
              More than a lift
            </h2>
            <p className="mt-4 text-muted-foreground">
              A matric dance, an anniversary, a proposal, a welcome-home pickup at arrivals — the
              ride is part of the moment. We'll set the vehicle up with champagne, flowers or a
              little decor so the celebration starts the second the door opens.
            </p>
            <p className="mt-3 text-muted-foreground">
              And on an ordinary Tuesday airport run? Same clean vehicle, same friendly driver, same
              care.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <img
              src={experienceImg}
              alt="Champagne glasses and white roses on the rear seat of the vehicle"
              width={1200}
              height={900}
              loading="lazy"
              className="h-40 w-full rounded-md object-cover sm:h-56"
            />
            <img
              src={airportImg}
              alt="Driver welcoming a passenger at the airport"
              width={1200}
              height={900}
              loading="lazy"
              className="h-40 w-full rounded-md object-cover sm:h-56"
            />
            <img
              src={fleetImg}
              alt="Interior of the seven-seater Mercedes-Benz Vito"
              width={1200}
              height={900}
              loading="lazy"
              className="h-40 w-full rounded-md object-cover sm:h-56"
            />
          </div>
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeading
          eyebrow="Reviews"
          title="What travellers say"
          intro="We're new — these are placeholder reviews until our first real ones come in."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {placeholderReviews.map((r, i) => (
            <Card key={i} className="border-border/60 bg-card">
              <CardContent className="p-6">
                <div className="flex gap-1" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
                  ))}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{r.text}</p>
                <p className="mt-4 text-sm font-medium">{r.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button asChild variant="outline" className="mt-8">
          <Link to="/reviews">Leave a review</Link>
        </Button>
      </Section>

      <CTABand />
    </>
  );
}
