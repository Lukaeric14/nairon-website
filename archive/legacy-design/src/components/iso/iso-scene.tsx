// The SVG shell: responsive viewBox, accessibility (role/title/desc), the
// projector provider, and per-scene token overrides applied as inline CSS
// vars. Static markup — animation lives in the renderer.

import { useId, type CSSProperties, type ReactNode, type Ref } from "react";
import { cn } from "@/lib/utils";
import { IsoProvider } from "./core/iso-context";
import type { IsoStyleOverride } from "./core/types";

function styleVars(s?: IsoStyleOverride): CSSProperties {
	if (!s) return {};
	const out: Record<string, string | number> = {};
	if (s.ink) out["--iso-ink"] = s.ink;
	if (s.stroke) out["--iso-stroke"] = s.stroke;
	if (s.surface) out["--iso-surface"] = s.surface;
	if (s.muted) out["--iso-muted"] = s.muted;
	if (s.accent) out["--iso-accent"] = s.accent;
	if (s.strokeWidth != null) out["--iso-stroke-w"] = s.strokeWidth;
	if (s.dash) out["--iso-dash"] = s.dash;
	if (s.linejoin) out["--iso-linejoin"] = s.linejoin;
	// The face fills are derived (color-mix) and defined on :root, so a var()
	// override of surface/ink alone won't reach them — :root already baked in
	// its own values. Re-declare them here so the mix re-resolves against the
	// inline surface/ink set on this element.
	if (s.flat) {
		// Flat: every face is the surface color — no faux-3D shading.
		out["--iso-fill-top"] = "var(--iso-surface)";
		out["--iso-fill-left"] = "var(--iso-surface)";
		out["--iso-fill-right"] = "var(--iso-surface)";
	} else if (s.surface || s.ink) {
		out["--iso-fill-top"] = "var(--iso-surface)";
		out["--iso-fill-left"] = "color-mix(in oklab, var(--iso-surface), var(--iso-ink) 5%)";
		out["--iso-fill-right"] = "color-mix(in oklab, var(--iso-surface), var(--iso-ink) 11%)";
	}
	return out as CSSProperties;
}

export function IsoScene({
	viewBox,
	origin,
	unit,
	title,
	desc,
	style,
	className,
	children,
	ref,
}: {
	viewBox: [number, number, number, number];
	origin?: { sx: number; sy: number };
	unit?: number;
	title: string;
	desc?: string;
	style?: IsoStyleOverride;
	className?: string;
	children: ReactNode;
	ref?: Ref<SVGSVGElement>;
}) {
	const id = useId();
	const [minX, minY, w, h] = viewBox;
	const og = origin ?? { sx: minX + w / 2, sy: minY + h / 2 };
	return (
		<svg
			ref={ref}
			viewBox={viewBox.join(" ")}
			className={cn("h-auto w-full", className)}
			preserveAspectRatio="xMidYMid meet"
			role="img"
			aria-labelledby={`${id}-title`}
			style={styleVars(style)}
		>
			<title id={`${id}-title`}>{title}</title>
			{desc && <desc>{desc}</desc>}
			<IsoProvider unit={unit} origin={og}>
				{children}
			</IsoProvider>
		</svg>
	);
}
