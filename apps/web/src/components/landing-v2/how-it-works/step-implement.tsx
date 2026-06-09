import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import { StepCard } from "./step-card";

export function StepImplement() {
	return (
		<StepCard index="03" icon={RocketLaunchIcon} title="Implement">
			Our engineers build, test, and deploy. Your first AI employee goes live on
			dedicated hardware, wired into your existing tools and operating
			end-to-end — in about three days.
		</StepCard>
	);
}
