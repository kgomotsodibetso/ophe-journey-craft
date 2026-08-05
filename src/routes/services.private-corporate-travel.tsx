import { createFileRoute } from "@tanstack/react-router";

import fleetImg from "@/assets/fleet-interior.jpg";
import { ServicePage } from "@/components/site/ServiceCard";

export const Route = createFileRoute("/services/private-corporate-travel")({
  head: () => ({
    meta: [
      { title: "Private & Corporate Travel in Gauteng | OPHE Shuttle & Tours" },
      {
        name: "description",
        content:
          "Private point-to-point trips, staff transport and business travel across Gauteng. Professional, discreet and always on time with OPHE Shuttle & Tours.",
      },
      { property: "og:title", content: "Private & Corporate Travel | OPHE Shuttle & Tours" },
      {
        property: "og:description",
        content: "Private trips, staff transport and business travel, handled professionally.",
      },
      { property: "og:url", content: "/services/private-corporate-travel" },
    ],
    links: [{ rel: "canonical", href: "/services/private-corporate-travel" }],
  }),
  component: () => (
    <ServicePage
      serviceKey="private-corporate"
      image={fleetImg}
      imageAlt="Comfortable leather interior of the seven-seater Vito"
      body="Whether it's a client you want to impress, a team that needs to arrive together, or a private trip you'd rather not drive yourself — you get a quiet, comfortable cabin and a driver who understands that discretion is part of the job."
    />
  ),
});
