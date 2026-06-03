#!/usr/bin/env bash
# Pull live env vars from the Vercel project into apps/web/.env.local.
#
# Why this exists: the deployed Convex URLs (VITE_CONVEX_URL / VITE_CONVEX_SITE_URL)
# live in the `nairon-website` Vercel project. Pulling them means a fresh clone or
# worktree can boot the frontend against the live backend with zero manual setup —
# no shared-env file to keep in sync, no per-machine secrets to copy.
#
# Contract: exits 0 on success, non-zero if Vercel is unavailable (CLI missing or
# not logged in) so the caller can fall back to scripts/setup-env.sh. The `.vercel`
# link dir is gitignored, so each worktree links itself on first run.
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WEB_ENV="$PROJECT_ROOT/apps/web/.env.local"
VERCEL_PROJECT="nairon-website"
VERCEL_SCOPE="nairon-ai"
ENVIRONMENT="${VERCEL_ENV_TARGET:-development}"

cd "$PROJECT_ROOT"

if ! command -v vercel >/dev/null 2>&1; then
  echo "[pull-env-vercel] Vercel CLI not found (install: npm i -g vercel); skipping" >&2
  exit 1
fi

if ! vercel whoami >/dev/null 2>&1; then
  echo "[pull-env-vercel] Not logged in to Vercel (run: vercel login); skipping" >&2
  exit 1
fi

echo "[pull-env-vercel] Linking $VERCEL_SCOPE/$VERCEL_PROJECT"
vercel link --yes --project "$VERCEL_PROJECT" --scope "$VERCEL_SCOPE" >/dev/null

echo "[pull-env-vercel] Pulling '$ENVIRONMENT' env -> apps/web/.env.local"
vercel env pull "$WEB_ENV" --environment "$ENVIRONMENT" --yes >/dev/null

echo "[pull-env-vercel] Done"
