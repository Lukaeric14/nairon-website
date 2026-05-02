---
name: codebase-tour
description: Map a codebase feature-by-feature into a human-readable system tour grounded in real code. Use when the user wants to understand the whole system, onboard quickly into an unfamiliar repo, enumerate major product areas, or create/update high-level architecture, journey, provider, and glossary docs.
---

# Codebase Tour

Guide a code-verified but human-readable tour of a codebase one major feature at a time. This is the high-level onboarding layer: help someone become dangerous fast without drowning them in implementation detail.

Do not trust existing docs as source of truth. Verify from code, config, schemas, jobs, tests, and integrations.

## Quick Start

1. **Pick the doc home**
   - If the repo already has a docs convention, follow it.
   - Otherwise create:
     - `SYSTEM_OVERVIEW.md`
     - `docs/codebase-tour/`
     - `docs/codebase-tour/glossary.md`

2. **Survey the repo**
   - Read root `README.md`, `AGENTS.md`, nearest `SKILLS.md`, package manifests, env examples, schema files, routes, jobs/workers, and E2E tests if present.
   - Identify the 5-10 major distinct areas, such as auth, onboarding, billing, content generation, marketplace, admin ops, analytics, imports, or integrations.

3. **Offer an area picker**
   - Ask which area to map first unless the user already chose.
   - Offer:
     - `quick map`
     - `deep journey debug map`

## Per-Area Workflow

For the chosen area:

1. **Trace the real flow**
   - entry points
   - main actors
   - persistent state and tables/models
   - async jobs/events
   - external providers/webhooks
   - important architecture-shaping libraries only if they materially affect how the system works
   - timeouts, retries, rate limits, and fallback paths
   - admin/internal surfaces
   - existing tests

2. **Write the area doc**
   - Use one doc per area inside the doc home.
   - Prefer this structure:
     - big Mermaid flow diagram
     - mental model
     - plain-English flow
     - state changes
     - providers/platforms
     - notable libraries only when they matter architecturally
     - test checkpoints
     - debug handles
     - review decisions / tradeoffs
     - bugs / questions found

3. **Keep the system index current**
   - Update `SYSTEM_OVERVIEW.md` with:
     - a simple top-level architecture map
     - links to completed area docs
     - current tour progress

4. **Keep the glossary current**
   - Add repeated or confusing terms:
     - user roles
     - object names
     - provider names
     - business states
     - key tables/models with business meaning

## Writing Rules

- Write for a founder, operator, or newly onboarded engineer.
- Use plain language first. Mention code paths only when they materially reduce ambiguity.
- Distinguish:
  - user-visible behavior
  - internal ops behavior
  - background automation
- Call out stale docs/comments when code disagrees.
- When a step feels odd, classify it:
  - intended
  - bug
  - confusing UX
  - ops workaround
  - product debt
  - deliberate tradeoff

## Completion Loop

When one area is done:

1. Say: "You now understand exactly how this area works."
2. Summarize what changed in docs.
3. Call out the top tradeoffs or bugs found.
4. Ask whether to:
   - test this area
   - fix a flagged issue
   - note follow-up and continue
   - switch to the next area

## Output Standard

The tour should make a new developer quickly answer:

- What are the major features of this system?
- How does a user move through one of them?
- What state changes?
- Which providers are involved?
- Where would I look first if this broke?
