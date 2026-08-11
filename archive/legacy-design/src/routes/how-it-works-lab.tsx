import { createFileRoute } from "@tanstack/react-router";
import { HowItWorksCards } from "@/components/landing-v2/how-it-works-cards";

export const Route = createFileRoute("/how-it-works-lab")({
	component: HowItWorksLab,
	head: () => ({
		meta: [
			{ title: "How It Works - Nairon" },
			{ name: "robots", content: "noindex, nofollow" },
		],
	}),
});

function HowItWorksLab() {
	return (
		<main className="min-h-screen bg-[#e9e8e5] py-10">
			<HowItWorksCards />
		</main>
	);
}
