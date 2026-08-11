---
title: "What is a Vector Database?"
seoTitle: "What is a vector database? The library behind RAG"
description: 'A vector database files information by meaning instead of rows and columns. Why "cancelled plan" and "voided purchase" land together in a RAG search.'
youtubeId: 3Ektnt7IvS8
topic: ai-fundamentals
level: advanced
order: 21
duration: 384
publishedAt: 2026-06-22
channel: "Nairon AI"
magnet: ai-agents
takeaways:
  - "A vector database stores meaning as coordinates across up to 4,000 or 5,000 dimensions, where a relational database stores values in two."
  - "Text goes in through an embedding model, and a search returns the data points nearest your question rather than the ones sharing its words."
  - "Build time in as one of the dimensions and asking for the latest update on a client returns the current one, without anyone deleting the old records."
transcript:
  - { t: 5, text: "Hey, my name is Mahan. I'm the CMO of Nairon. My name is Luka and I'm the CEO of Nairo. Luka, in a previous video, we covered Rack. But what most people don't know about is a big component of what makes Rag work is a vector database. So, in this video, let's break it down and let's give people an introduction into what a vector database is." }
  - { t: 22, text: "For sure. So quick refresher on rag is essentially a very good librarian that can go through a very big library and pick out the best books or documents in our case to best facilitate the AI agents to be able to give you the best answers. Now every librarian needs a library in this case the vector databases are the library itself." }
  - { t: 42, text: "Okay to start let's make a distinction between a regular database and a vector database. Yeah a regular database is very structured. So it has different columns for example price and then it has different rows for for example products and so when you look at a product and you want to find the price you just go down the columns and you find the price pretty simple a lot of people are familiar with how regular databases work whereas a vector database it's actually a very flexible database that is actually built to store all of the meaning and all of the context in the world. M so everything from uh numbers to physical objects to places in the world everything can be stored in a vector database and traversed through a wrap. So, one of the big differentiations between a regular database and a vector database is a regular database is typically just two-dimensional, as I just mentioned, rows and columns, whereas a vector database can have up to like four or 5,000 dimensions that you can traverse." }
  - { t: 102, text: "And vector databases are typically notated in arrays. Arrays are essentially just a series of numbers. Um, so as you can see here, they're like coordinates. They're very small coordinates, but there's like 4,000 of them in in one uh go essentially. Um, and it signifies one meaning. And so you could think about it this way. If you had four or five different objects, one of them was a dog, one of them was a cat, one of them was a leaf, and one of them was a squirrel. Essentially, the squirrel, dog, and cat would be very close in the vector database, whereas a leaf would be pretty far away. And so the LLMs are able to actually identify and do math to see how far certain data points are from one another. And that's actually how it deres a lot of the meaning." }
  - { t: 149, text: "Vector database is like a regular database has an input side and an output side. So what does the input side look like or vector database? So the inputs on the vector database are anything like documents or chunks of text um or even even a sentence or two." }
  - { t: 165, text: "And so those documents, those images, they go in through a little model called an embedding model that takes the tokens and actually spits out what their coordinates are for all of those 4,000 dimensions. And so whenever you put something into the vector database, it kind of goes through this little model and then whenever you want to retrieve it, you kind of do the opposite. You essentially ask a question. The question is then put into the vector database and then it finds which are the closest data points to that question." }
  - { t: 196, text: "That's all very abstract. What does it actually look like in a real world scenario? So let's say you have an AI agent um that's responsible for Stripe and billing. Um, essentially what the AI agent will do if you ask it a simple question like who canled last month is it will take information like renewed plan, cancelled plan and voided purchase and it'll categorize them differently because the context is different. So if you actually look over here renewed plan even though it has the word plan is very different from cancelled plan. And whilst cancelled plan and voided purchase textually don't have anything similar, contextually they do. The AI agent will be able to identify that you are now looking for cancelled plans and any data points that alert to a plan getting cancelled or a purchase is voided um will come up in the in the rag search for this case." }
  - { t: 255, text: "Okay. Okay. And let's conclude it with a real world scenario of how you'd apply a vector database into a rack system for an actual business app. Yeah. So, we actually do this a lot on our day-to-day. We build these AI agents that use rank um to look at different stuff like support tickets, internal docs, and sometimes these support tickets work with and alongside the docs, sometimes separately. We look at product specs for the agent to understand what exactly is it selling or what exactly is it providing customer service for um and past contracts. So if there's anything that we need to kind of go back and get some more customer information on the past contracts will provide that information for um for the LLM. Now the really cool thing is that this very much becomes essentially this memory layer at the company level. So think about it this way. All your company meetings, all your uh sales calls, all your internal meetings can be stored in a vector database and then traversed contextually. Let's say for example, you ask a simple question like, \"Hey, what did I promise the prospect on last week's call?\" It' be able to traverse not the entire transcript. We don't want to overload it with all of these other details, but it'll go towards the end of the call because, by the way, time is one of the dimensions that it looks at. and then it'll be able to actually pick up on that. A really cool thing, and this is a little bonus, um, is that because time is a very big dimension inside vector databases, the information automatically adapts and updates itself. You don't have to delete information from the vector database." }
  - { t: 350, text: "This was the problem that we thought we would have when vector databases came along, but we actually figured out that if you search for the latest update on a client, it's able to do that because it understands time. And so it won't give you an update that was done 3 months ago." }
  - { t: 363, text: "We've done a concise breakdown of rack so far. Uh but of course it's a very complex concept when it comes to AI. So we'll dive deeper into it in a future video. Until then guys, subscribe to our newsletter. Links down in the description below. You can also find us on LinkedIn. We're very active on a day-to-day basis. And uh until then, we'll see you in the next video." }
---

A vector database stores meaning instead of rows and columns. If
[RAG](/academy/what-is-rag) is the librarian that walks off and fetches the
right document, the vector database is the library: every call transcript and
signed contract you own, filed by what it means rather than by what it says.

## Vector database vs relational database

A relational database is a grid. Columns for price, rows for parts. You want the
price of a smoke detector, you run down the column and read it off. Two
dimensions. Everyone already knows how that one works.

A vector database is built to hold meaning and context. A job note, a photo of a
roof, a signed lease, a voicemail. All of it goes in. Instead of two dimensions
it gives you up to four or five thousand.

| | Relational database | Vector database |
| --- | --- | --- |
| Shape | Rows and columns | Arrays of numbers |
| Dimensions | 2 | Up to 4,000 or 5,000 |
| Retrieval | You match a value | You measure a distance |
| Good at | The price of a part | What somebody meant |

Each entry is an array, which is a long series of numbers. Read them as
coordinates. There are roughly 4,000 of them and together they signify one
meaning. Put a dog, a cat, a squirrel and a leaf into the same vector database
and the dog, the cat and the squirrel sit close together while the leaf sits a
long way off. The model does arithmetic on those distances, and that is where
the meaning comes from.

## How does a vector database work?

The embedding model is the piece that does the work, and it sits on both sides
of the trip. It is a small model whose only job is to take
[tokens](/academy/what-is-a-token) and return coordinates.

In goes a document, a chunk of text, an image, sometimes a sentence or two.
Three steps from there:

1. **Embed.** The embedding model reads the tokens and returns their coordinates
   across all 4,000 dimensions.
2. **Store.** Those coordinates go into the vector database, next to the
   document they came from.
3. **Measure.** Your question goes through the same embedding model, and the
   vector database hands back the data points sitting closest to it.

Retrieval is the same trip in reverse. Nothing about your question gets matched
word for word. It gets placed, and whatever is standing nearby comes back.

## How does semantic search find the right answer?

Take an agent that looks after your billing. Somebody asks it who cancelled
last month. Sitting in the data are three labels: renewed plan, cancelled plan,
voided purchase.

Renewed plan shares a word with cancelled plan and means the opposite of it.
Cancelled plan and voided purchase share no words at all and mean the same
thing. The vector database files the second pair close together and the first
pair far apart, so the agent returns the cancellations and the voided
purchases, and leaves the renewals where they are.

## What is a vector database used for?

Support tickets, internal docs, product specs, past contracts: that is what we
point these agents at day to day. Sometimes a ticket and a doc answer a
question together, sometimes one on its own is enough.

Keep going and the vector database becomes
[a memory layer](/academy/what-is-agent-memory) for the whole company. Every
internal meeting, every sales call, stored and traversed by meaning. Ask what
you promised the prospect on last week's call and the vector database does not
drag back the entire transcript. It goes to the end of the call, because in the
way we build these systems time is one of the dimensions the vector database
searches on.

That last part solved a problem we expected to have. When vector databases
arrived we assumed we would spend our lives deleting stale records so the agent
stopped quoting them. We don't. Ask for the latest update on a client and you
get the current one, not the write-up from three months ago, and nothing had to
be deleted for that to happen.

## Which vector database should you use?

Not one you build yourself. The names an engineer will put in front of you are
Pinecone, pgvector, Weaviate, Qdrant, Chroma and Milvus. Pinecone is hosted, so
somebody else runs it. pgvector is an extension for Postgres, so if your data
already sits in Postgres you are adding a capability rather than another
service. Weaviate, Qdrant, Chroma and Milvus are open source and run either on
your own infrastructure or on theirs.

The mechanics in this lesson are the same in all of them. Coordinates in,
distance measured, nearest entries out.

## Do you need a vector database?

If you want an agent answering questions out of your own material, yes, because
RAG has to have a library to walk into. If the agent only ever needs one refund
policy, paste the policy into the prompt and stop. The line sits where nobody in
the building can tell you which file holds the answer.
