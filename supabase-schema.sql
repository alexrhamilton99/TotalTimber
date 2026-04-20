create extension if not exists pgcrypto;

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id) on delete cascade,
  title text not null,
  description text,
  job_address text,
  quote_amount numeric(12,2),
  final_invoice_amount numeric(12,2),
  deposit_amount numeric(12,2),
  status text not null check (status in ('Quote', 'Approved', 'Scheduled', 'In Progress', 'Completed', 'Invoiced', 'Paid')),
  start_date date,
  end_date date,
  created_at timestamptz not null default now()
);

create table if not exists project_tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  title text not null,
  completed boolean not null default false,
  due_date date,
  created_at timestamptz not null default now()
);

create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  invoice_number text,
  amount numeric(12,2) not null,
  status text not null default 'Draft',
  sent_date date,
  paid_date date,
  created_at timestamptz not null default now()
);

insert into customers (name, phone, email)
values
  ('Mike Johnson', '555-123-4567', 'mike@example.com'),
  ('Sarah Davis', '555-222-9988', 'sarah@example.com')
on conflict do nothing;
