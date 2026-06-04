import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

/**
 * Varick-style hero, palette-driven. Big left headline, supporting copy top
 * right, two stacked CTA cards (bright + deep) bottom right, over a faint dot
 * field. Colors reference the active palette via CSS vars so it re-skins with
 * the rest of the kit.
 */

function CtaCard({
	label,
	tone,
}: {
	label: string;
	tone: "bright" | "deep";
}) {
	const bg = tone === "bright" ? "var(--brand-blue)" : "var(--brand-deep)";
	return (
		<button
			type="button"
			className="group relative flex h-32 w-full flex-col justify-between rounded-xl p-5 text-left text-white transition-all hover:brightness-110 sm:w-52"
			style={{ backgroundColor: bg }}
		>
			<div className="flex items-start justify-between">
				<span className="text-[0.9375rem] font-medium">{label}</span>
				<ArrowUpRightIcon className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
			</div>
		</button>
	);
}

export function HeroSection() {
	return (
		<section className="font-geist relative overflow-hidden rounded-2xl bg-ds-surface-raised">
			{/* faint dot field */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0"
				style={{
					backgroundImage:
						"radial-gradient(var(--brand-mid) 1px, transparent 1px)",
					backgroundSize: "22px 22px",
					opacity: 0.06,
					maskImage:
						"linear-gradient(to bottom, transparent 30%, black 75%, transparent 100%)",
					WebkitMaskImage:
						"linear-gradient(to bottom, transparent 30%, black 75%, transparent 100%)",
				}}
			/>

			<div className="relative px-6 py-16 sm:px-12 sm:py-20">
				<div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
					{/* Headline */}
					<h1 className="max-w-2xl text-4xl font-medium leading-[1.05] tracking-tight text-ds-text-primary sm:text-6xl">
						Transform your enterprise with AI employees
					</h1>

					{/* Supporting copy + CTAs */}
					<div className="flex flex-col gap-8 lg:pt-2">
						<p className="max-w-md text-[0.9375rem] leading-relaxed text-ds-text-secondary">
							Custom AI employees tailored to your business that automate entire
							departments from the inside, end to end. No generalized software
							that only does half the job. No 18-month timelines or migrations
							required.
						</p>
						<div className="flex flex-col gap-3 sm:flex-row">
							<CtaCard label="Book a call" tone="bright" />
							<CtaCard label="Case studies" tone="deep" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
