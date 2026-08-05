// Central place for business details. Swap these when final info is confirmed.
export const site = {
  name: "OPHE Shuttle & Tours",
  short: "OPHE",
  tagline: "Your Journey. Our Priority.",
  taglines: [
    "Your Journey. Our Priority.",
    "Premium Travel. Personal Service.",
    "Safe, Reliable & Luxury Travel",
  ],
  contactName: "Jabulani Mabena",
  phoneDisplay: "083 946 9453",
  phoneTel: "+27839469453",
  whatsapp: "27839469453",
  instagram: "https://www.instagram.com/ophe_shuttleandtours/",
  instagramHandle: "@ophe_shuttleandtours",
  // PLACEHOLDER: exact base address to be confirmed. Service area is Gauteng.
  serviceArea: "Gauteng, South Africa",
  priceRange: "RR",
  // PLACEHOLDER: add the Google Business Profile URL once the listing exists.
  googleBusinessProfile: "",
} as const;

export function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const defaultWaMessage = `Hi ${site.contactName}, I'd like to enquire about a trip with OPHE Shuttle & Tours.`;

export function rands(cents: number) {
  return `R${(cents / 100).toLocaleString("en-ZA", { minimumFractionDigits: 0 })}`;
}

export type ServiceKey =
  | "airport-transfer"
  | "private-corporate"
  | "tour-package"
  | "group-event"
  | "long-distance";

export const services: {
  key: ServiceKey;
  title: string;
  short: string;
  href: string;
  icon: "plane" | "briefcase" | "map" | "party" | "route";
  benefits: string[];
  hero: string;
}[] = [
  {
    key: "airport-transfer",
    title: "Airport Transfers",
    short: "Reliable pickups and drop-offs at OR Tambo and Lanseria, day or night.",
    href: "/services/airport-transfers",
    icon: "plane",
    hero: "On-time airport transfers across Gauteng, with a driver who tracks your flight.",
    benefits: [
      "We track your flight, so delays never leave you stranded",
      "Meet-and-greet at arrivals with help for your bags",
      "Roof box means room for everyone's luggage",
      "Available 24/7, including early-morning departures",
    ],
  },
  {
    key: "private-corporate",
    title: "Private & Corporate Travel",
    short: "Point-to-point private trips, staff transport and business travel.",
    href: "/services/private-corporate-travel",
    icon: "briefcase",
    hero: "Professional, discreet travel for you, your clients and your team.",
    benefits: [
      "Point-to-point private trips on your schedule",
      "Staff and shift transport arranged in advance",
      "Quiet, comfortable cabin for calls and prep on the move",
      "Discreet, professional service every trip",
    ],
  },
  {
    key: "tour-package",
    title: "Tours & Day Packages",
    short: "Day trips and getaways with the driving handled for you.",
    href: "/tours",
    icon: "map",
    hero: "Great days out, without anyone having to drive.",
    benefits: [
      "Fixed departure dates you can book in a click",
      "Return transport included",
      "Small groups, relaxed pace",
      "Safe travel there and home again",
    ],
  },
  {
    key: "group-event",
    title: "Group & Event Transport",
    short: "Matric dances, functions, celebrations and welcome-home pickups.",
    href: "/services/group-event-transport",
    icon: "party",
    hero: "Arrive together, arrive in style.",
    benefits: [
      "Champagne toasts, flowers and decor arranged on request",
      "Matric dances, weddings, birthdays and anniversaries",
      "Everyone arrives together and on time",
      "Safe late-night, door-to-door travel",
    ],
  },
  {
    key: "long-distance",
    title: "Long-Distance Travel",
    short: "Comfortable trips beyond Gauteng, at a fair fixed price.",
    href: "/services/long-distance-travel",
    icon: "route",
    hero: "Longer journeys, done comfortably.",
    benefits: [
      "Trips outside Gauteng arranged door to door",
      "Comfort stops planned into the route",
      "Space for luggage on the roof box",
      "One agreed price before you travel",
    ],
  },
];

export const serviceOptions: { value: ServiceKey; label: string }[] = [
  { value: "airport-transfer", label: "Airport Transfer" },
  { value: "private-corporate", label: "Private Trip / Corporate" },
  { value: "tour-package", label: "Tour Package" },
  { value: "group-event", label: "Group / Event" },
  { value: "long-distance", label: "Long-Distance" },
];

export function serviceLabel(key: string) {
  return serviceOptions.find((s) => s.value === key)?.label ?? key;
}
