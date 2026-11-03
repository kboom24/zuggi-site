"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/site";
import { PlayIcon } from "./Cards";

type Props = {
  title: string;
  poster: string;
  src: string | null; // resolved game URL, or null => coming soon
  orientation?: "landscape" | "portrait";
};

/**
 * Sandboxed game frame.
 * The iframe is NOT mounted until the player presses Play, so heavy WebGL/Unity builds never
 * slow down page load or browsing. Shows a mascot loading screen until the frame fires `load`.
 */
export function GameFrame({ title, poster, src, orientation = "landscape" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "loading" | "ready">("idle");
  const [isFs, setIsFs] = useState(false);

  useEffect(() => {
    const onFs = () => setIsFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  function toggleFullscreen() {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen?.();
    else el.requestFullscreen?.().catch(() => {});
  }

  const aspect = orientation === "portrait" ? "aspect-[9/16] max-h-[78vh] mx-auto" : "aspect-video";

  return (
    <div>
      <div
        ref={wrapRef}
        className={`relative w-full overflow-hidden rounded-lg border border-line bg-black ${isFs ? "" : aspect}`}
        style={isFs ? { width: "100vw", height: "100vh" } : undefined}
      >
        {/* Poster */}
        {state !== "ready" && (
          <img src={asset(poster)} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-sm" />
        )}

        {!src && (
          <div className="absolute inset-0 grid place-items-center bg-night/60 p-6 text-center">
            <div>
              <img src={asset("/img/fox-face.webp")} alt="" className="mx-auto h-24 w-24 rounded-full border-2 border-magenta object-cover" />
              <p className="mt-4 font-display text-3xl font-semibold uppercase tracking-wide">Coming soon</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-white/75">{title} is still in the workshop. Join free and we&apos;ll tell you the moment it&apos;s playable.</p>
              <a href="#join-game" className="mt-5 inline-flex h-11 items-center rounded-md bg-magenta px-6 font-display font-semibold uppercase tracking-wide">Notify me</a>
            </div>
          </div>
        )}

        {src && state === "idle" && (
          <button
            type="button"
            onClick={() => setState("loading")}
            className="group absolute inset-0 grid place-items-center bg-night/40"
            aria-label={`Play ${title}`}
          >
            <span className="flex flex-col items-center">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-magenta shadow-[0_0_40px_-4px_rgba(255,11,138,.9)] transition group-hover:scale-110">
                <PlayIcon className="ml-1 h-9 w-9" />
              </span>
              <span className="mt-4 font-display text-2xl font-semibold uppercase tracking-wide">Play {title}</span>
              <span className="mt-1 text-xs text-white/60">Loads in your browser. No download.</span>
            </span>
          </button>
        )}

        {src && state !== "idle" && (
          <iframe
            src={src}
            title={`${title} (game)`}
            className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-300 ${state === "ready" ? "opacity-100" : "opacity-0"}`}
            sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-popups-to-escape-sandbox"
            allow="fullscreen; gamepad; autoplay; accelerometer; gyroscope"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => setState("ready")}
          />
        )}

        {src && state === "loading" && (
          <div className="absolute inset-0 grid place-items-center bg-night/85" role="status" aria-live="polite">
            <div className="text-center">
              <img src={asset("/img/fox-face.webp")} alt="" className="animate-bob mx-auto h-24 w-24 rounded-full border-2 border-cyan object-cover" />
              <p className="mt-4 font-display text-xl font-semibold uppercase tracking-widest">Loading {title}…</p>
              <div className="mx-auto mt-3 h-1.5 w-56 overflow-hidden rounded-full bg-white/10">
                <div className="animate-bar h-full w-1/3 rounded-full bg-gradient-to-r from-magenta to-cyan" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-white/50">{src ? "Runs in a sandboxed frame. Heavy games may take a moment on first load." : "Build not uploaded yet."}</p>
        <button
          type="button"
          onClick={toggleFullscreen}
          disabled={!src || state === "idle"}
          className="inline-flex h-9 items-center gap-2 rounded-md border border-cyan/60 px-4 text-sm font-semibold text-cyan transition hover:bg-cyan/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
          </svg>
          {isFs ? "Exit fullscreen" : "Fullscreen"}
        </button>
      </div>
    </div>
  );
}
