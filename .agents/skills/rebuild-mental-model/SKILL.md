---
name: rebuild-mental-model
description: Rebuild and update the repo's code-verified system mental model. Use when onboarding, refreshing architecture knowledge, or after architecture-affecting changes to flows, providers, data ownership, jobs, auth, runtime boundaries, modules, or domain language.
---

# Rebuild Mental Model

Keep the global system mental model current. Always update docs; this is not a read-only explainer.

One responsibility: make a developer understand how the whole system works today, using code as source of truth.

## Outputs

Follow repo conventions first. If none exist, create/update:

- `ARCHITECTURE.md` - engineer-facing map of runtime surfaces, data ownership, providers, jobs, permissions, deployment/runtime boundaries, and debug entry points.
- `[platform-name]-in-plain-english.md` - plain-language product/system map for new developers, founders, operators, and non-specialists.
- `CONTEXT.md` if it exists; otherwise `docs/ubiquitous-language.md` - canonical domain language, provider names, roles, object names, states, and overloaded terms.

Never include secrets or env values. Provider/env var names are fine.

## When To Run

Run when the user asks to rebuild, refresh, update, tour, onboard, or understand the whole system. Also run after architecture-affecting changes:

- core flows or user journeys
- providers, integrations, webhooks, auth vendors, payments, email, storage, AI, or analytics
- data model, schema, source-of-truth ownership, or state machines
- auth, permissions, roles, tenancy, or access rules
- jobs, queues, scheduled work, retries, or async behavior
- deployment/runtime boundaries, apps, packages, services, or worker topology
- major folder/module ownership
- domain terms or ubiquitous language

Skip typo-only, styling-only, or isolated implementation changes that do not alter the system model.

## Workflow

1. **Survey** - read root docs, agent guides, package manifests, env examples, schemas, routes, jobs, tests, and integration config. Existing docs are hints, not truth.
2. **Extract** - identify actors, core journeys, data objects, state ownership, providers, background work, and runtime boundaries. Prefer compact maps over source narration.
3. **Update** - revise all output docs. Preserve useful content; replace stale claims.
4. **Label confidence** - use `verified`, `partial`, `not verified`, or `drift`. Never present future/target architecture as current code.
5. **Compose** - hand off subsystem mastery to `feature-deep-dive`; refactor opportunity analysis to `improve-codebase-architecture`; teach from updated docs if the user wants a walkthrough.

## Doc Contracts

### `ARCHITECTURE.md`

- Verification coverage
- System overview
- Apps/packages/services
- Core flows
- Data model and source-of-truth ownership
- Providers and integrations
- Jobs, queues, and async work
- Auth, permissions, and roles
- Runtime/deployment boundaries
- Debug entry points
- Known drift, gaps, and follow-ups

### Plain-English Doc

- What this platform does
- Who uses it
- Main journeys
- Important objects and states
- Providers in plain English
- What happens when common things break
- Terms to know

### Ubiquitous Language

- Term
- Meaning
- Where it appears in code/docs
- Preferred usage
- Deprecated or confusing aliases

## Completion Standard

Before finishing:

- Docs are updated.
- Verification labels are present.
- Ubiquitous language is updated or explicitly unchanged.
- Architecture-affecting gaps are listed.
- Any needed `feature-deep-dive` or `improve-codebase-architecture` handoff is named.
