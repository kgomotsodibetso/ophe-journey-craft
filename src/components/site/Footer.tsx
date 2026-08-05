import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, Phone } from "lucide-react";

import logo from "@/assets/ophe-logo-compact.jpg";
import { defaultWaMessage, site, waLink } from "@/lib/site";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/tours", label: "Tours & Packages" },
  { to: "/book", label: "Book Now" },
] as const;

const moreLinks = [
  { to: "/gallery", label: "Gallery" },
  { to: "/reviews", label: "Reviews" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <img
            src={logo}
            alt={`${site.name} logo`}
            width={200}
            height={81}
            loading="lazy"
            className="h-14 w-auto"
          />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            {site.tagline} Premium shuttle, airport transfer and private tour travel across{" "}
            {site.serviceArea}.
          </p>
        </div>

        <nav aria-label="Footer quick links">
          <h2 className="font-display text-sm font-semibold text-gold">Quick links</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted-foreground hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-semibold text-gold">More</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {moreLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted-foreground hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="mt-6 font-display text-sm font-semibold text-gold">Get in touch</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`tel:${site.phoneTel}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Phone className="h-4 w-4" aria-hidden="true" /> {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={waLink(defaultWaMessage)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp us
              </a>
            </li>
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" /> {site.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
