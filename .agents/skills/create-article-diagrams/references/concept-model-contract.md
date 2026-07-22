# Concept Model Contract

Use this contract before implementing an article Concept model.

## Diagram brief

```md
Title:
Article and section:
Learning objective:
Reader confusion addressed:
Why prose or a static figure is insufficient:

Claim trace:
- Visible claim → article passage or approved source

Actors and objects:
- Name → purpose in the model

Controls:
- Control → event → visible result

States:
- Initial:
- Intermediate:
- Completed:
- Paused:
- Reset:
- Reduced motion:
- Failure/no JavaScript:

Small-screen adaptation:
Admin-editable content:
Editorial reviewer:
Engineering reviewer:
```

## State rules

- Give every state a stable name based on meaning rather than frame number.
- Define transitions as `current state + reader event → next state`.
- Keep the same underlying facts across animated, paused, reset, reduced-motion, and small-screen states.
- Make Reset deterministic and idempotent.
- Make repeated Play/Pause cycles safe.
- Keep timing cosmetic. A delayed frame must never change the factual result.
- Derive visual position from state rather than treating animation callbacks as the source of truth.

## Content rules

- Separate editable labels, annotations, and model data from rendering and animation logic.
- Give stable identifiers to every editable item and diagram instance.
- Keep public model data inside the Published revision or a versioned component contract.
- Preserve old published revisions when labels or behavior change later.
- Treat numbers and comparisons as claims requiring a traceable source.
- Do not insert explanatory facts merely because the layout has empty space.

## Interaction rules

- Make the diagram's purpose understandable before interaction.
- Use direct manipulation only when the manipulation teaches something.
- Use familiar controls and visible control-to-content relationships.
- Keep one primary interaction at a time when simultaneous controls would obscure causality.
- Place Pause and Reset where they remain reachable throughout the model.
- Never autoplay motion or audio.
- Avoid infinite loops, progress that cannot be paused, and animation needed to read a label.

## Embedding rules

- Commit component code to the repository and pass normal engineering review.
- Reference approved components by a stable identifier from article content.
- Reject arbitrary JSX, JavaScript, HTML, or URLs stored in article data.
- Sanitize admin-editable text and validate structured data at the server boundary.
- Keep a complete static or server-rendered explanation when the interactive layer fails.
