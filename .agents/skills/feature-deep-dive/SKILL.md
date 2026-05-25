---
name: feature-deep-dive
description: Build a code-verified mental model of one feature or subsystem. Use before owning, debugging, changing, reviewing, or redesigning a complex area that needs a technical trace from entry point to data, jobs, providers, failures, and tests.
---

# Feature Deep Dive

Build debug-grade understanding of one feature or subsystem. Do not change code unless the user asks.

One responsibility: make a developer understand one area well enough to debug/change it without guessing.

## Scope

Choose one vertical slice or subsystem only: invite claim, promotion scheduling, content generation callback flow, search ranking, billing checkout, etc.

If the user needs the whole-system map first, use `rebuild-mental-model`. If this trace changes the global model, update or hand off to `rebuild-mental-model`.

## Output

Follow repo conventions first. If none exist, create/update:

- `docs/feature-deep-dives/<feature-slug>.md`
- `CONTEXT.md` if domain language changes and it exists; otherwise `docs/ubiquitous-language.md`

Never include secrets or env values. Provider/env var names are fine.

## Workflow

1. **Frame** - user/business goal, trigger, success condition, core object/state, in/out boundaries.
2. **Trace** - entry point, API/service/helper path, persistence/source of truth, jobs/events, providers/webhooks, permissions, tests.
3. **Pressure-test** - state transitions, idempotency, partial failure, retries, races, legacy behavior, observability, first debug handles.
4. **Update docs** - write the feature doc, update ubiquitous language when terms drift, record global architecture impacts.
5. **Teach/verify** - explain layer by layer, ask for restatement when useful, correct gaps before calling the area understood.

## Feature Doc Contract

- Verification coverage
- Overview
- Actor and boundary map
- Runtime path
- State transitions
- Source of truth
- Providers and external effects
- Permissions and security notes
- Failure modes, retries, and idempotency
- Observability/debug playbook
- Test surface
- Global architecture impact
- Open questions and follow-ups
- Quick recall

## Verification Labels

Mark claims explicitly:

- `verified` - confirmed from code/config/schema/tests.
- `partial` - traced but not end-to-end.
- `not verified` - plausible or doc-derived only.
- `drift` - docs and code disagree.

Never present intended future behavior as current code.

## Quick Recall Contract

End every feature doc with:

```md
## Quick Recall
- What this feature does:
- Main trigger:
- Source of truth:
- Top files/boundaries:
- Top tables/models:
- Providers:
- First debug checks:
- Biggest trap:
- Global architecture impact:
```

## Completion Standard

Before finishing:

- One feature doc is updated.
- Verification labels are present.
- Ubiquitous language is updated or explicitly unchanged.
- Debug handles and tests are named.
- Global architecture impacts are listed, even when the answer is `None`.
