// Open roles — single source of truth for the careers list and the per-role
// detail pages. Each role has a slug used in its URL (/careers/<slug>).

export interface ApplyField {
	key: string;
	label: string;
	type: "text" | "email" | "tel" | "url" | "textarea";
	placeholder: string;
	/** Helper text shown under the input. */
	hint?: string;
	/** Short inputs sit two per row; set to span the full row. */
	fullWidth?: boolean;
}

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
	/**
	 * When present, the detail page collects applications through an on-page
	 * form (#apply) with these fields instead of the mailto link.
	 */
	applyForm?: ApplyField[];
}

export const APPLY_EMAIL = "careers@nairon.ai";

export const ROLES: Role[] = [
	{
		slug: "design-engineer",
		title: "Design Engineer",
		team: "Engineering",
		type: "Full-time",
		location: "In-person · Office",
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
		location: "In-person · Office",
		blurb:
			"Be the first engineer alongside the founders. Build Hive, deploy it into real companies, and improve the system until it works reliably in the real world.",
		description:
			"We are hiring a Founding Engineer. You will be the first engineer alongside the founders, and you will touch everything: building Hive, deploying it into real companies, mapping workflows, shipping production features, debugging issues, and improving the system until it works reliably in the real world.",
		responsibilities: [],
		requirements: [],
		applyForm: [
			{
				key: "name",
				label: "Full name",
				type: "text",
				placeholder: "Jane Smith",
			},
			{
				key: "email",
				label: "Email",
				type: "email",
				placeholder: "jane@example.com",
			},
			{
				key: "phone",
				label: "Phone number",
				type: "tel",
				placeholder: "+971 50 123 4567",
			},
			{
				key: "portfolio",
				label: "Portfolio, GitHub, or personal website",
				type: "url",
				placeholder: "https://github.com/you",
			},
			{
				key: "traces",
				label: "traces.com session link",
				type: "url",
				placeholder: "https://traces.com/share/...",
				hint: "This must be a real traces.com link. Random URLs, N/A, or unrelated links mean the application will not be considered.",
				fullWidth: true,
			},
			{
				key: "aiStack",
				label: "Your full AI stack",
				type: "textarea",
				placeholder:
					"Orchestrator, coding agents, models, tools, libraries, skills, prompting patterns, review workflows, and any custom setup.",
			},
			{
				key: "note",
				label: "Why is this role interesting to you?",
				type: "textarea",
				placeholder: "A short note is enough.",
			},
		],
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
				paragraphs: ["Apply with the form at the bottom of this page. You will need:"],
				bullets: [
					"Full name",
					"Email",
					"Phone number",
					"Portfolio link, GitHub, or personal website",
					"A real traces.com session link showing a non-sensitive coding agent session",
					"Your full AI stack",
					"A short note on why this role is interesting to you",
				],
				paragraphsAfter: [
					"Applications without a valid traces.com session link will not be considered.",
					"Applications missing required links or details will not be reviewed.",
					"We do not need a traditional CV. We care much more about what you have built, how you think, and how you work with AI.",
				],
			},
		],
	},
	{
		slug: "healthcare-ai-consultant",
		title: "Healthcare AI Consultant",
		team: "Delivery",
		type: "Full-time",
		location: "In-person · Office",
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
	{
		slug: "content-marketing-intern",
		title: "Content Marketing Intern",
		team: "Marketing",
		type: "Paid internship · Full-time",
		location: "In-person · Office",
		blurb:
			"Own the production of our content: edit videos, design graphics, and help us publish consistently. A strong intern will be given priority for the full-time content role opening in September.",
		description:
			"We are hiring a Content Marketing Intern. This is a paid, full-time internship. You will work in-person with us in Dubai and own the production of our content: editing videos, designing graphics, and helping us publish consistently.",
		responsibilities: [],
		requirements: [],
		sections: [
			{
				title: "About Nairon",
				paragraphs: [
					"Nairon is an AI startup. We are building Hive, our platform for AI employees that take on real work end to end inside the tools companies already use.",
					"We are a small founding team based in Dubai. Content is how people find us, so this role matters and your work will be visible from day one.",
				],
			},
			{
				title: "The role",
				paragraphs: [
					"We are hiring a Content Marketing Intern.",
					"This is a paid, full-time internship. You will work in-person with us in Dubai and own the production of our content: editing videos, designing graphics, and helping us publish consistently.",
					"We are opening a full-time content position in September. A strong intern will be given priority for that role.",
				],
			},
			{
				title: "What you will do",
				bullets: [
					"Edit short-form and long-form videos: product demos, founder content, and social clips.",
					"Design graphics for social media, the website, and presentations.",
					"Write clear captions and copy in English.",
					"Help plan and keep a consistent publishing schedule.",
					"Use AI tools to produce more and better content, faster.",
					"Work in-person with the founding team from our Dubai office.",
				],
			},
			{
				title: "What we are looking for",
				bullets: [
					"Video editing experience. This is a must. We want to see work you have edited.",
					"Graphic design skills.",
					"High English proficiency, written and spoken.",
					"Able to commute daily to in5 Media in Dubai.",
					"Available full-time.",
					"Organized, fast, and comfortable with feedback.",
					"Bonus: experience with AI content tools.",
				],
			},
			{
				title: "How to apply",
				paragraphs: ["Apply with the form at the bottom of this page. You will need:"],
				bullets: [
					"Full name",
					"Email",
					"Phone number",
					"Portfolio, reel, or links to videos you have edited",
					"2-3 pieces of work you are most proud of",
					"A short note on why this role is interesting to you",
				],
				paragraphsAfter: [
					"We do not need a traditional CV. Show us what you have made.",
				],
			},
			{
				title: "Interview process",
				steps: [
					{
						title: "Application review",
						paragraphs: ["We look at your editing and design work."],
					},
					{
						title: "Short call",
						paragraphs: ["Culture, communication, and availability."],
					},
					{
						title: "Small test task",
						paragraphs: [
							"A quick edit or design so we can see how you work.",
						],
					},
				],
			},
		],
		applyForm: [
			{
				key: "name",
				label: "Full name",
				type: "text",
				placeholder: "Jane Smith",
			},
			{
				key: "email",
				label: "Email",
				type: "email",
				placeholder: "jane@example.com",
			},
			{
				key: "phone",
				label: "Phone number",
				type: "tel",
				placeholder: "+971 50 123 4567",
			},
			{
				key: "portfolio",
				label: "Portfolio or reel link",
				type: "url",
				placeholder: "https://...",
				hint: "A link to your portfolio, reel, or videos you have edited.",
			},
			{
				key: "work",
				label: "2-3 pieces of work you are most proud of",
				type: "textarea",
				placeholder: "Links, plus a sentence on what you made and your role.",
			},
			{
				key: "note",
				label: "Why is this role interesting to you?",
				type: "textarea",
				placeholder: "A short note is enough.",
			},
		],
	},
];

export function getRole(slug: string): Role | undefined {
	return ROLES.find((r) => r.slug === slug);
}

export function applyHref(roleTitle: string): string {
	return `mailto:${APPLY_EMAIL}?subject=${encodeURIComponent(`Application: ${roleTitle}`)}`;
}
