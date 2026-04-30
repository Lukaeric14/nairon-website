---
name: design-and-refine
description: Rapid UI design iteration through multiple variations. Use when starting a new component, redesigning UI, stuck on design direction, or exploring different approaches before committing.
---

# Design And Refine

Use rapid design iteration to make confident UI decisions before committing to one implementation. Generate multiple distinct variations, compare them, and synthesize the best direction with explicit tradeoffs.

## When to Use

- **Starting a new component or page** - explore different approaches before committing
- **Redesigning existing UI** - see alternatives to what you have today
- **Stuck on a design direction** - generate options when you're not sure what you want
- **Getting stakeholder buy-in** - show concrete variations instead of describing ideas
- **Learning what works** - see how different layouts, densities, and patterns feel

## Required Stack

Before running this workflow, load:

1. `ui-skills`
2. `frontend-design`
3. `1+` specialist skills that fit the task, such as `arrange`, `typeset`, `colorize`, `animate`, `distill`, or `polish`

If design context is missing, run `teach-impeccable` first.

## Usage

### Phase 1: Frame the Design Problem

- Identify the surface: page, component, flow, or sub-feature
- Decide whether this is net-new, an iteration, or a redesign
- Name the user goal, primary task, and quality bar
- Collect constraints: existing design system, responsiveness, accessibility, performance, and implementation stack

### Phase 2: Generate Distinct Variations

Create **3-5 materially different** directions. Do not make five cosmetic variants of the same idea.

Vary these dimensions deliberately:

- information hierarchy
- layout model
- density
- interaction model
- visual expression
- motion strategy

For each variation, document:

- what it optimizes for
- what it sacrifices
- the best-fit user or product context
- implementation risk or complexity

### Phase 3: Compare Side By Side

When possible, put the variations in a temporary comparison surface:

- a temporary route
- a sandbox page
- a `design-lab/` folder
- static screenshots or code snippets grouped in one review document

Keep temporary artifacts clearly labeled and easy to remove later.

### Phase 4: Synthesize

After review, do one of three things:

- pick one direction and refine it
- combine the strongest parts of multiple directions
- reject them all and generate a new round with sharper constraints

State explicitly why the chosen direction wins.

### Phase 5: Finalize And Clean Up

When the direction is chosen:

- convert it into a concrete implementation plan or final code
- save any durable conclusions in `project-context/design-context.md` or `AGENTS.md` if they should guide future UI work
- delete temporary comparison routes, files, or playgrounds unless the user asks to keep them

## Tips for Best Results

**Be specific about what must improve.** Generic prompts create generic variants.

**Vary the structure, not just the cosmetics.** Different hierarchy and interaction models matter more than swapping colors.

**Do not confuse exploration with production.** Temporary comparison surfaces are for decision-making, not permanent product architecture.

**Use the repo's design system when it exists.** Exploration should still respect the product's constraints unless the task is explicitly to rethink them.

**End with a decision.** The point is not to collect options forever; it is to converge with confidence.
