// Data-bound primitives: a parametric bar and a flattened gauge ring.
// These render their static (final-value) state; the SceneRenderer supplies
// the animated draw-on / count-up variants when a scene reveals.

import { IsoBox } from "./box";
import { useIso } from "../core/iso-context";
import type { IsoPt } from "../core/iso";

export function IsoBar({
	x,
	y,
	value,
	max,
	w = 0.7,
	d = 0.7,
	height = 4,
	accent = false,
}: {
	x: number;
	y: number;
	value: number;
	max: number;
	w?: number;
	d?: number;
	height?: number;
	accent?: boolean;
}) {
	const h = Math.max(0.001, (value / Math.max(max, 1e-6)) * height);
	return <IsoBox box={{ x, y, w, d, h }} accent={accent} />;
}

export function GaugeRing({
	at,
	value,
	max,
	label,
	radius = 2.4,
	display,
}: {
	at: IsoPt;
	value: number;
	max: number;
	label?: string;
	radius?: number;
	/** Override the centered number (e.g. animated count-up value). */
	display?: number;
}) {
	const { project, unit } = useIso();
	const { sx, sy } = project(at);
	const rx = radius * unit;
	const ry = radius * unit * 0.52;
	const frac = Math.max(0, Math.min(1, value / Math.max(max, 1e-6)));
	const shown = Math.round(display ?? value);
	return (
		<g transform={`translate(${sx} ${sy})`}>
			<ellipse cx={0} cy={0} rx={rx} ry={ry} className="iso-layer" style={{ stroke: "var(--iso-muted)" }} />
			<ellipse
				cx={0}
				cy={0}
				rx={rx}
				ry={ry}
				pathLength={1}
				className="iso-layer"
				transform="rotate(-90)"
				style={{ stroke: "var(--iso-accent)", strokeDasharray: `${frac} 1`, strokeWidth: "calc(var(--iso-stroke-w) * 2)" }}
			/>
			{label && (
				<text
					x={0}
					y={-4}
					textAnchor="middle"
					className="font-mono"
					style={{ fill: "var(--iso-muted)", fontSize: 9, letterSpacing: 1 }}
				>
					{label}
				</text>
			)}
			<text
				x={0}
				y={12}
				textAnchor="middle"
				className="font-mono"
				style={{ fill: "var(--iso-ink)", fontSize: 16, fontWeight: 600 }}
			>
				{shown}
			</text>
		</g>
	);
}
