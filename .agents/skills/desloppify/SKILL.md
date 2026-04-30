---
name: desloppify
description: Improve codebase quality systematically across dead code, duplication, complexity, naming, and architecture issues. Use when the user wants to clean up a codebase, reduce slop, raise maintainability, or run a desloppify-style improvement pass.
user-invocable: false
---

# Desloppify

Codebase quality scanner and fix loop built around [desloppify](https://github.com/peteromallet/desloppify).

## Input

Full request: $ARGUMENTS

Accepts:

- No arguments: full workflow
- `scan`: scan only
- `status`: show current score and progress
- `next`: show the next priority issue
- `plan`: emit a prioritized fix plan
- `--path <dir>`: scan a specific directory
- `--target <N>`: target strict score

## Workflow

### 1. Prepare the Tool

If `desloppify` is missing, install it:

```bash
which desloppify || pip install --upgrade "desloppify[full]"
```

### 2. Run the Initial Scan

```bash
desloppify scan --path .
```

Capture:

- Current score
- Issue count by tier
- Highest-value findings

### 3. Work the Fix Loop

Repeat until the target score is met or the remaining issues are not worth fixing:

1. Get the next issue
2. Read the surrounding code
3. Fix the real problem, not the symptom
4. Resolve it in `desloppify`
5. Re-scan periodically

Typical commands:

```bash
desloppify next
desloppify resolve fixed <pattern>
desloppify scan --path .
```

### 4. Report the Outcome

Summarize:

- New score
- What changed
- What remains
- Which items were intentionally deferred

## Gotchas

- Do not game the score with cosmetic edits.
- Large refactors are fine when they remove real complexity.
- Low-tier cleanup is useful, but deep structural fixes matter more.
