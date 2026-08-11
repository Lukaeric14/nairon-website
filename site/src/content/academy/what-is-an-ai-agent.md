---
title: "What is an AI Agent?"
seoTitle: "What is an AI Agent? How AI Agents Work, With Examples"
description: "A chatbot answers. An AI agent decides and acts. The three ingredients every agent needs, the loop it runs, and why most agents are built rather than bought."
youtubeId: A-qm4DXdk5o
topic: ai-fundamentals
level: basic
order: 14
duration: 321
publishedAt: 2026-06-11
channel: "Nairon AI"
magnet: ai-agents
takeaways:
  - "A chatbot responds to a question. An AI agent takes a goal and keeps working until the goal is met."
  - "Every AI agent needs three things: a clearly stated goal, a set of tools, and memory of how the job is meant to go."
  - "Most AI agents do not exist until someone builds them, which makes the goal you write the real decision."
transcript:
  - { t: 5, text: "Hey, my name is Mahan. I'm the CMO of Nairon. My name is Luka and I'm the CEO of Nairon. Luka, AI agents is a term that gets thrown out a lot these days. So, in this video, let's take some of the confusion out. Let's uh break it down, give the audience an introduction into AI agents and what the use cases actually are. So, an AI agent is a product just like how CHPT is the product that you interact with the LLM. An AI agent is a product that does some sort of action for you." }
  - { t: 30, text: "So if an LLM in a chatbot was more informational, more textbased, more answer question type interactions, an AI agent actually does things for you. What you can tell an AI agent is, hey, go through my emails, find me all of my most recent emails, and you know, reply to them. An AI agent will actually be able to do that with the tool calls, with the memory, and with the information that it knows about you. And we talked about all of these, right? We talked about what tool calls are, the ability to use Gmail and other tools, what memory is, the ability for it to understand everything about your business and context. And so, the biggest distinction as I just made is a chatbot responds whereas an agent decides and acts. part of acting and part of deciding what it needs to do is a lot of those reasoning type queries which we talked about in the last video right the agent is essentially like a looping mechanism of an interaction between an LLM to validate whether what you're asking for was done if not continue or whether it is done then present the final you know summary or solution for you you touched on some of the core components of what makes an AI agent be able to work let's dive deeper into those so the three ingredients that every AI agent needs is a goal, clearly stated goal with a specific outcome that's actionoriented, a tool set. So we mentioned Gmail for example, and then memory, this additional information that's associated to the tool of how to use the tool, what are best, you know, practices of how the tool is used in your company, in your organization, and about the goal itself. So if this was essentially a goal that you asked multiple times before, sort of the fifth version of that, you sort of documented the best case on what do you do if things go wrong and all that stuff. All that stuff is in memory. If we go a little bit deeper into what this loop really looks like and we give it a goal, which is, you know, research 10 companies and draft some outreach." }
  - { t: 150, text: "Notice this is not a question and answer type query. This is an actual multi-step process essentially like a workflow that we ask the agent to do. It's also not about one company but about 10 companies. So think about it. It needs to do the same thing 10 times. And so what it would do is literally in step number two it would use search web tool which is essentially a tool that uses Google puts a bunch of keywords and then finds the results reads the results. It then checks its progress multiple times as it's going. So it does the tool call, checks its progress, reads all the information about the company, keeps going until it does research on all 10 companies, and then what it does is it perhaps picks another tool called draft email, which is a Gmail tool in this case. Notice how step number two was a Google tool for example, and you can use any any different type of providers." }
  - { t: 201, text: "There's a bunch of different web search tools and a Gmail tool. So multiple tools from different companies. So we're now drafting an email and we're using a template and our research to fill out that email. And now we repeat that 10 times and we get to our final outcome which is the goal is achieved. We have outreach for 10 companies." }
  - { t: 219, text: "Okay. So essentially we're also looking at this being you know tasks versus workflows. When you look at a query that you give to a chatbot it's typically a task. The task could be just reply to me but the task could be also research this company, find this information, draft the email for me. But that's still viewed as like one task. With an agent, you can do that one task times 50. So it can essentially reproduce that task 50 times. The beautiful thing is that today we don't just use one agent at a time." }
  - { t: 250, text: "We've now started to develop multi- aent systems. So think about it this way. If I create an agent that drafts up some email copy, for example, replying to some leads, you can have an agent that does, let's say, the marketing side. And our agents can now start collaborating together. We can have skills and different workflows set on how our agents need to collaborate together to execute work that is not triggered by a human, but rather by a schedule or what we call a chrome job. And we'll get to all of these things in later videos, but it's really important to understand fundamentally an AI agent is a product that you build. There are completed agents that you can buy online and you can use online but most of the times these agents need to be built. They're not like ChatGPT where the chatbot is essentially built once you get to it." }
  - { t: 299, text: "Of course, something we'll be touching on as well is um multi- aent systems and those work really well for more complex tasks for bigger organizations. So for the time being guys, this has been an introduction to AI agents. We'll go much more in depth in future videos. You can subscribe to our newsletter links down in the description below. You can also find us on LinkedIn. We're very active on a daily basis. And until then, see you in the next video." }
---

An AI agent is software you hand a goal to, not a question. It picks its own
tools, takes an action, checks the result against the goal, and goes round again
until the goal is met. ChatGPT gives you text back. An AI agent gives you
finished work back. A chatbot responds. An AI agent decides and acts.

## AI agent vs chatbot: what is the difference?

An AI agent does things for you; a chatbot tells you things. Tell an agent to go
through your inbox, find the recent emails and reply to them, and it goes and
does that.

| | Chatbot | AI agent |
| --- | --- | --- |
| You give it | a question | a goal |
| You get back | an answer | finished work |
| It runs for | one response | as long as the goal takes |
| It needs | a prompt | a goal, a tool set and memory |

The loop is where the difference lives. The agent takes an action, then the
model checks the result against the goal it was handed. Not finished, go round
again. Finished, hand back the summary and stop. That back and forth is
[reasoning](/academy/what-is-ai-reasoning). The
[tool calls](/academy/what-is-a-tool-call) and the
[memory](/academy/what-is-agent-memory) are what make it possible.

## The three things every AI agent needs

1. **A goal.** Stated clearly, action-oriented, with a specific outcome you can
   check when the AI agent claims it is done.
2. **A tool set.** Gmail, a web search tool, whatever the job touches. The agent
   picks between them as it runs.
3. **Memory.** Everything sitting around the tool and the goal: how your
   organisation uses that tool, what good practice looks like in your business,
   and what you learned the last four times you ran this. By the fifth run
   someone has written down what to do when it goes wrong. That is memory.

## How an AI agent works, step by step

Hand an AI agent the goal "research 10 companies and draft some outreach" and
the run looks like this.

1. Take the goal: research 10 companies, draft outreach to each.
2. Call the web search tool, which pushes keywords into Google and reads the
   results.
3. Check progress against the goal. One company down, nine to go.
4. Repeat steps 2 and 3 until all 10 are researched.
5. Switch to the draft email tool and fill a template with what it found.
6. Ten drafts later the goal is met, and the agent stops.

Two providers in one run: a Google tool at step two, a Gmail tool at step five.
There are plenty of web search tools to choose from and the agent does not care
which one you wire in.

Nothing about that shape is specific to sales. Swap the 10 companies for 10
open work orders waiting on a vendor and the loop is identical. An
after-hours call comes in, the agent asks the qualifying questions and books the
job. A list of overdue accounts goes in, and the agent works down it chasing
each invoice. Same three ingredients, different goal and different tools.

A query you hand a chatbot is one task, even a fat one. An AI agent runs that
task 50 times, which is the line between
[an agent and an automation](/academy/ai-agents-vs-automations).

## What is a multi-agent system?

Two or more AI agents working the same job. Build one that drafts replies to
inbound leads, build another that handles the marketing side, and the two start
collaborating, with skills and workflows setting how they hand work over. Deeper
in, [an orchestrator](/academy/what-is-an-orchestrator) decides who runs what.
Nobody has to press a button to start any of it: a schedule, a cron job, is
enough. Multi-agent systems pay off on complex work inside bigger organisations.

## Should you build an AI agent or buy one?

An AI agent is a product you build. Finished agents exist to buy online and some
of them will do the job, but most of the time nobody has built the one your
business needs. ChatGPT is finished the moment you open it. Yours is not. Pick
one job this week where you can state the goal in a sentence and check whether
it is done. That is the one to build first.
