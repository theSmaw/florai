-- User-owned custom flowers
-- Each row is a flower created by a specific user, private to them.
-- These are separate from the global `flowers` seed table.

create table if not exists user_flowers (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid not null references auth.users(id) on delete cascade,
  name                  text not null,
  colors                text[] not null default '{}',
  type                  text not null,
  image_url             text,
  wholesale_price       numeric(10,2) not null default 0,
  supplier              text not null default '',
  season                text[] not null default '{}',
  availability          text not null default 'always',
  climate               text not null default 'temperate',
  stem_length_cm        numeric,
  fragrance_level       text,
  toxicity              text,
  vase_life_days        integer,
  care_instructions     text not null default '',
  notes                 text not null default '',
  complementary_flower_ids uuid[] not null default '{}',
  created_at            timestamptz not null default now()
);

alter table user_flowers enable row level security;

-- Users can only see their own flowers
create policy "user_flowers_select" on user_flowers
  for select using (user_id = auth.uid());

-- Users can insert their own flowers
create policy "user_flowers_insert" on user_flowers
  for insert with check (user_id = auth.uid());

-- Users can update their own flowers
create policy "user_flowers_update" on user_flowers
  for update using (user_id = auth.uid());

-- Users can delete their own flowers
create policy "user_flowers_delete" on user_flowers
  for delete using (user_id = auth.uid());
