import { createFileRoute } from "@tanstack/react-router";
import { CareersPage } from "@/components/careers";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/careers")({
	component: CareersRoute,
	head: () =>
		seoHead({
			title: "Careers at Nairon — Design Engineer Internship",
			description:
				"Register interest for Nairon's Summer 2026 Design Engineer internship, a 3-month role for building intuitive interfaces where agents and humans work well together.",
			path: "/careers",
		}),
});

function CareersRoute() {
	return <CareersPage />;
}
