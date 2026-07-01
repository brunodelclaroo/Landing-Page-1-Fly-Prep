create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  whatsapp text not null,
  created_at timestamptz not null default now(),
  source text not null default 'landing'
);

alter table leads enable row level security;
