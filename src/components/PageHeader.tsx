import { asset } from "@/lib/site";

export function PageHeader({ eyebrow, title, intro, image }: { eyebrow: string; title: string; intro: string; image?: string }) {
  return (
    <section className="relative -mx-4 mb-10 overflow-hidden border-b border-white/[.06] px-4 py-12 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 lg:py-16">
      {image && (
        <>
          <img src={asset(image)} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-night via-night/85 to-night/30" />
        </>
      )}
      <div className="relative max-w-2xl">
        <p className="font-display text-sm font-medium uppercase tracking-[0.3em] text-cyan">{eyebrow}</p>
        <h1 className="mt-1 font-display text-5xl font-medium uppercase sm:text-6xl">{title}</h1>
        <p className="mt-3 text-lg text-white/80">{intro}</p>
      </div>
    </section>
  );
}
