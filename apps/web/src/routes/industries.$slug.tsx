import { createFileRoute, notFound } from "@tanstack/react-router";
import { VerticalLanding, VerticalNotFound } from "@/components/landing-v2/vertical-landing";
import { VERTICALS } from "@/content/verticals";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/industries/$slug")({
	component: IndustryPage,
	// Validate the slug server-side so unknown URLs return a real HTTP 404
	// instead of a 200 "soft 404" (which Google penalizes).
	loader: ({ params }) => {
		const c = VERTICALS[params.slug];
		if (!c || c.kind !== "industry") throw notFound();
		return { content: c };
	},
	head: ({ params }) => {
		const c = VERTICALS[params.slug];
		if (!c || c.kind !== "industry") {
			return { meta: [{ name: "robots", content: "noindex, nofollow" }] };
		}
		return seoHead({
			title: c.seo.title,
			description: c.seo.description,
			path: `/industries/${c.slug}`,
		});
	},
	notFoundComponent: () => <VerticalNotFound />,
});

function IndustryPage() {
	const { content } = Route.useLoaderData();
	return <VerticalLanding content={content} />;
}
