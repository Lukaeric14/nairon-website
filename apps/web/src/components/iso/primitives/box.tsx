// Extruded box + flat tile — the volume primitives.

import { boxFaces, tileFace, type Box } from "../core/iso";
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
