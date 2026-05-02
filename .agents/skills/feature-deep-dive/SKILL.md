---
name: feature-deep-dive
description: Perform a technical end-to-end deep dive on one specific feature, grill the design, and produce a debug-grade map of how it actually works. Use when the user wants to deeply understand one subsystem, trace a feature from UI to data to jobs to providers, stress-test assumptions, or create a technical explainer for a single area.
---

# Feature Deep Dive

Take one feature or subsystem and understand it deeply enough to debug, change, review, or redesign it with confidence. This is the technical layer that comes after a high-level tour.

Do not change code unless the user explicitly asks. Start with understanding.

## Quick Start

1. **Choose one feature only**
   - Narrow the scope to a single vertical slice or subsystem.
   - Examples:
     - invite claim
     - promotion scheduling
     - content generation callback flow
     - search ranking

2. **Choose the doc home**
   - If the repo has a convention, follow it.
   - Otherwise create `docs/feature-deep-dives/<feature-slug>.md`.

3. **Frame the feature before tracing**
   - user goal
   - trigger
   - success condition
   - core business object(s)
   - boundaries

## Deep-Dive Workflow

1. **Trace end-to-end**
   - UI or entry point
   - API or command boundary
   - services/helpers
   - persistence
   - jobs/events/background work
   - external integrations
   - tests and fixtures

2. **Build the technical map**
   - runtime path
   - state machine
   - important types/contracts
   - invariants and assumptions
   - hidden branches
   - retries, idempotency, race conditions
   - permissions and role gates
   - observability and debug handles

3. **Grill the feature**
   - Why is state owned here and not elsewhere?
   - What is the source of truth?
   - What happens on duplicate requests?
   - What happens on partial failure?
   - What behavior is legacy/backcompat?
   - What manual ops step exists because code is weak?
   - What tests would catch the most important regressions?

4. **Separate intended from accidental behavior**
   - intended design
   - current actual behavior
   - bugs
   - product debt
   - risky ambiguity

## Recommended Output

Use sections like:

- overview
- actor and boundary map
- runtime path
- state transitions
- contracts and important types
- failure modes and retries
- permissions and security notes
- observability/debug playbook
- test surface
- questions to ask the team
- top risks / recommended fixes

## Writing Rules

- Be technical, but organized.
- Cite specific files, functions, tables, and tests when useful.
- Prefer diagrams and state tables over long prose.
- Do not confuse "how it should work" with "what the code does today".
- When unsure, verify with code rather than infer.

## Completion Standard

The deep dive should let a strong engineer answer:

- What exactly happens, in order?
- Which files and boundaries matter most?
- What can fail, race, or drift?
- Which assumptions are safe vs shaky?
- What should be tested before changing it?
