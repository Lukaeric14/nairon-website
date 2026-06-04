import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

/**
 * Varick-style "How it works" — stock photography recolored to the active
 * palette. The tint is done with `mix-blend-mode: color`, which keeps the
 * photo's luminance but swaps its hue/saturation to the brand blue, giving a
 * clean monochrome-blue duotone over any image. A second translucent layer
 * deepens it toward navy and a gradient scrim keeps text legible.
 */

type Mood = "deep" | "bold" | "light";

const MOOD: Record<
	Mood,
	{ recolor: string; deepen: string; deepenOpacity: number; lift: number }
> = {
	// recolor = hue source (mix-blend color), deepen = normal-blend darkener
	deep: { recolor: "var(--brand-deep)", deepen: "var(--brand-deep)", deepenOpacity: 0.55, lift: 0 },
	bold: { recolor: "var(--brand-blue)", deepen: "var(--brand-deep)", deepenOpacity: 0.32, lift: 0 },
	light: { recolor: "var(--brand-mid)", deepen: "var(--brand-mid)", deepenOpacity: 0.18, lift: 0.14 },
};

function Duotone({ image, mood }: { image: string; mood: Mood }) {
	const m = MOOD[mood];
	return (
		<div aria-hidden className="absolute inset-0 overflow-hidden">
			<img
				src={image}
				alt=""
				className="absolute inset-0 h-full w-full object-cover"
			/>
			{/* recolor photo to brand hue */}
			<div
				className="absolute inset-0"
				style={{ backgroundColor: m.recolor, mixBlendMode: "color" }}
			/>
			{/* deepen toward navy for mood + contrast */}
			<div
				className="absolute inset-0"
				style={{ backgroundColor: m.deepen, opacity: m.deepenOpacity }}
			/>
			{/* optional airy lift for the light card */}
			{m.lift > 0 && (
				<div
					className="absolute inset-0"
					style={{ backgroundColor: "#ffffff", opacity: m.lift }}
				/>
			)}
			{/* legibility scrim */}
			<div
				className="absolute inset-0"
				style={{
					background:
						"linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.35) 100%)",
				}}
			/>
		</div>
	);
}

function StepBadge({ n }: { n: string }) {
	return (
		<span className="inline-flex items-center gap-1.5 rounded-[4px] border border-white/40 px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-[0.18em] text-white/90">
			Step {n}
		</span>
	);
}

function StepButton({ label }: { label: string }) {
	return (
		<button
			type="button"
			className="inline-flex items-center gap-1.5 rounded-md bg-white px-4 py-2.5 text-[0.8125rem] font-medium transition-all hover:bg-white/90"
			style={{ color: "var(--brand-blue)" }}
		>
			{label}
			<ArrowUpRightIcon className="size-4" />
		</button>
	);
}

export function StepsSection() {
	return (
		<section className="font-geist">
			<div className="mb-6">
				<div className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ds-text-tertiary">
					How it works
				</div>
				<h2 className="mt-2 text-3xl font-medium tracking-tight text-ds-text-primary sm:text-4xl">
					From audit to autonomous system
				</h2>
			</div>

			{/* Step 1 — full width, navy duotone, centered (NYC) */}
			<div className="relative overflow-hidden rounded-2xl">
				<Duotone image="/img/brandkit/nyc.jpg" mood="deep" />
				<div className="relative flex flex-col items-center px-6 py-20 text-center sm:py-24">
					<StepBadge n="1" />
					<h3 className="mt-6 text-3xl font-medium tracking-tight text-white sm:text-4xl">
						AI Opportunity Audit
					</h3>
					<p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-white/75">
						We run a structured audit of how work moves through your organization
						across teams, systems, and decision points — pinpointing where AI can
						cut overhead, accelerate execution, or replace manual coordination
						entirely.
					</p>
					<div className="mt-7">
						<StepButton label="Case study" />
					</div>
				</div>
			</div>

			{/* Steps 2 & 3 — two columns (industrial + shapes) */}
			<div className="mt-4 grid gap-4 md:grid-cols-2">
				<div className="relative min-h-[26rem] overflow-hidden rounded-2xl">
					<Duotone image="/img/brandkit/industrial.jpg" mood="bold" />
					<div className="relative flex h-full flex-col justify-between p-8 sm:p-10">
						<div>
							<StepBadge n="2" />
							<h3 className="mt-5 text-2xl font-medium tracking-tight text-white sm:text-3xl">
								Process Architecture &amp; Redesign
							</h3>
							<p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-white/80">
								We design and build the AI agent system that executes the
								workflow — integrating it with the tools, data, and operational
								logic that power the process. You stay in the loop the whole way.
							</p>
						</div>
						<div className="mt-8">
							<StepButton label="View demo" />
						</div>
					</div>
				</div>

				<div className="relative min-h-[26rem] overflow-hidden rounded-2xl">
					<Duotone image="/img/brandkit/shapes.jpg" mood="light" />
					<div className="relative flex h-full flex-col justify-between p-8 sm:p-10">
						<div>
							<StepBadge n="3" />
							<h3 className="mt-5 text-2xl font-medium tracking-tight text-white sm:text-3xl">
								Production Deployment
							</h3>
							<p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-white/85">
								We deploy the agent system into your stack, connecting it to live
								systems and workflows so it begins executing real operational
								work — built on top of your existing software, no migrations
								required.
							</p>
						</div>
						<div className="mt-8">
							<StepButton label="Case study" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
