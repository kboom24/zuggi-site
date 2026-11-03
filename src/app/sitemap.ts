import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { episodes } from "@/data/episodes";
import { chapters } from "@/data/chapters";
import { games } from "@/data/games";
import { characters } from "@/data/characters";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/play/", "/read/", "/watch/", "/squad/", "/shop/", "/about/"];
  return [
    ...staticPaths.map((p) => ({ url: absoluteUrl(p), changeFrequency: "weekly" as const, priority: p === "/" ? 1 : 0.8 })),
    ...games.map((g) => ({ url: absoluteUrl(`/play/${g.slug}/`), changeFrequency: "weekly" as const, priority: 0.9 })),
    ...episodes.map((e) => ({ url: absoluteUrl(`/watch/${e.slug}/`), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...chapters.map((c) => ({ url: absoluteUrl(`/read/${c.slug}/`), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...characters.map((c) => ({ url: absoluteUrl(`/squad/${c.slug}/`), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
