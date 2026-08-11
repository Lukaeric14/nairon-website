// Isometric projection core — flat vector line-art on a true 30° grid.
//
// There is no camera, no perspective, no lighting. Iso-space coordinates
// {x, y, z} (z = up) map to screen {sx, sy} via one pure function. Every
// primitive and scene shares this so the whole family stays on one grid.
//
// Pure + dependency-free by design: geometry helpers take a `Projector`,
// so they are trivially unit-testable with the identity projector.

export const ISO_ANGLE = Math.PI / 6; // 30° from horizontal — matches the reference art
export const ISO_COS = Math.cos(ISO_ANGLE); // ≈ 0.86602540
export const ISO_SIN = Math.sin(ISO_ANGLE); // 0.5

/** One iso grid unit, in screen px, before any scene-level scaling. */
export const UNIT = 36;

export interface IsoPt {
	x: number;
	y: number;
	/** Height along the up axis. Defaults to 0 (ground plane). */
	z?: number;
}

export interface ScreenPt {
	sx: number;
	sy: number;
}

/** A projector maps an iso point to a screen point (already scaled + offset). */
export type Projector = (pt: IsoPt) => ScreenPt;

/** Raw true-isometric projection at unit scale, origin (0,0). */
export function iso({ x, y, z = 0 }: IsoPt): ScreenPt {
	return {
		sx: (x - y) * ISO_COS,
		sy: (x + y) * ISO_SIN - z,
	};
}

/**
 * Build a projector that bakes scale + origin into the coordinates.
 * We bake the scale into coordinates (rather than an SVG `transform: scale`)
 * so stroke widths, fonts, and dash patterns stay in real pixels.
 */
export function makeProjector(unit = UNIT, origin: ScreenPt = { sx: 0, sy: 0 }): Projector {
	return (pt) => {
		const { sx, sy } = iso(pt);
		return { sx: sx * unit + origin.sx, sy: sy * unit + origin.sy };
	};
}

/** Emit an SVG points string ("x,y x,y …") for a polygon of iso points. */
export function poly(pts: IsoPt[], project: Projector): string {
	return pts
		.map((p) => {
			const { sx, sy } = project(p);
			return `${round(sx)},${round(sy)}`;
		})
		.join(" ");
}

/** Emit an SVG path `d` (M…L…[Z]) through iso points. */
export function path(pts: IsoPt[], project: Projector, close = false): string {
	const d = pts
		.map((p, i) => {
			const { sx, sy } = project(p);
			return `${i === 0 ? "M" : "L"}${round(sx)} ${round(sy)}`;
		})
		.join(" ");
	return close ? `${d} Z` : d;
}

/**
 * Painter's-algorithm depth key. SVG has no z-buffer — larger key = nearer
 * the viewer = must paint later. Sort scene children by this ascending.
 */
export function depth({ x, y, z = 0 }: IsoPt): number {
	return x + y + z;
}

/** Sort items back-to-front by an extracted iso anchor. */
export function sortByDepth<T>(items: T[], anchor: (item: T) => IsoPt): T[] {
	return [...items].sort((a, b) => depth(anchor(a)) - depth(anchor(b)));
}

/* ─── Shape geometry helpers (pure) ──────────────────────────────── */

export interface Box {
	x: number;
	y: number;
	z?: number;
	w: number;
	d: number;
	h: number;
}

/** The three visible faces of an extruded box, as point strings. */
export function boxFaces(b: Box, project: Projector) {
	const { x, y, z = 0, w, d, h } = b;
	const top: IsoPt[] = [
		{ x, y, z: z + h },
		{ x: x + w, y, z: z + h },
		{ x: x + w, y: y + d, z: z + h },
		{ x, y: y + d, z: z + h },
	];
	const left: IsoPt[] = [
		{ x, y: y + d, z: z + h },
		{ x: x + w, y: y + d, z: z + h },
		{ x: x + w, y: y + d, z },
		{ x, y: y + d, z },
	];
	const right: IsoPt[] = [
		{ x: x + w, y, z: z + h },
		{ x: x + w, y: y + d, z: z + h },
		{ x: x + w, y: y + d, z },
		{ x: x + w, y, z },
	];
	return {
		top: poly(top, project),
		left: poly(left, project),
		right: poly(right, project),
	};
}

/**
 * Explode a stack spec into its individual slab boxes, bottom → top.
 * `grow` (0→1) scales the assembly up from flat — each slab's height and its
 * stacking offset multiply by `grow`, so at 0 every slab collapses onto the
 * base plane and at 1 the full stack stands.
 */
export function stackSlabs(
	s: { x: number; y: number; z?: number; w: number; d: number; layers?: number; thickness?: number; gap?: number },
	grow = 1,
): Box[] {
	const layers = Math.max(1, s.layers ?? 3);
	const thickness = s.thickness ?? 0.22;
	const gap = s.gap ?? 0.22;
	const base = s.z ?? 0;
	return Array.from({ length: layers }, (_, i) => ({
		x: s.x,
		y: s.y,
		w: s.w,
		d: s.d,
		z: base + i * (thickness + gap) * grow,
		h: Math.max(0.001, thickness * grow),
	}));
}

export interface Wedge {
	x: number;
	y: number;
	z?: number;
	w: number;
	d: number;
	/** Height at the high edge. */
	hi: number;
	/** Height at the low edge (default 0). */
	lo?: number;
	/** Axis the ramp rises along (default "x"). */
	axis?: "x" | "y";
}

/**
 * The three visible faces of a wedge (ramp) — a box whose top face tilts from a
 * low edge to a high edge along one axis. Same face set as a box; only the top
 * corners carry differing heights.
 */
export function wedgeFaces(b: Wedge, project: Projector) {
	const { x, y, z = 0, w, d, hi, lo = 0, axis = "x" } = b;
	const topPts: IsoPt[] =
		axis === "x"
			? [
					{ x, y, z: z + lo },
					{ x: x + w, y, z: z + hi },
					{ x: x + w, y: y + d, z: z + hi },
					{ x, y: y + d, z: z + lo },
				]
			: [
					{ x, y, z: z + lo },
					{ x: x + w, y, z: z + lo },
					{ x: x + w, y: y + d, z: z + hi },
					{ x, y: y + d, z: z + hi },
				];
	const c1 = topPts[1]; // (x+w, y, *)
	const c2 = topPts[2]; // (x+w, y+d, *)
	const c3 = topPts[3]; // (x, y+d, *)
	const left: IsoPt[] = [c3, c2, { x: x + w, y: y + d, z }, { x, y: y + d, z }];
	const right: IsoPt[] = [c1, c2, { x: x + w, y: y + d, z }, { x: x + w, y, z }];
	return {
		top: poly(topPts, project),
		left: poly(left, project),
		right: poly(right, project),
	};
}

/**
 * The two viewer-facing triangular faces of a square pyramid: base w×d at z,
 * apex centered at z + h. The two back faces are hidden, so we omit them.
 */
export function pyramidFaces(
	b: { x: number; y: number; z?: number; w: number; d: number; h: number },
	project: Projector,
) {
	const { x, y, z = 0, w, d, h } = b;
	const apex: IsoPt = { x: x + w / 2, y: y + d / 2, z: z + h };
	const right: IsoPt[] = [{ x: x + w, y, z }, { x: x + w, y: y + d, z }, apex];
	const left: IsoPt[] = [{ x, y: y + d, z }, { x: x + w, y: y + d, z }, apex];
	return { left: poly(left, project), right: poly(right, project) };
}

/**
 * A hexagonal extruded prism: the top hexagon plus its side quads, each tagged
 * with a back-to-front depth and a left/right lean so the caller can paint them
 * in order and shade them. (x, y) is the footprint CENTER.
 */
export function hexPrismFaces(
	b: { x: number; y: number; z?: number; r: number; h: number; rot?: number },
	project: Projector,
) {
	const { x, y, z = 0, r, h, rot = 30 } = b;
	const verts = Array.from({ length: 6 }, (_, k) => {
		const a = (Math.PI / 180) * (60 * k + rot);
		return { x: x + r * Math.cos(a), y: y + r * Math.sin(a) };
	});
	const top = poly(
		verts.map((vtx) => ({ x: vtx.x, y: vtx.y, z: z + h })),
		project,
	);
	const sides = verts.map((vtx, k) => {
		const nx = verts[(k + 1) % 6];
		const quad: IsoPt[] = [
			{ x: vtx.x, y: vtx.y, z: z + h },
			{ x: nx.x, y: nx.y, z: z + h },
			{ x: nx.x, y: nx.y, z },
			{ x: vtx.x, y: vtx.y, z },
		];
		const mx = (vtx.x + nx.x) / 2 - x;
		const my = (vtx.y + nx.y) / 2 - y;
		return {
			pts: poly(quad, project),
			depth: (vtx.x + vtx.y + nx.x + nx.y) / 2 + z + h / 2,
			lean: mx - my < 0 ? ("left" as const) : ("right" as const),
		};
	});
	sides.sort((p, q) => p.depth - q.depth);
	return { top, sides };
}

/**
 * Expand a staircase spec into its step boxes, back → front. Each step advances
 * by `run` along x and is one `rise` taller than the last, so step i fills
 * [x + i·run, x + (i+1)·run] up to height (i+1)·rise.
 */
export function stepsBoxes(b: {
	x: number;
	y: number;
	z?: number;
	d: number;
	run: number;
	rise: number;
	count: number;
}): Box[] {
	const { x, y, z = 0, d, run, rise } = b;
	const count = Math.max(1, b.count);
	return Array.from({ length: count }, (_, i) => ({
		x: x + i * run,
		y,
		w: run,
		d,
		z,
		h: (i + 1) * rise,
	}));
}

/** A flat ground tile (single top face). */
export function tileFace(
	t: { x: number; y: number; z?: number; w: number; d: number },
	project: Projector,
): string {
	const { x, y, z = 0, w, d } = t;
	return poly(
		[
			{ x, y, z },
			{ x: x + w, y, z },
			{ x: x + w, y: y + d, z },
			{ x, y: y + d, z },
		],
		project,
	);
}

function round(n: number): number {
	return Math.round(n * 100) / 100;
}
