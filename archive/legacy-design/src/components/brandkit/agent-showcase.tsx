import type { ComponentType, SVGProps } from "react";
import {
	ArrowUpRightIcon,
	FunnelIcon,
	SparklesIcon,
	PresentationChartLineIcon,
	DocumentTextIcon,
	ClipboardDocumentCheckIcon,
	InboxStackIcon,
	BookOpenIcon,
	ArrowsRightLeftIcon,
	ChartBarIcon,
	BoltIcon,
	UserGroupIcon,
	CalendarDaysIcon,
	CheckBadgeIcon,
	DocumentCheckIcon,
	Squares2X2Icon,
} from "@heroicons/react/24/outline";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;
type Tone = "grey" | "deep" | "bright";

type Agent = {
	index: string;
	title: string;
	description: string;
	tone: Tone;
	capabilities: { icon: Icon; label: string }[];
};

const AGENTS: Agent[] = [
	{
		index: "01",
		title: "Revenue Ops Agents",
		tone: "grey",
		description:
			"Built for your sales org after mapping every handoff from lead intake through deal desk, forecasting, and customer handoff. Deployed across your existing CRM, call recording, and enablement tools.",
		capabilities: [
			{ icon: FunnelIcon, label: "Lead triage and routing" },
			{ icon: SparklesIcon, label: "CRM auto-enrichment" },
			{ icon: PresentationChartLineIcon, label: "Pipeline forecasting" },
			{ icon: DocumentTextIcon, label: "Proposal drafting" },
			{ icon: ClipboardDocumentCheckIcon, label: "Meeting prep briefs" },
		],
	},
	{
		index: "02",
		title: "Support Ops Agents",
		tone: "deep",
		description:
			"Built for your support team after mapping how tickets actually move across triage, resolution, and escalation. Deployed across your helpdesk, knowledge base, and on-call rotations with no migration.",
		capabilities: [
			{ icon: InboxStackIcon, label: "Ticket triage and resolution" },
			{ icon: BookOpenIcon, label: "Knowledge base sync" },
			{ icon: ArrowsRightLeftIcon, label: "Escalation routing" },
			{ icon: ChartBarIcon, label: "CSAT trend tracking" },
			{ icon: BoltIcon, label: "Macro suggestion" },
		],
	},
	{
		index: "03",
		title: "People Ops Agents",
		tone: "bright",
		description:
			"Built for your recruiting and people team after mapping the path from inbound applicant to onboarded hire. Deployed across your ATS, calendar, and HRIS so nothing falls between the seams.",
		capabilities: [
			{ icon: UserGroupIcon, label: "Inbound applicant screening" },
			{ icon: CalendarDaysIcon, label: "Interview scheduling" },
			{ icon: CheckBadgeIcon, label: "Take-home review" },
			{ icon: DocumentCheckIcon, label: "Offer letter drafting" },
			{ icon: Squares2X2Icon, label: "Onboarding orchestration" },
		],
	},
];

// Per-tone visual recipe. Colors reference the active palette via CSS vars so
// the whole section re-skins when the brandkit page swaps the palette.
const TONES: Record<
	Tone,
	{
		card: string;
		dots: string;
		label: string;
		title: string;
		body: string;
		overline: string;
		icon: string;
		iconText: string;
		primaryBtn: string;
		secondaryBtn: string;
	}
> = {
	grey: {
		card: "bg-ds-shell",
		dots: "var(--brand-blue)",
		label: "text-ds-text-tertiary",
		title: "text-ds-text-primary",
		body: "text-ds-text-secondary",
		overline: "text-ds-text-tertiary",
		icon: "var(--brand-mid)",
		iconText: "text-ds-text-primary",
		primaryBtn: "bg-[var(--brand-blue)] text-white hover:brightness-110",
		secondaryBtn: "bg-[var(--brand-deep)] text-white hover:brightness-125",
	},
	deep: {
		card: "bg-[var(--brand-deep)]",
		dots: "var(--brand-blue)",
		label: "text-white/55",
		title: "text-white",
		body: "text-white/65",
		overline: "text-white/45",
		icon: "var(--brand-mid)",
		iconText: "text-white",
		primaryBtn: "bg-white text-[var(--brand-deep)] hover:bg-white/90",
		secondaryBtn: "bg-[var(--brand-blue)] text-white hover:brightness-110",
	},
	bright: {
		card: "bg-[var(--brand-blue)]",
		dots: "rgba(255,255,255,0.85)",
		label: "text-white/65",
		title: "text-white",
		body: "text-white/80",
		overline: "text-white/60",
		icon: "rgba(255,255,255,0.92)",
		iconText: "text-white",
		primaryBtn: "bg-[var(--brand-deep)] text-white hover:brightness-125",
		secondaryBtn: "bg-white text-[var(--brand-blue)] hover:bg-white/90",
	},
};

function CardButton({
	className,
	children,
}: {
	className: string;
	children: React.ReactNode;
}) {
	return (
		<button
			type="button"
			className={`inline-flex w-full items-center justify-center gap-1.5 rounded-md px-5 py-3 text-[0.8125rem] font-medium transition-all md:w-56 ${className}`}
		>
			{children}
			<ArrowUpRightIcon className="size-4" />
		</button>
	);
}

function AgentCard({ agent }: { agent: Agent }) {
	const t = TONES[agent.tone];
	return (
		<div className={`rounded-2xl px-6 py-8 sm:px-10 sm:py-10 ${t.card}`}>
			<div className="mb-6 flex gap-1.5">
				{[0, 1, 2].map((i) => (
					<span
						key={i}
						className="size-2.5 rounded-[2px]"
						style={{ backgroundColor: t.dots }}
					/>
				))}
			</div>

			<div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr_auto] lg:gap-10">
				{/* Left — identity */}
				<div className="max-w-md">
					<div className={`mb-2 text-sm ${t.label}`}>Agent {agent.index}</div>
					<h3
						className={`mb-4 text-2xl font-medium tracking-tight sm:text-3xl ${t.title}`}
					>
						{agent.title}
					</h3>
					<p className={`text-[0.9375rem] leading-relaxed ${t.body}`}>
						{agent.description}
					</p>
				</div>

				{/* Middle — capabilities */}
				<div>
					<div
						className={`mb-4 text-[0.6875rem] font-medium uppercase tracking-[0.16em] ${t.overline}`}
					>
						Capabilities
					</div>
					<ul className="space-y-3.5">
						{agent.capabilities.map((cap) => {
							const Ico = cap.icon;
							return (
								<li key={cap.label} className="flex items-center gap-3">
									<Ico
										className="size-5 shrink-0"
										strokeWidth={1.5}
										style={{ color: t.icon }}
									/>
									<span className={`text-[0.9375rem] ${t.iconText}`}>
										{cap.label}
									</span>
								</li>
							);
						})}
					</ul>
				</div>

				{/* Right — actions */}
				<div className="flex flex-col gap-2.5 lg:pt-7">
					<CardButton className={t.primaryBtn}>View case study</CardButton>
					<CardButton className={t.secondaryBtn}>View demo</CardButton>
				</div>
			</div>
		</div>
	);
}

export function AgentShowcase() {
	return (
		<section className="font-geist">
			<div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
				<h2 className="max-w-2xl text-3xl font-medium tracking-tight text-ds-text-primary sm:text-4xl">
					Nairon Agents Live in Production
				</h2>
				<p className="max-w-sm text-[0.9375rem] leading-relaxed text-ds-text-secondary md:text-right">
					These are real AI employees deployed inside teams, executing work that
					previously required entire operational headcount.
				</p>
			</div>

			<div className="space-y-4">
				{AGENTS.map((agent) => (
					<AgentCard key={agent.index} agent={agent} />
				))}
			</div>
		</section>
	);
}
