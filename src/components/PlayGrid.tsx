"use client";

import { useState } from "react";
import { games, gameCategories } from "@/data/games";
import { GameTile } from "./Cards";

export function PlayGrid() {
  const [cat, setCat] = useState<(typeof gameCategories)[number]>("All");
  const list = cat === "All" ? games : games.filter((g) => g.categories.includes(cat));
  return (
    <div>
      <div role="tablist" aria-label="Game categories" className="scroll-row -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {gameCategories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={cat === c}
            onClick={() => setCat(c)}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
              cat === c ? "border-magenta bg-magenta text-white" : "border-white/15 text-white/80 hover:border-cyan hover:text-cyan"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {list.map((g) => (
          <GameTile key={g.slug} game={g} aspect="aspect-square" />
        ))}
      </div>
      {list.length === 0 && <p className="mt-6 text-white/60">No games in this category yet.</p>}
    </div>
  );
}
