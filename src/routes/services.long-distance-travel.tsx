import { createFileRoute } from "@tanstack/react-router";

import heroImg from "@/assets/hero-vito.jpg";
import { ServicePage } from "@/components/site/ServiceCard";

export const Route = createFileRoute("/services/long-distance-travel")({
  head: () => ({
    meta: [
      { title: "Long-Distance Travel from Gauteng | OPHE Shuttle & Tours" },
      {
        name: "description",
        content:
          "Comfortable long-distance trips from Gauteng to anywhere in South Africa. Fixed pricing, planned comfort stops and space for luggage. Book with OPHE Shuttle & Tours.",
      },
      { property: "og:title", content: "Long-Distance Travel | OPHE Shuttle & Tours" },
      {
        property: "og:description",
        content: "Longer journeys beyond Gauteng, done comfortably and at a fixed price.",
      },
      { property: "og:url", content: "/services/long-distance-travel" },
    ],
    links: [{ rel: "canonical", href: "/services/long-distance-travel" }],
  }),
  component: () => (
    <ServicePage
      serviceKey="long-distance"
      image={heroImg}
      imageAlt="Black Mercedes-Benz Vito ready for a long-distance trip"
      body="Heading out of the province? We plan the route with you, build in comfort stops, and make sure there's room for everything you're taking. You arrive rested instead of road-weary — and nobody has to take a turn behind the wheel."
    />
  ),
});
