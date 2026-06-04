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
	if (s.surface) out["--iso-surface"] = s.surface;
	if (s.muted) out["--iso-muted"] = s.muted;
	if (s.accent) out["--iso-accent"] = s.accent;
	if (s.strokeWidth != null) out["--iso-stroke-w"] = s.strokeWidth;
	if (s.dash) out["--iso-dash"] = s.dash;
	if (s.linejoin) out["--iso-linejoin"] = s.linejoin;
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
