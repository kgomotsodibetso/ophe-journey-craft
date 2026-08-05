import { Link } from "@tanstack/react-router";
import { Briefcase, Map, PartyPopper, Plane, Route as RouteIcon, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CTABand, PageHero, Section } from "@/components/site/Bits";
import { services, type ServiceKey } from "@/lib/site";

export const serviceIcons = {
  plane: Plane,
  briefcase: Briefcase,
  map: Map,
  party: PartyPopper,
  route: RouteIcon,
};

export function ServiceCard({ serviceKey }: { serviceKey: ServiceKey }) {
  const service = services.find((s) => s.key === serviceKey)!;
  const Icon = serviceIcons[service.icon];
  return (
    <Card className="h-full border-border/60 bg-card transition-colors hover:border-gold/50">
      <CardContent className="flex h-full flex-col gap-3 p-6">
        <Icon className="h-7 w-7 text-gold" aria-hidden="true" />
        <h3 className="font-display text-lg font-semibold">{service.title}</h3>
        <p className="text-sm text-muted-foreground">{service.short}</p>
        <Link
          to={service.href}
          className="mt-auto pt-3 text-sm font-medium text-gold hover:underline"
        >
          Learn more →
        </Link>
      </CardContent>
    </Card>
  );
}

export function ServicePage({
  serviceKey,
  image,
  imageAlt,
  body,
}: {
  serviceKey: ServiceKey;
  image: string;
  imageAlt: string;
  body: string;
}) {
  const service = services.find((s) => s.key === serviceKey)!;
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title={service.title}
        intro={service.hero}
        image={image}
        imageAlt={imageAlt}
      />
      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-lg text-muted-foreground">{body}</p>
            <ul className="mt-8 space-y-3">
              {service.benefits.map((b) => (
                <li key={b} className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  <span className="text-sm text-foreground/90">{b}</span>
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-8 font-display font-semibold">
              <Link to="/book" search={{ service: service.key }}>
                Book This Service
              </Link>
            </Button>
          </div>
          <img
            src={image}
            alt={imageAlt}
            width={1200}
            height={900}
            loading="lazy"
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
      </Section>
      <CTABand />
    </>
  );
}
