#!/usr/bin/env bash
# Superset calls this once when a nairon-website worktree is created.
# Goal: get the worktree ready so a later Run just boots the frontend.
#   1. Create env files — pull live Convex URLs from Vercel, fall back to
#      ~/.superset/shared-env / .env.example when Vercel is unavailable
#   2. Install dependencies
set -euo pipefail

WORKSPACE="${SUPERSET_WORKSPACE_PATH:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
cd "$WORKSPACE"

echo "==> nairon-website setup: $(basename "$WORKSPACE")"

echo "==> Creating env files (Vercel is source of truth)"
if bash scripts/pull-env-vercel.sh; then
  echo "==> Pulled live env from Vercel"
else
  echo "==> Vercel unavailable; falling back to scripts/setup-env.sh"
  bash scripts/setup-env.sh
fi

echo "==> Installing dependencies"
bun install

echo "==> Setup complete — click Run to start the frontend"
