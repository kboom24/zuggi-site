import Link from "next/link";
import { episodes } from "@/data/episodes";
import { chapters } from "@/data/chapters";
import { games } from "@/data/games";
import { characters } from "@/data/characters";
import { EpisodeCard, ChapterCard, GameTile, SectionTitle } from "@/components/Cards";
import { JoinForm } from "@/components/JoinForm";
import { JsonLd } from "@/components/JsonLd";
import { Wordmark } from "@/components/Logo";
import { asset, absoluteUrl, SITE } from "@/lib/site";
import { pageMeta } from "@/lib/meta";

export const metadata = {
  ...pageMeta({ title: `${SITE.name}: Play. Read. Watch.`, description: SITE.description, path: "/" }),
  title: { absolute: `${SITE.name}: Play. Read. Watch. | Anime browser games, comics & series` },
};

const wrap = "mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8";

export default function Home() {
  const first = episodes[0];
  const firstCh = chapters[0];
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", name: SITE.name, url: absoluteUrl("/"), logo: absoluteUrl("/icon-512.png"), slogan: SITE.tagline }} />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/[.06] bg-[radial-gradient(800px_300px_at_20%_50%,rgba(199,44,255,.18),transparent_70%),#0d0717]">
        <div className="absolute inset-y-0 left-0 right-0 md:left-[26%]">
          <img src={asset("/img/hero.webp")} alt="The Zuggi Squad in Neon City" fetchPriority="high" className="h-full w-full object-cover object-[72%_60%] md:object-[100%_62%]" />
          <div className="absolute inset-0 bg-gradient-to-r from-night via-night/60 to-transparent md:via-transparent md:via-30%" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-night to-transparent" />
        </div>
        <div className={`${wrap} relative flex min-h-[340px] items-center py-12 md:min-h-[320px] lg:min-h-[360px]`}>
          <div className="max-w-2xl">
            <h1 className="font-display lg:whitespace-nowrap text-[40px] font-medium uppercase leading-[1.05] tracking-[0.01em] drop-shadow-[0_2px_12px_rgba(0,0,0,.6)] sm:text-[52px] lg:text-[58px]">
              Zuggi Squad - Season 1
            </h1>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href={`/watch/${first.slug}/`} className="inline-flex h-12 items-center rounded-md bg-magenta px-6 font-display text-[17px] font-medium uppercase tracking-wide shadow-[0_0_24px_-6px_rgba(255,11,138,.9)] transition hover:bg-magenta-600">
                Watch Episode 1
              </Link>
              <Link href={`/read/${firstCh.slug}/`} className="inline-flex h-12 items-center rounded-md border-2 border-cyan/80 bg-night/40 px-6 font-display text-[17px] font-medium uppercase tracking-wide text-cyan transition hover:bg-cyan/10">
                Read Chapter 1
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WATCH */}
      <section className={`${wrap} pt-7`} aria-labelledby="watch-h">
        <SectionTitle href="/watch/"><span id="watch-h">Watch</span></SectionTitle>
        <div className="scroll-row -mx-4 flex gap-4 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {episodes.slice(0, 4).map((ep) => (
            <EpisodeCard key={ep.slug} ep={ep} showTitle={false} className="w-[78%] shrink-0 sm:w-auto" />
          ))}
        </div>
      </section>

      {/* READ + PLAY */}
      <div className={`${wrap} mt-6 grid gap-8 lg:grid-cols-2 lg:gap-0`}>
        <section aria-labelledby="read-h" className="lg:border-r lg:border-white/[.08] lg:pr-6">
          <SectionTitle href="/read/"><span id="read-h">Read</span></SectionTitle>
          <div className="scroll-row -mx-4 flex gap-3 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
            {chapters.slice(0, 3).map((ch) => (
              <ChapterCard key={ch.slug} ch={ch} className="w-[42%] shrink-0 sm:w-auto" />
            ))}
          </div>
        </section>
        <section aria-labelledby="play-h" className="lg:pl-6">
          <SectionTitle href="/play/"><span id="play-h">Play</span></SectionTitle>
          <div className="scroll-row -mx-4 flex gap-3 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0">
            {games.slice(0, 4).map((g) => (
              <GameTile key={g.slug} game={g} className="w-[38%] shrink-0 sm:w-auto" />
            ))}
          </div>
        </section>
      </div>

      {/* MEET THE SQUAD */}
      <section className={`${wrap} mt-20`} aria-labelledby="squad-h">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="font-display text-sm font-medium uppercase tracking-[0.3em] text-cyan">The cast</p>
            <h2 id="squad-h" className="font-display text-4xl font-medium uppercase">Meet the Squad</h2>
          </div>
          <Link href="/squad/" className="text-sm font-medium text-cyan hover:text-magenta">All profiles →</Link>
        </div>
        <div className="scroll-row -mx-4 flex gap-4 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5">
          {characters.map((c) => (
            <Link key={c.slug} href={`/squad/${c.slug}/`} className="group neon-card relative block w-[62%] shrink-0 overflow-hidden rounded-lg bg-panel sm:w-auto">
              <div className="aspect-[3/4] overflow-hidden">
                <img src={asset(c.image)} alt={`${c.name}, ${c.role}`} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night via-night/85 to-transparent p-4 pt-14">
                <p className={`font-display text-xs font-medium uppercase tracking-[0.25em] ${c.accent === "cyan" ? "text-cyan" : c.accent === "lavender" ? "text-lavender" : "text-magenta"}`}>{c.role}</p>
                <p className="font-display text-2xl font-medium uppercase">{c.name}</p>
                <p className="mt-1 line-clamp-2 text-[13px] text-white/75">{c.bio}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section className={`${wrap} mt-20`} aria-labelledby="mission-h">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-ink via-[#21103b] to-night p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-magenta/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-cyan/10 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <Wordmark size="text-5xl sm:text-6xl" />
              <h2 id="mission-h" className="mt-6 font-display text-3xl font-medium uppercase leading-tight sm:text-4xl">
                One universe. Play it, read it, watch it.
              </h2>
              <p className="mt-4 max-w-xl text-white/80">
                Zuggi is one cast of characters living across three worlds: heavy browser games you can play instantly, webcomics you scroll on any screen, and an animated series. Follow a story in the show, pick it up in the comic, then play it yourself.
              </p>
              <p className="mt-3 font-display text-sm uppercase tracking-[0.3em] text-cyan">Browser games. For everyone.</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Play", sub: "Zuggi Games", href: "/play/", img: "/img/g1.webp", color: "bg-magenta" },
                { label: "Read", sub: "Zuggi Comics", href: "/read/", img: "/img/ch1.webp", color: "bg-white text-night" },
                { label: "Watch", sub: "Zuggi TV", href: "/watch/", img: "/img/ep1.webp", color: "bg-cyan text-night" },
              ].map((p) => (
                <Link key={p.label} href={p.href} className="group neon-card relative block overflow-hidden rounded-lg">
                  <img src={asset(p.img)} alt="" loading="lazy" className={`aspect-[3/4] w-full object-cover transition group-hover:scale-105 ${p.label === "Read" ? "grayscale" : ""}`} />
                  <span className={`absolute left-0 top-0 rounded-br-md px-2 py-0.5 font-display text-xs font-medium uppercase tracking-wide ${p.color}`}>{p.sub}</span>
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3 pt-10 font-display text-xl font-medium uppercase">{p.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* JOIN */}
      <section id="join" className={`${wrap} mt-20 scroll-mt-24`} aria-labelledby="join-h">
        <div className="grid items-center gap-8 rounded-2xl border border-magenta/40 bg-[linear-gradient(120deg,rgba(255,11,138,.16),rgba(26,13,46,.6)_45%,rgba(0,240,255,.08))] p-8 sm:p-10 md:grid-cols-[auto_1fr]">
          <img src={asset("/img/fox-face.webp")} alt="Zuggi the mascot" loading="lazy" className="mx-auto h-32 w-32 rounded-full border-2 border-magenta object-cover shadow-[0_0_40px_-6px_rgba(255,11,138,.8)] md:h-40 md:w-40" />
          <div>
            <h2 id="join-h" className="font-display text-3xl font-medium uppercase sm:text-4xl">Join the Squad. It&apos;s free.</h2>
            <p className="mt-2 max-w-2xl text-white/80">Get first access to new games, comic chapters and episodes as they drop.</p>
            <div className="mt-5 max-w-xl"><JoinForm source="home" /></div>
          </div>
        </div>
      </section>
    </>
  );
}
