---
name: image-first-frontend
description: Generate visual references before coding for high-stakes frontend work. Use when layout, typography, atmosphere, or art direction matters enough that code should follow images instead of guesses.
user-invocable: true
argument-hint: "[surface or page]"
---

# Image-First Frontend

Use this when the main risk is visual quality, not data plumbing.

Good fits:
- landing pages
- homepage redesigns
- premium marketing sections
- portfolio sites
- editorial layouts
- any UI where "looks right" matters more than "ships fast"

Do not use this for routine CRUD screens, tiny component tweaks, or tasks where image generation is unavailable and fidelity is not important.

## Goal

Create the visual reference first, then translate it into production-ready frontend.

The image is the design brief.
The code is the implementation.

## Workflow

### 1. Gather context first

Before generating anything, confirm:
- target audience
- product tone or brand feel
- stack and styling constraints
- whether the work is net-new or a redesign
- whether image generation is available in this environment

If image generation is not available, say so briefly and fall back to normal frontend workflow.

### 2. Plan the image set

Do not default to one giant board.

Choose the smallest image set that still keeps important details readable:
- one screen-sized image for one section
- one image per section when multiple sections need close inspection
- extra detail images when typography, cards, navigation, or motion cues would otherwise be too small to read

Prefer readable section references over compressed full-page collages.

### 3. Generate images before code

Generate the reference images before writing implementation code.

Bias toward:
- clear hierarchy
- readable text
- realistic laptop-scale composition
- strong spacing
- intentional background treatment
- restrained component count

Avoid:
- tiny unreadable labels
- nested cards
- fake dashboard clutter
- overfilling the first viewport
- reusing one blurred image when a fresh section-specific image is needed

### 4. Analyze the references deeply

Extract the design system before implementation:
- layout model and breakpoints
- spacing rhythm
- type scale and font mood
- palette and contrast strategy
- component shapes and states
- decorative motifs and textures
- likely motion behavior

Write down the non-negotiables. Distinguish between:
- must match
- can simplify
- should adapt for responsiveness or accessibility

### 5. Implement faithfully, not literally

Translate the reference into maintainable frontend using the repo's actual stack.

Preserve:
- hierarchy
- composition
- relative spacing
- visual tension
- surface treatment

Adapt when needed for:
- accessibility
- responsive collapse
- performance
- real content length
- missing assets or libraries

If a visual detail from the image harms usability, keep the intent and change the implementation.

### 6. Verify against the reference

Before finishing, compare the code to the image set:
- does the first screen read the same way?
- do the proportions still feel right?
- did the palette drift?
- did card count or chrome expand during implementation?
- does mobile keep the same spirit without horizontal overflow?

If the code feels flatter than the references, refine again.

## Rules

- Generate images first when visual quality is the main challenge.
- Prefer multiple readable references over one compressed board.
- Request or generate fresh detail images instead of guessing from tiny crops.
- Keep the coded result close to the image's hierarchy and mood.
- Do not let implementation convenience erase the original art direction.
- Do not ship image-inspired UI with missing loading, empty, or error states where they matter.

## Pairing

Best paired with:
- `frontend-design` for core design quality
- `baseline-ui` for anti-slop guardrails
- targeted specialist skills for typography, motion, color, or layout refinement
