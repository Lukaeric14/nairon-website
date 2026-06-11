// ─── Hire page: Philosophy section ───────────────────────────────
export const HIRE_RESUME_QUOTES = [
	'"Built a chatbot with OpenAI."',
	'"Fine-tuned a model in a Jupyter notebook."',
	'"Completed 12 Coursera certificates."',
] as const;

export const HIRE_CANT_DO = [
	"Debug why latency spiked 10x in production",
	"Explain the cost tradeoffs between RAG and fine-tuning",
	"Ship a feature without hand-holding",
] as const;

// ─── Hire page: Nairon Difference — capability cards ─────────────
export const HIRE_CAPABILITIES = [
	{
		number: "01",
		title: "Ship production AI systems",
		description:
			"Not demos. Not notebooks. Real systems with monitoring, error handling, and scale considerations baked in.",
	},
	{
		number: "02",
		title: "Make architectural decisions",
		description:
			"They know when to use RAG vs. fine-tuning vs. agents, and can defend that decision to your investors.",
	},
	{
		number: "03",
		title: "Think in tradeoffs",
		description:
			'"Will this scale? What will it cost? Who will maintain it?" These aren\'t afterthoughts. They\'re the first questions.',
	},
	{
		number: "04",
		title: "Communicate with stakeholders",
		description:
			"They can explain technical debt to your board and system architecture to your product team.",
	},
] as const;

// ─── Hire page: Process steps ────────────────────────────────────
export const HIRE_PROCESS_STEPS = [
	{
		number: 1,
		title: "Define Your Requirements",
		description:
			"You share your tech stack, role requirements, and team culture so we can align on exactly what you need.",
		image: "/assets/framer/jyMp9OqNFeIiNZgYSYTjgHZnhyQ.png",
	},
	{
		number: 2,
		title: "We Train the Cohort",
		description:
			"Our team runs an intensive 10-week AI engineering program tailored to the skills and tools your roles demand.",
		image: "/assets/framer/pshetKl5VEKwnAW1nwizR8675w.png",
	},
	{
		number: 3,
		title: "Meet the Engineers",
		description:
			"You get access to the full cohort, review projects, and interview the candidates that best fit your team.",
		image: "/assets/framer/jyMp9OqNFeIiNZgYSYTjgHZnhyQ.png",
	},
	{
		number: 4,
		title: "Hire & Build",
		description:
			"Select your engineers, sign, and start integrating them into your product team with our support.",
		image: "/assets/framer/LWS5A3AFRDm7CFokzD4zZhFJb7g.png",
	},
] as const;

// ─── Hire page: Tier cards ───────────────────────────────────────
export interface HireTier {
	badge: string;
	name: string;
	commitment: string;
	tagline: string;
	description: string;
	features: string[];
	gradient: string;
	bottomGradient: string;
	image: string;
	popular?: boolean;
}

export const HIRE_TIERS: HireTier[] = [
	{
		badge: "Fast Growth Startups",
		name: "Starter",
		commitment: "1 Hire Commitment",
		tagline: "For startups making their first Nairon hire",
		description:
			"Gain exclusive access to pre-vetted AI engineers who have survived one of the world\u2019s most demanding programs.",
		features: [
			"Week 8 Access",
			"Dedicated hiring manager",
			"Standard Hiring Rate",
			"100% success guarantee",
		],
		gradient: "pricing-gradient-gray",
		bottomGradient: "radial-gradient(110% 165% at 3.2% 143.1%, rgb(38, 38, 38) 0%, rgb(0, 0, 0) 100%)",
		image: "/assets/framer/jyMp9OqNFeIiNZgYSYTjgHZnhyQ.png",
	},
	{
		badge: "Ultra Growth Startups",
		name: "Priority",
		commitment: "3 Hires Commitment",
		tagline: "For startups scaling their AI team",
		description:
			"Gain exclusive access to pre-vetted AI engineers who have survived one of the world\u2019s most demanding programs.",
		features: [
			"Week 6 Access",
			"One-on-one talent matching calls",
			"Dedicated partnership manager",
			"100% success guarantee",
		],
		gradient: "pricing-gradient-gold",
		bottomGradient: "radial-gradient(110% 165% at 3.2% 143.1%, rgb(158, 115, 14) 0%, rgb(0, 0, 0) 100%)",
		image: "/assets/framer/pshetKl5VEKwnAW1nwizR8675w.png",
		popular: true,
	},
	{
		badge: "Enterprise",
		name: "Exclusive",
		commitment: "5+ Hires Commitment",
		tagline: "For startups who want the best, first.",
		description:
			"Gain exclusive access to pre-vetted AI engineers who have survived one of the world\u2019s most demanding programs.",
		features: [
			"Week 4 Access - First pick of top-ranked graduates",
			"One-on-one talent matching calls",
			"Dedicated partnership manager",
			"100% success guarantee",
		],
		gradient: "pricing-gradient-gray",
		bottomGradient: "radial-gradient(110% 165% at 3.2% 143.1%, rgb(38, 38, 38) 0%, rgb(0, 0, 0) 100%)",
		image: "/assets/framer/jyMp9OqNFeIiNZgYSYTjgHZnhyQ.png",
	},
];

// ─── Hire page: Comparison table ─────────────────────────────────
export interface ComparisonRow {
	feature: string;
	starter: string;
	priority: string;
	exclusive: string;
}

export interface ComparisonSection {
	title: string;
	rows: ComparisonRow[];
}

export const HIRE_COMPARISON: ComparisonSection[] = [
	{
		title: "Access & Timeline",
		rows: [
			{ feature: "Access Week", starter: "8", priority: "6", exclusive: "4" },
			{
				feature: "First Pick of Top-Ranked",
				starter: "-",
				priority: "-",
				exclusive: "\u2713",
			},
		],
	},
	{
		title: "Support & Management",
		rows: [
			{
				feature: "Hiring Manager",
				starter: "Dedicated",
				priority: "Dedicated",
				exclusive: "Dedicated",
			},
			{
				feature: "Talent Matching Calls",
				starter: "One-on-one",
				priority: "One-on-one",
				exclusive: "One-on-one",
			},
			{
				feature: "Partnership Manager",
				starter: "-",
				priority: "Dedicated",
				exclusive: "Dedicated",
			},
		],
	},
	{
		title: "Hiring Benefits",
		rows: [
			{
				feature: "Hiring Rate",
				starter: "Standard",
				priority: "Discounted",
				exclusive: "Discounted",
			},
			{
				feature: "Success Guarantee",
				starter: "100%",
				priority: "100%",
				exclusive: "100%",
			},
		],
	},
	{
		title: "Additional Perks",
		rows: [
			{
				feature: "Project Briefs",
				starter: "-",
				priority: "1",
				exclusive: "Unlimited",
			},
			{
				feature: "Guest Speaker Slots",
				starter: "-",
				priority: "1",
				exclusive: "2+",
			},
			{
				feature: "VIP Demo Day",
				starter: "-",
				priority: "-",
				exclusive: "\u2713",
			},
			{
				feature: "Hackathon Sponsorship",
				starter: "-",
				priority: "-",
				exclusive: "\u2713",
			},
			{
				feature: "Cohort Slack Access",
				starter: "-",
				priority: "-",
				exclusive: "\u2713",
			},
			{
				feature: "Mentorship Slots",
				starter: "-",
				priority: "-",
				exclusive: "\u2713",
			},
		],
	},
];

// ─── Hire page: FAQ ──────────────────────────────────────────────
export const HIRE_FAQ_ITEMS = [
	{
		question: "How does hiring work?",
		answer:
			"Pick a tier based on how many engineers you want to hire. Each tier unlocks access to candidates at a different point in the cohort. Higher tiers see talent earlier and get first pick. We handle intros, you run your own process.",
	},
	{
		question: "What kind of engineers will I meet?",
		answer:
			"AI engineers who have shipped agents, RAG systems, fine-tuned models, and launched products to real users in 6 weeks. They have survived 500+ hours of building and weekly cuts. No hand-holding required.",
	},
	{
		question: "What does it cost?",
		answer:
			"Pricing depends on your hiring commitment and tier. There is a partial upfront fee. You pay the rest when you make a hire.",
	},
	{
		question: "What if the hire doesn\u2019t work out?",
		answer:
			"Every hire comes with a 100% success guarantee. If the placement doesn\u2019t work out, we\u2019ll find you a replacement from the next cohort at no additional cost.",
	},
	{
		question: "When do I get access to candidates?",
		answer:
			"Access is tiered: Starter: Meet candidates at Week 8 (demo day). Priority: Access from Week 6. Exclusive: Access from Week 4, with first pick while the cohort is still in full swing.",
	},
	{
		question: "Can I submit projects for the cohort to work on?",
		answer:
			"Yes. Priority partners can submit one project brief. Exclusive partners can submit multiple briefs and see how engineers solve your real problems before you hire them.",
	},
	{
		question: "How do I get started?",
		answer:
			"Book a call with us. We will walk you through the cohort, understand your hiring plans, and recommend the tier that fits your needs.",
	},
] as const;
