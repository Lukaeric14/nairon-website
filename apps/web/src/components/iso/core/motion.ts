// Shared motion language for the iso system.
//
// Two properties only — transform + opacity for "rise" entrances, and
// pathLength for the signature line-draw-on. Exponential ease-out for
// entrances (refined deceleration), ease-in-out for draws. All scene
// choreography is built from these.

import { useEffect, useRef, useState } from "react";
import type { Variants } from "motion/react";

/** Refined deceleration (expo-out). Default for entrances. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
/** Symmetric in-out for stroke draws. */
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

/** Parent container that staggers its children's reveal. */
export function containerVariants(stagger = 0.08, delayChildren = 0.04): Variants {
	return {
		hidden: {},
		show: { transition: { staggerChildren: stagger, delayChildren } },
	};
}

/** Solid shapes (boxes, tiles, bars, labels): rise + fade. */
export function riseVariants(rise = 14, duration = 0.6): Variants {
	return {
		hidden: { opacity: 0, y: rise },
		show: { opacity: 1, y: 0, transition: { duration, ease: EASE_OUT_EXPO } },
	};
}

/** Strokes (connectors, gauge arcs, trend paths): draw on. */
export function drawVariants(duration = 1.1): Variants {
	return {
		hidden: { opacity: 0, pathLength: 0 },
		show: {
			opacity: 1,
			pathLength: 1,
			transition: { duration, ease: EASE_IN_OUT, opacity: { duration: 0.2 } },
		},
	};
}

/** Markers that pop in after the thing they sit on (slight overshoot-free scale). */
export function popVariants(delay = 0, duration = 0.4): Variants {
	return {
		hidden: { opacity: 0, scale: 0.6 },
		show: {
			opacity: 1,
			scale: 1,
			transition: { duration, delay, ease: EASE_OUT_EXPO },
		},
	};
}

function easeOutExpo(t: number): number {
	return t >= 1 ? 1 : 1 - 2 ** (-10 * t);
}

/**
 * Count a number up to `target` on a rAF loop. Honors reduced motion and a
 * `play` gate (used by the playground replay button). Re-running is driven
 * by changing `playKey`.
 */
export function useCountUp(
	target: number,
	opts: { duration?: number; reduce?: boolean; play?: boolean; playKey?: number } = {},
): number {
	const { duration = 1.2, reduce = false, play = true, playKey = 0 } = opts;
	const [value, setValue] = useState(reduce || !play ? target : 0);
	const raf = useRef<number>(0);

	useEffect(() => {
		if (reduce || !play) {
			setValue(target);
			return;
		}
		const start = performance.now();
		const tick = (now: number) => {
			const p = Math.min(1, (now - start) / (duration * 1000));
			setValue(target * easeOutExpo(p));
			if (p < 1) raf.current = requestAnimationFrame(tick);
		};
		raf.current = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf.current);
	}, [target, duration, reduce, play, playKey]);

	return value;
}
