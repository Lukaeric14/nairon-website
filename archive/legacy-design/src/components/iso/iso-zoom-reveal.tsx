// Plays an "outer" iso scene, then zooms into it and cross-fades to an "inner"
// scene which reveals — the bars -> zoom -> chip sequence for "AI Systems Design".
//
// The iso engine has no camera, so the zoom is a scale + cross-fade between two
// scenes that are each drawn at their own correct scale. We deliberately AVOID a
// sustained transform:scale on a single scene (that would soften strokes, which
// the engine bakes into coordinates precisely to keep crisp); the scale here only
// runs during the brief fade, so it reads as a push-in without going soft.

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { IsoSceneRenderer } from "./scene-renderer";
import type { IsoSceneSpec } from "./core/types";

const EASE = [0.16, 1, 0.3, 1] as const;

export function IsoZoomReveal({
	outer,
	inner,
	trigger = "inView",
	playKey = 0,
	holdMs = 2200,
	zoomMs = 700,
	originX = "66%",
	originY = "48%",
	fill = false,
	reduceMotion,
	className,
	sceneClassName,
	play,
}: {
	/** Opening scene (the two bars). */
	outer: IsoSceneSpec;
	/** Scene revealed after the zoom (the chip / system). */
	inner: IsoSceneSpec;
	/** "inView" plays once on scroll; "mount" plays immediately. */
	trigger?: "inView" | "mount";
	/** Bump to replay. */
	playKey?: number;
	/** How long the outer scene holds before the zoom begins (ms). */
	holdMs?: number;
	/** Duration of the zoom cross-fade (ms). */
	zoomMs?: number;
	/** Zoom focal point (where on the frame we push into). */
	originX?: string;
	originY?: string;
	/** Fill the parent's height instead of holding the 440/330 aspect ratio. */
	fill?: boolean;
	reduceMotion?: boolean;
	className?: string;
	/** Sizing class applied to each inner scene's <svg> (e.g. "h-full w-auto" to
	 *  fill the box height instead of the default width-fill). */
	sceneClassName?: string;
	/** Controlled play gate: when provided, the sequence runs iff `play` is true
	 *  (overrides trigger/inView). Lets a parent sequence several cards. */
	play?: boolean;
}) {
	const sysReduce = useReducedMotion();
	const reduce = reduceMotion ?? sysReduce ?? false;
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, amount: 0.4 });
	const active = play !== undefined ? play : trigger === "mount" ? true : inView;
	const [phase, setPhase] = useState<"outer" | "inner">("outer");

	useEffect(() => {
		if (!active) return;
		// Reduced motion: skip straight to the final system, no zoom.
		if (reduce) {
			setPhase("inner");
			return;
		}
		setPhase("outer");
		const t = setTimeout(() => setPhase("inner"), holdMs);
		return () => clearTimeout(t);
	}, [active, holdMs, reduce, playKey]);

	const origin = `${originX} ${originY}`;

	return (
		<div
			ref={ref}
			className={cn("relative w-full", fill && "h-full", className)}
			style={fill ? undefined : { aspectRatio: "440 / 330" }}
		>
			<AnimatePresence>
				{phase === "outer" && (
					<motion.div
						key={`outer-${playKey}`}
						className="absolute inset-0 flex items-center justify-center"
						style={{ transformOrigin: origin }}
						initial={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 2.2 }}
						transition={{ duration: zoomMs / 1000, ease: EASE }}
					>
						<IsoSceneRenderer spec={outer} trigger="mount" play={active} playKey={playKey} reduceMotion={reduce} className={sceneClassName} />
					</motion.div>
				)}
			</AnimatePresence>
			{phase === "inner" && (
				<motion.div
					key={`inner-${playKey}`}
					className="absolute inset-0 flex items-center justify-center"
					style={{ transformOrigin: origin }}
					initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: zoomMs / 1000, ease: EASE }}
				>
					<IsoSceneRenderer spec={inner} trigger="mount" play={active} playKey={playKey} reduceMotion={reduce} className={sceneClassName} />
				</motion.div>
			)}
		</div>
	);
}
