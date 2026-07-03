create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  whatsapp text not null,
  created_at timestamptz not null default now()
);

alter table leads enable row level security;

-- The app writes leads using the publishable (anon) key, so anon inserts
-- must be explicitly allowed. No select/update/delete policy is granted,
-- so the public can only add rows, never read or modify existing ones.
create policy "Allow anon insert on leads"
  on leads for insert
  to anon
  with check (true);
