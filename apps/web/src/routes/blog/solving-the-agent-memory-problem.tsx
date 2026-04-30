import { createFileRoute } from "@tanstack/react-router";
import {
	AlertTriangle,
	ArrowUpRight,
	BrainCircuit,
	Building2,
	CheckCircle2,
	DatabaseZap,
	GitBranch,
	Layers,
	LockKeyhole,
	Network,
	ShieldCheck,
	Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Footer, Navbar } from "@/components/landing";
import { CandidateModal } from "@/components/landing/candidate-modal";
import { HireModal } from "@/components/landing/hire-modal";
import { HivePlatformPreview } from "@/components/landing/hive-platform-preview";
import { HiveWaitlistForm } from "@/components/landing/hive-waitlist-form";
import { ModalProvider } from "@/components/landing/modal-provider";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { DISCOVERY_CALL_URL } from "@/lib/links";
import { blogPostJsonLd, breadcrumbJsonLd, seoHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

const ARTICLE_PATH = "/blog/solving-the-agent-memory-problem";
const ARTICLE_TITLE = "Solving the Agent Memory problem";
const ARTICLE_DESCRIPTION =
	"A practical look at Supermemory, Mem0, Zep, Letta, LangMem, and company-brain memory layers for AI employees inside Hive.";
const PUBLISHED_DATE = "2026-04-30";

const articleJsonLd = JSON.stringify(
	blogPostJsonLd({
		title: ARTICLE_TITLE,
		description: ARTICLE_DESCRIPTION,
		path: ARTICLE_PATH,
		datePublished: PUBLISHED_DATE,
		authorName: "Nairon",
	}),
);

const breadcrumbsJsonLd = JSON.stringify(
	breadcrumbJsonLd([
		{ name: "Home", path: "/" },
		{ name: ARTICLE_TITLE, path: ARTICLE_PATH },
	]),
);

export const Route = createFileRoute("/blog/solving-the-agent-memory-problem")({
	component: AgentMemoryArticlePage,
	head: () => {
		const base = seoHead({
			title: `${ARTICLE_TITLE} | Nairon AI`,
			description: ARTICLE_DESCRIPTION,
			path: ARTICLE_PATH,
			type: "article",
		});

		return {
			...base,
			scripts: [
				{ type: "application/ld+json", children: articleJsonLd },
				{ type: "application/ld+json", children: breadcrumbsJsonLd },
			],
		};
	},
});

type ProviderId =
	| "supermemory"
	| "mem0"
	| "zep"
	| "letta"
	| "langmem"
	| "knowledge-plane";

type ProviderProfile = {
	id: ProviderId;
	name: string;
	short: string;
	bestFor: string;
	pros: string[];
	cons: string[];
	signal: string;
	source: string;
	sourceLabel: string;
};

const providers: ProviderProfile[] = [
	{
		id: "supermemory",
		name: "Supermemory",
		short: "Managed context stack",
		bestFor:
			"Teams that want a fast API for memory, retrieval, connectors, profiles, extraction, and MCP delivery.",
		pros: [
			"Good default when you need to ship quickly without building your own ingestion stack.",
			"Connectors and multimodal extraction matter when company knowledge lives in Slack, Drive, Gmail, files, and calls.",
			"Strong fit for coding-agent workflows because the MCP story is already part of the product.",
		],
		cons: [
			"Capture still needs policy. If you save every tiny implementation detail, retrieval gets noisy and token-heavy.",
			"Teams should validate governance, tenant isolation, redaction, and export needs before treating it as the system of record.",
			"Vendor-reported benchmarks are useful signals, not a substitute for testing on your own transcripts and docs.",
		],
		signal:
			"Best as the first managed memory layer to evaluate for Hive because it covers more of the context stack out of the box.",
		source: "https://docs.supermemory.ai/",
		sourceLabel: "Supermemory docs",
	},
	{
		id: "mem0",
		name: "Mem0",
		short: "Open-source friendly memory",
		bestFor:
			"Teams that want a widely adopted memory layer with managed and self-hosted paths.",
		pros: [
			"Strong community gravity and a simple mental model for persistent user, agent, and run-level memory.",
			"Self-hosting and configurable storage are attractive when data control matters.",
			"Good candidate for personalization-heavy agents that need recurring facts and preferences.",
		],
		cons: [
			"Platform and open-source capabilities differ, so graph, filtering, and managed features need plan-by-plan verification.",
			"Self-hosting moves reliability, pruning, observability, and retrieval tuning onto your team.",
			"Great memory APIs do not automatically create a company brain. You still need source ownership, permissioning, and curation.",
		],
		signal:
			"Best if portability and self-hosting are more important than a fully managed connector stack.",
		source: "https://docs.mem0.ai/openmemory/overview",
		sourceLabel: "Mem0 docs",
	},
	{
		id: "zep",
		name: "Zep / Graphiti",
		short: "Temporal graph memory",
		bestFor:
			"Agents that need to know when a fact became true, when it stopped being true, and how relationships changed.",
		pros: [
			"Temporal knowledge graphs are the cleanest model for evolving business truth.",
			"Strong fit for CRM, support, compliance, account ownership, budget changes, and decision history.",
			"Graphiti can ingest structured and unstructured data and query across semantic, keyword, graph, and time signals.",
		],
		cons: [
			"Graph infrastructure asks for more data modeling discipline than a drop-in memory API.",
			"Self-hosting Graphiti means owning graph database operations and migration complexity.",
			"It is not the fastest path if your main problem is connecting every company tool and filtering raw capture.",
		],
		signal:
			"Best when the hard question is not what the business knows, but what was true at a specific point in time.",
		source: "https://help.getzep.com/graphiti/getting-started/overview",
		sourceLabel: "Graphiti docs",
	},
	{
		id: "letta",
		name: "Letta",
		short: "Stateful agent runtime",
		bestFor:
			"Teams building memory-first agents where the agent actively manages core, archival, and conversation memory.",
		pros: [
			"Treats memory as part of the agent runtime, not as a bolt-on search call.",
			"Core memory blocks are always visible, archival memory is searched on demand, and conversation history persists.",
			"Useful when an agent should curate its own identity, preferences, and operating state over long horizons.",
		],
		cons: [
			"Adopting Letta is more architectural than swapping in a memory provider.",
			"Company-brain governance still has to be layered around the runtime.",
			"Agent-managed memory requires good guardrails so it does not memorialize low-value noise.",
		],
		signal:
			"Best for new agent systems where memory architecture is allowed to shape the runtime.",
		source: "https://docs.letta.com/guides/agents/memory/",
		sourceLabel: "Letta docs",
	},
	{
		id: "langmem",
		name: "LangMem / LangGraph Store",
		short: "Framework-native primitives",
		bestFor:
			"Teams already committed to LangGraph who want semantic, episodic, and procedural memory primitives.",
		pros: [
			"Fits naturally into LangGraph systems without adopting an external memory platform.",
			"Procedural memory is valuable when agents should improve prompts or behavior from experience.",
			"Namespaces give developers a practical way to scope memory by user, team, route, or application context.",
		],
		cons: [
			"You still own ingestion, connectors, governance, permissioning, and evals.",
			"More of a developer toolkit than a complete company knowledge layer.",
			"Best results require careful schemas and background memory management.",
		],
		signal:
			"Best when your agent stack is already LangGraph and you want control over every memory decision.",
		source: "https://langchain-ai.github.io/langmem/",
		sourceLabel: "LangMem docs",
	},
	{
		id: "knowledge-plane",
		name: "Knowledge Plane / company-brain tools",
		short: "Shared memory for teams",
		bestFor:
			"Teams whose real problem is organizational context, source traceability, and shared agent access.",
		pros: [
			"Closer to the YC company-brain request than a personal memory API.",
			"Graph plus vector search can preserve relationships like ownership, dependency, decision, and source.",
			"MCP and HTTP interfaces make it easier to give multiple tools the same company memory.",
		],
		cons: [
			"The category is early, so maturity, enterprise support, and operating limits need real diligence.",
			"Provider choice matters less than the policy layer around redaction, access, approvals, and source freshness.",
			"Company-brain systems require organizational process change, not just a database.",
		],
		signal:
			"Best directionally for Hive's long-term goal, even if we integrate multiple providers underneath.",
		source: "https://knowledgeplane.io/",
		sourceLabel: "Knowledge Plane",
	},
];

const landscape = [
	{
		icon: DatabaseZap,
		title: "Memory API",
		body: "A product takes text, files, chats, and user events, extracts durable facts, and returns relevant context at query time.",
	},
	{
		icon: Network,
		title: "Temporal graph",
		body: "Facts become entities and relationships with source, time, and invalidation. This is powerful when business truth changes.",
	},
	{
		icon: BrainCircuit,
		title: "Agent runtime",
		body: "The agent owns parts of memory through tools and persistent state, so memory shapes behavior instead of sitting beside it.",
	},
	{
		icon: Building2,
		title: "Company brain",
		body: "The platform maps how a company works: decisions, docs, transcripts, people, permissions, constraints, and operating context.",
	},
];

const hivePrinciples = [
	"Memory must be workspace-scoped by default, not a global bucket.",
	"Every memory should know where it came from, who can see it, and when it became stale.",
	"Raw transcripts are not memory. They are source material for proposed memories.",
	"Sensitive facts need redaction and permission checks before an AI employee can retrieve them.",
	"Agents should retrieve business context before they accept work, write specs, or push back on a request.",
];

type ToolState = {
	budget: "lean" | "growth" | "enterprise";
	knowledge: "scattered" | "organized" | "technical";
	need: "company" | "personalization" | "temporal" | "runtime" | "langgraph";
	hosting: "managed" | "flexible" | "self-host";
	sensitivity: "standard" | "sensitive" | "regulated";
	transcripts: "low" | "high";
};

const initialToolState: ToolState = {
	budget: "growth",
	knowledge: "scattered",
	need: "company",
	hosting: "managed",
	sensitivity: "sensitive",
	transcripts: "high",
};

const selectOptions = {
	budget: [
		{ value: "lean", label: "Lean" },
		{ value: "growth", label: "Growth" },
		{ value: "enterprise", label: "Enterprise" },
	],
	knowledge: [
		{ value: "scattered", label: "Scattered docs and chat" },
		{ value: "organized", label: "Organized knowledge base" },
		{ value: "technical", label: "Mostly repos and technical docs" },
	],
	need: [
		{ value: "company", label: "Company brain" },
		{ value: "personalization", label: "User personalization" },
		{ value: "temporal", label: "Decision history" },
		{ value: "runtime", label: "Stateful agents" },
		{ value: "langgraph", label: "LangGraph-native" },
	],
	hosting: [
		{ value: "managed", label: "Managed service" },
		{ value: "flexible", label: "Flexible" },
		{ value: "self-host", label: "Self-host" },
	],
	sensitivity: [
		{ value: "standard", label: "Standard business data" },
		{ value: "sensitive", label: "Sensitive internal data" },
		{ value: "regulated", label: "Regulated or strict audit" },
	],
	transcripts: [
		{ value: "low", label: "Low transcript volume" },
		{ value: "high", label: "High transcript volume" },
	],
} satisfies Record<keyof ToolState, Array<{ value: string; label: string }>>;

const providerCopy: Record<ProviderId, { decision: string; caution: string }> = {
	supermemory: {
		decision:
			"Start here if you want the fastest managed path for Hive-style context, connectors, search, and MCP delivery.",
		caution:
			"Define what not to remember. Save business decisions, constraints, and durable preferences, not every implementation detail.",
	},
	mem0: {
		decision:
			"Pick Mem0 when self-hosting, portability, and open-source adoption matter more than bundled enterprise connectors.",
		caution:
			"Check current platform versus OSS feature differences before committing to graph or governance assumptions.",
	},
	zep: {
		decision:
			"Pick Zep or Graphiti when temporal truth is central: who owned the account, which budget changed, what policy was valid then.",
		caution:
			"Budget for graph modeling and operations. It is powerful, but less of a quick capture layer.",
	},
	letta: {
		decision:
			"Pick Letta when you are designing the agent runtime around persistent state from day one.",
		caution:
			"Do not confuse agent-owned memory with company-wide knowledge governance. Hive still needs the workspace layer.",
	},
	langmem: {
		decision:
			"Pick LangMem when you already run LangGraph and want precise control over semantic, episodic, and procedural memory.",
		caution:
			"You will build more of the company-brain product yourself: connectors, audit, source freshness, and access policy.",
	},
	"knowledge-plane": {
		decision:
			"Evaluate company-brain tools when shared organizational memory is the main product requirement.",
		caution:
			"Treat this category as early. Run a real pilot on your transcripts, docs, decision logs, and access model.",
	},
};

function scoreProviders(state: ToolState) {
	const scores: Record<ProviderId, number> = {
		supermemory: 0,
		mem0: 0,
		zep: 0,
		letta: 0,
		langmem: 0,
		"knowledge-plane": 0,
	};

	if (state.need === "company") {
		scores["knowledge-plane"] += 5;
		scores.supermemory += 4;
		scores.zep += 2;
	}
	if (state.need === "personalization") {
		scores.mem0 += 4;
		scores.supermemory += 4;
		scores.letta += 2;
	}
	if (state.need === "temporal") {
		scores.zep += 6;
		scores["knowledge-plane"] += 2;
	}
	if (state.need === "runtime") {
		scores.letta += 5;
		scores.langmem += 2;
	}
	if (state.need === "langgraph") {
		scores.langmem += 6;
		scores.zep += 1;
	}

	if (state.knowledge === "scattered") {
		scores.supermemory += 3;
		scores["knowledge-plane"] += 3;
	}
	if (state.knowledge === "organized") {
		scores.mem0 += 2;
		scores.zep += 1;
		scores.supermemory += 1;
	}
	if (state.knowledge === "technical") {
		scores.langmem += 3;
		scores["knowledge-plane"] += 2;
	}

	if (state.hosting === "managed") {
		scores.supermemory += 3;
		scores.zep += 2;
		scores.mem0 += 1;
	}
	if (state.hosting === "self-host") {
		scores.mem0 += 4;
		scores.langmem += 3;
		scores.zep += 2;
		scores.letta += 2;
	}
	if (state.hosting === "flexible") {
		scores.mem0 += 2;
		scores.supermemory += 2;
		scores.zep += 2;
	}

	if (state.sensitivity === "sensitive") {
		scores["knowledge-plane"] += 2;
		scores.zep += 2;
		scores.mem0 += 1;
	}
	if (state.sensitivity === "regulated") {
		scores.zep += 4;
		scores.mem0 += 2;
		scores["knowledge-plane"] += 2;
	}

	if (state.transcripts === "high") {
		scores.supermemory += 2;
		scores.zep += 2;
		scores["knowledge-plane"] += 3;
	}

	if (state.budget === "lean") {
		scores.mem0 += 3;
		scores.langmem += 3;
	}
	if (state.budget === "growth") {
		scores.supermemory += 2;
		scores.mem0 += 1;
		scores.zep += 1;
	}
	if (state.budget === "enterprise") {
		scores.zep += 3;
		scores["knowledge-plane"] += 3;
		scores.supermemory += 2;
	}

	return [...providers]
		.map((provider) => ({ provider, score: scores[provider.id] }))
		.sort((a, b) => b.score - a.score);
}

function AgentMemoryArticlePage() {
	return (
		<ModalProvider>
			<div className="min-h-screen bg-[#FBFAF6] font-inter text-[#171612]">
				<Navbar />
				<article>
					<Hero />
					<ProblemSection />
					<LandscapeSection />
					<ProviderSection />
					<HiveSection />
					<DecisionTool />
					<ArticleCTA />
					<SourcesSection />
				</article>
				<Footer />
			</div>
			<HireModal />
			<CandidateModal />
		</ModalProvider>
	);
}

function Hero() {
	return (
		<header className="relative overflow-hidden border-b border-[#171612]/10 pt-28">
			<div className="absolute inset-0 opacity-[0.45] [background-image:linear-gradient(rgba(23,22,18,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(23,22,18,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
			<div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 pb-16 md:grid-cols-[1.1fr_0.9fr] md:px-8 md:pb-20">
				<div>
					<div className="mb-8 inline-flex items-center gap-2 border border-[#171612]/10 bg-white/70 px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-[#6D675C]">
						<BrainCircuit className="h-4 w-4 text-[#A77A15]" />
						Company memory
					</div>
					<h1 className="max-w-4xl text-[46px] font-normal leading-[0.95] tracking-[-0.03em] text-[#171612] md:text-[82px]">
						Solving the Agent Memory problem
					</h1>
					<p className="mt-8 max-w-2xl text-lg leading-8 text-[#5F5A50] md:text-xl">
						We often get asked.... which memory layer should we trust for AI
						employees: Supermemory, Mem0, Zep, Letta, LangMem, or something
						closer to a company brain?
					</p>
				</div>

				<div className="relative min-h-[420px] border border-[#171612]/10 bg-[#171612] p-4 text-white shadow-[18px_18px_0_rgba(201,169,110,0.28)]">
					<div className="absolute inset-4 border border-white/10" />
					<div className="relative flex h-full flex-col justify-between">
						<div>
							<p className="text-xs uppercase tracking-[0.18em] text-[#D8C497]">
								Hive memory model
							</p>
							<div className="mt-8 space-y-4">
								<MemoryRow label="Knowledge sources" value="source material" />
								<MemoryRow label="Decisions" value="durable context" />
								<MemoryRow label="Constraints" value="permissioned facts" />
								<MemoryRow label="Security policy" value="access boundaries" />
								<MemoryRow label="Evaluations" value="pushback signal" />
							</div>
						</div>
						<div className="mt-10 border-t border-white/10 pt-5">
							<p className="text-[13px] leading-6 text-white/68">
								The goal is not a chatbot over documents. The goal is that every
								allowed AI employee can understand the company well enough to do
								work, ask better questions, and push back when a request conflicts
								with business reality.
							</p>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

function MemoryRow({ label, value }: { label: string; value: string }) {
	return (
		<div className="grid grid-cols-[1fr_auto] gap-4 border-b border-white/10 pb-3">
			<span className="text-sm text-white/82">{label}</span>
			<span className="text-right font-mono text-xs uppercase tracking-[0.12em] text-[#BEFF00]">
				{value}
			</span>
		</div>
	);
}

function ProblemSection() {
	return (
		<section className="border-b border-[#171612]/10 bg-white">
			<div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-16 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:py-20">
				<SectionKicker icon={AlertTriangle} label="The actual bottleneck" />
				<div className="space-y-7 text-[17px] leading-8 text-[#474239]">
					<p>
						The memory problem is not that agents forget your name. That is the
						small version. The business version is harder: agents do not know
						why the company is making a decision, which customers matter, what
						the budget is, which promises sales has made, what the runway is,
						or which constraints should block a feature from being built.
					</p>
					<p>
						That missing context makes agents too agreeable. A developer asks
						for a feature, an agent starts coding, and nobody in the loop has
						the operating history required to say: this violates our ICP, this
						is outside the current budget, this conflicts with an active client
						promise, or this should wait because a higher-leverage workflow is
						already planned.
					</p>
					<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
						{[
							"Who the business serves",
							"What decisions were already made",
							"Which constraints are real",
							"What every customer conversation revealed",
							"Which approvals are required",
							"What should be redacted from each employee",
						].map((item) => (
							<div
								key={item}
								className="flex items-start gap-3 border border-[#171612]/10 bg-[#FBFAF6] p-4"
							>
								<CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#A77A15]" />
								<span className="text-sm leading-6 text-[#474239]">{item}</span>
							</div>
						))}
					</div>
					<p>
						This is why the{" "}
						<a
							href="https://www.ycombinator.com/rfs?year=2026#company-brain"
							target="_blank"
							rel="noopener noreferrer"
							className="text-[#171612] underline decoration-[#A77A15]/45 underline-offset-4 transition-colors hover:decoration-[#A77A15]"
						>
							YC "Company Brain" request
						</a>{" "}
						matters. The frontier is not another search box. It is a living map
						of how a company works, kept current from docs, email, Slack,
						tickets, code, transcripts, and decisions, then made executable by
						AI systems with the right permissions.
					</p>
				</div>
			</div>
		</section>
	);
}

function LandscapeSection() {
	return (
		<section className="border-b border-[#171612]/10">
			<div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
				<SectionHeading
					kicker="The market"
					title="There is no winner yet because the category is really four categories."
				/>
				<div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-4">
					{landscape.map((item) => (
						<div
							key={item.title}
							className="border border-[#171612]/10 bg-white p-5"
						>
							<item.icon className="h-5 w-5 text-[#A77A15]" />
							<h3 className="mt-5 text-lg font-medium text-[#171612]">
								{item.title}
							</h3>
							<p className="mt-3 text-sm leading-6 text-[#5F5A50]">
								{item.body}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

function ProviderSection() {
	return (
		<section className="border-b border-[#171612]/10 bg-white">
			<div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
				<SectionHeading
					kicker="Provider notes"
					title="The practical tradeoffs"
					body="The right layer depends on what you need memory to do. Do not pick from a benchmark table alone. Pick from your ingestion reality, governance requirements, and retrieval failure modes."
				/>
				<div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
					{providers.map((provider) => (
						<ProviderCard key={provider.id} provider={provider} />
					))}
				</div>
			</div>
		</section>
	);
}

function ProviderCard({ provider }: { provider: ProviderProfile }) {
	return (
		<section className="border border-[#171612]/10 bg-[#FBFAF6] p-5">
			<div className="flex items-start justify-between gap-5">
				<div>
					<p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8B806F]">
						{provider.short}
					</p>
					<h3 className="mt-2 text-2xl font-normal tracking-[-0.02em] text-[#171612]">
						{provider.name}
					</h3>
				</div>
				<a
					href={provider.source}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-[#171612]/12 bg-white text-[#171612] transition-colors hover:bg-[#171612] hover:text-white"
					aria-label={`Open ${provider.sourceLabel}`}
				>
					<ArrowUpRight className="h-4 w-4" />
				</a>
			</div>
			<p className="mt-5 text-sm leading-6 text-[#474239]">
				<strong className="font-medium text-[#171612]">Best for: </strong>
				{provider.bestFor}
			</p>
			<div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
				<TradeoffList title="Pros" items={provider.pros} positive />
				<TradeoffList title="Cons" items={provider.cons} />
			</div>
			<div className="mt-6 border-t border-[#171612]/10 pt-4">
				<p className="text-sm leading-6 text-[#5F5A50]">
					<strong className="font-medium text-[#171612]">Nairon read: </strong>
					{provider.signal}
				</p>
			</div>
		</section>
	);
}

function TradeoffList({
	title,
	items,
	positive = false,
}: {
	title: string;
	items: string[];
	positive?: boolean;
}) {
	return (
		<div>
			<h4 className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-[#8B806F]">
				{title}
			</h4>
			<ul className="space-y-3">
				{items.map((item) => (
					<li key={item} className="flex gap-2 text-sm leading-6 text-[#5F5A50]">
						<span
							className={cn(
								"mt-2 h-1.5 w-1.5 shrink-0",
								positive ? "bg-[#A77A15]" : "bg-[#171612]/45",
							)}
						/>
						<span>{item}</span>
					</li>
				))}
			</ul>
		</div>
	);
}

function HiveSection() {
	return (
		<section className="border-b border-[#171612]/10">
			<div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-16 md:grid-cols-[1fr_1fr] md:px-8 md:py-20">
				<div>
					<SectionHeading
						kicker="How Hive uses this"
						title="Hive should be memory-provider aware, not memory-provider dependent."
						body="Internally, Hive already treats memory as part of the workspace runtime: company knowledge, decisions, transcripts, tasks, approvals, credentials, and agent actions all need to converge into one governed context layer."
					/>
					<div className="mt-8 flex flex-wrap gap-3">
						<SignalPill icon={BrainCircuit} label="Memory architecture" />
						<SignalPill icon={ShieldCheck} label="Security model" />
						<SignalPill icon={Layers} label="Reliability loops" />
						<SignalPill icon={GitBranch} label="Business context" />
					</div>
					<HivePlatformPreview className="mt-8" context="memory" />
				</div>
				<div className="border border-[#171612]/10 bg-white p-6">
					<h3 className="text-2xl font-normal tracking-[-0.02em] text-[#171612]">
						The principle
					</h3>
					<p className="mt-4 text-sm leading-7 text-[#5F5A50]">
						Whatever provider sits underneath, Hive needs to expose the same
						product promise: every human teammate can talk to AI employees that
						understand the company, while sensitive data stays permissioned and
						auditable.
					</p>
					<p className="mt-4 text-sm leading-7 text-[#5F5A50]">
						That is the platform we are using internally now: a Slack-like
						workspace where AI employees can use the right company knowledge,
						permissions, tools, and decision history to reason with the
						business instead of acting from a narrow prompt. It is still beta,
						but the internal wins are why we are writing about the problem
						publicly.
					</p>
					<ul className="mt-6 space-y-4">
						{hivePrinciples.map((principle) => (
							<li key={principle} className="flex gap-3 text-sm leading-6">
								<LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-[#A77A15]" />
								<span className="text-[#474239]">{principle}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}

function ArticleCTA() {
	return (
		<section className="border-b border-[#171612]/10 bg-white">
			<div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-16 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:py-20">
				<div>
					<p className="text-xs font-medium uppercase tracking-[0.18em] text-[#A77A15]">
						Where this goes
					</p>
					<h2 className="mt-4 text-4xl font-normal leading-tight tracking-[-0.03em] text-[#171612] md:text-6xl">
						Memory is one piece of Hive.
					</h2>
					<p className="mt-5 max-w-xl text-base leading-7 text-[#5F5A50]">
						Hive is the proprietary platform we are building so companies can
						talk to AI employees, preserve business context, enforce security
						policy, and give agents governed access to the company memory they
						need.
					</p>
					<p className="mt-4 max-w-xl text-base leading-7 text-[#5F5A50]">
						If you want Nairon to build your first AI employee now, book the
						one-month pilot. If you want early access to Hive when we open the
						beta wider, join the waitlist.
					</p>
					<a
						href={DISCOVERY_CALL_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-7 inline-flex h-12 items-center justify-center gap-2 bg-[#171612] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#2A2822]"
					>
						Book the one-month pilot
						<ArrowUpRight className="h-4 w-4" />
					</a>
				</div>
				<div className="border border-[#171612]/10 bg-[#FBFAF6] p-5 md:p-6">
					<div className="mb-5">
						<p className="text-xs font-medium uppercase tracking-[0.18em] text-[#A77A15]">
							Hive waitlist
						</p>
						<h3 className="mt-2 text-2xl font-normal tracking-[-0.02em] text-[#171612]">
							Get notified when Hive opens.
						</h3>
					</div>
					<HiveWaitlistForm source="Agent memory article" />
				</div>
			</div>
		</section>
	);
}

function DecisionTool() {
	const [state, setState] = useState<ToolState>(initialToolState);
	const ranked = useMemo(() => scoreProviders(state), [state]);
	const winner = ranked[0] ?? { provider: providers[0], score: 0 };
	const runnerUps = ranked.slice(1, 3);

	function update<K extends keyof ToolState>(key: K, value: ToolState[K]) {
		setState((current) => ({ ...current, [key]: value }));
	}

	return (
		<section className="border-b border-[#171612]/10 bg-[#171612] text-white">
			<div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
				<div className="grid grid-cols-1 gap-10 md:grid-cols-[0.9fr_1.1fr]">
					<div>
						<div className="inline-flex items-center gap-2 border border-white/15 px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-[#D8C497]">
							<Sparkles className="h-4 w-4" />
							Memory picker
						</div>
						<h2 className="mt-6 text-4xl font-normal leading-tight tracking-[-0.03em] md:text-6xl">
							Which memory layer should your company test first?
						</h2>
						<p className="mt-6 max-w-xl text-base leading-7 text-white/68">
							This is a directional picker, not procurement advice. It encodes
							the tradeoffs above so a founder or operator can get to the first
							serious pilot faster.
						</p>
					</div>

					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<SelectControl
							label="Budget"
							value={state.budget}
							options={selectOptions.budget}
							onChange={(value) => update("budget", value as ToolState["budget"])}
						/>
						<SelectControl
							label="Existing knowledge"
							value={state.knowledge}
							options={selectOptions.knowledge}
							onChange={(value) =>
								update("knowledge", value as ToolState["knowledge"])
							}
						/>
						<SelectControl
							label="Primary need"
							value={state.need}
							options={selectOptions.need}
							onChange={(value) => update("need", value as ToolState["need"])}
						/>
						<SelectControl
							label="Hosting preference"
							value={state.hosting}
							options={selectOptions.hosting}
							onChange={(value) =>
								update("hosting", value as ToolState["hosting"])
							}
						/>
						<SelectControl
							label="Data sensitivity"
							value={state.sensitivity}
							options={selectOptions.sensitivity}
							onChange={(value) =>
								update("sensitivity", value as ToolState["sensitivity"])
							}
						/>
						<SelectControl
							label="Transcript volume"
							value={state.transcripts}
							options={selectOptions.transcripts}
							onChange={(value) =>
								update("transcripts", value as ToolState["transcripts"])
							}
						/>
					</div>
				</div>

				<div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-[1.25fr_0.75fr]">
					<div className="border border-white/15 bg-white p-6 text-[#171612]">
						<p className="font-mono text-xs uppercase tracking-[0.18em] text-[#8B806F]">
							Recommended first pilot
						</p>
						<h3 className="mt-3 text-4xl font-normal tracking-[-0.03em]">
							{winner.provider.name}
						</h3>
						<p className="mt-5 text-base leading-7 text-[#474239]">
							{providerCopy[winner.provider.id].decision}
						</p>
						<div className="mt-6 border-t border-[#171612]/10 pt-5">
							<p className="text-sm leading-6 text-[#5F5A50]">
								<strong className="font-medium text-[#171612]">Caution: </strong>
								{providerCopy[winner.provider.id].caution}
							</p>
						</div>
					</div>
					<div className="border border-white/15 bg-white/5 p-6">
						<p className="font-mono text-xs uppercase tracking-[0.18em] text-[#D8C497]">
							Also compare
						</p>
						<div className="mt-5 space-y-4">
							{runnerUps.map(({ provider, score }) => (
								<div
									key={provider.id}
									className="flex items-center justify-between border-b border-white/10 pb-4"
								>
									<div>
										<p className="text-base text-white">{provider.name}</p>
										<p className="mt-1 text-xs text-white/50">{provider.short}</p>
									</div>
									<span className="font-mono text-sm text-[#BEFF00]">
										{score}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function SelectControl({
	label,
	value,
	options,
	onChange,
}: {
	label: string;
	value: string;
	options: Array<{ value: string; label: string }>;
	onChange: (value: string) => void;
}) {
	return (
		<div className="block">
			<span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-white/52">
				{label}
			</span>
			<Select
				value={value}
				onValueChange={onChange}
			>
				<SelectTrigger className="h-12 rounded-none border-white/15 bg-white px-3 text-sm text-[#171612] shadow-none ring-offset-transparent focus:ring-1 focus:ring-[#BEFF00] focus:ring-offset-0 data-[placeholder]:text-[#6D675C] [&>svg]:text-[#171612] [&>svg]:opacity-70">
					<SelectValue />
				</SelectTrigger>
				<SelectContent className="z-[70] rounded-none border-[#171612]/10 bg-white text-[#171612] shadow-xl">
					{options.map((option) => (
						<SelectItem
							key={option.value}
							value={option.value}
							className="rounded-none text-sm text-[#171612] focus:bg-[#F2E8D6] focus:text-[#171612]"
						>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}

function SourcesSection() {
	const sources = [
		[
			"YC Company Brain request",
			"https://www.ycombinator.com/rfs?year=2026#company-brain",
		],
		["Supermemory documentation", "https://docs.supermemory.ai/"],
		["Mem0 documentation", "https://docs.mem0.ai/openmemory/overview"],
		["Graphiti documentation", "https://help.getzep.com/graphiti/getting-started/overview"],
		["Letta memory documentation", "https://docs.letta.com/guides/agents/memory/"],
		["LangMem documentation", "https://langchain-ai.github.io/langmem/"],
		["Knowledge Plane", "https://knowledgeplane.io/"],
		["Hive repository", "https://github.com/Nairon-AI/hive"],
	];

	return (
		<section className="bg-white">
			<div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
				<h2 className="text-2xl font-normal tracking-[-0.02em] text-[#171612]">
					Sources
				</h2>
				<div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
					{sources.map(([label, href]) => (
						<a
							key={href}
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center justify-between gap-4 border border-[#171612]/10 bg-[#FBFAF6] p-4 text-sm text-[#474239] transition-colors hover:border-[#A77A15]/40 hover:text-[#171612]"
						>
							<span>{label}</span>
							<ArrowUpRight className="h-4 w-4 shrink-0" />
						</a>
					))}
				</div>
			</div>
		</section>
	);
}

function SectionHeading({
	kicker,
	title,
	body,
}: {
	kicker: string;
	title: string;
	body?: string;
}) {
	return (
		<div>
			<p className="text-xs font-medium uppercase tracking-[0.18em] text-[#A77A15]">
				{kicker}
			</p>
			<h2 className="mt-4 max-w-3xl text-4xl font-normal leading-tight tracking-[-0.03em] text-[#171612] md:text-6xl">
				{title}
			</h2>
			{body && (
				<p className="mt-5 max-w-2xl text-base leading-7 text-[#5F5A50]">
					{body}
				</p>
			)}
		</div>
	);
}

function SectionKicker({
	icon: Icon,
	label,
}: {
	icon: typeof AlertTriangle;
	label: string;
}) {
	return (
		<div>
			<div className="inline-flex items-center gap-2 border border-[#171612]/10 bg-[#FBFAF6] px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-[#6D675C]">
				<Icon className="h-4 w-4 text-[#A77A15]" />
				{label}
			</div>
		</div>
	);
}

function SignalPill({
	icon: Icon,
	label,
}: {
	icon: typeof AlertTriangle;
	label: string;
}) {
	return (
		<div className="inline-flex items-center gap-2 border border-[#171612]/10 bg-white px-3 py-2 text-sm text-[#474239]">
			<Icon className="h-4 w-4 text-[#A77A15]" />
			{label}
		</div>
	);
}
