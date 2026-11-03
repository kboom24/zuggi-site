import { notFound } from "next/navigation";
import Link from "next/link";
import { games, getGame } from "@/data/games";
import { getCharacter } from "@/data/characters";
import { GameTile } from "@/components/Cards";
import { GameFrame } from "@/components/GameFrame";
import { JoinForm } from "@/components/JoinForm";
import { JsonLd } from "@/components/JsonLd";
import { pageMeta } from "@/lib/meta";
import { absoluteUrl, asset, resolveGameUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const g = getGame((await params).slug);
  if (!g) return {};
  return pageMeta({ title: `${g.title}: play free in your browser`, description: `${g.tagline} ${g.description}`, path: `/play/${g.slug}/`, image: g.thumbnail });
}

export default async function GamePage({ params }: Props) {
  const g = getGame((await params).slug);
  if (!g) notFound();
  const src = resolveGameUrl(g.gameUrl);
  const related = games.filter((x) => x.slug !== g.slug && x.categories.some((c) => g.categories.includes(c)));
  const fill = games.filter((x) => x.slug !== g.slug && !related.includes(x));
  const more = [...related, ...fill].slice(0, 6);
  return (
    <div className="mx-auto max-w-[1440px] px-4 pt-6 sm:px-6 lg:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "VideoGame",
          name: g.title,
          description: g.description,
          url: absoluteUrl(`/play/${g.slug}/`),
          image: absoluteUrl(g.thumbnail),
          genre: g.categories,
          gamePlatform: ["Web browser", g.engine],
          applicationCategory: "Game",
          operatingSystem: "Any (web browser)",
          playMode: g.categories.includes("Multiplayer") ? ["SinglePlayer", "MultiPlayer"] : "SinglePlayer",
          publisher: { "@type": "Organization", name: "Zuggi" },
        }}
      />
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/60"><Link href="/play/" className="hover:text-cyan">Play</Link> / {g.categories[0]}</nav>
      <div className="grid gap-8 xl:grid-cols-[1fr_340px]">
        <div>
          <GameFrame title={g.title} poster={g.thumbnail} src={src} orientation={g.orientation} />
          <div className="mt-6 flex flex-wrap items-start gap-5">
            <img src={asset(g.thumbnail)} alt="" className="h-20 w-20 rounded-lg border border-line object-cover" />
            <div className="min-w-0 flex-1">
              <h1 className="font-display text-4xl font-medium uppercase">{g.title}</h1>
              <p className="text-cyan">{g.tagline}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {g.categories.map((c) => <span key={c} className="rounded-full border border-white/15 px-3 py-0.5 text-xs text-white/80">{c}</span>)}
                <span className="rounded-full border border-lavender/50 px-3 py-0.5 text-xs text-lavender">{g.engine}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="font-display text-lg font-medium uppercase text-white/90">About the game</h2>
              <p className="mt-1 text-white/75">{g.description}</p>
            </div>
            <div>
              <h2 className="font-display text-lg font-medium uppercase text-white/90">Controls</h2>
              <p className="mt-1 text-white/75">{g.controls}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {g.characters.map((slug) => {
                  const c = getCharacter(slug);
                  return c ? (
                    <Link key={slug} href={`/squad/${slug}/`} className="flex items-center gap-2 rounded-full border border-white/15 py-1 pl-1 pr-3 text-sm hover:border-magenta">
                      <img src={asset(c.image)} alt="" className="h-7 w-7 rounded-full object-cover object-top" />{c.name}
                    </Link>
                  ) : null;
                })}
              </div>
            </div>
          </div>
          {!src && (
            <div id="join-game" className="mt-8 scroll-mt-24 rounded-xl border border-magenta/40 bg-magenta/[.06] p-6">
              <h2 className="font-display text-2xl font-medium uppercase">Get notified when {g.title} launches</h2>
              <div className="mt-3 max-w-xl"><JoinForm source={`game:${g.slug}`} /></div>
            </div>
          )}
        </div>
        <aside aria-labelledby="related-h">
          <h2 id="related-h" className="mb-3 font-display text-xl font-medium uppercase">More games</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-2">
            {more.map((x) => <GameTile key={x.slug} game={x} aspect="aspect-square" />)}
          </div>
        </aside>
      </div>
    </div>
  );
}
