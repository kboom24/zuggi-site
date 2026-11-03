import { SearchResults } from "@/components/SearchResults";
import { pageMeta } from "@/lib/meta";

export const metadata = { ...pageMeta({ title: "Search", description: "Search Zuggi games, episodes, chapters and characters.", path: "/search/" }), robots: { index: false } };

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 pt-10 sm:px-6 lg:px-8">
      <h1 className="mb-6 font-display text-5xl font-medium uppercase">Search</h1>
      <SearchResults />
    </div>
  );
}
