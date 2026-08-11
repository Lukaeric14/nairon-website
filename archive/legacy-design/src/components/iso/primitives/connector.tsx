// Routed connector between two iso anchors. Exposes a path helper so scenes
// can animate the draw-on with <motion.path>, plus a static component.

import type { IsoPt, Projector } from "../core/iso";
import { useIso } from "../core/iso-context";

export type Route = "line" | "axis";

/** Build the SVG path `d` for a connector. "axis" routes through a right angle. */
export function connectorPath(
	from: IsoPt,
	to: IsoPt,
	project: Projector,
	route: Route = "line",
): string {
	const a = project(from);
	const b = project(to);
	if (route === "axis") {
		// Elbow through a point sharing `from`'s x and `to`'s y (in iso space).
		const knee = project({ x: from.x, y: to.y, z: from.z ?? 0 });
		return `M${r(a.sx)} ${r(a.sy)} L${r(knee.sx)} ${r(knee.sy)} L${r(b.sx)} ${r(b.sy)}`;
	}
	return `M${r(a.sx)} ${r(a.sy)} L${r(b.sx)} ${r(b.sy)}`;
}

export function Connector({
	from,
	to,
	route = "line",
	dashed = false,
	accent = false,
}: {
	from: IsoPt;
	to: IsoPt;
	route?: Route;
	dashed?: boolean;
	accent?: boolean;
}) {
	const { project } = useIso();
	return (
		<path
			className="iso-layer"
			d={connectorPath(from, to, project, route)}
			style={{
				stroke: accent ? "var(--iso-accent)" : "var(--iso-muted)",
				strokeDasharray: dashed ? "var(--iso-dash)" : undefined,
			}}
		/>
	);
}

export type PolyRoute = "line" | "axis" | "smooth";

/**
 * Build the SVG path `d` through N iso points. "line" = straight segments,
 * "axis" = a right-angle elbow at each step, "smooth" = a Catmull-Rom curve
 * (great for trend lines). Drives the multi-point `path` node.
 */
export function polylinePath(
	points: IsoPt[],
	project: Projector,
	route: PolyRoute = "line",
): string {
	if (points.length === 0) return "";
	const pts = points.map(project);
	if (points.length === 1) return `M${r(pts[0].sx)} ${r(pts[0].sy)}`;

	if (route === "smooth") return smoothPath(pts);

	if (route === "axis") {
		let d = `M${r(pts[0].sx)} ${r(pts[0].sy)}`;
		for (let i = 1; i < points.length; i++) {
			const knee = project({ x: points[i - 1].x, y: points[i].y, z: points[i - 1].z ?? 0 });
			d += ` L${r(knee.sx)} ${r(knee.sy)} L${r(pts[i].sx)} ${r(pts[i].sy)}`;
		}
		return d;
	}

	return pts.map((p, i) => `${i === 0 ? "M" : "L"}${r(p.sx)} ${r(p.sy)}`).join(" ");
}

/** Catmull-Rom → cubic bézier through already-projected screen points. */
function smoothPath(pts: { sx: number; sy: number }[]): string {
	let d = `M${r(pts[0].sx)} ${r(pts[0].sy)}`;
	for (let i = 0; i < pts.length - 1; i++) {
		const p0 = pts[i - 1] ?? pts[i];
		const p1 = pts[i];
		const p2 = pts[i + 1];
		const p3 = pts[i + 2] ?? p2;
		const c1x = p1.sx + (p2.sx - p0.sx) / 6;
		const c1y = p1.sy + (p2.sy - p0.sy) / 6;
		const c2x = p2.sx - (p3.sx - p1.sx) / 6;
		const c2y = p2.sy - (p3.sy - p1.sy) / 6;
		d += ` C${r(c1x)} ${r(c1y)} ${r(c2x)} ${r(c2y)} ${r(p2.sx)} ${r(p2.sy)}`;
	}
	return d;
}

export function Polyline({
	points,
	route = "line",
	dashed = false,
	accent = false,
}: {
	points: IsoPt[];
	route?: PolyRoute;
	dashed?: boolean;
	accent?: boolean;
}) {
	const { project } = useIso();
	return (
		<path
			className="iso-layer"
			d={polylinePath(points, project, route)}
			style={{
				fill: "none",
				stroke: accent ? "var(--iso-accent)" : "var(--iso-muted)",
				strokeDasharray: dashed ? "var(--iso-dash)" : undefined,
			}}
		/>
	);
}

function r(n: number): number {
	return Math.round(n * 100) / 100;
}
