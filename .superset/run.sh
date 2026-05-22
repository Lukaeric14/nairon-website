#!/usr/bin/env bash
# Superset calls this from the Run button.
# Boots the localhost frontend only — apps/web/.env.local already points
# VITE_CONVEX_* at a live Convex deployment, so no local backend is needed.
# We run Vite directly to skip the backend-first env sync in `bun run dev:web`.
set -euo pipefail

WORKSPACE="${SUPERSET_WORKSPACE_PATH:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
cd "$WORKSPACE"

# Export PORT: TanStack Start's nitro dev server binds to the PORT env var,
# not Vite's --port flag, so the value must be in the environment.
export PORT="${SUPERSET_PORT:-3001}"

# Make Run self-sufficient in case setup was skipped.
if [[ ! -d node_modules ]]; then
  echo "==> Dependencies missing; installing"
  bun install
fi
if [[ ! -f apps/web/.env.local ]]; then
  echo "==> Env missing; creating env files"
  bash scripts/setup-env.sh
fi

echo "==> Starting nairon-website frontend on http://127.0.0.1:$PORT"
cd apps/web
exec bun x vite dev --port "$PORT"
