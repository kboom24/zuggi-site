import { PlayGrid } from "@/components/PlayGrid";
import { PageHeader } from "@/components/PageHeader";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({ title: "Play free browser games", description: "Play Zuggi's heavy browser games instantly: racing, action, puzzle, sports and more. No downloads.", path: "/play/" });

export default function PlayPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-8 sm:px-6 lg:px-8">
      <PageHeader eyebrow="Zuggi Games" title="Play" intro="Browser games. For everyone. Big, fast, good-looking games that run right in your browser." image="/img/g1.webp" />
      <PlayGrid />
    </div>
  );
}
