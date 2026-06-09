import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { StepCard } from "./step-card";

export function StepOptimize() {
	return (
		<StepCard index="04" icon={ArrowPathIcon} title="Optimize">
			A weekly operating rhythm, bi-weekly strategy sessions, and quarterly KPI
			reviews. We keep tuning the system as frontier models improve — it gets
			better every month.
		</StepCard>
	);
}
