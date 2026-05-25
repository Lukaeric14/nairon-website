import { createFileRoute } from "@tanstack/react-router";
import { CareersPage } from "@/components/careers";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/careers")({
	component: CareersRoute,
	head: () =>
		seoHead({
			title: "Careers at Nairon — Design Engineer Internship",
			description:
				"Apply interest for Nairon's Summer 2026 Design Engineer internship, a 3-month role for frontend builders with strong UI taste and AI-native product instincts.",
			path: "/careers",
		}),
});

function CareersRoute() {
	return <CareersPage />;
}
