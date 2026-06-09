// "Book a discovery call" — a Cal.com inline embed for Luka's 30-min event,
// placed before the FAQ. The section id is `book-demo` so every "Book a demo"
// link across the page scrolls here.

import { useEffect, useRef } from "react";
import { CAL_LINK, CAL_NAMESPACE, CAL_ORIGIN, loadCal } from "./cal";

const EMBED_ID = "nairon-cal-inline-30min";

export function DiscoveryCall() {
	const inited = useRef(false);

	useEffect(() => {
		if (inited.current) return;
		inited.current = true;
		const Cal = loadCal();
		Cal("init", CAL_NAMESPACE, { origin: CAL_ORIGIN });
		Cal.ns?.[CAL_NAMESPACE]?.("inline", {
			elementOrSelector: `#${EMBED_ID}`,
			config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
			calLink: CAL_LINK,
		});
		Cal.ns?.[CAL_NAMESPACE]?.("ui", {
			hideEventTypeDetails: false,
			layout: "month_view",
		});
	}, []);

	return (
		<section
			id="book-demo"
			className="scroll-mt-24 bg-ds-surface font-geist text-ds-text-primary"
		>
			<div className="mx-auto max-w-5xl px-5 py-24">
				<div className="text-center">
					<div className="flex items-center justify-center gap-2.5">
						<span className="relative grid place-items-center">
							<span
								className="size-2.5 rounded-full"
								style={{ backgroundColor: "var(--brand-blue)" }}
							/>
							<span
								className="absolute size-3.5 rounded-full blur-[3px]"
								style={{
									backgroundColor: "color-mix(in srgb, var(--brand-blue) 40%, transparent)",
								}}
							/>
						</span>
						<span className="font-geist-mono text-[0.75rem] font-medium uppercase tracking-[0.16em] text-ds-text-primary">
							Get started
						</span>
					</div>
					<h2 className="mt-6 text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
						Book a discovery call
					</h2>
				</div>

				{/* Cal.com inline embed */}
				<div
					id={EMBED_ID}
					className="mt-6 w-full overflow-auto"
					style={{ minHeight: 640 }}
				/>
			</div>
		</section>
	);
}
