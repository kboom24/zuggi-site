import { chapters } from "@/data/chapters";
import { ChapterCard } from "@/components/Cards";
import { PageHeader } from "@/components/PageHeader";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({ title: "Read Zuggi Comics", description: "Read Zuggi Comics, the vertical-scroll webcomic starring the Zuggi Squad.", path: "/read/" });

export default function ReadPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-8 sm:px-6 lg:px-8">
      <PageHeader eyebrow="Zuggi Comics" title="Read" intro="The webcomic. Scroll it on your phone, binge it on desktop. Volume 1 is in progress." image="/img/ch6.webp" />
      <h2 className="mb-4 font-display text-2xl font-medium uppercase">Volume 1</h2>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
        {chapters.map((ch) => (
          <div key={ch.slug}>
            <ChapterCard ch={ch} />
            <p className="mt-2 text-[13px] text-white/75">{ch.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
