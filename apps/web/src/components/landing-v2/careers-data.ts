// Open roles — single source of truth for the careers list and the per-role
// detail pages. Each role has a slug used in its URL (/careers/<slug>).

export interface RoleSectionStep {
	title: string;
	paragraphs: string[];
	bullets?: string[];
}

export interface RoleSection {
	title: string;
	paragraphs?: string[];
	bullets?: string[];
	/** Paragraphs rendered after the bullet list. */
	paragraphsAfter?: string[];
	/** Numbered steps, e.g. an interview process. */
	steps?: RoleSectionStep[];
}

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
	/**
	 * Long-form layout: when present, the detail page renders these sections
	 * in order instead of the default description/responsibilities layout.
	 */
	sections?: RoleSection[];
}

export const APPLY_EMAIL = "careers@nairon.ai";

export const ROLES: Role[] = [
	{
		slug: "design-engineer",
		title: "Design Engineer",
		team: "Engineering",
		type: "Full-time",
		location: "Remote / Miami",
		blurb:
			"Own the surfaces where humans and AI agents work side by side, from prototype to production. You turn product thinking into interfaces that feel obvious.",
		description:
			"You'll own the surfaces where humans and AI agents work side by side: our product UI and our marketing site. You move from idea to prototype to production, making AI-native workflows feel clear and obvious. This is a hybrid product-design and frontend-engineering role for someone with real taste who can also ship.",
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
			"Product taste: you make good calls without a detailed spec.",
			"Comfort with ambiguity and fast iteration.",
		],
		niceToHave: [
			"Experience with AI / agent products.",
			"Motion design and prototyping skills.",
			"Experience owning a design system.",
		],
	},
	{
		slug: "founding-engineer",
		title: "Founding Engineer",
		team: "Engineering",
		type: "Full-time",
		location: "In-person · Dubai, UAE",
		blurb:
			"Be the first engineer alongside the founders. Build Hive, deploy it into real companies, and improve the system until it works reliably in the real world.",
		description:
			"We are hiring a Founding Engineer. You will be the first engineer alongside the founders, and you will touch everything: building Hive, deploying it into real companies, mapping workflows, shipping production features, debugging issues, and improving the system until it works reliably in the real world.",
		responsibilities: [],
		requirements: [],
		sections: [
			{
				title: "About Nairon",
				paragraphs: [
					"Nairon is an AI startup. We are building Hive, our platform for AI employees that take on real work end to end inside the tools companies already use.",
					"We are a second-time founding team. Our previous startup went through Techstars, raised from Silicon Valley investors, and ran for three years in sales tech. We have raised, hired, shipped, and sold before.",
					"We deploy Hive directly into real companies. That means everything we build is tested against messy, real-world operations from day one.",
				],
			},
			{
				title: "The role",
				paragraphs: [
					"We are hiring a Founding Engineer.",
					"This is not a narrow specialist role. You will be the first engineer alongside the founders, and you will touch everything: building Hive, deploying it into real companies, mapping workflows, shipping production features, debugging issues, and improving the system until it works reliably in the real world.",
					"This is not a role where you wait for perfect specs.",
					"You need to be comfortable taking ambiguity, asking good questions, working with AI agents, and getting to good working code quickly.",
				],
			},
			{
				title: "What you will do",
				bullets: [
					"Build core parts of Hive alongside the founders.",
					"Deploy AI-native workflows, internal tools, and agent-powered systems into real companies.",
					"Work directly with the founding team in-person from our Dubai office.",
					"Translate real business problems into practical implementation plans.",
					"Use coding agents heavily to move faster and produce better work.",
					"Orchestrate multiple AI agents at once when needed.",
					"Go deep into implementation details when needed, and stay high-level when needed.",
					"Ask sharp questions after thinking through the problem with your own tools and agents.",
				],
			},
			{
				title: "What we are looking for",
				paragraphs: [
					"We care less about your CV and more about how you think, what you have built, and how strong your AI-native workflow is.",
					"You should be:",
				],
				bullets: [
					"Strong at engineering fundamentals.",
					"An all-rounder who can move across the stack and across problems.",
					"Already using coding agents seriously.",
					"Comfortable showing how you prompt, plan, review, and implement with agents.",
					"Fast without being careless.",
					"Detail-oriented enough to be trusted with real production systems.",
					"Clear in communication with both technical and non-technical people.",
					"Low-ego, practical, and easy to work with.",
					"Comfortable in a startup where speed matters a lot.",
					"Able to work in-person with us every day in Dubai.",
				],
			},
			{
				title: "AI-native expectations",
				paragraphs: [
					"You should have at least 6+ months of serious hands-on experience using coding agents.",
					"We want to see how you actually work. You should be able to explain your full AI stack, including:",
				],
				bullets: [
					"Orchestrator",
					"Coding agents",
					"Models",
					"Tools",
					"Libraries",
					"Skills",
					"Prompting patterns",
					"Review workflows",
					"Any custom setup that helps you move faster or produce better work",
				],
				paragraphsAfter: [
					"We are especially interested in how you reach consensus with an agent before implementing, how you catch bad outputs, how you test work, and how you get to working code that does not break.",
				],
			},
			{
				title: "Compensation",
				paragraphs: [
					"13,000 - 20,000 AED per month.",
					"Equity allocation of 0.5% to 1%.",
				],
			},
			{
				title: "How to apply",
				paragraphs: ["Please send:"],
				bullets: [
					"Full name",
					"Email",
					"Phone number",
					"Portfolio link, GitHub, or personal website",
					"traces.com session link showing a non-sensitive coding agent session",
					"Your full AI stack",
					"2-3 projects you have built that best show your ability",
					"A short note on why this role is interesting to you",
				],
				paragraphsAfter: [
					"Applications missing required links or details will not be reviewed.",
					"We do not need a traditional CV. We care much more about what you have built, how you think, and how you work with AI.",
				],
			},
			{
				title: "Interview process",
				steps: [
					{
						title: "Application review",
						paragraphs: [
							"We review your projects, traces.com session, and AI stack. We are looking for evidence that you can use AI agents well, think clearly, and get to working implementation.",
						],
					},
					{
						title: "15-minute screening",
						paragraphs: [
							"This is mostly about culture, communication, and how you think. We want to understand how you handle ambiguity, speed, tradeoffs, and startup pressure.",
						],
					},
					{
						title: "Technical interview",
						paragraphs: [
							"You will work through a realistic repo and implementation task that mimics the kind of work we do at Nairon. We care less about memorized algorithms and more about how you:",
						],
						bullets: [
							"Clarify requirements",
							"Use coding agents",
							"Break down the problem",
							"Review generated code",
							"Test the result",
							"Explain tradeoffs",
							"Recover when something goes wrong",
						],
					},
					{
						title: "Build simulation",
						paragraphs: [
							"You will work on a realistic, messy problem of the kind we solve every week. The goal is to see whether you can take something unclear and turn it into something useful, working, and reliable.",
						],
					},
				],
			},
		],
	},
	{
		slug: "healthcare-ai-consultant",
		title: "Healthcare AI Consultant",
		team: "Delivery",
		type: "Full-time",
		location: "Remote",
		blurb:
			"Partner with healthcare clients to map workflows, scope AI employees, and drive adoption. Part strategist, part builder, turning clinical and ops pain into deployed systems.",
		description:
			"You'll partner with healthcare clients to map their workflows, scope AI employees, and drive adoption: part strategist, part builder. You turn clinical and operational pain into deployed systems, and you own the relationship that makes sure the AI actually gets used.",
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
			"Excellent communication: you earn trust with clinical and exec stakeholders.",
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
