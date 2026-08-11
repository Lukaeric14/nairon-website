import { useEffect, useRef, useState } from "react";
import { GridCell, GridSection } from "./grid-system";

const metrics = [
	{
		label: "Turnaround time",
		unit: "days",
		hero: "1.4",
		kicker: "from request to done",
		comparisons: [
			{ label: "AI employees", value: "1.4d", tone: "gold" as const },
			{ label: "Automation", value: "3.2d", tone: "neutral" as const },
			{ label: "Human-only", value: "4.8d", tone: "muted" as const },
		],
	},
	{
		label: "Weekly capacity",
		unit: "tasks",
		hero: "118",
		kicker: "completed per week",
		comparisons: [
			{ label: "AI employees", value: "118", tone: "gold" as const },
			{ label: "Automation", value: "57", tone: "neutral" as const },
			{ label: "Human-only", value: "31", tone: "muted" as const },
		],
	},
	{
		label: "Follow-up coverage",
		unit: "%",
		hero: "96",
		kicker: "inside target window",
		comparisons: [
			{ label: "AI employees", value: "96%", tone: "gold" as const },
			{ label: "Automation", value: "71%", tone: "neutral" as const },
			{ label: "Human-only", value: "42%", tone: "muted" as const },
		],
	},
];

function CompareRow({
	label,
	value,
	tone,
}: {
	label: string;
	value: string;
	tone: "gold" | "neutral" | "muted";
}) {
	const styles =
		tone === "gold"
			? "border-[#C9A96E]/22 bg-[#C9A96E]/9 text-[#EFDDB7]"
			: tone === "neutral"
				? "border-[#0C0C0C]/8 bg-[#0C0C0C]/[0.035] text-[#1A1916]"
				: "border-[#0C0C0C]/6 bg-[#0C0C0C]/[0.025] text-[#5C584F]";

	return (
		<div className={`flex items-center justify-between rounded-full border px-3 py-2 ${styles}`}>
			<span className="text-[10px] uppercase tracking-[0.14em]">{label}</span>
			<span className="text-sm tabular-nums">{value}</span>
		</div>
	);
}

function MetricCard({
	metric,
	active,
}: {
	metric: (typeof metrics)[number];
	active: boolean;
}) {
	return (
		<div
			className="relative overflow-hidden rounded-[26px] border border-[#0C0C0C]/8 bg-[linear-gradient(180deg,rgba(12, 12, 12, 0.035),rgba(12, 12, 12, 0.015))] p-5 shadow-[0_24px_48px_rgba(0,0,0,0.16)] transition-all duration-500 ease-out md:p-6"
			style={{
				opacity: active ? 1 : 0,
				transform: active ? "translateY(0)" : "translateY(14px)",
			}}
		>
			<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
			<p className="text-[10px] uppercase tracking-[0.16em] text-[#5C584F]">{metric.label}</p>

			<div className="mt-5 flex items-end gap-2">
				<span className="text-[54px] leading-none tracking-[-0.04em] text-[#1A1916] md:text-[64px]">
					{metric.hero}
				</span>
				<span className="mb-2 text-sm uppercase tracking-[0.14em] text-[#C9A96E]">
					{metric.unit}
				</span>
			</div>

			<p className="mt-2 text-sm text-[#5C584F]">{metric.kicker}</p>

			<div className="mt-6 space-y-2.5">
				{metric.comparisons.map((item) => (
					<CompareRow
						key={item.label}
						label={item.label}
						value={item.value}
						tone={item.tone}
					/>
				))}
			</div>
		</div>
	);
}

export function DevOutcome() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [visibleCount, setVisibleCount] = useState(0);

	useEffect(() => {
		const el = sectionRef.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;

				metrics.forEach((_, index) => {
					setTimeout(() => setVisibleCount(index + 1), index * 140);
				});

				observer.disconnect();
			},
			{ threshold: 0.2 },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<div ref={sectionRef}>
			<GridSection columns="1fr" border>
				<GridCell className="px-6 py-8 md:px-12 md:py-10">
					<div className="mb-4 flex items-center gap-3">
						<div className="h-1.5 w-1.5 rounded-full bg-[#C9A96E]" />
						<span className="text-xs font-medium uppercase tracking-[0.16em] text-[#5C584F]">
							The advantage
						</span>
					</div>
					<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
						<div className="max-w-2xl">
							<h2 className="text-3xl font-normal tracking-[-0.48px] text-[#1A1916] md:text-[48px] md:leading-[57.6px]">
								Measurable where it counts
							</h2>
							<p className="mt-3 max-w-xl text-sm leading-relaxed text-[#5C584F] md:text-base">
								We track business outcomes, not demo metrics.
							</p>
						</div>
						<div className="rounded-full border border-[#C9A96E]/18 bg-[#C9A96E]/8 px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-[#EEDCB5]">
							Illustrative benchmark examples
						</div>
					</div>
				</GridCell>
			</GridSection>

			<GridSection columns="1fr" border>
				<GridCell className="px-4 py-5 md:px-12 md:py-8">
					<div className="grid gap-4 md:grid-cols-3">
						{metrics.map((metric, index) => (
							<MetricCard
								key={metric.label}
								metric={metric}
								active={visibleCount > index}
							/>
						))}
					</div>

					<p className="mt-5 text-[10px] text-[#5C584F]/45">
						Actual KPIs are set per deployment during discovery and audit.
					</p>
				</GridCell>
			</GridSection>
		</div>
	);
}
