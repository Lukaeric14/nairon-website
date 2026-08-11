import type { ComponentType, ReactNode, SVGProps } from "react";

/**
 * Shared chrome for a single "how it works" step. Each step is its own
 * component (step-identify, step-audit, …) that fills this card — keeps the
 * four visually consistent while staying one component per step.
 */
export function StepCard({
	index,
	icon: Icon,
	title,
	children,
}: {
	index: string;
	icon: ComponentType<SVGProps<SVGSVGElement>>;
	title: string;
	children: ReactNode;
}) {
	return (
		<div className="flex flex-col rounded-2xl border border-ds-border bg-ds-surface-raised p-7">
			<span
				className="text-4xl font-medium tabular-nums leading-none"
				style={{ color: "var(--brand-blue)" }}
			>
				{index}
			</span>

			<div
				className="mt-7 grid size-10 place-items-center rounded-xl"
				style={{ backgroundColor: "rgba(19,120,230,0.10)" }}
			>
				<Icon
					className="size-5"
					strokeWidth={1.5}
					style={{ color: "var(--brand-blue)" }}
				/>
			</div>

			<h3 className="mt-4 text-xl font-medium text-ds-text-primary">{title}</h3>
			<p className="mt-2 text-[0.9375rem] leading-relaxed text-ds-text-secondary">
				{children}
			</p>
		</div>
	);
}
