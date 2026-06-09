// Flat marks that ride the iso grid but keep constant pixel size:
// edge labels, node glyphs, the small corner dot-matrix, and a grid floor.

import type { IsoPt, Projector } from "../core/iso";
import { useIso } from "../core/iso-context";

export function LabelTab({
	at,
	text,
	angle = 0,
	align = "middle",
	size = 11,
	lead = true,
}: {
	at: IsoPt;
	text: string;
	angle?: number;
	align?: "start" | "middle" | "end";
	size?: number;
	lead?: boolean;
}) {
	const { project } = useIso();
	const { sx, sy } = project(at);
	// Leader line + text gap scale with the font so small labels stay tidy.
	const leadLen = size * 0.9;
	// Without a leader the text sits on the anchor (no tick to clear).
	const gap = lead ? size * 1.45 : 0;
	// "\n" splits the label into stacked lines, vertically centered on the tick.
	const lines = text.split("\n");
	const lineH = size * 1.2;
	const x = align === "end" ? -gap : gap;
	return (
		<g transform={`translate(${sx} ${sy}) rotate(${angle})`}>
			{lead && (
				<line
					x1={0}
					y1={0}
					x2={align === "end" ? -leadLen : leadLen}
					y2={0}
					className="iso-layer"
					style={{ stroke: "var(--iso-muted)" }}
				/>
			)}
			<text
				x={x}
				y={0}
				textAnchor={align}
				dominantBaseline="middle"
				className="font-mono"
				style={{ fill: "var(--iso-ink)", fontSize: size, letterSpacing: 0.2 }}
			>
				{lines.map((line, i) => (
					<tspan
						key={line}
						x={x}
						dy={i === 0 ? -((lines.length - 1) * lineH) / 2 : lineH}
					>
						{line}
					</tspan>
				))}
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
	variant?: "user" | "dot" | "lock" | "node" | "disc";
	accent?: boolean;
	r?: number;
}) {
	const { project } = useIso();
	const { sx, sy } = project(at);
	const stroke = accent ? "var(--iso-accent)" : "var(--iso-ink)";
	return (
		<g transform={`translate(${sx} ${sy})`} className="iso-layer" style={{ stroke }}>
			<circle cx={0} cy={0} r={r} style={{ fill: variant === "disc" ? stroke : "var(--iso-surface)" }} />
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

// A flat iso line-grid on the ground plane — the blueprint backdrop. Emitted
// as one path so a scene can draw the whole floor on in a single stroke.
export function gridPath(
	at: IsoPt,
	cols: number,
	rows: number,
	cell: number,
	project: Projector,
): string {
	const z = at.z ?? 0;
	const segs: string[] = [];
	for (let i = 0; i <= cols; i++) {
		const gx = at.x + i * cell;
		const a = project({ x: gx, y: at.y, z });
		const b = project({ x: gx, y: at.y + rows * cell, z });
		segs.push(`M${r(a.sx)} ${r(a.sy)} L${r(b.sx)} ${r(b.sy)}`);
	}
	for (let j = 0; j <= rows; j++) {
		const gy = at.y + j * cell;
		const a = project({ x: at.x, y: gy, z });
		const b = project({ x: at.x + cols * cell, y: gy, z });
		segs.push(`M${r(a.sx)} ${r(a.sy)} L${r(b.sx)} ${r(b.sy)}`);
	}
	return segs.join(" ");
}

export function IsoGrid({
	at,
	cols,
	rows,
	cell = 1,
	dashed = false,
	accent = false,
}: {
	at: IsoPt;
	cols: number;
	rows: number;
	cell?: number;
	dashed?: boolean;
	accent?: boolean;
}) {
	const { project } = useIso();
	return (
		<path
			className="iso-layer"
			d={gridPath(at, cols, rows, cell, project)}
			style={{
				fill: "none",
				stroke: accent ? "var(--iso-accent)" : "var(--iso-muted)",
				strokeDasharray: dashed ? "var(--iso-dash)" : undefined,
			}}
		/>
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

function r(n: number): number {
	return Math.round(n * 100) / 100;
}
