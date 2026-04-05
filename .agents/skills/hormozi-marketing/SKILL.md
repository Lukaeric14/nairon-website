---
name: hormozi-marketing
description: Use when the task is about offer creation, pricing, guarantees, positioning, value proposition, lead magnets, funnels, conversion, copywriting, landing-page messaging, sales messaging, lead generation, acquisition strategy, or growth. This skill gathers business context from the repo first, then uses agent-browser to query a NotebookLM trained on Alex Hormozi materials so the advice is specific to the product and market.
---

# Hormozi Marketing

Use this skill for marketing and offer work that should benefit from Alex Hormozi-style frameworks:

- build or improve an offer
- sharpen positioning or messaging
- write or rewrite landing-page copy
- fix a funnel or CTA path
- improve lead magnets, acquisition hooks, or follow-up
- think through pricing, guarantees, upsells, or value ladders
- turn a vague growth problem into concrete tests

Do not jump to the NotebookLM immediately. First build enough business context that the NotebookLM question is specific.

## Core Workflow

### 1. Gather business context from the repo first

Start local. Search for the minimum set of files that explain the business:

- `README.md`
- `docs/`
- `apps/web/src/routes/`
- `apps/web/src/data/`
- landing-page components and CTA components
- pricing, offer, funnel, lead magnet, email, case-study, or ICP files
- any `AGENTS.md` / `CLAUDE.md` instructions that point to org context sources

If the repo mentions an org knowledge source such as Supermemory, use that before asking the user for context.

Extract and summarize:

- product or service
- target customer / ICP
- painful problem being solved
- current promise or transformation
- delivery model
- current CTA and funnel path
- existing proof, assets, or lead magnets
- traffic source if it is discoverable
- constraints that matter to the current task

If the repo is ambiguous, ask the user only for the missing minimum. Prefer questions like:

- What is the business model?
- Who is the buyer?
- What are you selling right now, at what price point?
- What traffic source or funnel stage are we optimizing?

Do not ask broad discovery questions if the repo already answers them.

### 2. Form the brief before opening NotebookLM

Create a short working brief with these fields:

- `Business`
- `Offer`
- `Buyer`
- `Current funnel`
- `Problem to solve`
- `Constraints`
- `Desired output`

Bad prompt: "Help with our marketing."

Good prompt: "We sell a done-for-you AI employee implementation service for real estate brokerages. The current CTA is a discovery call from a `/for/real-estate` landing page. We need a stronger lead magnet and a clearer promise for buyers who are curious but not yet demo-ready. Use Hormozi frameworks to recommend the best offer angle, lead magnet, CTA copy, and 3 experiments."

### 3. Ensure `agent-browser` is available

Check availability first:

```bash
agent-browser --version
```

Prefer the official install paths from the agent-browser docs:

- Installation: `https://agent-browser.dev/`
- Command reference: `https://agent-browser.dev/commands`

```bash
brew install agent-browser
agent-browser install
```

Alternative:

```bash
npm install -g agent-browser
agent-browser install
```

Quick verification:

```bash
agent-browser open https://example.com
agent-browser snapshot
agent-browser close
```

If `agent-browser` is not installed locally, install it before continuing. If installation is not possible in the current environment, explain that limitation and continue with the best repo-only guidance instead of pretending the NotebookLM step happened.

### 4. Use `agent-browser` to query the Hormozi NotebookLM

Open this notebook:

`https://notebooklm.google.com/notebook/f99eb1ba-787f-4e00-95ac-d2d523db7395`

Recommended browser workflow:

1. `agent-browser open "<url>"`
2. `agent-browser snapshot`
3. If Google auth is required, use the existing logged-in browser state if available. If there is no authenticated session, stop and ask the user to authenticate rather than faking access.
4. Find the main prompt composer from the snapshot.
5. Fill it with the compiled brief and a concrete request.
6. Submit the prompt.
7. Re-snapshot until the response is visible.
8. Extract the useful parts of the answer.

Prefer compact, explicit NotebookLM prompts. Ask it to reason in Hormozi terms and produce concrete artifacts.

Use a prompt structure like:

```text
You are advising with Alex Hormozi-style frameworks.

Business context:
- Business: ...
- Offer: ...
- Buyer: ...
- Current funnel: ...
- Problem to solve: ...
- Constraints: ...

Task:
Help me solve this specific problem: ...

Return:
1. The core diagnosis
2. Which Hormozi frameworks apply
3. Recommended offer / funnel / copy changes
4. 3-5 concrete experiments in priority order
5. Draft copy if relevant
6. Any risks, assumptions, or missing information
```

### 5. Synthesize, do not just relay

NotebookLM output is an input, not the final answer.

Translate it into repo-specific guidance:

- map recommendations to the actual routes, pages, docs, or funnels in the repo
- turn abstract advice into edits, tests, copy blocks, or implementation plans
- preserve facts from the repo over any generic suggestion
- clearly label assumptions

If the user asked for deliverables, produce them directly:

- offer stack
- guarantee ideas
- pricing or packaging options
- landing-page headline / subheadline / CTA copy
- lead magnet concepts
- email sequence ideas
- VSL or ad angles
- funnel diagnosis
- experiment backlog

## Default Heuristics

- Value equation: increase dream outcome and perceived likelihood; reduce time delay and effort/sacrifice.
- Grand slam offer: focus on outcome, proof, speed, ease, and risk reversal.
- Avoid vague marketing language. Make the promise concrete, measurable, and buyer-specific.
- Diagnose funnel leaks by stage: attention, click, opt-in, booked call, close, retention.
- If copy is weak, make the problem, mechanism, and payoff more specific before making it louder.
- If the offer is weak, fix the offer before polishing design.

## Guardrails

- Do not invent business facts that are not present in the repo or user input.
- Do not use the notebook as a substitute for understanding the actual product.
- Do not ask NotebookLM broad questions that waste the context window and produce generic advice.
- If access to the notebook is blocked, say so plainly and continue with the best local recommendation.
- Keep the final answer actionable: diagnosis, recommendation, deliverable, next test.
