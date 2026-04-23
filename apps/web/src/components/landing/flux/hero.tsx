import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
	FLUX_HERO,
	FLUX_HERO_TERMINAL,
	FLUX_HERO_TERMINAL_BEFORE,
} from "@/data/flux";
import {
	GradientHeading,
	FluxSection,
	TerminalWindow,
} from "@/components/landing/flux/primitives";
import { FLUX_INSTALL_COMMAND } from "@/components/flux/install-prompt";

export function FluxHero() {
	const installCommand = FLUX_INSTALL_COMMAND;
	const [copied, setCopied] = useState(false);
	const [isDesktop, setIsDesktop] = useState(false);
	const [viewportReady, setViewportReady] = useState(false);
	const [hasInitialPose, setHasInitialPose] = useState(false);
	const [flattenProgress, setFlattenProgress] = useState(0);
	const [animatedFlattenProgress, setAnimatedFlattenProgress] = useState(0);
	const [terminalStepIndex, setTerminalStepIndex] = useState(0);
	const [animatedTerminalProgress, setAnimatedTerminalProgress] = useState(0);
	const [beforeTypedChars, setBeforeTypedChars] = useState(0);
	const [beforeShowMetrics, setBeforeShowMetrics] = useState(false);
	const terminalStageRef = useRef<HTMLDivElement | null>(null);
	const stepLockTimeoutRef = useRef<number | null>(null);
	const hasInitializedFlattenRef = useRef(false);
	const animatedFlattenRef = useRef(0);
	const targetFlattenRef = useRef(0);
	const animatedProgressRef = useRef(0);
	const targetProgressRef = useRef(0);
	const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

	useEffect(() => {
		const mediaQuery = window.matchMedia("(min-width: 768px)");
		const syncViewportMode = () => {
			const desktop = mediaQuery.matches;
			setIsDesktop(desktop);
			if (!desktop) {
				hasInitializedFlattenRef.current = false;
				setHasInitialPose(true);
				setFlattenProgress(1);
				setAnimatedFlattenProgress(1);
				animatedFlattenRef.current = 1;
				targetFlattenRef.current = 1;
				setTerminalStepIndex(5);
				setAnimatedTerminalProgress(1);
				animatedProgressRef.current = 1;
				targetProgressRef.current = 1;
			} else {
				hasInitializedFlattenRef.current = false;
				setHasInitialPose(false);
				setAnimatedFlattenProgress(0);
				animatedFlattenRef.current = 0;
				targetFlattenRef.current = 0;
				setTerminalStepIndex(0);
				setAnimatedTerminalProgress(0);
				animatedProgressRef.current = 0;
				targetProgressRef.current = 0;
			}
			setViewportReady(true);
		};

		syncViewportMode();
		mediaQuery.addEventListener("change", syncViewportMode);
		return () => mediaQuery.removeEventListener("change", syncViewportMode);
	}, []);

	useEffect(() => {
		if (!isDesktop) return;

		let rafId = 0;
		const updateOnScroll = () => {
			const terminalStage = terminalStageRef.current;
			if (!terminalStage) return;

			const viewportHeight = window.innerHeight || 1;
			const { top } = terminalStage.getBoundingClientRect();
			const flattenStart = viewportHeight * 0.76;
			const flattenEnd = viewportHeight * 0.12;
			const nextProgress = clamp01((flattenStart - top) / (flattenStart - flattenEnd));

			if (!hasInitializedFlattenRef.current) {
				hasInitializedFlattenRef.current = true;
				setHasInitialPose(true);
				setFlattenProgress(nextProgress);
				setAnimatedFlattenProgress(nextProgress);
				animatedFlattenRef.current = nextProgress;
				targetFlattenRef.current = nextProgress;
				return;
			}

			setFlattenProgress((current) =>
				Math.abs(current - nextProgress) > 0.005 ? nextProgress : current,
			);
		};

		const requestUpdate = () => {
			if (rafId !== 0) return;
			rafId = window.requestAnimationFrame(() => {
				rafId = 0;
				updateOnScroll();
			});
		};

		updateOnScroll();
		window.addEventListener("scroll", requestUpdate, { passive: true });
		window.addEventListener("resize", requestUpdate);

		return () => {
			window.removeEventListener("scroll", requestUpdate);
			window.removeEventListener("resize", requestUpdate);
			if (rafId !== 0) {
				window.cancelAnimationFrame(rafId);
			}
		};
	}, [isDesktop]);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(installCommand);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 2000);
		} catch {
			setCopied(false);
		}
	};

	const rawTerminalProgress = clamp01((flattenProgress - 0.34) / 0.62);
	const showComparison = isDesktop && terminalStepIndex >= 5 && animatedTerminalProgress >= 0.995;
	const canRenderTerminal = viewportReady && (!isDesktop || hasInitialPose);
	const beforeAngryLine = "> WE WERE LITERALLY JUST DOING THIS";
	const beforePanelLines = [
		...FLUX_HERO_TERMINAL_BEFORE.lines,
		beforeAngryLine.slice(0, beforeTypedChars),
		...(beforeShowMetrics
			? [
				"",
				"Tokens wasted: 847,291",
				"API hallucinations: 3",
				"Sanity remaining: 12%",
			]
			: []),
	];

	useEffect(() => {
		if (!showComparison) {
			setBeforeTypedChars(0);
			setBeforeShowMetrics(false);
			return;
		}

		setBeforeTypedChars(0);
		setBeforeShowMetrics(false);

		let intervalId = 0;
		let metricsTimeoutId = 0;
		const startTimeoutId = window.setTimeout(() => {
			intervalId = window.setInterval(() => {
				setBeforeTypedChars((count) => {
					if (count >= beforeAngryLine.length) {
						window.clearInterval(intervalId);
						metricsTimeoutId = window.setTimeout(() => {
							setBeforeShowMetrics(true);
						}, 460);
						return count;
					}
					return count + 1;
				});
			}, 45);
		}, 300);

		return () => {
			window.clearTimeout(startTimeoutId);
			if (intervalId) window.clearInterval(intervalId);
			if (metricsTimeoutId) window.clearTimeout(metricsTimeoutId);
		};
	}, [showComparison]);

	const terminalTransformStyle = isDesktop
		? {
				transform: `translate3d(${(-6 * (1 - animatedFlattenProgress)).toFixed(2)}%, ${(-12 * animatedFlattenProgress).toFixed(2)}%, 0px) scale(${(1.15 - animatedFlattenProgress * 0.15).toFixed(4)}) rotateX(${(47 * (1 - animatedFlattenProgress)).toFixed(2)}deg) rotateY(${(31 * (1 - animatedFlattenProgress)).toFixed(2)}deg) rotate(${(-36 * (1 - animatedFlattenProgress)).toFixed(2)}deg)`,
				transformOrigin: "top left",
				backfaceVisibility: "hidden" as const,
				willChange: "transform",
			}
		: undefined;

	const terminalBottomGradientStyle = isDesktop
		? {
				transform: `translateY(${(6 * animatedFlattenProgress).toFixed(2)}%)`,
				background: showComparison
					? "linear-gradient(transparent 64%, rgba(8,8,8,0.3) 86%, rgb(8,8,8) 100%)"
					: "linear-gradient(transparent 52%, rgba(8,8,8,0.5) 76%, rgb(8,8,8) 100%)",
			}
		: undefined;

	useEffect(() => {
		if (!isDesktop) return;
		const flattenFloorByStep = terminalStepIndex > 0 ? [1, 1, 1, 1, 1, 1] : [0, 1, 1, 1, 1, 1];
		const floor = flattenFloorByStep[terminalStepIndex] ?? 0;
		targetFlattenRef.current = Math.max(flattenProgress, floor);

		let rafId = 0;
		let lastTime = 0;
		const speedPerSecond = 0.42;

		const tick = (time: number) => {
			if (lastTime === 0) {
				lastTime = time;
			}

			const dt = (time - lastTime) / 1000;
			lastTime = time;

			const current = animatedFlattenRef.current;
			const target = targetFlattenRef.current;
			const diff = target - current;
			const step = speedPerSecond * dt;

			if (Math.abs(diff) <= step) {
				animatedFlattenRef.current = target;
				setAnimatedFlattenProgress(target);
				return;
			}

			const next = current + Math.sign(diff) * step;
			animatedFlattenRef.current = next;
			setAnimatedFlattenProgress(next);
			rafId = window.requestAnimationFrame(tick);
		};

		rafId = window.requestAnimationFrame(tick);
		return () => {
			if (rafId !== 0) {
				window.cancelAnimationFrame(rafId);
			}
		};
	}, [isDesktop, flattenProgress, terminalStepIndex]);
	useEffect(() => {
		if (!isDesktop) return;
		const pauseSteps = [0, 0.44, 0.64, 0.84, 0.95, 1];
		const lastIndex = pauseSteps.length - 1;

		const onWheel = (event: WheelEvent) => {
			if (Math.abs(event.deltaY) < 1) return;

			const isAnimating =
				Math.abs(animatedProgressRef.current - targetProgressRef.current) > 0.002;
			const isScrollingDown = event.deltaY > 0;
			const isScrollingUp = event.deltaY < 0;
			const canAdvance = terminalStepIndex < lastIndex;
			const canRewind = terminalStepIndex > 0;
			const sequenceStarted = rawTerminalProgress > 0.005 || terminalStepIndex > 0;
			const lockReady = rawTerminalProgress > 0.08;
			const lockActive = lockReady && (terminalStepIndex < lastIndex || isAnimating);

			if (!sequenceStarted && event.deltaY > 0) {
				if (isAnimating || stepLockTimeoutRef.current !== null) return;
				setTerminalStepIndex(1);
				stepLockTimeoutRef.current = window.setTimeout(() => {
					stepLockTimeoutRef.current = null;
				}, 380);
				return;
			}

			if (lockActive && ((isScrollingDown && canAdvance) || (isScrollingUp && canRewind) || isAnimating)) {
				event.preventDefault();
				event.stopPropagation();
			}

			if (!lockActive) return;
			if (isAnimating) return;
			if (stepLockTimeoutRef.current !== null) return;

			setTerminalStepIndex((current) => {
				const isFirstActivation = current === 0 && event.deltaY > 0;
				const next = isFirstActivation
					? 1
					: event.deltaY > 0
						? Math.min(current + 1, lastIndex)
						: Math.max(current - 1, 0);
				if (next !== current) {
					stepLockTimeoutRef.current = window.setTimeout(() => {
						stepLockTimeoutRef.current = null;
					}, 380);
				}
				return next;
			});
		};

		window.addEventListener("wheel", onWheel, { passive: false, capture: true });

		return () => {
			window.removeEventListener("wheel", onWheel, true);
			if (stepLockTimeoutRef.current !== null) {
				window.clearTimeout(stepLockTimeoutRef.current);
				stepLockTimeoutRef.current = null;
			}
		};
	}, [isDesktop, rawTerminalProgress, terminalStepIndex]);

	const pauseSteps = [0, 0.44, 0.64, 0.84, 0.95, 1];
	const stepProgress = pauseSteps[terminalStepIndex] ?? 0;

	useEffect(() => {
		if (!isDesktop) return;
		targetProgressRef.current = stepProgress;
		let rafId = 0;
		let lastTime = 0;
		const speedPerSecond = 0.2;

		const tick = (time: number) => {
			if (lastTime === 0) {
				lastTime = time;
			}

			const dt = (time - lastTime) / 1000;
			lastTime = time;

			const current = animatedProgressRef.current;
			const target = targetProgressRef.current;
			const diff = target - current;
			const step = speedPerSecond * dt;

			if (Math.abs(diff) <= step) {
				animatedProgressRef.current = target;
				setAnimatedTerminalProgress(target);
				return;
			}

			const next = current + Math.sign(diff) * step;
			animatedProgressRef.current = next;
			setAnimatedTerminalProgress(next);
			rafId = window.requestAnimationFrame(tick);
		};

		rafId = window.requestAnimationFrame(tick);
		return () => {
			if (rafId !== 0) {
				window.cancelAnimationFrame(rafId);
			}
		};
	}, [isDesktop, stepProgress]);

	const terminalTextProgress = isDesktop ? animatedTerminalProgress : 1;

	return (
		<FluxSection className="overflow-hidden pb-0 pt-36 md:pt-44">
			<div className="pointer-events-none absolute inset-0 -z-10 bg-[rgb(8,8,8)]" />
			<div className="pointer-events-none absolute inset-x-0 top-[-24rem] -z-10 mx-auto h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle,rgba(49,255,103,0.08)_0%,rgba(49,255,103,0.03)_28%,transparent_72%)] blur-3xl" />
			<div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(12, 12, 12, 0.06),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(34,219,24,0.05),transparent_34%)]" />

			<div className="md:px-4">
				<div className="inline-flex items-center rounded-full border border-[#0C0C0C]/12 bg-[#0C0C0C]/[0.03] px-4 py-1.5 font-inter text-[11px] uppercase tracking-[0.16em] text-[#1A1916]/70">
					{FLUX_HERO.badge}
				</div>
				<GradientHeading className="mt-8 max-w-[18ch] overflow-visible pb-[0.08em] text-center text-[2rem] leading-[1.06] sm:max-w-none sm:text-[2.65rem] md:text-left md:text-[3.5rem] lg:text-[3.75rem]">
					{FLUX_HERO.headline}
				</GradientHeading>
				<p className="mt-6 max-w-xl text-center font-inter text-[17px] leading-[1.6] text-[#5C584F] md:max-w-none md:text-left md:whitespace-nowrap">
					{FLUX_HERO.description}
				</p>
				<div className="mx-auto mt-8 w-full max-w-[680px] md:mx-0">
					<div className="flex items-center gap-3 rounded-2xl border border-[#0C0C0C]/10 bg-[linear-gradient(180deg,rgba(12, 12, 12, 0.04),rgba(12, 12, 12, 0.015))] px-5 py-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
						<p className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-[16px] text-[#1A1916]/85 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
							{installCommand}
						</p>
						<button
							type="button"
							onClick={handleCopy}
							className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#0C0C0C]/12 bg-black/25 text-[#1A1916]/80 transition hover:text-[#1A1916]"
							aria-label={copied ? "Command copied" : "Copy install command"}
						>
							{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
						</button>
					</div>
					<p className="mt-2 text-xs text-[#1A1916]/45">Run this slash command in Claude chat input, not in terminal bash.</p>
				</div>
			</div>

			<div ref={terminalStageRef} className="relative mt-16 md:mt-36">
				<div className="pointer-events-none absolute inset-x-[10%] top-[0%] h-28 bg-[radial-gradient(ellipse_at_center,rgba(102,255,143,0.10),rgba(102,255,143,0)_72%)] blur-2xl" />
				<div className="md:-ml-16">
					<div className="relative md:h-[760px] md:w-[1800px]">
						<div className="relative h-full w-full md:[perspective-origin:100%_0px] md:[perspective:4000px] md:[transform-style:preserve-3d]">
							<div
								className="relative md:absolute md:inset-0 md:w-[1600px]"
								style={terminalTransformStyle}
							>
								{canRenderTerminal ? (
									<div className="flex items-start gap-7">
										<div
											className={`transition-all duration-700 ease-out ${showComparison ? "w-[58%]" : "w-full"}`}
										>
											<TerminalWindow
												title={FLUX_HERO_TERMINAL.title}
												lines={FLUX_HERO_TERMINAL.lines}
												animateLines={isDesktop && !showComparison}
												showStatic={!isDesktop || showComparison}
												revealProgress={terminalTextProgress}
												className="before:pointer-events-none before:absolute before:inset-0 before:rounded-[10px] before:bg-[linear-gradient(160deg,rgba(12, 12, 12, 0.10)_0%,transparent_30%)] before:content-['']"
											/>
										</div>
										<div
											className={`overflow-hidden transition-all duration-700 ease-out ${showComparison ? "w-[42%] opacity-100 translate-x-0" : "w-0 opacity-0 translate-x-6 pointer-events-none"}`}
										>
											<div className="mb-2 inline-flex items-center rounded-full border border-[#0C0C0C]/10 bg-[#0C0C0C]/[0.03] px-3 py-1 font-inter text-[11px] uppercase tracking-[0.14em] text-[#1A1916]/55">
												Without Flux
											</div>
											<TerminalWindow
												title={FLUX_HERO_TERMINAL_BEFORE.title}
												lines={beforePanelLines}
												animateLines={false}
												showStatic
												className="before:pointer-events-none before:absolute before:inset-0 before:rounded-[10px] before:bg-[linear-gradient(160deg,rgba(255,76,112,0.28)_0%,rgba(255,76,112,0.12)_28%,transparent_52%)] before:content-['']"
											/>
										</div>
									</div>
								) : (
									<div className="h-[620px] w-full rounded-[10px] border border-[#0C0C0C]/[0.04] bg-[rgba(14,14,14,0.98)]" />
								)}
							</div>
						</div>
						<div
							className="pointer-events-none absolute inset-0 z-10"
							style={terminalBottomGradientStyle}
						/>
					</div>
				</div>
			</div>
		</FluxSection>
	);
}
