"use client";

import { useState } from "react";
import { asset } from "@/lib/site";
import { PlayIcon } from "./Cards";

/** Placeholder video player. Supports MP4/WebM (Cloudflare R2/Stream) or embed URLs when `videoUrl` is set. */
export function VideoPlayer({ title, poster, videoUrl }: { title: string; poster: string; videoUrl?: string }) {
  const [started, setStarted] = useState(false);
  const isFile = videoUrl && /\.(mp4|webm|m3u8)(\?|$)/i.test(videoUrl);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-line bg-black">
      {started && videoUrl ? (
        isFile ? (
          <video src={videoUrl} poster={asset(poster)} controls autoPlay playsInline className="h-full w-full" />
        ) : (
          <iframe src={videoUrl} title={title} className="h-full w-full border-0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
        )
      ) : (
        <>
          <img src={asset(poster)} alt={title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
          {videoUrl ? (
            <button type="button" onClick={() => setStarted(true)} className="absolute inset-0 grid place-items-center" aria-label={`Play ${title}`}>
              <span className="grid h-20 w-20 place-items-center rounded-full bg-magenta shadow-[0_0_40px_-4px_rgba(255,11,138,.9)]">
                <PlayIcon className="ml-1 h-9 w-9" />
              </span>
            </button>
          ) : (
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <span className="mx-auto grid h-20 w-20 place-items-center rounded-full border-2 border-white/40 bg-black/40">
                  <PlayIcon className="ml-1 h-9 w-9 text-white/70" />
                </span>
                <p className="mt-4 font-display text-2xl font-semibold uppercase tracking-wide">Episode coming soon</p>
              </div>
            </div>
          )}
          {/* faux control bar, matching the mockup */}
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 px-4 py-3 text-white/85">
            <PlayIcon className="h-4 w-4" />
            <div className="h-1 flex-1 rounded-full bg-white/25"><div className="h-full w-0 rounded-full bg-magenta" /></div>
            <span className="font-display text-sm">0:00</span>
          </div>
        </>
      )}
    </div>
  );
}
