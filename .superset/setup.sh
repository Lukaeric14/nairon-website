#!/usr/bin/env bash
# Superset calls this once when a nairon-website worktree is created.
# Goal: get the worktree ready so a later Run just boots the frontend.
#   1. Create env files (pulls Convex URLs from ~/.superset/shared-env)
#   2. Install dependencies
set -euo pipefail

WORKSPACE="${SUPERSET_WORKSPACE_PATH:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
cd "$WORKSPACE"

echo "==> nairon-website setup: $(basename "$WORKSPACE")"

echo "==> Creating env files"
bash scripts/setup-env.sh

echo "==> Installing dependencies"
bun install

echo "==> Setup complete — click Run to start the frontend"
