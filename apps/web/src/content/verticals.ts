// Content for the per-vertical landing pages (Industries + Solutions). Each
// entry drives one dynamic route (/industries/$slug or /solutions/$slug) that
// renders the shared <VerticalLanding> template. Keyed by slug so the navbar,
// footer, and routes all resolve to the same page from a single source.

export type VerticalKind = "industry" | "solution";

/** One AI agent role shown in the per-vertical "Use cases" section. */
export interface VerticalUseCase {
	/** Plain-language role name, e.g. "Leasing Assistant". */
	title: string;
	/** Short, relatable phrases for what it actually does (3-4). */
	capabilities: string[];
}

export interface VerticalContent {
	slug: string;
	kind: VerticalKind;
	/** Display name, e.g. "Property Management". */
	name: string;
	hero: {
		/** Big left-aligned hero headline. */
		headline: string;
		/** Supporting copy shown top-right of the hero. No em dashes. */
		subcopy: string;
	};
	/** Exactly three AI agent use cases relevant to this vertical. */
	useCases: VerticalUseCase[];
	/** Tools this vertical already runs that the AI employees plug into. */
	tools: string[];
	seo: { title: string; description: string };
}

/** Lowercase, hyphenated slug from a display title ("Solar & Renewables" -> "solar-renewables"). */
export function slugify(s: string): string {
	return s
		.toLowerCase()
		.replace(/&/g, " ")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

const ENTRIES: Omit<VerticalContent, "slug" | "tools">[] = [
	// ── Industries ──────────────────────────────────────────────────────
	{
		kind: "industry",
		name: "Property Management",
		hero: {
			headline: "AI Employees That Run Leasing And Resident Ops",
			subcopy:
				"Custom AI employees that answer leads, schedule tours, coordinate maintenance, and handle resident requests inside your PMS and inbox. Real ops handled, no new software, live in weeks.",
		},
		useCases: [
			{
				title: "Leasing Assistant",
				capabilities: [
					"Replies to new leads in minutes",
					"Books and confirms tours",
					"Answers questions about units and pricing",
					"Follows up until they apply",
				],
			},
			{
				title: "Maintenance Coordinator",
				capabilities: [
					"Takes resident repair requests",
					"Schedules the right vendor",
					"Keeps residents updated on timing",
					"Closes the ticket when work is done",
				],
			},
			{
				title: "Rent & Renewals Helper",
				capabilities: [
					"Sends rent reminders",
					"Chases late payments politely",
					"Starts lease renewals early",
					"Flags upcoming move-outs to the team",
				],
			},
		],
		seo: {
			title: "AI Employees for Property Management | Nairon",
			description:
				"Nairon builds custom AI employees for property management that run leasing, maintenance coordination, and resident ops inside your existing tools. Live in weeks, no migrations.",
		},
	},
	{
		kind: "industry",
		name: "Commercial Real Estate",
		hero: {
			headline: "AI Employees That Run Your CRE Back Office",
			subcopy:
				"Custom AI employees that pull comps, build investor and lease reports, and move tenant requests through to close. They work inside your existing systems, with no migrations and no new software for your team.",
		},
		useCases: [
			{
				title: "Deal Research Assistant",
				capabilities: [
					"Pulls comps and market data",
					"Builds property one-pagers",
					"Summarizes leases and offers",
					"Has the numbers ready before a call",
				],
			},
			{
				title: "Reporting Assistant",
				capabilities: [
					"Builds investor and owner reports",
					"Tracks rent rolls and occupancy",
					"Flags numbers that look off",
					"Sends updates on a schedule",
				],
			},
			{
				title: "Tenant Coordinator",
				capabilities: [
					"Answers tenant requests",
					"Routes issues to the right person",
					"Keeps lease dates and tasks on track",
					"Follows up so nothing slips",
				],
			},
		],
		seo: {
			title: "AI Employees for Commercial Real Estate | Nairon",
			description:
				"Nairon builds custom AI employees for commercial real estate that own reporting, comps, and tenant workflows inside your existing tools. Live in weeks, no migrations.",
		},
	},
	{
		kind: "industry",
		name: "Solar & Renewables",
		hero: {
			headline: "AI Employees That Run Your Solar Pipeline",
			subcopy:
				"Custom AI employees that build quotes, schedule site visits and installs, and chase every customer follow-up inside your existing CRM. Real work done, no new software, no migrations.",
		},
		useCases: [
			{
				title: "Quoting Assistant",
				capabilities: [
					"Builds quotes from a few details",
					"Answers pricing and savings questions",
					"Sends proposals fast",
					"Follows up on open quotes",
				],
			},
			{
				title: "Scheduling Coordinator",
				capabilities: [
					"Books site visits and installs",
					"Confirms appointments with customers",
					"Reschedules without the back-and-forth",
					"Keeps crews' calendars full",
				],
			},
			{
				title: "Customer Follow-up Rep",
				capabilities: [
					"Checks in after each step",
					"Answers permit and timing questions",
					"Chases missing paperwork",
					"Asks happy customers for referrals",
				],
			},
		],
		seo: {
			title: "AI Employees for Solar & Renewables | Nairon",
			description:
				"Nairon builds custom AI employees for solar and renewables that handle quoting, scheduling, and customer follow-up inside your existing tools. Live in weeks, no migrations.",
		},
	},
	{
		kind: "industry",
		name: "Logistics & 3PL",
		hero: {
			headline: "AI Employees That Run Your Dispatch Desk",
			subcopy:
				"Custom AI employees that book loads, chase tracking updates, and clear your back office, working inside your TMS and email. No new software, live in weeks.",
		},
		useCases: [
			{
				title: "Dispatch Assistant",
				capabilities: [
					"Books and assigns loads",
					"Sends rate confirmations",
					"Answers driver and carrier questions",
					"Fills open lanes faster",
				],
			},
			{
				title: "Track & Trace Rep",
				capabilities: [
					"Chases live tracking updates",
					"Makes check calls automatically",
					"Flags late or stuck shipments",
					"Keeps customers in the loop",
				],
			},
			{
				title: "Back-office Helper",
				capabilities: [
					"Matches paperwork to loads",
					"Preps invoices and proof of delivery",
					"Catches billing mistakes",
					"Clears the inbox each day",
				],
			},
		],
		seo: {
			title: "AI Employees for Logistics and 3PL Ops | Nairon",
			description:
				"Nairon builds custom AI employees for logistics and 3PL teams. Automate dispatch, load tracking, check calls, and back-office ops inside the tools you already run.",
		},
	},
	{
		kind: "industry",
		name: "Franchises",
		hero: {
			headline: "AI Employees That Run Every Location The Same",
			subcopy:
				"Custom AI employees enforce your playbook across franchisees, handling onboarding, compliance checks, and reporting inside the systems you already run. No new software, no rollout fights.",
		},
		useCases: [
			{
				title: "Onboarding Assistant",
				capabilities: [
					"Walks new owners through setup",
					"Sends the right docs and steps",
					"Answers common questions",
					"Flags who is falling behind",
				],
			},
			{
				title: "Compliance Checker",
				capabilities: [
					"Checks each location follows the playbook",
					"Reviews photos and reports",
					"Flags issues early",
					"Reminds owners of deadlines",
				],
			},
			{
				title: "Reporting Helper",
				capabilities: [
					"Pulls numbers from every location",
					"Builds one simple rollup",
					"Spots locations that need help",
					"Sends weekly updates",
				],
			},
		],
		seo: {
			title: "AI Employees for Franchise Operations | Nairon",
			description:
				"Nairon builds custom AI employees for franchises that standardize operations across every location, handling onboarding, compliance, and reporting inside your existing tools.",
		},
	},
	{
		kind: "industry",
		name: "Healthcare Staffing",
		hero: {
			headline: "AI Employees That Fill Your Shifts",
			subcopy:
				"Custom AI employees that match credentialed clinicians to open shifts, chase confirmations, and handle the coordination, working inside your ATS and scheduling tools. No new software, live in weeks.",
		},
		useCases: [
			{
				title: "Shift Filler",
				capabilities: [
					"Matches clinicians to open shifts",
					"Reaches out to available staff",
					"Confirms who is coming",
					"Fills gaps before they become problems",
				],
			},
			{
				title: "Credentialing Assistant",
				capabilities: [
					"Tracks licenses and documents",
					"Chases expiring paperwork",
					"Flags missing items",
					"Keeps files audit-ready",
				],
			},
			{
				title: "Candidate Coordinator",
				capabilities: [
					"Replies to applicants fast",
					"Schedules calls and interviews",
					"Answers pay and shift questions",
					"Keeps candidates warm",
				],
			},
		],
		seo: {
			title: "AI Employees for Healthcare Staffing | Nairon",
			description:
				"Nairon builds custom AI employees for healthcare staffing that fill open shifts, match credentialed clinicians, and run coordination inside your existing tools. Live in weeks.",
		},
	},
	{
		kind: "industry",
		name: "Software & Technology",
		hero: {
			headline: "AI Employees That Run Your Support And GTM",
			subcopy:
				"Custom AI employees that triage tickets, qualify pipeline, and run ops inside your existing stack. Live in weeks, no migrations, real work handled end to end.",
		},
		useCases: [
			{
				title: "Support Agent",
				capabilities: [
					"Answers common tickets instantly",
					"Drafts replies for the tricky ones",
					"Sends hard issues to a human",
					"Keeps response times low",
				],
			},
			{
				title: "Sales Development Rep",
				capabilities: [
					"Researches new accounts",
					"Replies to inbound leads fast",
					"Books meetings on the calendar",
					"Keeps the CRM clean",
				],
			},
			{
				title: "Onboarding Assistant",
				capabilities: [
					"Guides new customers through setup",
					"Answers how-to questions",
					"Flags accounts at risk",
					"Nudges users toward key features",
				],
			},
		],
		seo: {
			title: "AI Employees for Software Companies | Nairon",
			description:
				"Nairon builds custom AI employees for software and technology teams. They own support, GTM, and operations inside your existing tools. No migrations, live in weeks.",
		},
	},
	// ── Solutions ───────────────────────────────────────────────────────
	{
		kind: "solution",
		name: "Revenue & GTM",
		hero: {
			headline: "AI That Works Your Pipeline End To End",
			subcopy:
				"Custom AI employees that prospect, qualify, draft proposals, and keep your pipeline clean. Deployed inside your CRM and outreach stack, no migrations, real revenue motion in weeks.",
		},
		useCases: [
			{
				title: "Sales Development Rep",
				capabilities: [
					"Finds and researches accounts",
					"Personalizes outreach",
					"Replies to inbound leads fast",
					"Books meetings on the calendar",
				],
			},
			{
				title: "Proposal Assistant",
				capabilities: [
					"Drafts proposals and quotes",
					"Pulls the right pricing and proof",
					"Tailors each one to the buyer",
					"Turns them around fast",
				],
			},
			{
				title: "Pipeline Manager",
				capabilities: [
					"Keeps CRM data clean",
					"Flags deals going cold",
					"Preps notes before calls",
					"Chases the next step",
				],
			},
		],
		seo: {
			title: "AI Employees for Revenue & GTM Teams | Nairon",
			description:
				"Nairon builds custom AI employees for Revenue and GTM teams. They run prospecting, qualification, proposals, and pipeline ops inside your existing CRM and outreach tools.",
		},
	},
	{
		kind: "solution",
		name: "Customer Support",
		hero: {
			headline: "AI Employees That Resolve Your Support Queue",
			subcopy:
				"Custom AI employees triage, draft, and resolve tickets inside your helpdesk, with a human in the loop on every escalation. No migrations, no new tools for your team to learn.",
		},
		useCases: [
			{
				title: "Front-line Agent",
				capabilities: [
					"Answers common questions instantly",
					"Handles repeat tickets end to end",
					"Works inside your helpdesk",
					"Keeps wait times short",
				],
			},
			{
				title: "Escalation Assistant",
				capabilities: [
					"Drafts replies for tough tickets",
					"Gathers the context a human needs",
					"Routes to the right team",
					"Follows up to close the loop",
				],
			},
			{
				title: "Knowledge Helper",
				capabilities: [
					"Spots gaps in your help docs",
					"Drafts new answers",
					"Keeps articles up to date",
					"Surfaces the right doc per ticket",
				],
			},
		],
		seo: {
			title: "AI Employees for Customer Support | Nairon",
			description:
				"Nairon builds custom AI employees for customer support. They triage, draft, and resolve tickets inside your existing helpdesk, with a human in the loop and no migrations.",
		},
	},
	{
		kind: "solution",
		name: "Back Office Operations",
		hero: {
			headline: "AI Employees That Run Your Back Office",
			subcopy:
				"Custom AI employees handle invoice processing, data entry, reconciliation, and reporting inside the tools your team already uses. Days of manual work become minutes, with no migrations.",
		},
		useCases: [
			{
				title: "Data Entry Assistant",
				capabilities: [
					"Moves data between systems",
					"Fills in forms and records",
					"Catches missing fields",
					"Works without the copy-paste",
				],
			},
			{
				title: "Invoice & Billing Helper",
				capabilities: [
					"Preps and sends invoices",
					"Matches payments to accounts",
					"Flags mistakes before they ship",
					"Chases overdue bills",
				],
			},
			{
				title: "Reporting Assistant",
				capabilities: [
					"Pulls numbers from your tools",
					"Builds the same report every week",
					"Highlights what changed",
					"Sends it on time",
				],
			},
		],
		seo: {
			title: "Back Office AI Employees for Operations | Nairon",
			description:
				"Nairon builds custom AI employees that run back office operations like data entry, reconciliation, and reporting inside your existing tools. No migrations, live in weeks.",
		},
	},
	{
		kind: "solution",
		name: "Data & Research",
		hero: {
			headline: "AI Employees That Turn Sources Into Structured Data",
			subcopy:
				"Custom AI employees extract, clean, and route information from documents, web, and feeds into your existing databases and tools. Real datasets, no scraping scripts to babysit, no migrations.",
		},
		useCases: [
			{
				title: "Data Collector",
				capabilities: [
					"Gathers info from sites and docs",
					"Pulls it all into one place",
					"Updates it on a schedule",
					"No scripts to babysit",
				],
			},
			{
				title: "Cleanup Assistant",
				capabilities: [
					"Fixes messy records",
					"Removes duplicates",
					"Fills in missing details",
					"Keeps your database tidy",
				],
			},
			{
				title: "Research Assistant",
				capabilities: [
					"Summarizes long documents",
					"Compares options side by side",
					"Pulls out the key facts",
					"Hands you a clear answer",
				],
			},
		],
		seo: {
			title: "AI Employees for Data and Research | Nairon",
			description:
				"Nairon builds custom AI employees for data and research teams that extract, structure, enrich, and route information at scale inside the tools and databases you already use.",
		},
	},
	{
		kind: "solution",
		name: "Content & Marketing",
		hero: {
			headline: "AI Employees That Take Briefs to Publish",
			subcopy:
				"Custom AI employees turn briefs into on-brand, publish-ready copy across your channels. They work inside the tools your team already uses, with no migrations and no new software to learn.",
		},
		useCases: [
			{
				title: "Writer",
				capabilities: [
					"Turns briefs into drafts",
					"Keeps everything on brand",
					"Writes for each channel",
					"Delivers publish-ready copy",
				],
			},
			{
				title: "Repurposing Assistant",
				capabilities: [
					"Turns one piece into many",
					"Adapts posts per platform",
					"Drafts emails and captions",
					"Keeps the calendar full",
				],
			},
			{
				title: "Research Assistant",
				capabilities: [
					"Finds topics worth writing",
					"Gathers facts and sources",
					"Builds outlines",
					"Checks what competitors publish",
				],
			},
		],
		seo: {
			title: "AI Employees for Content & Marketing | Nairon",
			description:
				"Nairon builds custom AI employees for content and marketing teams. They take briefs to publish-ready, on-brand copy inside your existing tools, with no migrations.",
		},
	},
	{
		kind: "solution",
		name: "Workflow Automation",
		hero: {
			headline: "AI Employees That Run Your Workflows",
			subcopy:
				"We build custom AI employees that pick up your manual, repetitive processes and run them end to end, inside the tools your team already uses. No new software, no migrations.",
		},
		useCases: [
			{
				title: "Process Runner",
				capabilities: [
					"Picks up repetitive tasks",
					"Runs them start to finish",
					"Works inside your current tools",
					"Frees your team from busywork",
				],
			},
			{
				title: "Hand-off Coordinator",
				capabilities: [
					"Moves work between people and systems",
					"Chases the next step",
					"Flags anything stuck",
					"Keeps things moving",
				],
			},
			{
				title: "Monitor & Alerts",
				capabilities: [
					"Watches for problems",
					"Flags them early",
					"Notifies the right person",
					"Keeps a clear record",
				],
			},
		],
		seo: {
			title: "AI Employees for Workflow Automation | Nairon",
			description:
				"Nairon builds custom AI employees for workflow automation that own your repetitive operational processes end to end, inside the tools you already run. Live in weeks.",
		},
	},
];

// Tools per vertical (keyed by slug): a few systems unique to that vertical,
// plus everyday basics every team already runs. Basics are chosen to have
// distinct, recognizable logos (no duplicate Google / Microsoft marks).
const BASIC_TOOLS = ["Slack", "Zoom", "Dropbox"];

const TOOLS: Record<string, string[]> = {
	"property-management": ["AppFolio", "Yardi", "Buildium", "RentManager", ...BASIC_TOOLS],
	"commercial-real-estate": ["Yardi", "MRI", "CoStar", "Argus", ...BASIC_TOOLS],
	"solar-renewables": ["Aurora Solar", "OpenSolar", "ServiceTitan", "Salesforce", ...BASIC_TOOLS],
	"logistics-3pl": ["McLeod", "Samsara", "project44", "DAT", ...BASIC_TOOLS],
	franchises: ["QuickBooks", "Toast", "Salesforce", "ADP", ...BASIC_TOOLS],
	"healthcare-staffing": ["Bullhorn", "Indeed", "UKG", "Salesforce", ...BASIC_TOOLS],
	"software-technology": ["Salesforce", "HubSpot", "Zendesk", "Jira", ...BASIC_TOOLS],
	"revenue-gtm": ["Salesforce", "HubSpot", "Outreach", "Apollo", ...BASIC_TOOLS],
	"customer-support": ["Zendesk", "Intercom", "Freshdesk", "Help Scout", ...BASIC_TOOLS],
	"back-office-operations": ["QuickBooks", "NetSuite", "Bill.com", "SAP", ...BASIC_TOOLS],
	"data-research": ["Airtable", "Snowflake", "Google Sheets", "Notion", ...BASIC_TOOLS],
	"content-marketing": ["WordPress", "HubSpot", "Webflow", "Canva", ...BASIC_TOOLS],
	"workflow-automation": ["Zapier", "Slack", "Notion", "Airtable", ...BASIC_TOOLS],
};

export const VERTICALS: Record<string, VerticalContent> = Object.fromEntries(
	ENTRIES.map((e) => {
		const slug = slugify(e.name);
		// Dedupe so a basic that's already listed as a vertical tool isn't doubled.
		const tools = Array.from(new Set(TOOLS[slug] ?? BASIC_TOOLS));
		return [slug, { ...e, slug, tools }];
	}),
);

export const INDUSTRIES = Object.values(VERTICALS).filter((v) => v.kind === "industry");
export const SOLUTIONS = Object.values(VERTICALS).filter((v) => v.kind === "solution");
