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


## Task Workflow (Branches, Push, and Merge Request / Pull Request)

For every new task, follow this exact flow. You can use the provided scripts or the manual commands.

### Option A — Using helper scripts (recommended)
1) Start a task branch from the latest origin/main
- pnpm task:start "feat/short-slug"
  - This will:
    - fetch origin
    - checkout main and pull the latest from origin/main
    - create/switch to your new branch
    - push the branch and set upstream

2) Make your code changes and commit as usual
- git add -A
- git commit -m "feat: describe the change"

3) Publish the branch and open a PR/MR with a templated description
- pnpm task:publish "Title of change"
  - If the remote host is GitHub, this uses gh pr create
  - If the remote host is GitLab, this uses glab mr create
  - If those CLIs aren’t installed, it will print manual steps and a ready-to-use description

### Option B — Manual commands
1) Create/sync branch
- git fetch origin --prune
- git checkout main
- git pull --ff-only origin main
- git checkout -b feat/short-slug main

2) Make changes and push branch
- git add -A && git commit -m "feat: describe the change"
- git push -u origin feat/short-slug

3) Create the PR/MR detailing the changes
- GitHub (with GitHub CLI):
  - gh pr create --base main --head feat/short-slug --title "Title" --body "Describe changes"
- GitLab (with GitLab CLI):
  - glab mr create --source-branch feat/short-slug --target-branch main --title "Title" --description "Describe changes"
- Or open your repository in the browser and create the PR/MR from your branch into main.

Notes
- Our scripts live in scripts/ and are invoked via pnpm scripts defined in package.json.
- Prefer minimal diffs and follow existing conventions (see above sections).
- If your default branch is master locally, scripts will use that automatically.
