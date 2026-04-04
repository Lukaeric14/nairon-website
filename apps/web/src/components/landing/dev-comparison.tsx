import { useCallback, useRef, useState } from "react";
import { Bot, UserRound } from "lucide-react";
import { GridCell, GridSection } from "./grid-system";

function CanvasShell({
	children,
	label,
	accent = false,
}: {
	children: React.ReactNode;
	label: string;
	accent?: boolean;
}) {
	return (
		<div className="flex h-full w-full items-center justify-center rounded-lg border border-white/10 bg-[#111111] p-4 md:p-6">
			<div
				className={`relative h-full w-full overflow-hidden rounded-[20px] border ${
					accent ? "border-[#C9A96E]/20 bg-[#0F100E]" : "border-white/8 bg-[#141414]"
				}`}
			>
				<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_45%)]" />
				<div className="absolute right-4 top-4 rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-white/34 md:text-[11px]">
					{label}
				</div>
				<div className="relative h-full w-full p-5 md:p-7">{children}</div>
			</div>
		</div>
	);
}

function OrgNode({
	title,
	subtitle,
	type = "human",
	highlight = false,
	detail,
}: {
	title: string;
	subtitle: string;
	type?: "human" | "ai";
	highlight?: boolean;
	detail?: string;
}) {
	const isAi = type === "ai";
	const Icon = isAi ? Bot : UserRound;

	return (
		<div
			className={`rounded-2xl border px-4 py-3 md:px-5 md:py-4 ${
				isAi
					? highlight
						? "border-[#C9A96E]/42 bg-[linear-gradient(180deg,rgba(201,169,110,0.18),rgba(201,169,110,0.08))] shadow-[0_0_0_1px_rgba(201,169,110,0.1),0_18px_40px_rgba(201,169,110,0.08)]"
						: "border-[#C9A96E]/22 bg-[#C9A96E]/8"
					: "border-white/8 bg-white/[0.03]"
			}`}
		>
			<div className="flex items-start gap-3">
				<div
					className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
						isAi
							? "border-[#C9A96E]/28 bg-[#C9A96E]/12 text-[#C9A96E]"
							: "border-white/8 bg-white/[0.04] text-white/55"
					}`}
				>
					<Icon className="h-4 w-4" />
				</div>
				<div className="min-w-0">
					<p
						className={`text-[11px] uppercase tracking-[0.14em] md:text-xs ${
							isAi ? "text-[#C9A96E]" : "text-white/38"
						}`}
					>
						{subtitle}
					</p>
					<p className="mt-1.5 text-sm leading-[1.35] text-white/88 md:text-[15px]">{title}</p>
					{detail ? (
						<p className="mt-1.5 text-[11px] leading-relaxed text-white/45 md:text-xs">
							{detail}
						</p>
					) : null}
				</div>
			</div>
		</div>
	);
}

function SupportNode({
	title,
	count,
}: {
	title: string;
	count: string;
}) {
	return (
		<div className="rounded-xl border border-[#C9A96E]/18 bg-[#C9A96E]/8 px-3 py-2.5">
			<div className="flex items-start gap-2.5">
				<div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#C9A96E]/22 bg-[#C9A96E]/12 text-[#C9A96E]">
					<Bot className="h-3.5 w-3.5" />
				</div>
				<div className="min-w-0">
					<p className="text-[10px] uppercase tracking-[0.14em] text-[#C9A96E]">AI employee</p>
					<p className="mt-1 text-xs leading-[1.35] text-white/86">{title}</p>
					<p className="mt-1 text-[10px] leading-relaxed text-white/42">{count}</p>
				</div>
			</div>
		</div>
	);
}

function HumanOnlyCanvas() {
	const executiveRow = [
		{ title: "Marketing lead", detail: "Owns demand and campaigns" },
		{ title: "Operations lead", detail: "Runs delivery and follow-up" },
		{ title: "Sales lead", detail: "Handles conversations and pipeline" },
		{ title: "Chief of staff", detail: "Coordinates approvals and execution" },
	];

	const operatorRow = [
		{ title: "Research analyst", detail: "Manual prep and list building" },
		{ title: "Inbox coordinator", detail: "Responds and routes requests" },
		{ title: "Project coordinator", detail: "Tracks handoffs and updates" },
		{ title: "QA reviewer", detail: "Checks work before it ships" },
	];

	return (
		<CanvasShell label="Human-only org">
			<div className="flex h-full flex-col justify-center">
				<div className="mx-auto w-full max-w-[560px]">
					<div className="mx-auto max-w-[190px]">
						<OrgNode
							title="CEO"
							subtitle="Human leadership"
							detail="One team carrying all execution themselves"
						/>
					</div>

					<div className="mx-auto h-5 w-px bg-white/12 md:h-6" />

					<div className="mx-auto grid max-w-[560px] gap-3 md:grid-cols-4 md:gap-4">
						{executiveRow.map((person) => (
							<OrgNode
								key={person.title}
								title={person.title}
								subtitle="Human employee"
								detail={person.detail}
							/>
						))}
					</div>

					<div className="mx-auto h-5 w-px bg-white/12 md:h-6" />

					<div className="mx-auto grid max-w-[560px] gap-3 md:grid-cols-4 md:gap-4">
						{operatorRow.map((person) => (
							<OrgNode
								key={person.title}
								title={person.title}
								subtitle="Human employee"
								detail={person.detail}
							/>
						))}
					</div>
				</div>
			</div>
		</CanvasShell>
	);
}

function AugmentedOrgChartCanvas() {
	const executiveRow = [
		{
			title: "Marketing lead",
			detail: "Directs demand strategy",
			ai: { title: "Research + follow-up team", count: "2 AI employees" },
		},
		{
			title: "Operations lead",
			detail: "Owns fulfillment rhythm",
			ai: { title: "Coordination + QA team", count: "2 AI employees" },
		},
		{
			title: "Sales lead",
			detail: "Runs pipeline decisions",
			ai: { title: "Qualification + outreach team", count: "2 AI employees" },
		},
		{
			title: "Chief of staff",
			detail: "Handles approvals and edge cases",
			ai: { title: "Escalation + reporting team", count: "2 AI employees" },
		},
	];

	return (
		<CanvasShell label="Augmented org" accent>
			<div className="flex h-full flex-col justify-center">
				<div className="mx-auto w-full max-w-[560px]">
					<div className="mx-auto max-w-[190px]">
						<OrgNode
							title="CEO"
							subtitle="Human leadership"
							detail="Humans stay in charge while AI employees handle execution"
						/>
					</div>

					<div className="mx-auto h-5 w-px bg-[#C9A96E]/35 md:h-6" />

					<div className="mx-auto grid max-w-[560px] gap-3 md:grid-cols-4 md:gap-4">
						{executiveRow.map((person) => (
							<div key={person.title} className="space-y-2.5">
								<OrgNode
									title={person.title}
									subtitle="Human employee"
									detail={person.detail}
								/>
								<SupportNode title={person.ai.title} count={person.ai.count} />
							</div>
						))}
					</div>

					<div className="mx-auto mt-4 max-w-[560px] rounded-[24px] border border-dashed border-[#C9A96E]/24 bg-[linear-gradient(180deg,rgba(201,169,110,0.06),rgba(12,12,12,0.55))] p-4 md:mt-5 md:p-5">
						<p className="mb-2 text-center text-[11px] uppercase tracking-[0.16em] text-[#C9A96E] md:text-xs">
							AI employee layer
						</p>
						<p className="text-center text-xs leading-relaxed text-white/46">
							After deployment, each human lane is supported by dedicated AI employees doing
							research, follow-up, coordination, QA, and execution-heavy work.
						</p>
					</div>
				</div>
			</div>
		</CanvasShell>
	);
}

export function DevComparison() {
	const [pos, setPos] = useState(50);
	const containerRef = useRef<HTMLDivElement>(null);

	const handlePointerDown = useCallback((e: React.PointerEvent) => {
		e.preventDefault();
		const target = e.currentTarget as HTMLElement;
		target.setPointerCapture(e.pointerId);

		const onMove = (ev: PointerEvent) => {
			const rect = containerRef.current?.getBoundingClientRect();
			if (!rect) return;
			const pct = ((ev.clientX - rect.left) / rect.width) * 100;
			setPos(Math.min(95, Math.max(5, pct)));
		};

		const onUp = () => {
			target.removeEventListener("pointermove", onMove);
			target.removeEventListener("pointerup", onUp);
		};

		target.addEventListener("pointermove", onMove);
		target.addEventListener("pointerup", onUp);
	}, []);

	return (
		<div>
			<GridSection columns="1fr" border>
				<GridCell className="px-6 md:px-12 pt-10 md:pt-12 pb-8 md:pb-10">
					<div className="mb-4 flex items-center gap-3">
						<div className="h-1.5 w-1.5 rounded-full bg-[#C9A96E]" />
						<span className="text-xs font-medium uppercase tracking-[0.16em] text-[#A39E96]">
							The shift
						</span>
					</div>
					<h2 className="max-w-4xl text-3xl font-normal tracking-[-0.48px] text-[#E8E4DE] md:text-[48px] md:leading-[57.6px]">
						From static automation to{" "}
						<span className="font-serif italic text-[#C9A96E]">role-based AI employees</span>
					</h2>
				</GridCell>
			</GridSection>

			<GridSection columns="1fr" border>
				<GridCell>
					<div
						ref={containerRef}
						className="relative h-[360px] select-none overflow-hidden md:h-[620px]"
					>
						<div
							className="absolute inset-0"
							style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
						>
							<img
								src="/backgrounds/pastoral-hills.webp"
								alt="Pastoral hills landscape representing AI employee systems"
								className="absolute inset-0 h-full w-full object-cover"
								loading="lazy"
							/>
							<div className="absolute inset-0 bg-[rgba(12,12,12,0.42)]" />
							<div
								className="absolute rounded-lg"
								style={{
									left: "50%",
									top: "50%",
									width: "85%",
									height: "75%",
									maxHeight: 460,
									transform: "translate(-50%, -50%)",
									zIndex: 2,
								}}
							>
									<AugmentedOrgChartCanvas />
							</div>
							<div className="absolute right-3 top-3 z-10 md:right-6 md:top-6">
								<span
									className="inline-block rounded-full px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] md:px-3 md:py-1.5 md:text-xs"
									style={{
										background: "rgba(201, 169, 110, 0.12)",
										color: "#C9A96E",
										border: "1px solid rgba(201, 169, 110, 0.2)",
									}}
								>
									After: AI employee system
								</span>
							</div>
						</div>

						<div
							className="absolute inset-0"
							style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
						>
							<img
								src="/backgrounds/hazy-landscape.webp"
								alt="Hazy landscape representing static automation"
								className="absolute inset-0 h-full w-full object-cover"
								loading="lazy"
							/>
							<div className="absolute inset-0 bg-[rgba(12,12,12,0.45)]" />
							<div
								className="absolute rounded-lg"
								style={{
									left: "50%",
									top: "50%",
									width: "85%",
									height: "75%",
									maxHeight: 460,
									transform: "translate(-50%, -50%)",
									zIndex: 2,
								}}
							>
									<HumanOnlyCanvas />
							</div>
							<div className="absolute left-3 top-3 z-10 md:left-6 md:top-6">
								<span
									className="inline-block rounded-full px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] md:px-3 md:py-1.5 md:text-xs"
									style={{
										background: "rgba(255, 255, 255, 0.08)",
										color: "#A39E96",
										border: "1px solid rgba(255, 255, 255, 0.06)",
									}}
								>
									Before: static automation
								</span>
							</div>
						</div>

						<div
							className="absolute bottom-0 top-0 z-20"
							style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
						>
							<div
								className="absolute bottom-0 left-1/2 top-0"
								style={{
									width: 1,
									transform: "translateX(-0.5px)",
									background: "rgba(255, 255, 255, 0.3)",
								}}
							/>
							<div
								className="absolute left-1/2 top-1/2 flex items-center justify-center"
								style={{
									width: 36,
									height: 36,
									transform: "translate(-50%, -50%)",
									borderRadius: "50%",
									background: "#0C0C0C",
									border: "2px solid #C9A96E",
									cursor: "ew-resize",
									touchAction: "none",
								}}
								onPointerDown={handlePointerDown}
							>
								<svg
									width={12}
									height={12}
									viewBox="0 0 12 12"
									fill="none"
									style={{ color: "#C9A96E" }}
								>
									<path
										d="M1 6L4 3M1 6L4 9M1 6H5M11 6L8 3M11 6L8 9M11 6H7"
										stroke="currentColor"
										strokeWidth={1.5}
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						</div>
					</div>
				</GridCell>
			</GridSection>

			<GridSection columns="1fr 1fr" border>
				<GridCell borderRight className="px-4 md:px-8 py-4 md:py-6">
					<p className="text-xs leading-relaxed text-[#A39E96] md:text-sm">
							Before: the whole org chart is human-only, so every repetitive task, follow-up,
							handoff, and check still sits on people.
					</p>
				</GridCell>
				<GridCell className="px-4 md:px-8 py-4 md:py-6">
					<p className="text-xs leading-relaxed text-[#A39E96] md:text-sm">
							After: the same human team stays in place, but each lane gets AI employees working
							under them to expand execution capacity without losing oversight.
					</p>
				</GridCell>
			</GridSection>
		</div>
	);
}
