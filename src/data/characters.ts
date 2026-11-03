/**
 * PLACEHOLDER: the Zuggi Squad.
 * Names, roles and bios are placeholders for Hexan to replace. Images live in /public/img.
 */
export type Character = {
  slug: string;
  name: string;
  role: string;
  bio: string; // one-liner
  about: string; // longer placeholder profile
  traits: string[];
  image: string;
  accent: "magenta" | "cyan" | "lavender";
};

export const characters: Character[] = [
  {
    slug: "zuggi",
    name: "Zuggi",
    role: "The Mascot",
    bio: "A fox-like critter who has never met a high score it didn't want to beat.",
    about:
      "Zuggi is the heart of the squad: loud, loyal and always first through the door. Headphones on, hood up, ready to play. (Placeholder profile, replace with the real backstory.)",
    traits: ["Confident", "Mischievous", "Ready to play"],
    image: "/img/char-fox.webp",
    accent: "magenta",
  },
  {
    slug: "kai",
    name: "Kai Vega",
    role: "The Skater",
    bio: "Cyan hair, zero brakes. Kai treats the whole city like one giant skatepark.",
    about:
      "Kai is the squad's speedster and the one most likely to say 'trust me' right before something goes sideways. (Placeholder profile, replace with the real backstory.)",
    traits: ["Fearless", "Fast", "Chill under pressure"],
    image: "/img/char-skater.webp",
    accent: "cyan",
  },
  {
    slug: "rei",
    name: "Rei Kurogane",
    role: "The Blade",
    bio: "Quiet, sharp and never without her katana. Rei is the plan when the plan falls apart.",
    about:
      "Rei keeps the squad focused. She trains every night on the rooftops and speaks only when it counts. (Placeholder profile, replace with the real backstory.)",
    traits: ["Focused", "Protective", "Precise"],
    image: "/img/char-katana.webp",
    accent: "lavender",
  },
  {
    slug: "byte",
    name: "Byte",
    role: "The Bot",
    bio: "A pocket-sized robot with a giant brain and an even bigger heart.",
    about:
      "Byte scans, hacks and calculates, then gets distracted by anything shiny. Communicates mostly in beeps and emoji. (Placeholder profile, replace with the real backstory.)",
    traits: ["Curious", "Clever", "Easily distracted"],
    image: "/img/char-robot.webp",
    accent: "cyan",
  },
  {
    slug: "jinx",
    name: "Jinx",
    role: "The Trickster",
    bio: "A black cat with magenta eyes and a talent for showing up exactly where trouble starts.",
    about:
      "Nobody is sure whose side Jinx is on, including Jinx. Lands on its feet every single time. (Placeholder profile, replace with the real backstory.)",
    traits: ["Sly", "Unpredictable", "Lucky"],
    image: "/img/char-cat.webp",
    accent: "magenta",
  },
];

export const getCharacter = (slug: string) => characters.find((c) => c.slug === slug);
