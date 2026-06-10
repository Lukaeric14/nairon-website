const SITE_URL = "https://naironai.com";
const SITE_NAME = "Nairon AI";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

interface SeoConfig {
	title: string;
	description: string;
	path: string;
	ogImage?: string;
	type?: "website" | "article";
	noindex?: boolean;
}

/**
 * Generates head() meta tags for a route, including Open Graph and Twitter Card tags.
 */
export function seoHead(config: SeoConfig) {
	const {
		title,
		description,
		path,
		ogImage = DEFAULT_OG_IMAGE,
		type = "website",
		noindex = false,
	} = config;
	const url = `${SITE_URL}${path}`;

	return {
		meta: [
			{ title },
			{ name: "description", content: description },
			...(noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
			// Open Graph
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			{ property: "og:url", content: url },
			{ property: "og:site_name", content: SITE_NAME },
			{ property: "og:type", content: type },
			{ property: "og:image", content: ogImage },
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "630" },
			// Twitter Card
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: title },
			{ name: "twitter:description", content: description },
			{ name: "twitter:image", content: ogImage },
			{ name: "twitter:site", content: "@nairon__ai" },
		],
		links: [{ rel: "canonical", href: url }],
	};
}

/**
 * JSON-LD Organization schema for Nairon AI.
 */
export function organizationJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "Nairon AI",
		url: SITE_URL,
		logo: `${SITE_URL}/nairon-logo.png`,
		sameAs: [
			"https://www.linkedin.com/company/nairon-ai",
			"https://x.com/nairon__ai",
		],
		contactPoint: {
			"@type": "ContactPoint",
			contactType: "customer support",
			email: "hello@naironai.com",
		},
	};
}

/**
 * JSON-LD WebSite schema.
 */
export function websiteJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: SITE_NAME,
		url: SITE_URL,
	};
}

/**
 * JSON-LD Service schema for Nairon's company offer.
 */
export function serviceJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "Service",
		name: "AI Employee Company",
		description:
			"Nairon builds and deploys AI employees for modern businesses, embedding agentic systems into acquisition and operations workflows.",
		provider: {
			"@type": "Organization",
			name: SITE_NAME,
			url: SITE_URL,
		},
		serviceType: "AI Automation Company",
		areaServed: {
			"@type": "Place",
			name: "Worldwide",
		},
		url: SITE_URL,
	};
}

/**
 * Complete head() for a Signals article: canonical, OG (article type),
 * Twitter card, BlogPosting schema, and Home → Signals → article breadcrumbs.
 * Accepts a SignalArticle from @/content/signals directly. One call per
 * article route — nothing else to remember.
 */
export function articleHead(article: {
	slug: string;
	title: string;
	description: string;
	datePublished: string;
	dateModified?: string;
	author: string;
	ogImage?: string;
}) {
	const path = `/signals/${article.slug}`;
	const base = seoHead({
		title: `${article.title} | Nairon AI`,
		description: article.description,
		path,
		type: "article",
		ogImage: article.ogImage,
	});
	return {
		...base,
		scripts: [
			{
				type: "application/ld+json",
				children: JSON.stringify(
					blogPostJsonLd({
						title: article.title,
						description: article.description,
						path,
						datePublished: article.datePublished,
						dateModified: article.dateModified,
						authorName: article.author,
						image: article.ogImage,
					}),
				),
			},
			{
				type: "application/ld+json",
				children: JSON.stringify(
					breadcrumbJsonLd([
						{ name: "Home", path: "/" },
						{ name: "Signals", path: "/signals" },
						{ name: article.title, path },
					]),
				),
			},
		],
	};
}

/**
 * JSON-LD Service schema for a single industry/solution vertical page. Lets
 * Google understand each landing page as a distinct service offering tied to
 * Nairon, instead of treating them as near-duplicate pages.
 */
export function verticalServiceJsonLd(config: {
	name: string;
	description: string;
	path: string;
}) {
	return {
		"@context": "https://schema.org",
		"@type": "Service",
		name: config.name,
		description: config.description,
		url: `${SITE_URL}${config.path}`,
		serviceType: "AI Employees",
		provider: {
			"@type": "Organization",
			name: SITE_NAME,
			url: SITE_URL,
		},
		areaServed: { "@type": "Place", name: "Worldwide" },
	};
}

/**
 * @deprecated Flux is retired from the public website. Keep this only for old
 * pages that have not been deleted yet.
 */
export function fluxProductJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Flux",
		description:
			"Flux is the missing self-improving harness for coding agents. Flux adds deterministic workflow state, evidence-based quality gates, adversarial review, and self-improving recommendations.",
		applicationCategory: "DeveloperApplication",
		operatingSystem: "Cross-platform",
		url: `${SITE_URL}/flux`,
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
		},
		author: {
			"@type": "Organization",
			name: SITE_NAME,
			url: SITE_URL,
		},
	};
}

/**
 * JSON-LD Course schema for a program page.
 */
export function courseJsonLd(config: {
	name: string;
	description: string;
	path: string;
	provider?: string;
}) {
	return {
		"@context": "https://schema.org",
		"@type": "Course",
		name: config.name,
		description: config.description,
		url: `${SITE_URL}${config.path}`,
		provider: {
			"@type": "Organization",
			name: config.provider ?? SITE_NAME,
			url: SITE_URL,
		},
		courseMode: "onsite",
		locationCreated: {
			"@type": "Place",
			name: "Miami, Florida, United States",
		},
	};
}

/**
 * JSON-LD FAQPage schema from an array of Q&A pairs.
 */
export function faqJsonLd(items: Array<{ question: string; answer: string }>) {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: items.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.answer,
			},
		})),
	};
}

/**
 * JSON-LD BreadcrumbList schema.
 */
export function breadcrumbJsonLd(
	items: Array<{ name: string; path: string }>,
) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: `${SITE_URL}${item.path}`,
		})),
	};
}

/**
 * JSON-LD BlogPosting schema for Signals articles.
 */
export function blogPostJsonLd(config: {
	title: string;
	description: string;
	path: string;
	datePublished: string;
	dateModified?: string;
	authorName: string;
	image?: string;
}) {
	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: config.title,
		description: config.description,
		url: `${SITE_URL}${config.path}`,
		datePublished: config.datePublished,
		dateModified: config.dateModified ?? config.datePublished,
		image: config.image ?? DEFAULT_OG_IMAGE,
		author: {
			"@type": "Person",
			name: config.authorName,
		},
		publisher: {
			"@type": "Organization",
			name: SITE_NAME,
			logo: {
				"@type": "ImageObject",
				url: `${SITE_URL}/nairon-logo.png`,
			},
		},
	};
}
