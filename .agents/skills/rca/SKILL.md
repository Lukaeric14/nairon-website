---
name: rca
description: Perform root cause analysis for a bug by tracing backward from the symptom to the source, verifying the fix adversarially, and adding regression coverage or a manual verification checklist. Use when the user asks for an RCA, root cause analysis, deep bug investigation, or wants to understand why something broke before fixing it.
---

# RCA

Trace backward from the symptom to the original trigger. Fix at the source. Verify the fix holds. Capture the learning so the same class of bug is less likely to happen again.

> Never fix where the error appears if the repo can tell you where it started.

```text
REPRODUCE -> INVESTIGATE -> ROOT CAUSE -> FIX -> VERIFY -> LEARN
```

This skill is for bug investigation, not feature planning.

- Features start with: what should we build?
- Bugs start with: what actually went wrong?

## Role

Be a skeptical senior debugging engineer.

- do not guess
- do not patch the first visible symptom
- do not declare victory because the code "looks sound"
- do not stop before checking realistic production conditions when they matter

## When to use this skill

Use this when the task is about:

- a bug
- a regression
- an incident
- a crash
- incorrect behavior
- "not working", "broken", "fails", "wrong output"
- an error message or stack trace
- "perform an RCA" or "find the root cause"

Do not use this for generic multi-issue intake. Use `issue-triage` for that.

## Phase 1: reproduce

### 1. Understand the symptom

Capture:

- what happened
- what should have happened
- the exact error message if one exists
- when it started
- what changed recently, if known

If the user provides an error message or stack trace, quote it exactly. Do not paraphrase it.

### 2. Classify severity

Classify the bug before you dive in:

- **Quick**: cosmetic or isolated, low user impact
- **Standard**: functional breakage with real user impact
- **Critical**: data loss, security, outage, money movement, duplicated work, corruption

Tell the user the classification and why.

### 3. Reproduce it

Try to reproduce the bug before investigating.

If reproducible:

- write the exact repro steps
- note the triggering state or data shape

If not reproducible:

- ask for the smallest missing detail
- determine whether it is intermittent, environment-specific, or data-dependent

If it still cannot be reproduced, explicitly say the investigation will be lower confidence.

## Phase 2: investigate

### 4. Trace backward

Read [trace.md](trace.md) and follow that method.

At each level, document:

```text
Level N: file:line
  Called by: caller file:line
  Data received: what arrived here
  Problem: what is wrong at this level
  Continue tracing?: yes/no
```

Keep tracing until you find the point where correct behavior diverged.

Do not stop at:

- a null check opportunity
- a defensive guard that hides the error
- the first intermediate layer that can absorb bad data

### 5. Interrogate production conditions

For Standard and Critical bugs, and for any backend, queue, scheduler, export, retry, database, concurrency, or production-only bug, force concrete failure questions:

- what happens at 100x the happy-path data volume?
- what happens with two or more workers or instances?
- what happens during retries, partial failures, or slow upstreams?
- what happens if this runs twice?
- what happens under memory, connection, or worker-slot pressure?
- what happens during restarts or timing drift?

Document the failure mode or explicitly say there is none.

Use this format:

```text
Production perspective:
  Scale: ...
  Topology: ...
  Data volume: ...
  Resource limits: ...
  Timing / retries: ...
```

### 6. Present the root cause

Write:

```text
Symptom: ...

Root cause: ...

How it happened:
1. Root cause: ... (file:line)
2. Propagation: ... (file:line)
3. Symptom: ... (file:line)

Production trigger: ...

Why it was not caught: ...

Confidence: High / Medium / Low
```

Confidence rules:

- **High**: reproduced, traced, and confirmed
- **Medium**: strong evidence, minor assumptions remain
- **Low**: best current hypothesis, needs more evidence

## Phase 3: verify the diagnosis

Skip this phase only for truly Quick bugs.

### 7. Adversarial review

Before fixing, challenge your own conclusion:

1. is this the root cause, or another symptom?
2. could there be a deeper cause?
3. could a different code path produce the same symptom?
4. if I fix this, does it definitely fix the reported bug?
5. could this fix introduce a new bug?
6. what breaks at production scale, not just locally?

Never accept "the logic seems fine" as a stopping condition for production-facing bugs.

## Phase 4: fix

### 8. Plan the fix

Before changing code, write:

```text
What to change: ...
Fix at source: ...
Defense-in-depth: ...
Blast radius: ...
Risk: ...
Production guardrail: ...
```

Fix the source. Add defensive validation at boundaries only when it helps contain future bad inputs.

### 9. Implement the fix

Keep it minimal. This is a bug fix, not an excuse for a refactor.

### 10. Second-guess the patch

Before you trust the patch:

- re-read the original report
- re-read the diff carefully
- ask whether the change fixes the root cause or only masks it
- check for scope creep, unused imports, mistaken assumptions, and obvious edge cases
- run the relevant checks

If this second pass changes the patch materially, review it again once.

## Phase 5: verify

### 11. Add regression coverage

If the repo has tests:

- write a regression test that fails without the fix
- make sure it passes with the fix
- prefer testing the root cause, not only the surface symptom
- include the production trigger when feasible

If the repo does not have tests:

- write a manual verification checklist

Use:

```text
Verification checklist
1. Reproduce the original bug again
2. Check the triggering scenario
3. Check adjacent scenarios
4. Check edge cases specific to this root cause
5. Check production-like conditions if relevant
```

## Phase 6: learn

### 12. Capture the lesson

Write the durable learning in the most appropriate local place:

- `project-context/pitfalls/` for recurring traps
- `project-context/decisions/` if the fix changes an important architectural rule
- `AGENTS.md` only if this should become an always-on workflow or review rule

Use this structure:

```text
What happened: ...
Why it happened: ...
How to avoid it: ...
Trigger conditions: ...
Related files: ...
```

### 13. Ask whether structural prevention is possible

Check whether this class of bug could be prevented with:

- stronger types
- runtime validation at a boundary
- a lint rule
- a CI check
- a better test pattern
- a review checklist item

If yes, propose it explicitly.

## Output

End with a concise RCA summary:

```text
RCA summary
- Symptom: ...
- Root cause: ...
- Fix: ...
- Verification: ...
- Remaining risks: ...
- Durable follow-up: ...
```

## Gotchas

- Do not stop at the first plausible culprit.
- Do not confuse a good narrative with a proven trace.
- Do not skip production-condition reasoning for backend or concurrency bugs.
- A bug fix is incomplete without regression coverage or an explicit verification checklist.
