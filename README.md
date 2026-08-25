# Real-Time Digital Bus Ticketing System

Production-oriented bus ticketing application built with Next.js 16, Supabase Auth, Postgres, Row Level Security, and Tailwind CSS.

## Backend integration

Supabase is now the source of truth for users, roles, profiles, routes, buses, trips, bookings, tickets, payments, manifests, refunds, QR validations, audit logs, reports, feedback, preferences, and notifications. Browser storage is not used for application records.

Booking, validation, and cancellation use Postgres functions so related writes happen together. Database grants and RLS policies enforce passenger, conductor, and administrator boundaries even when endpoints are called directly.

## Configure Supabase

1. Copy `.env.example` to `.env.local`.
2. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` from the project API settings.
3. Set `SUPABASE_SERVICE_ROLE_KEY` only in the server environment. It is required for administrator user management and must never use a `NEXT_PUBLIC_` prefix.
4. Leave `NEXT_PUBLIC_ENABLE_DEMO_MODE=false` in production.

For a hosted project:

```bash
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
npm run db:push
```

Use `npx supabase db push --include-seed` only for a disposable development project. Never seed production.

## Local development

The local Supabase stack requires Docker Desktop or another Docker-compatible runtime.

```bash
npm install
npm run db:start
npm run db:reset
npm run dev
```

Copy the local API URL, publishable/anon key, and service-role key printed by `supabase start` into `.env.local`.

The development seed provides these accounts with password `Password123!`:

- `passenger@example.com`
- `conductor@example.com`
- `admin@example.com`

These credentials are for local/dev only. The demo switcher appears only when `NEXT_PUBLIC_ENABLE_DEMO_MODE=true`.

## Database workflow

- Schema: `supabase/migrations/20260825000000_initial_bus_ticketing.sql`
- Development data: `supabase/seed.sql`
- Local configuration: `supabase/config.toml`
- Generate types: `npm run db:types`
- Rebuild local DB: `npm run db:reset`
- Preview hosted changes: `npx supabase db push --dry-run`
- Run database tests: `npx supabase test db`

Create future changes with `npx supabase migration new descriptive_name`. Do not edit a migration already deployed to a shared environment.

## Verification

```bash
npm run lint
npm run build
```

The UI can compile without Supabase variables, but database-backed routes require valid runtime configuration.
