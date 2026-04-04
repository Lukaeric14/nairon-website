import { useEffect, useRef, useState } from "react";
import { GridSection, GridCell } from "./grid-system";

const columns = [
	{ label: "AI employee system", highlight: true, hideOnMobile: false },
	{ label: "Automation stack", highlight: false, hideOnMobile: true },
	{ label: "Manual workflow", highlight: false, hideOnMobile: false },
];

const metrics = [
	{
		label: "Execution speed",
		subtitle: "Work completed per cycle",
		values: ["11.8", "6.4", "3.2"],
		best: 0,
		badge: "3.7x \u2191",
	},
	{
		label: "Time to completion",
		subtitle: "Avg. days, request to done",
		values: ["1.2", "3.1", "4.7"],
		best: 0,
		badge: "3.9x \u2193",
	},
	{
		label: "Throughput",
		subtitle: "Tasks resolved per week",
		values: ["34", "18", "12"],
		best: 0,
		badge: "2.8x \u2191",
	},
	{
		label: "Exception handling",
		subtitle: "Avg. hours to resolve edge cases",
		values: ["1.8", "4.2", "6.4"],
		best: 0,
		badge: "3.6x \u2193",
	},
	{
		label: "Consistency",
		subtitle: "Repeatable output quality",
		values: ["89%", "61%", "47%"],
		best: 0,
		badge: "1.9x \u2191",
	},
	{
		label: "Operational visibility",
		subtitle: "Observed system reliability",
		values: ["8.7", "5.4", "4.1"],
		best: 0,
		badge: "2.1x \u2191",
	},
	{
		label: "Learning loop",
		subtitle: "Ability to improve over time",
		values: ["9.2", "3.8", "\u2014"],
		best: 0,
	},
];

const ROW_STAGGER = 120; // ms between each row

export function DevOutcome() {
	const tableRef = useRef<HTMLTableElement>(null);
	const [visibleRows, setVisibleRows] = useState(-1);

	useEffect(() => {
		const el = tableRef.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					for (let i = 0; i <= metrics.length; i++) {
						setTimeout(() => setVisibleRows(i), i * ROW_STAGGER);
					}
					observer.disconnect();
				}
			},
			{ threshold: 0.2 },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<div>
			<GridSection columns="1fr" border>
				<GridCell className="px-6 md:px-12 py-8 md:py-10">
					<div className="flex items-center gap-3 mb-4">
						<div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
						<span className="text-[#A39E96] text-xs font-medium uppercase tracking-[0.16em]">
							The advantage
						</span>
					</div>
					<h2 className="text-3xl md:text-[48px] md:leading-[57.6px] font-normal tracking-[-0.48px] text-[#E8E4DE] max-w-3xl mb-3">
						The gap is measurable
					</h2>
					<p className="text-[#A39E96] text-sm md:text-base max-w-xl">
						When AI is deployed into a defined role instead of bolted onto a workflow, the gains show up in speed, consistency, and scale.
					</p>
				</GridCell>
			</GridSection>

			<GridSection columns="1fr" border>
				<GridCell className="px-4 md:px-12 py-6 md:py-8 overflow-x-auto">
					<table ref={tableRef} className="w-full border-collapse">
						<thead>
							<tr
								className="transition-all duration-500 ease-out"
								style={{
									opacity: visibleRows >= 0 ? 1 : 0,
									transform: visibleRows >= 0 ? "translateY(0)" : "translateY(12px)",
								}}
							>
								<th className="text-left w-[140px] md:w-[200px]" />
								{columns.map((col) => (
									<th
										key={col.label}
										className={`text-center px-2 md:px-4 py-3 text-xs md:text-sm font-medium ${col.hideOnMobile ? "hidden md:table-cell" : ""}`}
										style={{
											color: col.highlight ? "#E8E4DE" : "#A39E96",
											borderBottom: col.highlight
												? "2px solid #C9A96E"
												: "1px solid rgba(255,255,255,0.06)",
										}}
									>
										{col.label}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{metrics.map((metric, mi) => (
								<tr
									key={metric.label}
									className="transition-all duration-500 ease-out"
									style={{
										borderBottom: "1px solid rgba(255,255,255,0.06)",
										opacity: visibleRows > mi ? 1 : 0,
										transform: visibleRows > mi ? "translateY(0)" : "translateY(12px)",
									}}
								>
									<td className="py-3 md:py-4 pr-2 md:pr-6 align-top">
										<span className="text-xs md:text-sm font-medium text-[#E8E4DE] block">
											{metric.label}
										</span>
										<span className="text-[10px] md:text-[11px] text-[#A39E96]/60">
											{metric.subtitle}
										</span>
									</td>
									{metric.values.map((value, i) => (
										<td
											key={columns[i].label}
											className={`text-center py-3 md:py-4 px-2 md:px-4 ${columns[i].hideOnMobile ? "hidden md:table-cell" : ""}`}
											style={{
												background:
													i === metric.best
														? "rgba(201, 169, 110, 0.08)"
														: "transparent",
											}}
										>
											<span
												className="text-xs md:text-sm tabular-nums font-semibold"
												style={{
													color:
														i === metric.best
															? "#C9A96E"
															: "#A39E96",
												}}
											>
												{value}
											</span>
											{i === metric.best && metric.badge && (
												<span className="ml-1 md:ml-2 inline-block text-[9px] md:text-[10px] font-semibold text-[#C9A96E] bg-[#C9A96E]/10 px-1 md:px-1.5 py-0.5 rounded">
													{metric.badge}
												</span>
											)}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>

					<p className="text-[10px] text-[#A39E96]/40 mt-6">
						Illustrative performance deltas based on recurring company delivery patterns.
					</p>
				</GridCell>
			</GridSection>
		</div>
	);
}
