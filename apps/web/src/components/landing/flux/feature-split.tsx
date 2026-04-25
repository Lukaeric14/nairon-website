import { useEffect, useRef, useState } from "react";
import { Globe, Lightbulb, Paperclip } from "lucide-react";
import { FLUX_FEATURE_SPLIT } from "@/data/flux";
import { LinearGlassCard, FluxSection } from "@/components/landing/flux/primitives";
import { cn } from "@/lib/utils";

function DashboardTerminal({ revealPromptCard }: { revealPromptCard: boolean }) {

	return (
		<div className="relative max-w-[560px] pb-10 pt-6 md:pt-10">
			<LinearGlassCard
				className="relative ml-6 overflow-hidden shadow-[0_42px_120px_rgba(0,0,0,0.72)] after:pointer-events-none after:absolute after:inset-0 after:rounded-[10px] after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_20%,rgba(0,0,0,1)_100%)] after:content-[''] md:ml-8"
				innerClassName="relative overflow-hidden"
			>
				<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(155deg,rgba(12, 12, 12, 0.07),transparent_35%)]" />
				<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(12, 12, 12, 0.06),transparent_38%)]" />

				<div className="relative flex items-center justify-between border-b border-[#0C0C0C]/[0.07] bg-black/28 px-5 py-3.5">
					<div className="flex items-center gap-2">
						<span className="size-3 rounded-full bg-[#ff5f57]" />
						<span className="size-3 rounded-full bg-[#febc2e]" />
						<span className="size-3 rounded-full bg-[#28c840]" />
					</div>
					<p className="font-inter text-[13px] text-[#1A1916]/45">nb context monitor</p>
					<div className="w-10" />
				</div>

				<div className="relative bg-[linear-gradient(180deg,#0b0b0b_0%,#090909_100%)] px-5 pb-24 pt-4 font-mono text-[13px] leading-[1.65] text-[#5C584F] md:px-6 md:text-[14px]">
					<p className="text-[#1A1916]/50">$ nb monitor --context --token-map</p>
					<p className="mt-3 text-emerald-300">Max context hit: 94% (188k / 200k)</p>
					<p className="text-[#1A1916]/55">Risk: context clipping likely in long turns</p>
				</div>
			</LinearGlassCard>

			<div
				className={cn(
					"absolute inset-x-0 bottom-0 z-20 overflow-hidden rounded-2xl border border-[#0C0C0C]/[0.12] bg-[linear-gradient(180deg,rgba(32,32,32,0.96),rgba(17,17,17,0.94))] px-4 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.58)] backdrop-blur-xl after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_20%,rgba(0,0,0,1)_100%)] after:content-[''] md:px-5",
					revealPromptCard ? "benchmark-chatbox-reveal" : "benchmark-chatbox-hidden",
				)}
			>
				<div className="relative rounded-xl border border-[#0C0C0C]/[0.08] bg-black/35 px-4 py-4 md:py-5">
					<p className="font-inter text-[18px] text-[#1A1916]/82 md:text-[19px]">Where can I cut down in tokens?</p>
				</div>
				<div className="relative mt-3 flex flex-wrap gap-2">
					<span className="inline-flex items-center gap-2 rounded-full border border-[#0C0C0C]/[0.12] bg-[#0C0C0C]/[0.02] px-3 py-1.5 font-inter text-[13px] text-[#1A1916]/65">
						<Paperclip className="size-4" />
						Attach
					</span>
					<span className="inline-flex items-center gap-2 rounded-full border border-[#0C0C0C]/[0.12] bg-[#0C0C0C]/[0.02] px-3 py-1.5 font-inter text-[13px] text-[#1A1916]/65">
						<Globe className="size-4" />
						Search
					</span>
					<span className="inline-flex items-center gap-2 rounded-full border border-[#0C0C0C]/[0.12] bg-[#0C0C0C]/[0.02] px-3 py-1.5 font-inter text-[13px] text-[#1A1916]/65">
						<Lightbulb className="size-4" />
						Reason
					</span>
				</div>
			</div>
		</div>
	);
}

export function FluxFeatureSplit() {
	const { left, right } = FLUX_FEATURE_SPLIT;
	const sequenceRef = useRef<HTMLDivElement>(null);
	const hasRunRef = useRef(false);
	const timerIdsRef = useRef<number[]>([]);
	const [reviewClicked, setReviewClicked] = useState(false);
	const [showActionsCard, setShowActionsCard] = useState(false);
	const [revealPromptCard, setRevealPromptCard] = useState(false);

	useEffect(() => {
		if (!sequenceRef.current) {
			return;
		}

		const runSequence = () => {
			if (hasRunRef.current) {
				return;
			}

			hasRunRef.current = true;
			setReviewClicked(true);

			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				setShowActionsCard(true);
				setRevealPromptCard(true);
				return;
			}

			timerIdsRef.current.push(window.setTimeout(() => setShowActionsCard(true), 340));
			timerIdsRef.current.push(window.setTimeout(() => setRevealPromptCard(true), 940));
		};

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						runSequence();
						observer.disconnect();
						break;
					}
				}
			},
			{ threshold: 0.45, rootMargin: "0px 0px -14% 0px" },
		);

		observer.observe(sequenceRef.current);

		return () => {
			observer.disconnect();
			for (const timerId of timerIdsRef.current) {
				window.clearTimeout(timerId);
			}
			timerIdsRef.current = [];
		};
	}, []);

	return (
		<FluxSection className="overflow-hidden pb-20 pt-16 md:pb-28 md:pt-24">
			<div className="relative">
				<div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(12, 12, 12, 0.14)_22%,rgba(12, 12, 12, 0.14)_78%,transparent)]" />
				<div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(12, 12, 12, 0.14)_22%,rgba(12, 12, 12, 0.14)_78%,transparent)]" />
				<div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(ellipse_at_top,rgba(12, 12, 12, 0.05)_0%,rgba(12, 12, 12, 0.02)_34%,rgba(12, 12, 12, 0)_72%)]" />
				<div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-[#0C0C0C]/[0.08] lg:block" />
				<div className="grid lg:grid-cols-2">
					<div className="px-1 py-12 md:px-8 md:py-16 lg:pr-16">
						<h2 className="font-inter text-[34px] font-[530] leading-[1.12] tracking-[-0.022em] text-[#1A1916] md:text-[42px]">
							{left.title}
						</h2>
						<p className="mt-4 max-w-[34ch] font-inter text-[16px] leading-[1.52] text-[#5C584F]">
							{left.description}
						</p>

						<div ref={sequenceRef} className="relative mt-10">
							<div className="pointer-events-none absolute -inset-x-14 -top-12 h-36 bg-[radial-gradient(ellipse_at_center,rgba(12, 12, 12, 0.08),transparent_70%)] blur-2xl" />
							<LinearGlassCard
								className="relative max-w-[560px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.68)] after:pointer-events-none after:absolute after:inset-0 after:rounded-[10px] after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_26%,rgba(0,0,0,1)_100%)] after:content-['']"
								innerClassName="relative overflow-hidden border-[#0C0C0C]/[0.06] bg-[linear-gradient(165deg,rgba(16,16,16,0.98)_0%,rgba(11,11,11,0.98)_100%)] p-6"
							>
								<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(155deg,rgba(12, 12, 12, 0.07),transparent_35%)]" />
								<p className="font-inter text-[18px] text-[#1A1916]/70">*</p>
								<p className="-mt-7 pl-8 font-inter text-[20px] font-[530] tracking-[-0.02em] text-[#1A1916]">
									{left.panelTitle}
								</p>

								<div className="mt-5 space-y-4 font-inter text-[14px] text-[#1A1916]/58">
									<div className="flex flex-wrap items-center gap-2">
										<span className="w-[112px] text-[#1A1916]/58">Phases</span>
										{left.suggestions.map((item) => (
											<span
												key={item}
												className={cn(
													"rounded-md border border-[#0C0C0C]/[0.08] bg-[#0C0C0C]/[0.02] px-2.5 py-1 text-[#1A1916]/62 shadow-[inset_0_1px_0_rgba(12, 12, 12, 0.06)] transition-[border-color,background,color,box-shadow,transform] duration-250",
													item === "Review" && reviewClicked && "benchmark-review-phase-clicked",
												)}
											>
												{item}
											</span>
										))}
									</div>
									<div className="flex items-center gap-3">
										<span className="w-[112px] text-[#1A1916]/58">Score</span>
										<span className="text-[#1A1916]/65">{left.duplicateOf}</span>
									</div>
									<div className="flex items-center gap-3">
										<span className="w-[112px] text-[#1A1916]/58">Friction</span>
										<span className="text-[#1A1916]/65">{left.relatedTo}</span>
									</div>
								</div>
							</LinearGlassCard>

							<LinearGlassCard
								className={cn(
									"relative -mt-3 ml-10 w-full max-w-[500px] overflow-hidden shadow-[0_36px_90px_rgba(0,0,0,0.76)] after:pointer-events-none after:absolute after:inset-0 after:rounded-[10px] after:bg-[linear-gradient(90deg,rgba(0,0,0,0)_24%,rgba(0,0,0,1)_100%)] after:content-[''] md:-mt-32 md:ml-36",
									showActionsCard ? "benchmark-actions-card-enter" : "benchmark-actions-card-pending",
								)}
								innerClassName="relative overflow-hidden border-[#0C0C0C]/[0.08] bg-[linear-gradient(165deg,#121212_0%,#0b0b0b_100%)] p-5"
							>
								<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(12, 12, 12, 0.06),transparent_38%)]" />
								<p className="font-inter text-[16px] font-[520] tracking-[-0.02em] text-[#1A1916]">
									{left.popover.headline}
								</p>
								<div className="mt-3 border-t border-[#0C0C0C]/[0.08] pt-4">
									<p className="font-inter text-[14px] leading-[1.45] text-[#1A1916]/58">
										{left.popover.description}
									</p>
									<div className="mt-3 space-y-2">
										{left.popover.commands.map((command) => (
											<p
												key={command}
												className="rounded-md border border-[#0C0C0C]/[0.08] bg-[#0C0C0C]/[0.02] px-3 py-2 font-mono text-[13px] text-[#1A1916]/72"
											>
												{command}
											</p>
										))}
									</div>
								</div>
								<div className="mt-4 border-t border-[#0C0C0C]/[0.08] pt-4">
									<p className="font-inter text-[15px] font-[520] text-[#1A1916]/85">Focus areas</p>
									<div className="mt-3 flex flex-wrap gap-2">
										{left.popover.alternatives.map((name) => (
											<span
												key={name}
												className="rounded-md border border-dashed border-[#0C0C0C]/[0.2] bg-[#0C0C0C]/[0.02] px-3 py-1.5 font-inter text-[13px] text-[#1A1916]/85"
											>
												{name}
											</span>
										))}
									</div>
								</div>
								<button
									type="button"
									className="mt-5 w-full rounded-xl border border-[#0C0C0C]/[0.1] bg-[linear-gradient(180deg,rgba(12, 12, 12, 0.07),rgba(12, 12, 12, 0.03))] px-4 py-2.5 font-inter text-[14px] font-[520] text-[#1A1916]/88 shadow-[inset_0_1px_0_rgba(12, 12, 12, 0.07)]"
								>
									{left.cta}
								</button>
							</LinearGlassCard>
						</div>
					</div>

					<div className="px-1 py-12 md:px-8 md:py-16 lg:pl-16">
						<h2 className="font-inter text-[34px] font-[530] leading-[1.12] tracking-[-0.022em] text-[#1A1916] md:text-[42px]">
							{right.title}
						</h2>
						<p className="mt-4 max-w-[34ch] font-inter text-[16px] leading-[1.52] text-[#5C584F]">
							{right.description}
						</p>

						<div className="relative mt-10 max-w-[560px] pb-3">
							<div className="pointer-events-none absolute -inset-x-14 -top-12 h-36 bg-[radial-gradient(ellipse_at_center,rgba(12, 12, 12, 0.08),transparent_70%)] blur-2xl" />
							<DashboardTerminal revealPromptCard={revealPromptCard} />
						</div>
					</div>
				</div>
			</div>
		</FluxSection>
	);
}
