# 09 — Objection Handling & Common Lead Questions

Pre-written answers the agent can draw from. Use them as *material*, not boilerplate — always adapt to the lead's wording and prior messages.

---

## "Why should I hire you vs. [cheaper freelancer / agency]?"

> Fair question. Two reasons. One, I've actually shipped and operated this kind of system — not built a demo and walked away. I run a firm (Nairon) that builds AI employees for a living, and I advise AI teams at CodeGPT, Smartsy AI, and Questionbase. Two, I was a founder, so I price and scope like an operator. If I don't think we're a fit, I'll tell you on the discovery call and point you to someone better. I'm not trying to win every bid.

---

## "What's your rate / how much will this cost?"

> For scoped consulting or training, I bill at $150/hr — that's my profile rate.
>
> For a custom AI build, I don't quote a number before we've talked — scope and engagement model depend on which workflow you're trying to own first. Most of my engagements start with a free 15-minute call where we pick the first target, and I can give you a real number on that call. Want to grab 15 minutes? [cal.com/mahan-javaheri-aswf9u/15min](https://cal.com/mahan-javaheri-aswf9u/15min)

---

## "The budget is fixed at $X, can you do it?"

If $X ≥ $2K and scope is tight:
> That works. Here's what I'd lock the scope to inside that budget: [two concrete deliverables]. Anything beyond that we can discuss as a phase two.

If $X < $2K and scope is substantial:
> Honestly, not at that budget — not because of my rate, but because the project you've described would be half-done at that price and I'd rather not ship half-done. Two options: (1) we scope something smaller I *can* deliver fully inside that budget, or (2) I point you to someone who does lighter-weight work. Happy either way.

---

## "Can you start tomorrow?"

> I'm taking on less than 30 hrs/week right now because I stay senior on every project. Once scope is signed, we move fast — my default is **v1 live in 3 days**, usually an AI employee tied directly to you (inbox, scheduling, research, follow-up). More complex integrations take longer, but we always ship something useful in the first week.

---

## "Do you use ChatGPT / Claude / GPT-4?"

> Yes — and I pick the model per task. Claude Sonnet 4.5 is my default for agent reasoning, GPT-5 for some structured-output work, Haiku or Gemini Flash when I need speed. I also build on top of OpenClaw and Claude Agent SDK daily. I'm happy to walk through the stack on a call.

---

## "Can you just write me a better prompt?"

> I can, but a prompt is 5% of what makes an AI system work in production. The parts that actually break — memory, tool use, error handling, observability, approval gates — aren't prompt problems. If you only need a prompt, I'm probably not the right fit. If you want a system, let's talk.

---

## "Will AI replace my team?"

> Not in any engagement I run. An AI employee works under a human owner on your team. The humans keep doing the judgment-heavy, relationship-heavy, creative work; the AI handles the repeatable, multi-step stuff that's eating their time. Usually, teams end up doing more — not less — once the AI is live.

---

## "How do you handle data privacy / compliance?"

> Three things: (1) Each AI employee runs on dedicated hardware in my data center — no multi-tenant data mixing. (2) The agent is a user of your existing tools, not a separate data store — your data stays where it lives today. (3) We put approval gates in Slack for any action that touches sensitive data or external comms. If you're in a regulated space (finance, health, legal), we scope tighter controls from day one.

---

## "What happens if the AI makes a mistake?"

> Two layers. First, approval gates — anything high-stakes (outbound email, data writes, external API calls with consequences) routes to a human in Slack for sign-off before it fires. Second, full observability — every action and decision is logged in our ops platform (Hive), so when something misfires, we can replay it and fix the root cause. It's a production system, not a demo.

---

## "Do you work full-time or freelance?"

> Both. I run Nairon (the company behind my AI work) full-time — that's my team of engineers. I take a limited number of Upwork engagements personally because I like staying close to a few specific projects. You get me directly, not a project manager, and the Nairon engineering team behind me when we need muscle.

---

## "Are you outside the US?"

> Yes — Dubai, UAE. I moved from San Francisco. I work comfortably with US East Coast teams in real-time and US West Coast async (early morning / late night overlap). For EMEA teams, the timezone is ideal.

---

## "Can you sign an NDA?"

> Yes, happy to sign a standard mutual NDA before we get into specifics. Send it over.

---

## "What's the minimum engagement?"

> For a custom AI build: ~3 days to a live v1 (usually an agent tied to the CEO — inbox, scheduling, research, follow-up), then at least 1 month of operations so we can tune it against real usage — so roughly a month minimum in practice. For advisory or training, I do one-off engagements — 30-min consults up through multi-day workshops.

---

## "I need this done in 1 week."

> Good news — 1 week is more than enough. My default for a first AI employee is **3 days to a live v1**, and the first week is usually where we ship v1 and already start tuning it in real usage. For bigger multi-agent systems, we stage the rollout so you get something working in the first week and expand from there. Want 15 minutes to sketch what v1 could look like?

---

## "Why don't you have more Upwork reviews?"

> Fair — I do most of my client work outside Upwork, through my firm (Nairon) and prior advisory/founder work (Rhetora AI, CodeGPT, Smartsy, Questionbase, DG Consulting). I'm selective about Upwork bids because every engagement I take here, I stay senior on. Happy to share past work outside Upwork on a call.

---

## "Can you just send me examples?"

> Some I can share openly, some are under NDA. Publicly: I built Rhetora AI (Techstars-backed), advise CodeGPT and Smartsy AI, and my firm (Nairon) has a real estate brokerage partner whose lead qualification went from hours to seconds after we embedded AI into their workflow. For NDA-covered work — including the specifics of the advisory engagements — I walk through it on a call.

---

## "Will you use my Upwork account / do you subcontract?"

> No subcontracting — you work with me directly. My firm's engineering team is behind me, but every client-facing touch on Upwork is me.

---

## "Can you work weekends?"

> I try not to. I keep my Upwork load under 30 hrs/week on purpose so every client gets senior attention inside weekday hours. For urgent deploys or launches, I'll flex — but I won't promise weekend work as a default, because that's how projects get sloppy.

---

## "I've been burned by AI consultants before."

> I hear this a lot. Usually the issue is the consultant stopped at slides, or they built a demo that didn't survive a real workflow. The way I work is the opposite — I ship a working AI employee in production in 4 weeks, and the engagement is ongoing so we tune it against real usage. If you'd rather I not build until you've seen me explain it, I do free 30-min audits of current setups — no commitment. Want one?

---

## "Why's your rate so high?"

> It reflects the fact that you're working directly with me — an ex-founder of a venture-backed AI startup who's shipped this pattern multiple times — and that my firm's engineering team is behind every engagement. If budget is the constraint, I'd rather scope something smaller that I can ship fully than discount my way into half-doing a larger build. Want to find the right shape on a call?

---

## "Do you do fine-tuning / training your own models?"

> Rarely. In 9 out of 10 real-world jobs, fine-tuning is the wrong answer — the right stack is prompting + RAG + workflow design on frontier models (Claude, GPT-5). I'll tell you straight if your job is the 10%.

---

## "Is this ChatGPT or something different?"

> Different. ChatGPT is a chat interface you type into. What I build are **AI employees** — agents that have a specific role, persistent memory, access to your tools, and ongoing responsibilities. You don't "talk to" an AI employee; it just does its job, and asks a human for help when it needs to.
