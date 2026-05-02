"use client";

import { ReactLenis, useLenis } from "lenis/react";
import Snap from "lenis/snap";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Uses the Lenis Snap plugin for reliable proximity snapping,
 * with direction-awareness layered on top — cancels any snap
 * that would pull the user backward against their scroll direction.
 */
function SnapHandler() {
	const lenis = useLenis();
	const snapRef = useRef<Snap | null>(null);
	const lastDirectionRef = useRef(1);
	const isRedirectingRef = useRef(false);
	const lastDistanceThresholdRef = useRef("35%");
	const isInitialLoadRef = useRef(true);

	// Disable snap on initial load to prevent auto-scrolling
	useEffect(() => {
		const timer = setTimeout(() => {
			isInitialLoadRef.current = false;
		}, 2000);
		return () => clearTimeout(timer);
	}, []);

	// Track scroll direction for snap gating
	useEffect(() => {
		if (!lenis) return;

		function onScroll() {
			if (!lenis) return;
			
			if (lenis.direction !== 0) {
				lastDirectionRef.current = lenis.direction;
			}

			// Scale snap threshold with velocity
			const snap = snapRef.current;
			if (snap) {
				const speed = Math.abs(lenis.velocity);
				const t = Math.min(speed / 3, 1);
				const nextThreshold = `${Math.round(35 + t * 30)}%`;
				if (nextThreshold !== lastDistanceThresholdRef.current) {
					(snap.options as { distanceThreshold?: string }).distanceThreshold =
						nextThreshold;
					lastDistanceThresholdRef.current = nextThreshold;
				}
			}
		}

		lenis.on("scroll", onScroll);
		return () => {
			lenis.off("scroll", onScroll);
		};
	}, [lenis]);

	// Set up snap with direction-aware gating
	useEffect(() => {
		if (!lenis) return;

		let setupRaf = 0;
		let setupScheduled = false;

		const scheduleSetup = () => {
			if (setupScheduled) return;
			setupScheduled = true;
			setupRaf = requestAnimationFrame(() => {
				setupScheduled = false;
				setup();
			});
		};

		const nodeAffectsSnap = (node: Node) => {
			if (!(node instanceof Element)) return false;
			return (
				node.matches("section, header, footer, [data-snap-align]") ||
				node.querySelector("section, header, footer, [data-snap-align]") !== null
			);
		};

		function setup() {
			if (!lenis) return;

			snapRef.current?.destroy();

			const snap = new Snap(lenis, {
				type: "proximity",
				distanceThreshold: "35%",
				debounce: 100,
				onSnapStart: ({ value, index }) => {
					// Skip snap on initial page load to prevent auto-scrolling
					if (isInitialLoadRef.current) {
						lenis.scrollTo(lenis.scroll, { immediate: true });
						return;
					}
					
					// Disable ALL snapping near the top of the page (within 400px)
					// This completely prevents the spring-back bounce effect at the hero
					if (lenis.scroll < 400) {
						lenis.scrollTo(lenis.scroll, { immediate: true });
						return;
					}
					
					// Also prevent snapping TO targets near the top
					if (value < 300) {
						lenis.scrollTo(lenis.scroll, { immediate: true });
						return;
					}
					
					// Allow redirected snaps through without interference
					if (isRedirectingRef.current) return;

					// Cancel backward snaps
					const snapDir = value > lenis.scroll ? 1 : -1;
					if (snapDir !== lastDirectionRef.current) {
						lenis.scrollTo(lenis.scroll, { immediate: true });
						return;
					}

					// Limit to one section at a time
					const current = snap.currentSnapIndex;
					if (
						current !== undefined &&
						index !== undefined &&
						Math.abs(index - current) > 1
					) {
						lenis.scrollTo(lenis.scroll, { immediate: true });
						isRedirectingRef.current = true;
						const next =
							current + lastDirectionRef.current;
						snap.goTo(
							Math.max(0, Math.min(next, snap.snaps.size - 1)),
						);
						requestAnimationFrame(() => {
							isRedirectingRef.current = false;
						});
					}
				},
			});

			const sections = document.querySelectorAll(
				"section, header, footer, [data-snap-align]",
			);
			// Skip the first section (hero) from snap to prevent spring-back at top
			let isFirst = true;
			for (const el of sections) {
				if (isFirst) {
					isFirst = false;
					continue; // Skip hero section entirely
				}
				const align = (el as HTMLElement).dataset.snapAlign ?? "center";
				snap.addElement(el as HTMLElement, { align: [align] });
			}

			snapRef.current = snap;
		}

		scheduleSetup();

		let resizeRaf = 0;
		const onResize = () => {
			cancelAnimationFrame(resizeRaf);
			resizeRaf = requestAnimationFrame(scheduleSetup);
		};
		window.addEventListener("resize", onResize);

		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				for (const node of mutation.addedNodes) {
					if (nodeAffectsSnap(node)) {
						scheduleSetup();
						return;
					}
				}

				for (const node of mutation.removedNodes) {
					if (nodeAffectsSnap(node)) {
						scheduleSetup();
						return;
					}
				}
			}
		});

		observer.observe(document.body, { childList: true, subtree: true });

		return () => {
			cancelAnimationFrame(setupRaf);
			cancelAnimationFrame(resizeRaf);
			observer.disconnect();
			window.removeEventListener("resize", onResize);
			snapRef.current?.destroy();
			snapRef.current = null;
		};
	}, [lenis]);

	return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
	// DEPRECATED: Flux route-specific scroll handling is disabled with Flux.
	// const [isFluxPage, setIsFluxPage] = useState(false);
	// useEffect(() => {
	// 	const checkRoute = () => {
	// 		setIsFluxPage(window.location.pathname.startsWith("/flux"));
	// 	};
	// 	checkRoute();
	// 	window.addEventListener("popstate", checkRoute);
	// 	return () => window.removeEventListener("popstate", checkRoute);
	// }, []);
	
	return (
		<ReactLenis
			root
			options={{
				lerp: 0.35,
				duration: 0.5,
				smoothWheel: true,
				wheelMultiplier: 1,
				touchMultiplier: 1.2,
				infinite: false,
			}}
		>
			<SnapHandler />
			{children}
		</ReactLenis>
	);
}
