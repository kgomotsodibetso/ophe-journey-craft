import { createFileRoute } from "@tanstack/react-router";

import { CTABand, PageHero, Section } from "@/components/site/Bits";
import { ServiceCard } from "@/components/site/ServiceCard";
import { services } from "@/lib/site";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Shuttle Services in Gauteng | OPHE Shuttle & Tours" },
      {
        name: "description",
        content:
          "Airport transfers, private and corporate travel, tours, group and event transport and long-distance trips across Gauteng with OPHE Shuttle & Tours.",
      },
      { property: "og:title", content: "Shuttle Services in Gauteng | OPHE Shuttle & Tours" },
      {
        property: "og:description",
        content: "Five ways we get you there: airport, private, tours, events and long-distance.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Five ways we get you there"
        intro="Point-to-point, airport runs, celebrations or a full day out — same vehicle, same care."
      />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.key} serviceKey={s.key} />
          ))}
        </div>
      </Section>
      <CTABand />
    </>
  );
}
