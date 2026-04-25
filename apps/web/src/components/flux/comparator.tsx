import { cn } from "@/lib/utils";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type Feature = {
	name: string;
	description?: string;
	claudeCode: boolean | string;
	withFlux: boolean | string;
};

const features: Feature[] = [
	{
		name: "AI code generation",
		description: "Generate code from natural language prompts",
		claudeCode: true,
		withFlux: true,
	},
	{
		name: "Multi-file editing",
		description: "Edit multiple files in a single session",
		claudeCode: true,
		withFlux: true,
	},
	{
		name: "Structured requirements gathering",
		description: "Interview-based requirements clarification before coding",
		claudeCode: false,
		withFlux: true,
	},
	{
		name: "Atomic task breakdown",
		description: "Break features into 30-90 min tasks with dependencies",
		claudeCode: false,
		withFlux: true,
	},
	{
		name: "Session analysis",
		description: "Analyze your coding sessions for friction patterns",
		claudeCode: false,
		withFlux: true,
	},
	{
		name: "AI-native scoring",
		description: "Measure collaboration quality across 5 dimensions",
		claudeCode: false,
		withFlux: true,
	},
	{
		name: "Tool recommendations",
		description: "Get personalized MCP and skill recommendations",
		claudeCode: false,
		withFlux: true,
	},
	{
		name: "Context preservation",
		description: "Maintain understanding across sessions",
		claudeCode: false,
		withFlux: true,
	},
];

const Indicator = ({ checked = false }: { checked?: boolean }) => {
	return (
		<span
			className={cn(
				"flex size-5 items-center justify-center rounded-full font-sans text-xs font-semibold",
				checked ? "bg-emerald-600 text-[#1A1916]" : "bg-rose-500/80 text-[#1A1916]"
			)}
		>
			{checked ? <CheckIcon /> : "✗"}
		</span>
	);
};

const CheckIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512" className="size-2.5">
		<path
			fill="currentColor"
			d="M17.47 250.9C88.82 328.1 158 397.6 224.5 485.5c72.3-143.8 146.3-288.1 268.4-444.37L460 26.06C356.9 135.4 276.8 238.9 207.2 361.9c-48.4-43.6-126.62-105.3-174.38-137z"
		/>
	</svg>
);

export function FluxComparator() {
	return (
		<section className="bg-background py-16 md:py-24">
			<div className="mx-auto max-w-5xl px-6">
				<div className="grid gap-12 lg:grid-cols-2">
					{/* Left: Header */}
					<div className="max-w-lg">
						<div className="bg-amber-500/10 text-amber-400 border border-amber-500/20 w-fit rounded-full px-4 py-1.5 text-sm font-medium mb-6">
							Why Flux?
						</div>
						<h2 className="text-foreground text-3xl font-semibold md:text-4xl lg:text-5xl">
							Claude Code is powerful. Flux makes it structured.
						</h2>
						<p className="text-muted-foreground mt-6 text-lg">
							AI agents generate code. Flux ensures you're actually good at working with them. Process beats raw prompting.
						</p>
					</div>

					{/* Right: Comparison table */}
					<div className="grid grid-cols-3">
						{/* Features column */}
						<div>
							<div className="sticky top-0 flex h-14 items-end gap-1.5 px-4 py-2">
								<div className="text-muted-foreground text-sm font-medium">Features</div>
							</div>
							{features.map((feature, index) => (
								<div
									key={index}
									className="text-muted-foreground even:bg-card flex h-14 items-center rounded-l-lg px-4 last:rounded-bl-xl"
								>
									<div className="text-sm">{feature.name}</div>
									{feature.description && (
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger className="flex size-7">
													<span className="bg-foreground/10 text-foreground/65 m-auto flex size-4 items-center justify-center rounded-full text-xs">
														?
													</span>
												</TooltipTrigger>
												<TooltipContent className="max-w-56 text-sm">{feature.description}</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									)}
								</div>
							))}
						</div>

						{/* Claude Code column */}
						<div>
							<div className="sticky top-0 flex h-14 flex-col items-center justify-center gap-1.5 px-4 text-center">
								<span className="text-muted-foreground text-sm font-medium">Claude Code</span>
							</div>
							{features.map((feature, index) => (
								<div
									key={index}
									className="even:bg-card flex h-14 items-center justify-center px-4 text-sm"
								>
									<Indicator checked={feature.claudeCode === true} />
								</div>
							))}
						</div>

						{/* With Flux column */}
						<div className="ring-border bg-card/50 shadow-black/6.5 relative z-10 rounded-xl shadow-xl ring-1">
							<div className="sticky top-0 flex h-14 flex-col items-center justify-center gap-1.5 rounded-t-xl px-4 text-center">
								<span className="text-foreground text-sm font-semibold">+ Flux</span>
							</div>
							{features.map((feature, index) => (
								<div
									key={index}
									className="odd:bg-card flex h-14 items-center justify-center px-4 text-sm last:rounded-b-xl"
								>
									<Indicator checked={feature.withFlux === true} />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
