# Mandatory gap analysis

Run this after the normal decision frontier first becomes empty. The first pass is mandatory for every session.

## Fixed-order pass

Inspect these categories in this exact order:

1. **User types** — affected roles, permissions, skill levels, account states, and excluded users.
2. **Contexts of use** — devices, environments, workflows, timing, geography, connectivity, and operational conditions.
3. **Unexpected inputs and system failures** — invalid, missing, duplicated, stale, hostile, or oversized inputs; dependency, network, storage, queue, and partial failures.
4. **User error** — reasonable mistakes, recovery, undo, warnings, destructive actions, and whether the product teaches the right path.
5. **Feature interactions** — adjacent features, flags, permissions, lifecycle states, integrations, migrations, analytics, and notifications.
6. **Load** — realistic concurrency, data size, traffic, retries, backlogs, rate limits, and resource pressure.
7. **Security and privacy** — access control, tenant boundaries, secret exposure, sensitive data, retention, abuse, audit, and compliance constraints.
8. **Accessibility** — keyboard, screen reader, focus, semantics, contrast, motion, zoom, touch, cognitive load, and error communication.

For repository-aware work, invoke `blast-radius` after category 8 when available; otherwise do its pass directly. Without a diff, treat proposed scope and behavior as the change. Inspect breakage beyond obvious callers and prove the cheapest safety-critical fact with existing tests, runtime checks, or temporary proof. During grilling, do not edit product files merely for proof; mark unproven facts.

## Adapt depth without skipping coverage

For each category, record one status in the decision log:

- `clear` — evidence shows no material gap
- `gap` — a decision, investigation, or safeguard is needed
- `not applicable` — a concrete reason makes it irrelevant
- `deferred` — named owner, reason, and consequence

Use a materiality gate. Create a frontier question only when its answer could change scope, acceptance criteria, safety, customer experience, cost, operations, or the recommended fix. Do not manufacture remote edge cases, generic enterprise requirements, or scale the product does not plausibly face.

Every gap-analysis pass still scans all eight categories in order. Run another pass only when answers or new evidence changed actors, contexts, inputs, failure modes, interactions, scale, security/privacy, accessibility, or blast radius. Stop when a full pass produces no new material gap.

This makes simple work cheap: one brief pass may add zero questions. Complex work may create as many normal question rounds as necessary, still capped at 10 questions per round.
