// Shared Cal.com glue for the landing page. One loader/queue stub, a hook that
// initialises the popup once page-wide, and a set of data attributes to spread
// onto any CTA so clicking it opens the booking modal.

import { useEffect } from "react";

export const CAL_NAMESPACE = "30min";
export const CAL_LINK = "luka-eric-vuqogn/30min";
export const CAL_ORIGIN = "https://app.cal.com";
const CAL_CONFIG = { layout: "month_view", useSlotsViewOnSmallScreen: "true" };

type CalFn = ((...args: unknown[]) => void) & {
	loaded?: boolean;
	ns?: Record<string, ((...args: unknown[]) => void) & { q?: unknown[] }>;
	q?: unknown[];
};

// Minimal callable Cal loader/queue stub (adapted from Cal's embed snippet).
export function loadCal(): CalFn {
	const w = window as unknown as { Cal?: CalFn };
	if (!w.Cal) {
		const cal = ((...args: unknown[]) => {
			const c = w.Cal as CalFn;
			if (!c.loaded) {
				c.ns = {};
				c.q = c.q || [];
				const script = document.createElement("script");
				script.src = `${CAL_ORIGIN}/embed/embed.js`;
				document.head.appendChild(script);
				c.loaded = true;
			}
			if (args[0] === "init") {
				const api = ((...a: unknown[]) => {
					(api.q ||= []).push(a);
				}) as ((...a: unknown[]) => void) & { q: unknown[] };
				api.q = api.q || [];
				const namespace = args[1];
				if (typeof namespace === "string") {
					c.ns = c.ns || {};
					c.ns[namespace] = c.ns[namespace] || api;
					(c.ns[namespace].q ||= []).push(args);
					(c.q as unknown[]).push(["initNamespace", namespace]);
				} else {
					(c.q as unknown[]).push(args);
				}
				return;
			}
			(c.q as unknown[]).push(args);
		}) as CalFn;
		cal.q = [];
		w.Cal = cal;
	}
	return w.Cal;
}

/** Initialise Cal once so popup triggers (data-cal-* elements) work page-wide. */
export function useCalInit() {
	useEffect(() => {
		const Cal = loadCal();
		Cal("init", CAL_NAMESPACE, { origin: CAL_ORIGIN });
		Cal.ns?.[CAL_NAMESPACE]?.("ui", {
			hideEventTypeDetails: false,
			layout: "month_view",
		});
	}, []);
}

/** Spread onto any element to make clicking it open the booking modal. */
export const CAL_ATTRS = {
	"data-cal-link": CAL_LINK,
	"data-cal-namespace": CAL_NAMESPACE,
	"data-cal-config": JSON.stringify(CAL_CONFIG),
} as const;
