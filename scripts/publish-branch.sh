#!/usr/bin/env bash
set -euo pipefail

# publish-branch.sh
# Usage:
#   ./scripts/publish-branch.sh ["Title for PR/MR"]
# Behavior:
#   - Ensures git repo and origin exist
#   - Ensures you are not on main/master
#   - Pushes current branch (sets upstream if missing)
#   - Creates a PR (GitHub via gh) or MR (GitLab via glab) with a templated description
#   - Falls back to printing manual instructions if CLIs are unavailable

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

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ -z "${BRANCH}" ]; then
  echo "Error: could not determine current branch" >&2
  exit 1
fi

DEFAULT_MAIN="main"
if git show-ref --verify --quiet refs/heads/master; then
  DEFAULT_MAIN="master"
fi

if [ "${BRANCH}" = "${DEFAULT_MAIN}" ]; then
  echo "You are on ${DEFAULT_MAIN}. Please create a feature branch first (./scripts/start-task.sh)." >&2
  exit 1
fi

# Ensure branch is pushed and upstream set
if git rev-parse --abbrev-ref --symbolic-full-name @{u} >/dev/null 2>&1; then
  echo "Upstream already set for ${BRANCH}. Pushing latest commits..."
  git push
else
  echo "Pushing branch and setting upstream..."
  git push -u origin "${BRANCH}"
fi

TITLE="${1-}"
if [ -z "${TITLE}" ]; then
  TITLE="${BRANCH}: summary of changes"
fi

TMP_BODY="$(mktemp)"
trap 'rm -f "$TMP_BODY"' EXIT

cat >"${TMP_BODY}" <<'EOF'
Summary
- Briefly describe the problem and the solution.

Changes
- [ ] What changed and why
- [ ] Any migrations or config updates

Testing
- [ ] Steps to verify behavior (include screenshots/gifs if UI)

Risks & Rollback
- [ ] Potential impact and rollback plan

Checklist
- [ ] Updated docs where relevant
- [ ] Added/updated tests (if applicable)
- [ ] Verified build and storybook
EOF

REMOTE_URL="$(git remote get-url origin)"
LOWER_URL="$(printf '%s' "$REMOTE_URL" | tr '[:upper:]' '[:lower:]')"

if [[ "$LOWER_URL" == *"github.com"* ]]; then
  if command -v gh >/dev/null 2>&1; then
    echo "Creating GitHub Pull Request via gh..."
    gh pr create --base "$DEFAULT_MAIN" --head "$BRANCH" --title "$TITLE" --body-file "$TMP_BODY" || {
      echo "gh pr create failed. You may need to authenticate: gh auth login" >&2
      exit 1
    }
    echo "Pull Request created."
    exit 0
  else
    echo "GitHub remote detected but 'gh' CLI not found. Manual steps:"
  fi
elif [[ "$LOWER_URL" == *"gitlab"* ]]; then
  if command -v glab >/dev/null 2>&1; then
    echo "Creating GitLab Merge Request via glab..."
    glab mr create --source-branch "$BRANCH" --target-branch "$DEFAULT_MAIN" --title "$TITLE" --description-file "$TMP_BODY" || {
      echo "glab mr create failed. You may need to authenticate: glab auth login" >&2
      exit 1
    }
    echo "Merge Request created."
    exit 0
  else
    echo "GitLab remote detected but 'glab' CLI not found. Manual steps:"
  fi
fi

# Fallback manual instructions
REPO_HTTP="${REMOTE_URL}"
# Convert SSH to HTTPS for convenience
if [[ "$REPO_HTTP" =~ ^git@([^:]+):(.+)\.git$ ]]; then
  HOST="${BASH_REMATCH[1]}"
  PATH_PART="${BASH_REMATCH[2]}"
  REPO_HTTP="https://${HOST}/${PATH_PART}"
fi

echo "1) Open: ${REPO_HTTP}"
echo "2) Create a Pull/Merge Request from '${BRANCH}' into '${DEFAULT_MAIN}'"
echo "3) Use this title: ${TITLE}"
echo "4) Use the following description template:" 
cat "$TMP_BODY"
