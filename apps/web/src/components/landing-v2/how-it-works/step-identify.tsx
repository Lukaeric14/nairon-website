import { ViewfinderCircleIcon } from "@heroicons/react/24/outline";
import { StepCard } from "./step-card";

export function StepIdentify() {
	return (
		<StepCard index="01" icon={ViewfinderCircleIcon} title="Identify">
			A working session with you. We map your daily operations and pick the
			single highest-leverage role to hand off first — then define exactly what
			that AI employee will own, in writing.
		</StepCard>
	);
}
