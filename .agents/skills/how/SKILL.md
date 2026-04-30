---
name: how
description: Explain how a codebase subsystem, feature flow, runtime path, or architecture works by tracing code and producing a senior-engineer explanation. Use when the user asks how something works, asks to be walked through a flow, asks where behavior lives, or asks to critique architecture after understanding it.
---

# How

Answer "how does X work?" questions by exploring the codebase read-only and producing a clear architectural explanation. Optimize for a senior engineer onboarding into an unfamiliar area: enough detail to build a mental model, not an annotated source dump.

Do not change code, start servers, or run destructive commands unless the user explicitly asks.

## Workflow

1. **Interpret the question**
   - Identify whether the user wants a subsystem overview, feature flow, runtime trace, or architecture critique.
   - If scope is ambiguous, make a reasonable assumption, state it briefly, and explore. Let the user redirect.

2. **Choose the exploration path**
   - **Simple:** single module, utility, or narrow behavior. Search and read directly, then explain.
   - **Complex:** cross-cutting subsystem, multi-service behavior, or broad architecture. Split into 2-4 exploration angles, such as data model, entry points, rendering/runtime path, integrations, and state ownership.

3. **Explore**
   - Prefer repo-native search tools (`rg`, `rg --files`) and actual file reads.
   - Trace from entry point to effect: callers, callees, data transformations, boundaries, types, and persistence.
   - For complex questions, use parallel subagents if available. Give each explorer one angle and the template in `references/explorer-prompt.md`.
   - If subagents are not available, run the same angle-based passes yourself and keep notes.

4. **Synthesize**
   - Use `references/explainer-prompt.md` as the explanation standard.
   - Reconcile overlaps and contradictions by checking code.
   - Cite specific files, functions, types, and line references where useful.

5. **Critique when requested**
   - Trigger critique mode only when the user asks for problems, risks, improvements, design review, or architecture critique.
   - Explain first; critique second.
   - Use `references/critic-prompt.md` and `references/critique-rubric.md`.
   - If multiple agents/models are available, run 2-3 independent critique passes, then apply lead judgment instead of averaging.

## Output

Use these sections when they help:

- **Overview:** what it is, what it does, why it exists.
- **Key Concepts:** important types, services, abstractions, and ownership.
- **How It Works:** trigger-to-effect flow, data movement, decision points, and boundaries.
- **Where Things Live:** short map of files/directories worth opening first.
- **Gotchas:** non-obvious behavior, historical context, sharp edges, or gaps.

For critique mode, present the explanation first, then a verdict grouped as:

- **Act on:** worth fixing now.
- **Consider:** real concern, cost/benefit unclear.
- **Noted:** valid but low priority.
- **Dismissed:** incorrect, missing context, or preference-only.
