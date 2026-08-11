---
title: "What is a Skill?"
seoTitle: "What are agent skills? How AI agents load your SOPs"
description: "A skill is a prompt your AI agent loads the moment a task needs it. Not model training, not fine-tuning: the SOPs already sitting in your drive are most of the work."
youtubeId: Z3rQbHd6u7U
topic: ai-fundamentals
level: advanced
order: 16
duration: 280
publishedAt: 2026-06-13
channel: "Nairon AI"
magnet: ai-agents
takeaways:
  - "An agent skill is a prompt an agent loads out of a library at the moment a task calls for it, and the line at the top of the file is what gets it picked."
  - "Writing skills has nothing to do with training a model, which costs hundreds of millions and happens inside OpenAI, Anthropic, Gemini and the other big labs."
  - "Your internal SOPs are already skills, written for humans, and an agent can run the same steps."
transcript:
  - { t: 5, text: "Hey, my name is Moan. I'm the CMO of Nairon. Hey, my name is Luka and I'm the CEO of Nairon. Luka, let's talk about skills in this video. Uh, I'm sure the vast majority of our audience has heard of it. Maybe some have even used them. U, but there's a lot of confusion on, you know, what they are and how they apply to the day-to-day workflow of, say, a business that's going to use them for their LMS." }
  - { t: 24, text: "For sure. So essentially a skill is nothing more than just a prompt but it's inserted at a specific time for the LLM or in this case many of the times an AI agent so that it knows what to do for a specific task that it's been given. Now a lot of the time skills live in something that are called skill libraries. You could have five skills, you could have 100 skills. The agents are able to realize at what point do they need a skill to do a certain task." }
  - { t: 51, text: "So for example, if you needed to write some copy and you had a copywriting skill, whenever you ask it anything associated to copywriting, it will actually say, \"Hey, I know about this book on copywriting.\" And it'll go and it'll read through essentially the prompt, right? It's a it's a version of instructions and examples. And we'll get into more details on what exactly it constitutes. But as you can see over here, when the task arrives from the AI agent, it goes and looks at its skill library and then identifies which skill is important, which one isn't, and then it invokes that skills, which means essentially reading the skill to now start using whatever is in that skill." }
  - { t: 87, text: "So the makeup of a skill is really whatever you bake it just like a prompt. But the best skills always have some type of system prompt up in the very beginning like I will probably be asking you to do this task when I need to write up a blog or anything like that. It will have almost always very good examples specifically when it comes to the output that you're requiring. And then it'll have a step-by-step sort of procedural guide. So whenever I ask you to write some copy before you do that please do some research. And then finally it'll let the LLM know what tools are available. So if you need to write copy and you need to check grammar, use a Grammarly MCP for example." }
  - { t: 126, text: "In the past, we've encountered this with business owners. Often times they confuse a skill with training an AI model. So what is the distinction there? The key thing to understand is that almost nobody other than OpenAI, Anthropic, Gemini, and the big labs are training models. You train models when you have hundreds of millions of dollars to spend on actually training, specifically fine-tuning and retraining." }
  - { t: 151, text: "That is something that most of the times is going to be out of reach for a lot of people. What a skill is is just a further instruction on what needs to get done. And by the way, a skill will most likely be an SOP that's internal to a company. Something that is not found on the internet, something that you cannot get from anywhere else. We've noticed, for example, when we use coding agents that we're doing the same repetitive things on and on. For example, if we need to push some code, there are some checks that we need to do that could all be embedded in a skill and we just invoke it once and it runs through all the 10 15 things that it needs to do. I don't need to sit and at the end of my sessions always tell it what it should do. That is a very big distinction we need to make because we hear a lot of business owners basically tell us, oh, like, yeah, I'm documenting and I'm I'm doing all of this good work because I'm going to train the model. You don't actually train the model. Remember, every time you interact with an AI agent, their context windows is at a zero. They don't know anything. You need to constantly retell it the same thing for it to pick off and for it to actually know what it needs to do. And this is revolutionary because it takes an LLM from being just a generalist from being an expert in the specific task that you wanted to do at that given moment in time. Yeah, there's many cases where you would need a generalist and chat does fine, but in many cases you need more specialized agents for particularly the task that you're trying to solve. I mean, just think about all of the internal company SOPs that we have. All of those are skills, but they're made for humans to follow. Um, a lot of the times when we do build AI agents for for clients, so we're using the existing SOPs to then give to an AI agent to run those or at least have context on what what Jane from accounting is doing. Um, so yeah, definitely very important to understand what skills are and how to build skills." }
  - { t: 263, text: "And in later videos, we'll go over in more detail how exactly we build some of these tools. Exactly. And until then guys, you can subscribe to our newsletter links down in the description below. You can also follow us on LinkedIn where we're very active on a day-to-day basis. Until then guys, we'll see you in the next video." }
---

An agent skill is a prompt your [AI agent](/academy/what-is-an-ai-agent) loads
at the moment a task calls for it. It sits in a library with the rest of your
skills, and when work arrives the agent reads the one that matches the job and
follows what is written in it.

## How does an agent pick a skill?

Ask an agent to write some copy. If there is a copywriting skill in its library
it stops before writing a word, reads that skill, and then writes. Invoking a
skill is that literal: the task arrives, the agent looks over the library, works
out which skill is relevant and which is not, and pulls the text of the winner
into its [context window](/academy/what-is-a-context-window).

A library can hold five skills or a hundred. The agent picks.

It picks off the first line or two of each file, the part that says when the
skill applies, which is also where this goes wrong. Write that line loosely,
or write two skills that both sound like they cover quoting, and the agent
either reads the wrong one or reads none and answers out of general knowledge
instead. Nothing errors and nothing warns you. You get a fluent reply that
skipped your process, and you only catch it by reading the output and noticing
which of your steps are missing from it. So write the trigger line about the
trigger rather than the topic: "when a customer asks for a quote on a
replacement system" beats "quoting".

## What goes in a skill file?

A skill is whatever you put in the file. The ones that work have four parts.

1. **A line at the top about when to use it.** Something like "I will be asking
   you to do this when I need a blog written." That line is what tells the agent
   this is the skill for the job in front of it.
2. **Examples, especially of the output.** Show the finished thing you want
   back, in the format you want it back in, because the format is the part an
   agent gets wrong most often.
3. **A step by step procedure.** "Before you write any copy, go and do
   research." Write it in order, since the order is exactly what people leave
   out when they explain a job out loud.
4. **The tools it can use.** If the copy needs a grammar check, say so and point
   it at a tool connection, a Grammarly [MCP](/academy/what-is-an-mcp).

## Is a skill the same as training a model?

Business owners tell us they are documenting everything so they can train the
model. They are not training anything. Training a model means hundreds of
millions of dollars spent on fine-tuning and retraining, and in practice it
means OpenAI, Anthropic, Gemini and the other big labs. Almost nobody else is
doing it, and it is out of reach for everyone reading this.

|  | A skill | Fine-tuning a model |
| --- | --- | --- |
| **Cost** | Your time writing the file | Hundreds of millions of dollars |
| **Who does it** | You | OpenAI, Anthropic, Gemini, the big labs |
| **When it applies** | At run time, when the task arrives | At training time, before you ever touch the model |
| **How you change it** | Rewrite the file, the next run uses it | Another training run |

A skill is further instruction on what needs to get done, handed over at run
time, which is why you can rewrite it this afternoon and see the difference on
the next task.

The reason you need one comes back to the context window. Every time you start
with an agent, that window is at zero. It knows nothing. It does not know which
quotes need the owner's sign-off before they reach the customer, or that a
no-heat call in January jumps the queue, and it does not remember that you
explained both of those yesterday. You tell it again, every time, and a skill is
how you tell it without typing. What that buys you is the model handling an
after-hours no-heat call the way your best dispatcher would, for that one call,
and going back to being a generalist afterwards.

## Can I turn my SOPs into AI skills?

Every internal SOP your company has is already a skill, written for a human to
follow. The intake script your office manager uses on an after-hours call, the
checklist a unit has to clear before move-in: that is the same material an
agent needs, and it is material it cannot get anywhere else, because none of it
is on the internet.

When we build agents for clients, we start from the SOPs that already exist,
either so the agent can run them or so it has context on what Jane from
accounting spends her day doing.

The tell for a skill worth writing is repetition. We hit it with our own coding
agents, where pushing code means ten or fifteen checks and someone was retyping
them at the end of every session, so it went into a skill. Now it is one
invocation and the agent works through the list.

[A harness](/academy/what-is-a-harness) is next, which is everything wrapped
around the model rather than fed to it: the tools, the permissions, the loop it
runs in.
