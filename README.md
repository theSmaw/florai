# FlorAI

A React + Redux Toolkit + Vite project backed by **Supabase** for database, auth, and storage.

## Project Documentation

The following Markdown files serve as the primary source of truth for context and guidance. Start here when working on or reviewing the project:

- [ARCHITECTURE.md](./ARCHITECTURE.md) — System architecture, laminar flow patterns, and design rationale
- [CODING_CONVENTIONS.md](./CODING_CONVENTIONS.md) — Naming, structure, and style conventions used across the codebase
- [DEVELOPMENT_WORKFLOW.md](./DEVELOPMENT_WORKFLOW.md) — Branching, PR guidelines, and review process
- [CATALOGUE_IMPLEMENTATION.md](./CATALOGUE_IMPLEMENTATION.md) — Catalogue feature design and implementation details

---

## Getting Started

### Prerequisites

| Tool | Version | Install |
|---|---|---|
| Node.js | 20+ | https://nodejs.org |
| pnpm | 9+ | `npm install -g pnpm` |
| Docker Desktop | latest | https://www.docker.com/products/docker-desktop/ |
| Supabase CLI | 2+ | `brew install supabase/tap/supabase` |

> **Docker Desktop must be running** before you can start the Supabase local stack.

---

### 1 — Install dependencies

```bash
pnpm install
```

---

### 2 — Start Supabase local stack

```bash
supabase start
```

This boots a local Postgres database, Auth server, and REST API inside Docker. The first run downloads the Supabase images and takes a few minutes. Subsequent starts are fast.

When it's ready you'll see:

```
API URL: http://127.0.0.1:54321
DB URL:  postgresql://postgres:postgres@127.0.0.1:54322/postgres
Studio:  http://127.0.0.1:54323
anon key: eyJ...
service_role key: eyJ...
```

The `.env.local` file is already pre-populated with the local default keys — no changes needed.

---

### 3 — Start the dev server

```bash
pnpm dev
```

Open **http://localhost:5173**. You'll be prompted to sign up or sign in. After authenticating you'll land on the flower catalogue, loading data live from your local Supabase instance.

---

### Stopping and resetting

| Command | What it does |
|---|---|
| `supabase stop` | Shuts down the local stack (data is preserved) |
| `supabase stop --no-backup` | Shuts down and discards all data |
| `supabase db reset` | Drops and recreates the DB, re-runs migrations and seed data |
| `supabase start` | Restarts a stopped stack |

---

### Useful local URLs

| Service | URL |
|---|---|
| App | http://localhost:5173 |
| Supabase Studio (DB browser + auth users) | http://127.0.0.1:54323 |
| REST API | http://127.0.0.1:54321 |

---

## All scripts

```bash
pnpm dev               # Start Vite dev server
pnpm build             # Type-check + production build
pnpm preview           # Preview production build locally
pnpm type-check        # TypeScript check only

pnpm storybook         # Start Storybook on :6006
pnpm build-storybook   # Build static Storybook

pnpm cypress:open      # Open Cypress interactive runner
pnpm cypress:run       # Run Cypress headlessly
pnpm cypress:ci        # Start dev server + run Cypress (CI mode)

pnpm format            # Prettier format
```

---

## Running Cypress tests

### Stub tests (no Supabase required)

Most tests intercept Supabase network calls with fixture data and a fake session — they work without Supabase running:

```bash
pnpm dev               # in one terminal
pnpm cypress:run       # in another
```

### Isolation + auth tests (real Supabase required)

The `auth.cy.ts` and `user-isolation.cy.ts` suites test real sign-up/sign-in flows and RLS enforcement. They require `supabase start` to be running, and a local credentials file for Cypress:

```bash
# First time only: create cypress.env.json from the example
cp cypress.env.json.example cypress.env.json
# Fill in the Secret key shown by `supabase status`
```

```bash
supabase start
pnpm dev
pnpm cypress:run --spec "cypress/e2e/auth.cy.ts,cypress/e2e/user-isolation.cy.ts"
```

> `cypress.env.json` is gitignored — it holds your local Supabase secret key and should never be committed.

### Database-level RLS tests

To run the SQL RLS unit tests directly against the local database:

```bash
psql "postgresql://postgres:postgres@127.0.0.1:54322/postgres" \
  -f supabase/tests/rls_test.sql
```

---

## Data model

```
flowers                     — global seed data, publicly readable
  id, name, image_url, colors[], type, wholesale_price, retail_price,
  supplier, origin, season[], availability, climate, quantity_on_hand,
  stem_length_cm, fragrance_level, toxicity, vase_life_days,
  care_instructions, notes, complementary_flower_ids[]

user_flower_overrides       — per-user customisations (deltas only)
  id, user_id → auth.users, flower_id → flowers, image_url
  UNIQUE(user_id, flower_id)
```

When flowers are fetched the API does a LEFT JOIN on `user_flower_overrides` and uses the override `image_url` when present, falling back to the global value.

Row Level Security ensures users can only read and write their own override rows.

---

## Adding flower images

- Place images under `public/images/flowers/` and reference them via the `image_url` column in `supabase/seed.sql` (e.g. `/images/flowers/peony.png`).
- Authenticated users can also upload a replacement image from the flower detail page — it is stored in Supabase Storage under `flower-images/{user_id}/{flower_id}.{ext}` and only affects their own view.
- If an image fails to load the UI falls back to `/images/placeholder.svg`.

**Recommended image spec:**

| Property | Value |
|---|---|
| Aspect ratio | 1:1 (square) |
| Recommended size | 800 × 800 px |
| Minimum size | 400 × 400 px |
| Format | WebP or JPEG |
| File size | ≤ 150 KB |

---

## Repository structure

```
src/
  api/          HTTP calls (Supabase client calls)
  components/   Pure UI components (one per folder)
  containers/   Redux connection layer
  domain/       TypeScript interfaces and constants
  layouts/      App-level layout components
  lib/          Shared singletons (Supabase client)
  stores/       RTK slices, selectors, async thunks
  views/        Route entry points (thin wrappers)
supabase/
  migrations/   SQL migrations (run automatically by supabase start)
  seed.sql      100 flowers inserted on first start / db reset
  tests/        SQL RLS unit tests
cypress/
  e2e/          End-to-end test suites
  fixtures/     Stub data for non-auth tests
  support/      Custom Cypress commands
```

---

## Pushing to GitHub

See [PUSHING_TO_GITHUB.md](./PUSHING_TO_GITHUB.md) for step-by-step instructions.
