import { useCallback, useRef, useState } from "react";
import { Bot, ChevronRight, UserRound } from "lucide-react";
import { GridCell, GridSection } from "./grid-system";

function SectionLabel({
	label,
	tone = "muted",
}: {
	label: string;
	tone?: "muted" | "gold";
}) {
	return (
		<span
			className={`inline-flex rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] md:text-[11px] ${
				tone === "gold"
					? "border border-[#C9A96E]/25 bg-[#C9A96E]/12 text-[#C9A96E]"
					: "border border-[#0C0C0C]/8 bg-[#0C0C0C]/[0.06] text-[#5C584F]"
			}`}
		>
			{label}
		</span>
	);
}

function HumanCard({
	title,
	detail,
}: {
	title: string;
	detail?: string;
}) {
	return (
		<div className="rounded-[20px] border border-[#0C0C0C]/10 bg-[linear-gradient(180deg,rgba(12, 12, 12, 0.045),rgba(12, 12, 12, 0.02))] p-3 shadow-[0_18px_40px_rgba(0,0,0,0.16)] md:p-3.5">
			<div className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-full border border-[#0C0C0C]/10 bg-[#0C0C0C]/[0.045] text-[#1A1916]/60 md:h-9 md:w-9">
				<UserRound className="h-3.5 w-3.5" />
			</div>
			<p className="text-[9px] uppercase tracking-[0.14em] text-[#1A1916]/40 md:text-[10px]">Human employee</p>
			<p className="mt-1.5 text-sm leading-tight text-[#1A1916] md:text-[15px]">{title}</p>
			<p className="mt-1.5 text-[11px] leading-relaxed text-[#5C584F]">{detail}</p>
		</div>
	);
}

function AIEmployeeCard({
	title,
	detail,
}: {
	title: string;
	detail?: string;
}) {
	return (
		<div className="rounded-[17px] border border-[#C9A96E]/28 bg-[linear-gradient(180deg,rgba(201,169,110,0.18),rgba(201,169,110,0.08))] p-3 shadow-[0_0_0_1px_rgba(201,169,110,0.08),0_16px_30px_rgba(0,0,0,0.16)]">
			<div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full border border-[#C9A96E]/25 bg-[#C9A96E]/12 text-[#C9A96E] md:h-8 md:w-8">
				<Bot className="h-3.5 w-3.5" />
			</div>
			<p className="text-[9px] uppercase tracking-[0.14em] text-[#C9A96E] md:text-[10px]">AI employee</p>
			<p className="mt-1.5 text-[13px] leading-tight text-[#F2E9D8] md:text-sm">{title}</p>
			<p className="mt-1.5 text-[11px] leading-relaxed text-[#D7C7A5]/82">{detail}</p>
		</div>
	);
}

function OrgStage({
	children,
	theme = "before",
}: {
	children: React.ReactNode;
	theme?: "before" | "after";
}) {
	return (
		<div
			className={`relative overflow-hidden rounded-[24px] border p-3.5 md:p-4.5 ${
				theme === "after"
					? "border-[#C9A96E]/18 bg-[linear-gradient(180deg,rgba(15,16,14,0.98),rgba(11,11,11,0.94))]"
					: "border-[#0C0C0C]/10 bg-[linear-gradient(180deg,rgba(18,18,18,0.98),rgba(12,12,12,0.94))]"
			}`}
		>
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(12, 12, 12, 0.06),transparent_38%)]" />
			<div className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(12, 12, 12, 0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(12, 12, 12, 0.22)_1px,transparent_1px)] [background-size:28px_28px]" />
			<div className="relative">{children}</div>
		</div>
	);
}

function BeforeVisual() {
	return (
		<OrgStage>
			<div className="mx-auto max-w-[500px]">
				<div className="mx-auto max-w-[180px]">
					<HumanCard
						title="CEO"
						detail="Everything routes through people."
					/>
				</div>

				<div className="mx-auto h-5 w-px bg-[#0C0C0C]/12 md:h-6" />

				<div className="grid gap-2.5 md:grid-cols-3 md:gap-3">
					<HumanCard
						title="Marketing lead"
						detail="Campaign work by hand."
					/>
					<HumanCard
						title="Operations lead"
						detail="Handoffs and updates manually."
					/>
					<HumanCard
						title="Sales lead"
						detail="Follow-up depends on bandwidth."
					/>
				</div>

				<div className="mt-4 rounded-[20px] border border-[#A94E4E]/28 bg-[linear-gradient(180deg,rgba(169,78,78,0.18),rgba(169,78,78,0.08))] p-3 md:p-4">
					<p className="text-[9px] uppercase tracking-[0.16em] text-[#E2A1A1] md:text-[10px]">
						Bottlenecks without AI support
					</p>
					<div className="mt-2.5 flex flex-wrap gap-1.5">
						{[
							"Slower turnaround",
							"Missed follow-up",
							"Manual checking",
							"Human bandwidth cap",
							"Context switching",
							"Delays across handoffs",
						].map((item) => (
							<span
								key={item}
								className="rounded-full border border-[#B86060]/24 bg-[rgba(94,28,28,0.32)] px-2.5 py-1 text-[10px] text-[#F2C5C5]"
							>
								{item}
							</span>
						))}
					</div>
				</div>
			</div>
		</OrgStage>
	);
}

function AfterLane({
	humanTitle,
	humanDetail,
	aiTitle,
	aiDetail,
}: {
	humanTitle: string;
	humanDetail: string;
	aiTitle: string;
	aiDetail: string;
}) {
	return (
		<div className="relative">
			<HumanCard title={humanTitle} detail={humanDetail} />
			<div className="mx-auto h-4 w-px bg-[#C9A96E]/35 md:h-5" />
			<AIEmployeeCard title={aiTitle} detail={aiDetail} />
		</div>
	);
}

function AfterVisual() {
	return (
		<OrgStage theme="after">
			<div className="mx-auto max-w-[530px]">
				<div className="mx-auto max-w-[185px]">
					<HumanCard
						title="CEO"
						detail="Humans keep control."
					/>
				</div>

				<div className="mx-auto h-5 w-px bg-[#C9A96E]/35 md:h-6" />

				<div className="grid gap-3 md:grid-cols-3 md:gap-3.5">
					<AfterLane
						humanTitle="Marketing lead"
						humanDetail="Owns strategy."
						aiTitle="Research + follow-up"
						aiDetail="Prepares and keeps momentum."
					/>
					<AfterLane
						humanTitle="Operations lead"
						humanDetail="Sets rules and approvals."
						aiTitle="Coordination + QA"
						aiDetail="Runs handoffs and checks work."
					/>
					<AfterLane
						humanTitle="Sales lead"
						humanDetail="Owns revenue calls."
						aiTitle="Qualification + pipeline"
						aiDetail="Handles routing and follow-up."
					/>
				</div>

			</div>
		</OrgStage>
	);
}

function ComparisonCard({
	label,
	title,
	description,
	visual,
	tone = "before",
}: {
	label: string;
	title: string;
	description: string;
	visual: React.ReactNode;
	tone?: "before" | "after";
}) {
	return (
		<div className="relative overflow-hidden border-b border-[#0C0C0C]/6 bg-white md:border-b-0">
			<div className="absolute inset-0">
				<img
					src={tone === "after" ? "/backgrounds/pastoral-hills.webp" : "/backgrounds/hazy-landscape.webp"}
					alt=""
					aria-hidden="true"
					className="h-full w-full object-cover"
					loading="lazy"
				/>
				<div
					className={`absolute inset-0 ${
						tone === "after"
							? "bg-[linear-gradient(180deg,rgba(9,9,9,0.42),rgba(9,9,9,0.72))]"
							: "bg-[linear-gradient(180deg,rgba(10,10,10,0.46),rgba(10,10,10,0.78))]"
					}`}
				/>
			</div>

			<div className="relative z-10 p-5 md:p-6">
				<SectionLabel label={label} tone={tone === "after" ? "gold" : "muted"} />
				<h3 className="mt-4 max-w-[285px] text-[26px] leading-tight text-[#1A1916] md:text-[28px]">
					{title}
				</h3>
				<p className="mt-2.5 max-w-[360px] text-[13px] leading-relaxed text-[#5C584F] md:text-[14px]">
					{description}
				</p>
				<div className="mt-6">{visual}</div>
			</div>
		</div>
	);
}

function ComparisonSummary() {
	return (
		<GridSection columns="1fr 1fr" border className="hidden md:grid">
			<GridCell borderRight className="px-6 py-5 md:px-8">
				<p className="text-sm leading-relaxed text-[#5C584F]">
					Before, growth means hiring more people to absorb repetitive work, follow-up, and
					admin overhead.
				</p>
			</GridCell>
			<GridCell className="px-6 py-5 md:px-8">
				<p className="text-sm leading-relaxed text-[#5C584F]">
					After, the same leaders stay accountable, but AI employees absorb the heavy execution
					layer underneath them.
				</p>
			</GridCell>
		</GridSection>
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
				<GridCell className="px-6 pt-10 pb-8 md:px-12 md:pt-12 md:pb-10">
					<div className="mb-4 flex items-center gap-3">
						<div className="h-1.5 w-1.5 rounded-full bg-[#C9A96E]" />
						<span className="text-xs font-medium uppercase tracking-[0.16em] text-[#5C584F]">
							The shift
						</span>
					</div>
					<h2 className="max-w-4xl text-3xl font-normal tracking-[-0.48px] text-[#1A1916] md:text-[48px] md:leading-[57.6px]">
						From human bottlenecks to{" "}
						<span className="font-serif italic text-[#C9A96E]">AI employees inside the org</span>
					</h2>
				</GridCell>
			</GridSection>

			<GridSection columns="1fr" border>
				<GridCell>
					<div className="space-y-4 p-4 md:hidden">
						<ComparisonCard
							label="Before: human-only team"
							title="Every execution lane depends on people alone"
							description="The team still owns strategy and decisions, but they are also stuck carrying research, follow-up, coordination, and QA by hand."
							visual={<BeforeVisual />}
						/>

						<ComparisonCard
							label="After: human + AI employees"
							title="Each leader gets AI employees working underneath them"
							description="Humans stay in charge. AI employees plug into the structure below them to handle the repetitive execution layer."
							visual={<AfterVisual />}
							tone="after"
						/>
					</div>

					<div
						ref={containerRef}
						className="relative hidden h-[620px] select-none overflow-hidden md:block"
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
									left: "75%",
									top: "54%",
									width: "92%",
									height: "88%",
									transform: "translate(-50%, -50%)",
									zIndex: 2,
								}}
							>
								<AfterVisual />
							</div>
							<div className="absolute right-3 top-3 z-10 md:right-6 md:top-6">
								<SectionLabel label="After: human + AI employees" tone="gold" />
							</div>
						</div>

						<div
							className="absolute inset-0"
							style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
						>
							<img
								src="/backgrounds/hazy-landscape.webp"
								alt="Hazy landscape representing a human-only team"
								className="absolute inset-0 h-full w-full object-cover"
								loading="lazy"
							/>
							<div className="absolute inset-0 bg-[rgba(12,12,12,0.45)]" />
							<div
								className="absolute rounded-lg"
								style={{
									left: "25%",
									top: "54%",
									width: "92%",
									height: "88%",
									transform: "translate(-50%, -50%)",
									zIndex: 2,
								}}
							>
								<BeforeVisual />
							</div>
							<div className="absolute left-3 top-3 z-10 md:left-6 md:top-6">
								<SectionLabel label="Before: human-only team" />
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
									background: "rgba(12, 12, 12, 0.3)",
								}}
							/>
							<div
								className="absolute left-1/2 top-1/2 flex items-center justify-center"
								style={{
									width: 36,
									height: 36,
									transform: "translate(-50%, -50%)",
									borderRadius: "50%",
									background: "#FFFFFF",
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

			<ComparisonSummary />
		</div>
	);
}
