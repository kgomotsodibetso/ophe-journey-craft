import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CTABand, PageHero, Section } from "@/components/site/Bits";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews & Testimonials | OPHE Shuttle & Tours" },
      {
        name: "description",
        content:
          "Read reviews of OPHE Shuttle & Tours and share your own experience of our Gauteng airport transfers, private travel and day tours.",
      },
      { property: "og:title", content: "Reviews | OPHE Shuttle & Tours" },
      { property: "og:description", content: "Be one of our first reviews." },
      { property: "og:url", content: "/reviews" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: Reviews,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please add your name").max(100),
  location: z.string().trim().max(100).optional(),
  message: z.string().trim().min(10, "Tell us a little more").max(1000),
});

function Reviews() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [sending, setSending] = useState(false);

  const { data: reviews } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data } = await supabase
        .from("testimonials")
        .select("id, name, location, rating, message")
        .eq("approved", true)
        .order("created_at", { ascending: false });
      return (data ?? []) as {
        id: string;
        name: string;
        location: string | null;
        rating: number;
        message: string;
      }[];
    },
  });

  async function submit() {
    const parsed = schema.safeParse({ name, location, message });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your review");
      return;
    }
    setSending(true);
    const { error } = await supabase.from("testimonials").insert({
      name: parsed.data.name,
      location: parsed.data.location || null,
      message: parsed.data.message,
      rating,
      approved: false,
    } as never);
    setSending(false);
    if (error) {
      toast.error("We couldn't send that. Please try again.");
      return;
    }
    toast.success("Thank you! We'll publish your review once it's checked.");
    setName("");
    setLocation("");
    setMessage("");
  }

  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="Be one of our first reviews!"
        intro="We're new, and every honest word helps. Travelled with us? Tell us how it went."
      />
      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-semibold">What travellers say</h2>
            {reviews && reviews.length > 0 ? (
              <div className="mt-6 space-y-4">
                {reviews.map((r) => (
                  <Card key={r.id} className="border-border/60 bg-card">
                    <CardContent className="p-6">
                      <div className="flex gap-1" aria-label={`${r.rating} out of 5 stars`}>
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
                        ))}
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground">{r.message}</p>
                      <p className="mt-3 text-sm font-medium">
                        {r.name}
                        {r.location ? `, ${r.location}` : ""}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-muted-foreground">
                No reviews yet — yours could be the first. {/* TODO: once the Google Business
                Profile exists, link out to Google reviews from here. */}
              </p>
            )}
          </div>

          <Card className="h-fit border-gold/30 bg-card">
            <CardContent className="space-y-4 p-6">
              <h2 className="font-display text-xl font-semibold">Leave a review</h2>
              <div>
                <Label htmlFor="r-name">Your name</Label>
                <Input id="r-name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="r-loc">Where are you from? (optional)</Label>
                <Input
                  id="r-loc"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div>
                <span className="text-sm font-medium">Rating</span>
                <div className="mt-2 flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRating(n)}
                      aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    >
                      <Star
                        className={
                          n <= rating ? "h-6 w-6 fill-gold text-gold" : "h-6 w-6 text-muted-foreground"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="r-msg">Your review</Label>
                <Textarea
                  id="r-msg"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button onClick={submit} disabled={sending} className="font-display font-semibold">
                {sending ? "Sending..." : "Submit review"}
              </Button>
              <p className="text-xs text-muted-foreground">
                Reviews are checked before they appear on the site.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>
      <CTABand />
    </>
  );
}
