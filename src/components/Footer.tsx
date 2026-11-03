import Link from "next/link";
import { Wordmark } from "./Logo";
import { SITE } from "@/lib/site";

const cols = [
  { title: "Universe", links: [["Play", "/play/"], ["Read", "/read/"], ["Watch", "/watch/"], ["Shop", "/shop/"]] },
  { title: "Zuggi", links: [["Meet the Squad", "/squad/"], ["About", "/about/"], ["Join Free", "/#join"], ["Search", "/search/"]] },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/[.07] bg-[#0a0512]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Wordmark size="text-4xl" />
          <p className="mt-4 font-display text-sm font-semibold uppercase tracking-[0.3em] text-white/90">
            Play<span className="text-magenta">.</span> Read<span className="text-magenta">.</span> Watch<span className="text-magenta">.</span>
          </p>
          <p className="mt-3 max-w-sm text-sm text-muted">{SITE.gamesTagline} Comics and an animated series too, all starring the Zuggi Squad.</p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-cyan">{c.title}</h2>
            <ul className="mt-4 space-y-2">
              {c.links.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/80 hover:text-magenta">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/[.06]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-4 py-5 text-xs text-white/50 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Zuggi. All rights reserved.</p>
          <p>Characters, episodes, chapters and games shown are early placeholders.</p>
        </div>
      </div>
    </footer>
  );
}
