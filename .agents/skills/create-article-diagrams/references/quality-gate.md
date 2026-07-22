# Concept Model Quality Gate

Do not call a Concept model complete until each applicable item passes or is explicitly recorded as unverified.

## Editorial fidelity

- [ ] The learning objective matches the article's actual argument.
- [ ] Every visible claim, number, actor, relationship, and transition has a traceable source.
- [ ] The model adds no causal link, certainty, or recommendation absent from the article.
- [ ] Labels use the article's established terms consistently.
- [ ] An editor has approved the wording and model boundary.

## Usefulness

- [ ] Interaction creates understanding that prose, a table, or a static figure would not create faster.
- [ ] The initial state communicates the subject and available action.
- [ ] Each action has one clear, observable consequence.
- [ ] The completed state communicates the takeaway without replay.
- [ ] Decoration, redundant labels, and nonessential states have been removed.

## Cognitive accessibility

- [ ] The model exposes one manageable idea at a time.
- [ ] Controls stay near the content they affect and use familiar language.
- [ ] State changes remain visible long enough to understand.
- [ ] The reader can Pause, Reset, and recover orientation.
- [ ] The small-screen version preserves the same mental model.
- [ ] Error and loading messages state what happened and what the reader can do.

## Keyboard and assistive technology

- [ ] Every action works from the keyboard with visible focus.
- [ ] Focus order follows reading order and does not jump unexpectedly.
- [ ] Buttons, groups, status changes, and graphics have useful accessible names.
- [ ] Important state changes are available to screen readers without noisy announcements.
- [ ] Text remains usable at 200% zoom and under narrow reflow.
- [ ] Meaning does not depend only on color, location, or motion.

## Motion

- [ ] Motion starts only after reader activation.
- [ ] Pause stops nonessential movement immediately.
- [ ] Reset returns to a deterministic initial state.
- [ ] Reduced motion communicates the full explanation without animation.
- [ ] Continuous movement uses compositor-friendly properties where practical.
- [ ] Timers, animation frames, observers, and listeners are cleaned up.
- [ ] Repeated play, pause, reset, navigation, and remounting do not corrupt state.

## Engineering and publication

- [ ] Rendering logic and editable content/state data are separated and typed.
- [ ] Untrusted article data cannot execute code or inject unsafe markup or URLs.
- [ ] The component survives missing optional data and failed enhancement.
- [ ] Relevant unit, interaction, type, lint, build, and browser checks pass.
- [ ] The embed uses a stable component identifier and preserves old Published revisions.
- [ ] An engineer has reviewed code, performance, responsive behavior, and motion.
- [ ] Publication remains a separate human action after both reviews.

## Reader check

Ask a fresh reader to use the model, then answer:

1. What changed?
2. Why did it change?
3. How does that support the article's point?

Revise when the reader can operate the controls but cannot answer those questions from the model.
