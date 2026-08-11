// Five candidate blue palettes for the Nairon rebrand. Each palette is a trio
// of blues in the Varick mold:
//   bright → the vivid CTA / "loud" card fill
//   deep   → the dark navy card fill
//   mid    → the connective blue for icons, links, accents
//
// The brandkit page applies the selected palette by writing these three values
// onto CSS custom properties (--brand-blue / --brand-deep / --brand-mid) on a
// wrapper element, so every component below re-skins instantly.

export type Palette = {
	id: string;
	name: string;
	blurb: string;
	bright: string;
	deep: string;
	mid: string;
};

// ── LOCKED BRAND PALETTE ──────────────────────────────────────────────────
// Lapis: a confident, full-saturation true-blue ramp (mid → bright → deep all
// share one hue, stepped cleanly in lightness, so the trio always flows).
// This is the Nairon brand. Source of truth mirrored in globals.css.
export const PALETTES: Palette[] = [
	{
		id: "lapis",
		name: "Lapis",
		blurb: "Confident, full-saturation true-blue. The locked Nairon brand.",
		bright: "#1378E6",
		deep: "#091F40",
		mid: "#4A9CFF",
	},
];

export const DEFAULT_PALETTE = PALETTES[0];
