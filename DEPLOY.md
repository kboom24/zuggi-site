# Deploying Zuggi

The site is a **fully static export** (`next build` → `out/`). No server runtime is needed. All dynamic routes are pre-rendered with `generateStaticParams`, which is best for SEO.

## 1. Cloudflare Pages (production)

1. Push the repo to GitHub (already done for the preview: `kboom24/zuggi-site`).
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick the repo.
3. Build settings:
   - Framework preset: **Next.js (Static HTML Export)** (or "None")
   - Build command: `npm run build`
   - Build output directory: `out`
   - Environment variables (Production + Preview):
     - `NODE_VERSION` = `22`
     - `NEXT_PUBLIC_SITE_URL` = `https://your-domain`
     - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (step 2)
     - `NEXT_PUBLIC_GAMES_CDN` (step 3)
   - Do **not** set `GITHUB_PAGES` here.
4. Custom domain: Pages project → **Custom domains** → add the domain (only when Hexan approves; this touches DNS).
5. `public/_headers` sets cache + security headers on Cloudflare Pages.

CLI alternative: `npm run build && npx wrangler pages deploy out --project-name zuggi`.

> Need server features later (auth callbacks, API routes, ISR)? Switch to `@opennextjs/cloudflare`: remove `output: "export"`, `npm i -D @opennextjs/cloudflare wrangler`, add `wrangler.jsonc`, and deploy with `npx opennextjs-cloudflare build && npx opennextjs-cloudflare deploy`. The current pages need no changes.

## 2. Supabase (Join Free signups)

1. Create a Supabase project (free tier is fine).
2. SQL Editor → run `supabase/migrations/20261103000000_create_signups.sql` (or `supabase db push` with the CLI).
   - Creates `public.signups (email citext unique, source, created_at)`
   - RLS on, **insert-only** policy for `anon`; no read/update/delete for the public key.
3. Project Settings → API → copy **Project URL** and **anon public key** into `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` on Cloudflare Pages, then redeploy.
4. View signups in Table Editor, or export CSV. (To sync into Resend or another email tool later, add a Supabase Database Webhook / Edge Function on insert.)

Without these env vars the form shows a friendly success message and saves nothing (preview mode).

## 3. Cloudflare R2 (game builds)

1. Cloudflare → **R2** → create bucket `zuggi-games`.
2. Bucket → Settings → **Custom domain** (e.g. `games.your-domain`), or enable the `r2.dev` public URL for testing.
3. Upload each build into its own folder: `neon-drift/index.html`, `neon-drift/Build/*`, …
   - CLI: `npx wrangler r2 object put zuggi-games/neon-drift/index.html --file ./index.html` (or use rclone / the dashboard for whole folders).
4. **Unity WebGL** builds: build with *Compression Format = Brotli* (or Gzip) and *Decompression Fallback* off, and set object metadata so the CDN serves them correctly:
   - `*.br` → `Content-Encoding: br`, `*.gz` → `Content-Encoding: gzip`
   - `*.wasm(.br)` → `Content-Type: application/wasm`; `*.data(.br)` → `application/octet-stream`; `*.js(.br)` → `application/javascript`
   - Long cache: `Cache-Control: public, max-age=31536000, immutable` for hashed files.
5. CORS on the bucket (only if a game fetches assets cross-origin): allow `GET` from your site origin.
6. Set `NEXT_PUBLIC_GAMES_CDN=https://games.your-domain` and set each game's `gameUrl` in `src/data/games.ts` to `"<slug>/index.html"`. Redeploy.

## 4. GitHub Pages (preview)

`deploy/github-pages-workflow.yml` (move it to `.github/workflows/` to activate) builds with `GITHUB_PAGES=true` (adds `basePath`/`assetPrefix` `/zuggi-site`, trailing slashes, unoptimized images) and deploys `out/` to Pages on every push to `main`.

- Enable once: repo **Settings → Pages → Source: GitHub Actions** (or `gh api -X POST repos/<owner>/zuggi-site/pages -f build_type=workflow`).
- Preview URL: `https://<owner>.github.io/zuggi-site/`
- Local check: `GITHUB_PAGES=true npm run build` then serve `out/` under `/zuggi-site`.
- Free GitHub Pages requires a public repository.

### Current preview setup (gh-pages branch)

The gh CLI token used to create the preview has no `workflow` scope, so the Actions workflow could not be pushed. The preview is instead published from the **`gh-pages` branch** (static `out/` from `GITHUB_PAGES=true npm run build`, plus `.nojekyll`), with Pages source = `gh-pages` / root.

To redeploy the preview manually:

```bash
GITHUB_PAGES=true NEXT_PUBLIC_SITE_URL=https://kboom24.github.io npm run build
touch out/.nojekyll
npx gh-pages -d out -t   # or push out/ to the gh-pages branch any other way
```

To switch to automatic deploys: move `deploy/github-pages-workflow.yml` to `.github/workflows/pages.yml`, push it with a token that has the `workflow` scope (`gh auth refresh -s workflow`), and set Pages source to **GitHub Actions**.
