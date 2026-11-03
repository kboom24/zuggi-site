"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Logo } from "./Logo";

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/play/", label: "Play" },
  { href: "/read/", label: "Read" },
  { href: "/watch/", label: "Watch" },
  { href: "/shop/", label: "Shop" },
];

function isActive(pathname: string, href: string) {
  const p = pathname.replace(/\/$/, "") || "/";
  const h = href.replace(/\/$/, "") || "/";
  return h === "/" ? p === "/" : p === h || p.startsWith(h + "/");
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  function onSearch(e: FormEvent) {
    e.preventDefault();
    setOpen(false);
    router.push(`/search/?q=${encodeURIComponent(q.trim())}`);
  }

  const searchBox = (id: string) => (
    <form role="search" onSubmit={onSearch} className="relative w-full">
      <label htmlFor={id} className="sr-only">Search Zuggi</label>
      <input
        id={id}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search"
        className="h-10 w-full rounded-md border border-cyan/45 bg-night/70 pl-3 pr-10 text-[15px] text-white placeholder:text-white/75 outline-none transition focus:border-cyan focus:shadow-[0_0_0_3px_rgba(0,240,255,.15)]"
      />
      <button type="submit" aria-label="Search" className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-white/90 hover:text-cyan">
        <SearchIcon />
      </button>
    </form>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/[.06] bg-night/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav aria-label="Main" className="ml-10 hidden items-center gap-12 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`text-[15px] font-medium transition hover:text-magenta ${isActive(pathname, n.href) ? "text-magenta" : "text-white"}`}
              aria-current={isActive(pathname, n.href) ? "page" : undefined}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden w-[250px] lg:block">{searchBox("search-desktop")}</div>
        <Link
          href="/#join"
          className="hidden h-10 items-center rounded-md bg-magenta px-5 text-[15px] font-semibold text-white shadow-[0_0_20px_-4px_rgba(255,11,138,.7)] transition hover:bg-magenta-600 md:inline-flex lg:ml-3 ml-auto"
        >
          Join Free
        </Link>
        <button
          type="button"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div id="mobile-menu" className="border-t border-white/10 bg-night px-4 pb-5 pt-3 md:hidden">
          {searchBox("search-mobile")}
          <nav aria-label="Mobile" className="mt-3 grid">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={`border-b border-white/[.06] py-3 text-lg font-medium ${isActive(pathname, n.href) ? "text-magenta" : "text-white"}`}
              >
                {n.label}
              </Link>
            ))}
            <Link href="/squad/" onClick={() => setOpen(false)} className="border-b border-white/[.06] py-3 text-lg font-medium">Squad</Link>
          </nav>
          <Link href="/#join" onClick={() => setOpen(false)} className="mt-4 flex h-11 items-center justify-center rounded-md bg-magenta font-semibold">
            Join Free
          </Link>
        </div>
      )}
    </header>
  );
}
