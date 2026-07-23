import { createFileRoute } from "@tanstack/react-router";
import {
	AlertTriangle,
	ArrowRight,
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
import { useEffect, useMemo, useRef, useState } from "react";
import { HiveWaitlistForm } from "@/components/landing/hive-waitlist-form";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { DISCOVERY_CALL_URL } from "@/lib/links";
import { articleHead } from "@/lib/seo";
import { getArticle } from "@/content/signals";
import { cn } from "@/lib/utils";
import {
	ArticleReaderToolbar,
	type ReaderMode,
	type ReaderSize,
	type ReaderWidth,
} from "@/components/signals/article-reader-toolbar";
import { MemoryConceptModel } from "@/components/signals/memory-concept-model";
import { SelectionExplainer } from "@/components/signals/selection-explainer";
import { SignalsArticleMasthead } from "@/components/signals/signals-article-masthead";

// Canonical metadata lives in the registry (content/signals.ts) so the
// sitemap, llms.txt, Signals index, and this page can never disagree.
const article = getArticle("solving-the-agent-memory-problem")!;
const ARTICLE_AUTHOR = article.author;
const ARTICLE_AUTHOR_AVATAR = article.authorAvatar;

export const Route = createFileRoute("/signals/solving-the-agent-memory-problem")({
	component: AgentMemoryArticlePage,
	head: () => articleHead(article),
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
			"Teams that want memory working quickly without building the whole stack.",
		pros: [
			"Fastest path to a managed memory layer.",
			"Good connectors for messy company knowledge.",
			"Strong fit for coding agents through MCP.",
		],
		cons: [
			"Bad capture rules can make memory noisy.",
			"Governance still needs careful testing.",
			"Test it on your own docs and transcripts.",
		],
		signal:
			"Best first option to test because it covers a lot out of the box.",
		source: "https://docs.supermemory.ai/",
		sourceLabel: "Supermemory docs",
	},
	{
		id: "mem0",
		name: "Mem0",
		short: "Open-source friendly memory",
		bestFor:
			"Teams that want a popular memory layer with hosted and self-hosted options.",
		pros: [
			"Easy mental model for persistent memory.",
			"Self-hosting helps with data control.",
			"Good for personalization-heavy agents.",
		],
		cons: [
			"Hosted and open-source features can differ.",
			"Self-hosting adds ops work.",
			"It doesn't create a company brain by itself.",
		],
		signal:
			"Best when portability matters more than a fully managed stack.",
		source: "https://docs.mem0.ai/openmemory/overview",
		sourceLabel: "Mem0 docs",
	},
	{
		id: "zep",
		name: "Zep / Graphiti",
		short: "Temporal graph memory",
		bestFor:
			"Agents that need to know what changed, when it changed, and why.",
		pros: [
			"Great for facts that change over time.",
			"Useful for CRM, support, and decisions.",
			"Combines graph, keyword, and semantic search.",
		],
		cons: [
			"Needs more data modeling discipline.",
			"Self-hosting adds database complexity.",
			"Not the fastest connector-first option.",
		],
		signal:
			"Best when the question is what was true at the time.",
		source: "https://help.getzep.com/graphiti/getting-started/overview",
		sourceLabel: "Graphiti docs",
	},
	{
		id: "letta",
		name: "Letta",
		short: "Stateful agent runtime",
		bestFor:
			"Teams building agents where memory is part of how the agent runs.",
		pros: [
			"Memory is built into the agent runtime.",
			"Good split between core and archived memory.",
			"Useful for long-running agents.",
		],
		cons: [
			"More of an architecture choice.",
			"Still needs company-level governance.",
			"Agents can save low-value noise.",
		],
		signal:
			"Best when you can design the agent system around memory.",
		source: "https://docs.letta.com/guides/agents/memory/",
		sourceLabel: "Letta docs",
	},
	{
		id: "langmem",
		name: "LangMem / LangGraph Store",
		short: "Framework-native primitives",
		bestFor:
			"Teams already building agents with LangGraph.",
		pros: [
			"Fits naturally into LangGraph.",
			"Good for agents that learn procedures.",
			"Namespaces make scoping practical.",
		],
		cons: [
			"You own connectors and governance.",
			"More toolkit than full platform.",
			"Needs careful schemas and maintenance.",
		],
		signal:
			"Best when LangGraph is already your core agent stack.",
		source: "https://langchain-ai.github.io/langmem/",
		sourceLabel: "LangMem docs",
	},
	{
		id: "knowledge-plane",
		name: "Knowledge Plane / company-brain tools",
		short: "Shared memory for teams",
		bestFor:
			"Teams trying to give agents shared company context.",
		pros: [
			"Closest to the company-brain idea.",
			"Can connect decisions, owners, and sources.",
			"Can serve the same memory to many tools.",
		],
		cons: [
			"The category is still early.",
			"Permissions matter more than the database.",
			"Teams still need process change.",
		],
		signal:
			"Best directionally for Hive, even if multiple providers sit underneath.",
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
	const [mode, setMode] = useState<ReaderMode>("brief");
	const [focus, setFocus] = useState(false);
	const [size, setSize] = useState<ReaderSize>("medium");
	const [width, setWidth] = useState<ReaderWidth>("comfortable");
	const restored = useRef(false);

	useEffect(() => {
		const savedMode = window.localStorage.getItem("signals:reader-mode");
		const savedSize = window.localStorage.getItem("signals:reader-size");
		const savedWidth = window.localStorage.getItem("signals:reader-width");
		if (savedMode === "brief" || savedMode === "deep") setMode(savedMode);
		if (savedSize === "small" || savedSize === "medium" || savedSize === "large") setSize(savedSize);
		if (savedWidth === "narrow" || savedWidth === "comfortable" || savedWidth === "wide") setWidth(savedWidth);
		const position = Number(window.localStorage.getItem(`signals:position:${article.slug}`));
		window.setTimeout(() => {
			if (position > 0) window.scrollTo({ top: position });
			restored.current = true;
		}, 80);
	}, []);

	useEffect(() => {
		window.localStorage.setItem("signals:reader-mode", mode);
		window.localStorage.setItem("signals:reader-size", size);
		window.localStorage.setItem("signals:reader-width", width);
		function rememberPosition() {
			if (restored.current) window.localStorage.setItem(`signals:position:${article.slug}`, String(Math.round(window.scrollY)));
		}
		window.addEventListener("scroll", rememberPosition, { passive: true });
		return () => window.removeEventListener("scroll", rememberPosition);
	}, [mode, size, width]);

	const widthClass = width === "narrow" ? "max-w-[1120px]" : width === "wide" ? "max-w-[1536px]" : "max-w-[1380px]";
	return (
		<div className="min-h-screen bg-ds-shell font-geist text-ds-text-primary" data-reader-size={size}>
			<article className={`reader-copy signals-essay mx-auto min-h-screen border-x border-ds-border bg-ds-surface transition-[max-width] ${widthClass}`}>
				{focus ? null : <SignalsArticleMasthead />}
				<ArticleReaderToolbar mode={mode} onModeChange={setMode} focus={focus} onFocusChange={setFocus} size={size} onSizeChange={setSize} width={width} onWidthChange={setWidth} />
				<Hero />
				{mode === "brief" ? (
					<BriefArticle onDeepRead={() => setMode("deep")} />
				) : (
					<>
						<ProblemSection />
						<MemoryConceptModel />
						<LandscapeSection />
						<ProviderSection />
						<HiveSection />
						<DecisionTool />
						<ArticleCTA />
						<SourcesSection />
					</>
				)}
			</article>
			<SelectionExplainer slug={article.slug} />
		</div>
	);
}

function Hero() {
	return (
		<header className="border-b border-ds-border">
			<div className="px-6 py-16 sm:px-10 sm:py-20 md:px-[clamp(5rem,10.7vw,9.25rem)] md:py-28">
				<div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ds-text-tertiary">
					<a href="/signals" className="transition-colors hover:text-ds-text-primary">
						Signals
					</a>
					<ArrowRight className="size-3" />
					<span>Company memory</span>
				</div>
				<h1 className="mt-10 max-w-5xl text-balance text-[clamp(3rem,7.5vw,7.2rem)] font-normal leading-[0.92] tracking-[-0.06em] text-ds-text-primary">
					Solving the Agent Memory problem
				</h1>
				<p className="mt-10 max-w-[760px] text-pretty text-[clamp(1.08rem,1.5vw,1.28rem)] leading-[1.65] text-ds-text-secondary">
						We often get asked.... which memory layer should we trust for AI
						employees: Supermemory, Mem0, Zep, Letta, LangMem, or something
						closer to a company brain?
				</p>
			</div>
			<div className="grid border-t border-ds-border px-6 py-5 font-mono text-[10px] uppercase tracking-[0.13em] text-ds-text-secondary sm:px-10 md:grid-cols-[1fr_auto] md:px-[clamp(5rem,10.7vw,9.25rem)]">
				<div className="flex items-center gap-3">
					<span className="grid size-5 place-items-center overflow-hidden rounded-full bg-ds-surface-hover text-[10px] font-semibold text-ds-text-primary ring-1 ring-ds-border">
						<img
							src={ARTICLE_AUTHOR_AVATAR}
							alt=""
							className="size-full object-cover"
							loading="eager"
							decoding="async"
						/>
					</span>
					<span>{ARTICLE_AUTHOR}</span>
				</div>
				<span className="mt-3 md:mt-0">Apr 30, 2026</span>
			</div>
		</header>
	);
}

function BriefArticle({ onDeepRead }: { onDeepRead: () => void }) {
	return (
		<>
			<section className="border-b border-ds-border bg-ds-surface px-6 py-16 sm:px-10 md:px-[clamp(5rem,10.7vw,9.25rem)] md:py-24">
				<p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ds-text-tertiary">The bottom line</p>
				<h2 className="mt-7 max-w-5xl text-[clamp(2.2rem,5vw,5rem)] font-normal leading-[1] tracking-[-0.05em]">AI employees do not need more stored text. They need the right business context at the moment of a decision.</h2>
				<div className="article-prose mt-9 max-w-[760px] space-y-6 text-[18px] leading-8 text-ds-text-primary sm:text-[20px] sm:leading-9">
					<p>An agent that remembers a person’s name is useful. An agent that knows the current budget, active customer promises, prior decisions, permission boundaries, and why a constraint exists can work like a responsible teammate.</p>
					<p>No memory provider solves that alone. Supermemory, Mem0, Zep, Letta, LangMem, and company-brain tools make different tradeoffs. The right choice depends on your data sources, sensitivity, hosting needs, and whether facts change over time.</p>
				</div>
				<div className="mt-10 grid border border-black/10 bg-white sm:grid-cols-3">
					{[
						["Start", "Test a managed layer against your own documents and transcripts."],
						["Protect", "Every memory needs a source, permission boundary, and freshness rule."],
						["Design for change", "Keep Hive provider-aware so one vendor does not define the product."],
					].map(([label, copy], index) => <div className="border-b border-black/10 p-4 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0" key={label}><span className="font-mono text-[9px] text-black/30">0{index + 1}</span><h3 className="mt-4 text-sm font-semibold">{label}</h3><p className="mt-2 text-[13px] leading-6 text-black/50">{copy}</p></div>)}
				</div>
				<div className="mt-10 border-l-2 border-amber-400 bg-amber-50 p-4"><p className="text-[13px] leading-6 text-amber-950"><strong>Important limit:</strong> bad capture rules create noisy memory, while weak permissions create risk. Treat raw transcripts as source material—not durable truth.</p></div>
				<button className="mt-10 inline-flex h-11 items-center gap-2 border border-ds-text-primary bg-ds-text-primary px-5 font-mono text-[9px] uppercase tracking-[0.12em] text-white transition-colors hover:bg-transparent hover:text-ds-text-primary" onClick={onDeepRead} type="button">Open the Deep Read <ArrowRight className="size-4" /></button>
			</section>
			<MemoryConceptModel />
		</>
	);
}

function ProblemSection() {
	return (
		<section className="border-b border-[#101014]/10 bg-white">
			<div className="px-8 py-12 md:px-[148px] md:py-16">
				<SectionKicker icon={AlertTriangle} label="The actual bottleneck" />
				<div className="article-prose mt-8 space-y-7 text-pretty text-[18px] leading-8 text-[#303036] sm:text-[20px] sm:leading-9">
					<p>
						The memory problem is not that agents forget your name. That is the
						small version. The business version is harder: agents do not know
						why the company is making a decision, which customers matter, what
						the budget is, which promises sales has made, what the runway is,
						or which constraints should block a feature from being built.
					</p>
					<p>
						That missing context makes AI employees too agreeable. Someone on
						the team asks an agent to do something, the agent starts helping,
						and nobody in the loop has the operating history required to say:
						this violates our ICP, this is outside the current budget, this
						conflicts with an active client promise, or this should wait because
						a higher-leverage workflow is already planned. That is the frontier
						problem: agents need full business context before they can push back
						well.
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
								className="flex items-start gap-3 border border-[#101014]/10 bg-[#F7F7F8] p-4"
							>
								<CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-blue)]" />
								<span className="text-sm leading-6 text-[#303036]">{item}</span>
							</div>
						))}
					</div>
					<p>
						This is why the{" "}
						<a
							href="https://www.ycombinator.com/rfs?year=2026#company-brain"
							target="_blank"
							rel="noopener noreferrer"
							className="text-[#101014] underline decoration-[var(--brand-blue)]/45 underline-offset-4 transition-colors hover:decoration-[var(--brand-blue)]"
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
		<section className="border-b border-[#101014]/10">
			<div className="px-8 py-12 md:px-10 md:py-16">
				<SectionHeading
					kicker="The market"
					title="There is no winner yet because the category is really four categories."
				/>
				<div className="mt-10 grid grid-cols-1 border border-[#101014]/10 bg-white md:grid-cols-4">
					{landscape.map((item) => (
						<div
							key={item.title}
							className="border-b border-[#101014]/10 p-5 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0"
						>
							<item.icon className="h-5 w-5 text-[var(--brand-blue)]" />
							<h3 className="mt-5 text-lg font-medium text-[#101014]">
								{item.title}
							</h3>
							<p className="mt-3 text-sm leading-6 text-[#5F6068]">
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
		<section className="border-b border-[#101014]/10 bg-white">
			<div className="px-8 py-12 md:px-10 md:py-16">
				<SectionHeading
					kicker="Provider notes"
					title="The practical tradeoffs"
					body="The right layer depends on what memory needs to do for your team. Don't pick from benchmarks alone. Pick based on your data sources, permissions, and how bad retrieval can fail."
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
		<section className="rounded-lg border border-[#101014]/10 bg-[#F7F7F8] p-5">
			<div className="flex items-start justify-between gap-5">
				<div>
					<p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#606069]">
						{provider.short}
					</p>
					<h3 className="mt-2 text-2xl font-normal tracking-[-0.02em] text-[#101014]">
						{provider.name}
					</h3>
				</div>
				<a
					href={provider.source}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-[#101014]/12 bg-white text-[#101014] transition-colors hover:bg-[#101014] hover:text-white"
					aria-label={`Open ${provider.sourceLabel}`}
				>
					<ArrowUpRight className="h-4 w-4" />
				</a>
			</div>
			<p className="mt-5 text-sm leading-6 text-[#303036]">
				<strong className="font-medium text-[#101014]">Best for: </strong>
				{provider.bestFor}
			</p>
			<div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
				<TradeoffList title="Pros" items={provider.pros} positive />
				<TradeoffList title="Cons" items={provider.cons} />
			</div>
			<div className="mt-6 border-t border-[#101014]/10 pt-4">
				<p className="text-sm leading-6 text-[#5F6068]">
					<strong className="font-medium text-[#101014]">Nairon read: </strong>
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
			<h4 className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-[#606069]">
				{title}
			</h4>
			<ul className="space-y-3">
				{items.map((item) => (
					<li key={item} className="flex gap-2 text-sm leading-6 text-[#5F6068]">
						<span
							className={cn(
								"mt-2 h-1.5 w-1.5 shrink-0",
								positive ? "bg-[var(--brand-blue)]" : "bg-[#101014]/45",
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
		<section className="border-b border-[#101014]/10">
			<div className="grid grid-cols-1 gap-8 px-8 py-12 md:grid-cols-[1fr_1fr] md:px-10 md:py-16">
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
				</div>
				<div className="rounded-lg border border-[#101014]/10 bg-white p-6">
					<h3 className="text-balance text-2xl font-normal tracking-[-0.02em] text-[#101014]">
						The principle
					</h3>
					<p className="mt-4 text-pretty text-sm leading-7 text-[#5F6068]">
						Whatever provider sits underneath, Hive needs to expose the same
						product promise: every human teammate can talk to AI employees that
						understand the company, while sensitive data stays permissioned and
						auditable.
					</p>
					<p className="mt-4 text-pretty text-sm leading-7 text-[#5F6068]">
						That is the platform we're using internally now: a Slack-like
						workspace where AI employees can use the right company knowledge,
						permissions, tools, and decision history to reason with the
						business instead of acting from a narrow prompt. It is still beta,
						but the internal wins are why we're writing about the problem
						publicly.
					</p>
					<ul className="mt-6 space-y-4">
						{hivePrinciples.map((principle) => (
							<li key={principle} className="flex gap-3 text-sm leading-6">
								<LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-blue)]" />
								<span className="text-[#303036]">{principle}</span>
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
		<section className="border-b border-[#101014]/10 bg-white">
			<div className="grid grid-cols-1 gap-8 px-8 py-12 md:grid-cols-[0.9fr_1.1fr] md:px-10 md:py-16">
				<div>
					<p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--brand-blue)]">
						Where this goes
					</p>
					<h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#101014] md:text-5xl">
						Memory is one piece of Hive.
					</h2>
					<p className="mt-5 max-w-xl text-pretty text-base leading-7 text-[#5F6068]">
						Hive is the proprietary platform we're building so companies can
						talk to AI employees, preserve business context, enforce security
						policy, and give agents governed access to the company memory they
						need.
					</p>
					<p className="mt-4 max-w-xl text-pretty text-base leading-7 text-[#5F6068]">
						If you want Nairon to build your first AI employee now, book the
						one-month pilot. If you want early access to Hive when we open the
						beta wider, join the waitlist.
					</p>
					<a
						href={DISCOVERY_CALL_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-7 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#101014] px-4 text-sm font-medium text-white transition-colors hover:bg-[#2A2A33]"
					>
						Book the one-month pilot
						<ArrowUpRight className="h-4 w-4" />
					</a>
				</div>
				<div className="rounded-lg border border-[#101014]/10 bg-[#F7F7F8] p-5 md:p-6">
					<div className="mb-5 border-b border-[#101014]/10 pb-5">
						<p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--brand-blue)]">
							Hive waitlist
						</p>
						<h3 className="mt-2 text-balance text-2xl font-normal tracking-[-0.02em] text-[#101014]">
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
		<section className="border-b border-ds-border bg-[#F7F5F0] text-ds-text-primary">
			<div className="px-8 py-12 md:px-10 md:py-16">
				<div className="grid grid-cols-1 gap-10 md:grid-cols-[0.9fr_1.1fr]">
					<div>
						<div className="inline-flex items-center gap-2 border border-ds-border bg-ds-surface-raised px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-ds-text-secondary">
							<Sparkles className="h-4 w-4" />
							Memory picker
						</div>
						<h2 className="mt-6 text-balance text-4xl font-normal leading-tight tracking-[-0.03em] md:text-6xl">
							Which memory layer should your company test first?
						</h2>
						<p className="mt-6 max-w-xl text-pretty text-[17px] leading-8 text-ds-text-secondary">
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
					<div className="border border-ds-border bg-ds-surface-raised p-6 text-ds-text-primary">
						<p className="font-mono text-xs uppercase tracking-[0.18em] text-[#606069]">
							Recommended first pilot
						</p>
						<h3 className="mt-3 text-4xl font-normal tracking-[-0.03em]">
							{winner.provider.name}
						</h3>
						<p className="mt-5 text-base leading-7 text-[#303036]">
							{providerCopy[winner.provider.id].decision}
						</p>
						<div className="mt-6 border-t border-[#101014]/10 pt-5">
							<p className="text-sm leading-6 text-[#5F6068]">
								<strong className="font-medium text-[#101014]">Caution: </strong>
								{providerCopy[winner.provider.id].caution}
							</p>
						</div>
					</div>
					<div className="border border-ds-border bg-ds-surface p-6">
						<p className="font-mono text-xs uppercase tracking-[0.18em] text-ds-text-tertiary">
							Also compare
						</p>
						<div className="mt-5 space-y-4">
							{runnerUps.map(({ provider, score }) => (
								<div
									key={provider.id}
									className="flex items-center justify-between border-b border-ds-border pb-4"
								>
									<div>
										<p className="text-base text-ds-text-primary">{provider.name}</p>
										<p className="mt-1 text-xs text-ds-text-secondary">{provider.short}</p>
									</div>
									<span className="font-mono text-sm text-[var(--brand-blue)]">
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
			<span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-ds-text-secondary">
				{label}
			</span>
			<Select
				value={value}
				onValueChange={onChange}
			>
				<SelectTrigger className="h-12 rounded-none border-ds-border bg-ds-surface-raised px-3 text-sm text-ds-text-primary shadow-none ring-offset-transparent focus:ring-1 focus:ring-[var(--brand-blue)] focus:ring-offset-0 data-[placeholder]:text-ds-text-secondary [&>svg]:text-ds-text-primary [&>svg]:opacity-70">
					<SelectValue />
				</SelectTrigger>
				<SelectContent className="z-[70] rounded-none border-[#101014]/10 bg-white text-[#101014] shadow-xl">
					{options.map((option) => (
						<SelectItem
							key={option.value}
							value={option.value}
							className="rounded-none text-sm text-[#101014] focus:bg-[#F2E8D6] focus:text-[#101014]"
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
			<div className="px-8 py-12 md:px-10">
				<h2 className="text-2xl font-normal tracking-[-0.02em] text-[#101014]">
					Sources
				</h2>
				<div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
					{sources.map(([label, href]) => (
						<a
							key={href}
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center justify-between gap-4 border border-[#101014]/10 bg-[#F7F7F8] p-4 text-sm text-[#303036] transition-colors hover:border-[var(--brand-blue)]/40 hover:text-[#101014]"
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
			<p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--brand-blue)]">
				{kicker}
			</p>
			<h2 className="mt-4 max-w-3xl text-balance text-4xl font-normal leading-tight tracking-[-0.03em] text-[#101014] md:text-6xl">
				{title}
			</h2>
			{body && (
				<p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-[#5F6068]">
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
			<div className="inline-flex items-center gap-2 border border-[#101014]/10 bg-[#F7F7F8] px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-[#606069]">
				<Icon className="h-4 w-4 text-[var(--brand-blue)]" />
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
		<div className="inline-flex items-center gap-2 border border-[#101014]/10 bg-white px-3 py-2 text-sm text-[#303036]">
			<Icon className="h-4 w-4 text-[var(--brand-blue)]" />
			{label}
		</div>
	);
}
