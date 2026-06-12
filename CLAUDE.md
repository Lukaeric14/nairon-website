# Nairon Website

Full-stack TypeScript monorepo for the Nairon website.

## Structure

```
nairon-website/
├── apps/web/              → TanStack Start frontend (React 19, Vite 7, TailwindCSS 4)
├── packages/backend/      → Convex backend + Better-Auth authentication
├── packages/env/           → Runtime environment variable validation (t3-env + Zod)
├── packages/config/        → Shared TypeScript configuration
├── scripts/                → Dev utility scripts
```

## Tech Stack

- **Frontend**: TanStack Start (SSR), React 19, TailwindCSS 4, shadcn/ui (new-york)
- **Backend**: Convex (reactive BaaS), Better-Auth (email/password auth)
- **Build**: Turborepo, Bun, Vite 7
- **Deployment**: Vercel (Nitro preset)
- **Code Quality**: Biome (linting, formatting, import sorting)

## Commands

```bash
bun run dev          # Start all services (Turborepo)
bun run dev:web      # Start web app only
bun run dev:server   # Start Convex backend only
bun run build        # Build all packages
bun run check-types  # Type-check all packages
```

## Running Locally

Use this order for a clean local boot:

1. `cd packages/backend && bun run dev`
2. Wait for Convex to finish provisioning and writing the repo root `.env.local`
3. `cd apps/web && bun run dev`

The web app syncs `CONVEX_URL` and `CONVEX_SITE_URL` from the repo root into `apps/web/.env.local` before Vite starts.

The backend package script jumps to the repo root before running Convex, because the real Convex app lives in the repo-root `convex/` directory. Do not run raw `bunx convex dev` inside `packages/backend`.

If the frontend ever boots with a placeholder Convex URL, treat that as a setup failure. Start the backend first, then restart the web app.

## Environment Variables

### Root (.env)
- `ANTHROPIC_API_KEY` — Anthropic API key

### Web (apps/web/.env.local)
- `VITE_CONVEX_URL` — Convex deployment URL (required)
- `VITE_CONVEX_SITE_URL` — Convex site URL for auth (required)
- `NODE_ENV` — development | production
- `PORT` — Dev server port (default: 3001)

### Convex Env
- `BRIGHTDATA_API_KEY` — Primary Zillow data source for the property PDF generator
- `BRIGHTDATA_DATASET_ID` — Optional Bright Data dataset override; defaults to the Zillow dataset in code
- `FIRECRAWL_API_KEY` — Optional fallback HTML scraper for Zillow when Bright Data is unavailable
- `OPENAI_API_KEY` — Neighborhood description generation
- `FAL_KEY` — Listing image classification
- `SLACK_WEBHOOK_URL` — Optional Slack notification when a PDF job completes

## Property PDF Generator

The `/for/real-estate/property-pdf` flow runs as a Convex background job:

1. Frontend calls `pdfJob.createJob`
2. Convex background action fetches Zillow data
3. Bright Data dataset is the primary source
4. Firecrawl → Jina → direct fetch are fallback HTML paths only
5. Images are validated and classified
6. OpenAI generates neighborhood copy
7. Frontend subscribes to the job and renders the PDF client-side

## Setup

```bash
./scripts/setup-env.sh   # Create .env files
bun install               # Install dependencies
bun run dev               # Start development
```

## Frontend Development

When working on frontend code (components, pages, styles, animations), always use the `frontend-design` skill from ui-skills for guidance on design quality, typography, motion, and visual polish. Invoke it via `/frontend-design` with the relevant file path and description of what needs to be built or improved.

When working on offer creation, pricing, positioning, copy, lead magnets, funnels, sales messaging, or growth strategy, use the local `hormozi-marketing` skill. It should gather repo and org context first, then query the Hormozi NotebookLM via `agent-browser` only after the business model and current funnel are clear.

## Current Business Truth (2026-06-11)

The Upwork channel is discontinued — its KB, skills, tracker, and pricing logic were removed from this repo (recoverable in git history). Other standing corrections: AI employees run in **cloud sandboxes** (not Mac Minis / a data center), **Flux is retired** (site components pending removal), and the "first AI employee free" hero offer is **under revision** along Hormozi offer-construction principles. The current company onboarding brief lives at `knowledge-base/research/hormozi-notebooklm/md/nairon-onboarding-brief.md`.

## Supermemory

All organizational knowledge (strategy, targets, decisions, processes) lives in Supermemory.
**Always search Supermemory first** when you need context about Nairon.

Use `/claude-supermemory:super-search` to search organizational knowledge.

## Landing the Plane (Session Completion)

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   bd sync
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
