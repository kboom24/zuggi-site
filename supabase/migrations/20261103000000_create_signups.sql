-- Zuggi: Join Free / waitlist signups.
-- Anonymous visitors may INSERT only. Nobody can read, update or delete via the anon key.
create extension if not exists citext;

create table if not exists public.signups (
  id          bigint generated always as identity primary key,
  email       citext not null unique check (char_length(email) <= 320 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'),
  source      text   not null default 'home' check (char_length(source) <= 64),
  created_at  timestamptz not null default now()
);

alter table public.signups enable row level security;

-- Insert-only policy for the public (anon) role and signed-in users.
drop policy if exists "Anyone can sign up" on public.signups;
create policy "Anyone can sign up"
  on public.signups
  for insert
  to anon, authenticated
  with check (true);

-- No select/update/delete policies => those operations are denied for anon/authenticated.
-- Read signups from the Supabase dashboard or with the service_role key (server-side only).
revoke select, update, delete on public.signups from anon, authenticated;
grant insert on public.signups to anon, authenticated;
