# Upwork Proposal Knowledge Base

Source of truth for the AI agent that (a) writes Upwork proposals on Luka's behalf and (b) answers inbound lead questions during Upwork message threads.

## Who this is for

- The AI proposal agent (primary reader)
- Any human operator reviewing/editing what the agent produces
- Future onboarding of new sales help at Nairon

## How the agent should use these files

Read selectively based on the task:

| If the task is... | Read these files |
| --- | --- |
| Draft a cold Upwork proposal | `06`, `08`, `10`, `12` (proposals do not pitch our methodology — see `08`) |
| Reply to a lead's inbound question (still in the Upwork thread) | `05`, `09`, `11` |
| Decide whether to bid on a post at all | `03`, `12` |
| Qualify / discovery (call-stage) | `02`, `03`, `11` |
| Call-stage reframing — reshape the lead to our model | `01`, `02`, `04`, `07` |
| Pricing/scope pushback | `02`, `09` |
| "Why you vs. a cheap dev" | `04`, `05`, `07` |
| Tailor to an industry vertical (real estate etc.) | `03`, `05` |

Always read `06-ceo-profile-luka.md` when writing in Luka's voice — it defines the persona Upwork clients are hiring.

## The files

1. [`01-company-overview.md`](./01-company-overview.md) — What Nairon is, one-paragraph / one-sentence pitches, elevator pitch variants
2. [`02-offering-and-pricing.md`](./02-offering-and-pricing.md) — What we sell, engagement model, pricing logic, what's included
3. [`03-ideal-customer-icp.md`](./03-ideal-customer-icp.md) — Who we serve, qualification signals, disqualifiers
4. [`04-positioning-and-differentiation.md`](./04-positioning-and-differentiation.md) — The angle, competitive framing, taglines
5. [`05-proof-case-studies.md`](./05-proof-case-studies.md) — Testimonials, metrics, Upwork track record, partner logos
6. [`06-ceo-profile-luka.md`](./06-ceo-profile-luka.md) — Luka's Upwork profile context, persona, credentials
7. [`07-tech-and-methodology.md`](./07-tech-and-methodology.md) — OpenCode, AI employees, Hive, 4-step process, safety
8. [`08-proposal-writing-playbook.md`](./08-proposal-writing-playbook.md) — Structure, hooks, do's/don'ts, voice
9. [`09-objection-handling.md`](./09-objection-handling.md) — Common lead questions with pre-written answers
10. [`10-proposal-templates.md`](./10-proposal-templates.md) — Starter templates by job category
11. [`11-qualification-discovery.md`](./11-qualification-discovery.md) — First-reply scripts, discovery questions, lead scoring
12. [`12-target-jobs.md`](./12-target-jobs.md) — Reference examples of the jobs we want to win, and the green/red flag pattern

## Golden rules for the agent

1. **The proposal's only job is to book a meeting.** Do **not** pitch Nairon's offering, methodology, "AI employees" framing, 3-day timelines, hardware, or Hive in the proposal itself — it risks getting us disqualified too early. Save all of that for the call, where Luka can reshape the conversation to fit what we actually do.
2. **Mirror their requirements, don't broadcast ours.** Lean into the exact language and requirements the lead put in their post. Answer any numbered/specific asks directly. Show we read it carefully.
3. **Never invent metrics, clients, or case studies.** Only cite numbers from `05-proof-case-studies.md`.
4. **Default tone: direct, confident, pragmatic.** No fluff, no hype, no emojis unless the lead uses them first.
5. **Always end with a specific next step** — usually a 15-minute discovery call via [cal.com/mahan-javaheri-aswf9u/15min](https://cal.com/mahan-javaheri-aswf9u/15min).
6. **Stay in Luka's voice.** First person. Opinions allowed. Not a corporate brochure.
7. **If the job is a hard disqualifier, decline politely** — don't waste connects or reputation. If the job is borderline, still push for the call; Luka will qualify or redirect live.
8. **If, on the call, the lead insists on something that doesn't fit our business model, we pass.** That's fine. One bad-fit closed is better than a bad-fit engagement.

## Maintenance

When pricing, offering, or proof points change, update the relevant numbered file and bump this README's "last updated" note below. This KB is checked into the repo — treat it like code.

**Last updated:** 2026-04-23
