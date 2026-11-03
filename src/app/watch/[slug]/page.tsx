import { notFound } from "next/navigation";
import Link from "next/link";
import { episodes, getEpisode } from "@/data/episodes";
import { getCharacter } from "@/data/characters";
import { EpisodeCard } from "@/components/Cards";
import { VideoPlayer } from "@/components/VideoPlayer";
import { JsonLd } from "@/components/JsonLd";
import { pageMeta } from "@/lib/meta";
import { absoluteUrl, asset } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return episodes.map((e) => ({ slug: e.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const ep = getEpisode((await params).slug);
  if (!ep) return {};
  return pageMeta({ title: `S${ep.season} E${ep.number}: ${ep.title}`, description: ep.synopsis, path: `/watch/${ep.slug}/`, image: ep.thumbnail });
}

export default async function EpisodePage({ params }: Props) {
  const ep = getEpisode((await params).slug);
  if (!ep) notFound();
  const idx = episodes.indexOf(ep);
  const upNext = [...episodes.slice(idx + 1), ...episodes.slice(0, idx)].slice(0, 4);
  const [m, s] = ep.duration.split(":").map(Number);
  return (
    <div className="mx-auto max-w-[1440px] px-4 pt-6 sm:px-6 lg:px-8">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "TVEpisode", name: ep.title, episodeNumber: ep.number, partOfSeason: { "@type": "TVSeason", seasonNumber: ep.season }, partOfSeries: { "@type": "TVSeries", name: "Zuggi TV" }, description: ep.synopsis, image: absoluteUrl(ep.thumbnail), timeRequired: `PT${m}M${s}S`, url: absoluteUrl(`/watch/${ep.slug}/`) }} />
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/60"><Link href="/watch/" className="hover:text-cyan">Watch</Link> / Season {ep.season}</nav>
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <VideoPlayer title={ep.title} poster={ep.thumbnail} videoUrl={ep.videoUrl} />
          <p className="mt-5 font-display text-sm font-medium uppercase tracking-[0.25em] text-cyan">Season {ep.season} · Episode {ep.number} · {ep.duration}</p>
          <h1 className="mt-1 font-display text-4xl font-medium uppercase">{ep.title}</h1>
          <p className="mt-3 max-w-3xl text-white/80">{ep.synopsis}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {ep.characters.map((slug) => {
              const c = getCharacter(slug);
              return c ? (
                <Link key={slug} href={`/squad/${slug}/`} className="flex items-center gap-2 rounded-full border border-white/15 py-1 pl-1 pr-3 text-sm hover:border-magenta">
                  <img src={asset(c.image)} alt="" className="h-7 w-7 rounded-full object-cover object-top" />{c.name}
                </Link>
              ) : null;
            })}
          </div>
        </div>
        <aside aria-labelledby="upnext-h">
          <h2 id="upnext-h" className="mb-3 font-display text-xl font-medium uppercase">Up next</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {upNext.map((e) => <EpisodeCard key={e.slug} ep={e} />)}
          </div>
        </aside>
      </div>
    </div>
  );
}
