import { useEffect, useRef, useState } from "react";
import { GridSection, GridCell } from "./grid-system";

const steps = [
	{
		number: "01",
		title: "Week 1: Audit",
		description:
			"We map your workflows, identify the highest-leverage AI employee opportunity, and define the KPI, constraints, and handoffs before anything gets built.",
	},
	{
		number: "02",
		title: "Week 2: Build and deploy v1",
		description:
			"Our team builds the first working version and deploys it into your real stack so the system starts operating where it actually needs to live.",
	},
	{
		number: "03",
		title: "Week 3: Stress-test",
		description:
			"We probe edge cases, tighten permissions, validate exception handling, and make sure nothing important is leaking through the cracks.",
	},
	{
		number: "04",
		title: "Week 4: Go operational",
		description:
			"We move from pilot mode into a working operating rhythm with reporting, weekly touchpoints, and a backlog for the next optimization cycle.",
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
						<span className="text-[#A39E96] text-xs font-medium uppercase tracking-[0.16em]">
							How it works
						</span>
					</div>
					<h2 className="text-3xl md:text-[48px] md:leading-[57.6px] font-normal tracking-[-0.48px] text-[#E8E4DE]">
						From audit to{" "}
						<span className="font-serif italic text-[#C9A96E]">deployment</span>{" "}
						in four weeks
					</h2>
				</div>
			</GridCell>

				{/* Right: steps — full width on mobile */}
				<GridCell className="px-6 md:px-12 py-4 md:py-12">
					{steps.map((step, i) => (
						<div
							key={step.number}
							className={`py-6 md:py-8 ${i > 0 ? "border-t border-white/6" : ""} transition-all duration-500 ease-out ${
								i < visibleCount
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-4"
							}`}
						>
							<span className="text-[#C9A96E] text-sm font-medium tracking-[0.16em] block mb-2 md:mb-3">
								{step.number}
							</span>
							<h3 className="text-xl md:text-2xl font-normal text-[#E8E4DE] mb-2 md:mb-3">
								{step.title}
							</h3>
							<p className="text-[#A39E96] text-sm md:text-base leading-relaxed">
								{step.description}
							</p>
						</div>
					))}
				</GridCell>
			</GridSection>
		</div>
	);
}
