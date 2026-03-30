#!/bin/bash

# Environment setup script
# Checks for shared secrets first, falls back to .env.example files

SHARED_ENV_DIR="$HOME/.superset/shared-env"
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "Setting up environment files..."

# Root .env
SHARED_ROOT_ENV="$SHARED_ENV_DIR/nairon-website.env"
if [ -f "$SHARED_ROOT_ENV" ]; then
  echo "Found shared secrets at $SHARED_ROOT_ENV"
  cp "$SHARED_ROOT_ENV" "$PROJECT_ROOT/.env"
  echo "Copied shared secrets to $PROJECT_ROOT/.env"
elif [ -f "$PROJECT_ROOT/.env.example" ]; then
  echo "Shared secrets not found, falling back to .env.example"
  cp "$PROJECT_ROOT/.env.example" "$PROJECT_ROOT/.env"
  echo "Copied .env.example to $PROJECT_ROOT/.env"
else
  echo "Warning: No shared secrets or .env.example found for root .env"
fi

# Web app .env.local
SHARED_WEB_ENV="$SHARED_ENV_DIR/nairon-website-web.env"
if [ -f "$SHARED_WEB_ENV" ]; then
  echo "Found shared secrets at $SHARED_WEB_ENV"
  cp "$SHARED_WEB_ENV" "$PROJECT_ROOT/apps/web/.env.local"
  echo "Copied shared secrets to $PROJECT_ROOT/apps/web/.env.local"
elif [ -f "$PROJECT_ROOT/apps/web/.env.example" ]; then
  echo "Shared secrets not found for web, falling back to .env.example"
  cp "$PROJECT_ROOT/apps/web/.env.example" "$PROJECT_ROOT/apps/web/.env.local"
  echo "Copied apps/web/.env.example to apps/web/.env.local"
else
  echo "Warning: No shared secrets or .env.example found for apps/web/.env.local"
fi

echo "Environment setup complete."
