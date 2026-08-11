import { lazy, Suspense } from "react";

// HeroDots renders a Three.js (~500KB) WebGL dot field used purely as a
// decorative hero background. Loading it eagerly put Three.js on the critical
// path of the homepage and every vertical page, blocking the hero paint (LCP).
//
// It's behind the content (pointer-events-none, absolute inset-0), so we lazy
// load it: the hero headline paints immediately and the dots fade in a beat
// later from a separate chunk. Client-only is fine — WebGL needs the DOM anyway.
const HeroDots = lazy(() =>
	import("./hero-dots").then((m) => ({ default: m.HeroDots })),
);

export function LazyHeroDots({ className }: { className?: string }) {
	return (
		<Suspense fallback={null}>
			<HeroDots className={className} />
		</Suspense>
	);
}
