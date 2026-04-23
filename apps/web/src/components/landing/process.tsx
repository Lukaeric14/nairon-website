import { useEffect, useRef, useState } from "react";
import { GridSection, GridCell } from "./grid-system";

const steps = [
	{
		number: "01",
		title: "Step 1: Identify",
		description:
			"We do a deep dive into your daily operations to map every workflow, surface the highest-leverage opportunities, and define the exact scope of what your first AI employee will take on.",
	},
	{
		number: "02",
		title: "Step 2: Audit",
		description:
			"We run a technical audit of your existing stack and design the AI infrastructure your business needs — so what we build integrates cleanly and empowers your team, without adding complexity to your operations.",
	},
	{
		number: "03",
		title: "Step 3: Implement",
		description:
			"Our engineers build, test, and deploy your AI employee directly into your environment — running on real hardware, integrated with your tools, and ready to operate end-to-end.",
	},
	{
		number: "04",
		title: "Step 4: Optimize",
		description:
			"We move from deployment into a weekly operating rhythm — monitoring performance, refining output, and continuously improving your AI employees so they only get better over time.",
	},
];

export function Process() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [visibleCount, setVisibleCount] = useState(0);

	useEffect(() => {
		const el = sectionRef.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					for (let i = 0; i < steps.length; i++) {
						setTimeout(() => setVisibleCount((c) => Math.max(c, i + 1)), i * 150);
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
			<div id="process" ref={sectionRef} className="scroll-mt-24 md:scroll-mt-28">
			{/* Mobile: title on top, full-width. Desktop: title left, steps right */}
			<GridSection columns="5fr 7fr">
				{/* Left: sticky heading */}
				<GridCell borderRight className="px-6 md:px-12 py-8 md:py-12">
					<div className="md:sticky md:top-24">
						<div className="flex items-center gap-3 mb-4 md:mb-6">
						<div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
						<span className="text-[#5C584F] text-xs font-medium uppercase tracking-[0.16em]">
							What we do
						</span>
					</div>
					<h2 className="text-3xl md:text-[48px] md:leading-[57.6px] font-normal tracking-[-0.48px] text-[#1A1916]">
						We deploy your AI{" "}
						<span className="font-serif italic text-[#C9A96E]">employee</span>{" "}
						in 4 steps
					</h2>
				</div>
			</GridCell>

				{/* Right: steps — full width on mobile */}
				<GridCell className="px-6 md:px-12 py-4 md:py-12">
					{steps.map((step, i) => (
						<div
							key={step.number}
							className={`py-6 md:py-8 ${i > 0 ? "border-t border-[#0C0C0C]/6" : ""} transition-all duration-500 ease-out ${
								i < visibleCount
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-4"
							}`}
						>
							<span className="text-[#C9A96E] text-sm font-medium tracking-[0.16em] block mb-2 md:mb-3">
								{step.number}
							</span>
							<h3 className="text-xl md:text-2xl font-normal text-[#1A1916] mb-2 md:mb-3">
								{step.title}
							</h3>
							<p className="text-[#5C584F] text-sm md:text-base leading-relaxed">
								{step.description}
							</p>
						</div>
					))}
				</GridCell>
			</GridSection>
		</div>
	);
}
