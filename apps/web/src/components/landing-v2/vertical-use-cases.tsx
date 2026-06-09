// Per-vertical "Use cases" — three AI agent roles relevant to the industry,
// each with a plain-language list of what it actually does. No CTAs / links;
// purely informational. Content comes from the vertical's `useCases`.

import type { ComponentType, SVGProps } from "react";
import {
	CheckIcon,
	ChatBubbleLeftRightIcon,
	ChartBarIcon,
	Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import type { VerticalUseCase } from "@/content/verticals";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

// One icon per card position — kept generic so any vertical's three roles read
// consistently without needing an icon picked per use case.
const CARD_ICONS: Icon[] = [Cog6ToothIcon, ChatBubbleLeftRightIcon, ChartBarIcon];

export function VerticalUseCases({
	name,
	useCases,
}: {
	name: string;
	useCases: VerticalUseCase[];
}) {
	return (
		<section className="bg-ds-surface font-geist text-ds-text-primary">
			<div className="mx-auto max-w-7xl px-5 py-24">
				<div className="max-w-2xl">
					<h2 className="text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
						Use cases
					</h2>
					<p className="mt-4 text-[1.0625rem] leading-relaxed text-ds-text-secondary">
						Three AI employees {name} teams put to work from day one.
					</p>
				</div>

				<div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-7">
					{useCases.map((uc, i) => (
						<UseCaseCard key={uc.title} n={i + 1} icon={CARD_ICONS[i % CARD_ICONS.length]} {...uc} />
					))}
				</div>
			</div>
		</section>
	);
}

function UseCaseCard({
	n,
	icon: Ico,
	title,
	capabilities,
}: VerticalUseCase & { n: number; icon: Icon }) {
	return (
		<article className="flex flex-col">
			<Ico className="size-6 text-ds-text-primary" strokeWidth={1.5} />
			<div className="mt-4 text-[0.8125rem] text-ds-text-tertiary">
				Agent {String(n).padStart(2, "0")}
			</div>
			<h3 className="mt-1 text-[1.375rem] font-medium leading-snug tracking-tight">{title}</h3>
			<div className="mt-4 border-t border-ds-text-primary/15" />

			<div className="mt-5">
				<div className="font-geist-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-ds-text-tertiary">
					What it does
				</div>
				<ul className="mt-4 space-y-3.5">
					{capabilities.map((c) => (
						<li key={c} className="flex items-start gap-3">
							<CheckIcon
								className="mt-0.5 size-[1.125rem] shrink-0"
								strokeWidth={2}
								style={{ color: "var(--brand-blue)" }}
							/>
							<span className="text-[0.9375rem] text-ds-text-primary">{c}</span>
						</li>
					))}
				</ul>
			</div>
		</article>
	);
}
