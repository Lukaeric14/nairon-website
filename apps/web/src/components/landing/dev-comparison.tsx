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

function AutomationCanvas() {
	return (
		<CanvasShell label="Linear rules">
			<div className="flex h-full flex-col justify-center">
				<div className="mx-auto grid w-full max-w-[520px] gap-3 md:gap-4">
					{[
						{ title: "Trigger", copy: "New lead enters inbox" },
						{ title: "Rule", copy: "If source is Zillow, send template A" },
						{ title: "Action", copy: "Create CRM record and notify team" },
						{ title: "Failure mode", copy: "Breaks when the input changes" },
					].map((item, index) => (
						<div key={item.title} className="relative">
							{index > 0 && (
								<div className="absolute -top-3 left-6 h-3 w-px bg-white/14 md:-top-4 md:h-4" />
							)}
							<div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 md:p-5">
								<p className="text-[11px] uppercase tracking-[0.14em] text-white/34 md:text-xs">
									{item.title}
								</p>
								<p className="mt-2 text-sm leading-[1.55] text-white/78 md:text-[15px]">
									{item.copy}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</CanvasShell>
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

function OrgChartCanvas() {
	return (
		<CanvasShell label="Org chart" accent>
			<div className="flex h-full flex-col justify-center">
				<div className="mx-auto w-full max-w-[560px]">
					<div className="mx-auto max-w-[180px]">
						<OrgNode title="CEO" subtitle="Human leadership" detail="Sets direction and approves priorities" />
					</div>

					<div className="mx-auto h-6 w-px bg-[#C9A96E]/35 md:h-8" />

					<div className="mx-auto grid max-w-[500px] gap-3 md:grid-cols-3 md:gap-4">
						<OrgNode title="Revenue operator" subtitle="Human oversight" detail="Reviews pipeline outcomes" />
						<OrgNode title="Ops operator" subtitle="Human oversight" detail="Handles escalations" />
						<OrgNode title="Chief of staff" subtitle="Human oversight" detail="Approves sensitive actions" />
					</div>

					<div className="relative mx-auto mt-5 max-w-[540px] rounded-[24px] border border-dashed border-[#C9A96E]/28 bg-[linear-gradient(180deg,rgba(201,169,110,0.06),rgba(12,12,12,0.55))] p-4 md:mt-6 md:p-5">
						<div className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 -translate-y-5 bg-[#C9A96E]/35 md:h-6 md:-translate-y-6" />
						<p className="mb-2 text-center text-[11px] uppercase tracking-[0.16em] text-[#C9A96E] md:text-xs">
							AI employee layer
						</p>
						<p className="mb-4 text-center text-xs leading-relaxed text-white/46">
							These are the operating nodes. They do the work while humans supervise the lane.
						</p>
						<div className="grid gap-3 md:grid-cols-2">
							<OrgNode
								title="Acquisition AI employee"
								subtitle="AI employee"
								type="ai"
								highlight
								detail="Research, outreach, qualification"
							/>
							<OrgNode
								title="Operations AI employee"
								subtitle="AI employee"
								type="ai"
								highlight
								detail="Fulfillment, coordination, handoffs"
							/>
							<OrgNode
								title="Support AI employee"
								subtitle="AI employee"
								type="ai"
								highlight
								detail="Inbox handling and routine response"
							/>
							<OrgNode
								title="QA AI employee"
								subtitle="AI employee"
								type="ai"
								highlight
								detail="Checks, exceptions, escalation prep"
							/>
						</div>
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
								<OrgChartCanvas />
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
								<AutomationCanvas />
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
						Before: rigid rule chains break the moment the input gets messy. Useful for narrow
						tasks, brittle everywhere else.
					</p>
				</GridCell>
				<GridCell className="px-4 md:px-8 py-4 md:py-6">
					<p className="text-xs leading-relaxed text-[#A39E96] md:text-sm">
						After: AI employee nodes sit inside the org chart with bounded permissions, human
						oversight, and continuous improvement inside the real business workflow.
					</p>
				</GridCell>
			</GridSection>
		</div>
	);
}
