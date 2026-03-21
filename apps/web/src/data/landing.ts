// ─── Application deadline ────────────────────────────────────────
export const APPLICATION_DEADLINE = new Date("2026-02-12T00:00:00");

// ─── Rotating hero words ─────────────────────────────────────────
export const HERO_WORDS = ["Founder", "AI Enthusiast", "1% Engineer"];

// ─── Navigation links (legacy — used by footer) ────────────────
export const NAV_LINKS = [
	{ label: "Hire", href: "/hire" },
	{ label: "Team", href: "/team" },
	{ label: "Program", href: "/program" },
	{ label: "Contact", href: "/contact" },
	{ label: "Careers", href: "/careers" },
] as const;

// ─── View-mode navigation config ────────────────────────────────
export interface NavLinkSimple {
	kind: "link";
	label: string;
	href: string;
}

export interface NavDropdownItem {
	label: string;
	href: string;
	description?: string;
	icon?: string;
}

export interface NavDropdownColumn {
	heading: string;
	items: NavDropdownItem[];
}

export interface NavDropdownCta {
	headline: string;
	description: string;
	href: string;
	buttonLabel: string;
}

export interface NavLinkDropdown {
	kind: "dropdown";
	label: string;
	columns: NavDropdownColumn[];
	cta?: NavDropdownCta;
}

export type NavItem = NavLinkSimple | NavLinkDropdown;

export interface NavConfig {
	items: NavItem[];
	cta: {
		label: string;
		href: string;
		color: "green" | "gold";
		external?: boolean;
	};
}

export function isDropdownItem(item: NavItem): item is NavLinkDropdown {
	return item.kind === "dropdown";
}

export const ENGINEER_NAV: NavConfig = {
	items: [
		{
			kind: "dropdown",
			label: "Programs",
			columns: [
				{
					heading: "Programs",
					items: [
						{
							label: "Residence",
							href: "/program",
							description: "8-week intensive AI engineering program in Dubai",
							icon: "building",
						},
						{
							label: "Apprenticeship",
							href: "/apprenticeship",
							description: "Remote apprenticeship with top AI startups",
							icon: "laptop",
						},
					],
				},
				{
					heading: "Resources",
					items: [
						{ label: "Blog", href: "/blog" },
						{ label: "FAQ", href: "/faq" },
						{ label: "Alumni", href: "/alumni" },
						{ label: "Design by Nairon", href: "/design" },
						{ label: "Podcast", href: "/podcast" },
						{ label: "Events", href: "/events" },
					],
				},
			],
			cta: {
				headline: "Join Cohort 2",
				description: "Applications close Feb 12. Limited to 20 engineers.",
				href: "https://apply.naironai.com",
				buttonLabel: "Apply Now",
			},
		},
		{ kind: "link", label: "Team", href: "/team" },
		{ kind: "link", label: "Alumni", href: "/alumni" },
		{ kind: "link", label: "Contact", href: "/contact" },
		{ kind: "link", label: "Careers", href: "/careers" },
	],
	cta: {
		label: "Apply",
		href: "https://apply.naironai.com",
		color: "green",
		external: true,
	},
};

export const HIRING_MANAGER_NAV: NavConfig = {
	items: [
		{ kind: "link", label: "Our Approach", href: "/hire" },
		{ kind: "link", label: "Team", href: "/team" },
		{ kind: "link", label: "Success Stories", href: "/success-stories" },
		{ kind: "link", label: "Contact", href: "/contact" },
	],
	cta: {
		label: "Find Talent",
		href: "/find-talent",
		color: "gold",
	},
};

// ─── About section features ─────────────────────────────────────
export const FEATURES = [
	{
		icon: "/assets/framer/4UluxPGUnuHGRTAiDCLlXAout4.png",
		title: "They Own the Outcome",
		description:
			"Our engineers do not wait for a spec. They talk to users, find the real problem, and ship the solution.",
	},
	{
		icon: "/assets/framer/RQID0uOGeWqF21qgFLskUbILQ.png",
		title: "They are AI-Native",
		description:
			"While others prompt engineer, they design full AI systems. They know when to use RAG, fine-tuning, or agents, and how to make them work in production.",
	},
	{
		icon: "/assets/framer/kB9SzsGVhcw6S54lxC5CMmP9d5o.png",
		title: "They Think in Systems",
		description:
			"They don't just ask if something works; they ask how it scales, what it costs, and what happens when it breaks.",
	},
	{
		icon: "/assets/framer/vE5Nw48WnSWq4GMj8gJryzGDxWg.png",
		title: "They Communicate like CTOs",
		description:
			"They speak product, business, and engineering in one language. They can explain technical debt and architecture decisions to investors and founders.",
	},
	{
		icon: "/assets/framer/NT0VTDsDN6iltFr3iwAKmpltg.png",
		title: "They Deliver Under Pressure",
		description:
			"Real founders. Real deadlines. Real consequences. After 8 weeks of shipping under these conditions, your startup's pace will not faze them.",
	},
] as const;

// ─── Requirements ────────────────────────────────────────────────
export const REQUIREMENTS = [
	{ iconName: "code" as const, text: "3+ years of software engineering experience" },
	{ iconName: "brain" as const, text: "95th percentile or higher on the CCAT" },
	{ iconName: "award" as const, text: "Win a Hackathon" },
	{ iconName: "mic" as const, text: "Strong written and verbal communication skills" },
] as const;

// ─── Team members (for homepage section) ────────────────────────
export const TEAM_MEMBERS = [
	{
		name: "Luka Erić",
		role: "CEO",
		image: "/assets/framer/SSmGx1bjs3koY1aPdILAeuc.webp",
		linkedin: "https://www.linkedin.com/in/lukaeric/",
	},
	{
		name: "Obaid Ur-Rahmaan",
		role: "CTO / Head of Product",
		image: "/assets/framer/Xse9UYp1XHtcxoFdIq5x3WbveBc.webp",
		linkedin: "https://www.linkedin.com/in/obaid-ur-rahmaan-5bb29814b/",
	},
	{
		name: "Abdulrahman Abdi",
		role: "Serial Founding Engineer / Advisor",
		image: "/assets/framer/VkXk2rDNGzBySnbTZ9H4v4dMdE.jpeg",
		linkedin: "https://www.linkedin.com/in/ar-abdi/",
	},
];

// ─── Team page: Full team grid ──────────────────────────────────
export const TEAM_PAGE_MEMBERS = [
	{
		name: "Abdulrahman Abdi",
		role: "Founding AI Engineer",
		image: "/assets/framer/VkXk2rDNGzBySnbTZ9H4v4dMdE.jpeg",
		linkedin: "https://www.linkedin.com/in/ar-abdi",
	},
	{
		name: "Luka Eric",
		role: "CEO | Serial Founder",
		image: "/assets/framer/SSmGx1bjs3koY1aPdILAeuc.webp",
		linkedin: "https://www.linkedin.com/in/lukaeric",
	},
	{
		name: "Obaid Ur-Rahmaan",
		role: "CTO / Head of Product",
		image: "/assets/framer/Xse9UYp1XHtcxoFdIq5x3WbveBc.webp",
		linkedin: "https://www.linkedin.com/in/obaid-ur-rahmaan-5bb29814b",
	},
	{
		name: "Special Guest",
		role: "AI Engineer",
		image: "/assets/framer/47jhKH0AA1f2ZNcovBPcmjTlLM.png",
		linkedin: "https://www.linkedin.com/in/jitendra-raut/",
	},
] as const;

// ─── Team page: Featured member ─────────────────────────────────
export const FEATURED_MEMBER = {
	name: "Luka Eric",
	title: "Serial Founder",
	image: "/assets/framer/SSmGx1bjs3koY1aPdILAeuc.webp",
	linkedin: "https://www.linkedin.com/in/lukaeric/",
	twitter: "https://x.com/founderLuka",
	bio: [
		"Luka Eric is the founder of Abundance AI and a consultant who has led product, marketing, and innovation work across the UAE, U.S., and Europe. He has designed and scaled ventures in AI, education, real estate, logistics, and e-commerce, partnering with both startups and established brands.",
		"Luka previously built Rhetora AI, a Techstars-backed company developing conversational AI models for call centers. His work blends strategic clarity with hands-on execution. Luka helps companies turn ideas into real products, strong funnels, and measurable growth — from product design and hiring to branding, go-to-market, and operational systems. He enjoys building alongside ambitious teams and tackling complex problems where technology, business, and creativity intersect.",
	],
	logos: [
		{ name: "Techstars", src: "/assets/framer/pUNtUdgSwe33FoYh1m5LpqWPnCg.png" },
		{ name: "Rhetora AI", src: "/assets/framer/fh0BAFiSLjGHDRpCleZIUYZsuD8.png" },
		{ name: "Question Base", src: "/assets/framer/gCoRIliVPUssDE4xI8Sgarcds.png" },
		{ name: "CodeGPT", src: "/assets/framer/Ubzltin4ACP1ExeTGTyxOMVLg4.png" },
		{ name: "Smartsy", src: "/assets/framer/8qMWlLSlx0NOdAKU6xzxJx8w6dk.png" },
	],
} as const;

// ─── Program phases ──────────────────────────────────────────────
export interface GuestData {
	name: string;
	role: string;
}

export interface WeekData {
	week: string;
	title: string;
	description: string;
	guest?: string;
	guestRole?: string;
	guests?: GuestData[];
}

export interface PhaseData {
	phase: string;
	title: string;
	gradient: string;
	weeks: WeekData[];
}

export const PROGRAM_PHASES: PhaseData[] = [
	{
		phase: "Phase 1",
		title: "Remote Evaluation",
		gradient: "phase-gradient-1",
		weeks: [
			{
				week: "Week 1",
				title: "48-Hour Web App Hackathon + Full-Week Engineering Challenges",
				description:
					"Ship a production-ready web application with an integrated AI feature. You'll kick off with a competitive 48-hour hackathon, then spend the remainder of the week improving architecture, debugging, adding new feature requests, and polishing your demo for final evaluation. Top engineers advance.",
			},
			{
				week: "Week 2",
				title: "72-Hour Mobile AI App Hackathon + Full-Week Product Work",
				description:
					"Build a complete mobile application with integrated AI in 72 hours, then continue the week with code reviews, performance upgrades, added feature requests, and stakeholder-style feedback. The highest-performing engineers secure a direct invite to the on-site Dubai intensive.",
				guest: "Special Guest",
				guestRole: "Head of Product at Series C AI Startup",
			},
		],
	},
	{
		phase: "Phase 2",
		title: "On-Site Dubai Intensive",
		gradient: "phase-gradient-2",
		weeks: [
			{
				week: "Week 3",
				title: "AI-First Enterprise Development",
				description:
					"Your introduction to AI-First engineering where you'll master cutting-edge Developer tooling, establish optimal workflows, and build enterprise-grade applications at accelerated speeds.",
			},
			{
				week: "Week 4",
				title: "Advanced RAG, Agent Systems & Observability",
				description:
					"You'll build a production web application with embedded RAG and Agents, mastering agent workflows, evaluation frameworks, and monitoring systems for production reliability.",
				guest: "Guest mentor",
				guestRole: "Staff ML Engineer at Unicorn Startup",
			},
			{
				week: "Week 5",
				title: "Fine-Tuning and Custom Models",
				description:
					"Your focus shifts to custom model development and real-world validation as you launch public projects, acquire users, and iterate based on market feedback.",
				guest: "Guest mentor",
				guestRole: "ML Engineer at Hugging Face",
			},
		],
	},
	{
		phase: "Phase 3",
		title: "Partner Intros",
		gradient: "phase-gradient-3",
		weeks: [
			{
				week: "Week 6",
				title: "Hiring Partner Projects Sprint",
				description:
					"Real-world client briefs test your professional delivery capabilities as you build production MVPs under enterprise constraints demonstrating your adaptability and stakeholder communication skills.",
				guests: [
					{ name: "Special Guest", role: "Head of AI at Growth-Stage SaaS Company" },
					{ name: "Special Guest", role: "Research Engineer at AI Lab" },
				],
			},
			{
				week: "Week 7",
				title: "Enterprise AI & Multi-Agent Coordination",
				description:
					"You'll explore enterprise-scale systems where you architect coordinated agent teams, modernise legacy codebases, and implement production-scale AI infrastructure.",
				guest: "Special Guest",
				guestRole: "Principal Data Scientist at Unicorn Fintech",
			},
			{
				week: "Week 8",
				title: "Portfolio Polish & Hiring Partner Showcase",
				description:
					"Your final sprint, built to refine projects to production standards, demoing on the spot, and presenting to hiring partners.",
			},
		],
	},
];

// ─── Partners ────────────────────────────────────────────────────
export const PARTNERS = [
	{
		name: "Keylead",
		logo: "/assets/framer/8iawpdspB7oNrbkg9yVbuNsT7lU.png",
		tagline: "Seed · Raised $2M",
	},
	{
		name: "Question Base",
		logo: "/assets/framer/3yRGTa8SbDMNcHD0Z9htHa4mti0.png",
		tagline: "YC W25 Startup",
	},
	{
		name: "CodeGPT",
		logo: "/assets/framer/XXv1BKrLDM97th8HhgjBiFfeeUo.png",
		tagline: "Series A · AI Dev Tools",
	},
	{
		name: "NEOM",
		logo: "/assets/framer/7c0S1a6D6BW6O548tD40fZDqDg.png",
		tagline: "Enterprise · 11,000 employees",
	},
] as const;

// ─── FAQ items ───────────────────────────────────────────────────
export const FAQ_ITEMS = [
	{
		question: "Who is the program for?",
		answer:
			"Developers with 1–3+ years of experience who want to break into AI engineering. You should be a strong builder who can handle intensity: 12-hour days, 6 days a week, for 8 weeks.",
	},
	{
		question: "What makes Nairon different from a coding bootcamp?",
		answer:
			"We don't teach you to code. We take experienced engineers and train them to build production AI systems under real startup pressure. Think of it as an elite finishing school for engineers who already know how to build.",
	},
	{
		question: "What are the eligibility requirements?",
		answer:
			"3+ years of software engineering experience, 95th percentile or higher on the CCAT, strong written and verbal communication skills, and a hackathon win or equivalent demonstration of building under pressure.",
	},
	{
		question: "What does the program include?",
		answer:
			"8 weeks of intensive AI engineering training, direct access to our mentor network, full relocation to Dubai, and guaranteed hiring positions at leading AI startups.",
	},
	{
		question: "Is there a cost to join?",
		answer:
			"No. The program is completely free for engineers. We make money when our hiring partners hire you.",
	},
	{
		question: "What is the selection process like?",
		answer:
			"After applying, you'll go through a multi-stage evaluation including a cognitive assessment, technical interview, and a timed hackathon challenge. We accept fewer than 2% of applicants.",
	},
] as const;

// ─── Footer links ────────────────────────────────────────────────
export const FOOTER_LINKS = {
	engineer: [
		{ label: "Programs", href: "/program" },
		{ label: "Team", href: "/team" },
		{ label: "Alumni", href: "/alumni" },
		{ label: "Careers", href: "/careers" },
		{ label: "Contact", href: "/contact" },
		{ label: "Blog", href: "/blog" },
	],
	hiringManager: [
		{ label: "Our Approach", href: "/hire" },
		{ label: "Team", href: "/team" },
		{ label: "Success Stories", href: "/success-stories" },
		{ label: "Contact", href: "/contact" },
	],
} as const;

// ─── Engineer benefits ───────────────────────────────────────────
export const ENGINEER_BENEFITS = [
	"8 Weeks free AI engineering training",
	"Direct access to our mentor network",
	"Full Relocation to Dubai",
	"Guaranteed hiring positions at leading AI Startups",
] as const;

// ─── Program page: About section quote ──────────────────────────
export const PROGRAM_QUOTE = {
	text: "Talent shouldn't be decided by resumes or interviews. Give an engineer a real problem, a deadline, and you'll know who they are.",
	author: "Luka",
	role: "Founder & CEO",
	image:
		"/assets/framer/dJLzlQGws846Nd571RpJg07iwfo.jpeg",
} as const;

// ─── Program page: Our mission paragraphs ───────────────────────
export const PROGRAM_MISSION = [
	"Traditional hiring is broken for engineers. Mass-applying into the void, endless recruiter screens, ghosted after six interviews, assignments, then being reduced to a ticket machine inside companies that don't ship fast.",
	{
		before:
			"We built Nairon as a place where engineers earn their value in one dimension only — ",
		bold: "can you ship reliable, production AI under pressure?",
		after:
			" No resume theater, no recruiter games, no endless take-homes.",
	},
	"If you're great, you don't need to beg for opportunity. You need one intense arena that proves it.",
] as const;

// ─── Program page: Our approach bullets ─────────────────────────
export const PROGRAM_APPROACH = [
	"One intense program, engineered for failure. Not everyone makes it, and that's the point.",
	"Ship under real ambiguity and deadlines.",
	"Production before theory.",
	"Collaborative, founder-level environment — Tight rooms, daily builds, async ownership, and no hand-holding.",
] as const;

// ─── Program page: Stats ────────────────────────────────────────
export const PROGRAM_STATS = {
	duration: { value: "8", suffix: "wks", label: "Intensive Program" },
	clients: { value: "17+", label: "Happy clients worldwide" },
	partners: { value: "10+", label: "Hiring Partners" },
	cohortSize: { value: "20+", label: "Elite Engineers" },
	workType: { value: "100", suffix: "%", label: "Remote Work" },
	avatars: [
		"/assets/framer/SSmGx1bjs3koY1aPdILAeuc.webp",
		"/assets/framer/Xse9UYp1XHtcxoFdIq5x3WbveBc.webp",
		"/assets/framer/VkXk2rDNGzBySnbTZ9H4v4dMdE.jpeg",
	],
} as const;

// ─── Program page: How to get in ────────────────────────────────
export const PROGRAM_STEPS = [
	{ number: "(01)", title: "Submit Application" },
	{ number: "(02)", title: "CCAT Test" },
	{ number: "(03)", title: "Hackathon Challenge" },
	{ number: "(04)", title: "Join the Cohort" },
] as const;

export const PROGRAM_REVIEW = {
	intro: "We review your ",
	boldWords: ["background", "GitHub", "projects"],
	suffix: ", and ",
	boldEnd: "motivation",
	afterBold:
		" for joining a selective AI engineering cohort.",
	criteria: [
		"Strong execution mindset",
		"Proof of building real things",
		"Curiosity and problem-solving",
	],
	responseTime: "Within 24 Hours — By real human",
} as const;

// ─── Program page: Benefit cards ────────────────────────────────
export const PROGRAM_BENEFIT_CARDS = [
	{
		tag: "The Experience",
		heading:
			"Dubai is the experience — The opportunity is Global.",
		items: [
			{ icon: "home" as const, text: "Free housing during Dubai intensive weeks" },
			{ icon: "plane" as const, text: "Flights + transportation covered" },
			{ icon: "food" as const, text: "Food + laundry service included" },
		],
	},
	{
		tag: "Premium Access",
		heading: "Unlimited Resources for Success",
		items: [
			"Unlimited API credits for training & projects",
			"Premium AI tool access",
		],
	},
	{
		tag: "Community",
		heading: "Global Network Access",
		items: [
			"Slack community of global engineers",
			"Real projects from partner companies",
			"Priority for top ranks",
		],
	},
	{
		tag: "Guaranteed",
		heading: "$100k+",
		subtext: "Minimum earning potential",
	},
] as const;

// ─── Client benefits ─────────────────────────────────────────────
export const CLIENT_BENEFITS = [
	"Priority access to top 1% engineers",
	"One-on-one talent matching calls",
	"Dedicated partnership manager",
	"100% success guarrantee",
] as const;

// ═══════════════════════════════════════════════════════════════════
// HOMEPAGE REDESIGN — View-mode-aware data
// ═══════════════════════════════════════════════════════════════════

// ─── Hero subtext + CTA ─────────────────────────────────────────
export const HERO_CONTENT = {
	engineer: {
		subtext: "The world's most selective AI engineering program",
		cta: { label: "Apply Now", href: "/residence" },
	},
	hiringManager: {
		subtext: "The only pipeline producing verified AI-native engineers",
		cta: { label: "Submit a Role", href: "/approach" },
	},
} as const;

// ─── Problem section — Observation + tabbed problems ────────────
export const PROBLEM_SECTION = {
	engineer: {
		eyebrow: "THE PROBLEM",
		observation: "Engineers will either shape the future or be left behind.",
		tabs: [
			{
				tab: "Invisible to companies",
				title: "Great talent stays unseen",
				description:
					"Hiring still leans on resumes and interview polish. Real builders are often filtered out before they can show what they can do.",
				button: { label: "See how we fix this", href: "/residence" },
				visualTag: "Signal gap",
				visualItems: [
					"Resume keywords",
					"Credentials",
					"Interview performance",
					"Real building ability",
				],
			},
			{
				tab: "Too much hype",
				title: "Noise beats real progress",
				description:
					"Every week brings a new tool and trend. Most engineers stay busy, but still do not know what path actually moves their career.",
				button: { label: "Find a clear path", href: "/residence" },
				visualTag: "Signal vs noise",
				visualItems: [
					"New frameworks",
					"Hot takes",
					"AI tool drops",
					"One path that compounds",
				],
			},
			{
				tab: "Career risk",
				title: "The stakes are rising",
				description:
					"AI is changing what companies value and how teams work. If you stand still, opportunities, pay, and confidence can fall fast.",
				button: { label: "Protect your edge", href: "/residence" },
				visualTag: "Future outcomes",
				visualItems: ["Adapt and lead", "Stand still", "Role growth", "Role risk"],
			},
		],
	},
	hiringManager: {
		eyebrow: "THE PROBLEM",
		observation:
			"In the next few years, companies will either build with AI-native engineers or fall behind.",
		tabs: [
			{
				tab: "Invisible to companies",
				title: "Top builders stay hidden",
				description:
					"The best engineers are filtered out by weak signals. Teams lose months interviewing candidates who look strong on paper but cannot deliver.",
				button: { label: "See our pipeline", href: "/approach" },
				visualTag: "Signal gap",
				visualItems: [
					"Resume keywords",
					"Credentials",
					"Interview performance",
					"Real building ability",
				],
			},
			{
				tab: "Too much hype",
				title: "Hype hides true talent",
				description:
					"Everyone claims to be AI-ready. It is harder than ever to separate people who can actually ship from people who can just talk about tools.",
				button: { label: "Find proven engineers", href: "/approach" },
				visualTag: "Signal vs noise",
				visualItems: [
					"AI buzzwords",
					"Trend chasing",
					"Tool familiarity",
					"Production execution",
				],
			},
			{
				tab: "Career risk",
				title: "Hiring risk is compounding",
				description:
					"A weak AI hire slows roadmap, burns team time, and raises delivery risk. The cost of getting this wrong is now much higher.",
				button: { label: "Reduce hiring risk", href: "/approach" },
				visualTag: "Future outcomes",
				visualItems: ["AI-native hires", "Slow delivery", "Market lead", "Roadmap risk"],
			},
		],
	},
} as const;

// ─── Value prop section — scroll-reveal story ─────────────────────
export const VALUE_PROP_SECTION = {
	engineer: {
		headline: "From overlooked to undeniable.",
		subline:
			"In an AI-shifting world, the edge goes to engineers who are seen, sharpened, and aligned with meaningful work.",
		steps: [
			{
				icon: "visibility" as const,
				label: "Get seen",
				title: "Get seen",
				description:
					"Be recognized for how you think, not how your resume scans. Real signal rises above resume theater.",
				tags: ["Signal over pedigree", "Thinking-first evaluation", "Merit, not theater"],
				asset: {
					type: "image" as const,
					src: "/1.webp",
					poster: "",
					alt: "Engineer being recognized for their work",
					placeholder: "Drop your Get seen clip here",
				},
			},
			{
				icon: "learning" as const,
				label: "Learn what matters",
				title: "Learn what matters",
				description:
					"Build AI-native skills that create real progress, not more noise. Focus on execution that compounds.",
				tags: ["Real workflows", "Execution focused", "Built for this era"],
				asset: {
					type: "image" as const,
					src: "/2.webp",
					poster: "",
					alt: "Engineer learning AI-native workflows",
					placeholder: "Drop your Learn what matters clip here",
				},
			},
			{
				icon: "purpose" as const,
				label: "Find purpose in work",
				title: "Find purpose in work",
				description:
					"Use your talent on work that matters, with people who value it. Build outcomes you are proud to own.",
				tags: ["Meaningful roles", "High ownership", "Visible impact"],
				asset: {
					type: "image" as const,
					src: "/3.webp",
					poster: "",
					alt: "Engineer seeing meaningful impact from their work",
					placeholder: "Drop your Find purpose in work clip here",
				},
			},
		],
	},
	hiringManager: {
		headline: "From noisy resumes to undeniable builders.",
		subline:
			"When the market shifts this fast, teams win by hiring engineers who can think clearly, learn quickly, and ship meaningful outcomes.",
		steps: [
			{
				icon: "visibility" as const,
				label: "See real signal",
				title: "See real signal",
				description:
					"Assess engineers by problem-solving quality and execution depth, not keyword-heavy resumes.",
				tags: ["Signal-first filtering", "Problem-solving depth", "Lower screening noise"],
				asset: {
					type: "image" as const,
					src: "/1.webp",
					poster: "",
					alt: "Hiring manager identifying true engineering signal",
					placeholder: "Drop your See real signal clip here",
				},
			},
			{
				icon: "learning" as const,
				label: "Hire adaptive talent",
				title: "Hire adaptive talent",
				description:
					"Get engineers trained on modern AI-native workflows and practical delivery expectations.",
				tags: ["AI-native habits", "Execution ready", "Fast ramp-up"],
				asset: {
					type: "image" as const,
					src: "/2.webp",
					poster: "",
					alt: "Engineer collaborating with team using AI-native workflows",
					placeholder: "Drop your Hire adaptive talent clip here",
				},
			},
			{
				icon: "purpose" as const,
				label: "Build with purpose",
				title: "Build with purpose",
				description:
					"Place engineers where strengths compound, ownership is clear, and impact reaches users quickly.",
				tags: ["Better role fit", "High ownership", "Faster product impact"],
				asset: {
					type: "image" as const,
					src: "/3.webp",
					poster: "",
					alt: "Team reviewing meaningful product impact",
					placeholder: "Drop your Build with purpose clip here",
				},
			},
		],
	},
} as const;

// ─── Benefits bento section ───────────────────────────────────────
export const BENEFITS_BENTO_SECTION = {
	engineer: {
		eyebrow: "Benefits",
		title: "Why engineers choose nairon",
		metrics: [
			{ label: "Duration", value: "8", suffix: "wks", note: "Intensive Program" },
			{ label: "Hiring Partners", value: "10+", note: "Global companies" },
			{ label: "Cohort Size", value: "20+", note: "Elite Engineers" },
			{ label: "Work Type", value: "100%", note: "Remote Work" },
		],
		cards: {
			experience: {
				tag: "The Experience",
				heading: "Dubai is the experience - The opportunity is global.",
				items: [
					{ icon: "home" as const, text: "Free housing during Dubai intensive weeks" },
					{ icon: "plane" as const, text: "Flights + transportation covered" },
					{ icon: "food" as const, text: "Food + laundry service included" },
				],
			},
			resources: {
				tag: "Premium Access",
				heading: "Unlimited Resources for Success",
				items: [
					"Unlimited API credits for training and projects",
					"Premium AI tool access",
				],
			},
			community: {
				tag: "Community",
				heading: "Global Network Access",
				items: [
					"Slack community of global engineers",
					"Real projects from partner companies",
					"Priority for top ranks",
				],
			},
			guarantee: {
				tag: "Guaranteed",
				value: "$100K+",
				note: "Minimum earning potential",
			},
		},
	},
	hiringManager: {
		eyebrow: "Benefits",
		title: "why companies hire from nairon",
		metrics: [
			{ label: "Time to Hire", value: "<14", suffix: "days", note: "Average timeline" },
			{ label: "Placement", value: "100%", note: "Role fulfillment" },
			{ label: "Candidate Quality", value: "Top 1%", note: "AI-native engineers" },
			{ label: "Bad Hires", value: "0", note: "From our pipeline" },
		],
		cards: {
			experience: {
				tag: "Pipeline",
				heading: "Screened for clear thinking and execution under pressure.",
				items: [
					{ icon: "home" as const, text: "Benchmark-based evaluation" },
					{ icon: "plane" as const, text: "8-week AI-native preparation" },
					{ icon: "food" as const, text: "Role-fit matching before intro" },
				],
			},
			resources: {
				tag: "Speed",
				heading: "Faster hiring with higher confidence",
				items: [
					"Pre-qualified engineers, ready for real delivery",
					"Less interview waste and lower hiring noise",
				],
			},
			community: {
				tag: "Outcomes",
				heading: "Engineers who compound team performance",
				items: [
					"Strong ownership from day one",
					"Execution aligned to product outcomes",
					"Visible impact in weeks, not quarters",
				],
			},
			guarantee: {
				tag: "Guarantee",
				value: "0 Bad Hires",
				note: "From our pipeline",
			},
		},
	},
} as const;

// ─── Outcome metrics ───────────────────────────────────────────
export const METRICS = {
	engineer: {
		largeCard: {
			headline: "10,000+ applicants",
			subtext: "12 selected",
			description: "The acceptance funnel",
		},
		stats: [
			{ value: "<3%", label: "Acceptance Rate" },
			{ value: "12", label: "Engineers per Cohort" },
			{ value: "8 weeks", label: "Program Duration" },
			{ value: "100%", label: "Placement Rate" },
		],
	},
	hiringManager: {
		largeCard: {
			headline: "Trained → Matched → Hired",
			subtext: "End-to-end pipeline",
			description: "The placement pipeline",
		},
		stats: [
			{ value: "100%", label: "Placement Rate" },
			{ value: "<14 days", label: "Average Time to Hire" },
			{ value: "8 weeks", label: "Training Before Interview" },
			{ value: "0", label: "Bad Hires" },
		],
	},
} as const;

// ─── How it works steps ────────────────────────────────────────
export const STEPS = {
	engineer: [
		{
			icon: "ClipboardText" as const,
			title: "Apply",
			description: "One application. One CCAT. No endless interview loops.",
		},
		{
			icon: "Trophy" as const,
			title: "Prove it in a hackathon",
			description: "Hackathons run twice a month. Build something real and get your decision in 1-2 weeks max.",
		},
		{
			icon: "Briefcase" as const,
			title: "Become world-class",
			description: "Join our free program and train to become a world-class AI engineer.",
		},
		{
			icon: "Handshake" as const,
			title: "Start dream job",
			description: "We introduce you to 5-8 hiring partners, then help you land the right offer.",
		},
	],
	hiringManager: [
		{
			icon: "PaperPlaneTilt" as const,
			title: "Submit a role",
			description: "Tell us what you need and your engineering requirements",
		},
		{
			icon: "Briefcase" as const,
			title: "Develop engineers",
			description: "We train and pressure-test engineers in our program before introductions.",
		},
		{
			icon: "MagnifyingGlass" as const,
			title: "We match",
			description: "We shortlist from our trained, vetted engineer pool for your exact role.",
		},
		{
			icon: "Handshake" as const,
			title: "You hire",
			description: "Interview pre-qualified candidates and hire with confidence",
		},
	],
} as const;

export const STEPS_CTA = {
	engineer: { label: "Start Your Application", href: "/residence" },
	hiringManager: { label: "Submit a Role", href: "/approach" },
} as const;

// ─── Residence section ─────────────────────────────────────────
export const RESIDENCE = {
	engineer: {
		title: "The Residency",
		subtitle: "8 weeks in Dubai. Fully funded. Only 12 spots.",
		points: [
			"100hrs/week, 800hrs total",
			"Housing, flights, and food included",
			"Work on real AI projects with partners",
			"Direct intros to hiring partners",
		],
		cta: { label: "Apply to Residency", href: "/residence" },
	},
	hiringManager: {
		title: "The Residency: Our Flagship Program",
		subtitle: "How we produce the top 1% of AI engineers",
		points: [
			"100hrs/week, 800hrs total",
			"8-week intensive in Dubai",
			"Hackathons, live projects, peer pressure",
			"Only 12 per cohort — extreme selectivity",
			"Every graduate is verified by us",
		],
		cta: { label: "Find talent", href: "/approach" },
	},
} as const;

// ─── Apprenticeship section ────────────────────────────────────
export const APPRENTICESHIP_CONTENT = {
	engineer: {
		title: "Start with Apprenticeship.",
		description:
			"Built after hundreds of engineers asked for a scaled version of our Residency, Apprenticeship helps you build the same execution habits remotely — then apply to Residency when you're ready.",
		points: [
			"8hrs/week, 48hrs total",
			"Part-time, remote format",
			"6-week structured program",
		],
		pills: ["Remote", "$1,500", "Standalone Path"],
		cta: { label: "Explore Apprenticeship", href: "/apprenticeship" },
	},
	hiringManager: {
		title: "The Apprenticeship",
		description:
			"A standalone remote track that adds a broader pool of trained AI engineers to your hiring pipeline.",
		points: [
			"8hrs/week, 48hrs total",
			"Part-time remote training",
			"6-week program",
			"Additional vetted talent pipeline",
		],
		pills: ["Standalone", "Remote", "Trained"],
		cta: { label: "Access This Pool", href: "/contact" },
	},
} as const;

// ─── Certificate section ─────────────────────────────────────────
export const CERTIFICATE_SECTION = {
	engineer: {
		eyebrow: "OUTCOME",
		title: "Graduate with proof, not promises",
		description: "",
		certificateTitle: "AI-Native Engineering Certificate",
		recipientName: "Aarav Patel",
		track: "Founding AI Engineer Track",
		credentialId: "NRN-ENG-2026-011",
		certificateBody:
			"Awarded to engineers who complete our full evaluation and delivery standards, from hackathon wins to production-grade project execution.",
		pills: ["Verified by mentors", "Real project evidence", "Partner-ready signal"],
	},
	hiringManager: {
		eyebrow: "VERIFICATION",
		title: "A hiring signal you can trust",
		description: "",
		certificateTitle: "Nairon Verified AI Engineer",
		recipientName: "Layla Hassan",
		track: "AI Systems Delivery Track",
		credentialId: "NRN-HM-2026-008",
		certificateBody:
			"Issued only after passing rigorous execution benchmarks across product thinking, AI systems design, and shipping speed under pressure.",
		pills: ["Execution benchmarked", "System-thinking assessed", "Production-ready talent"],
	},
} as const;

// ─── Partners section — view-mode-aware title + quote ──────────
export const PARTNER_CONTENT = {
	engineer: {
		title: "Built with industry leaders",
		quote:
			"The engineers who came through Nairon were the most prepared we've ever worked with.",
	},
	hiringManager: {
		title: "Trusted by leading companies",
		quote:
			"We hired 3 engineers from Cohort 1. All of them shipped production features in week 1.",
	},
} as const;

// ─── FAQ — separate question sets per view ─────────────────────
export const FAQ_ENGINEER = [
	{
		question: "What are the eligibility requirements?",
		answer:
			"3+ years of software engineering experience, 95th percentile or higher on the CCAT, strong communication skills, and a hackathon win or equivalent demonstration of building under pressure.",
	},
	{
		question: "Is the Residence really free?",
		answer:
			"Yes. The Residence is completely free for engineers — housing, flights, food, and training are all covered. We make money when our hiring partners hire you after graduation.",
	},
	{
		question: "What happens if I don't get into the Residence?",
		answer:
			"You can join the Apprenticeship — a remote, self-paced version of the same curriculum for $1,500. You still get access to our hiring partner network upon completion.",
	},
	{
		question: "What does the selection process look like?",
		answer:
			"After applying, you'll take the CCAT cognitive assessment, complete a timed hackathon challenge, and go through a final review. We accept fewer than 3% of applicants.",
	},
	{
		question: "Where is the program based?",
		answer:
			"The Residence is based in Dubai, UAE. You'll fly out for the full 8-week intensive. The Apprenticeship is fully remote.",
	},
	{
		question: "What happens after graduation?",
		answer:
			"Our hiring partners interview and compete to hire you. Every Residence graduate is guaranteed placement at a partner company.",
	},
] as const;

export const FAQ_HIRING_MANAGER = [
	{
		question: "How are Nairon engineers different from other candidates?",
		answer:
			"Nairon engineers have survived 8 weeks of real-world AI projects, hackathons, and intense evaluation. They think in systems, communicate like CTOs, and deliver under pressure — not just pass interviews.",
	},
	{
		question: "What does the matching process look like?",
		answer:
			"You submit your role requirements and we match you with engineers from our trained, vetted pool. You interview only pre-qualified candidates who fit your technical and cultural needs.",
	},
	{
		question: "What does it cost to hire through Nairon?",
		answer:
			"We charge a placement fee when you hire a Nairon engineer. Contact us for pricing details based on your hiring volume and requirements.",
	},
	{
		question: "Do you offer a hiring guarantee?",
		answer:
			"Yes. Every engineer we place has been vetted through our 8-week program. If they don't perform, we'll work with you to find a replacement.",
	},
	{
		question: "How quickly can I hire an engineer?",
		answer:
			"Our average time to hire is under 14 days from role submission to signed offer. You skip the sourcing, screening, and vetting — we've already done it.",
	},
	{
		question: "Can I specify technical requirements for my role?",
		answer:
			"Absolutely. You tell us exactly what you need — tech stack, seniority, domain expertise — and we match from our pool of trained engineers.",
	},
] as const;

export const FAQ_CONTENT = {
	engineer: {
		heading: "Everything you need to know",
		headingDim: "before applying to Nairon",
	},
	hiringManager: {
		heading: "How hiring through Nairon works",
		headingDim: "— from role submission to signed offer",
	},
} as const;

// ─── Final CTA section ─────────────────────────────────────────
export const FINAL_CTA = {
	engineer: {
		badge: "Applications closing soon",
		headlineParts: [
			{ text: "Are you ", italic: false },
			{ text: "ready?", italic: true },
		],
		subtext: "This could be the start of something big.",
		primaryCta: { label: "Apply Now", href: "/residence" },
		secondaryCta: { label: "Explore Residence Program", href: "/residence" },
	},
	hiringManager: {
		badge: "Limited spots available",
		headlineParts: [
			{ text: "Are you ", italic: false },
			{ text: "ready?", italic: true },
		],
		subtext: "This could be the start of something big.",
		primaryCta: { label: "Submit a Role", href: "/approach" },
		secondaryCta: { label: "Get in Touch", href: "/contact" },
	},
} as const;
