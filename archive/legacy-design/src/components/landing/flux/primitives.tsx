import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function FluxSection({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<section className={cn("relative py-28 md:py-40", className)}>
			<div className="mx-auto w-full max-w-7xl px-6">{children}</div>
		</section>
	);
}

export function SectionDivider({ className }: { className?: string }) {
	return <div className={cn("mx-auto h-px w-full max-w-7xl bg-[#0C0C0C]/[0.06]", className)} />;
}

export function GradientHeading({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<h2
			className={cn(
				"text-gradient-linear text-5xl font-[510] leading-[0.98] tracking-[-0.022em] md:text-7xl lg:text-8xl",
				className,
			)}
		>
			{children}
		</h2>
	);
}

export function LinearGlassCard({
	children,
	className,
	innerClassName,
}: {
	children?: ReactNode;
	className?: string;
	innerClassName?: string;
}) {
	return (
		<div
			className={cn(
				"rounded-[10px] bg-gradient-to-b from-white/[0.12] via-white/[0.07] to-white/[0.02] p-px",
				className,
			)}
		>
			<div
				className={cn(
					"rounded-[9px] border border-[#0C0C0C]/[0.05] bg-[rgba(14,14,14,0.98)] backdrop-blur-xl",
					innerClassName,
				)}
			>
				{children}
			</div>
		</div>
	);
}

export function TerminalWindow({
	title,
	lines,
	animateLines = true,
	showStatic = false,
	revealProgress,
	className,
}: {
	title: string;
	lines: readonly string[];
	animateLines?: boolean;
	showStatic?: boolean;
	revealProgress?: number;
	className?: string;
}) {
	const outputRef = useRef<HTMLDivElement | null>(null);
	const { visibleCount, firstLineText } = useMemo(() => {
		if (showStatic) {
			const firstLine = lines[0] ?? "";
			return { visibleCount: lines.length, firstLineText: firstLine };
		}
		if (!animateLines) {
			return { visibleCount: 0, firstLineText: "" };
		}

		const progress = Math.min(1, Math.max(0, revealProgress ?? 0));
		const line0 = lines[0] ?? "";

		const lineCountForProgress = (
			value: number,
			start: number,
			end: number,
			from: number,
			to: number,
			easePower = 1,
		) => {
			if (value <= start) return from;
			if (value >= end) return to;
			const local = (value - start) / (end - start);
			const eased = Math.pow(Math.min(1, Math.max(0, local)), easePower);
			if (to <= from) return from;
			const next = from + Math.floor(eased * (to - from));
			return Math.min(to, Math.max(from, next));
		};

		const typedCharsForProgress = (value: number, start: number, end: number, text: string) => {
			if (value <= start) return 0;
			if (value >= end) return text.length;
			const local = (value - start) / (end - start);
			return Math.floor(local * text.length);
		};

		if (progress <= 0.18) {
			const chars = typedCharsForProgress(progress, 0.02, 0.18, line0);
			const count = chars > 0 ? 1 : 0;
			return { visibleCount: count, firstLineText: line0.slice(0, chars) };
		}

		if (progress <= 0.44) {
			const count = lineCountForProgress(progress, 0.18, 0.44, 1, 14);
			return { visibleCount: count, firstLineText: line0 };
		}

		if (progress <= 0.64) {
			const count = lineCountForProgress(progress, 0.44, 0.64, 14, 22, 0.68);
			return { visibleCount: count, firstLineText: line0 };
		}

		if (progress <= 0.84) {
			const count = lineCountForProgress(progress, 0.64, 0.84, 22, 32, 1.08);
			return { visibleCount: count, firstLineText: line0 };
		}

		if (progress <= 0.95) {
			const count = lineCountForProgress(progress, 0.84, 0.95, 32, 38, 1.02);
			return { visibleCount: count, firstLineText: line0 };
		}

		const count = lineCountForProgress(progress, 0.95, 1, 38, lines.length, 0.7);
		return { visibleCount: count, firstLineText: line0 };
	}, [animateLines, lines, revealProgress, showStatic]);

	useEffect(() => {
		if (!animateLines || showStatic || visibleCount === 0) return;
		const output = outputRef.current;
		if (!output) return;
		output.scrollTop = output.scrollHeight;
	}, [animateLines, showStatic, visibleCount]);

	const visibleLines = showStatic
		? lines
		: animateLines
			? lines.slice(0, visibleCount)
			: [];

	return (
		<LinearGlassCard
			className={cn("relative shadow-[0_42px_120px_rgba(0,0,0,0.72)]", className)}
			innerClassName="overflow-hidden"
		>
			<div className="flex items-center justify-between border-b border-[#0C0C0C]/[0.07] bg-black/30 px-6 py-4">
				<div className="flex items-center gap-2.5">
					<span className="size-3.5 rounded-full bg-[#ff5f57]" />
					<span className="size-3.5 rounded-full bg-[#febc2e]" />
					<span className="size-3.5 rounded-full bg-[#28c840]" />
				</div>
				<p className="font-inter text-[13px] text-[#1A1916]/45">{title}</p>
				<div className="w-12" />
			</div>
			<div
				ref={outputRef}
				className="scroll-fade-y scrollbar-thin h-[500px] overflow-y-auto bg-[linear-gradient(180deg,#0b0b0b_0%,#090909_100%)] px-7 pb-24 pt-6 font-mono text-[16px] leading-[1.7] text-[#5C584F] md:h-[640px] md:pb-32 md:text-[18px]"
			>
				{visibleLines.map((line, index) => (
					<div
						key={`${line}-${index}`}
						className={cn(
							!showStatic && animateLines ? "terminal-line" : "",
							(line.startsWith("$") ||
								line.startsWith("  nb") ||
								line.includes("Overall Score") ||
								line.startsWith("+ Setup complete!") ||
								line.startsWith("One-shot.") ||
								line.startsWith("Context preserved.")) &&
								"text-[#84ef95]",
							line.startsWith("Your Score:") && "text-[#f5d06a]",
							(line.includes("WE WERE LITERALLY JUST DOING THIS") ||
								line.startsWith("> WE WERE LITERALLY JUST DOING THIS")) &&
								"text-[#ff7f98]",
							(line.startsWith("Tokens wasted:") ||
								line.startsWith("API hallucinations:") ||
								line.startsWith("Sanity remaining:")) &&
								"text-[#5C584F]",
						)}
					>
						{index === 0 && !showStatic && animateLines ? firstLineText || "\u00a0" : line || "\u00a0"}
					</div>
				))}
				<div
					className={cn(
						"mt-1 h-4 w-2 rounded-[2px] bg-[#71ff6b]/80",
						animateLines && !showStatic ? "terminal-cursor" : "terminal-cursor-pending",
					)}
				/>
			</div>
		</LinearGlassCard>
	);
}
