---
title: "What is an Orchestrator?"
seoTitle: "What is an AI Orchestrator? How AI agents plan and delegate work"
description: "AI orchestrator, explained: the part of an AI system that plans the steps, picks which model runs each one, and rewrites the plan when step three fails."
youtubeId: QymthmPwhsw
topic: ai-fundamentals
level: advanced
order: 18
duration: 343
publishedAt: 2026-06-18
channel: "Nairon AI"
magnet: ai-agents
takeaways:
  - "The harness is the body an agent acts through; the AI orchestrator is the brain that decides how a task gets done and which model does each part of it."
  - "One run uses several models, an expensive one to plan and a cheap one to implement, because implementing writes output tokens and those cost three to five times what reading costs."
  - "You can interrupt an orchestrated run mid-task and your instruction gets folded into the plan, because the orchestrator reasons again between turns."
transcript:
  - { t: 5, text: "Hey, my name is Mahan. I'm the CMO of Nairo. My name is Luka and I'm the CEO of Nairo. Luka, in the last video we talked about harnesses. In this video, we're going to cover orchestrators. Now, I know these two concepts are things that people confuse together all the time. So, let's make that distinction and let's uh let's cover the topic. So, similarly how we covered in the previous video where harnesses are essentially the body for the LLM to perform actions, uh the orchestrator is the brain. So the brain is responsible for looking at a specific task and deciding how to achieve that task. You could call it like a to-do list planner or something like that." }
  - { t: 39, text: "Today orchestrators are a lot more complicated and they're able to do a lot more things. One very important thing when thinking about orchestrators and looking at orchestrators is that at different levels of the orchestration you can have multiple models. What does this look like in practice? If you come in through cloud code and you present a pretty complex question like you know how does our billing system work?" }
  - { t: 60, text: "Essentially what's going to happen is that you're going to use most likely the most expensive model to go out and research uh to actually get an idea of what's going on. Uh do all the stuff that we spoke about in the previous video through the harness like a grepping to figure out on high level what it's actually doing. perhaps even coming to um an implementation plan on how to actually improve or fix this bug that you're uh that you're reporting." }
  - { t: 85, text: "Once that heavy work is done and that is done through an orchestrator cuz it's kind of like reasoning, okay, I first need to do some research, then I need to go and come up with a plan. Then the orchestrator might actually say, okay, we can now spin off a different model, a cheaper model and a smaller model to actually do that implementation. And so I have a couple of examples here. Um the first one is looking at what typically people think a model does. Um whereas it gives a question gives you an answer. Uh but actually what's what's really happening behind the hood is that the orchestrator is piecing the request. The orchestrator is using tools to go and identify and getting more information." }
  - { t: 127, text: "Then it's maybe putting that through the actual model itself to kind of understand what it should do and then giving you the final answer. Let's speak more about what you meant when you said multiple models working in tandem. What does that actually look like?" }
  - { t: 140, text: "This is a really good example of what most orchestrators are built like today. For example, if I'm using Opus 4.8 date to reason and to do all the higher leverage stuff like actually understanding what the problem is about finalizing the plan and all of that even interrogating the user and getting more clarifying questions in the orchestrator will essentially say okay this is a simple task I can essentially give it to a smaller model who can go and implement this cuz remember how we spoke about in the previous videos where you're always getting charged by the number of tokens being used um when you're actually doing the work in itself, you're actually going through a lot more tokens than if you're just doing an overview task or you're just doing a research task. Just think about it. If um I tell you to edit a book or if I ask you what is this book about, you're going to go a lot more in depth on the actual work on editing. And so it makes sense to give that to a smaller model that understands the objective like you know switch out this mechanism for another mechanism than for example a very big model would doing the same task. And so the orchestrator as I mentioned will use 4.8 but then go over to Sonnet or go over to Haiku to do the smaller changes. What's very interesting about that is that actually the same workflows are happening but just in loops. So a a standard one workflow could have let's say five steps like this where um for example if we were giving an orchestrator the task of writing a personalized outbound email what it would do is it would reason with itself and say okay I need to split this up into five different little tasks. The five tasks are to look up the prospect, to look up the company, then to look up past conversations, actually perform the task of drafting out the email, and then finally to send it out." }
  - { t: 248, text: "That stuff is essentially what the orchestrator would set up. But the orchestrator could do that and pass that over that plan to a smaller model to actually execute that much better output, much quicker output, a lot less tokens. So the example that I gave is quite simple and it's quite streamlined." }
  - { t: 265, text: "It's quite linear as well. Many times the orchestrator needs to go back and forth with different models on whatever the outputs are. So for example, it might give a certain plan you know do step one through five, but at step three something goes wrong or there's some additional information that needs to essentially change the workflow or change the orchestration in this sense." }
  - { t: 288, text: "And so the orchestrator is always balancing between planning doing and then reshuffleling that to change that plan. That's why it's actually really interesting because with clot code and with other you know orchestrators like that you can essentially in the middle of its run or in the middle of its work interject and add you know further requirements or further instructions or clarifying instructions because what's happening is as the model is running in between turns it's able to reason again and your injection of your prompt actually gets put into the entire system to essentially dictate where the orchestrator should lead these agents to work." }
  - { t: 326, text: "Okay? And of course, a big component that makes all this possible is memory. So, in the next video, we'll go in depth on that. For the time being, guys, you can subscribe to our newsletter. Links down in the description below. You can also follow us on LinkedIn where we're very active on a day-to-day basis. And uh until next time, we'll see you in the next video." }
---

An AI orchestrator is the part of an AI system that decides how a task gets
done. It breaks your request into steps, picks which model runs each step, and
rewrites the plan when step three goes wrong. A to-do list planner, except the
to-do list rewrites itself as it goes.

It is also the thing that makes a handful of agents into a system rather than a
script. Something has to decide which agent runs next, on what information, and
whether the last one's output was good enough to carry on from. That is the
orchestrator.

## Orchestrator vs harness: what is the difference?

The harness is the body an agent acts through. The orchestrator is the brain
that decides what to do with it.

|  | Harness | Orchestrator |
| --- | --- | --- |
| **What it is** | Tools, permissions, the environment, the loop that keeps a model going | The plan: what this task actually consists of |
| **What it decides** | Whether an action is allowed to run, and what happens when it fails | Which steps happen, in what order, and which model runs each one |
| **What it fails at** | A tool that breaks or a permission drawn too tight | A bad plan: right steps in the wrong order, or a step it never thinks to revisit |

[Harnesses were the last lesson](/academy/what-is-a-harness), and the two get
confused constantly. The distinction earns its keep the moment a run goes
wrong, because it tells you where to look. Nothing happened at all, or the
agent was blocked halfway: harness. Five steps ran cleanly and three of them
were the wrong steps: orchestrator.

## Why does an AI orchestrator use multiple models?

At different levels of the orchestration you can run different models, and that
is where your bill is decided.

Ask [Claude Code](/academy/claude-code) something like "how does our billing
system work" and one sentence turns into a sequence. The expensive model goes
first, because that question needs research before anything else can happen. It
searches every file for the phrases that would appear in billing code, reads
what comes back, builds a picture of how the thing hangs together, and often
ends with an implementation plan for the bug you reported. Reasoning about what
needs doing, in other words, and then working out the order.

Then the orchestrator looks at the next piece of work and decides it is simple.
The plan already exists. Applying it does not need the model that wrote it, so
the orchestrator spins off a cheaper, smaller one to implement.

The reason is [tokens](/academy/what-is-a-token). You are charged by the number
of tokens used, and the two halves of a job are not remotely symmetrical.
Research is mostly reading: input tokens, the cheap ones. Implementation is
writing, and output tokens cost three to five times what input tokens cost. A
model that touches ten files has to read all ten in and write all ten back out
again, changed. Asking someone what a book is about gets you a skim, whereas
asking them to edit it means going through the thing line by line.

So the routing rule is: the expensive model does the work that decides what
happens, and the cheap model does the work that has already been decided. In
practice a run starts on Opus 4.8, which understands the problem, interrogates
you for the details you left out, and finalises the plan. Sonnet or Haiku makes
the changes. The small model never needs the whole picture. It needs one
objective it can hold in its head: swap out this mechanism for that one.

None of that is a coding problem. The same split shows up when you ask an
agent why the same three invoices went out twice last month. Working out what
happened and what the rule should be is the expensive half. Applying the fix to
every affected record is the half you want running on the cheap model, because
it is the half that writes.

## What does an orchestrator plan look like?

Give an orchestrator the job of writing a personalised outbound email and it
reasons with itself first, then splits the job into five tasks:

1. Look up the prospect.
2. Look up the company.
3. Look up past conversations.
4. Draft the email.
5. Send it.

The orchestrator builds that plan. A smaller model executes it, and you get a
better output, a quicker output, and a lot fewer tokens spent on it.

That example is linear. Most real work is not. The plan says run steps one
through five, and then at step three something goes wrong, or information turns
up that changes what steps four and five should have been. The orchestrator
goes back and forth with the models it delegated to and reshuffles whatever is
left. Planning, doing, and changing the plan.

## Can you interrupt an AI agent mid-task?

If it is orchestrated, yes. Between turns the orchestrator reasons again, which
means you can type into a job that is already running. Add a requirement, add a
constraint, correct what you asked for the first time, and your prompt is not
sitting in a queue waiting for the run to finish. It goes into the same system
that decides where the agents go next, so the steps that have not run yet get
rewritten around it.

Memory is what lets the orchestrator remember step one by the time it reaches
step five. [That is the next lesson](/academy/what-is-agent-memory).
