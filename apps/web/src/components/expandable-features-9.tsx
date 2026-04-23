import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { SceneIllustration } from "@/components/ui/illustrations/scene-illustration";
import { ChevronDown, ChevronUp, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
	{
		title: "The House",
		description:
			"Your AI employees don't live in a prompt window. They'll live in a dedicated Mac mini in our data center — online and working 24/7, even while you're not.",
	},
	{
		title: "The Office",
		description:
			"Every action, decision, and output happens inside Hive — our proprietary platform built for operating AI employees at scale. It's where you watch them work, message them like any other team member, and track every action they take, in real time.",
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
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

	const handleSelect = (index: number) => {
		setExpandedIndex(expandedIndex === index ? null : index);
	};

	return (
		<section className="@container bg-transparent py-24">
			<div className="mx-auto max-w-5xl px-6" style={SCENE_VARS}>
				<div className="mb-12 text-balance">
					<div className="mb-4 flex items-center gap-3">
						<div className="h-1.5 w-1.5 rounded-full bg-[#C9A96E]" />
						<span className="text-xs font-medium uppercase tracking-[0.16em] text-[#5C584F]">
							How it works
						</span>
					</div>
					<h2 className="max-w-3xl text-3xl font-normal tracking-[-0.48px] text-[#1A1916] md:text-[48px] md:leading-[57.6px]">
						Lives in{" "}
						<span className="font-serif italic text-[#C9A96E]">your hardware</span>.
						Works on{" "}
						<span className="font-serif italic text-[#C9A96E]">our platform</span>.
					</h2>
				</div>
				<div className="grid items-center lg:grid-cols-5">
					<div className="relative z-10 lg:col-span-2">
						<AnimatePresence>
							{typeof expandedIndex === "number" && (
								<motion.div
									initial={{ opacity: 0, scale: 0.75, y: 44, filter: "blur(4px)" }}
									animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
									exit={{ opacity: 0, scale: 0.75, y: 44, filter: "blur(4px)" }}
									className="absolute inset-y-0 flex items-center justify-center gap-3 max-sm:-inset-x-4 max-sm:justify-between sm:flex-col lg:-left-8 lg:-translate-x-full"
								>
									<Button
										size="icon"
										variant="outline"
										className="rounded-full border-[#0C0C0C]/10 bg-[#0C0C0C]/[0.03] text-[#1A1916] hover:bg-[#0C0C0C]/[0.06] hover:text-[#1A1916]"
										disabled={expandedIndex === null || expandedIndex === 0}
										onClick={() =>
											expandedIndex !== null && handleSelect(expandedIndex - 1)
										}
									>
										<ChevronUp />
									</Button>
									<Button
										size="icon"
										variant="outline"
										className="rounded-full border-[#0C0C0C]/10 bg-[#0C0C0C]/[0.03] text-[#1A1916] hover:bg-[#0C0C0C]/[0.06] hover:text-[#1A1916]"
										disabled={
											expandedIndex === null || expandedIndex === features.length - 1
										}
										onClick={() =>
											expandedIndex !== null && handleSelect(expandedIndex + 1)
										}
									>
										<ChevronDown />
									</Button>
								</motion.div>
							)}
						</AnimatePresence>

						<div className="space-y-3 max-lg:px-16 max-sm:px-9">
							<LayoutGroup>
								{features.map((feature, index) => {
									const isActive = expandedIndex === index;
									return (
										<motion.div
											layout
											layoutDependency={expandedIndex}
											layoutId={feature.title}
											key={feature.title}
											data-expanded={isActive}
											initial={false}
											animate={{
												paddingTop: isActive ? 18 : 0,
												paddingBottom: isActive ? 18 : 0,
												width: isActive ? "100%" : "fit-content",
											}}
											transition={{
												layout: { type: "spring", bounce: 0.2, duration: 0.5 },
												type: "spring",
												bounce: 0.2,
												duration: 0.6,
											}}
											className={cn(
												"group relative min-w-0 max-w-xs overflow-hidden rounded-3xl text-left ring transition-colors duration-500 max-md:mx-auto",
												isActive
													? "w-full bg-[linear-gradient(180deg,rgba(201,169,110,0.10),rgba(12, 12, 12, 0.04))] text-[#1A1916] ring-[#C9A96E]/22 shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
													: "text-[#5C584F] ring-white/8 hover:text-[#1A1916] hover:ring-[#C9A96E]/18",
											)}
										>
											<AnimatePresence initial={false}>
												{!isActive && (
													<motion.button
														layout="position"
														onClick={() => handleSelect(index)}
														initial={{ opacity: 0, filter: "blur(4px)", y: 4 }}
														animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
														exit={{ opacity: 0, filter: "blur(4px)", y: -4 }}
														transition={{ duration: 0.5 }}
															className="flex h-10 cursor-pointer items-center gap-2 px-4"
														>
															<PlusCircle className="size-3.5 text-[#C9A96E]" />
															<h3 className="text-nowrap text-sm font-medium">
																{feature.title}
															</h3>
													</motion.button>
												)}

												{isActive && (
													<motion.div
														layout="position"
														initial={{
															opacity: 0,
															height: 0,
															filter: "blur(4px)",
															y: 4,
														}}
														animate={{
															opacity: 1,
															height: "auto",
															filter: "blur(0px)",
															y: 0,
														}}
														exit={{
															opacity: 0,
															height: 0,
															filter: "blur(4px)",
															y: -4,
														}}
														transition={{
															duration: 0.6,
															type: "spring",
															bounce: 0.2,
														}}
															className="px-6"
														>
															<p className="max-w-md text-sm leading-relaxed text-[#5C584F] md:text-base">
																<strong className="font-medium text-[#C9A96E]">
																	{feature.title}.
																</strong>{" "}
																{feature.description}
														</p>
													</motion.div>
												)}
											</AnimatePresence>
										</motion.div>
									);
								})}
							</LayoutGroup>
						</div>
					</div>

					<div className="max-lg:row-start-1 lg:col-span-3 lg:-translate-x-20">
						<SceneIllustration activeDevice={expandedIndex} />
					</div>
				</div>
			</div>
		</section>
	);
}
