import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Wordmark } from "@/components/Logo";
import { JoinForm } from "@/components/JoinForm";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({ title: "About Zuggi", description: "Zuggi is one anime-style universe across browser games, webcomics and an animated series, for everyone.", path: "/about/" });

const pillars = [
  { t: "Play", c: "text-magenta", d: "Heavy, good-looking browser games (HTML5, WebGL and Unity WebGL) that load instantly. No installs, no downloads.", href: "/play/" },
  { t: "Read", c: "text-white", d: "A vertical-scroll webcomic built for phones first, with new chapters that expand the story.", href: "/read/" },
  { t: "Watch", c: "text-cyan", d: "An animated series that follows the squad through Neon City, one episode at a time.", href: "/watch/" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 pb-8 sm:px-6 lg:px-8">
      <PageHeader eyebrow="Our mission" title="One universe" intro="Play it, read it, watch it." image="/img/ep1.webp" />
      <Wordmark size="text-6xl" />
      <div className="mt-8 space-y-4 text-lg text-white/85">
        <p>Zuggi is an entertainment universe built around one cast of characters, the Zuggi Squad. Instead of a games site, a comic site and a video channel that never talk to each other, every story lives in all three.</p>
        <p>It&apos;s made for everyone: gamers, readers, watchers, kids and grown-ups. Bold, bright and a little bit mischievous, just like its mascot.</p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {pillars.map((p) => (
          <Link key={p.t} href={p.href} className="neon-card block rounded-xl bg-panel p-6">
            <h2 className={`font-display text-3xl font-medium uppercase ${p.c}`}>{p.t}</h2>
            <p className="mt-2 text-white/75">{p.d}</p>
          </Link>
        ))}
      </div>
      <section className="mt-14 max-w-xl">
        <h2 className="font-display text-2xl font-medium uppercase">Join the squad</h2>
        <div className="mt-3"><JoinForm source="about" /></div>
      </section>
    </div>
  );
}
