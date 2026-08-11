---
title: "What is an API?"
seoTitle: "What is an API? Plain English, plus what one costs"
description: "An API, or application programming interface, is how one piece of software asks another for something. The four levels of using one, and why your own bill will not look like a $20 subscription."
youtubeId: mIyfjC80cak
topic: ai-fundamentals
level: basic
order: 7
duration: 314
publishedAt: 2026-05-30
channel: "Nairon AI"
magnet: ai-fundamentals
takeaways:
  - "An API, or application programming interface, is the structured way one piece of software asks another for something, and in AI it sits between your tool and the model."
  - "There are four levels of using AI: the tool directly, a wrapper like Cursor, an API wired into software you already run, and agents that call the API in a loop."
  - "A $20 subscription hides the API cost: you might cost Cursor more than $200 a month. Build it yourself and several hours that cost $20 in ChatGPT can cost $100 on the API."
transcript:
  - { t: 5, text: "Hey, my name is Mahan. I'm the CMO of Nuron. My name is Luka and I'm the CEO of Nairon. Luka application programming interface. Sounds scary. Sounds scary. Broken down into APIs. Most people have heard of it. In this video, let's break down what an API is, how it works, and uh why it matters in the AI age." }
  - { t: 23, text: "Before the AI age, traditionally, an API was just the way that two computers would speak to each other. So, if you were using a piece of software and you had to access a database that's on a server somewhere, your piece of software that's on your computer would essentially speak to that database via the API. And it's like this structured way of how it requests for some certain information and then gets back that information in a certain way that it knows how to show it back to you. And so if we look at what an API is in the AI space and we look at one of the tools that we love to use for example cursor you're coding on your computer and you're asking cursor to answer some question of yours. What it's doing behind the scenes is it's actually using the claude API behind the scenes. So it's asking claude, hey I have a user uh they're looking for this specific answer to this specific question. What's the answer? and Claude essentially gives them the answer and then it pulls it back over to your computer and then it does all the coding for you and all that, right? So, it's kind of the middle layer between a piece of software and the LLM or the model. And so if we look how do we actually use these APIs the best way possible today with the capabilities that we have with the LLMs." }
  - { t: 97, text: "You could essentially just not use an API and just go over to CHPT, ask it a certain question, get the answer, copy paste it into your CRM, there you go, you have populated your CRM with some, you know, product description for example. Or you could implement the API call into your CRM so that you simply just click a button on your CRM, it interacts with the model, gets the answer, populates it into the CRM." }
  - { t: 122, text: "Right? This is like one of the basic ways of using an API, right? And there are levels to this just like how there are thin wrappers and thick rappers. Yeah. So we like to use the maturity ladder that has essentially four different layers, four different categories of using AI." }
  - { t: 138, text: "You could just use the tool itself directly. You could you just use chatbt. You could use a wrapper like cursor. You could integrate the API into our existing tool like a CRM for example. Or the fourth layer is you could use the APIs through agents. And agents are essentially a cascading use of the API." }
  - { t: 159, text: "So it's not just API come back, but it's actually pinging the API like 10 times and then keeping that loop going on to actually get an end outcome that's well thought of, right? We'll get into more details and more examples of how to use um agents. But what I want to just make clear is basically every one of our favorite tools, Notion, Google, Intercom, they essentially all just use APIs from the biggest models right under the hood, right? So if you use Ask Notion, it's just using GPT 5.5. Um, if you use Intercom, FinBot, it's essentially just using the models under the hood through an API. And so you could think about how can you integrate the same type of logic, the same type of system into your own tool um and just use the models the same way that they do." }
  - { t: 209, text: "And so what ends up happening is that companies typically charge a subscription which is a fixed amount to the end user and they get charged as a cost the API costs. So just think about it in terms of mahan you're my user um you pay me 20 bucks a month you use my tool to some degree to some limit and you cost me $6 in API costs this is going to be quite quite shocking but actually cursor and a lot of the very big venturebacked startups they're actually operating at a huge loss and so you could be paying cursor only 20 bucks a month but actually cost cursor more than 200 bucks a month and the reason why is because they're subsidizing the cost so that they can acquire a larger share of the market at a much cheaper rate. Uh because a lot of these startups are venturebacked, right?" }
  - { t: 261, text: "They do have the cash and they can pay for the credits and and do that. This is especially important because when you do end up building something internally, let's say you build a admin panel um that uses the API, you're essentially going to be paying the direct cost of the API. You're not going to be paying that subscription only 20 bucks a month." }
  - { t: 281, text: "What ends up happening is you use ChatGPT for several hours. It only costs 20 bucks. Correct. But you use your own platform through APIs and you pay maybe a hundred bucks. Interesting. And essentially APIs are going to be the the variable factor when it comes to the cost of using AI at scale. And we'll cover that in depth in a future video. For the time being, guys, be subscribed to our newsletter links in the description below. You can also find us on LinkedIn. where we're very very active on a day-to-day basis." }
  - { t: 309, text: "And until then, we'll see you in the next video." }
---

An API, or application programming interface, is the structured way one piece
of software asks another for something. Your CRM needs a customer record from a
database sitting on a server somewhere, so it sends the request in an agreed
format and gets the answer back in a format it knows how to read. None of that
is new. APIs were doing that job long before AI turned up, and what changed is
what sits on the other end: a model instead of a database.

## How an API works behind the tools you already pay for

Take Cursor, the coding tool. You type a question into it on your laptop.
Behind the scenes Cursor calls the Claude API: here is a user, here is the
specific thing they asked, what is the answer. The API is the middle layer
between the software and the model. Claude answers, Cursor pulls that back to
your machine and writes the code.

Nearly every tool you already pay for works the same way. Ask Notion runs on
GPT 5.5. Intercom's FinBot is [a model](/academy/what-is-an-ai-model)
underneath, reached through an API.

You can wire up the same thing. Today a maintenance office manager opens
ChatGPT, asks it to write a work-order description, copies the answer and
pastes it into the CRM. Put the API call inside the CRM instead and the office
manager clicks one button in the record they already have open.

## How is an API used? The four levels

We use a maturity ladder with four levels on it. Every level runs on the same
models. What changes is how much of the work a person is still doing by hand.

1. **Use the tool directly.** ChatGPT in a browser tab.
2. **Use a wrapper.** Cursor is [a wrapper](/academy/what-is-an-ai-wrapper), a
   product built on someone else's model API. Thin or thick, you never touch
   the API yourself.
3. **Integrate the API into a tool you already run.** The button in your CRM.
4. **Run the API through agents.** [An agent](/academy/what-is-an-ai-agent) is
   a cascading use of the API. Rather than one call and one answer back, it
   pings the API ten times and keeps the loop going until the outcome is
   properly worked out. Chasing an overdue invoice takes several calls: draft
   the message, read the reply, decide whether to escalate.

Level three sounds like a project. It is often a button.

## How much does an API cost? Why your bill will not look like $20 a month

A software company charges a fixed subscription and pays a variable API cost.
The gap between those two numbers is the business.

| What is running | What you pay | What the API calls cost |
| --- | --- | --- |
| A tool with a normal margin | $20 a month | $6 to the company selling it |
| Cursor | $20 a month | more than $200 to Cursor |
| Several hours in ChatGPT | $20 for the month | absorbed by the subscription |
| The same hours on your own platform | $100 | paid by you, per call |

Cursor and a lot of the big venture-backed startups run that second row
deliberately. They subsidise the gap to take a larger share of the market at a
cheaper rate, and being venture-backed they have the cash to do it.

The subsidy disappears the moment you build something yourself. Put an API call
behind a button in your own admin panel and you pay the direct cost of every
call, with nobody absorbing the difference. Price the busiest month you have
had, not the average one.

APIs are the variable factor in what AI costs at scale.
[Subscription against usage](/academy/subscription-vs-usage) is the lesson to
read before you commit a budget to one.

## Common questions

**What does API stand for?** Application programming interface. It is the
agreed format one program uses to ask another program for something, and to get
the answer back in a shape it can use.

**Do I need an API to use AI?** No. Level one is a person in a browser tab,
copying answers out of ChatGPT and pasting them into the CRM. The API matters
when you want the answer to land in the system without anyone moving it.
