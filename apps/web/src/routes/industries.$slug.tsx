import { createFileRoute } from "@tanstack/react-router";
import { VerticalLanding, VerticalNotFound } from "@/components/landing-v2/vertical-landing";
import { VERTICALS } from "@/content/verticals";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/industries/$slug")({
	component: IndustryPage,
	head: ({ params }) => {
		const c = VERTICALS[params.slug];
		if (!c || c.kind !== "industry") return {};
		return seoHead({
			title: c.seo.title,
			description: c.seo.description,
			path: `/industries/${c.slug}`,
		});
	},
});

function IndustryPage() {
	const { slug } = Route.useParams();
	const content = VERTICALS[slug];
	if (!content || content.kind !== "industry") return <VerticalNotFound />;
	return <VerticalLanding content={content} />;
}
