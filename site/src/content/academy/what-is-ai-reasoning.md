---
title: "What is AI Reasoning?"
seoTitle: "What is AI reasoning? And when it's worth 15x the cost"
description: "Reasoning is a model talking to itself before it answers. Why that burns around 15 times more tokens, and the four kinds of work that justify the wait."
youtubeId: G3xrSvjVNNM
topic: ai-fundamentals
level: basic
order: 13
duration: 324
publishedAt: 2026-06-10
channel: "Nairon AI"
magnet: ai-agents
takeaways:
  - "Reasoning is a model holding an internal dialogue about your task, planning an approach and verifying its own working before it answers."
  - "That thinking costs around 15 times more tokens: 200 for a standard answer against 3,000 spent on the reasoning alone."
  - "Hard maths, complex code and multi-step planning are worth a reasoning model. Email drafts and note summaries are not."
transcript:
  - { t: 5, text: "Hey, my name is Mahan. I'm the CMO of Nairon. My name is Luka and I'm the CEO of Nairon. Luka, in the last episode we spoke about multimodal AI. Uh, and a big part of that is obviously reasoning. So, in this video, let's break down what reasoning is, how it works, so the audience has a better understanding of what happens in the back rooms when it comes to an AI's output." }
  - { t: 23, text: "For sure. So, think about it this way. If I ask you a very quick question and you don't do any thinking or any reasoning, um you'd essentially give me an answer right away. You would give me a pretty poor answer if it was a complicated question. Now, if it was a simple question like what's your name?" }
  - { t: 38, text: "Tell me Mahan quickly. You don't really need to think about it. And so when you think about reasoning down to its fundamental first principles is it's just a conversation with yourself on the task at hand. And the LMS, they do the same thing. they just have an internal dialogue about the task at hand and how to approach it, what the user is actually asking me for and perhaps even like planning out kind of how to answer the question. And so I have a diagram over here that basically just shows that internal dialogue if it's a standard model that's not using any reasoning." }
  - { t: 69, text: "And by the way, the best models, they have reasoning built in and they kind of know when should I reason and when I don't need to reason, which is really cool. The earlier models were just reasoning every single time you asked them. The important thing to note is that the standard models that don't do any reasoning typically you get an instant answer without any reasoning." }
  - { t: 89, text: "The quality is lower. We'll get into sort of the trade-offs between them in a little bit. But the reasoning model is actually thinking it over and it's kind of like taking its time approaching the situation. And so if we think about a very simple question like what is 23 * 47? The model hasn't memorized that for example. And so what it's doing is it's first sort of like breaking down the the the equation, right? So 23 * 47 is the same thing like 23 * 50 minus etc." }
  - { t: 120, text: "Right? And it's kind of like breaking it down perhaps in steps and reasoning. And a lot of the reasoning is also verification. M so it might have come to an answer but if it's a complicated question it'll kind of like go backwards and think about like how can I actually verify that this is the right way of doing this and then you'll get to the final answer which is you know the answer is 181 and so as the reasoning has improved in the AI models the token costs have also increased yeah definitely and there's a trade-off right so if we look here the standard model might be able to answer a very simple question with only 200 tokens But the same question proposed to a reasoning model might spend 3,000 tokens on just the reasoning because it's doing multiple loops and multiple iterations of testing itself across whatever the question is of course depending on how difficult it is. That's why sometimes when you use claude or or use chat sometimes it reasons for 2 seconds sometimes it reasons for like 30 40 seconds. And so what you can see is that the same architecture, same inputs, obviously maybe a little bit better outputs, they cost like 15 times more in tokens. And so what we've done is we advise to kind of think about and you don't really need to do this as much." }
  - { t: 195, text: "This used to be the case like 6 months ago um where you would kind of have to like think about what you give to a reasoning model, what you give to a standard model because what you want the reasoning to be about is very hard mathematical questions. anything that has any complex code, multi-step planning, anything like that that is very sort of dynamic and that you want the L&M to be careful with, you want it to reason first. However, the standard models without reasoning tend to do quite well with anything like drafting up emails or summarizing notes, anything like that can be answered quite quickly by the London." }
  - { t: 231, text: "So, let's dive deeper into the trade-offs so we can visually break that down as well. Yeah. So, I have a chart over here. We'll just go rowby row. So when we think about the two models, if time is important, you definitely want the standard models. They typically answer within a few seconds. The reasoning models can go up to a couple of minutes." }
  - { t: 248, text: "If we look at the second row over here, if cost is an issue, we definitely again want to go with the standard models cuz they can cost as we mentioned 15 times more. Now if the quality is important on an easy task, you definitely want to go with the standard model because the reasoning models would be overkill. Now the only reason why you would use a reasoning model would be when you have a high quality task that you need done carefully and where you don't have the other constraints. And so that is a very good use case of when you would use the reasoning model. A lot of the orchestration that is done on AI agents." }
  - { t: 285, text: "Orchestration is essentially the distribution of tasks on multiple AI agents is done by a very strong reasoning model because it's able to kind of take a query. It's able to take a task, distill it down into fragments, pass it over to other AI agents, other LLMs to end up doing those tasks." }
  - { t: 305, text: "Two big things we just touched on there, AI agents and orchestration. Those are going to be some things that we're going to dive deeper into in future videos. Until then, guys, if you enjoyed the video, please subscribe. You can also subscribe to our newsletter links down in the description below. You can also find us on LinkedIn where we're very active on a day-to-day basis. And until next time, I'll see you in the next video." }
---

AI reasoning is the model having a conversation with itself before it answers
you. It works the task through in an internal dialogue, plans an approach,
checks its own working, and only then writes the reply you actually see.

## What AI reasoning actually is

Ask someone their name and they answer instantly. No thinking required. Ask
them something complicated and the instant answer is a poor one, because nobody
worked anything out first.

Models split the same way. A standard model returns an answer the moment you
press enter, and on hard questions the quality is lower for it. A reasoning
model takes its time.

> Reasoning down to its fundamental first principles is just a conversation
> with yourself on the task at hand.
>
> Luka Eric, 0:38

Take 23 × 47. The model has not memorised that. So it pulls the sum apart,
rewrites it as 23 × 50 minus the remainder, and works through it in steps. Then
it goes back over its own working and asks whether that was the right way to do
it. Verification is a large part of what a reasoning model spends its time on.

That internal dialogue is the whole mechanism. Everything else about reasoning
models follows from it.

## What reasoning costs you

A standard model might answer a simple question in 200 tokens. Put the same
question to a reasoning model and it can spend 3,000 tokens on the reasoning
alone, looping and testing itself before it commits to anything. Same
architecture, same input, somewhat better output, roughly 15 times the tokens.

Time moves with the tokens. Ask Claude or ChatGPT something and sometimes it
reasons for two seconds, sometimes for 30 or 40.

## Standard model or reasoning model?

| | Standard model | Reasoning model |
|---|---|---|
| Speed | Answers within a few seconds | Can run to a couple of minutes |
| Cost | Baseline | Around 15x the tokens |
| Easy task | The right choice | Overkill |
| Hard task done carefully | Quality drops | The reason to use one |

Reasoning earns its cost on four kinds of work: hard mathematical questions,
complex code, multi-step planning, and anything dynamic enough that you want
the model to be careful with it.

Standard models cover the rest and cover it well. Drafting a reply to a
customer, summarising notes from a site visit, turning an after-hours call into
a job description: quick answers, and the quality holds up.

Six months ago you had to make that call yourself, prompt by prompt. It matters
less now. The best models have reasoning built in and work out for themselves
when a question needs it, whereas the earlier reasoning models reasoned on
every single question whether it deserved the thinking or not.

## Why orchestration runs on a reasoning model

Orchestration is the distribution of tasks across multiple AI agents. It runs
on a strong reasoning model, because the orchestrator has to take a query, break
it into fragments, and hand each fragment to another agent or another model to
carry out.

Splitting the work correctly is the hard part of that job. Get the split wrong
and every agent underneath does its own piece perfectly well on the wrong task.
When you build anything with more than one agent in it, the model doing the
splitting is the one worth paying for.
