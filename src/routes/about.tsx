import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";

import fleetImg from "@/assets/fleet-interior.jpg";
import { CTABand, PageHero, Placeholder, Section, SectionHeading } from "@/components/site/Bits";
import { site } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About OPHE Shuttle & Tours | Gauteng Premium Travel" },
      {
        name: "description",
        content:
          "OPHE Shuttle & Tours is a Gauteng-based, personally run premium travel service — airport transfers, private trips, corporate travel and day tours in a mint-condition Mercedes-Benz Vito.",
      },
      { property: "og:title", content: "About OPHE Shuttle & Tours" },
      {
        property: "og:description",
        content: "A personally run premium travel service based in Gauteng, South Africa.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const commitments = [
  "A clean, well-maintained vehicle on every trip",
  "An experienced, customer-focused PDP-licensed driver",
  "On-time pickups, with your flight tracked when it matters",
  "One agreed price before you travel",
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Personally run, properly done"
        intro={`${site.name} is a Gauteng-based premium travel service focused on safe, reliable, comfortable transport.`}
      />

      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <SectionHeading title="Our story" />
            <p className="mt-4 text-muted-foreground">
              OPHE started with a simple idea: travel should feel easy. Whether it's a 4am airport
              run, a client you need collected, a team that has to be somewhere on time, or a day
              trip you've been looking forward to for months — you should be able to hand it over
              and stop worrying about it.
            </p>
            <p className="mt-3 text-muted-foreground">
              Every booking is handled personally by {site.contactName}. You always know who is
              coming to fetch you.
            </p>
          </div>
          <div>
            <SectionHeading title="Fleet & safety" />
            <p className="mt-4 text-muted-foreground">
              Our fleet is a 7-seater Mercedes-Benz Vito (diesel) kept in mint condition, with a
              roof box so luggage never has to squeeze in beside you. It's driven by a professional,
              PDP-licensed driver.
            </p>
            <ul className="mt-6 space-y-3">
              {commitments.map((c) => (
                <li key={c} className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  <span className="text-sm text-foreground/90">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <img
          src={fleetImg}
          alt="Interior of the seven-seater Mercedes-Benz Vito with leather seats"
          width={1200}
          height={900}
          loading="lazy"
          className="mt-12 h-64 w-full rounded-lg object-cover md:h-96"
        />

        <div className="mt-12">
          <SectionHeading title="Registration, insurance & licensing" />
          <div className="mt-4">
            <Placeholder>
              [PLACEHOLDER] Trust badges go here — business registration number, passenger liability
              insurance and operator licence details, to be confirmed and supplied by the business
              owner.
            </Placeholder>
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
