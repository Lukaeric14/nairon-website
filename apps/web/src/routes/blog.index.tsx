import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowUpRight,
	BookOpenText,
	BrainCircuit,
	Calendar,
	CheckCircle2,
	Clock3,
	LockKeyhole,
	Network,
	Sparkles,
} from "lucide-react";
import { CandidateModal } from "@/components/landing/candidate-modal";
import { Footer, Navbar } from "@/components/landing";
import { HireModal } from "@/components/landing/hire-modal";
import { HiveWaitlistForm } from "@/components/landing/hive-waitlist-form";
import { ModalProvider } from "@/components/landing/modal-provider";
import { DISCOVERY_CALL_URL } from "@/lib/links";
import { seoHead } from "@/lib/seo";

const featuredPost = {
	title: "Solving the Agent Memory problem",
	href: "/blog/solving-the-agent-memory-problem",
	category: "Company memory",
	date: "Apr 29, 2026",
	readTime: "12 min read",
	description:
		"A practical look at Supermemory, Mem0, Zep, Letta, LangMem, company-brain tools, and the memory layer we need for Hive.",
};

export const Route = createFileRoute("/blog/")({
	component: BlogPage,
	head: () =>
		seoHead({
			title: "Blog | Nairon AI",
			description:
				"Field notes from Nairon on AI employees, company memory, agent infrastructure, and how we are building Hive.",
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
			<div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pb-16 md:grid-cols-[1.05fr_0.95fr] md:px-10 md:pb-20">
				<div>
					<div className="mb-7 inline-flex items-center gap-2 border border-[#171612]/10 bg-white/70 px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-[#6D675C]">
						<BookOpenText className="h-4 w-4 text-[#A77A15]" />
						Nairon field notes
					</div>
					<h1 className="max-w-4xl text-[48px] font-normal leading-[0.95] tracking-[-0.03em] text-[#171612] md:text-[86px]">
						Data-backed lessons from building Agents.
					</h1>
					<p className="mt-8 max-w-2xl text-lg leading-8 text-[#5F5A50] md:text-xl">
						We use this space to share what we are learning while building AI
						agents for clients, backed by the patterns we see in real
						deployments and by our internal work using Hive to automate Nairon's
						own company processes. The first topic is memory because it decides
						whether agents understand the business or just follow instructions.
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

				<div className="relative min-h-[420px] border border-[#171612]/10 bg-[#171612] p-5 text-white shadow-[18px_18px_0_rgba(201,169,110,0.28)]">
					<div className="absolute inset-5 border border-white/10" />
					<div className="relative flex h-full flex-col justify-between">
						<div>
							<p className="text-xs uppercase tracking-[0.18em] text-[#D8C497]">
								What we are documenting
							</p>
							<div className="mt-8 grid grid-cols-1 gap-3">
								<SignalRow icon={BrainCircuit} label="Agent memory" />
								<SignalRow icon={LockKeyhole} label="Security and access control" />
								<SignalRow icon={CheckCircle2} label="Reliability and evaluation" />
								<SignalRow icon={Network} label="Integrations and interoperability" />
							</div>
						</div>
						<p className="mt-10 border-t border-white/10 pt-5 text-[13px] leading-6 text-white/68">
							Hive is still in beta, but we are already using it internally to
							give AI employees governed access to company memory, business
							context, tool permissions, and the operating decisions they need
							to reason well.
						</p>
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
					<div className="relative min-h-[300px] overflow-hidden bg-[#171612] p-6 text-white md:min-h-[440px]">
						<div className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_20%_20%,rgba(201,169,110,0.34),transparent_28%),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:100%_100%,42px_42px,42px_42px]" />
						<div className="relative flex h-full flex-col justify-between">
							<div className="inline-flex w-fit items-center gap-2 border border-white/15 px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-[#D8C497]">
								<Sparkles className="h-4 w-4" />
								First field note
							</div>
							<div className="grid grid-cols-2 gap-3 text-sm text-white/72">
								<span className="border border-white/10 p-3">Memory APIs</span>
								<span className="border border-white/10 p-3">Company brain</span>
								<span className="border border-white/10 p-3">Hive beta</span>
								<span className="border border-white/10 p-3">Agent context</span>
							</div>
						</div>
					</div>
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
							<h2 className="mt-6 max-w-3xl text-4xl font-normal leading-tight tracking-[-0.03em] text-[#171612] md:text-6xl">
								{featuredPost.title}
							</h2>
							<p className="mt-6 max-w-2xl text-base leading-7 text-[#5F5A50]">
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
					<h2 className="mt-4 text-4xl font-normal leading-tight tracking-[-0.03em] text-[#171612] md:text-6xl">
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
							body: "We are using Hive internally while the platform is still in beta, so the writing is grounded in our own operating system.",
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

function HiveWaitlistSection() {
	return (
		<section className="bg-white">
			<div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 py-16 md:grid-cols-[0.9fr_1.1fr] md:px-10 md:py-20">
				<div>
					<p className="text-xs font-medium uppercase tracking-[0.18em] text-[#A77A15]">
						Hive beta
					</p>
					<h2 className="mt-4 text-4xl font-normal leading-tight tracking-[-0.03em] text-[#171612] md:text-6xl">
						Join the waitlist for the platform behind the learnings.
					</h2>
					<p className="mt-5 max-w-xl text-base leading-7 text-[#5F5A50]">
						Hive is a workspace for humans and AI employees. Think persistent
						memory, business context, security policy, tool access, and
						reliability loops in one place. We are not launching the lander yet,
						but we should know who wants early access.
					</p>
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
					<HiveWaitlistForm source="Blog index" />
				</div>
			</div>
		</section>
	);
}

function SignalRow({
	icon: Icon,
	label,
}: {
	icon: typeof BrainCircuit;
	label: string;
}) {
	return (
		<div className="flex items-center gap-3 border-b border-white/10 pb-3">
			<Icon className="h-4 w-4 text-[#BEFF00]" />
			<span className="text-sm text-white/82">{label}</span>
		</div>
	);
}
