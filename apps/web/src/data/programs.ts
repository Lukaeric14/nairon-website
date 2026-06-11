import { PROGRAM_PHASES } from "./landing";

// ─── Types ──────────────────────────────────────────────────────

export type ProgramType = "residence" | "apprenticeship";

export interface ProgramHeroData {
	tag: string;
	heading: string;
	stats: { label: string; value: string }[];
	primaryCta: { label: string; href: string };
	secondaryCta: { label: string; href: string };
	subtext: string;
}

export interface BentoCardData {
	size: "large" | "standard";
	icon: string;
	title: string;
	description: string;
	visualType:
		| "dubai"
		| "chart"
		| "logos"
		| "avatars"
		| "community"
		| "code"
		| "portfolio"
		| "globe"
		| "resume"
		| "tools"
		| "remote";
	footnote?: string;
}

export interface TestimonialData {
	quote: string;
	name: string;
	role: string;
	company?: string;
	image: string;
	caseStudy?: string;
}

export interface WeekData {
	week: string;
	title: string;
	description: string;
	guest?: string;
	guestRole?: string;
}

export interface PhaseData {
	phase: string;
	title: string;
	gradient: string;
	weeks: WeekData[];
}

export interface StepData {
	number: number;
	title: string;
	description: string;
}

export interface StatData {
	value: string;
	label: string;
	suffix?: string;
}

export interface FAQItem {
	question: string;
	answer: string;
}

export interface ProgramData {
	type: ProgramType;
	hero: ProgramHeroData;
	bentoCards: BentoCardData[];
	testimonials: {
		engineer: TestimonialData;
		hiringManager: TestimonialData;
	};
	curriculum: {
		heading: string;
		dimHeading?: string;
		subheading: string;
		phases: PhaseData[];
	};
	requirements: {
		heading: string;
		dimHeading?: string;
		items: string[];
		subtext: string;
	};
	applicationSteps: {
		heading: string;
		dimHeading?: string;
		steps: StepData[];
		bottomNote: string;
	};
	outcomes: {
		heading: string;
		dimHeading?: string;
		stats: StatData[];
		description: string[];
	};
	philosophy: {
		quote: string;
		author: string;
		role: string;
		signature: string;
		paragraphs: { bold: string; rest: string }[];
	};
	pricing: {
		heading: string;
		dimHeading?: string;
		price: string;
		priceSubtext?: string;
		included: string[];
		commitment?: string[];
		framing: string;
	};
	faq: FAQItem[];
	cta: {
		heading: string;
		subtext: string;
		buttonLabel: string;
		buttonHref: string;
	};
}

// ─── Residence Data ─────────────────────────────────────────────

export const RESIDENCE_DATA: ProgramData = {
	type: "residence",
	hero: {
		tag: "The Residence",
		heading: "The most selective AI engineering program in the world.",
		stats: [
			{ label: "Duration", value: "8 Weeks Intensive" },
			{ label: "Location", value: "Miami, FL" },
			{ label: "Acceptance", value: "< 0.2%" },
			{ label: "Cohort Size", value: "10 Engineers" },
		],
		primaryCta: { label: "Apply Now", href: "https://apply.naironai.com" },
		secondaryCta: { label: "Join Weekly Office Hours", href: "/contact" },
		subtext: "",
	},
	bentoCards: [
		{
			size: "large",
			icon: "MapPin",
			title: "Full Relocation to Miami",
			description:
				"Flights, private housing, meals, laundry. Everything covered for 6 weeks on-site. You focus on building. We handle the rest.",
			visualType: "dubai",
		},
		{
			size: "standard",
			icon: "Cpu",
			title: "Unlimited AI Tooling",
			description:
				"OpenAI, Anthropic, Vercel, and every premium tool. Unlimited API credits and access throughout the program.",
			visualType: "tools",
		},
		{
			size: "standard",
			icon: "Users",
			title: "Guest Mentors",
			description:
				"Weekly sessions with staff engineers and ML leads from top AI companies. Real feedback from people shipping at scale.",
			visualType: "avatars",
		},
		{
			size: "standard",
			icon: "Handshake",
			title: "Hiring Partner Network",
			description:
				"10+ vetted companies actively looking to hire. They watch you build, review your work, and extend offers directly.",
			visualType: "logos",
		},
		{
			size: "large",
			icon: "TrendingUp",
			title: "Guaranteed $100k+",
			description:
				"Every graduate receives competitive offers from our hiring partners. Minimum $100k. Most offers come during the final two weeks.",
			visualType: "chart",
		},
		{
			size: "standard",
			icon: "MessageSquare",
			title: "Elite Community",
			description:
				"Lifetime access to a private network of Nairon alumni, mentors, and hiring partners. Collaborate long after the program ends.",
			visualType: "community",
		},
	],
	testimonials: {
		engineer: {
			quote:
				"The Nairon Residence completely changed how I approach engineering. The pressure was real: 12-hour days, shipping production code every week. But that's exactly what made it transformative. I went from being a decent engineer to someone companies fight over.",
			name: "Abdulrahman Abdi",
			role: "Founding AI Engineer",
			company: "Nairon",
			image:
				"/assets/framer/VkXk2rDNGzBySnbTZ9H4v4dMdE.jpeg",
			caseStudy:
				"Previously a mid-level developer. After the Residence, received 3 offers above $120k within the final week of the program.",
		},
		hiringManager: {
			quote:
				"We've tried every hiring channel: recruiters, job boards, referrals. Nothing compares to the quality of engineers coming out of Nairon. They ship faster, communicate better, and understand production systems at a level we rarely see in candidates with 5+ years of experience.",
			name: "Hiring Partner",
			role: "Head of Engineering",
			company: "Series B AI Startup",
			image:
				"/assets/framer/47jhKH0AA1f2ZNcovBPcmjTlLM.png",
			caseStudy:
				"Hired 2 Nairon graduates in the first cohort. Both ramped to full productivity within 2 weeks, compared to the usual 2-month onboarding.",
		},
	},
	curriculum: {
		heading: "8 Weeks. 3 Phases.",
		dimHeading: "Zero Shortcuts.",
		subheading:
			"Every week is engineered for intensity. The first 2 weeks are remote evaluation. The top performers fly to Miami for 6 weeks of on-site building.",
		phases: PROGRAM_PHASES.map((p) => ({
			phase: p.phase,
			title: p.title,
			gradient: p.gradient,
			weeks: p.weeks.map((w) => ({
				week: w.week,
				title: w.title,
				description: w.description,
				guest: w.guest,
				guestRole: w.guestRole,
			})),
		})),
	},
	requirements: {
		heading: "Built for the",
		dimHeading: "Top 1%",
		items: [
			"3+ years professional software engineering experience",
			"95th percentile or higher on the CCAT cognitive assessment",
			"Strong builder: shipped production code under real deadlines",
			"High agency: thrives under ambiguity and tight timelines",
			"Full commitment: 12-hour days, 6 days a week for 8 weeks",
			"Willing to relocate to Miami for weeks 3–8",
		],
		subtext: "This is not for everyone. That's the point.",
	},
	applicationSteps: {
		heading: "How to",
		dimHeading: "Get In",
		steps: [
			{
				number: 1,
				title: "Submit Application",
				description:
					"Upload your CV, share your GitHub, and tell us why you want to join. We review every application by hand.",
			},
			{
				number: 2,
				title: "CCAT Assessment",
				description:
					"Complete the Criteria Cognitive Aptitude Test. We require a 95th percentile score or higher. This isn't negotiable.",
			},
			{
				number: 3,
				title: "48-Hour Hackathon",
				description:
					"Build a production-quality application from scratch in 48 hours. We evaluate architecture, code quality, and speed.",
			},
			{
				number: 4,
				title: "Join the Cohort",
				description:
					"If you pass all stages, you're in. We arrange flights, housing, and everything else. You just show up ready to build.",
			},
		],
		bottomNote: "< 0.2% of applicants are accepted.",
	},
	outcomes: {
		heading: "What Happens",
		dimHeading: "Next",
		stats: [
			{ value: "$100k+", label: "Minimum offer guaranteed" },
			{ value: "10+", label: "Hiring partners reviewing your work" },
			{ value: "8", label: "Portfolio projects shipped" },
			{ value: "100%", label: "Placement rate" },
		],
		description: [
			"During the final two weeks, hiring partners review your shipped projects, observe your working style, and submit competitive offers directly to you. You choose.",
			"Every graduate leaves with a production portfolio, a professional network, and lifetime access to the Nairon community.",
		],
	},
	philosophy: {
		quote:
			"Talent shouldn't be decided by resumes or interviews. Give an engineer a real problem, a deadline, and you'll know who they are.",
		author: "Luka Eric",
		role: "Founder & CEO",
		signature:
			"/assets/framer/II2AoNr3T28LTiP1KS4xWQn80.png",
		paragraphs: [
			{
				bold: "Traditional hiring is broken for engineers.",
				rest: "Mass-applying into the void, endless recruiter screens, ghosted after six interviews, then being reduced to a ticket machine inside companies that don't ship fast.",
			},
			{
				bold: "We built the Residence as a place where engineers earn their value in one dimension only:",
				rest: "can you ship reliable, production AI under pressure? No resume theater, no recruiter games, no endless take-homes.",
			},
			{
				bold: "If you're great, you don't need to beg for opportunity.",
				rest: "You need one intense arena that proves it.",
			},
		],
	},
	pricing: {
		heading: "No Cost.",
		dimHeading: "Full Commitment.",
		price: "$0",
		included: [
			"Round-trip flights to Miami",
			"Private housing for the full program",
			"Daily meals and laundry service",
			"All AI tools, API credits, and compute",
			"Mentorship and industry access",
		],
		commitment: [
			"100% of your focus for 8 weeks",
			"12-hour days, 6 days a week",
			"Ship production-quality work every week",
		],
		framing:
			"We invest in talent. If you're accepted, everything is on us.",
	},
	faq: [
		{
			question: "Who is the Residence for?",
			answer:
				"Experienced engineers with 3+ years who want to break into AI engineering at the highest level. You should be a strong builder who can handle intensity: 12-hour days, 6 days a week, for 8 weeks.",
		},
		{
			question: "Do I need AI or ML experience?",
			answer:
				"No. You need strong engineering fundamentals: the ability to architect, debug, and ship production code fast. We'll teach the AI. You bring the ability to build.",
		},
		{
			question: "What is the selection process?",
			answer:
				"After applying, you'll complete the CCAT cognitive assessment (95th percentile required), then a 48-hour hackathon where you build a production app from scratch. We accept fewer than 0.2% of applicants.",
		},
		{
			question: "Is there really no cost?",
			answer:
				"Correct. Flights, housing, meals, tools. Everything is covered. We make money when our hiring partners hire you. Your only cost is your full commitment for 8 weeks.",
		},
		{
			question: "Where exactly in Miami?",
			answer:
				"We provide private housing in a central Miami location with modern amenities. The exact location is shared upon acceptance. All logistics are handled for you.",
		},
		{
			question: "What happens after the program?",
			answer:
				"In the final two weeks, hiring partners review your work and extend offers. Every graduate receives at least one offer of $100k+. You also get lifetime access to the Nairon alumni network.",
		},
	],
	cta: {
		heading: "Ready to Prove It?",
		subtext:
			"Applications for Cohort 1 are open. 10 spots. March–April 2026.",
		buttonLabel: "Apply Now",
		buttonHref: "https://apply.naironai.com",
	},
};

// ─── Apprenticeship Data ────────────────────────────────────────

export const APPRENTICESHIP_DATA: ProgramData = {
	type: "apprenticeship",
	hero: {
		tag: "The Apprenticeship",
		heading: "Become AI-native. Ship like the top 2%.",
		stats: [
			{ label: "Duration", value: "6 Weeks Part-Time" },
			{ label: "Format", value: "100% Remote" },
			{ label: "Investment", value: "$1,500" },
			{ label: "Style", value: "Project-Based" },
		],
		primaryCta: { label: "Apply Now", href: "https://apply.naironai.com" },
		secondaryCta: { label: "Join Weekly Office Hours", href: "/contact" },
		subtext: "Rolling enrollment. Start anytime",
	},
	bentoCards: [
		{
			size: "large",
			icon: "Code2",
			title: "Build Real AI Applications",
			description:
				"Ship 3-4 production-quality projects across RAG systems, AI agents, and full-stack AI apps. No toy demos. Real tools that solve real problems.",
			visualType: "code",
		},
		{
			size: "standard",
			icon: "Briefcase",
			title: "Career-Ready Portfolio",
			description:
				"Graduate with a polished portfolio of shipped AI projects that prove you can build, not just prompt.",
			visualType: "portfolio",
		},
		{
			size: "standard",
			icon: "Cpu",
			title: "Premium AI Tools",
			description:
				"Full access to OpenAI, Anthropic, and modern AI development tools throughout the program.",
			visualType: "tools",
		},
		{
			size: "standard",
			icon: "Users",
			title: "Nairon Network",
			description:
				"Join a community of engineers, mentors, and hiring partners. Access continues after graduation.",
			visualType: "community",
			footnote:
				"Top performers may be invited to apply for the Residence.",
		},
		{
			size: "large",
			icon: "Rocket",
			title: "Launch Your AI Career",
			description:
				"Move from traditional engineering into AI with the skills, portfolio, and network to compete for top positions.",
			visualType: "resume",
		},
		{
			size: "standard",
			icon: "Globe",
			title: "100% Remote",
			description:
				"Learn from anywhere. 15-20 hours per week, designed to fit alongside your current role.",
			visualType: "remote",
		},
	],
	testimonials: {
		engineer: {
			quote:
				"I was stuck in traditional web development for years. The Apprenticeship gave me a structured path into AI engineering that actually worked. In 6 weeks, I shipped more AI projects than I had in the previous year of self-study.",
			name: "Apprenticeship Graduate",
			role: "Software Engineer",
			company: "Tech Startup",
			image:
				"/assets/framer/47jhKH0AA1f2ZNcovBPcmjTlLM.png",
			caseStudy:
				"Transitioned from frontend development to AI engineering role within 3 months of completing the Apprenticeship.",
		},
		hiringManager: {
			quote:
				"The Apprenticeship graduates come in with practical AI experience that's hard to find. They understand production systems, not just theory. We've started preferring Nairon Apprenticeship graduates over candidates with AI bootcamp certificates.",
			name: "Hiring Partner",
			role: "Engineering Manager",
			company: "Growth-Stage SaaS",
			image:
				"/assets/framer/47jhKH0AA1f2ZNcovBPcmjTlLM.png",
			caseStudy:
				"Hired an Apprenticeship graduate who built a production RAG system in their first month, work that typically takes a senior engineer 2-3 months.",
		},
	},
	curriculum: {
		heading: "6 Weeks of Building.",
		dimHeading: "No Lectures.",
		subheading:
			"Every week you build. Every project ships. 15-20 hours per week, designed to fit alongside your current role.",
		phases: [
			{
				phase: "",
				title: "",
				gradient: "",
				weeks: [
					{
						week: "Week 1",
						title: "AI-First Development Foundations",
						description:
							"Set up your AI development environment, master modern tooling (Cursor, Claude Code, v0), and ship your first AI-powered feature. Learn the workflows that 10x your development speed.",
					},
					{
						week: "Week 2",
						title: "Production Web Apps with AI",
						description:
							"Build a full-stack web application with embedded AI features, from smart search to AI-powered content generation. Deploy to production by Friday.",
					},
					{
						week: "Week 3",
						title: "RAG Systems & Agent Workflows",
						description:
							"Build a production RAG system from scratch: document ingestion, vector search, retrieval pipelines, and a conversational interface. Then extend it with autonomous agent workflows.",
					},
					{
						week: "Week 4",
						title: "Advanced AI Patterns",
						description:
							"Multi-agent coordination, evaluation frameworks, observability, and production monitoring. Build the systems that make AI reliable at scale.",
					},
					{
						week: "Week 5",
						title: "Client-Style Project Sprint",
						description:
							"Tackle a real-world brief from a Nairon partner company. Scope, build, and deliver a production MVP under realistic constraints, just like a senior engineer would.",
					},
					{
						week: "Week 6",
						title: "Portfolio & Career Sprint",
						description:
							"Polish all projects to portfolio-ready standard. Build your public presence, optimize your LinkedIn and GitHub, and prepare for AI engineering interviews.",
					},
				],
			},
		],
	},
	requirements: {
		heading: "Open to",
		dimHeading: "All Levels",
		items: [
			"Basic programming experience (any language)",
			"Ability to commit 15-20 hours per week for 6 weeks",
			"Laptop with a stable internet connection",
			"Genuine interest in AI engineering",
			"$1,500 program investment",
		],
		subtext:
			"No prior AI experience required. We meet you where you are.",
	},
	applicationSteps: {
		heading: "Simple",
		dimHeading: "Application",
		steps: [
			{
				number: 1,
				title: "Submit Application",
				description:
					"Tell us about your background, goals, and what you want to build with AI. No tests, no hackathons. Just a straightforward application.",
			},
			{
				number: 2,
				title: "Enrollment Confirmation",
				description:
					"Accepted applicants receive enrollment details within 48 hours. Secure your spot, get your onboarding materials, and start building.",
			},
		],
		bottomNote: "No tests. No hackathons. Just apply.",
	},
	outcomes: {
		heading: "Where You'll",
		dimHeading: "End Up",
		stats: [
			{ value: "3-4", label: "Production AI projects shipped" },
			{ value: "6", label: "Weeks to career transformation" },
			{
				value: "15-20",
				label: "Hours per week commitment",
				suffix: "hrs",
			},
			{ value: "Senior", label: "Level AI engineering skills" },
		],
		description: [
			"Graduate with a portfolio of shipped AI projects, practical production experience, and the skills to compete for AI engineering roles at any level.",
			"Exceptional performers can apply to the Residence program for the full immersive experience.",
		],
	},
	philosophy: {
		quote:
			"Talent shouldn't be decided by resumes or interviews. Give an engineer a real problem, a deadline, and you'll know who they are.",
		author: "Luka Eric",
		role: "Founder & CEO",
		signature:
			"/assets/framer/II2AoNr3T28LTiP1KS4xWQn80.png",
		paragraphs: [
			{
				bold: "We were forced into launching the Apprenticeship.",
				rest: "Thousands of engineers applied to the Residence. Most didn't meet the bar, not because they lacked talent, but because they hadn't had the right environment to develop it.",
			},
			{
				bold: "The Apprenticeship exists to close that gap.",
				rest: "A structured, project-based program that gives engineers the practical AI skills they can't get from courses, tutorials, or self-study alone.",
			},
			{
				bold: "This isn't a consolation prize.",
				rest: "It's a standalone product designed to make engineers AI-native in 6 weeks. Some graduates go on to the Residence. Most don't need to. They're already competitive.",
			},
		],
	},
	pricing: {
		heading: "$1,500.",
		dimHeading: "Worth Every Line of Code.",
		price: "$1,500",
		priceSubtext: "One-time investment",
		included: [
			"6 weeks of structured AI engineering training",
			"3-4 production projects for your portfolio",
			"Premium AI tool access throughout the program",
			"Community and mentor network access",
			"Career preparation and portfolio review",
			"Lifetime access to Nairon alumni network",
		],
		framing:
			"Less than the cost of a single college course. More impactful than a year of self-study.",
	},
	faq: [
		{
			question: "How is this different from a coding bootcamp?",
			answer:
				"Bootcamps teach you to code. We take engineers who already know how to code and train them to build production AI systems. Every week you ship real projects, not tutorials.",
		},
		{
			question: "Can I do this while working full-time?",
			answer:
				"Yes. The Apprenticeship is designed for 15-20 hours per week. Most participants maintain their current role while completing the program.",
		},
		{
			question: "How does this compare to the Residence?",
			answer:
				"The Residence is an elite 8-week intensive in Miami with guaranteed $100k+ placement. The Apprenticeship is a 6-week remote program focused on building AI skills and portfolio. Both produce engineers who can ship production AI.",
		},
		{
			question: "Do I need AI experience?",
			answer:
				"No. You need basic programming experience in any language. We teach you AI engineering from the ground up through building real projects.",
		},
		{
			question: "Can I apply to the Residence later?",
			answer:
				"Yes. Top Apprenticeship performers are often invited to apply for the Residence. Several graduates have successfully transitioned to the full program.",
		},
		{
			question: "What if I'm not satisfied?",
			answer:
				"If you complete all assignments in the first two weeks and don't feel the program is right for you, we offer a full refund. We're confident in what we deliver.",
		},
	],
	cta: {
		heading: "Start Building.",
		subtext:
			"Rolling enrollment. No tests. No waiting. Apply today and start within a week.",
		buttonLabel: "Apply Now",
		buttonHref: "https://apply.naironai.com",
	},
};
