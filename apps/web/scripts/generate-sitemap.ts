/**
 * Build-time SEO asset generator. Writes two files into apps/web/public from
 * the site's real page data so neither can drift from the routes that exist:
 *
 *   - sitemap.xml  → every indexable URL, for search crawlers.
 *   - llms.txt     → a clean map of the site for LLMs / answer engines
 *                    (ChatGPT, Perplexity, Claude, Gemini). See https://llmstxt.org.
 *
 * Runs before `vite build`. Pages that emit `noindex` (download, admin, lab,
 * 404) are intentionally excluded from both.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { INDUSTRIES, SOLUTIONS, VERTICALS } from "../src/content/verticals";
import { ROLES } from "../src/components/landing-v2/careers-data";

const SITE_URL = "https://naironai.com";

// Build date in YYYY-MM-DD — every page is regenerated/verified present at deploy.
const TODAY = new Date().toISOString().slice(0, 10);

interface SitemapEntry {
	path: string;
	lastmod?: string;
}

// Evergreen pages that aren't generated from data.
const CORE_PAGES: SitemapEntry[] = [
	{ path: "/" },
	{ path: "/careers" },
	{ path: "/signals" },
	{ path: "/pitch-deck" },
	{ path: "/brandkit" },
	{ path: "/privacy" },
	{ path: "/terms-and-conditions" },
	{ path: "/cookie-policy" },
	{ path: "/acceptable-use" },
];

// Signals articles. Add a line here when a new article ships (keep its real date).
const SIGNALS_ARTICLES: SitemapEntry[] = [
	{ path: "/signals/solving-the-agent-memory-problem", lastmod: "2026-04-30" },
];

const verticalEntries = Object.values(VERTICALS).map((v) => ({
	path: `/${v.kind === "industry" ? "industries" : "solutions"}/${v.slug}`,
}));

const entries: SitemapEntry[] = [
	...CORE_PAGES,
	...verticalEntries,
	...ROLES.map((r) => ({ path: `/careers/${r.slug}` })),
	...SIGNALS_ARTICLES,
];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "../public");

// ── sitemap.xml ─────────────────────────────────────────────────────────────
function toUrlNode({ path: p, lastmod }: SitemapEntry): string {
	return [
		"  <url>",
		`    <loc>${SITE_URL}${p}</loc>`,
		`    <lastmod>${lastmod ?? TODAY}</lastmod>`,
		"  </url>",
	].join("\n");
}

const sitemap = [
	'<?xml version="1.0" encoding="UTF-8"?>',
	'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
	...entries.map(toUrlNode),
	"</urlset>",
	"",
].join("\n");

writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap, "utf8");

// ── llms.txt ────────────────────────────────────────────────────────────────
function link(name: string, p: string, desc: string): string {
	return `- [${name}](${SITE_URL}${p}): ${desc}`;
}

const llms = [
	"# Nairon AI",
	"",
	"> Nairon builds and deploys custom AI employees for modern teams. Each AI employee owns real workflows end to end inside the tools a business already runs (CRM, inbox, PMS, helpdesk) with no migrations, and goes live in weeks.",
	"",
	"Nairon ships industry- and function-specific AI employees rather than a generic chatbot. The pages below are organized by industry (who it's for) and by solution (what function it runs).",
	"",
	"## Core",
	link("Home", "/", "What Nairon is, how it works, and how to book a call."),
	link("Careers", "/careers", "Open roles building and deploying AI employees."),
	link("Signals", "/signals", "Notes and essays from building AI employees in production."),
	"",
	"## Industries",
	...INDUSTRIES.map((v) => link(v.name, `/industries/${v.slug}`, v.seo.description)),
	"",
	"## Solutions",
	...SOLUTIONS.map((v) => link(v.name, `/solutions/${v.slug}`, v.seo.description)),
	"",
	"## Legal",
	link("Privacy Policy", "/privacy", "How Nairon handles personal data."),
	link("Terms & Conditions", "/terms-and-conditions", "Terms governing use of the site and services."),
	link("Acceptable Use", "/acceptable-use", "Acceptable-use policy."),
	"",
].join("\n");

writeFileSync(path.join(publicDir, "llms.txt"), llms, "utf8");

console.log(
	`✓ sitemap.xml (${entries.length} URLs) + llms.txt written → ${publicDir}`,
);
