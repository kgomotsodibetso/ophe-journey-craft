import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { CTABand, Section } from "@/components/site/Bits";
import { getPost } from "@/lib/public-content.functions";
import { site } from "@/lib/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getPost({ data: { slug: params.slug } });
    if (!post) throw notFound();
    return post;
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Post unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.title} | ${site.name}`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: loaderData.title,
            description: loaderData.excerpt,
            datePublished: loaderData.published_at,
            author: { "@type": "Organization", name: site.name },
          }),
        },
      ],
    };
  },
  component: BlogPost,
  notFoundComponent: PostNotFound,
  errorComponent: () => (
    <Section>
      <p className="text-muted-foreground">This post couldn't load. Please refresh.</p>
    </Section>
  ),
});

function PostNotFound() {
  return (
    <Section>
      <h1 className="text-2xl font-bold">Post not found</h1>
      <Button asChild className="mt-6">
        <Link to="/blog">Back to the blog</Link>
      </Button>
    </Section>
  );
}

function BlogPost() {
  const post = Route.useLoaderData();
  return (
    <>
      <Section className="pb-0">
        <article className="mx-auto max-w-2xl">
          <p className="eyebrow">
            {new Date(post.published_at).toLocaleDateString("en-ZA", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <h1 className="mt-3 text-3xl font-bold text-balance md:text-4xl">{post.title}</h1>
          <div className="mt-8 space-y-4">
            {post.body.split("\n\n").map((para, i) => (
              <p key={i} className="whitespace-pre-line text-muted-foreground">
                {para}
              </p>
            ))}
          </div>
          <Link to="/blog" className="mt-10 inline-block text-sm font-medium text-gold">
            ← All posts
          </Link>
        </article>
      </Section>
      <Section>
        <CTABand />
      </Section>
    </>
  );
}
