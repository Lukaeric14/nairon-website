import { useState, useEffect, useRef } from "react";
import { GridSection, GridCell } from "../grid-system";

const SDLC_PHASES = [
	{
		id: "plan",
		label: "Plan",
		icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
		tools: [
			{ name: "Linear", logo: "https://cdn.simpleicons.org/linear/ffffff" },
			{ name: "Notion", logo: "https://cdn.simpleicons.org/notion/ffffff" },
			{ name: "Jira", logo: "https://cdn.simpleicons.org/jira/ffffff" },
			{ name: "Figma", logo: "https://cdn.simpleicons.org/figma/ffffff" },
			{ name: "Miro", logo: "https://cdn.simpleicons.org/miro/ffffff" },
			{ name: "Coda", logo: "https://cdn.simpleicons.org/coda/ffffff" },
			{ name: "Whimsical", logo: "https://cdn.simpleicons.org/whimsical/ffffff" },
			{ name: "Loom", logo: "https://cdn.simpleicons.org/loom/ffffff" },
			{ name: "Confluence", logo: "https://cdn.simpleicons.org/confluence/ffffff" },
			{ name: "Asana", logo: "https://cdn.simpleicons.org/asana/ffffff" },
			{ name: "Monday", logo: "https://cdn.simpleicons.org/mondaydotcom/ffffff" },
			{ name: "ClickUp", logo: "https://cdn.simpleicons.org/clickup/ffffff" },
			{ name: "Shortcut", logo: "https://cdn.simpleicons.org/shortcut/ffffff" },
			{ name: "Taskade", logo: "https://cdn.simpleicons.org/taskade/ffffff" },
			{ name: "Height", logo: "https://cdn.simpleicons.org/h/ffffff" },
			{ name: "Slite", logo: "https://cdn.simpleicons.org/slite/ffffff" },
		],
	},
	{
		id: "code",
		label: "Code",
		icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
		tools: [
			{ name: "Cursor", logo: "https://cdn.simpleicons.org/cursor/ffffff" },
			{ name: "Claude Code", logo: "https://cdn.simpleicons.org/anthropic/ffffff" },
			{ name: "GitHub Copilot", logo: "https://cdn.simpleicons.org/githubcopilot/ffffff" },
			{ name: "Windsurf", logo: "https://cdn.simpleicons.org/codeium/ffffff" },
			{ name: "Cline", logo: "https://cdn.simpleicons.org/c/ffffff" },
			{ name: "Aider", logo: "https://cdn.simpleicons.org/openai/ffffff" },
			{ name: "Tabnine", logo: "https://cdn.simpleicons.org/tabnine/ffffff" },
			{ name: "Replit", logo: "https://cdn.simpleicons.org/replit/ffffff" },
			{ name: "VS Code", logo: "https://cdn.simpleicons.org/visualstudiocode/ffffff" },
			{ name: "Neovim", logo: "https://cdn.simpleicons.org/neovim/ffffff" },
			{ name: "JetBrains", logo: "https://cdn.simpleicons.org/jetbrains/ffffff" },
			{ name: "Zed", logo: "https://cdn.simpleicons.org/zedindustries/ffffff" },
			{ name: "v0", logo: "https://cdn.simpleicons.org/vercel/ffffff" },
			{ name: "bolt.new", logo: "https://cdn.simpleicons.org/stackblitz/ffffff" },
			{ name: "Devin", logo: "https://cdn.simpleicons.org/d/ffffff" },
			{ name: "Lovable", logo: "https://cdn.simpleicons.org/heart/ffffff" },
		],
	},
	{
		id: "test",
		label: "Test",
		icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
		tools: [
			{ name: "Vitest", logo: "https://cdn.simpleicons.org/vitest/ffffff" },
			{ name: "Playwright", logo: "https://cdn.simpleicons.org/playwright/ffffff" },
			{ name: "Jest", logo: "https://cdn.simpleicons.org/jest/ffffff" },
			{ name: "Cypress", logo: "https://cdn.simpleicons.org/cypress/ffffff" },
			{ name: "Selenium", logo: "https://cdn.simpleicons.org/selenium/ffffff" },
			{ name: "Puppeteer", logo: "https://cdn.simpleicons.org/puppeteer/ffffff" },
			{ name: "Testing Library", logo: "https://cdn.simpleicons.org/testinglibrary/ffffff" },
			{ name: "Storybook", logo: "https://cdn.simpleicons.org/storybook/ffffff" },
			{ name: "Chromatic", logo: "https://cdn.simpleicons.org/chromatic/ffffff" },
			{ name: "Meticulous", logo: "https://cdn.simpleicons.org/m/ffffff" },
			{ name: "Codium AI", logo: "https://cdn.simpleicons.org/codacy/ffffff" },
			{ name: "Qodo", logo: "https://cdn.simpleicons.org/q/ffffff" },
			{ name: "Mocha", logo: "https://cdn.simpleicons.org/mocha/ffffff" },
			{ name: "k6", logo: "https://cdn.simpleicons.org/k6/ffffff" },
			{ name: "Postman", logo: "https://cdn.simpleicons.org/postman/ffffff" },
			{ name: "Insomnia", logo: "https://cdn.simpleicons.org/insomnia/ffffff" },
		],
	},
	{
		id: "review",
		label: "Review",
		icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
		tools: [
			{ name: "GitHub", logo: "https://cdn.simpleicons.org/github/ffffff" },
			{ name: "GitLab", logo: "https://cdn.simpleicons.org/gitlab/ffffff" },
			{ name: "Graphite", logo: "https://cdn.simpleicons.org/graphite/ffffff" },
			{ name: "CodeRabbit", logo: "https://cdn.simpleicons.org/c/ffffff" },
			{ name: "Sourcegraph", logo: "https://cdn.simpleicons.org/sourcegraph/ffffff" },
			{ name: "Bitbucket", logo: "https://cdn.simpleicons.org/bitbucket/ffffff" },
			{ name: "Phabricator", logo: "https://cdn.simpleicons.org/phabricator/ffffff" },
			{ name: "Gerrit", logo: "https://cdn.simpleicons.org/gerrit/ffffff" },
			{ name: "Reviewpad", logo: "https://cdn.simpleicons.org/r/ffffff" },
			{ name: "Ellipsis", logo: "https://cdn.simpleicons.org/e/ffffff" },
			{ name: "SonarQube", logo: "https://cdn.simpleicons.org/sonarqube/ffffff" },
			{ name: "CodeClimate", logo: "https://cdn.simpleicons.org/codeclimate/ffffff" },
			{ name: "Snyk", logo: "https://cdn.simpleicons.org/snyk/ffffff" },
			{ name: "Semgrep", logo: "https://cdn.simpleicons.org/semgrep/ffffff" },
			{ name: "Trunk", logo: "https://cdn.simpleicons.org/t/ffffff" },
			{ name: "Biome", logo: "https://cdn.simpleicons.org/biome/ffffff" },
		],
	},
	{
		id: "deploy",
		label: "Deploy",
		icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
		tools: [
			{ name: "Vercel", logo: "https://cdn.simpleicons.org/vercel/ffffff" },
			{ name: "Netlify", logo: "https://cdn.simpleicons.org/netlify/ffffff" },
			{ name: "Railway", logo: "https://cdn.simpleicons.org/railway/ffffff" },
			{ name: "Fly.io", logo: "https://cdn.simpleicons.org/flydotio/ffffff" },
			{ name: "AWS", logo: "https://cdn.simpleicons.org/amazonaws/ffffff" },
			{ name: "GCP", logo: "https://cdn.simpleicons.org/googlecloud/ffffff" },
			{ name: "Cloudflare", logo: "https://cdn.simpleicons.org/cloudflare/ffffff" },
			{ name: "Docker", logo: "https://cdn.simpleicons.org/docker/ffffff" },
			{ name: "Kubernetes", logo: "https://cdn.simpleicons.org/kubernetes/ffffff" },
			{ name: "Terraform", logo: "https://cdn.simpleicons.org/terraform/ffffff" },
			{ name: "SST", logo: "https://cdn.simpleicons.org/sst/ffffff" },
			{ name: "Render", logo: "https://cdn.simpleicons.org/render/ffffff" },
			{ name: "DigitalOcean", logo: "https://cdn.simpleicons.org/digitalocean/ffffff" },
			{ name: "Supabase", logo: "https://cdn.simpleicons.org/supabase/ffffff" },
			{ name: "PlanetScale", logo: "https://cdn.simpleicons.org/planetscale/ffffff" },
			{ name: "Neon", logo: "https://cdn.simpleicons.org/neon/ffffff" },
		],
	},
	{
		id: "monitor",
		label: "Monitor",
		icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
		tools: [
			{ name: "Sentry", logo: "https://cdn.simpleicons.org/sentry/ffffff" },
			{ name: "Datadog", logo: "https://cdn.simpleicons.org/datadog/ffffff" },
			{ name: "Grafana", logo: "https://cdn.simpleicons.org/grafana/ffffff" },
			{ name: "New Relic", logo: "https://cdn.simpleicons.org/newrelic/ffffff" },
			{ name: "Highlight.io", logo: "https://cdn.simpleicons.org/h/ffffff" },
			{ name: "LogRocket", logo: "https://cdn.simpleicons.org/logrocket/ffffff" },
			{ name: "Axiom", logo: "https://cdn.simpleicons.org/a/ffffff" },
			{ name: "Prometheus", logo: "https://cdn.simpleicons.org/prometheus/ffffff" },
			{ name: "PagerDuty", logo: "https://cdn.simpleicons.org/pagerduty/ffffff" },
			{ name: "Opsgenie", logo: "https://cdn.simpleicons.org/opsgenie/ffffff" },
			{ name: "Honeycomb", logo: "https://cdn.simpleicons.org/honeybadger/ffffff" },
			{ name: "Betterstack", logo: "https://cdn.simpleicons.org/betterstack/ffffff" },
			{ name: "Checkly", logo: "https://cdn.simpleicons.org/checkly/ffffff" },
			{ name: "Elastic", logo: "https://cdn.simpleicons.org/elastic/ffffff" },
			{ name: "Splunk", logo: "https://cdn.simpleicons.org/splunk/ffffff" },
			{ name: "Dynatrace", logo: "https://cdn.simpleicons.org/dynatrace/ffffff" },
		],
	},
];

function ToolTile({
	tool,
	index,
	isActive,
}: {
	tool: { name: string; logo: string };
	index: number;
	isActive: boolean;
}) {
	return (
		<div
			className="flex flex-col items-center gap-2 py-3 px-2 rounded-lg transition-all duration-400 ease-out cursor-pointer hover:bg-[#0C0C0C]/[0.04] group"
			style={{
				opacity: isActive ? 1 : 0,
				transform: isActive ? "scale(1)" : "scale(0.9)",
				transitionDelay: `${index * 30}ms`,
			}}
		>
			<div className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#0C0C0C]/[0.04] border border-[#0C0C0C]/[0.06] group-hover:border-[#0C0C0C]/[0.12] transition-colors">
				<img
					src={tool.logo}
					alt={tool.name}
					width={20}
					height={20}
					className="w-5 h-5 object-contain opacity-60 group-hover:opacity-100 transition-opacity"
					loading="lazy"
				/>
			</div>
			<span className="text-[11px] text-[#5C584F]/70 group-hover:text-[#1A1916] transition-colors text-center leading-tight truncate max-w-full">
				{tool.name}
			</span>
		</div>
	);
}

export function UniverseDirectory() {
	const [activePhase, setActivePhase] = useState(0);
	const [animating, setAnimating] = useState(true);
	const ref = useRef<HTMLDivElement>(null);
	const hasRun = useRef(false);

	useEffect(() => {
		const el = ref.current;
		if (!el || hasRun.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					hasRun.current = true;
					setAnimating(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.2 },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	const handlePhaseClick = (index: number) => {
		if (index === activePhase) return;
		setAnimating(false);
		setTimeout(() => {
			setActivePhase(index);
			setAnimating(true);
		}, 50);
	};

	const phase = SDLC_PHASES[activePhase];

	return (
		<div ref={ref} id="directory">
			{/* Heading row */}
			<GridSection columns="1fr" border>
				<GridCell className="px-12 py-10">
					<div className="flex items-center gap-3 mb-4">
						<div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
						<span className="text-[#5C584F] text-xs font-medium uppercase tracking-[0.16em]">
							Tool Directory
						</span>
					</div>
					<h2 className="text-4xl md:text-[48px] md:leading-[57.6px] font-normal tracking-[-0.48px] text-[#1A1916] max-w-3xl mb-3">
						Every tool,{" "}
						<span className="font-serif italic text-[#C9A96E]">
							mapped to your workflow
						</span>
					</h2>
					<p className="text-[#5C584F] text-base max-w-xl">
						Auto-curated from practical agent-building patterns. Organized
						by SDLC phase so you find the right tool for every stage of
						development.
					</p>
				</GridCell>
			</GridSection>

			{/* SDLC tabs + tool grid */}
			<GridSection columns="1fr" border>
				<GridCell>
					{/* Phase tabs */}
					<div className="scroll-fade-x scrollbar-thin flex overflow-x-auto border-b border-[#0C0C0C]/[0.06]">
						{SDLC_PHASES.map((p, i) => (
							<button
								key={p.id}
								type="button"
								onClick={() => handlePhaseClick(i)}
								className="relative flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors shrink-0"
								style={{
									color:
										activePhase === i
											? "#C9A96E"
											: "#A39E96",
								}}
							>
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d={p.icon} />
								</svg>
								{p.label}

								{activePhase === i && (
									<div
										className="absolute bottom-0 left-0 right-0 h-[2px]"
										style={{
											background:
												"linear-gradient(90deg, transparent, #C9A96E, transparent)",
										}}
									/>
								)}
							</button>
						))}
					</div>

					{/* Tool grid — 8 columns, 2 rows of 8 */}
					<div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1 px-6 py-6 md:px-8 md:py-8">
						{phase.tools.map((tool, i) => (
							<ToolTile
								key={`${phase.id}-${tool.name}`}
								tool={tool}
								index={i}
								isActive={animating}
							/>
						))}
					</div>

					{/* Browse all link */}
					<div className="px-8 pb-6 text-center">
						<span className="text-[#5C584F]/60 text-sm">
							{phase.tools.length} tools &middot;{" "}
							<span className="text-[#C9A96E] cursor-pointer hover:text-[#D4B87A] transition-colors">
								Browse all {phase.label.toLowerCase()} tools
								&rarr;
							</span>
						</span>
					</div>
				</GridCell>
			</GridSection>
		</div>
	);
}
