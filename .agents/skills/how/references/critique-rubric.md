# Architectural Critique Rubric

Use whichever lenses are relevant. Not every lens applies to every subsystem.

## Abstraction Fit

- Does each abstraction represent a real concept?
- Do boundaries separate things that change independently?
- Is there accidental coupling through implementation details?
- Is business logic entangled with framework wiring?

Over-abstraction is as much a problem as under-abstraction. A flat design is fine for a simple domain.

## Data Model

- Do data structures fit actual access patterns?
- Does code constantly reshape data because the model mismatches usage?
- Are types honest about runtime shapes and optionality?

## Boundary Discipline

- Is validation concentrated at entry points or scattered internally?
- Are errors handled at boundaries and propagated cleanly?
- Does data cross boundaries in typed shapes or bags of optional fields?
- Can this subsystem be tested in isolation?

## Evolution Readiness

- If the most likely next requirement landed tomorrow, how much would change?
- Are hardcoded assumptions likely to break?
- Does the design feel integrated or bolted on?
- Are compatibility paths still needed?

Do not penalize for hypothetical futures. Focus on plausible changes.

## Complexity vs. Value

- Is complexity concentrated in core logic and invariants, or in accidental boilerplate?
- Is there a simpler way to achieve the same behavior?
- Does every component earn its existence?

## Consistency

- Does this subsystem follow patterns used elsewhere?
- If it differs, is there a good reason?
- Does inconsistency create real maintenance cost?
