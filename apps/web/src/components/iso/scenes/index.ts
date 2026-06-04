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

import type { IsoSceneSpec } from "../core/types";

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

export const SCENES: Record<string, IsoSceneSpec> = {
	capacity,
	costBars,
	healthGauge,
	trendPath,
	tileGrid,
	heroObject,
};

export const SCENE_LIST: IsoSceneSpec[] = Object.values(SCENES);
