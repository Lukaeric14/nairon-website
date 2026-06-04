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
