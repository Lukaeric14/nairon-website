---
title: "What They Don't Want You to Know About Fable 5"
seoTitle: "Anthropic Fable 5: why the best coding model was pulled in 3 days"
description: "Anthropic's Fable 5 topped the hardest coding benchmarks, then vanished in 72 hours. The scores, the Stripe migration, and the export controls that killed it."
youtubeId: cUTjYXbS8ng
topic: ai-briefing
level: basic
order: 2
duration: 571
publishedAt: 2026-06-23
channel: "Mahan Javaheri"
magnet: ai-rollout
takeaways:
  - "Fable 5 is Anthropic's Mythos model with guardrails. Classifiers read every request and pass the flagged ones to Opus 4.8."
  - "Fable 5 scored 80.3% on SWE Bench Pro to Opus 4.8's 69.2%, and 29.3% to 13.4% on Frontier Code."
  - "US export controls barred every foreign national from Fable 5, which forced Anthropic to shut the model down."
transcript:
  - { t: 0, text: "On June 9th, Anthropic released the most powerful commercial AI model the world had ever seen. And just 3 days later, they shut it down because of the US government. And the reactions to Fable Fire were all over the board. A lot of users thought Fable wasn't anything special compared to the older models, while a lot of other users thought it was genuinely the craziest thing they'd ever used. In this wild west era of AI that we're living through right now, there's a ton of conspiracy theories and speculation surrounding this topic. So, in this video, we're going to walk through the actual facts about Fable Fire so you come out on the other side actually understanding what Fable Fire [music] is, how it compares to other AI models, why it got taken down, and what this whole thing means for the AI landscape over the next coming months." }
  - { t: 39, text: "Because I think things are going to get very crazy. So, let's dive right in. To get a better understanding of the model, you have to get an understanding of Anthropic itself. See, Anthropic was already leading the AI race with their Opus 4.8 model. Opus was the one to beat sitting at the top of the major benchmarks for coding and complex reasoning ahead of OpenAI's GPT 5.5 and Google's Gemini 3.1 Pro. If you were doing serious work, it was widely considered the best model at the time by most people. But back in April, Anthropic quietly revealed that it had built something far more powerful. A model called Mythos. And they didn't launch it like a normal product. Mythos wasn't available to the public at all, and that was on purpose because of how capable it was. This model was so good at reading code and finding security holes that in the wrong hands, that exact skill could be turned into an actual weapon. So, instead, they took a preview version of Mythos and handed it to a small handpicked group of organizations, including Microsoft, Google, Amazon, Nvidia, CrowdStrike, JP Morgan Chase through a platform called Project Glasswing. The whole point of Glasswing was defense because the single most valuable thing a model this capable can do is read through enormous critical code bases. And essentially find the security flaws in them before any attackers could. By early June, Project Glasswing had scaled up to around 150 different organizations across more than 15 countries, and it was working very well. So, how does this relate to Fable?" }
  - { t: 117, text: "See, because of the obvious security risks that would come up if Mythos was made public to the average consumer, Anthropic released Fable 5. Fable is essentially the same exact model as Mythos, except it has guardrails. And these guardrails cover three specific danger zones: cybersecurity, biology and chemistry, and something called distillation, which is people using Fables or Mythos' own answers to secretly train a cheaper copycat. And the guardrail mechanism is actually very smart. Fable runs on a set of classifiers, basically small AI models whose entire job is to read what you're asking and flag it. So, the moment you step into one of those three zones, Fable essentially taps out and it hands your requests over to the older, less capable Opus 4.8 model instead. So far, based on what we've covered, Fable 5 is starting to sound like the Darth Vader of AI models. But, let's get into how it actually compares against everything else available in the consumer market right now. When you test an AI model, you run it through benchmarks. Think of them as standardized exams, and each one is built to measure a different skill." }
  - { t: 174, text: "The big one for software is called SWE Bench Pro. It handles real engineering tickets, so actual bugs and feature requests pulled from real code bases, and checks whether the fix it writes actually works. On that test, Fable 5 scored 80.3%. Opus 4.8, Claude's previous model, sat at 69.2%. GPT 5.5 was at 58.6%, and Gemini 3.1 Pro was at 54.2%. An 11% improvement doesn't sound like a monumental change, especially when Opus 4.8 is already so far ahead of other models. But, here's where it gets interesting. There's a harder benchmark called Frontier Code, and it's built by a team at Cognition specifically to be brutal. On that benchmark, Fable scored 29.3%." }
  - { t: 214, text: "Meanwhile, Opus 4.8 managed 13.4, and GPT 5.5 got 5.7%. And that's the single most important thing to understand about Fable 5. The harder and longer the task is, the bigger its lead gets compared to other models, which really explains why there were so many mixed reactions when the model actually dropped. If you open Fable and ask it to summarize an article or write a paper and you compare it to Opus 4.8, you'd barely be able to tell the difference. But if you handed a messy code base or a multi-step task that would take hours to get done, it absolutely outdid anything else available at the time. To take this point home, let's look at what happened at Stripe. Stripe, the payments company, has its own software running in a program language called Ruby. Now, Stripe's code base is approximately 50 million lines long. To put that in perspective, most software you use on a day-to-day basis are only a couple hundred thousand to maybe a few million lines of code long. So, 50 million lines is a lot of code. And the job they handed Fable was something called a migration. That's when you have to go through the entire code base and update one specific pattern everywhere it shows up. But you can't just blindly find and replace it because every change has to actually make sense in the code around it, or you break the whole system. This kind of job normally takes a whole team of engineers more than two months of coordinated work to get done, but Fable was able to do it in a single day. Now, this all sounds very impressive, but there are a lot of drawbacks that are worth mentioning. First, it came with a privacy catch. Every other Claude model can run on what's called zero data retention, meaning Anthropic doesn't store what you type. Fable can't. To keep its safety system running, Anthropic holds onto your prompts and your outputs for 30 days. And anything it filters is actually flagged for up to two years. Microsoft actually blocked its own employees from using it because storing prompts clashed with the promise it made to protect its customers' code." }
  - { t: 318, text: "Second, for most people, it was honestly overkill. Fable's great at coding and it can do some crazy feats. But for everyday stuff 99% of consumers do, it's really not that much better than other models that are a fraction of the cost, which brings us to problem three. Fable runs at $10 per million tokens of input and $50 per million tokens of output." }
  - { t: 337, text: "That is double the price of Opus 4.8. But it's also more token efficient, so it does get to the output in fewer steps. Fewer steps to the same answers means your bill doesn't climb as high as that price tag makes it look, but on big jobs you're still paying that premium." }
  - { t: 350, text: "So, what actually led it to getting banned? Let's go down that rabbit hole. 3 days after Fable was launched, the US government used an instrument they called the Export Control Directive. That's the same legal toolkit the US uses to stop companies from selling things like fighter jets, missile parts, or advanced chip-making machines to other countries. The order itself was narrow on paper, so it said no foreign national could use Fable 5, not outside the US, not inside the US, and not even Anthropic's own employees who weren't American citizens. But that narrow order essentially forced Anthropic's hand into shutting it down. Because think about it, how does an app used by hundreds of millions of people verify the citizenship of every single user on every single request in real time? It can't. So, why did the government panic in the first place? Well, there's two versions to that story. So, according to David Sacks, who's a long-time Silicon Valley investor who's now really the White House's point man when it comes to AI, the government got a warning that Fable 5 could be jailbroken. A jailbreak is essentially just a trick that gets the model to ignore its own rules. And the specific trick here was getting Fable to read through the code base and point out the security flaws in it, which is the exact thing Mythos was built to do. Sacks alleges that when the administration told Anthropic about it, Dario Amodei said the jailbreak wasn't a serious risk and refused to fix it or pull the model. That's when the government essentially issued the export controls. Now, here's Anthropic's version of the argument. They argue that the jailbreaks actually disclosed to them were either completely harmless or so minor they gave no real Mythos-level advantage to anyone. And they also argued this exact capability is already available in other models, including GPT 5.5. Now, this is the surface level of the conflict. But here's some added context you need to understand. Because Anthropic and the current administration were at odds long before any of this even happened. Earlier this year, Anthropic drew a hard line against the US government, essentially telling the US military it would not allow Claude to be used for two specific things. Fully autonomous weapons and mass surveillance. The administration did not take that well. So, essentially DJT himself ordered every federal agency to stop using Anthropic's technology. And the defense secretary hit the company with a label called a supply chain risk to national security. This is the kind of designation normally reserved for foreign adversary companies like China's Huawei. And this was the first time in history that a US company was flagged with it. They're fighting the government in court right now arguing the whole thing is illegal retaliation, essentially punishment for refusing to drop their safety rules. And here's the kicker. While Anthropic was getting blacklisted for saying no, OpenAI was saying yes as it essentially reversed its old ban on military work, signed a deal with the Pentagon, and rolled ChatGPT out across the Department of Defense for millions of staff to use." }
  - { t: 508, text: "So, the exact moment Anthropic became the company the government wanted to punish, OpenAI became the one it wanted to partner with. So, now you can see how this makes the entire export control story a lot more com- plicated. Was it really about a jailbreak? Was it a power move by this current administration against Anthropic? Well, there's one more thread you have to follow. Several outlets report that the real trigger wasn't about a jailbreak at all. It was actually a suspicion inside the White House that a group linked to China had somehow gotten access to Mythos, and that would explain a lot. Because if a Chinese group had Mythos, they could try and reverse engineer it or distill it to build their own version. So, that essentially brings us to the end of the current fable saga. Everything's up in the air at this moment in time, but I hope this video ramped you up and gave you enough context on this ongoing drama. If you enjoyed this video, subscribe and hit that like button. If you want to get in touch, you can connect with me on LinkedIn, links down in the description below. And if you're looking to integrate AI agents into your business, you can book an AI opportunity audit with myself and my team. That's the first link down in the description below. I'll see you in the next video." }
---

Anthropic released Fable 5 on 9 June 2026 and shut it down three days later
after the US government issued export controls. It was the strongest coding
model ever sold commercially. For most of what people do with AI, you would not
have noticed the difference.

## What Fable 5 actually is

Anthropic built Mythos in April and kept it away from the public on purpose.
Mythos reads code and finds security holes well enough that the same skill,
pointed the other way, works as a weapon.

A preview went to a handpicked group instead, through a defence programme
called Project Glasswing: Microsoft, Google, Amazon, Nvidia, CrowdStrike, JP
Morgan Chase. By early June it covered around 150 organisations in more than
15 countries, and it was working.

Fable 5 is Mythos with guardrails. They cover three zones: cybersecurity,
biology and chemistry, and distillation, which is using Fable's own answers to
secretly train a cheaper copycat. Enforcement runs on classifiers, small
models whose whole job is to read your request and flag it. Step into one of
those zones and Fable taps out, passing the request to the older, less capable
Opus 4.8.

## Fable 5 vs Opus 4.8: the benchmark scores

Benchmarks are standardised exams for models, each one measuring a different
skill. Two matter here.

| Benchmark | Fable 5 | Opus 4.8 | GPT 5.5 | Gemini 3.1 Pro |
| --- | --- | --- | --- | --- |
| SWE Bench Pro | 80.3% | 69.2% | 58.6% | 54.2% |
| Frontier Code | 29.3% | 13.4% | 5.7% | n/a |

SWE Bench Pro runs real engineering tickets pulled from real code bases and
checks whether the fix works. Eleven points over Opus 4.8 is a decent jump,
nothing more. Frontier Code, built by a team at Cognition to be deliberately
brutal, is where the gap opens: 29.3% against 13.4%.

That is the whole story of Fable 5: the harder and longer the task, the wider
its lead. Ask it to summarise an article and you could not pick it out of a
lineup. Stripe handed it a migration across a 50 million line Ruby code base,
the kind of job where you cannot find and replace because every change has to
make sense in the code around it. A team of engineers would need more than two
months. Fable did it in a day.

Every other Claude model can run zero data retention, meaning nothing you type
is stored. Fable cannot: prompts and outputs are held for 30 days, and anything
the classifiers flag is kept for up to two years. Microsoft blocked its own
employees from using it, because storing prompts broke the promise it had made
to protect customers' code.

For the everyday work 99% of consumers do, it was overkill.

It ran at $10 per million input tokens and $50 per million output, double Opus
4.8. It also reaches the answer in fewer steps, so the bill climbs slower than
the sticker suggests. If those units mean nothing to you, the
[token lesson](/academy/what-is-a-token) is the one to read first.

## Why Anthropic shut Fable 5 down after three days

| Date | What happened |
| --- | --- |
| April 2026 | Anthropic reveals Mythos and keeps it out of public release |
| Early June 2026 | Project Glasswing reaches about 150 organisations in 15+ countries |
| 9 June 2026 | Fable 5 launches |
| 12 June 2026 | Export controls bar every foreign national from using it |

The US government used an Export Control Directive, the same legal toolkit
that stops companies selling fighter jets and chip-making machines abroad. The
order was narrow on paper: no foreign national could use Fable 5, outside the
US or inside it, including Anthropic's own non-citizen employees. No app with
hundreds of millions of users can verify citizenship on every request in real
time, so the model came down.

There are two accounts of why. David Sacks, the White House's point man on AI,
says the government was warned Fable could be jailbroken into reading a code
base and listing its security flaws, and that Dario Amodei called the risk
unserious and refused to pull the model. Anthropic says the jailbreaks
disclosed to it were harmless or minor and that GPT 5.5 already does the same
thing. Several outlets report a third trigger: a suspicion inside the White
House that a group linked to China had got hold of Mythos.

None of it started with Fable. Anthropic had already told the US military that
Claude could not run fully autonomous weapons or mass surveillance, and the
defence secretary responded by labelling the company a supply chain risk to
national security, a designation usually reserved for firms like Huawei and
never before applied to an American company. Donald Trump ordered every
federal agency to stop using Anthropic technology. Anthropic is in court
calling it retaliation.

## What Fable 5 means for how you pick a model

Match the model to the difficulty of the job. Drafting a late-rent reminder notice
or summarising an after-hours intake call runs fine on something cheap, and
Fable would not have written either one any better. The premium only pays
for itself on the long jobs: reconciling a month of invoices against job
sheets, or reworking every quote template after a price rise.

Retention terms are set per model. Fable and Opus 4.8 come from the same
company and store your data differently, so the answer changes every time
somebody swaps one model for another underneath your agent. If that agent
handles financing applications or customer addresses, the retention clause
decides more than a benchmark score does.

Treat the model the way you treat a parts supplier: named on the job, and
replaceable. Fable went from the best thing on the market to switched off in 72
hours, and the model itself never changed. Anything in your business that only
runs on one model stops running on the day that model does, and you do not get
notice.

Write down which model each of your agents runs on. Once a quarter, put the
same ten real jobs, your actual intake calls and your actual quotes, through
the second-best model and keep the outputs side by side. The gap you measure is
what a forced switch would cost you, and the best model on the market
disappeared in three days for reasons that had nothing to do with the model, so
do not build a workflow only one model can run.
