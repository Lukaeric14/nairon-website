import { BarChart3, Brain, Search, Shield } from "lucide-react";
import { GridSection, GridCell, CornerNotches } from "./grid-system";

const features = [
	{
		icon: Search,
		title: "Talent Sourcing",
		description:
			"We source AI-native engineers from our vetted network of 2,000+ technical builders across the Gulf and globally.",
	},
	{
		icon: BarChart3,
		title: "Flux Assessment",
		description:
			"Every candidate is scored with our proprietary AI-nativeness benchmark — measuring architecture, tooling, eval discipline, and engineering culture.",
	},
	{
		icon: Brain,
		title: "Culture Matching",
		description:
			"Beyond technical skill, we map collaboration style, communication patterns, and how they build within a team.",
	},
	{
		icon: Shield,
		title: "Risk Mitigation",
		description:
			"Reference deep-dives, background verification, and 90-day placement guarantee. We stand behind every hire.",
	},
];

export function WhatWeDo() {
	return (
		<div id="what-we-do">
			{/* Heading row: full width */}
			<GridSection columns="1fr" border>
				<GridCell className="px-12 pt-12 pb-10">
					<div className="flex items-center gap-3 mb-6">
						<div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
						<span className="text-[#5C584F] text-xs font-medium uppercase tracking-[0.16em]">
							What we do
						</span>
					</div>
					<h2 className="text-4xl md:text-[48px] md:leading-[57.6px] font-normal tracking-[-0.48px] text-[#1A1916] max-w-3xl">
						Data-driven technical recruiting,{" "}
						<span className="text-[#C9A96E]">not guesswork</span>
					</h2>
				</GridCell>
			</GridSection>

			{/* Feature cards: 2×2 grid with column dividers */}
			<GridSection columns="1fr 1fr" border>
				{features.map((feature, i) => (
					<GridCell
						key={feature.title}
						borderRight={i % 2 === 0}
						borderBottom={i < 2}
						className="p-10 md:p-12"
					>
						<CornerNotches size={12} />
						<feature.icon className="w-6 h-6 text-[#C9A96E] mb-5" strokeWidth={1.5} />
						<h3 className="text-xl font-medium text-[#1A1916] mb-3">
							{feature.title}
						</h3>
						<p className="text-[#5C584F] text-base leading-relaxed">
							{feature.description}
						</p>
					</GridCell>
				))}
			</GridSection>
		</div>
	);
}
