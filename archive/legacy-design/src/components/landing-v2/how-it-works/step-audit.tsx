import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { StepCard } from "./step-card";

export function StepAudit() {
	return (
		<StepCard index="02" icon={ClipboardDocumentCheckIcon} title="Audit">
			A lightweight audit of your stack and data. We design an integration path
			through the tools your team already uses, and set scope, KPIs, and human
			approval checkpoints before a line of code is written.
		</StepCard>
	);
}
