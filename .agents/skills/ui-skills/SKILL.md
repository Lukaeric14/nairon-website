---
name: ui-skills
description: Frontend orchestration skill. Use for any frontend design, redesign, restyle, or visual polish task. Loads repo UX context, requires frontend-design, and forces selection of one or more specialist frontend skills before coding.
---

# UI Skills

This is the repo-local frontend gatekeeper. Use it for any task that changes presentation, layout, interaction design, visual hierarchy, motion, copy in UI surfaces, or design system styling.

## Mandatory Stack

Before making frontend design changes, load and follow all of these:

1. `frontend-design`
2. `ui-skills`
3. `1+` specialist frontend skills from this catalog

Do not continue until you have named the selected specialist skill(s).

## Required Context

Read the most relevant repo-local context before designing:

1. `project-context/design-context.md` if it exists
2. `AGENTS.md` for repo-specific rules and any `## Design Context`
3. relevant docs in `project-context/`, `business-context/`, `docs/`, or the nearest package README
4. both customer-facing and admin/internal context files when the surface serves both audiences

Then follow the context-gathering rules from `frontend-design`, including `teach-impeccable` when design context is still missing.

## Pick Impeccable Skills Deliberately

Choose the smallest set that fits the job, but at least one is mandatory.

- `arrange`: layout, hierarchy, spacing, composition
- `typeset`: typography, sizing, font pairing, readability
- `colorize`: palette, warmth, expressiveness
- `bolder`: make a safe design more distinctive
- `quieter`: tone down a loud interface
- `animate`: purposeful motion and transitions
- `delight`: polish, surprise, personality
- `distill`: simplify, declutter, reduce noise
- `normalize`: pull drifted UI back to the system
- `adapt`: responsive behavior and cross-device layout
- `harden`: edge states, overflow, resilience
- `optimize`: rendering, animation, loading performance
- `audit`: technical QA across a11y, performance, theming, responsiveness
- `clarify`: labels, UX copy, instructions, errors
- `critique`: evaluate the design before or after implementation
- `extract`: componentize, tokenise, systematize
- `onboard`: onboarding, empty states, first-run UX
- `overdrive`: technically ambitious, high-impact UI moments
- `polish`: final pass on alignment, consistency, micro-details
- `teach-impeccable`: one-time design context setup

## Extra Guardrails

- Also load `baseline-ui` whenever available.
- Also load `design-taste-frontend` whenever the task involves generating or materially redesigning UI.
- Load `fixing-accessibility`, `fixing-motion-performance`, and `fixing-metadata` when the task touches those concerns.
- Preserve existing design system patterns unless the task is explicitly a redesign.
- Verify final user-facing UI in a browser on desktop and mobile before calling it done.

## Refusal Rule

If a frontend design task begins without this stack, stop and load it first. No winging it. No beige slop.

## Existing UI Constraints

These still apply after the orchestration layer above.

### Stack Requirements

- MUST use Tailwind CSS defaults unless custom values already exist or are explicitly requested
- MUST use `motion/react` when JavaScript animation is required
- SHOULD use `tw-animate-css` for entrance and micro-animations in Tailwind CSS
- MUST use `cn` utility (`clsx` + `tailwind-merge`) for class logic

### Components

- MUST use accessible component primitives for anything with keyboard or focus behavior
- MUST use the project's existing component primitives first
- NEVER mix primitive systems within the same interaction surface
- SHOULD prefer Base UI for new primitives if compatible with the stack
- MUST add an `aria-label` to icon-only buttons
- NEVER rebuild keyboard or focus behavior by hand unless explicitly requested

### Animation

- NEVER add animation unless it is explicitly requested or clearly supports the design goal
- MUST animate only compositor props (`transform`, `opacity`)
- NEVER animate layout properties (`width`, `height`, `top`, `left`, `margin`, `padding`)
- SHOULD avoid animating paint properties except for small, local UI
- SHOULD use `ease-out` on entrance
- NEVER exceed `200ms` for interaction feedback
- MUST pause looping animations when off-screen
- SHOULD respect `prefers-reduced-motion`
- NEVER introduce custom easing curves unless explicitly requested
- SHOULD avoid animating large images or full-screen surfaces

### Typography

- MUST use `text-balance` for headings and `text-pretty` for body copy when compatible
- MUST use `tabular-nums` for data
- SHOULD use `truncate` or `line-clamp` for dense UI
- NEVER modify `letter-spacing` unless explicitly requested

### Layout

- MUST use a fixed `z-index` scale
- SHOULD use `size-*` for square elements instead of separate width and height utilities

### Performance

- NEVER animate large `blur()` or `backdrop-filter` surfaces
- NEVER apply `will-change` outside an active animation
- NEVER use `useEffect` for anything that can be expressed as render logic

### Design

- NEVER use gradients unless explicitly requested
- NEVER use purple or multicolor gradients
- NEVER use glow effects as primary affordances
- SHOULD use the existing shadow scale unless explicitly requested otherwise
- MUST give empty states one clear next action
- SHOULD limit accent color usage to one per view
- SHOULD use existing theme or token colors before introducing new ones

### Interaction

- MUST use an alert dialog for destructive or irreversible actions
- SHOULD use structural skeletons for loading states
- NEVER use `h-screen`; use `h-dvh`
- MUST respect safe-area insets for fixed elements
- MUST show errors next to where the action happens
- NEVER block paste in inputs or textareas
