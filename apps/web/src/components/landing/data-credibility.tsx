import { useEffect, useRef, useState } from "react";
import { GridSection, GridCell, CornerNotches } from "./grid-system";

const stats = [
	{ value: "4", label: "Weeks to a live v1" },
	{ value: "$500", label: "Monthly token usage included" },
	{ value: "1", label: "Weekly strategy call" },
	{ value: "90", label: "Quarterly planning cadence" },
];

/** Parse a display string like "2,000+" into { number, prefix, suffix, decimals } */
function parseStatValue(value: string) {
	const match = value.match(/^([^\d]*?)([\d,.]+)(.*)$/);
	if (!match) return null;
	const prefix = match[1];
	const numStr = match[2];
	const suffix = match[3];
	const cleaned = numStr.replace(/,/g, "");
	const number = Number.parseFloat(cleaned);
	const decimalPart = cleaned.split(".")[1];
	const decimals = decimalPart ? decimalPart.length : 0;
	const hasCommas = numStr.includes(",");
	return { number, prefix, suffix, decimals, hasCommas };
}

function formatNumber(n: number, decimals: number, hasCommas: boolean) {
	const fixed = n.toFixed(decimals);
	if (!hasCommas) return fixed;
	const [int, dec] = fixed.split(".");
	const withCommas = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return dec ? `${withCommas}.${dec}` : withCommas;
}

function AnimatedStat({ value, label, borderRight = false }: { value: string; label: string; borderRight?: boolean }) {
	const [display, setDisplay] = useState("0");
	const ref = useRef<HTMLDivElement>(null);
	const hasRun = useRef(false);
	const parsed = parseStatValue(value);

	useEffect(() => {
		if (!parsed || hasRun.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting || hasRun.current) return;
				hasRun.current = true;
				observer.disconnect();

				const duration = 1200;
				const start = performance.now();
				const target = parsed.number;

				const animate = (now: number) => {
					const elapsed = now - start;
					const progress = Math.min(elapsed / duration, 1);
					// Ease-out cubic
					const eased = 1 - (1 - progress) ** 3;
					const current = eased * target;
					setDisplay(
						`${parsed.prefix}${formatNumber(current, parsed.decimals, parsed.hasCommas)}${parsed.suffix}`,
					);
					if (progress < 1) requestAnimationFrame(animate);
				};
				requestAnimationFrame(animate);
			},
			{ threshold: 0.3 },
		);

		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, [parsed]);

	return (
		<GridCell borderRight={borderRight} className="px-4 md:px-8 py-6 md:py-14 text-center">
			<CornerNotches size={10} />
			<div
				ref={ref}
				className="text-2xl md:text-4xl font-normal tracking-[-1px] text-[#C9A96E] mb-2 font-urbanist tabular-nums"
			>
				{hasRun.current || !parsed
					? display
					: `${parsed.prefix}${formatNumber(0, parsed.decimals, parsed.hasCommas)}${parsed.suffix}`}
			</div>
			<p className="text-[#A39E96] text-xs md:text-sm leading-snug">{label}</p>
		</GridCell>
	);
}

export function DataCredibility() {
	return (
		<div>
			{/* Heading row — stacked on mobile */}
			<GridSection columns="5fr 7fr" border>
				<GridCell borderRight className="px-6 md:px-12 py-8 md:py-12">
					<div className="flex items-center gap-3 mb-4 md:mb-6">
						<div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
						<span className="text-[#A39E96] text-xs font-medium uppercase tracking-[0.16em]">
							The engagement model
						</span>
					</div>
					<h2 className="text-3xl md:text-[48px] md:leading-[57.6px] font-normal tracking-[-0.48px] text-[#E8E4DE]">
						Structured around visible delivery data
					</h2>
				</GridCell>
				<GridCell className="px-6 md:px-12 py-4 md:py-12 flex items-end">
					<p className="text-[#A39E96] text-base md:text-lg leading-relaxed">
						We operate on a subscription model with weekly touchpoints, quarterly KPI planning,
						and a transparent usage policy so the AI employee keeps improving after launch.
					</p>
				</GridCell>
			</GridSection>

			{/* 4 stat cells — 2x2 grid on mobile, 4 columns on desktop */}
			<GridSection columns="1fr 1fr 1fr 1fr" mobileColumns="1fr 1fr" border>
				{stats.map((stat, i) => (
					<AnimatedStat
						key={stat.label}
						value={stat.value}
						label={stat.label}
						borderRight={i < stats.length - 1}
					/>
				))}
			</GridSection>

		</div>
	);
}
