import { Link } from "@tanstack/react-router";
import { Menu, Phone } from "lucide-react";
import { useState } from "react";

import logo from "@/assets/ophe-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { site } from "@/lib/site";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/tours", label: "Tours & Packages" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2" aria-label={`${site.name} home`}>
          <img
            src={logo.url}
            alt={`${site.name} logo`}
            width={160}
            height={90}
            className="h-10 w-auto shrink-0 sm:h-12"
          />
        </Link>

        <div className="flex items-center gap-1">
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-gold" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <a
            href={`tel:${site.phoneTel}`}
            className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground md:flex"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {site.phoneDisplay}
          </a>

          <Button asChild size="sm" className="ml-1 font-display font-semibold">
            <Link to="/book">Book Now</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background">
              <SheetTitle className="font-display text-gold">Menu</SheetTitle>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile">
                {[...nav, { to: "/about", label: "About" }, { to: "/blog", label: "Blog" }].map(
                  (item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="rounded-md px-3 py-3 text-base text-foreground/90 transition-colors hover:bg-secondary"
                      activeProps={{ className: "text-gold" }}
                      activeOptions={{ exact: item.to === "/" }}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
                <Button asChild className="mt-4 font-display font-semibold">
                  <Link to="/book" onClick={() => setOpen(false)}>
                    Book Now
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
