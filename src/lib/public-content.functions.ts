import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

// Public, read-only content reads used by route loaders (SSR/prerender safe).
function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`)
          h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const listTours = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = publicClient();
  const { data: packages } = await supabase
    .from("tour_packages")
    .select("id, slug, title, summary, price_cents, deposit_cents")
    .eq("published", true)
    .order("created_at");
  return packages ?? [];
});

export const getTour = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const supabase = publicClient();
    const { data: pkg } = await supabase
      .from("tour_packages")
      .select("id, slug, title, summary, description, inclusions, price_cents, deposit_cents")
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (!pkg) return null;
    const { data: dates } = await supabase
      .from("tour_dates")
      .select("id, departure_date, seats_available")
      .eq("package_id", pkg.id)
      .eq("is_open", true)
      .order("departure_date");
    return { ...pkg, dates: dates ?? [] };
  });

export const listPosts = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = publicClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false });
  return data ?? [];
});

export const getPost = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const supabase = publicClient();
    const { data: post } = await supabase
      .from("blog_posts")
      .select("slug, title, excerpt, body, published_at")
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    return post;
  });
