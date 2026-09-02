-- Hi Grove Technologies: Supabase shared content + admin access
-- Run this in Supabase SQL Editor.
-- Then create the admin user in Supabase Authentication > Users.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

drop policy if exists "Admins can read their admin record" on public.admin_users;
create policy "Admins can read their admin record"
on public.admin_users for select
to authenticated
using (user_id = auth.uid());

create or replace function public.is_higrove_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
      and role = 'admin'
  );
$$;

revoke all on function public.is_higrove_admin() from public;
grant execute on function public.is_higrove_admin() to anon, authenticated;

create table if not exists public.site_content (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create or replace function public.set_site_content_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists site_content_updated_at on public.site_content;
create trigger site_content_updated_at
before update on public.site_content
for each row execute function public.set_site_content_updated_at();

alter table public.site_content enable row level security;

drop policy if exists "Public can read site content" on public.site_content;
create policy "Public can read site content"
on public.site_content for select
using (true);

drop policy if exists "Admins can insert site content" on public.site_content;
create policy "Admins can insert site content"
on public.site_content for insert
to authenticated
with check (public.is_higrove_admin());

drop policy if exists "Admins can update site content" on public.site_content;
create policy "Admins can update site content"
on public.site_content for update
to authenticated
using (public.is_higrove_admin())
with check (public.is_higrove_admin());

drop policy if exists "Admins can delete site content" on public.site_content;
create policy "Admins can delete site content"
on public.site_content for delete
to authenticated
using (public.is_higrove_admin());

create table if not exists public.site_enquiries (
  id text primary key,
  name text not null,
  email text not null,
  phone text,
  company text,
  website_type text,
  industry text,
  features text,
  message text,
  status text not null default 'New',
  notes text not null default '',
  created_at timestamptz not null default now()
);

alter table public.site_enquiries enable row level security;

drop policy if exists "Public can submit enquiries" on public.site_enquiries;
create policy "Public can submit enquiries"
on public.site_enquiries for insert
to anon, authenticated
with check (
  length(trim(name)) between 1 and 120
  and length(trim(email)) between 3 and 320
);

drop policy if exists "Admins can read enquiries" on public.site_enquiries;
create policy "Admins can read enquiries"
on public.site_enquiries for select
to authenticated
using (public.is_higrove_admin());

drop policy if exists "Admins can update enquiries" on public.site_enquiries;
create policy "Admins can update enquiries"
on public.site_enquiries for update
to authenticated
using (public.is_higrove_admin())
with check (public.is_higrove_admin());

drop policy if exists "Admins can delete enquiries" on public.site_enquiries;
create policy "Admins can delete enquiries"
on public.site_enquiries for delete
to authenticated
using (public.is_higrove_admin());

-- After creating the admin user in Supabase Auth, replace the UUID below
-- with that user's UUID:
--
-- insert into public.admin_users (user_id)
-- values ('YOUR-SUPABASE-AUTH-USER-UUID')
-- on conflict (user_id) do nothing;

-- Explicit API grants. RLS still controls which rows/actions are allowed.
grant select on public.site_content to anon, authenticated;
grant insert, update, delete on public.site_content to authenticated;

grant select on public.admin_users to authenticated;

grant insert on public.site_enquiries to anon, authenticated;
grant select, update, delete on public.site_enquiries to authenticated;

-- Keep future schema changes from accidentally exposing these tables.
revoke all on public.admin_users from anon;

