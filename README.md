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
- Dev: `pnpm dev`
- Build: `pnpm build`
- Preview: `pnpm preview`
[FlowerList.module.css](src/components/FlowerList.module.css)
## Repository Structure (high level)

- `src/` — Application source code (components, containers, stores, domain)
- `public/` — Static assets
- `dist/` — Build output
- `*.md` — Project documentation (see links above)

---

If you find documentation gaps, please update the relevant `.md` file and link it here to keep this index accurate.