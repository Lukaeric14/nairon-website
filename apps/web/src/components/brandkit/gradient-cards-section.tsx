import type { CSSProperties, ReactNode } from "react";
import { ArrowUpRightIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

/**
 * Supermemory-style gradient cards. The richness comes from three stacked
 * layers, all palette-driven:
 *   1. a diagonal blue gradient (deep → bright → mid)
 *   2. a soft white glow in one corner (the "light source")
 *   3. a fine grain/noise texture (mix-blend overlay) so it never looks flat
 */

// fractal-noise grain as an inline SVG data URI
const GRAIN =
	"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function GradientSurface({
	className = "",
	glowAt = "85% 12%",
	children,
}: {
	className?: string;
	glowAt?: string;
	children: ReactNode;
}) {
	return (
		<div className={`relative overflow-hidden text-white ${className}`}>
			{/* base diagonal gradient */}
			<div
				className="absolute inset-0"
				style={{
					background:
						"linear-gradient(135deg, var(--brand-deep) 0%, var(--brand-blue) 58%, var(--brand-mid) 125%)",
				}}
			/>
			{/* corner glow */}
			<div
				className="absolute inset-0"
				style={{
					background: `radial-gradient(120% 120% at ${glowAt}, rgba(255,255,255,0.28), rgba(255,255,255,0) 46%)`,
				}}
			/>
			{/* grain */}
			<div
				aria-hidden
				className="absolute inset-0 mix-blend-overlay"
				style={{ backgroundImage: GRAIN, backgroundSize: "160px 160px", opacity: 0.22 }}
			/>
			<div className="relative">{children}</div>
		</div>
	);
}

function Pill({ label, dark }: { label: string; dark?: boolean }) {
	return (
		<button
			type="button"
			className={`inline-flex items-center justify-between gap-6 rounded-md border px-4 py-2.5 text-[0.8125rem] font-medium transition-all ${
				dark
					? "border-white/25 text-white hover:bg-white/10"
					: "border-transparent bg-white hover:bg-white/90"
			}`}
			style={dark ? undefined : ({ color: "var(--brand-blue)" } as CSSProperties)}
		>
			{label}
			<ArrowRightIcon className="size-4" />
		</button>
	);
}

export function GradientCardsSection() {
	return (
		<section className="font-geist">
			<div className="mb-6">
				<div className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ds-text-tertiary">
					Gradient card
				</div>
				<h2 className="mt-2 text-3xl font-medium tracking-tight text-ds-text-primary sm:text-4xl">
					One surface, endless emphasis
				</h2>
			</div>

			{/* Featured wide stat card */}
			<GradientSurface className="rounded-2xl">
				<div className="flex flex-col gap-8 p-8 sm:p-12 lg:flex-row lg:items-end lg:justify-between">
					<div>
						<div className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-white/65">
							Hours of work automated
						</div>
						<div className="mt-3 text-5xl font-medium tracking-tight tabular-nums sm:text-7xl">
							1,505,650,017
						</div>
						<p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-white/75">
							Every number is a task an AI employee handled end to end — across
							revenue, support, and operations teams already in production.
						</p>
					</div>
					<div className="shrink-0">
						<Pill label="Start building" />
					</div>
				</div>
			</GradientSurface>

			{/* Two supporting cards */}
			<div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
				{/* metric + mini chart */}
				<GradientSurface className="rounded-2xl" glowAt="15% 12%">
					<div className="flex h-full flex-col justify-between gap-8 p-8 sm:p-10">
						<div className="flex items-end justify-between gap-8">
							<div>
								<div className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-white/60">
									Manual ops vs agents
								</div>
								{/* mini bar chart */}
								<div className="mt-6 flex items-end gap-5">
									<div className="flex flex-col items-center gap-2">
										<div className="grid h-12 w-12 place-items-center rounded-lg bg-white">
											<ArrowUpRightIcon
												className="size-5"
												style={{ color: "var(--brand-blue)" }}
											/>
										</div>
										<span className="text-[0.6875rem] text-white/65">Agents</span>
									</div>
									<div className="flex flex-col items-center gap-2">
										<div className="h-28 w-12 rounded-lg bg-white/20" />
										<span className="text-[0.6875rem] text-white/65">Manual</span>
									</div>
								</div>
							</div>
							<div className="text-right">
								<div className="text-5xl font-medium tracking-tight sm:text-6xl">
									92%
								</div>
								<div className="mt-1 text-[0.9375rem] text-white/75">
									Less manual ops
								</div>
							</div>
						</div>
						<Pill label="View case study" dark />
					</div>
				</GradientSurface>

				{/* feature card */}
				<GradientSurface className="rounded-2xl" glowAt="90% 90%">
					<div className="flex h-full flex-col justify-between gap-10 p-8 sm:p-10">
						<div>
							<div className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-white/60">
								Always-on memory
							</div>
							<h3 className="mt-4 text-2xl font-medium leading-snug tracking-tight sm:text-[1.75rem]">
								AI employees that remember every customer, deal, and decision.
							</h3>
						</div>
						<Pill label="Explore" />
					</div>
				</GradientSurface>
			</div>
		</section>
	);
}
