# FlorAI

A React + Redux Toolkit + Vite project. This repository includes comprehensive Markdown documentation to guide setup, architecture decisions, coding conventions, migrations, and key feature implementations.

## Project Documentation

The following Markdown files serve as the primary source of truth for context and guidance. Start here when working on or reviewing the project:

- [FLORAI_SETUP.md](./FLORAI_SETUP.md) — Environment setup, scripts, and getting started
- [ARCHITECTURE.md](./ARCHITECTURE.md) — System architecture, laminar flow patterns, and design rationale
- [CODING_CONVENTIONS.md](./CODING_CONVENTIONS.md) — Naming, structure, and style conventions used across the codebase
- [DEVELOPMENT_WORKFLOW.md](./DEVELOPMENT_WORKFLOW.md) — Branching, PR guidelines, and review process
- [REACT_CONVERSION.md](./REACT_CONVERSION.md) — Notes on React migration and component patterns
- [REDUX_MIGRATION.md](./REDUX_MIGRATION.md) — Steps and decisions around Redux migration
- [REDUX_TOOLKIT_INTEGRATION.md](./REDUX_TOOLKIT_INTEGRATION.md) — RTK store setup, slices, and query usage
- [REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md) — Summary of refactors and their motivations
- [CATALOGUE_IMPLEMENTATION.md](./CATALOGUE_IMPLEMENTATION.md) — Catalogue feature design and implementation details

If you are exploring or modifying features in `src/`, consult the relevant document(s) above first for background and intended design patterns.

## Where these docs are referenced

- Internal references exist across docs (e.g., Catalogue docs point to Architecture and Conventions).
- This README serves as the primary entry point to discover all project docs in one place.

## Quick Start

- Install: `pnpm install` (or `npm install`/`yarn`)
- Dev: requires **two terminals** running simultaneously:
  - Terminal 1 — UI: `pnpm dev`
  - Terminal 2 — Mock API: `pnpm dev:api` (json-server on port 3001)
- Build: `pnpm build`
- Preview: `pnpm preview`
[FlowerList.module.css](src/components/FlowerList.module.css)

## Pushing to GitHub

See PUSHING_TO_GITHUB.md for step-by-step instructions (HTTPS/SSH/GitHub CLI) and troubleshooting.
Quick commands (replace <OWNER>/<REPO>):
- git init -b main  # if not already a git repo
- git add . && git commit -m "chore: initial push"
- git remote add origin https://github.com/<OWNER>/<REPO>.git
- git push -u origin main

## Repository Structure (high level)

- `src/` — Application source code (components, containers, stores, domain)
- `public/` — Static assets
- `dist/` — Build output
- `*.md` — Project documentation (see links above)

---

If you find documentation gaps, please update the relevant `.md` file and link it here to keep this index accurate.

## Images

### Adding images manually

- Where to put files: Place images under `public/images/flowers/` and reference them via the `imageUrl` field in `db.json` (e.g., `/images/flowers/<id>.jpg`).
- Fallback: If an image fails to load or is missing, the UI falls back to `/images/placeholder.svg`.

Recommended dimensions and format
- Aspect ratio: Square (1:1). The FlowerCard enforces a square media area on desktop and uses `object-fit: cover`, so square sources avoid unwanted cropping.
- Source size (recommended): 800 × 800 px. Balanced for catalogue thumbnails and high‑DPI screens without excessive weight.
- Minimum size: 400 × 400 px. Matches the intrinsic width/height hints used by the `<img>` tag; smaller images may look soft on retina displays.
- File format: WebP or JPEG preferred (for photos). PNG is acceptable but typically larger.
- File size target: Aim for ≤ 150 KB per image (ideally ≤ 100 KB) after compression.

Behavior and tips
- Catalogue lists may render many thumbnails; prefer compressed WebP and keep dimensions small to reduce payload.
- Mobile/tablet: The media area height is clamped and uses `object-fit: cover`, so non‑square images may be cropped. Keep the subject centered.
- Desktop: A strict 1:1 aspect ratio is applied to the card media area.
- Naming: Use the flower id in the filename to match `db.json` (e.g., `1.jpg`, `2.webp`).
- Paths: Use a leading slash path from `public/` (e.g., `/images/flowers/5.jpg`).


## Prisma (ORM) Quick Start

This repo includes a ready-to-use Prisma setup targeting SQLite for easy local development.

Prereqs: ensure dependencies are installed (pnpm install) so prisma and @prisma/client are available.

1) Environment
- Copy .env.example to .env
- Default uses SQLite at file:./dev.db

2) Generate client and create DB schema
- pnpm prisma:generate
- pnpm prisma:push  # creates dev.db based on prisma/schema.prisma

3) Seed database (from db.json)
- pnpm prisma:seed

4) Test a simple query
- pnpm prisma:test  # prints count and first Flower

5) Explore data visually (optional)
- pnpm prisma:studio

6) Create a GitHub Pull Request (mandatory)
- Direct PRs page for this repo: https://github.com/theSmaw/florai/pulls
- One‑command PR (from your current feature branch):
  - pnpm pr:create
- Create/switch to a feature branch, push it, and open a PR to main:
  - git checkout -b feat/prisma-setup
  - git add -A && git commit -m "chore(prisma): add Prisma ORM setup, seed, and docs"
  - git push -u origin feat/prisma-setup
  - Using GitHub CLI (recommended):
    - gh pr create --base main --head feat/prisma-setup --title "chore(prisma): add Prisma ORM setup" --body "Adds Prisma deps, scripts, seed from db.json, .env.example, and README docs."
  - Or open your repo on GitHub and create the PR from branch feat/prisma-setup into main.
  - Direct compare link for this branch name: https://github.com/theSmaw/florai/compare/main...feat/prisma-setup
- See DEVELOPMENT_WORKFLOW.md and PUSHING_TO_GITHUB.md for full PR workflow details.

Notes
- Schema lives at prisma/schema.prisma (model: Flower). Seed script is prisma/seed.mjs, importing flowers from db.json.
- For Postgres later, update datasource in prisma/schema.prisma and DATABASE_URL in .env, then run pnpm prisma:migrate.
