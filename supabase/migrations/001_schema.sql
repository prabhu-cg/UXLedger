-- ============================================================
-- UXLedger — Database Schema
-- ============================================================

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";

-- ============================================================
-- ENUMS
-- ============================================================

create type debt_severity as enum ('critical', 'high', 'medium', 'low');
create type debt_status as enum ('open', 'in_progress', 'resolved', 'wont_fix', 'deferred');
create type debt_category as enum (
  'usability',
  'accessibility',
  'content',
  'design_system',
  'visual_design',
  'interaction_design',
  'technical_constraint',
  'performance',
  'research_finding'
);

-- ============================================================
-- PROFILES
-- ============================================================

create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  full_name   text,
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- PROJECTS
-- ============================================================

create table public.projects (
  id          uuid primary key default uuid_generate_v4(),
  owner_id    uuid not null references public.profiles(id) on delete cascade,
  name        text not null,
  description text,
  color       text not null default '#4F46E5',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index idx_projects_owner_id on public.projects(owner_id);

alter table public.projects enable row level security;

create policy "projects_select_own" on public.projects
  for select using (auth.uid() = owner_id);

create policy "projects_insert_own" on public.projects
  for insert with check (auth.uid() = owner_id);

create policy "projects_update_own" on public.projects
  for update using (auth.uid() = owner_id);

create policy "projects_delete_own" on public.projects
  for delete using (auth.uid() = owner_id);

-- ============================================================
-- DEBT ITEMS
-- ============================================================

create table public.debt_items (
  id            uuid primary key default uuid_generate_v4(),
  project_id    uuid not null references public.projects(id) on delete cascade,
  created_by    uuid not null references public.profiles(id),
  assigned_to   uuid references public.profiles(id),
  title         text not null,
  description   text,
  severity      debt_severity not null default 'medium',
  status        debt_status not null default 'open',
  category      debt_category not null,
  due_date      date,
  resolved_at   timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index idx_debt_items_project_id on public.debt_items(project_id);
create index idx_debt_items_created_by on public.debt_items(created_by);
create index idx_debt_items_assigned_to on public.debt_items(assigned_to);
create index idx_debt_items_status on public.debt_items(status);
create index idx_debt_items_severity on public.debt_items(severity);
create index idx_debt_items_category on public.debt_items(category);
create index idx_debt_items_created_at on public.debt_items(created_at desc);

alter table public.debt_items enable row level security;

-- Users can access debt items in their own projects
create policy "debt_items_select" on public.debt_items
  for select using (
    exists (
      select 1 from public.projects p
      where p.id = project_id and p.owner_id = auth.uid()
    )
  );

create policy "debt_items_insert" on public.debt_items
  for insert with check (
    auth.uid() = created_by and
    exists (
      select 1 from public.projects p
      where p.id = project_id and p.owner_id = auth.uid()
    )
  );

create policy "debt_items_update" on public.debt_items
  for update using (
    exists (
      select 1 from public.projects p
      where p.id = project_id and p.owner_id = auth.uid()
    )
  );

create policy "debt_items_delete" on public.debt_items
  for delete using (
    exists (
      select 1 from public.projects p
      where p.id = project_id and p.owner_id = auth.uid()
    )
  );

-- ============================================================
-- ATTACHMENTS
-- ============================================================

create table public.attachments (
  id            uuid primary key default uuid_generate_v4(),
  debt_item_id  uuid not null references public.debt_items(id) on delete cascade,
  uploaded_by   uuid not null references public.profiles(id),
  file_name     text not null,
  file_size     bigint not null,
  mime_type     text not null,
  storage_path  text not null,
  created_at    timestamptz not null default now()
);

create index idx_attachments_debt_item_id on public.attachments(debt_item_id);

alter table public.attachments enable row level security;

create policy "attachments_select" on public.attachments
  for select using (
    exists (
      select 1 from public.debt_items di
      join public.projects p on p.id = di.project_id
      where di.id = debt_item_id and p.owner_id = auth.uid()
    )
  );

create policy "attachments_insert" on public.attachments
  for insert with check (
    auth.uid() = uploaded_by and
    exists (
      select 1 from public.debt_items di
      join public.projects p on p.id = di.project_id
      where di.id = debt_item_id and p.owner_id = auth.uid()
    )
  );

create policy "attachments_delete" on public.attachments
  for delete using (
    auth.uid() = uploaded_by or
    exists (
      select 1 from public.projects p
      join public.debt_items di on di.project_id = p.id
      where di.id = debt_item_id and p.owner_id = auth.uid()
    )
  );

-- ============================================================
-- COMMENTS
-- ============================================================

create table public.comments (
  id            uuid primary key default uuid_generate_v4(),
  debt_item_id  uuid not null references public.debt_items(id) on delete cascade,
  author_id     uuid not null references public.profiles(id),
  body          text not null,
  edited_at     timestamptz,
  created_at    timestamptz not null default now()
);

create index idx_comments_debt_item_id on public.comments(debt_item_id);

alter table public.comments enable row level security;

create policy "comments_select" on public.comments
  for select using (
    exists (
      select 1 from public.debt_items di
      join public.projects p on p.id = di.project_id
      where di.id = debt_item_id and p.owner_id = auth.uid()
    )
  );

create policy "comments_insert" on public.comments
  for insert with check (
    auth.uid() = author_id and
    exists (
      select 1 from public.debt_items di
      join public.projects p on p.id = di.project_id
      where di.id = debt_item_id and p.owner_id = auth.uid()
    )
  );

create policy "comments_update" on public.comments
  for update using (auth.uid() = author_id);

create policy "comments_delete" on public.comments
  for delete using (auth.uid() = author_id);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

create trigger set_projects_updated_at
  before update on public.projects
  for each row execute procedure public.set_updated_at();

create trigger set_debt_items_updated_at
  before update on public.debt_items
  for each row execute procedure public.set_updated_at();

-- Auto-set resolved_at when status changes to 'resolved'
create or replace function public.handle_debt_resolved()
returns trigger language plpgsql as $$
begin
  if new.status = 'resolved' and old.status != 'resolved' then
    new.resolved_at = now();
  elsif new.status != 'resolved' then
    new.resolved_at = null;
  end if;
  return new;
end;
$$;

create trigger on_debt_item_resolved
  before update on public.debt_items
  for each row execute procedure public.handle_debt_resolved();

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'attachments',
  'attachments',
  false,
  10485760, -- 10MB
  array['image/png', 'image/jpeg', 'image/jpg', 'application/pdf']
)
on conflict (id) do nothing;

create policy "attachments_storage_select" on storage.objects
  for select using (
    bucket_id = 'attachments' and auth.role() = 'authenticated'
  );

create policy "attachments_storage_insert" on storage.objects
  for insert with check (
    bucket_id = 'attachments' and
    auth.role() = 'authenticated' and
    (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "attachments_storage_delete" on storage.objects
  for delete using (
    bucket_id = 'attachments' and
    auth.role() = 'authenticated' and
    (storage.foldername(name))[1] = auth.uid()::text
  );
