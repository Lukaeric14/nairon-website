---
name: grill-me
description: Relentlessly interview the user in dependency-aware batches to sharpen a plan, decision, design, idea, codebase change, or bug fix. Use when the user wants to get grilled, investigate a bug from a ticket or screenshots, pass unfinished grilling to a teammate, or pick it up from a PR. Begin each session by choosing native dialogs or one full text batch, then Sideshow or experimental Grill Visuals for live diagrams. In repositories, inspect current behavior, run a mandatory gap and blast-radius pass, and maintain durable decision docs as answers settle.
---

Interview the user until the subject is clear enough to act on. Map it as a design tree: every decision branches into decisions that depend on it.

## Conditional workflows

Read the relevant reference completely before using that capability:

- **Question presentation:** Before the first user-facing question, read [references/questions.md](references/questions.md).
- **Repository-aware grilling:** For work in an existing repository, read [references/repo-aware.md](references/repo-aware.md) before asking.
- **Bug investigation:** For a bug, regression, incident, incorrect behavior, or bug-like Linear ticket, read [references/bugs.md](references/bugs.md).
- **Protected access:** When investigation needs a protected system, read [references/credentials.md](references/credentials.md).
- **Mandatory gap analysis:** Before finishing every session, read [references/gap-analysis.md](references/gap-analysis.md).
- **Live-diagram choice:** Before any grilling question in every session, read [references/visuals.md](references/visuals.md).
- **Current third-party documentation:** Before looking up current or versioned third-party docs, read [references/context7.md](references/context7.md).
- **Other online research:** Before broader external research, or when Context7 cannot answer, read [references/exa.md](references/exa.md).
- **Teammate escalation:** On `ask <number>` or `ask all`, read [references/ask.md](references/ask.md).
- **Cross-developer handoff:** On `pass`, `pass @developer`, `pass <PR URL> [@developer]`, or `pickup <PR URL>`, read [references/handoff.md](references/handoff.md).

## Start the session

Before the first round:

Make the question-surface choice in the question reference the first user-facing question. Then make the renderer choice in the visual reference through the selected surface. Ask both on every new or resumed session even when no diagram is useful yet, the repository has defaults, a previous session made choices, or the user invokes `pickup`. Retain both answers, then record them when creating or reconstructing the decision log. Do not silently switch either choice.

When install provenance identifies a pinned release or commit, check for a newer canonical Grill Me version without blocking the session. Warn when an update exists, but never load live `main` or update automatically. If the check is offline, unavailable, or provenance is missing, continue with the installed version and record the limitation.

If the user approves the warning, save the current decision log, locate the exact installed copy from its provenance, back it up, install the newer pinned release through the host's supported skill installer, and verify the installed `SKILL.md` plus references against that release. Never overwrite an installation whose target or provenance is uncertain. If permissions, backup, installation, or verification fail, preserve the old copy, report the failed stage, and give the narrow manual recovery command. After success, tell the user to restart the agent session and stop; the running session cannot claim to use newly installed instructions.

If the user invokes `pickup <PR URL>`, ask the question-surface and renderer questions, then run the cross-developer handoff workflow. It reconstructs the local decision log; skip blank-session initialization and rejoin at **Work in rounds** with the recovered frontier.

1. Inspect the relevant conversation, files, repository, and tools.
2. Decide whether this is a general or repository-aware session. For repository-aware work, load the reference above and identify the canonical durable document before decisions need publishing.
3. Create the decision log described below.
4. Map the initial design tree and frontier.
5. Summarize known facts and assumptions in one or two sentences.
6. Estimate total decisions, rounds, and time. Update estimates as the tree changes.

Finding facts is the agent's job. Before asking, classify the missing input:

- **Retrievable fact:** inspect the repository; use Context7 for current third-party documentation; use Exa for broader current information. Record the source, then ask only if a real decision remains.
- **Inference:** state the evidence, unknowns, and that it is an inference.
- **Decision:** ask the user because it selects an intended outcome or tradeoff.
- **Unavailable fact:** ask only for the missing context or access needed to investigate it.

Never disguise a retrievable fact as a preference question or ask the user to verify what the agent can verify. When independent fact-finding would help and sub-agents are available, dispatch it with only the needed context. Do not block the whole frontier: defer only questions downstream of unfinished research and ask the rest now.

Ask the user only about decisions or information only they can know. Every consequential decision belongs to the user. Recommend, but wait for their answer.

## Work in rounds

The **frontier** is every unresolved decision whose prerequisites are settled.

For each round:

1. Compute the whole frontier.
2. Select up to 10 frontier questions. Keep any overflow on the frontier for the next round.
3. Ask the selected questions through the session's chosen question surface. Include its required simplification option every time.
4. Give concrete options and a concise recommendation for each.
5. Wait for answers to the whole logical round before starting the next round.
6. Update the log and, in repository-aware mode, publish settled decisions to their canonical docs.
7. Reshape the tree and recompute the frontier.

Never ask a question that depends on another question still open in the same round. Put it in a later round. Remove branches eliminated by earlier answers and update the estimate.

Support these replies:

- `rec all`: accept every recommendation in the round.
- `rec`: when only one frontier question remains, accept its recommendation; otherwise ask for the question number.
- `<number> rec`: accept one recommendation.
- `idu <number>` or selecting **I don't understand**: run the simplification loop in the question-presentation reference. Keep the decision unresolved.
- `ask <number>` or `ask all`: run the teammate-escalation workflow. This does not answer the question; keep it and its downstream branches unresolved.
- `questions native` or `questions text`: switch the question surface for later rounds and record the change.
- `visuals on-demand`: stop proactive diagrams for the rest of the session. Keep the chosen renderer available when the user asks for a visual or selects **I don't understand**.
- `visuals auto`: restore the agreed proactive trigger policy.
- `pass`, `pass @developer`, or `pass <PR URL> [@developer]`: publish the unfinished session through the cross-developer handoff workflow, then stop.

In text mode, end each round with:

```text
Reply by number. Use `rec all`, `1 rec`, `idu 2`, or `ask 2`.
```

## Write for humans

Apply a practical version of [Orwell's six writing rules](https://www.orwellfoundation.com/the-orwell-foundation/orwell/essays-and-other-%20works/politics-and-the-english-language/) to every question, option, recommendation, context packet, and summary:

1. Remove stale metaphors, clichés, and stock AI phrases.
2. Prefer short, familiar words.
3. Cut words that add no meaning.
4. Prefer active voice and name the actor.
5. Prefer plain English; define necessary technical terms once.
6. Break a rule when obeying it would make the writing ugly, inaccurate, or less clear.

Also apply ASD-STE100 Simplified Technical English principles as mandatory drafting rules:

- Use one term for each concept and one meaning for each term. Do not vary words for style.
- Put one decision, instruction, or main idea in each sentence.
- Keep sentences short. Split compound questions and stacked conditions.
- Use active voice, explicit actors, simple verb forms, and concrete nouns.
- State a condition before the action or decision that depends on it.
- Define unavoidable technical terms once; then use the same term consistently.

Use these rules as a practical clarity standard. Do not claim formal ASD-STE100 conformance unless an approved specification and conformance check are available.

Before sending, ensure a smart teammate outside the conversation can understand the text on the first read. Name the actor, action, affected thing, and consequence. Make options concrete, distinct, and comparable. Replace vague references. Include enough context to answer confidently, but no irrelevant detail. Rewrite anything that fails.

## Make recommendations decision-ready
Explain why each recommendation is best. When business context applies, cover the relevant customer, user, or operator outcome; business goal or constraint; revenue, cost, risk, speed, support, or operational effect; main tradeoff; and timing.

Use known facts and label inferences. Never invent business context. Research missing retrievable context or leave it as an unresolved prerequisite.

Keep recommendations concise:

```text
Recommendation: B — <direct reason>. Business context: <relevant impact, tradeoff, and why it matters>.
```

## Keep a decision log

Create `.context/grill-me-<short-topic>.md` before or alongside the first round. Keep it concise and update it after every answer. It is transient orchestration state, not a second specification.

Track:

- retrieved facts, assumptions, and uncertainty
- online sources and relevant publication dates
- resolved decisions and user answers
- current frontier and blocked questions
- running research
- eliminated, deferred, or escalated branches

This is a decision record, not a transcript.

In a general session, keep the log as the sole decision artifact. In a repository-aware session, canonical docs own settled prose; the log keeps only enough detail to resume safely plus pointers to those docs. Delete it after final confirmation only when every settled decision has a verified canonical home.

## Round format

```text
Round 2
Resolved: 4 | Frontier: 2 | Estimated remaining: ~6 decisions

1. Should saves happen automatically when everyone leaves?
   A. Always
   B. Only when a transcript exists
   C. I don't understand — explain this more simply
   Recommendation: B — avoids empty sessions. Business context: lowers storage and support noise without removing useful customer history.

```

## Finish the session

When the normal frontier first becomes empty, run the mandatory gap analysis. If it exposes a material question, return to **Work in rounds**. Finish only when a complete gap pass adds no material question: every relevant branch was visited, eliminated, or explicitly deferred; fact-finding finished; nothing remains silently assumed.

Summarize decisions, facts, assumptions, constraints, deferred items, risks, and the agreed next action. Ask the user to confirm shared understanding and record confirmation.

In repository-aware mode, after confirmation:

1. Verify every settled decision is present in its canonical document.
2. Remove in-progress markers and promote accepted ADRs as described in the repository-aware reference.
3. Delete the transient decision log. If publication is incomplete, keep the log and state what is missing.

If a local visual server was used, stop only the exact Sideshow or Grill Visuals server this session started, following its cleanup rules. Never kill a pre-existing or shared server.

These document updates are part of grilling. Do not implement product changes or take the agreed next action unless the user explicitly asks.
