// Simple careers page in the landing-v2 language (Geist, sharp corners, Lapis).
// Header + a stacked list of open roles, each linking to its own detail page.
// Reuses the shared Navbar and Footer so it matches the rest of the site.

import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { ROLES } from "./careers-data";
import { Navbar } from "./hero";
import { Footer } from "./footer";

export function Careers() {
	return (
		<div className="min-h-screen bg-ds-surface font-geist text-ds-text-primary">
			<Navbar />

			<main className="mx-auto max-w-5xl px-5 pb-24 pt-20">
				{/* Header */}
				<div className="flex items-center gap-2.5">
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
						Careers
					</span>
				</div>
				<h1 className="mt-7 max-w-2xl text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
					Build the AI workforce
				</h1>
				<p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ds-text-secondary">
					We design, build, and operate AI employees that run real work inside the
					systems our customers already use. We're a small team that ships fast.
					Here's who we're hiring.
				</p>

				{/* Open roles */}
				<div className="mt-14">
					<div className="font-geist-mono text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ds-text-tertiary">
						Open roles · {ROLES.length}
					</div>
					<ul className="mt-5 border-t border-ds-border">
						{ROLES.map((role) => (
							<li key={role.slug}>
								<a
									href={`/careers/${role.slug}`}
									className="group flex flex-col gap-5 border-b border-ds-border py-8 transition-colors hover:bg-ds-surface-hover sm:flex-row sm:items-center sm:gap-8"
								>
									<div className="flex-1">
										<h2 className="text-[1.375rem] font-medium tracking-tight transition-colors group-hover:[color:var(--brand-blue)]">
											{role.title}
										</h2>
										<p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-ds-text-secondary">
											{role.blurb}
										</p>
										<div className="mt-4 flex flex-wrap gap-2">
											{[role.team, role.type, role.location].map((tag) => (
												<span
													key={tag}
													className="inline-flex items-center border border-ds-border bg-ds-surface-raised px-2.5 py-1 text-[0.75rem] text-ds-text-secondary"
												>
													{tag}
												</span>
											))}
										</div>
									</div>
									<span
										className="inline-flex shrink-0 items-center justify-center gap-1.5 px-5 py-3 text-[0.875rem] font-medium text-white transition-all group-hover:brightness-110"
										style={{ backgroundColor: "var(--brand-blue)" }}
									>
										View role
										<ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
									</span>
								</a>
							</li>
						))}
					</ul>
				</div>
			</main>

			<Footer />
		</div>
	);
}
