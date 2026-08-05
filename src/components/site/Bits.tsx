import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { defaultWaMessage, site, waLink } from "@/lib/site";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("px-4 py-16 sm:px-6 md:py-24", className)}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  as = "h2",
  center,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  as?: "h1" | "h2";
  center?: boolean;
}) {
  const Tag = as;
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Tag className="mt-3 text-3xl font-bold text-balance md:text-4xl">{title}</Tag>
      {intro ? <p className="mt-4 text-muted-foreground">{intro}</p> : null}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      {image ? (
        <img
          src={image}
          alt={imageAlt ?? ""}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          loading="lazy"
        />
      ) : null}
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="mt-3 max-w-3xl text-4xl font-bold text-balance md:text-5xl">{title}</h1>
        {intro ? <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{intro}</p> : null}
      </div>
    </section>
  );
}

export function CTABand({
  title = "Ready to travel in comfort?",
  subtitle = "Tell us where you're going and we'll take care of the rest.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="border-y border-gold/25 bg-surface px-4 py-14 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="min-w-0">
          <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="font-display font-semibold">
            <Link to="/book">Book Now</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={waLink(defaultWaMessage)} target="_blank" rel="noreferrer">
              WhatsApp {site.phoneDisplay}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-md border border-dashed border-gold/40 bg-secondary/40 p-4 text-sm text-muted-foreground">
      {children}
    </p>
  );
}
