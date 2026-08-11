---
title: "What is an MCP?"
seoTitle: "What is an MCP? Model Context Protocol and MCP servers"
description: "An MCP lets an AI agent use Gmail, Slack or your CRM without a custom integration. Why four models and five tools means twenty connectors, or nine."
youtubeId: GhLQeM1WFMk
topic: ai-fundamentals
level: advanced
order: 20
duration: 333
publishedAt: 2026-06-21
channel: "Nairon AI"
magnet: ai-agents
takeaways:
  - "An MCP is a standard connector that lets any AI model use a tool like Gmail or your CRM without a custom integration."
  - "Four AI models and five tools need twenty hand-built connectors. Give each tool an MCP server and it is nine."
  - "If you own the tool, your MCP docs have to spell out the chain: search for the email address first, then send the email."
transcript:
  - { t: 5, text: "Hey, my name is Mahan. I'm the CMO of Nairon. My name is Luka and I'm the CEO of Nairon. Luka, in last video we spoke about tool calls, how they give the AI an ability to go out and actually do things on the internet. In today's video, let's talk about MCPs, what they are, and how they actually help agents uh connect to the internet and actually do things a lot easier." }
  - { t: 22, text: "For sure. So the use of an MCP is really just to give uh an AI agent the ability to perform an action on any external uh tools. So for example, Gmail, Slack, any other tools that you're using. Um the AI agent needs to be able to connect. In order to make a connection, you need two things. You need authentication. So do you have the right to use this tool? And then the actual tool calls itself. Do you know how to instruct the tool in order to use it? The problem that existed before the MCP was created was that essentially the LLM would need to figure out how all of these tools work and they all work in different ways and they all authenticate in different ways and they have different tools and there was no universal way of interacting with tools for an LLM. We had APIs which we covered which is essentially the ability for one machine to speak to another machine through a uniform pattern. But the LMS, they don't work like that. And the tools themselves require a lot more than just what an API does. And so the analogy that we like to give is that a MCP is like a USB. Prior to the USBs, we had the same issue. Every device that needed to connect to your computer had a different input. Your mouse had a different input. Your monitor had a different input. Your chargers had a different input. And so we created the USB to be able to essentially connect any device to your computer so that that device knows how to communicate with your computer in a uniform manner. And so you can see over here uh just to take the point home u the math that the MCP solves is essentially if you had four different AI models needed to integrate with five different tools like Gmail, Slack, your CRM, etc. you would essentially need four * 5 20 different connectors and you'd have to custom build all of the connectors. And so what ended up happening is that uh Antropic actually came out with this model context protocol which is MCP to essentially provide a middle layer that the tools themselves provide so that any LLM will be able to use that tool. And so you ended up having just to build nine connectors instead of 20 connectors. And by the way, a lot of the AI agents that we build end up having 15, 20, 30 different MCPs. And you can just imagine that would be 100 plus connectors that you would have to build or you could just standardize to 15 MCPS. And so today, the way that the AI agents interact with these tools are through the MCPS themselves." }
  - { t: 173, text: "Let's get into the plumbing a little bit. Uh how does the AI agent actually know when or how to use the MCP itself? So whenever you start a session, the first thing that's added into the initial system prompt is essentially like a document of how to use each MCP down to very small details of these are the list of tools and this is essentially the description of how to use each tool. Um and so again this needs to be provided by the actual tool providers. So Gmail has a Gmail MCP that Google built out. They have a document and then the AI agent just reads that document. they understand how to use it and they whenever they feel like the user is asking them to use a specific tool or asking them to do a task that requires that tool the AI agent will essentially just call that tool uh run it and achieve whatever outcome that tool provides. So a lot of the times we work with companies that want to build out their own tools and so this is sort of the other way around. If you have a tool, for example, you are a CRM or you provide something like a Slack, um, you would need to build out an MCP that you would expose and then the AI agents would be able to integrate with that MC with that MCP. Some of the examples could be something like, hey, here are a set of actions I'd like you to do. Um, you can do search contacts, you can do send email, you can do get calendar. AI agents a lot of the times will just understand how to use those tools because you built out the docs that way." }
  - { t: 260, text: "It's very important to explain to the AI agent how these tools work together in your system. So for example, if you wanted to send somebody an email, the AI agent first requires in order to send them out an email requires the email address of the person you're sending." }
  - { t: 276, text: "They don't just magically know that. And so in your docs, you kind of have to say first use the search tool to find the person's email, then use the send email tool in order to send out the actual email. And so that's a lot of the consulting that we do and thinking about all the cases that MCP can be used. Um, and then we go ahead and we build the MCP." }
  - { t: 297, text: "And so what's been the overall impact of MCPs on how people can now use AI to get more stuff done? So it went from essentially having a chatbot which could just give you answers to now you have an assistant that can do actions for you. A lot of the very complex AI systems that we have right now and that we build out." }
  - { t: 314, text: "They all essentially use this actionoriented way of interacting with an LLM. Okay. And that's been a summary of what MCPs are. Guys, if you enjoyed the video, make sure to subscribe. You can also subscribe to our newsletter links down in description below. Also find us on LinkedIn. We're very active on a day-to-day basis. And uh we'll see you in the next video." }
---

An MCP, short for Model Context Protocol, is a standard way for an AI agent to
use software you already run: Gmail, Slack, your CRM. Anthropic published it. A
chatbot tells you what to write to the customer about the warranty claim; an
agent with an MCP sends the email. The tool provider builds one MCP, and after that
any AI model can use that tool without a custom integration.

## How does an MCP work?

For an agent to act inside a tool, two things have to be true.

1. **Authentication.** The agent has the right to use the tool.
2. **[Tool calls](/academy/what-is-a-tool-call).** The agent knows how to
   instruct the tool once it is in.

Before MCP, the model had to work both of those out for every tool it touched.
Every tool authenticates its own way, every tool exposes its own set of actions,
and there was no universal way for the model to talk to any of them.

MCP splits that into two halves, and both halves have names you will meet in the
docs. The **MCP server** is the tool side: Google runs one for Gmail, and it
lists every action Gmail offers and how to call each one. The **MCP client** is
the model side, built once by whoever builds the agent, and it talks to every
MCP server in the same shape.

## Is an MCP just an API?

No. An [API](/academy/what-is-an-api) is one machine speaking to another through
a uniform pattern. Models do not work like two machines calling each other, and
a tool needs to hand over more than an API does: which actions exist, when each
one applies, and what has to happen before it. The MCP server is the middle
layer that carries all of that, and the tool owner writes it once.

The analogy we use is the USB port. Before USB, your mouse, your monitor and
your charger each plugged into their own input. USB did not make the devices
better, it made them interchangeable.

## Why MCP exists: the connector maths

Say four AI models each need to reach five tools: Gmail, Slack, your CRM and two
more. Built by hand that is four times five, twenty connectors, every one of
them custom.

| Setup | Connectors you build |
| --- | --- |
| 4 models × 5 tools, hand-built | 20 |
| 4 models + 5 MCPs | 9 |

Nine, because each model builds one MCP client and each tool exposes one MCP
server. Four plus five. Nothing in that nine is custom to a particular pairing.

A lot of the agents we build run 15, 20, 30 MCPs. Hand-built, that is over a
hundred connectors. Standardised, it is 15.

## How the agent picks which tool to call

When a session starts, before you have typed anything, a document for every
connected MCP is loaded into the initial system prompt: the list of tools it
offers, and a description of how to use each one. The tool provider writes that
document. Google built the Gmail MCP server, so Google wrote its instructions.
When a request needs one of those tools, the agent calls it and uses what comes
back for the next step.

That loading is also where it goes wrong. Run 30 MCPs and 30 of those documents
sit in the [context window](/academy/what-is-a-context-window) before the first
request, most of them describing actions this particular job will never call.
And the agent chooses between them on the wording alone. Give it a search
contacts tool and a search inbox tool whose descriptions read almost the same,
and neither document says which one wins. It will pick one, and it will sound
certain either way. The fix is never in the agent. It is rewriting one of the
two descriptions so they stop competing.

## How to build an MCP server for your own product

This runs the other way too. If you sell the software, if you are a CRM or a
scheduling system, you build an MCP server and expose it, and agents integrate
through that. The actions might be:

- **Search contacts**
- **Send email**
- **Get calendar**

Agents usually work out how to use those on their own, as long as the docs are
written that way.

The part that gets missed is how the tools work together. To email a customer
about a warranty claim, the agent needs the email address first, and it does not
magically know it. Your docs have to say: use the search tool to find the
person's email, then use the send email tool. Working through those chains, and
every case the MCP will be asked to cover, is most of the job before anyone
writes the MCP server itself.
