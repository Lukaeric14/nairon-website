// Flat marks that ride the iso grid but keep constant pixel size:
// edge labels, node glyphs, and the small corner dot-matrix.

import type { IsoPt } from "../core/iso";
import { useIso } from "../core/iso-context";

export function LabelTab({
	at,
	text,
	angle = 0,
	align = "middle",
}: {
	at: IsoPt;
	text: string;
	angle?: number;
	align?: "start" | "middle" | "end";
}) {
	const { project } = useIso();
	const { sx, sy } = project(at);
	return (
		<g transform={`translate(${sx} ${sy}) rotate(${angle})`}>
			<line
				x1={0}
				y1={0}
				x2={align === "end" ? -10 : 10}
				y2={0}
				className="iso-layer"
				style={{ stroke: "var(--iso-muted)" }}
			/>
			<text
				x={align === "end" ? -16 : 16}
				y={0}
				textAnchor={align}
				dominantBaseline="middle"
				className="font-mono"
				style={{ fill: "var(--iso-ink)", fontSize: 11, letterSpacing: 0.2 }}
			>
				{text}
			</text>
		</g>
	);
}

export function NodeGlyph({
	at,
	variant = "node",
	accent = false,
	r = 8,
}: {
	at: IsoPt;
	variant?: "user" | "dot" | "lock" | "node";
	accent?: boolean;
	r?: number;
}) {
	const { project } = useIso();
	const { sx, sy } = project(at);
	const stroke = accent ? "var(--iso-accent)" : "var(--iso-ink)";
	return (
		<g transform={`translate(${sx} ${sy})`} className="iso-layer" style={{ stroke }}>
			<circle cx={0} cy={0} r={r} style={{ fill: "var(--iso-surface)" }} />
			{variant === "dot" && (
				<circle cx={0} cy={0} r={r * 0.28} style={{ fill: stroke, stroke: "none" }} />
			)}
			{variant === "user" && (
				<>
					<circle cx={0} cy={-r * 0.22} r={r * 0.26} />
					<path d={`M${-r * 0.42} ${r * 0.42} A ${r * 0.42} ${r * 0.42} 0 0 1 ${r * 0.42} ${r * 0.42}`} />
				</>
			)}
			{variant === "lock" && (
				<>
					<rect x={-r * 0.4} y={-r * 0.05} width={r * 0.8} height={r * 0.55} rx={1} />
					<path d={`M${-r * 0.24} ${-r * 0.05} V ${-r * 0.3} A ${r * 0.24} ${r * 0.24} 0 0 1 ${r * 0.24} ${-r * 0.3} V ${-r * 0.05}`} />
				</>
			)}
		</g>
	);
}

export function DotMatrix({
	at,
	rows = 3,
	cols = 3,
	gap = 4,
}: {
	at: IsoPt;
	rows?: number;
	cols?: number;
	gap?: number;
}) {
	const { project } = useIso();
	const { sx, sy } = project(at);
	const dots = [];
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			dots.push(
				<circle key={`${r}-${c}`} cx={c * gap} cy={r * gap} r={0.9} style={{ fill: "var(--iso-muted)" }} />,
			);
		}
	}
	return <g transform={`translate(${sx} ${sy})`}>{dots}</g>;
}
