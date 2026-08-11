---
title: "What is Effort in AI?"
seoTitle: "What is reasoning effort? Claude's low, high and max settings"
description: "Claude defaults to high, and max is the wrong choice for most of what you ask. What each effort setting changes, and what the extra thinking costs you in tokens."
youtubeId: DXLsDKX3O0c
topic: ai-fundamentals
level: advanced
order: 26
duration: 178
publishedAt: 2026-07-18
channel: "Nairon AI"
magnet: ai-cost
takeaways:
  - "Claude ships on high. That is the right default."
  - "Effort is how many tokens a model spends reasoning before it replies: 200 tokens for a straight answer against 3,000 for a reasoned one, or roughly 15 times more."
  - "Use low when speed matters, and save max for complex work where you need a high-quality answer first time."
transcript:
  - { t: 4, text: "[music] Hey, my name is Muhammad. I'm the CEO of Nura. My name is Luka. I'm the CEO of Nura. Guys, in today's video we're going to be going over effort and what it is when it comes to AI. And to display that very quickly, Luka actually has Claude here open. And maybe we can show them actually where they can find the effort setting and how they can change it." }
  - { t: 21, text: "Yeah, so it's super simple. Um, right where you would enter all the text to essentially send a message over to the LLM. Um, just click here where the open is 4.8 is and you can see that it's 4.8 high. Scroll down all the way and then you'll see effort tab. Typically the default is on high, but you can lower it to lower or you can put up to max. Um, and you can also turn on and turn off thinking. But, yeah." }
  - { t: 45, text: "Okay, so let's break down what effort actually is in function as well so the audience has a better idea of when to use what and how it essentially works. So, effort can be applied to any question, any query, anything that you give the LLM." }
  - { t: 57, text: "So, similarly when you would ask a human to put more effort into a task, they would probably take longer. They would probably think through it a little bit harder. The same way you can ask the LLM to do the same. Now, everybody might think, well, why don't we just always give it the highest settings and just make it think the most and give me the best results. The problem is that it takes longer and then it costs a lot longer in terms of tokens to be able to run the LLM at max level at all times." }
  - { t: 84, text: "Now, because the LLMs are already really, really intelligent as they are today, it's actually counterintuitive to use a max effort setting for something that's quite basic. And so, if you ask it a really simple question like, what is the capital of France? It doesn't need the max setting for that. It probably could do the very low setting." }
  - { t: 102, text: "And by the way, if speed is really important, then using the low setting is most of the times the best thing to do. And one thing that goes a little bit under the radar is that the higher the effort, the more tokens that the model is going to use. And so, another reason why you don't just want to default to the highest effort." }
  - { t: 120, text: "Is effort really a measure of reasoning then? Yeah, and just to recap, reasoning is essentially the LM thinking, going back and forth with itself to sort of figure out what's the answer to the question. So, if you use low, you might actually go straight from the ask directly to the answer, what the old LLMs used to do." }
  - { t: 139, text: "The new LLMs do this reasoning loop, and essentially max effort is the most amount of reasoning that an LLM can do to get to the final answer. It might even check the final answer, go back and forth, and keep thinking through the problem." }
  - { t: 152, text: "Okay, and a much shorter video today, but regardless, it's still pretty important, especially when it comes to more complex tasks where you really need that high-quality output straight off the bat. This is a dial you can turn up and turn down depending on what you're looking to do at that given moment in time. So, guys, if you enjoyed this video, you can subscribe to the channel." }
  - { t: 168, text: "You can also subscribe to our newsletter. Links down in the description below. You can follow us on LinkedIn. We're very active on a day-to-day basis. Until next time, we'll see you in the next video." }
---

Effort is the dial that decides how hard a model thinks before it answers you.
Turn it up and the model spends more tokens and takes longer to reply. Turn it
down and the answer comes back almost straight away.

**Effort:** the setting that controls how many tokens a model spends reasoning
before it replies. Claude ships on high, drops to low, pushes up to max, and the
same menu turns thinking off altogether.

## Where the effort setting lives

In Claude, click the model name sitting next to the box where you type your
message. Scroll to the bottom of that menu and you will find an effort tab. The
default is high. You can drop it to low or push it up to max, and the same menu
lets you turn thinking on and off.

Effort applies to anything you send: a one-line question, a long document, a
task you hand to an agent.

## Is effort the same as reasoning?

Effort is how much reasoning you are buying. Reasoning is the model arguing with
itself before it commits to an answer, and the [reasoning
lesson](/academy/what-is-ai-reasoning) covers that loop in full.

What moves when you turn the dial is how much of the loop runs. On low the model
can go from your question straight to the answer, which is what older models
did. On max it reasons as far as it is capable of, then checks the answer it came
up with, goes back, and keeps working the problem.

## Why max is the wrong default

The obvious move is to leave it on max and always get the best result. Two
things stop that being a good idea.

It takes longer. And it uses more tokens, which is the part that goes under the
radar. The thinking a model does before it replies is made of tokens too, so a
max-effort answer costs more than a low-effort one even when the reply on your
screen is the same length. The reasoning lesson puts the gap at 200 tokens for a
straight answer against 3,000 spent on the reasoning alone: same question, same
architecture, a slightly better answer, roughly 15 times the tokens.

Models today are already intelligent enough that pushing a basic task to max
works against you. Asking for the warranty length on a water heater does not
need max. Low would do it.

| Setting | Use it when |
| --- | --- |
| Low | Speed matters more than depth, or the question has one obvious answer. Looking up a part number, drafting a two-line reply to a homeowner. |
| High | The default, and the right place for most work. Leave it here unless you have a reason not to. |
| Max | Complex tasks where you need high-quality output first time. Working out why a batch of renewal offers keeps slipping, or planning a week of dispatch across your service vans. |

## Does higher effort cost you money?

Inside a chat subscription, no. You pay for it in waiting, and in how quickly
you reach the ceiling of your plan. Through an API you pay per token, so effort
goes onto the bill directly:
[subscription vs usage](/academy/subscription-vs-usage) prices a task at $0.60
to $1.00 a run, and the reasoning tokens are the share of that number effort
moves.

## What turning thinking off does

Off is not a lower rung on the same ladder. It removes the loop, and low can
send the model from your question to the answer anyway, so in practice the two
land close together: an instant reply, and quality that drops on anything hard.
That is the old kind of model, and it is a fine way to run a lookup.

Where the setting earns real attention is work you are not sitting and watching.
An [orchestrator](/academy/what-is-an-orchestrator) splitting a job across other
agents is doing the multi-step planning that reasoning exists for, and a bad
split is expensive: everything downstream executes cleanly against the wrong
brief. That is the run where you leave the effort high and pay the tokens.
