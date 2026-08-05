import { createFileRoute } from "@tanstack/react-router";

import airportImg from "@/assets/airport-welcome.jpg";
import { ServicePage } from "@/components/site/ServiceCard";

export const Route = createFileRoute("/services/airport-transfers")({
  head: () => ({
    meta: [
      { title: "Airport Transfers Gauteng — OR Tambo & Lanseria | OPHE Shuttle & Tours" },
      {
        name: "description",
        content:
          "Reliable airport transfers across Gauteng. Flight tracking, meet-and-greet at arrivals, luggage assistance and 24/7 availability. Book your transfer with OPHE.",
      },
      { property: "og:title", content: "Airport Transfers in Gauteng | OPHE Shuttle & Tours" },
      {
        property: "og:description",
        content: "Flight-tracked airport pickups and drop-offs, available 24/7.",
      },
      { property: "og:url", content: "/services/airport-transfers" },
    ],
    links: [{ rel: "canonical", href: "/services/airport-transfers" }],
  }),
  component: () => (
    <ServicePage
      serviceKey="airport-transfer"
      image={airportImg}
      imageAlt="Driver welcoming a passenger beside the vehicle at the airport"
      body="Flights don't always land when they should. We track yours, so if you're an hour late there's still someone waiting at arrivals with a hand for your bags. Early departures, late arrivals, family collections or a client you need looked after — we handle it door to door."
    />
  ),
});
