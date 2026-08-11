# Nairon Website

This is the main repo for the Nairon website (naironai.com).

## Structure

```
nairon-website/
├── site/                    → THE WEBSITE. Astro 7 + Tailwind 4. This is what ships.
├── brand/                   → Brand source of truth (STRATEGY.md, DESIGN.md, style bible, moodboard)
├── convex/                  → Convex backend (waitlist, newsletter, contact, email)
├── packages/backend/        → Better-Auth config for Convex
├── packages/env/            → Runtime env validation (t3-env + Zod)
├── packages/config/         → Shared TypeScript config
├── docs/website-v2/         → Design + build decision log for the current site
├── archive/legacy-design/   → ARCHIVED. Old TanStack site, kept for design/UI reference only.
│                              Not built, not deployed, not a workspace. Do not import from it.
└── scripts/                 → Dev utility scripts
```

### History — read this before you get confused

Until 2026-08, this repo held a TanStack Start + React site. The live site was rebuilt from
scratch as a separate Astro project (the `Nairon-AI/website-v2` repo) and went live on
naironai.com on 2026-08-05.

In 2026-08 that Astro site was brought into this repo as `site/`, and this repo became the
single home for the website again. The old TanStack frontend was moved to
`archive/legacy-design/` and kept **only as a visual/design reference** — the components,
layouts and styling are worth looking at, but nothing there is live and nothing should import
from it.

Four features from the old site were deliberately dropped and are **not** in the current site:
Hive desktop download (`/download`), the property-PDF generator, the careers admin + job
application form, and `/brandkit` + `/pitch-deck`. If someone asks where those went, they were
dropped on purpose — the code is in `archive/legacy-design/`.

## Tech Stack

- **Site**: Astro 7, Tailwind CSS 4, GSAP + Motion, React 19 islands, MDX content collections
- **Backend**: Convex (waitlist / newsletter / contact), Better-Auth
- **Deployment**: Vercel (static Astro output)
- **Package managers**: `site/` uses npm (has its own `package-lock.json`). The repo root uses
  Bun workspaces for `packages/*`. `site/` is deliberately **not** a Bun workspace — don't add it.

## Commands

```bash
bun run dev          # Start the website dev server (Astro)
bun run dev:site     # Same thing, explicit
bun run dev:server   # Start Convex backend only
bun run build        # Build the website → site/dist (74 pages)
bun run build:backend # Build the Convex packages via Turborepo
bun run check-types  # Type-check the backend packages
```

Working directly in `site/` also works: `cd site && npm run dev`.

Node >= 22.12 is required by `site/package.json`.

## Deployment

Vercel builds from the repo root using the root `vercel.json`, which shells into `site/`:

- install: `npm --prefix site ci`
- build: `npm --prefix site run build`
- output: `site/dist`

Only `main` deploys (`git.deploymentEnabled` in `vercel.json`). `site/vercel.json` is the
original config from the standalone repo and is kept for reference — the **root** one is the
one Vercel actually reads.

Alternative if you prefer: set the Vercel project's Root Directory to `site` and let
`site/vercel.json` take over. Don't do both.

## Environment Variables

### Site (site/.env)
- `PUBLIC_NEWSLETTER_WEBHOOK` — where the newsletter form POSTs. This is **not** Convex; it's an
  external webhook set in the Vercel project. Check Vercel before assuming it's broken.

### Convex Env
- `SLACK_WEBHOOK_URL` — optional Slack notification
- `RESEND_API_KEY` — transactional email via `@convex-dev/resend`

Convex exposes only two HTTP routes (`convex/http.ts`): `GET /health` and `POST /waitlist`.
The waitlist endpoint serves the Hive product, not this website.

Dormant Convex functions left over from the dropped features: `pdfJob.ts`,
`careerApplications.ts`. They are not called by the current site. Safe to delete when someone
confirms nothing else uses them.

## Content

Academy lessons are MDX/Markdown content collections in `site/src/content/academy/` with topic
groupings in `site/src/content/academy-topics/`. There's an ingest script in `site/scripts/`.
Page routes live in `site/src/pages/`, sections in `site/src/components/sections/`.

## Frontend Development

When working on frontend code (components, pages, styles, animations), always use the
`frontend-design` skill from ui-skills for guidance on design quality, typography, motion, and
visual polish. Invoke it via `/frontend-design` with the relevant file path and description of
what needs to be built or improved.

Before changing how the site looks, read `brand/DESIGN.md` and check `docs/website-v2/DECISIONS.md`
— it has a "DO NOT FIX" list of things that look wrong but are intentional.

When working on offer creation, pricing, positioning, copy, lead magnets, funnels, sales
messaging, or growth strategy, use the local `hormozi-marketing` skill. It should gather repo and
org context first, then query the Hormozi NotebookLM via `agent-browser` only after the business
model and current funnel are clear.

## Current Business Truth (2026-06-11)

The Upwork channel is discontinued — its KB, skills, tracker, and pricing logic were removed from
this repo (recoverable in git history). Other standing corrections: AI employees run in **cloud
sandboxes** (not Mac Minis / a data center), **Flux is retired**, and the "first AI employee free"
hero offer is **under revision** along Hormozi offer-construction principles. The current company
onboarding brief lives at `knowledge-base/research/hormozi-notebooklm/md/nairon-onboarding-brief.md`.

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
