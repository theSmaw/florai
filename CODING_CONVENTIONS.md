# Coding Conventions

## Folder Structure
Use these standard top-level groupings (naming can be adapted, intent must remain):

- `components/` — reusable UI controls (no business logic)
- `containers/` — orchestration layer, binds UI to app state
- `views/` — page templates for routes
- `stores/` — actions, thunks, slices/reducers, selectors
- `api/` — client API methods
- `hooks/` — reusable, non-domain hooks
- `domain/` (optional) — project-specific concepts/types

## Layer Rules (non-negotiable)
- Components must not talk to stores or APIs.
- Containers must not talk to APIs directly.
- Async/network work goes in thunks/effects only.
- State is read via selectors only.
- Reducers/slices are pure.

## Naming
- Actions describe what happened:
  - `FOO_CLICKED`, `USER_SIGNED_OUT`, `FILTER_CHANGED`
- Thunks describe what should happen:
  - `fetchOrders`, `saveReport`, `syncQueue`
- Selectors start with `select`:
  - `selectCurrentUser`, `selectOrders`, `selectIsAuthenticated`

## File Size / Complexity
- Prefer small files with single responsibility.
- Split when a file becomes difficult to scan.

## Error Handling
- API layer normalizes errors.
- Thunks map errors into store state.
- UI renders state; it doesn't interpret raw API errors.

## "Avoid Turbulence"
- No data fetching in components.
- Avoid "smart hooks" that become mini-stores.
- Keep the cycle obvious and traceable.



## No barrel files (index.ts re-exports)

We do not use barrel files (index.ts that re-export from sibling modules). Always import from the concrete module you need.

Rationale:
- Improves clarity and discoverability; imports show the real source file.
- Reduces risk of circular dependencies and weird tree-shaking side effects.
- Speeds up IDE navigation and refactoring.

Do this:
- import { flowersSlice } from '../stores/flowers/slice'
- import { selectFilteredFlowers } from '../stores/flowers/selectors'

Do NOT do this:
- import { selectFilteredFlowers, flowersSlice } from '../stores/flowers' // via index.ts
- Create index.ts files whose sole purpose is to re-export other files.

Enforcement:
- Code review: reject PRs that introduce index.ts barrels.
- Prefer explicit, file-level imports throughout the codebase.
