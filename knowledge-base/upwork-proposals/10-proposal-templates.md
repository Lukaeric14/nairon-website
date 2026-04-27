# 10 — Proposal Templates

These are **skeletons, not fill-in-the-blank forms.** Rewrite every template to fit the post.

**Reminder from `08-proposal-writing-playbook.md`:** proposals do *not* pitch Nairon's offering, methodology, timelines, or "AI employees" framing. Mirror the lead's requirements, show competence with one proof point, and drive to a call. The selling happens on the call.

All templates are in Luka's first-person voice.

---

## Template A — Multi-agent / "team of AI agents"

**Use when:** Post describes wanting multiple coordinated AI agents handling different roles (like Job 1 — SEO/content engine, Research + Strategist + SEO + Writer + QA).

```
You've thought about this more carefully than most — designing this as a team of role-scoped agents with defined hand-offs is the right mental model. The part I'd spend the most time on in a v1 is the QA/editor and the shared memory layer, since those are what keep quality from drifting across agents at scale.

Quick context on me: I'm an ex-founder of a Techstars-backed AI startup (Rhetora AI) and I advise the AI/product teams at CodeGPT, Smartsy AI, and Questionbase. Day-to-day I build Claude-based multi-agent systems — the pattern you're describing (agents that pass structured outputs to each other, grounded in a shared retrieval layer, coordinated through a task system) is one I've shipped before.

One qualifier before I waste your time: is brand voice already captured somewhere (style guide, sample posts) the writer/QA agents can ground in? Makes a big difference to how fast v1 is useful.

If this looks aligned, grab a 15-minute slot and I'll come prepped with a sketch of the architecture:
https://cal.com/naironai/discovery-call

— Luka
```

---

## Template B — Production AI automation contractor (builder not consultant)

**Use when:** The post explicitly says they want a shipper, not a strategist, and specifies a real stack (like Job 2 — property mgmt, Microsoft 365, Appfolio, Laserfiche, Claude). Critically: follow their exact proposal requirements.

```
You said it clearly — you want someone who can ship against documented SOPs, not an advisor. That's the mode I default to.

Direct answers to your requirements:

1. Two automations I've shipped with measurable business outcomes:
   - [Concrete example 1: specific workflow, tools, outcome — e.g., "At CodeGPT, I designed the customer-success automation stack that lets a 3-person team support a 1M-user base. SOP-driven, LLM-backed triage + response, with human escalation for edge cases."]
   - [Concrete example 2: e.g., "Built an AI-driven lead-qualification agent for a real estate operator (Keylead). Qualification that took agents hours moved to seconds; the client now treats it as core infrastructure."]

2. Overrated: multi-agent frameworks (CrewAI / AutoGen) for most real-world work. One well-instrumented agent with solid tool use and memory usually beats a swarm.

3. Underrated: observability and replay. You can't tune what you can't see. Every production agent I ship has full action logs and human approval gates on anything that writes.

Integrating Claude against SOPs + MS365 + Appfolio + Laserfiche is squarely my zone. I've worked with those kinds of enterprise stacks before, and I write clean documentation as I go.

One question: which of your SOPs is the most painful today? That's usually where v1 should live.

15-min to scope: https://cal.com/naironai/discovery-call

— Luka
```

---

## Template C — AI strategy / advisory / "help us figure out where to start"

**Use when:** The post is exploratory — they know they need AI, don't know where. Still drive to a call; don't pitch.

```
The hardest part of a first AI deployment is usually picking the right first workflow. Most teams pick something too flashy or too broad, and it never gets to production.

Quick context on me: ex-founder of a Techstars-backed AI startup (Rhetora AI), current technical advisor at CodeGPT and Smartsy AI, and I do this kind of scoping work as half of every engagement I take on.

For a short-scope engagement with you, I'd run a 30-minute working session on your current ops, come back with 3–5 candidate workflows ranked by leverage, and a one-pager you can execute with me or anyone else.

Want to grab 15 minutes and see if it's a fit?
https://cal.com/naironai/discovery-call

— Luka
```

---

## Template D — Custom RAG / chatbot / knowledge base

**Use when:** The post wants a chatbot, a knowledge assistant, a RAG system on proprietary data.

```
Happy to take this on — it's in my core wheelhouse. I have a productized version of this exact build: grounded chatbot on Claude, retrieval over internal docs, source citations on every answer, and a lightweight admin surface.

Before I scope, three questions:
1. Roughly how much content (pages, docs, MB)?
2. Any sensitive or regulated data in scope?
3. Who's the target user — internal team, paying customers, both?

For context: I'm an ex-founder of a Techstars-backed AI startup (Rhetora AI) and advise the AI teams at CodeGPT and Smartsy AI. 100% Job Success on Upwork with 5-star reviews.

Want to grab 15? https://cal.com/naironai/discovery-call

— Luka
```

---

## Template E — AI training / workshop

**Use when:** The post wants training, upskilling, workshop delivery (precedent: Dubai 3-day engagement).

```
Good fit — I delivered a 3-day corporate training on AI-powered architecture and design in Dubai last year (5-star review, repeat intent from the client). My day job is building production AI systems, so the training lands practical, not theoretical.

Typical shape of what I'd run:
- Day 1 — Mental models: how modern AI agents actually work (LLMs, tool use, memory, retrieval), with live demos.
- Day 2 — Applied: each team picks a real workflow from your org; we design an AI solution around it.
- Day 3 — Build: we prototype one of the chosen workflows together.

Can run onsite (I'm based in Dubai, comfortable traveling) or remote.

15 minutes to align on objectives and audience? https://cal.com/naironai/discovery-call

— Luka
```

---

## Template F — Real estate brokerage

**Use when:** The post is from a real estate brokerage or mentions brokerage operations. Still: don't pitch our vertical offering directly — lean into their described problem.

```
You're describing a pattern I see across brokerages constantly — the leak between lead source and contact, or the weight of transaction admin on agents. Whichever one you're prioritizing, it's usually the right first place to apply AI (rather than trying to overhaul everything at once).

Context on me: I'm an ex-founder of a Techstars-backed AI startup (Rhetora AI) and now work with real-estate operators on exactly this kind of problem. One of our partners (Keylead, Nima Ghassemi) says lead qualification that used to take agents hours now happens in seconds.

One qualifier: are you already using [Follow Up Boss / kvCORE / Sierra / whatever they mentioned], or still on MLS + email? That shapes the integration path.

15-min call to look at your setup specifically:
https://cal.com/naironai/discovery-call

— Luka
```

---

## Template G — Quick consultation / one-off call

**Use when:** The post is a short consult or advice-only engagement.

```
Happy to jump on a call.

Context so you know what you're getting: I'm an ex-founder of a Techstars-backed AI startup (Rhetora AI) and current technical advisor at CodeGPT and Smartsy AI. I build production AI systems day-to-day, so I can give you real, current answers — not slideware.

Send me a short note on what you want out of the call and I'll make sure the time is useful. What's the decision you're actually trying to make?

— Luka
```

---

## Template H — Decline nicely (wrong fit, but keep the door open)

**Use when:** The job is a hard disqualifier (see `03-ideal-customer-icp.md`) but the lead is polite.

```
Straight answer — I don't think I'm the right fit for this one, and I'd rather tell you now than waste your time.

[One-sentence honest reason.]

If your needs shift or you want to stand up something in the future, happy to chat. Good luck with the project.

— Luka
```

---

## Universal "first line" swaps

Before sending any template, replace the opener with one that specifically echoes the lead's post. Generic openers fail. Examples:

- Post says "we need a builder, not a consultant" → Open with: "You said it clearly — you want someone who can ship, not an advisor. That's the mode I default to."
- Post says "we're rebuilding our ops" → Open with: "Rebuilding ops with AI at the center is a different beast from bolting AI onto existing ops — it's the right call, and the hardest part is sequencing what to swap first."
- Post says "Claude-based" → Open with: "Claude-based multi-agent is exactly my day job right now — happy to skip the pleasantries and give you something useful."

## Using the templates

1. Pick the template that matches the job type.
2. Rewrite the opener to mirror the lead's language.
3. Swap in one concrete past-project detail from `05-proof-case-studies.md` — don't reuse the same project across all proposals.
4. Trim. Every template above can be shortened by 30%.
5. Answer any numbered requirements the post lists, in order, without being asked twice.
6. Verify the CTA link is `https://cal.com/naironai/discovery-call`.
7. Remove anything that pitches Nairon's methodology, timelines, hardware, Hive, or OpenClaw. That's call material.
