---
name: run-local
description: Start the entire Florai app locally — Docker, the local Supabase backend, and the Vite dev server — then open it in the browser. Use when the user wants to run, launch, boot, or start the app locally, or when the app loads with no data (empty catalogue, no user info), which almost always means the backend isn't running.
---

# Run Florai locally

Florai is a Vite + React frontend backed by a **local Supabase stack that runs in Docker**. The frontend alone is useless without the backend — an app that renders but shows no catalogue/user data almost always means Supabase (or Docker) isn't up. This skill boots the whole stack in the correct order.

## Architecture recap

- Frontend: Vite dev server on `http://localhost:5173`
- Backend: local Supabase on `http://127.0.0.1:54321` (Studio UI on `http://127.0.0.1:54323`)
- Supabase runs in Docker; DB container is named `supabase_db_florai`
- Config lives in `.env.local` (`VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`) — do not change it unless the keys drift from `npx supabase status`

## Startup sequence

Run these steps in order. Each step depends on the previous one, so do not parallelise them.

### 1. Start Docker

Check if the daemon is up:

```bash
docker info >/dev/null 2>&1 && echo "docker running" || echo "docker NOT running"
```

If not running, launch Docker Desktop and wait for it:

```bash
open -a Docker
for i in $(seq 1 60); do docker info >/dev/null 2>&1 && { echo "Docker ready"; break; }; sleep 10; done
```

### 2. Start Supabase

```bash
npx supabase start 2>&1 | tail -30
```

This is idempotent — if the stack is already running it just prints status. First boot can take a while (it applies migrations and `supabase/seed.sql`). Confirm the printed Project URL / anon key match `.env.local`.

### 3. Verify the database has data

An empty catalogue after boot usually means the DB wasn't seeded.

```bash
docker exec supabase_db_florai psql -U postgres -d postgres -tAc "select 'flowers='||count(*) from flowers"
docker exec supabase_db_florai psql -U postgres -d postgres -tAc "select 'auth.users='||count(*) from auth.users"
```

A healthy seeded DB has ~100 flowers and at least 1 auth user. If `flowers=0`, re-run migrations/seed with `npx supabase db reset` (this wipes and re-seeds the local DB).

### 4. Start the Vite dev server

Run in the background so it keeps serving:

```bash
pnpm dev
```

Wait for it to print `Local: http://localhost:5173/`.

### 5. Open the app

```bash
open http://localhost:5173/
```

## Done

Tell the user the app is live at `http://localhost:5173`, note that Supabase Studio is at `http://127.0.0.1:54323`, and that they'll need to sign in with the seeded user to see user-specific data.

## Shutting down

- Stop the dev server: kill the background `pnpm dev` process.
- Stop the backend: `npx supabase stop`.
