import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import heroImg from "@/assets/hero-vito.jpg";
import experienceImg from "@/assets/experience-champagne.jpg";
import sunCityImg from "@/assets/tour-sun-city.jpg";
import fleetImg from "@/assets/fleet-interior.jpg";
import airportImg from "@/assets/airport-welcome.jpg";
import { Button } from "@/components/ui/button";
import { CTABand, PageHero, Placeholder, Section } from "@/components/site/Bits";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Our Fleet & Experiences | OPHE Shuttle & Tours" },
      {
        name: "description",
        content:
          "See the OPHE Shuttle & Tours fleet, celebration moments and day tours. Premium travel photography from our trips across Gauteng.",
      },
      { property: "og:title", content: "Gallery | OPHE Shuttle & Tours" },
      { property: "og:description", content: "Our fleet, our experiences and our tours." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

// PLACEHOLDER IMAGERY: swap these for real fleet and lifestyle photos when supplied.
const items = [
  { src: heroImg, alt: "Black Mercedes-Benz Vito at night", category: "Our Fleet" },
  { src: fleetImg, alt: "Seven-seater leather interior", category: "Our Fleet" },
  { src: airportImg, alt: "Airport meet-and-greet at arrivals", category: "Experiences" },
  { src: experienceImg, alt: "Champagne and flowers on board", category: "Experiences" },
  { src: sunCityImg, alt: "Sun City Valley of the Waves", category: "Tours" },
];

const categories = ["All", "Our Fleet", "Experiences", "Tours"] as const;

function Gallery() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const shown = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="A look at how we travel"
        intro="Our vehicle, our celebrations and the places we take people."
      />
      <Section>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Button
              key={c}
              size="sm"
              variant={active === c ? "default" : "outline"}
              onClick={() => setActive(c)}
            >
              {c}
            </Button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((item) => (
            <figure key={item.alt} className="overflow-hidden rounded-lg border border-border/60">
              <img
                src={item.src}
                alt={item.alt}
                width={1200}
                height={900}
                loading="lazy"
                className="h-56 w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <figcaption className="px-4 py-3 text-xs text-muted-foreground">
                {item.category} — {item.alt}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10">
          <Placeholder>
            [PLACEHOLDER] These are stand-in images in the OPHE style. Send through your real fleet
            and celebration photos and we'll drop them straight in.
          </Placeholder>
        </div>
      </Section>
      <CTABand />
    </>
  );
}
