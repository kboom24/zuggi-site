export const metadata = { title: "Page not found", robots: { index: false } };

import Link from "next/link";
import { asset } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="mx-auto grid min-h-[60vh] max-w-xl place-items-center px-4 py-16 text-center">
      <div>
        <img src={asset("/img/char-cat.webp")} alt="Jinx the cat" className="mx-auto h-48 w-40 rounded-xl border border-line object-cover object-top" />
        <p className="mt-6 font-display text-sm uppercase tracking-[0.3em] text-cyan">Error 404</p>
        <h1 className="font-display text-5xl font-medium uppercase">Jinx knocked this page over</h1>
        <p className="mt-3 text-white/75">The page you&apos;re looking for doesn&apos;t exist (or ran off with the snacks).</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/" className="rounded-md bg-magenta px-5 py-2.5 font-semibold">Back home</Link>
          <Link href="/play/" className="rounded-md border border-cyan px-5 py-2.5 font-semibold text-cyan">Play a game</Link>
        </div>
      </div>
    </div>
  );
}
