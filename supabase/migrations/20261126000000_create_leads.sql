-- Leads for the private /leads page.
-- Only signed-in team members can read or change leads; the public site cannot.
-- Run this once in the Supabase dashboard: SQL Editor > New query > paste > Run.

create table if not exists public.leads (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    whatsapp text not null,
    status text not null default 'Not contacted',
    notes text not null default '',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- Keep updated_at current on every edit.
create or replace function public.set_leads_updated_at()
returns trigger language plpgsql as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
    before update on public.leads
    for each row execute function public.set_leads_updated_at();

alter table public.leads enable row level security;

drop policy if exists "Team can read leads" on public.leads;
drop policy if exists "Team can add leads" on public.leads;
drop policy if exists "Team can update leads" on public.leads;
drop policy if exists "Team can delete leads" on public.leads;

create policy "Team can read leads" on public.leads for select to authenticated using (true);
create policy "Team can add leads" on public.leads for insert to authenticated with check (true);
create policy "Team can update leads" on public.leads for update to authenticated using (true) with check (true);
create policy "Team can delete leads" on public.leads for delete to authenticated using (true);
