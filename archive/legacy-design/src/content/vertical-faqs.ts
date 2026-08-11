// Per-vertical FAQ content, assembled from each vertical's own use cases and
// tools so every industry/solution page gets substantive, *distinct* Q&A
// (content depth + long-tail keywords) instead of 13 near-identical pages.
// The same items feed the visible accordion and the FAQPage JSON-LD, so what
// Google shows as a rich result always matches what's on the page.
//
// New verticals get FAQs automatically — nothing to write by hand. If a
// vertical needs a hand-tuned answer later, special-case it here by slug.

import type { VerticalContent } from "./verticals";

export interface VerticalFaq {
	question: string;
	answer: string;
}

/** "Logistics & 3PL" → "logistics & 3PL": lowercase words, preserve acronyms. */
function casual(name: string): string {
	return name
		.split(" ")
		.map((w) => (w === w.toUpperCase() && w.length > 1 ? w : w.toLowerCase()))
		.join(" ");
}

/** "Replies to new leads in minutes" → "replies to new leads in minutes". */
function verbify(capability: string): string {
	return capability.charAt(0).toLowerCase() + capability.slice(1);
}

export function verticalFaqs(v: VerticalContent): VerticalFaq[] {
	const ctx = casual(v.name);
	const roles = v.useCases
		.map(
			(u) =>
				`a ${u.title} that ${verbify(u.capabilities[0])} and ${verbify(u.capabilities[1])}`,
		)
		.join("; ");
	const toolList = v.tools.slice(0, 4).join(", ");

	return [
		{
			question: `What can an AI employee actually do for ${ctx} teams?`,
			answer: `It owns a real workflow end to end, not just a single task. For ${ctx} teams that typically means ${roles}. Each one is custom-built around how your team already works, with a human approving anything sensitive.`,
		},
		{
			question: `Does it work with ${toolList}, and the rest of our stack?`,
			answer: `Yes. Nairon's AI employees run inside the systems ${ctx} teams already use, including ${toolList}, plus your inbox, calendar, and Slack. There is no new platform to migrate to and nothing for your team to learn.`,
		},
		{
			question: "How long until it's live, and what does rollout look like?",
			answer: `Weeks, not quarters. We scope one ${ctx} workflow, build the AI employee against your real data and edge cases, run it supervised until quality holds, then expand its responsibilities. You see it working on real work before you commit to more.`,
		},
		{
			question: "Who stays in control of what the AI employee does?",
			answer: `Your team does. Every AI employee runs with role-based access and human approval on sensitive actions, and you manage it through Hive like any other teammate: assign work, review output, tighten or widen its autonomy as trust builds.`,
		},
	];
}
