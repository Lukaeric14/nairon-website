import { createFileRoute } from "@tanstack/react-router";
import { VerticalLanding, VerticalNotFound } from "@/components/landing-v2/vertical-landing";
import { VERTICALS } from "@/content/verticals";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/solutions/$slug")({
	component: SolutionPage,
	head: ({ params }) => {
		const c = VERTICALS[params.slug];
		if (!c || c.kind !== "solution") return {};
		return seoHead({
			title: c.seo.title,
			description: c.seo.description,
			path: `/solutions/${c.slug}`,
		});
	},
});

function SolutionPage() {
	const { slug } = Route.useParams();
	const content = VERTICALS[slug];
	if (!content || content.kind !== "solution") return <VerticalNotFound />;
	return <VerticalLanding content={content} />;
}
