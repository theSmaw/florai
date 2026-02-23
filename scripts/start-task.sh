#!/usr/bin/env bash
set -euo pipefail

# start-task.sh
# Usage:
#   ./scripts/start-task.sh "feat/some-task"    # optional; will prompt if omitted
# Behavior:
#   - Ensures git repo and remote origin exist
#   - Fetches latest origin/main
#   - Checks out local main and pulls latest
#   - Creates and switches to the new branch from main
#   - Pushes branch and sets upstream

if ! command -v git >/dev/null 2>&1; then
  echo "Error: git is not installed or not in PATH" >&2
  exit 1
fi

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Error: not inside a git repository" >&2
  exit 1
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  echo "Error: no 'origin' remote configured. Please add one first (see PUSHING_TO_GITHUB.md)." >&2
  exit 1
fi

BRANCH_NAME="${1-}"
if [ -z "${BRANCH_NAME}" ]; then
  read -r -p "Enter new branch name (e.g., feat/short-slug): " BRANCH_NAME
fi

if [ -z "${BRANCH_NAME}" ]; then
  echo "Error: branch name is required" >&2
  exit 1
fi

# Update main from origin/main
DEFAULT_MAIN="main"
if git show-ref --verify --quiet refs/heads/master; then
  DEFAULT_MAIN="master"
fi

echo "Fetching latest from origin..."
git fetch origin --prune

echo "Checking out ${DEFAULT_MAIN} and pulling latest..."
git checkout "${DEFAULT_MAIN}"
git pull --ff-only origin "${DEFAULT_MAIN}"

# Create/switch to branch
if git show-ref --verify --quiet "refs/heads/${BRANCH_NAME}"; then
  echo "Branch ${BRANCH_NAME} already exists locally. Switching to it..."
  git checkout "${BRANCH_NAME}"
else
  echo "Creating new branch ${BRANCH_NAME} from ${DEFAULT_MAIN}..."
  git checkout -b "${BRANCH_NAME}" "${DEFAULT_MAIN}"
fi

# Push branch and set upstream
if git rev-parse --abbrev-ref --symbolic-full-name @{u} >/dev/null 2>&1; then
  echo "Upstream already set for ${BRANCH_NAME}."
else
  echo "Pushing branch and setting upstream..."
  git push -u origin "${BRANCH_NAME}"
fi

echo "\nBranch ready: ${BRANCH_NAME}"
echo "Next: make your changes, commit, then run: ./scripts/publish-branch.sh"
