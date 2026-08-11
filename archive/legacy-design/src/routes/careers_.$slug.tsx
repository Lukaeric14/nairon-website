import { createFileRoute, notFound } from "@tanstack/react-router";
import { getRole } from "@/components/landing-v2/careers-data";
import { JobDetail, RoleNotFound } from "@/components/landing-v2/careers-job";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/careers_/$slug")({
	component: JobRoute,
	// Validate the slug server-side so unknown roles return a real HTTP 404
	// instead of a 200 "soft 404" (which Google penalizes).
	loader: ({ params }) => {
		const role = getRole(params.slug);
		if (!role) throw notFound();
		return { role };
	},
	head: ({ params }) => {
		const role = getRole(params.slug);
		if (!role) return { meta: [{ name: "robots", content: "noindex, nofollow" }] };
		return seoHead({
			title: `${role.title} - Careers at Nairon`,
			description: role.blurb,
			path: `/careers/${role.slug}`,
		});
	},
	notFoundComponent: () => <RoleNotFound />,
});

function JobRoute() {
	const { role } = Route.useLoaderData();
	return <JobDetail role={role} />;
}
