import type { CSSProperties } from "react";
import { useState } from "react";
import KanbanIllustration from "@/components/ui/illustrations/kanban";
import { ServerIllustration } from "@/components/ui/illustrations/server-illustration";

const features = [
	{
		title: "",
		description:
			"Your AI employees don't live in a prompt window. They'll live in a dedicated Mac mini in our data center - online and working 24/7, even while you're not.",
	},
	{
		title: "",
		description:
			"Every action, decision, and output happens inside Hive - our proprietary platform built for operating AI employees at scale. It's where you watch them work, message them like any other team member, and track every action they take, in real time.",
	},
];

const SCENE_VARS = {
	"--color-primary": "#C9A96E",
	"--color-foreground": "232 228 222",
	"--color-background": "#0F100E",
	"--color-border": "rgba(12, 12, 12, 0.12)",
	"--color-muted": "rgba(12, 12, 12, 0.05)",
} as CSSProperties;

export default function ExpandableFeatures() {
	const [activeIndex, setActiveIndex] = useState(0);

	const isLeftActive = activeIndex === 0;
	const isRightActive = activeIndex === 1;

	return (
		<section className="@container border-b border-[rgba(12,12,12,0.06)] bg-transparent pt-10 pb-24 md:pt-12">
			<div className="mx-auto max-w-5xl px-6" style={SCENE_VARS}>
				<div className="flex flex-col md:flex-row md:items-stretch md:gap-10">
					{/* Left column — box containing title + server illustration */}
					<div
						className="flex flex-1 flex-col cursor-pointer rounded-2xl border p-6 transition-colors duration-700 md:p-10"
						style={{
							"--color-shell": "#E5DFD2",
							"--color-background": "#F5F2EB",
							"--color-illustration": "#FFFFFF",
							borderColor: isLeftActive
								? "rgba(201,169,110,0.4)"
								: "rgba(12,12,12,0.08)",
							background: isLeftActive
								? "rgba(201,169,110,0.04)"
								: "transparent",
							boxShadow: isLeftActive
								? "0 0 0 4px rgba(201,169,110,0.06)"
								: "none",
						} as CSSProperties}
						onMouseEnter={() => setActiveIndex(0)}
						onFocus={() => setActiveIndex(0)}
					>
						<h2
							className="mb-8 text-center text-2xl font-normal tracking-[-0.48px] text-[#1A1916] transition-all duration-500 md:mb-10 md:text-[36px] md:leading-[44px]"
							style={{
								opacity: isLeftActive ? 1 : 0.45,
							}}
						>
							Live In{" "}
							<span className="font-serif italic text-[#C9A96E] text-[1.1em]">Your Hardware</span>
						</h2>
						<div
							className="flex flex-1 items-center justify-center transition-all duration-500"
							style={{
								opacity: isLeftActive ? 1 : 0.4,
								transform: isLeftActive ? "scale(1)" : "scale(0.97)",
							}}
						>
							<ServerIllustration isActive />
						</div>
					</div>

					{/* Full-height divider */}
					<div className="hidden md:block w-px self-stretch bg-[rgba(12,12,12,0.06)]" />

					{/* Right column — box containing title + illustration */}
					<div
						className="flex flex-1 flex-col cursor-pointer rounded-2xl border p-6 transition-colors duration-700 md:p-10"
						style={{
							borderColor: isRightActive
								? "rgba(201,169,110,0.4)"
								: "rgba(12,12,12,0.08)",
							background: isRightActive
								? "rgba(201,169,110,0.04)"
								: "transparent",
							boxShadow: isRightActive
								? "0 0 0 4px rgba(201,169,110,0.06)"
								: "none",
						}}
						onMouseEnter={() => setActiveIndex(1)}
						onFocus={() => setActiveIndex(1)}
					>
						<h2
							className="mt-0 mb-8 text-center text-2xl font-normal tracking-[-0.48px] text-[#1A1916] transition-all duration-500 md:mb-10 md:text-[36px] md:leading-[44px]"
							style={{
								opacity: isRightActive ? 1 : 0.45,
							}}
						>
							Work On{" "}
							<span className="font-serif italic text-[#C9A96E] text-[1.1em]">Our Platform</span>
						</h2>
						<div
							className="flex flex-1 flex-col items-center justify-start gap-3 overflow-hidden transition-all duration-500 md:gap-4"
							style={{
								opacity: isRightActive ? 1 : 0.4,
								transform: isRightActive ? "scale(1)" : "scale(0.97)",
							}}
						>
							<img
								src="/hive-logo.png"
								alt="Hive"
								className="h-10 w-auto md:h-14"
							/>
							<div className="w-80 md:w-[380px]">
								<KanbanIllustration />
							</div>
						</div>
					</div>
				</div>

				{/* Description under the entire split — switches on hover */}
				<div className="mt-12 md:mt-16 flex justify-center">
					<p
						key={activeIndex}
						className="max-w-3xl text-center text-sm leading-relaxed text-[#5C584F] md:text-base animate-fade-in"
					>
						{features[activeIndex].title && (
							<>
								<strong className="font-medium text-[#C9A96E]">
									{features[activeIndex].title}.
								</strong>{" "}
							</>
						)}
						{features[activeIndex].description}
					</p>
				</div>
			</div>
		</section>
	);
}
