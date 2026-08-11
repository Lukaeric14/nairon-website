import type { ReactNode } from "react";

// Stub — the animated gradient background was removed in the dark rustic redesign.
// This wrapper renders a dark background in place of the old gradient effect.
export function AnimatedGradient({
	children,
	variant: _variant,
}: { children?: ReactNode; variant?: string }) {
	return <div className="bg-white fixed inset-0 -z-10">{children}</div>;
}
