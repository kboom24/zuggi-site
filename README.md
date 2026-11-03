# Zuggi: Play. Read. Watch.

Anime-style entertainment universe: heavy browser games, webcomics and an animated series, all starring the **Zuggi Squad**.

- **Stack:** Next.js 16 (App Router, TypeScript, Tailwind v4), fully static export (`output: "export"`), Supabase for Join Free signups, games loaded from Cloudflare R2 / any CDN in a sandboxed iframe.
- **Hosting:** Cloudflare Pages (production) and GitHub Pages (preview). See [DEPLOY.md](./DEPLOY.md).

## Run locally

```bash
npm install
cp .env.example .env.local   # optional; everything works without it
npm run dev                  # http://localhost:3000
npm run build                # static site in ./out
python3 -m http.server 4173 -d out   # serve the static build
```

Without Supabase env vars the Join Free form runs in **preview mode**: it shows the success state and keeps the email in `localStorage` only.

## Routes

| Route | What |
| --- | --- |
| `/` | Hub homepage (hero, Watch / Read / Play rows, Meet the Squad, mission, Join Free) |
| `/watch/`, `/watch/[slug]/` | Episode list, episode page (player placeholder, info, up next) |
| `/read/`, `/read/[slug]/` | Chapter list, vertical webcomic reader |
| `/play/`, `/play/[slug]/` | Game grid with category pills, game page (sandboxed frame, fullscreen, loading screen, related, VideoGame JSON-LD) |
| `/squad/`, `/squad/[slug]/` | Character profiles |
| `/shop/` | Merch placeholders (all "Coming soon", no checkout) |
| `/about/` | Mission |
| `/search/?q=` | Client-side search across all content |
| 404 | `not-found.tsx` |

Also generated: `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, favicon/app icons (from the fox mascot).

## Editing content (all data-driven)

Everything lives in `src/data/*.ts` and is clearly marked **PLACEHOLDER**:

- `characters.ts` – the squad (names, roles, bios, portrait image)
- `episodes.ts` – Zuggi TV. Set `videoUrl` (MP4/WebM on R2, Cloudflare Stream, or an embed URL) to make an episode playable.
- `chapters.ts` – Zuggi Comics. Add page image paths to `pages: []` (tall vertical strips) to replace the placeholder panels.
- `games.ts` – Zuggi Games. `gameUrl`:
  - `"slug/index.html"` → loaded from `NEXT_PUBLIC_GAMES_CDN` (Cloudflare R2). Without a CDN configured the page shows **Coming soon**.
  - `"/games/..."` → served from this site's `public/` folder (Neon Drift uses a tiny local demo build at `public/games/demo/`).
  - `"https://..."` → used as-is.
  - omitted → **Coming soon** + notify form.
- `merch.ts` – shop items.

Add a new item = add an object + drop its image into `public/img/` (WebP, ~600–800px wide). Pages, sitemap and search pick it up automatically.

## Heavy games and performance

Game pages never mount the iframe until the player presses **Play**, so a 50–200 MB Unity WebGL build cannot slow down browsing. The frame is sandboxed (`allow-scripts allow-same-origin allow-pointer-lock …`). Host game builds on a **separate origin** (e.g. `games.zuggi.example` on R2) so `allow-same-origin` only applies to the game's own origin.

## Brand

Palette: hot magenta `#FF0B8A`, electric cyan `#00F0FF`, deep black-purple `#1A0D2E`, white, neon lavender `#C72CFF` (Tailwind tokens `magenta`, `cyan`, `ink`, `lavender`). Fonts (self-hosted, OFL): Oswald (display), Inter (body), Passion One (wordmark, `src/components/Logo.tsx`). Art in `public/img/` was generated from the Zuggi mockups and is placeholder.

## Scripts

- `./scripts-shots.sh` – headless Chrome screenshots of the served build into `screenshots/`.
