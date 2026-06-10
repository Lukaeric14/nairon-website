// Registry of published Signals articles — the single source of truth that
// every SEO surface reads from: the sitemap, llms.txt, the Signals index, and
// each article's BlogPosting/Breadcrumb schema.
//
// To ship a new article that ranks:
//   1. Create the route at routes/signals/<slug>.tsx and build its head with
//      articleHead() from @/lib/seo (canonical, OG, BlogPosting, breadcrumbs).
//   2. Add one entry here. The sitemap and llms.txt pick it up on next build,
//      and the Signals index can list it.
// See docs/seo-playbook.md for the full checklist.

export interface SignalArticle {
	slug: string;
	title: string;
	description: string;
	category: string;
	/** ISO date, e.g. "2026-04-30" — used in schema + sitemap. */
	datePublished: string;
	/** ISO date. Set when an article gets a meaningful update. */
	dateModified?: string;
	/** Human display date for cards, e.g. "Apr 30, 2026". */
	displayDate: string;
	readTime: string;
	author: string;
	authorAvatar: string;
}

export const SIGNAL_ARTICLES: SignalArticle[] = [
	{
		slug: "solving-the-agent-memory-problem",
		title: "Solving the Agent Memory problem",
		description:
			"A practical look at Supermemory, Mem0, Zep, Letta, LangMem, and company-brain memory layers for AI employees inside Hive.",
		category: "Company memory",
		datePublished: "2026-04-30",
		displayDate: "Apr 30, 2026",
		readTime: "12 min read",
		author: "Obaid Ur-Rahmaan",
		authorAvatar: "/avatars/obaid-ur-rahmaan.png",
	},
];

export function articlePath(article: SignalArticle): string {
	return `/signals/${article.slug}`;
}

export function getArticle(slug: string): SignalArticle | undefined {
	return SIGNAL_ARTICLES.find((a) => a.slug === slug);
}
