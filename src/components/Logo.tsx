import Link from "next/link";

/** Crisp CSS/SVG recreation of the ZUGGI wordmark: slanted magenta letters + cyan speed streak. */
export function Wordmark({ className = "", size = "text-3xl" }: { className?: string; size?: string }) {
  return (
    <span className={`relative inline-flex items-center ${size} ${className}`} aria-label="Zuggi">
      <svg
        aria-hidden
        viewBox="0 0 120 40"
        className="absolute -right-[0.55em] top-1/2 h-[0.9em] w-[1.6em] -translate-y-1/2"
        preserveAspectRatio="none"
      >
        <g fill="#00F0FF">
          <polygon points="0,6 120,0 40,12" />
          <polygon points="10,17 110,13 30,22" />
          <polygon points="0,28 95,25 25,33" />
          <polygon points="15,37 70,35 30,40" />
        </g>
      </svg>
      <span className="wordmark relative pr-[0.1em]">ZUGGI</span>
    </span>
  );
}

export function Logo({ size = "text-[38px]" }: { size?: string }) {
  return (
    <Link href="/" className="inline-flex items-center rounded focus-visible:outline-2 focus-visible:outline-cyan" aria-label="Zuggi home">
      <Wordmark size={size} />
    </Link>
  );
}
