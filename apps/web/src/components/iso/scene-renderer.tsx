// Renders an IsoSceneSpec to an animated, reduced-motion-aware SVG.
//
// One viewport observer (useInView) drives both the motion variants and the
// count-ups, so a scene reveals as a single choreographed unit. When reduced
// motion is requested (or animation mode is "none"), every node renders in
// its final state with no motion.

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { depth, type IsoPt } from "./core/iso";
import { EASE_IN_OUT, EASE_OUT_EXPO, useCountUp } from "./core/motion";
import { useIso } from "./core/iso-context";
import { IsoScene } from "./iso-scene";
import { IsoBox, IsoTile } from "./primitives/box";
import { Connector, connectorPath } from "./primitives/connector";
import { DotMatrix, LabelTab, NodeGlyph } from "./primitives/marks";
import { GaugeRing, IsoBar } from "./primitives/data-viz";
import type {
	BarNode,
	ConnectorNode,
	GaugeNode,
	IsoAnimationConfig,
	IsoNode,
	IsoSceneSpec,
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
};

export function IsoSceneRenderer({
	spec,
	trigger = "inView",
	playKey = 0,
	reduceMotion,
	className,
}: {
	spec: IsoSceneSpec;
	/** "inView" reveals once on scroll; "mount" plays immediately (playground). */
	trigger?: "inView" | "mount";
	/** Bump to replay when trigger === "mount". */
	playKey?: number;
	/** Force reduced motion (playground toggle). Defaults to the OS setting. */
	reduceMotion?: boolean;
	className?: string;
}) {
	const sysReduce = useReducedMotion();
	const reduce = reduceMotion ?? sysReduce ?? false;
	const ref = useRef<SVGSVGElement>(null);
	const inView = useInView(ref, { once: true, amount: 0.35 });
	const anim = { ...ANIM_DEFAULTS, ...spec.animation };
	const animateOff = reduce || anim.mode === "none";
	const active = trigger === "mount" ? true : inView;

	// Painter's algorithm for draw order; reveal delay comes from `order`.
	const order = new Map(spec.nodes.map((n, i) => [n.id, n.order ?? i]));
	const drawOrder = [...spec.nodes].sort(
		(a, b) => depth(anchorOf(a)) - depth(anchorOf(b)),
	);

	const ctx: RenderCtx = { anim, reduce, active, playKey };

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
				<g>{drawOrder.map((n) => <StaticNode key={n.id} node={n} />)}</g>
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
	switch (node.type) {
		case "box":
			return (
				<motion.g variants={riseVariants(ctx.anim)} custom={delay}>
					<IsoBox box={node} accent={node.accent} />
				</motion.g>
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
					<LabelTab at={node.at} text={node.text} angle={node.angle} align={node.align} />
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
		default:
			return null;
	}
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

function StaticNode({ node }: { node: IsoNode }): ReactNode {
	switch (node.type) {
		case "box":
			return <IsoBox box={node} accent={node.accent} />;
		case "tile":
			return <IsoTile tile={node} accent={node.accent} />;
		case "connector":
			return <Connector from={node.from} to={node.to} route={node.route} dashed={node.dashed} accent={node.accent} />;
		case "label":
			return <LabelTab at={node.at} text={node.text} angle={node.angle} align={node.align} />;
		case "glyph":
			return <NodeGlyph at={node.at} variant={node.variant} accent={node.accent} />;
		case "dots":
			return <DotMatrix at={node.at} rows={node.rows} cols={node.cols} />;
		case "bar":
			return <StaticBar node={node} />;
		case "gauge":
			return <GaugeRing at={node.at} value={node.value} max={node.max} label={node.label} radius={node.radius} />;
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
		show: (delay: number) => ({ opacity: 1, transition: { duration: 0.4, delay } }),
	};
}

/* ─── Helpers ────────────────────────────────────────────────────── */

function anchorOf(node: IsoNode): IsoPt {
	switch (node.type) {
		case "connector":
			return node.from;
		case "label":
		case "glyph":
		case "dots":
		case "gauge":
			return node.at;
		default:
			return node;
	}
}

function clamp01(n: number): number {
	return Math.max(0, Math.min(1, n));
}

function formatCompact(n: number): string {
	const v = Math.round(n);
	return v >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`;
}
