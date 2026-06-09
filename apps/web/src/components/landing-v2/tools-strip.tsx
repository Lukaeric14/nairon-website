// "Works with the tools you already use" — a logo strip of the systems a
// vertical already runs, reinforcing the "no migrations" promise.
//
// Logos resolve by domain: logo.dev first (crisp, consistent — needs
// VITE_LOGODEV_TOKEN), then a tokenless favicon service, then the tool name as
// a text fallback. So it renders immediately with or without a token.

import { useState } from "react";

// Map each tool label to the domain we fetch its logo from. Google/Microsoft
// products point at their product subdomain so the favicon is the right icon.
const TOOL_DOMAINS: Record<string, string> = {
	// Property management
	AppFolio: "appfolio.com",
	Yardi: "yardi.com",
	Buildium: "buildium.com",
	RentManager: "rentmanager.com",
	// Commercial real estate
	MRI: "mrisoftware.com",
	CoStar: "costar.com",
	Argus: "altusgroup.com",
	// Solar & renewables
	"Aurora Solar": "aurorasolar.com",
	OpenSolar: "opensolar.com",
	ServiceTitan: "servicetitan.com",
	// Logistics & 3PL
	McLeod: "mcleodsoftware.com",
	Samsara: "samsara.com",
	project44: "project44.com",
	DAT: "dat.com",
	// Franchises / back office
	QuickBooks: "quickbooks.intuit.com",
	Toast: "toasttab.com",
	ADP: "adp.com",
	NetSuite: "netsuite.com",
	"Bill.com": "bill.com",
	SAP: "sap.com",
	// Healthcare staffing
	Bullhorn: "bullhorn.com",
	Indeed: "indeed.com",
	UKG: "ukg.com",
	// CRM / GTM / support / software
	Salesforce: "salesforce.com",
	HubSpot: "hubspot.com",
	Zendesk: "zendesk.com",
	Jira: "atlassian.com",
	Outreach: "outreach.io",
	Apollo: "apollo.io",
	Intercom: "intercom.com",
	Freshdesk: "freshdesk.com",
	"Help Scout": "helpscout.com",
	// Data / content / automation
	Airtable: "airtable.com",
	Snowflake: "snowflake.com",
	Notion: "notion.so",
	WordPress: "wordpress.com",
	Webflow: "webflow.com",
	Canva: "canva.com",
	Zapier: "zapier.com",
	// Everyday basics
	Slack: "slack.com",
	Zoom: "zoom.us",
	Dropbox: "dropbox.com",
};

// Tools whose root-domain logo would be the wrong brand (a product under a
// larger company), so we always use the per-domain favicon instead of logo.dev.
const FAVICON_ONLY = new Set(["QuickBooks", "Jira", "Argus"]);

const LOGODEV_TOKEN = (import.meta.env as Record<string, string | undefined>)
	.VITE_LOGODEV_TOKEN;

function logoCandidates(name: string): string[] {
	const domain = TOOL_DOMAINS[name];
	if (!domain) return [];
	const urls: string[] = [];
	if (LOGODEV_TOKEN && !FAVICON_ONLY.has(name)) {
		urls.push(`https://img.logo.dev/${domain}?token=${LOGODEV_TOKEN}&size=96&format=png&retina=true`);
	}
	urls.push(`https://icons.duckduckgo.com/ip3/${domain}.ico`);
	return urls;
}

function ToolLogo({ name }: { name: string }) {
	const candidates = logoCandidates(name);
	const [idx, setIdx] = useState(0);

	// No domain mapping, or every image source failed — show the name.
	if (idx >= candidates.length) {
		return (
			<span className="text-[1rem] font-medium text-ds-text-secondary">{name}</span>
		);
	}

	return (
		<img
			src={candidates[idx]}
			alt={name}
			title={name}
			loading="lazy"
			width={28}
			height={28}
			onError={() => setIdx((i) => i + 1)}
			className="h-7 w-auto object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
		/>
	);
}

export function ToolsStrip({ tools }: { tools: string[] }) {
	if (!tools.length) return null;
	return (
		<section className="border-y border-ds-border bg-ds-surface font-geist">
			<div className="mx-auto max-w-6xl px-5 py-10">
				<p className="text-center font-geist-mono text-[0.75rem] font-medium uppercase tracking-[0.16em] text-ds-text-tertiary">
					Works with the tools you already use
				</p>
				<div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
					{tools.map((t) => (
						<ToolLogo key={t} name={t} />
					))}
				</div>
			</div>
		</section>
	);
}
