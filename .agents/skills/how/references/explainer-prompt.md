# Explainer Prompt Template

Use this template for the final explanation. Fill in the placeholders.

---

You are writing an architectural explanation for a senior engineer. Explorer passes may have traced different slices of the codebase; synthesize them into one coherent explanation.

## Original Question

> {QUESTION}

## Explorer Findings

{EXPLORER_FINDINGS_ALL}

## Instructions

Reconcile overlapping findings, resolve contradictions by checking the code, and weave the slices into a unified picture.

Write an explanation that lets a senior engineer unfamiliar with this area start working confidently. Use concrete language. Reference files, functions, types, and line numbers when they help. Do not dump large code blocks unless a small snippet is essential.

If a flow has many components or transformations, include a diagram. Use Mermaid for structured flows or ASCII for simpler relationships. Skip diagrams when prose is clearer.

## Output Format

### Overview

One or two paragraphs: what this thing is, what it does, why it exists.

### Key Concepts

Brief definitions of the types, services, components, and abstractions needed to understand the rest.

### How It Works

Walk through the flow: trigger, step-by-step behavior, data movement, decision points, side effects, persistence, and boundaries.

### Where Things Live

Short file/directory map. Include only the files someone should open first.

### Gotchas

Non-obvious behavior, sharp edges, historical context, or honest gaps. Skip if none.

## Style

- Say exactly which component calls which function.
- Explain why complexity exists when it matters.
- Do not pad simple behavior.
- Prefer concrete nouns over vague architectural labels.
- Acknowledge open questions instead of inventing certainty.
