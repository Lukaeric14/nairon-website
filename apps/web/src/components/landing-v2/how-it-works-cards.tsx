// "How it works" section — three spec-style cards with a chamfered (cut)
// top-right corner. The card outline is drawn as a measured SVG path so the
// notch + rounded corners stay crisp at any width. Inner graphics are
// intentionally left as placeholders for now.

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { IsoSceneRenderer, revealDuration, type IsoSceneSpec } from "@/components/iso";
import { IsoZoomReveal } from "@/components/iso/iso-zoom-reveal";
import { brandIsoStyle, SCENES } from "@/components/iso/scenes";

interface CardSpec {
	title: string;
	body: string;
	/** Optional iso scene id rendered in the card's graphic slot. */
	scene?: keyof typeof SCENES;
	/** Optional [outer, inner] scene pair played as a zoom-reveal sequence. */
	sequence?: [keyof typeof SCENES, keyof typeof SCENES];
}

// Per-scene framing for the single-scene cards: a cropped viewBox (zoom),
// explicit projection origin (vertical placement), and CSS width (scale, so it
// fills and bleeds off the container edges).
const SCENE_FRAME: Record<
	string,
	{ viewBox: [number, number, number, number]; origin: { sx: number; sy: number }; width: string }
> = {
	capabilityAtlas: { viewBox: [40, 131, 389, 248], origin: { sx: 235, sy: 310 }, width: "h-full w-auto" },
	deployGoLiveCascade: { viewBox: [100, 150, 240, 235], origin: { sx: 220, sy: 320 }, width: "w-[114%]" },
};

const CARDS: CardSpec[] = [
	{
		title: "01: AI Opportunity Audit",
		body: "A consultative deep-dive that maps where AI creates real leverage: not a list of pains, but the concrete capabilities and highest-value opportunities to apply them.",
		scene: "capabilityAtlas",
	},
	{
		title: "02: AI Systems Design",
		body: "We take the audit and architect the actual AI systems, the multi-agent workflows and how they route and connect, before any building or deploying.",
		sequence: ["twoBars", "systemsDesignChip"],
	},
	{
		title: "03: Deployment & Go-Live",
		body: "We deploy the designed system into the tools and workflows you already run, wired into your existing stack, switched on, and live in production.",
		scene: "deployGoLiveCascade",
	},
];

// Section-wide pacing multiplier for the reveal choreography. <1 runs faster.
const SPEED = 0.8; // 20% faster

// Zoom-reveal timing for the sequence card — kept here so the duration math below
// stays in sync with what we pass to <IsoZoomReveal>.
const ZOOM_HOLD_MS = 2200 * SPEED;
const ZOOM_MS = 700 * SPEED;
// Pause between one card finishing and the next starting.
const CARD_GAP_MS = 450 * SPEED;

// Iso-engine timing defaults (mirror ANIM_DEFAULTS in scene-renderer). Used to
// scale a scene's reveal so it runs SPEED× as long — without touching the shared
// engine defaults that every other iso scene on the site relies on.
const ISO_TIMING_DEFAULTS = { stagger: 0.08, riseDuration: 0.6, drawDuration: 1.1 };

/** A copy of an iso scene whose reveal timing is scaled by SPEED. */
function faster(spec: IsoSceneSpec): IsoSceneSpec {
	const a = spec.animation ?? {};
	return {
		...spec,
		animation: {
			...a,
			stagger: (a.stagger ?? ISO_TIMING_DEFAULTS.stagger) * SPEED,
			riseDuration: (a.riseDuration ?? ISO_TIMING_DEFAULTS.riseDuration) * SPEED,
			drawDuration: (a.drawDuration ?? ISO_TIMING_DEFAULTS.drawDuration) * SPEED,
		},
	};
}

/** How long a card's graphic takes to fully reveal (ms). */
function cardDurationMs(card: CardSpec): number {
	if (card.sequence) {
		return ZOOM_HOLD_MS + ZOOM_MS + revealDuration(faster(SCENES[card.sequence[1]])) * 1000;
	}
	if (card.scene) return revealDuration(faster(SCENES[card.scene])) * 1000;
	return 0;
}

export function HowItWorksCards() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const inView = useInView(sectionRef, { once: true, amount: 0.3 });
	const reduce = useReducedMotion() ?? false;
	// Index of the card currently playing. -1 before the section is in view; once
	// in view it walks 0 → 1 → 2, advancing only when each card's reveal finishes,
	// so the three graphics play one after another. CARDS.length = all done.
	const [active, setActive] = useState(-1);

	useEffect(() => {
		if (!inView) return;
		// Reduced motion: reveal everything at once, no glitter, no sequencing.
		setActive(reduce ? CARDS.length : 0);
	}, [inView, reduce]);

	useEffect(() => {
		if (active < 0 || active >= CARDS.length) return;
		const t = setTimeout(() => setActive((i) => i + 1), cardDurationMs(CARDS[active]) + CARD_GAP_MS);
		return () => clearTimeout(t);
	}, [active]);

	return (
		<section id="how-it-works" className="w-full bg-ds-surface px-6 pt-8 pb-10 md:pt-12 md:pb-14">
			<div ref={sectionRef} className="mx-auto max-w-6xl">
				<header className="mx-auto max-w-2xl text-center">
					<h2 className="font-geist text-[34px] font-medium leading-[1.1] tracking-[-0.02em] text-[#1a1916] md:text-[46px]">
						How it works
					</h2>
				</header>

				<div className="mt-12 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-3 md:gap-6">
					{CARDS.map((card, i) => (
						<NotchedCard
							key={card.title}
							{...card}
							play={reduce || active >= i}
							glitter={!reduce && active >= i}
							current={!reduce && active === i}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

/* ── Card ────────────────────────────────────────────────────────── */

function NotchedCard({
	title,
	body,
	scene,
	sequence,
	play,
	glitter,
	current,
}: CardSpec & { play: boolean; glitter: boolean; current: boolean }) {
	const { ref, size } = useElementSize<HTMLDivElement>();
	const { w, h } = size;
	const r = 0; // corner radius (sharp corners)
	const c = 24; // chamfer size at top-right
	const s = 0.75; // inset so the path sits fully inside the SVG box

	// The graphic only (re)builds when THIS card's own play/scene changes. Memoizing it
	// stops a parent re-render (advancing a sibling card in the sequence) from passing a
	// fresh spec down and retriggering this card's reveal from the top.
	const graphic = useMemo(() => {
		if (sequence) {
			return (
				<IsoZoomReveal
					fill
					play={play}
					holdMs={ZOOM_HOLD_MS}
					zoomMs={ZOOM_MS}
					outer={{ ...faster(SCENES[sequence[0]]), viewBox: [60, 30, 300, 286], origin: { sx: 210, sy: 222 } }}
					inner={{ ...faster(SCENES[sequence[1]]), viewBox: [70, 4, 300, 286], origin: { sx: 220, sy: 180 } }}
					className="h-full w-[110%] max-w-none shrink-0"
					// Mobile: fill the box height (like cards 1 & 3) so the chip reads
					// large; desktop keeps the width-fill that already frames well.
					sceneClassName="h-full w-auto md:h-auto md:w-full"
				/>
			);
		}
		if (scene) {
			return (
				<IsoSceneRenderer
					play={play}
					spec={{
						...faster(SCENES[scene]),
						style: brandIsoStyle,
						viewBox: SCENE_FRAME[scene].viewBox,
						origin: SCENE_FRAME[scene].origin,
					}}
					className={`${SCENE_FRAME[scene].width} max-w-none shrink-0`}
				/>
			);
		}
		return <span className="font-geist-mono text-[11px] tracking-wide text-[#1a1916]/25">graphic</span>;
	}, [play, scene, sequence]);

	return (
		<div ref={ref} className="relative flex min-h-[420px] flex-col p-6">
			{w > 0 && h > 0 && (
				<svg
					className="pointer-events-none absolute inset-0 overflow-visible"
					width={w}
					height={h}
					aria-hidden="true"
				>
					{/* flat card body — chamfered top-right corner, no border or shadow.
					    The currently-playing card uses the darker active shade. */}
					<path
						d={notchedPath(w, h, r, c, s)}
						fill={current ? "#E5E5E5" : "#F2F2F2"}
						className="transition-[fill] duration-500"
					/>
				</svg>
			)}

			<div className="relative flex flex-1 flex-col">
				<div className="flex min-h-[44px] items-start justify-between gap-3">
					<h2 className="font-geist text-[16px] font-medium uppercase leading-[1.3] tracking-[0.14em] text-[#1a1916]">
						{title}
					</h2>
					<DotMark />
				</div>

				{/* Bottom-align the body within a fixed region so every card's description
				    ENDS on the same line (varying lengths start at different lines instead). */}
				<div className="mt-12 flex min-h-[112px] items-end">
					<p className="max-w-[34ch] text-[14px] leading-[1.5] text-[#1a1916]/60">{body}</p>
				</div>

				{/* graphic — an iso scene that reveals once on scroll-into-view,
				    or a placeholder until a scene is assigned. The scene gets a
				    cropped viewBox (zoom) and bottom alignment (sits lower). */}
				<div
					className={`relative isolate mt-6 flex flex-1 justify-center overflow-hidden border border-[#1a1916]/10 bg-white/40 ${
						scene || sequence ? "items-start" : "items-center"
					}`}
				>
					{/* digital pixel-glitter scoped to the graphic box, behind the scene,
					    shown while this is the active (playing) card */}
					<CardGlitter active={glitter} />
						{graphic}
				</div>
			</div>
		</div>
	);
}

/* ── Active-card glitter ─────────────────────────────────────────── */

// A digital pixel-glitter along the card's edges while it's the active (playing)
// card — the same technique supermemory.ai uses on its cards: a field of tiny
// squares kept within a band of the border (weighted bigger toward the edge), each
// delayed by its distance from the edge so the sparkle waves inward, then shimmers.
// `active` drives appear (grow + shimmer) / disappear (shrink out) instead of hover.
const GLITTER_COLORS = ["#1378E6", "#6FA8F5", "#C5DBF2"]; // Lapis → light tints
const GLITTER_GAP = 6; // px between pixels
const GLITTER_SPEED = 0.028; // shimmer speed
const GLITTER_BAND = 90; // px from an edge the glitter reaches
const GLITTER_FALLOFF = 2.4; // how hard size falls off away from the edge

interface GlitterPixel {
	x: number;
	y: number;
	color: string;
	speed: number;
	size: number;
	sizeStep: number;
	minSize: number;
	maxSize: number;
	delay: number;
	counter: number;
	counterStep: number;
	isIdle: boolean;
	isReverse: boolean;
	isShimmer: boolean;
}

function CardGlitter({ active }: { active: boolean }) {
	const ref = useRef<HTMLCanvasElement>(null);
	const triggerRef = useRef<((mode: "appear" | "disappear") => void) | null>(null);

	useEffect(() => {
		const canvas = ref.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const rand = (min: number, max: number) => Math.random() * (max - min) + min;
		let pixels: GlitterPixel[] = [];
		let w = 0;
		let h = 0;
		let raf = 0;

		const build = () => {
			const parent = canvas.parentElement;
			if (!parent) return;
			const rect = parent.getBoundingClientRect();
			w = Math.floor(rect.width);
			h = Math.floor(rect.height);
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = w * dpr;
			canvas.height = h * dpr;
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			const next: GlitterPixel[] = [];
			for (let x = 0; x < w; x += GLITTER_GAP) {
				for (let y = 0; y < h; y += GLITTER_GAP) {
					const edgeDist = Math.min(x, y, w - x, h - y);
					if (edgeDist > GLITTER_BAND) continue;
					const scale = (1 - edgeDist / GLITTER_BAND) ** GLITTER_FALLOFF; // 1 at edge → 0 inward
					if (scale < 0.1) continue;
					const minSize = 0.5 * scale;
					next.push({
						x,
						y,
						color: GLITTER_COLORS[Math.floor(Math.random() * GLITTER_COLORS.length)],
						speed: rand(0.1, 0.9) * GLITTER_SPEED,
						size: 0,
						sizeStep: Math.random() * 0.4 * scale,
						minSize,
						maxSize: rand(minSize, 2) * scale,
						delay: reduce ? 0 : edgeDist * 3, // wave inward from the edges
						counter: 0,
						counterStep: Math.random() * 4 + (w + h) * 0.01,
						isIdle: false,
						isReverse: false,
						isShimmer: false,
					});
				}
			}
			pixels = next;
		};

		const drawPixel = (p: GlitterPixel) => {
			const offset = 1 - p.size * 0.5; // center the square in its 2px cell
			ctx.fillStyle = p.color;
			ctx.fillRect(p.x + offset, p.y + offset, p.size, p.size);
		};
		const shimmer = (p: GlitterPixel) => {
			if (p.size >= p.maxSize) p.isReverse = true;
			else if (p.size <= p.minSize) p.isReverse = false;
			p.size += p.isReverse ? -p.speed : p.speed;
		};
		const appear = (p: GlitterPixel) => {
			p.isIdle = false;
			if (p.counter <= p.delay) {
				p.counter += p.counterStep;
				return;
			}
			if (p.size >= p.maxSize) p.isShimmer = true;
			if (p.isShimmer) shimmer(p);
			else p.size += p.sizeStep;
			drawPixel(p);
		};
		const disappear = (p: GlitterPixel) => {
			p.isShimmer = false;
			p.counter = 0;
			if (p.size <= 0) {
				p.isIdle = true;
				return;
			}
			p.size -= 0.1;
			drawPixel(p);
		};

		const FRAME = 1000 / 60;
		let last = performance.now();
		const step = (mode: "appear" | "disappear") => {
			raf = requestAnimationFrame(() => step(mode));
			const now = performance.now();
			const dt = now - last;
			if (dt < FRAME) return;
			last = now - (dt % FRAME);
			ctx.clearRect(0, 0, w, h);
			let allIdle = true;
			for (const p of pixels) {
				if (mode === "appear") appear(p);
				else disappear(p);
				if (!p.isIdle) allIdle = false;
			}
			if (allIdle) cancelAnimationFrame(raf);
		};
		const trigger = (mode: "appear" | "disappear") => {
			cancelAnimationFrame(raf);
			last = performance.now();
			raf = requestAnimationFrame(() => step(mode));
		};

		build();
		triggerRef.current = trigger;
		const ro = new ResizeObserver(build);
		ro.observe(canvas.parentElement ?? canvas);

		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
			triggerRef.current = null;
		};
	}, []);

	useEffect(() => {
		triggerRef.current?.(active ? "appear" : "disappear");
	}, [active]);

	return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" />;
}

// Small 4×4 dot mark in the card header corner. On scroll-into-view the dots
// reveal once in a diagonal sweep, then hold their final state (no looping).
const GRID = 4;
const DOTS = Array.from({ length: GRID * GRID }, (_, i) => ({
	row: Math.floor(i / GRID),
	col: i % GRID,
}));

function DotMark() {
	const ref = useRef<SVGSVGElement>(null);
	const inView = useInView(ref, { once: true, amount: 0.6 });
	const reduce = useReducedMotion() ?? false;
	const shown = inView || reduce;

	return (
		<svg
			ref={ref}
			width="28"
			height="28"
			viewBox="0 0 28 28"
			aria-hidden="true"
			className="shrink-0 text-[#1a1916]/45"
		>
			{DOTS.map(({ row, col }) => (
				<motion.circle
					key={`${row}-${col}`}
					cx={2 + col * 8}
					cy={2 + row * 8}
					r={1.1}
					fill="currentColor"
					style={{ transformOrigin: "center", transformBox: "fill-box" }}
					initial={reduce ? false : { opacity: 0, scale: 0 }}
					animate={shown ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
					transition={
						reduce
							? { duration: 0 }
							: { duration: 0.28, ease: [0.16, 1, 0.3, 1], delay: (row + col) * 0.045 }
					}
				/>
			))}
		</svg>
	);
}

/* ── Geometry ────────────────────────────────────────────────────── */

// Rounded rect on TL/BL/BR, chamfered on TR. Coordinates are inset by `s` so
// the stroke sits fully inside the SVG box.
function notchedPath(w: number, h: number, r: number, c: number, s: number): string {
	const L = s;
	const R = w - s;
	const T = s;
	const B = h - s;
	return [
		`M ${L + r} ${T}`,
		`H ${R - c}`,
		`L ${R} ${T + c}`,
		`V ${B - r}`,
		`A ${r} ${r} 0 0 1 ${R - r} ${B}`,
		`H ${L + r}`,
		`A ${r} ${r} 0 0 1 ${L} ${B - r}`,
		`V ${T + r}`,
		`A ${r} ${r} 0 0 1 ${L + r} ${T}`,
		"Z",
	].join(" ");
}

/* ── Hook ────────────────────────────────────────────────────────── */

function useElementSize<T extends HTMLElement>() {
	const ref = useRef<T>(null);
	const [size, setSize] = useState({ w: 0, h: 0 });
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const update = () => setSize({ w: el.offsetWidth, h: el.offsetHeight });
		update();
		const ro = new ResizeObserver(update);
		ro.observe(el);
		return () => ro.disconnect();
	}, []);
	return { ref, size };
}
