----------------------------------------
-- Chat Completions
----------------------------------------
create table public.chat_completions(
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  model text not null,
  temperature float not null,
  presence_penalty float not null,
  frequency_penalty float not null,
  max_tokens integer not null,
  messages jsonb not null default '{}' ::jsonb,
  user_id uuid
);

create index chat_completions_created_at_idx on public.chat_completions(created_at);

alter table public.chat_completions enable row level security;

create policy "anyone_can_create_chat_completions" on public.chat_completions
  for insert
    with check (true);

create policy "anyone_can_read_chat_completions" on public.chat_completions
  for select
    using (true);

create policy "admins_can_update_chat_completions" on public.chat_completions
  for update
    using (true);

create policy "admins_can_delete_chat_completions" on public.chat_completions
  for delete
    using (true);

