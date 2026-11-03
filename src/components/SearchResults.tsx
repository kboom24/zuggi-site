"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { games } from "@/data/games";
import { episodes } from "@/data/episodes";
import { chapters } from "@/data/chapters";
import { characters } from "@/data/characters";
import { EpisodeCard, ChapterCard, GameTile } from "./Cards";
import Link from "next/link";
import { asset } from "@/lib/site";

const norm = (s: string) => s.toLowerCase();

export function SearchResults() {
  return (
    <Suspense fallback={<p className="text-white/60">Loading search…</p>}>
      <SearchFromUrl />
    </Suspense>
  );
}

function SearchFromUrl() {
  // Static export: the query string is read on the client.
  const sp = useSearchParams();
  const initial = sp.get("q") || "";
  return <SearchInner key={initial} initial={initial} />;
}

function SearchInner({ initial }: { initial: string }) {
  const [q, setQ] = useState(initial);

  const r = useMemo(() => {
    const t = norm(q.trim());
    if (!t) return null;
    const has = (...f: string[]) => f.some((x) => norm(x).includes(t));
    return {
      games: games.filter((g) => has(g.title, g.tagline, g.description, ...g.categories)),
      episodes: episodes.filter((e) => has(e.title, e.synopsis)),
      chapters: chapters.filter((c) => has(c.title, c.synopsis, `chapter ${c.number}`)),
      characters: characters.filter((c) => has(c.name, c.role, c.bio)),
    };
  }, [q]);

  const total = r ? r.games.length + r.episodes.length + r.chapters.length + r.characters.length : 0;

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); window.history.replaceState(null, "", `?q=${encodeURIComponent(q)}`); }} className="max-w-xl">
        <label htmlFor="search-page" className="sr-only">Search</label>
        <input id="search-page" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search games, episodes, chapters, characters" className="h-12 w-full rounded-md border border-cyan/50 bg-night px-4 outline-none focus:border-cyan" />
      </form>
      {r && <p className="mt-4 text-sm text-white/60">{total} result{total === 1 ? "" : "s"} for “{q}”</p>}
      {r && r.games.length > 0 && (
        <section className="mt-8"><h2 className="mb-3 font-display text-xl">Games</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">{r.games.map((g) => <GameTile key={g.slug} game={g} aspect="aspect-square" />)}</div></section>
      )}
      {r && r.episodes.length > 0 && (
        <section className="mt-8"><h2 className="mb-3 font-display text-xl">Episodes</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{r.episodes.map((e) => <EpisodeCard key={e.slug} ep={e} />)}</div></section>
      )}
      {r && r.chapters.length > 0 && (
        <section className="mt-8"><h2 className="mb-3 font-display text-xl">Chapters</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">{r.chapters.map((c) => <ChapterCard key={c.slug} ch={c} />)}</div></section>
      )}
      {r && r.characters.length > 0 && (
        <section className="mt-8"><h2 className="mb-3 font-display text-xl">Squad</h2>
          <div className="flex flex-wrap gap-4">{r.characters.map((c) => (
            <Link key={c.slug} href={`/squad/${c.slug}/`} className="neon-card flex items-center gap-3 rounded-md bg-panel p-2 pr-5">
              <img src={asset(c.image)} alt="" className="h-14 w-14 rounded object-cover object-top" /><span className="font-semibold">{c.name}</span>
            </Link>))}</div></section>
      )}
    </div>
  );
}
