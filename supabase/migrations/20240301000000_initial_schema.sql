-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Companies table
create table public.companies (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    type text not null check (type in ('corporation', 'llc', 'nonprofit')),
    jurisdiction text not null,
    status text not null default 'pending' check (status in ('pending', 'active', 'paused', 'terminated')),
    owner_id uuid references auth.users not null,
    contact jsonb not null default '{}'::jsonb,
    settings jsonb not null default '{}'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(owner_id, name)
);

-- Add indexes
create index idx_companies_owner on public.companies(owner_id);
create index idx_companies_status on public.companies(status);
create index idx_companies_name on public.companies(name);

-- Add RLS policies
alter table public.companies enable row level security;

create policy "Users can view their own companies"
    on public.companies for select
    using (auth.uid() = owner_id);

create policy "Users can insert their own companies"
    on public.companies for insert
    with check (auth.uid() = owner_id);

create policy "Users can update their own companies"
    on public.companies for update
    using (auth.uid() = owner_id);

create policy "Users can delete their own companies"
    on public.companies for delete
    using (auth.uid() = owner_id);

-- Add updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

create trigger handle_companies_updated_at
    before update on public.companies
    for each row
    execute function public.handle_updated_at();