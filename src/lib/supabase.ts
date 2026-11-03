import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

/** Returns a Supabase client, or null when env vars are not configured (local preview mode). */
export function getSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  if (!client) client = createClient(url, anonKey, { auth: { persistSession: false } });
  return client;
}

export const supabaseConfigured = Boolean(url && anonKey);
