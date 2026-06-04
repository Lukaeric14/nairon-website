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

function r(n: number): number {
	return Math.round(n * 100) / 100;
}
