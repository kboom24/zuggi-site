/**
 * PLACEHOLDER: Zuggi Games.
 * Each game is loaded in a sandboxed iframe from `gameUrl`.
 *  - Relative paths (e.g. "neon-drift/index.html") are joined to NEXT_PUBLIC_GAMES_CDN (Cloudflare R2 / CDN).
 *  - Absolute URLs are used as-is.
 *  - Paths starting with "/" are served from this site's /public folder (Neon Drift points at a tiny local DEMO build).
 *  - No gameUrl (or no CDN configured) => "Coming soon" placeholder.
 */
export const gameCategories = ["All", "Action", "Racing", "Adventure", "Puzzle", "Sports", "Arcade", "Multiplayer"] as const;
export type GameCategory = Exclude<(typeof gameCategories)[number], "All">;

export type Game = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  categories: GameCategory[];
  thumbnail: string;
  engine: "HTML5" | "WebGL" | "Unity WebGL";
  controls: string;
  characters: string[];
  gameUrl?: string;
  orientation?: "landscape" | "portrait";
};

export const games: Game[] = [
  { slug: "neon-drift", title: "Neon Drift", tagline: "Drift Neon City at full throttle.", description: "Take Zuggi's car through neon highways, chain drifts and chase the perfect line.", categories: ["Racing", "Arcade"], thumbnail: "/img/g1.webp", engine: "HTML5", controls: "Arrows / A-D to steer (demo build)", characters: ["zuggi"], gameUrl: "/games/demo/index.html" },
  { slug: "blade-rush", title: "Blade Rush", tagline: "One blade. Endless drones.", description: "Slice through waves of rogue drones as Rei in a fast-paced action brawler.", categories: ["Action"], thumbnail: "/img/g2.webp", engine: "WebGL", controls: "Mouse to aim, click to slash, Shift to dash", characters: ["rei"] },
  { slug: "byte-builder", title: "Byte Builder", tagline: "Stack, build, float.", description: "Help Byte build floating islands block by block in a relaxing building puzzler.", categories: ["Puzzle"], thumbnail: "/img/g3.webp", engine: "WebGL", controls: "Mouse to place blocks", characters: ["byte"] },
  { slug: "jinx-run", title: "Jinx Run", tagline: "Nine lives. One run.", description: "Sprint across the rooftops at sunset as Jinx and grab every coin you can.", categories: ["Arcade"], thumbnail: "/img/g4.webp", engine: "HTML5", controls: "Arrows / swipe to dodge and jump", characters: ["jinx"], orientation: "portrait" },
  { slug: "skate-city", title: "Skate City", tagline: "The whole city is a skatepark.", description: "Grind rails and land tricks with Kai in an open skatepark.", categories: ["Sports"], thumbnail: "/img/g5.webp", engine: "Unity WebGL", controls: "WASD to ride, Space to ollie, J/K for tricks", characters: ["kai"] },
  { slug: "rooftop-rumble", title: "Rooftop Rumble", tagline: "Squad vs squad on the rooftops.", description: "A party brawler where the squad faces off on neon rooftops.", categories: ["Action", "Multiplayer"], thumbnail: "/img/g6.webp", engine: "Unity WebGL", controls: "WASD to move, J to attack, K to special", characters: ["zuggi", "rei"] },
  { slug: "glitch-quest", title: "Glitch Quest", tagline: "Lantern up. Go deeper.", description: "Explore glowing crystal caves with Zuggi in an adventure full of secrets.", categories: ["Adventure"], thumbnail: "/img/g7.webp", engine: "WebGL", controls: "WASD to move, E to interact", characters: ["zuggi"] },
  { slug: "mecha-squad", title: "Mecha Squad", tagline: "Tiny pilot. Giant mech.", description: "Byte takes the controls of a giant mech to defend Neon City.", categories: ["Action"], thumbnail: "/img/g8.webp", engine: "Unity WebGL", controls: "WASD to move, mouse to aim and fire", characters: ["byte"] },
  { slug: "neon-goal", title: "Neon Goal", tagline: "Score under the lights.", description: "Arcade soccer in a neon stadium with super-charged shots.", categories: ["Sports", "Multiplayer"], thumbnail: "/img/g9.webp", engine: "WebGL", controls: "WASD to run, Space to shoot", characters: ["kai"] },
  { slug: "block-blitz", title: "Block Blitz", tagline: "Match fast. Think faster.", description: "Jinx's glowing gem-block puzzler. Clear lines, set combos.", categories: ["Puzzle"], thumbnail: "/img/g10.webp", engine: "HTML5", controls: "Arrows to move, Up to rotate", characters: ["jinx"], orientation: "portrait" },
  { slug: "night-market-dash", title: "Night Market Dash", tagline: "Dodge, dash, dumplings.", description: "Run Zuggi through the busiest night market in the city without dropping a single dumpling.", categories: ["Arcade"], thumbnail: "/img/g11.webp", engine: "HTML5", controls: "Arrows / tap to dash", characters: ["zuggi"] },
  { slug: "cyber-dungeon", title: "Cyber Dungeon", tagline: "Runes, fog and loot.", description: "Rei and Byte crawl a cyberpunk dungeon full of traps and treasure.", categories: ["Adventure", "Action"], thumbnail: "/img/g12.webp", engine: "Unity WebGL", controls: "WASD to move, mouse to attack", characters: ["rei", "byte"] },
];

export const getGame = (slug: string) => games.find((g) => g.slug === slug);
