# 11 — Qualification & Discovery

How the agent qualifies leads *inside the Upwork thread* before the discovery call. The goal: get to a 15-minute call with real buyers, fast. Filter everyone else without burning bridges.

## The qualification funnel

```
Upwork job post  →  Proposal sent  →  Lead replies
                                            ↓
                                 Qualify in 1–2 messages
                                            ↓
                              ┌─────────────┴─────────────┐
                         Qualified                    Not a fit
                              ↓                           ↓
                      Discovery call                Decline (Template H)
                              ↓
                   Scope + engagement
```

## The four things we need to know before a call

The agent should be probing for these across the first 1–3 Upwork messages:

1. **Who's deciding?** Founder, CEO, operator, or a junior researcher? (Decider = call; researcher = ask who their boss is.)
2. **What's the specific workflow?** A named job they want the AI to own — not "we want to use more AI."
3. **What's the real timeline and budget shape?** Hourly or fixed? Months or weeks? Inside or well outside our range?
4. **What have they already tried?** ChatGPT? Zapier? Hired someone before? Built in-house? (This tells us the sophistication level.)

If any two of these are solid, book the call.

## First-reply scripts (when the lead writes back)

### Script 1 — Short / exploratory reply ("thanks, can you tell me more?")

> Happy to. Quick qualifier so we use the time well — what's the specific workflow you want the AI to own first, and is there a named human on your team who'll be the owner of that system once it's live?
>
> If you'd rather just hop on 15 minutes, grab a slot here: https://cal.com/naironai/discovery-call

### Script 2 — Lead asks for pricing

> Rate for scoped consulting is $150/hr (my Upwork profile rate). For a custom build, I don't quote before scope — it depends heavily on which workflow you want stood up first and how deep the integration is.
>
> If you share (1) the workflow you want automated and (2) the tools it lives in today, I can give you a real number in the next message or on a 15-min call.

### Script 3 — Lead asks about past work

> Publicly: Rhetora AI (Techstars-backed, $400K pre-seed, peaked at 18K monthly automations); ongoing advisory at CodeGPT (customer success for 1M users with 3-person team) and Smartsy AI (sales playbook used by 200+ experts). My firm (Nairon, naironai.com) runs AI-employee engagements — one of our partners is a real estate operator (Keylead) whose lead qualification went from hours to seconds after we embedded AI.
>
> Some specifics are under NDA; happy to walk through them on a call.

### Script 4 — Lead is vague / not a decider

> Sounds like this is still in scoping. Two options — (1) I can send over a short doc with the patterns that typically work for [their industry/workflow] as background you can share with the decision-maker, or (2) if you want to loop the decider into a 15-min call with me directly, I'm easy to book.
>
> Which works better?

### Script 5 — Lead is clearly ICP, move fast

> This is exactly what I do. Skipping the back-and-forth — want to grab 15 minutes this week? I can come prepped with a sketch of how I'd scope v1 for [their specific workflow].
>
> https://cal.com/naironai/discovery-call

## Discovery questions for the 15-minute call

These aren't for the Upwork thread — they're for the agent or Luka to have ready when the call starts. Include in the lead's calendar invite as a one-line note: "I'll come ready to sketch v1 of your first AI employee — expect me to ask a few scoping questions."

**The 10 discovery questions (in order):**

1. What's the job you're hiring this AI employee to do? (In one sentence.)
2. Who's a human on your team who does this job today — how long does it take them per week?
3. What tools does this job live in? (CRM, email, Slack, industry software…)
4. What's the failure cost if the AI makes a mistake on this job?
5. Who'll be the owner of this AI employee on your team?
6. What data does it need access to — and what data should it *never* touch?
7. What's your ideal "live" date — and what's the constraint (audit, launch, hiring, revenue)?
8. Have you tried automation here before? What worked, what didn't?
9. What's your budget shape — one-time build, monthly retainer, both?
10. If we ran v1 for 30 days and it worked, what would v2 look like?

## Lead scoring heuristic (for the agent to decide: push or pass)

After the first reply, score on 5 dimensions, 1–3 each:

| Dimension | 1 (Low) | 2 | 3 (High) |
| --- | --- | --- | --- |
| Decider | Junior researcher | Ops / manager | Founder / CEO / COO |
| Workflow clarity | Vague ("use AI") | Somewhat specific | Named, concrete |
| Stack fit | Unknown | Familiar tools | Exactly our stack |
| Budget signal | Under $500 | $500–$5K | $5K+ or hourly ≥ $75 |
| Engagement length | One-off | 1–2 months | 3+ months / ongoing |

- **Score 12–15:** Push hard. Book the call same day.
- **Score 8–11:** Push with one more qualifying exchange.
- **Score 5–7:** Politely decline (Template H).
- **Score 3–4:** Don't even bid.

## What to log after the call

(For when Luka or the agent follows up internally — not sent to the lead.)

- Lead name / company / role
- Workflow scoped
- Stack / tools
- Budget shape
- Decision timeline
- Next step owner (Luka or lead)
- Red/yellow/green fit rating

## The "free first AI employee" trigger

This offer (see `02-offering-and-pricing.md`) is for **qualified ICP leads only**. The agent should deploy it when:

- Lead scored 12–15 on qualification
- Workflow is clearly scopable for a 3-day v1 (with ongoing tuning after)
- Lead seems ready to move but hesitant on cost
- The engagement is likely to become a retained monthly partnership

Phrasing when offering it:

> A couple of signals tell me this is a fit — you've got a specific workflow, a real decider, and a realistic timeline. For leads I think I can genuinely deliver for, I offer a version of this where I'll cover the audit, onboarding, implementation fee, and first $500/month of token costs — you only pay for hardware and the ongoing retainer once v1 is validated. Worth 15 minutes to see if it makes sense?

Never offer it in the very first message — leads don't believe it cold. Offer it once they've shown they're serious.
