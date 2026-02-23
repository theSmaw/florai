# Pushing This Project to GitHub

This guide helps you publish the current codebase to a new or existing GitHub repository.

Prerequisites
- Have a GitHub account
- Git installed and configured (name/email)
  - git config --global user.name "Your Name"
  - git config --global user.email "you@example.com"
- Optional: GitHub CLI installed (gh) and authenticated: gh auth login

1) Create a GitHub repository
Option A — via web
1. Go to https://github.com/new
2. Choose the owner and repository name (e.g., florai)
3. Do NOT initialize with a README/.gitignore/license (this repo already has those)
4. Click Create repository and copy the remote URL (HTTPS or SSH)

Option B — via GitHub CLI (creates repo from this folder)
- Private repo: gh repo create <OWNER/REPO> --private --source . --remote origin --push
- Public repo: gh repo create <OWNER/REPO> --public --source . --remote origin --push

2) Initialize (if needed), commit, set main, and push
Run these from the project root in your terminal.

Check if this is already a git repo:
- git rev-parse --is-inside-work-tree && echo "Git repo already initialized" || git init -b main

Ensure default branch is main (if repo already existed):
- git branch -M main

Add and commit your current work (if needed):
- git add .
- git commit -m "chore: initial push"

Add the GitHub remote (replace with your repo URL):
- HTTPS: git remote add origin https://github.com/<OWNER>/<REPO>.git
- SSH:   git remote add origin git@github.com:<OWNER>/<REPO>.git

If a remote named origin already exists, update it:
- git remote set-url origin https://github.com/<OWNER>/<REPO>.git

Push the main branch:
- git push -u origin main

3) Alternative: push with GitHub CLI in one command
If you didn’t use the web flow above:
- gh repo create <OWNER>/<REPO> --private --source . --remote origin --push

4) Authentication, 2FA, and Personal Access Tokens (PAT)
- HTTPS with 2FA: use a Personal Access Token (classic) with the repo scope as the password when prompted: https://github.com/settings/tokens
- SSH: add your SSH key to GitHub: https://github.com/settings/keys
- GitHub CLI usually handles auth for you: gh auth login

5) Verify
- git remote -v  # shows your origin URL
- git log --oneline -5
- Visit https://github.com/<OWNER>/<REPO> to confirm files are present

Troubleshooting
- Remote already exists: git remote set-url origin <URL>
- Wrong default branch: git branch -M main && git push -u origin main
- Rejected non-fast-forward: you may need to pull or force-with-lease if the remote has unrelated history. If this is a fresh remote you control, you can:
  - git push -u origin main --force-with-lease
- Large files rejected: use .gitignore (already in this repo), or Git LFS if truly necessary.
- Accidentally committed secrets: rotate credentials immediately and remove them from history (git filter-repo or BFG). This repo ignores .env by default; keep secrets in .env and commit .env.example instead.

Notes
- This project uses pnpm by default; adjust commands for npm/yarn if preferred.
- The .gitignore is configured to avoid pushing build artifacts, environment files, and editor detritus.

6) Create a Pull Request (required)
- Direct PRs page for this repo: https://github.com/theSmaw/florai/pulls
- One‑command PR (from your current feature branch):
  - pnpm pr:create
All changes — including infrastructure changes like adding Prisma ORM — must go through a Pull Request into main.

Option A — Using GitHub CLI (recommended)
- Ensure you have a feature branch and your commits:
  - git checkout -b feat/prisma-setup
  - git add -A && git commit -m "chore(prisma): add Prisma ORM setup, seed, and docs"
  - git push -u origin feat/prisma-setup
- Create the PR targeting main:
  - gh pr create --base main --head feat/prisma-setup \
      --title "chore(prisma): add Prisma ORM setup" \
      --body "Adds Prisma deps, scripts, seed from db.json, .env.example, and README/PUSHING_TO_GITHUB docs."

Option B — Manual (without CLI)
- Open https://github.com/theSmaw/florai/compare/main...feat/prisma-setup in your browser
- Fill in the title and description, then open the PR to main

Notes
- See DEVELOPMENT_WORKFLOW.md for our standard branch/PR process and helper scripts (pnpm task:start, pnpm task:publish).
- If you just completed the steps in README’s Prisma Quick Start, open the PR now following the commands above.


## Automation
- New: When you push any non-main branch, a GitHub Action (.github/workflows/auto-pr.yml) will automatically open a Pull Request to `main` if one does not already exist for that branch.
- You can still run `pnpm pr:create` locally to push and open a PR immediately with a custom title/body.


## Claude Code GitHub Action Setup
This repository includes a workflow to let Claude read, review, and act on Pull Requests and comments.

Files added:
- .github/workflows/claude.yml

What it does:
- Auto-reviews every non-draft PR when it is opened or marked ready, posting inline and summary comments.
- Responds to @claude mentions in any PR comment, review comment, or issue — Claude will act on the request (fix code, answer questions, create PRs, etc.).

Prerequisites:
- Add your Anthropic API key as a repository secret named ANTHROPIC_API_KEY:
  Settings → Secrets and variables → Actions → New repository secret

Usage:
- Mention @claude anywhere in a PR or issue comment to trigger a response.
  Examples:
    "@claude fix the TypeScript error on line 42"
    "@claude review the security of this change"
    "@claude implement the requested changes and push"
- Every new non-draft PR will receive an automatic code review without any manual trigger.

Troubleshooting:
- If Claude does not respond, check the Actions tab for the "Claude Code" workflow run logs.
- Confirm ANTHROPIC_API_KEY is set correctly under Settings → Secrets → Actions.
- Ensure the workflow has pull-requests: write and issues: write permissions (already configured).

For full documentation see: https://github.com/anthropics/claude-code-action
