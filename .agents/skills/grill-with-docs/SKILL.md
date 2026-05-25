---
name: grill-with-docs
description: Default grilling skill for coding work in an existing repo/codebase. Challenges the plan against code, sharpens shared domain language, and updates CONTEXT.md/ADRs inline. Prefer over grill-me whenever durable repo context, domain terms, implementation behavior, or architectural decisions matter.
---

<what-to-do>

Interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one. For each question, provide your recommended answer.

Ask the questions one at a time, waiting for feedback on each question before continuing.

If a question can be answered by exploring the codebase, explore the codebase instead.

Before asking any real question, scan the repository to confirm current behavior, implementation shape, existing glossary terms, and relevant ADRs.

That scan should:
- identify the files, modules, routes, components, schemas, tests, context docs, or ADRs most relevant to the topic
- confirm what the system appears to do today rather than relying on assumptions
- note gaps where behavior, terminology, or decision history is unclear

Do not start grilling from pure speculation if the repo can answer part of the question first.

Before the first real question, estimate:
- total questions currently expected
- estimated time to finish the grilling

Also briefly summarize what you found in the codebase, glossary, and ADRs that is most relevant to the grilling.

When you start asking questions, every question must include progress in this format:

```text
Question: 12 / 23
Estimated time left: ~6 minutes
```

If the decision tree expands and the total question count changes, say so explicitly and update the progress numbers rather than pretending the original estimate was fixed.

Along with each question, strongly prefer including a small diagram that helps the developer visualize the options. Use either:
- a simple ASCII diagram
- a compact flow diagram
- a branch diagram showing the current decision and downstream consequences

Keep diagrams tight and decision-oriented. They should clarify the choice, not decorate the answer.

For every question that relates to existing code or docs, include a short context block that names the relevant file and shows a short snippet. Keep snippets short and only include the minimum needed to orient the developer.

Use a structure like:

```text
Question: 4 / 17
Estimated time left: ~5 minutes

Context: src/billing/checkout.ts
Snippet:
  if (plan === "pro") {
    return createStripeCheckoutSession(...)
  }
```

If the question is tied to multiple implementation or documentation points, mention the primary file first and optionally list 1-2 secondary files, tests, context docs, or ADRs.

Each question should make it obvious which part of the codebase or domain model it is about. Name the file or doc, the behavior or term, and the design tension being resolved.

</what-to-do>

<supporting-info>

## Domain awareness

During codebase exploration, also look for existing documentation:

### File structure

Most repos have a single context:

```
/
├── CONTEXT.md
├── docs/
│   └── adr/
│       ├── 0001-event-sourced-orders.md
│       └── 0002-postgres-for-write-model.md
└── src/
```

If a `CONTEXT-MAP.md` exists at the root, the repo has multiple contexts. The map points to where each one lives:

```
/
├── CONTEXT-MAP.md
├── docs/
│   └── adr/                          ← system-wide decisions
├── src/
│   ├── ordering/
│   │   ├── CONTEXT.md
│   │   └── docs/adr/                 ← context-specific decisions
│   └── billing/
│       ├── CONTEXT.md
│       └── docs/adr/
```

Create files lazily — only when you have something to write. If no `CONTEXT.md` exists, create one when the first term is resolved. If no `docs/adr/` exists, create it when the first ADR is needed.

## During the session

### Challenge against the glossary

When the user uses a term that conflicts with the existing language in `CONTEXT.md`, call it out immediately. "Your glossary defines 'cancellation' as X, but you seem to mean Y — which is it?"

### Sharpen fuzzy language

When the user uses vague or overloaded terms, propose a precise canonical term. "You're saying 'account' — do you mean the Customer or the User? Those are different things."

### Discuss concrete scenarios

When domain relationships are being discussed, stress-test them with specific scenarios. Invent scenarios that probe edge cases and force the user to be precise about the boundaries between concepts.

### Cross-reference with code

When the user states how something works, check whether the code agrees. If you find a contradiction, surface it: "Your code cancels entire Orders, but you just said partial cancellation is possible — which is right?"

### Update CONTEXT.md inline

When a term is resolved, update `CONTEXT.md` right there. Don't batch these up — capture them as they happen. Use the format in [CONTEXT-FORMAT.md](./CONTEXT-FORMAT.md).

`CONTEXT.md` should be totally devoid of implementation details. Do not treat `CONTEXT.md` as a spec, a scratch pad, or a repository for implementation decisions. It is a glossary and nothing else.

### Offer ADRs sparingly

Only offer to create an ADR when all three are true:

1. **Hard to reverse** — the cost of changing your mind later is meaningful
2. **Surprising without context** — a future reader will wonder "why did they do it this way?"
3. **The result of a real trade-off** — there were genuine alternatives and you picked one for specific reasons

If any of the three is missing, skip the ADR. Use the format in [ADR-FORMAT.md](./ADR-FORMAT.md).

</supporting-info>
