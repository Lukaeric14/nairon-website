// Built-in scenes, authored as serializable specs. These are starting
// points — tune positions/animation live in /iso-lab, then export.
//
// Each maps to a business idea the marketing site illustrates:
//   capacity   → "who runs the platform" node cluster (THE PROBLEM)
//   costBars   → per-runner token spend (Cost Tracking)
//   healthGauge→ compliance posture (Health Score)
//   trendPath  → performance trend over time
//   tileGrid   → one unified core, many components
//   heroObject → single focal block for above-the-fold
//   capabilityAtlas   → How it works · Step 1: capabilities → opportunities
//   twoBars           → How it works · Step 2 opener: two layered opportunity bars
//   systemsDesignChip → How it works · Step 2: opportunity opened as a routed chip

import type { IsoSceneSpec, IsoStyleOverride } from "../core/types";
import { DEPLOYMENT_VARIANTS } from "./deployment-variants";

// Shared brand-kit palette for the "How it works" scenes: Lapis-blue accent +
// the design-system neutral ladder, flat faces, and light outlines that match
// the card's graphic-box border. Tracks the tokens, adapts to dark mode.
export const brandIsoStyle: IsoStyleOverride = {
	accent: "var(--brand-blue)",
	surface: "#FDFDFD",
	ink: "var(--ds-text-primary)",
	stroke: "rgba(26, 25, 22, 0.3)",
	muted: "var(--ds-text-tertiary)",
	flat: true,
};

const capacity: IsoSceneSpec = {
	id: "capacity",
	title: "Capacity diagram: a central core connected to four surrounding systems",
	desc: "An isometric cluster of blocks. A central block links by dashed lines to four outer blocks labelled core processor, cybersecurity, member systems and network.",
	viewBox: [0, 0, 440, 340],
	unit: 30,
	animation: { mode: "reveal", stagger: 0.09, drawDuration: 0.9, flow: true },
	nodes: [
		// central hub
		{ id: "hub", type: "box", x: -1, y: -1, w: 2, d: 2, h: 1.2 },
		{ id: "hub-glyph", type: "glyph", at: { x: 0, y: 0, z: 1.2 }, variant: "user", order: 8 },
		// outer systems
		{ id: "b-right", type: "box", x: 2.2, y: -0.7, w: 1.4, d: 1.4, h: 0.9 },
		{ id: "b-left", type: "box", x: -3.6, y: -0.7, w: 1.4, d: 1.4, h: 0.9 },
		{ id: "b-back", type: "box", x: -0.7, y: -3.6, w: 1.4, d: 1.4, h: 0.9 },
		{ id: "b-front", type: "box", x: -0.7, y: 2.2, w: 1.4, d: 1.4, h: 0.9 },
		// glyphs on each outer top
		{ id: "g-right", type: "glyph", at: { x: 2.9, y: 0, z: 0.9 }, variant: "node", order: 9 },
		{ id: "g-left", type: "glyph", at: { x: -2.9, y: 0, z: 0.9 }, variant: "node", order: 9 },
		{ id: "g-back", type: "glyph", at: { x: 0, y: -2.9, z: 0.9 }, variant: "node", order: 9 },
		{ id: "g-front", type: "glyph", at: { x: 0, y: 2.9, z: 0.9 }, variant: "node", order: 9 },
		// dashed links hub → systems
		{ id: "c-right", type: "connector", from: { x: 0, y: 0 }, to: { x: 2.9, y: 0 }, dashed: true, order: 6 },
		{ id: "c-left", type: "connector", from: { x: 0, y: 0 }, to: { x: -2.9, y: 0 }, dashed: true, order: 6 },
		{ id: "c-back", type: "connector", from: { x: 0, y: 0 }, to: { x: 0, y: -2.9 }, dashed: true, order: 6 },
		{ id: "c-front", type: "connector", from: { x: 0, y: 0 }, to: { x: 0, y: 2.9 }, dashed: true, order: 6 },
		// edge labels
		{ id: "l-right", type: "label", at: { x: 3.0, y: -0.9, z: 0.9 }, text: "+ Cybersecurity", angle: -30, align: "start", order: 10 },
		{ id: "l-left", type: "label", at: { x: -3.0, y: -0.9, z: 0.9 }, text: "+ Core processor", angle: 30, align: "end", order: 10 },
		{ id: "l-back", type: "label", at: { x: 0.4, y: -3.0, z: 0.9 }, text: "+ Network", angle: -30, align: "start", order: 10 },
		{ id: "l-front", type: "label", at: { x: -0.4, y: 3.0, z: 0.9 }, text: "+ Member systems", angle: 30, align: "end", order: 10 },
	],
};

const costBars: IsoSceneSpec = {
	id: "costBars",
	title: "Token cost per runner, rising left to right: 20k, 32k, 85k",
	desc: "Three isometric bars of increasing height on a flat plinth, labelled with token spend.",
	viewBox: [0, 0, 420, 320],
	unit: 30,
	animation: { mode: "reveal", stagger: 0.12, riseDuration: 0.7 },
	nodes: [
		{ id: "plinth", type: "tile", x: -0.6, y: -0.6, w: 4.1, d: 1.5, order: 0 },
		{ id: "bar-a", type: "bar", x: 0, y: 0, value: 20000, max: 90000, height: 4.2, order: 1 },
		{ id: "bar-b", type: "bar", x: 1.3, y: 0, value: 32000, max: 90000, height: 4.2, order: 2 },
		{ id: "bar-c", type: "bar", x: 2.6, y: 0, value: 85000, max: 90000, height: 4.2, accent: true, order: 3 },
	],
};

const healthGauge: IsoSceneSpec = {
	id: "healthGauge",
	title: "Compliance health score gauge reading 810 of 850",
	desc: "A flattened isometric ring gauge with a swept arc and a centered health score.",
	viewBox: [0, 0, 360, 260],
	unit: 30,
	animation: { mode: "reveal", drawDuration: 1.3 },
	nodes: [{ id: "gauge", type: "gauge", at: { x: 0, y: 0 }, value: 810, max: 850, label: "HEALTH SCORE", radius: 3 }],
};

const trendPath: IsoSceneSpec = {
	id: "trendPath",
	title: "Performance trend line rising across an isometric plane to a marker",
	desc: "A routed line draws across an isometric ground plane and ends in a highlighted node.",
	viewBox: [0, 0, 420, 280],
	unit: 30,
	animation: { mode: "reveal", stagger: 0.1, drawDuration: 1.2 },
	nodes: [
		{ id: "ref-1", type: "connector", from: { x: -2.4, y: -2.4 }, to: { x: 2.4, y: -2.4 }, dashed: true, order: 0 },
		{ id: "ref-2", type: "connector", from: { x: -2.4, y: 2.4 }, to: { x: 2.4, y: 2.4 }, dashed: true, order: 0 },
		{ id: "trend", type: "connector", from: { x: -2.2, y: 2 }, to: { x: 2.2, y: -2 }, route: "line", accent: true, order: 1 },
		{ id: "marker", type: "glyph", at: { x: 2.2, y: -2 }, variant: "dot", accent: true, order: 2 },
	],
};

const tileGrid: IsoSceneSpec = {
	id: "tileGrid",
	title: "A grid of components on one unified core, with one raised and highlighted",
	desc: "Six isometric tiles laid in a grid; one is raised as a highlighted accent block.",
	viewBox: [0, 0, 460, 360],
	unit: 30,
	animation: { mode: "reveal", stagger: 0.07, riseDuration: 0.55 },
	nodes: [
		{ id: "t-00", type: "tile", x: 0, y: 0, w: 1.4, d: 1.4 },
		{ id: "t-10", type: "tile", x: 1.5, y: 0, w: 1.4, d: 1.4 },
		{ id: "t-20", type: "tile", x: 3, y: 0, w: 1.4, d: 1.4 },
		{ id: "t-01", type: "tile", x: 0, y: 1.5, w: 1.4, d: 1.4 },
		{ id: "t-21", type: "tile", x: 3, y: 1.5, w: 1.4, d: 1.4 },
		// raised highlighted core
		{ id: "core", type: "box", x: 1.5, y: 1.5, w: 1.4, d: 1.4, h: 0.7, accent: true, order: 6 },
		{ id: "core-glyph", type: "glyph", at: { x: 2.2, y: 2.2, z: 0.7 }, variant: "lock", accent: true, order: 7 },
	],
};

const heroObject: IsoSceneSpec = {
	id: "heroObject",
	title: "A single highlighted isometric block as a focal element",
	desc: "One raised isometric block with a node glyph and a small dot-matrix mark.",
	viewBox: [0, 0, 320, 300],
	unit: 38,
	animation: { mode: "reveal", stagger: 0.12, riseDuration: 0.7 },
	nodes: [
		{ id: "base", type: "tile", x: -1.4, y: -1.4, w: 3.8, d: 3.8, order: 0 },
		{ id: "block", type: "box", x: -0.6, y: -0.6, w: 1.6, d: 1.6, h: 1.4, accent: true, order: 1 },
		{ id: "glyph", type: "glyph", at: { x: 0.2, y: 0.2, z: 1.4 }, variant: "user", accent: true, order: 2 },
		{ id: "dots", type: "dots", at: { x: 1.6, y: -1.2, z: 0 }, rows: 3, cols: 3, order: 3 },
	],
};
// ── How it works · Step 1 — concept A: "Capability Atlas" ─────────
// A grid of flat tiles is the business. Three circles above are AI
// capabilities; dashed beams drop onto the grid and two tiles rise
// into labelled blocks — the identified opportunities.
const capabilityAtlas: IsoSceneSpec = {
	id: "capabilityAtlas",
	title: "Capability Atlas: AI capabilities mapped onto a business grid, surfacing opportunities",
	desc: "A field of low 3D blocks representing the business. Three circles above are AI capabilities; dashed beams drop onto the field and two blocks rise tallest, labelled as the identified opportunities.",
	viewBox: [0, 0, 480, 380],
	unit: 30,
	style: brandIsoStyle,
	animation: { mode: "reveal", stagger: 0.1, riseDuration: 1.0, drawDuration: 0.8, flow: true, grow: true },
	nodes: [
		// the business — a field of low 3D blocks (opp slots left open)
		{ id: "t00", type: "box", x: -2.1, y: -2.1, w: 1.2, d: 1.2, h: 0.4, order: 0 },
		{ id: "t10", type: "box", x: -0.6, y: -2.1, w: 1.2, d: 1.2, h: 0.4, order: 0 },
		{ id: "t20", type: "box", x: 0.9, y: -2.1, w: 1.2, d: 1.2, h: 0.4, order: 0 },
		{ id: "t01", type: "box", x: -2.1, y: -0.6, w: 1.2, d: 1.2, h: 0.4, order: 0 },
		{ id: "t11", type: "box", x: -0.6, y: -0.6, w: 1.2, d: 1.2, h: 0.4, order: 0 },
		{ id: "t12", type: "box", x: -0.6, y: 0.9, w: 1.2, d: 1.2, h: 0.4, order: 0 },
		{ id: "t22", type: "box", x: 0.9, y: 0.9, w: 1.2, d: 1.2, h: 0.4, order: 0 },
		// extend the 3×3 core into a full 4×4 grid: a right column and a front
		// row. Denser field that bleeds off the right/front container edges.
		{ id: "xr0", type: "box", x: 2.4, y: -2.1, w: 1.2, d: 1.2, h: 0.4, order: 0 },
		{ id: "xr1", type: "box", x: 2.4, y: -0.6, w: 1.2, d: 1.2, h: 0.4, order: 0 },
		{ id: "xr2", type: "box", x: 2.4, y: 0.9, w: 1.2, d: 1.2, h: 0.4, order: 0 },
		{ id: "xc3", type: "box", x: 2.4, y: 2.4, w: 1.2, d: 1.2, h: 0.4, order: 0 },
		{ id: "xf1", type: "box", x: -2.1, y: 2.4, w: 1.2, d: 1.2, h: 0.4, order: 0 },
		{ id: "xf2", type: "box", x: -0.6, y: 2.4, w: 1.2, d: 1.2, h: 0.4, order: 0 },
		{ id: "xf3", type: "box", x: 0.9, y: 2.4, w: 1.2, d: 1.2, h: 0.4, order: 0 },
		// AI capabilities — circles floating above the back edge
		{ id: "cap-a", type: "glyph", at: { x: -2.48, y: -0.52, z: 2.4 }, variant: "node", accent: true, order: 9 },
		{ id: "cap-b", type: "glyph", at: { x: -1.5, y: -1.5, z: 2.4 }, variant: "node", accent: true, order: 9 },
		{ id: "cap-c", type: "glyph", at: { x: -0.52, y: -2.48, z: 2.4 }, variant: "node", accent: true, order: 9 },
		// beams — capability → opportunity, drawn after the capabilities appear
		{ id: "beam-a", type: "connector", from: { x: -2.48, y: -0.52, z: 2.4 }, to: { x: -1.5, y: 1.5, z: 1.2 }, dashed: true, accent: true, order: 11 },
		{ id: "beam-b", type: "connector", from: { x: -1.5, y: -1.5, z: 2.4 }, to: { x: 1.5, y: 0.0, z: 1.2 }, dashed: true, accent: true, order: 11 },
		{ id: "beam-c", type: "connector", from: { x: -0.52, y: -2.48, z: 2.4 }, to: { x: 1.5, y: 0.0, z: 1.2 }, dashed: true, accent: true, order: 11 },
		// opportunities — two blocks, raised the tallest (grow with the field)
		{ id: "opp-1", type: "box", x: -2.1, y: 0.9, w: 1.2, d: 1.2, h: 1.2, order: 0, accentAt: 12 },
		{ id: "opp-2", type: "box", x: 0.9, y: -0.6, w: 1.2, d: 1.2, h: 1.2, order: 0, accentAt: 13 },
		// blue node where each beam lands — the opportunity, marked
		{ id: "opp-1-dot", type: "glyph", at: { x: -1.5, y: 1.5, z: 1.2 }, variant: "dot", accent: true, order: 14 },
		{ id: "opp-2-dot", type: "glyph", at: { x: 1.5, y: 0.0, z: 1.2 }, variant: "dot", accent: true, order: 14 },
		// labels naming the opportunities — pulled up toward the beam origins
		// and inward, sitting in the gap between the capabilities and the field
		{ id: "lab-1", type: "label", at: { x: -2.4, y: 0.0, z: 1.7 }, text: "Invoice triage", angle: 0, align: "start", size: 9, lead: false, order: 15 },
		{ id: "lab-2", type: "label", at: { x: -0.3, y: -2.3, z: 1.9 }, text: "Lead\nrouting", angle: 0, align: "start", size: 9, lead: false, order: 15 },
	],
};

// ── How it works · Step 2 — "AI Systems Design" (Exploded Layers → Chip Die) ──
// One opportunity layer, flown into: a chip die with a circuit lattice. Three
// blue AI-agent nodes appear, lines draw on between them, and a label reads
// "AI Agents installed". The "zoom" is pure data: glyphs render at a fixed
// screen size, so a large die footprint reads as a macro/zoomed-in view.
const systemsDesignChip: IsoSceneSpec = {
	id: "systemsDesignChip",
	title: "AI Systems Design: three AI agents installed on a chip and wired together",
	desc: "A large isometric chip die with a circuit lattice. Three blue AI-agent nodes appear; lines draw on between them to wire them together; then a label reads 'AI Agents installed'.",
	viewBox: [0, 0, 440, 320],
	unit: 32,
	style: brandIsoStyle,
	animation: { mode: "reveal", stagger: 0.06, riseDuration: 0.7, drawDuration: 0.9, flow: true, grow: true },
	nodes: [
		// the chip die (grows from flat) + faint fab-mark + circuit lattice
		{ id: "die", type: "box", x: -3, y: -3, z: 0, w: 6, d: 6, h: 0.3, order: 0 },
		{ id: "fab-mark", type: "dots", at: { x: -2.7, y: -2.7, z: 0.36 }, rows: 2, cols: 3, order: 10 },
		{ id: "fabric", type: "grid", at: { x: -2.4, y: -2.4, z: 0.31 }, cols: 4, rows: 4, cell: 1.2, order: 10 },
		// edge leads (chip pins)
		{ id: "pin-1", type: "connector", from: { x: 2.1, y: 3, z: 0.15 }, to: { x: 2.1, y: 3.4, z: 0.15 }, route: "line", order: 11 },
		{ id: "pin-2", type: "connector", from: { x: 1.3, y: 3, z: 0.15 }, to: { x: 1.3, y: 3.4, z: 0.15 }, route: "line", order: 11 },
		{ id: "pin-3", type: "connector", from: { x: 0.5, y: 3, z: 0.15 }, to: { x: 0.5, y: 3.4, z: 0.15 }, route: "line", order: 11 },
		// three AI agents (blue) on the lattice
		{ id: "agent-1", type: "glyph", at: { x: -1.2, y: 1.2, z: 0.34 }, variant: "disc", accent: true, order: 12 },
		{ id: "agent-2", type: "glyph", at: { x: 1.2, y: -1.2, z: 0.34 }, variant: "disc", accent: true, order: 13 },
		{ id: "agent-3", type: "glyph", at: { x: 1.2, y: 1.2, z: 0.34 }, variant: "disc", accent: true, order: 14 },
		// wires between the three agents — dashed so data keeps flowing around the
		// circuit in the final state (flow loops perpetually, like card 1's beams)
		{ id: "link-12", type: "connector", from: { x: -1.2, y: 1.2, z: 0.33 }, to: { x: 1.2, y: -1.2, z: 0.33 }, route: "line", dashed: true, accent: true, order: 16 },
		{ id: "link-23", type: "connector", from: { x: 1.2, y: -1.2, z: 0.33 }, to: { x: 1.2, y: 1.2, z: 0.33 }, route: "line", dashed: true, accent: true, order: 18 },
		{ id: "link-31", type: "connector", from: { x: 1.2, y: 1.2, z: 0.33 }, to: { x: -1.2, y: 1.2, z: 0.33 }, route: "line", dashed: true, accent: true, order: 20 },
		// then the label rises in
		{ id: "lab", type: "label", at: { x: -5.0, y: -5.0, z: 0 }, text: "AI system Optimized", angle: 0, align: "middle", size: 10, lead: false, order: 34 },
	],
};

// ── How it works · Step 2 — opening frame: two layered opportunity bars ──
// The two chosen opportunities from Step 1, as plain (white) layered stacks.
// The IsoZoomReveal sequence flies into one — its white interior is the chip,
// where the blue AI agents install. Paired with `systemsDesignChip`.
const twoBars: IsoSceneSpec = {
	id: "twoBars",
	title: "Two layered opportunity bars; the right one highlighted to architect",
	desc: "Two tall isometric bars representing the chosen opportunities, each divided by horizontal lines into layers. The right bar is highlighted in blue as the one to open up and architect.",
	viewBox: [0, 0, 420, 360],
	// Bars grow UP from z=0, so a centered origin leaves them riding high with dead
	// space below. Drop the origin so the composition sits centered-lower in the frame.
	origin: { sx: 210, sy: 235 },
	unit: 40,
	style: brandIsoStyle,
	animation: { mode: "reveal", stagger: 0.08, riseDuration: 0.5, drawDuration: 0.7 },
	nodes: [
		// two bars built of real stacked slabs (layers assemble bottom-up);
		// both plain white; the sequence zooms into the right one — its white
		// interior is the chip, where the blue AI agents then install.
		{ id: "bar-l", type: "stack", x: -2.0, y: -0.7, w: 1.4, d: 1.4, layers: 5, thickness: 0.34, gap: 0.16, order: 0 },
		{ id: "bar-r", type: "stack", x: 0.6, y: -0.7, w: 1.4, d: 1.4, layers: 5, thickness: 0.34, gap: 0.16, order: 2 },
	],
};

// ── Primitives gallery — a reference scene exercising the newer primitives:
// a grid floor backdrop, a cylinder (storage), a layered stack, and a smooth
// multi-point path linking them. Start here to see what each one looks like.
const primitivesGallery: IsoSceneSpec = {
	id: "primitivesGallery",
	title: "Primitives gallery: a grid floor, a cylinder, a layered stack, and a smooth path",
	desc: "An isometric grid floor backdrop. A cylinder on the back-left reads as storage; a four-layer stack on the front-right reads as data layers; a smooth accent path arcs from the cylinder to the stack. Labels name each.",
	viewBox: [0, 0, 460, 380],
	unit: 30,
	animation: { mode: "reveal", stagger: 0.1, riseDuration: 0.7, drawDuration: 1.1, grow: false },
	nodes: [
		// blueprint floor
		{ id: "floor", type: "grid", at: { x: -3, y: -3 }, cols: 6, rows: 6, cell: 1, dashed: true, order: 0 },
		// storage cylinder (back-left)
		{ id: "store", type: "cylinder", x: -1.5, y: -1.5, r: 0.85, h: 1.3, order: 1 },
		{ id: "store-label", type: "label", at: { x: -1.5, y: -2.4, z: 1.3 }, text: "Store", angle: 30, align: "end", order: 5 },
		// layered stack (front-right)
		{ id: "layers", type: "stack", x: 0.5, y: 0.5, w: 1.5, d: 1.5, layers: 4, thickness: 0.18, gap: 0.22, accent: true, order: 2 },
		{ id: "layers-label", type: "label", at: { x: 2.2, y: 1.4, z: 1.4 }, text: "Layers", angle: 0, align: "start", order: 5 },
		// smooth accent path linking store → stack
		{
			id: "flow",
			type: "path",
			points: [
				{ x: -1.5, y: -1.5, z: 1.3 },
				{ x: 1.3, y: -1.4, z: 2.2 },
				{ x: 1.25, y: 1.25, z: 1.5 },
			],
			route: "smooth",
			accent: true,
			order: 3,
		},
		{ id: "flow-end", type: "glyph", at: { x: 1.25, y: 1.25, z: 1.5 }, variant: "dot", accent: true, order: 4 },
	],
};

// ── How it works · Step 3 — "Deployment & Go-Live" ───────────────────────────
// The designed AI unit (a blue cylinder) slides in from the top and docks into a
// circular socket atop your existing software stack (white); power then flows
// down the stack's edges and a "Live" status lights — deployed on top of your
// stack, running. Uses the `drop` entrance (cylinders dock from above).
const deploymentGoLive: IsoSceneSpec = {
	id: "deploymentGoLive",
	title: "Deployment & Go-Live: the AI unit docks into the existing stack from the top and powers it live",
	desc: "A white layered stack (your existing software) with a circular socket on top. A blue cylinder, the AI unit, slides in from above and docks into the socket; power then flows down the stack's edges and a 'Live' status appears.",
	viewBox: [0, 0, 440, 380],
	unit: 40,
	style: { accent: "#1378E6" },
	animation: { mode: "reveal", stagger: 0.07, riseDuration: 0.6, drawDuration: 0.9, flow: true, drop: true },
	nodes: [
		// your existing software — a white layered stack, already built (no load)
		{ id: "stack", type: "stack", x: -1, y: -1, w: 2, d: 2, layers: 4, thickness: 0.3, gap: 0.12, prebuilt: true, order: 0 },
		// the hole — a cylindrical recess cut into the top slab, made BEFORE the unit
		// arrives; opening at the slab top (1.56), floor at 1.26 (depth 0.3). Wider than
		// the unit (r 0.64) so the rim stays visible as a ring around the seated unit.
		{ id: "socket", type: "cylinder", x: 0, y: 0, z: 1.26, r: 0.64, h: 0.3, recessed: true, prebuilt: true, order: 1 },
		// the AI unit — a 3D blue cylinder, NARROWER than the hole (r 0.42 vs 0.64), so
		// the socket rim shows as a ring around it. It drops in from above, seats on the
		// hole floor (base at z = 1.26) and stands proud — a core plugged INTO the block.
		{ id: "unit", type: "cylinder", x: 0, y: 0, z: 1.26, r: 0.42, h: 0.7, accent: true, order: 5 },
		// power flows down the stack's visible edges once docked
		{ id: "pwr-r", type: "path", points: [{ x: 1, y: -1, z: 1.56 }, { x: 1, y: -1, z: 0 }], route: "line", dashed: true, accent: true, order: 16 },
		{ id: "pwr-f", type: "path", points: [{ x: 1, y: 1, z: 1.56 }, { x: 1, y: 1, z: 0 }], route: "line", dashed: true, accent: true, order: 16 },
		{ id: "pwr-l", type: "path", points: [{ x: -1, y: 1, z: 1.56 }, { x: -1, y: 1, z: 0 }], route: "line", dashed: true, accent: true, order: 17 },
		// live status + label, sitting on top of the inserted cylinder (cap at z = 1.96)
		{ id: "live-dot", type: "glyph", at: { x: 0, y: 0, z: 2.08 }, variant: "disc", accent: true, order: 18 },
		{ id: "live-label", type: "label", at: { x: 0, y: 0, z: 2.4 }, text: "Live", angle: 0, align: "middle", order: 19 },
	],
};

export const SCENES: Record<string, IsoSceneSpec> = {
	capacity,
	costBars,
	healthGauge,
	trendPath,
	tileGrid,
	heroObject,
	capabilityAtlas,
	twoBars,
	systemsDesignChip,
	deploymentGoLive,
	// Swarm-designed Deployment & Go-Live variations (flush dock + whole-block
	// power-on) — compared in /iso-lab, then the winner replaces the step-03 card.
	...DEPLOYMENT_VARIANTS,
	primitivesGallery,
};

export const SCENE_LIST: IsoSceneSpec[] = Object.values(SCENES);
