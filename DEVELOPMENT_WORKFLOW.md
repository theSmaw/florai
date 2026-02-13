# Development Workflow

## Change Policy
- Prefer minimal diffs.
- Do not introduce new dependencies without explicitly flagging it.
- Do not invent new folder structures; extend existing conventions.

## Code Generation
- Default to creating:
  - selector(s)
  - action(s)
  - slice updates
  - thunk(s) for async work
  - container wiring
  - component updates
- Keep containers thin.
- Keep components reusable and application-agnostic.

## When Unsure
- Ask before changing:
  - existing responsibilities between layers
  - state shape
  - action semantics

