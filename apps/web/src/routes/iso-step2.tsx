import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { IsoZoomReveal } from "@/components/iso/iso-zoom-reveal";
import { SCENES } from "@/components/iso/scenes";

export const Route = createFileRoute("/iso-step2")({
	component: Step2Lab,
	head: () => ({
		meta: [
			{ title: "Iso Step 2 — Nairon" },
			{ name: "robots", content: "noindex, nofollow" },
		],
	}),
});

/** Standalone preview of the Step 2 sequence: two bars -> zoom -> chip system. */
function Step2Lab() {
	const [k, setK] = useState(0);
	const [dark, setDark] = useState(false);
	return (
		<div className="min-h-screen bg-[#fbfaf8] p-10 font-inter text-[#1a1916]">
			<div className="mx-auto max-w-3xl space-y-5">
				<div className="flex items-baseline justify-between">
					<h1 className="font-serif text-2xl">Step 2 — AI Systems Design</h1>
					<div className="flex gap-2">
						<button
							type="button"
							onClick={() => setK((x) => x + 1)}
							className="rounded-md bg-[#1a1916] px-3 py-1.5 font-mono text-[11px] text-[#fbfaf8]"
						>
							↻ Replay
						</button>
						<button
							type="button"
							onClick={() => setDark((d) => !d)}
							className="rounded-md border border-[#1a1916]/15 px-3 py-1.5 font-mono text-[11px]"
						>
							{dark ? "☾ Dark" : "☀ Light"}
						</button>
					</div>
				</div>
				<p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#1a1916]/45">
					two bars → zoom into the layer → reveal the system
				</p>
				<div className={cn("flex items-center justify-center", dark && "dark")}>
					<div
						className={cn(
							"iso-blueprint w-full rounded-xl border p-6",
							dark ? "border-white/10 bg-[#0f0f12]" : "border-[#1a1916]/10 bg-white",
						)}
					>
						<IsoZoomReveal
							key={k}
							outer={SCENES.twoBars}
							inner={SCENES.systemsDesignChip}
							trigger="mount"
							playKey={k}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
