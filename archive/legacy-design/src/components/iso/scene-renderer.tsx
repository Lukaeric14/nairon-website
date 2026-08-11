// Renders an IsoSceneSpec to an animated, reduced-motion-aware SVG.
//
// One viewport observer (useInView) drives both the motion variants and the
// count-ups, so a scene reveals as a single choreographed unit. When reduced
// motion is requested (or animation mode is "none"), every node renders in
// its final state with no motion.

import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { depth, stackSlabs, type IsoPt } from "./core/iso";
import { EASE_IN_OUT, EASE_OUT_EXPO, useCountUp, useGrow } from "./core/motion";
import { useIso } from "./core/iso-context";
import { IsoScene } from "./iso-scene";
import { IsoBox, IsoCylinder, IsoDisc, IsoStack, IsoTile } from "./primitives/box";
import { Connector, connectorPath, Polyline, polylinePath } from "./primitives/connector";
import { DotMatrix, gridPath, IsoGrid, LabelTab, NodeGlyph } from "./primitives/marks";
import { GaugeRing, IsoBar } from "./primitives/data-viz";
import type {
	BarNode,
	BoxNode,
	ConnectorNode,
	CylinderNode,
	GaugeNode,
	GridNode,
	IsoAnimationConfig,
	IsoNode,
	IsoSceneSpec,
	PathNode,
	StackNode,
} from "./core/types";

interface RenderCtx {
	anim: Required<IsoAnimationConfig>;
	reduce: boolean;
	active: boolean;
	playKey: number;
}

const ANIM_DEFAULTS: Required<IsoAnimationConfig> = {
	mode: "reveal",
	stagger: 0.08,
	rise: 14,
	riseDuration: 0.6,
	drawDuration: 1.1,
	flow: false,
	grow: false,
	drop: false,
	sink: false,
	pulse: false,
};

// Grid units a sinking unit descends from above before its top seats flush.
const SINK_RISE = 2.2;

/**
 * Total wall-clock time (seconds) a scene's reveal takes — the last node's entrance
 * plus any power-on overlay. Mirrors the scrub-timeline math so external callers can
 * sequence multiple scenes (e.g. play card 1, then 2, then 3).
 */
export function revealDuration(spec: IsoSceneSpec): number {
	const anim = { ...ANIM_DEFAULTS, ...spec.animation };
	const order = new Map(spec.nodes.map((n, i) => [n.id, n.order ?? i]));
	return Math.max(
		0.001,
		...spec.nodes.map((n) => (order.get(n.id) ?? 0) * anim.stagger + scrubDuration(n, anim)),
		...spec.nodes.map((n) => ("accentAt" in n && n.accentAt != null ? n.accentAt * anim.stagger + 0.5 : 0)),
	);
}

export function IsoSceneRenderer({
	spec,
	trigger = "inView",
	playKey = 0,
	reduceMotion,
	className,
	scrub,
	play,
}: {
	spec: IsoSceneSpec;
	/** "inView" reveals once on scroll; "mount" plays immediately (playground). */
	trigger?: "inView" | "mount";
	/** Bump to replay when trigger === "mount". */
	playKey?: number;
	/** Force reduced motion (playground toggle). Defaults to the OS setting. */
	reduceMotion?: boolean;
	className?: string;
	/** When set (0–1), freeze the reveal at this normalized time for scrubbing. */
	scrub?: number | null;
	/** Controlled play gate: when provided, the reveal runs iff `play` is true
	 *  (overrides trigger/inView). Used to sequence several scenes externally. */
	play?: boolean;
}) {
	const sysReduce = useReducedMotion();
	const reduce = reduceMotion ?? sysReduce ?? false;
	const ref = useRef<SVGSVGElement>(null);
	const inView = useInView(ref, { once: true, amount: 0.35 });
	const anim = { ...ANIM_DEFAULTS, ...spec.animation };
	const animateOff = reduce || anim.mode === "none";
	const active = play !== undefined ? play : trigger === "mount" ? true : inView;

	// Controlled but not yet playing: render the correctly-sized but EMPTY scene so the
	// layout slot is reserved and nothing shows — including prebuilt nodes, which would
	// otherwise render in their final state before this scene's turn to play.
	if (play === false) {
		return (
			<IsoScene
				ref={ref}
				viewBox={spec.viewBox}
				origin={spec.origin}
				unit={spec.unit}
				title={spec.title}
				desc={spec.desc}
				style={spec.style}
				className={className}
			>
				<g />
			</IsoScene>
		);
	}

	// Painter's algorithm for draw order; reveal delay comes from `order`.
	const order = new Map(spec.nodes.map((n, i) => [n.id, n.order ?? i]));
	const drawOrder = [...spec.nodes].sort(
		(a, b) => depth(anchorOf(a)) - depth(anchorOf(b)),
	);

	const ctx: RenderCtx = { anim, reduce, active, playKey };

	// Scrub mode: freeze the reveal at a normalized time (0–1) for frame-by-frame
	// inspection. Mirrors each node's entrance, rendered statically at that time.
	if (scrub != null) {
		const totalDur = Math.max(
			0.001,
			...drawOrder.map((n) => (order.get(n.id) ?? 0) * anim.stagger + scrubDuration(n, anim)),
			// Power-on overlays fire at their own reveal order, independent of the
			// node's entrance — extend the timeline so the ignite stays scrubbable.
			...drawOrder.map((n) => ("accentAt" in n && n.accentAt != null ? n.accentAt * anim.stagger + 0.5 : 0)),
		);
		const tT = clamp01(scrub) * totalDur;
		return (
			<IsoScene
				ref={ref}
				viewBox={spec.viewBox}
				origin={spec.origin}
				unit={spec.unit}
				title={spec.title}
				desc={spec.desc}
				style={spec.style}
				className={className}
			>
				<g>
					{drawOrder.map((n) => (
						<ScrubNode
							key={n.id}
							node={n}
							t={tT}
							delay={(order.get(n.id) ?? 0) * anim.stagger}
							anim={anim}
						/>
					))}
				</g>
			</IsoScene>
		);
	}

	return (
		<IsoScene
			ref={ref}
			viewBox={spec.viewBox}
			origin={spec.origin}
			unit={spec.unit}
			title={spec.title}
			desc={spec.desc}
			style={spec.style}
			className={className}
		>
			{animateOff ? (
				<g>{drawOrder.map((n) => <StaticNode key={n.id} node={n} anim={anim} />)}</g>
			) : (
				<motion.g
					key={playKey}
					initial="hidden"
					animate={active ? "show" : "hidden"}
					variants={{ hidden: {}, show: {} }}
				>
					{drawOrder.map((n) => (
						<AnimatedNode
							key={n.id}
							node={n}
							delay={(order.get(n.id) ?? 0) * anim.stagger}
							ctx={ctx}
						/>
					))}
				</motion.g>
			)}
		</IsoScene>
	);
}

/* ─── Animated node dispatch ─────────────────────────────────────── */

function AnimatedNode({ node, delay, ctx }: { node: IsoNode; delay: number; ctx: RenderCtx }) {
	// Pre-built nodes are part of the starting scene — render them in final state, no entrance.
	// Exception: a prebuilt shape with `accentAt` is "already there, then powers on" —
	// render its neutral final state from frame 0 and cross-fade the accent copy in.
	if (node.prebuilt) {
		if (
			(node.type === "box" || node.type === "stack" || node.type === "cylinder") &&
			node.accentAt != null
		) {
			const base =
				node.type === "box" ? (
					<IsoBox box={node} accent={node.accent} />
				) : node.type === "stack" ? (
					<IsoStack stack={node} accent={node.accent} />
				) : (
					<IsoCylinder cyl={node} accent={node.accent} recessed={node.recessed} />
				);
			const lit =
				node.type === "box" ? (
					<IsoBox box={node} accent />
				) : node.type === "stack" ? (
					<IsoStack stack={node} accent />
				) : (
					<IsoCylinder cyl={node} accent recessed={node.recessed} />
				);
			return (
				<g>
					{base}
					<IgniteOverlay accentAt={node.accentAt} stagger={ctx.anim.stagger}>
						{lit}
					</IgniteOverlay>
					{ctx.anim.pulse && node.type === "box" && <PulseWave box={node} ctx={ctx} />}
				</g>
			);
		}
		return <StaticNode node={node} />;
	}
	switch (node.type) {
		case "box":
			if (ctx.anim.grow) return <GrowBox node={node} ctx={ctx} />;
			return (
				<g>
					<motion.g variants={riseVariants(ctx.anim)} custom={delay}>
						<IsoBox box={node} accent={node.accent} />
					</motion.g>
					{node.accentAt != null && (
						<IgniteOverlay accentAt={node.accentAt} stagger={ctx.anim.stagger}>
							<IsoBox box={node} accent />
						</IgniteOverlay>
					)}
				</g>
			);
		case "tile":
			return (
				<motion.g variants={riseVariants(ctx.anim)} custom={delay}>
					<IsoTile tile={node} accent={node.accent} />
				</motion.g>
			);
		case "label":
			return (
				<motion.g variants={riseVariants(ctx.anim)} custom={delay}>
					<LabelTab at={node.at} text={node.text} angle={node.angle} align={node.align} size={node.size} lead={node.lead} />
				</motion.g>
			);
		case "glyph":
			return (
				<motion.g variants={popVariants} custom={delay}>
					<NodeGlyph at={node.at} variant={node.variant} accent={node.accent} />
				</motion.g>
			);
		case "dots":
			return (
				<motion.g variants={riseVariants(ctx.anim)} custom={delay}>
					<DotMatrix at={node.at} rows={node.rows} cols={node.cols} />
				</motion.g>
			);
		case "connector":
			return <ConnectorNodeView node={node} delay={delay} ctx={ctx} />;
		case "bar":
			return <BarNodeView node={node} delay={delay} ctx={ctx} />;
		case "gauge":
			return <GaugeNodeView node={node} delay={delay} ctx={ctx} />;
		case "cylinder": {
			if (node.recessed)
				return (
					<motion.g variants={fadeVariants(delay)} custom={delay}>
						<IsoCylinder cyl={node} accent={node.accent} recessed />
					</motion.g>
				);
			const neutral = ctx.anim.sink ? (
				<SinkCylinder node={node} ctx={ctx} />
			) : ctx.anim.drop ? (
				<motion.g variants={dropVariants(ctx.anim)} custom={delay}>
					<IsoCylinder cyl={node} accent={node.accent} />
				</motion.g>
			) : ctx.anim.grow ? (
				<GrowCylinder node={node} ctx={ctx} />
			) : (
				<motion.g variants={riseVariants(ctx.anim)} custom={delay}>
					<IsoCylinder cyl={node} accent={node.accent} />
				</motion.g>
			);
			if (node.accentAt == null) return neutral;
			return (
				<g>
					{neutral}
					<IgniteOverlay accentAt={node.accentAt} stagger={ctx.anim.stagger}>
						<IsoCylinder cyl={node} accent />
					</IgniteOverlay>
				</g>
			);
		}
		case "disc":
			return (
				<motion.g variants={ctx.anim.drop ? dropVariants(ctx.anim) : riseVariants(ctx.anim)} custom={delay}>
					<IsoDisc disc={node} accent={node.accent} />
				</motion.g>
			);
		case "stack":
			return <StackNodeView node={node} delay={delay} ctx={ctx} />;
		case "grid":
			return <GridNodeView node={node} delay={delay} ctx={ctx} />;
		case "path":
			return <PathNodeView node={node} delay={delay} ctx={ctx} />;
		default:
			return null;
	}
}

// Power-on overlay: an accent copy of a just-built shape that cross-fades in at
// `accentAt` (× stagger). Lets a neutral block "ignite" once a later beat — a
// docking unit, a status flip — lands. Shared by box / stack / cylinder.
function IgniteOverlay({
	accentAt,
	stagger,
	children,
}: {
	accentAt: number;
	stagger: number;
	children: ReactNode;
}) {
	return (
		<motion.g variants={fadeVariants(0)} custom={accentAt * stagger}>
			{children}
		</motion.g>
	);
}

// Perpetual "powering up" wave for one layer box: a bright charge that fades in and
// out on a loop, phased by the layer's height (z) so the charge sweeps UP the stack,
// fades, and repeats — the whole block reads as continuously energizing. Brighter
// than the accent (overrides the accent face vars) so it glows over the lit block.
const PULSE_BRIGHT: CSSProperties = {
	"--iso-accent-top": "#DCEEFF",
	"--iso-accent-left": "#A9D6FF",
	"--iso-accent-right": "#86C2FF",
} as CSSProperties;
function PulseWave({ box, ctx }: { box: BoxNode; ctx: RenderCtx }) {
	if (ctx.reduce) return null;
	const climb = (box.z ?? 0) * 0.62; // higher layers light later → wave climbs
	return (
		<motion.g
			style={PULSE_BRIGHT}
			initial={{ opacity: 0 }}
			animate={{ opacity: [0, 0.95, 0] }}
			transition={{ duration: 1.05, repeatDelay: 0.95, repeat: Infinity, ease: EASE_IN_OUT, delay: climb }}
		>
			<IsoBox box={box} accent />
		</motion.g>
	);
}

// "sink" reveal: a solid cylinder descends from above and seats FLUSH into a hole.
// Only the part above the surface (cap z = node.z + node.h) is drawn, so as it lowers
// the body disappears into the socket and, at rest, just the flush cap remains.
function SinkCylinder({ node, ctx }: { node: CylinderNode; ctx: RenderCtx }) {
	const e = useGrow({
		duration: ctx.anim.riseDuration * 1.3,
		reduce: ctx.reduce,
		play: ctx.active,
		playKey: ctx.playKey,
	});
	const surface = (node.z ?? 0) + node.h; // flush rest: the cap sits here
	const capZ = surface + (1 - e) * SINK_RISE;
	const visBase = Math.max(capZ - node.h, surface); // clamp the body at the surface
	const visH = Math.max(0.001, capZ - visBase);
	return <IsoCylinder cyl={{ x: node.x, y: node.y, z: visBase, r: node.r, h: visH }} accent={node.accent} />;
}

// "grow" reveal for a cylinder — extrudes up from a flat disc.
function GrowCylinder({ node, ctx }: { node: CylinderNode; ctx: RenderCtx }) {
	const t = useGrow({
		duration: ctx.anim.riseDuration,
		reduce: ctx.reduce,
		play: ctx.active,
		playKey: ctx.playKey,
	});
	return (
		<motion.g variants={fadeVariants(0)} custom={0}>
			<IsoCylinder cyl={{ ...node, h: Math.max(0.001, node.h * t) }} accent={node.accent} />
		</motion.g>
	);
}

// A stack assembles slab-by-slab: each layer rises with a small internal
// stagger, or — when `grow` is on — the whole stack extrudes up from flat.
// When `accentAt` is set, an accent copy of the whole stack cross-fades in at
// that reveal order: the block "powers on".
function StackNodeView({ node, delay, ctx }: { node: StackNode; delay: number; ctx: RenderCtx }) {
	const t = useGrow({
		duration: ctx.anim.riseDuration,
		reduce: ctx.reduce,
		play: ctx.active,
		playKey: ctx.playKey,
	});
	const ignite =
		node.accentAt != null ? (
			<IgniteOverlay accentAt={node.accentAt} stagger={ctx.anim.stagger}>
				<IsoStack stack={node} accent grow={ctx.anim.grow ? t : 1} />
			</IgniteOverlay>
		) : null;
	if (ctx.anim.grow) {
		return (
			<g>
				<motion.g variants={fadeVariants(0)} custom={0}>
					<IsoStack stack={node} accent={node.accent} grow={t} />
				</motion.g>
				{ignite}
			</g>
		);
	}
	const step = ctx.anim.stagger * 0.8;
	const slabs = stackSlabs(node);
	return (
		<g>
			{slabs.map((b, i) => (
				<motion.g key={b.z} variants={riseVariants(ctx.anim)} custom={delay + i * step}>
					<IsoBox box={b} accent={node.accent} />
				</motion.g>
			))}
			{ignite}
		</g>
	);
}

function GridNodeView({ node, delay, ctx }: { node: GridNode; delay: number; ctx: RenderCtx }) {
	const { project } = useIso();
	const d = gridPath(node.at, node.cols, node.rows, node.cell ?? 1, project);
	const stroke = node.accent ? "var(--iso-accent)" : "var(--iso-muted)";
	return (
		<motion.path
			className="iso-layer"
			d={d}
			style={{ fill: "none", stroke, strokeDasharray: node.dashed ? "var(--iso-dash)" : undefined }}
			variants={drawVariants(ctx.anim)}
			custom={delay}
		/>
	);
}

function PathNodeView({ node, delay, ctx }: { node: PathNode; delay: number; ctx: RenderCtx }) {
	const { project } = useIso();
	const d = polylinePath(node.points, project, node.route ?? "line");
	const stroke = node.accent ? "var(--iso-accent)" : "var(--iso-muted)";

	if (node.dashed) {
		const flowing = ctx.anim.flow && !ctx.reduce;
		return (
			<motion.g variants={fadeVariants(delay)} custom={delay}>
				<motion.path
					className="iso-layer"
					d={d}
					style={{ fill: "none", stroke, strokeDasharray: "var(--iso-dash)" }}
					animate={flowing ? { strokeDashoffset: [0, -16] } : undefined}
					transition={flowing ? { repeat: Infinity, duration: 1.2, ease: "linear" } : undefined}
				/>
			</motion.g>
		);
	}
	return (
		<motion.path
			className="iso-layer"
			d={d}
			style={{ fill: "none", stroke }}
			variants={drawVariants(ctx.anim)}
			custom={delay}
		/>
	);
}

// "grow" reveal: the box extrudes up from flat (height 0 → full), starting
// together with every other grow-box (no per-node stagger), then settling.
function GrowBox({ node, ctx }: { node: BoxNode; ctx: RenderCtx }) {
	const t = useGrow({
		duration: ctx.anim.riseDuration,
		reduce: ctx.reduce,
		play: ctx.active,
		playKey: ctx.playKey,
	});
	const grown = { x: node.x, y: node.y, z: node.z, w: node.w, d: node.d, h: Math.max(0.001, node.h * t) };
	// Optional recolor: an accent copy fades in over the neutral box at `accentAt`.
	const accentDelay = node.accentAt != null ? node.accentAt * ctx.anim.stagger : null;
	return (
		<motion.g variants={fadeVariants(0)} custom={0}>
			<IsoBox box={grown} accent={node.accent} />
			{accentDelay != null && (
				<motion.g variants={fadeVariants(0)} custom={accentDelay}>
					<IsoBox box={grown} accent />
				</motion.g>
			)}
		</motion.g>
	);
}

function ConnectorNodeView({ node, delay, ctx }: { node: ConnectorNode; delay: number; ctx: RenderCtx }) {
	const { project } = useIso();
	const d = connectorPath(node.from, node.to, project, node.route ?? "line");
	const stroke = node.accent ? "var(--iso-accent)" : "var(--iso-muted)";

	if (node.dashed) {
		const flowing = ctx.anim.flow && !ctx.reduce;
		return (
			<motion.g variants={fadeVariants(delay)} custom={delay}>
				<motion.path
					className="iso-layer"
					d={d}
					style={{ stroke, strokeDasharray: "var(--iso-dash)" }}
					animate={flowing ? { strokeDashoffset: [0, -16] } : undefined}
					transition={flowing ? { repeat: Infinity, duration: 1.2, ease: "linear" } : undefined}
				/>
			</motion.g>
		);
	}
	return (
		<motion.path
			className="iso-layer"
			d={d}
			style={{ stroke }}
			variants={drawVariants(ctx.anim)}
			custom={delay}
		/>
	);
}

function BarNodeView({ node, delay, ctx }: { node: BarNode; delay: number; ctx: RenderCtx }) {
	const { project } = useIso();
	const w = node.w ?? 0.7;
	const d = node.d ?? 0.7;
	const height = node.height ?? 4;
	const h = (node.value / Math.max(node.max, 1e-6)) * height;
	const top = project({ x: node.x + w / 2, y: node.y + d / 2, z: h });
	const count = useCountUp(node.value, {
		duration: ctx.anim.riseDuration * 1.6,
		reduce: ctx.reduce,
		play: ctx.active,
		playKey: ctx.playKey,
	});
	return (
		<motion.g variants={riseVariants(ctx.anim)} custom={delay}>
			<IsoBar x={node.x} y={node.y} value={node.value} max={node.max} w={w} d={d} height={height} accent={node.accent} />
			<text
				x={top.sx}
				y={top.sy - 8}
				textAnchor="middle"
				className="font-mono"
				style={{ fill: "var(--iso-ink)", fontSize: 11, fontWeight: 600 }}
			>
				{node.label ?? formatCompact(count)}
			</text>
		</motion.g>
	);
}

function GaugeNodeView({ node, delay, ctx }: { node: GaugeNode; delay: number; ctx: RenderCtx }) {
	const { project, unit } = useIso();
	const { sx, sy } = project(node.at);
	const radius = node.radius ?? 2.4;
	const rx = radius * unit;
	const ry = radius * unit * 0.52;
	const frac = clamp01(node.value / Math.max(node.max, 1e-6));
	const count = useCountUp(node.value, {
		duration: ctx.anim.drawDuration + 0.3,
		reduce: ctx.reduce,
		play: ctx.active,
		playKey: ctx.playKey,
	});
	return (
		<g transform={`translate(${sx} ${sy})`}>
			<ellipse cx={0} cy={0} rx={rx} ry={ry} className="iso-layer" style={{ stroke: "var(--iso-muted)" }} />
			<motion.ellipse
				cx={0}
				cy={0}
				rx={rx}
				ry={ry}
				className="iso-layer"
				transform="rotate(-90)"
				style={{ stroke: "var(--iso-accent)", strokeWidth: "calc(var(--iso-stroke-w) * 2)" }}
				variants={gaugeVariants(frac, delay, ctx.anim)}
				custom={delay}
			/>
			{node.label && (
				<text x={0} y={-4} textAnchor="middle" className="font-mono" style={{ fill: "var(--iso-muted)", fontSize: 9, letterSpacing: 1 }}>
					{node.label}
				</text>
			)}
			<text x={0} y={12} textAnchor="middle" className="font-mono" style={{ fill: "var(--iso-ink)", fontSize: 16, fontWeight: 600 }}>
				{Math.round(count)}
			</text>
		</g>
	);
}

/* ─── Static (reduced-motion / mode:none) dispatch ───────────────── */

function StaticNode({ node, anim }: { node: IsoNode; anim?: Required<IsoAnimationConfig> }): ReactNode {
	switch (node.type) {
		case "box":
			return <IsoBox box={node} accent={node.accent || node.accentAt != null} />;
		case "tile":
			return <IsoTile tile={node} accent={node.accent} />;
		case "connector":
			return <Connector from={node.from} to={node.to} route={node.route} dashed={node.dashed} accent={node.accent} />;
		case "label":
			return <LabelTab at={node.at} text={node.text} angle={node.angle} align={node.align} size={node.size} lead={node.lead} />;
		case "glyph":
			return <NodeGlyph at={node.at} variant={node.variant} accent={node.accent} />;
		case "dots":
			return <DotMatrix at={node.at} rows={node.rows} cols={node.cols} />;
		case "bar":
			return <StaticBar node={node} />;
		case "gauge":
			return <GaugeRing at={node.at} value={node.value} max={node.max} label={node.label} radius={node.radius} />;
		case "cylinder": {
			// A sinking cylinder's resting state is just its flush cap at the surface.
			if (anim?.sink && !node.recessed) {
				const surface = (node.z ?? 0) + node.h;
				return <IsoCylinder cyl={{ x: node.x, y: node.y, z: surface, r: node.r, h: 0.001 }} accent={node.accent || node.accentAt != null} />;
			}
			return <IsoCylinder cyl={node} accent={node.accent || node.accentAt != null} recessed={node.recessed} />;
		}
		case "disc":
			return <IsoDisc disc={node} accent={node.accent} />;
		case "stack":
			return <IsoStack stack={node} accent={node.accent || node.accentAt != null} />;
		case "grid":
			return <IsoGrid at={node.at} cols={node.cols} rows={node.rows} cell={node.cell} dashed={node.dashed} accent={node.accent} />;
		case "path":
			return <Polyline points={node.points} route={node.route} dashed={node.dashed} accent={node.accent} />;
		default:
			return null;
	}
}

function StaticBar({ node }: { node: BarNode }) {
	const { project } = useIso();
	const w = node.w ?? 0.7;
	const d = node.d ?? 0.7;
	const height = node.height ?? 4;
	const h = (node.value / Math.max(node.max, 1e-6)) * height;
	const top = project({ x: node.x + w / 2, y: node.y + d / 2, z: h });
	return (
		<>
			<IsoBar x={node.x} y={node.y} value={node.value} max={node.max} w={w} d={d} height={height} accent={node.accent} />
			<text x={top.sx} y={top.sy - 8} textAnchor="middle" className="font-mono" style={{ fill: "var(--iso-ink)", fontSize: 11, fontWeight: 600 }}>
				{node.label ?? formatCompact(node.value)}
			</text>
		</>
	);
}

/* ─── Scrub (frozen-at-time) dispatch ────────────────────────────── */

// How long a node's entrance lasts (s) — used to map the scrub timeline and to
// compute each node's local progress. Mirrors the durations in the variants.
function scrubDuration(node: IsoNode, anim: Required<IsoAnimationConfig>): number {
	if (node.prebuilt) return 0;
	switch (node.type) {
		case "glyph":
			return 0.4;
		case "connector":
		case "path":
			return node.dashed ? 0.4 : anim.drawDuration;
		case "grid":
		case "gauge":
			return anim.drawDuration;
		case "bar":
			return anim.riseDuration * 1.6;
		case "cylinder":
			return node.recessed ? 0.4 : anim.sink ? anim.riseDuration * 1.3 : anim.drop ? anim.riseDuration * 1.1 : anim.riseDuration;
		case "disc":
			return anim.drop ? anim.riseDuration * 1.1 : anim.riseDuration;
		case "stack": {
			if (anim.grow) return anim.riseDuration;
			const layers = node.layers ?? 3;
			return (layers - 1) * anim.stagger * 0.8 + anim.riseDuration;
		}
		default:
			return anim.riseDuration; // box, tile, label, dots
	}
}

// Renders a single node frozen at scrub time `t`, reproducing the visual state
// it would have mid-reveal: rise/drop translate, grow height, draw pathLength,
// pop scale, or fade — whichever its entrance uses.
function ScrubNode({
	node,
	t,
	delay,
	anim,
}: {
	node: IsoNode;
	t: number;
	delay: number;
	anim: Required<IsoAnimationConfig>;
}) {
	const { project, unit } = useIso();
	if (node.prebuilt) {
		// Prebuilt + power-on: neutral from frame 0, accent cross-fades in at accentAt.
		if (
			(node.type === "box" || node.type === "stack" || node.type === "cylinder") &&
			node.accentAt != null
		) {
			const op = clamp01((t - node.accentAt * anim.stagger) / 0.4);
			const base =
				node.type === "box" ? (
					<IsoBox box={node} accent={node.accent} />
				) : node.type === "stack" ? (
					<IsoStack stack={node} accent={node.accent} />
				) : (
					<IsoCylinder cyl={node} accent={node.accent} recessed={node.recessed} />
				);
			const lit =
				node.type === "box" ? (
					<IsoBox box={node} accent />
				) : node.type === "stack" ? (
					<IsoStack stack={node} accent />
				) : (
					<IsoCylinder cyl={node} accent recessed={node.recessed} />
				);
			return (
				<g>
					{base}
					<g style={{ opacity: op }}>{lit}</g>
				</g>
			);
		}
		return <StaticNode node={node} />;
	}

	const since = t - delay; // seconds since this node started
	const at = (dur: number) => clamp01(since / Math.max(1e-6, dur));
	const rise = (child: ReactNode) => {
		const e = easeOutExpo(at(anim.riseDuration));
		return <g style={{ opacity: e, transform: `translateY(${anim.rise * (1 - e)}px)` }}>{child}</g>;
	};
	// Power-on overlay frozen at `t`: an accent copy fades in over 0.4s starting
	// at the node's own accentAt reveal order. null when the node has no accentAt.
	const ignite = (accentChild: ReactNode) => {
		const a = (node as { accentAt?: number }).accentAt;
		if (a == null) return null;
		return <g style={{ opacity: clamp01((t - a * anim.stagger) / 0.4) }}>{accentChild}</g>;
	};

	switch (node.type) {
		case "box":
			return (
				<g>
					{anim.grow ? (
						<g style={{ opacity: at(0.4) }}>
							<IsoBox
								box={{ x: node.x, y: node.y, z: node.z, w: node.w, d: node.d, h: Math.max(0.001, node.h * easeOutCubic(at(anim.riseDuration))) }}
								accent={node.accent}
							/>
						</g>
					) : (
						rise(<IsoBox box={node} accent={node.accent} />)
					)}
					{ignite(<IsoBox box={node} accent />)}
				</g>
			);
		case "tile":
			return rise(<IsoTile tile={node} accent={node.accent} />);
		case "label":
			return rise(<LabelTab at={node.at} text={node.text} angle={node.angle} align={node.align} size={node.size} lead={node.lead} />);
		case "dots":
			return rise(<DotMatrix at={node.at} rows={node.rows} cols={node.cols} />);
		case "glyph": {
			const e = easeOutExpo(at(0.4));
			return (
				<g style={{ opacity: e, transform: `scale(${0.6 + 0.4 * e})`, transformBox: "fill-box", transformOrigin: "center" }}>
					<NodeGlyph at={node.at} variant={node.variant} accent={node.accent} />
				</g>
			);
		}
		case "cylinder": {
			if (node.recessed)
				return (
					<g style={{ opacity: at(0.4) }}>
						<IsoCylinder cyl={node} accent={node.accent} recessed />
					</g>
				);
			let body: ReactNode;
			if (anim.sink) {
				const e = easeOutCubic(at(anim.riseDuration * 1.3));
				const surface = (node.z ?? 0) + node.h;
				const capZ = surface + (1 - e) * SINK_RISE;
				const visBase = Math.max(capZ - node.h, surface);
				const visH = Math.max(0.001, capZ - visBase);
				body = <IsoCylinder cyl={{ x: node.x, y: node.y, z: visBase, r: node.r, h: visH }} accent={node.accent} />;
			} else if (anim.drop) {
				const e = easeOutExpo(at(anim.riseDuration * 1.1));
				body = (
					<g style={{ opacity: e, transform: `translateY(${-(anim.rise * 4) * (1 - e)}px)` }}>
						<IsoCylinder cyl={node} accent={node.accent} />
					</g>
				);
			} else if (anim.grow) {
				body = (
					<g style={{ opacity: at(0.4) }}>
						<IsoCylinder cyl={{ ...node, h: Math.max(0.001, node.h * easeOutCubic(at(anim.riseDuration))) }} accent={node.accent} />
					</g>
				);
			} else {
				body = rise(<IsoCylinder cyl={node} accent={node.accent} />);
			}
			return (
				<g>
					{body}
					{ignite(<IsoCylinder cyl={node} accent />)}
				</g>
			);
		}
		case "disc": {
			if (anim.drop) {
				const e = easeOutExpo(at(anim.riseDuration * 1.1));
				return (
					<g style={{ opacity: e, transform: `translateY(${-(anim.rise * 4) * (1 - e)}px)` }}>
						<IsoDisc disc={node} accent={node.accent} />
					</g>
				);
			}
			return rise(<IsoDisc disc={node} accent={node.accent} />);
		}
		case "stack": {
			const igniteStack = ignite(<IsoStack stack={node} accent grow={1} />);
			if (anim.grow)
				return (
					<g>
						<g style={{ opacity: at(0.4) }}>
							<IsoStack stack={node} accent={node.accent} grow={easeOutCubic(at(anim.riseDuration))} />
						</g>
						{igniteStack}
					</g>
				);
			const step = anim.stagger * 0.8;
			return (
				<g>
					{stackSlabs(node).map((b, i) => {
						const e = easeOutExpo(clamp01((since - i * step) / Math.max(1e-6, anim.riseDuration)));
						return (
							<g key={b.z} style={{ opacity: e, transform: `translateY(${anim.rise * (1 - e)}px)` }}>
								<IsoBox box={b} accent={node.accent} />
							</g>
						);
					})}
					{igniteStack}
				</g>
			);
		}
		case "connector": {
			const d = connectorPath(node.from, node.to, project, node.route ?? "line");
			const stroke = node.accent ? "var(--iso-accent)" : "var(--iso-muted)";
			if (node.dashed)
				return <path className="iso-layer" d={d} style={{ fill: "none", stroke, strokeDasharray: "var(--iso-dash)", opacity: at(0.4) }} />;
			return <path className="iso-layer" d={d} pathLength={1} style={{ fill: "none", stroke, strokeDasharray: `${easeInOut(at(anim.drawDuration))} 1`, opacity: at(0.2) }} />;
		}
		case "path": {
			const d = polylinePath(node.points, project, node.route ?? "line");
			const stroke = node.accent ? "var(--iso-accent)" : "var(--iso-muted)";
			if (node.dashed)
				return <path className="iso-layer" d={d} style={{ fill: "none", stroke, strokeDasharray: "var(--iso-dash)", opacity: at(0.4) }} />;
			return <path className="iso-layer" d={d} pathLength={1} style={{ fill: "none", stroke, strokeDasharray: `${easeInOut(at(anim.drawDuration))} 1`, opacity: at(0.2) }} />;
		}
		case "grid": {
			const d = gridPath(node.at, node.cols, node.rows, node.cell ?? 1, project);
			const stroke = node.accent ? "var(--iso-accent)" : "var(--iso-muted)";
			if (node.dashed)
				return <path className="iso-layer" d={d} style={{ fill: "none", stroke, strokeDasharray: "var(--iso-dash)", opacity: at(0.4) }} />;
			return <path className="iso-layer" d={d} pathLength={1} style={{ fill: "none", stroke, strokeDasharray: `${easeInOut(at(anim.drawDuration))} 1`, opacity: at(0.2) }} />;
		}
		case "bar": {
			const e = easeOutExpo(at(anim.riseDuration));
			const w = node.w ?? 0.7;
			const d = node.d ?? 0.7;
			const height = node.height ?? 4;
			const h = (node.value / Math.max(node.max, 1e-6)) * height;
			const top = project({ x: node.x + w / 2, y: node.y + d / 2, z: h });
			const count = Math.round(node.value * at(anim.riseDuration * 1.6));
			return (
				<g style={{ opacity: e, transform: `translateY(${anim.rise * (1 - e)}px)` }}>
					<IsoBar x={node.x} y={node.y} value={node.value} max={node.max} w={w} d={d} height={height} accent={node.accent} />
					<text x={top.sx} y={top.sy - 8} textAnchor="middle" className="font-mono" style={{ fill: "var(--iso-ink)", fontSize: 11, fontWeight: 600 }}>
						{node.label ?? formatCompact(count)}
					</text>
				</g>
			);
		}
		case "gauge": {
			const { sx, sy } = project(node.at);
			const radius = node.radius ?? 2.4;
			const rx = radius * unit;
			const ry = radius * unit * 0.52;
			const frac = clamp01(node.value / Math.max(node.max, 1e-6));
			const e = easeInOut(at(anim.drawDuration));
			const count = Math.round(node.value * at(anim.drawDuration + 0.3));
			return (
				<g transform={`translate(${sx} ${sy})`}>
					<ellipse cx={0} cy={0} rx={rx} ry={ry} className="iso-layer" style={{ stroke: "var(--iso-muted)" }} />
					<ellipse cx={0} cy={0} rx={rx} ry={ry} className="iso-layer" transform="rotate(-90)" pathLength={1} style={{ stroke: "var(--iso-accent)", strokeWidth: "calc(var(--iso-stroke-w) * 2)", strokeDasharray: `${frac * e} 1`, opacity: at(0.2) }} />
					{node.label && (
						<text x={0} y={-4} textAnchor="middle" className="font-mono" style={{ fill: "var(--iso-muted)", fontSize: 9, letterSpacing: 1 }}>
							{node.label}
						</text>
					)}
					<text x={0} y={12} textAnchor="middle" className="font-mono" style={{ fill: "var(--iso-ink)", fontSize: 16, fontWeight: 600 }}>
						{count}
					</text>
				</g>
			);
		}
		default:
			return null;
	}
}

/* ─── Variant builders ───────────────────────────────────────────── */

function riseVariants(anim: Required<IsoAnimationConfig>): Variants {
	return {
		hidden: { opacity: 0, y: anim.rise },
		show: (delay: number) => ({
			opacity: 1,
			y: 0,
			transition: { duration: anim.riseDuration, ease: EASE_OUT_EXPO, delay },
		}),
	};
}

// Slide/drop in from above — for a unit docking onto a stack from the top.
function dropVariants(anim: Required<IsoAnimationConfig>): Variants {
	return {
		hidden: { opacity: 0, y: -(anim.rise * 4) },
		show: (delay: number) => ({
			opacity: 1,
			y: 0,
			transition: { duration: anim.riseDuration * 1.1, ease: EASE_OUT_EXPO, delay },
		}),
	};
}

function drawVariants(anim: Required<IsoAnimationConfig>): Variants {
	return {
		hidden: { opacity: 0, pathLength: 0 },
		show: (delay: number) => ({
			opacity: 1,
			pathLength: 1,
			transition: {
				duration: anim.drawDuration,
				ease: EASE_IN_OUT,
				delay,
				opacity: { duration: 0.2, delay },
			},
		}),
	};
}

function gaugeVariants(frac: number, _delay: number, anim: Required<IsoAnimationConfig>): Variants {
	return {
		hidden: { opacity: 0, pathLength: 0 },
		show: (delay: number) => ({
			opacity: 1,
			pathLength: frac,
			transition: {
				duration: anim.drawDuration,
				ease: EASE_IN_OUT,
				delay,
				opacity: { duration: 0.2, delay },
			},
		}),
	};
}

const popVariants: Variants = {
	hidden: { opacity: 0, scale: 0.6 },
	show: (delay: number) => ({
		opacity: 1,
		scale: 1,
		transition: { duration: 0.4, ease: EASE_OUT_EXPO, delay },
	}),
};

function fadeVariants(_delay: number): Variants {
	return {
		hidden: { opacity: 0 },
		show: (delay: number) => ({
			opacity: 1,
			transition: { duration: 0.55, ease: EASE_OUT_EXPO, delay },
		}),
	};
}

/* ─── Helpers ────────────────────────────────────────────────────── */

function anchorOf(node: IsoNode): IsoPt {
	switch (node.type) {
		case "connector":
			return node.from;
		case "path":
			return node.points[0] ?? { x: 0, y: 0 };
		case "label":
		case "glyph":
		case "dots":
		case "gauge":
		case "grid":
			return node.at;
		default:
			return node;
	}
}

function clamp01(n: number): number {
	return Math.max(0, Math.min(1, n));
}

// Static easing fns for scrub mode (the live reveal uses framer's bezier curves).
function easeOutExpo(p: number): number {
	return p >= 1 ? 1 : 1 - 2 ** (-10 * p);
}
function easeOutCubic(p: number): number {
	return 1 - (1 - p) ** 3;
}
function easeInOut(p: number): number {
	return p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
}

function formatCompact(n: number): string {
	const v = Math.round(n);
	return v >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`;
}
