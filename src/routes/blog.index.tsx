import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHero, Section } from "@/components/site/Bits";
import { Card, CardContent } from "@/components/ui/card";
import { listPosts } from "@/lib/public-content.functions";

export const Route = createFileRoute("/blog/")({
  loader: () => listPosts(),
  head: () => ({
    meta: [
      { title: "Travel Guides & Shuttle Tips in Gauteng | OPHE Blog" },
      {
        name: "description",
        content:
          "Practical travel guides from OPHE Shuttle & Tours: airport shuttle costs in Gauteng, the best day trips from Johannesburg and event transport advice.",
      },
      { property: "og:title", content: "OPHE Travel Guides & Shuttle Tips" },
      {
        property: "og:description",
        content: "Guides on airport transfers, day trips and event transport in Gauteng.",
      },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
  errorComponent: () => (
    <Section>
      <p className="text-muted-foreground">Posts couldn't load. Please refresh.</p>
    </Section>
  ),
});

function BlogIndex() {
  const posts = Route.useLoaderData();
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Travel guides & tips"
        intro="Straight answers about getting around Gauteng — and getting out of it for the day."
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          {posts.map((p) => (
            <Card key={p.slug} className="border-border/60 bg-card">
              <CardContent className="p-6">
                <p className="text-xs text-muted-foreground">
                  {new Date(p.published_at).toLocaleDateString("en-ZA", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h2 className="mt-2 font-display text-lg font-semibold">
                  <Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:text-gold">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">{p.excerpt}</p>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="mt-4 inline-block text-sm font-medium text-gold hover:underline"
                >
                  Read more →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
