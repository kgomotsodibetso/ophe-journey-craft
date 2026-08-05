import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHero, Section } from "@/components/site/Bits";
import { supabase } from "@/integrations/supabase/client";
import { startDeposit } from "@/lib/payments";
import {
  defaultWaMessage,
  rands,
  serviceLabel,
  serviceOptions,
  site,
  waLink,
  type ServiceKey,
} from "@/lib/site";

const searchSchema = z.object({
  service: z.string().optional(),
  tour: z.string().optional(),
});

export const Route = createFileRoute("/book")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Book a Shuttle, Transfer or Tour | OPHE Shuttle & Tours" },
      {
        name: "description",
        content:
          "Book an airport transfer, private trip, group event transport or day tour in Gauteng. Quick five-step booking with a deposit to confirm your seat.",
      },
      { property: "og:title", content: "Book Your Journey | OPHE Shuttle & Tours" },
      { property: "og:description", content: "Book your Gauteng shuttle, transfer or day tour." },
      { property: "og:url", content: "/book" },
    ],
    links: [{ rel: "canonical", href: "/book" }],
  }),
  component: BookPage,
});

const formSchema = z.object({
  pickup: z.string().trim().min(2, "Where should we collect you?").max(200),
  dropoff: z.string().trim().min(2, "Where are you going?").max(200),
  passengers: z.number().int().min(1).max(7),
  luggage: z.string().trim().max(500).optional(),
  requests: z.string().trim().max(1000).optional(),
  name: z.string().trim().min(2, "Please add your name").max(100),
  phone: z.string().trim().min(9, "Add a contact number").max(20),
  email: z.string().trim().email("Check your email address").max(255),
});

type Confirmation = {
  reference: string;
  depositCents: number | null;
  instructions: string;
  summary: string;
};

function BookPage() {
  const search = Route.useSearch();
  const [step, setStep] = useState(1);
  const [service, setService] = useState<ServiceKey | "">(
    (search.service as ServiceKey | undefined) ?? "",
  );
  const [tourDateId, setTourDateId] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelTime, setTravelTime] = useState("");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [luggage, setLuggage] = useState("");
  const [requests, setRequests] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+27 ");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  const { data: tour } = useQuery({
    queryKey: ["tour", search.tour ?? "sun-city-valley-of-the-waves"],
    enabled: service === "tour-package",
    queryFn: async () => {
      const { data: pkg } = await supabase
        .from("tour_packages")
        .select("id, slug, title, price_cents, deposit_cents")
        .eq("slug", search.tour ?? "sun-city-valley-of-the-waves")
        .maybeSingle();
      if (!pkg) return null;
      const { data: dates } = await supabase
        .from("tour_dates")
        .select("id, departure_date")
        .eq("package_id", (pkg as { id: string }).id)
        .eq("is_open", true)
        .order("departure_date");
      return { ...(pkg as Record<string, never>), dates: dates ?? [] } as unknown as {
        id: string;
        title: string;
        price_cents: number;
        deposit_cents: number;
        dates: { id: string; departure_date: string }[];
      };
    },
  });

  const isTour = service === "tour-package";

  async function submit() {
    const parsed = formSchema.safeParse({
      pickup,
      dropoff,
      passengers,
      luggage,
      requests,
      name,
      phone,
      email,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }
    setSaving(true);
    const depositCents = isTour && tour ? tour.deposit_cents * passengers : null;
    const quotedCents = isTour && tour ? tour.price_cents * passengers : null;

    const { data, error } = await supabase
      .from("bookings")
      .insert({
        service_type: service,
        tour_package_id: isTour && tour ? tour.id : null,
        tour_date_id: isTour && tourDateId ? tourDateId : null,
        travel_date: isTour ? null : travelDate || null,
        travel_time: isTour ? null : travelTime || null,
        pickup_location: parsed.data.pickup,
        dropoff_location: parsed.data.dropoff,
        passengers: parsed.data.passengers,
        luggage_notes: parsed.data.luggage || null,
        special_requests: parsed.data.requests || null,
        customer_name: parsed.data.name,
        customer_phone: parsed.data.phone,
        customer_email: parsed.data.email,
        quoted_cents: quotedCents,
        deposit_cents: depositCents,
      } as never)
      .select("reference")
      .single();
    setSaving(false);

    if (error || !data) {
      toast.error("We couldn't save that booking. Please try again or WhatsApp us.");
      return;
    }

    const reference = (data as { reference: string }).reference;
    const deposit = startDeposit({
      reference,
      amountCents: depositCents ?? 0,
      description: serviceLabel(service),
    });

    setConfirmation({
      reference,
      depositCents,
      instructions:
        deposit.kind === "manual"
          ? deposit.instructions
          : "Redirecting you to secure payment...",
      summary: [
        `Booking ${reference}`,
        `Service: ${serviceLabel(service)}`,
        isTour
          ? `Tour date: ${tour?.dates.find((d) => d.id === tourDateId)?.departure_date ?? "TBC"}`
          : `Travel: ${travelDate} ${travelTime}`,
        `Pickup: ${parsed.data.pickup}`,
        `Drop-off: ${parsed.data.dropoff}`,
        `Passengers: ${parsed.data.passengers}`,
        parsed.data.requests ? `Notes: ${parsed.data.requests}` : "",
        `Name: ${parsed.data.name} (${parsed.data.phone})`,
      ]
        .filter(Boolean)
        .join("\n"),
    });
    // NOTE: confirmation email is sent from the admin side at launch.
  }

  if (confirmation) {
    return (
      <>
        <PageHero
          eyebrow="Booking received"
          title={`Thank you — reference ${confirmation.reference}`}
          intro="We've got your request. Confirm on WhatsApp and we'll lock it in."
        />
        <Section>
          <Card className="max-w-xl border-gold/30 bg-card">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">{confirmation.instructions}</p>
              {confirmation.depositCents ? (
                <p className="mt-4 text-lg font-semibold text-gold">
                  Deposit due: {rands(confirmation.depositCents)}
                </p>
              ) : null}
              <pre className="mt-6 overflow-x-auto rounded-md bg-secondary/50 p-4 text-xs whitespace-pre-wrap text-muted-foreground">
                {confirmation.summary}
              </pre>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="font-display font-semibold">
                  <a
                    href={waLink(`Hi ${site.contactName},\n${confirmation.summary}`)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Confirm via WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/">Back home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Book now"
        title="Book your journey"
        intro="Five quick steps. We'll confirm on WhatsApp within the day."
      />
      <Section>
        <div className="max-w-2xl">
          <p className="text-sm text-muted-foreground">Step {step} of 5</p>

          {step === 1 && (
            <div className="mt-6 space-y-3">
              <h2 className="font-display text-xl font-semibold">What do you need?</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {serviceOptions.map((opt) => (
                  <Button
                    key={opt.value}
                    variant={service === opt.value ? "default" : "outline"}
                    className="h-auto justify-start py-4"
                    onClick={() => setService(opt.value)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
              <Button className="mt-4" disabled={!service} onClick={() => setStep(2)}>
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="mt-6 space-y-4">
              <h2 className="font-display text-xl font-semibold">When are you travelling?</h2>
              {isTour ? (
                <div className="space-y-2">
                  {(tour?.dates ?? []).map((d) => (
                    <Button
                      key={d.id}
                      variant={tourDateId === d.id ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setTourDateId(d.id)}
                    >
                      {new Date(d.departure_date).toLocaleDateString("en-ZA", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </Button>
                  ))}
                  {tour && tour.dates.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No open dates right now — WhatsApp us and we'll plan something.
                    </p>
                  ) : null}
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="date">Travel date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Pickup time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={travelTime}
                      onChange={(e) => setTravelTime(e.target.value)}
                    />
                  </div>
                </div>
              )}
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  disabled={isTour ? !tourDateId : !travelDate}
                  onClick={() => setStep(3)}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="mt-6 space-y-4">
              <h2 className="font-display text-xl font-semibold">Trip details</h2>
              <div>
                <Label htmlFor="pickup">Pickup location</Label>
                <Input id="pickup" value={pickup} onChange={(e) => setPickup(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="dropoff">Drop-off location</Label>
                <Input id="dropoff" value={dropoff} onChange={(e) => setDropoff(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="pax">Passengers</Label>
                <Input
                  id="pax"
                  type="number"
                  min={1}
                  max={7}
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="luggage">Luggage notes</Label>
                <Input id="luggage" value={luggage} onChange={(e) => setLuggage(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="requests">Special requests</Label>
                <Textarea
                  id="requests"
                  placeholder="Celebration or event — flowers or champagne on board?"
                  value={requests}
                  onChange={(e) => setRequests(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button disabled={!pickup || !dropoff} onClick={() => setStep(4)}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="mt-6 space-y-4">
              <h2 className="font-display text-xl font-semibold">Your details</h2>
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="phone">Phone (South African)</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                We use your details only to arrange and confirm this booking, in line with POPIA.
                We never share them with anyone else.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(3)}>
                  Back
                </Button>
                <Button disabled={!name || !phone || !email} onClick={() => setStep(5)}>
                  Review booking
                </Button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="mt-6 space-y-4">
              <h2 className="font-display text-xl font-semibold">Summary</h2>
              <Card className="border-border/60 bg-card">
                <CardContent className="space-y-1 p-6 text-sm text-muted-foreground">
                  <p>Service: {serviceLabel(service)}</p>
                  <p>
                    When:{" "}
                    {isTour
                      ? (tour?.dates.find((d) => d.id === tourDateId)?.departure_date ?? "—")
                      : `${travelDate} ${travelTime}`}
                  </p>
                  <p>Pickup: {pickup}</p>
                  <p>Drop-off: {dropoff}</p>
                  <p>Passengers: {passengers}</p>
                  {isTour && tour ? (
                    <p className="pt-2 text-base font-semibold text-gold">
                      Total {rands(tour.price_cents * passengers)} · Deposit due{" "}
                      {rands(tour.deposit_cents * passengers)}
                    </p>
                  ) : (
                    <p className="pt-2 text-foreground">
                      We'll confirm your quote before any payment is due.
                    </p>
                  )}
                </CardContent>
              </Card>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(4)}>
                  Back
                </Button>
                <Button
                  disabled={saving}
                  onClick={submit}
                  className="font-display font-semibold"
                >
                  {saving ? "Sending..." : "Confirm booking"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Prefer to chat?{" "}
                <a
                  className="text-gold hover:underline"
                  href={waLink(defaultWaMessage)}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp {site.phoneDisplay}
                </a>
              </p>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
