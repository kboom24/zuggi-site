import { notFound } from "next/navigation";
import Link from "next/link";
import { characters, getCharacter } from "@/data/characters";
import { games } from "@/data/games";
import { episodes } from "@/data/episodes";
import { EpisodeCard, GameTile } from "@/components/Cards";
import { JsonLd } from "@/components/JsonLd";
import { pageMeta } from "@/lib/meta";
import { absoluteUrl, asset } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return characters.map((c) => ({ slug: c.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const c = getCharacter((await params).slug);
  if (!c) return {};
  return pageMeta({ title: `${c.name}, ${c.role}`, description: c.bio, path: `/squad/${c.slug}/`, image: c.image });
}

export default async function CharacterPage({ params }: Props) {
  const c = getCharacter((await params).slug);
  if (!c) notFound();
  const theirGames = games.filter((g) => g.characters.includes(c.slug)).slice(0, 4);
  const theirEps = episodes.filter((e) => e.characters.includes(c.slug)).slice(0, 4);
  const accent = c.accent === "cyan" ? "text-cyan" : c.accent === "lavender" ? "text-lavender" : "text-magenta";
  return (
    <div className="mx-auto max-w-[1440px] px-4 pt-6 sm:px-6 lg:px-8">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Person", name: c.name, description: c.bio, image: absoluteUrl(c.image), url: absoluteUrl(`/squad/${c.slug}/`) }} />
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/60"><Link href="/squad/" className="hover:text-cyan">Squad</Link> / {c.name}</nav>
      <div className="grid items-start gap-10 md:grid-cols-[minmax(0,420px)_1fr]">
        <div className="overflow-hidden rounded-2xl border border-line shadow-[0_0_60px_-20px_rgba(255,11,138,.7)]">
          <img src={asset(c.image)} alt={`${c.name}, ${c.role}`} className="w-full" />
        </div>
        <div>
          <p className={`font-display text-sm font-medium uppercase tracking-[0.3em] ${accent}`}>{c.role}</p>
          <h1 className="font-display text-6xl font-medium uppercase">{c.name}</h1>
          <p className="mt-3 text-xl text-white/90">{c.bio}</p>
          <p className="mt-4 max-w-2xl text-white/70">{c.about}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {c.traits.map((t) => <li key={t} className="rounded-full border border-white/15 px-3 py-1 text-sm">{t}</li>)}
          </ul>
          <div className="mt-8 flex flex-wrap gap-2">
            {characters.filter((x) => x.slug !== c.slug).map((x) => (
              <Link key={x.slug} href={`/squad/${x.slug}/`} className="flex items-center gap-2 rounded-full border border-white/15 py-1 pl-1 pr-3 text-sm hover:border-magenta">
                <img src={asset(x.image)} alt="" className="h-7 w-7 rounded-full object-cover object-top" />{x.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {theirEps.length > 0 && (
        <section className="mt-14"><h2 className="mb-3 font-display text-2xl font-medium uppercase">Watch {c.name}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{theirEps.map((e) => <EpisodeCard key={e.slug} ep={e} />)}</div></section>
      )}
      {theirGames.length > 0 && (
        <section className="mt-10"><h2 className="mb-3 font-display text-2xl font-medium uppercase">Play as {c.name}</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">{theirGames.map((g) => <GameTile key={g.slug} game={g} aspect="aspect-square" />)}</div></section>
      )}
    </div>
  );
}
