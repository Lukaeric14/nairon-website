---
title: "Meta's Muse Spark 1.1: Cheap, and Built to Be an Agent"
seoTitle: "Meta Muse Spark 1.1: price, benchmarks vs Opus and GPT-5.5"
description: "Muse Spark 1.1 is mid-pack on raw benchmarks and first on tool use, on Meta's own numbers, at a quarter of the price of Opus 4.8 and GPT-5.5. What to do with that."
youtubeId: eqxwJC6wsFs
topic: ai-briefing
level: basic
order: 3
duration: 271
publishedAt: 2026-07-16
channel: "Luka Eric"
magnet: ai-rollout
takeaways:
  - "Muse Spark 1.1 runs at $1.25 per million input tokens and $4.25 per million output tokens, roughly a quarter of what the flagship OpenAI and Claude models charge."
  - "Muse Spark 1.1 takes first place on the tool orchestration benchmarks on Meta's own numbers, and stays mid-tier on hard code, scoring 61.5 on SWE-bench Pro against Opus 4.8's 69.2."
  - "Its attack success rate on the StrongReject jailbreak test fell from 25% in the previous version to half a percent in 1.1, a narrower measurement than Meta's headline of fewer than one in ten single-turn attacks getting through."
transcript:
  - { t: 0, text: "Meta Muse Spark 1.1 just released, and it might just be the most interesting model drop of the year. I've got to be honest, I've completely written off Meta in the last year. It seems like they've completely missed the AI train compared to Anthropic, OpenAI, and Google. But, it looks like they're back. So, what's so special about this new model? To be honest, it's not the best at coding, it's not even the best at reasoning, and on raw benchmarks, it sits mid-pack." }
  - { t: 21, text: "But, two things make it stand out. First, it's one of the cheapest frontier models out right now. And second, it's engineered specifically around being an agent. So, this video is the technical breakdown on what's changed from Llama to Muse Spark under the hood. Let's get into it. For years, Meta's flagship AI was Llama, and Llama had two things going for it. It was open weights, and it was general purpose. The interesting thing about Muse Spark is that it's going in the opposite direction. First, it's closed. You can use it for free inside Meta's AI app, or you can use it through Meta's API. Second, Muse Spark is built specifically to be an agent." }
  - { t: 52, text: "Meta said they rebuilt their entire training stack from scratch with new architecture, and the results matched the old Llama 4 model with 10 times less compute. And the capability curve was just as steep. On an independent scoring system called Intelligence Index, the old Llama 4 scored an 18, whilst Muse Spark scored a 52. And that jump happened in about a year. The 1.1 that just dropped is the new upgrade. It's the first Muse model with a paid API, a serious jump in coding and tool use, all with significant safety improvements compared to the last version. So, what makes 1.1 actually good at being an agent? Three things. The first is memory. It has a 1 million token context window, which means it can run long and complex tasks without any issues. The second is orchestration. Muse Spark can run copies of itself. As a main agent, it splits a big job into pieces, and hands them to sub agents. These are parallel copies working at the same time. If you use Cloud Code, this would sound familiar. It's the same idea of spinning up sub agents. And the third is computer use with actual judgment. It's trained to operate software through a browser, either on desktop or mobile, and it can choose between writing a quick script to do something in bulk or just clicking through the interface directly, depending on which one's faster. Now, let's get into the actual benchmarks. As we can see, Muse Park wins on agent and tool work. On Humanities last exam, it scored a 62.1 ahead of Opus's 57.9. On the two big tool orchestration benchmarks, MCP Atlas and Job Bench, which measure how well a model actually uses external tools, Meta reports it takes first place. And on agentic finance tasks, it actually beats Opus and GPT-5.5. So, on the can it actually operate things access, it's actually genuinely frontier. And then there's the safety story, which is the most impressive technical leap in this whole release. On a jailbreak test called the strong reject, the attack success rate, which is how often a bad actor actually slips through the guardrails, the score actually fell from 25% of the time with the previous version to only half a percent in 1.1." }
  - { t: 167, text: "Meta's framing is that fewer than one out of 10 single-turn attacks actually get through versus roughly one out of five attacks in GPT-5.5. And so, former OpenAI policy researcher actually summed this up and said Meta used to be the lab that actually leans more towards capability over safety, and now that spot belongs to xAI alone. Now, let's talk about the actual technical execution. On the SWE-bench pro, which scores the actual software engineering fixes, it got a 61.5 and that barely edges over GPT-5.5 at 58.6 and well behind of Opus's 4.8 at 69.2. However, nowhere near Fable 5's 80.3. And it's the same story on the terminal bench, a second coding test where Muse Park actually landed an 80, just behind GPT-5.5 and Opus again. Muse Park 1.1 is great at orchestrating and deciding, but mid-tier writing hard code. However, price is the real game-changer here. The model runs at only a dollar 25 per million input tokens and 425 per million output tokens, roughly just a quarter of what the flagship models of OpenAI and Claude use. And here's what actually makes that actually dangerous. Men are built the API to be a drop-in replacement. It's compatible with OpenAI and Anthropic's SDKs. So, if you're a developer already building on GPT and Claude, switching over is basically a one-line change. So, here's the honest technical read on Muse Spark 1.1. It's not the smartest model, it's not the best coder, and it will not top a general leaderboard. But, it's cheap, safe, and genuinely frontier. Not to mention that it's a fraction of the price of anything close to it. If you enjoyed this breakdown, subscribe to the channel. You can connect with me directly on LinkedIn. The link is in the description below. And if you run a business doing two to 10 million dollars a year, you can book an AI opportunity audit with myself and my team. That's the first link in the description below." }
  - { t: 270, text: "I'll see you in the next video." }
---

Meta's Muse Spark 1.1 is one of the cheapest frontier models you can run, and
Meta built it to be an agent rather than a general-purpose chat model. On raw
benchmarks it sits mid-pack. Put Muse Spark in front of real software with a job
to finish and Meta reports it takes first place. If you already pay for GPT or
Claude by the token, this is the release that changes what you pay, not what you
can do.

## What changed from Llama to Muse Spark

Meta's flagship was [Llama](/academy/ai-models-llama) for years, and Llama had
two things going for it: open weights, and general purpose. Muse Spark goes the
opposite way on both. It is closed. You use it free inside Meta's AI app, or you
pay for it through Meta's API.

Rebuilding the entire training stack from scratch on new architecture got Meta
the old Llama 4 result with ten times less compute. Intelligence Index, an
independent scoring system, puts Llama 4 at 18 and Muse Spark at 52, about a
year apart. Version 1.1 is the upgrade that just landed: the first Muse model
with a paid API, a jump in coding and tool use, and the safety numbers below.

## Why Muse Spark is good at agent work

Muse Spark carries a one million token context window and can run copies of
itself. [A token is about four characters](/academy/what-is-a-token), so a
million of them is roughly 750,000 words: every job sheet, quote and complaint
email your team wrote last quarter, held in front of the model at once instead
of the early half [falling out](/academy/what-is-a-context-window) while it
works on the rest. The copies are how Muse Spark handles the size. A main agent
splits a big job into pieces and hands them to sub agents, parallel copies
working at the same time. Sub agents work the same way in [Claude
Code](/academy/claude-code).

Computer use is the part that decides whether any of this reaches your business.
Muse Spark is trained to operate software through a browser, on desktop or
mobile, and it picks how: write a quick script when the work is bulk, click
through the interface when clicking is faster. That is the difference between a
temp who fills in the same form 400 times and one who works out that 400 forms
want a script. If your operation lives inside a maintenance vendor's dispatch
portal or a renters-insurance claims site with no API, that choice is most of
the job.

## Muse Spark 1.1 vs Opus 4.8 and GPT-5.5

| Test | Muse Spark 1.1 | Opus 4.8 | GPT-5.5 |
| --- | --- | --- | --- |
| Humanity's Last Exam (broad knowledge and reasoning) | 62.1 | 57.9 | not published |
| MCP Atlas and Job Bench (using outside tools) | first place, per Meta | not published | not published |
| Agentic finance tasks (money jobs run end to end) | wins, per Meta | behind, no figure given | behind, no figure given |
| SWE-bench Pro (fixing real software bugs) | 61.5 | 69.2 | 58.6 |
| Terminal Bench (command line work) | 80 | ahead, no figure given | ahead, no figure given |

Two of those five tests measure whether a model can pick up an outside tool and
finish something, and those two are where Muse Spark takes first place. They are
also the two that look like work you would hand it. SWE-bench Pro is the row to
read if you are paying someone to build software on this model: 61.5 edges past
GPT-5.5 and lands just under eight points behind Opus 4.8. Anthropic's Fable 5,
[the model that was pulled after three
days](/academy/anthropic-fable-5-explained), scored 80.3 on
the same test. Muse Spark 1.1 orchestrates and decides at frontier level, and
writes hard code at mid-tier.

The safety result is the biggest technical leap in the release, and it arrives
as two numbers that are not the same number. StrongReject is a jailbreak test,
and its attack success rate counts how often someone slips a banned request past
the guardrails. Muse Spark's StrongReject rate fell from 25% in the previous
version to half a percent in 1.1. Meta's broader framing is that fewer than one
in ten single-turn attacks get through, against roughly one in five for GPT-5.5.
Those two figures sit twenty times apart because they measure different things:
half a percent is the StrongReject score, one in ten is Meta's own headline
across single-turn attacks generally. Quote the test. A former OpenAI policy
researcher summed the release up: Meta used to be the lab that leaned towards
capability over safety, and that spot now belongs to xAI alone.

## Muse Spark pricing, and when to switch

Muse Spark 1.1 runs at $1.25 per million input tokens and $4.25 per million
output tokens, roughly a quarter of what the flagship OpenAI and Claude models
charge.

| Per million tokens | Muse Spark 1.1 | Flagship OpenAI or Claude model |
| --- | --- | --- |
| Input | $1.25 | about $5 |
| Output | $4.25 | about $17 |

The right hand column is that quarter claim worked backwards, not a published
price list, so read it as the ratio and check your own invoice.

Meta built the API as a drop-in replacement, compatible with the OpenAI and
Anthropic SDKs, so a developer already building on GPT or Claude switches with a
one-line change. That matters to you in one way. Nobody can tell you the switch
is a big project.

The work most rent-and-renewals teams hand to an agent is [tool
calling](/academy/what-is-a-tool-call) and clicking: pull the lease from the
CRM, check the property manager's calendar, send the renewal offer, chase the
signature on day 31. None of that is hard code, and all of it is the profile
Muse Spark is priced for.
Pull last month's token bill for that automation and divide it by four. If the
number that comes back is not worth the switching work, stay where you are.
