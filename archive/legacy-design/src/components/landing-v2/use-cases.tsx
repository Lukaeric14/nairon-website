// "Use cases" — a header (title + supporting copy + a book-a-demo pill) over a
// three-up grid of notched cards. Each card introduces a family of AI agents
// (Finance / Revenue / Logistics Ops) with a product screenshot, a title, a
// short capability list, and two CTAs (view case study / view demo).
// Screenshots are placeholders for now.

import type { ComponentType, SVGProps } from "react";
import {
	AcademicCapIcon,
	ArrowsRightLeftIcon,
	ArrowTrendingUpIcon,
	ArrowUpRightIcon,
	BookOpenIcon,
	ChartBarIcon,
	ChatBubbleLeftRightIcon,
	CheckBadgeIcon,
	ClipboardDocumentListIcon,
	Cog6ToothIcon,
	DocumentTextIcon,
	LinkIcon,
	PaperAirplaneIcon,
	QueueListIcon,
	ShieldCheckIcon,
	WrenchIcon,
} from "@heroicons/react/24/outline";
import { CAL_ATTRS } from "./cal";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

interface UseCase {
	n: string;
	icon: Icon;
	title: string;
	capabilities: { icon: Icon; label: string }[];
	/** Optional product screenshot; falls back to a window placeholder. */
	image?: string;
	imageAlt?: string;
	caseStudyHref: string;
	demoHref: string;
}

const USE_CASES: UseCase[] = [
	{
		n: "01",
		icon: Cog6ToothIcon,
		title: "Operations Agents",
		capabilities: [
			{ icon: WrenchIcon, label: "Process exception triage" },
			{ icon: ArrowsRightLeftIcon, label: "Cross-system reconciliation" },
			{ icon: ShieldCheckIcon, label: "SLA and quality monitoring" },
			{ icon: ChartBarIcon, label: "Reporting and KPI summaries" },
		],
		caseStudyHref: "#case-operations",
		demoHref: "#demo-operations",
	},
	{
		n: "02",
		icon: ArrowTrendingUpIcon,
		title: "Revenue Agents",
		capabilities: [
			{ icon: PaperAirplaneIcon, label: "Outbound research and personalization" },
			{ icon: QueueListIcon, label: "Inbound lead triage and routing" },
			{ icon: ClipboardDocumentListIcon, label: "Deal and pipeline orchestration" },
			{ icon: CheckBadgeIcon, label: "Forecast and commission validation" },
		],
		caseStudyHref: "#case-revenue",
		demoHref: "#demo-revenue",
	},
	{
		n: "03",
		icon: AcademicCapIcon,
		title: "Sales Enablement Agents",
		capabilities: [
			{ icon: DocumentTextIcon, label: "Proposal and quote generation" },
			{ icon: ChatBubbleLeftRightIcon, label: "Call summaries and follow-ups" },
			{ icon: BookOpenIcon, label: "Battlecards and content surfacing" },
			{ icon: LinkIcon, label: "CRM auto-enrichment" },
		],
		caseStudyHref: "#case-enablement",
		demoHref: "#demo-enablement",
	},
];

// Top-right chamfer size for the screenshot panels.
const CHAMFER = 30;
const PANEL_CLIP = `polygon(0 0, calc(100% - ${CHAMFER}px) 0, 100% ${CHAMFER}px, 100% 100%, 0 100%)`;

// Graphics hidden for now — flip to true once real screenshots/animations land.
const SHOW_GRAPHIC = false;

export function UseCases() {
	return (
		<section className="bg-ds-surface font-geist text-ds-text-primary">
			<div className="mx-auto max-w-7xl px-5 pb-40 pt-24">
				{/* ── Header ─────────────────────────────────────────────── */}
				<div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<h2 className="text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
							Use cases
						</h2>
						<p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-ds-text-secondary">
							See how leading firms are streamlining operations and scaling insight.
						</p>
					</div>

					<a
						href="#book-demo"
						{...CAL_ATTRS}
						className="group inline-flex items-center gap-3 rounded-none border border-black px-6 py-3.5 text-white transition-all hover:brightness-110"
						style={{ backgroundColor: "var(--brand-blue)" }}
					>
						<ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
						<span className="font-geist-mono text-[0.8125rem] font-medium uppercase tracking-[0.12em]">
							Book a demo
						</span>
					</a>
				</div>

				{/* ── Cards ──────────────────────────────────────────────── */}
				<div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-7">
					{USE_CASES.map((uc) => (
						<UseCaseCard key={uc.title} {...uc} />
					))}
				</div>
			</div>
		</section>
	);
}

function UseCaseCard({
	n,
	icon: Ico,
	title,
	capabilities,
	image,
	imageAlt,
	caseStudyHref,
	demoHref,
}: UseCase) {
	return (
		<article className="flex flex-col">
			{/* Screenshot panel with a folded top-right corner — hidden for now */}
			{SHOW_GRAPHIC && (
				<div className="relative">
					<div
						className="relative aspect-[4/3] overflow-hidden bg-[#E9E9E9]"
						style={{ clipPath: PANEL_CLIP }}
					>
						{image ? (
							<img
								src={image}
								alt={imageAlt ?? title}
								className="absolute inset-x-6 top-7 w-[calc(100%-3rem)] shadow-[0_20px_50px_-25px_rgba(0,0,0,0.4)]"
							/>
						) : (
							<WindowMock />
						)}
					</div>
					{/* the lit fold triangle sitting in the chamfer */}
					<div
						className="pointer-events-none absolute right-0 top-0 bg-[#F4F4F2] shadow-[-1px_2px_3px_rgba(0,0,0,0.06)]"
						style={{
							width: CHAMFER,
							height: CHAMFER,
							clipPath: `polygon(0 0, 100% 100%, 0 100%)`,
						}}
					/>
				</div>
			)}

			{/* Icon + eyebrow + title + rule */}
			<div className="mt-6">
				<Ico className="size-6 text-ds-text-primary" strokeWidth={1.5} />
				<div className="mt-4 text-[0.8125rem] text-ds-text-tertiary">Agent {n}</div>
				<h3 className="mt-1 text-[1.375rem] font-medium leading-snug tracking-tight">
					{title}
				</h3>
				<div className="mt-4 border-t border-ds-text-primary/15" />
			</div>

			{/* Capabilities */}
			<div className="mt-5">
				<div className="font-geist-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-ds-text-tertiary">
					Capabilities
				</div>
				<ul className="mt-4 space-y-3.5">
					{capabilities.map((c) => {
						const CapIco = c.icon;
						return (
							<li key={c.label} className="flex items-center gap-3">
								<CapIco
									className="size-[1.125rem] shrink-0"
									strokeWidth={1.5}
									style={{ color: "var(--brand-blue)" }}
								/>
								<span className="text-[0.9375rem] text-ds-text-primary">{c.label}</span>
							</li>
						);
					})}
				</ul>
			</div>

			{/* CTAs */}
			<div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
				<CtaLink href={caseStudyHref} label="View case study" primary />
				<CtaLink href={demoHref} label="View demo" cal />
			</div>
		</article>
	);
}

function CtaLink({
	href,
	label,
	primary,
	cal,
}: {
	href: string;
	label: string;
	primary?: boolean;
	/** When true, clicking opens the Cal booking modal. */
	cal?: boolean;
}) {
	return (
		<a
			href={href}
			{...(cal ? CAL_ATTRS : {})}
			className="group inline-flex items-center gap-1 text-[0.875rem] font-medium underline-offset-4 hover:underline"
			style={{ color: primary ? "var(--brand-blue)" : "var(--ds-text-secondary)" }}
		>
			{label}
			<ArrowUpRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
		</a>
	);
}

/* ── Placeholder screenshot ───────────────────────────────────────────
   A faint dashboard window that peeks up from the bottom of the panel —
   stands in until a real product screenshot is dropped in. */
function WindowMock() {
	return (
		<div className="absolute inset-x-6 top-7 bottom-[-1.5rem] overflow-hidden bg-white shadow-[0_20px_50px_-25px_rgba(0,0,0,0.4)]">
			<div className="flex h-7 items-center gap-1.5 border-b border-black/5 px-3">
				<span className="size-2 rounded-full bg-black/15" />
				<span className="size-2 rounded-full bg-black/15" />
				<span className="size-2 rounded-full bg-black/15" />
			</div>
			<div className="space-y-3 p-4">
				<div className="h-2.5 w-1/3 rounded-sm bg-black/10" />
				<div className="grid grid-cols-3 gap-2">
					<div className="h-12 bg-black/[0.04]" />
					<div className="h-12 bg-black/[0.04]" />
					<div className="h-12 bg-black/[0.04]" />
				</div>
				<div className="h-2 w-full rounded-sm bg-black/[0.06]" />
				<div className="h-2 w-5/6 rounded-sm bg-black/[0.06]" />
				<div className="h-2 w-4/6 rounded-sm bg-black/[0.06]" />
				<div className="mt-2 space-y-1.5">
					<div className="h-6 w-full bg-black/[0.03]" />
					<div className="h-6 w-full bg-black/[0.03]" />
					<div className="h-6 w-full bg-black/[0.03]" />
				</div>
			</div>
		</div>
	);
}
