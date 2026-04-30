---
name: tdd
description: Test-driven development with red-green-refactor vertical slices. Use when the user wants to work test-first, implement one behavior at a time, or explicitly asks for TDD or red-green-refactor.
user-invocable: false
---

# TDD

Build features and fix bugs one vertical slice at a time: write one failing test, make it pass with minimal code, then repeat.

## Workflow

### 1. Plan the Behaviors

Before writing code:

- confirm the public interface
- identify the behaviors to test
- prioritize them
- look for opportunities to deepen the module design

### 2. Tracer Bullet

Write one test for one behavior:

```text
RED: write a failing test
GREEN: write the minimum code to pass it
```

### 3. Incremental Loop

For each next behavior:

```text
RED: write the next failing test
GREEN: write the minimum code to pass it
```

Rules:

- one test at a time
- no speculative code for future tests
- keep tests focused on observable behavior

### 4. Refactor

Only after the suite is green:

- remove duplication
- improve names
- deepen modules
- simplify interfaces

## Gotchas

- Do not write all tests first.
- If a test is hard to write, the interface may be wrong.
- "Minimal code" really means minimal.
