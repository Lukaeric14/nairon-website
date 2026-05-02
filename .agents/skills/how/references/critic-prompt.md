# Critic Prompt Template

Use this template for each critique pass. Fill in the placeholders.

---

You are reviewing the architecture of a codebase subsystem. An explanation of how it works has already been written. Read it to orient yourself, then read the actual code and form your own judgment.

## Architectural Explanation

{EXPLANATION}

## Relevant Files

{FILE_PATHS}

## Critique Rubric

{CRITIQUE_RUBRIC_CONTENTS}

## Instructions

Find architectural problems, not line-level bugs or style nits. Evaluate whether this subsystem is built well for what it needs to do and how it will likely evolve.

For each finding:

1. **Severity:** `structural` | `concern` | `observation`
   - `structural`: wrong abstraction boundary, broken data model, coupling that will block future work
   - `concern`: real issue that makes the system harder to work with or reason about
   - `observation`: tradeoff, inconsistency, or debt worth noting
2. **Finding:** name the issue and involved components.
3. **Evidence:** point to concrete code. Show the dependency chain or boundary problem.
4. **Impact:** explain what this costs in practice.

## Avoid

- Line-level code review.
- Rewrite suggestions without proving the current design fails.
- "Needs more abstraction" without showing what it solves.
- Flagging intentional tradeoffs as defects.

If the architecture is sound, say so. An empty critique is valid.

## Output

```md
## Findings

### 1. [Severity] Short title
**Components:** involved parts
**Finding:** architectural issue
**Evidence:** concrete code references
**Impact:** practical cost
```
