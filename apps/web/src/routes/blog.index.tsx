import { createFileRoute } from "@tanstack/react-router";
import {
	Activity,
	ArrowUpRight,
	BadgeDollarSign,
	BookOpenText,
	BrainCircuit,
	Calendar,
	CheckCircle2,
	Clock3,
	Database,
	GitBranch,
	LockKeyhole,
	Network,
	Sparkles,
	UsersRound,
} from "lucide-react";
import { CandidateModal } from "@/components/landing/candidate-modal";
import { Footer, Navbar } from "@/components/landing";
import { HireModal } from "@/components/landing/hire-modal";
import { HivePlatformPreview } from "@/components/landing/hive-platform-preview";
import { HiveWaitlistForm } from "@/components/landing/hive-waitlist-form";
import { ModalProvider } from "@/components/landing/modal-provider";
import { DISCOVERY_CALL_URL } from "@/lib/links";
import { seoHead } from "@/lib/seo";

const featuredPost = {
	title: "Solving the Agent Memory problem",
	href: "/blog/solving-the-agent-memory-problem",
	category: "Company memory",
	date: "Apr 30, 2026",
	readTime: "12 min read",
	description:
		"A practical look at Supermemory, Mem0, Zep, Letta, LangMem, company-brain tools, and the memory layer we need for Hive.",
};

const signalTopics = [
	{
		icon: BrainCircuit,
		label: "Agent memory",
		status: "Available",
		href: featuredPost.href,
	},
	{
		icon: LockKeyhole,
		label: "Security and access control",
		status: "coming soon...",
	},
	{
		icon: CheckCircle2,
		label: "Reliability and evaluation",
		status: "coming soon...",
	},
	{
		icon: Network,
		label: "Integrations and interoperability",
		status: "coming soon...",
	},
	{
		icon: Database,
		label: "Data quality and grounding",
		status: "coming soon...",
	},
	{
		icon: GitBranch,
		label: "Workflow design",
		status: "coming soon...",
	},
	{
		icon: Activity,
		label: "Observability and debugging",
		status: "coming soon...",
	},
	{
		icon: BadgeDollarSign,
		label: "Cost, ROI, and runway",
		status: "coming soon...",
	},
	{
		icon: UsersRound,
		label: "Human handoffs and approvals",
		status: "coming soon...",
	},
];

export const Route = createFileRoute("/blog/")({
	component: BlogPage,
	head: () =>
		seoHead({
			title: "Signals | Nairon AI",
			description:
				"Nairon Signals on AI employees, company memory, agent infrastructure, and how we're building Hive.",
			path: "/blog",
		}),
});

function BlogPage() {
	return (
		<ModalProvider>
			<div className="min-h-screen bg-[#FBFAF6] font-inter text-[#171612]">
				<Navbar />
				<main>
					<BlogHero />
					<FeaturedArticle />
					<WhyThisBlogExists />
					<HiveWaitlistSection />
				</main>
				<Footer />
			</div>
			<HireModal />
			<CandidateModal />
		</ModalProvider>
	);
}

function BlogHero() {
	return (
		<header className="relative overflow-hidden border-b border-[#171612]/10 pt-28">
			<div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(23,22,18,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(23,22,18,0.08)_1px,transparent_1px)] [background-size:44px_44px]" />
			<div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pb-16 md:grid-cols-[1.05fr_0.95fr] md:items-start md:px-10 md:pb-20">
				<div>
					<div className="mb-7 inline-flex items-center gap-2 border border-[#171612]/10 bg-white/70 px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-[#6D675C]">
						<BookOpenText className="h-4 w-4 text-[#A77A15]" />
						Nairon Signals
					</div>
					<h1 className="max-w-4xl text-balance text-[48px] font-normal leading-[0.95] tracking-[-0.03em] text-[#171612] md:text-[86px]">
						Data-backed lessons from building Agents.
					</h1>
					<p className="mt-8 max-w-2xl text-pretty text-lg leading-8 text-[#5F5A50] md:text-xl">
						What we're learning from client agent deployments and from using
						Hive inside Nairon.
					</p>
					<div className="mt-8 flex flex-col gap-3 sm:flex-row">
						<a
							href={featuredPost.href}
							className="inline-flex h-12 items-center justify-center gap-2 bg-[#171612] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#2A2822]"
						>
							Read the first article
							<ArrowUpRight className="h-4 w-4" />
						</a>
						<a
							href={DISCOVERY_CALL_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex h-12 items-center justify-center gap-2 border border-[#171612]/12 bg-white px-5 text-sm font-semibold text-[#171612] transition-colors hover:border-[#A77A15]/50"
						>
							Book a one-month pilot
						</a>
					</div>
				</div>

				<div className="relative border border-[#171612]/10 bg-[#171612] p-3 text-white shadow-[14px_14px_0_rgba(201,169,110,0.24)] md:min-h-[520px] md:p-4">
					<div className="relative flex h-full min-h-[500px] flex-col border border-white/10">
						<div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-5">
							<p className="text-xs uppercase tracking-[0.18em] text-[#D8C497]">
								What we're documenting
							</p>
							<span className="shrink-0 text-xs text-white/40">
								1 live / {signalTopics.length - 1} queued
							</span>
						</div>
						<div className="divide-y divide-white/10">
							{signalTopics.map((topic) => (
								<SignalRow key={topic.label} {...topic} />
							))}
						</div>
						<div className="mt-auto border-t border-white/10 px-4 py-4 sm:px-5">
							<p className="max-w-md text-pretty text-[13px] leading-6 text-white/52">
								We publish a Signal when the pattern shows up in client work or
								in our own Hive operating system.
							</p>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

function FeaturedArticle() {
	return (
		<section className="border-b border-[#171612]/10 bg-white">
			<div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
				<div className="mb-8 flex items-center gap-3">
					<div className="h-1.5 w-1.5 bg-[#C9A96E]" />
					<p className="text-xs font-medium uppercase tracking-[0.16em] text-[#6D675C]">
						Published
					</p>
				</div>
				<a
					href={featuredPost.href}
					className="group grid grid-cols-1 border border-[#171612]/10 bg-[#FBFAF6] md:grid-cols-[0.85fr_1.15fr]"
				>
					<ArticleThumbnail />
					<div className="flex flex-col justify-between p-6 md:p-8">
						<div>
							<div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.14em] text-[#8B806F]">
								<span>{featuredPost.category}</span>
								<span className="text-[#171612]/25">/</span>
								<span className="inline-flex items-center gap-1.5">
									<Calendar className="h-3.5 w-3.5" />
									{featuredPost.date}
								</span>
								<span className="inline-flex items-center gap-1.5">
									<Clock3 className="h-3.5 w-3.5" />
									{featuredPost.readTime}
								</span>
							</div>
							<h2 className="mt-6 max-w-3xl text-balance text-4xl font-normal leading-tight tracking-[-0.03em] text-[#171612] md:text-6xl">
								{featuredPost.title}
							</h2>
							<p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-[#5F5A50]">
								{featuredPost.description}
							</p>
						</div>
						<div className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-[#171612] transition-colors group-hover:text-[#A77A15]">
							Read article
							<ArrowUpRight className="h-4 w-4" />
						</div>
					</div>
				</a>
			</div>
		</section>
	);
}

function WhyThisBlogExists() {
	return (
		<section className="border-b border-[#171612]/10">
			<div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-16 md:grid-cols-[0.8fr_1.2fr] md:px-10 md:py-20">
				<div>
					<p className="text-xs font-medium uppercase tracking-[0.18em] text-[#A77A15]">
						Why publish this
					</p>
					<h2 className="mt-4 text-balance text-4xl font-normal leading-tight tracking-[-0.03em] text-[#171612] md:text-6xl">
						The useful parts of our internal learning loop.
					</h2>
				</div>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					{[
						{
							title: "Client patterns",
							body: "The same bottlenecks show up across operations, sales, support, recruiting, and engineering agent systems.",
						},
						{
							title: "Hive lessons",
							body: "We're using Hive internally while the platform is still in beta, so the writing is grounded in our own operating system.",
						},
						{
							title: "Practical choices",
							body: "We want buyers and builders to understand the tradeoffs before they pick memory tools, agent platforms, or security models.",
						},
					].map((item) => (
						<div key={item.title} className="border border-[#171612]/10 bg-white p-5">
							<h3 className="text-xl font-normal tracking-[-0.02em] text-[#171612]">
								{item.title}
							</h3>
							<p className="mt-3 text-pretty text-sm leading-6 text-[#5F5A50]">
								{item.body}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

function HiveWaitlistSection() {
	return (
		<section className="bg-white">
			<div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 py-16 md:grid-cols-[0.9fr_1.1fr] md:px-10 md:py-20">
				<div>
					<p className="text-xs font-medium uppercase tracking-[0.18em] text-[#A77A15]">
						Hive beta
					</p>
					<h2 className="mt-4 text-balance text-4xl font-normal leading-tight tracking-[-0.03em] text-[#171612] md:text-6xl">
						Join the waitlist for the platform behind the learnings.
					</h2>
					<p className="mt-5 max-w-xl text-pretty text-base leading-7 text-[#5F5A50]">
						Hive is a workspace for humans and AI employees. Think persistent
						memory, business context, security policy, tool access, and
						reliability loops in one place.
					</p>
					<HivePlatformPreview className="mt-8 max-w-xl" />
					<a
						href={DISCOVERY_CALL_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-7 inline-flex h-12 items-center justify-center gap-2 border border-[#171612]/12 bg-[#FBFAF6] px-5 text-sm font-semibold text-[#171612] transition-colors hover:border-[#A77A15]/50"
					>
						Need agents now? Book the pilot
						<ArrowUpRight className="h-4 w-4" />
					</a>
				</div>
				<div className="border border-[#171612]/10 bg-[#FBFAF6] p-5 md:p-6">
					<HiveWaitlistForm source="Signals index" />
				</div>
			</div>
		</section>
	);
}

function SignalRow({
	icon: Icon,
	label,
	status,
	href,
}: {
	icon: typeof BrainCircuit;
	label: string;
	status: string;
	href?: string;
}) {
	const content = (
		<>
			<Icon className="size-4 shrink-0 text-[#BEFF00]" />
			<span className="min-w-0 text-sm leading-5 text-white/82">
				{label}
			</span>
			<span
				className={
					status === "Available"
						? "col-start-2 inline-flex h-8 w-[118px] shrink-0 items-center justify-center border border-[#BEFF00]/30 bg-[#BEFF00]/10 px-2 text-[11px] font-medium tracking-[0.04em] text-[#BEFF00] sm:col-start-auto"
						: "col-start-2 inline-flex h-8 w-[118px] shrink-0 items-center justify-center border border-white/10 bg-white/[0.03] px-2 text-[11px] font-medium tracking-[0.04em] text-white/46 sm:col-start-auto"
				}
			>
				{status}
			</span>
		</>
	);

	if (href) {
		return (
			<a
				href={href}
				className="grid min-h-16 grid-cols-[1rem_minmax(0,1fr)] items-center gap-x-4 gap-y-2 px-4 py-3 transition-colors hover:bg-white/[0.03] sm:grid-cols-[1rem_minmax(0,1fr)_auto] sm:px-5"
			>
				{content}
			</a>
		);
	}

	return (
		<div className="grid min-h-16 grid-cols-[1rem_minmax(0,1fr)] items-center gap-x-4 gap-y-2 px-4 py-3 sm:grid-cols-[1rem_minmax(0,1fr)_auto] sm:px-5">
			{content}
		</div>
	);
}

function ArticleThumbnail() {
	return (
		<div
			aria-hidden="true"
			className="relative min-h-[320px] overflow-hidden bg-[#171612] p-5 text-white md:min-h-[440px] md:p-6"
		>
			<div className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:42px_42px]" />
			<div className="relative flex h-full flex-col justify-between border border-white/10 p-4 md:p-5">
				<div className="flex items-center justify-between gap-4">
					<div className="inline-flex w-fit items-center gap-2 border border-white/15 bg-white/[0.04] px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-[#D8C497]">
						<Sparkles className="size-4" />
						First Signal
					</div>
					<span className="font-mono text-xs uppercase tracking-[0.14em] text-white/38">
						001
					</span>
				</div>

				<div className="my-8 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
					<div className="space-y-3">
						{["Docs", "Calls", "CRM"].map((source) => (
							<div
								key={source}
								className="border border-white/10 bg-white/[0.035] px-3 py-2 text-xs uppercase tracking-[0.14em] text-white/58"
							>
								{source}
							</div>
						))}
					</div>
					<div className="relative flex size-24 items-center justify-center rounded-full border border-[#C9A96E]/45 bg-[#C9A96E]/10 transition-transform duration-200 group-hover:scale-[1.03] sm:size-28">
						<div className="absolute inset-3 rounded-full border border-white/10" />
						<BrainCircuit className="size-9 text-[#D8C497]" />
					</div>
					<div className="space-y-3">
						{["Memory", "Policy", "Context"].map((output) => (
							<div
								key={output}
								className="border border-[#C9A96E]/22 bg-[#C9A96E]/[0.08] px-3 py-2 text-xs uppercase tracking-[0.14em] text-[#D8C497]"
							>
								{output}
							</div>
						))}
					</div>
				</div>

				<div className="grid grid-cols-2 gap-3 text-sm text-white/72">
					{["Memory APIs", "Company brain", "Security model", "Agent context"].map(
						(item) => (
							<span key={item} className="border border-white/10 bg-white/[0.03] p-3">
								{item}
							</span>
						),
					)}
				</div>
			</div>
		</div>
	);
}
