---
title: "What are AI Frameworks?"
seoTitle: "What are AI frameworks? And do you need to care which one?"
description: "An AI framework is the pre-built plumbing between a model and a working agent: model routing, conversation state, tool errors. Which ones people use, and when the choice is yours."
youtubeId: ozH7byqfYso
topic: ai-fundamentals
level: advanced
order: 25
duration: 364
publishedAt: 2026-06-29
channel: "Nairon AI"
magnet: ai-agents
takeaways:
  - "An AI framework is the pre-built plumbing between a model and a working agent: model routing, conversation state and tool error handling."
  - "If you're buying an agent, the framework underneath it isn't your decision, and most of the time you'll never know what it is."
  - "If you're building in house, use the framework your developers already know, and avoid the newest one, because free projects get discontinued."
transcript:
  - { t: 5, text: "Hey, my name is Mahan, the CEO of Nara. My name is Luka and I'm the CEO of Nairon. Luka, over the past couple videos, we've gone through the AI fundamentals, slowly gone into more agentic concepts, and in today's video, we're going to cover AI framework. So, for the audience to get a easy introduction into what AI frameworks are, let's start with an analogy and take it from there." }
  - { t: 23, text: "For sure. So an analogy that we like to give is that every good restaurant has a really good chef but also a fully stocked kitchen. In a kitchen you have your refrigerators, your ovens um and all the other tools that come along with a kitchen. In this case when we are building an AI agent which is essentially like a dish in this analogy um it's obviously important to have a really good chef which is the model the intelligence behind how to actually produce a dish in this case. Uh, but you have to have like a really good oven and you you have to have a really good refrigerator to be able to execute the work. And so instead of building your own refrigerator and building your own oven, you essentially buy a refrigerator and an oven that works. And you don't really bother yourselves with the intricacies of how exactly an oven works or how exactly a refrigerator works. Uh, we'll get into more details exactly, but I want to give you a very quick idea of some of the biggest players in the space. Um the first sort of AI framework that came up uh was lang chain really good up until today. Um there is a learning curve as a developer on how to learn lang chain and then how to build AI agents but it's a very good generalpurpose agent builder. You could say lang chain has a bunch of little assets that you can pull from um if you need that certain type of functionality for your agent. Other ones as well as by the U Lama family is the Lama index." }
  - { t: 106, text: "That's really good if you're looking to do anything that is search related or if your agent has a lot of uh search related tasks that it needs to do. Um really good to use some of their assets. And then there's others lesserk known ones um like Crew AI and Autogen and some of the really big model companies like OpenAI and Anthropic. they have their own AI frameworks that they've used to actually build their own agents like cloud code uh which you can essentially use them. If we look here a little bit more detail on what exactly those like pre-built tools are you can see and I mentioned already the ability to actually connect to a model or for example the ability to route to a different model for a different use case or perhaps when a model is down. So as we might know um sometimes Entropic and all these other bigger model companies sometimes their models experience performance degradation. The latency is increased um the model is not providing as good of an an answer. Um sometimes we need to quickly shift over to another model without the end user actually knowing that now we're operating on a different model. Another example is managing a conversation. So you could use an agent for five minutes continuously, step out for an hour. The agent is not essentially going to be running waiting for you every minute um and every second to reply. It'll essentially sort of like cool down waiting for you to come back. That sort of like engineering plumbing work is all done by these libraries. Another one is like handling tools. We spoke about MCPs, CLIs, and APIs. Um and all of those functionalities bring a lot of errors and error handling is one of the biggest things that is being provided by these uh by these frameworks." }
  - { t: 212, text: "Now that we're covering more complex topics, it's always important to take a step back and actually bring the topic back to how it affects day-to-day business owners. So why should a say non-technical operator even concern themselves with an AI framework?" }
  - { t: 225, text: "Well, essentially they don't need to. It's not really a decision on the buy side of the process. um you're not buying a specific agent because they're built on a certain framework. You're not even using an agent because they're built on a certain framework. Most of the times you don't even know. Um however, if you're looking to build this in house, that's when you should concern yourself. It's really a developer question. So, what are my developers familiar with? What functionality do I need? And what are the limitations of some of these frameworks? So, say for example, my team is wellversed on Crew AI. Well, we should just use crew AI because it covers essentially 90% of the same frameworks. Now, another very important thing is that sometimes on very rare occasions and this is why planning is important, the frameworks can be very opinionated and that will actually shape how the agents are built." }
  - { t: 276, text: "So, if you need a very quick agent um with not a lot of overhead, you might choose something else rather than lang chain. However, on the other end, if you are building a multi-purpose um agent, then you would go with Langchain cuz it's probably one of the most uh profound frameworks out there, it's it's also the one that most engineers know and are very comfortable with. That's also another thing. You don't want to jump on the latest framework because many of the times the companies behind those frameworks are typically doing it for free or like a lot of stuff in in software open sourcing the frameworks." }
  - { t: 311, text: "And so you don't want to be behind a project that might get, you know, discontinued uh or depreciated. So that's essentially why a business operator would need to know about frameworks and why they would even concern themselves." }
  - { t: 324, text: "So that's just really been a brief coverage of what AI frameworks are. And as you mentioned, it's not really something an operator is going to concern themselves with on the front end, but rather something a developer is going to wrestle with on the back end." }
  - { t: 335, text: "Yeah, I mean it's really important to understand how much work goes into actually building these agents even at the most basic level even at the level of the agents knowing how to reply and how to use a model and all the use cases which we talked about. And so that's really just to show what the plumbing looks like. Yeah. And guys, if you enjoyed this video, found it helpful, you can subscribe to our newsletter. The links down in the description below. You can also find us on LinkedIn. We're very active on a day-to-day basis. And until next time, we'll see you in the next video." }
---

An AI framework is the pre-built plumbing a developer installs to turn a model
into [a working agent](/academy/what-is-an-ai-agent). Connecting to the model,
holding a conversation open between messages, calling tools, catching the errors
those tools throw: nobody writes that from scratch any more. The model is the
chef, the agent is the dish, the framework is the oven you didn't build.

## What does an AI framework actually do?

Anthropic, OpenAI and the rest all have days when a model degrades. Latency
climbs, the answers come back worse. A framework routes around it: different
use cases to different models, and a swap mid-flight when one is down, without
the person on the other end noticing anything changed.

You might work with an agent solidly for five minutes, then step out for an
hour. It doesn't sit there checking every second whether you've replied. It
cools down and waits for you to come back. Someone has to build that behaviour,
and it is dull work.

[MCPs, CLIs and APIs](/academy/what-is-a-tool-call) throw errors constantly, and
error handling is one of the biggest things a framework hands you.

None of that is the clever part of an agent. It is the work of getting an agent
to reply at all.

## Which AI frameworks are most used?

LangChain was the first to arrive, and as of mid-2026 it is still the most
widely known and the one most engineers are already comfortable in. It is a
general-purpose agent builder with a library of small pieces to pull from when
you need a particular capability, and there is a real learning curve before you
get anything out of it.

LlamaIndex, from the Llama family, is what you reach for when your agent's work
is mostly search: looking things up, over and over, as most of the job.

Crew AI and Autogen are less well known and cover roughly the same ground.

OpenAI and Anthropic both have their own. Those are the frameworks they built
their own agents on, Claude Code included, and you can build on them too.

## Do I need to know which AI framework my agent uses?

If you're buying, no. You don't buy an agent because of the framework
underneath it, you don't use one because of the framework underneath it, and
most of the time you'll never know what it is. An agent that books property
tours after hours gets judged on whether the tour got booked.

## How do you choose an AI framework?

Building in house is where it becomes your question, and it's a developer
question. Three parts:

1. What are my developers already familiar with?
2. What functionality do I need?
3. What are the limitations of the framework I'm considering?

The first one usually settles it. If your team is well versed in Crew AI, use
Crew AI, because it covers essentially 90% of the same ground as the rest.

The third is what catches people out. Frameworks are opinionated, and the
opinion shapes how your agents get built. A quick agent with little overhead
points away from LangChain. A multi-purpose agent points straight at it, because
it is the most established of them. That decision belongs in the planning,
before anyone writes code.

One last thing for whoever is doing the planning: don't jump on the newest
framework. The companies behind these mostly give them away, open sourced and
free, and free projects get discontinued or deprecated. If the agent chasing
your unpaid invoices runs on one of them, the day it stops being maintained is
your problem.

If you're the one writing the spec, the framework is a line in it, not the
spec. What the agent is allowed to do, which tools it holds and
[how much autonomy you give it](/academy/what-is-agent-autonomy) are the
decisions that stay yours.
