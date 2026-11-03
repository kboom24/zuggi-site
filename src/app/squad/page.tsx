import Link from "next/link";
import { characters } from "@/data/characters";
import { PageHeader } from "@/components/PageHeader";
import { pageMeta } from "@/lib/meta";
import { asset } from "@/lib/site";

export const metadata = pageMeta({ title: "Meet the Zuggi Squad", description: "Meet the Zuggi Squad: Zuggi, Kai, Rei, Byte and Jinx. The cast of every Zuggi game, comic and episode.", path: "/squad/" });

export default function SquadPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-8 sm:px-6 lg:px-8">
      <PageHeader eyebrow="The cast" title="Meet the Squad" intro="Five friends, one city. The same squad stars in every game, comic and episode." image="/img/hero.webp" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {characters.map((c) => (
          <Link key={c.slug} href={`/squad/${c.slug}/`} className="group neon-card block overflow-hidden rounded-xl bg-panel">
            <div className="aspect-[3/4] overflow-hidden"><img src={asset(c.image)} alt={`${c.name}, ${c.role}`} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-105" /></div>
            <div className="p-4">
              <p className={`font-display text-xs font-medium uppercase tracking-[0.25em] ${c.accent === "cyan" ? "text-cyan" : c.accent === "lavender" ? "text-lavender" : "text-magenta"}`}>{c.role}</p>
              <h2 className="font-display text-2xl font-medium uppercase">{c.name}</h2>
              <p className="mt-1 text-sm text-white/75">{c.bio}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
