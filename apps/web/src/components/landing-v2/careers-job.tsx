// Per-role job detail page in the landing-v2 language. Rendered by the
// /careers/$slug route; takes a Role and lays out the full description.

import { ArrowLeftIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { applyHref, type Role } from "./careers-data";
import { Navbar } from "./hero";
import { Footer } from "./footer";

function BackLink() {
	return (
		<a
			href="/careers"
			className="inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-ds-text-secondary transition-colors hover:text-ds-text-primary"
		>
			<ArrowLeftIcon className="size-4" />
			All roles
		</a>
	);
}

/** Shown when a /careers/<slug> URL doesn't match a known role. */
export function RoleNotFound() {
	return (
		<div className="min-h-screen bg-ds-surface font-geist text-ds-text-primary">
			<Navbar />
			<main className="mx-auto max-w-3xl px-5 pb-24 pt-24 text-center">
				<h1 className="text-4xl font-medium tracking-tight sm:text-5xl">
					Role not found
				</h1>
				<p className="mx-auto mt-4 max-w-md text-[1.0625rem] leading-relaxed text-ds-text-secondary">
					That role isn't open right now. Here's everything we're hiring for.
				</p>
				<div className="mt-8 flex justify-center">
					<a
						href="/careers"
						className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 text-[0.9375rem] font-medium text-white transition-all hover:brightness-110"
						style={{ backgroundColor: "var(--brand-blue)" }}
					>
						View open roles
					</a>
				</div>
			</main>
			<Footer />
		</div>
	);
}

function BulletSection({ title, items }: { title: string; items: string[] }) {
	return (
		<section className="mt-12">
			<h2 className="text-[1.375rem] font-medium tracking-tight">{title}</h2>
			<ul className="mt-5 space-y-3.5">
				{items.map((item) => (
					<li key={item} className="flex gap-3">
						<span
							className="mt-[0.5rem] size-1.5 shrink-0 rounded-full"
							style={{ backgroundColor: "var(--brand-blue)" }}
						/>
						<span className="text-[1rem] leading-relaxed text-ds-text-secondary">
							{item}
						</span>
					</li>
				))}
			</ul>
		</section>
	);
}

function ApplyButton({ role }: { role: Role }) {
	return (
		<a
			href={applyHref(role.title)}
			className="group inline-flex items-center justify-center gap-1.5 px-6 py-3.5 text-[0.9375rem] font-medium text-white transition-all hover:brightness-110"
			style={{ backgroundColor: "var(--brand-blue)" }}
		>
			Apply for this role
			<ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
		</a>
	);
}

export function JobDetail({ role }: { role: Role }) {
	return (
		<div className="min-h-screen bg-ds-surface font-geist text-ds-text-primary">
			<Navbar />

			<main className="mx-auto max-w-3xl px-5 pb-24 pt-16">
				<BackLink />

				{/* Header */}
				<div className="mt-10">
					<div className="font-geist-mono text-[0.75rem] font-medium uppercase tracking-[0.16em] text-ds-text-tertiary">
						{role.team}
					</div>
					<h1 className="mt-3 text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
						{role.title}
					</h1>
					<div className="mt-5 flex flex-wrap gap-2">
						{[role.type, role.location].map((tag) => (
							<span
								key={tag}
								className="inline-flex items-center border border-ds-border bg-ds-surface-raised px-2.5 py-1 text-[0.75rem] text-ds-text-secondary"
							>
								{tag}
							</span>
						))}
					</div>
					<div className="mt-8">
						<ApplyButton role={role} />
					</div>
				</div>

				{/* About */}
				<section className="mt-12 border-t border-ds-border pt-12">
					<h2 className="text-[1.375rem] font-medium tracking-tight">
						About the role
					</h2>
					<p className="mt-5 text-[1.0625rem] leading-relaxed text-ds-text-secondary">
						{role.description}
					</p>
				</section>

				<BulletSection title="What you'll do" items={role.responsibilities} />
				<BulletSection title="What you bring" items={role.requirements} />
				{role.niceToHave && (
					<BulletSection title="Nice to have" items={role.niceToHave} />
				)}

				{/* Closing CTA */}
				<section className="mt-14 border-t border-ds-border pt-10">
					<h2 className="text-[1.375rem] font-medium tracking-tight">
						Sound like you?
					</h2>
					<p className="mt-3 max-w-lg text-[1rem] leading-relaxed text-ds-text-secondary">
						Send us a note with your background and anything you've built. We
						review every application and reply.
					</p>
					<div className="mt-6">
						<ApplyButton role={role} />
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
