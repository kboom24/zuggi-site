import Link from "next/link";
import { asset } from "@/lib/site";
import type { Episode } from "@/data/episodes";
import type { Chapter } from "@/data/chapters";
import type { Game } from "@/data/games";

export function PlayIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" />
    </svg>
  );
}

export function EpisodeCard({ ep, showTitle = true, className = "" }: { ep: Episode; showTitle?: boolean; className?: string }) {
  return (
    <Link href={`/watch/${ep.slug}/`} className={`group block ${className}`}>
      <div className="neon-card relative aspect-video overflow-hidden rounded-md bg-panel">
        <img src={asset(ep.thumbnail)} alt={`Episode ${ep.number}: ${ep.title}`} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/75 to-transparent" />
        <PlayIcon className="absolute bottom-2.5 left-3 h-5 w-5 text-white drop-shadow" />
        <span className="absolute bottom-2 right-3 font-display text-[15px] font-semibold text-white drop-shadow">{ep.duration}</span>
      </div>
      {showTitle && (
        <p className="mt-2 truncate text-[13px] text-white/70 group-hover:text-white">
          <span className="text-cyan">E{ep.number}</span> · {ep.title}
        </p>
      )}
    </Link>
  );
}

export function ChapterCard({ ch, className = "" }: { ch: Chapter; className?: string }) {
  return (
    <Link href={`/read/${ch.slug}/`} className={`group block ${className}`}>
      <div className="neon-card relative aspect-[9/10] overflow-hidden rounded-md bg-white">
        <img src={asset(ch.cover)} alt={`Chapter ${ch.number}: ${ch.title} cover`} loading="lazy" decoding="async" className="h-full w-full object-cover grayscale transition duration-300 group-hover:scale-[1.03]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/85 to-transparent" />
        <span className="absolute inset-x-0 bottom-2 text-center font-display text-[13px] font-semibold uppercase tracking-wide text-white">Chapter {ch.number}</span>
      </div>
    </Link>
  );
}

export function GameTile({ game, className = "", aspect = "aspect-[4/5]", showTitle = true }: { game: Game; className?: string; aspect?: string; showTitle?: boolean }) {
  return (
    <Link href={`/play/${game.slug}/`} className={`group block ${className}`}>
      <div className={`neon-card relative ${aspect} overflow-hidden rounded-md bg-panel`}>
        <img src={asset(game.thumbnail)} alt={`${game.title} game art`} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]" />
        <span className="absolute left-0 top-0 rounded-br-md bg-magenta px-2.5 py-1 font-display text-[13px] font-semibold uppercase tracking-wide text-white">Play</span>
        {showTitle && (
          <>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/85 to-transparent" />
            <span className="absolute inset-x-0 bottom-2 px-2 text-center font-display text-[14px] font-semibold uppercase tracking-wide text-white">{game.title}</span>
          </>
        )}
      </div>
    </Link>
  );
}

export function SectionTitle({ children, href, as: Tag = "h2" }: { children: React.ReactNode; href?: string; as?: "h1" | "h2" }) {
  return (
    <div className="mb-3 flex items-end justify-between">
      <Tag className="font-display text-[22px] font-medium leading-none text-white sm:text-[24px]">{children}</Tag>
      {href && (
        <Link href={href} className="text-sm font-medium text-cyan hover:text-magenta">
          See all →
        </Link>
      )}
    </div>
  );
}
