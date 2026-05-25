import { createFileRoute } from "@tanstack/react-router";
import { CareersAdminPage } from "@/components/careers/careers-admin-page";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/admin/careers")({
	component: CareersAdminRoute,
	head: () =>
		seoHead({
			title: "Careers Admin — Nairon",
			description: "Internal dashboard for reviewing Design Engineer applications.",
			path: "/admin/careers",
			noindex: true,
		}),
});

function CareersAdminRoute() {
	return <CareersAdminPage />;
}
