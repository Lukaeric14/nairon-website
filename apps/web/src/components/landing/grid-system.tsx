// Vercel-style 12-column grid system — 1080px max-width.
// Sections use a consistent 12-column grid. Content blocks span
// specific columns. Grid lines appear as borders BETWEEN blocks,
// never cutting through content.

import type { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

const GRID_VARS = {
	"--grid-max-width": "1080px",
	"--guide-width": "1px",
	"--guide-color": "rgba(12, 12, 12, 0.06)",
	"--cross-color": "rgba(12, 12, 12, 0.20)",
	"--cross-size": "21px",
} as CSSProperties;

/* ─── Crosshair "+" ──────────────────────────────────────────── */
function Cross({
	position,
}: {
	position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
	const posClass = {
		"top-left": "-top-px -left-px",
		"top-right": "-top-px -right-px",
		"bottom-left": "-bottom-px -left-px",
		"bottom-right": "-bottom-px -right-px",
	}[position];

	return (
		<div
			className={cn("absolute z-[3] pointer-events-none", posClass)}
			style={{ width: 0, height: 0 }}
		>
			<div
				className="absolute"
				style={{
					width: "var(--cross-size)",
					height: "var(--guide-width)",
					top: "calc(var(--cross-size) / -2)",
					left: "calc(var(--cross-size) / -2)",
					borderBottom: "var(--guide-width) solid var(--cross-color)",
					transform: "translateY(calc(var(--cross-size) / 2))",
				}}
			/>
			<div
				className="absolute"
				style={{
					width: "var(--guide-width)",
					height: "var(--cross-size)",
					top: "calc(var(--cross-size) / -2)",
					left: "calc(var(--cross-size) / -2)",
					borderRight: "var(--guide-width) solid var(--cross-color)",
					transform: "translateX(calc(var(--cross-size) / 2))",
				}}
			/>
		</div>
	);
}

/* ─── GridSystem — outer 1080px wrapper ──────────────────────── */
export function GridSystem({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div className={cn("w-full px-4", className)} style={GRID_VARS}>
			<div
				className="relative mx-auto flex flex-col"
				style={{
					maxWidth: "var(--grid-max-width)",
					boxShadow: "calc(-1px) 0 0 var(--guide-color), 1px 0 0 var(--guide-color), 0 calc(-1px) 0 var(--guide-color)",
				}}
			>
				<Cross position="top-left" />
				{children}
				<Cross position="bottom-right" />
			</div>
		</div>
	);
}

/* ─── GridSpacer — short row of 12 visible square cells ──────── */
export function GridSpacer() {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(12, 1fr)",
				borderBottom: "var(--guide-width) solid var(--guide-color)",
			}}
		>
			{Array.from({ length: 12 }).map((_, i) => (
				<div
					key={i}
					style={{
						// Square cells: height = width via aspect-ratio
						aspectRatio: "1",
						borderRight:
							i < 11
								? "var(--guide-width) solid var(--guide-color)"
								: "none",
					}}
				/>
			))}
		</div>
	);
}

/* ─── GridSection — 12-col section with auto-height rows ─────── */
// Content blocks are placed directly inside. Grid lines show as
// column borders on the section itself, but content spans across
// columns so lines only appear between distinct content blocks.
export function GridSection({
	children,
	/** Column template — e.g. "1fr 1fr" for 2 equal cols, "4fr 8fr" for sidebar+main */
	columns = "1fr",
	/** Column template on mobile (< md). Defaults to "1fr" for single-column stacking. */
	mobileColumns,
	/** Show bottom border */
	border = true,
	className,
}: {
	children?: ReactNode;
	columns?: string;
	mobileColumns?: string;
	border?: boolean;
	className?: string;
}) {
	const effectiveMobile = mobileColumns ?? (columns === "1fr" ? "1fr" : "1fr");
	const isStacking = effectiveMobile === "1fr" && columns !== "1fr";

	return (
		<div
			className={cn("relative grid-section", isStacking && "grid-section--stack", className)}
			style={{
				display: "grid",
				"--grid-cols": columns,
				"--grid-mobile-cols": effectiveMobile,
				borderBottom: border
					? "var(--guide-width) solid var(--guide-color)"
					: "none",
			} as CSSProperties}
		>
			{children}
		</div>
	);
}

/* ─── GridCell — a cell within a section, with optional border ── */
// The border-right creates the visible column divider between cells.
export function GridCell({
	children,
	/** Show right border (column divider) */
	borderRight = false,
	/** Show bottom border (row divider) */
	borderBottom = false,
	className,
}: {
	children?: ReactNode;
	borderRight?: boolean;
	borderBottom?: boolean;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"relative",
				borderRight && "cell-border-right",
				borderBottom && "cell-border-bottom",
				className,
			)}
		>
			{children}
		</div>
	);
}

/* ─── CornerNotches — L-shaped bracket marks on card corners ─── */
// Adds a rustic blueprint feel. Place inside any relatively-positioned element.
export function CornerNotches({
	size = 10,
	color = "rgba(12, 12, 12, 0.12)",
	corners = ["top-left", "top-right", "bottom-left", "bottom-right"] as const,
}: {
	size?: number;
	color?: string;
	corners?: readonly ("top-left" | "top-right" | "bottom-left" | "bottom-right")[];
}) {
	const s = `${size}px`;
	const w = "1px";

	const notchStyle = (corner: string): React.CSSProperties => {
		const base: React.CSSProperties = {
			position: "absolute",
			width: s,
			height: s,
			pointerEvents: "none",
			zIndex: 2,
		};

		switch (corner) {
			case "top-left":
				return { ...base, top: 0, left: 0, borderTop: `${w} solid ${color}`, borderLeft: `${w} solid ${color}` };
			case "top-right":
				return { ...base, top: 0, right: 0, borderTop: `${w} solid ${color}`, borderRight: `${w} solid ${color}` };
			case "bottom-left":
				return { ...base, bottom: 0, left: 0, borderBottom: `${w} solid ${color}`, borderLeft: `${w} solid ${color}` };
			case "bottom-right":
				return { ...base, bottom: 0, right: 0, borderBottom: `${w} solid ${color}`, borderRight: `${w} solid ${color}` };
			default:
				return base;
		}
	};

	return (
		<>
			{corners.map((corner) => (
				<div key={corner} style={notchStyle(corner)} />
			))}
		</>
	);
}

/* ─── Re-export Cross ────────────────────────────────────────── */
export function GridCross({
	position,
}: {
	position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
	return <Cross position={position} />;
}
