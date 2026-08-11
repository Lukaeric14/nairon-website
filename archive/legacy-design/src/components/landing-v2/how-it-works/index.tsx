import { StepIdentify } from "./step-identify";
import { StepAudit } from "./step-audit";
import { StepImplement } from "./step-implement";
import { StepOptimize } from "./step-optimize";

/**
 * "How it works" — Nairon's 4-step methodology (Identify → Audit → Implement →
 * Optimize), one component per step. Source: knowledge-base methodology.
 */
export function HowItWorks() {
	return (
		<section className="bg-ds-surface font-geist text-ds-text-primary">
			<div className="mx-auto max-w-6xl px-5 py-24">
				<div className="mx-auto mb-14 max-w-2xl text-center">
					<div className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ds-text-tertiary">
						How it works
					</div>
					<h2 className="mt-3 text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl">
						From first call to a working AI employee
					</h2>
					<p className="mt-4 text-[1.0625rem] leading-relaxed text-ds-text-secondary">
						One workflow, one measurable outcome, deployed inside the tools you
						already run, then improved continuously.
					</p>
				</div>

				<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
					<StepIdentify />
					<StepAudit />
					<StepImplement />
					<StepOptimize />
				</div>
			</div>
		</section>
	);
}
