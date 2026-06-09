// ── Deployment & Go-Live — variations ────────────────────────────────────────
// A swarm of agents each designed one take on the same brief: a square layered
// block (your existing stack) with a round socket cut in the top; an AI-unit
// cylinder drops in from above and seats FLUSH with the block's top surface;
// then the ENTIRE block "powers on" — cross-fading to the Lapis accent.
//
// The power-on is driven by the shared `accentAt` capability: on a box / stack /
// cylinder it cross-fades an accent copy of the shape in at a given reveal order
// (it works on `prebuilt` nodes too — "already there, then lights up"). Every
// variation holds the same invariant: unit.z + unit.h === block-top-z (flush),
// the hole is centered and wider than the unit, and the block ignites only after
// the unit docks.
//
// These all live in /iso-lab so they can be compared side-by-side, then the
// winner can replace the placeholder in the "How it works" card (step 03).

import type { IsoSceneSpec } from "../core/types";

// Purest read: prebuilt white block, clean centered socket, one cylinder drops
// flush, the whole stack cross-fades to blue, a single "Live" tag. No ornament.
const deployGoLiveMono: IsoSceneSpec = {
	id: "deployGoLiveMono",
	title: "Deployment & Go-Live: AI unit docks flush, then the whole stack powers on",
	desc: "A prebuilt white layered block with a centered socket. A single cylinder drops in flush, then the entire block ignites Lapis blue and goes Live.",
	viewBox: [0, 0, 440, 420],
	origin: { sx: 220, sy: 300 },
	unit: 40,
	style: { accent: "#1378E6", surface: "#FFFFFF", ink: "#0F172A", stroke: "#0F172A", muted: "#94A3B8", strokeWidth: 1.5, linejoin: "round" },
	animation: { mode: "reveal", stagger: 0.09, riseDuration: 0.6, drawDuration: 0.8, drop: true },
	nodes: [
		{ id: "block", type: "stack", x: -1, y: -1, z: 0, w: 2, d: 2, layers: 4, thickness: 0.34, gap: 0.1, prebuilt: true, order: 0, accentAt: 9 },
		{ id: "socket", type: "cylinder", x: 0, y: 0, z: 1.16, r: 0.62, h: 0.5, recessed: true, prebuilt: true, order: 1 },
		{ id: "unit", type: "cylinder", x: 0, y: 0, z: 1.16, r: 0.44, h: 0.5, accent: true, order: 6 },
		// Label floats clear above the unit (centered labels at unit height collide with it).
		{ id: "liveLabel", type: "label", at: { x: 0, y: 0, z: 2.45 }, text: "Live", angle: 0, align: "middle", size: 13, order: 11 },
	],
};

// Bold: a deep socket, the descending unit is itself the blue core. The instant
// it seats, the whole block flips to accent at once and a ring seal energizes.
const deployGoLiveReactor: IsoSceneSpec = {
	id: "deployGoLiveReactor",
	title: "Reactor Core — deploy and go-live",
	desc: "A prebuilt white layered block with a deep central socket. A blue core cylinder drops in from above and seats flush with the block top, then the entire block ignites to Lapis blue at once and a blue ring seal appears on the top surface.",
	viewBox: [0, 0, 440, 420],
	origin: { sx: 220, sy: 300 },
	unit: 40,
	style: { accent: "#1378E6", linejoin: "round" },
	animation: { mode: "reveal", stagger: 0.09, riseDuration: 0.6, drawDuration: 0.8, drop: true },
	nodes: [
		{ id: "reactorBlock", type: "stack", x: -1, y: -1, z: 0, w: 2, d: 2, layers: 4, thickness: 0.42, gap: 0.12, prebuilt: true, order: 0, accentAt: 7 },
		// BLOCK_TOP_Z = 3*(0.42+0.12)+0.42 = 2.04. A short core (h 0.5) seats flush at the top;
		// a tall solid core paints its body over the top face and reads as a proud tube.
		{ id: "reactorSocket", type: "cylinder", x: 0, y: 0, z: 1.54, r: 0.66, h: 0.5, recessed: true, prebuilt: true, order: 1 },
		{ id: "reactorCore", type: "cylinder", x: 0, y: 0, z: 1.54, r: 0.46, h: 0.5, accent: true, order: 6 },
		{ id: "reactorSeal", type: "disc", x: 0, y: 0, z: 2.05, r: 0.72, ring: true, accent: true, order: 8 },
	],
};

// Energy climbs: the block is built of individual layers; after the unit docks,
// they ignite bottom → top, and the AI core lights last.
const deployGoLiveCascade: IsoSceneSpec = {
	id: "deployGoLiveCascade",
	title: "Deployment & Go-Live — ignition cascade",
	desc: "A layered software stack with a socket cut into its top. An AI unit drops in and seats flush. The charge then climbs the stack layer by layer, powering the whole block on in Lapis blue, with the AI core igniting last.",
	viewBox: [0, 0, 440, 440],
	origin: { sx: 220, sy: 300 },
	unit: 40,
	style: { accent: "#1378E6", strokeWidth: 1.4, linejoin: "round" },
	animation: { mode: "reveal", stagger: 0.16, riseDuration: 0.85, drawDuration: 1.0, sink: true, pulse: true },
	nodes: [
		{ id: "layer0", type: "box", x: -1, y: -1, z: 0, w: 2, d: 2, h: 0.26, prebuilt: true, order: 0, accentAt: 9 },
		{ id: "layer1", type: "box", x: -1, y: -1, z: 0.36, w: 2, d: 2, h: 0.26, prebuilt: true, order: 0, accentAt: 10 },
		{ id: "layer2", type: "box", x: -1, y: -1, z: 0.72, w: 2, d: 2, h: 0.26, prebuilt: true, order: 0, accentAt: 11 },
		{ id: "layer3", type: "box", x: -1, y: -1, z: 1.08, w: 2, d: 2, h: 0.26, prebuilt: true, order: 0, accentAt: 12 },
		{ id: "layer4", type: "box", x: -1, y: -1, z: 1.44, w: 2, d: 2, h: 0.26, prebuilt: true, order: 0, accentAt: 13 },
		// The hole: a real sunken socket in the top (opening at block-top z = 1.70). It
		// powers on with the block (accentAt) so the recess turns blue too.
		{ id: "socket", type: "cylinder", x: 0, y: 0, z: 1.2, r: 0.64, h: 0.5, recessed: true, prebuilt: true, order: 1, accentAt: 9 },
		// The AI core: a real 3D cylinder that descends from above and SINKS into the
		// socket until its top is flush with the block (cap z = 1.20 + 0.50 = 1.70). The
		// `sink` animation hides the body below the surface as it lowers, so it reads as
		// a cylinder seating flush into the hole — not a proud plug standing on top. Its
		// radius matches the socket opening (0.64) so it fills the hole exactly.
		{ id: "core", type: "cylinder", x: 0, y: 0, z: 1.2, r: 0.64, h: 0.5, accent: true, order: 6 },
		{ id: "liveTag", type: "label", at: { x: 0, y: 0, z: 3.6 }, text: "AI Agents Live", align: "middle", size: 8, lead: false, order: 16 },
	],
};

// Premium / tactile: a wide flat block and a short, wide coin that drops into a
// shallow slot like a keycard; the block lights and a thin ring traces the seam.
const deployGoLiveKeystone: IsoSceneSpec = {
	id: "deployGoLiveKeystone",
	title: "Deployment and go-live: the AI unit docks like a coin into a slot, then the whole stack powers on",
	desc: "A wide, flat layered block with a shallow round socket cut into its top. A short, wide coin-shaped cylinder drops straight down and seats flush into the socket. The entire block then cross-fades from white to Lapis blue, a thin accent ring traces the seam, and a LIVE label appears.",
	viewBox: [0, 0, 440, 420],
	origin: { sx: 220, sy: 250 },
	unit: 42,
	style: { accent: "#1378E6", surface: "#FFFFFF", ink: "#0B1220", stroke: "#0B1220", muted: "#9AA7B8", strokeWidth: 1.5, linejoin: "round" },
	animation: { mode: "reveal", stagger: 0.07, riseDuration: 0.75, drawDuration: 1, drop: true },
	nodes: [
		{ id: "stackBlock", type: "stack", x: -1.3, y: -1.3, z: 0, w: 2.6, d: 2.6, layers: 3, thickness: 0.3, gap: 0.1, prebuilt: true, order: 0, accentAt: 11 },
		{ id: "socketHole", type: "cylinder", x: 0, y: 0, z: 0.88, r: 0.95, h: 0.22, recessed: true, prebuilt: true, order: 1 },
		{ id: "coinUnit", type: "cylinder", x: 0, y: 0, z: 0.88, r: 0.78, h: 0.22, accent: false, order: 7 },
		{ id: "seamRing", type: "disc", x: 0, y: 0, z: 1.1, r: 0.95, ring: true, accent: true, order: 12 },
		{ id: "liveLabel", type: "label", at: { x: 0, y: 0, z: 1.95 }, text: "LIVE", align: "middle", size: 12, order: 13 },
	],
};

// Enterprise: a wide 6-layer appliance; the unit docks flush, the block ignites,
// and power channels, a dot matrix, a status disc and a LIVE tag confirm online.
const deployGoLiveRack: IsoSceneSpec = {
	id: "deployGoLiveRack",
	title: "Deployment & Go-Live: the AI unit docks flush into a wide enterprise server block, which then powers on live",
	desc: "A wide, flat white 6-layer server appliance with a centered round socket on top. A blue cylinder — the AI unit — drops in from above and seats flush with the top deck. The entire block then ignites Lapis blue all at once, and a dots matrix, a status disc and a LIVE label confirm the appliance is online.",
	viewBox: [0, 0, 440, 420],
	origin: { sx: 220, sy: 250 },
	unit: 40,
	style: { accent: "#1378E6", strokeWidth: 1.5, linejoin: "round" },
	animation: { mode: "reveal", stagger: 0.08, riseDuration: 0.6, drawDuration: 0.85, flow: true, drop: true },
	nodes: [
		{ id: "rack", type: "stack", x: -1.4, y: -1.4, w: 2.8, d: 2.8, layers: 6, thickness: 0.16, gap: 0.1, prebuilt: true, order: 0, accentAt: 10 },
		{ id: "socket", type: "cylinder", x: 0, y: 0, z: 1.16, r: 0.7, h: 0.3, recessed: true, prebuilt: true, order: 1 },
		{ id: "unit", type: "cylinder", x: 0, y: 0, z: 1.16, r: 0.48, h: 0.3, accent: true, order: 6 },
		// (Dashed edge "power" lines dropped — they read as the accent blue on the powered
		// blue block, i.e. invisible, and echoed the old broken version's weak metaphor.)
		{ id: "chassis-dots", type: "dots", at: { x: 0.7, y: 1.45, z: 0.55 }, rows: 3, cols: 4, order: 12 },
		{ id: "status-disc", type: "disc", x: 0.78, y: -0.78, z: 1.47, r: 0.14, accent: true, order: 13 },
		{ id: "live-halo", type: "disc", x: 0, y: 0, z: 1.47, r: 0.62, ring: true, accent: true, order: 13 },
		{ id: "live-label", type: "label", at: { x: 0, y: 0, z: 2.15 }, text: "LIVE", angle: 0, align: "middle", size: 12, order: 14 },
	],
};

// Vertical signal: the unit docks flush, the block powers on, then an accent
// beam fires straight up to a beacon — the system broadcasting that it's live.
const deployGoLiveBeacon: IsoSceneSpec = {
	id: "deployGoLiveBeacon",
	title: "Deployment and go-live: AI unit docks flush, block powers on, signal beam fires upward",
	desc: "A prebuilt white layered block has a round socket cut into its top. A Lapis cylinder drops down from above and docks flush into the socket. The entire block then powers on to Lapis blue, and a vertical accent beam shoots up from the flush cap, topped by a beacon disc and a LIVE / ONLINE label.",
	viewBox: [0, 0, 440, 460],
	origin: { sx: 220, sy: 320 },
	unit: 40,
	style: { accent: "#1378E6", strokeWidth: 1.5, linejoin: "round" },
	animation: { mode: "reveal", stagger: 0.09, riseDuration: 0.6, drawDuration: 0.8, drop: true, flow: true },
	nodes: [
		{ id: "block", type: "stack", x: -1, y: -1, z: 0, w: 2, d: 2, layers: 4, thickness: 0.34, gap: 0.1, prebuilt: true, order: 0, accentAt: 10 },
		{ id: "socket", type: "cylinder", x: 0, y: 0, z: 1.16, r: 0.62, h: 0.5, recessed: true, prebuilt: true, order: 1 },
		{ id: "unit", type: "cylinder", x: 0, y: 0, z: 1.16, r: 0.44, h: 0.5, accent: true, order: 6 },
		{ id: "beam", type: "path", points: [{ x: 0, y: 0, z: 1.66 }, { x: 0, y: 0, z: 4.4 }], route: "line", accent: true, order: 11 },
		{ id: "beacon", type: "glyph", at: { x: 0, y: 0, z: 4.4 }, variant: "disc", accent: true, order: 12 },
		{ id: "halo", type: "disc", x: 0, y: 0, z: 4.4, r: 0.5, ring: true, accent: true, order: 12 },
		{ id: "liveLabel", type: "label", at: { x: 0, y: 0, z: 4.72 }, text: "LIVE / ONLINE", align: "middle", size: 11, order: 13 },
	],
};

export const DEPLOYMENT_VARIANTS: Record<string, IsoSceneSpec> = {
	deployGoLiveMono,
	deployGoLiveReactor,
	deployGoLiveCascade,
	deployGoLiveKeystone,
	deployGoLiveRack,
	deployGoLiveBeacon,
};
