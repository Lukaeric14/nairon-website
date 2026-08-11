// "Our platform & Services" — a section header (label + title + supporting
// copy), a full-width "book a demo" bar, then a vertical tab rail on the left
// driving a product-screenshot panel on the right. Modeled on the
// building-blocks reference layout; copy + screenshots are placeholders for now.

import { useEffect, useRef, useState, type ComponentType, type SVGProps } from "react";
import { useInView, useReducedMotion } from "motion/react";
import {
	ArrowRightIcon,
	ArrowUpRightIcon,
	PlusIcon,
	CpuChipIcon,
	Squares2X2Icon,
	UsersIcon,
} from "@heroicons/react/24/outline";
import { CAL_ATTRS } from "./cal";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

interface Tab {
	id: string;
	label: string;
	icon: Icon;
	/** Panel heading + one-line description shown on the right. */
	title: string;
	description: string;
	image: string;
	imageAlt: string;
	/** Optional ordered frames played as a looping crossfade animation. */
	frames?: string[];
	/** Optional per-frame hold times (ms). Falls back to the default pacing. */
	holds?: number[];
}

const TABS: Tab[] = [
	{
		id: "agents",
		label: "Agents",
		icon: CpuChipIcon,
		title: "AI Employees",
		description:
			"We architect custom agent systems that handle your end-to-end workflows.",
		image: "/platform/agents1.png",
		imageAlt: "Intelligent document processing: agents extracting and routing structured data",
		frames: ["/platform/agents1.png", "/platform/agents2.png", "/platform/agents3.png"],
	},
	{
		id: "ai-workspace",
		label: "AI Workspace",
		icon: Squares2X2Icon,
		title: "Hive",
		description:
			"Where your team and AI agents work side by side: assign, review, and approve in one place.",
		image: "/platform/hive1.png",
		imageAlt: "Hive workspace showing a human and AI agent collaborating in a thread",
		frames: ["/platform/hive1.png", "/platform/hive2.png", "/platform/hive3.png"],
	},
	{
		id: "embedded-experts",
		label: "Embedded experts",
		icon: UsersIcon,
		title: "Crew",
		description:
			"A dedicated team of AI consultants and engineers who deploy, tune, and drive adoption across your org.",
		image: "/platform/crew1.png",
		imageAlt: "Team roster of Nairon AI consultants and engineers",
		frames: ["/platform/crew1.png", "/platform/crew2.png"],
		// Slower pacing — linger on the roster, then hold the opened profile.
		holds: [3000, 3800],
	},
];

export function Platform() {
	const [activeId, setActiveId] = useState(TABS[0].id);
	const active = TABS.find((t) => t.id === activeId) ?? TABS[0];

	// Advance to the next card — driven by each card's animation after it has
	// looped a couple of times, so the section auto-tours all three.
	const advanceTab = () => {
		setActiveId((cur) => {
			const idx = TABS.findIndex((t) => t.id === cur);
			return TABS[(idx + 1) % TABS.length].id;
		});
	};

	return (
		<section className="bg-ds-surface font-geist text-ds-text-primary">
			<div className="mx-auto max-w-7xl px-5 py-24">
				{/* ── Header ─────────────────────────────────────────────── */}
				<div className="flex items-center gap-2.5">
					<span className="relative grid place-items-center">
						<span
							className="size-2.5 rounded-full"
							style={{ backgroundColor: "var(--brand-blue)" }}
						/>
						<span
							className="absolute size-3.5 rounded-full blur-[3px]"
							style={{
								backgroundColor: "color-mix(in srgb, var(--brand-blue) 40%, transparent)",
							}}
						/>
					</span>
					<span className="font-geist-mono text-[0.75rem] font-medium uppercase tracking-[0.16em] text-ds-text-primary">
						Our platform &amp; Services
					</span>
				</div>

				<div className="mt-7 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
					<h2 className="text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
						Simple, Custom,
						<br />
						AI Integration
					</h2>
					<div className="space-y-4 lg:pt-1.5">
						<p className="max-w-md text-[1.0625rem] leading-relaxed text-ds-text-secondary">
							Deploy on your existing stack, configure for your operations, train on
							your data. Models get smarter as your business changes.
						</p>
					</div>
				</div>

				{/* ── Demo bar ───────────────────────────────────────────── */}
				<div
					className="mt-14 flex items-center gap-4 rounded-sm px-6 py-5"
					style={{
						backgroundColor: "color-mix(in srgb, var(--brand-blue) 9%, transparent)",
					}}
				>
					<span className="text-[0.9375rem] font-medium text-ds-text-primary">
						Get a tailored walkthrough
					</span>
					<a
						href="#book-demo"
						{...CAL_ATTRS}
						className="group ml-auto inline-flex items-center gap-1.5 rounded-none px-5 py-2.5 font-geist-mono text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-white transition-all hover:brightness-110"
						style={{ backgroundColor: "var(--brand-blue)" }}
					>
						Book a demo
						<ArrowUpRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
					</a>
				</div>

				{/* ── Tabs + panel ───────────────────────────────────────── */}
				<div className="mt-5 grid gap-3 lg:grid-cols-[280px_1fr]">
					{/* Tab rail — each tab is its own filled card; the active one is darker */}
					<div className="flex flex-col gap-3">
						{TABS.map((tab) => {
							const Ico = tab.icon;
							const isActive = tab.id === activeId;
							return (
								<button
									key={tab.id}
									type="button"
									onClick={() => setActiveId(tab.id)}
									className={`group flex items-center gap-3 px-5 py-7 text-left transition-colors ${
										isActive
											? "bg-[#E5E5E5]"
											: "bg-[#F2F2F2] hover:bg-[#EAEAEA]"
									}`}
								>
									<Ico
										className="size-5 shrink-0"
										strokeWidth={1.5}
										style={{
											color: isActive ? "var(--brand-blue)" : "var(--ds-text-tertiary)",
										}}
									/>
									<span
										className={`flex-1 text-[1.0625rem] ${
											isActive
												? "font-medium text-ds-text-primary"
												: "text-ds-text-tertiary"
										}`}
									>
										{tab.label}
									</span>
									<ArrowRightIcon
										className={`size-4 shrink-0 text-ds-text-tertiary transition-opacity ${
											isActive ? "opacity-100" : "opacity-0"
										}`}
									/>
								</button>
							);
						})}
					</div>

					{/* Panel */}
					<div className="relative flex min-h-[34rem] flex-col overflow-hidden bg-ds-shell px-7 pt-8 lg:px-10 lg:pt-10">
						<button
							type="button"
							aria-label="Expand"
							className="absolute right-6 top-7 grid size-8 place-items-center rounded-full border border-ds-border bg-ds-surface text-ds-text-tertiary transition-colors hover:text-ds-text-primary lg:right-8"
						>
							<PlusIcon className="size-4" />
						</button>

						<div key={active.id} className="animate-fade-in flex flex-1 flex-col">
							<h3 className="text-[1.75rem] font-medium tracking-tight">{active.title}</h3>
							<p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed text-ds-text-secondary">
								{active.description}
							</p>

							<div className="relative mt-3 flex flex-1 items-start justify-start pb-10 lg:mt-8 lg:items-center lg:justify-center">
								{active.frames ? (
									<FrameSequence
										frames={active.frames}
										alt={active.imageAlt}
										holds={active.holds}
										onDone={advanceTab}
									/>
								) : (
									<img
										src={active.image}
										alt={active.imageAlt}
										className="w-full max-w-3xl"
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

/* ── Frame sequence ───────────────────────────────────────────────────
   Plays ordered frames as a looping crossfade. The frames are cumulative
   (doc → extracted table → mapped clause), so crossfading reads as each new
   layer materializing rather than a hard cut. Frame 0 sits in normal flow to
   set the height; the rest stack absolutely on top. Starts when scrolled into
   view; reduced-motion shows the final (fully-extracted) frame statically. */

// Default hold time (ms) before advancing. Build-up frames use the per-position
// values; the final frame lingers longest as the payoff, regardless of how many
// frames a sequence has. A card can override these via its `holds` array.
const BUILD_HOLD = [1000, 1300];
const PAYOFF_HOLD = 2400;
// Times a card replays its sequence before auto-advancing to the next card.
const LOOPS_BEFORE_ADVANCE = 2;

function FrameSequence({
	frames,
	alt,
	holds,
	onDone,
}: {
	frames: string[];
	alt: string;
	holds?: number[];
	onDone?: () => void;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { amount: 0.4 });
	const reduce = useReducedMotion() ?? false;
	const [i, setI] = useState(0);
	const loopsRef = useRef(0);

	// Keep the latest onDone without retriggering the timer effect each render.
	const onDoneRef = useRef(onDone);
	useEffect(() => {
		onDoneRef.current = onDone;
	});

	// Restart from the first frame (and reset the loop count) whenever the
	// sequence (re)enters view, so arriving at the section always plays from the
	// top. Switching cards restarts it too, via the panel's key-based remount.
	useEffect(() => {
		if (inView) {
			loopsRef.current = 0;
			setI(0);
		}
	}, [inView]);

	useEffect(() => {
		if (reduce) {
			setI(frames.length - 1);
			return;
		}
		if (!inView) return;
		const isLast = i === frames.length - 1;
		const hold = holds?.[i] ?? (isLast ? PAYOFF_HOLD : (BUILD_HOLD[i] ?? 1200));
		const t = setTimeout(() => {
			if (!isLast) {
				setI(i + 1);
				return;
			}
			// Finished a full play-through.
			loopsRef.current += 1;
			if (loopsRef.current >= LOOPS_BEFORE_ADVANCE && onDoneRef.current) {
				onDoneRef.current();
			} else {
				setI(0);
			}
		}, hold);
		return () => clearTimeout(t);
	}, [i, inView, reduce, frames.length, holds]);

	return (
		<div
			ref={ref}
			className="relative w-[145%] max-w-none origin-top-left scale-[1.35] lg:w-full lg:max-w-3xl lg:scale-100"
		>
			{frames.map((src, idx) => (
				<img
					key={src}
					src={src}
					alt={idx === 0 ? alt : ""}
					aria-hidden={idx !== 0}
					className={`${idx === 0 ? "relative" : "absolute inset-0"} w-full transition-opacity duration-700 ease-out`}
					style={{ opacity: idx === i ? 1 : 0 }}
				/>
			))}
		</div>
	);
}
