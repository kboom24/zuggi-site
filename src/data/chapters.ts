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
  segments?: Segment[]; // optional: interleaved narration captions + pages
  cast?: { name: string; img: string; line: string }[];
};

export type Segment =
  | { type: "caption"; text: string; speaker?: string; label?: boolean; end?: boolean; href?: string; cta?: string }
  | { type: "page"; src: string };

const PG = (ch: number, n: number): Segment => ({ type: "page", src: `/comics/ch${ch}/p${String(n).padStart(2, "0")}.webp` });
const P = (n: number) => PG(1, n);
const P2 = (n: number) => PG(2, n);
const P3 = (n: number) => PG(3, n);
const C = (text: string): Segment => ({ type: "caption", text });
const L = (text: string): Segment => ({ type: "caption", text, label: true });

const ch1Segments: Segment[] = [
  L("Nexa City — Tonight"),
  C("Every screen in Nexa City runs on the same game network: the Grid. People play it to work, to shop, to compete — and to forget."),
  C("Tonight is the Grid Cup Final. The whole city is watching one player."),
  P(1),
  C("His name is Zuggi. Best player in the city... on paper."),
  C("His opponent is no one on the leaderboard. A crowned figure made of static. And Zuggi's health is down to 1%."),
  P(2),
  C("Zuggi has a secret: he has never finished a single game. When the final boss shows up, he bails."),
  C("So he does what he always does."),
  P(3),
  L("Outside Pixel Palace"),
  C("Zuggi walks out into the rain, hood up, trying not to hear the crowd."),
  P(4),
  C("Billboards don't glitch in Nexa City. Not like that. Something just deleted it — in the real world."),
  C("And someone has been watching him the whole time."),
  P(5),
  C("The cat's name is Jinx. Nobody owns Jinx. And Jinx just stole Zuggi's favorite headphones."),
  P(6),
  L("A dead-end alley"),
  C("Jinx didn't run away. Jinx led him here. On purpose."),
  P(7),
  C("A glitch-beast: a monster made of broken code, crawling out of the Grid and into the street. And Zuggi, as usual, looks for the quit button."),
  P(8),
  C("Kai Vega. Local skater, zero brakes, and terrible at plans. He saw the glitch from three rooftops away and came anyway."),
  C("The beast knocks them both flat. Then someone drops in from above."),
  P(9),
  C("Rei Kurogane. Nobody knows where she trains or why she carries a katana. She just knows how to cut code."),
  C("And she was in the arcade tonight. She saw Zuggi quit."),
  P(10),
  C("From Rei's coat comes Byte, a pocket robot built by someone Rei hasn't seen in a year. Byte has been searching the city for one specific player."),
  C("Zuggi. Player 1."),
  P(11),
  C("The street gives way, and the four of them fall out of Nexa City and into the Grid itself."),
  C("High above, in a tower of static, the crowned figure from the Grid Cup final watches them fall. He has a name: the Glitch King."),
  P(12),
  { type: "caption", end: true, text: "Next — Chapter 2: Tutorial Level. Inside the Grid, every one of them gets a power. And none of them know how to use it.", href: "/read/chapter-2-tutorial-level/", cta: "Read Chapter 2 →" },
];

const ch2Segments: Segment[] = [
  L("The Grid — Tutorial Level"),
  C("Nobody falls into the Grid. You log in, you log out. Tonight four people fell in, and there is no log-out button."),
  P2(1),
  C("In the Grid, real-world rules are gone. Every player gets a power, and it's always tied to who they are."),
  C("Zuggi, who never sits still, gets a combo-dash. Kai, who never brakes, can grind any surface. Rei, who never misses, can cut through code itself."),
  P2(2),
  C("And Byte, built to find a way when there isn't one, can hack the ground under their feet."),
  C("Every tutorial ends with a test. This one is simple: reach the exit before the timer runs out."),
  P2(3),
  C("Four strangers. One exit. Sixty seconds. What could go wrong?"),
  P2(4),
  C("Fifteen seconds wasted arguing about who's in charge. Naturally, Kai has an idea."),
  P2(5),
  C("Kai's plan, in full: grind the shortcut. Nobody told him the shortcut was a firewall."),
  P2(6),
  C("When the Grid finds an error, it deletes it. And right now, the error is them."),
  L("The last platform"),
  C("They left Jinx in the alley in Nexa City. Jinx, apparently, found another way in."),
  P2(7),
  C("No time for the cat. The exit is one jump away, and the floor behind them is gone. This is the part where Zuggi always quits."),
  P2(8),
  C("Kai's second plan is better, because it isn't his. It's everyone's: Byte builds, Kai rides, Rei cuts, Zuggi carries."),
  P2(9),
  C("One gap left, too far for anyone to jump alone. Lucky for them, Zuggi's dash works better with passengers."),
  P2(10),
  L("The exit"),
  C("They made it, together. And for the first time in his life, Zuggi didn't quit."),
  P2(11),
  C("Past the exit, while the boys celebrate, Rei finds a wall that shouldn't be there."),
  P2(12),
  C("REN_K. Her brother's username. He was here. And he left a warning."),
  { type: "caption", end: true, text: "Next — Chapter 3: Speedrun. Rei has a message from her missing brother. And the cat is still watching.", href: "/read/chapter-3-speedrun/", cta: "Read Chapter 3 →" },
];

const ch3Segments: Segment[] = [
  L("The Grid — The same second"),
  C("Rei is staring at her missing brother's name. And the last thing he wrote is a warning about the cat."),
  P3(1),
  C("Rei could tell the others. She doesn't, not until she knows who to trust."),
  C("Meanwhile, Byte has picked up a signal from the real world. It's bad."),
  P3(2),
  C("The Glitch King is deleting Nexa City's power grid. In ten minutes the real city goes dark: every light, every train, every screen."),
  C("There's one way to stop it. In a game, a save point locks your progress. In the Grid, a save point locks the real world. Reach it first, and the power stays on."),
  L("The Neon Highway"),
  C("Byte opens a shortcut to the start line. The word \"first\" turns out to matter, because someone else is racing too."),
  P3(3),
  C("The Glitch Rider is the King's fastest player, and it has never lost. The Squad has no car, no plan, and nine minutes left."),
  C("No car? Byte can build one. Probably."),
  P3(4),
  C("On a board Kai is the fastest thing in the Grid. The cart is fast too, as long as Zuggi keeps dashing it."),
  P3(5),
  C("The Rider doesn't race fair. Every road it passes, it deletes behind it."),
  C("One more rule of the Grid: a person deleted in Nexa City doesn't vanish right away. They drop into the Grid as a glowing file. Catch the file before it fades, and that person can come back."),
  C("His name is Pip. His mom was deleted an hour ago. He logged in to find her. He found her file. And the road is falling out from under him."),
  P3(6),
  C("Kai can win the race or save the kid. Not both."),
  P3(7),
  L("The save point"),
  C("The Rider doesn't stop for anyone."),
  P3(8),
  C("Ten minutes ago, Nexa City had power. Now it doesn't. But Pip still has his mom's file."),
  C("Byte can send a file back to the real world. Just one, and just this once."),
  P3(9),
  L("Nexa City — In the dark"),
  C("Somewhere in the blackout, a mother and her son find each other. For Pip, the lights don't matter."),
  C("Back in the Grid, Byte does something it has never done before."),
  P3(10),
  C("Rei knows that voice. It's her brother's. She hasn't heard it in a year."),
  C("She says nothing again. Now she has two secrets."),
  L("The broken highway — Later"),
  C("Pip logs out to go home. He has one thing to say first."),
  P3(11),
  C("Nobody notices Jinx leave. Nobody ever does."),
  L("The Glitch King's tower"),
  P3(12),
  { type: "caption", end: true, text: "Next — Chapter 4: Boss Rush. The Squad storms the King's tower. But the King already knows they're coming." },
];

export const chapters: Chapter[] = [
  {
    slug: "chapter-1-press-start",
    number: 1,
    title: "Press Start",
    synopsis: "Zuggi rage-quits the Grid Cup final, then watches a billboard get deleted pixel by pixel. A cat steals his headphones, a glitch-beast attacks, Kai skates in, Rei cuts it in half, and Byte finds Player 1. Then the alley falls into the Grid.",
    cover: "/comics/ch1/cover.webp",
    pages: Array.from({ length: 12 }, (_, i) => `/comics/ch1/p${String(i + 1).padStart(2, "0")}.webp`),
    panelCount: 0,
    segments: ch1Segments,
    cast: [
      { name: "Zuggi", img: "/img/char-fox.webp", line: "Best gamer in Nexa City. Has never finished a game." },
      { name: "Jinx", img: "/img/char-cat.webp", line: "A black cat nobody owns. Steals things. Has plans." },
      { name: "Kai Vega", img: "/img/char-skater.webp", line: "Skater with zero brakes and zero plans." },
      { name: "Rei Kurogane", img: "/img/char-katana.webp", line: "Silent swordswoman who cuts code." },
      { name: "Byte", img: "/img/char-robot.webp", line: "Pocket robot searching for Player 1." },
    ],
  },
  {
    slug: "chapter-2-tutorial-level",
    number: 2,
    title: "Tutorial Level",
    synopsis: "Inside the Grid, every player gets a power: Zuggi a combo-dash, Kai a grind-anything board, Rei a code-cutting blade, Byte the ground itself. They bicker, Kai's plan nearly gets them deleted, and they only make it out as a team. Then Rei finds a message carved by her missing brother.",
    cover: "/comics/ch2/cover.webp",
    pages: Array.from({ length: 12 }, (_, i) => `/comics/ch2/p${String(i + 1).padStart(2, "0")}.webp`),
    panelCount: 0,
    segments: ch2Segments,
    cast: [
      { name: "Zuggi", img: "/img/char-fox.webp", line: "Power: combo-dash. Still has never finished a game." },
      { name: "Kai Vega", img: "/img/char-skater.webp", line: "Power: grind any surface. Plans still terrible." },
      { name: "Rei Kurogane", img: "/img/char-katana.webp", line: "Power: cut through code. Looking for her brother." },
      { name: "Byte", img: "/img/char-robot.webp", line: "Power: hack the terrain. Speaks fluent beep." },
      { name: "Jinx", img: "/img/char-cat.webp", line: "Was left behind in Nexa City. Somehow isn't." },
    ],
  },
  {
    slug: "chapter-3-speedrun",
    number: 3,
    title: "Speedrun",
    synopsis: "The King is deleting Nexa City's power grid, and the only way to stop it is to beat his Glitch Rider to the save point. Kai is about to win when he sees a kid chasing his deleted mom's file across a collapsing road. The race, the lights, and one secret too many.",
    cover: "/comics/ch3/cover.webp",
    pages: Array.from({ length: 12 }, (_, i) => `/comics/ch3/p${String(i + 1).padStart(2, "0")}.webp`),
    panelCount: 0,
    segments: ch3Segments,
    cast: [
      { name: "Zuggi", img: "/img/char-fox.webp", line: "Pushes a shopping cart. Very fast." },
      { name: "Kai Vega", img: "/img/char-skater.webp", line: "Fastest thing in the Grid. Has a choice to make." },
      { name: "Rei Kurogane", img: "/img/char-katana.webp", line: "Just erased her brother's warning. Told no one." },
      { name: "Byte", img: "/img/char-robot.webp", line: "Builds cars. Sort of." },
      { name: "Jinx", img: "/img/char-cat.webp", line: "Innocent. Definitely. Probably." },
    ],
  },
  { slug: "chapter-4-bytes-secret", number: 4, title: "Byte's Secret", synopsis: "Byte has been carrying something it was never supposed to find.", cover: "/img/ch4.webp", pages: [], panelCount: 8 },
  { slug: "chapter-5-nine-lives", number: 5, title: "Nine Lives", synopsis: "Jinx has had a few close calls. Eight, to be exact.", cover: "/img/ch5.webp", pages: [], panelCount: 8 },
  { slug: "chapter-6-neon-storm", number: 6, title: "Neon Storm", synopsis: "The storm hits Neon City and the whole squad has to hold the line.", cover: "/img/ch6.webp", pages: [], panelCount: 8 },
];

export const getChapter = (slug: string) => chapters.find((c) => c.slug === slug);
