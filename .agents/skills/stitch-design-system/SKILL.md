---
name: stitch-design-system
description: Write a semantic `DESIGN.md` for Google Stitch or similar screen generators. Use when the user wants a reusable design brief that guides AI-generated screens without falling into generic UI patterns.
user-invocable: true
argument-hint: "[product or surface]"
---

# Stitch Design System

Use this skill when the output is not code first. The deliverable is a strong `DESIGN.md` that other tools can use to generate screens consistently.

## Goal

Produce a semantic design system document that:
- captures product tone
- encodes concrete visual rules
- gives screen generators enough structure to stay consistent
- blocks generic AI UI patterns before they spread

`DESIGN.md` becomes the design source of truth for generated screens.

## Inputs

Gather the minimum context first:
- who the product is for
- what the surface does
- what the brand should feel like
- whether this is marketing, product UI, admin UI, or editorial
- any hard constraints around accessibility, density, motion, or theming

If the product already has live UI, inspect it before writing the document.

## Authoring Rules

Write semantic guidance, not utility-class soup.

Good:
- "Muted graphite text for secondary metadata"
- "Primary buttons feel dense and tactile, with brief downward press feedback"

Weak:
- "text-slate-500"
- "rounded-xl shadow-md"

Use exact values where they help:
- hex or oklch colors
- type pairings
- spacing ranges
- border radii
- motion timing
- breakpoint behavior

Keep the system opinionated. A vague `DESIGN.md` produces vague screens.

## Required Sections

Write the file with these sections:

1. Visual Theme
Describe the atmosphere, density, contrast, and overall point of view.

2. Color Roles
Name each color by role, not just appearance. Keep one clear accent unless the product truly needs more.

3. Typography
State display, body, and mono choices plus hierarchy rules and banned defaults.

4. Layout Principles
Explain grid logic, spacing rhythm, content width, asymmetry, and mobile collapse.

5. Components
Define how buttons, cards, inputs, navigation, tables, empty states, and feedback states should feel.

6. Motion
Describe where motion belongs, how restrained or expressive it should be, and what performance limits apply.

7. Responsive Behavior
Document how layouts collapse, what cannot disappear on mobile, and minimum touch-target expectations.

8. Anti-Patterns
List the specific things the generator must not do.

## Anti-Pattern Guidance

Call out generic traps directly:
- overused fonts
- purple-blue neon gradients
- decorative glass everywhere
- equal card grids by default
- centered heroes when the design needs tension
- gradient headline text used as a shortcut for "premium"
- empty backgrounds with no atmosphere
- repeated placeholder content and fake metrics

The ban list matters as much as the preferred style.

## Editing Existing DESIGN.md Files

If a `DESIGN.md` already exists:
- keep good constraints
- remove contradictions
- tighten vague language
- preserve stable product truths
- avoid churn for cosmetic preference alone

## Final Check

Before finishing, verify:
- another agent could generate multiple screens from this doc without guessing core style decisions
- the document is specific enough to guide design, not just describe taste
- the rules fit the actual product context
- the anti-pattern list is concrete and useful
