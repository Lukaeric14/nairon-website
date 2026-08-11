import { cn } from "@/lib/utils";

const stats = [
	{
		value: "3x",
		label: "More pushback",
		description: "Top performers disagree with AI 3x more often",
	},
	{
		value: "30+",
		label: "Curated tools",
		description: "MCPs, skills, and workflows mapped to friction",
	},
	{
		value: "5",
		label: "Scoring dimensions",
		description: "Interview depth, pushback ratio, prompt quality, and more",
	},
	{
		value: "100%",
		label: "Local analysis",
		description: "All session scanning happens on your machine",
	},
];

const PlusDecorator = ({ className }: { className?: string }) => (
	<div
		aria-hidden
		className={cn(
			"mask-radial-from-15% before:bg-foreground/25 after:bg-foreground/25 absolute size-3 before:absolute before:inset-0 before:m-auto before:h-px after:absolute after:inset-0 after:m-auto after:w-px",
			className
		)}
	/>
);

export function FluxStats() {
	return (
		<section className="bg-background @container py-16 md:py-24">
			<div className="mx-auto max-w-5xl px-6">
				<h2 className="mx-auto max-w-2xl text-balance text-center text-3xl font-semibold lg:text-4xl">
					What separates top AI collaborators
				</h2>
				<p className="text-muted-foreground mx-auto mt-6 max-w-xl text-pretty text-center text-lg">
					You're using AI to code, but{" "}
					<strong className="text-foreground font-semibold">are you actually good at it?</strong>{" "}
					Flux measures the patterns that matter.
				</p>

				<div className="relative mt-12">
					<PlusDecorator className="-translate-[calc(50%-0.5px)]" />
					<PlusDecorator className="right-0 -translate-y-[calc(50%-0.5px)] translate-x-[calc(50%-0.5px)]" />
					<PlusDecorator className="bottom-0 right-0 translate-x-[calc(50%-0.5px)] translate-y-[calc(50%-0.5px)]" />
					<PlusDecorator className="bottom-0 -translate-x-[calc(50%-0.5px)] translate-y-[calc(50%-0.5px)]" />

					<div className="grid grid-cols-2 divide-x border lg:grid-cols-4">
						{stats.map((stat, index) => (
							<div
								key={index}
								className="bg-card hover:bg-foreground/2 space-y-3 p-6 text-center transition-colors md:p-8"
							>
								<div className="bg-gradient-to-t from-foreground to-muted-foreground bg-clip-text text-3xl font-semibold text-transparent md:text-5xl">
									{stat.value}
								</div>
								<p className="text-foreground font-medium">{stat.label}</p>
								<p className="text-muted-foreground text-sm">{stat.description}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
