# Backward trace methodology

Use this when performing root cause analysis.

> Bugs rarely originate where they surface.

If the UI crashes because `user.id` is undefined, the real problem is often upstream:

- bad API data
- missing validation
- stale cache
- wrong schema
- broken contract between layers

If you fix only the place where the crash happened, the same bug often returns in another form.

## The 5-step trace

### 1. Observe the symptom

Write down the exact symptom:

- exact error text
- file and line where it surfaced
- user action or system event that triggered it
- important system state when it happened

```text
Symptom:
  Error: Cannot read property 'id' of undefined
  Location: src/components/UserCard.tsx:42
  Trigger: clicking View Profile
  State: team page with stale roster data
```

### 2. Find the immediate cause

Identify the exact code that produced the error.

```text
Immediate cause:
  Line 42: const userId = user.id
  Problem: user is undefined here
  Question: where did user come from?
```

### 3. Trace one level up

Follow the bad value backward.

- if it is a function parameter, find the caller
- if it comes from state, find who set the state
- if it comes from an API, inspect the response and the boundary
- if it comes from the database, inspect the query and the writer

```text
Level up:
  user comes from props.user
  Parent: src/pages/TeamPage.tsx:78
  Code: <UserCard user={teamMembers[index]} />
  Problem: teamMembers[index] is undefined
  Question: why is index out of bounds?
```

### 4. Keep tracing until you reach origin

At each level, ask:

- is this where the wrong decision was made?
- is this where untrusted data crossed a boundary?
- is this layer only relaying already-bad state?

Signs you found the root cause:

- this is where correct behavior first diverged
- fixing here prevents downstream symptoms
- earlier layers still had sane inputs

Signs you need to keep tracing:

- the code is only passing bad data along
- the value was already wrong on entry
- the patch here would only be defensive masking

### 5. Fix at source and optionally add defense

Primary fix:

- change the root cause location

Optional defense-in-depth:

- validate at trust boundaries
- guard unstable or external inputs
- add bounds checks where bad state crosses layers

Defense is not a substitute for a source fix.

## Trace template

```text
Trace: [bug title]

Symptom:
- Error: ...
- Location: ...
- Trigger: ...

Level 0:
- File: ...
- Code: ...
- Problem: ...
- Data source: ...

Level 1:
- File: ...
- Code: ...
- Problem: ...
- Data source: ...

Level N: ROOT CAUSE
- File: ...
- Code: ...
- Root cause: ...
- Fix: ...

Chain summary:
[root cause] -> [propagation] -> [symptom]
```

## Common patterns

| Pattern | Symptom | Likely root cause |
| --- | --- | --- |
| Undefined/null access | crash deep in rendering or execution | missing validation at a boundary |
| Stale data | old or missing values in UI or jobs | missing invalidation or subscription |
| Race condition | intermittent failure | missing synchronization or wrong ordering assumption |
| Type mismatch | wrong output without a crash | implicit coercion or bad contract |
| Off-by-one | wrong item selected or skipped | boundary or index bug |
| Missing error handling | unhandled rejection or partial failure | async call path without error boundary |
| Config drift | works locally, fails elsewhere | env or deployment mismatch |

## Red flags

If you catch yourself saying any of these, keep tracing:

1. let me just add a null check
2. this quick fix should prevent it
3. the trace is getting complicated
4. I think I know what it is
5. it probably will not happen again

## When the trace gets stuck

- add temporary instrumentation
- inspect third-party source or docs
- identify the concrete implementation behind dynamic dispatch
- trace publishers and subscribers in event-driven flows
- narrow by finding the last known-good state and first known-bad state
