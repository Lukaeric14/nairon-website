export const FLUX_HERO = {
	badge: "Zero-Dep Agent Orchestration",
	headline:
		"Agents that actually finish what they start.",
	description:
		"Pre-sized tasks + re-anchoring + cross-model review. Minimal drift, maximum reliability.",
	placeholder: "you@company.com",
	cta: "Join Waitlist",
	note: "Private beta for product and engineering teams.",
} as const;

export const FLUX_HERO_TERMINAL = {
	title: "claude code - my-startup-app",
	lines: [
		"> /flux:improve",
		"",
		"Analyzing 23 sessions...",
		"",
		"Friction Patterns Detected:",
		"━━━━━━━━━━━━━━━━━━━━━━━━━━",
		"",
		"  shallow_prompts (8 occurrences)",
		'     "implement X" without context',
		"",
		"  blind_acceptance (12 occurrences)",
		"     accepted without verification",
		"",
		"  no_docs_lookup (5 occurrences)",
		"     relying on stale training data",
		"",
		"Your Score: 52/100",
		"Top performers push back 3x more.",
		"",
		"Recommended Improvements:",
		"━━━━━━━━━━━━━━━━━━━━━━━━",
		"",
		"  1. Context7 MCP Server",
		"     Fetches live docs, not hallucinations",
		"     Addresses: no_docs_lookup",
		"",
		"  2. Supermemory MCP Server",
		"     Context survives compaction",
		"     Addresses: memory_loss",
		"",
		"Would you like me to install these?",
		"",
		"> yes",
		"",
		"Installing Context7...",
		"Installing Supermemory...",
		"",
		"+ Done. Re-run /flux:improve to verify.",
	],
} as const;

export const FLUX_HERO_TERMINAL_BEFORE = {
	title: "claude code - my-startup-app",
	lines: [
		"> implement the stripe webhook",
		"",
		"I'll create a webhook handler using",
		"stripe.webhooks.verify()...",
		"",
		"> no, its constructEvent not verify",
		"> do you have the stripe docs?",
		"",
		"You're right, let me try again...",
		"",
		"⚠ Auto-compacting conversation...",
		"",
		"Ready to help! What are we working on?",
		"",
	],
} as const;

export const FLUX_MODELS = {
	badge: "Works everywhere you code",
	title: "One plugin. Every AI coding tool.",
	description:
		"Flux runs inside Claude Code with first-class support, and OpenCode experimentally. Same workflow intelligence across every agent you use.",
	cta: "View supported platforms",
	placeholder: "Select your agent...",
	rows: [
		{ name: "Claude Sonnet 4.6", role: "Agent", kind: "recommended" },
		{ name: "OpenCode", role: "Agent", kind: "fast" },
		{ name: "GPT-5", role: "Agent", kind: "reasoning" },
		{ name: "Gemini 2.5 Flash", role: "Agent", kind: "multimodal" },
		{ name: "DeepSeek V3.2", role: "Agent", kind: "open" },
		{ name: "Kimi K2.5", role: "Agent", kind: "fast" },
	] as const,
} as const;

export const FLUX_FEATURE_SPLIT = {
	left: {
		title: "Detect friction. Fix it.",
		description:
			"Flux scans your sessions for patterns that slow you down: shallow prompts, blind acceptance, context loss. Then it recommends exactly what to install.",
		panelTitle: "Friction Signals",
		suggestions: ["Interview", "Plan", "Build", "Review"],
		duplicateOf: "Your score: 76/100 (Top 22%)",
		relatedTo: "Friction: blind_acceptance (12 sessions)",
		popover: {
			headline: "Recommended fixes",
			description:
				"High-impact tools mapped to your friction patterns. The agent installs them for you.",
			alternatives: ["context7-mcp", "beads-tracking"],
			commands: [
				"/flux:improve",
				"/flux:score --export",
			],
		},
		cta: "View recommendations",
	},
	right: {
		title: "See where tokens go",
		description:
			"Track context usage, detect waste, and understand which sessions burn through budget vs. deliver results.",
		dashboard: {
			score: { value: 76, max: 100, percentile: "Top 22%" },
			tokenEfficiency: {
				multiplier: "1.12x",
				note: "12% more efficient than avg",
			},
			categories: [
				{ name: "Interview Depth", score: 82, percentile: "Top 15%" },
				{ name: "Pushback Ratio", score: 71, percentile: "Top 35%" },
				{ name: "Prompt Quality", score: 84, percentile: "Top 10%" },
				{ name: "Iteration Efficiency", score: 63, percentile: "Top 48%" },
				{ name: "Tool Breadth", score: 72, percentile: "Top 30%" },
			],
			footer: { tokens: "1.8M", waste: "12%", cost: "~$47" },
		},
	},
} as const;

export const FLUX_SOCIAL_PROOF = {
	lead:
		"Powering AI readiness programs for modern engineering teams. From startup squads to global product organizations.",
	cta: "See benchmark outcomes",
	companies: [
		"Anthropic",
		"OpenAI",
		"Cursor",
		"Vercel",
		"Perplexity",
		"Replit",
		"Ramp",
		"Scale",
	],
} as const;

export const FLUX_CAPABILITIES = {
	title: "Process beats vibes",
	description:
		"You're using AI to code, but are you good at it? Flux measures your actual collaboration patterns and shows you where the gaps are.",
	cards: [
		{
			title: "Structured workflow",
			copy: "Interview → Plan → Build → Review. A compressed SDLC designed for the age of agents. Human checkpoints that maintain understanding.",
			tag: "Workflow",
		},
		{
			title: "Friction detection",
			copy: "Shallow prompts, blind acceptance, undo loops, context loss. Flux spots the patterns, then maps them to fixes.",
			tag: "Analysis",
		},
		{
			title: "Self-improving recommendations",
			copy: "Detects your infrastructure, maps friction patterns to fixes, and autonomously builds reusable skills from what it observes.",
			tag: "Improvements",
		},
	],
} as const;

export const FLUX_WHAT_WE_TRACK = {
	badge: "5 dimensions",
	title: "What separates top performers",
	description:
		"Top AI collaborators push back 3x more often. They disagree, verify, and iterate. Flux measures the patterns that matter.",
	cards: [
		{
			title: "Collaboration quality",
			items: [
				"Interview depth — how well you clarify requirements",
				"Pushback ratio — how often you disagree vs. accept",
				"Prompt quality — context richness and specificity",
			],
		},
		{
			title: "Execution efficiency",
			items: [
				"Iteration efficiency — first-pass success rate",
				"Tool breadth — MCPs, skills, and patterns in use",
				"Context preservation — sessions without memory loss",
			],
		},
	],
} as const;

export const FLUX_SHAREABLE_REPORTS = {
	badge: "Shareable profiles",
	title: "Export your setup. Share what works.",
	description:
		"Generate public profiles showing your score, tools, and workflow. Perfect for hackathons, hiring, or helping teammates level up.",
	url: "flux.dev/u/88yadbbqhl",
	report: {
		title: "my-saas-app",
		agent: "Claude Code",
		score: "84",
		maxScore: "100",
		grade: "Grade A",
		stats: [
			{ label: "Sessions", value: "47" },
			{ label: "Prompts", value: "892" },
			{ label: "Commits", value: "34" },
			{ label: "Tokens", value: "2.1M" },
		],
		metrics: [
			{ label: "Interview Depth", value: 82, tone: "bg-[#2e74d6]" },
			{ label: "Pushback Ratio", value: 78, tone: "bg-[#1f9b55]" },
			{ label: "Prompt Quality", value: 86, tone: "bg-[#6e40bf]" },
			{ label: "Iteration Efficiency", value: 84, tone: "bg-[#bd6a0f]" },
		],
		mcp: ["context7", "supermemory", "nia", "browser"],
		skills: ["stagehand-e2e", "remotion", "beads"],
	},
	features: [
		{
			title: "5-dimension scoring",
			description:
				"Interview depth, pushback ratio, prompt quality, iteration efficiency, tool breadth. Know exactly where you stand.",
		},
		{
			title: "Share your stack",
			description:
				"Showcase your MCP servers, skills, and patterns. Let others clone what works for you.",
		},
		{
			title: "Friction-mapped fixes",
			description:
				"Recommendations tied to your specific patterns. Install with one command.",
		},
		{
			title: "Proof of capability",
			description:
				"Shareable links for hiring, hackathons, or team retrospectives. Data over vibes.",
		},
	],
	commandLabel: "Generate your profile",
	command: "/flux:profile --publish",
	cta: "View example profile",
} as const;

export const FLUX_TRUST_PLACEHOLDER = {
	badge: "Privacy first",
	title: "Your data stays yours",
	description:
		"Analysis runs locally. Network only used to fetch recommendations. No session data leaves your machine unless you export it.",
	rows: [
		{
			title: "Local-first analysis",
			copy: "All session scanning happens on your machine. Nothing sent externally.",
		},
		{
			title: "Explicit sharing",
			copy: "Profiles are opt-in. You choose what to publish and when.",
		},
		{
			title: "Open source",
			copy: "Every scoring rubric, every eval, every weight is inspectable on GitHub.",
		},
	],
} as const;

export const FLUX_CTA_PLACEHOLDER = {
	badge: "Get started",
	title: "Find your gaps. Fix them.",
	description:
		"Install the plugin, run /flux:improve, and see what you're missing.",
	primary: "Install Flux",
	secondary: "View on GitHub",
} as const;
