// Extruded box, flat tile, cylinder, stack, frame, wedge, and pyramid — the
// volume primitives.

import {
	boxFaces,
	hexPrismFaces,
	pyramidFaces,
	stackSlabs,
	stepsBoxes,
	tileFace,
	wedgeFaces,
	type Box,
	type Wedge,
} from "../core/iso";
import { useIso } from "../core/iso-context";

const v = (name: string) => `var(--iso-${name})`;

export function IsoBox({ box, accent = false }: { box: Box; accent?: boolean }) {
	const { project } = useIso();
	const f = boxFaces(box, project);
	const p = accent ? "accent" : "fill";
	return (
		<g className="iso-layer">
			{/* sides first, top painted last so seams read correctly */}
			<polygon points={f.left} style={{ fill: v(`${p}-left`) }} />
			<polygon points={f.right} style={{ fill: v(`${p}-right`) }} />
			<polygon points={f.top} style={{ fill: v(`${p}-top`) }} />
		</g>
	);
}

export function IsoTile({
	tile,
	accent = false,
}: {
	tile: { x: number; y: number; z?: number; w: number; d: number };
	accent?: boolean;
}) {
	const { project } = useIso();
	return (
		<g className="iso-layer">
			<polygon
				points={tileFace(tile, project)}
				style={{ fill: v(accent ? "accent-top" : "fill-top") }}
			/>
		</g>
	);
}

// A standing cylinder — a circle on the ground projects to an ellipse, so the
// solid is two stacked ellipses joined by a body. We draw the body (verticals +
// front rim) then paint the top cap over it; hidden edges are never drawn,
// matching the flat line-art elsewhere. (x, y) is the footprint CENTER.
export function IsoCylinder({
	cyl,
	accent = false,
	recessed = false,
}: {
	cyl: { x: number; y: number; z?: number; r: number; h: number };
	accent?: boolean;
	recessed?: boolean;
}) {
	const { project, unit } = useIso();
	const { x, y, z = 0, r, h } = cyl;
	const top = project({ x, y, z: z + Math.max(0.001, h) });
	const bot = project({ x, y, z });
	const rx = r * unit;
	const ry = r * unit * 0.5; // iso foreshortening of the ground circle

	// A sunken socket (a hole cut into a surface). For it to read as a HOLE — not a
	// flat ring or a protruding tube — the interior must be SHADED (darker than the
	// face it sits in) with a smaller floor ellipse nudged toward the back, so the
	// eye reads it as looking down into a recess. `accent` lets the socket "power
	// on" with the block it sits in. (`top` = opening at z+h; `bot` = floor at z.)
	if (recessed) {
		// A sunken socket: a smaller floor ellipse nested inside the opening, sharing its
		// BOTTOM lip. The crescent gap then opens entirely UPWARD — that crescent is the
		// back inner wall you see looking down into the hole. `accent` lets it power on.
		const k = 0.72; // floor radius vs opening
		const floorCy = top.sy + ry * (1 - k); // align the floor's bottom lip with the rim's
		// Inner wall = darkest (least light reaches it); floor = a touch lighter.
		const wall = accent
			? "var(--iso-accent-right)"
			: "color-mix(in oklab, var(--iso-surface), var(--iso-ink) 15%)";
		const floorFill = accent
			? "var(--iso-accent-left)"
			: "color-mix(in oklab, var(--iso-surface), var(--iso-ink) 8%)";
		return (
			<g className="iso-layer">
				<ellipse cx={rnd(top.sx)} cy={rnd(top.sy)} rx={rnd(rx)} ry={rnd(ry)} style={{ fill: wall }} />
				<ellipse cx={rnd(top.sx)} cy={rnd(floorCy)} rx={rnd(rx * k)} ry={rnd(ry * k)} style={{ fill: floorFill }} />
			</g>
		);
	}

	const p = accent ? "accent" : "fill";
	// left vertical → front bottom rim (sweep 0 bulges toward viewer) → right
	// vertical → back top arc (hidden under the cap, just closes the region).
	const body =
		`M${rnd(top.sx - rx)} ${rnd(top.sy)}` +
		` L${rnd(bot.sx - rx)} ${rnd(bot.sy)}` +
		` A${rnd(rx)} ${rnd(ry)} 0 0 0 ${rnd(bot.sx + rx)} ${rnd(bot.sy)}` +
		` L${rnd(top.sx + rx)} ${rnd(top.sy)}` +
		` A${rnd(rx)} ${rnd(ry)} 0 0 1 ${rnd(top.sx - rx)} ${rnd(top.sy)} Z`;
	return (
		<g className="iso-layer">
			<path d={body} style={{ fill: v(`${p}-right`) }} />
			<ellipse cx={rnd(top.sx)} cy={rnd(top.sy)} rx={rnd(rx)} ry={rnd(ry)} style={{ fill: v(`${p}-top`) }} />
		</g>
	);
}

// A stack of thin slabs — repeated boxes offset up the z axis. Slabs render
// bottom → top so the painter's order stays correct. `grow` (0→1) collapses the
// stack onto its base plane and assembles it up.
export function IsoStack({
	stack,
	accent = false,
	grow = 1,
}: {
	stack: { x: number; y: number; z?: number; w: number; d: number; layers?: number; thickness?: number; gap?: number };
	accent?: boolean;
	grow?: number;
}) {
	const slabs = stackSlabs(stack, grow);
	return (
		<g>
			{slabs.map((b, i) => (
				<IsoBox key={i} box={b} accent={accent} />
			))}
		</g>
	);
}

// An outline-only box — the wireframe of a volume, no fills. Reads as an empty
// slot / container / capacity not yet filled. Use `dashed` for a ghost slot.
export function IsoFrame({
	box,
	accent = false,
	dashed = false,
}: {
	box: Box;
	accent?: boolean;
	dashed?: boolean;
}) {
	const { project } = useIso();
	const f = boxFaces(box, project);
	return (
		<g
			className="iso-layer"
			style={{
				fill: "none",
				stroke: accent ? "var(--iso-accent)" : "var(--iso-ink)",
				strokeDasharray: dashed ? "var(--iso-dash)" : undefined,
			}}
		>
			<polygon points={f.left} />
			<polygon points={f.right} />
			<polygon points={f.top} />
		</g>
	);
}

// A wedge / ramp — a box whose top face tilts from a low edge to a high edge.
export function IsoWedge({ wedge, accent = false }: { wedge: Wedge; accent?: boolean }) {
	const { project } = useIso();
	const f = wedgeFaces(wedge, project);
	const p = accent ? "accent" : "fill";
	return (
		<g className="iso-layer">
			<polygon points={f.left} style={{ fill: v(`${p}-left`) }} />
			<polygon points={f.right} style={{ fill: v(`${p}-right`) }} />
			<polygon points={f.top} style={{ fill: v(`${p}-top`) }} />
		</g>
	);
}

// A square pyramid — base w×d, apex centered at z + h. Two viewer-facing faces.
export function IsoPyramid({
	pyramid,
	accent = false,
}: {
	pyramid: { x: number; y: number; z?: number; w: number; d: number; h: number };
	accent?: boolean;
}) {
	const { project } = useIso();
	const f = pyramidFaces(pyramid, project);
	const p = accent ? "accent" : "fill";
	return (
		<g className="iso-layer">
			<polygon points={f.left} style={{ fill: v(`${p}-left`) }} />
			<polygon points={f.right} style={{ fill: v(`${p}-right`) }} />
		</g>
	);
}

// A hexagonal prism — a modular cell / honeycomb unit. Side faces paint
// back-to-front and shade left/right by their lean; the top hexagon caps it.
export function IsoHexPrism({
	hex,
	accent = false,
}: {
	hex: { x: number; y: number; z?: number; r: number; h: number; rot?: number };
	accent?: boolean;
}) {
	const { project } = useIso();
	const { top, sides } = hexPrismFaces(hex, project);
	const p = accent ? "accent" : "fill";
	return (
		<g className="iso-layer">
			{sides.map((sde, i) => (
				<polygon key={i} points={sde.pts} style={{ fill: v(`${p}-${sde.lean}`) }} />
			))}
			<polygon points={top} style={{ fill: v(`${p}-top`) }} />
		</g>
	);
}

// A cone — a round taper to a point (funnel / signal / spotlight). Like the
// cylinder, the back rim is hidden; the front rim + two slant edges are drawn.
export function IsoCone({
	cone,
	accent = false,
}: {
	cone: { x: number; y: number; z?: number; r: number; h: number };
	accent?: boolean;
}) {
	const { project, unit } = useIso();
	const { x, y, z = 0, r, h } = cone;
	const apex = project({ x, y, z: z + Math.max(0.001, h) });
	const base = project({ x, y, z });
	const rx = r * unit;
	const ry = r * unit * 0.5;
	const p = accent ? "accent" : "fill";
	const body =
		`M${rnd(apex.sx)} ${rnd(apex.sy)}` +
		` L${rnd(base.sx - rx)} ${rnd(base.sy)}` +
		` A${rnd(rx)} ${rnd(ry)} 0 0 0 ${rnd(base.sx + rx)} ${rnd(base.sy)} Z`;
	return (
		<g className="iso-layer">
			<path d={body} style={{ fill: v(`${p}-right`) }} />
		</g>
	);
}

// A flat ground disc — a pad / footprint, or a `ring` halo (outline only).
// Unlike the gauge, it carries no value or number.
export function IsoDisc({
	disc,
	accent = false,
}: {
	disc: { x: number; y: number; z?: number; r: number; ring?: boolean };
	accent?: boolean;
}) {
	const { project, unit } = useIso();
	const { x, y, z = 0, r, ring = false } = disc;
	const c = project({ x, y, z });
	const rx = r * unit;
	const ry = r * unit * 0.5;
	if (ring) {
		return (
			<ellipse
				cx={rnd(c.sx)}
				cy={rnd(c.sy)}
				rx={rnd(rx)}
				ry={rnd(ry)}
				className="iso-layer"
				style={{ fill: "none", stroke: accent ? "var(--iso-accent)" : "var(--iso-muted)", strokeWidth: "calc(var(--iso-stroke-w) * 2)" }}
			/>
		);
	}
	return (
		<g className="iso-layer">
			<ellipse cx={rnd(c.sx)} cy={rnd(c.sy)} rx={rnd(rx)} ry={rnd(ry)} style={{ fill: v(accent ? "accent-top" : "fill-top") }} />
		</g>
	);
}

// A staircase — ascending boxes that read as progress / a growth ladder.
// Distinct from `stack`: steps advance along x, not just up the z axis.
export function IsoSteps({
	steps,
	accent = false,
}: {
	steps: { x: number; y: number; z?: number; d: number; run: number; rise: number; count: number };
	accent?: boolean;
}) {
	const boxes = stepsBoxes(steps);
	return (
		<g>
			{boxes.map((b, i) => (
				<IsoBox key={i} box={b} accent={accent} />
			))}
		</g>
	);
}

function rnd(n: number): number {
	return Math.round(n * 100) / 100;
}
