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
	/** Render immediately in final state (no reveal animation) — e.g. a pre-built backdrop. */
	prebuilt?: boolean;
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
	/** Reveal order at which the box "powers on" — an accent copy cross-fades in
	 *  over the neutral box. Works in every entrance mode (grow, rise, prebuilt). */
	accentAt?: number;
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
	/** Font size in scene units (default 11). */
	size?: number;
	/** Draw the short leader tick before the text (default true). */
	lead?: boolean;
};

export type GlyphNode = IsoNodeBase & {
	type: "glyph";
	at: { x: number; y: number; z?: number };
	variant?: "user" | "dot" | "lock" | "node" | "disc";
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

export type CylinderNode = IsoNodeBase & {
	type: "cylinder";
	/** Center of the footprint (not a corner — cylinders are radial). */
	x: number;
	y: number;
	z?: number;
	/** Radius in grid units. */
	r: number;
	/** Height in grid units. */
	h: number;
	/** Render as a hollow cylindrical recess (a hole cut into a surface) rather than a solid. */
	recessed?: boolean;
	accent?: boolean;
	/** Reveal order at which this cylinder "powers on" — an accent copy cross-fades
	 *  in over the neutral solid. Works in every entrance mode (no recess support). */
	accentAt?: number;
};

export type StackNode = IsoNodeBase & {
	type: "stack";
	x: number;
	y: number;
	z?: number;
	w: number;
	d: number;
	/** Number of slabs (default 3). */
	layers?: number;
	/** Height of each slab in grid units (default 0.22). */
	thickness?: number;
	/** Vertical gap between slabs in grid units (default 0.22). */
	gap?: number;
	accent?: boolean;
	/** Reveal order at which the whole stack "powers on" — an accent copy of every
	 *  slab cross-fades in over the neutral stack. Works in every entrance mode. */
	accentAt?: number;
};

export type GridNode = IsoNodeBase & {
	type: "grid";
	/** Back corner (min x, min y) where the grid starts. */
	at: { x: number; y: number; z?: number };
	cols: number;
	rows: number;
	/** Cell size in grid units (default 1). */
	cell?: number;
	dashed?: boolean;
	accent?: boolean;
};

export type PathNode = IsoNodeBase & {
	type: "path";
	points: { x: number; y: number; z?: number }[];
	/** "line" = straight segments; "axis" = right-angle elbows; "smooth" = curved. */
	route?: "line" | "axis" | "smooth";
	/** Dashed paths flow instead of drawing on (avoids pathLength/dash conflict). */
	dashed?: boolean;
	accent?: boolean;
};

export type FrameNode = IsoNodeBase & {
	type: "frame";
	x: number;
	y: number;
	z?: number;
	w: number;
	d: number;
	h: number;
	/** Render the outline dashed — a ghost/empty slot. */
	dashed?: boolean;
	accent?: boolean;
};

export type WedgeNode = IsoNodeBase & {
	type: "wedge";
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
	accent?: boolean;
};

export type PyramidNode = IsoNodeBase & {
	type: "pyramid";
	x: number;
	y: number;
	z?: number;
	w: number;
	d: number;
	/** Apex height above the base. */
	h: number;
	accent?: boolean;
};

export type HexPrismNode = IsoNodeBase & {
	type: "hexPrism";
	/** Footprint center. */
	x: number;
	y: number;
	z?: number;
	/** Radius (center → vertex) in grid units. */
	r: number;
	/** Height in grid units. */
	h: number;
	/** Rotation of the hexagon in degrees (default 30). */
	rot?: number;
	accent?: boolean;
};

export type ConeNode = IsoNodeBase & {
	type: "cone";
	/** Footprint center. */
	x: number;
	y: number;
	z?: number;
	r: number;
	h: number;
	accent?: boolean;
};

export type DiscNode = IsoNodeBase & {
	type: "disc";
	/** Footprint center. */
	x: number;
	y: number;
	z?: number;
	r: number;
	/** Outline-only halo/ring instead of a filled pad. */
	ring?: boolean;
	accent?: boolean;
};

export type StepsNode = IsoNodeBase & {
	type: "steps";
	x: number;
	y: number;
	z?: number;
	/** Depth (y span) of every step. */
	d: number;
	/** x advance per step (also the step width). */
	run: number;
	/** z added per step. */
	rise: number;
	count: number;
	accent?: boolean;
};

export type IsoNode =
	| BoxNode
	| TileNode
	| ConnectorNode
	| LabelNode
	| GlyphNode
	| BarNode
	| GaugeNode
	| DotsNode
	| CylinderNode
	| StackNode
	| GridNode
	| PathNode
	| FrameNode
	| WedgeNode
	| PyramidNode
	| HexPrismNode
	| ConeNode
	| DiscNode
	| StepsNode;

/** Per-scene token overrides → applied as inline CSS vars on the SVG root. */
export interface IsoStyleOverride {
	ink?: string;
	/** Line-work stroke color. Defaults to `ink`; set independently to lighten
	 *  outlines without affecting label text (which uses `ink`). */
	stroke?: string;
	surface?: string;
	muted?: string;
	accent?: string;
	strokeWidth?: number;
	dash?: string;
	linejoin?: "round" | "miter" | "bevel";
	/** Drop the faux-3D face shading: all faces use the flat surface color,
	 *  so shapes read by their outline strokes only. */
	flat?: boolean;
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
	/** Solid shapes grow up from flat (height 0 → full), all together, instead of rising + fading. */
	grow?: boolean;
	/** Cylinders slide in from above (dock from the top) instead of rising from below. */
	drop?: boolean;
	/** Cylinders descend from above and SINK into a hole until their top is flush with
	 *  the surface (cap z = node.z + node.h). The body below the surface is hidden as it
	 *  lowers, so it reads as a real cylinder seating flush into a socket. Beats `drop`
	 *  when the unit must end flush in a recess rather than standing proud. */
	sink?: boolean;
	/** Perpetual "powering up" wave: on box/stack layers that carry `accentAt`, a bright
	 *  charge sweeps UP the stack (phased by each layer's height z), fades, and repeats —
	 *  so the whole block reads as continuously energizing in its final state. */
	pulse?: boolean;
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
