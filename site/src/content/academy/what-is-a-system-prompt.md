---
title: "What is a System Prompt?"
seoTitle: "What is a System Prompt? Examples and why every AI tool has one"
description: "A system prompt is the invisible first message telling an AI model who it is. What ChatGPT, Cursor and Perplexity put in theirs, and why a real product needs hundreds."
youtubeId: URQlkNzLq5c
topic: ai-fundamentals
level: basic
order: 9
duration: 237
publishedAt: 2026-06-04
channel: "Nairon AI"
magnet: ai-prompting
takeaways:
  - "A system prompt is the first message in the conversation, written by whoever built the tool and never shown to the person using it."
  - "The same model, given the same question, returns a different answer depending on the system prompt sitting in front of it."
  - "A real product runs on hundreds of system prompts, one written for each job the tool does."
transcript:
  - { t: 5, text: "Hey, my name is Mahan. I'm the CMO of Nairon. My name is Luka and I'm the CEO of Nairon. Luka, let's talk about system prompts. We briefly covered them in the past video, but I think there's a lot of room to expand on it and explain to the audience exactly what it is." }
  - { t: 16, text: "Yeah, definitely. So, what a system prompt is, it's sort of the first invisible prompt that a user interacts with when they start working with an AI model. For example, if you're using Chad PT, a lot of people don't actually know that behind the scenes before you even get to the model, OpenAI is putting in a little bit of instructions. Be friendly, answer concisely. It's basically whatever OpenAI puts behind the scenes." }
  - { t: 42, text: "And so, if you actually look over here, this is an example of what a system prompt looks like. And the LLM is reading from top to bottom, right? So, we're actually seeing the first system prompt come in. you're a helpful customer service support agent for AMC Incorporation. Uh be friendly, ask about pricing, X, Y, and Z. And then your message that comes in is actually the second message in the chat, right? Which is how do I cancel my subscription?" }
  - { t: 70, text: "And so that gives the uh LLM some context on how the answer should be. And this is not limited to just CHP. This is any AI product. actually some of the best AI products. There's a lot of information that goes into the system prompt." }
  - { t: 86, text: "And so if you're creating an AI tool for your business, how should you go about treating system prompts? All you need to know when creating an AI tool when it comes to system prompts is that it's going to be the first message and it's going to dictate a lot of the chat that goes on. It doesn't need to only be instructions to the first result that comes, but it can essentially shape even 30, 40 messages down the road of how exactly we should tailor the conversations and stuff like that. In future videos, we're going to go over tool calls. Tool calls are essentially how you give the LLM the ability to be able to use your Gmail, your calendar, and all that. the actual ability to use those tools is nested inside the system prompt." }
  - { t: 130, text: "And so we'll get to it in other videos. But if you look at for example how the best tools right now are building the system prompts you look at chbt we covered that they typically have like a you're a useful assistant. Um cursor for example dictates that cursor is a coding agent that is focused on coding. It has a lot of for example best practices in coding and engineering. Perplexity is a search agent. So it has um information about always citing sources and for example when we build AI CRM we embed a lot of company specific information into the CRM right Jane doesn't like long documents. Adam likes long documents." }
  - { t: 172, text: "All of that goes into system prompts. That's interesting. So you can get essentially the same LLM with the same input giving you two completely different outputs. Yeah. And that's because of the system prompt. There could be one system prompt that tells you to answer like a legal assistant in this case and there could be another system prompt telling you to answer like a customer service rep. And so depending on the situation, you want to be able to manipulate your system prompts different. When you build your own tools, you don't just have one system prompt, you have hundreds of system prompts, right? So, if I'm using an AI agent for inputting data into my CRM, I'm going to use a system prompt that's particularly set for that specific task. And if I then use another feature in my CRM, I have a whole other system prompt that we will use to get that output. Interesting. And tool calls are also going to play a big big part in how that output's going to look like. So guys, we'll go in depth on that in the future video. For the time being, subscribe to our newsletter links down in description below. You can also find us on LinkedIn where we're very active on a day-to-day basis. And we'll see you in the next video." }
---

A system prompt is the first message in a conversation with an AI model,
written by whoever built the tool and invisible to whoever uses it. Your
question is the second message. Everything the model says back is shaped by
the one it read first.

## System prompt vs user prompt: what the model reads first

|  | System prompt | User prompt |
| --- | --- | --- |
| Position in the chat | First message | Second message |
| Written by | Whoever built the tool | You |
| Shown to you | No | Yes |
| Holds | Role, tone, rules, and the tools the model is allowed to use | The thing you want done |

A model reads from the top down. First it takes in "you are a helpful customer
service support agent for AMC Incorporation, be friendly, ask about pricing".
Then it reaches the message the customer typed: "how do I cancel my
subscription?" The reply you see is the model answering both at once. Your
question never arrives on its own.

## Can you see the system prompt of a tool you use?

No. Type into ChatGPT and OpenAI has already put its own instructions in front
of your message before the model sees it: be friendly, answer concisely. Most
people using it have no idea that step happens. Every AI product you have ever
used has one and none of them show it to you.

## System prompt examples: what goes inside one

| Product | What its system prompt establishes |
| --- | --- |
| ChatGPT | You are a useful assistant. Be friendly, answer concisely. |
| Cursor | The model is a coding agent, plus a long list of coding and engineering best practices. |
| Perplexity | The model is a search agent, and it always cites its sources. |
| Nairon's AI CRM | Company-specific detail about the people the CRM is used on. |

That last row is the one worth copying, and it sounds almost too small to
matter when you write it out:

> Jane doesn't like long documents. Adam likes long documents.
>
> Luka Eric, 2:45

Lines like that are cheap to write and nobody else has them. Whatever your
dispatcher knows about a customer that you would have to explain to a new hire
on day one belongs in the system prompt.

## Tool access lives inside the system prompt

Giving a model the ability to use your Gmail or your calendar happens in the
same place. The tools are nested inside the system prompt and described to the
model before you send a word, so one block of text decides both how the thing
talks and what it is allowed to touch. Personality and permissions come out of
the same file. Tool calls get their own lesson.

## Why the same model gives two different answers

One system prompt says answer like a legal assistant. The other says answer like
a customer service rep. Same model, same question, two different outputs.

For a maintenance and dispatch operation that gap is the whole product. The
agent handling an after-hours triage call and the agent drafting a vendor work
order are the same model. What separates them is a paragraph of text nobody
outside the company ever reads.

## Does a system prompt only affect the first reply?

No. It still governs message 30 and message 40 of the same conversation: the
tone, the questions the model asks back, the things it will not say. So write it
for the whole conversation. The first answer is the least of what it decides.

## How many system prompts does an AI product need?

Hundreds, one per job. The agent that enters data into your CRM runs on a prompt
written for that task and nothing else. Add a second feature to the same CRM and
it gets a prompt of its own. Stretching one set of instructions across both
makes both worse, because every line you add to cover the second job is a line
of noise during the first.

So when you are shopping for an AI tool for your rent and renewals team, the
model it runs on tells you little. Most vendors are running the same handful of
models. Ask what they put in the system prompt, and how much of your own company
you are allowed to put in there yourself.
