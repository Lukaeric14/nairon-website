import { useState, type ComponentType, type SVGProps } from "react";
import {
	ChevronRightIcon,
	ChevronDownIcon,
	BoltIcon,
	CpuChipIcon,
	LockClosedIcon,
	SparklesIcon,
	UsersIcon,
	Squares2X2Icon,
	HashtagIcon,
	InboxIcon,
	ChatBubbleLeftRightIcon,
	BuildingOffice2Icon,
	StarIcon,
} from "@heroicons/react/24/outline";
import { DsButton } from "@/components/ui/ds-button";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;
type Mode = "agents" | "hive";

type ModeContent = {
	heading: [string, string];
	body: string;
	emphasis: string;
	bodyTail: string;
	panelTitle: string;
	rows: { name: string; role: string }[];
	features: { icon: Icon; title: string; desc: string }[];
};

const CONTENT: Record<Mode, ModeContent> = {
	agents: {
		heading: ["AI employees, built", "around your workflows"],
		body: "Deploy AI employees that execute real operational work end to end across revenue, support, and operations.",
		emphasis: "Each one runs on top of the tools you already use",
		bodyTail: ". No migrations, no new software to learn.",
		panelTitle: "Your agents",
		rows: [
			{ name: "Maya", role: "Chief of Staff" },
			{ name: "Dario", role: "SDR" },
			{ name: "Tessa", role: "Workflow Tester" },
			{ name: "Pia", role: "Proposal Assistant" },
			{ name: "Hemingway", role: "Copywriter" },
		],
		features: [
			{ icon: BoltIcon, title: "Fast", desc: "From scoping to a live agent in weeks, not quarters." },
			{ icon: CpuChipIcon, title: "Powerful", desc: "Runs end-to-end work, not just single tasks." },
			{ icon: LockClosedIcon, title: "Secure", desc: "Runs in your cloud, SOC 2 aligned." },
			{ icon: SparklesIcon, title: "AI powered", desc: "Works with any model you choose." },
		],
	},
	hive: {
		heading: ["One workspace for", "humans and agents"],
		body: "Hive is where your team and your AI employees work side by side: assign work, review output, and stay in the loop.",
		emphasis: "Channels, threads, and approvals keep every agent accountable",
		bodyTail: " to a human on your team.",
		panelTitle: "Your workspace",
		rows: [
			{ name: "Content", role: "6 agents" },
			{ name: "Engineering", role: "4 agents" },
			{ name: "GTM", role: "5 agents" },
			{ name: "Product", role: "3 agents" },
			{ name: "Operations", role: "2 agents" },
		],
		features: [
			{ icon: BoltIcon, title: "Realtime", desc: "Live updates as agents complete work." },
			{ icon: UsersIcon, title: "Collaborative", desc: "Humans and agents in one thread." },
			{ icon: LockClosedIcon, title: "Secure", desc: "Role-based access and approvals." },
			{ icon: Squares2X2Icon, title: "Orchestrated", desc: "Coordinate many agents at once." },
		],
	},
};

function Toggle({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
	return (
		<div className="inline-flex items-center gap-1 rounded-full border border-ds-border bg-ds-surface-hover p-1">
			{(["agents", "hive"] as Mode[]).map((m) => (
				<button
					key={m}
					type="button"
					onClick={() => onChange(m)}
					className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-[0.8125rem] font-medium transition-all ${
						mode === m
							? "bg-ds-surface-raised text-ds-text-primary shadow-sm"
							: "text-ds-text-secondary hover:text-ds-text-primary"
					}`}
				>
					{m === "agents" ? "Nairon Agents" : "Hive"}
					{m === "hive" && (
						<span className="text-[0.6875rem] font-normal text-ds-text-tertiary">
							Coming soon
						</span>
					)}
				</button>
			))}
		</div>
	);
}

/* ── Hive workspace mockup — Slack-style sidebar + channel, anchored to the
   bottom-right of the gradient panel, flush to the edges (no margin) so it
   reads like a real dashboard peeking in. Clipped by the panel's overflow. ── */

const HIVE_NAV: {
	section: string;
	count?: number;
	items: { label: string; icon: Icon; active?: boolean }[];
}[] = [
	{
		section: "Overview",
		items: [
			{ label: "Inbox", icon: InboxIcon },
			{ label: "Threads", icon: ChatBubbleLeftRightIcon },
		],
	},
	{
		section: "Rooms",
		count: 1,
		items: [{ label: "Main Office", icon: BuildingOffice2Icon }],
	},
	{
		section: "General",
		count: 2,
		items: [
			{ label: "general", icon: HashtagIcon, active: true },
			{ label: "test-only", icon: HashtagIcon },
		],
	},
	{
		section: "Engineering",
		count: 3,
		items: [
			{ label: "bug-reports", icon: HashtagIcon },
			{ label: "dev-ops", icon: HashtagIcon },
			{ label: "engineering", icon: HashtagIcon },
		],
	},
];

const HIVE_MESSAGES: {
	name: string;
	initial: string;
	time: string;
	edited?: boolean;
	lines: string[];
	link?: string;
	reaction?: string;
	mention?: string;
}[] = [
	{
		name: "Mahan",
		initial: "M",
		time: "9:13 PM",
		lines: ["Yo yo yo", "Good evening gents"],
		link: "notion.so/invite/43477877e3a3…",
		reaction: "❤️ 2",
	},
	{
		name: "Luka Eric",
		initial: "L",
		time: "10:28 PM",
		edited: true,
		lines: ["Please share the link to the content calendar when you get that up please"],
	},
	{
		name: "Mahan",
		initial: "M",
		time: "3:33 PM",
		mention: "@Luka",
		lines: ["Eric Let's discuss that today 👍"],
	},
];

// Kept for re-use; exported so the unused-locals check doesn't flag it.
export function HiveWorkspace() {
	return (
		<div
			className="absolute -bottom-4 left-[10%] flex h-[21rem] w-[36rem] max-w-none overflow-hidden rounded-2xl border border-black/5 bg-ds-surface-raised text-ds-text-primary shadow-[0_40px_90px_-25px_rgba(0,0,0,0.65)]"
			style={{
				// Tailark hero perspective recipe: perspective + rotateX + skewX.
				transform: "perspective(1200px) rotateX(20deg) skewX(.36rad)",
				transformOrigin: "bottom left",
			}}
		>
			{/* Sidebar */}
			<aside className="flex w-[9.5rem] shrink-0 flex-col gap-3 border-r border-ds-border-subtle bg-ds-surface px-2.5 py-3">
				<div className="flex items-center gap-2 px-1">
					<span className="grid size-5 shrink-0 place-items-center rounded-md bg-ds-text-primary text-[0.5rem] font-bold text-white">
						h
					</span>
					<div className="min-w-0 flex-1">
						<div className="text-[0.5rem] font-medium uppercase tracking-[0.12em] text-ds-text-tertiary">
							Workspace
						</div>
						<div className="truncate text-[0.6875rem] font-semibold">Nairon</div>
					</div>
					<ChevronDownIcon className="size-3 text-ds-text-tertiary" />
				</div>

				<div className="flex flex-col gap-3 overflow-hidden">
					{HIVE_NAV.map((group) => (
						<div key={group.section}>
							<div className="mb-1 flex items-center gap-1.5 px-1.5">
								<span className="text-[0.5625rem] font-medium uppercase tracking-[0.1em] text-ds-text-tertiary">
									{group.section}
								</span>
								{group.count !== undefined && (
									<span className="text-[0.5625rem] text-ds-text-tertiary/70">
										{group.count}
									</span>
								)}
							</div>
							<div className="space-y-0.5">
								{group.items.map((item) => {
									const Ico = item.icon;
									return (
										<div
											key={item.label}
											className={`flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[0.75rem] ${
												item.active
													? "bg-ds-surface-hover font-medium text-ds-text-primary"
													: "text-ds-text-secondary"
											}`}
										>
											<Ico className="size-3.5 shrink-0 text-ds-text-tertiary" strokeWidth={1.5} />
											<span className="truncate">{item.label}</span>
										</div>
									);
								})}
							</div>
						</div>
					))}
				</div>
			</aside>

			{/* Channel */}
			<div className="flex min-w-0 flex-1 flex-col">
				<div className="flex h-9 shrink-0 items-center gap-2 border-b border-ds-border-subtle px-3.5">
					<StarIcon className="size-3.5 text-ds-text-tertiary" strokeWidth={1.5} />
					<ChatBubbleLeftRightIcon className="size-3.5 text-ds-text-secondary" strokeWidth={1.5} />
					<span className="text-[0.8125rem] font-medium">general</span>
				</div>

				<div className="flex-1 space-y-3 overflow-hidden px-3.5 py-3">
					{HIVE_MESSAGES.map((m, i) => (
						<div key={`${m.name}-${i}`} className="flex gap-2.5">
							<span
								className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-[0.625rem] font-semibold text-white"
								style={{ backgroundColor: "var(--brand-blue)", opacity: 1 - i * 0.12 }}
							>
								{m.initial}
							</span>
							<div className="min-w-0 flex-1">
								<div className="flex items-baseline gap-1.5">
									<span className="text-[0.75rem] font-semibold">{m.name}</span>
									<span className="text-[0.625rem] text-ds-text-tertiary">{m.time}</span>
									{m.edited && (
										<span className="text-[0.625rem] text-ds-text-tertiary">(edited)</span>
									)}
								</div>
								{m.lines.map((line, li) => (
									<p key={li} className="text-[0.75rem] leading-relaxed text-ds-text-secondary">
										{m.mention && li === 0 && (
											<span
												className="mr-1 rounded px-1 py-0.5 text-[0.6875rem] font-medium"
												style={{
													backgroundColor: "color-mix(in srgb, var(--brand-blue) 14%, transparent)",
													color: "var(--brand-blue)",
												}}
											>
												{m.mention}
											</span>
										)}
										{line}
									</p>
								))}
								{m.link && (
									<a
										href="#"
										className="block truncate text-[0.75rem]"
										style={{ color: "var(--brand-blue)" }}
									>
										{m.link}
									</a>
								)}
								{m.reaction && (
									<span className="mt-1 inline-flex items-center gap-1 rounded-full border border-ds-border bg-ds-surface px-1.5 py-0.5 text-[0.625rem] text-ds-text-secondary">
										{m.reaction}
									</span>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

function GradientPanel() {
	// Emptied to a plain placeholder — content TBD.
	return <div className="min-h-[26rem] rounded-2xl bg-ds-shell" />;
}

export function Features() {
	const [mode, setMode] = useState<Mode>("agents");
	const content = CONTENT[mode];

	return (
		<section className="bg-ds-surface font-geist text-ds-text-primary">
			<div className="mx-auto max-w-6xl px-5 py-24">
				<div className="mb-14 flex justify-center">
					<Toggle mode={mode} onChange={setMode} />
				</div>

				<div key={mode} className="animate-fade-in">
					<div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
						{/* Left — copy */}
						<div>
							<h2 className="text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
								{content.heading[0]}
								<br />
								{content.heading[1]}
							</h2>
							<p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-ds-text-secondary">
								{content.body}
							</p>
							<p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-ds-text-secondary">
								<span className="text-ds-text-primary">{content.emphasis}</span>
								{content.bodyTail}
							</p>
							<div className="mt-8">
								<DsButton variant="secondary" size="md">
									Learn more
									<ChevronRightIcon />
								</DsButton>
							</div>
						</div>

						{/* Right — placeholder */}
						<GradientPanel />
					</div>

					{/* Feature row */}
					<div className="mt-16 border-t border-ds-border pt-12">
						<div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
							{content.features.map((f) => {
								const Ico = f.icon;
								return (
									<div key={f.title}>
										<div className="flex items-center gap-2.5">
											<Ico
												className="size-5"
												strokeWidth={1.5}
												style={{ color: "var(--brand-blue)" }}
											/>
											<span className="text-[0.9375rem] font-medium">{f.title}</span>
										</div>
										<p className="mt-3 text-[0.875rem] leading-relaxed text-ds-text-secondary">
											{f.desc}
										</p>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
