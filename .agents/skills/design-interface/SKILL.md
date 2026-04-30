---
name: design-interface
description: Generate 3+ radically different interface designs for a module or API, then compare and synthesize them. Use when the user wants to explore interface options, compare module shapes, design an API twice, evaluate tradeoffs before implementation, or mentions "design it twice".
user-invocable: false
---

# Design an Interface

Your first interface idea is rarely the strongest one. Generate multiple materially different designs, then compare them deliberately.

> "Design It Twice" — John Ousterhout, *A Philosophy of Software Design*

## Input

Full request: $ARGUMENTS

## Workflow

### 1. Gather Requirements

Before designing, understand:

- What problem the module solves
- Who the callers are
- What the key operations are
- What constraints matter: compatibility, performance, ergonomics, existing patterns
- What complexity should stay hidden behind the interface

Also explore the codebase for similar interfaces and local conventions.

Ask only for the missing information that materially changes the interface shape.

### 2. Generate Multiple Designs

Produce at least 3 materially different designs. Use parallel sub-agents when available. If not, produce them sequentially yourself.

Give each design a distinct bias:

- Minimize method count
- Maximize flexibility
- Optimize for the common case
- Optionally mirror a relevant library or paradigm already present in the project

Each design should include:

1. Interface signature
2. Example usage
3. What it hides internally
4. Main tradeoffs

The designs must be structurally different, not the same API with renamed methods.

### 3. Present the Designs

Present each design clearly and separately so the differences are obvious.

### 4. Compare the Designs

Compare them on:

- Simplicity
- Generality
- Ease of correct use
- Ease of misuse
- Implementation depth
- Fit with the existing codebase

Discuss tradeoffs in prose, not giant tables.

Be opinionated. Recommend the strongest design or propose a hybrid if that is clearly better.

### 5. Synthesize

Ask which direction best matches the user's priorities, then refine toward a final interface shape.

## Gotchas

- The value is in the comparison, not just the raw design options.
- Do not implement the module unless the user asks for implementation after the design pass.
- If sub-agents are unavailable, still produce multiple options yourself instead of collapsing to one answer.
