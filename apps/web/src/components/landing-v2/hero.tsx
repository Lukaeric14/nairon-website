import { useEffect, useState, type ComponentType, type SVGProps } from "react";
import {
	ArrowRightIcon,
	ArrowUpRightIcon,
	ChevronDownIcon,
	BuildingOffice2Icon,
	BuildingOfficeIcon,
	BuildingStorefrontIcon,
	SunIcon,
	TruckIcon,
	HeartIcon,
	CpuChipIcon,
	PresentationChartLineIcon,
	ChatBubbleLeftRightIcon,
	Cog6ToothIcon,
	CircleStackIcon,
	PencilSquareIcon,
	BoltIcon,
	UserGroupIcon,
	AdjustmentsHorizontalIcon,
	ClipboardDocumentCheckIcon,
	AcademicCapIcon,
	ArrowPathIcon,
	InformationCircleIcon,
	EnvelopeIcon,
	BriefcaseIcon,
	LinkIcon,
} from "@heroicons/react/24/outline";
import { DsButton } from "@/components/ui/ds-button";
import { slugify } from "@/content/verticals";
import { CAL_ATTRS } from "./cal";
import { HeroDots } from "./hero-dots";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;
type MenuItem = { title: string; desc: string; icon: Icon; href: string };
type MegaMenu = {
	id: string;
	label: string;
	items: MenuItem[];
	cta?: { prompt: string; label: string; href: string };
	/** Optional featured card pinned to the right of the panel, CTA at bottom. */
	card?: { eyebrow: string; title: string; body: string; ctaLabel: string; href: string };
};

// Two mega-menus. Items render as a two-column grid of icon + title + blurb;
// Solutions adds a highlighted CTA bar at the bottom. Exported so the footer
// reuses the same Industries/Solutions lists (single source of truth).
export const MENUS: MegaMenu[] = [
	{
		id: "industries",
		label: "Industries",
		items: [
			{
				title: "Property management",
				desc: "AI teammates for leasing, maintenance, and resident ops.",
				icon: BuildingOffice2Icon,
				href: "#",
			},
			{
				title: "Commercial real estate",
				desc: "Automate reporting, comps, and tenant workflows.",
				icon: BuildingOfficeIcon,
				href: "#",
			},
			{
				title: "Solar & renewables",
				desc: "Speed up quoting, scheduling, and customer follow-up.",
				icon: SunIcon,
				href: "#",
			},
			{
				title: "Logistics & 3PL",
				desc: "Automate dispatch, tracking, and back-office ops.",
				icon: TruckIcon,
				href: "#",
			},
			{
				title: "Franchises",
				desc: "Standardize operations across every location.",
				icon: BuildingStorefrontIcon,
				href: "#",
			},
			{
				title: "Healthcare staffing",
				desc: "Fill shifts faster with less manual coordination.",
				icon: HeartIcon,
				href: "#",
			},
			{
				title: "Software & technology",
				desc: "AI teammates for support, GTM, and operations.",
				icon: CpuChipIcon,
				href: "#",
			},
		],
		card: {
			eyebrow: "Built for your industry",
			title: "See it in your operations",
			body: "Get a tailored walkthrough of AI employees built around your real workflows.",
			ctaLabel: "Book a demo",
			href: "#",
		},
	},
	{
		id: "solutions",
		label: "Solutions",
		items: [
			{
				title: "Revenue & GTM",
				desc: "AI SDRs, proposal assistants, and pipeline operations.",
				icon: PresentationChartLineIcon,
				href: "#",
			},
			{
				title: "Customer support",
				desc: "Resolve tickets fast, with a human always in the loop.",
				icon: ChatBubbleLeftRightIcon,
				href: "#",
			},
			{
				title: "Back office operations",
				desc: "From days of manual work to minutes of execution.",
				icon: Cog6ToothIcon,
				href: "#",
			},
			{
				title: "Data & research",
				desc: "Extract, structure, and route information at scale.",
				icon: CircleStackIcon,
				href: "#",
			},
			{
				title: "Content & marketing",
				desc: "Briefs to publish-ready copy, on brand every time.",
				icon: PencilSquareIcon,
				href: "#",
			},
			{
				title: "Workflow automation",
				desc: "Wire agents into the tools you already run.",
				icon: BoltIcon,
				href: "#",
			},
		],
		cta: {
			prompt: "Not sure where AI fits?",
			label: "Book an AI opportunity audit",
			href: "#",
		},
	},
	{
		id: "ai-training",
		label: "AI Training",
		items: [
			{
				title: "Workforce AI Training",
				desc: "Upskill your team to work alongside AI agents and drive real output.",
				icon: UserGroupIcon,
				href: "https://academy.naironai.com",
			},
			{
				title: "Executive AI Program",
				desc: "Help leaders build AI fluency and make confident deployment decisions.",
				icon: PresentationChartLineIcon,
				href: "https://academy.naironai.com",
			},
		],
		cta: {
			prompt: "Ready to build an AI-ready organization?",
			label: "Explore training programs",
			href: "https://academy.naironai.com",
		},
	},
	{
		id: "company",
		label: "Company",
		items: [
			{
				title: "How we work",
				desc: "Weeks to working AI, not months of planning.",
				icon: ArrowPathIcon,
				href: "/#how-it-works",
			},
			{
				title: "About",
				desc: "From insight to execution without interruption.",
				icon: InformationCircleIcon,
				href: "/about",
			},
			{
				title: "Contact us",
				desc: "Make your AI real now.",
				icon: EnvelopeIcon,
				href: "/contact",
			},
			{
				title: "Careers",
				desc: "Move like a startup, build like an empire.",
				icon: BriefcaseIcon,
				href: "/careers",
			},
		],
		card: {
			eyebrow: "Work with us",
			title: "Book an AI audit",
			body: "A free session to map where AI can unlock the most value in your business.",
			ctaLabel: "Book a call",
			href: "#",
		},
	},
];

// Standalone nav links (not mega-menus). Exported so the footer surfaces the
// same set and the two never drift.
export const LINKS: { label: string; href: string; external?: boolean }[] = [
	{ label: "AI Academy", href: "https://academy.naironai.com", external: true },
];

function MegaPanel({ menu }: { menu: MegaMenu }) {
	return (
		<div className="absolute inset-x-0 top-full z-40 border-b border-ds-border/70 bg-ds-shell shadow-[0_24px_40px_-24px_rgba(0,0,0,0.18)]">
			<div className="mx-auto max-w-6xl px-5 py-10">
				<div
					className={`flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-12 ${
						menu.card ? "" : "lg:justify-center"
					}`}
				>
					<div
						className={`grid grid-cols-2 gap-x-10 gap-y-8 ${
							menu.card ? "flex-1" : "lg:max-w-3xl"
						}`}
					>
						{menu.items.map((item) => {
							const Ico = item.icon;
							return (
								<a
										key={item.title}
										href={item.href && item.href !== "#" ? item.href : `/${menu.id}/${slugify(item.title)}`}
										className="group/item flex gap-3.5"
									>
									<Ico
										className="mt-0.5 size-5 shrink-0 text-ds-text-tertiary transition-colors group-hover/item:[color:var(--brand-blue)]"
										strokeWidth={1.5}
									/>
									<div>
										<div className="text-[0.9375rem] font-medium text-ds-text-primary transition-colors group-hover/item:[color:var(--brand-blue)]">
											{item.title}
										</div>
										<p className="mt-1 max-w-[26ch] text-[0.8125rem] leading-relaxed text-ds-text-tertiary">
											{item.desc}
										</p>
									</div>
								</a>
							);
						})}
					</div>

					{menu.card && (
						<div className="flex w-full shrink-0 flex-col rounded-xl border border-ds-border bg-ds-surface p-6 lg:w-72">
							<div className="font-geist-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-ds-text-tertiary">
								{menu.card.eyebrow}
							</div>
							<h3 className="mt-3 text-[1.125rem] font-medium leading-snug text-ds-text-primary">
								{menu.card.title}
							</h3>
							<p className="mt-2 text-[0.8125rem] leading-relaxed text-ds-text-tertiary">
								{menu.card.body}
							</p>
							<a
								href={menu.card.href}
								{...CAL_ATTRS}
								className="group/card mt-6 inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-[0.875rem] font-medium text-white transition-all hover:brightness-110 lg:mt-auto"
								style={{ backgroundColor: "var(--brand-blue)" }}
							>
								{menu.card.ctaLabel}
								<ArrowUpRightIcon className="size-4 transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
							</a>
						</div>
					)}
				</div>

				{menu.cta && (
					<div
						className="mx-auto mt-8 flex max-w-3xl items-center gap-3 rounded-md px-5 py-4"
						style={{ backgroundColor: "color-mix(in srgb, var(--brand-blue) 9%, transparent)" }}
					>
						<span
							className="size-2 shrink-0 rounded-full"
							style={{ backgroundColor: "var(--brand-blue)" }}
						/>
						<span className="text-[0.875rem] font-medium text-ds-text-primary">
							{menu.cta.prompt}
						</span>
						<a
							href={menu.cta.href}
							{...CAL_ATTRS}
							className="group/cta ml-1 inline-flex items-center gap-1 font-geist-mono text-[0.75rem] font-medium uppercase tracking-[0.1em]"
							style={{ color: "var(--brand-blue)" }}
						>
							{menu.cta.label}
							<ArrowUpRightIcon className="size-3.5 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
						</a>
					</div>
				)}
			</div>
		</div>
	);
}

export function Navbar() {
	const [open, setOpen] = useState<string | null>(null);
	const activeMenu = MENUS.find((m) => m.id === open) ?? null;

	return (
		<header
			className="sticky top-0 z-50 border-b border-ds-border/70 bg-ds-shell/85 backdrop-blur-md"
			onMouseLeave={() => setOpen(null)}
		>
			<nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
				<a href="/" className="flex items-center">
					<img
						src="/nairon-logo.png"
						alt="Nairon"
						width={600}
						height={120}
						className="h-7 w-auto [filter:brightness(0)]"
					/>
				</a>

				<div className="hidden items-center gap-10 md:flex">
					{MENUS.map((menu) => {
						const isOpen = open === menu.id;
						return (
							<button
								key={menu.id}
								type="button"
								onMouseEnter={() => setOpen(menu.id)}
								onFocus={() => setOpen(menu.id)}
								className={`flex items-center gap-1 text-[0.875rem] font-medium transition-colors ${
									isOpen
										? "underline decoration-2 underline-offset-[6px]"
										: "text-ds-text-secondary hover:text-ds-text-primary"
								}`}
								style={isOpen ? { color: "var(--brand-blue)" } : undefined}
							>
								{menu.label}
								<ChevronDownIcon
									className={`size-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
									strokeWidth={2}
								/>
							</button>
						);
					})}
					{LINKS.map((item) => (
						<a
							key={item.label}
							href={item.href}
							onMouseEnter={() => setOpen(null)}
							{...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
							className="text-[0.875rem] font-medium text-ds-text-secondary transition-colors hover:text-ds-text-primary"
						>
							{item.label}
						</a>
					))}
				</div>

				<div className="flex items-center gap-2">
					<DsButton variant="brand" size="md" {...CAL_ATTRS}>
						Book AI Audit
						<ArrowRightIcon />
					</DsButton>
				</div>
			</nav>

			{activeMenu && <MegaPanel menu={activeMenu} />}
		</header>
	);
}

// Kept for re-use when there's a real announcement (see LandingHero).
export function AnnouncementPill() {
	return (
		<a
			href="#"
			className="inline-flex items-center gap-2.5 rounded-full border border-ds-border bg-ds-surface-raised py-1 pl-1 pr-3 text-[0.8125rem] shadow-sm transition-colors hover:bg-ds-surface-hover"
		>
			<span
				className="rounded-full px-2.5 py-0.5 text-[0.6875rem] font-medium text-white"
				style={{ backgroundColor: "var(--brand-blue)" }}
			>
				New
			</span>
			<span className="font-medium text-ds-text-primary">
				The Nairon brand is live
			</span>
			<ArrowRightIcon className="size-3.5 text-ds-text-tertiary" />
		</a>
	);
}

// Rotating roles for the hero typewriter. First entry holds longest as the
// "default" headline; the rest cycle to show the breadth of the AI workforce.
const HERO_ROLES = [
	"an AI workforce",
	"an AI Financial Analyst",
	"an AI Operations Manager",
	"an AI Compliance Analyst",
	"an AI Executive Assistant",
	"an AI Research Analyst",
];

// Typewriter that types a role, holds, deletes, and advances to the next.
function RoleTypewriter() {
	const [index, setIndex] = useState(0);
	const [text, setText] = useState("");
	const [phase, setPhase] = useState<"typing" | "holding" | "deleting">(
		"typing",
	);

	useEffect(() => {
		// Trailing "." is the brand full stop — typed and deleted with the role.
		const full = `${HERO_ROLES[index]}.`;
		let timeout: ReturnType<typeof setTimeout>;

		if (phase === "typing") {
			if (text.length < full.length) {
				timeout = setTimeout(() => setText(full.slice(0, text.length + 1)), 60);
			} else {
				// Hold the first (default) role longer than the rotating ones.
				timeout = setTimeout(() => setPhase("holding"), index === 0 ? 2600 : 1500);
			}
		} else if (phase === "holding") {
			timeout = setTimeout(() => setPhase("deleting"), 200);
		} else {
			if (text.length > 0) {
				timeout = setTimeout(() => setText(full.slice(0, text.length - 1)), 28);
			} else {
				setIndex((i) => (i + 1) % HERO_ROLES.length);
				setPhase("typing");
			}
		}

		return () => clearTimeout(timeout);
	}, [text, phase, index]);

	return (
		<span style={{ color: "var(--brand-blue)" }}>
			{text}
			<span
				aria-hidden="true"
				className="animate-cursor-blink ml-1 inline-block w-[3px] -translate-y-[0.06em] rounded-full align-middle"
				style={{
					height: "0.88em",
					backgroundColor: "var(--brand-blue)",
				}}
			/>
		</span>
	);
}

export function LandingHero() {
	return (
		<section className="relative bg-ds-surface font-geist text-ds-text-primary">
			{/* ── Hero region — prominent wave-dot field behind the content ── */}
			<div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden">
				<HeroDots className="pointer-events-none absolute inset-0 z-0" />

				<div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 py-20 text-center">
					{/* Hidden for now — re-enable when we have an announcement */}
					{/* <AnnouncementPill /> */}

					<h1 className="mt-8 text-5xl font-medium leading-[1.04] tracking-tight sm:text-6xl md:text-7xl">
						Power Your Business with
						<br />
						<RoleTypewriter />
					</h1>

					<p className="mt-6 max-w-2xl text-balance text-[1.0625rem] leading-relaxed text-ds-text-secondary">
						Nairon builds AI employees around your real workflows and runs them
						inside the systems you already use. Measurable outcomes, no migrations.
					</p>

					<div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
						<DsButton variant="brand" size="lg" {...CAL_ATTRS}>
							Book an AI opportunity audit
							<ArrowRightIcon />
						</DsButton>
					</div>
				</div>
			</div>
		</section>
	);
}
