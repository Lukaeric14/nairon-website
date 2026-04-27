# 07 — Tech Stack & Methodology

## The stack we actually use (talk about these confidently)

### Frontier models
- **Claude Sonnet 4.5** (primary workhorse for agent reasoning)
- **Claude Opus 4.7** (used for deeper planning / harder tasks)
- **Claude Haiku 4.5** (speed-sensitive inference)
- **GPT-5** (select tasks; structured output, some tool use)
- **Gemini 2.5 Flash** (multimodal, cheap lanes)
- **DeepSeek V3.2** / **Kimi K2.5** (cost-optimized fallback / specific lanes)

### Agent frameworks & tooling
- **OpenClaw** — agentic coding runtime; we use it daily for our own work and for shipping client systems.
- **Claude Code / Claude Agent SDK** — primary Anthropic agent surface.
- **Claude Skills** — packaging reusable AI-employee capabilities.
- **MCP servers** — integrations between agents and tools (Slack, GitHub, databases, filesystems, custom APIs).
- **Flux** (internal, by Nairon) — our agent orchestration framework; proof of dogfooding.
- **LangChain / LlamaIndex** — we're fluent but rarely use them for production agent systems (we prefer Claude-native patterns; OK to mention if the lead names them).
- **Vector stores** — Turbopuffer, Pinecone, pgvector, Weaviate — picked case-by-case.
- **Memory systems** — custom persistence + retrieval patterns; Supermemory for cross-session recall.

### Automation-layer tools (for comparison / integration)
- Zapier, Make.com, n8n — we integrate with them but we don't *build on* them for AI-employee work; mention we know them if the lead uses them today.

### Integration targets we've shipped against
- **CRMs:** HubSpot, Salesforce, Attio, Close, Pipedrive
- **Email:** Gmail, Outlook (MS365), SMTP gateways
- **Calendar:** Google Calendar, Outlook, Cal.com, Calendly
- **Slack** (operator alerts + approvals)
- **Notion / Linear / Asana / Jira / ClickUp** (task systems)
- **Microsoft 365 APIs** (relevant for property mgmt, enterprise)
- **Appfolio, Laserfiche** (property management industry stack — we're comfortable)
- **Real estate:** Follow Up Boss, kvCORE, Sierra Interactive, Zillow, MLS
- **Finance / ops:** QuickBooks, Stripe, Plaid

### Infrastructure
- **Dedicated Mac Mini per AI employee**, in Nairon's data center.
- **Hive** — our proprietary operations platform where AI employees live (the "workplace" for the agent).
- **Vercel** (for any web surfaces / admin UIs).
- **Convex** (reactive backend used for our own product; we deploy it for clients when it fits).

### Web stack (when UI is needed)
- TanStack Start / Next.js (App Router), React 19, TailwindCSS 4, shadcn/ui.

## Our 4-step methodology

The agent can paste or paraphrase this directly in proposals — it's the same on the website.

### 1. Identify (Day 1, morning)
- Fast working session with the CEO (and any internal owner).
- Map daily operations and pick the highest-leverage first AI employee — usually something tied to the CEO directly (inbox triage, scheduling, research, follow-up, deal-flow ops).
- Define the exact job the first AI employee will own, in writing.

### 2. Audit (Day 1, afternoon)
- Lightweight audit of existing stack and data sources.
- Design an integration path that uses tools the team already lives in.
- Set scope, KPIs, and human-in-the-loop checkpoints before we write code.

### 3. Implement (Days 2–3)
- Engineers build, test, and deploy.
- Runs on dedicated hardware inside Hive.
- Wired into the client's existing tools, ready to operate end-to-end.
- First AI employee live in **~3 days**.

### 4. Optimize (ongoing)
- Weekly operating rhythm.
- Bi-weekly strategy sessions.
- Quarterly KPI reviews.
- Continuous tuning as frontier models improve.

## What makes our agent systems production-grade (vs. demos)

The agent should surface these when the lead asks "what's different about your build?":

- **Persistent memory** — not just a chat window; the agent remembers its own history and context across days/weeks.
- **Tool use with error handling** — we catch the messy failure modes (rate limits, API drift, bad data) that kill prototype agents.
- **Observability** — every action, decision, and output is logged and inspectable in Hive.
- **Human approval gates** — sensitive actions (outbound emails, data writes, external API calls with real consequences) route to Slack for sign-off.
- **Cost ceilings** — token spend is capped; we monitor and alert.
- **Graceful degradation** — when a model returns garbage, the agent falls back rather than escalates the problem.
- **Role scoping** — each agent only has tools it needs. No god-mode agents.

## Safety & governance (for regulated leads)

- No multi-tenant commingling — dedicated hardware.
- Data stays in the client's existing tools; the AI is a user of those tools, not a side data store.
- Full audit log, exportable.
- Approval layer for sensitive actions (PII touch, money movement, external comms).
- Scoped credentials — the agent never gets admin keys when a scoped role will do.

## How to talk about multi-agent systems

When a job post (like Job 1 in `12-target-jobs.md`) specifies "team of AI agents" / "AI employees that work together":

- We frame it as a **workforce**, not a swarm. One AI employee per role, each with a clear scope.
- Agents coordinate through shared memory and queued work, with a **coordinator / manager** agent handling handoffs.
- We design the org chart first, then the agents. "What would you hire a person for?" → "Let's build that role as an AI employee."
- Reference: see the AI employee library in `02-offering-and-pricing.md` — pick the 3–5 roles the lead actually needs.

## How to talk about RAG / knowledge bases

- We build RAG systems, but we frame them as **"the AI employee's memory and reference library"** — not as a product in itself.
- A RAG system without an agent around it is just a search engine.
- Published Upwork project catalog offering: "You will get Custom Chatbot with RAG for Knowledge Bases" — $2,500 / 7 days.

## Off-limits / don't claim

- We don't build foundation models.
- We don't fine-tune at the weight level as a primary service (we use adapters and RAG / prompting / workflow design — almost always the right answer).
- We don't do pure voice-AI (IVR / call routing) as a core service.
- We don't do browser-extension-only hacks.
