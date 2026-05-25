---
name: grill-me
description: General-purpose grilling for plans, writing, strategy, life decisions, or early ideas when there is no useful repo/domain documentation to update. Do not prefer for coding work in an existing codebase; use grill-with-docs instead. Use when user wants to stress-test a non-code plan, get grilled on an idea, or mentions "grill me" without a repo-specific task.
---

<what-to-do>

Interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one. For each question, provide your recommended answer.

Ask the questions one at a time.

Before asking any real question, scan the repository to confirm current behavior and implementation shape.

That scan should:
- identify the files, modules, routes, components, schemas, or tests most relevant to the topic
- confirm what the system appears to do today rather than relying on assumptions
- note gaps where the behavior is unclear or not covered by tests

Do not start grilling from pure speculation if the repo can answer part of the question first.

Before the first real question, estimate:
- total questions currently expected
- estimated time to finish the grilling

Also briefly summarize what you found in the codebase that is most relevant to the grilling.

When you start asking questions, every question must include progress using the format in [Progress format](#progress-format).

If the decision tree expands and the total question count changes, say so explicitly and update the progress numbers rather than pretending the original estimate was fixed.

Along with each question, strongly prefer including a small diagram that helps the developer visualize the options.

For every question that relates to existing code, include a short code-context block that names the relevant file and shows a short snippet.

If the question is tied to multiple implementation points, mention the primary file first and optionally list 1-2 secondary files or tests.

Each question should make it obvious which part of the codebase it is about. Name the file, the behavior, and the design tension being resolved.

If a question can be answered by exploring the codebase, explore the codebase instead. Only ask the user what the repo cannot reliably tell you.

</what-to-do>

<supporting-info>

## Progress format

```text
Question: 12 / 23
Estimated time left: ~6 minutes
```

## Diagrams

Along with each question, strongly prefer including a small diagram that helps the developer visualize the options. Use either:
- a simple ASCII diagram
- a compact flow diagram
- a branch diagram showing the current decision and downstream consequences

Keep diagrams tight and decision-oriented. They should clarify the choice, not decorate the answer.

## Code context format

For every question that relates to existing code, include a short code-context block that names the relevant file and shows a short snippet. Keep snippets short and only include the minimum needed to orient the developer.

Use a structure like:

```text
Question: 4 / 17
Estimated time left: ~5 minutes

Code context: src/billing/checkout.ts
Snippet:
  if (plan === "pro") {
    return createStripeCheckoutSession(...)
  }
```

</supporting-info>
