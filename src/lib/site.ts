/** Global site config. Values come from env so nothing is hard-wired to one host. */
export const SITE = {
  name: "Zuggi",
  tagline: "Play. Read. Watch.",
  gamesTagline: "Browser games. For everyone.",
  description:
    "Zuggi is an anime-style entertainment universe: heavy browser games, webcomics and an animated series starring the Zuggi Squad.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://zuggi.example").replace(/\/$/, ""),
};

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prefix a /public path with the basePath (needed for GitHub Pages sub-path hosting). */
export function asset(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Absolute URL for metadata / sitemap / JSON-LD. */
export function absoluteUrl(path = "/"): string {
  return `${SITE.url}${BASE_PATH}${path}`;
}

/** Base URL of the games CDN (Cloudflare R2 public bucket or custom domain). */
export const GAMES_CDN = (process.env.NEXT_PUBLIC_GAMES_CDN || "").replace(/\/$/, "");

/**
 * Resolve a game's build URL.
 * - "https://..."  -> used as-is
 * - "/games/..."   -> served from this site's /public folder
 * - "slug/index.html" -> joined to NEXT_PUBLIC_GAMES_CDN (null when the CDN is not configured)
 */
export function resolveGameUrl(gameUrl?: string): string | null {
  if (!gameUrl) return null;
  if (/^https?:\/\//.test(gameUrl)) return gameUrl;
  // Leading "/" = file shipped inside this site's /public folder (e.g. the local demo build).
  if (gameUrl.startsWith("/")) return asset(gameUrl);
  if (!GAMES_CDN) return null;
  return `${GAMES_CDN}/${gameUrl.replace(/^\//, "")}`;
}
