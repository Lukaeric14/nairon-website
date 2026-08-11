---
title: "What is Agent Memory?"
seoTitle: "What is Agent Memory? How AI agents remember you"
description: "AI agents start every session from zero. Agent memory is the layer that fixes it: short-term vs long-term, what it costs in tokens, and how to store it."
youtubeId: lNZkzOkzS0s
topic: ai-fundamentals
level: basic
order: 19
duration: 315
publishedAt: 2026-06-19
channel: "Nairon AI"
magnet: ai-agents
takeaways:
  - "An LLM starts every session from zero, so agent memory has to be built as a separate layer on top of the model."
  - "Short-term memory is whatever sits in the current session; long-term memory is what survives it, like a preference or your current pricing."
  - "Every extra piece of memory grows the context window and the token bill, which is why retrieval is harder than storage."
transcript:
  - { t: 5, text: "Hey, my name is Mahan. I'm the CMO of Nairon. My name is Luka and I'm the CEO of Nairon. Luka, in this video, let's cover agent memory. In the past video, we've talked about context windows and how that's a short-term memory of an LLM." }
  - { t: 18, text: "Now, we're talking about more advanced topics. So, let's talk about agent memory and how that works. The way that the memory system of an AI agent works is very close to what we've mentioned before of a context window. And brief recap is that a context window is essentially a new session with an AI agent where it has nothing but its system prompt. So it only has, you know, the basic information like you're a helpful assistant. You have these tools." }
  - { t: 44, text: "The way that the LLMs are built is that there is no reference to previous existing conversations that you've had. So if I taught you a certain skill or I taught you a certain task that I like to get done and then I ask you again to do it tomorrow, you would probably remember that task like how you remembered uh that our previous video was about orchestrators. But the LLMs because they start fresh every time they don't have this context. And so if we look at a memory layer, we can see that between conversation one and conversation 2 everything ends. Now we might look at chachi piti for example and somebody might say hey but no in chachi remembers the fact that you know I mentioned that I like cookies and and ice cream and that's what I'm trying to you know get rid of my diet because I want to lose weight. That's because open AI actually built a memory system into chache. Most AI agents they don't have that memory there and if they do you don't have a lot of control over what's in memory and what's not in memory like in chatbt. So chatbt will remember maybe some miscellaneous stuff like this but it might forget what your recent pricing was or what offers you have on your website. All of that is very important especially in business context. And so if we see this phenomenon as a back and forth of a model and a memory layer on top interacting with one another is how we actually now have each session improve on itself. because what you teach an LLM today, you want it to remember in a few days, especially as it's getting into more advanced and maybe more tedious things. And so, what's very important to know is that you have short-term memory and you have long-term memory. And it's just fancy ways of saying short-term is anything that is in session. So, if you mention something to an NLM 15 passes ago, it might remember that. Um, but something that's in long-term is something like a preference that's remembered across multiple months or for example new pricing or what example your old pricing was. Remember when we spoke about rag?" }
  - { t: 164, text: "RAG is essentially the ability to give an LLM a context memory that it can now pull from. And so this concept of short-term and long-term memory is quite important especially because somebody might say, \"Hey Luka, why don't we just give all the memory to the LLM all up front? let it remind itself of every conversation we've had. The problem with that is that you get charged based on token usage and that would absolutely fry your token usages as well as it would burn up your context window. So when we look at starting from fresh or building concept, something that we need to take care about is that without memory, each interaction starts at zero, but it's the smallest form of a context window. It's the smallest form of token usage. The more memory we add, the larger the context grows, the more tokens that it consumes, more expensive that it gets." }
  - { t: 218, text: "So practically how is memory actually stored for the agent? So there's multiple ways. If we look over here, one way is to store it as raw history. So actual full transcripts of conversations, a summarized version of that is sort of like a condensed digest of what happened during a session. Um, but the absolute best way to store memory. That is a the most the most effective for an LLM to actually understand and the most cost effective is to store it as structured data in a rag system where an LLM is able to use rag to export and to get and retrieve that information. And so when we do look at all of the retrieval part of stuff, the actual storing of that information is quite easy. Whether you want to store it in option A, which was a full transcript, whether it's embedding it and putting it into an um into a rag system, that's quite easy. The retrieval is the hard part. So, how do you actually retrieve the right piece of information at the right time? That's extremely hard to do. And that's why a lot of testing goes into actually how do we set up the right memory layer for different agents. So far, we've spoken about context windows. We've spoken about rag vector databases. Now, finally, we've covered Asian memory. As we progress into more advanced videos, we're going to actually take all those things together and make a configuration of how those things actually come together and work together in a complete AI system. But until then, guys, you can subscribe to our newsletter, links down in the description below. You can also follow us on LinkedIn where we're very active on a day-to-day basis. And until next time, we'll see you in the next video." }
---

An AI agent forgets you the moment the session ends. Agent memory is the layer
you build on top of the model to stop that happening: it stores what came out of
earlier conversations and puts the relevant part back in front of the agent when
it is needed.

## Why an agent starts from zero every time

A context window is a fresh session. The agent opens with its system prompt and
nothing else. You are a helpful assistant. Here are your tools. There is no
reference to anything you said yesterday.

Teach a dispatcher on Monday that one asset manager wants photos on every
work order and they will remember on Tuesday. Teach an agent the same thing and
Tuesday is conversation one again. Between conversation one and conversation
two, everything ends.

ChatGPT looks like the counter-example. It remembers that you like cookies and
that you are trying to lose weight. OpenAI built a memory system on top of the
model to do that. The model underneath still starts fresh. Most agents
have no memory layer at all, and the ones that do give you very little control
over what goes into it. ChatGPT will hold on to miscellaneous detail about your
diet and still forget your current pricing or which offers are live on your
site. In a business, that is the wrong half to remember.

## Short-term and long-term memory

Two kinds, and the names are literal.

**Short-term** is anything inside the current session. Mention something 15
passes ago and the agent will probably still have it.

**Long-term** is anything that has to outlive the session: a preference held
across months, your new pricing, or what your old pricing used to be.

RAG is how the long-term half gets back in, and we covered it earlier in this
series. It gives the model a store of context it can pull from, so a fact
arrives when the question calls for it.

## Why you cannot just hand it everything

The obvious move is to load every past conversation in up front and let the
agent sort through it. Two things stop you. You are charged on token usage, so
replaying your whole history on every request fries the bill. And it burns the
context window you needed for the actual work.

Without memory, each interaction starts at zero: smallest context, smallest
token count, cheapest call you can make. Every piece of memory you add makes the
context bigger, consumes more tokens and costs more. Memory is a budget.

## Three ways to store it

| Option | What gets stored | How it holds up |
| --- | --- | --- |
| Raw history | Full transcripts of every conversation | Complete, and you carry every word of it |
| Summaries | A condensed digest of what happened in a session | Lighter than the transcript |
| Structured data in RAG | Facts written so the agent can retrieve them on demand | Easiest for the model to understand and the cheapest to run |

Putting the information away is the easy part. Embedding a transcript into a RAG
system takes no real thought.

> "The retrieval is the hard part." Luka Eric, 3:38

Getting the right piece of information back at the right moment is extremely
hard, and it is where the testing goes. The memory layer that works for one
agent is rarely the one that works for the next, so each gets set up separately.

Before you build a memory layer, decide which few facts have to be true in every
single session. Your current pricing. The way a given asset manager wants
work orders sent. Everything else can start at zero, and cost you nothing.
