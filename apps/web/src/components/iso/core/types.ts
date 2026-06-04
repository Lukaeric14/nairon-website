// Serializable scene schema — the "engine" of the tool.
//
// A scene is plain data: a viewBox, style overrides, animation config, and
// an ordered list of typed nodes. Because it's serializable, the playground
// can read it, edit it live (as JSON), and export it — and you can iterate
// the layout with Claude by passing the spec back and forth.

export type IsoNodeBase = {
	/** Stable id — used as the React key and for animation ordering. */
	id: string;
	/** Reveal order (lower = earlier). Defaults to array index. */
	order?: number;
};

export type BoxNode = IsoNodeBase & {
	type: "box";
	x: number;
	y: number;
	z?: number;
	w: number;
	d: number;
	h: number;
	accent?: boolean;
};

export type TileNode = IsoNodeBase & {
	type: "tile";
	x: number;
	y: number;
	z?: number;
	w: number;
	d: number;
	accent?: boolean;
};

export type ConnectorNode = IsoNodeBase & {
	type: "connector";
	from: { x: number; y: number; z?: number };
	to: { x: number; y: number; z?: number };
	/** "line" = straight; "axis" = right-angle routed along iso axes. */
	route?: "line" | "axis";
	/** Dashed connectors flow instead of drawing on (avoids pathLength/dash conflict). */
	dashed?: boolean;
	accent?: boolean;
};

export type LabelNode = IsoNodeBase & {
	type: "label";
	at: { x: number; y: number; z?: number };
	text: string;
	/** Degrees; tilt the tag to ride an iso edge. */
	angle?: number;
	align?: "start" | "middle" | "end";
};

export type GlyphNode = IsoNodeBase & {
	type: "glyph";
	at: { x: number; y: number; z?: number };
	variant?: "user" | "dot" | "lock" | "node";
	accent?: boolean;
};

export type BarNode = IsoNodeBase & {
	type: "bar";
	x: number;
	y: number;
	value: number;
	max: number;
	/** Footprint of the bar in grid units. */
	w?: number;
	d?: number;
	/** Max height (grid units) at value === max. */
	height?: number;
	label?: string;
	accent?: boolean;
};

export type GaugeNode = IsoNodeBase & {
	type: "gauge";
	at: { x: number; y: number; z?: number };
	value: number;
	max: number;
	label?: string;
	radius?: number;
};

export type DotsNode = IsoNodeBase & {
	type: "dots";
	at: { x: number; y: number; z?: number };
	rows?: number;
	cols?: number;
};

export type IsoNode =
	| BoxNode
	| TileNode
	| ConnectorNode
	| LabelNode
	| GlyphNode
	| BarNode
	| GaugeNode
	| DotsNode;

/** Per-scene token overrides → applied as inline CSS vars on the SVG root. */
export interface IsoStyleOverride {
	ink?: string;
	surface?: string;
	muted?: string;
	accent?: string;
	strokeWidth?: number;
	dash?: string;
	linejoin?: "round" | "miter" | "bevel";
}

export interface IsoAnimationConfig {
	/** Master switch. "reveal" = animate in; "none" = render final state. */
	mode?: "reveal" | "none";
	/** Seconds between successive nodes. */
	stagger?: number;
	/** Rise distance (px) for solid shapes. */
	rise?: number;
	/** Entrance duration for solid shapes (s). */
	riseDuration?: number;
	/** Stroke draw-on duration (s). */
	drawDuration?: number;
	/** Loop the dash flow on dashed connectors. */
	flow?: boolean;
}

export interface IsoSceneSpec {
	id: string;
	/** Accessible name (rendered into <title>). */
	title: string;
	/** Accessible long description (rendered into <desc>). */
	desc?: string;
	/** SVG viewBox: [minX, minY, width, height]. */
	viewBox: [number, number, number, number];
	/** Screen px where iso (0,0,0) lands. Defaults to viewBox center. */
	origin?: { sx: number; sy: number };
	/** Grid unit size in px. */
	unit?: number;
	style?: IsoStyleOverride;
	animation?: IsoAnimationConfig;
	nodes: IsoNode[];
}
