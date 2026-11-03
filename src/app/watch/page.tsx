import { episodes } from "@/data/episodes";
import { EpisodeCard } from "@/components/Cards";
import { pageMeta } from "@/lib/meta";
import { PageHeader } from "@/components/PageHeader";

export const metadata = pageMeta({ title: "Watch Zuggi TV", description: "Watch Zuggi TV, the animated series starring the Zuggi Squad. Season 1 episodes.", path: "/watch/" });

export default function WatchPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-8 sm:px-6 lg:px-8">
      <PageHeader eyebrow="Zuggi TV" title="Watch" intro="The animated series. Season 1 follows the squad's first summer in Neon City." image="/img/ep8.webp" />
      <h2 className="mb-4 font-display text-2xl font-medium uppercase">Season 1</h2>
      <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
        {episodes.map((ep) => <EpisodeCard key={ep.slug} ep={ep} />)}
      </div>
    </div>
  );
}
