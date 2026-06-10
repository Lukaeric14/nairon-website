/**
 * Build-time sitemap generator.
 *
 * Reads the site's real page data (industry/solution verticals, open roles,
 * Signals articles, and a hand-maintained list of evergreen pages) and writes
 * apps/web/public/sitemap.xml. Runs before `vite build` so the sitemap is
 * always complete and never drifts from the routes that actually exist.
 *
 * Only indexable pages belong here. Pages that emit `noindex` (download,
 * admin, lab pages, 404) are intentionally excluded.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { INDUSTRIES, SOLUTIONS } from "../src/content/verticals";
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

const entries: SitemapEntry[] = [
	...CORE_PAGES,
	...INDUSTRIES.map((v) => ({ path: `/industries/${v.slug}` })),
	...SOLUTIONS.map((v) => ({ path: `/solutions/${v.slug}` })),
	...ROLES.map((r) => ({ path: `/careers/${r.slug}` })),
	...SIGNALS_ARTICLES,
];

function toUrlNode({ path: p, lastmod }: SitemapEntry): string {
	const loc = `${SITE_URL}${p}`;
	return [
		"  <url>",
		`    <loc>${loc}</loc>`,
		`    <lastmod>${lastmod ?? TODAY}</lastmod>`,
		"  </url>",
	].join("\n");
}

const xml = [
	'<?xml version="1.0" encoding="UTF-8"?>',
	'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
	...entries.map(toUrlNode),
	"</urlset>",
	"",
].join("\n");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.resolve(__dirname, "../public/sitemap.xml");
writeFileSync(outPath, xml, "utf8");

console.log(`✓ sitemap.xml written with ${entries.length} URLs → ${outPath}`);
