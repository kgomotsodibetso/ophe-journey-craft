import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Instagram, Facebook, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHero, Placeholder, Section } from "@/components/site/Bits";
import { supabase } from "@/integrations/supabase/client";
import { defaultWaMessage, site, waLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact OPHE Shuttle & Tours | Gauteng Shuttle Bookings" },
      {
        name: "description",
        content: `Contact OPHE Shuttle & Tours on ${site.phoneDisplay} or WhatsApp for airport transfers, private travel and day tours across Gauteng.`,
      },
      { property: "og:title", content: "Contact OPHE Shuttle & Tours" },
      { property: "og:description", content: "Call or WhatsApp us to plan your trip." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please add your name").max(100),
  email: z.string().trim().email("Check your email address").max(255),
  phone: z.string().trim().max(20).optional(),
  message: z.string().trim().min(5, "Tell us how we can help").max(1000),
});

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function submit() {
    const parsed = schema.safeParse({ name, email, phone, message });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }
    setSending(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      message: parsed.data.message,
    } as never);
    setSending(false);
    if (error) {
      toast.error("Message didn't send. Please WhatsApp us instead.");
      return;
    }
    toast.success("Thanks! We'll be in touch shortly.");
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's plan your trip"
        intro={`Call, WhatsApp or send a message — ${site.contactName} handles every booking personally.`}
      />
      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-3">
              <a
                href={`tel:${site.phoneTel}`}
                className="flex items-center gap-3 text-foreground hover:text-gold"
              >
                <Phone className="h-5 w-5 text-gold" aria-hidden="true" /> {site.phoneDisplay}
              </a>
              <Button asChild size="lg" className="w-full font-display font-semibold sm:w-auto">
                <a href={waLink(defaultWaMessage)} target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                  Chat on WhatsApp
                </a>
              </Button>
              <div className="flex gap-4 pt-2">
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <Instagram className="h-4 w-4" aria-hidden="true" /> Instagram
                </a>
                {/* PLACEHOLDER: add the Facebook page URL once it exists. */}
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Facebook className="h-4 w-4" aria-hidden="true" /> Facebook (coming soon)
                </span>
              </div>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold">Service area</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                We operate across {site.serviceArea}, with long-distance trips nationwide.
              </p>
              <div className="mt-4">
                <Placeholder>
                  [PLACEHOLDER] Map goes here — the exact base location will be added once
                  confirmed.
                </Placeholder>
              </div>
            </div>
          </div>

          <Card className="h-fit border-gold/30 bg-card">
            <CardContent className="space-y-4 p-6">
              <h2 className="font-display text-xl font-semibold">Send a message</h2>
              <div>
                <Label htmlFor="c-name">Name</Label>
                <Input id="c-name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="c-email">Email</Label>
                <Input
                  id="c-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="c-phone">Phone (optional)</Label>
                <Input id="c-phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="c-msg">Message</Label>
                <Textarea
                  id="c-msg"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button onClick={submit} disabled={sending} className="font-display font-semibold">
                {sending ? "Sending..." : "Send message"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}
