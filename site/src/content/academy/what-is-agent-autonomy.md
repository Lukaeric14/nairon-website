---
title: "What is Agent Autonomy?"
seoTitle: "What is Agent Autonomy? Human in the loop, explained"
description: "Owners get agent autonomy wrong in two directions: too much on day one, or never finding out what the agent can run alone. How to find the cap for a job, and where to put a human in the loop."
youtubeId: _O-jEjjq2L0
topic: ai-fundamentals
level: advanced
order: 23
duration: 272
publishedAt: 2026-06-27
channel: "Nairon AI"
magnet: ai-agents
takeaways:
  - "Autonomy is a dial. At the low end every action waits for your approval; at the high end the agent runs the whole task the moment it is triggered."
  - "The harness sets the dial. Which tools the agent can reach, and whether its access to each one is write or read only, is what a checkpoint is made of."
  - "Agents wake up two ways. A trigger fires on an event like a new email arriving; a schedule fires at a time, like our 6am Sunday pipeline review."
  - "Build at low autonomy, turn the dial up until the agent starts to struggle, and cap it there. High stakes gets approvals; high volume and low stakes gets the dial."
transcript:
  - { t: 5, text: "Hey, my name is Mahan. I'm the CMO of Nairon. My name is Luka and I'm the CEO of Nairon. Luka, over the past couple videos, we've gone deep into AI agents and how they work. But we still haven't made a distinction between uh when an agent is autonomous, meaning it can run on its own, and when it always needs a human in the loop. So, in this video, let's go over agent autonomy and uh give a good explanation to the viewers. Right. So, you just said it right there. um it's essentially a spectrum where we give the agent the ability to do more and more tasks um without us being in the loop." }
  - { t: 36, text: "So previously when we would use chatpt for example we would be all the way here on the left side of the spectrum. every single task needed to be approved. Um, every you know usage of your Gmail or your calendar, any tools or connectors that you might be using on Chad BT need to be uh approved, right? And what we've essentially done over the past year or so is built out the harnesses which we spoke about in a previous video that allow us to give the AI agents a lot more autonomy pushing them over here to the right where essentially a task starts the second that it is reported and it can go and essentially do all of the things that it would like to do without checking back with the user." }
  - { t: 76, text: "There's many ways that this is done and we covered it in previous videos. um like how does the harness actually provide guard rails and how does it allow for certain tools to be accessed. Um can they have write access or readonly access? Those are quite important things that the harnesses have allowed us to build an agent all the way from a chatbt which is just a chatbot that can just answer questions all the way up until now where we have cloud code which can generate you know humongous pieces of software that can build apps and do a bunch of other things. So, what's really important is to know how we interact with agents nowadays. There's essentially two ways to wake up an agent or use an agent. One is to use a trigger and another one is to use a schedule. So, a trigger could be when a new email comes in. You don't need to prompt the agent. The agent can essentially be woken up. There's a new email, go clean it up. Um, go draft an email or whatever else you know the workflow is. Or it could be schedule based. So, at Nairon, we have a lot of schedules that run on a daily basis, like an agent that looks at our competitors, an agent that looks at content that we have that's going live." }
  - { t: 145, text: "Um, also different performance agents that are looking at how our weeks are doing, how our pipeline is doing, etc. These all run on schedules, so it it's a fixed time. An agent wakes up at 6:00 a.m. on a Sunday to do our pipeline review, for example. And so just a recap, AI agents work in loops either through a schedule or a trigger. They then decide what they need to do. They take action. They observe how that action is done and they go in loops until that work is done. That would be essentially a very autonomous agent. If you add a couple of steps in, like for example, you add a step right after deciding what it can do to have a human come in and qualify the work and maybe change the decision. That's a less autonomous agent. If you add another loop after the task is done to check the work, that would be a less autonomous agent. Now, where the world is going and where AI is going is that there are more autonomy and the loops are larger and longer. When the stakes are high, we want to give them low autonomy work and a lot of approvals. And then when the stakes are low um and there's a lot of volume, we want to give them a lot of autonomy to be able to do the um to do the work, right? Just to point out, we typically build agents first with low autonomy and then we increase the dial of autonomy as we go. And when we see the agents now start to struggle, that's when we kind of cap it and we say, \"Okay, for this type of task with all their circumstances given, um, it makes sense to just keep it at this level of autonomy because anything after that will break and anything before that's not efficient enough.\" M so that's very important because a lot of business owners they either expect that an agent will be able to do everything from day one typically not the case or they don't know what the agent is able to do on their own and so they don't give them enough of the resources that they might need as we start wrapping up things in the AI foundation series and move into more advanced concepts. So until then guys if you enjoyed the video you can subscribe to our newsletter links down in the description below and also follow us on LinkedIn where we're very active on a daily basis. Until then, we'll see you in the next video." }
---

Agent autonomy is how much work an agent does before it checks back with you. At
the low end of the dial, every single action waits for your approval. At the high
end, the task starts the second it is reported and the agent runs until the work
is finished.

## The levels of agent autonomy

Using ChatGPT puts you at the low end. Every use of your Gmail, your calendar,
every connector you have wired up gets approved before it happens. You are in
the loop for each step, which stops being practical the moment a job has more
than a handful of steps.

At the high end the agent takes a task and does everything it decides to do
without coming back to you. Claude Code sits at that end. Give it a brief and it
builds a working app.

What moved agents up the dial over the past year is
[the harness](/academy/what-is-a-harness). The harness is the code wrapped
around the model, and it decides which tools the agent can reach, whether its
access to each one is write or read only, and what happens when it reaches for
something outside those bounds. Same model, two harnesses, two different levels
of autonomy.

Read only is the cheapest checkpoint there is, because it removes the need for
one. An agent with read access to your CRM can pull the pipeline, work out which
jobs have gone quiet and write you the list. It cannot move a stage or email a
customer, so there is nothing to approve. Give that same agent write access and
every action it takes is one you have to have thought about in advance, because
it will not ask.

## How agents get triggered: events vs schedules

There are two ways to wake an agent. A trigger fires on an event whereas a
schedule fires at a time.

A trigger is something like a new email landing in the inbox. Nobody prompts
the agent. The email arrives, the agent wakes up, cleans it up or drafts the
reply, then goes back to sleep.

A schedule is a fixed time. Four of them run daily at Nairon: one watches
competitors, one watches the content going live, and two performance agents
track how the week and the pipeline are doing. The pipeline one wakes at 6am on
a Sunday.

## Where to put a human in the loop

The loop underneath is the same whichever way it starts:

1. Wake up, on a trigger or a schedule.
2. Decide what needs to happen.
3. Take the action.
4. Observe the result, then go round again until the work is done.

Run that with nobody in it and you have a highly autonomous agent. You lower the
autonomy by putting a human in the loop at a named step, and which step you pick
changes what you get back.

| Setup | Human checkpoint | Where it fits |
| --- | --- | --- |
| High autonomy | None. The loop runs to completion. | Low stakes, high volume |
| Decision approval | A person qualifies the decision, and can change it, before the agent acts | High-stakes actions |
| Work review | A person checks the output after the task is finished | A new agent you have not learned to trust yet |

Every checkpoint you add costs throughput and buys control. Sorting inbound
maintenance requests all day is low stakes and high volume, so it wants
autonomy. Revising the asking rent on a unit wants an approval at step 2,
before the number leaves the building.

## How to set the dial

Start low. We build every agent at low autonomy first, then turn the dial up one
checkpoint at a time. Somewhere on the way up the agent starts to struggle, and
that is your cap for that job.

Struggling looks like a tool that does not fit the step it is on. Or the right
kind of record and the wrong record, the invoice chased on the job that already
paid. Or a loop that observes the work is not done and goes round again without
getting closer, burning tokens and producing nothing. None of that shows up
while the agent is read only and waiting on your approval, which is why the cap
is something you find by raising the dial rather than something you can plan.

The cap sits between two failures. Past it the work breaks. Below it you are
paying a person to approve things that never needed approving.

Business owners miss it from both sides. Some expect the whole job on day one,
which is typically not the case. Others never find out what their agent can
handle alone, so they never give it the tools and access it would need to do
more.

The direction of travel is more autonomy and longer loops. Pick the
highest-volume, lowest-stakes job you have, run it on a trigger with a review
checkpoint at the end, and take the checkpoint out when the reviews stop
catching anything.
