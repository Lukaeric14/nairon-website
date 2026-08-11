// "Our approach" — a section title over the 1-Month AI Employee Pilot
// walkthrough video, plus an apply CTA that opens the Cal modal. Shared across
// every vertical landing page (same pilot for all).

import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { CAL_ATTRS } from "./cal";

const VIDEO_SRC = "https://www.youtube.com/embed/uLx3ElTJbH0?start=14";

export function OurApproach() {
	return (
		<section className="bg-ds-surface font-geist text-ds-text-primary">
			<div className="mx-auto max-w-4xl px-5 py-20 md:py-24">
				<h2 className="text-center text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
					Our approach
				</h2>

				{/* Video */}
				<div className="mt-12 overflow-hidden rounded-2xl bg-black shadow-[0_30px_70px_-30px_rgba(0,0,0,0.45)]">
					<div className="aspect-video w-full">
						<iframe
							className="h-full w-full"
							src={VIDEO_SRC}
							title="The 1-Month AI Employee Pilot"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
						/>
					</div>
				</div>

				{/* Apply CTA */}
				<div className="mt-8 flex justify-center">
					<a
						href="#book-demo"
						{...CAL_ATTRS}
						className="group inline-flex items-center gap-3 px-7 py-4 text-white transition-all hover:brightness-110"
						style={{ backgroundColor: "var(--brand-blue)" }}
					>
						<span className="font-geist-mono text-[0.8125rem] font-medium uppercase tracking-[0.12em]">
							Apply for the 1-Month Pilot
						</span>
						<ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
					</a>
				</div>
			</div>
		</section>
	);
}
