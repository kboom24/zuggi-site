/**
 * PLACEHOLDER: Zuggi Comics, Volume 1.
 * Swap `pages` with real webcomic panel images (tall vertical strips work best). Until then the reader
 * renders styled placeholder panels.
 */
export type Chapter = {
  slug: string;
  number: number;
  title: string;
  synopsis: string;
  cover: string;
  pages: string[]; // image paths, top to bottom
  panelCount: number; // placeholder panels shown when `pages` is empty
};

export const chapters: Chapter[] = [
  {
    slug: "chapter-1-press-start",
    number: 1,
    title: "Press Start",
    synopsis: "Zuggi rage-quits the Grid Cup final, then watches a billboard get deleted pixel by pixel. A cat steals his headphones, a glitch-beast attacks, Kai skates in, Rei cuts it in half, and Byte finds Player 1. Then the alley falls into the Grid.",
    cover: "/comics/ch1/cover.webp",
    pages: Array.from({ length: 12 }, (_, i) => `/comics/ch1/p${String(i + 1).padStart(2, "0")}.webp`),
    panelCount: 0,
  },
  { slug: "chapter-2-the-katana-code", number: 2, title: "The Katana Code", synopsis: "Rei's training is interrupted by someone who knows her name.", cover: "/img/ch2.webp", pages: [], panelCount: 8 },
  { slug: "chapter-3-rooftop-runners", number: 3, title: "Rooftop Runners", synopsis: "Kai and Zuggi take the fastest route across the city, straight over it.", cover: "/img/ch3.webp", pages: [], panelCount: 8 },
  { slug: "chapter-4-bytes-secret", number: 4, title: "Byte's Secret", synopsis: "Byte has been carrying something it was never supposed to find.", cover: "/img/ch4.webp", pages: [], panelCount: 8 },
  { slug: "chapter-5-nine-lives", number: 5, title: "Nine Lives", synopsis: "Jinx has had a few close calls. Eight, to be exact.", cover: "/img/ch5.webp", pages: [], panelCount: 8 },
  { slug: "chapter-6-neon-storm", number: 6, title: "Neon Storm", synopsis: "The storm hits Neon City and the whole squad has to hold the line.", cover: "/img/ch6.webp", pages: [], panelCount: 8 },
];

export const getChapter = (slug: string) => chapters.find((c) => c.slug === slug);
