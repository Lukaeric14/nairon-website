import { createFileRoute } from "@tanstack/react-router";
import { getRole } from "@/components/landing-v2/careers-data";
import { JobDetail, RoleNotFound } from "@/components/landing-v2/careers-job";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/careers_/$slug")({
	component: JobRoute,
	head: ({ params }) => {
		const role = getRole(params.slug);
		if (!role) return {};
		return seoHead({
			title: `${role.title} — Careers at Nairon`,
			description: role.blurb,
			path: `/careers/${role.slug}`,
		});
	},
});

function JobRoute() {
	const { slug } = Route.useParams();
	const role = getRole(slug);
	if (!role) return <RoleNotFound />;
	return <JobDetail role={role} />;
}
