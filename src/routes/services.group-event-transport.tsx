import { createFileRoute } from "@tanstack/react-router";

import experienceImg from "@/assets/experience-champagne.jpg";
import { ServicePage } from "@/components/site/ServiceCard";

export const Route = createFileRoute("/services/group-event-transport")({
  head: () => ({
    meta: [
      { title: "Group & Event Transport in Gauteng | OPHE Shuttle & Tours" },
      {
        name: "description",
        content:
          "Group transport for matric dances, weddings, birthdays and functions in Gauteng — champagne, flowers and decor arranged on request. Book with OPHE Shuttle & Tours.",
      },
      { property: "og:title", content: "Group & Event Transport | OPHE Shuttle & Tours" },
      {
        property: "og:description",
        content: "Matric dances, celebrations and functions — arrive together, arrive in style.",
      },
      { property: "og:url", content: "/services/group-event-transport" },
    ],
    links: [{ rel: "canonical", href: "/services/group-event-transport" }],
  }),
  component: () => (
    <ServicePage
      serviceKey="group-event"
      image={experienceImg}
      imageAlt="Champagne glasses and roses on the rear seat of the vehicle"
      body="This is where OPHE really comes alive. Matric dances, anniversaries, proposals, birthdays, welcome-home pickups — tell us what you're celebrating and we'll set the vehicle up for it. Champagne on ice, flowers on the seat, and photos before you walk in."
    />
  ),
});
