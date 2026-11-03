import { notFound } from "next/navigation";
import Link from "next/link";
import { chapters, getChapter } from "@/data/chapters";
import { JsonLd } from "@/components/JsonLd";
import { pageMeta } from "@/lib/meta";
import { absoluteUrl, asset } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return chapters.map((c) => ({ slug: c.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const ch = getChapter((await params).slug);
  if (!ch) return {};
  return pageMeta({ title: `Chapter ${ch.number}: ${ch.title}`, description: ch.synopsis, path: `/read/${ch.slug}/`, image: ch.cover });
}

// Placeholder panel crops: reuse the cover art at different framings so the reader feels like a real strip.
const FRAMES = ["50% 10%", "20% 60%", "80% 40%", "50% 90%", "30% 30%", "70% 75%", "50% 50%", "10% 20%"];
const SFX = ["!!", "WHOOSH", "…", "ZZT", "?!", "KRAK", "!", "TO BE CONTINUED"];

export default async function ChapterPage({ params }: Props) {
  const ch = getChapter((await params).slug);
  if (!ch) notFound();
  const idx = chapters.indexOf(ch);
  const prev = chapters[idx - 1];
  const next = chapters[idx + 1];
  return (
    <div className="mx-auto max-w-[800px] px-4 pt-6 sm:px-6">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ComicIssue", name: ch.title, issueNumber: ch.number, isPartOf: { "@type": "ComicSeries", name: "Zuggi Comics" }, description: ch.synopsis, image: absoluteUrl(ch.cover), url: absoluteUrl(`/read/${ch.slug}/`) }} />
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/60"><Link href="/read/" className="hover:text-cyan">Read</Link> / Volume 1</nav>
      <header className="text-center">
        <p className="font-display text-sm font-medium uppercase tracking-[0.3em] text-cyan">Chapter {ch.number}</p>
        <h1 className="font-display text-4xl font-medium uppercase sm:text-5xl">{ch.title}</h1>
        <p className="mx-auto mt-2 max-w-lg text-white/75">{ch.synopsis}</p>
      </header>

      {ch.cast && (
        <details open className="mx-auto mt-8 max-w-[640px] rounded-lg border border-white/10 bg-[#1A0D2E] p-4">
          <summary className="cursor-pointer font-display text-xs font-medium uppercase tracking-[0.25em] text-cyan">Meet the players</summary>
          <ul className="mt-4 grid grid-cols-5 gap-2 sm:gap-3">
            {ch.cast.map((c) => (
              <li key={c.name} className="text-center">
                <img src={asset(c.img)} alt={c.name} loading="eager" className="mx-auto aspect-square w-full rounded-full border-2 border-magenta object-cover object-top" />
                <p className="mt-1 text-xs font-semibold sm:text-sm">{c.name}</p>
                <p className="hidden text-[11px] leading-snug text-white/65 sm:block">{c.line}</p>
              </li>
            ))}
          </ul>
        </details>
      )}

      {ch.segments ? (
        <div className="mt-10" aria-label="Comic pages">
          {(() => {
            let n = 0;
            const total = ch.segments!.filter((s) => s.type === "page").length;
            return ch.segments!.map((s, i) => {
              if (s.type === "page") {
                n++;
                return <img key={i} src={asset(s.src)} alt={`${ch.title}, page ${n} of ${total}`} width={720} height={1280} loading={n < 2 ? "eager" : "lazy"} decoding="async" className="mx-auto my-10 block h-auto w-full max-w-[800px] rounded-sm" />;
              }
              if (s.label) return <p key={i} className="mx-auto my-12 max-w-[640px] text-center font-display text-sm font-semibold uppercase tracking-[0.3em] text-cyan">{s.text}</p>;
              return (
                <div key={i} className={`mx-auto my-8 max-w-[640px] rounded-md border-l-4 ${s.end ? "border-cyan text-center" : "border-magenta"} bg-[#1A0D2E] px-6 py-5 text-[18px] leading-relaxed text-white sm:text-[19px]`}>
                  {s.speaker && <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-cyan">{s.speaker}</p>}
                  <p className={s.speaker ? "" : "italic"}>{s.text}</p>
                </div>
              );
            });
          })()}
        </div>
      ) : (<>
      {ch.pages.length === 0 && (
        <div className="mt-8 overflow-hidden rounded-lg border border-line bg-white">
          <img src={asset(ch.cover)} alt={`Chapter ${ch.number} cover`} className="w-full grayscale" />
        </div>
      )}

      {/* Vertical reader */}
      <div className={`${ch.pages.length > 0 ? "mt-8" : "mt-2"} space-y-2`} aria-label="Comic pages">
        {ch.pages.length > 0
          ? ch.pages.map((p, i) => (
              <img key={p} src={asset(p)} alt={`${ch.title}, page ${i + 1} of ${ch.pages.length}`} width={720} height={1280} loading={i < 2 ? "eager" : "lazy"} decoding="async" className="mx-auto block h-auto w-full max-w-[800px] rounded-sm" />
            ))
          : Array.from({ length: ch.panelCount }).map((_, i) => (
              <figure key={i} className={`relative overflow-hidden border-[3px] border-black bg-white ${i % 3 === 1 ? "aspect-[4/3]" : "aspect-[16/10]"}`}>
                <img src={asset(ch.cover)} alt="" loading="lazy" className="h-full w-full scale-[1.6] object-cover grayscale contrast-125" style={{ objectPosition: FRAMES[i % FRAMES.length] }} />
                <div className="halftone pointer-events-none absolute inset-0 mix-blend-multiply" />
                <span className={`absolute ${i % 2 ? "right-3 top-3" : "left-3 top-3"} rounded-[50%] border-2 border-black bg-white px-4 py-2 font-brand text-lg italic text-black shadow`}>
                  {SFX[i % SFX.length]}
                </span>
                <figcaption className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-0.5 text-[11px] text-white/80">Panel {i + 1} · placeholder</figcaption>
              </figure>
            ))}
      </div>
      </>)}

      <div className="mt-8 flex items-center justify-between gap-4">
        {prev ? <Link href={`/read/${prev.slug}/`} className="rounded-md border border-white/15 px-4 py-2 text-sm hover:border-cyan">← Ch {prev.number}</Link> : <span />}
        <Link href="/read/" className="text-sm text-white/70 hover:text-white">All chapters</Link>
        {next ? <Link href={`/read/${next.slug}/`} className="rounded-md bg-magenta px-4 py-2 text-sm font-semibold">Ch {next.number} →</Link> : <span />}
      </div>
    </div>
  );
}
