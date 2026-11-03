import { merch } from "@/data/merch";
import { PageHeader } from "@/components/PageHeader";
import { JoinForm } from "@/components/JoinForm";
import { pageMeta } from "@/lib/meta";
import { asset } from "@/lib/site";

export const metadata = pageMeta({ title: "Zuggi Shop", description: "Official Zuggi Squad merch is coming soon: hoodies, plush, stickers and phone cases.", path: "/shop/" });

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-8 sm:px-6 lg:px-8">
      <PageHeader eyebrow="Zuggi Shop" title="Shop" intro="Official squad gear is on the way. Nothing is for sale yet; join free to hear first." image="/img/m-hoodie.webp" />
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {merch.map((m) => (
          <article key={m.slug} className="neon-card overflow-hidden rounded-xl bg-panel">
            <div className="relative aspect-square overflow-hidden">
              <img src={asset(m.image)} alt={m.name} loading="lazy" className="h-full w-full object-cover" />
              <span className="absolute left-0 top-0 rounded-br-md bg-cyan px-2.5 py-1 font-display text-[13px] font-medium uppercase tracking-wide text-night">Coming soon</span>
            </div>
            <div className="p-4">
              <h2 className="font-display text-xl font-medium uppercase">{m.name}</h2>
              <p className="mt-1 text-sm text-white/70">{m.blurb}</p>
              <button type="button" disabled className="mt-4 h-10 w-full cursor-not-allowed rounded-md border border-white/15 text-sm font-semibold text-white/50">Coming soon</button>
            </div>
          </article>
        ))}
      </div>
      <section id="join-shop" className="mt-14 max-w-xl">
        <h2 className="font-display text-2xl font-medium uppercase">Get first dibs on the drop</h2>
        <div className="mt-3"><JoinForm source="shop" /></div>
      </section>
    </div>
  );
}
