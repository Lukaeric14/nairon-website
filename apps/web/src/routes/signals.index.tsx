import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowRight,
	ArrowUpRight,
	BadgeDollarSign,
	BrainCircuit,
	CheckCircle2,
	Database,
	GitBranch,
	LockKeyhole,
	Network,
	Rss,
	Search,
	UsersRound,
	type LucideIcon,
} from "lucide-react";
import { Navbar } from "@/components/landing-v2/hero";
import { Footer } from "@/components/landing-v2/footer";
import { useCalInit } from "@/components/landing-v2/cal";
import { HiveWaitlistForm } from "@/components/landing/hive-waitlist-form";
import { DISCOVERY_CALL_URL } from "@/lib/links";
import { seoHead } from "@/lib/seo";
import { SIGNAL_ARTICLES, articlePath } from "@/content/signals";

// Sourced from the article registry so the index, sitemap, llms.txt, and the
// article's own schema always agree.
const latest = SIGNAL_ARTICLES[0];
const featuredPost = {
	title: latest.title,
	href: articlePath(latest),
	category: latest.category,
	date: latest.displayDate,
	readTime: latest.readTime,
	description: latest.description,
	author: latest.author,
	authorAvatar: latest.authorAvatar,
};

type SignalPost = {
	icon: LucideIcon;
	title: string;
	category: string;
	date: string;
	description: string;
	status: string;
	author?: string;
	authorAvatar?: string;
	href?: string;
	isReady?: boolean;
};

const signalPosts: SignalPost[] = [
	{
		icon: BrainCircuit,
		title: featuredPost.title,
		category: featuredPost.category,
		date: featuredPost.date,
		description: featuredPost.description,
		author: featuredPost.author,
		authorAvatar: featuredPost.authorAvatar,
		href: featuredPost.href,
		status: "Read",
		isReady: true,
	},
	{
		icon: LockKeyhole,
		title: "Security and access control for AI employees",
		category: "Security",
		date: "Queued",
		description:
			"Permission boundaries, credential handling, and the access model every deployed agent eventually needs.",
		status: "Queued",
	},
	{
		icon: CheckCircle2,
		title: "Reliability and evaluation loops",
		category: "Evaluation",
		date: "Queued",
		description:
			"How we decide whether an agent is ready to act without turning every workflow into manual review.",
		status: "Queued",
	},
	{
		icon: Network,
		title: "Integrations and interoperability",
		category: "Tools",
		date: "Queued",
		description:
			"What breaks when agents need to move between Slack, CRM, documents, browser sessions, and internal systems.",
		status: "Queued",
	},
	{
		icon: Database,
		title: "Data quality and grounding",
		category: "Context",
		date: "Queued",
		description:
			"The unglamorous work behind useful retrieval: freshness, sources, duplication, and stale business truth.",
		status: "Queued",
	},
	{
		icon: GitBranch,
		title: "Workflow design for agent teams",
		category: "Operations",
		date: "Queued",
		description:
			"Why the best agent deployments look more like operating systems than prompt libraries.",
		status: "Queued",
	},
	{
		icon: BadgeDollarSign,
		title: "Cost, ROI, and runway",
		category: "Finance",
		date: "Queued",
		description:
			"Where AI employee projects create leverage, where they burn time, and how to measure the difference.",
		status: "Queued",
	},
	{
		icon: UsersRound,
		title: "Human handoffs and approvals",
		category: "Teams",
		date: "Queued",
		description:
			"The practical approval patterns that keep agents fast without pretending every action should be autonomous.",
		status: "Queued",
	},
];

const filters = ["All", "Company", "Security", "Evaluation", "Operations"];

export const Route = createFileRoute("/signals/")({
	component: SignalsPage,
	head: () =>
		seoHead({
			title: "Signals | Nairon AI",
			description:
				"Nairon Signals on AI employees, company memory, agent infrastructure, and how we're building Hive.",
			path: "/signals",
		}),
});

function SignalsPage() {
	useCalInit();
	return (
		<div className="font-geist min-h-screen bg-[#F7F7F8] text-[#101014]">
			<Navbar />
			<main className="mx-auto max-w-[980px] border-x border-[#101014]/10 pt-24 pb-24">
				<PageTitle />
				<FeaturedGrid />
				<ArticleGrid />
				<HiveWaitlistSection />
			</main>
			<Footer />
		</div>
	);
}

function PageTitle() {
	return (
		<header className="relative border-b border-[#101014]/10 px-8 py-12 md:px-10 md:py-16">
			<GridTexture />
			<div className="relative">
				<p className="text-xs font-medium text-[#606069]">Signals</p>
				<h1 className="mt-4 max-w-2xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-[#101014] md:text-7xl">
					Notes from building AI employees.
				</h1>
				<p className="mt-5 max-w-xl text-pretty text-base leading-7 text-[#5F6068]">
					Practical field notes from client deployments and from using Hive
					inside Nairon.
				</p>
			</div>
		</header>
	);
}

function FeaturedGrid() {
	return (
		<section className="grid border-b border-[#101014]/10 md:grid-cols-2">
			<FeaturedCard
				title={featuredPost.title}
				description={featuredPost.description}
				date={featuredPost.date}
				author={featuredPost.author}
				authorAvatar={featuredPost.authorAvatar}
				href={featuredPost.href}
			/>
			<FeaturedCard
				title="How we decide what becomes a Signal"
				description="We publish when a pattern repeats across client work, Hive usage, or agent infrastructure decisions."
				date="Editorial note"
				reverseArtwork
			/>
		</section>
	);
}

function FeaturedCard({
	title,
	description,
	date,
	author,
	authorAvatar,
	href,
	reverseArtwork = false,
}: {
	title: string;
	description: string;
	date: string;
	author?: string;
	authorAvatar?: string;
	href?: string;
	reverseArtwork?: boolean;
}) {
	const isReady = Boolean(href);
	const content = (
		<>
			<div className="overflow-hidden rounded-lg border border-[#101014]/10 bg-white">
				{reverseArtwork ? (
					<SignalWave className="h-[180px] md:h-[210px]" />
				) : (
					<SignalDither className="h-[180px] md:h-[210px]" />
				)}
			</div>
			<p className="mt-5 text-xs text-[#606069]">{date}</p>
			<h2 className="mt-3 text-balance text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#101014]">
				{title}
			</h2>
			<p className="mt-4 text-pretty text-sm leading-6 text-[#5F6068]">
				{description}
			</p>
			<div className="mt-auto flex items-center justify-between gap-4 pt-8">
				{author ? (
					<AuthorStack author={author} avatarSrc={authorAvatar} />
				) : (
					<span />
				)}
				<span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--brand-blue)]">
					{isReady ? "Read" : "Soon"}
					<ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
				</span>
			</div>
		</>
	);

	const className =
		"group flex min-h-[420px] flex-col border-[#101014]/10 p-8 transition-colors first:border-b md:first:border-r md:first:border-b-0 md:p-10";
	const mutedClassName = `${className} bg-[#F0F0F2]/45 opacity-60 grayscale`;

	return href ? (
		<a href={href} className={className}>
			{content}
		</a>
	) : (
		<div className={mutedClassName} aria-disabled="true">
			{content}
		</div>
	);
}

function FilterRow() {
	return (
		<section className="flex flex-col gap-4 border-b border-[#101014]/10 px-8 py-6 md:flex-row md:items-center md:justify-between md:px-10">
			<div className="flex flex-wrap items-center gap-2">
				{filters.map((filter) => (
					<button
						key={filter}
						type="button"
						className="inline-flex h-8 items-center rounded-full border border-transparent px-3 text-xs text-[#606069] transition-colors first:border-[#101014]/10 first:bg-white first:text-[#101014] hover:text-[#101014]"
					>
						{filter}
					</button>
				))}
			</div>
			<div className="flex items-center gap-3">
				<label className="flex h-8 w-full items-center gap-2 rounded-full border border-[#101014]/10 bg-white px-3 text-xs text-[#606069] md:w-[172px]">
					<Search className="size-3.5" />
					<span>Search...</span>
					<span className="ml-auto rounded border border-[#101014]/10 px-1 text-[10px]">
						K
					</span>
				</label>
				<Rss className="size-4 text-[#606069]" />
			</div>
		</section>
	);
}

function ArticleGrid() {
	return (
		<section className="grid border-b border-[#101014]/10 md:grid-cols-3">
			{signalPosts.map((post) => (
				<ArticleCard key={post.title} post={post} />
			))}
		</section>
	);
}

function ArticleCard({ post }: { post: SignalPost }) {
	const Icon = post.icon;
	const isReady = Boolean(post.href || post.isReady);
	const content = (
		<>
			<div className="flex items-center justify-between gap-4">
				<p className="text-xs text-[#606069]">{post.date}</p>
				<Icon
					className={isReady ? "size-4 text-[var(--brand-blue)]" : "size-4 text-[#9C9DA5]"}
				/>
			</div>
			<p className="mt-6 text-xs text-[#606069]">{post.category}</p>
			<h3
				className={
					isReady
						? "mt-3 text-balance text-base font-semibold leading-snug tracking-[-0.02em] text-[#101014]"
						: "mt-3 text-balance text-base font-semibold leading-snug tracking-[-0.02em] text-[#4D4E56]"
				}
			>
				{post.title}
			</h3>
			<p className="mt-4 text-pretty text-sm leading-6 text-[#5F6068]">
				{post.description}
			</p>
			<div className="mt-auto flex items-center justify-between gap-4 pt-8">
				{isReady && post.author ? (
					<AuthorStack
						author={post.author}
						avatarSrc={post.authorAvatar}
						compact
					/>
				) : (
					<span />
				)}
				<span
					className={
						isReady
							? "inline-flex items-center gap-1 text-xs font-medium text-[var(--brand-blue)]"
							: "inline-flex items-center gap-1 text-xs font-medium text-[#8F9098]"
					}
				>
					{post.status}
					<ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
				</span>
			</div>
		</>
	);
	const className =
		"group flex min-h-[262px] flex-col border-b border-[#101014]/10 p-8 transition-colors hover:bg-white md:border-r md:[&:nth-child(3n)]:border-r-0";
	const mutedClassName =
		"group flex min-h-[262px] flex-col border-b border-[#101014]/10 bg-[#F0F0F2]/45 p-8 opacity-60 grayscale md:border-r md:[&:nth-child(3n)]:border-r-0";

	return post.href ? (
		<a href={post.href} className={className}>
			{content}
		</a>
	) : (
		<article className={mutedClassName} aria-disabled="true">
			{content}
		</article>
	);
}

function HiveWaitlistSection() {
	return (
		<section className="grid border-b border-[#101014]/10 bg-white md:grid-cols-[0.9fr_1.1fr]">
			<div className="border-b border-[#101014]/10 p-8 md:border-r md:border-b-0 md:p-10">
				<p className="text-xs font-medium text-[#606069]">Hive beta</p>
				<h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#101014] md:text-5xl">
					The operating system behind the learnings.
				</h2>
				<p className="mt-5 max-w-md text-pretty text-sm leading-6 text-[#5F6068]">
					Hive is a workspace for humans and AI employees: persistent memory,
					business context, security policy, tool access, and reliability loops
					in one place.
				</p>
				<a
					href={DISCOVERY_CALL_URL}
					target="_blank"
					rel="noopener noreferrer"
					className="mt-7 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#101014] px-4 text-sm font-medium text-white transition-colors hover:bg-[#2A2A33]"
				>
					Book a one-month pilot
					<ArrowUpRight className="size-4" />
				</a>
			</div>
			<div className="p-8 md:p-10">
				<HiveWaitlistForm source="Signals index" />
			</div>
		</section>
	);
}

function AuthorStack({
	author,
	avatarSrc,
	compact = false,
}: {
	author: string;
	avatarSrc?: string;
	compact?: boolean;
}) {
	return (
		<div className="flex items-center gap-2">
			<span className="grid size-5 place-items-center overflow-hidden rounded-full bg-[#101014] text-[10px] font-semibold text-white ring-1 ring-[#101014]/10">
				{avatarSrc ? (
					<img
						src={avatarSrc}
						alt=""
						className="size-full object-cover"
						loading="lazy"
						decoding="async"
					/>
				) : (
					"O"
				)}
			</span>
			<span
				className={compact ? "text-xs text-[#606069]" : "text-sm text-[#303036]"}
			>
				{author}
			</span>
		</div>
	);
}

function SignalWave({ className }: { className?: string }) {
	return (
		<div
			aria-hidden="true"
			className={`relative overflow-hidden bg-white ${className ?? ""}`}
		>
			<div className="absolute inset-0 opacity-[0.45] [background-image:radial-gradient(#101014_0.8px,transparent_0.8px)] [background-size:8px_8px]" />
			<div className="absolute inset-x-0 top-1/2 h-36 -translate-y-1/2 bg-[radial-gradient(ellipse_at_50%_50%,color-mix(in srgb, var(--brand-blue) 28%, transparent),transparent_62%)] blur-2xl" />
			<div className="absolute left-1/2 top-1/2 h-36 w-[150%] -translate-x-1/2 -translate-y-1/2 rotate-[-7deg] rounded-[50%] border-t border-[#101014]/35" />
			<div className="absolute left-1/2 top-[58%] h-28 w-[128%] -translate-x-1/2 -translate-y-1/2 rotate-[5deg] rounded-[50%] border-t border-[#101014]/25" />
		</div>
	);
}

function SignalDither({ className }: { className?: string }) {
	return (
		<div
			aria-hidden="true"
			className={`relative overflow-hidden bg-white ${className ?? ""}`}
		>
			<div className="absolute inset-0 [background-image:radial-gradient(#101014_0.75px,transparent_0.75px)] [background-size:7px_7px]" />
			<div className="absolute -left-10 -top-8 h-44 w-[120%] rotate-[-6deg] rounded-[50%] bg-white" />
			<div className="absolute inset-x-0 top-1/2 h-28 -translate-y-1/2 bg-[radial-gradient(ellipse_at_50%_50%,color-mix(in srgb, var(--brand-blue) 24%, transparent),transparent_64%)] blur-xl" />
			<div className="absolute left-1/2 top-[47%] h-40 w-[135%] -translate-x-1/2 -translate-y-1/2 rotate-[8deg] rounded-[50%] border-t border-[#101014]/30" />
			<div className="absolute left-1/2 top-[52%] h-32 w-[120%] -translate-x-1/2 -translate-y-1/2 rotate-[-4deg] rounded-[50%] border-t border-[#101014]/20" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0,transparent_48%,rgba(255,255,255,0.72)_78%)]" />
		</div>
	);
}

function GridTexture() {
	return (
		<div
			aria-hidden="true"
			className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(16,16,20,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(16,16,20,0.045)_1px,transparent_1px)] [background-size:76px_76px]"
		/>
	);
}
