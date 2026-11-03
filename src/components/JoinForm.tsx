"use client";

import { useState, type FormEvent } from "react";
import { getSupabase } from "@/lib/supabase";

type Status = "idle" | "loading" | "success" | "preview" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Join Free / waitlist signup. Writes to Supabase `signups` (insert-only RLS). Falls back to a local success state. */
export function JoinForm({ source = "home", compact = false }: { source?: string; compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (hp) return;
    const value = email.trim().toLowerCase();
    if (!EMAIL_RE.test(value)) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    setError("");
    const supabase = getSupabase();
    if (!supabase) {
      // Local / preview mode: no backend configured yet.
      try {
        const list = JSON.parse(localStorage.getItem("zuggi-preview-signups") || "[]");
        localStorage.setItem("zuggi-preview-signups", JSON.stringify([...new Set([...list, value])]));
      } catch {}
      await new Promise((r) => setTimeout(r, 400));
      setStatus("preview");
      return;
    }
    const { error: dbError } = await supabase.from("signups").insert({ email: value, source });
    if (dbError && dbError.code !== "23505") {
      setStatus("error");
      setError("Something went wrong. Please try again in a moment.");
      return;
    }
    setStatus("success");
  }

  if (status === "success" || status === "preview") {
    return (
      <div role="status" className="rounded-lg border border-cyan/40 bg-cyan/[.06] p-5">
        <p className="font-display text-xl font-semibold uppercase tracking-wide text-cyan">You&apos;re in the squad!</p>
        <p className="mt-1 text-sm text-white/80">We&apos;ll email you when new games, chapters and episodes drop.</p>
        {status === "preview" && <p className="mt-2 text-xs text-white/50">Preview mode: signups aren&apos;t saved to a database yet.</p>}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div className={`flex w-full flex-col gap-3 ${compact ? "" : "sm:flex-row"}`}>
        <label htmlFor={`email-${source}`} className="sr-only">Email address</label>
        <input
          id={`email-${source}`}
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? `email-err-${source}` : undefined}
          className="h-12 flex-1 rounded-md border border-white/15 bg-night/80 px-4 text-white placeholder:text-white/40 outline-none focus:border-cyan focus:shadow-[0_0_0_3px_rgba(0,240,255,.15)]"
        />
        <input tabIndex={-1} autoComplete="off" aria-hidden value={hp} onChange={(e) => setHp(e.target.value)} className="hidden" name="company" />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-12 rounded-md bg-magenta px-7 font-display text-[17px] font-semibold uppercase tracking-wide text-white shadow-[0_0_24px_-6px_rgba(255,11,138,.8)] transition hover:bg-magenta-600 disabled:opacity-60"
        >
          {status === "loading" ? "Joining…" : "Join Free"}
        </button>
      </div>
      {status === "error" && <p id={`email-err-${source}`} className="mt-2 text-sm text-magenta">{error}</p>}
      <p className="mt-3 text-xs text-white/50">Free to join. No spam. Unsubscribe any time.</p>
    </form>
  );
}
