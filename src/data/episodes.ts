/**
 * PLACEHOLDER: Zuggi TV, Season 1.
 * Titles, synopses and durations are placeholders. Set `videoUrl` (e.g. Cloudflare Stream / R2 MP4 / YouTube embed)
 * when an episode is ready; until then the player shows a "Coming soon" state.
 */
export type Episode = {
  slug: string;
  season: number;
  number: number;
  title: string;
  synopsis: string;
  duration: string; // "mm:ss"
  thumbnail: string;
  characters: string[]; // character slugs
  videoUrl?: string;
};

export const episodes: Episode[] = [
  { slug: "s1e1-welcome-to-neon-city", season: 1, number: 1, title: "Welcome to Neon City", synopsis: "The squad meets on a rooftop for the first time, and the city's biggest screen starts broadcasting something it shouldn't.", duration: "23:45", thumbnail: "/img/ep1.webp", characters: ["zuggi", "rei", "byte", "jinx"] },
  { slug: "s1e2-the-skate-heist", season: 1, number: 2, title: "The Skate Heist", synopsis: "Kai bets the squad he can cross the whole city without touching the ground. Rei and Byte are not convinced.", duration: "23:45", thumbnail: "/img/ep2.webp", characters: ["kai", "rei", "byte"] },
  { slug: "s1e3-blade-and-byte", season: 1, number: 3, title: "Blade & Byte", synopsis: "An abandoned warehouse, a strange signal, and a robot who really should have stayed outside.", duration: "23:45", thumbnail: "/img/ep3.webp", characters: ["rei", "byte"] },
  { slug: "s1e4-jinxs-big-mischief", season: 1, number: 4, title: "Jinx's Big Mischief", synopsis: "The night market will never be the same after Jinx discovers the snack stalls.", duration: "23:45", thumbnail: "/img/ep4.webp", characters: ["jinx", "zuggi"] },
  { slug: "s1e5-rooftop-race", season: 1, number: 5, title: "Rooftop Race", synopsis: "Zuggi challenges the fastest runner in the city to a race across the rooftops in broad daylight.", duration: "23:45", thumbnail: "/img/ep5.webp", characters: ["zuggi"] },
  { slug: "s1e6-glitch-in-the-arcade", season: 1, number: 6, title: "Glitch in the Arcade", synopsis: "Every cabinet in the arcade starts showing the same impossible level.", duration: "23:45", thumbnail: "/img/ep6.webp", characters: ["kai", "zuggi"] },
  { slug: "s1e7-signal-lost", season: 1, number: 7, title: "Signal Lost", synopsis: "Byte goes offline in the rain, and the squad has one night to bring it back.", duration: "23:45", thumbnail: "/img/ep7.webp", characters: ["byte"] },
  { slug: "s1e8-squad-up", season: 1, number: 8, title: "Squad Up", synopsis: "Season finale. Everything the squad learned comes down to one run through Neon City.", duration: "23:45", thumbnail: "/img/ep8.webp", characters: ["zuggi", "kai", "rei", "byte", "jinx"] },
];

export const getEpisode = (slug: string) => episodes.find((e) => e.slug === slug);
