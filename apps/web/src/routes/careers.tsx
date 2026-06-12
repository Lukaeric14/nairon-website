import { createFileRoute } from "@tanstack/react-router";
import { Careers } from "@/components/landing-v2/careers";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/careers")({
	component: CareersRoute,
	head: () =>
		seoHead({
			title: "Careers at Nairon - Build the AI workforce",
			description:
				"We're hiring a Design Engineer, Founding Engineer, Healthcare AI Consultant, and Content Marketing Intern to design, build, and deploy AI employees inside the systems our customers already use.",
			path: "/careers",
		}),
});

function CareersRoute() {
	return <Careers />;
}
