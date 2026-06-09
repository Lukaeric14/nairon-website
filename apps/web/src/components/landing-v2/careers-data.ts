// Open roles — single source of truth for the careers list and the per-role
// detail pages. Each role has a slug used in its URL (/careers/<slug>).

export interface Role {
	slug: string;
	title: string;
	team: string;
	type: string;
	location: string;
	/** One-line summary for the list view. */
	blurb: string;
	/** Intro paragraph(s) for the detail page. */
	description: string;
	responsibilities: string[];
	requirements: string[];
	niceToHave?: string[];
}

export const APPLY_EMAIL = "careers@nairon.ai";

export const ROLES: Role[] = [
	{
		slug: "design-engineer",
		title: "Design Engineer",
		team: "Engineering",
		type: "Full-time",
		location: "Remote / Dubai",
		blurb:
			"Own the surfaces where humans and AI agents work side by side — from prototype to production. You turn product thinking into interfaces that feel obvious.",
		description:
			"You'll own the surfaces where humans and AI agents work side by side — our product UI and our marketing site. You move from idea to prototype to production, making AI-native workflows feel clear and obvious. This is a hybrid product-design and frontend-engineering role for someone with real taste who can also ship.",
		responsibilities: [
			"Design and build production React + TypeScript interfaces end to end.",
			"Prototype new agent and workspace experiences, then ship the ones that work.",
			"Own and grow the design system so product and marketing stay visually consistent.",
			"Partner with AI engineers to surface complex agent behavior simply.",
			"Sweat motion, interaction, and the small details that make UX feel premium.",
		],
		requirements: [
			"Strong React + TypeScript and modern CSS (Tailwind a plus).",
			"A portfolio of interfaces you designed and built yourself.",
			"Product taste — you make good calls without a detailed spec.",
			"Comfort with ambiguity and fast iteration.",
		],
		niceToHave: [
			"Experience with AI / agent products.",
			"Motion design and prototyping skills.",
			"Experience owning a design system.",
		],
	},
	{
		slug: "ai-engineer",
		title: "AI Engineer",
		team: "Engineering",
		type: "Full-time",
		location: "Remote / Dubai",
		blurb:
			"Design and ship the multi-agent systems that run real operational work inside customer stacks. Build, deploy, and tune AI employees end to end.",
		description:
			"You'll design and ship the multi-agent systems that run real operational work inside customer stacks — building, deploying, and tuning AI employees end to end. You care about reliability in production, not just demos, and you like working close to real customer problems.",
		responsibilities: [
			"Architect multi-agent workflows that handle end-to-end operational tasks.",
			"Integrate agents into customer tools — CRM, ERP, Slack, email, and industry systems.",
			"Build evals and guardrails so agents are reliable and safe in production.",
			"Deploy and operate agents on our infrastructure; monitor and continuously improve them.",
			"Work directly with customers to scope and tune their first AI employee.",
		],
		requirements: [
			"Strong software engineering in Python and/or TypeScript.",
			"Hands-on experience building with LLMs and agent frameworks.",
			"A bias for shipping and measuring, not just prototyping.",
			"Comfort owning systems in production.",
		],
		niceToHave: [
			"RAG, tool-use orchestration, or evals experience.",
			"Infra / DevOps experience.",
			"Experience deploying AI into real business workflows.",
		],
	},
	{
		slug: "healthcare-ai-consultant",
		title: "Healthcare AI Consultant",
		team: "Delivery",
		type: "Full-time",
		location: "Remote",
		blurb:
			"Partner with healthcare clients to map workflows, scope AI employees, and drive adoption. Part strategist, part builder — clinical and ops pain into deployed systems.",
		description:
			"You'll partner with healthcare clients to map their workflows, scope AI employees, and drive adoption — part strategist, part builder. You turn clinical and operational pain into deployed systems, and you own the relationship that makes sure the AI actually gets used.",
		responsibilities: [
			"Run discovery with healthcare orgs to map their highest-leverage workflows.",
			"Scope and prioritize AI employees against real operational pain.",
			"Translate clinical and ops requirements into systems our engineers can build.",
			"Drive adoption and change management so the AI gets used, not shelved.",
			"Own the client relationship through a weekly operating rhythm.",
		],
		requirements: [
			"Experience in healthcare operations, consulting, or clinical workflows.",
			"Strong understanding of compliance and privacy (HIPAA) considerations.",
			"Excellent communication — you earn trust with clinical and exec stakeholders.",
			"Comfort with AI tools and a builder's mindset.",
		],
		niceToHave: [
			"Prior AI or automation deployment experience in healthcare.",
			"A clinical or health-systems background.",
		],
	},
];

export function getRole(slug: string): Role | undefined {
	return ROLES.find((r) => r.slug === slug);
}

export function applyHref(roleTitle: string): string {
	return `mailto:${APPLY_EMAIL}?subject=${encodeURIComponent(`Application: ${roleTitle}`)}`;
}
