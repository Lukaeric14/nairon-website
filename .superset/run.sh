#!/usr/bin/env bash
# Superset calls this from the Run button.
# Boots the localhost frontend only — apps/web/.env.local already points
# VITE_CONVEX_* at a live Convex deployment, so no local backend is needed.
# We run Vite directly to skip the backend-first env sync in `bun run dev:web`.
set -euo pipefail

WORKSPACE="${SUPERSET_WORKSPACE_PATH:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
cd "$WORKSPACE"

# Pick the port:
# - Under Superset, SUPERSET_PORT is assigned per-workspace and Superset routes
#   to that exact port, so we honor it as-is (no scanning).
# - Run manually, we scan upward from 3001 for the first free port, so booting
#   alongside other local processes never collides.
first_free_port() {
  local port="$1"
  while lsof -nP -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1; do
    port=$((port + 1))
  done
  echo "$port"
}

if [[ -n "${SUPERSET_PORT:-}" ]]; then
  PORT="$SUPERSET_PORT"
else
  PORT="$(first_free_port "${PORT:-3001}")"
fi

# Export PORT: TanStack Start's nitro dev server binds to the PORT env var,
# not Vite's --port flag, so the value must be in the environment.
export PORT

# Make Run self-sufficient in case setup was skipped.
if [[ ! -d node_modules ]]; then
  echo "==> Dependencies missing; installing"
  bun install
fi
if [[ ! -f apps/web/.env.local ]]; then
  echo "==> Env missing; pulling from Vercel"
  bash scripts/pull-env-vercel.sh || bash scripts/setup-env.sh
fi

echo "==> Starting nairon-website frontend on http://127.0.0.1:$PORT"
cd apps/web
exec bun x vite dev --port "$PORT"
