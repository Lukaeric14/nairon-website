// Per-vertical hero. Layout: a large left-aligned headline, supporting copy
// top-right, and two stacked CTA cards (Book a Call / Case Studies) anchored
// bottom-right, all over the wave-dot field. Driven by per-vertical content.

import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { CAL_ATTRS } from "./cal";
import { HeroDots } from "./hero-dots";

export interface VerticalHeroProps {
	headline: string;
	subcopy: string;
	caseStudiesHref?: string;
}

export function VerticalHero({ headline, subcopy, caseStudiesHref = "#" }: VerticalHeroProps) {
	return (
		<section className="relative overflow-hidden bg-ds-surface font-geist text-ds-text-primary">
			<HeroDots className="pointer-events-none absolute inset-0 z-0" />

			<div className="relative z-10 mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-between px-5 py-24">
				{/* Top — headline left, supporting copy right. Pushed down from the
				    navbar so it sits lower in the hero. */}
				<div className="mt-[10vh] grid gap-8 lg:mt-[18vh] lg:grid-cols-[1.3fr_0.7fr] lg:items-start lg:gap-16">
					<h1 className="text-balance text-4xl font-medium leading-[1.04] tracking-tight sm:text-5xl md:text-6xl">
						{headline}
					</h1>
					<p className="max-w-md text-[1.0625rem] leading-relaxed text-ds-text-secondary lg:mt-3">
						{subcopy}
					</p>
				</div>

				{/* Bottom — CTA cards anchored to the right */}
				<div className="mt-16 flex flex-col gap-px sm:flex-row sm:justify-end">
					<CtaCard label="Book a Call" cal />
					<CtaCard label="Case Studies" href={caseStudiesHref} dark />
				</div>
			</div>
		</section>
	);
}

function CtaCard({
	label,
	href = "#",
	cal,
	dark,
}: {
	label: string;
	href?: string;
	cal?: boolean;
	dark?: boolean;
}) {
	return (
		<a
			href={href}
			{...(cal ? CAL_ATTRS : {})}
			className="group relative flex h-36 w-full flex-col p-5 text-white transition-all hover:brightness-110 sm:h-44 sm:w-64"
			style={{ backgroundColor: dark ? "var(--brand-deep)" : "var(--brand-blue)" }}
		>
			<div className="flex items-start justify-between">
				<span className="text-[0.9375rem] font-medium">{label}</span>
				<ArrowUpRightIcon className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
			</div>
		</a>
	);
}
